import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_8: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 8 (C23): Structs, Function Pointers & _Generic Polymorphism',
    banglaTitle: 'C অধ্যায় ৮ (C23): স্ট্রাক্ট, ফাংশন পয়েন্টার ও _Generic পলিমরফিজম',
    subtitle: 'Bundle state with typedef struct, simulate methods via Player *self, dispatch callbacks via function pointers, and use C23 _Generic.',
    zeroIntuition: {
      plainEnglishStory:
        'C has no `class` keyword, yet the entire Linux kernel is built with Object-Oriented C! You bundle related data inside a `typedef struct` (like `Player { name, score }`), pass `Player *self` to helper functions (`boost(&p, delta)`), and use **Function Pointers** or C11/C23 `_Generic` to write reusable polymorphic APIs.',
      asciiFlowchart: `  C STRUCT MEMORY LAYOUT (typedef struct Player)
  +-----------------------------------+--------+
  | char name[32] (bytes 0..31)       | int    |  sizeof(Player) = 36 bytes
  +-----------------------------------+--------+
  boost(&p, delta) passes Player* -> mutates p->score via arrow (->) operator!`,
      pseudocode: [
        '1. GROUP related fields (`name`, `score`) into `typedef struct Player`',
        '2. INITIALIZE struct fields cleanly (never leave uninitialized garbage)',
        '3. PASS `&p` (`Player *`) to mutating functions; access fields via `p->score`',
        '4. USE function pointers `int (*op)(int, int)` for pluggable behavior',
        '5. USE `_Generic(x, int: ..., double: ...)` for compile-time type-generic macros',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফর্মের সব তথ্য এক বান্ডিলে (`struct`) এবং `->` তীর চিহ্ন',
        explanation:
          'কল্পনা করো একজন খেলোয়াড়ের নাম ও স্কোর আলাদা আলাদা ভ্যারিয়েবলে রাখলে ১০০ জন খেলোয়াড়ের হিসাব জট পাকিয়ে যাবে। তাই C-তে `struct` হলো একটি ফর্ম—এক বান্ডিলে খেলোয়াড়ের সব তথ্য! ভ্যারিয়েবল সরাসরি থাকলে ডট (`p.score`) আর পয়েন্টার হলে তীর (`p->score`) দিয়ে ভেতরের মান পড়া-বদলানো যায়। আর ফাংশন পয়েন্টার ও `_Generic` দিয়ে C-তেও OOP-এর মতো কাজ করা যায়!',
        everydayExample:
          'একটি আইডি কার্ড (struct): কার্ডের ভেতরেই নাম, রোল, ও ছবি একসাথে থাকে।',
        keyTakeaways: [
          '`p.score` হলো ভ্যালু থেকে এক্সেস, আর `ptr->score` হলো `(*ptr).score`-এর সংক্ষিপ্ত রূপ।',
          '`struct`-এর বড় ফিল্ডগুলো আগে রাখলে (যেমন `long long`, `int`, `char`) মেমোরি প্যাডিং নষ্ট কম হয়।',
          'ফাংশনের ভেতর `struct` কপি না করে `const Player *p` পাঠালে গতি ও মেমোরি দুইই বাঁচে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: typedef struct Player & Method-Style Pointer Helper',
        banglaNote: '`typedef struct` তৈরি করে `Player *p` ও `p->score` ব্যবহার করে স্কোর আপডেট।',
        code: `#include <stdio.h>

typedef struct {
    char name[32];
    int score;
} Player;

void boost(Player *p, int delta) {
    p->score += delta;
}

int main(void) {
    Player p = { "", 0 };
    int delta = 0;
    if (scanf("%31s %d %d", p.name, &p.score, &delta) == 3) {
        boost(&p, delta);
        printf("%s:%d\\n", p.name, p.score);
    }
    return 0;
}`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'c-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Clamped Score Invariant + nullptr Guard',
        banglaNote: 'নেগেটিভ স্কোর আটকাতে এনক্যাপসুলেশন হেল্পারের ভেতরে ভ্যালিডেশন গার্ড।',
        code: `#include <stdio.h>

typedef struct { int score; } Account;

void add_score(Account *acc, int delta) {
    if (acc == nullptr) return;
    acc->score += delta;
    if (acc->score < 0) acc->score = 0; // Invariant: never negative
}

int main(void) {
    Account a = { 20 };
    int d = 0;
    if (scanf("%d", &d) != 1) return 0;
    add_score(&a, d);
    printf("%d\\n", a.score);
    return 0;
}`,
        stdin: '-50',
        expectedOutput: '0',
      },
      {
        id: 'c-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: C23 _Generic Type-Safe Max Macro (Zero Overhead)',
        banglaNote: 'কম্পাইল টাইমে টাইপ বুঝে সঠিক ফাংশন বেছে নেওয়া C `_Generic` জেনেরিকস।',
        code: `#include <stdio.h>

int max_i(int a, int b) { return a > b ? a : b; }
long long max_ll(long long a, long long b) { return a > b ? a : b; }

#define MAX_GENERIC(a, b) _Generic((a), \\
    long long: max_ll, \\
    default: max_i \\
)(a, b)

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;
    printf("%lld\\n", MAX_GENERIC(a, b));
    return 0;
}`,
        stdin: '10000000000 999',
        expectedOutput: '10000000000',
      },
      {
        id: 'c-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Function Pointer Strategy Dispatch Table',
        banglaNote: 'ফাংশন পয়েন্টার দিয়ে ক্যালকুলেটর বা কম্পারেটর কলব্যাক রানটাইমে পরিবর্তন করা।',
        code: `#include <stdio.h>

typedef int (*BinOp)(int, int);
int op_add(int a, int b) { return a + b; }
int op_mul(int a, int b) { return a * b; }

int apply(int a, int b, BinOp fn) { return fn(a, b); }

int main(void) {
    int a = 0, b = 0;
    char mode = '+';
    if (scanf("%d %d %c", &a, &b, &mode) != 3) return 0;
    BinOp op = (mode == '*') ? op_mul : op_add;
    printf("%d\\n", apply(a, b, op));
    return 0;
}`,
        stdin: '6 7 *',
        expectedOutput: '42',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3-6',
        codeSnippet: 'typedef struct { char name[32]; int score; } Player;',
        whatItMeans: 'Defines a composite struct type named `Player` bundling text and integer fields.',
        whyItIsThere: 'Keeps related player properties contiguous under one type name.',
        ifDeletedError: 'Compile error: unknown type name `Player`.',
      },
      {
        lineNumber: 'Line 8-9',
        codeSnippet: 'void boost(Player *p, int delta) { p->score += delta; }',
        whatItMeans: 'Modifies `score` directly on the caller’s `Player` struct via pointer indirection.',
        whyItIsThere: 'Passing `Player p` by value would only update a discarded copy.',
        ifDeletedError: '`p.score` stays `85` instead of `100`.',
      },
      {
        lineNumber: 'Line 15',
        codeSnippet: 'boost(&p, delta);',
        whatItMeans: 'Passes the address of `p` to mutate it in-place.',
        whyItIsThere: 'Matches `Player *p` parameter type.',
        ifDeletedError: 'Output stays unboosted (`Rafi:85`).',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'scanf reads p.name="Rafi", p.score=85, delta=15', memoryOrStack: 'Player p { "Rafi", 85 }', note: '36-byte struct on stack' },
      { step: 2, state: 'boost(&p, 15)', memoryOrStack: 'p pointer -> Player struct', note: 'No struct copy made' },
      { step: 3, state: 'p->score += 15', memoryOrStack: 'Player p { "Rafi", 100 }', note: 'Score mutated in-place' },
      { step: 4, state: 'printf("Rafi:100\\n")', memoryOrStack: 'stdout: Rafi:100', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Passing Large Struct by Value Instead of `const Player *`',
        brokenCode: `void print_player(Player p) { ... } // Copies entire struct!`,
        fixedCode: `void print_player(const Player *p) { printf("%s", p->name); }`,
        whyItBreaks: 'Copies all struct bytes onto the stack every call and prevents mutations.',
      },
      {
        title: 'Trap 2: Using `.` Instead of `->` on a Struct Pointer',
        brokenCode: `void boost(Player *p) { p.score += 10; } // Syntax error!`,
        fixedCode: `void boost(Player *p) { p->score += 10; }`,
        whyItBreaks: '`p` is a pointer, not a struct value—use `->` to dereference and access field.',
      },
      {
        title: 'Trap 3: Comparing Two Structs Directly With `==`',
        brokenCode: `if (p1 == p2) // Invalid operands to binary == in C!`,
        fixedCode: `if (strcmp(p1.name, p2.name) == 0 && p1.score == p2.score)`,
        whyItBreaks: 'C structs may contain padding bytes, so C forbids `==` on structs; compare fields explicitly.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Point2D Manhattan Distance Struct',
        prompt: 'Define `typedef struct { int x, y; } Point;`, read two points, and print `|x1-x2| + |y1-y2|`.',
        banglaHint: '`abs(p1.x - p2.x) + abs(p1.y - p2.y)` হিসাব করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\ntypedef struct { int x, y; } Point;\nint main(void) {\n    Point a, b; if (scanf("%d %d %d %d", &a.x, &a.y, &b.x, &b.y) != 4) return 0;\n    printf("%d\\n", abs(a.x - b.x) + abs(a.y - b.y));\n    return 0;\n}`,
        sampleStdin: '1 2 4 6',
        expectedOutput: '7',
      },
      {
        id: 'c-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Rectangle Area & Perimeter Helper',
        prompt: 'Define `Rect { int w, h; }` and print `area perimeter`.',
        banglaHint: '`const Rect *r` পাস করে `r->w * r->h` বের করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { int w, h; } Rect;\nint area(const Rect *r) { return r->w * r->h; }\nint perim(const Rect *r) { return 2 * (r->w + r->h); }\nint main(void) {\n    Rect r; if (scanf("%d %d", &r.w, &r.h) != 2) return 0;\n    printf("%d %d\\n", area(&r), perim(&r));\n    return 0;\n}`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'c-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Find Top-Scoring Student in Struct Array',
        prompt: 'Read n students `(name, score)` and print the highest-scoring student name.',
        banglaHint: 'লুপ চালিয়ে সর্বোচ্চ `s[i].score` খুঁজে বের করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { char name[32]; int score; } Student;\nint main(void) {\n    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    Student best; scanf("%31s %d", best.name, &best.score);\n    for (int i = 1; i < n; i++) {\n        Student cur; scanf("%31s %d", cur.name, &cur.score);\n        if (cur.score > best.score) best = cur;\n    }\n    printf("%s %d\\n", best.name, best.score);\n    return 0;\n}`,
        sampleStdin: '3\nRafi 75\nZara 92\nAmir 88',
        expectedOutput: 'Zara 92',
      },
      {
        id: 'c-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Callback Filter With Function Pointer',
        prompt: 'Write `int count_if(const int *a, int n, int (*pred)(int))` to count positive numbers.',
        banglaHint: '`int is_pos(int x) { return x > 0; }` ফাংশন পয়েন্টার পাঠাও।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint is_pos(int x) { return x > 0; }\nint count_if(const int *a, int n, int (*pred)(int)) {\n    int c = 0; for (int i = 0; i < n; i++) if (pred(a[i])) c++; return c;\n}\nint main(void) {\n    int n; if (scanf("%d", &n) != 1) return 0;\n    int *a = malloc((size_t)n * sizeof(int)); for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n    printf("%d\\n", count_if(a, n, is_pos)); free(a);\n    return 0;\n}`,
        sampleStdin: '5\n-2 4 0 9 -1',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Generic Array Stack (void* + element size) Mini Container',
        prompt: 'Push n integers onto a generic stack buffer and pop top element.',
        banglaHint: 'স্ট্যাক ইনডেক্স `top` বাড়িয়ে ও কমিয়ে LIFO পপ করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { int data[128]; int top; } IntStack;\nvoid push(IntStack *s, int v) { if (s->top < 128) s->data[s->top++] = v; }\nint pop(IntStack *s) { return s->top > 0 ? s->data[--s->top] : -1; }\nint main(void) {\n    IntStack st = { .top = 0 }; int n, x;\n    if (scanf("%d", &n) != 1) return 0;\n    for (int i = 0; i < n; i++) { scanf("%d", &x); push(&st, x); }\n    printf("%d\\n", pop(&st));\n    return 0;\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40',
      },
    ],
    miniBuild: {
      title: 'C23 Mini Build: Player Struct & Score Mutator',
      description: 'Encapsulates player fields inside typedef struct and mutates score via pointer indirection.',
      banglaGoal: 'C struct এবং পয়েন্টারের মাধ্যমে ডেটা এনক্যাপসুলেশন বাস্তবায়ন করা।',
      combinesChapters: 'Ch 1–8',
      starterCode: `#include <stdio.h>

typedef struct {
    char name[32];
    int score;
} Player;

void boost(Player *p, int delta) { p->score += delta; }

int main(void) {
    Player p;
    int delta = 0;
    if (scanf("%31s %d %d", p.name, &p.score, &delta) == 3) {
        boost(&p, delta);
        printf("%s:%d\\n", p.name, p.score);
    }
    return 0;
}`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  cpp: {
    title: 'C++ Chapter 8 (C++23): Classes, Templates & Concepts',
    banglaTitle: 'C++ অধ্যায় ৮ (C++23): ক্লাস, টেমপ্লেট ও কনসেপ্টস',
    subtitle: 'Master encapsulation with private fields, zero-cost template<typename T> generics, C++23 concepts, and virtual vs static dispatch.',
    zeroIntuition: {
      plainEnglishStory:
        'A C++ `class` guards invariants (keeping `balance >= 0` in `private:` while exposing safe `public:` methods). Meanwhile, `template <typename T>` acts as a compile-time blueprint: write `Player<T>` once and the compiler stamps out zero-overhead machine code for `int`, `double`, or `long long`!',
      asciiFlowchart: `  C++ TEMPLATE MONOMORPHIZATION (Compile Time)
  template <typename T> struct Player { T score; };
         |
         +--> Player<int>       (exact 32-bit int instructions!)
         +--> Player<long long> (exact 64-bit long long instructions!)`,
      pseudocode: [
        '1. ENCAPSULATE mutable state behind `private:` members and validate in `public:` methods',
        '2. PARAMETERIZE reusable containers/functions with `template <typename T>`',
        '3. CONSTRAIN templates clearly using C++20/23 `concepts` (e.g., `integral` / `comparable`)',
        '4. PREFER composition (holding member objects) over deep inheritance trees',
        '5. MARK non-mutating getter methods `const`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সুরক্ষিত লকার (`private`) এবং জাদুর ছাঁচ (`template<T>`)',
        explanation:
          'ব্যাংকের ভল্টের টাকা (`private: balance`) সরাসরি যে কেউ হাত দিয়ে নিতে পারে না—তাকে অবশ্যই ব্যাংকের কাউন্টার (`public: deposit() / withdraw()`) ব্যবহার করতে হয়! এটাই এনক্যাপসুলেশন। আর `template <typename T>` হলো কেক বানানোর ছাঁচ: একবার ছাঁচ বানালে ভ্যানিলা (`int`), চকলেট (`double`), বা স্ট্রবেরি (`long long`) সবই বিনা অতিরিক্ত খরচে তৈরি হবে!',
        everydayExample:
          'একই ইউনিভার্সাল চার্জার ছাঁচ দিয়ে বিভিন্ন ডিভাইস চার্জ করার মতো।',
        keyTakeaways: [
          'C++-এ `struct`-এর ডিফল্ট অ্যাক্সেস `public`, আর `class`-এর ডিফল্ট অ্যাক্সেস `private`।',
          '`template <typename T>` ব্যবহার করলে রানটাইমে কোনো ভীরচুয়াল টেবিল (vtable) খরচ থাকে না!',
          'হেল্পার রিডার মেথডের শেষে `const` লিখলে `const Player&` থেকেও কল করা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Generic template<typename T> Player Struct',
        banglaNote: '`template <typename T>` দিয়ে জেনেরিক Player স্ট্রাক্ট ও মেথড।',
        code: `#include <iostream>
#include <string>
using namespace std;

template <typename T>
struct Player {
    string name;
    T score;
    void boost(T delta) { score += delta; }
};

int main() {
    Player<int> p;
    int delta;
    if (cin >> p.name >> p.score >> delta) {
        p.boost(delta);
        cout << p.name << ":" << p.score << "\\n";
    }
    return 0;
}`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'cpp-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Private Encapsulated Balance Guard',
        banglaNote: '`private` ব্যালেন্সে যেন ওভারড্রপ বা নেগেটিভ ব্যালেন্স না হয় তার ক্লাস ইনভ্যারিয়েন্ট।',
        code: `#include <iostream>
using namespace std;

class Wallet {
    long long balance_;
public:
    explicit Wallet(long long init) : balance_(init < 0 ? 0 : init) {}
    bool withdraw(long long amt) {
        if (amt < 0 || amt > balance_) return false;
        balance_ -= amt;
        return true;
    }
    long long balance() const { return balance_; }
};

int main() {
    long long init, w;
    if (cin >> init >> w) {
        Wallet wal(init);
        bool ok = wal.withdraw(w);
        cout << "ok=" << ok << " bal=" << wal.balance() << "\\n";
    }
    return 0;
}`,
        stdin: '100 150',
        expectedOutput: 'ok=0 bal=100',
      },
      {
        id: 'cpp-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: C++23 Concept-Constrained Generic Max',
        banglaNote: '`std::totally_ordered` কনসেপ্ট ব্যবহার করে টাইপ-সেফ জেনেরিক ফাংশন।',
        code: `#include <concepts>
#include <iostream>
using namespace std;

template <totally_ordered T>
T clamp_val(T x, T lo, T hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}

int main() {
    int x, lo, hi;
    if (cin >> x >> lo >> hi) cout << clamp_val(x, lo, hi) << "\\n";
    return 0;
}`,
        stdin: '120 0 100',
        expectedOutput: '100',
      },
      {
        id: 'cpp-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Generic Static-Dispatch Stack<T>',
        banglaNote: '`vector<T>`-র ওপর জেনেরিক `Stack<T>` র‍্যাপার ক্লাস।',
        code: `#include <iostream>
#include <vector>
using namespace std;

template <typename T>
class MiniStack {
    vector<T> buf_;
public:
    void push(const T &v) { buf_.push_back(v); }
    T pop() { T v = buf_.back(); buf_.pop_back(); return v; }
    bool empty() const { return buf_.empty(); }
};

int main() {
    int n, x;
    if (!(cin >> n)) return 0;
    MiniStack<int> st;
    for (int i = 0; i < n; i++) { cin >> x; st.push(x); }
    cout << st.pop() << "\\n";
    return 0;
}`,
        stdin: '3\n10 20 99',
        expectedOutput: '99',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'template <typename T>',
        whatItMeans: 'Declares a compile-time type parameter `T` for the struct below.',
        whyItIsThere: 'Allows instantiating `Player<int>`, `Player<long long>`, or `Player<double>` from one codebase.',
        ifDeletedError: 'Compile error: `T` does not name a type.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'void boost(T delta) { score += delta; }',
        whatItMeans: 'Member method implicitly receiving `this` pointer to mutate `this->score`.',
        whyItIsThere: 'Keeps mutation logic bound directly to `Player<T>`.',
        ifDeletedError: '`p.boost` has no member function.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'Player<int> p;',
        whatItMeans: 'Instantiates the template specialization with `T = int`.',
        whyItIsThere: 'Generates exact machine instructions for 32-bit int fields.',
        ifDeletedError: 'Missing template argument list fails compilation.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Player<int> p allocated', memoryOrStack: 'p={name:"", score:0}', note: 'Compiler instantiates T=int' },
      { step: 2, state: 'cin reads Rafi 85 15', memoryOrStack: 'p={name:"Rafi", score:85}', note: 'delta=15' },
      { step: 3, state: 'p.boost(15)', memoryOrStack: 'p.score = 85 + 15 = 100', note: 'Mutates via implicit this' },
      { step: 4, state: 'cout << "Rafi:100\\n"', memoryOrStack: 'stdout: Rafi:100', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Slicing Polymorphic Objects When Passing Base Class by Value',
        brokenCode: `void draw(Shape s) { s.render(); } // Slices Derived fields!`,
        fixedCode: `void draw(const Shape &s) { s.render(); } // Preserves dynamic dispatch`,
        whyItBreaks: 'Passing a derived object by value copies ONLY the base class part, slicing off derived data!',
      },
      {
        title: 'Trap 2: Missing `virtual` Destructor on Polymorphic Base Class',
        brokenCode: `class Base { public: ~Base() {} }; // Leaks Derived destructor on delete!`,
        fixedCode: `class Base { public: virtual ~Base() = default; };`,
        whyItBreaks: 'Deleting a `Derived*` via a `Base*` skips `~Derived()` unless `~Base()` is `virtual`.',
      },
      {
        title: 'Trap 3: Putting Non-Const Method Without `const` Qualifier',
        brokenCode: `int getScore() { return score_; } // Cannot call on const Player&!`,
        fixedCode: `int getScore() const { return score_; }`,
        whyItBreaks: 'Read-only references (`const T&`) are only allowed to invoke `const` member functions.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Rect Class Area & Perimeter',
        prompt: 'Create `class Rect` with `w, h` and `const` methods `area()` and `perim()`.',
        banglaHint: 'মেথডগুলোর শেষে `const` যোগ করে উত্তর প্রিন্ট করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nclass Rect {\n    int w_, h_;\npublic:\n    Rect(int w, int h) : w_(w), h_(h) {}\n    int area() const { return w_ * h_; }\n    int perim() const { return 2 * (w_ + h_); }\n};\nint main() { int w, h; if (cin >> w >> h) { Rect r(w, h); cout << r.area() << " " << r.perim() << "\\n"; } }`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'cpp-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Generic Pair Swap Template',
        prompt: 'Write `template <typename T> T maxOf(T a, T b)` and test on two ints.',
        banglaHint: '`return a > b ? a : b;` টেমপ্লেট লিখো।',
        starterCode: `#include <iostream>\nusing namespace std;\ntemplate <typename T> T maxOf(T a, T b) { return a > b ? a : b; }\nint main() { int a, b; if (cin >> a >> b) cout << maxOf(a, b) << "\\n"; }`,
        sampleStdin: '17 42',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Encapsulated Counter With Minimum Clamp',
        prompt: 'Read start and delta; prevent counter from dropping below 0.',
        banglaHint: '`if (val_ < 0) val_ = 0;` গার্ড রাখো।',
        starterCode: `#include <iostream>\nusing namespace std;\nclass Counter {\n    int val_;\npublic:\n    Counter(int v) : val_(v < 0 ? 0 : v) {}\n    void add(int d) { val_ += d; if (val_ < 0) val_ = 0; }\n    int get() const { return val_; }\n};\nint main() { int s, d; if (cin >> s >> d) { Counter c(s); c.add(d); cout << c.get() << "\\n"; } }`,
        sampleStdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'cpp-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Polymorphic Virtual Shape Area',
        prompt: 'Implement base `Shape` with `virtual double area() const` and derived `Square(s)`.',
        banglaHint: '`override` কীওয়ার্ড দিয়ে `area()` ইমপ্লিমেন্ট করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nstruct Shape { virtual ~Shape() = default; virtual int area() const = 0; };\nstruct Square : Shape { int s; explicit Square(int s) : s(s) {} int area() const override { return s * s; } };\nint main() { int s; if (cin >> s) { Square sq(s); const Shape &ref = sq; cout << ref.area() << "\\n"; } }`,
        sampleStdin: '9',
        expectedOutput: '81',
      },
      {
        id: 'cpp-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Generic Box<T> Comparison Sorting Pair',
        prompt: 'Read two integers into `Box<int>` objects and print them in ascending order via `operator<`.',
        banglaHint: '`bool operator<(const Box &o) const` ডিফাইন করো।',
        starterCode: `#include <iostream>\nusing namespace std;\ntemplate <typename T>\nstruct Box { T v; bool operator<(const Box &o) const { return v < o.v; } };\nint main() {\n    int x, y; if (!(cin >> x >> y)) return 0;\n    Box<int> a{x}, b{y};\n    if (b < a) cout << b.v << " " << a.v << "\\n"; else cout << a.v << " " << b.v << "\\n";\n}`,
        sampleStdin: '50 12',
        expectedOutput: '12 50',
      },
    ],
    miniBuild: {
      title: 'C++23 Mini Build: Generic Template Player<T>',
      description: 'Combines template generics with struct encapsulation to boost typed scores cleanly.',
      banglaGoal: 'C++23 টেমপ্লেট `Player<T>` তৈরি করে যেকোনো নিউমেরিক স্কোর বুস্ট করা।',
      combinesChapters: 'Ch 1–8',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

template <typename T>
struct Player {
    string name;
    T score;
    void boost(T delta) { score += delta; }
};

int main() {
    Player<int> p;
    int delta;
    if (cin >> p.name >> p.score >> delta) {
        p.boost(delta);
        cout << p.name << ":" << p.score << "\\n";
    }
    return 0;
}`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  python: {
    title: 'Python Chapter 8 (Python 3.13): @dataclass, Protocol & PEP 695 Generics',
    banglaTitle: 'Python অধ্যায় ৮ (Python 3.13): @dataclass, Protocol ও জেনেরিকস',
    subtitle: 'Master @dataclass(slots=True), structural Protocol interfaces, @property validation, and Python 3.12+ [T] generic syntax.',
    zeroIntuition: {
      plainEnglishStory:
        'Instead of writing repetitive `__init__`, `__repr__`, and `__eq__` boilerplate, Python gives you `@dataclass`! Pair it with `slots=True` for lower RAM usage, `@property` to guard invariants, and `typing.Protocol` for structural duck-typed interfaces (any class with matching methods fits without inheriting!).',
      asciiFlowchart: `  PYTHON 3.13 @dataclass + Protocol
  class Scorable(Protocol): def boost(self, d: int) -> None
            ^ (structural match — no inheritance needed!)
  @dataclass(slots=True)
  class Player: name: str; score: int -> compact C-struct memory!`,
      pseudocode: [
        '1. DECORATE data models with `@dataclass(slots=True)`',
        '2. GUARD invariants using `@property` setters or `__post_init__`',
        '3. DEFINE structural contracts cleanly with `typing.Protocol`',
        '4. WRITE Python 3.12/3.13 generics cleanly: `def max_item[T](a: T, b: T) -> T:`',
        '5. PREFER composition over deep class inheritance trees',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেডিমেড ফর্ম (`@dataclass`) ও ডাক-টাইপিং (`Protocol`)',
        explanation:
          'সাধারণ ক্লাস লিখতে গেলে প্রতিবার `__init__`, `self.x = x`, `__repr__` লিখতে প্রচুর সময় যায়! Python-এ `@dataclass` লিখে দিলে সেগুলো স্বয়ংক্রিয়ভাবে তৈরি হয়ে যায়! আর `Protocol` হলো এমন এক নিয়ম: "হাঁসের মতো হাঁটলে এবং হাঁসের মতো ডাকলেই সে হাঁস!" অর্থাৎ কোনো ক্লাস ইনহেরিট না করেও শুধু সঠিক মেথড থাকলেই ইন্টারফেস ম্যাচ করে!',
        everydayExample:
          'বিদ্যুৎ সংযোগের ২-পিন প্লাগ: প্লাগটি যেকোনো কোম্পানির হতে পারে, শুধু সঠিক মাপের দুটি পিন থাকলেই সকেটে ঢুকবে!',
        keyTakeaways: [
          '`@dataclass(slots=True)` ব্যবহার করলে অবজেক্ট প্রতি `__dict__` ডিকশনারি বাদ দিয়ে র‍্যাম সাশ্রয় হয়।',
          '`__post_init__` মেথড ব্যবহার করে অবজেক্ট তৈরির সময়ই ইনপুট ভ্যালিডেট করা যায়।',
          'Python 3.12/3.13-এ `[T]` দিয়ে খুব সহজেই `def first[T](items: list[T]) -> T:` জেনেরিক ফাংশন লেখা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: @dataclass Player With Method Mutation',
        banglaNote: '`@dataclass` ব্যবহার করে স্বল্প কোডে সুন্দর ডেটা ক্লাস ও বুস্ট মেথড।',
        code: `import sys
from dataclasses import dataclass

@dataclass
class Player:
    name: str
    score: int

    def boost(self, delta: int) -> None:
        self.score += delta

parts = sys.stdin.read().split()
if len(parts) >= 3:
    p = Player(parts[0], int(parts[1]))
    p.boost(int(parts[2]))
    print(f"{p.name}:{p.score}")`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'py-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: __post_init__ Validation & slots=True Memory Guard',
        banglaNote: '`__post_init__` দিয়ে অবজেক্ট তৈরির মুহূর্তেই নেগেটিভ স্কোর শূন্যে নামিয়ে আনা।',
        code: `import sys
from dataclasses import dataclass

@dataclass(slots=True)
class Account:
    owner: str
    balance: int

    def __post_init__(self) -> None:
        if self.balance < 0:
            self.balance = 0

parts = sys.stdin.read().split()
if len(parts) >= 2:
    acc = Account(parts[0], int(parts[1]))
    print(f"{acc.owner}:{acc.balance}")`,
        stdin: 'Nadia -50',
        expectedOutput: 'Nadia:0',
      },
      {
        id: 'py-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: PEP 695 Python 3.13 Generic [T] & Protocol',
        banglaNote: 'Python 3.13-এর আধুনিক `[T]` জেনেরিক সিনট্যাক্স ও `Protocol` স্ট্রাকচারাল টাইপিং।',
        code: `import sys
from typing import Protocol

class HasArea(Protocol):
    def area(self) -> int: ...

class Rect:
    def __init__(self, w: int, h: int) -> None:
        self.w, self.h = w, h
    def area(self) -> int:
        return self.w * self.h

def double_area[T: HasArea](shape: T) -> int:
    return shape.area() * 2

w, h = map(int, sys.stdin.read().split())
print(double_area(Rect(w, h)))`,
        stdin: '5 3',
        expectedOutput: '30',
      },
      {
        id: 'py-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Orderable @dataclass(order=True) Priority Records',
        banglaNote: '`order=True` লিখে স্বয়ংক্রিয়ভাবে কাস্টম অবজেক্ট তুলনা ও সর্টিং সাপোর্ট পাওয়া।',
        code: `import sys
from dataclasses import dataclass

@dataclass(order=True)
class Entry:
    neg_score: int
    name: str

lines = sys.stdin.read().strip().splitlines()
n = int(lines[0])
items = [Entry(-int(s), name) for name, s in (ln.split() for ln in lines[1:1 + n])]
top = min(items)
print(top.name, -top.neg_score)`,
        stdin: '3\nRafi 75\nZara 92\nAmir 92',
        expectedOutput: 'Amir 92',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: '@dataclass',
        whatItMeans: 'Auto-generates `__init__`, `__repr__`, and `__eq__` from type annotations.',
        whyItIsThere: 'Eliminates repetitive constructor boilerplate and keeps models readable.',
        ifDeletedError: '`TypeError: Player() takes no arguments` when calling `Player(name, score)`.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'def boost(self, delta: int) -> None:',
        whatItMeans: 'Instance method mutating `self.score` directly on the object.',
        whyItIsThere: '`self` passes the instance reference implicitly when called as `p.boost(15)`.',
        ifDeletedError: 'AttributeError: `Player` object has no attribute `boost`.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'p = Player(parts[0], int(parts[1]))',
        whatItMeans: 'Instantiates a `Player` object on the Python Heap.',
        whyItIsThere: 'Converts parsed string score into `int` before storing.',
        ifDeletedError: 'NameError: `p` is not defined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'p = Player("Rafi", 85)', memoryOrStack: 'Heap Player{name="Rafi", score=85}', note: 'Auto __init__ runs' },
      { step: 2, state: 'p.boost(15)', memoryOrStack: 'self aliases p', note: 'self.score = 85 + 15' },
      { step: 3, state: 'score updated to 100', memoryOrStack: 'Player{name="Rafi", score=100}', note: 'In-place mutation' },
      { step: 4, state: 'print("Rafi:100")', memoryOrStack: 'stdout: Rafi:100', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Mutable List Field Directly Inside `@dataclass`',
        brokenCode: `@dataclass\nclass Team: members: list[str] = []  # ValueError in Python!`,
        fixedCode: `from dataclasses import field\n@dataclass\nclass Team: members: list[str] = field(default_factory=list)`,
        whyItBreaks: 'Python blocks mutable defaults directly in dataclasses because instances would share one list.',
      },
      {
        title: 'Trap 2: Forgetting `self` as First Parameter in Class Method',
        brokenCode: `class A:\n    def hi(): print("hi")  # TypeError: hi() takes 0 positional arguments but 1 was given!`,
        fixedCode: `class A:\n    def hi(self): print("hi")`,
        whyItBreaks: 'Calling `obj.hi()` passes `obj` automatically as the first positional argument.',
      },
      {
        title: 'Trap 3: Modifying Class Variable Instead of Instance Variable',
        brokenCode: `class Dog: tricks = []  # Shared across ALL dogs!`,
        fixedCode: `class Dog:\n    def __init__(self): self.tricks = []  # Per-instance!`,
        whyItBreaks: 'Class-level mutable attributes are shared across every instance.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-8-q1',
        difficulty: 'Easy',
        title: '1. @dataclass Rect Area & Perimeter',
        prompt: 'Create `@dataclass class Rect(w: int, h: int)` with `area()` and `perim()`.',
        banglaHint: '`@dataclass` ও মেথড লিখে `r.area(), r.perim()` প্রিন্ট করো।',
        starterCode: `import sys\nfrom dataclasses import dataclass\n@dataclass\nclass Rect:\n    w: int; h: int\n    def area(self) -> int: return self.w * self.h\n    def perim(self) -> int: return 2 * (self.w + self.h)\nw, h = map(int, sys.stdin.read().split())\nr = Rect(w, h)\nprint(r.area(), r.perim())`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'py-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Safe field(default_factory=list) Team',
        prompt: 'Create `@dataclass class Team` with `members: list[str] = field(default_factory=list)` and print count.',
        banglaHint: '`field(default_factory=list)` ব্যবহার করো।',
        starterCode: `import sys\nfrom dataclasses import dataclass, field\n@dataclass\nclass Team:\n    members: list[str] = field(default_factory=list)\nt = Team()\nfor name in sys.stdin.read().split(): t.members.append(name)\nprint(len(t.members))`,
        sampleStdin: 'Rafi Zara Amir',
        expectedOutput: '3',
      },
      {
        id: 'py-ch-8-q3',
        difficulty: 'Medium',
        title: '3. @property Non-Negative Counter',
        prompt: 'Guard `Counter.value` with `__post_init__` clamping negatives to 0.',
        banglaHint: '`__post_init__`-এ নেগেটিভ মান ০ করো।',
        starterCode: `import sys\nfrom dataclasses import dataclass\n@dataclass\nclass Counter:\n    val: int\n    def __post_init__(self): self.val = max(0, self.val)\n    def add(self, d: int): self.val = max(0, self.val + d)\ns, d = map(int, sys.stdin.read().split())\nc = Counter(s); c.add(d)\nprint(c.val)`,
        sampleStdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'py-ch-8-q4',
        difficulty: 'Medium',
        title: '4. PEP 695 Generic Stack[T]',
        prompt: 'Implement generic `class Stack[T]` with `push` and `pop`, push n ints and print top.',
        banglaHint: '`class Stack[T]:` সিনট্যাক্স ব্যবহার করো।',
        starterCode: `import sys\nclass Stack[T]:\n    def __init__(self) -> None: self._buf: list[T] = []\n    def push(self, v: T) -> None: self._buf.append(v)\n    def pop(self) -> T: return self._buf.pop()\nnums = list(map(int, sys.stdin.read().split()))\nst: Stack[int] = Stack()\nfor x in nums[1:1 + nums[0]]: st.push(x)\nprint(st.pop())`,
        sampleStdin: '3\n10 20 99',
        expectedOutput: '99',
      },
      {
        id: 'py-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Orderable @dataclass Priority Winner',
        prompt: 'Read n `(name, score)` rows; find highest score (tie-break alphabetically) using `@dataclass(order=True)`.',
        banglaHint: '`(-score, name)` অর্ডারে `min(rows)` বের করো।',
        starterCode: `import sys\nfrom dataclasses import dataclass\n@dataclass(order=True)\nclass Row:\n    neg_score: int; name: str\nlines = sys.stdin.read().strip().splitlines()\nrows = [Row(-int(s), name) for name, s in (ln.split() for ln in lines[1:1 + int(lines[0])])]\nw = min(rows)\nprint(w.name, -w.neg_score)`,
        sampleStdin: '3\nRafi 75\nZara 92\nAmir 92',
        expectedOutput: 'Amir 92',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Mini Build: @dataclass Player Scorer',
      description: 'Models a clean Player entity with `@dataclass` and mutates score via class method.',
      banglaGoal: '`@dataclass` ব্যবহার করে পরিষ্কার অবজেক্ট-ওরিয়েন্টেড মডেল তৈরি।',
      combinesChapters: 'Ch 1–8',
      starterCode: `import sys
from dataclasses import dataclass

@dataclass
class Player:
    name: str
    score: int
    def boost(self, delta: int) -> None:
        self.score += delta

parts = sys.stdin.read().split()
p = Player(parts[0], int(parts[1]))
p.boost(int(parts[2]))
print(f"{p.name}:{p.score}")`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  java: {
    title: 'Java Chapter 8 (Java 21): Records, Sealed Interfaces & Generics',
    banglaTitle: 'Java অধ্যায় ৮ (Java 21): রেকর্ডস, সিলড ইন্টারফেস ও জেনেরিকস',
    subtitle: 'Master Java 21 immutable record types, sealed interface + pattern-matching switch, and bounded Generics <T extends Comparable<T>>.',
    zeroIntuition: {
      plainEnglishStory:
        'Modern Java 21 eliminates verbose getters/setters for pure data with `record Point(int x, int y) {}`! Pair `sealed interface` (restricting which shapes can implement it) with **Pattern Matching `switch`**, and bounded Generics `<T extends Number>` for rock-solid type safety.',
      asciiFlowchart: `  JAVA 21 SEALED HIERARCHY + GENERICS
  sealed interface Shape permits Circle, Square
         |
         +--> switch(shape) { case Circle c -> ...; case Square s -> ...; }
  (Compiler checks EVERY permitted case — zero forgotten branches!)`,
      pseudocode: [
        '1. USE `record` for immutable data-carrier models',
        '2. USE `class` with `private` fields when controlled mutation is required',
        '3. DEFINE narrow contracts with `interface` / `sealed interface`',
        '4. PARAMETERIZE generic classes/methods with `<T extends Comparable<T>>`',
        '5. PREFER composition over deep inheritance hierarchies',
      ],
      banglaZeroToHero: {
        analogyTitle: 'আধুনিক Java 21 `record` কার্ড ও `sealed` চুক্তি',
        explanation:
          'পুরোনো Java-তে ২০ লাইনের ক্লাস, কনস্ট্রাক্টর ও `equals()` লিখতে হতো! Java 21-এ এক লাইনের `record Player(String name, int score) {}` লিখলেই পুরো ইমিউটেবল মডেল রেডি! আর `sealed interface Shape permits Circle, Square` লিখে দিলে কম্পাইলার জানে কেবল এই দুটো শেপই সম্ভব—ফলে `switch`-এ কোনো কেস বাদ পড়লেই সাথে সাথে এরর ধরে দেয়!',
        everydayExample:
          'ভিআইপি পাস (sealed): কেবল অনুমোদিত ২টি বিভাগই এই পাস ব্যবহার করতে পারবে, অন্য কেউ নয়।',
        keyTakeaways: [
          '`record`-এর ফিল্ডগুলো `final` (অপরিবর্তনীয়) এবং `equals/hashCode/toString` অটো তৈরি হয়।',
          'জেনেরিকসে প্রিমিটিভ `int` নয়, র‍্যাপার `Integer` বা `<T extends Comparable<T>>` ব্যবহার করতে হয়।',
          'ভেতরের ডেটা সুরক্ষিত রাখতে ক্লাস ফিল্ড সবসময় `private` রাখো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Generic Player<T extends Number> Class',
        banglaNote: 'বাউন্ডেড জেনেরিক `<T extends Number>` সহ Player ক্লাস ও বুস্ট মেথড।',
        code: `import java.util.Scanner;

public class Main {
    static class Player<T extends Number> {
        String name;
        int score;
        Player(String name, int score) { this.name = name; this.score = score; }
        void boost(int delta) { this.score += delta; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Player<Integer> p = new Player<>(sc.next(), sc.nextInt());
        p.boost(sc.nextInt());
        System.out.println(p.name + ":" + p.score);
    }
}`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'java-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Java 21 Compact Record Constructor Guard',
        banglaNote: '`record` কমপ্যাক্ট কনস্ট্রাক্টরের ভেতরেই ইনভ্যালিড নেগেটিভ স্কোর ০ করে দেওয়া।',
        code: `import java.util.Scanner;

public class Main {
    record ScoreCard(String name, int score) {
        ScoreCard {
            if (score < 0) score = 0;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ScoreCard card = new ScoreCard(sc.next(), sc.nextInt());
        System.out.println(card.name() + ":" + card.score());
    }
}`,
        stdin: 'Nadia -40',
        expectedOutput: 'Nadia:0',
      },
      {
        id: 'java-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Java 21 Sealed Interface + Pattern-Matching Switch',
        banglaNote: '`sealed interface` ও Java 21 প্যাটার্ন ম্যাচিং `switch` দিয়ে জিরো-কাস্ট পলিমরফিজম।',
        code: `import java.util.Scanner;

public class Main {
    sealed interface Shape permits Square, Rect {}
    record Square(int s) implements Shape {}
    record Rect(int w, int h) implements Shape {}

    static int area(Shape sh) {
        return switch (sh) {
            case Square(int s) -> s * s;
            case Rect(int w, int h) -> w * h;
        };
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        Shape sh = kind.equals("sq") ? new Square(sc.nextInt()) : new Rect(sc.nextInt(), sc.nextInt());
        System.out.println(area(sh));
    }
}`,
        stdin: 'rect 5 7',
        expectedOutput: '35',
      },
      {
        id: 'java-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Generic Bounded Max Helper <T extends Comparable<T>>',
        banglaNote: '`Comparable<T>` ব্যবহার করে `Integer`, `String` বা যেকোনো তুলনাযোগ্য টাইপের সর্বোচ্চ বের করা।',
        code: `import java.util.Scanner;

public class Main {
    static <T extends Comparable<T>> T maxOf(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        System.out.println(maxOf(a, b));
    }
}`,
        stdin: '19 42',
        expectedOutput: '42',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'static class Player<T extends Number> {',
        whatItMeans: 'Declares a generic class constraining `T` to numeric subtypes.',
        whyItIsThere: 'Prevents nonsensical instantiations like `Player<Boolean>`.',
        ifDeletedError: 'Compile error: `Player` cannot be resolved.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'void boost(int delta) { this.score += delta; }',
        whatItMeans: 'Mutates the instance’s `score` field via `this`.',
        whyItIsThere: 'Encapsulates state update cleanly inside the class.',
        ifDeletedError: '`p.boost(...)` fails compilation.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'Player<Integer> p = new Player<>(sc.next(), sc.nextInt());',
        whatItMeans: 'Uses diamond inference `<>` to instantiate `Player<Integer>`.',
        whyItIsThere: 'Constructs a concrete instance from stdin tokens.',
        ifDeletedError: '`p` undefined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'new Player<>("Rafi", 85)', memoryOrStack: 'Heap Player{name="Rafi", score=85}', note: 'Constructor sets fields' },
      { step: 2, state: 'p.boost(15)', memoryOrStack: 'this.score = 85 + 15', note: 'Mutates field to 100' },
      { step: 3, state: 'Concatenate "Rafi:100"', memoryOrStack: 'stdout: Rafi:100', note: 'Exact match' },
      { step: 4, state: 'GC reclaims Player', memoryOrStack: 'Clean exit', note: 'Zero leaks' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Instantiate Generics With Primitives `List<int>`',
        brokenCode: `Player<int> p; // Syntax error in Java Generics!`,
        fixedCode: `Player<Integer> p; // Always use Wrapper types with Generics`,
        whyItBreaks: 'Java generics use type erasure to `Object`, which cannot hold raw primitives directly.',
      },
      {
        title: 'Trap 2: Comparing Objects With `==` Instead of `.equals()`',
        brokenCode: `if (card1 == card2) // Compares memory addresses, NOT record values!`,
        fixedCode: `if (card1.equals(card2)) // Compares fields cleanly`,
        whyItBreaks: '`record` automatically generates a proper `.equals()`, whereas `==` checks identity.',
      },
      {
        title: 'Trap 3: Overriding Method Without `@Override` Annotation',
        brokenCode: `public String tostring() { ... } // Typo silently creates unrelated method!`,
        fixedCode: `@Override public String toString() { ... }`,
        whyItBreaks: '`@Override` makes the compiler catch method signature typos immediately.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Java 21 Record Rect Area & Perimeter',
        prompt: 'Create `record Rect(int w, int h)` with `area()` and `perim()` methods.',
        banglaHint: '`record Rect(int w, int h)` ভেতর দুটি মেথড লিখো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    record Rect(int w, int h) { int area() { return w * h; } int perim() { return 2 * (w + h); } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); Rect r = new Rect(sc.nextInt(), sc.nextInt());\n        System.out.println(r.area() + " " + r.perim());\n    }\n}`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'java-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Generic Pair Swap / Max',
        prompt: 'Write generic `<T extends Comparable<T>> T minOf(T a, T b)` and print result.',
        banglaHint: '`a.compareTo(b) <= 0 ? a : b` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static <T extends Comparable<T>> T minOf(T a, T b) { return a.compareTo(b) <= 0 ? a : b; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); System.out.println(minOf(sc.nextInt(), sc.nextInt()));\n    }\n}`,
        sampleStdin: '19 42',
        expectedOutput: '19',
      },
      {
        id: 'java-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Private Field Clamp Guard',
        prompt: 'Build `Counter` preventing negative balance on withdraw.',
        banglaHint: '`private int val;` ও `Math.max(0, ...)` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static class Counter { private int v; Counter(int v) { this.v = Math.max(0, v); } void add(int d) { v = Math.max(0, v + d); } int get() { return v; } }\n    public static void main(String[] args) { Scanner sc = new Scanner(System.in); Counter c = new Counter(sc.nextInt()); c.add(sc.nextInt()); System.out.println(c.get()); }\n}`,
        sampleStdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'java-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Sealed Interface Area Switch',
        prompt: 'Implement `sealed interface Shape permits Circle, Square` (use `r*r*3` for Circle) and print area.',
        banglaHint: '`switch (sh)` দিয়ে প্যাটার্ন ম্যাচ করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    sealed interface Shape permits Circle, Square {}\n    record Circle(int r) implements Shape {}\n    record Square(int s) implements Shape {}\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Shape sh = sc.next().equals("sq") ? new Square(sc.nextInt()) : new Circle(sc.nextInt());\n        int a = switch (sh) { case Square(int s) -> s * s; case Circle(int r) -> 3 * r * r; };\n        System.out.println(a);\n    }\n}`,
        sampleStdin: 'sq 9',
        expectedOutput: '81',
      },
      {
        id: 'java-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Generic Stack<T> Top Peek',
        prompt: 'Build `class MyStack<T>` backed by `ArrayList<T>`, push n ints, pop and print top.',
        banglaHint: '`list.remove(list.size() - 1)` দিয়ে পপ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class MyStack<T> { private final List<T> list = new ArrayList<>(); void push(T v) { list.add(v); } T pop() { return list.remove(list.size() - 1); } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt(); MyStack<Integer> st = new MyStack<>();\n        for (int i = 0; i < n; i++) st.push(sc.nextInt());\n        System.out.println(st.pop());\n    }\n}`,
        sampleStdin: '3\n10 20 99',
        expectedOutput: '99',
      },
    ],
    miniBuild: {
      title: 'Java 21 Mini Build: Generic Player<T> Scorer',
      description: 'Models a generic Player<T> class with encapsulated boost method.',
      banglaGoal: 'Java 21 জেনেরিকস ও ক্লাস এনক্যাপসুলেশন দিয়ে প্লেয়ার স্কোর ম্যানেজ করা।',
      combinesChapters: 'Ch 1–8',
      starterCode: `import java.util.Scanner;

public class Main {
    static class Player<T extends Number> {
        String name;
        int score;
        Player(String name, int score) { this.name = name; this.score = score; }
        void boost(int delta) { this.score += delta; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Player<Integer> p = new Player<>(sc.next(), sc.nextInt());
        p.boost(sc.nextInt());
        System.out.println(p.name + ":" + p.score);
    }
}`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 8 (ES2025): Classes, Private Fields (#) & Composition',
    banglaTitle: 'JavaScript অধ্যায় ৮ (ES2025): ক্লাস, প্রাইভেট ফিল্ড (#) ও কম্পোজিশন',
    subtitle: 'Master ES2025 class syntax, hard private fields (#score), static factory methods, and composition over deep inheritance.',
    zeroIntuition: {
      plainEnglishStory:
        'In modern ES2025 JavaScript, writing `#score` inside a `class` enforces **true runtime privacy**—external code literally cannot read or overwrite `p.#score` directly! Combine `#private` fields with clean `static` factories and composition (combining small single-purpose helpers) for rock-solid UI/API models.',
      asciiFlowchart: `  ES2025 CLASS WITH PRIVATE #FIELD
  class Player {
    #score;            <-- Truly hidden outside class! (SyntaxError if read!)
    boost(d) { ... }   <-- Controlled public method validates & updates #score
  }`,
      pseudocode: [
        '1. DECLARE internal invariants as `#private` fields inside `class`',
        '2. VALIDATE inputs in `constructor` and mutating methods',
        '3. EXPOSE clean getters (`get score()`) instead of raw mutable fields',
        '4. USE `static` factory methods (`Player.fromLine(...)`) for clean parsing',
        '5. PREFER composition (`has-a`) over fragile multi-level `extends`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সিলগালা হ্যাশ লক (`#private`) ও কারখানার ছাঁচ (`static`)',
        explanation:
          'আগে JavaScript-এ প্রাইভেট ফিল্ড বোঝাতে `_score` লেখা হতো, কিন্তু বাইরে থেকে তবু বদলে ফেলা যেত! আধুনিক ES2025-এ `#score` (হ্যাশ চিহ্ন) দিয়ে ফিল্ড লিখলে বাইরে থেকে সেটি পড়া বা বদলানো একেবারেই অসম্ভব—এটি ব্রাউজার নিজেই ব্লক করে দেয়! আর `Player.fromText()`-এর মতো `static` মেথড দিয়ে সরাসরি ইনপুট পার্স করে সুন্দর অবজেক্ট তৈরি করা যায়।',
        everydayExample:
          'ব্যাংকের এটিএম মেশিন: ভেতরের টাকার ড্রয়ার (`#cash`) তালাবদ্ধ, আপনি শুধু সামনের বোতাম (`withdraw()`) চেপেই কাজ করতে পারবেন!',
        keyTakeaways: [
          '`#field` হলো true private field—ক্লাসের বাইরে লিখলেই SyntaxError দেবে।',
          '`static` মেথড ক্লাসের নামের ওপর কল হয় (`Player.create(...)`), ইনস্ট্যান্সের ওপর নয়।',
          'মেথডকে callback হিসেবে পাঠালে `this` হারিয়ে যেতে পারে—arrow ফাংশন দিয়ে বাউন্ড রাখো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Player Class With Boost Method',
        banglaNote: '`class Player` তৈরি করে কনস্ট্রাক্টর ও `boost(delta)` মেথড চালানো।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, s, d] = raw.trim().split(/\\s+/);

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  boost(delta) { this.score += delta; }
}

const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'js-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: True Private Field (#balance) Non-Negative Guard',
        banglaNote: '`#balance` প্রাইভেট ফিল্ড ও গেটার দিয়ে নেগেটিভ ব্যালেন্স প্রতিরোধ।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [init, delta] = raw.trim().split(/\\s+/).map(Number);

class Wallet {
  #balance;
  constructor(v) { this.#balance = Math.max(0, v); }
  apply(d) { this.#balance = Math.max(0, this.#balance + d); }
  get balance() { return this.#balance; }
}

const w = new Wallet(init);
w.apply(delta);
console.log(w.balance);`,
        stdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'js-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Static Factory Method + Method Chaining',
        banglaNote: '`static fromLine()` ও `return this` ব্যবহার করে ফ্লুয়েন্ট মেথড চেইনিং।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

class Builder {
  constructor(n) { this.val = n; }
  static fromText(t) { return new Builder(Number(t.trim() || 0)); }
  add(x) { this.val += x; return this; }
  scale(k) { this.val *= k; return this; }
}

const out = Builder.fromText(raw).add(5).scale(2).val;
console.log(out);`,
        stdin: '10',
        expectedOutput: '30',
      },
      {
        id: 'js-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Polymorphic Duck-Typed Shape Array',
        banglaNote: 'কোনো বেস ক্লাস ছাড়াই একই `.area()` ইন্টারফেস মানা অবজেক্টগুলোর মোট ক্ষেত্রফল।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [s, w, h] = raw.trim().split(/\\s+/).map(Number);

class Square { constructor(s) { this.s = s; } area() { return this.s * this.s; } }
class Rect { constructor(w, h) { this.w = w; this.h = h; } area() { return this.w * this.h; } }

const shapes = [new Square(s), new Rect(w, h)];
const total = shapes.reduce((acc, sh) => acc + sh.area(), 0);
console.log(total);`,
        stdin: '4 5 3',
        expectedOutput: '31',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'class Player {',
        whatItMeans: 'Declares a reusable ES2025 class blueprint.',
        whyItIsThere: 'Groups state (`name`, `score`) and behavior (`boost`) cleanly.',
        ifDeletedError: 'ReferenceError: `Player` is not defined.',
      },
      {
        lineNumber: 'Line 6-9',
        codeSnippet: 'constructor(name, score) { this.name = name; this.score = score; }',
        whatItMeans: 'Runs automatically on `new Player(...)` to initialize instance properties.',
        whyItIsThere: 'Ensures every created `Player` starts with valid properties.',
        ifDeletedError: '`p.name` and `p.score` become `undefined`.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'boost(delta) { this.score += delta; }',
        whatItMeans: 'Prototype method updating `this.score`.',
        whyItIsThere: 'Shared across all `Player` instances in memory.',
        ifDeletedError: 'TypeError: `p.boost is not a function`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'new Player("Rafi", 85)', memoryOrStack: 'Heap Player{name:"Rafi", score:85}', note: 'constructor assigns fields' },
      { step: 2, state: 'p.boost(15)', memoryOrStack: 'this === p', note: 'this.score = 85 + 15' },
      { step: 3, state: 'p.score is 100', memoryOrStack: 'Player{name:"Rafi", score:100}', note: 'Mutated cleanly' },
      { step: 4, state: 'console.log("Rafi:100")', memoryOrStack: 'stdout: Rafi:100', note: 'Matches expected' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Losing `this` When Passing a Class Method as a Callback',
        brokenCode: `const fn = player.boost; fn(10); // TypeError: Cannot read properties of undefined!`,
        fixedCode: `const fn = (d) => player.boost(d); // Preserves receiver`,
        whyItBreaks: 'Detaching a method loses its `this` binding in strict mode (`class` bodies are always strict).',
      },
      {
        title: 'Trap 2: Calling a `class` Without `new`',
        brokenCode: `const p = Player("Rafi", 85); // TypeError: Class constructor cannot be invoked without "new"`,
        fixedCode: `const p = new Player("Rafi", 85);`,
        whyItBreaks: 'ES6+ classes strictly require `new`.',
      },
      {
        title: 'Trap 3: Accessing `#private` Field Outside the Class',
        brokenCode: `console.log(wallet.#balance); // SyntaxError!`,
        fixedCode: `console.log(wallet.balance); // Expose a clean getter instead`,
        whyItBreaks: 'Hash private fields are strictly enforced at parse/runtime.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Rect Class Area & Perimeter',
        prompt: 'Create `class Rect(w, h)` with `area()` and `perim()`.',
        banglaHint: 'কনস্ট্রাক্টরে `this.w` ও `this.h` সেট করে দুটি মেথড লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [w, h] = raw.trim().split(/\\s+/).map(Number);\nclass Rect { constructor(w, h) { this.w = w; this.h = h; } area() { return this.w * this.h; } perim() { return 2 * (this.w + this.h); } }\nconst r = new Rect(w, h);\nconsole.log(\`\${r.area()} \${r.perim()}\`);`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'js-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Static Factory From Input String',
        prompt: 'Add `static fromPair(s)` to `Point` class and print `x + y`.',
        banglaHint: '`static fromPair(s)` মেথডে স্প্লিট করে `new Point` রিটার্ন করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Point { constructor(x, y) { this.x = x; this.y = y; } static fromPair(s) { const [x, y] = s.trim().split(/\\s+/).map(Number); return new Point(x, y); } }\nconst p = Point.fromPair(raw);\nconsole.log(p.x + p.y);`,
        sampleStdin: '12 30',
        expectedOutput: '42',
      },
      {
        id: 'js-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Encapsulated #count Private Counter',
        prompt: 'Implement `Counter` with `#count` that never drops below 0.',
        banglaHint: '`#count = Math.max(0, ...)` প্রাইভেট ফিল্ড ও গেটার ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [s, d] = raw.trim().split(/\\s+/).map(Number);\nclass Counter { #v; constructor(v) { this.#v = Math.max(0, v); } add(d) { this.#v = Math.max(0, this.#v + d); } get val() { return this.#v; } }\nconst c = new Counter(s); c.add(d); console.log(c.val);`,
        sampleStdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'js-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Composition Over Inheritance (Engine inside Car)',
        prompt: 'Create `Engine(hp)` composed inside `Car(name, engine)` and print `<name>:<hp>`.',
        banglaHint: '`this.engine = new Engine(hp)` কম্পোজিশন ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [name, hp] = raw.trim().split(/\\s+/);\nclass Engine { constructor(hp) { this.hp = hp; } }\nclass Car { constructor(name, hp) { this.name = name; this.engine = new Engine(Number(hp)); } }\nconst c = new Car(name, hp);\nconsole.log(\`\${c.name}:\${c.engine.hp}\`);`,
        sampleStdin: 'ArgonGT 450',
        expectedOutput: 'ArgonGT:450',
      },
      {
        id: 'js-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Mini Stack Class With Method Chaining',
        prompt: 'Implement `Stack` with `.push(v)` returning `this`, push n ints, print `.pop()`.',
        banglaHint: '`push(v)` শেষে `return this;` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nclass Stack { #a = []; push(v) { this.#a.push(v); return this; } pop() { return this.#a.pop(); } }\nconst st = new Stack();\nfor (let i = 1; i <= nums[0]; i++) st.push(nums[i]);\nconsole.log(st.pop());`,
        sampleStdin: '3\n10 20 99',
        expectedOutput: '99',
      },
    ],
    miniBuild: {
      title: 'ES2025 Mini Build: Player Class & Boost Method',
      description: 'Models a clean Player class encapsulating name, score, and boost mutation.',
      banglaGoal: 'ES2025 ক্লাস ও মেথড ব্যবহার করে প্লেয়ার অবজেক্ট মডেল তৈরি।',
      combinesChapters: 'Ch 1–8',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, s, d] = raw.trim().split(/\\s+/);
class Player {
  constructor(name, score) { this.name = name; this.score = score; }
  boost(delta) { this.score += delta; }
}
const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  rust: {
    title: 'Rust Chapter 8 (Rust 2024): Structs, Enums, Traits & Generic Monomorphization',
    banglaTitle: 'Rust অধ্যায় ৮ (Rust 2024): স্ট্রাক্ট, ইনাম, ট্রেইট ও জেনেরিকস',
    subtitle: 'Model domain invariants with struct + impl, algebraic enums + match, shared Trait contracts, and zero-cost generics.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust replaces traditional class inheritance with **Composition + Traits + Algebraic Enums**: `struct` holds fields, `impl` attaches methods, and `trait Scorable` defines shared capabilities. Generic functions `<T: Scorable>` monomorphize at compile time into specialized machine code—zero vtable cost!',
      asciiFlowchart: `  RUST TRAIT CONTRACT & MONOMORPHIZATION
  trait Scorable { fn boost(&mut self, delta: i32); }
       ^
       | impl Scorable for Player
  struct Player { name: String, score: i32 }
  fn apply<T: Scorable>(x: &mut T) --> Zero-cost static dispatch!`,
      pseudocode: [
        '1. DEFINE data layout cleanly in `struct` or data-carrying `enum`',
        '2. ATTACH constructors (`fn new(...)`) and methods inside `impl StructName`',
        '3. SPECIFY shared behavior contracts via `trait` + `impl Trait for Type`',
        '4. CONSTRAIN generic functions with trait bounds (`fn top<T: Ord>(a: T, b: T)`)',
        '5. MATCH every `enum` variant exhaustively so impossible states fail compilation',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দক্ষতার সার্টিফিকেট (`trait`) এবং জিরো-কস্ট জেনেরিকস',
        explanation:
          'Rust-এ পিতা-পুত্র ইনহেরিটেন্স (`extends`) নেই, বরং আছে **Trait**! একটি `trait` হলো একটি দক্ষতার সার্টিফিকেট (যেমন "গাড়ি চালাতে পারে" বা `Scorable`)। যেকোনো `struct` ওই ট্রেইটের নিয়ম `impl` করলেই সে ওই সুবিধা পাবে! আর `<T: Ord>` লিখলে কম্পাইলার প্রতি টাইপের জন্য একদম দ্রুতগতির নিজস্ব মেশিন কোড বানিয়ে দেয়—কোনো রানটাইম ধীরগতি ছাড়াই!',
        everydayExample:
          'একটি ড্রাইভিং লাইসেন্স (`Trait`): কার, ট্রাক বা বাস—যে গাড়িই হোক লাইসেন্স নিয়ম মানলে রাস্তায় চলতে পারবে!',
        keyTakeaways: [
          'Rust `struct`-এ মেথডের প্রথম প্যারামিটার `&self` (পড়া), `&mut self` (বদলানো), বা `self` (consume করা) হয়।',
          '`enum` প্রতিটি শাখায় আলাদা ডেটা রাখতে পারে (যেমন `Square(i32)` vs `Rect(i32, i32)`), যা `match` দিয়ে ১০০% সেফলি হ্যান্ডেল করা যায়।',
          '`#[derive(Debug, Clone, PartialEq)]` লিখে এক লাইনে অনেক দরকারি ট্রেইট ফ্রি পাওয়া যায়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Trait Scorable & Struct Impl',
        banglaNote: '`trait Scorable` এবং `impl Scorable for Player` দিয়ে ক্লিন পলিমরফিজম।',
        code: `use std::io::{self, Read};

trait Scorable { fn boost(&mut self, delta: i32); }
struct Player { name: String, score: i32 }
impl Scorable for Player {
    fn boost(&mut self, delta: i32) { self.score += delta; }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let parts: Vec<&str> = s.split_whitespace().collect();
    let mut p = Player { name: parts[0].to_string(), score: parts[1].parse().unwrap() };
    p.boost(parts[2].parse().unwrap());
    println!("{}:{}", p.name, p.score);
}`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'rust-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Algebraic Enum Shape & Exhaustive match',
        banglaNote: 'ডেটা-বহনকারী `enum` এবং `match` দিয়ে প্রতিটি শেপের ক্ষেত্রফল ১০০% নির্ভুলভাবে গণনা।',
        code: `use std::io::{self, Read};

enum Shape { Square(i32), Rect(i32, i32) }
impl Shape {
    fn area(&self) -> i32 {
        match *self {
            Shape::Square(s) => s * s,
            Shape::Rect(w, h) => w * h,
        }
    }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let p: Vec<&str> = s.split_whitespace().collect();
    let sh = if p[0] == "sq" { Shape::Square(p[1].parse().unwrap()) } else { Shape::Rect(p[1].parse().unwrap(), p[2].parse().unwrap()) };
    println!("{}", sh.area());
}`,
        stdin: 'rect 5 7',
        expectedOutput: '35',
      },
      {
        id: 'rust-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Generic Zero-Cost Function With Trait Bound (`T: Ord`)',
        banglaNote: '`fn max_of<T: Ord>(a: T, b: T) -> T` জেনেরিক বাউন্ড দিয়ে জিরো-কস্ট তুলনা।',
        code: `use std::io::{self, Read};

fn max_of<T: Ord>(a: T, b: T) -> T {
    if a >= b { a } else { b }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    println!("{}", max_of(v[0], v[1]));
}`,
        stdin: '19 42',
        expectedOutput: '42',
      },
      {
        id: 'rust-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Generic Stack<T> With #[derive(Debug, Default)]',
        banglaNote: '`#[derive(Default)]` ও জেনেরিক `struct Stack<T>` তৈরি করে যেকোনো টাইপ রাখা।',
        code: `use std::io::{self, Read};

struct Stack<T> { buf: Vec<T> }
impl<T> Stack<T> {
    fn new() -> Self { Self { buf: Vec::new() } }
    fn push(&mut self, v: T) { self.buf.push(v); }
    fn pop(&mut self) -> Option<T> { self.buf.pop() }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i32> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    let mut st = Stack::new();
    for &x in &v[1..=v[0] as usize] { st.push(x); }
    println!("{}", st.pop().unwrap_or(-1));
}`,
        stdin: '3\n10 20 99',
        expectedOutput: '99',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'trait Scorable { fn boost(&mut self, delta: i32); }',
        whatItMeans: 'Defines a behavioral interface requiring a mutable `boost` method.',
        whyItIsThere: 'Decouples the `Scorable` contract from concrete struct representations.',
        ifDeletedError: 'Compile error: cannot find trait `Scorable`.',
      },
      {
        lineNumber: 'Line 5-7',
        codeSnippet: 'impl Scorable for Player { fn boost(&mut self, delta: i32) { self.score += delta; } }',
        whatItMeans: 'Implements `Scorable` for `Player`, mutating `self.score` via `&mut self`.',
        whyItIsThere: 'Grants `Player` the `boost` capability safely.',
        ifDeletedError: 'Compile error: `no method named "boost" found for struct Player`.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'let mut p = Player { ... };',
        whatItMeans: 'Marks `p` mutable so `p.boost(...)` can borrow `&mut p`.',
        whyItIsThere: 'Calling a `&mut self` method requires an owned mutable binding.',
        ifDeletedError: 'Omitting `mut` yields `error[E0596]: cannot borrow p as mutable`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Player p { name:"Rafi", score:85 }', memoryOrStack: 'String on Heap, score on Stack', note: 'Mutably bound' },
      { step: 2, state: 'p.boost(15)', memoryOrStack: '&mut self borrows p', note: 'self.score = 85 + 15' },
      { step: 3, state: 'Borrow ends -> score=100', memoryOrStack: 'p={ "Rafi", 100 }', note: 'In-place update' },
      { step: 4, state: 'println!("Rafi:100")', memoryOrStack: 'stdout: Rafi:100', note: 'p.name auto-dropped' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Omitting `mut` on `self` Inside Mutating Method',
        brokenCode: `fn boost(&self, d: i32) { self.score += d; } // Error: &self is immutable!`,
        fixedCode: `fn boost(&mut self, d: i32) { self.score += d; }`,
        whyItBreaks: '`&self` grants read-only access; writes require `&mut self`.',
      },
      {
        title: 'Trap 2: Moving `self` Accidentally in a Getter',
        brokenCode: `fn get_name(self) -> String { self.name } // Consumes whole struct!`,
        fixedCode: `fn get_name(&self) -> &str { &self.name }`,
        whyItBreaks: 'Taking `self` by value destroys the caller’s struct after one call!',
      },
      {
        title: 'Trap 3: Generic Function Missing Trait Bounds',
        brokenCode: `fn max_of<T>(a: T, b: T) -> T { if a > b { a } else { b } } // Error: > not implemented!`,
        fixedCode: `fn max_of<T: PartialOrd>(a: T, b: T) -> T { if a > b { a } else { b } }`,
        whyItBreaks: 'Rust checks generic bodies against explicit trait bounds BEFORE monomorphization.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Rect Struct & impl Methods',
        prompt: 'Create `struct Rect { w: i32, h: i32 }` with `area(&self)` and `perim(&self)`.',
        banglaHint: '`impl Rect` এর ভেতর `&self` মেথড লিখো।',
        starterCode: `use std::io::{self, Read};\nstruct Rect { w: i32, h: i32 }\nimpl Rect { fn area(&self) -> i32 { self.w * self.h } fn perim(&self) -> i32 { 2 * (self.w + self.h) } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let r = Rect { w: v[0], h: v[1] }; println!("{} {}", r.area(), r.perim());\n}`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'rust-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Trait Summary Implementation',
        prompt: 'Implement `trait Summary { fn text(&self) -> String; }` for `User { name, xp }`.',
        banglaHint: '`format!("{}:{}", self.name, self.xp)` রিটার্ন করো।',
        starterCode: `use std::io::{self, Read};\ntrait Summary { fn text(&self) -> String; }\nstruct User { name: String, xp: i32 }\nimpl Summary for User { fn text(&self) -> String { format!("{}:{}", self.name, self.xp) } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let p: Vec<&str> = s.split_whitespace().collect();\n    let u = User { name: p[0].to_string(), xp: p[1].parse().unwrap() }; println!("{}", u.text());\n}`,
        sampleStdin: 'Arjun 250',
        expectedOutput: 'Arjun:250',
      },
      {
        id: 'rust-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Encapsulated Counter Non-Negative Guard',
        prompt: 'Keep `val: i32` updated via `add(&mut self, d)` clamping at 0.',
        banglaHint: '`self.val = (self.val + d).max(0);` লিখো।',
        starterCode: `use std::io::{self, Read};\nstruct Counter { val: i32 }\nimpl Counter { fn new(v: i32) -> Self { Self { val: v.max(0) } } fn add(&mut self, d: i32) { self.val = (self.val + d).max(0); } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let mut c = Counter::new(v[0]); c.add(v[1]); println!("{}", c.val);\n}`,
        sampleStdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'rust-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Enum + Exhaustive Match Evaluator',
        prompt: 'Create `enum Op { Add(i32, i32), Mul(i32, i32) }` and evaluate with `match`.',
        banglaHint: '`match op` দিয়ে দুই শাখা সমাধান করো।',
        starterCode: `use std::io::{self, Read};\nenum Op { Add(i32, i32), Mul(i32, i32) }\nfn eval(op: Op) -> i32 { match op { Op::Add(a, b) => a + b, Op::Mul(a, b) => a * b } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let p: Vec<&str> = s.split_whitespace().collect();\n    let (a, b): (i32, i32) = (p[1].parse().unwrap(), p[2].parse().unwrap());\n    let op = if p[0] == "mul" { Op::Mul(a, b) } else { Op::Add(a, b) };\n    println!("{}", eval(op));\n}`,
        sampleStdin: 'mul 6 7',
        expectedOutput: '42',
      },
      {
        id: 'rust-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Generic Bounded Pair<T: Ord> Sorting',
        prompt: 'Implement `struct Pair<T>(T, T)` with `fn sorted(self) -> (T, T)` where `T: Ord`.',
        banglaHint: '`if self.0 <= self.1 { (self.0, self.1) } else { (self.1, self.0) }` লিখো।',
        starterCode: `use std::io::{self, Read};\nstruct Pair<T>(T, T);\nimpl<T: Ord> Pair<T> { fn sorted(self) -> (T, T) { if self.0 <= self.1 { (self.0, self.1) } else { (self.1, self.0) } } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (a, b) = Pair(v[0], v[1]).sorted(); println!("{} {}", a, b);\n}`,
        sampleStdin: '50 12',
        expectedOutput: '12 50',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Mini Build: Trait Scorable & Player Struct',
      description: 'Implements a Trait contract over a custom Struct with exclusive `&mut self` mutation.',
      banglaGoal: 'Rust ট্রেইট এবং `struct impl` ব্যবহার করে নিরাপদ ডোমেইন মডেল তৈরি।',
      combinesChapters: 'Ch 1–8',
      starterCode: `use std::io::{self, Read};

trait Scorable { fn boost(&mut self, delta: i32); }
struct Player { name: String, score: i32 }
impl Scorable for Player {
    fn boost(&mut self, delta: i32) { self.score += delta; }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let parts: Vec<&str> = s.split_whitespace().collect();
    let mut p = Player { name: parts[0].to_string(), score: parts[1].parse().unwrap() };
    p.boost(parts[2].parse().unwrap());
    println!("{}:{}", p.name, p.score);
}`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 8 (TS 5.x): Interfaces, Generics & Discriminated Unions',
    banglaTitle: 'TypeScript অধ্যায় ৮ (TS 5.x): ইন্টারফেস, জেনেরিকস ও ইউনিয়ন',
    subtitle: 'Master interface contracts, Generic classes & constraints (<T>), and exhaustive discriminated union modeling.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript shines brightest when modeling domain contracts: `interface Scorable<T>` enforces exact shapes across classes, `<T extends { score: number }>` restricts generics to valid objects, and **Discriminated Unions** (`kind: "square" | "rect"`) make `switch` statements catch unhandled variants at compile time!',
      asciiFlowchart: `  TS 5.x DISCRIMINATED UNION + INTERFACE
  type Shape = { kind: 'sq'; s: number } | { kind: 'rect'; w: number; h: number };
  switch (sh.kind) {
    case 'sq':   sh.s * sh.s     (TS knows sh has .s!)
    case 'rect': sh.w * sh.h     (TS knows sh has .w & .h!)
  }`,
      pseudocode: [
        '1. DEFINE structural contracts with `interface`',
        '2. IMPLEMENT contracts cleanly on `class` models',
        '3. PARAMETERIZE reusable containers with `<T>` generics',
        '4. MODEL finite domain variants as Discriminated Unions (`kind` tag)',
        '5. ENFORCE exhaustiveness in `switch` via `never` check',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দোকানের রসিদের ছক (`interface`) ও জেনেরিক বক্স (`Box<T>`)',
        explanation:
          'একটি রেস্তোরাঁর প্রতিটি বিলের কাগজে যেমন ঠিক থাকেই "নাম" আর "টাকা", TypeScript-এর `interface` ঠিক তেমনই একটি চুক্তিপত্র! আর `Box<T>` হলো জেনেরিক কন্টেইনার: আজ এর ভেতরে `number` রাখলে এটি `Box<number>`, কাল `string` রাখলে এটি `Box<string>`—কিন্তু ভেতরে কী আছে তা TS সবসময় ১০০% মনে রাখে!',
        everydayExample:
          'চাকরির কন্ট্রাক্ট ফর্ম: ফর্মে লেখা প্রতিটি তথ্য পূরণ না করলে ফর্ম সাবমিট (কম্পাইল) হবে না!',
        keyTakeaways: [
          '`interface` শুধু কম্পাইল টাইমে থাকে—রানটাইম JS কোডে শূন্য বাইট যোগ করে!',
          'ইউনিয়ন টাইপে প্রতিটি শাখায় একটি কমন `kind` বা `type` ট্যাগ রাখলে `switch` খুবই পরিষ্কার হয়।',
          'জেনেরিক `<T>`-এর বদলে কখনো `any` লিখবে না—নইলে পুরো টাইপ-চেকিং নষ্ট হয়ে যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Interface Scorable<T> & Class Implementation',
        banglaNote: '`interface Scorable<T>` চুক্তি ইমপ্লিমেন্ট করে `Player` ক্লাস তৈরি।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, s, d] = raw.trim().split(/\\s+/);

interface Scorable<T> { name: string; score: T; boost(delta: T): void; }
class Player {
  name: string;
  score: number;
  constructor(name: string, score: number) { this.name = name; this.score = score; }
  boost(delta: number): void { this.score += delta; }
}

const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
        stdin: 'Rafi 85 15',
        expectedOutput: 'Rafi:100',
      },
      {
        id: 'ts-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Exhaustive Discriminated Union (`kind` Tag)',
        banglaNote: 'ডিসক্রিমিনেটেড ইউনিয়ন ও `switch` দিয়ে প্রতিটি শেপ টাইপ-সেফলি গণনা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const parts = raw.trim().split(/\\s+/);

type Shape = { kind: 'sq'; s: number } | { kind: 'rect'; w: number; h: number };
function area(sh: Shape): number {
  switch (sh.kind) {
    case 'sq': return sh.s * sh.s;
    case 'rect': return sh.w * sh.h;
  }
}
const sh: Shape = parts[0] === 'sq'
  ? { kind: 'sq', s: Number(parts[1]) }
  : { kind: 'rect', w: Number(parts[1]), h: Number(parts[2]) };
console.log(area(sh));`,
        stdin: 'rect 5 7',
        expectedOutput: '35',
      },
      {
        id: 'ts-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Generic Wrapper Box & Identity Helper',
        banglaNote: 'জেনেরিক `<T>` ব্যবহার করে `number` ও `string` উভয়ের জন্য টাইপ-সেফ র‍্যাপার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const val: number = Number(raw.trim() || 0);

function wrapPair(x: number, label: string): { value: number; label: string } {
  return { value: x * 2, label };
}
const box = wrapPair(val, 'doubled');
console.log(\`\${box.label}=\${box.value}\`);`,
        stdin: '21',
        expectedOutput: 'doubled=42',
      },
      {
        id: 'ts-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Generic Stack Class With Fluent Chaining',
        banglaNote: 'জেনেরিক ক্লাসে মেথড চেইনিং (`return this`) ব্যবহার করে দ্রুত স্ট্যাক অপারেশন।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);

class Stack<T> {
  private buf: T[] = [];
  push(v: T): this { this.buf.push(v); return this; }
  pop(): T | undefined { return this.buf.pop(); }
}

const st = new Stack<number>();
for (let i = 1; i <= nums[0]; i++) st.push(nums[i]);
console.log(st.pop());`,
        stdin: '3\n10 20 99',
        expectedOutput: '99',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'interface Scorable<T> { name: string; score: T; boost(delta: T): void; }',
        whatItMeans: 'Defines a generic contract parameterizing the numeric type `T`.',
        whyItIsThere: 'Guarantees implementing classes provide consistent field and method types.',
        ifDeletedError: '`Scorable` type contract disappears.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'constructor(name: string, score: number) { ... }',
        whatItMeans: 'Initializes typed properties when `new Player(...)` runs.',
        whyItIsThere: 'Strict property initialization ensures fields are never `undefined`.',
        ifDeletedError: 'Compile error: property has no initializer.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'boost(delta: number): void { this.score += delta; }',
        whatItMeans: 'Typed mutation method returning `void`.',
        whyItIsThere: 'Prevents passing strings like `"15"` into numeric addition.',
        ifDeletedError: 'Compile error when calling `p.boost(...)`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'new Player("Rafi", 85)', memoryOrStack: 'Player{name:"Rafi", score:85}', note: 'Typed fields checked' },
      { step: 2, state: 'p.boost(15)', memoryOrStack: 'this.score = 100', note: 'Mutates score cleanly' },
      { step: 3, state: 'Template literal "Rafi:100"', memoryOrStack: 'stdout: Rafi:100', note: 'Zero runtime overhead from interface' },
      { step: 4, state: 'End of script', memoryOrStack: 'All contracts verified', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `any` Inside Generic Helper Instead of `<T>`',
        brokenCode: `function first(arr: any[]): any { return arr[0]; } // Erases all caller type info!`,
        fixedCode: `function first<T>(arr: readonly T[]): T | undefined { return arr[0]; }`,
        whyItBreaks: '`<T>` preserves the exact element type across calls while `any` loses autocomplete and safety.',
      },
      {
        title: 'Trap 2: Omitting Tag in Union Types (`ShapeA | ShapeB`)',
        brokenCode: `type S = { r: number } | { w: number; h: number };`,
        fixedCode: `type S = { kind: 'c'; r: number } | { kind: 'r'; w: number; h: number };`,
        whyItBreaks: 'Explicit `kind` discriminants allow clean exhaustive `switch (s.kind)` checks.',
      },
      {
        title: 'Trap 3: Expecting `interface` Checks to Exist at Runtime',
        brokenCode: `if (obj instanceof Scorable) // Error: Scorable only refers to a type!`,
        fixedCode: `Check a concrete class with instanceof OR inspect a discriminant field ('score' in obj).`,
        whyItBreaks: 'Interfaces are erased completely when TypeScript compiles down to JavaScript.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Typed Rect Class Area & Perimeter',
        prompt: 'Create `class Rect` with `area(): number` and `perim(): number`.',
        banglaHint: 'টাইপড প্রপার্টি ও দুটি মেথড লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [w, h] = raw.trim().split(/\\s+/).map(Number);\nclass Rect { w: number; h: number; constructor(w: number, h: number) { this.w = w; this.h = h; } area(): number { return this.w * this.h; } perim(): number { return 2 * (this.w + this.h); } }\nconst r = new Rect(w, h);\nconsole.log(\`\${r.area()} \${r.perim()}\`);`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'ts-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Interface Account Balance Clamp',
        prompt: 'Guard `Counter` score so `add(d)` clamps below 0.',
        banglaHint: '`Math.max(0, this.val + d)` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [s, d] = raw.trim().split(/\\s+/).map(Number);\nclass Counter { val: number; constructor(v: number) { this.val = Math.max(0, v); } add(d: number): void { this.val = Math.max(0, this.val + d); } }\nconst c = new Counter(s); c.add(d); console.log(c.val);`,
        sampleStdin: '10 -25',
        expectedOutput: '0',
      },
      {
        id: 'ts-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Discriminated Union Calculator',
        prompt: 'Evaluate `{ kind: "add" | "mul", a: number, b: number }`.',
        banglaHint: '`switch (op.kind)` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [k, a, b] = raw.trim().split(/\\s+/);\ntype Op = { kind: 'add'; a: number; b: number } | { kind: 'mul'; a: number; b: number };\nconst op: Op = k === 'mul' ? { kind: 'mul', a: Number(a), b: Number(b) } : { kind: 'add', a: Number(a), b: Number(b) };\nconsole.log(op.kind === 'mul' ? op.a * op.b : op.a + op.b);`,
        sampleStdin: 'mul 6 7',
        expectedOutput: '42',
      },
      {
        id: 'ts-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Composition Model (Car + Engine)',
        prompt: 'Compose `Engine(hp)` inside `Car(name, hp)` and print `<name>:<hp>`.',
        banglaHint: '`this.engine = new Engine(hp)` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [name, hp] = raw.trim().split(/\\s+/);\nclass Engine { hp: number; constructor(hp: number) { this.hp = hp; } }\nclass Car { name: string; engine: Engine; constructor(name: string, hp: number) { this.name = name; this.engine = new Engine(hp); } }\nconst c = new Car(name, Number(hp));\nconsole.log(\`\${c.name}:\${c.engine.hp}\`);`,
        sampleStdin: 'ArgonGT 450',
        expectedOutput: 'ArgonGT:450',
      },
      {
        id: 'ts-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Generic Stack<number> Pop Top',
        prompt: 'Build `Stack<T>`, push n numbers, and print `.pop()`.',
        banglaHint: '`this.buf.pop()` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nclass Stack<T> { private buf: T[] = []; push(v: T): void { this.buf.push(v); } pop(): T | undefined { return this.buf.pop(); } }\nconst st = new Stack<number>();\nfor (let i = 1; i <= nums[0]; i++) st.push(nums[i]);\nconsole.log(st.pop());`,
        sampleStdin: '3\n10 20 99',
        expectedOutput: '99',
      },
    ],
    miniBuild: {
      title: 'TS 5.x Mini Build: Typed Player Contract',
      description: 'Combines interface contracts with a strongly typed Player class.',
      banglaGoal: 'TypeScript ইন্টারফেস ও ক্লাসের সমন্বয়ে টাইপ-সেফ অবজেক্ট ডিজাইন।',
      combinesChapters: 'Ch 1–8',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
interface Scorable<T> { name: string; score: T; boost(delta: T): void; }
class Player {
  name: string;
  score: number;
  constructor(name: string, score: number) { this.name = name; this.score = score; }
  boost(delta: number): void { this.score += delta; }
}
const [name, s, d] = raw.trim().split(/\\s+/);
const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
      sampleStdin: 'Rafi 85 15',
      expectedOutput: 'Rafi:100',
    },
  },

  html: {
    title: 'HTML5 Chapter 8: Reusable Components, <template> & Custom Elements',
    banglaTitle: 'HTML5 অধ্যায় ৮: রিইউজেবল কম্পোনেন্ট, <template> ও কাস্টম এলিমেন্ট',
    subtitle: 'Design modular UI cards using <template>, Web Components (customElements.define), and semantic <article> contracts.',
    zeroIntuition: {
      plainEnglishStory:
        'Just as C++/Rust use classes/structs for reusable data models, HTML5 gives you `<template>` (a dormant blueprint hidden from rendering until cloned!) and **Custom Elements** (`<player-card>`) so you can author reusable, encapsulated UI components right in vanilla HTML!',
      asciiFlowchart: `  HTML5 <template> BLUEPRINT CLONING
  <template id="card-tpl">  (Inert — not rendered!)
      <article>...</article>
  </template>
        |  tpl.content.cloneNode(true)
        v
  [Card 1: Rafi]  [Card 2: Zara]  (Reusable UI components!)`,
      pseudocode: [
        '1. DEFINE a reusable component blueprint inside `<template>`',
        '2. CLONE instances cleanly via `tpl.content.cloneNode(true)`',
        '3. POPULATE text safely using `.textContent` before appending to DOM',
        '4. ENCAPSULATE custom widget tags with `customElements.define("player-card", ...)`',
        '5. USE semantic `<article>` tags for self-contained card components',
      ],
      banglaZeroToHero: {
        analogyTitle: 'কেকের অদৃশ্য ছাঁচ (`<template>`) ও নিজস্ব HTML ট্যাগ (`<player-card>`)',
        explanation:
          'ধরো ওয়েবসাইটে ১০০টি একই রকম প্রোডাক্ট কার্ড দেখাতে হবে। ১০০ বার একই HTML না লিখে `<template>` ট্যাগের ভেতরে একটি অদৃশ্য ছাঁচ বানিয়ে রাখা যায়! ব্রাউজার সেটি প্রথমে দেখায় না—কিন্তু `cloneNode(true)` ডাকলেই মুহূর্তে নতুন কার্ড বেরিয়ে আসে! এমনকি `customElements.define` দিয়ে তুমি নিজের `<player-card>` নামের নতুন HTML ট্যাগও বানাতে পারবে!',
        everydayExample:
          'ইট বানানোর ছাঁচ: ছাঁচ একবার তৈরি করে তা দিয়ে হাজার হাজার অভিন্ন ইট (`<article>`) বানানো যায়।',
        keyTakeaways: [
          '`<template>` ট্যাগের ভেতরের কোড পেজ লোডের সময় স্ক্রিনে দেখা যায় না বা স্ক্রিপ্ট রান করে না—শুধু ক্লোন করে ব্যবহার করার জন্য থাকে।',
          'প্রতিটি স্বতন্ত্র কার্ড বা ব্লগ পোস্টের জন্য `<div class="card">`-এর বদলে `<article>` ব্যবহার করা সিমান্টিক।',
          'কাস্টম HTML এলিমেন্টের নামে অবশ্যই একটি হাইফেন (`-`) থাকতে হয়, যেমন `<player-card>`।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-8-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Semantic Reusable <article> Component Card',
        banglaNote: 'সিমান্টিক `<article>` ট্যাগে সুন্দর প্লেয়ার কার্ড কম্পোনেন্ট।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Reusable Component Card</h3>
  <article style="border:1px solid #334155;padding:16px;border-radius:10px;max-width:300px">
    <strong>Player:</strong> Rafi<br/>
    <span style="color:#34d399">Boosted Score: 100</span>
  </article>
</body></html>`,
        stdin: '',
        expectedOutput: 'Reusable Component Card',
      },
      {
        id: 'html-8-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: <template> Inert Blueprint + Safe Text Hydration',
        banglaNote: '`<template>` ছাঁচ ক্লোন করে XSS-মুক্ত `.textContent` দিয়ে কার্ড রেন্ডার করা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>&lt;template&gt; Blueprint Cards</h3>
  <template id="tpl">
    <article style="border:1px solid #334155;padding:12px;border-radius:8px;margin-bottom:8px">
      <strong class="name"></strong> · <span class="xp" style="color:#38bdf8"></span>
    </article>
  </template>
  <div id="mount"></div>
  <script>
    const tpl = document.getElementById('tpl');
    const mount = document.getElementById('mount');
    [['Rafi', 100], ['Zara', 140]].forEach(([n, x]) => {
      const node = tpl.content.cloneNode(true);
      node.querySelector('.name').textContent = n;
      node.querySelector('.xp').textContent = x + ' XP';
      mount.appendChild(node);
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Blueprint Cards',
      },
      {
        id: 'html-8-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Native Web Component (<player-badge>)',
        banglaNote: '`customElements.define` দিয়ে নিজস্ব `<player-badge>` HTML ট্যাগ তৈরি।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Custom Web Component</h3>
  <player-badge name="Rafi" score="100"></player-badge>
  <script>
    class PlayerBadge extends HTMLElement {
      connectedCallback() {
        this.innerHTML = '';
        const box = document.createElement('div');
        box.style.cssText = 'border:1px solid #38bdf8;padding:12px;border-radius:8px;display:inline-block';
        box.textContent = \`\${this.getAttribute('name')}:\${this.getAttribute('score')}\`;
        this.appendChild(box);
      }
    }
    customElements.define('player-badge', PlayerBadge);
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Custom Web Component',
      },
      {
        id: 'html-8-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Polymorphic Slot & Role Attribute Pattern',
        banglaNote: 'কম্পোনেন্ট ভ্যারিয়েন্ট (`data-variant="gold"`) দিয়ে একটি কার্ডকে বিভিন্ন স্টাইলে রূপান্তর।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Component Variants</h3>
  <article data-variant="gold" style="border:2px solid #f59e0b;padding:14px;border-radius:10px;max-width:260px">
    <span style="color:#fbbf24;font-weight:700">Champion Badge</span>
    <p style="margin:6px 0 0">Rafi — 100 pts</p>
  </article>
</body></html>`,
        stdin: '',
        expectedOutput: 'Component Variants',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: '<article style="border:1px solid ...">',
        whatItMeans: 'Semantic container representing an independent, reusable UI card.',
        whyItIsThere: 'Signals self-contained content to browsers and screen readers.',
        ifDeletedError: 'Loses semantic card landmark.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: '<template id="tpl">...</template>',
        whatItMeans: 'Holds reusable DOM markup without rendering it immediately.',
        whyItIsThere: 'Allows cloning pre-parsed nodes in O(1) per card.',
        ifDeletedError: '`tpl.content` cannot be cloned dynamically.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'customElements.define("player-badge", PlayerBadge);',
        whatItMeans: 'Registers a native HTML tag backed by a JS class.',
        whyItIsThere: 'Encapsulates component behavior cleanly inside standard HTML markup.',
        ifDeletedError: '<player-badge> stays an unstyled generic inline element.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'HTML parses <template> as inert fragment', memoryOrStack: 'Not visible in viewport', note: 'Zero initial paint cost' },
      { step: 2, state: 'cloneNode(true) copies card DOM', memoryOrStack: 'DocumentFragment created', note: 'Safe .textContent set' },
      { step: 3, state: 'mount.appendChild(node)', memoryOrStack: 'Rafi & Zara cards rendered', note: 'Clean layout' },
      { step: 4, state: 'Custom element upgraded', memoryOrStack: 'connectedCallback runs', note: 'Displays Rafi:100 badge' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Custom Element Tag Name Without a Hyphen (`<card>`)',
        brokenCode: `customElements.define('card', MyCard); // DOMException!`,
        fixedCode: `customElements.define('player-card', MyCard); // Hyphen required!`,
        whyItBreaks: 'HTML specs require a hyphen (`-`) in custom tag names to prevent collisions with future standard tags.',
      },
      {
        title: 'Trap 2: Writing `tpl.cloneNode(true)` Instead of `tpl.content.cloneNode(true)`',
        brokenCode: `mount.appendChild(tpl.cloneNode(true)); // Appends hidden <template> tag!`,
        fixedCode: `mount.appendChild(tpl.content.cloneNode(true));`,
        whyItBreaks: '`<template>` itself is invisible—you must clone its `.content` DocumentFragment!',
      },
      {
        title: 'Trap 3: Duplicating `id` Attributes Inside a Cloned `<template>`',
        brokenCode: `<template><span id="name"></span></template>`,
        fixedCode: `<template><span class="name"></span></template>`,
        whyItBreaks: 'Cloning creates duplicate `id="name"` attributes; always target children via classes inside `<template>`.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Semantic `<article>` Player Card',
        prompt: 'Render an `<article>` card displaying player `Rafi` and boosted score `100`.',
        banglaHint: '`<article>` ট্যাগের ভেতর নাম ও স্কোর রাখো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><article style="border:1px solid #334155;padding:14px;border-radius:8px"><strong>Rafi</strong>: <span>100</span></article></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Rafi',
      },
      {
        id: 'html-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Inert `<template>` Clone Drill',
        prompt: 'Clone `<template id="t">` once and append into `#box`.',
        banglaHint: '`t.content.cloneNode(true)` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><template id="t"><p>Cloned Card</p></template><div id="box"></div><script>document.getElementById('box').appendChild(document.getElementById('t').content.cloneNode(true));</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Cloned Card',
      },
      {
        id: 'html-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Hydrate Multiple Template Cards Safely',
        prompt: 'Loop over `["A", "B"]`, clone template, set `.label` via `.textContent`.',
        banglaHint: 'ক্লোনে `class="label"` ব্যবহার করে `.textContent` দাও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><template id="t"><div class="label"></div></template><div id="m"></div><script>const t=document.getElementById('t');['A','B'].forEach(x=>{const n=t.content.cloneNode(true);n.querySelector('.label').textContent=x;document.getElementById('m').appendChild(n);});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'label',
      },
      {
        id: 'html-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Register `<stat-pill>` Web Component',
        prompt: 'Define `<stat-pill label="XP" val="100">` via `customElements.define`.',
        banglaHint: 'ট্যাগের নামে হাইফেন (`stat-pill`) ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><stat-pill label="XP" val="100"></stat-pill><script>customElements.define('stat-pill',class extends HTMLElement{connectedCallback(){this.textContent=this.getAttribute('label')+': '+this.getAttribute('val');}});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'stat-pill',
      },
      {
        id: 'html-ch-8-q5',
        difficulty: 'Hard',
        title: '5. `<figure>` + `<figcaption>` Reusable Diagram Card',
        prompt: 'Wrap a monospace diagram in `<figure>` with an accessible `<figcaption>`.',
        banglaHint: '`<figure>` এবং `<figcaption>` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><figure style="border:1px solid #334155;padding:12px"><pre>Player -> boost(+15) -> 100</pre><figcaption>State Flow Diagram</figcaption></figure></body></html>`,
        sampleStdin: '',
        expectedOutput: 'State Flow Diagram',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Reusable Player Component Card',
      description: 'Renders a self-contained semantic `<article>` card for a Player entity.',
      banglaGoal: 'HTML5 `<article>` ব্যবহার করে পুনর্ব্যবহারযোগ্য UI কম্পোনেন্ট কার্ড তৈরি।',
      combinesChapters: 'Ch 1–8',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Reusable Component Card</h3>
  <article style="border:1px solid #334155;padding:16px;border-radius:10px;max-width:300px">
    <strong>Player:</strong> Rafi<br/>
    <span style="color:#34d399">Boosted Score: 100</span>
  </article>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Reusable Component Card',
    },
  },
};
