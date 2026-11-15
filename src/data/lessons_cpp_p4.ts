import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_CPP_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'Pointers, References & Memory Addresses in C++',
    banglaTitle: 'পয়েন্টার, রেফারেন্স ও মেমোরি অ্যাড্রেস (C++)',
    subtitle: 'T& aliases, const T& zero-copy parameters, raw T* addresses, and pointer arithmetic',
    zeroIntuition: {
      plainEnglishStory:
        'Every variable in C++ lives at a numeric byte address in RAM, which you can inspect with the address-of operator (`&x`). A raw pointer (`int* p = &x;`) stores that memory address explicitly, can be reassigned or set to `nullptr`, and dereferences (`*p`) to read or mutate the target object.\n\nModern C++ prefers references (`int& ref = x;` or `const vector<int>& v`) whenever an object definitely exists: a reference is an un-reseatable non-null alias with zero dereferencing clutter, letting huge containers pass into functions without expensive deep copies.',
      asciiFlowchart:
        'int x = 42;       // addr 0x7ff0 holds 42\nint& r = x;       // zero-cost alias for 0x7ff0\nint* p = &x;      // p holds 0x7ff0; *p reads/writes 42',
      pseudocode: ["function swap(int& a, int& b):","tmp = a; a = b; b = tmp // mutates caller vars directly"],
      banglaZeroToHero: {
        analogyTitle: 'রেফারেন্স হলো একই ব্যক্তির ডাকনাম, আর পয়েন্টার হলো বাড়ির ঠিকানার চিরকুট',
        explanation:
          'সি++-এ একটি ভ্যারিয়েবল `x = 42` তৈরি করলে র‍্যামের একটি নির্দিষ্ট ঠিকানায় মানটি বসে। রেফারেন্স (`int& r = x;`) হলো সেই একই ঘরের আরেকটি ডাকনাম—`r` বদলালে সরাসরি `x` বদলে যায়, এটি কখনো `nullptr` হতে পারে না এবং একে অন্য ভ্যারিয়েবলে সরানো যায় না। অন্যদিকে পয়েন্টার (`int* p = &x;`) হলো র‍্যাম ঠিকানাটি ধরে রাখা একটি চিরকুট: তুমি প্রয়োজনে `*p` দিয়ে ঘরের মান পড়তে বা বদলাতে পারো, চিরকুটে নতুন ঠিকানা লিখতে পারো, কিংবা ফাঁকা বোঝাতে `nullptr` রাখতে পারো। বড় `vector<int>` বা `string` ফাংশনে পাঠানোর সময় ভ্যালু হিসেবে পাঠালে পুরো ডেটা কপি হয়ে সময় নষ্ট হয়, তাই সব সময় `const vector<int>&` কনস্ট্যান্ট রেফারেন্স ব্যবহার করা আধুনিক সি++-এর স্বর্ণনিয়ম। এতে এক বাইটও কপি হয় না অথচ মূল ভেক্টর ভুলবশত পরিবর্তন হওয়ার কোনো ভয় থাকে না। অ্যারের ক্ষেত্রে পয়েন্টার `+ 1` করলে কেবল ১ বাইট নয়, পুরো এলিমেন্টের সাইজ (`sizeof(int) = 4` বাইট) সামনে এগোয়। কখনো লোকাল ভ্যারিয়েবলের অ্যাড্রেস বা রেফারেন্স ফাংশন থেকে রিটার্ন করা যাবে না, কারণ ফাংশন শেষ হলেই লোকাল স্ট্যাক ফ্রেম মুছে যায় এবং ড্যাংলিং পয়েন্টার তৈরি হয়। এই অধ্যায়ে রেফারেন্স, কনস্ট-রেফারেন্স ও পয়েন্টার অ্যারিথমেটিকের সঠিক ব্যবহার শেখা হবে।',
        everydayExample: 'একটি ভারী বই ফটোকপি করে বন্ধুকে না দিয়ে সরাসরি লাইব্রেরির তাকের রেফারেন্স বা ঠিকানা বলে দেওয়া।',
        keyTakeaways: [
          'ইনপুট বড় হলে ফাংশন প্যারামিটারে সর্বদা `const T&` ব্যবহার করে অপ্রয়োজনীয় কপি বন্ধ করো।',
          'রেফারেন্স নাল হতে পারে না; কিন্তু পয়েন্টার `nullptr` হতে পারে—ডিরেফারেন্স করার আগে অবশ্যই চেক করো।',
          'লোকাল ভ্যারিয়েবলের পয়েন্টার বা রেফারেন্স কখনো ফাংশন থেকে রিটার্ন কোরো না (Dangling Pointer)।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'References vs. Pointers Side-by-Side',
        englishParagraphs: [
          'Observe how modifying an `int&` alias and dereferencing an `int*` pointer both update the same underlying stack variable.',
        ],
        banglaParagraphs: [
          'একই ভ্যারিয়েবলকে রেফারেন্স (`&`) ও পয়েন্টার (`*`)—উভয়ভাবে পরিবর্তন করার পার্থক্য দেখো।',
        ],
        memoryDiagram: 'score=10 <- ref (alias), ptr=&score',
        code: `#include <iostream>\nusing namespace std;\nint main() {\n    int score = 10;\n    int& ref = score;\n    int* ptr = &score;\n    ref += 5;\n    *ptr *= 2;\n    cout << score << "\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: '30',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"    int& ref = score;","whatItMeans":"Creates mandatory non-null alias bound to `score`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`ref` is undefined."},
          {"lineNumber":"Line 6","codeSnippet":"    int* ptr = &score;","whatItMeans":"Stores memory address of `score` in `ptr`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`ptr` is undefined."},
          {"lineNumber":"Line 8","codeSnippet":"    *ptr *= 2;","whatItMeans":"Dereferences `ptr` to double `score` (`15 * 2 = 30`).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`score` remains `15`."},
        ],
      },
      {
        id: 'cpp-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'In-Place Reference Normalize & Swap',
        englishParagraphs: [
          'Write a helper taking `(long long& a, long long& b)` to order two numbers directly in caller memory without returning tuples.',
        ],
        banglaParagraphs: [
          'ফাংশনের প্যারামিটারে রেফারেন্স নিয়ে কলারের দুটি ভ্যারিয়েবল সরাসরি ইন-প্লেস অদলবদল ও সাজাও।',
        ],
        memoryDiagram: 'order_pair(x, y) mutates caller frames directly',
        code: `#include <iostream>\nusing namespace std;\nvoid order_pair(long long& a, long long& b) {\n    if (a > b) {\n        long long tmp = a;\n        a = b;\n        b = tmp;\n    }\n}\nint main() {\n    long long x, y;\n    if (cin >> x >> y) {\n        order_pair(x, y);\n        cout << x << " " << y << "\\n";\n    }\n    return 0;\n}`,
        stdin: '42 15',
        expectedOutput: '15 42',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"void order_pair(long long& a, long long& b) {","whatItMeans":"Binds parameters directly to caller variables instead of copies.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Swapping only mutates dead local copies."},
          {"lineNumber":"Line 5","codeSnippet":"        long long tmp = a;","whatItMeans":"Preserves `a` during two-way swap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Original value of `a` gets overwritten."},
        ],
      },
      {
        id: 'cpp-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Zero-Copy const Reference Vector Analyzer',
        englishParagraphs: [
          'Pass a large `const vector<long long>&` by read-only reference plus two `long long&` output parameters to compute min and max in one scan.',
        ],
        banglaParagraphs: [
          '`const vector<long long>&` ব্যবহার করে কোনো কপি ছাড়াই বড় অ্যারের সর্বনিম্ন ও সর্বোচ্চ মান বের করো।',
        ],
        memoryDiagram: 'const vector<long long>& v -> 0 bytes copied',
        code: `#include <iostream>\n#include <vector>\nusing namespace std;\nvoid min_max(const vector<long long>& v, long long& lo, long long& hi) {\n    lo = hi = v[0];\n    for (long long x : v) {\n        if (x < lo) lo = x;\n        if (x > hi) hi = x;\n    }\n}\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    long long lo, hi;\n    min_max(a, lo, hi);\n    cout << lo << " " << hi << "\\n";\n    return 0;\n}`,
        stdin: '5\n12 -4 99 3 18',
        expectedOutput: '-4 99',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"void min_max(const vector<long long>& v, long long& lo, long long& hi) {","whatItMeans":"Reads `v` with zero copy while mutating `lo` and `hi` outputs.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Passing `vector` by value copies O(n) memory unnecessarily."},
        ],
      },
      {
        id: 'cpp-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Safe nullptr Guard & Pointer Arithmetic',
        englishParagraphs: [
          'Optional search helpers return `const int*` (`nullptr` when missing). Always test `if (p != nullptr)` before `*p` to prevent segmentation faults.',
        ],
        banglaParagraphs: [
          'সার্চ ফাংশন মান না পেলে `nullptr` ফেরত দেয়; তাই `*p` করার আগে অবশ্যই `if (p != nullptr)` যাচাই করতে হবে।',
        ],
        memoryDiagram: 'find_first -> pointer to element OR nullptr',
        code: `#include <iostream>\n#include <vector>\nusing namespace std;\nconst int* find_val(const int* begin, const int* end, int key) {\n    for (const int* p = begin; p < end; ++p) {\n        if (*p == key) return p;\n    }\n    return nullptr;\n}\nint main() {\n    vector<int> v = {5, 11, 23, 8};\n    const int* hit = find_val(v.data(), v.data() + v.size(), 23);\n    if (hit != nullptr) cout << *hit << " at idx " << (hit - v.data()) << "\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: '23 at idx 2',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"    for (const int* p = begin; p < end; ++p) {","whatItMeans":"Advances pointer by `sizeof(int)` bytes per step.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Pointer never scans array."},
          {"lineNumber":"Line 13","codeSnippet":"    if (hit != nullptr) cout << *hit << \" at idx \" << (hit - v.data()) << \"\\n\";","whatItMeans":"Guards against null dereference and prints element offset.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing element triggers SIGSEGV crash."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 4","codeSnippet":"    int score = 10;","whatItMeans":"Allocates stack integer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`score` undefined."},
      {"lineNumber":"Line 5","codeSnippet":"    int& ref = score;","whatItMeans":"Alias bound permanently to `score`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No alias variable."},
      {"lineNumber":"Line 6","codeSnippet":"    int* ptr = &score;","whatItMeans":"Captures address of `score`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No pointer variable."},
      {"lineNumber":"Line 7","codeSnippet":"    ref += 5;","whatItMeans":"Mutates `score` to `15`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`score` stays `10`."},
      {"lineNumber":"Line 8","codeSnippet":"    *ptr *= 2;","whatItMeans":"Doubles `score` via dereference to `30`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prints `15`."},
    ],
    dryRunTable: [
      { step: 1, state: 'int score = 10', memoryOrStack: '0x100: 10', note: 'Stack slot holds 10' },
      { step: 2, state: 'ref = score, ptr = &score', memoryOrStack: 'ref->0x100, ptr=0x100', note: 'Both reference address 0x100' },
      { step: 3, state: 'ref += 5', memoryOrStack: '0x100: 15', note: 'Updates original score' },
      { step: 4, state: '*ptr *= 2', memoryOrStack: '0x100: 30', note: 'Prints 30 cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Passing Large `vector` by Value Inside a Loop',
        brokenCode: 'int sum(vector<int> v) { /* O(n) copy every call! */ }',
        fixedCode: 'int sum(const vector<int>& v) { /* O(1) reference */ }',
        whyItBreaks: 'Passing `vector` by value inside N calls turns O(N) algorithms into O(N^2) TLE.',
      },
      {
        title: 'Trap 2: Returning a Reference to a Local Stack Variable',
        brokenCode: 'int& bad() { int x = 5; return x; }',
        fixedCode: 'int good() { int x = 5; return x; }',
        whyItBreaks: 'Local `x` dies when `bad()` returns, creating undefined dangling memory behavior.',
      },
      {
        title: 'Trap 3: Dereferencing Uninitialized or Null Pointer',
        brokenCode: 'int* p; *p = 7;',
        fixedCode: 'int x = 0; int* p = &x; *p = 7;',
        whyItBreaks: 'Writing through a wild pointer causes immediate segmentation fault.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch16-p1',
        difficulty: 'Easy',
        title: 'Reference Triple Mutator',
        prompt: 'Write `void triple(long long& x)` and apply it to an integer read from stdin.',
        banglaHint: '`long long& x` নিয়ে সরাসরি `x *= 3` করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nvoid triple(long long& x) { x *= 3; }\nint main() {\n    long long n; cin >> n;\n    triple(n);\n    cout << n << "\\n";\n    return 0;\n}`,
        sampleStdin: '14',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch16-p2',
        difficulty: 'Easy',
        title: 'Pointer Array Sum',
        prompt: 'Read `n` and `n` integers, then sum them using pointer traversal (`const long long* p`) instead of `[]`.',
        banglaHint: '`for (const long long* p = a.data(); p < a.data() + n; ++p) sum += *p;`',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    long long sum = 0;\n    for (const long long* p = a.data(); p < a.data() + n; ++p) sum += *p;\n    cout << sum << "\\n";\n    return 0;\n}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'cpp-ch16-p3',
        difficulty: 'Medium',
        title: 'In-Place Pointer Reverse',
        prompt: 'Reverse an array of `n` integers in-place using two pointers `long long* l` and `long long* r`.',
        banglaHint: '`while (l < r)` চালিয়ে `*l` ও `*r` অদলবদল করে `l++; r--;` করো।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    long long *l = a.data(), *r = a.data() + n - 1;\n    while (l < r) { swap(*l, *r); l++; r--; }\n    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 < n ? " " : "\\n");\n    return 0;\n}`,
        sampleStdin: '5\n1 2 3 4 5',
        expectedOutput: '5 4 3 2 1',
      },
      {
        id: 'cpp-ch16-p4',
        difficulty: 'Medium',
        title: 'Null-Safe Peak Lookup',
        prompt: 'Return a `const int*` to the first strict local peak (`a[i] > a[i-1] && a[i] > a[i+1]`), or `NONE` if `nullptr`.',
        banglaHint: 'পিক না পেলে `nullptr` রিটার্ন করে `main`-এ `if (p)` চেক করো।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nconst int* first_peak(const vector<int>& a) {\n    for (size_t i = 1; i + 1 < a.size(); i++) {\n        if (a[i] > a[i - 1] && a[i] > a[i + 1]) return &a[i];\n    }\n    return nullptr;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    if (const int* p = first_peak(a)) cout << *p << "\\n";\n    else cout << "NONE\\n";\n    return 0;\n}`,
        sampleStdin: '5\n1 4 2 8 3',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch16-p5',
        difficulty: 'Hard',
        title: 'Cyclic 3-Variable Reference Rotate',
        prompt: 'Given `a b c` and `k` right-rotations, rotate them cyclically using `void rot(long long& a, long long& b, long long& c)`.',
        banglaHint: 'প্রতিবার রোটেশনে `(a, b, c) -> (c, a, b)` এবং `k %= 3` করে O(1) ধাপে শেষ করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nvoid rot_right(long long& a, long long& b, long long& c) {\n    long long t = c; c = b; b = a; a = t;\n}\nint main() {\n    long long a, b, c, k; cin >> a >> b >> c >> k;\n    k %= 3;\n    for (int i = 0; i < k; i++) rot_right(a, b, c);\n    cout << a << " " << b << " " << c << "\\n";\n    return 0;\n}`,
        sampleStdin: '10 20 30 4',
        expectedOutput: '30 10 20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Zero-Copy Telemetry Slice Analyzer',
      description: 'Use `const vector<long long>&` and out-references to compute min, max, and count above average in one pass.',
      banglaGoal: 'কনস্ট রেফারেন্স ও আউট-রেফারেন্স ব্যবহার করে কপি ছাড়াই সেন্সর ডেটার মিনিমাম, ম্যাক্সিমাম ও যোগফল বের করো।',
      combinesChapters: "Ch 9, 11, 16",
      starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nvoid analyze(const vector<long long>& v, long long& mn, long long& mx, long long& total) {\n    mn = mx = v[0]; total = 0;\n    for (long long x : v) {\n        if (x < mn) mn = x;\n        if (x > mx) mx = x;\n        total += x;\n    }\n}\nint main() {\n    int n; cin >> n;\n    vector<long long> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    long long mn, mx, total;\n    analyze(v, mn, mx, total);\n    cout << mn << " " << mx << " " << total << "\\n";\n    return 0;\n}`,
      sampleStdin: '4\n10 25 5 40',
      expectedOutput: '5 40 80',
    },
    starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nvoid analyze(const vector<long long>& v, long long& mn, long long& mx, long long& total) {\n    mn = mx = v[0]; total = 0;\n    for (long long x : v) {\n        if (x < mn) mn = x;\n        if (x > mx) mx = x;\n        total += x;\n    }\n}\nint main() {\n    int n; cin >> n;\n    vector<long long> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    long long mn, mx, total;\n    analyze(v, mn, mx, total);\n    cout << mn << " " << mx << " " << total << "\\n";\n    return 0;\n}`,
    sampleStdin: '4\n10 25 5 40',
    expectedSampleOutput: '5 40 80',
    testCases: [
      { id: 'cpp16-t1', input: '4\n10 25 5 40', expectedOutput: '5 40 80' },
      { id: 'cpp16-t2', input: '3\n-5 0 5', expectedOutput: '-5 5 0', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'Dynamic Memory (Heap vs. Stack) & Smart Pointers',
    banglaTitle: 'ডাইনামিক মেমোরি (হিপ বনাম স্ট্যাক) ও স্মার্ট পয়েন্টার',
    subtitle: 'RAII ownership, unique_ptr, shared_ptr reference counting, and eliminating memory leaks',
    zeroIntuition: {
      plainEnglishStory:
        'C++ divides runtime memory into two primary regions: the fast Stack (fixed-size local frames destroyed automatically on scope exit) and the large flexible Heap (objects created dynamically at runtime). Calling raw `new` without a matching `delete` causes permanent memory leaks, while deleting twice corrupts the allocator.\n\nModern C++ solves this with RAII (Resource Acquisition Is Initialization) via `<memory>`: `std::unique_ptr<T>` owns a single heap object exclusively and destroys it automatically when leaving scope, while `std::shared_ptr<T>` keeps a thread-safe reference count and frees memory when the last owner drops.',
      asciiFlowchart:
        'Stack Frame [ ptr: unique_ptr<Node> ]  --owns-->  Heap [ Node { val: 99 } ]\n  scope exits }  =============================>  ~unique_ptr calls delete automatically!',
      pseudocode: ["auto item = make_unique<Item>(args) // zero manual delete","auto shared = make_shared<Item>(args) // refcount tracks owners"],
      banglaZeroToHero: {
        analogyTitle: 'হোটেল রুমের স্মার্ট কি-কার্ড: গেস্ট বেরোলেই রুম অটোমেটিক খালি',
        explanation:
          'সি++-এ স্ট্যাক মেমোরি খুব দ্রুত কিন্তু এর আকার সীমিত এবং ফাংশন শেষ হলেই স্ট্যাকের সব ডেটা মুছে যায়। যখন তোমার বড় আকারের ডেটা বা ফাংশনের বাইরেও টিকে থাকবে এমন অবজেক্ট লাগে, তখন হিপ মেমোরি ব্যবহার করতে হয়। আগে প্রোগ্রামাররা `new` দিয়ে হিপ মেমোরি নিত এবং কাজ শেষে হাতে `delete` লিখত, কিন্তু মাঝপথে রিটার্ন বা এরর ঘটলে `delete` বাদ পড়ে মেমোরি লিক হতো। আধুনিক সি++ এই ঝামেলা পুরোপুরি দূর করতে RAII নীতি এবং `<memory>` হেডারের স্মার্ট পয়েন্টার ব্যবহার করে। `std::make_unique<T>` একটি একক মালিকানার স্মার্ট পয়েন্টার তৈরি করে, যা নিজের স্কোপ `{}` শেষ হওয়া মাত্রই কোনো বাড়তি খরচ ছাড়াই হিপ মেমোরি স্বয়ংক্রিয়ভাবে ফ্রি করে দেয়। কোনো রিসোর্সকে একাধিক অবজেক্টের মধ্যে শেয়ার করতে হলে `std::make_shared<T>` ব্যবহার করা হয়, যা রেফারেন্স কাউন্ট গুনে রাখে এবং শেষ মালিক বিদায় নিলে তবেই মেমোরি মুছে দেয়। `unique_ptr`-কে কপি করা যায় না, তবে `std::move` দিয়ে মালিকানা আরেকজনের হাতে তুলে দেওয়া যায়। আজকের অধ্যায়ে তুমি হিপ বনাম স্ট্যাকের পার্থক্য ও লিক-মুক্ত স্মার্ট পয়েন্টার ব্যবহার আয়ত্ত করবে।',
        everydayExample: 'কোনো মিটিং রুমে স্মার্ট লাইট সেন্সর—একজন থাকলেও আলো জ্বলে, আর সর্বশেষ ব্যক্তি বেরিয়ে গেলে লাইট নিজেই বন্ধ হয়ে যায়।',
        keyTakeaways: [
          'আধুনিক সি++-এ কাঁচা `new`/`delete` এড়িয়ে সর্বদা `make_unique` বা `vector` ব্যবহার করো।',
          '`unique_ptr` কপি হয় না; মালিকানা হস্তান্তর করতে `std::move(ptr)` ব্যবহার করতে হয়।',
          'দুটি `shared_ptr` একে অপরকে ধরে রাখলে সার্কুলার লিক হয়—সেখানে একদিকে `weak_ptr` দাও।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'RAII Auto-Cleanup with unique_ptr',
        englishParagraphs: [
          'Constructing an object with `make_unique<Box>` runs its destructor automatically when the inner block `{ ... }` exits—zero manual `delete`.',
        ],
        banglaParagraphs: [
          'ইন্টার্নাল স্কোপ `{ ... }` শেষ হওয়া মাত্রই `unique_ptr` কীভাবে স্বয়ংক্রিয়ভাবে ডিস্ট্রাক্টর চালায় তা দেখো।',
        ],
        memoryDiagram: 'Stack unique_ptr -> Heap Box(42) -> scope exit -> ~Box()',
        code: `#include <iostream>\n#include <memory>\nusing namespace std;\nstruct Box {\n    int v;\n    Box(int x) : v(x) { cout << "open " << v << "\\n"; }\n    ~Box() { cout << "close " << v << "\\n"; }\n};\nint main() {\n    {\n        auto b = make_unique<Box>(42);\n        cout << "use " << b->v << "\\n";\n    }\n    cout << "done\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: 'open 42\nuse 42\nclose 42\ndone',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"        auto b = make_unique<Box>(42);","whatItMeans":"Allocates `Box` cleanly on heap wrapped in owning smart pointer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No `Box` exists on heap."},
          {"lineNumber":"Line 13","codeSnippet":"    }","whatItMeans":"Scope boundary triggers `~unique_ptr` which invokes `~Box()`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Destructor runs only at end of `main`."},
        ],
      },
      {
        id: 'cpp-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Transferring Ownership via std::move',
        englishParagraphs: [
          'Read `k`, build a `unique_ptr<int>`, move its ownership into another variable with `std::move`, and verify the original handle becomes null.',
        ],
        banglaParagraphs: [
          '`std::move` দিয়ে `unique_ptr`-এর মালিকানা হস্তান্তর করে আগের পয়েন্টারটি `nullptr` হয়েছে কি না দেখো।',
        ],
        memoryDiagram: 'p1 --move--> p2 (p1 becomes nullptr)',
        code: `#include <iostream>\n#include <memory>\n#include <utility>\nusing namespace std;\nint main() {\n    int k;\n    cin >> k;\n    auto p1 = make_unique<int>(k);\n    auto p2 = std::move(p1);\n    cout << (p1 == nullptr ? "empty" : "held") << " " << *p2 << "\\n";\n    return 0;\n}`,
        stdin: '99',
        expectedOutput: 'empty 99',
        lineByLine: [
          {"lineNumber":"Line 8","codeSnippet":"    auto p1 = make_unique<int>(k);","whatItMeans":"Allocates heap integer with sole owner `p1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`p1` undefined."},
          {"lineNumber":"Line 9","codeSnippet":"    auto p2 = std::move(p1);","whatItMeans":"Transfers sole heap ownership to `p2` and nulls `p1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Direct copy fails compilation."},
        ],
      },
      {
        id: 'cpp-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Shared Asset Handle Reference Counting',
        englishParagraphs: [
          'Multiple systems hold copies of a `shared_ptr<int>`, tracking active owners via `.use_count()` before automatic release.',
        ],
        banglaParagraphs: [
          'একাধিক মডিউল একই রিসোর্স ব্যবহার করলে `shared_ptr` কীভাবে `.use_count()` বাড়ায় এবং ব্লক শেষে কমায় তা দেখো।',
        ],
        memoryDiagram: 'shared_ptr refcount: 1 -> 2 -> 1 -> 0 (freed)',
        code: `#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    auto tex = make_shared<int>(512);\n    cout << tex.use_count() << "\\n";\n    {\n        auto copy_tex = tex;\n        cout << tex.use_count() << " " << *copy_tex << "\\n";\n    }\n    cout << tex.use_count() << "\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: '1\n2 512\n1',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"    auto tex = make_shared<int>(512);","whatItMeans":"Allocates control block + object in one heap allocation.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing shared handle."},
          {"lineNumber":"Line 8","codeSnippet":"        auto copy_tex = tex;","whatItMeans":"Increments atomic reference count from `1` to `2`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Refcount stays `1`."},
        ],
      },
      {
        id: 'cpp-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Heap Linked List Sum Without Manual delete',
        englishParagraphs: [
          'Linking nodes with `unique_ptr<Node>` builds dynamic chains cleanly while eliminating manual recursive `delete` boilerplate.',
        ],
        banglaParagraphs: [
          'লিঙ্কড লিস্টের প্রতিটি নোডকে `unique_ptr<Node>` দিয়ে যুক্ত করলে কোনো ম্যানুয়াল `delete` ছাড়াই মেমোরি নিরাপদ থাকে।',
        ],
        memoryDiagram: 'head -> unique_ptr(Node) -> unique_ptr(Node) -> nullptr',
        code: `#include <iostream>\n#include <memory>\nusing namespace std;\nstruct Node {\n    long long val;\n    unique_ptr<Node> next;\n};\nint main() {\n    int n; cin >> n;\n    unique_ptr<Node> head = nullptr;\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        head = make_unique<Node>(Node{x, std::move(head)});\n    }\n    long long sum = 0;\n    for (const Node* cur = head.get(); cur != nullptr; cur = cur->next.get()) sum += cur->val;\n    cout << sum << "\\n";\n    return 0;\n}`,
        stdin: '4\n3 7 2 8',
        expectedOutput: '20',
        lineByLine: [
          {"lineNumber":"Line 13","codeSnippet":"        head = make_unique<Node>(Node{x, std::move(head)});","whatItMeans":"Prepends node while moving prior list ownership safely.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"List remains empty."},
          {"lineNumber":"Line 16","codeSnippet":"    for (const Node* cur = head.get(); cur != nullptr; cur = cur->next.get()) sum += cur->val;","whatItMeans":"Iterates raw non-owning `.get()` observer pointers cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nodes are never summed."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 4","codeSnippet":"struct Box {","whatItMeans":"Defines custom struct with constructor/destructor lifecycle.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`Box` undeclared."},
      {"lineNumber":"Line 7","codeSnippet":"    ~Box() { cout << \"close \" << v << \"\\n\"; }","whatItMeans":"Runs deterministically when owning `unique_ptr` dies.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No destructor cleanup message prints."},
      {"lineNumber":"Line 11","codeSnippet":"        auto b = make_unique<Box>(42);","whatItMeans":"Creates single-owner heap object.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`b` undeclared."},
      {"lineNumber":"Line 12","codeSnippet":"        cout << \"use \" << b->v << \"\\n\";","whatItMeans":"Accesses heap member via `->`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Usage line omitted."},
    ],
    dryRunTable: [
      { step: 1, state: 'make_unique<Box>(42)', memoryOrStack: 'Heap Box(42)', note: 'Prints open 42' },
      { step: 2, state: 'b->v', memoryOrStack: '42', note: 'Prints use 42' },
      { step: 3, state: 'exit inner { }', memoryOrStack: '~unique_ptr fires', note: 'Prints close 42 automatically' },
      { step: 4, state: 'cout << "done"', memoryOrStack: 'Heap empty', note: 'Zero leaked bytes' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Copy a `unique_ptr`',
        brokenCode: 'auto a = make_unique<int>(5); auto b = a;',
        fixedCode: 'auto a = make_unique<int>(5); auto b = std::move(a);',
        whyItBreaks: '`unique_ptr` deletes its copy constructor to enforce strict single ownership.',
      },
      {
        title: 'Trap 2: Dereferencing a `unique_ptr` After `std::move`',
        brokenCode: 'auto b = std::move(a); cout << *a;',
        fixedCode: 'auto b = std::move(a); if (b) cout << *b;',
        whyItBreaks: 'Moving from `a` resets `a` to `nullptr`, so `*a` crashes immediately.',
      },
      {
        title: 'Trap 3: Calling `delete` on `.get()` Borrowed From Smart Pointer',
        brokenCode: 'int* raw = p.get(); delete raw;',
        fixedCode: '// never delete p.get(); let unique_ptr own lifetime',
        whyItBreaks: 'Smart pointer runs `delete` a second time on scope exit causing double-free corruption.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch17-p1',
        difficulty: 'Easy',
        title: 'Unique Heap Counter Increment',
        prompt: 'Allocate an `int` on the heap with `make_unique`, add `10` via `*p += 10`, and print the result.',
        banglaHint: '`auto p = make_unique<int>(n); *p += 10;` লিখো।',
        starterCode: `#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    auto p = make_unique<int>(n);\n    *p += 10;\n    cout << *p << "\\n";\n    return 0;\n}`,
        sampleStdin: '25',
        expectedOutput: '35',
      },
      {
        id: 'cpp-ch17-p2',
        difficulty: 'Easy',
        title: 'Shared Pointer Observer Count',
        prompt: 'Create a `shared_ptr<int>`, push two more handles into a `vector`, and print `.use_count()`.',
        banglaHint: '`vector<shared_ptr<int>> v = {p, p};` নিলে `p.use_count()` ৩ হবে।',
        starterCode: `#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\nint main() {\n    int x; cin >> x;\n    auto p = make_shared<int>(x);\n    vector<shared_ptr<int>> v = {p, p};\n    cout << p.use_count() << " " << *v[1] << "\\n";\n    return 0;\n}`,
        sampleStdin: '7',
        expectedOutput: '3 7',
      },
      {
        id: 'cpp-ch17-p3',
        difficulty: 'Medium',
        title: 'Dynamic Unique Array Sum',
        prompt: 'Use `make_unique<long long[]>(n)` to allocate a dynamic heap buffer of size `n`, read values, and print their sum.',
        banglaHint: '`auto arr = make_unique<long long[]>(n);` সরাসরি `arr[i]` ইনডেক্স সমর্থন করে।',
        starterCode: `#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    auto arr = make_unique<long long[]>(n);\n    long long sum = 0;\n    for (int i = 0; i < n; i++) { cin >> arr[i]; sum += arr[i]; }\n    cout << sum << "\\n";\n    return 0;\n}`,
        sampleStdin: '4\n2 4 6 8',
        expectedOutput: '20',
      },
      {
        id: 'cpp-ch17-p4',
        difficulty: 'Medium',
        title: 'Weak Pointer Safe Lock',
        prompt: 'Verify `weak_ptr<int>` with `.lock()` before and after the owning `shared_ptr` resets.',
        banglaHint: '`if (auto s = wp.lock())` ব্লক চেক করে ডেটা জীবিত আছে কি না দেখো।',
        starterCode: `#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    auto sp = make_shared<int>(88);\n    weak_ptr<int> wp = sp;\n    cout << (wp.lock() ? "alive " : "dead ");\n    sp.reset();\n    cout << (wp.lock() ? "alive" : "dead") << "\\n";\n    return 0;\n}`,
        sampleStdin: '',
        expectedOutput: 'alive dead',
      },
      {
        id: 'cpp-ch17-p5',
        difficulty: 'Hard',
        title: 'Binary Tree Heap Cleanup via unique_ptr',
        prompt: 'Insert `n` integers into a small binary search tree owned by `unique_ptr<Node>` and print the in-order minimum and maximum.',
        banglaHint: 'বাম-সর্বনিম্ন ও ডান-সর্বোচ্চ নোড `.get()` দিয়ে খুঁজে প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <memory>\nusing namespace std;\nstruct Node {\n    int v;\n    unique_ptr<Node> l, r;\n    Node(int x) : v(x) {}\n};\nvoid insert(unique_ptr<Node>& root, int x) {\n    if (!root) { root = make_unique<Node>(x); return; }\n    if (x < root->v) insert(root->l, x); else insert(root->r, x);\n}\nint main() {\n    int n; cin >> n;\n    unique_ptr<Node> root;\n    for (int i = 0; i < n; i++) { int x; cin >> x; insert(root, x); }\n    const Node *lo = root.get(), *hi = root.get();\n    while (lo->l) lo = lo->l.get();\n    while (hi->r) hi = hi->r.get();\n    cout << lo->v << " " << hi->v << "\\n";\n    return 0;\n}`,
        sampleStdin: '5\n10 4 15 2 20',
        expectedOutput: '2 20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Leak-Free Task Queue with Ownership Transfer',
      description: 'Allocate tasks via `make_unique<Task>`, move them into a queue vector, and aggregate total priority.',
      banglaGoal: '`make_unique` ও `std::move` দিয়ে হিপ টাস্ক কিউ বানিয়ে মোট প্রায়োরিটি হিসাব করো।',
      combinesChapters: "Ch 11, 16, 17",
      starterCode: `#include <iostream>\n#include <memory>\n#include <vector>\n#include <string>\nusing namespace std;\nstruct Task { string name; int prio; };\nint main() {\n    int n; cin >> n;\n    vector<unique_ptr<Task>> q;\n    for (int i = 0; i < n; i++) {\n        string name; int p; cin >> name >> p;\n        auto t = make_unique<Task>(Task{name, p});\n        q.push_back(std::move(t));\n    }\n    int total = 0;\n    for (const auto& t : q) total += t->prio;\n    cout << q.size() << " " << total << "\\n";\n    return 0;\n}`,
      sampleStdin: '3\nbuild 5\ntest 3\nship 7',
      expectedOutput: '3 15',
    },
    starterCode: `#include <iostream>\n#include <memory>\n#include <vector>\n#include <string>\nusing namespace std;\nstruct Task { string name; int prio; };\nint main() {\n    int n; cin >> n;\n    vector<unique_ptr<Task>> q;\n    for (int i = 0; i < n; i++) {\n        string name; int p; cin >> name >> p;\n        auto t = make_unique<Task>(Task{name, p});\n        q.push_back(std::move(t));\n    }\n    int total = 0;\n    for (const auto& t : q) total += t->prio;\n    cout << q.size() << " " << total << "\\n";\n    return 0;\n}`,
    sampleStdin: '3\nbuild 5\ntest 3\nship 7',
    expectedSampleOutput: '3 15',
    testCases: [
      { id: 'cpp17-t1', input: '3\nbuild 5\ntest 3\nship 7', expectedOutput: '3 15' },
      { id: 'cpp17-t2', input: '2\na 10\nb 20', expectedOutput: '2 30', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'Structs, Classes, Encapsulation & Invariants in C++',
    banglaTitle: 'স্ট্রাক্ট, ক্লাস, এনক্যাপসুলেশন ও কনস্ট্রাক্টর (C++)',
    subtitle: 'struct vs class, member initializer lists, const methods, and private invariants',
    zeroIntuition: {
      plainEnglishStory:
        'In C++, `struct` and `class` are nearly identical blueprints for bundling data fields and behavior methods together; their only default difference is visibility (`struct` defaults members to `public`, whereas `class` defaults them to `private`).\n\nEncapsulation protects class invariants—like keeping a bank balance non-negative or a bounding box width positive—by hiding raw fields under `private:` and exposing validated `public:` methods plus member initializer lists (`BankAccount(long long b) : balance_(b) {}`). Marking getter methods `const` guarantees callers they will never mutate object state.',
      asciiFlowchart:
        'class Wallet {\n  private: long long balance_;        // protected invariant (>= 0)\n  public:  Wallet(long long b);       // initializer list\n           bool withdraw(long long);  // validated mutation\n           long long balance() const; // read-only promise\n}',
      pseudocode: ["class BoundedCounter:","private val, maxVal","constructor(v, m): val(min(v, m)), maxVal(m)","inc(d): val = min(maxVal, val + d)"],
      banglaZeroToHero: {
        analogyTitle: 'এটিএম মেশিন: ভেতরের টাকা লুকানো (`private`), শুধু নিরাপদ বোতাম (`public`) বাইরে খোলা',
        explanation:
          'সি++-এ `struct` এবং `class` দুটোই সম্পর্কিত ডেটা ও ফাংশনকে একটি একক ইউনিটে বেঁধে রাখে; পার্থক্য শুধু এতটুকু যে `struct`-এ সদস্যগুলো ডিফল্টভাবে `public` এবং `class`-এ `private` হয়। এনক্যাপসুলেশন মানে অবজেক্টের ভেতরের সংবেদনশীল ডেটাকে `private:` সেকশনে তালাবদ্ধ করে রাখা যেন বাইরের কোড ভুল করে অবৈধ মান বসিয়ে দিতে না পারে। যেমন একটি ব্যাংক অ্যাকাউন্টের ব্যালেন্স কখনো ঋণাত্মক হওয়া উচিত নয়—তাই `balance_` থাকবে `private`, আর টাকা তোলার `withdraw()` মেথড থাকবে `public` যা আগে ব্যালেন্স যাচাই করবে। কনস্ট্রাক্টরে ডেটা সেট করার সেরা উপায় হলো মেম্বার ইনিশিয়ালাইজার লিস্ট (`Wallet(long long b) : balance_(b) {}`), কারণ এতে প্রথমে ডিফল্ট কনস্ট্রাক্টর চালিয়ে আবার অ্যাসাইন করার বাড়তি খরচ হয় না। যে মেথডগুলো অবজেক্টের কোনো ডেটা বদলায় না, তাদের শেষে অবশ্যই `const` লিখতে হবে যাতে `const Wallet&` থেকেও সেগুলো কল করা যায়। বাস্তবে সাধারণ ডেটা হোল্ডারের (যেমন `Point { x, y }`) জন্য `struct` আর অভ্যন্তরীণ নিয়ম রক্ষা করতে হয় এমন অবজেক্টের জন্য `class` ব্যবহার করা হয়। আজকের অধ্যায়ে কনস্ট্রাক্টর, এনক্যাপসুলেশন ও `const`-কারেক্টনেস হাতে-কলমে শিখবে।',
        everydayExample: 'গাড়ির ইঞ্জিন বনেটের নিচে (`private`) সুরক্ষিত থাকে, আর ড্রাইভার কেবল স্টিয়ারিং ও প্যাডেল (`public`) দিয়ে নিয়ন্ত্রিতভাবে গাড়ি চালায়।',
        keyTakeaways: [
          '`struct` ও `class`-এর একমাত্র ভাষাগত পার্থক্য ডিফল্ট অ্যাক্সেস স্পেসিফায়ার (`public` বনাম `private`)।',
          'কনস্ট্রাক্টরে মেম্বার ইনিশিয়ালাইজার লিস্ট (`: field(val)`) ব্যবহার করলে `const` ও রেফারেন্স সদস্যও ইনিশিয়ালাইজ করা যায়।',
          'রিড-অনলি গেটার ফাংশনের শেষে সর্বদা `const` যুক্ত করো যাতে `const T&` প্যারামিটার থেকে কল করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch18-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Encapsulated Counter Class with Initializer List',
        englishParagraphs: [
          'Protect a `private` count invariant (`>= 0`) inside a `class`, using a member initializer list and a `const` getter.',
        ],
        banglaParagraphs: [
          '`private` ফিল্ড, মেম্বার ইনিশিয়ালাইজার লিস্ট এবং `const` গেটারসহ একটি সুরক্ষিত `Counter` ক্লাস দেখো।',
        ],
        memoryDiagram: 'Counter { private: val_ } -> add(), sub_safe(), get() const',
        code: `#include <iostream>\nusing namespace std;\nclass Counter {\nprivate:\n    int val_;\npublic:\n    Counter(int start) : val_(start < 0 ? 0 : start) {}\n    void add(int d) { if (d > 0) val_ += d; }\n    bool sub(int d) { if (d > val_) return false; val_ -= d; return true; }\n    int get() const { return val_; }\n};\nint main() {\n    Counter c(10);\n    c.add(5);\n    c.sub(4);\n    c.sub(50);\n    cout << c.get() << "\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: '11',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"    Counter(int start) : val_(start < 0 ? 0 : start) {}","whatItMeans":"Clamps initial value via initializer list so invariant holds from birth.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Class cannot construct with start argument."},
          {"lineNumber":"Line 9","codeSnippet":"    bool sub(int d) { if (d > val_) return false; val_ -= d; return true; }","whatItMeans":"Guards against negative balance before mutating `val_`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Invalid subtraction could drive count negative."},
          {"lineNumber":"Line 10","codeSnippet":"    int get() const { return val_; }","whatItMeans":"`const` qualifier guarantees read-only access.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cannot read `c.get()` on `const Counter&`."},
        ],
      },
      {
        id: 'cpp-ch18-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Bank Wallet Transaction Processor',
        englishParagraphs: [
          'Process `D amt` (deposit) and `W amt` (withdraw if funds suffice) commands from stdin via an encapsulated `Wallet` class.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে ডিপোজিট ও উইথড্র কমান্ড পড়ে এনক্যাপসুলেটেড `Wallet` ক্লাসের মাধ্যমে নিরাপদ ব্যালেন্স বের করো।',
        ],
        memoryDiagram: 'Wallet(balance_) validates D/W operations',
        code: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Wallet {\n    long long bal_;\npublic:\n    explicit Wallet(long long init) : bal_(init) {}\n    void deposit(long long x) { if (x > 0) bal_ += x; }\n    void withdraw(long long x) { if (x > 0 && x <= bal_) bal_ -= x; }\n    long long balance() const { return bal_; }\n};\nint main() {\n    long long init; int q;\n    cin >> init >> q;\n    Wallet w(init);\n    while (q--) {\n        string op; long long x; cin >> op >> x;\n        if (op == "D") w.deposit(x); else w.withdraw(x);\n    }\n    cout << w.balance() << "\\n";\n    return 0;\n}`,
        stdin: '100 3\nD 50\nW 120\nW 80',
        expectedOutput: '30',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"    explicit Wallet(long long init) : bal_(init) {}","whatItMeans":"`explicit` prevents accidental implicit numeric conversion to `Wallet`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Constructor missing."},
          {"lineNumber":"Line 9","codeSnippet":"    void withdraw(long long x) { if (x > 0 && x <= bal_) bal_ -= x; }","whatItMeans":"Rejects overdraft transaction `W 80` cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Overdraft corrupts invariant."},
        ],
      },
      {
        id: 'cpp-ch18-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'POD Geometry Struct with Custom Method & Comparator',
        englishParagraphs: [
          'Bundle `(x, y)` coordinates in a clean `struct Point`, computing squared Euclidean distance without floating-point rounding loss.',
        ],
        banglaParagraphs: [
          '`struct Point`-এ মেথড যোগ করে দুই বিন্দুর বর্গ দূরত্ব (squared distance) ইন্টিজারেই নিখুঁতভাবে বের করো।',
        ],
        memoryDiagram: 'struct Point { long long x, y; dist2(const Point&) const; }',
        code: `#include <iostream>\nusing namespace std;\nstruct Point {\n    long long x, y;\n    long long dist2(const Point& other) const {\n        long long dx = x - other.x, dy = y - other.y;\n        return dx * dx + dy * dy;\n    }\n};\nint main() {\n    Point a, b;\n    cin >> a.x >> a.y >> b.x >> b.y;\n    cout << a.dist2(b) << "\\n";\n    return 0;\n}`,
        stdin: '1 2 4 6',
        expectedOutput: '25',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"    long long dist2(const Point& other) const {","whatItMeans":"Reads `other` by const ref and promises not to mutate `*this`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Distance helper missing."},
        ],
      },
      {
        id: 'cpp-ch18-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Fixing Missing const Method Qualification',
        englishParagraphs: [
          'Calling a non-`const` getter on a `const Student&` parameter fails to compile. Always mark pure accessors `const`.',
        ],
        banglaParagraphs: [
          '`const Student&` প্যারামিটার থেকে মেথড কল করতে হলে মেথডের শেষে `const` লেখা বাধ্যতামূলক।',
        ],
        memoryDiagram: 'const Student& s -> requires int score() const',
        code: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Student {\n    string name_;\n    int score_;\npublic:\n    Student(string n, int s) : name_(std::move(n)), score_(s) {}\n    const string& name() const { return name_; }\n    int score() const { return score_; }\n};\nvoid print_badge(const Student& s) {\n    cout << s.name() << ":" << s.score() << "\\n";\n}\nint main() {\n    Student s("Anik", 95);\n    print_badge(s);\n    return 0;\n}`,
        stdin: '',
        expectedOutput: 'Anik:95',
        lineByLine: [
          {"lineNumber":"Line 9","codeSnippet":"    const string& name() const { return name_; }","whatItMeans":"Allows zero-copy read access on const references.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Compile error inside `print_badge`."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 3","codeSnippet":"class Counter {","whatItMeans":"Starts private-by-default blueprint.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Class undefined."},
      {"lineNumber":"Line 7","codeSnippet":"    Counter(int start) : val_(start < 0 ? 0 : start) {}","whatItMeans":"Validates and initializes `val_`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Unvalidated or uninitialized `val_`."},
      {"lineNumber":"Line 9","codeSnippet":"    bool sub(int d) { if (d > val_) return false; val_ -= d; return true; }","whatItMeans":"Enforces `val_ >= 0` invariant.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Negative counts become possible."},
      {"lineNumber":"Line 10","codeSnippet":"    int get() const { return val_; }","whatItMeans":"Const-qualified read accessor.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Fails on const instances."},
    ],
    dryRunTable: [
      { step: 1, state: 'Counter c(10)', memoryOrStack: 'val_ = 10', note: 'Initializer list sets 10' },
      { step: 2, state: 'c.add(5)', memoryOrStack: 'val_ = 15', note: '5 > 0 accepted' },
      { step: 3, state: 'c.sub(4)', memoryOrStack: 'val_ = 11', note: 'Returns true' },
      { step: 4, state: 'c.sub(50)', memoryOrStack: 'val_ = 11', note: 'Rejected cleanly; prints 11' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Forgetting Trailing Semicolon After Class/Struct Definition',
        brokenCode: 'struct Node { int x; }\nint main() {}',
        fixedCode: 'struct Node { int x; };\nint main() {}',
        whyItBreaks: 'C++ requires `;` right after `}` of any `class` or `struct` declaration.',
      },
      {
        title: 'Trap 2: Omitting `const` on Getter Methods',
        brokenCode: 'int getVal() { return val_; } // fails on const Box& b',
        fixedCode: 'int getVal() const { return val_; }',
        whyItBreaks: 'Passing an object by `const T&` forbids calling any non-`const` member function.',
      },
      {
        title: 'Trap 3: Shadowing Member Fields in Constructor Body',
        brokenCode: 'Box(int w) { w = w; } // leaves member garbage!',
        fixedCode: 'Box(int w) : w_(w) {}',
        whyItBreaks: 'Parameter `w` shadows member `w`; member initializer list binds unambiguously.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch18-p1',
        difficulty: 'Easy',
        title: 'Rectangle Area & Perimeter Class',
        prompt: 'Encapsulate positive `w` and `h` inside `class Rect` (clamping `<= 0` to `1`) and print `area perimeter`.',
        banglaHint: 'কনস্ট্রাক্টর ইনিশিয়ালাইজার লিস্টে `max(1LL, w)` ব্যবহার করে কনস্ট মেথড লেখো।',
        starterCode: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nclass Rect {\n    long long w_, h_;\npublic:\n    Rect(long long w, long long h) : w_(max(1LL, w)), h_(max(1LL, h)) {}\n    long long area() const { return w_ * h_; }\n    long long perim() const { return 2 * (w_ + h_); }\n};\nint main() {\n    long long w, h; cin >> w >> h;\n    Rect r(w, h);\n    cout << r.area() << " " << r.perim() << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 8',
        expectedOutput: '40 26',
      },
      {
        id: 'cpp-ch18-p2',
        difficulty: 'Easy',
        title: 'Bounded Thermostat Regulator',
        prompt: 'Keep temperature clamped in `[16, 30]` across `q` delta steps (`+d` or `-d`) and print final temperature.',
        banglaHint: '`temp_ = clamp(temp_ + d, 16, 30)` লিখে ইনভ্যারিয়েন্ট রক্ষা করো।',
        starterCode: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nclass Thermostat {\n    int temp_;\npublic:\n    Thermostat(int t) : temp_(clamp(t, 16, 30)) {}\n    void adjust(int d) { temp_ = clamp(temp_ + d, 16, 30); }\n    int read() const { return temp_; }\n};\nint main() {\n    int t, q; cin >> t >> q;\n    Thermostat th(t);\n    while (q--) { int d; cin >> d; th.adjust(d); }\n    cout << th.read() << "\\n";\n    return 0;\n}`,
        sampleStdin: '22 3\n12 -5 -20',
        expectedOutput: '16',
      },
      {
        id: 'cpp-ch18-p3',
        difficulty: 'Medium',
        title: 'Vector of Structs Custom Sort',
        prompt: 'Read `n` students `(name, score)` into `struct Item` and sort descending by `score`, breaking ties alphabetically by `name`.',
        banglaHint: 'ল্যাম্বডা কম্পারেটরে `a.score != b.score ? a.score > b.score : a.name < b.name` দাও।',
        starterCode: `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nstruct Item { string name; int score; };\nint main() {\n    int n; cin >> n;\n    vector<Item> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i].name >> v[i].score;\n    sort(v.begin(), v.end(), [](const Item& a, const Item& b) {\n        return a.score != b.score ? a.score > b.score : a.name < b.name;\n    });\n    cout << v[0].name << " " << v[0].score << "\\n";\n    return 0;\n}`,
        sampleStdin: '3\nRafi 90\nAnik 95\nZara 95',
        expectedOutput: 'Anik 95',
      },
      {
        id: 'cpp-ch18-p4',
        difficulty: 'Medium',
        title: 'Encapsulated Min-Max Tracker Class',
        prompt: 'Build `class Tracker` accepting `push(long long x)` calls and exposing `span() const` (`max - min`).',
        banglaHint: 'প্রথম এলিমেন্টের জন্য `has_` ফ্ল্যাগ রেখে `mn_` ও `mx_` আপডেট করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nclass Tracker {\n    bool has_ = false;\n    long long mn_ = 0, mx_ = 0;\npublic:\n    void push(long long x) {\n        if (!has_) { mn_ = mx_ = x; has_ = true; }\n        else { if (x < mn_) mn_ = x; if (x > mx_) mx_ = x; }\n    }\n    long long span() const { return has_ ? mx_ - mn_ : 0; }\n};\nint main() {\n    int n; cin >> n;\n    Tracker tr;\n    for (int i = 0; i < n; i++) { long long x; cin >> x; tr.push(x); }\n    cout << tr.span() << "\\n";\n    return 0;\n}`,
        sampleStdin: '5\n4 10 -2 7 3',
        expectedOutput: '12',
      },
      {
        id: 'cpp-ch18-p5',
        difficulty: 'Hard',
        title: 'Immutable Rational Fraction Class with GCD Reduction',
        prompt: 'Construct reduced `Fraction(num, den)` using `std::gcd`, implement `add(const Fraction&)` returning a reduced result.',
        banglaHint: '`g = std::gcd(abs(n), abs(d))` দিয়ে ভাগ করে লঘিষ্ঠ আকারে প্রকাশ করো।',
        starterCode: `#include <iostream>\n#include <numeric>\nusing namespace std;\nclass Fraction {\n    long long n_, d_;\npublic:\n    Fraction(long long n, long long d) {\n        long long g = std::gcd(n < 0 ? -n : n, d < 0 ? -d : d);\n        n_ = n / g; d_ = d / g;\n    }\n    Fraction add(const Fraction& o) const {\n        return Fraction(n_ * o.d_ + o.n_ * d_, d_ * o.d_);\n    }\n    void print() const { cout << n_ << "/" << d_ << "\\n"; }\n};\nint main() {\n    long long a, b, c, d; cin >> a >> b >> c >> d;\n    Fraction f1(a, b), f2(c, d);\n    f1.add(f2).print();\n    return 0;\n}`,
        sampleStdin: '1 6 1 3',
        expectedOutput: '1/2',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Encapsulated Inventory Ledger',
      description: 'Model products in an encapsulated class enforcing non-negative stock across restock and sale operations.',
      banglaGoal: 'প্রাইভেট স্টক ইনভ্যারিয়েন্টসহ প্রোডাক্ট লেজার ক্লাস তৈরি করো।',
      combinesChapters: "Ch 11, 16, 18",
      starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Stock {\n    int qty_;\npublic:\n    explicit Stock(int q) : qty_(q < 0 ? 0 : q) {}\n    void add(int k) { if (k > 0) qty_ += k; }\n    bool sell(int k) { if (k <= 0 || k > qty_) return false; qty_ -= k; return true; }\n    int count() const { return qty_; }\n};\nint main() {\n    int init, q; cin >> init >> q;\n    Stock st(init);\n    int ok = 0;\n    while (q--) {\n        string op; int k; cin >> op >> k;\n        if (op == "ADD") st.add(k);\n        else if (st.sell(k)) ok++;\n    }\n    cout << st.count() << " " << ok << "\\n";\n    return 0;\n}`,
      sampleStdin: '10 3\nSELL 4\nSELL 9\nADD 5',
      expectedOutput: '11 1',
    },
    starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Stock {\n    int qty_;\npublic:\n    explicit Stock(int q) : qty_(q < 0 ? 0 : q) {}\n    void add(int k) { if (k > 0) qty_ += k; }\n    bool sell(int k) { if (k <= 0 || k > qty_) return false; qty_ -= k; return true; }\n    int count() const { return qty_; }\n};\nint main() {\n    int init, q; cin >> init >> q;\n    Stock st(init);\n    int ok = 0;\n    while (q--) {\n        string op; int k; cin >> op >> k;\n        if (op == "ADD") st.add(k);\n        else if (st.sell(k)) ok++;\n    }\n    cout << st.count() << " " << ok << "\\n";\n    return 0;\n}`,
    sampleStdin: '10 3\nSELL 4\nSELL 9\nADD 5',
    expectedSampleOutput: '11 1',
    testCases: [
      { id: 'cpp18-t1', input: '10 3\nSELL 4\nSELL 9\nADD 5', expectedOutput: '11 1' },
      { id: 'cpp18-t2', input: '5 2\nSELL 5\nSELL 1', expectedOutput: '0 1', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'Inheritance, Virtual Polymorphism & Interfaces in C++',
    banglaTitle: 'ইনহেরিটেন্স, ভার্চুয়াল পলিমরফিজম ও ইন্টারফেস (C++)',
    subtitle: 'Pure virtual (= 0) abstract interfaces, override safety, virtual destructors, and dynamic dispatch',
    zeroIntuition: {
      plainEnglishStory:
        'Polymorphism lets one unified loop process diverse concrete types (`Circle`, `Rect`) through a shared base pointer or reference (`const Shape&` or `unique_ptr<Shape>`). In C++, interfaces are expressed as abstract classes containing pure virtual functions (`virtual double area() const = 0;`).\n\nTwo rules keep C++ inheritance rock-solid: always mark derived implementations with `override` so typos fail at compile time, and ALWAYS declare `virtual ~Base() = default;` on any polymorphic base class—otherwise deleting a derived object through a `Base*` or `unique_ptr<Base>` leaks derived fields.',
      asciiFlowchart:
        'class Shape { virtual long long area() const = 0; virtual ~Shape() = default; }\n    ^                         ^\nCircle : Shape            Rect : Shape\nvector<unique_ptr<Shape>> -> dispatches s->area() dynamically via vtable!',
      pseudocode: ["struct Shape { virtual long long area() const = 0; virtual ~Shape() = default; }","for s in shapes: total += s->area()"],
      banglaZeroToHero: {
        analogyTitle: 'একই সার্বজনীন প্লাগ-ইন সকেট (`Shape`) যেখানে ভিন্ন ভিন্ন ডিভাইস বসে',
        explanation:
          'ইনহেরিটেন্স মানে একটি বেস ক্লাসের সাধারণ কাঠামো ব্যবহার করে নতুন সাব-ক্লাস তৈরি করা, আর পলিমরফিজম মানে একই ইন্টারফেস কলের মাধ্যমে রানটাইমে ভিন্ন ভিন্ন সাব-ক্লাসের আচরণ চালানো। সি++-এ জাভার মতো আলাদা `interface` কিওয়ার্ড নেই; এর বদলে আমরা এমন একটি বেস ক্লাস লিখি যার ফাংশনগুলোতে `virtual ... = 0;` (pure virtual) লেখা থাকে। সাব-ক্লাসে সেই ফাংশনটি বাস্তবায়ন করার সময় শেষে অবশ্যই `override` লিখবে—এতে নামের বানান বা প্যারামিটার ভুল হলে কম্পাইলার সাথে সাথে ধরিয়ে দেয়। পলিমরফিক বেস ক্লাসে `virtual ~Base() = default;` ভার্চুয়াল ডিস্ট্রাক্টর লেখা বাধ্যতামূলক, নাহলে `unique_ptr<Base>` ধ্বংস হওয়ার সময় ডিরাইভড ক্লাসের ডিস্ট্রাক্টর চলবে না এবং মেমোরি লিক হবে! মনে রাখবে: `vector<Base>`-এ সরাসরি ভ্যালু রাখলে অবজেক্ট স্লাইসিং (Object Slicing) হয়ে সাব-ক্লাসের ডেটা কেটে যায়; তাই পলিমরফিক কালেকশনে সর্বদা `vector<unique_ptr<Base>>` বা রেফারেন্স `const Base&` ব্যবহার করতে হয়। আধুনিক সি++-এ একাধিক ইন্টারফেস বা ডাইনামিক ডিসপ্যাচের এই নিয়মগুলো মেনে কোড লিখলে সিস্টেম খুব এক্সটেনসিবল হয়।',
        everydayExample: 'একটি `PaymentMethod` ইন্টারফেসে `pay()` মেথড থাকলে ইউজার `Bkash`, `Card` বা `Cash` যেটিই সিলেক্ট করুক না কেন চেকআউট একই `method->pay()` কল করে।',
        keyTakeaways: [
          'সব পলিমরফিক বেস ক্লাসে অবশ্যই `virtual ~Base() = default;` রাখো।',
          'সাব-ক্লাস মেথডে সর্বদা `override` ব্যবহার করে সাইলেন্সড সিগনেচার বাগ আটকাও।',
          'Object Slicing এড়াতে পলিমরফিক ভেক্টরে `vector<unique_ptr<Base>>` ব্যবহার করো, সরাসরি `vector<Base>` নয়।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch19-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Abstract Interface + Dynamic Dispatch via unique_ptr',
        englishParagraphs: [
          'Store mixed `Rect` and `Square` instances inside `vector<unique_ptr<Shape>>` and sum their polymorphic `area()` calls cleanly.',
        ],
        banglaParagraphs: [
          '`vector<unique_ptr<Shape>>`-এ ভিন্ন ভিন্ন শেপ রেখে ভার্চুয়াল `area()` কল করে মোট ক্ষেত্রফল বের করো।',
        ],
        memoryDiagram: 'vtable dispatch: s->area() calls Rect::area or Square::area',
        code: `#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\nstruct Shape {\n    virtual long long area() const = 0;\n    virtual ~Shape() = default;\n};\nstruct Rect : Shape {\n    long long w, h;\n    Rect(long long w, long long h) : w(w), h(h) {}\n    long long area() const override { return w * h; }\n};\nstruct Square : Shape {\n    long long a;\n    explicit Square(long long a) : a(a) {}\n    long long area() const override { return a * a; }\n};\nint main() {\n    vector<unique_ptr<Shape>> v;\n    v.push_back(make_unique<Rect>(3, 4));\n    v.push_back(make_unique<Square>(5));\n    long long sum = 0;\n    for (const auto& s : v) sum += s->area();\n    cout << sum << "\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: '37',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"    virtual long long area() const = 0;","whatItMeans":"Declares pure virtual interface contract.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Derived calls cannot dispatch polymorphically through `Shape`."},
          {"lineNumber":"Line 7","codeSnippet":"    virtual ~Shape() = default;","whatItMeans":"Ensures derived destructors execute when `unique_ptr<Shape>` dies.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Undefined behavior deleting derived through base pointer."},
          {"lineNumber":"Line 12","codeSnippet":"    long long area() const override { return w * h; }","whatItMeans":"Compiler checks signature matches `Shape::area` exactly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`Rect` stays abstract and fails instantiation."},
        ],
      },
      {
        id: 'cpp-ch19-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Polymorphic Discount Pricing Engine',
        englishParagraphs: [
          'Parse discount rules (`FLAT x` or `PCT p`) from stdin into a `unique_ptr<Discount>` and apply `apply(price)` uniformly.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে ডিসকাউন্ট ধরন পড়ে `unique_ptr<Discount>` পলিমরফিক অবজেক্ট দিয়ে ফাইনাল দাম বের করো।',
        ],
        memoryDiagram: 'Discount* -> FlatDiscount | PercentDiscount',
        code: `#include <iostream>\n#include <memory>\n#include <string>\nusing namespace std;\nstruct Discount {\n    virtual long long apply(long long p) const = 0;\n    virtual ~Discount() = default;\n};\nstruct Flat : Discount {\n    long long d; Flat(long long d) : d(d) {}\n    long long apply(long long p) const override { return p > d ? p - d : 0; }\n};\nstruct Pct : Discount {\n    long long k; Pct(long long k) : k(k) {}\n    long long apply(long long p) const override { return p - (p * k) / 100; }\n};\nint main() {\n    long long price, val; string kind;\n    cin >> price >> kind >> val;\n    unique_ptr<Discount> rule;\n    if (kind == "FLAT") rule = make_unique<Flat>(val);\n    else rule = make_unique<Pct>(val);\n    cout << rule->apply(price) << "\\n";\n    return 0;\n}`,
        stdin: '200 PCT 15',
        expectedOutput: '170',
        lineByLine: [
          {"lineNumber":"Line 20","codeSnippet":"    unique_ptr<Discount> rule;","whatItMeans":"Holds any concrete discount strategy behind single interface handle.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Must branch manually at every call site."},
          {"lineNumber":"Line 23","codeSnippet":"    cout << rule->apply(price) << \"\\n\";","whatItMeans":"Dispatches concrete strategy via vtable at runtime.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No discounted output prints."},
        ],
      },
      {
        id: 'cpp-ch19-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Notification Channel Pipeline via Const Reference',
        englishParagraphs: [
          'Pass diverse `Notifier` subclasses into a generic `dispatch(const Notifier&, msg)` function without copying or slicing.',
        ],
        banglaParagraphs: [
          '`const Notifier&` রেফারেন্সের মাধ্যমে সাব-ক্লাস অবজেক্ট ফাংশনে পাঠিয়ে স্লাইসিং ছাড়াই পলিমরফিজম চালাও।',
        ],
        memoryDiagram: 'dispatch(const Notifier& n) -> calls n.send(msg)',
        code: `#include <iostream>\n#include <string>\nusing namespace std;\nstruct Notifier {\n    virtual void send(const string& msg) const = 0;\n    virtual ~Notifier() = default;\n};\nstruct Email : Notifier {\n    void send(const string& m) const override { cout << "EMAIL:" << m << "\\n"; }\n};\nstruct Sms : Notifier {\n    void send(const string& m) const override { cout << "SMS:" << m << "\\n"; }\n};\nvoid dispatch(const Notifier& ch, const string& msg) { ch.send(msg); }\nint main() {\n    string msg; cin >> msg;\n    Email e; Sms s;\n    dispatch(e, msg);\n    dispatch(s, msg);\n    return 0;\n}`,
        stdin: 'OTP42',
        expectedOutput: 'EMAIL:OTP42\nSMS:OTP42',
        lineByLine: [
          {"lineNumber":"Line 14","codeSnippet":"void dispatch(const Notifier& ch, const string& msg) { ch.send(msg); }","whatItMeans":"Accepts any `Notifier` subtype by const reference without slicing.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Each channel would require separate dispatch overloads."},
        ],
      },
      {
        id: 'cpp-ch19-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Preventing Object Slicing on Derived Assignments',
        englishParagraphs: [
          'Copying a `Derived` into a by-value `Base` strips all derived fields and resets its vptr. Use `const Base&` or `unique_ptr<Base>` instead.',
        ],
        banglaParagraphs: [
          'ভ্যালু হিসেবে `Base b = derived;` কপি করলে সাব-ক্লাসের বৈশিষ্ট্য কেটে যায় (Object Slicing)—সব সময় রেফারেন্স বা স্মার্ট পয়েন্টার ব্যবহার করো।',
        ],
        memoryDiagram: 'Base copy = Derived (SLICED!) vs const Base& ref = Derived (SAFE)',
        code: `#include <iostream>\nusing namespace std;\nstruct Base { virtual int tag() const { return 1; } virtual ~Base() = default; };\nstruct Child : Base { int tag() const override { return 2; } };\nint read_tag(const Base& b) { return b.tag(); }\nint main() {\n    Child c;\n    cout << read_tag(c) << "\\n";\n    return 0;\n}`,
        stdin: '',
        expectedOutput: '2',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"int read_tag(const Base& b) { return b.tag(); }","whatItMeans":"Reference preserves `Child` dynamic type (`2`) instead of slicing to `Base` (`1`).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Passing by value `Base b` would slice and print `1`."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 5","codeSnippet":"struct Shape {","whatItMeans":"Abstract base interface.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Base type missing."},
      {"lineNumber":"Line 6","codeSnippet":"    virtual long long area() const = 0;","whatItMeans":"Forces every subclass to implement `area()`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Polymorphic call cannot compile."},
      {"lineNumber":"Line 7","codeSnippet":"    virtual ~Shape() = default;","whatItMeans":"Safe polymorphic teardown.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Resource leak risk on base-pointer delete."},
      {"lineNumber":"Line 12","codeSnippet":"    long long area() const override { return w * h; }","whatItMeans":"Verified concrete implementation.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Subclass cannot be instantiated."},
    ],
    dryRunTable: [
      { step: 1, state: 'make_unique<Rect>(3,4)', memoryOrStack: 'v[0] -> Rect(3,4)', note: 'vptr points to Rect vtable' },
      { step: 2, state: 'make_unique<Square>(5)', memoryOrStack: 'v[1] -> Square(5)', note: 'vptr points to Square vtable' },
      { step: 3, state: 's->area() on v[0], v[1]', memoryOrStack: '12 + 25 = 37', note: 'Dynamic dispatch resolves concrete methods' },
      { step: 4, state: 'main exits', memoryOrStack: 'virtual ~Shape runs', note: 'Both derived objects cleanly destroyed' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Object Slicing Inside `vector<Base>` or By-Value Parameters',
        brokenCode: 'void run(Base b) { b.speak(); } // Derived sliced down to Base!',
        fixedCode: 'void run(const Base& b) { b.speak(); }',
        whyItBreaks: 'Passing by value allocates only `sizeof(Base)` bytes and strips derived overrides.',
      },
      {
        title: 'Trap 2: Non-Virtual Destructor on Polymorphic Base Class',
        brokenCode: 'struct Base { ~Base() {} }; // unique_ptr<Base> skips ~Derived!',
        fixedCode: 'struct Base { virtual ~Base() = default; };',
        whyItBreaks: 'Deleting a derived object through a `Base*` without a virtual destructor is undefined behavior.',
      },
      {
        title: 'Trap 3: Omitting `override` and Silently Shadowing Instead',
        brokenCode: 'void draw() { /* missing const! creates separate function */ }',
        fixedCode: 'void draw() const override { /* compiler verifies match */ }',
        whyItBreaks: 'A tiny `const` or parameter mismatch creates a brand new unrelated method instead of overriding.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch19-p1',
        difficulty: 'Easy',
        title: 'Polymorphic Animal Chorus',
        prompt: 'Implement `Dog` and `Cat` inheriting `Animal { virtual string sound() const = 0; }`, and print `Woof` and `Meow` via base references.',
        banglaHint: '`virtual string sound() const = 0` লিখে দুটি সাব-ক্লাস `override` করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nstruct Animal { virtual string sound() const = 0; virtual ~Animal() = default; };\nstruct Dog : Animal { string sound() const override { return "Woof"; } };\nstruct Cat : Animal { string sound() const override { return "Meow"; } };\nvoid speak(const Animal& a) { cout << a.sound() << "\\n"; }\nint main() { Dog d; Cat c; speak(d); speak(c); return 0; }`,
        sampleStdin: '',
        expectedOutput: 'Woof\nMeow',
      },
      {
        id: 'cpp-ch19-p2',
        difficulty: 'Easy',
        title: 'Abstract Operation Interface',
        prompt: 'Create `Op { virtual long long eval(long long a, long long b) const = 0; }` with `Add` and `Mul` subclasses, choosing via stdin op (`+` or `*`).',
        banglaHint: '`unique_ptr<Op>`-এ শর্ত অনুযায়ী `Add` অথবা `Mul` বসাও।',
        starterCode: `#include <iostream>\n#include <memory>\nusing namespace std;\nstruct Op { virtual long long eval(long long a, long long b) const = 0; virtual ~Op() = default; };\nstruct Add : Op { long long eval(long long a, long long b) const override { return a + b; } };\nstruct Mul : Op { long long eval(long long a, long long b) const override { return a * b; } };\nint main() {\n    long long a, b; char c; cin >> a >> c >> b;\n    unique_ptr<Op> op = (c == '+') ? unique_ptr<Op>(make_unique<Add>()) : make_unique<Mul>();\n    cout << op->eval(a, b) << "\\n";\n    return 0;\n}`,
        sampleStdin: '6 * 7',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch19-p3',
        difficulty: 'Medium',
        title: 'Heterogeneous Salary Payroll Engine',
        prompt: 'Store `n` employees (`FIXED pay` or `HOURLY rate hrs`) in `vector<unique_ptr<Employee>>` and print total payroll.',
        banglaHint: '`FixedEmp` ও `HourlyEmp` ক্লাস `Employee::pay()` ওভাররাইড করবে।',
        starterCode: `#include <iostream>\n#include <memory>\n#include <vector>\n#include <string>\nusing namespace std;\nstruct Employee { virtual long long pay() const = 0; virtual ~Employee() = default; };\nstruct FixedEmp : Employee { long long p; FixedEmp(long long p) : p(p) {} long long pay() const override { return p; } };\nstruct HourlyEmp : Employee { long long r, h; HourlyEmp(long long r, long long h) : r(r), h(h) {} long long pay() const override { return r * h; } };\nint main() {\n    int n; cin >> n;\n    vector<unique_ptr<Employee>> staff;\n    for (int i = 0; i < n; i++) {\n        string t; cin >> t;\n        if (t == "FIXED") { long long p; cin >> p; staff.push_back(make_unique<FixedEmp>(p)); }\n        else { long long r, h; cin >> r >> h; staff.push_back(make_unique<HourlyEmp>(r, h)); }\n    }\n    long long tot = 0; for (const auto& e : staff) tot += e->pay();\n    cout << tot << "\\n";\n    return 0;\n}`,
        sampleStdin: '2\nFIXED 500\nHOURLY 20 15',
        expectedOutput: '800',
      },
      {
        id: 'cpp-ch19-p4',
        difficulty: 'Medium',
        title: 'Base Method Reuse via Protected Helper',
        prompt: 'Create a base `Logger` with a `protected` prefix formatter reused by `InfoLog` and `ErrLog` overrides.',
        banglaHint: 'বেস ক্লাসের `protected:` মেথড সাব-ক্লাসগুলো সরাসরি কল করতে পারে।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Logger {\nprotected:\n    string tag(const string& lvl, const string& msg) const { return "[" + lvl + "] " + msg; }\npublic:\n    virtual void log(const string& msg) const = 0;\n    virtual ~Logger() = default;\n};\nstruct InfoLog : Logger { void log(const string& m) const override { cout << tag("INFO", m) << "\\n"; } };\nint main() { string m; cin >> m; InfoLog l; l.log(m); return 0; }`,
        sampleStdin: 'Booted',
        expectedOutput: '[INFO] Booted',
      },
      {
        id: 'cpp-ch19-p5',
        difficulty: 'Hard',
        title: 'Composite Expression Tree Evaluator',
        prompt: 'Model `Expr` nodes (`Num(v)` and `Sum(left, right)`) using `unique_ptr<Expr>` to recursively evaluate `(3 + 4) + 5 = 12`.',
        banglaHint: '`Sum::eval()` ভেতরে `l->eval() + r->eval()` রিকার্সিভভাবে যোগ করবে।',
        starterCode: `#include <iostream>\n#include <memory>\nusing namespace std;\nstruct Expr { virtual long long eval() const = 0; virtual ~Expr() = default; };\nstruct Num : Expr { long long v; explicit Num(long long v) : v(v) {} long long eval() const override { return v; } };\nstruct Add : Expr {\n    unique_ptr<Expr> l, r;\n    Add(unique_ptr<Expr> l, unique_ptr<Expr> r) : l(std::move(l)), r(std::move(r)) {}\n    long long eval() const override { return l->eval() + r->eval(); }\n};\nint main() {\n    long long a, b, c; cin >> a >> b >> c;\n    auto tree = make_unique<Add>(make_unique<Add>(make_unique<Num>(a), make_unique<Num>(b)), make_unique<Num>(c));\n    cout << tree->eval() << "\\n";\n    return 0;\n}`,
        sampleStdin: '3 4 5',
        expectedOutput: '12',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Polymorphic Geometry Area Aggregator',
      description: 'Parse mixed `R w h` and `S a` shape commands into `vector<unique_ptr<Shape>>` and sum areas dynamically.',
      banglaGoal: 'স্মার্ট পয়েন্টার ও ভার্চুয়াল ইন্টারফেস মিলিয়ে বিভিন্ন শেপের ক্ষেত্রফল গণনাকারী ইঞ্জিন তৈরি করো।',
      combinesChapters: "Ch 17, 18, 19",
      starterCode: `#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\nstruct Shape { virtual long long area() const = 0; virtual ~Shape() = default; };\nstruct Rect : Shape { long long w, h; Rect(long long w, long long h) : w(w), h(h) {} long long area() const override { return w * h; } };\nstruct Square : Shape { long long a; explicit Square(long long a) : a(a) {} long long area() const override { return a * a; } };\nint main() {\n    int n; cin >> n;\n    vector<unique_ptr<Shape>> shapes;\n    for (int i = 0; i < n; i++) {\n        char t; cin >> t;\n        if (t == 'R') { long long w, h; cin >> w >> h; shapes.push_back(make_unique<Rect>(w, h)); }\n        else { long long a; cin >> a; shapes.push_back(make_unique<Square>(a)); }\n    }\n    long long total = 0;\n    for (const auto& s : shapes) total += s->area();\n    cout << total << "\\n";\n    return 0;\n}`,
      sampleStdin: '2\nR 4 5\nS 6',
      expectedOutput: '56',
    },
    starterCode: `#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\nstruct Shape { virtual long long area() const = 0; virtual ~Shape() = default; };\nstruct Rect : Shape { long long w, h; Rect(long long w, long long h) : w(w), h(h) {} long long area() const override { return w * h; } };\nstruct Square : Shape { long long a; explicit Square(long long a) : a(a) {} long long area() const override { return a * a; } };\nint main() {\n    int n; cin >> n;\n    vector<unique_ptr<Shape>> shapes;\n    for (int i = 0; i < n; i++) {\n        char t; cin >> t;\n        if (t == 'R') { long long w, h; cin >> w >> h; shapes.push_back(make_unique<Rect>(w, h)); }\n        else { long long a; cin >> a; shapes.push_back(make_unique<Square>(a)); }\n    }\n    long long total = 0;\n    for (const auto& s : shapes) total += s->area();\n    cout << total << "\\n";\n    return 0;\n}`,
    sampleStdin: '2\nR 4 5\nS 6',
    expectedSampleOutput: '56',
    testCases: [
      { id: 'cpp19-t1', input: '2\nR 4 5\nS 6', expectedOutput: '56' },
      { id: 'cpp19-t2', input: '3\nS 2\nS 3\nR 1 10', expectedOutput: '23', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'C++ Chapter 20: Templates & C++ STL (vector, map, set, sort) — Merger 4',
    banglaTitle: 'C++ অধ্যায় ২০: টেমপ্লেট ও C++ STL (vector, map, set, sort) — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Unify generic templates, dynamic vectors, ordered maps/sets, and O(n log n) std::sort pipelines.',
    zeroIntuition: {
      plainEnglishStory:
        'Writing separate sorting or maximum functions for int, long long, and double duplicates logic and invites bugs. C++ function templates (template <typename T>) generate type-safe machine code at compile time for any type supporting comparison—achieving zero runtime overhead.\n\nThe Standard Template Library (STL) pairs generic algorithms like std::sort with battle-tested containers like vector, map, unordered_map, and set. Combining them turns 80 lines of manual pointer code into 12 lines of expressive, contest-ready C++.',
      asciiFlowchart: `  [ Raw Input Stream ]
          |
          +--> std::vector<T> (contiguous cache-friendly array)
          +--> std::map<string, int> / unordered_map (frequency table)
          +--> std::sort(v.begin(), v.end(), cmp)  [Introsort O(n log n)]
          |
          v
  [ Clean Aggregated Leaderboard / Top-K Output ]`,
      pseudocode: [
        '1. DECLARE template <typename T> utility if generalizing numeric type',
        '2. INGEST records into vector or unordered_map/map frequency counter',
        '3. SORT pairs using custom comparator lambda (count desc, key asc)',
        '4. OUTPUT deduplicated or top-ranked STL results in O(n log n)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেডিমেড সুইস আর্মি টুলবক্স ও জেনেরিক স্ট্যাম্প (Templates + STL)',
        explanation:
          'ধরো তোমাকে একবার পূর্ণসংখ্যা, একবার দশমিক সংখ্যা আর একবার স্ট্রিং সাজাতে বলা হলো। প্রতিবার আলাদা আলাদা সর্টিং কোড লেখা সময় নষ্ট এবং ভুলের উৎস। C++-এর template ঠিক একটি ম্যাজিক ছাঁচের মতো কাজ করে—তুমি একবার template <typename T> লিখে ফাংশন বানালে, কম্পাইলার int বা double প্রয়োজনমতো কোড নিজেই তৈরি করে নেয়। এর সাথে যুক্ত হয় C++ STL (Standard Template Library), যা প্রোগ্রামিং দুনিয়ার সবচেয়ে শক্তিশালী রেডিমেড টুলবক্স। vector তোমায় অটো-রিসাইজিং অ্যারে দেয়, set দেয় স্বয়ংক্রিয়ভাবে ডুপ্লিকেটমুক্ত সাজানো লিস্ট, আর map যেকোনো নামের সাথে সংখ্যা জুড়ে ফ্রিকোয়েন্সি হিসাব করে। std::sort ফাংশন ভেতরে Introsort অ্যালগরিদম চালিয়ে O(n log n) সময়ে কোটি ডেটা চোখের পলকে সাজিয়ে দেয়। এই মার্জার ৪ অধ্যায়ে আমরা ক্লাস, রেফারেন্স, লুপ আর STL কন্টেইনার একসাথে জুড়ে রিয়েল-ওয়ার্ল্ড ও কন্টেস্টের সমস্যা সমাধান করবো। STL ভালো জানলে Codeforces বা টেক ইন্টারভিউতে সমাধান লেখার গতি তিন গুণ বেড়ে যায়। কম্পাইলার অপটিমাইজেশনের কারণে STL কোড হাতে লেখা সাধারণ কোডের সমান বা তার চেয়েও দ্রুত চলে।',
        everydayExample: 'রান্নাঘরের ফুড প্রসেসর: কেবল ব্লেড (টাইপ T) বদলে সবজি, ফল বা মসলা একই মেশিনে কাটা যায়।',
        keyTakeaways: [
          'template <typename T> রানটাইম স্পিড না কমিয়েই যেকোনো টাইপের জন্য কাজ করে।',
          'vector-এ ডেটা রাখা ক্যাশ-ফ্রেন্ডলি ও দ্রুত; map কী অনুযায়ী সাজানো রাখে।',
          'কাস্টম সর্টিংয়ে ল্যাম্বডা কম্পারেটর [](const auto& a, const auto& b) খুব পরিষ্কার।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Generic Template Function & std::vector Pipeline',
        englishParagraphs: [
          'A single template max_of<T> works for both int and double while vector + sort orders elements in place.',
        ],
        banglaParagraphs: [
          'একটি template ফাংশন int ও double উভয় টাইপের বড় মান বের করে এবং vector সর্ট করে।',
        ],
        memoryDiagram: `template<T> -> instantiated for int & double at compile time (zero overhead)`,
        code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

template <typename T>
T max_of(T a, T b) {
    return a > b ? a : b;
}

int main() {
    vector<int> v = {40, 10, 30, 20};
    sort(v.begin(), v.end());
    cout << max_of(v.front(), v.back()) << " " << max_of(2.5, 4.25) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '40 4.25',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'template <typename T>',
            whatItMeans: 'Parameterizes the function over placeholder type T.',
            whyItIsThere: 'Avoids duplicating max_of for every numeric type.',
            ifDeletedError: 'Identifier T is undeclared.',
          },
          {
            lineNumber: 'Line 13',
            codeSnippet: 'sort(v.begin(), v.end());',
            whatItMeans: 'Sorts vector elements ascending in O(n log n).',
            whyItIsThere: 'Places min at front() and max at back().',
            ifDeletedError: 'v.back() is 20 instead of sorted maximum 40.',
          },
        ],
      },
      {
        id: 'cpp-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'std::map Frequency Counter & Tie-Broken Sort',
        englishParagraphs: [
          'Count string occurrences with std::map, copy pairs into vector, and sort by frequency descending then name ascending.',
        ],
        banglaParagraphs: [
          'std::map দিয়ে ফ্রিকোয়েন্সি গুনে কাস্টম কম্পারেটর দিয়ে র‍্যাঙ্কিং বের করা।',
        ],
        memoryDiagram: `map<string,int> -> vector<pair<string,int>> -> sorted leaderboard`,
        code: `#include <algorithm>
#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    map<string, int> freq;
    for (int i = 0; i < n; i++) {
        string w; cin >> w;
        freq[w]++;
    }
    vector<pair<string, int>> rows(freq.begin(), freq.end());
    sort(rows.begin(), rows.end(), [](const auto& a, const auto& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    for (const auto& r : rows) {
        cout << r.first << ":" << r.second << "\\n";
    }
    return 0;
}`,
        stdin: '5\ncpp rust cpp go rust',
        expectedOutput: 'cpp:2\nrust:2\ngo:1',
        lineByLine: [
          {
            lineNumber: 'Line 17',
            codeSnippet: 'sort(rows.begin(), rows.end(), [](const auto& a, const auto& b) {',
            whatItMeans: 'Custom lambda comparator sorting frequency descending then alphabetically.',
            whyItIsThere: 'Produces deterministic leaderboard order on ties.',
            ifDeletedError: 'Rows remain sorted only alphabetically by word.',
          },
        ],
      },
      {
        id: 'cpp-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'std::set Deduplication & Lower-Bound Search',
        englishParagraphs: [
          'std::set automatically maintains sorted unique keys and supports O(log n) lower_bound queries.',
        ],
        banglaParagraphs: [
          'std::set ডুপ্লিকেট বাদ দিয়ে মান সাজিয়ে রাখে এবং lower_bound দিয়ে O(log n)-এ খোঁজে।',
        ],
        memoryDiagram: `Red-Black Tree std::set {10, 20, 35} -> lower_bound(22) -> 35`,
        code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x; cin >> x; s.insert(x);
    }
    auto it = s.lower_bound(q);
    cout << s.size() << " " << (it == s.end() ? -1 : *it) << "\\n";
    return 0;
}`,
        stdin: '5 22\n35 10 20 10 35',
        expectedOutput: '3 35',
        lineByLine: [
          {
            lineNumber: 'Line 12',
            codeSnippet: 'auto it = s.lower_bound(q);',
            whatItMeans: 'Finds first sorted element >= q in O(log n).',
            whyItIsThere: 'Member lower_bound is O(log n) on std::set unlike free std::lower_bound.',
            ifDeletedError: 'Cannot find ceiling element efficiently.',
          },
        ],
      },
      {
        id: 'cpp-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Strict Weak Ordering Comparator & Reserve Optimization',
        englishParagraphs: [
          'Never use <= in a std::sort comparator; always use strict < or > so equal elements return false and never trigger segfaults.',
        ],
        banglaParagraphs: [
          'std::sort কম্পারেটরে কখনো <= বা >= ব্যবহার করবে না; সমান হলে অবশ্যই false রিটার্ন করতে হবে।',
        ],
        memoryDiagram: `cmp(x, x) MUST be false (strict weak ordering)`,
        code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {5, 5, 2, 9, 2};
    sort(a.begin(), a.end(), [](int x, int y) { return x < y; });
    a.erase(unique(a.begin(), a.end()), a.end());
    for (size_t i = 0; i < a.size(); i++) {
        cout << a[i] << (i + 1 < a.size() ? " " : "\\n");
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: '2 5 9',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'a.erase(unique(a.begin(), a.end()), a.end());',
            whatItMeans: 'Erase-remove idiom compressing adjacent duplicates after sort.',
            whyItIsThere: 'Deduplicates vector in O(n) without allocating a tree set.',
            ifDeletedError: 'Duplicates 2 and 5 remain in vector.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'template <typename T>',
        whatItMeans: 'Parameterizes the function over placeholder type T.',
        whyItIsThere: 'Avoids duplicating max_of for every numeric type.',
        ifDeletedError: 'Identifier T is undeclared.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'T max_of(T a, T b) { return a > b ? a : b; }',
        whatItMeans: 'Returns the larger of two values of generic type T.',
        whyItIsThere: 'Works uniformly for int, long long, or double.',
        ifDeletedError: 'No max_of function exists.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'vector<int> v = {40, 10, 30, 20};',
        whatItMeans: 'Heap-backed dynamic array initialized with 4 integers.',
        whyItIsThere: 'Stores elements contiguously for fast sorting.',
        ifDeletedError: 'v is undefined.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'sort(v.begin(), v.end());',
        whatItMeans: 'Sorts vector elements ascending in O(n log n).',
        whyItIsThere: 'Places min at front() and max at back().',
        ifDeletedError: 'v.back() returns 20 instead of 40.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read cpp, rust, cpp, go, rust', memoryOrStack: 'map { cpp:2, go:1, rust:2 }', note: 'Alphabetical RB-tree' },
      { step: 2, state: 'Copy to rows vector', memoryOrStack: 'size = 3 pairs', note: 'Prepares for sort by count' },
      { step: 3, state: 'std::sort comparator', memoryOrStack: '[(cpp,2), (rust,2), (go,1)]', note: 'Tie broken alphabetically' },
      { step: 4, state: 'Print rows', memoryOrStack: 'cpp:2 / rust:2 / go:1', note: 'Clean deterministic output' },
    ],
    harryBugTraps: [
      {
        title: 'Using <= Inside std::sort Comparator',
        brokenCode: `sort(v.begin(), v.end(), [](int a, int b){ return a <= b; });`,
        fixedCode: `sort(v.begin(), v.end(), [](int a, int b){ return a < b; });`,
        whyItBreaks: 'Violating strict weak ordering causes out-of-bounds reads and crashes inside Introsort.',
      },
      {
        title: 'Calling std::lower_bound(s.begin(), s.end(), x) on std::set',
        brokenCode: `auto it = lower_bound(s.begin(), s.end(), x); // O(N)!`,
        fixedCode: `auto it = s.lower_bound(x); // O(log N)`,
        whyItBreaks: 'Bidirectional iterators force free std::lower_bound to advance linearly, causing TLE.',
      },
      {
        title: 'Mutating map Value While Using v.size() Unsigned Subtraction',
        brokenCode: `for (int i = 0; i < (int)v.size() - 1; i++) // ok only with (int)`,
        fixedCode: `for (size_t i = 0; i + 1 < v.size(); i++)`,
        whyItBreaks: 'If v is empty, size_t(0) - 1 underflows to 18446744073709551615 and loops forever.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-20-p1',
        difficulty: 'Easy',
        title: 'Generic Clamp Template',
        prompt: 'Write template <typename T> T clamp_val(T x, T lo, T hi) and apply it to n integers.',
        banglaHint: 'ইঙ্গিত: template ফাংশনে x < lo হলে lo, x > hi হলে hi রিটার্ন করো।',
        starterCode: `#include <iostream>\nusing namespace std;\ntemplate <typename T>\nT clamp_val(T x, T lo, T hi) { return x < lo ? lo : (x > hi ? hi : x); }\nint main() {\n    int n, lo, hi; cin >> n >> lo >> hi;\n    for (int i = 0; i < n; i++) { int x; cin >> x; cout << clamp_val(x, lo, hi) << (i + 1 < n ? " " : "\\n"); }\n    return 0;\n}`,
        sampleStdin: '4 10 50\n3 25 90 10',
        expectedOutput: '10 25 50 10',
      },
      {
        id: 'cpp-ch-20-p2',
        difficulty: 'Easy',
        title: 'Unique Sorted Count Using std::set',
        prompt: 'Insert n integers into std::set and print unique count followed by min and max.',
        banglaHint: 'ইঙ্গিত: *s.begin() হলো সর্বনিম্ন এবং *s.rbegin() হলো সর্বোচ্চ মান।',
        starterCode: `#include <iostream>\n#include <set>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    set<int> s;\n    for (int i = 0; i < n; i++) { int x; cin >> x; s.insert(x); }\n    cout << s.size() << " " << *s.begin() << " " << *s.rbegin() << "\\n";\n    return 0;\n}`,
        sampleStdin: '6\n9 2 9 4 2 7',
        expectedOutput: '4 2 9',
      },
      {
        id: 'cpp-ch-20-p3',
        difficulty: 'Medium',
        title: 'Custom Score-Name Leaderboard',
        prompt: 'Read n (name, score) pairs, sort by score descending then name ascending, print top 3.',
        banglaHint: 'ইঙ্গিত: vector<pair<string,int>> এ ভরে কম্পারেটর দিয়ে sort করো।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<pair<string, int>> v(n);\n    for (auto& p : v) cin >> p.first >> p.second;\n    sort(v.begin(), v.end(), [](const auto& a, const auto& b) {\n        return a.second != b.second ? a.second > b.second : a.first < b.first;\n    });\n    for (int i = 0; i < min(3, n); i++) cout << v[i].first << ":" << v[i].second << "\\n";\n    return 0;\n}`,
        sampleStdin: '4\nRafi 90\nAnika 95\nSiam 90\nNila 80',
        expectedOutput: 'Anika:95\nRafi:90\nSiam:90',
      },
      {
        id: 'cpp-ch-20-p4',
        difficulty: 'Medium',
        title: 'Most Frequent Word Finder',
        prompt: 'Given n words, print the highest-frequency word (ties broken alphabetically).',
        banglaHint: 'ইঙ্গিত: map<string, int> এ গুনে প্রতিটি এন্ট্রি থেকে সর্বোচ্চটি বেছে নাও।',
        starterCode: `#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    map<string, int> mp;\n    for (int i = 0; i < n; i++) { string s; cin >> s; mp[s]++; }\n    string best; int bestCnt = -1;\n    for (const auto& kv : mp) if (kv.second > bestCnt) { bestCnt = kv.second; best = kv.first; }\n    cout << best << " " << bestCnt << "\\n";\n    return 0;\n}`,
        sampleStdin: '5\nml ai ml db ai',
        expectedOutput: 'ai 2',
      },
      {
        id: 'cpp-ch-20-p5',
        difficulty: 'Hard',
        title: 'Priority Queue K-th Largest Stream',
        prompt: 'Given n and k followed by n integers, print the k-th largest value using a min-heap priority_queue.',
        banglaHint: 'ইঙ্গিত: k আকারের min-heap রেখে বেশি হলে pop() করলে top()-ই k-তম বৃহত্তম।',
        starterCode: `#include <functional>\n#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, k; cin >> n >> k;\n    priority_queue<int, vector<int>, greater<int>> pq;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x; pq.push(x);\n        if ((int)pq.size() > k) pq.pop();\n    }\n    cout << pq.top() << "\\n";\n    return 0;\n}`,
        sampleStdin: '6 2\n3 2 1 5 6 4',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Generic STL Frequency Leaderboard',
      description: 'Combine templates/lambdas, std::map, std::vector, and std::sort to rank input tokens deterministically.',
      banglaGoal: 'মার্জার ৪: std::map, vector ও কাস্টম sort দিয়ে ডাইনামিক ফ্রিকোয়েন্সি লিডারবোর্ড তৈরি।',
      combinesChapters: 'Ch 11, 16, 18, 20',
      starterCode: `#include <algorithm>\n#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    map<string, int> freq;\n    for (int i = 0; i < n; i++) { string w; cin >> w; freq[w]++; }\n    vector<pair<string, int>> rows(freq.begin(), freq.end());\n    sort(rows.begin(), rows.end(), [](const auto& a, const auto& b) {\n        return a.second != b.second ? a.second > b.second : a.first < b.first;\n    });\n    for (const auto& r : rows) cout << r.first << ":" << r.second << "\\n";\n    return 0;\n}`,
      sampleStdin: '5\ncpp rust cpp go rust',
      expectedOutput: 'cpp:2\nrust:2\ngo:1',
    },
    starterCode: `#include <algorithm>\n#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    map<string, int> freq;\n    for (int i = 0; i < n; i++) { string w; cin >> w; freq[w]++; }\n    vector<pair<string, int>> rows(freq.begin(), freq.end());\n    sort(rows.begin(), rows.end(), [](const auto& a, const auto& b) {\n        return a.second != b.second ? a.second > b.second : a.first < b.first;\n    });\n    for (const auto& r : rows) cout << r.first << ":" << r.second << "\\n";\n    return 0;\n}`,
    sampleStdin: '5\ncpp rust cpp go rust',
    expectedSampleOutput: 'cpp:2\nrust:2\ngo:1',
    testCases: [
      { id: 'cpp20-t1', input: '5\ncpp rust cpp go rust', expectedOutput: 'cpp:2\nrust:2\ngo:1' },
      { id: 'cpp20-t2', input: '3\na a b', expectedOutput: 'a:2\nb:1', isHidden: true },
    ],
  },
};
