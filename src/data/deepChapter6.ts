import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_6: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 6 (C23): Contiguous Arrays, Strings & Two-Pointer Technique',
    banglaTitle: 'C অধ্যায় ৬ (C23): অ্যারে, স্ট্রিং ও টু-পয়েন্টার কৌশল',
    subtitle: 'Understand contiguous RAM indexing O(1), null-terminated char arrays, strlen() O(n^2) traps, and O(n) Two-Pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'An Array places identical items side-by-side in consecutive RAM bytes so the CPU calculates any slot address in a single addition: `base + index * sizeof(elem)` — O(1) instant access! A C string is simply a `char[]` ending with a secret `\\0` (zero byte) marker. On sorted arrays, placing two index arrows (`left` at start, `right` at end) lets you find pairs or reverse arrays in one O(n) pass with O(1) extra memory.',
      asciiFlowchart: `  CONTIGUOUS RAM LAYOUT (int a[5] starting at 0x1000)
  +--------+--------+--------+--------+--------+
  | a[0]=2 | a[1]=5 | a[2]=7 |a[3]=11 |a[4]=15 |
  +--------+--------+--------+--------+--------+
   0x1000   0x1004   0x1008   0x100C   0x1010   (+4 bytes each)
      ^                                   ^
    left=0                             right=4
    2 + 15 = 17 > 13  --->  move right-- (discard impossible pairs!)`,
      pseudocode: [
        '1. ALLOCATE contiguous array on heap (`malloc` / `calloc`) for large N',
        '2. READ N elements into a[0..N-1]',
        '3. INITIALIZE left = 0, right = N - 1',
        '4. WHILE left < right: check sum = a[left] + a[right]',
        '5. IF sum == target -> print & stop; IF sum < target -> left++; ELSE -> right--',
        '6. FREE heap memory before return 0',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ট্রেনের পাশাপাশি বগি ও দুই প্রান্ত থেকে বন্ধু খোঁজা (Contiguous RAM & Two-Pointers)',
        explanation:
          'কল্পনা করো একটি ট্রেনের বগিগুলো ০, ১, ২, ৩... করে পাশাপাশি লাগানো। তুমি যদি বগি নং ০-এর ঠিকানা জানো, তবে এক লাফে যেকোনো বগি নং ৪-এ চলে যেতে পারবে—এটাই অ্যারের `O(1)` অ্যাক্সেস! আর C-তে স্ট্রিং হলো অক্ষরের বগির সারি, যার একদম শেষে `\\0` (নাল ক্যারেক্টার) নামের একটি লাল পতাকা থাকে যেন কম্পিউটার বোঝে স্ট্রিং এখানেই শেষ। আর সর্টেড অ্যারেতে দুই দিক থেকে `left` ও `right` আঙুল স্লাইড করলেই O(n^2) কাজ O(n)-এ হয়ে যায়!',
        everydayExample:
          'পাশাপাশি রাখা ১০০টি তালাবদ্ধ লকার—প্রতিটির নম্বর লেখা আছে, তাই ১ থেকে না গুনে সরাসরি ৪৫ নম্বর লকার খোলা যায়।',
        keyTakeaways: [
          'C অ্যারের ইনডেক্স সবসময় `0` থেকে `n - 1` পর্যন্ত হয়; `a[n]` পড়লে বা লিখলে মেমোরি করাপ্ট হয়!',
          'C স্ট্রিং `char s[N]`-এ আসল অক্ষরের চেয়ে ১ বাইট বেশি জায়গা রাখতে হয় শেষের `\\0` বাইটের জন্য।',
          'লুপের শর্তে `strlen(s)` লিখলে প্রতিবার পুরো স্ট্রিং গুনতে গিয়ে O(n^2) TLE হয়—আগে একবার `size_t len = strlen(s)` সেভ করে নাও।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Two-Pointer In-Place Array Reversal (O(1) Space)',
        banglaNote: 'অতিরিক্ত অ্যারে না বানিয়ে দুই দিক থেকে সোয়াপ করে অ্যারে উল্টে দেওয়া।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int *a = calloc((size_t)n, sizeof(int));
    if (!a) return 1;
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    for (int l = 0, r = n - 1; l < r; l++, r--) {
        int tmp = a[l];
        a[l] = a[r];
        a[r] = tmp;
    }
    for (int i = 0; i < n; i++) printf("%d%s", a[i], i + 1 == n ? "\\n" : " ");
    free(a);
    return 0;
}`,
        stdin: '5\n10 20 30 40 50',
        expectedOutput: '50 40 30 20 10',
      },
      {
        id: 'c-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Palindrome String With Empty & Case-Safe Bounds',
        banglaNote: '১ অক্ষরের বা অসম স্ট্রিংয়ে `left < right` এবং NUL টার্মিনেটর সুরক্ষা।',
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[256] = "";
    if (scanf("%255s", s) != 1) {
        printf("YES\\n");
        return 0;
    }
    size_t l = 0, r = strlen(s);
    if (r > 0) r--;
    int ok = 1;
    while (l < r) {
        if (s[l] != s[r]) { ok = 0; break; }
        l++; r--;
    }
    printf("%s\\n", ok ? "YES" : "NO");
    return 0;
}`,
        stdin: 'racecar',
        expectedOutput: 'YES',
      },
      {
        id: 'c-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Fixed Sliding Window Maximum Sum',
        banglaNote: 'প্রতিটি উইন্ডো নতুন করে যোগ না করে আগেরটি বাদ ও পরেরটি যোগ করে O(n) সময়ে স্লাইড।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0, k = 0;
    if (scanf("%d %d", &n, &k) != 2 || k <= 0 || k > n) return 0;
    long long *a = calloc((size_t)n, sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    long long win = 0;
    for (int i = 0; i < k; i++) win += a[i];
    long long best = win;
    for (int i = k; i < n; i++) {
        win += a[i] - a[i - k];
        if (win > best) best = win;
    }
    printf("%lld\\n", best);
    free(a);
    return 0;
}`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'c-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Sorted Two-Sum With Overflow-Safe 64-bit Accumulator',
        banglaNote: 'সর্টেড অ্যারেতে `int + int` ওভারফ্লো এড়াতে `(long long)a[l] + a[r]` দিয়ে O(n) জোড়া খোঁজা।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2) return 0;
    long long *a = calloc((size_t)n, sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    int l = 0, r = n - 1, found = 0;
    while (l < r) {
        long long s = a[l] + a[r];
        if (s == target) { printf("%d %d\\n", l, r); found = 1; break; }
        if (s < target) l++; else r--;
    }
    if (!found) printf("-1\\n");
    free(a);
    return 0;
}`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 7',
        codeSnippet: 'int *a = calloc((size_t)n, sizeof(int));',
        whatItMeans: 'Allocates `n` contiguous zero-initialized integers on the Heap.',
        whyItIsThere: 'Large arrays (`n = 10^5`) overflow the small Stack if declared as `int a[n]`.',
        ifDeletedError: 'Compile error: `a` undeclared, or Stack Overflow for large `n`.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'for (int l = 0, r = n - 1; l < r; l++, r--)',
        whatItMeans: 'Two converging pointers starting at opposite ends of the array.',
        whyItIsThere: 'Every step swaps or checks a pair in O(1), finishing in `n / 2` iterations.',
        ifDeletedError: 'Loop never runs or accesses indices outside `0..n-1`.',
      },
      {
        lineNumber: 'Line 16',
        codeSnippet: 'free(a);',
        whatItMeans: 'Returns the Heap buffer back to the OS allocator.',
        whyItIsThere: 'C has no garbage collector; unfreed buffers leak memory.',
        ifDeletedError: 'Memory leak reported by AddressSanitizer / Valgrind.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4 (a=[2,5,7,11,15])', memoryOrStack: 'sum = 2 + 15 = 17', note: '17 > 13 -> right--' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'sum = 2 + 11 = 13', note: '13 == target -> Match!' },
      { step: 3, state: 'printf("0 3\\n")', memoryOrStack: 'stdout: 0 3', note: 'Breaks out early in 2 steps' },
      { step: 4, state: 'free(a); return 0;', memoryOrStack: 'Heap block freed', note: 'Zero memory leaks' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Calling `strlen(s)` Inside Every Loop Condition (Hidden O(n^2)!)',
        brokenCode: `for (size_t i = 0; i < strlen(s); i++) { /* O(n^2)! */ }`,
        fixedCode: `size_t len = strlen(s);\nfor (size_t i = 0; i < len; i++) { /* O(n) */ }`,
        whyItBreaks: '`strlen` walks until `\\0` each iteration unless hoisted out when `s` is modified.',
      },
      {
        title: 'Trap 2: Off-by-One Access `a[n]` Outside Array Bounds',
        brokenCode: `int a[5];\nfor (int i = 0; i <= 5; i++) a[i] = i;`,
        fixedCode: `int a[5];\nfor (int i = 0; i < 5; i++) a[i] = i;`,
        whyItBreaks: 'Valid indices are `0..4`. Writing `a[5]` corrupts adjacent stack variables (UB)!',
      },
      {
        title: 'Trap 3: Unsigned `size_t r = 0; r--;` Underflow Wrap',
        brokenCode: `size_t l = 0, r = strlen(s) - 1; // crashes if s is ""!`,
        fixedCode: `size_t len = strlen(s);\nsize_t r = len > 0 ? len - 1 : 0;`,
        whyItBreaks: 'For an empty string, `0 - 1` wraps `size_t` to `18446744073709551615` -> Segfault!',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Find Maximum & Minimum in Contiguous Array',
        prompt: 'Read n and n integers; print `min max`.',
        banglaHint: '`mn = a[0]`, `mx = a[0]` ধরে লুপ চালাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    int x; scanf("%d", &x); int mn = x, mx = x;\n    for (int i = 1; i < n; i++) { scanf("%d", &x); if (x < mn) mn = x; if (x > mx) mx = x; }\n    printf("%d %d\\n", mn, mx);\n    return 0;\n}`,
        sampleStdin: '5\n8 2 15 -3 9',
        expectedOutput: '-3 15',
      },
      {
        id: 'c-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Count Vowels in C String (Hoisted strlen)',
        prompt: 'Read a lowercase word and count vowels `a,e,i,o,u`.',
        banglaHint: '`size_t len = strlen(s)` একবার বের করে লুপ চালাও।',
        starterCode: `#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char s[256]; if (scanf("%255s", s) != 1) return 0;\n    size_t len = strlen(s); int cnt = 0;\n    for (size_t i = 0; i < len; i++) {\n        char c = s[i];\n        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cnt++;\n    }\n    printf("%d\\n", cnt);\n    return 0;\n}`,
        sampleStdin: 'argoncode',
        expectedOutput: '4',
      },
      {
        id: 'c-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates In-Place From Sorted Array',
        prompt: 'Read n and n sorted integers; print the count of unique values using slow/fast two-pointers.',
        banglaHint: '`slow = 0` রেখে `a[fast] != a[slow]` হলে `slow++` করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    int *a = malloc((size_t)n * sizeof(int));\n    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n    int slow = 0;\n    for (int fast = 1; fast < n; fast++) if (a[fast] != a[slow]) a[++slow] = a[fast];\n    printf("%d\\n", slow + 1);\n    free(a);\n    return 0;\n}`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'c-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Move Zeroes to End Preserving Order',
        prompt: 'Read n and n integers; move all 0s to the end while keeping non-zero relative order.',
        banglaHint: '`write_idx = 0` পয়েন্টার ব্যবহার করে নন-জিরো সামনে বসাও।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int n; if (scanf("%d", &n) != 1) return 0;\n    int *a = calloc((size_t)n, sizeof(int));\n    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n    int w = 0;\n    for (int i = 0; i < n; i++) if (a[i] != 0) a[w++] = a[i];\n    while (w < n) a[w++] = 0;\n    for (int i = 0; i < n; i++) printf("%d%s", a[i], i + 1 == n ? "\\n" : " ");\n    free(a);\n    return 0;\n}`,
        sampleStdin: '5\n0 1 0 3 12',
        expectedOutput: '1 3 12 0 0',
      },
      {
        id: 'c-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (O(n) Two-Pointers)',
        prompt: 'Read n heights; compute maximum area `(r - l) * min(h[l], h[r])`.',
        banglaHint: 'যে প্রান্তের দেয়াল ছোট (`h[l] < h[r]`), সেটিকেই ভেতরে সরাও!',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int n; if (scanf("%d", &n) != 1) return 0;\n    long long *h = malloc((size_t)n * sizeof(long long));\n    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);\n    int l = 0, r = n - 1; long long best = 0;\n    while (l < r) {\n        long long mn = h[l] < h[r] ? h[l] : h[r];\n        long long area = (long long)(r - l) * mn;\n        if (area > best) best = area;\n        if (h[l] < h[r]) l++; else r--;\n    }\n    printf("%lld\\n", best);\n    free(h);\n    return 0;\n}`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'C23 Mini Build: Zero-Copy Two-Pointer Pair Finder',
      description: 'Allocates a dynamic heap buffer cleanly, executes O(n) Two-Pointer pair search, and frees memory.',
      banglaGoal: 'ডাইনামিক হিপ অ্যারেতে টু-পয়েন্টার টেকনিক চালিয়ে O(n) সময়ে জোড়া খুঁজে বের করা।',
      combinesChapters: 'Ch 1–6',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, target;
    if (scanf("%d %d", &n, &target) != 2) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int l = 0, r = n - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) { printf("%d %d\\n", l, r); break; }
        if (s < target) l++; else r--;
    }
    free(a);
    return 0;
}`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  cpp: {
    title: 'C++ Chapter 6 (C++23): vector, std::span, string_view & Two-Pointers',
    banglaTitle: 'C++ অধ্যায় ৬ (C++23): vector, string_view ও টু-পয়েন্টার কৌশল',
    subtitle: 'Master dynamic std::vector growth, non-owning std::span / std::string_view, and O(n) Two-Pointer / Sliding Window patterns.',
    zeroIntuition: {
      plainEnglishStory:
        '`std::vector<int>` stores elements in one contiguous Heap block (just like a C array) while resizing automatically with 2x geometric doubling so `push_back` is O(1) amortized! In C++23, `std::span` and `std::string_view` let functions read slices in O(1) with zero heap copies.',
      asciiFlowchart: `  std::vector<int> ON STACK -> CONTIGUOUS HEAP BUFFER
  Stack: [ ptr=0x2000 | size=5 | cap=8 ]
              |
              v
  Heap:  [ 2 | 5 | 7 | 11 | 15 | _ | _ | _ ]
           ^                ^
          l=0              r=3  (2 + 11 = 13 == target!)`,
      pseudocode: [
        '1. READ n and target; allocate `vector<int> a(n)` (single heap allocation)',
        '2. PASS read-only views using `const vector<int>&` or `span<const int>`',
        '3. RUN converging `l = 0, r = n - 1` Two-Pointers in O(n) time, O(1) extra space',
        '4. USE sliding window for contiguous subarray constraints',
        '5. AVOID copying `string` on every slice — use `string_view`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় প্রসারণশীল ট্রেনের কামরা (`std::vector`) ও জানালা (`std::span`)',
        explanation:
          'সাধারণ অ্যারের সাইজ ফিক্সড, কিন্তু C++-এর `std::vector` হলো জাদুকরী ট্রেন যা যাত্রী বাড়লে নিজেই ২ গুণ বড় কামরা বানিয়ে নেয়! আর `std::string_view` বা `std::span` হলো কাঁচের জানালার মতো—পুরো ডেটা কপি না করেই শুধু ওই অংশটুকুর ওপর চোখ বুলিয়ে কাজ সেরে ফেলে (Zero-Copy)।',
        everydayExample:
          'বড় লাইব্রেরির বই বাসায় ফটোকপি করে না এনে শুধু বুকমার্ক দিয়ে মূল বই দেখে নেওয়া।',
        keyTakeaways: [
          '`vector<int> a(n)` এক ধাপেই সঠিক সাইজ বরাদ্দ করে—`push_back`-এর রিয়ালোকেশন বাঁচে।',
          '`string` ফাংশনে পাঠানোর সময় `const string&` বা `string_view` ব্যবহার করলে অহেতুক কপি হয় না।',
          'সর্টেড `vector`-এ টু-পয়েন্টার O(n^2) নেস্টেড লুপকে O(n)-এ নামিয়ে আনে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: std::vector + std::ranges::reverse (C++23)',
        banglaNote: 'কন্টেইনারের পুরো রেঞ্জ এক লাইনে ইন-প্লেস উল্টে দেওয়া।',
        code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    ranges::reverse(a);
    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 == n ? "\\n" : " ");
    return 0;
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '20 15 10 5',
      },
      {
        id: 'cpp-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero-Copy string_view Palindrome Check',
        banglaNote: 'কোনো মেমোরি কপি না করে খালি বা এক অক্ষরের স্ট্রিংসহ প্যালিনড্রোম যাচাই।',
        code: `#include <iostream>
#include <string>
#include <string_view>
using namespace std;

bool is_pal(string_view sv) {
    if (sv.empty()) return true;
    size_t l = 0, r = sv.size() - 1;
    while (l < r) {
        if (sv[l++] != sv[r--]) return false;
    }
    return true;
}

int main() {
    string s;
    if (cin >> s) cout << (is_pal(s) ? "YES" : "NO") << "\\n";
    return 0;
}`,
        stdin: 'level',
        expectedOutput: 'YES',
      },
      {
        id: 'cpp-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: std::span Sliding Window Maximum Sum',
        banglaNote: 'C++23 `span<const long long>` দিয়ে কপি ছাড়াই স্লাইডিং উইন্ডো সর্বোচ্চ যোগফল।',
        code: `#include <iostream>
#include <span>
#include <vector>
using namespace std;

long long max_window(span<const long long> a, size_t k) {
    long long win = 0;
    for (size_t i = 0; i < k; i++) win += a[i];
    long long best = win;
    for (size_t i = k; i < a.size(); i++) {
        win += a[i] - a[i - k];
        if (win > best) best = win;
    }
    return best;
}

int main() {
    size_t n, k;
    if (!(cin >> n >> k) || k == 0 || k > n) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    cout << max_window(a, k) << "\\n";
    return 0;
}`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'cpp-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Two-Pointer Pair Sum on Sorted Vector',
        banglaNote: 'সর্টেড ভেক্টরে দুই দিক থেকে `l` ও `r` চালিয়ে O(n) সময়ে পেয়ার খুঁজে বের করা।',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    int l = 0, r = n - 1;
    while (l < r) {
        long long s = a[l] + a[r];
        if (s == target) { cout << l << " " << r << "\\n"; return 0; }
        if (s < target) l++; else r--;
    }
    cout << "-1\\n";
    return 0;
}`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'vector<int> a(n);',
        whatItMeans: 'Constructs a dynamic array pre-sized to `n` elements in one Heap allocation.',
        whyItIsThere: 'Avoids repeated geometric reallocations and allows direct `cin >> a[i]` reading.',
        ifDeletedError: '`a` is undeclared in loop.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'while (l < r) {',
        whatItMeans: 'Converges left and right indices until they meet.',
        whyItIsThere: 'Guarantees `l` and `r` refer to distinct elements (`l != r`).',
        ifDeletedError: 'Using `l <= r` could falsely pair an element with itself!',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'long long s = a[l] + a[r];',
        whatItMeans: 'Computes pair sum in 64-bit integer precision.',
        whyItIsThere: 'Prevents signed 32-bit overflow when elements reach `2e9`.',
        ifDeletedError: 'Integer overflow Undefined Behavior on large judge inputs.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: 'a[0]+a[4] = 2+15 = 17', note: '17 > 13 -> r--' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'a[0]+a[3] = 2+11 = 13', note: '13 == target -> Found!' },
      { step: 3, state: 'cout << "0 3"', memoryOrStack: 'stdout: 0 3', note: 'O(n) time, O(1) extra space' },
      { step: 4, state: 'main() returns 0', memoryOrStack: '~vector() auto-frees heap', note: 'RAII cleans up automatically' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: String Concatenation `s = s + ch` Inside a Loop',
        brokenCode: `string s;\nfor (int i = 0; i < n; i++) s = s + 'a'; // O(n^2) copies!`,
        fixedCode: `string s; s.reserve(n);\nfor (int i = 0; i < n; i++) s.push_back('a'); // O(n)`,
        whyItBreaks: '`s + "a"` allocates a brand-new string copy every iteration (`n^2 / 2` bytes copied)!',
      },
      {
        title: 'Trap 2: Modifying Vector While Iterating With Range-For',
        brokenCode: `for (int x : v) if (x > 0) v.push_back(x); // Invalidates iterators!`,
        fixedCode: `size_t orig = v.size();\nfor (size_t i = 0; i < orig; i++) if (v[i] > 0) v.push_back(v[i]);`,
        whyItBreaks: '`push_back` may reallocate the buffer, dangling the range-for iterator!',
      },
      {
        title: 'Trap 3: Unsigned Subtraction `(int)v.size() - 1` When Empty',
        brokenCode: `for (int i = 0; i <= v.size() - 1; i++) // wraps if v.empty()!`,
        fixedCode: `for (size_t i = 0; i < v.size(); i++)`,
        whyItBreaks: '`v.size()` returns unsigned `size_t`: `0 - 1` wraps to `SIZE_MAX`!',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Reverse Vector In-Place',
        prompt: 'Read n and n integers; print reversed sequence using Two-Pointers.',
        banglaHint: '`swap(a[l++], a[r--])` লুপ চালাও।',
        starterCode: `#include <iostream>\n#include <utility>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<int> a(n); for (int &x : a) cin >> x;\n    for (int l = 0, r = n - 1; l < r; l++, r--) swap(a[l], a[r]);\n    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 == n ? "\\n" : " ");\n}`,
        sampleStdin: '5\n1 2 3 4 5',
        expectedOutput: '5 4 3 2 1',
      },
      {
        id: 'cpp-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Count Vowels via string_view',
        prompt: 'Read a lowercase word and print vowel count.',
        banglaHint: '`string_view` লুপে `c` অক্ষর চেক করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; if (!(cin >> s)) return 0;\n    int cnt = 0;\n    for (char c : s) if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cnt++;\n    cout << cnt << "\\n";\n}`,
        sampleStdin: 'algorithm',
        expectedOutput: '3',
      },
      {
        id: 'cpp-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates From Sorted Vector',
        prompt: 'Read n and n sorted integers; print count of unique elements.',
        banglaHint: '`slow` ইনডেক্স দিয়ে ইউনিক উপাদান সামনে রাখো।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n) || n <= 0) return 0;\n    vector<int> a(n); for (int &x : a) cin >> x;\n    int slow = 0;\n    for (int fast = 1; fast < n; fast++) if (a[fast] != a[slow]) a[++slow] = a[fast];\n    cout << slow + 1 << "\\n";\n}`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Variable Sliding Window: Longest Subarray Sum <= S',
        prompt: 'Read n, S and n positive integers; output max length with sum <= S.',
        banglaHint: 'উইন্ডোর যোগফল `S`-এর বেশি হলে বাম থেকে `l++` করে কমাও।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; long long S; if (!(cin >> n >> S)) return 0;\n    vector<long long> a(n); for (auto &x : a) cin >> x;\n    long long sum = 0; int l = 0, best = 0;\n    for (int r = 0; r < n; r++) {\n        sum += a[r];\n        while (sum > S) sum -= a[l++];\n        best = max(best, r - l + 1);\n    }\n    cout << best << "\\n";\n}`,
        sampleStdin: '6 7\n1 2 3 1 1 5',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (Two-Pointers)',
        prompt: 'Read n heights; compute max water area between two vertical lines.',
        banglaHint: 'দুই প্রান্তের মধ্যে ছোট হাইটের পয়েন্টারটিকে ভেতরে সরাও।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<long long> h(n); for (auto &x : h) cin >> x;\n    int l = 0, r = n - 1; long long best = 0;\n    while (l < r) {\n        best = max(best, 1LL * (r - l) * min(h[l], h[r]));\n        if (h[l] < h[r]) l++; else r--;\n    }\n    cout << best << "\\n";\n}`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'C++23 Mini Build: Sorted Two-Pointer Pair Engine',
      description: 'Reads an array into std::vector and locates the exact Two-Sum index pair in O(n) time.',
      banglaGoal: 'std::vector ও টু-পয়েন্টার কৌশল ব্যবহার করে O(n) সময়ে টার্গেট পেয়ার খোঁজা।',
      combinesChapters: 'Ch 1–6',
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, r = n - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) { cout << l << " " << r << "\\n"; break; }
        if (s < target) l++; else r--;
    }
    return 0;
}`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  python: {
    title: 'Python Chapter 6 (Python 3.13): Lists, Strings & Two-Pointer Technique',
    banglaTitle: 'Python অধ্যায় ৬ (Python 3.13): লিস্ট, স্ট্রিং ও টু-পয়েন্টার কৌশল',
    subtitle: 'Master dynamic list references, O(n) "".join() vs O(n^2) += string traps, slicing, and O(n) Two-Pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'A Python `list` stores a contiguous array of object references in C memory, giving O(1) indexing (`arr[i]`) and O(1) amortized `.append()`. Python strings (`str`), however, are strictly **immutable**—concatenating `s += ch` inside a loop forces Python to copy the whole string repeatedly unless you collect fragments in a list and call `"".join(parts)`.',
      asciiFlowchart: `  PYTHON LIST POINTER ARRAY (Contiguous C PyObject* Slots)
  arr -> [ ptr0 | ptr1 | ptr2 | ptr3 | ptr4 ]
            |      |      |      |      |
            v      v      v      v      v
           (2)    (5)    (7)   (11)   (15)
            ^                    ^
           l=0                  r=3   (arr[0] + arr[3] == 13!)`,
      pseudocode: [
        '1. PARSE input list once using `sys.stdin.read().split()`',
        '2. BUILD large strings with `list.append()` + `"".join(parts)` (O(n))',
        '3. CONVERGE `l = 0, r = n - 1` toward the middle for sorted Two-Sum or Palindrome',
        '4. USE sliding window `l` / `r` for longest/max subarray problems',
        '5. AVOID `arr.pop(0)` inside loops (it shifts every element -> O(n)!) — use `collections.deque` or indices',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রিসাইজেবল লিস্ট বনাম খোদাই করা পাথর (Immutable Strings & Two-Pointers)',
        explanation:
          'Python-এর `list` হলো রাবার ব্যান্ডের মতো—নতুন আইটেম `.append()` করলে সহজেই বাড়ে এবং `arr[i]` দিয়ে সাথে সাথে পড়া যায়। কিন্তু Python-এর `str` হলো পাথরে খোদাই করা লেখা (Immutable)—একবার লিখলে আর বদলানো যায় না! লুপের ভেতর `s += ch` করলে প্রতিবার নতুন পাথর কাটতে গিয়ে কোড স্লো হয়ে যায়; তাই `parts.append()` করে শেষে `"".join(parts)` লিখতে হয়।',
        everydayExample:
          'একটি খাতায় নাম লিখে `join` করে ফাইনাল শিট বানানো (দ্রুত) বনাম প্রতি অক্ষরের পর পুরো শিট নতুন করে কপি করা (ধীর)।',
        keyTakeaways: [
          'লুপে স্ট্রিং জোড়া দিতে `+=` নয়, `"".join(list)` ব্যবহার করো—সময় `O(n^2)` থেকে `O(n)` হয়।',
          '`arr.pop(0)` বা `arr.insert(0, x)` লুপে ব্যবহার করলে কোড ধীর হয়—ইনডেক্স পয়েন্টার `l += 1` এগিয়ে নেওয়া সবসময় O(1)।',
          'সর্টেড লিস্টে দুই প্রান্ত থেকে `l` ও `r` পয়েন্টার চালালে এক পাসে উত্তর মেলে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: In-Place Two-Pointer List Reversal',
        banglaNote: 'স্লাইসিংয়ে বাড়তি মেমোরি না নিয়ে `l, r` পয়েন্টার সোয়াপ করে লিস্ট উল্টে দেওয়া।',
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
if nums:
    n = nums[0]
    arr = nums[1:1 + n]
    l, r = 0, len(arr) - 1
    while l < r:
        arr[l], arr[r] = arr[r], arr[l]
        l += 1
        r -= 1
    print(" ".join(map(str, arr)))`,
        stdin: '5\n10 20 30 40 50',
        expectedOutput: '50 40 30 20 10',
      },
      {
        id: 'py-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Alphanumeric Case-Insensitive Palindrome',
        banglaNote: 'অক্ষর বা সংখ্যা বাদে স্পেস/চিহ্ন এড়িয়ে গিয়ে O(1) অতিরিক্ত স্পেসে প্যালিনড্রোম যাচাই।',
        code: `import sys

s = sys.stdin.read().strip()
l, r = 0, len(s) - 1
ok = True
while l < r:
    while l < r and not s[l].isalnum():
        l += 1
    while l < r and not s[r].isalnum():
        r -= 1
    if s[l].lower() != s[r].lower():
        ok = False
        break
    l += 1
    r -= 1
print("YES" if ok else "NO")`,
        stdin: 'A man, a plan, a canal: Panama',
        expectedOutput: 'YES',
      },
      {
        id: 'py-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Sliding Window Maximum Sum',
        banglaNote: 'প্রতিবার `sum(arr[i:i+k])` না লিখে O(n) স্লাইডিং উইন্ডো আপডেট।',
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
if len(nums) >= 2:
    n, k = nums[0], nums[1]
    arr = nums[2:2 + n]
    win = sum(arr[:k])
    best = win
    for i in range(k, n):
        win += arr[i] - arr[i - k]
        if win > best:
            best = win
    print(best)`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'py-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Sorted Two-Sum O(n) Time & O(1) Auxiliary Space',
        banglaNote: 'সর্টেড অ্যারেতে কোনো HashMap ছাড়াই মাত্র O(1) অতিরিক্ত মেমোরিতে Two-Sum।',
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
if len(nums) >= 2:
    n, target = nums[0], nums[1]
    arr = nums[2:2 + n]
    l, r = 0, n - 1
    ans = "-1"
    while l < r:
        s = arr[l] + arr[r]
        if s == target:
            ans = f"{l} {r}"
            break
        if s < target:
            l += 1
        else:
            r -= 1
    print(ans)`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'arr = nums[2:2 + n]',
        whatItMeans: 'Slices exact `n` elements cleanly without off-by-one confusion.',
        whyItIsThere: 'Isolates the payload array from header metadata (`n`, `target`).',
        ifDeletedError: '`arr` is undefined when indexing `arr[l]`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'l, r = 0, n - 1',
        whatItMeans: 'Initializes two opposing index pointers via tuple unpacking.',
        whyItIsThere: 'Starts at minimum and maximum values of a sorted array.',
        ifDeletedError: 'NameError: `l` and `r` are not defined.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'if s < target: l += 1 else: r -= 1',
        whatItMeans: 'Monotonic pointer squeeze discarding impossible pair sums.',
        whyItIsThere: 'Reduces search space by 1 element every step in O(1).',
        ifDeletedError: 'Infinite loop if neither `l` nor `r` moves.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: 'arr[0]+arr[4] = 2+15 = 17', note: '17 > 13 -> r -= 1' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'arr[0]+arr[3] = 2+11 = 13', note: 'Match found!' },
      { step: 3, state: 'ans = "0 3"; break', memoryOrStack: 'No HashMap allocated', note: 'O(1) extra space' },
      { step: 4, state: 'print("0 3")', memoryOrStack: 'stdout: 0 3', note: 'Matches judge expected output' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Shallow Matrix Creation `grid = [[0] * 3] * 3`',
        brokenCode: `g = [[0] * 3] * 3\ng[0][1] = 9  # Mutates ALL 3 rows!`,
        fixedCode: `g = [[0] * 3 for _ in range(3)]\ng[0][1] = 9  # Only row 0 changes`,
        whyItBreaks: '`* 3` duplicates references to the SAME inner list object 3 times!',
      },
      {
        title: 'Trap 2: Using `+=` for Building Large Strings in Loops',
        brokenCode: `out = ""\nfor w in words: out += w + " "`,
        fixedCode: `out = " ".join(words)`,
        whyItBreaks: 'Repeated string concatenation copies characters quadratically on huge inputs.',
      },
      {
        title: 'Trap 3: Using `arr.pop(0)` Inside a Queue/Window Loop',
        brokenCode: `while arr: x = arr.pop(0)  # O(n) shift each time -> O(n^2)!`,
        fixedCode: `from collections import deque\nq = deque(arr)\nwhile q: x = q.popleft()  # O(1)!`,
        whyItBreaks: '`list.pop(0)` shifts all remaining pointers in C memory left by 1 slot.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Fast "".join() Run-Length String Builder',
        prompt: 'Read a string and output characters separated by `-` using `"-".join()`.',
        banglaHint: '`"-".join(list(s))` বা `"-".join(s)` ব্যবহার করো।',
        starterCode: `import sys\ns = sys.stdin.read().strip()\nprint("-".join(s))`,
        sampleStdin: 'ARGON',
        expectedOutput: 'A-R-G-O-N',
      },
      {
        id: 'py-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Reverse List Without Slicing Copy',
        prompt: 'Read n and n ints; reverse them in-place with `l, r`.',
        banglaHint: '`arr[l], arr[r] = arr[r], arr[l]` দিয়ে সোয়াপ করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\narr = nums[1:1 + nums[0]]\nl, r = 0, len(arr) - 1\nwhile l < r:\n    arr[l], arr[r] = arr[r], arr[l]\n    l += 1; r -= 1\nprint(*arr)`,
        sampleStdin: '4\n9 4 7 1',
        expectedOutput: '1 7 4 9',
      },
      {
        id: 'py-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates In-Place (Sorted List)',
        prompt: 'Read n and n sorted integers; print count of unique numbers.',
        banglaHint: '`slow = 0` ও `fast` পয়েন্টার ব্যবহার করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\narr = nums[1:1 + nums[0]]\nslow = 0\nfor fast in range(1, len(arr)):\n    if arr[fast] != arr[slow]:\n        slow += 1\n        arr[slow] = arr[fast]\nprint(slow + 1 if arr else 0)`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'py-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Variable Sliding Window: Longest Subarray <= S',
        prompt: 'Read n, S and n positive integers; output longest subarray length with sum <= S.',
        banglaHint: 'যোগফল `S` ছাড়ালে `l` ডানে সরিয়ে বাদ দাও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, S = nums[0], nums[1]\narr = nums[2:2 + n]\nl = cur = best = 0\nfor r, val in enumerate(arr):\n    cur += val\n    while cur > S:\n        cur -= arr[l]\n        l += 1\n    best = max(best, r - l + 1)\nprint(best)`,
        sampleStdin: '6 7\n1 2 3 1 1 5',
        expectedOutput: '4',
      },
      {
        id: 'py-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (O(n))',
        prompt: 'Read n heights; compute max container area `(r - l) * min(h[l], h[r])`.',
        banglaHint: 'ছোট উচ্চতার দিকের পয়েন্টার ভেতরে সরাও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nh = nums[1:1 + nums[0]]\nl, r, best = 0, len(h) - 1, 0\nwhile l < r:\n    best = max(best, (r - l) * min(h[l], h[r]))\n    if h[l] < h[r]: l += 1\n    else: r -= 1\nprint(best)`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Mini Build: Two-Pointer Pair Finder',
      description: 'Slices input list cleanly and finds the exact target pair indices in O(n) time and O(1) extra space.',
      banglaGoal: 'লিস্ট ও টু-পয়েন্টার ব্যবহার করে দ্রুততম সময়ে টার্গেট পেয়ার খুঁজে বের করা।',
      combinesChapters: 'Ch 1–6',
      starterCode: `import sys
nums = list(map(int, sys.stdin.read().split()))
n, target = nums[0], nums[1]
arr = nums[2:2 + n]
l, r = 0, n - 1
while l < r:
    s = arr[l] + arr[r]
    if s == target:
        print(l, r)
        break
    if s < target:
        l += 1
    else:
        r -= 1`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  java: {
    title: 'Java Chapter 6 (Java 21): Arrays, StringBuilder & Two-Pointers',
    banglaTitle: 'Java অধ্যায় ৬ (Java 21): অ্যারে, StringBuilder ও টু-পয়েন্টার',
    subtitle: 'Compare primitive int[] vs ArrayList, avoid O(n^2) String concatenation using StringBuilder, and master Two-Pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'A Java `int[]` allocates raw contiguous 32-bit integers right next to each other on the Heap, avoiding boxing overhead. By contrast, Java `String` objects are immutable—writing `s += "x"` inside a loop creates N discarded garbage strings (`O(n^2)`), whereas `StringBuilder` mutates an internal char buffer in O(1) amortized time!',
      asciiFlowchart: `  JAVA HEAP MEMORY
  int[] a -----> [ 2 | 5 | 7 | 11 | 15 ]   (Contiguous primitives, O(1) access)
                   ^            ^
                  l=0          r=3  (2 + 11 == 13!)
  StringBuilder -> mutable char[] buffer -> O(n) total build!`,
      pseudocode: [
        '1. ALLOCATE `int[] a = new int[n]` for speed-critical numeric arrays',
        '2. USE `StringBuilder` whenever assembling strings inside a loop',
        '3. INITIALIZE `int l = 0, r = n - 1` on sorted array',
        '4. COMPARE `long sum = (long) a[l] + a[r]` against target',
        '5. ADVANCE `l++` or `r--` monotonically in O(n)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফাঁকা হোয়াইটবোর্ড (`StringBuilder`) বনাম স্থায়ী প্রিন্ট (`String`)',
        explanation:
          'Java-তে `String` হলো লেমিনেট করা কাগজ—একটি অক্ষর যোগ করতে গেলে পুরো কাগজ ফেলে নতুন করে প্রিন্ট করতে হয়! কিন্তু `StringBuilder` হলো হোয়াইটবোর্ড—যত ইচ্ছা লিখতে-মুছতে পারবে এবং একদম শেষে `.toString()` দিয়ে প্রিন্ট করবে। আর `int[]` হলো সারিবদ্ধ বক্স যেখানে `l` ও `r` দুটি তীর চালিয়ে সহজেই Two-Pointer সমাধান করা যায়।',
        everydayExample:
          'হোয়াইটবোর্ডে পুরো বাজারের লিস্ট লিখে শেষে একসাথে ছবি তোলা।',
        keyTakeaways: [
          'CP বা বড় স্ট্রিংয়ের জন্য লুপের ভেতর `String += ...` লেখা মানেই TLE ঝুঁকি—সবসময় `StringBuilder` ব্যবহার করো।',
          '`int[]` প্রিমিটিভ অ্যারে `ArrayList<Integer>`-এর চেয়ে অনেক কম মেমোরি ও সময় নেয়।',
          'দুটি বড় `int` যোগ করলে `long` কাস্ট `(long)a[l] + a[r]` করতে ভুলবে না।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Two-Pointer Array Reverse + StringBuilder Join',
        banglaNote: 'টু-পয়েন্টার দিয়ে অ্যারে উল্টে `StringBuilder` দিয়ে দ্রুত আউটপুট তৈরি।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        for (int l = 0, r = n - 1; l < r; l++, r--) {
            int t = a[l]; a[l] = a[r]; a[r] = t;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        System.out.println(sb);
    }
}`,
        stdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'java-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: StringBuilder Reverse & Empty Input Guard',
        banglaNote: 'ইনপুট খালি থাকলেও নিরাপদে প্যালিনড্রোম যাচাই করা।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNext() ? sc.next() : "";
        int l = 0, r = s.length() - 1;
        boolean ok = true;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) { ok = false; break; }
        }
        System.out.println(ok ? "YES" : "NO");
    }
}`,
        stdin: 'madam',
        expectedOutput: 'YES',
      },
      {
        id: 'java-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Fixed Sliding Window Maximum Sum',
        banglaNote: 'স্লাইডিং উইন্ডোতে `long` দিয়ে O(n) সময়ে সর্বোচ্চ যোগফল।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        long win = 0;
        for (int i = 0; i < k; i++) win += a[i];
        long best = win;
        for (int i = k; i < n; i++) {
            win += a[i] - a[i - k];
            if (win > best) best = win;
        }
        System.out.println(best);
    }
}`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'java-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Overflow-Safe Sorted Two-Sum O(n)',
        banglaNote: '`long` কাস্টিং ও টু-পয়েন্টার ব্যবহার করে এক পাসে পেয়ার ইনডেক্স নির্ণয়।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long target = sc.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        int l = 0, r = n - 1;
        while (l < r) {
            long s = a[l] + a[r];
            if (s == target) { System.out.println(l + " " + r); return; }
            if (s < target) l++; else r--;
        }
        System.out.println(-1);
    }
}`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'int[] a = new int[n];',
        whatItMeans: 'Allocates a fixed-size contiguous primitive integer array of length `n`.',
        whyItIsThere: 'O(1) random access with zero wrapper-object overhead.',
        ifDeletedError: 'Compile error: cannot find symbol `a`.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'long s = a[l] + a[r];',
        whatItMeans: 'Sums left and right values in 64-bit `long` arithmetic.',
        whyItIsThere: 'Prevents overflow on large values up to `10^18`.',
        ifDeletedError: '`s` undeclared inside comparison.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'if (s < target) l++; else r--;',
        whatItMeans: 'Shrinks the window from whichever end pulls closer to `target`.',
        whyItIsThere: 'Guarantees termination in at most `n - 1` steps.',
        ifDeletedError: 'Infinite loop when sum does not equal target on first check.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: 'a[0]+a[4] = 17', note: '17 > 13 -> r--' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'a[0]+a[3] = 13', note: 'Equal to target' },
      { step: 3, state: 'println("0 3")', memoryOrStack: 'stdout: 0 3', note: 'Early return exits cleanly' },
      { step: 4, state: 'GC reclaims int[]', memoryOrStack: 'Heap reclaimed', note: 'No manual free needed' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Comparing Java Strings With `==` Instead of `.equals()`',
        brokenCode: `if (s1 == s2) { /* Checks memory address, NOT text! */ }`,
        fixedCode: `if (s1.equals(s2)) { /* Checks character content */ }`,
        whyItBreaks: '`==` compares Heap object references; two identical strings read via Scanner sit at different addresses!',
      },
      {
        title: 'Trap 2: O(n^2) String Concatenation Inside Loop',
        brokenCode: `String out = "";\nfor (int x : a) out += x + " ";`,
        fixedCode: `StringBuilder sb = new StringBuilder();\nfor (int x : a) sb.append(x).append(' ');`,
        whyItBreaks: 'Creates `n` intermediate `String` allocations on the Heap.',
      },
      {
        title: 'Trap 3: Using `.length` vs `.length()` Confusion',
        brokenCode: `int n = s.length; // Compile error on String!`,
        fixedCode: `int arrLen = a.length; int strLen = s.length();`,
        whyItBreaks: 'Arrays have a `.length` field; `String` has a `.length()` method.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Fast StringBuilder Formatter',
        prompt: 'Read n and n ints; print them comma-separated with `StringBuilder`.',
        banglaHint: '`StringBuilder` এ অ্যাপেন্ড করে শেষে প্রিন্ট করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) { if (i > 0) sb.append(','); sb.append(sc.nextInt()); }\n        System.out.println(sb);\n    }\n}`,
        sampleStdin: '4\n3 6 9 12',
        expectedOutput: '3,6,9,12',
      },
      {
        id: 'java-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Find Max Element in int[]',
        prompt: 'Read n and n integers; output the maximum integer.',
        banglaHint: '`int mx = a[0]` ধরে তুলনা করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), mx = Integer.MIN_VALUE;\n        for (int i = 0; i < n; i++) mx = Math.max(mx, sc.nextInt());\n        System.out.println(mx);\n    }\n}`,
        sampleStdin: '5\n-10 4 99 12 3',
        expectedOutput: '99',
      },
      {
        id: 'java-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates In-Place (Sorted Array)',
        prompt: 'Read n and n sorted ints; return unique element count.',
        banglaHint: '`slow` এবং `fast` দুটি ইনডেক্স রাখো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int slow = 0;\n        for (int fast = 1; fast < n; fast++) if (a[fast] != a[slow]) a[++slow] = a[fast];\n        System.out.println(n == 0 ? 0 : slow + 1);\n    }\n}`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Variable Sliding Window: Longest Subarray <= S',
        prompt: 'Read n, S and n positive integers; output longest window length with sum <= S.',
        banglaHint: '`while (sum > S) sum -= a[l++];` লজিক ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long S = sc.nextLong();\n        long[] a = new long[n]; for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        long sum = 0; int l = 0, best = 0;\n        for (int r = 0; r < n; r++) { sum += a[r]; while (sum > S) sum -= a[l++]; best = Math.max(best, r - l + 1); }\n        System.out.println(best);\n    }\n}`,
        sampleStdin: '6 7\n1 2 3 1 1 5',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (Two-Pointers)',
        prompt: 'Read n heights and output maximum water area.',
        banglaHint: 'ছোট দেয়ালের দিকটি ভেতরে সরাও।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long[] h = new long[n];\n        for (int i = 0; i < n; i++) h[i] = sc.nextLong();\n        int l = 0, r = n - 1; long best = 0;\n        while (l < r) {\n            best = Math.max(best, (long)(r - l) * Math.min(h[l], h[r]));\n            if (h[l] < h[r]) l++; else r--;\n        }\n        System.out.println(best);\n    }\n}`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'Java 21 Mini Build: Contiguous Array Two-Pointer Finder',
      description: 'Processes primitive int[] with zero boxing overhead and outputs the matching Two-Sum indices.',
      banglaGoal: 'Java প্রিমিটিভ অ্যারেতে O(n) টু-পয়েন্টার সার্চ ইমপ্লিমেন্ট করা।',
      combinesChapters: 'Ch 1–6',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), target = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int l = 0, r = n - 1;
        while (l < r) {
            int s = a[l] + a[r];
            if (s == target) { System.out.println(l + " " + r); break; }
            if (s < target) l++; else r--;
        }
    }
}`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 6 (ES2025): Arrays, Strings & Two-Pointers',
    banglaTitle: 'JavaScript অধ্যায় ৬ (ES2025): অ্যারে, স্ট্রিং ও টু-পয়েন্টার',
    subtitle: 'Master V8 array elements, Int32Array typed buffers, non-mutating ES2025 methods, and O(n) Two-Pointer / Sliding Window logic.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript Arrays act like dynamic lists, while TypedArrays like `Int32Array` lock down raw contiguous 32-bit integers in memory for near-C numeric speed. Also remember: `arr.sort()` sorts **alphabetically as strings** unless you pass `(a, b) => a - b`! On sorted arrays, converging `left` and `right` pointers solve pair problems in O(n) time.',
      asciiFlowchart: `  ES2025 ARRAY / Int32Array SLIDING WINDOW
  Index:   0    1    2    3    4    5
  Array: [ 2,   1,   5,   1,   3,   2 ]
           |<---k=3--->|
           win = 8  --> slide (+a[3] - a[0]) --> win = 7 ... best = 9`,
      pseudocode: [
        '1. PARSE numeric array cleanly using `.map(Number)`',
        '2. SORT numerically with `.toSorted((a, b) => a - b)` when order is needed',
        '3. USE `parts.push(...)` + `parts.join(" ")` for clean O(n) string building',
        '4. RUN `let l = 0, r = n - 1` Two-Pointers until `l < r` finishes',
        '5. AVOID `.shift()` inside loops (O(n) re-indexing) — advance a read index `l++` instead',
      ],
      banglaZeroToHero: {
        analogyTitle: 'JS অ্যারের গোপন ফাঁদ ও টু-পয়েন্টার সুপারপাওয়ার',
        explanation:
          'JavaScript-এ `[10, 2, 1].sort()` লিখলে উত্তর `[1, 2, 10]` না হয়ে `[1, 10, 2]` হয়! কারণ JS ডিফল্টভাবে সংখ্যাকে স্ট্রিং ধরে ডিকশনারি অর্ডারে সাজায়! তাই সংখ্যার জন্য সবসময় `.sort((a, b) => a - b)` বা নন-মিউটেটিং `.toSorted((a, b) => a - b)` লিখতে হয়। আর দুই পাশ থেকে `l` ও `r` চালিয়ে দিলে মুহূর্তেই পেয়ার পাওয়া যায়!',
        everydayExample:
          'রোল নম্বর "১০" আর "২" কে নাম অনুযায়ী সাজালে "১০" আগে চলে আসে—সংখ্যার জন্য `(a, b) => a - b` নিয়ম বলে দিতে হয়।',
        keyTakeaways: [
          'সংখ্যা সর্ট করতে সবসময় `.toSorted((a, b) => a - b)` বা `.sort((a, b) => a - b)` লিখবে।',
          'অ্যারে থেকে প্রথম উপাদান বারবার `.shift()` করলে কোড `O(n^2)` হয়ে যায়—ইনডেক্স পয়েন্টার ব্যবহার করো।',
          'অ্যারের ভেতর স্পেস দিয়ে প্রিন্ট করতে `arr.join(" ")` সবচেয়ে পরিষ্কার ও দ্রুত পদ্ধতি।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Destructured Two-Pointer Array Reverse',
        banglaNote: 'ES2025 অ্যারে ডিস্ট্রাকচারিং `[a[l], a[r]] = [a[r], a[l]]` দিয়ে এক লাইনে সোয়াপ।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0] || 0;
const a = nums.slice(1, 1 + n);

let l = 0, r = a.length - 1;
while (l < r) {
  [a[l], a[r]] = [a[r], a[l]];
  l++; r--;
}
console.log(a.join(' '));`,
        stdin: '5\n10 20 30 40 50',
        expectedOutput: '50 40 30 20 10',
      },
      {
        id: 'js-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Numerical .toSorted() vs Default String Sort Trap',
        banglaNote: 'নন-মিউটেটিং `.toSorted((a, b) => a - b)` দিয়ে নিরাপদ সংখ্যাসূচক সর্ট।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const a = nums.slice(1, 1 + (nums[0] || 0));
const sorted = a.toSorted((x, y) => x - y);
console.log(sorted.join(' '));`,
        stdin: '4\n10 2 100 5',
        expectedOutput: '2 5 10 100',
      },
      {
        id: 'js-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Int32Array O(n) Sliding Window Maximum Sum',
        banglaNote: '`Int32Array` বাফারে স্লাইডিং উইন্ডো চালিয়ে জিরো-অ্যালোকেশন O(n) ফলাফল।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const [n, k] = nums;
const a = Int32Array.from(nums.slice(2, 2 + n));

let win = 0;
for (let i = 0; i < k; i++) win += a[i];
let best = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'js-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Sorted Two-Sum With O(1) Auxiliary Space',
        banglaNote: 'দুই প্রান্ত থেকে পয়েন্টার চালিয়ে O(n) সময়ে নির্ভুল পেয়ার বের করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const [n, target] = nums;
const a = nums.slice(2, 2 + n);

let l = 0, r = n - 1, out = '-1';
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) { out = \`\${l} \${r}\`; break; }
  if (s < target) l++; else r--;
}
console.log(out);`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const a = nums.slice(2, 2 + n);',
        whatItMeans: 'Extracts the `n` array values into a dedicated subarray.',
        whyItIsThere: 'Keeps header metadata (`n`, `target`) separate from Two-Pointer indices.',
        ifDeletedError: 'ReferenceError: `a` is not defined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'while (l < r) {',
        whatItMeans: 'Iterates while left and right indices point to two distinct elements.',
        whyItIsThere: 'Prevents checking the same element twice (`l === r`).',
        ifDeletedError: 'Only checks one pair or loops forever.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'if (s < target) l++; else r--;',
        whatItMeans: 'Squeezes the sorted window inward.',
        whyItIsThere: 'Guarantees O(n) time without nested loops.',
        ifDeletedError: 'Infinite loop hangs the JS event loop.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: 'a[0]+a[4] = 17', note: '17 > 13 -> r--' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'a[0]+a[3] = 13', note: 'Matches target!' },
      { step: 3, state: 'out = "0 3"; break', memoryOrStack: 'Template string built', note: 'O(1) extra memory' },
      { step: 4, state: 'console.log(out)', memoryOrStack: 'stdout: 0 3', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Calling `.sort()` Without a Numeric Comparator',
        brokenCode: `[10, 2, 1].sort(); // Returns [1, 10, 2]!`,
        fixedCode: `[10, 2, 1].toSorted((a, b) => a - b); // Returns [1, 2, 10]`,
        whyItBreaks: 'Default JS `.sort()` converts every item to UTF-16 strings before comparing!',
      },
      {
        title: 'Trap 2: Mutating Shared Array With `.reverse()` or `.sort()`',
        brokenCode: `const rev = arr.reverse(); // Mutates original arr too!`,
        fixedCode: `const rev = arr.toReversed(); // Non-mutating ES2023/2025`,
        whyItBreaks: '`.reverse()` and `.sort()` mutate in-place and return the same reference.',
      },
      {
        title: 'Trap 3: Calling `arr.shift()` Repeatedly Inside a Loop',
        brokenCode: `while (q.length) { const x = q.shift(); } // O(n^2)!`,
        fixedCode: `for (let head = 0; head < q.length; head++) { const x = q[head]; } // O(n)`,
        whyItBreaks: '`.shift()` shifts every remaining array element down by 1 index each call.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Non-Mutating Array Reverse Join',
        prompt: 'Read n and n ints; output reversed elements using `.toReversed().join(" ")`.',
        banglaHint: '`a.toReversed().join(" ")` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconsole.log(nums.slice(1, 1 + nums[0]).toReversed().join(' '));`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '20 15 10 5',
      },
      {
        id: 'js-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Palindrome Word Check',
        prompt: 'Read a word and print YES if palindrome, else NO.',
        banglaHint: '`l = 0, r = s.length - 1` লুপে তুলনা করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim();\nlet l = 0, r = s.length - 1, ok = true;\nwhile (l < r) { if (s[l++] !== s[r--]) { ok = false; break; } }\nconsole.log(ok ? 'YES' : 'NO');`,
        sampleStdin: 'racecar',
        expectedOutput: 'YES',
      },
      {
        id: 'js-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates From Sorted Array',
        prompt: 'Read n and n sorted numbers; output unique element count.',
        banglaHint: '`slow` ইনডেক্স দিয়ে ইউনিক সংখ্যা গোনো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst a = nums.slice(1, 1 + nums[0]);\nlet slow = 0;\nfor (let fast = 1; fast < a.length; fast++) if (a[fast] !== a[slow]) a[++slow] = a[fast];\nconsole.log(a.length ? slow + 1 : 0);`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'js-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Variable Sliding Window: Longest Subarray <= S',
        prompt: 'Read n, S and n positive integers; output max length with sum <= S.',
        banglaHint: '`while (sum > S) sum -= a[l++];` লুপ চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst [n, S] = nums; const a = nums.slice(2, 2 + n);\nlet sum = 0, l = 0, best = 0;\nfor (let r = 0; r < n; r++) { sum += a[r]; while (sum > S) sum -= a[l++]; best = Math.max(best, r - l + 1); }\nconsole.log(best);`,
        sampleStdin: '6 7\n1 2 3 1 1 5',
        expectedOutput: '4',
      },
      {
        id: 'js-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (O(n))',
        prompt: 'Read n heights; compute max water container area.',
        banglaHint: 'দুই প্রান্তের ছোট দেয়ালটি ভেতরে সরাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst h = nums.slice(1, 1 + nums[0]);\nlet l = 0, r = h.length - 1, best = 0;\nwhile (l < r) { best = Math.max(best, (r - l) * Math.min(h[l], h[r])); if (h[l] < h[r]) l++; else r--; }\nconsole.log(best);`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'ES2025 Mini Build: Two-Pointer Pair Finder',
      description: 'Processes parsed array slices with converging left/right pointers in O(n) time.',
      banglaGoal: 'জাভাস্ক্রিপ্টে সর্টেড অ্যারের ওপর টু-পয়েন্টার টেকনিক প্রয়োগ করা।',
      combinesChapters: 'Ch 1–6',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const [n, target] = nums;
const a = nums.slice(2, 2 + n);
let l = 0, r = n - 1;
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) { console.log(\`\${l} \${r}\`); break; }
  if (s < target) l++; else r--;
}`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  rust: {
    title: 'Rust Chapter 6 (Rust 2024): Vec, Slices (&[T]), UTF-8 & Two-Pointers',
    banglaTitle: 'Rust অধ্যায় ৬ (Rust 2024): Vec, স্লাইস (&[T]) ও টু-পয়েন্টার',
    subtitle: 'Master bounds-checked Vec<i64>, zero-copy slices &[T], .windows(), UTF-8 String vs bytes, and underflow-safe Two-Pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'A Rust `Vec<T>` owns a contiguous Heap buffer with `(ptr, len, cap)` on the Stack, while a slice `&[T]` is a zero-copy fat pointer `(ptr, len)` viewing any portion of it! Unlike C, Rust prevents out-of-bounds reads, and `String` enforces valid UTF-8 so you cannot index `s[0]` directly (because `"বাংলা"` characters take 3 bytes each!)—instead use `.as_bytes()` for ASCII or `.chars()` for Unicode.',
      asciiFlowchart: `  RUST Vec<i32> ON STACK          HEAP CONTIGUOUS BUFFER
  [ ptr | len=5 | cap=8 ] -----> [ 2 | 5 | 7 | 11 | 15 | _ | _ | _ ]
                                   ^            ^
  Slice &v[2..2+n]: (ptr, len=5)  l=0          r=3  (a[l]+a[r] == 13!)`,
      pseudocode: [
        '1. COLLECT parsed input into `Vec<i64>` and take zero-copy slice `let a = &v[2..2 + n]`',
        '2. GUARD empty slices before initializing `r = n - 1` (prevents `usize` underflow)',
        '3. SQUEEZE `l` and `r` while `l < r` (guaranteed `r > 0` inside loop!)',
        '4. USE `.windows(k)` for clean sliding window operations',
        '5. USE `.as_bytes()` for O(1) ASCII character indexing instead of `.chars().nth()`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নিরাপদ স্লাইস জানালা (`&[T]`) ও UTF-8 সুরক্ষা',
        explanation:
          'Rust-এ `Vec` হলো আসল ট্রেন, আর স্লাইস (`&a[1..4]`) হলো ট্রেনের ২য় থেকে ৪র্থ বগির দিকে তাকানো একটি জানালা—কোনো বাড়তি মেমোরি খরচ ছাড়াই! আরেকটি মজার নিয়ম: বাংলা বা ইমোজি অক্ষর ১ বাইটে ধরে না, তাই Rust সরাসরি `s[0]` লিখতে দেয় না। ইংরেজি ASCII টেক্সটের জন্য `.as_bytes()` ব্যবহার করলে O(1) অ্যাক্সেস মেলে!',
        everydayExample:
          'বইয়ের ১–১০ নম্বর পাতা না ছিঁড়ে শুধু বুকমার্ক দিয়ে ওই অংশ পড়া হলো স্লাইস (&[T])।',
        keyTakeaways: [
          '`if a.is_empty() { return; }` না লিখলে `0usize - 1` এ Rust সাথে সাথে প্যানিক করবে!',
          'স্লাইডিং উইন্ডোর জন্য Rust-এর built-in `.windows(k)` বা O(n) রানিং সাম ব্যবহার করা যায়।',
          'ASCII স্ট্রিংয়ে `s.as_bytes()` দিয়ে নিরাপদে `l` ও `r` টু-পয়েন্টার চালানো যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Slice .swap(l, r) Two-Pointer Reversal',
        banglaNote: 'বিল্ট-ইন `.swap(l, r)` মেথড দিয়ে নিরাপদ টু-পয়েন্টার রিভার্স।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut nums: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    if nums.is_empty() { return; }
    let n = nums[0] as usize;
    let a = &mut nums[1..1 + n];
    if !a.is_empty() {
        let (mut l, mut r) = (0usize, a.len() - 1);
        while l < r {
            a.swap(l, r);
            l += 1;
            r -= 1;
        }
    }
    let out: Vec<String> = a.iter().map(|x| x.to_string()).collect();
    println!("{}", out.join(" "));
}`,
        stdin: '5\n10 20 30 40 50',
        expectedOutput: '50 40 30 20 10',
      },
      {
        id: 'rust-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Empty-Safe ASCII Byte Slice Palindrome',
        banglaNote: 'খালি স্ট্রিংয়ে `usize` আন্ডারফ্লো এড়াতে `is_empty()` গার্ডসহ `.as_bytes()` প্যালিনড্রোম।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let b = s.trim().as_bytes();
    if b.is_empty() { println!("YES"); return; }
    let (mut l, mut r) = (0usize, b.len() - 1);
    let mut ok = true;
    while l < r {
        if b[l] != b[r] { ok = false; break; }
        l += 1;
        r -= 1;
    }
    println!("{}", if ok { "YES" } else { "NO" });
}`,
        stdin: 'racecar',
        expectedOutput: 'YES',
      },
      {
        id: 'rust-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Running Sliding Window Maximum',
        banglaNote: 'প্রথম `k` উপাদান `.sum()` করে পরের ধাপগুলোতে O(1) আপডেটে সর্বোচ্চ উইন্ডো সাম।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    let (n, k) = (v[0] as usize, v[1] as usize);
    let a = &v[2..2 + n];
    let mut win: i64 = a[..k].iter().sum();
    let mut best = win;
    for i in k..n {
        win += a[i] - a[i - k];
        best = best.max(win);
    }
    println!("{}", best);
}`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'rust-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Pattern Matching std::cmp::Ordering in Two-Sum',
        banglaNote: '`cmp(&target)` প্যাটার্ন ম্যাচ ব্যবহার করে এক লাইনের স্পষ্ট টু-পয়েন্টার স্লাইস লজিক।',
        code: `use std::cmp::Ordering;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    let (n, target) = (v[0] as usize, v[1]);
    let a = &v[2..2 + n];
    let (mut l, mut r) = (0usize, n.saturating_sub(1));
    while l < r {
        match (a[l] + a[r]).cmp(&target) {
            Ordering::Equal => { println!("{} {}", l, r); return; }
            Ordering::Less => l += 1,
            Ordering::Greater => r -= 1,
        }
    }
    println!("-1");
}`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 9',
        codeSnippet: 'let a = &v[2..2 + n];',
        whatItMeans: 'Creates an immutable slice viewing `n` elements without copying Heap memory.',
        whyItIsThere: 'Zero-cost abstraction separating header metadata from the array body.',
        ifDeletedError: '`a` becomes undeclared inside the Two-Pointer loop.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'let (mut l, mut r) = (0usize, n.saturating_sub(1));',
        whatItMeans: 'Safely clamps `0usize - 1` to `0` if `n == 0`.',
        whyItIsThere: 'Prevents integer underflow panic on empty inputs.',
        ifDeletedError: 'Subtracted `n - 1` panics when `n == 0`.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'match (a[l] + a[r]).cmp(&target)',
        whatItMeans: 'Exhaustively handles `Less`, `Equal`, and `Greater` variants.',
        whyItIsThere: 'Guarantees no branch is forgotten at compile time.',
        ifDeletedError: 'Compile error or missing comparison logic.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: 'a[0]+a[4] = 17 > 13', note: 'Ordering::Greater -> r -= 1' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'a[0]+a[3] = 13 == 13', note: 'Ordering::Equal -> println!("0 3")' },
      { step: 3, state: 'Early return', memoryOrStack: 'Slice &v dropped (no-op)', note: 'Zero heap copies made' },
      { step: 4, state: 'v dropped at end', memoryOrStack: 'RAII frees Vec buffer', note: 'Memory-safe exit' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Indexing Rust `String` With `s[i]`',
        brokenCode: `let s = String::from("hello");\nlet ch = s[0]; // Compile error!`,
        fixedCode: `let ch = s.as_bytes()[0] as char; // or s.chars().nth(0)`,
        whyItBreaks: 'UTF-8 characters vary from 1 to 4 bytes; O(1) char indexing is ambiguous.',
      },
      {
        title: 'Trap 2: `let r = n - 1;` When `n == 0` (`usize` Underflow)',
        brokenCode: `let r: usize = a.len() - 1; // Panics on empty slice!`,
        fixedCode: `let r: usize = a.len().saturating_sub(1);`,
        whyItBreaks: 'Unsigned `0usize - 1` panics in Rust debug builds and wraps in release!',
      },
      {
        title: 'Trap 3: Cloning `Vec` Inside a Loop Instead of Borrowing `&[T]`',
        brokenCode: `fn sum(v: Vec<i64>) -> i64 { ... } // Moves or requires .clone()!`,
        fixedCode: `fn sum(v: &[i64]) -> i64 { v.iter().sum() }`,
        whyItBreaks: 'Accepting `&[T]` works on Vec, arrays, and sub-slices with zero copies.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Find Max in Slice With .iter().max()',
        prompt: 'Read n and n i64 numbers; print the maximum.',
        banglaHint: '`a.iter().copied().max().unwrap_or(0)` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();\n    let n = v[0] as usize;\n    println!("{}", v[1..1 + n].iter().copied().max().unwrap_or(0));\n}`,
        sampleStdin: '5\n-10 4 99 12 3',
        expectedOutput: '99',
      },
      {
        id: 'rust-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Palindrome Check via .as_bytes()',
        prompt: 'Read an ASCII word and print YES if palindrome, else NO.',
        banglaHint: '`let b = s.trim().as_bytes();` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let b = s.trim().as_bytes();\n    let ok = (0..b.len() / 2).all(|i| b[i] == b[b.len() - 1 - i]);\n    println!("{}", if ok { "YES" } else { "NO" });\n}`,
        sampleStdin: 'level',
        expectedOutput: 'YES',
      },
      {
        id: 'rust-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates In-Place From Sorted Vec',
        prompt: 'Read n and n sorted integers; output unique count.',
        banglaHint: '`slow` এবং `fast` পয়েন্টার দিয়ে ইউনিক সংখ্যা সামনে রাখো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut v: Vec<i32> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();\n    let n = v[0] as usize; let a = &mut v[1..1 + n];\n    if a.is_empty() { println!("0"); return; }\n    let mut slow = 0;\n    for fast in 1..n { if a[fast] != a[slow] { slow += 1; a[slow] = a[fast]; } }\n    println!("{}", slow + 1);\n}`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Variable Sliding Window: Longest Subarray <= S',
        prompt: 'Read n, S and n positive integers; output max length with sum <= S.',
        banglaHint: '`while sum > cap { sum -= a[l]; l += 1; }` চালাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();\n    let (n, cap) = (v[0] as usize, v[1]); let a = &v[2..2 + n];\n    let (mut l, mut sum, mut best) = (0usize, 0i64, 0usize);\n    for r in 0..n { sum += a[r]; while sum > cap { sum -= a[l]; l += 1; } best = best.max(r - l + 1); }\n    println!("{}", best);\n}`,
        sampleStdin: '6 7\n1 2 3 1 1 5',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (O(n))',
        prompt: 'Read n heights; compute max water container area.',
        banglaHint: 'দুই প্রান্তের মধ্যে ছোট দেয়ালটির দিক সরাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();\n    let n = v[0] as usize; let h = &v[1..1 + n];\n    let (mut l, mut r, mut best) = (0usize, n.saturating_sub(1), 0i64);\n    while l < r {\n        best = best.max((r - l) as i64 * h[l].min(h[r]));\n        if h[l] < h[r] { l += 1; } else { r -= 1; }\n    }\n    println!("{}", best);\n}`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Mini Build: Zero-Copy Slice Two-Pointer Finder',
      description: 'Borrows a subslice `&v[2..2 + n]` with zero copying and finds the Two-Sum pair in O(n).',
      banglaGoal: 'Rust স্লাইস (`&[T]`) ও saturating_sub নিরাপত্তা ব্যবহার করে টু-পয়েন্টার সার্চ তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (v[0] as usize, v[1]);
    let a = &v[2..2 + n];
    let (mut l, mut r) = (0usize, n - 1);
    while l < r {
        let sum = a[l] + a[r];
        if sum == target { println!("{} {}", l, r); break; }
        if sum < target { l += 1; } else { r -= 1; }
    }
}`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 6 (TS 5.x): Typed Arrays, Readonly & Two-Pointers',
    banglaTitle: 'TypeScript অধ্যায় ৬ (TS 5.x): টাইপড অ্যারে, Readonly ও টু-পয়েন্টার',
    subtitle: 'Enforce immutability with readonly number[], guard array indexing, and write typed O(n) Two-Pointer / Sliding Window helpers.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript adds compile-time contracts over JavaScript arrays: marking a parameter `readonly number[]` guarantees a search function cannot accidentally mutate or `.reverse()` the caller’s sorted array! Meanwhile, explicit index guards protect against `undefined` elements when slicing or converging pointers.',
      asciiFlowchart: `  READONLY CONTRACT (Compiler Guard)
  readonly number[] ---> Two-Pointer Search (cannot .push / .sort / .reverse!)
  [ 2, 5, 7, 11, 15 ] -> returns [number, number] | null cleanly`,
      pseudocode: [
        '1. MARK non-mutating search helpers with `readonly number[]`',
        '2. RETURN explicit tuple `[number, number] | null` instead of magic `-1` surprises',
        '3. SORT copies safely via `.toSorted((a, b) => a - b)`',
        '4. RUN `l < r` Two-Pointers in O(n) time and O(1) space',
        '5. HANDLE `null` return cleanly before printing output',
      ],
      banglaZeroToHero: {
        analogyTitle: '"হাত দেবেন না" গ্লাস-কেস (`readonly number[]`) ও টু-পয়েন্টার',
        explanation:
          'জাদুঘরের গ্লাস-কেসের ভেতর রাখা জিনিস তুমি শুধু চোখে দেখতে পারবে কিন্তু নাড়াতে পারবে না! TypeScript-এ ফাংশনের প্যারামিটার `readonly number[]` লিখে দিলে সেই ফাংশন ভুল করেও অ্যারের কোনো মান বদলাতে বা `.sort()` করে ওলটপালট করতে পারবে না—কম্পাইলার সাথে সাথে এরর দেখাবে!',
        everydayExample:
          'পরীক্ষার উত্তরপত্র স্ক্যান করে শুধু নম্বর গোনা—সেখানে কলম দিয়ে দাগ দেওয়ার অনুমতি না থাকা।',
        keyTakeaways: [
          'অ্যারে পড়ার ফাংশনে `readonly number[]` লিখলে অজানা সাইড-ইফেক্ট বন্ধ হয়।',
          'রিটার্ন টাইপ `[number, number] | null` লিখলে কলার বাধ্য হয়ে মিসিং কেস হ্যান্ডেল করে।',
          'নম্বর সর্টিংয়ে `.toSorted((a, b) => a - b)` ব্যবহার করে মূল অ্যারে অপরিবর্তিত রাখো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed In-Place Reversal Helper',
        banglaNote: 'টাইপ-সেফ সোয়াপের মাধ্যমে `number[]` অ্যারে উল্টে দেওয়া।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const a: number[] = nums.slice(1, 1 + (nums[0] || 0));

function reverseInPlace(arr: number[]): void {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const tmp = arr[l];
    arr[l] = arr[r];
    arr[r] = tmp;
    l++; r--;
  }
}
reverseInPlace(a);
console.log(a.join(' '));`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '20 15 10 5',
      },
      {
        id: 'ts-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Readonly Pair Tuple Return ([number, number] | null)',
        banglaNote: 'ফলাফল না পেলে `null` রিটার্ন করে নিরাপদ ন্যারোয়িং দেখানো।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const [n = 0, target = 0] = nums;
const a: readonly number[] = nums.slice(2, 2 + n);

function twoSumSorted(arr: readonly number[], t: number): [number, number] | null {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const s = arr[l] + arr[r];
    if (s === t) return [l, r];
    if (s < t) l++; else r--;
  }
  return null;
}

const hit = twoSumSorted(a, target);
console.log(hit ? \`\${hit[0]} \${hit[1]}\` : 'NONE');`,
        stdin: '4 100\n1 2 3 4',
        expectedOutput: 'NONE',
      },
      {
        id: 'ts-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed O(n) Sliding Window Maximum',
        banglaNote: '`readonly number[]` ইনপুটে কোনো কপি ছাড়াই O(n) স্লাইডিং উইন্ডো সর্বোচ্চ যোগফল।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const [n = 0, k = 0] = nums;
const a: readonly number[] = nums.slice(2, 2 + n);

function maxWin(arr: readonly number[], size: number): number {
  let win = 0;
  for (let i = 0; i < size; i++) win += arr[i];
  let best = win;
  for (let i = size; i < arr.length; i++) {
    win += arr[i] - arr[i - size];
    if (win > best) best = win;
  }
  return best;
}
console.log(maxWin(a, k));`,
        stdin: '6 3\n2 1 5 1 3 2',
        expectedOutput: '9',
      },
      {
        id: 'ts-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Sorted Two-Sum O(n)',
        banglaNote: 'সর্টেড `readonly` অ্যারেতে O(n) সময়ে সঠিক জোড়ার ইনডেক্স বের করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const [n = 0, target = 0] = nums;
const a: readonly number[] = nums.slice(2, 2 + n);

let l = 0, r = n - 1;
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) { console.log(\`\${l} \${r}\`); break; }
  if (s < target) l++; else r--;
}`,
        stdin: '5 13\n2 5 7 11 15',
        expectedOutput: '0 3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const a: readonly number[] = nums.slice(2, 2 + n);',
        whatItMeans: 'Annotates `a` as an immutable array reference so `.push()` / `.pop()` fail at compile time.',
        whyItIsThere: 'Prevents accidental modification of sorted input during Two-Pointer traversal.',
        ifDeletedError: '`a` becomes undeclared in the loop.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'while (l < r) {',
        whatItMeans: 'Iterates until pointers converge.',
        whyItIsThere: 'Guarantees `a[l]` and `a[r]` refer to two distinct indices.',
        ifDeletedError: 'Logic fails to scan array.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'if (s < target) l++; else r--;',
        whatItMeans: 'Monotonically adjusts pointers toward target.',
        whyItIsThere: 'Achieves strict O(n) complexity.',
        ifDeletedError: 'Infinite loop.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: 'a[0]+a[4] = 17', note: '17 > 13 -> r--' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: 'a[0]+a[3] = 13', note: 'Matches target!' },
      { step: 3, state: 'console.log("0 3")', memoryOrStack: 'stdout: 0 3', note: 'Breaks cleanly' },
      { step: 4, state: 'End of script', memoryOrStack: 'readonly check passed', note: 'Zero mutations to a' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `.sort()` on a `readonly number[]`',
        brokenCode: `function minVal(a: readonly number[]) { return a.sort((x, y) => x - y)[0]; }`,
        fixedCode: `function minVal(a: readonly number[]) { return a.toSorted((x, y) => x - y)[0]; }`,
        whyItBreaks: '`.sort()` mutates in-place (compile error on `readonly`); `.toSorted()` returns a new sorted array!',
      },
      {
        title: 'Trap 2: Numeric `.sort()` Without Comparator',
        brokenCode: `const s = [10, 2].toSorted(); // [2, 10]? NO! [10, 2]!`,
        fixedCode: `const s = [10, 2].toSorted((a, b) => a - b);`,
        whyItBreaks: 'Underlying JS `.sort()` compares UTF-16 strings by default.',
      },
      {
        title: 'Trap 3: Indexing Outside Length Silently Returns `undefined`',
        brokenCode: `const x: number = a[a.length]; // undefined at runtime -> NaN math!`,
        fixedCode: `if (idx >= 0 && idx < a.length) { const x = a[idx]; }`,
        whyItBreaks: 'Without `noUncheckedIndexedAccess`, `a[n]` causes silent `NaN` propagation.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Readonly Array Reverse Join',
        prompt: 'Read n and n ints; print reversed values via `.toReversed().join(" ")`.',
        banglaHint: '`a.toReversed().join(" ")` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst a: readonly number[] = nums.slice(1, 1 + nums[0]);\nconsole.log(a.toReversed().join(' '));`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '20 15 10 5',
      },
      {
        id: 'ts-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Typed String Palindrome Check',
        prompt: 'Read a word and output YES if palindrome, else NO.',
        banglaHint: '`l < r` লুপে দুই প্রান্তের অক্ষর মেলাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s: string = raw.trim();\nlet l = 0, r = s.length - 1, ok = true;\nwhile (l < r) { if (s[l++] !== s[r--]) { ok = false; break; } }\nconsole.log(ok ? 'YES' : 'NO');`,
        sampleStdin: 'madam',
        expectedOutput: 'YES',
      },
      {
        id: 'ts-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Remove Duplicates In-Place From Sorted Array',
        prompt: 'Read n and n sorted numbers; output unique element count.',
        banglaHint: '`slow` এবং `fast` পয়েন্টার ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst a: number[] = nums.slice(1, 1 + nums[0]);\nlet slow = 0;\nfor (let fast = 1; fast < a.length; fast++) if (a[fast] !== a[slow]) a[++slow] = a[fast];\nconsole.log(a.length ? slow + 1 : 0);`,
        sampleStdin: '7\n1 1 2 2 2 5 9',
        expectedOutput: '4',
      },
      {
        id: 'ts-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Variable Sliding Window: Longest Subarray <= S',
        prompt: 'Read n, S and n positive integers; output max length with sum <= S.',
        banglaHint: '`while (sum > S) sum -= a[l++];` লুপ লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst [n, S] = nums; const a: readonly number[] = nums.slice(2, 2 + n);\nlet sum = 0, l = 0, best = 0;\nfor (let r = 0; r < n; r++) { sum += a[r]; while (sum > S) sum -= a[l++]; best = Math.max(best, r - l + 1); }\nconsole.log(best);`,
        sampleStdin: '6 7\n1 2 3 1 1 5',
        expectedOutput: '4',
      },
      {
        id: 'ts-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (O(n))',
        prompt: 'Read n heights; return max water container area.',
        banglaHint: 'ছোট উচ্চতার প্রান্তটি ভেতরে সরাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst h: readonly number[] = nums.slice(1, 1 + nums[0]);\nlet l = 0, r = h.length - 1, best = 0;\nwhile (l < r) { best = Math.max(best, (r - l) * Math.min(h[l], h[r])); if (h[l] < h[r]) l++; else r--; }\nconsole.log(best);`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'TS 5.x Mini Build: Readonly Two-Pointer Finder',
      description: 'Processes a `readonly number[]` slice with strict type contracts and O(n) Two-Pointers.',
      banglaGoal: 'TypeScript-এ `readonly` অ্যারের ওপর টু-পয়েন্টার পেয়ার সার্চ তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const [n, target] = nums;
const a: readonly number[] = nums.slice(2, 2 + n);
let l = 0, r = n - 1;
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) { console.log(\`\${l} \${r}\`); break; }
  if (s < target) l++; else r--;
}`,
      sampleStdin: '5 13\n2 5 7 11 15',
      expectedOutput: '0 3',
    },
  },

  html: {
    title: 'HTML5 Chapter 6: Data Tables, Responsive Grid Arrays & Visual Two-Pointers',
    banglaTitle: 'HTML5 অধ্যায় ৬: ডেটা টেবিল, গ্রিড লেআউট ও টু-পয়েন্টার ভিজ্যুয়াল',
    subtitle: 'Structure tabular collections with <table>/<thead>/<tbody>, responsive CSS Grid tracks, and interactive Two-Pointer stepping.',
    zeroIntuition: {
      plainEnglishStory:
        'On the web, structured arrays become semantic `<table>` elements (for 2D rows & columns) or CSS Grid lists (`<ul>` with `display: grid`). Pairing `aria-label` and `<th scope="col">` makes array data readable by both screen readers and visual users simultaneously!',
      asciiFlowchart: `  HTML5 TABLE & ARRAY SLOT STRUCTURE
  +-----------------------------------------+
  | <thead> <tr> <th>Idx</th> <th>Val</th>  |
  +-----------------------------------------+
  | <tbody> <tr> <td>0</td>   <td>2</td>    |  <-- left
  |         <tr> <td>3</td>   <td>11</td>   |  <-- right (2 + 11 = 13!)
  +-----------------------------------------+`,
      pseudocode: [
        '1. WRAP tabular data in semantic `<table>` with `<thead>` and `<tbody>`',
        '2. ADD `scope="col"` to every `<th>` column header for accessibility',
        '3. RENDER array slots side by side using `display: flex` or `display: grid`',
        '4. HIGHLIGHT converging `left` and `right` pointers interactively in JS',
        '5. DISPLAY clear final match summary in a dedicated status container',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলগাড়ির বগির টেবিল (`<table>`) ও ভিজ্যুয়াল স্লাইডিং',
        explanation:
          'HTML-এ অনেকগুলো ডেটা সাজাতে হলে আমরা `<div>`-এর বদলে `<table border>` বা `<ul>` ব্যবহার করি। `<table>`-এর ভেতর `<thead>` হলো টেবিলের শিরোনাম (যেমন Index, Value) আর `<tbody>` হলো আসল ডেটার সারি! আর `display: flex` দিয়ে অ্যারের বক্সগুলো পাশাপাশি সাজিয়ে নিচে `left` ও `right` পয়েন্টার চালানো খুব মজার!',
        everydayExample:
          'স্কুলের মার্কশিট বা ক্রিকেট স্কোরবোর্ড: ওপরের লাইনে শিরোনাম (`<thead>`), আর নিচে সারি সারি নম্বর (`<tbody>`)।',
        keyTakeaways: [
          '২ডি ডেটার জন্য সবসময় `<table>`, `<thead>`, `<tbody>`, এবং `<th scope="col">` ব্যবহার করবে।',
          'লেআউট সাজাতে কখনো `<table>` ব্যবহার করবে না—তার জন্য `display: grid` বা `flex` আছে।',
          '`aria-live="polite"` দিলে পয়েন্টার সরার আপডেট স্ক্রিন রিডারও বুঝতে পারে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-6-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Accessible Semantic Data Table',
        banglaNote: '`<thead>`, `<tbody>`, ও `scope="col"` সহ পরিষ্কার HTML5 ডেটা টেবিল।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Array Memory Table</h3>
  <table style="border-collapse:collapse;width:100%;max-width:320px;font-family:monospace">
    <thead><tr><th scope="col" style="border:1px solid #334155;padding:6px">Idx</th><th scope="col" style="border:1px solid #334155;padding:6px">Val</th></tr></thead>
    <tbody>
      <tr><td style="border:1px solid #334155;padding:6px">0</td><td style="border:1px solid #334155;padding:6px">2</td></tr>
      <tr><td style="border:1px solid #334155;padding:6px">3</td><td style="border:1px solid #334155;padding:6px">11</td></tr>
    </tbody>
  </table>
</body></html>`,
        stdin: '',
        expectedOutput: 'Array Memory Table',
      },
      {
        id: 'html-6-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Responsive Empty-State & Overflow Wrap Grid',
        banglaNote: 'আইটেম না থাকলে সুন্দর এম্পটি স্টেট ও মোবাইলে অটো-ফিট গ্রিড।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Responsive Array Grid</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;max-width:360px">
    <div style="padding:10px;border:1px solid #38bdf8;border-radius:8px;text-align:center">[0]: 2</div>
    <div style="padding:10px;border:1px solid #334155;border-radius:8px;text-align:center">[1]: 5</div>
    <div style="padding:10px;border:1px solid #334155;border-radius:8px;text-align:center">[2]: 7</div>
    <div style="padding:10px;border:1px solid #34d399;border-radius:8px;text-align:center">[3]: 11</div>
  </div>
</body></html>`,
        stdin: '',
        expectedOutput: 'Responsive Array Grid',
      },
      {
        id: 'html-6-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: DocumentFragment Batch Row Rendering',
        banglaNote: 'বারবার DOM না ছুঁয়ে `DocumentFragment` দিয়ে একবারে সারি রেন্ডার (Reflow বাঁচায়)।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Batch Fragment Render</h3>
  <ul id="list" style="display:flex;gap:8px;list-style:none;padding:0;font-family:monospace"></ul>
  <script>
    const frag = document.createDocumentFragment();
    [2, 5, 7, 11, 15].forEach((v, i) => {
      const li = document.createElement('li');
      li.style.cssText = 'padding:8px 12px;border:1px solid #334155;border-radius:6px';
      li.textContent = i + ':' + v;
      frag.appendChild(li);
    });
    document.getElementById('list').appendChild(frag);
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Batch Fragment Render',
      },
      {
        id: 'html-6-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Interactive Two-Pointer Stepper UI',
        banglaNote: 'বাটনে ক্লিক করে `left` ও `right` পয়েন্টার কীভাবে ১৩ মেলায় তা লাইভ দেখা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Two-Pointer Visualizer (Target = 13)</h3>
  <div id="boxes" style="display:flex;gap:8px;font-family:monospace;margin:10px 0"></div>
  <button id="step" style="padding:8px 12px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Next Step</button>
  <p id="msg" style="color:#34d399;font-family:monospace"></p>
  <script>
    const a = [2, 5, 7, 11, 15], target = 13;
    let l = 0, r = a.length - 1;
    function draw(status) {
      document.getElementById('boxes').innerHTML = a.map((v, i) => {
        const bg = i === l ? '#0369a1' : i === r ? '#047857' : '#1e293b';
        return \`<div style="padding:10px 14px;border-radius:6px;background:\${bg}">\${v}</div>\`;
      }).join('');
      document.getElementById('msg').textContent = status;
    }
    draw(\`l=\${l}, r=\${r} -> sum = \${a[l] + a[r]}\`);
    document.getElementById('step').onclick = () => {
      if (l >= r) return;
      const s = a[l] + a[r];
      if (s === target) return draw(\`MATCH at indices \${l} & \${r} (\${a[l]}+\${a[r]}=13)\`);
      if (s < target) l++; else r--;
      draw(\`l=\${l}, r=\${r} -> sum = \${a[l] + a[r]}\`);
    };
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Two-Pointer Visualizer (Target = 13)',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: '<thead><tr><th scope="col">...</th></tr></thead>',
        whatItMeans: 'Defines semantic table column headers scoped vertically.',
        whyItIsThere: 'Allows assistive screen readers to announce column headers for every cell.',
        ifDeletedError: 'Table structure loses header semantics.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'display: grid; grid-template-columns: repeat(auto-fit, ...)',
        whatItMeans: 'Responsive multi-column array layout without media queries.',
        whyItIsThere: 'Automatically wraps array tiles on narrow mobile screens.',
        ifDeletedError: 'Cards stack vertically or overflow horizontally.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'document.createDocumentFragment()',
        whatItMeans: 'Batches DOM node insertions off-screen before attaching.',
        whyItIsThere: 'Prevents repeated layout reflow when rendering large arrays.',
        ifDeletedError: 'Cannot append child batch efficiently.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Initial UI renders a=[2,5,7,11,15]', memoryOrStack: 'l=0 (blue), r=4 (green)', note: 'sum = 17 > 13' },
      { step: 2, state: 'User clicks Next Step', memoryOrStack: 'r moves 4 -> 3', note: 'l=0, r=3 -> sum = 13' },
      { step: 3, state: 'User clicks Next Step', memoryOrStack: 's === 13', note: 'Displays MATCH at 0 & 3' },
      { step: 4, state: 'Table & Grid verified', memoryOrStack: 'Zero layout overflow', note: 'Accessible DOM markup' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `<table>` for Whole-Page Layout Instead of CSS Grid',
        brokenCode: `<table><tr><td>Sidebar</td><td>Main</td></tr></table>`,
        fixedCode: `<div style="display:grid;grid-template-columns:240px 1fr">...</div>`,
        whyItBreaks: 'Layout tables confuse screen readers and fail to reflow cleanly on mobile.',
      },
      {
        title: 'Trap 2: Mutating `innerHTML +=` Inside a 1,000-Item Loop',
        brokenCode: `for (let x of arr) ul.innerHTML += '<li>' + x + '</li>';`,
        fixedCode: `ul.innerHTML = arr.map(x => \`<li>\${x}</li>\`).join('');`,
        whyItBreaks: 'Re-parses and destroys the entire DOM subtree on every single iteration (O(n^2))!',
      },
      {
        title: 'Trap 3: Omitting `scope="col"` on Table Headers',
        brokenCode: `<th>Value</th>`,
        fixedCode: `<th scope="col">Value</th>`,
        whyItBreaks: 'Screen readers cannot associate header labels with rows cleanly.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Semantic Array Header Table',
        prompt: 'Render a two-column `<table>` showing index 0 and 3.',
        banglaHint: '`<thead>` ও `<tbody>` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><table><thead><tr><th scope="col">Idx</th><th scope="col">Val</th></tr></thead><tbody><tr><td>0</td><td>2</td></tr><tr><td>3</td><td>11</td></tr></tbody></table></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Val',
      },
      {
        id: 'html-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Horizontal Flex Array Strip',
        prompt: 'Display 3 array cells side by side using `display:flex`.',
        banglaHint: '`display:flex;gap:8px` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><div style="display:flex;gap:8px"><span>2</span><span>5</span><span>7</span></div></body></html>`,
        sampleStdin: '',
        expectedOutput: '5',
      },
      {
        id: 'html-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Auto-Fit Responsive Grid Cards',
        prompt: 'Render 4 items using CSS Grid `auto-fit`.',
        banglaHint: '`grid-template-columns:repeat(auto-fit,minmax(80px,1fr))` লিখো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:8px"><div>A</div><div>B</div><div>C</div><div>D</div></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'D',
      },
      {
        id: 'html-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Fast Single-Pass Array List Render',
        prompt: 'Render `[10, 20, 30]` using `.map().join("")` into `<ul>`.',
        banglaHint: '`innerHTML = arr.map(...).join("")` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><ul id="u"></ul><script>document.getElementById('u').innerHTML=[10,20,30].map(x=>\`<li>\${x}</li>\`).join('');</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'ul',
      },
      {
        id: 'html-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Accessible `aria-live` Two-Pointer Match Card',
        prompt: 'Render Two-Pointer result inside an `aria-live="polite"` box.',
        banglaHint: '`aria-live="polite"` অ্যাট্রিবিউট যোগ করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><div aria-live="polite" style="color:#34d399;font-family:monospace">Match indices: 0 and 3 (2 + 11 = 13)</div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Match indices: 0 and 3',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Interactive Two-Pointer Visualizer',
      description: 'Displays sorted array memory slots and highlights the matching pair indices visually.',
      banglaGoal: 'HTML5 ও CSS Flex/Grid দিয়ে টু-পয়েন্টার ভিজ্যুয়ালাইজার কার্ড তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Two-Pointer Visualizer</h3>
  <p>Array: [2, 5, 7, 11, 15] · Target: 13</p>
  <p style="color:#34d399;font-family:monospace">Match indices: 0 and 3 (2 + 11 = 13)</p>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Two-Pointer Visualizer',
    },
  },
};
