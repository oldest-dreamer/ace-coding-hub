import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_CPP_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'C++ Chapter 21: Sorting Comparators & Binary Search on Answer',
    banglaTitle: 'C++ অধ্যায় ২১: কাস্টম সর্টিং ও বাইনারি সার্চ অন আনসার',
    subtitle: 'Master O(n log n) custom comparators, std::lower_bound, and monotonic predicate Binary Search on Answer for competitive programming.',
    zeroIntuition: {
      plainEnglishStory:
        'Searching an unsorted array takes O(n) every query, which collapses to O(n*q) Time Limit Exceeded when q reaches 10^5. Sorting once with std::sort pays O(n log n) upfront so every std::lower_bound or upper_bound query finishes in at most 20 steps.\n\nBinary Search on Answer takes this idea even further: instead of searching an array of indices, you binary-search the monotonic space of possible answers [lo, hi], testing each candidate mid with a greedy O(n) feasible(mid) predicate.',
      asciiFlowchart: `  Predicate f(mid): [ false, false, false, TRUE, TRUE, TRUE ]  (Monotonic!)
                        lo                  ^mid         hi
  if (feasible(mid)) ans = mid, hi = mid - 1;  else  lo = mid + 1;`,
      pseudocode: [
        '1. READ array and sort ascending (or interval pairs by comparator)',
        '2. DEFINE monotonic predicate ok(mid) returning true if candidate works',
        '3. LOOP while lo <= hi computing mid = lo + (hi - lo) / 2 without overflow',
        '4. RECORD ans = mid and tighten half until minimal/maximal valid answer found',
      ],
      banglaZeroToHero: {
        analogyTitle: 'অভিধান খোঁজা ও সর্বনিম্ন গতি নির্ণয় (Binary Search on Answer)',
        explanation:
          'ধরো একটি ১০০০ পৃষ্ঠার অভিধানে তুমি নির্দিষ্ট একটি শব্দ খুঁজছো। ১ নম্বর পৃষ্ঠা থেকে একে একে খোঁজার বদলে তুমি ঠিক মাঝখানের পৃষ্ঠা খোলো—এতে এক ধাপেই অর্ধেক বই বাদ পড়ে যায়! মাত্র ১০ বার মাঝখান ভাগ করলেই ১০০০ পৃষ্ঠার মধ্যে যেকোনো শব্দ বের হয়ে আসে, আর ১০ লাখ উপাদানের জন্য লাগে মাত্র ২০ ধাপ। এবার ভাবো, আমাদের কাছে কোনো অ্যারে নেই, আছে কেবল একটি প্রশ্ন: "সবচেয়ে কম কত ক্ষমতার ট্রাকে সব পণ্য নির্দিষ্ট ট্রিপে নেওয়া যাবে?" ক্ষমতা বাড়ালে কাজ সহজ হয় আর কমালে কঠিন—এই একমুখী বা monotonic ধর্ম থাকলেই আমরা সরাসরি সম্ভাব্য উত্তরের ওপর Binary Search on Answer চালাতে পারি! প্রতি ধাপে মাঝের উত্তর mid নিয়ে একটি O(n) ফাংশন দিয়ে পরীক্ষা করি কাজটি সম্ভব কি না। সম্ভব হলে আরও ছোট উত্তর খুঁজতে ডান পাশ বাদ দিই, আর না হলে বাম পাশ বাদ দিই। কন্টেস্ট প্রোগ্রামিংয়ে এই টেকনিক হার্ড প্রবলেমকেও O(n log MaxVal) সময়ে সহজ করে দেয়। মনে রাখবে, কখনো (lo + hi) / 2 লিখবে না কারণ যোগফলে ওভারফ্লো হতে পারে; সবসময় lo + (hi - lo) / 2 ব্যবহার করবে।',
        everydayExample: 'জ্বরের ওষুধের সর্বনিম্ন ডোজ খোঁজা: মাঝের ডোজে কাজ হলে আরও কম ডোজ পরীক্ষা করে নিখুঁত সীমা বের করা।',
        keyTakeaways: [
          'লো-হাই যোগের ওভারফ্লো এড়াতে mid = lo + (hi - lo) / 2 লিখতে হয়।',
          'যেকোনো monotonic yes/no প্রশ্নে Binary Search on Answer প্রয়োগ করা যায়।',
          'প্রথমে সবচেয়ে ছোট সম্ভাব্য ans আলাদা ভ্যারিয়েবলে সেভ করে তবেই hi = mid - 1 করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'std::lower_bound & std::upper_bound Frequency Count',
        englishParagraphs: [
          'After sorting a vector, the count of target x equals upper_bound - lower_bound in O(log n) time.',
        ],
        banglaParagraphs: [
          'সর্টেড ভেক্টরে upper_bound এবং lower_bound-এর পার্থক্য থেকেই O(log n) সময়ে সংখ্যা গণনা করা যায়।',
        ],
        memoryDiagram: `[2, 5, 5, 5, 9] -> lower(5)=idx 1, upper(5)=idx 4 -> count = 3`,
        code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {9, 5, 2, 5, 5};
    sort(a.begin(), a.end());
    auto lo = lower_bound(a.begin(), a.end(), 5);
    auto hi = upper_bound(a.begin(), a.end(), 5);
    cout << (lo - a.begin()) << " " << (hi - lo) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '1 3',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'auto lo = lower_bound(a.begin(), a.end(), 5);',
            whatItMeans: 'Iterator to the first element >= 5 in sorted range.',
            whyItIsThere: 'Finds starting boundary in O(log n).',
            ifDeletedError: 'Cannot measure starting index of 5.',
          },
          {
            lineNumber: 'Line 10',
            codeSnippet: 'auto hi = upper_bound(a.begin(), a.end(), 5);',
            whatItMeans: 'Iterator to the first element strictly > 5.',
            whyItIsThere: 'hi - lo yields exact frequency of 5.',
            ifDeletedError: 'Cannot calculate frequency without linear scan.',
          },
        ],
      },
      {
        id: 'cpp-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Minimum Capacity to Ship Packages Within D Days',
        englishParagraphs: [
          'Binary search capacity between max(weights) and sum(weights) using a greedy simulation check.',
        ],
        banglaParagraphs: [
          'সর্বোচ্চ ওজন থেকে মোট ওজন পর্যন্ত বাইনারি সার্চ চালিয়ে D দিনে ডেলিভারির সর্বনিম্ন ক্যাপাসিটি বের করো।',
        ],
        memoryDiagram: `lo=5, hi=15 -> mid=10 -> ok? true -> ans=10, hi=9`,
        code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

bool canShip(const vector<long long>& w, long long days, long long cap) {
    long long used = 1, cur = 0;
    for (long long x : w) {
        if (cur + x > cap) { used++; cur = 0; }
        cur += x;
    }
    return used <= days;
}

int main() {
    int n; long long d;
    if (!(cin >> n >> d)) return 0;
    vector<long long> w(n);
    long long lo = 0, hi = 0;
    for (int i = 0; i < n; i++) { cin >> w[i]; lo = max(lo, w[i]); hi += w[i]; }
    long long ans = hi;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    cout << ans << "\\n";
    return 0;
}`,
        stdin: '5 3\n1 2 3 4 5',
        expectedOutput: '6',
        lineByLine: [
          {
            lineNumber: 'Line 23',
            codeSnippet: 'long long mid = lo + (hi - lo) / 2;',
            whatItMeans: 'Computes overflow-safe midpoint between lo and hi.',
            whyItIsThere: 'Prevents signed 64-bit wrap when lo+hi exceeds LLONG_MAX.',
            ifDeletedError: 'Binary search step lacks candidate capacity.',
          },
        ],
      },
      {
        id: 'cpp-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Interval Scheduling Greedy After Custom End-Time Sort',
        englishParagraphs: [
          'Sort meeting intervals by end time ascending to select the maximum non-overlapping schedule.',
        ],
        banglaParagraphs: [
          'মিটিং শেষ হওয়ার সময় অনুযায়ী সর্ট করলে সর্বোচ্চ কয়টি নন-ওভারল্যাপিং মিটিং করা যাবে তা বের হয়।',
        ],
        memoryDiagram: `sort by end asc -> greedily pick start >= lastEnd`,
        code: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<pair<long long, long long>> iv(n);
    for (auto& p : iv) cin >> p.first >> p.second;
    sort(iv.begin(), iv.end(), [](const auto& a, const auto& b) {
        return a.second != b.second ? a.second < b.second : a.first < b.first;
    });
    long long lastEnd = -1e18; int cnt = 0;
    for (const auto& p : iv) {
        if (p.first >= lastEnd) { cnt++; lastEnd = p.second; }
    }
    cout << cnt << "\\n";
    return 0;
}`,
        stdin: '4\n1 5\n2 3\n3 6\n5 8',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'sort(iv.begin(), iv.end(), [](const auto& a, const auto& b) {',
            whatItMeans: 'Orders intervals by earliest finishing time first.',
            whyItIsThere: 'Maximizes remaining timeline available for subsequent tasks.',
            ifDeletedError: 'Sorting by start time misses optimal greedy picks.',
          },
        ],
      },
      {
        id: 'cpp-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Custom Infinite Loop Guard vs. Wrong Binary Search Mid Update',
        englishParagraphs: [
          'Using hi = mid without +1 rounding when maximizing an answer causes an infinite loop when lo + 1 == hi.',
        ],
        banglaParagraphs: [
          'lo <= hi লুপে সবসময় hi = mid - 1 এবং lo = mid + 1 ব্যবহার করলে অসীম লুপের ঝুঁকি থাকে না।',
        ],
        memoryDiagram: `lo <= hi with ans = mid; lo = mid + 1; hi = mid - 1 (always terminates!)`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long n; cin >> n;
    long long lo = 0, hi = min(n, 2000000000LL), ans = 0;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (mid * mid <= n) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    cout << ans << "\\n";
    return 0;
}`,
        stdin: '50',
        expectedOutput: '7',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'if (mid * mid <= n) { ans = mid; lo = mid + 1; }',
            whatItMeans: 'Saves valid floor square root and searches higher candidates.',
            whyItIsThere: 'Guarantees search interval shrinks strictly every iteration.',
            ifDeletedError: 'Fails to record largest integer with mid^2 <= n.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 7',
        codeSnippet: 'vector<int> a = {9, 5, 2, 5, 5};',
        whatItMeans: 'Creates unsorted integer vector.',
        whyItIsThere: 'Provides dataset requiring sort before binary search.',
        ifDeletedError: 'a is undeclared.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'sort(a.begin(), a.end());',
        whatItMeans: 'Orders elements ascending in O(n log n).',
        whyItIsThere: 'Binary search prerequisites require sorted order.',
        ifDeletedError: 'lower_bound produces garbage on unsorted inputs.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'auto lo = lower_bound(a.begin(), a.end(), 5);',
        whatItMeans: 'Iterator to the first element >= 5 in sorted range.',
        whyItIsThere: 'Finds starting boundary in O(log n).',
        ifDeletedError: 'Cannot measure starting index of 5.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'auto hi = upper_bound(a.begin(), a.end(), 5);',
        whatItMeans: 'Iterator to the first element strictly > 5.',
        whyItIsThere: 'hi - lo yields exact frequency of 5.',
        ifDeletedError: 'Cannot calculate frequency without linear scan.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'lo=5, hi=15, mid=10', memoryOrStack: 'canShip(10)=true', note: 'ans=10, hi=9' },
      { step: 2, state: 'lo=5, hi=9, mid=7', memoryOrStack: 'canShip(7)=true', note: 'ans=7, hi=6' },
      { step: 3, state: 'lo=5, hi=6, mid=5', memoryOrStack: 'canShip(5)=false', note: 'lo=6' },
      { step: 4, state: 'lo=6, hi=6, mid=6', memoryOrStack: 'canShip(6)=true', note: 'ans=6, hi=5 -> exit' },
    ],
    harryBugTraps: [
      {
        title: 'Calling binary_search / lower_bound Without Sorting First',
        brokenCode: `auto it = lower_bound(v.begin(), v.end(), x);`,
        fixedCode: `sort(v.begin(), v.end()); auto it = lower_bound(v.begin(), v.end(), x);`,
        whyItBreaks: 'Unsorted ranges break the monotonicity assumption and silently return wrong iterators.',
      },
      {
        title: 'Setting lo = 0 Instead of max(weights) in Partition Search',
        brokenCode: `long long lo = 0;`,
        fixedCode: `long long lo = *max_element(w.begin(), w.end());`,
        whyItBreaks: 'If capacity < max item weight, one item can never fit even in infinite days.',
      },
      {
        title: 'Midpoint Integer Overflow With (lo + hi) / 2',
        brokenCode: `int mid = (lo + hi) / 2;`,
        fixedCode: `long long mid = lo + (hi - lo) / 2;`,
        whyItBreaks: 'Large positive lo + hi wraps negative when exceeding INT_MAX.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-21-p1',
        difficulty: 'Easy',
        title: 'First & Last Index Query',
        prompt: 'Read n, array of n ints, and target x. Sort ascending and print first index and count of x (-1 0 if absent).',
        banglaHint: 'ইঙ্গিত: sort করার পর lower_bound ও upper_bound ব্যবহার করো।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, x; cin >> n >> x;\n    vector<int> a(n);\n    for (int& v : a) cin >> v;\n    sort(a.begin(), a.end());\n    auto lo = lower_bound(a.begin(), a.end(), x);\n    auto hi = upper_bound(a.begin(), a.end(), x);\n    if (lo == hi) cout << "-1 0\\n";\n    else cout << (lo - a.begin()) << " " << (hi - lo) << "\\n";\n    return 0;\n}`,
        sampleStdin: '6 4\n7 4 1 4 9 4',
        expectedOutput: '1 3',
      },
      {
        id: 'cpp-ch-21-p2',
        difficulty: 'Easy',
        title: 'Floor Integer Square Root',
        prompt: 'Compute floor(sqrt(n)) for 0 <= n <= 10^14 without floating-point rounding bugs.',
        banglaHint: 'ইঙ্গিত: mid * mid <= n শর্তে বাইনারি সার্চ চালাও।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    long long lo = 0, hi = min(n, 2000000000LL), ans = 0;\n    while (lo <= hi) {\n        long long m = lo + (hi - lo) / 2;\n        if (m * m <= n) { ans = m; lo = m + 1; } else hi = m - 1;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
        sampleStdin: '101',
        expectedOutput: '10',
      },
      {
        id: 'cpp-ch-21-p3',
        difficulty: 'Medium',
        title: 'Koko Eating Bananas Speed Search',
        prompt: 'Given n piles and h hours, find minimum integer speed k so sum(ceil(p/k)) <= h.',
        banglaHint: 'ইঙ্গিত: প্রতিটি স্তূপের জন্য (p + k - 1) / k ঘণ্টা যোগ করে h-এর সাথে তুলনা করো।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; long long h; cin >> n >> h;\n    vector<long long> p(n);\n    long long lo = 1, hi = 1;\n    for (auto& x : p) { cin >> x; hi = max(hi, x); }\n    long long ans = hi;\n    while (lo <= hi) {\n        long long k = lo + (hi - lo) / 2, hrs = 0;\n        for (long long x : p) hrs += (x + k - 1) / k;\n        if (hrs <= h) { ans = k; hi = k - 1; } else lo = k + 1;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-21-p4',
        difficulty: 'Medium',
        title: 'Max Non-Overlapping Events',
        prompt: 'Read n intervals [start, end]; print maximum mutually non-overlapping intervals (end1 <= start2 allowed).',
        banglaHint: 'ইঙ্গিত: end অনুযায়ী সর্ট করে গ্রিডিভাবে বেছে নাও।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<pair<long long, long long>> v(n);\n    for (auto& p : v) cin >> p.first >> p.second;\n    sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second < b.second; });\n    long long cur = -1e18; int ans = 0;\n    for (auto& p : v) if (p.first >= cur) { ans++; cur = p.second; }\n    cout << ans << "\\n";\n    return 0;\n}`,
        sampleStdin: '4\n1 4\n2 3\n3 5\n4 6',
        expectedOutput: '2',
      },
      {
        id: 'cpp-ch-21-p5',
        difficulty: 'Hard',
        title: 'Aggressive Cows Max Minimum Distance',
        prompt: 'Read n stall positions and c cows; find largest minimum distance between any two cows.',
        banglaHint: 'ইঙ্গিত: স্টলগুলো সর্ট করে সম্ভাব্য দূরত্ব d-এর ওপর Binary Search on Answer চালাও।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, c; cin >> n >> c;\n    vector<long long> x(n);\n    for (auto& v : x) cin >> v;\n    sort(x.begin(), x.end());\n    long long lo = 1, hi = x.back() - x.front(), ans = 0;\n    while (lo <= hi) {\n        long long mid = lo + (hi - lo) / 2, last = x[0]; int placed = 1;\n        for (int i = 1; i < n; i++) if (x[i] - last >= mid) { placed++; last = x[i]; }\n        if (placed >= c) { ans = mid; lo = mid + 1; } else hi = mid - 1;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 3\n1 2 8 4 9',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Binary Search on Answer Capacity Solver',
      description: 'Find the minimum truck capacity needed to ship ordered package weights within D days.',
      banglaGoal: 'মনোটোনিক প্রেডিকেট ও Binary Search on Answer ব্যবহার করে সর্বনিম্ন শিপিং ক্যাপাসিটি বের করা।',
      combinesChapters: 'Ch 11, 20, 21',
      starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nbool canShip(const vector<long long>& w, long long days, long long cap) {\n    long long used = 1, cur = 0;\n    for (long long x : w) { if (cur + x > cap) { used++; cur = 0; } cur += x; }\n    return used <= days;\n}\nint main() {\n    int n; long long d; if (!(cin >> n >> d)) return 0;\n    vector<long long> w(n); long long lo = 0, hi = 0;\n    for (int i = 0; i < n; i++) { cin >> w[i]; lo = max(lo, w[i]); hi += w[i]; }\n    long long ans = hi;\n    while (lo <= hi) {\n        long long mid = lo + (hi - lo) / 2;\n        if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
      sampleStdin: '5 3\n1 2 3 4 5',
      expectedOutput: '6',
    },
    starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nbool canShip(const vector<long long>& w, long long days, long long cap) {\n    long long used = 1, cur = 0;\n    for (long long x : w) { if (cur + x > cap) { used++; cur = 0; } cur += x; }\n    return used <= days;\n}\nint main() {\n    int n; long long d; if (!(cin >> n >> d)) return 0;\n    vector<long long> w(n); long long lo = 0, hi = 0;\n    for (int i = 0; i < n; i++) { cin >> w[i]; lo = max(lo, w[i]); hi += w[i]; }\n    long long ans = hi;\n    while (lo <= hi) {\n        long long mid = lo + (hi - lo) / 2;\n        if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
    sampleStdin: '5 3\n1 2 3 4 5',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'cpp21-t1', input: '5 3\n1 2 3 4 5', expectedOutput: '6' },
      { id: 'cpp21-t2', input: '4 2\n10 10 10 10', expectedOutput: '20', isHidden: true },
    ],
  },
  22: {
    chapterNumber: 22,
    title: 'C++ Chapter 22: Hashing, unordered_map, Sets & Sliding Window Frequency',
    banglaTitle: 'C++ অধ্যায় ২২: হ্যাশিং, unordered_map ও স্লাইডিং উইন্ডো ফ্রিকোয়েন্সি',
    subtitle: 'Solve O(n) subarray sum, longest unique substring, and two-sum problems using hash tables, collision awareness, and sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Scanning backward to find matching values turns O(n) algorithms into O(n^2) Time Limit Exceeded. Hash tables (unordered_map and unordered_set) compress lookups into O(1) expected time by hashing keys directly to bucket slots.\n\nCombined with a dynamic sliding window or prefix-sum hash table (recording how many times each prefix sum appeared earlier), you can answer longest-unique-substring and exact-K-subarray-sum queries in a single linear pass.',
      asciiFlowchart: `  Prefix Sum S[r] ---> Check hash[S[r] - K]  (O(1) hits earlier matching prefixes!)
         |
         +--> hash[S[r]]++  (never pre-sort needed!)
         |
  Sliding Window [L .. R]: expand R -> shrink L while window invalid`,
      pseudocode: [
        '1. INITIALIZE unordered_map<long long, long long> with cnt[0] = 1 for prefix sum 0',
        '2. ADVANCE index r, updating running prefix += a[r]',
        '3. ADD cnt[prefix - k] (checking count() first) to subarray answer',
        '4. INCREMENT cnt[prefix]++ in O(1) expected time',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লাইব্রেরির ম্যাজিক সূচিপত্র ও চলমান জানালা (Hashing + Sliding Window)',
        explanation:
          'ধরো একটি ১০ লাখ পণ্যের দোকানে বারকোড স্ক্যান করেই দাম জানা যায়—তাকেই কম্পিউটার বিজ্ঞানে হ্যাশিং বলে। বারবার পুরো অ্যারে খুঁজে দেখার বদলে unordered_map ও unordered_set গড় O(1) সময়ে বলে দেয় একটি সংখ্যা বা যোগফল আগে এসেছে কি না। এর সাথে Prefix Sum জুড়ে দিলে একটি ম্যাজিক ঘটে: কোনো সাব-অ্যারের যোগফল K হতে হলে বর্তমান মোট যোগফল P থেকে K বাদ দিলে যা থাকে (P - K), তা আগে কতবার এসেছে তা হ্যাশ ম্যাপে দেখলেই O(n) সময়ে উত্তর বের হয়! আবার স্ট্রিংয়ে ডুপ্লিকেট অক্ষর ছাড়া সবচেয়ে বড় সাবস্ট্রিং বের করতে দুটি পয়েন্টার L ও R দিয়ে চলমান জানালা বা Sliding Window ব্যবহার করা হয়। কোডফোর্সেসের মতো প্ল্যাটফর্মে C++-এর ডিফল্ট unordered_map অনেক সময় অ্যান্টি-হ্যাশ টেস্টে O(n^2) হতে পারে, তাই কন্টেস্টে reserve() এবং splitmix64 কাস্টম হ্যাশার জানা দারুণ কাজের। ইন্টারভিউতে প্রথম ১০টি অ্যালগরিদম প্রশ্নের অন্তত ৪টিই হ্যাশ ম্যাপ ও স্লাইডিং উইন্ডো ভিত্তিক।',
        everydayExample: 'হোটেলের রুম নম্বর বোর্ড: চাবি দেখেই সরাসরি নির্দিষ্ট নম্বরের রুমের পকেটে হাত দেওয়া।',
        keyTakeaways: [
          'Prefix Sum সাব-অ্যারে যোগফল সমস্যায় শুরুতেই map[0] = 1 সেট করতে ভুলবে না।',
          'শুধু চেক করার সময় map[key] ব্যবহার না করে map.count(key) বা find(key) ব্যবহার করলে অযথা ০ এন্ট্রি তৈরি হয় না।',
          'Codeforces হ্যাক এড়াতে custom splitmix64 hash অথবা reserve(n) ব্যবহার করা নিরাপদ।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(n) Two-Sum Using unordered_map',
        englishParagraphs: [
          'Store each seen element’s index in an unordered_map and query (target - x) in O(1) average time.',
        ],
        banglaParagraphs: [
          'unordered_map-এ মান ও ইনডেক্স রেখে O(n) সময়ে Two-Sum সমাধান।',
        ],
        memoryDiagram: `seen[2]=0 -> next x=7 checks seen.find(9-7)=0 -> prints "0 1"`,
        code: `#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {2, 7, 11, 15};
    int target = 9;
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)a.size(); i++) {
        auto it = seen.find(target - a[i]);
        if (it != seen.end()) {
            cout << it->second << " " << i << "\\n";
            return 0;
        }
        seen[a[i]] = i;
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: '0 1',
        lineByLine: [
          {
            lineNumber: 'Line 11',
            codeSnippet: 'auto it = seen.find(target - a[i]);',
            whatItMeans: 'Looks up complement in hash table without inserting a default value.',
            whyItIsThere: 'Finds matching earlier index in O(1) expected time.',
            ifDeletedError: 'Cannot verify if complement appeared earlier.',
          },
        ],
      },
      {
        id: 'cpp-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Subarray Sums Equals K (Prefix Hash Map)',
        englishParagraphs: [
          'Works even with negative numbers where plain two-pointer fails: accumulate prefix sum and count occurrences of (pref - k).',
        ],
        banglaParagraphs: [
          'নেগেটিভ সংখ্যা থাকলেও Prefix Sum + unordered_map দিয়ে O(n) সময়ে মোট K-যোগফল সাব-অ্যারে গোনা যায়।',
        ],
        memoryDiagram: `cnt[0]=1 -> pref=3 -> check cnt[3-3]=1 -> ans+=1`,
        code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    unordered_map<long long, long long> cnt;
    cnt.reserve(n * 2 + 1);
    cnt[0] = 1;
    long long pref = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        pref += x;
        auto it = cnt.find(pref - k);
        if (it != cnt.end()) ans += it->second;
        cnt[pref]++;
    }
    cout << ans << "\\n";
    return 0;
}`,
        stdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'cnt[0] = 1;',
            whatItMeans: 'Seeds empty prefix sum 0 once before reading array elements.',
            whyItIsThere: 'Captures subarrays starting directly at index 0.',
            ifDeletedError: 'Subarrays beginning at index 0 are missed.',
          },
        ],
      },
      {
        id: 'cpp-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Substring Without Repeating Characters',
        englishParagraphs: [
          'Maintain last seen byte index in an ASCII table and jump left pointer L cleanly in one pass.',
        ],
        banglaParagraphs: [
          'প্রতিটি অক্ষরের সর্বশেষ ইনডেক্স ট্র্যাক করে এক পাসে ডুপ্লিকেটমুক্ত সর্বোচ্চ সাবস্ট্রিং দৈর্ঘ্য নির্ণয়।',
        ],
        memoryDiagram: `last[ch] = idx -> L = max(L, last[ch] + 1) -> ans = max(ans, R - L + 1)`,
        code: `#include <algorithm>
#include <array>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s; cin >> s;
    array<int, 256> last;
    last.fill(-1);
    int L = 0, best = 0;
    for (int R = 0; R < (int)s.size(); R++) {
        unsigned char c = s[R];
        if (last[c] >= L) L = last[c] + 1;
        last[c] = R;
        best = max(best, R - L + 1);
    }
    cout << best << "\\n";
    return 0;
}`,
        stdin: 'abcabcbb',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 14',
            codeSnippet: 'if (last[c] >= L) L = last[c] + 1;',
            whatItMeans: 'Advances left boundary past previous duplicate inside active window.',
            whyItIsThere: 'Guarantees L never moves backward on stale earlier chars.',
            ifDeletedError: 'Duplicate characters remain in active window.',
          },
        ],
      },
      {
        id: 'cpp-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Custom SplitMix64 Hasher Against Anti-Hash TLE',
        englishParagraphs: [
          'Adversarial inputs force hash collisions in default std::hash<int>; mixing bits via splitmix64 keeps unordered_map O(1).',
        ],
        banglaParagraphs: [
          'ডিফল্ট std::hash<int> হ্যাক টেস্টে O(n^2) হতে পারে; splitmix64 কাস্টম হ্যাশার দিলে তা নিরাপদ থাকে।',
        ],
        memoryDiagram: `struct FastHash -> splitmix64(x + FIXED_RANDOM) -> collision-resistant buckets`,
        code: `#include <cstdint>
#include <iostream>
#include <unordered_map>
using namespace std;

struct FastHash {
    size_t operator()(uint64_t x) const {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return x ^ (x >> 31);
    }
};

int main() {
    unordered_map<long long, int, FastHash> mp;
    mp[107897] = 1; mp[215794] = 2;
    cout << mp.size() << " " << mp[215794] << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '2 2',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'struct FastHash {',
            whatItMeans: 'Custom hash functor mixing key bits via 64-bit avalanche.',
            whyItIsThere: 'Prevents bucket-chain collisions on pathological contest inputs.',
            ifDeletedError: 'Falls back to vulnerable identity std::hash.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 9',
        codeSnippet: 'unordered_map<int, int> seen;',
        whatItMeans: 'Hash table mapping array values to their index.',
        whyItIsThere: 'Provides O(1) average complement lookups.',
        ifDeletedError: 'Requires O(n^2) nested scan.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'auto it = seen.find(target - a[i]);',
        whatItMeans: 'Looks up complement in hash table without inserting a default value.',
        whyItIsThere: 'Finds matching earlier index in O(1) expected time.',
        ifDeletedError: 'Cannot verify if complement appeared earlier.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'cout << it->second << " " << i << "\\n";',
        whatItMeans: 'Outputs matching earlier index and current index.',
        whyItIsThere: 'Reports answer immediately upon finding pair.',
        ifDeletedError: 'No solution is printed.',
      },
      {
        lineNumber: 'Line 16',
        codeSnippet: 'seen[a[i]] = i;',
        whatItMeans: 'Records current element after checking complement so an item never pairs with itself.',
        whyItIsThere: 'Prevents using same index twice when target == 2 * a[i].',
        ifDeletedError: 'Future elements cannot see current element.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'init cnt[0]=1, pref=0', memoryOrStack: 'cnt={0:1}, ans=0', note: 'Empty prefix seeded' },
      { step: 2, state: 'x=1 -> pref=1', memoryOrStack: 'find(1-3=-2) miss', note: 'cnt[1]=1' },
      { step: 3, state: 'x=2 -> pref=3', memoryOrStack: 'find(3-3=0) hit=1', note: 'ans=1, cnt[3]=1' },
      { step: 4, state: 'x=-1,1,2 -> pref=3,4,6', memoryOrStack: 'hits at 3-3=0 and 6-3=3', note: 'Total ans=3' },
    ],
    harryBugTraps: [
      {
        title: 'Using cnt[pref - k] Directly Instead of cnt.find()',
        brokenCode: `ans += cnt[pref - k];`,
        fixedCode: `auto it = cnt.find(pref - k); if (it != cnt.end()) ans += it->second;`,
        whyItBreaks: 'operator[] inserts missing keys with 0, bloating memory and triggering unnecessary rehashes.',
      },
      {
        title: 'Moving Left Pointer L Backward in Sliding Window',
        brokenCode: `L = last[c] + 1;`,
        fixedCode: `if (last[c] >= L) L = last[c] + 1;`,
        whyItBreaks: 'Stale occurrences before L pull the window left into already-seen duplicates.',
      },
      {
        title: 'Checking seen[a[i]] Before Updating? No — Updating Before Checking!',
        brokenCode: `seen[a[i]] = i; if (seen.count(target - a[i])) ...`,
        fixedCode: `if (seen.count(target - a[i])) ... seen[a[i]] = i;`,
        whyItBreaks: 'When target = 2 * a[i], inserting first mistakenly pairs element i with itself.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-22-p1',
        difficulty: 'Easy',
        title: 'Distinct Count With unordered_set',
        prompt: 'Read n and n integers; print count of distinct values in O(n) average time.',
        banglaHint: 'ইঙ্গিত: unordered_set<long long>-এ সব সংখ্যা ইনসার্ট করে .size() প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <unordered_set>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    unordered_set<long long> s;\n    s.reserve(n * 2 + 1);\n    for (int i = 0; i < n; i++) { long long x; cin >> x; s.insert(x); }\n    cout << s.size() << "\\n";\n    return 0;\n}`,
        sampleStdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-22-p2',
        difficulty: 'Easy',
        title: 'Two-Sum Indices Lookup',
        prompt: 'Read n, target, and n integers; print first 0-based pair i j summing to target.',
        banglaHint: 'ইঙ্গিত: unordered_map-এ প্রতিটি সংখ্যার ইনডেক্স রেখে target - x খুঁজো।',
        starterCode: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n; long long target; cin >> n >> target;\n    unordered_map<long long, int> seen;\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x;\n        auto it = seen.find(target - x);\n        if (it != seen.end()) { cout << it->second << " " << i << "\\n"; return 0; }\n        seen[x] = i;\n    }\n    return 0;\n}`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'cpp-ch-22-p3',
        difficulty: 'Medium',
        title: 'Longest Substring Without Repeats',
        prompt: 'Read a lowercase/ASCII token and print length of longest substring with all unique characters.',
        banglaHint: 'ইঙ্গিত: array<int, 256> এ শেষ ইনডেক্স রেখে L এবং R আপডেট করো।',
        starterCode: `#include <algorithm>\n#include <array>\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    array<int, 256> last; last.fill(-1);\n    int L = 0, best = 0;\n    for (int R = 0; R < (int)s.size(); R++) {\n        unsigned char c = s[R];\n        if (last[c] >= L) L = last[c] + 1;\n        last[c] = R;\n        best = max(best, R - L + 1);\n    }\n    cout << best << "\\n";\n    return 0;\n}`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'cpp-ch-22-p4',
        difficulty: 'Medium',
        title: 'At-Most-K Distinct Window Length',
        prompt: 'Read n, k, and n integers; print longest contiguous subarray with at most k distinct values.',
        banglaHint: 'ইঙ্গিত: unordered_map দিয়ে উইন্ডোর ইউনিক সংখ্যা > k হলে বাম দিক থেকে কমাও।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, k; cin >> n >> k;\n    vector<int> a(n); for (int& x : a) cin >> x;\n    unordered_map<int, int> freq;\n    int L = 0, best = 0;\n    for (int R = 0; R < n; R++) {\n        freq[a[R]]++;\n        while ((int)freq.size() > k) {\n            if (--freq[a[L]] == 0) freq.erase(a[L]);\n            L++;\n        }\n        best = max(best, R - L + 1);\n    }\n    cout << best << "\\n";\n    return 0;\n}`,
        sampleStdin: '6 2\n1 2 1 2 3 3',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-22-p5',
        difficulty: 'Hard',
        title: 'Subarray Sums Equals K Counter',
        prompt: 'Read n, k, and n integers (positive/negative); count subarrays whose sum equals k.',
        banglaHint: 'ইঙ্গিত: cnt[0] = 1 রেখে চলমান prefix sum থেকে cnt[pref - k] যোগ করো।',
        starterCode: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n; long long k; cin >> n >> k;\n    unordered_map<long long, long long> cnt;\n    cnt[0] = 1;\n    long long pref = 0, ans = 0;\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x; pref += x;\n        auto it = cnt.find(pref - k);\n        if (it != cnt.end()) ans += it->second;\n        cnt[pref]++;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'O(n) Subarray Sum = K Hash Engine',
      description: 'Combine prefix sums with unordered_map to count subarrays matching target K across negative and positive numbers.',
      banglaGoal: 'Prefix Sum এবং unordered_map দিয়ে O(n) সময়ে K-যোগফল সাব-অ্যারে গণনার ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 13, 20, 22',
      starterCode: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n; long long k; if (!(cin >> n >> k)) return 0;\n    unordered_map<long long, long long> cnt;\n    cnt.reserve(n * 2 + 1);\n    cnt[0] = 1;\n    long long pref = 0, ans = 0;\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x; pref += x;\n        auto it = cnt.find(pref - k);\n        if (it != cnt.end()) ans += it->second;\n        cnt[pref]++;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
      sampleStdin: '5 3\n1 2 -1 1 2',
      expectedOutput: '3',
    },
    starterCode: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n; long long k; if (!(cin >> n >> k)) return 0;\n    unordered_map<long long, long long> cnt;\n    cnt.reserve(n * 2 + 1);\n    cnt[0] = 1;\n    long long pref = 0, ans = 0;\n    for (int i = 0; i < n; i++) {\n        long long x; cin >> x; pref += x;\n        auto it = cnt.find(pref - k);\n        if (it != cnt.end()) ans += it->second;\n        cnt[pref]++;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
    sampleStdin: '5 3\n1 2 -1 1 2',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'cpp22-t1', input: '5 3\n1 2 -1 1 2', expectedOutput: '3' },
      { id: 'cpp22-t2', input: '3 0\n0 0 0', expectedOutput: '6', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'C++ Chapter 23 (C++23): Stack, Queue, Monotonic Stack & Graph BFS/DFS',
    banglaTitle: 'C++ অধ্যায় ২৩ (C++23): স্ট্যাক, কিউ, মনোটনিক স্ট্যাক ও গ্রাফ BFS/DFS',
    subtitle: 'STL std::stack & std::queue, O(n) Next Greater Element, adjacency-list BFS shortest paths, and DFS components.',
    zeroIntuition: {
      plainEnglishStory:
        'In C++23, `std::stack<T>` (LIFO) and `std::queue<T>` (FIFO) wrap `std::deque<T>` in O(1) push/pop, while sparse graphs live cleanly inside `vector<vector<int>> adj(n)`. Choosing BFS over DFS determines whether you find unweighted shortest paths (`dist[v] = dist[u] + 1`) or full reachability components.\n\nWatch two classic C++ traps: (1) NEVER call `st.top()` or `q.front()` before checking `!empty()` (instant segfault/UB!), and (2) mark `dist[v] = dist[u] + 1` AT THE EXACT MOMENT you push `v` into the BFS queue—marking after `q.pop()` re-enqueues vertices exponentially!',
      asciiFlowchart: `  Monotonic Stack: a=[4, 5, 2, 25] -> push 0 -> 5>4 pop 0(ans=5) -> push 1 -> 25>2 pop 2, pop 1
  BFS Queue from 0: q.push(0), dist[0]=0 -> pop u -> for v: if(dist[v]==-1){ dist[v]=dist[u]+1; q.push(v); }`,
      pseudocode: [
        '1. GUARD !st.empty() before st.top()/st.pop() and !q.empty() before q.front()',
        '2. MONOTONIC STACK: pop indices whose value < current a[i] in amortized O(n)',
        '3. GRAPH BFS: initialize dist(n, -1), set dist[src] = 0 BEFORE q.push(src)',
        '4. GRAPH DFS: mark vis[u] = 1 at entry to prevent infinite cycles',
      ],
      banglaZeroToHero: {
        analogyTitle: 'STL স্ট্যাক-কিউ, মনোটনিক স্ট্যাক ও BFS-এর তরঙ্গ (C++23)',
        explanation:
          'C++-এ নিজ হাতে পয়েন্টার দিয়ে লিংকড লিস্ট বানাতে হয় না—`std::stack` এবং `std::queue` সরাসরি O(1) সময়ে push/pop দেয়, আর গ্রাফ রাখার জন্য `vector<vector<int>> adj(n)` ব্যবহার করলে বিশাল স্পার্স গ্রাফও সহজেই RAM-এ এঁটে যায়! স্ট্যাক ব্যবহার করে `{[()]}` ব্যালান্স যাচাই বা Next Greater Element-এর মতো কঠিন সমস্যা O(n) সময়ে সমাধান হয়, কারণ প্রতিটি উপাদান স্ট্যাকে সর্বোচ্চ একবার ঢোকে এবং একবারই বের হয়। অন্যদিকে গ্রাফে ন্যূনতম কয় ধাপে গন্তব্যে যাওয়া যাবে তা বের করতে `std::queue` ভিত্তিক BFS চালাতে হয়। তবে C++ কনটেস্টে দুটি মারাত্মক ফাঁদ রয়েছে: প্রথমত, স্ট্যাক বা কিউ খালি থাকা অবস্থায় `st.top()` বা `q.front()` পড়লে প্রোগ্রাম সাথে সাথে ক্র্যাশ (UB) করবে—তাই আগে অবশ্যই `!empty()` চেক করবে! দ্বিতীয়ত, BFS-এ কোনো নোড `v`-কে কিউ থেকে বের করার সময় নয়, বরং কিউতে `push` করার মুহূর্তেই `dist[v] = dist[u] + 1` বসিয়ে দেবে, নইলে একই নোড হাজারবার কিউতে ঢুকে TLE ও MLE ঘটাবে!',
        everydayExample:
          'একসারি মানুষ দাঁড়িয়ে ডানে তাকিয়ে প্রথম কার মাথা নিজের চেয়ে উঁচু দেখছে তা খোঁজা—খালি চোখ স্ক্যান করার বদলে মনোটনিক স্ট্যাক একবারেই উত্তর বের করে দেয়!',
        keyTakeaways: [
          '`st.top()` বা `q.front()` পড়ার আগে সর্বদা `if (!st.empty())` যাচাই করবে; STL পপ কিছু রিটার্ন করে না (`void`)।',
          'BFS-এ `dist[v]` অবশ্যই `q.push(v)` করার সাথে সাথেই আপডেট করবে যাতে ডুপ্লিকেট পুশ না হয়।',
          'বড় গ্রাফে Recursion Stack Overflow এড়াতে লম্বা পথে Iterative Stack বা BFS ব্যবহার নিরাপদ।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'STL Stack Balanced Brackets Checker',
        englishParagraphs: [
          'Notice that `std::stack::pop()` returns `void` in C++! You read `char open = st.top();` first, THEN call `st.pop();`, always guarding `!st.empty()`.',
        ],
        banglaParagraphs: [
          'C++-এ `st.pop()` কোনো ভ্যালু রিটার্ন করে না; তাই আগে `st.top()` পড়ে নিয়ে তারপর `st.pop()` করতে হয় এবং খালি স্ট্যাক চেক রাখতে হয়।',
        ],
        memoryDiagram: `"{[()]}" -> push { [ ( -> pop ( , [ , { -> st.empty() == true => VALID`,
        code: `#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s; cin >> s;\n    stack<char> st;\n    bool ok = true;\n    for (char c : s) {\n        if (c == '(' || c == '[' || c == '{') st.push(c);\n        else {\n            if (st.empty()) { ok = false; break; }\n            char t = st.top(); st.pop();\n            if ((c == ')' && t != '(') || (c == ']' && t != '[') || (c == '}' && t != '{')) { ok = false; break; }\n        }\n    }\n    cout << (ok && st.empty() ? "VALID" : "INVALID") << "\\n";\n    return 0;\n}`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'if (st.empty()) { ok = false; break; }', whatItMeans: 'Prevents calling st.top() on an empty stack.', whyItIsThere: 'Calling top() when empty causes undefined behavior/crash.', ifDeletedError: 'Segfaults on strings like ")(".' },
          { lineNumber: 'Line 18', codeSnippet: 'cout << (ok && st.empty() ? "VALID" : "INVALID") << "\\n";', whatItMeans: 'Checks zero mismatches AND zero unclosed openers.', whyItIsThere: 'Rejects trailing unclosed "((" correctly.', ifDeletedError: 'Marks unclosed brackets as VALID.' },
        ],
      },
      {
        id: 'cpp-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'BFS Shortest Path in Unweighted Graph',
        englishParagraphs: [
          'Using `vector<vector<int>> adj(n)` and `vector<int> dist(n, -1)` tracks both visited status and exact shortest edge distance from source `0` simultaneously.',
        ],
        banglaParagraphs: [
          '`vector<int> dist(n, -1)` দিয়ে একসাথে visited ও শর্টেস্ট দূরত্ব মাপা হয়েছে।',
        ],
        memoryDiagram: `0-1, 0-2, 1-3 -> dist=[0, 1, 1, 2]`,
        code: `#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0, u, v; i < m; i++) { cin >> u >> v; adj[u].push_back(v); adj[v].push_back(u); }\n    vector<int> dist(n, -1);\n    queue<int> q; dist[0] = 0; q.push(0);\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        for (int v : adj[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }\n    }\n    for (int i = 0; i < n; i++) cout << dist[i] << (i + 1 == n ? "\\n" : " ");\n    return 0;\n}`,
        stdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }', whatItMeans: 'Sets distance atomically before pushing v onto queue.', whyItIsThere: 'Guarantees each node enters queue at most once.', ifDeletedError: 'Duplicate pushes cause TLE/MLE on cyclic graphs.' },
        ],
      },
      {
        id: 'cpp-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(n) Monotonic Stack for Next Greater Element',
        englishParagraphs: [
          'Store unresolved indices in `stack<int> st`. Whenever `a[i] > a[st.top()]`, pop and assign `ans[st.top()] = a[i]`. Every index is pushed once and popped at most once.',
        ],
        banglaParagraphs: [
          'মনোটনিক স্ট্যাকে কেবল ইনডেক্স জমা রেখে প্রতিটি উপাদানের ডানের প্রথম বড় সংখ্যা O(n) সময়ে বের করা হয়েছে।',
        ],
        memoryDiagram: `[4, 5, 2, 25] -> [5, 25, 25, -1]`,
        code: `#include <iostream>\n#include <stack>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<long long> a(n), ans(n, -1);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    stack<int> st;\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && a[st.top()] < a[i]) { ans[st.top()] = a[i]; st.pop(); }\n        st.push(i);\n    }\n    for (int i = 0; i < n; i++) cout << ans[i] << (i + 1 == n ? "\\n" : " ");\n    return 0;\n}`,
        stdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'while (!st.empty() && a[st.top()] < a[i]) { ans[st.top()] = a[i]; st.pop(); }', whatItMeans: 'Resolves all smaller waiting indices on stack in amortized O(1).', whyItIsThere: 'Avoids nested O(n^2) brute-force scanning.', ifDeletedError: 'Answers remain all -1.' },
        ],
      },
      {
        id: 'cpp-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Connected Components & Cycle Guarded Lambda DFS',
        englishParagraphs: [
          'Modern C++ lets you capture local adjacency lists in a recursive `auto dfs = [&](auto& self, int u) -> void` helper—cleanly counting disconnected clusters without globals.',
        ],
        banglaParagraphs: [
          'গ্লোবাল অ্যারে ছাড়াই লোকাল `adj` ও `vis` ধরে রিকার্সিভ ল্যাম্বডা DFS চালিয়ে গ্রাফের সংযুক্ত অংশ গণনা।',
        ],
        memoryDiagram: `nodes=5, edges=(0-1),(2-3) -> 3 connected components`,
        code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0, u, v; i < m; i++) { cin >> u >> v; adj[u].push_back(v); adj[v].push_back(u); }\n    vector<int> vis(n, 0);\n    auto dfs = [&](auto& self, int u) -> void {\n        vis[u] = 1;\n        for (int v : adj[u]) if (!vis[v]) self(self, v);\n    };\n    int comps = 0;\n    for (int i = 0; i < n; i++) if (!vis[i]) { comps++; dfs(dfs, i); }\n    cout << comps << "\\n";\n    return 0;\n}`,
        stdin: '5 2\n0 1\n2 3',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'vis[u] = 1;', whatItMeans: 'Marks vertex visited immediately upon entering DFS frame.', whyItIsThere: 'Stops undirected edges u<->v from bouncing endlessly.', ifDeletedError: 'Infinite recursion stack overflow.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: '#include <stack>', whatItMeans: 'Imports std::stack container adapter.', whyItIsThere: 'Provides LIFO push/top/pop operations in O(1).', ifDeletedError: 'Compile error: stack is not a member of std.' },
      { lineNumber: 'Line 8', codeSnippet: 'stack<char> st;', whatItMeans: 'Creates LIFO stack storing active unclosed openers.', whyItIsThere: 'Matches most recent opening bracket first.', ifDeletedError: 'Undeclared identifier st.' },
      { lineNumber: 'Line 13', codeSnippet: 'if (st.empty()) { ok = false; break; }', whatItMeans: 'Rejects stray closing bracket before inspecting st.top().', whyItIsThere: 'Prevents empty-stack undefined behavior crash.', ifDeletedError: 'Segfaults on unmatched closer.' },
      { lineNumber: 'Line 14', codeSnippet: 'char t = st.top(); st.pop();', whatItMeans: 'Reads top opener and removes it cleanly.', whyItIsThere: 'C++ stack::pop returns void by design.', ifDeletedError: 'Compiler rejects char t = st.pop().' },
      { lineNumber: 'Line 18', codeSnippet: 'cout << (ok && st.empty() ? "VALID" : "INVALID") << "\\n";', whatItMeans: 'Verifies no mismatches and zero unclosed brackets left.', whyItIsThere: 'Catches inputs like "(((" cleanly.', ifDeletedError: 'Incomplete outputs.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "{[("', memoryOrStack: 'st = ["{", "[", "("]', note: 'Openers pushed LIFO' },
      { step: 2, state: 'Read ")"', memoryOrStack: 'top="(", match -> pop()', note: 'st = ["{", "["]' },
      { step: 3, state: 'Read "]}"', memoryOrStack: 'pop "[" then pop "{"', note: 'st becomes empty' },
      { step: 4, state: 'Check ok && st.empty()', memoryOrStack: 'true && true -> VALID', note: 'Balanced expression confirmed' },
    ],
    harryBugTraps: [
      {
        title: 'Calling st.top() or q.front() Without !empty() Guard',
        brokenCode: 'int x = q.front(); // Crashes with UB if q is empty!',
        fixedCode: '#include <iostream>\n#include <queue>\nusing namespace std;\nint main() { queue<int> q; if (!q.empty()) cout << q.front(); else cout << "EMPTY\\n"; }',
        whyItBreaks: 'STL containers perform zero bounds checking on front()/top() for speed; reading an empty queue causes immediate UB.',
      },
      {
        title: 'Marking Visited on BFS Pop Instead of Push',
        brokenCode: 'int u = q.front(); q.pop(); vis[u] = 1;',
        fixedCode: '#include <iostream>\n// Set vis[v] = 1 BEFORE q.push(v)!\nint main() { std::cout << "Mark on push\\n"; }',
        whyItBreaks: 'Neighboring vertices queue duplicate copies of v before v is ever popped, blowing memory past MLE/TLE.',
      },
      {
        title: 'Assuming stack::pop() Returns the Popped Element',
        brokenCode: 'char c = st.pop(); // Compile error: pop() returns void!',
        fixedCode: '#include <iostream>\n#include <stack>\nint main() { std::stack<char> s; s.push(\'A\'); char c = s.top(); s.pop(); std::cout << c << "\\n"; }',
        whyItBreaks: 'C++ separates top() and pop() for exception-safety guarantees; read top() first, then pop().',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-23-q1',
        difficulty: 'Easy',
        title: '1. Reverse Array via std::stack',
        prompt: 'Read n then n integers; push into std::stack and print in reverse order.',
        banglaHint: 'সব সংখ্যা স্ট্যাকে `push` করে `!st.empty()` থাকা পর্যন্ত `top()` প্রিন্ট করে `pop()` করো।',
        starterCode: `#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    stack<long long> st;\n    for (int i = 0; i < n; i++) { long long x; cin >> x; st.push(x); }\n    while (!st.empty()) { cout << st.top() << (st.size() == 1 ? "\\n" : " "); st.pop(); }\n    return 0;\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'cpp-ch-23-q2',
        difficulty: 'Easy',
        title: '2. Circular Josephus Elimination via Queue',
        prompt: 'Read n people (1..n) and step k=2; rotate queue k-1 times and remove k-th until 1 survivor remains.',
        banglaHint: '`q.push(q.front()); q.pop();` দিয়ে সামনের জনকে পেছনে পাঠাও এবং `k`-তম জনকে বাদ দাও।',
        starterCode: `#include <iostream>\n#include <queue>\nusing namespace std;\nint main() {\n    int n, k; if (!(cin >> n >> k)) return 0;\n    queue<int> q; for (int i = 1; i <= n; i++) q.push(i);\n    while (q.size() > 1) {\n        for (int i = 1; i < k; i++) { q.push(q.front()); q.pop(); }\n        q.pop();\n    }\n    cout << q.front() << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 2',
        expectedOutput: '3',
      },
      {
        id: 'cpp-ch-23-q3',
        difficulty: 'Medium',
        title: '3. Next Greater Element (Monotonic Stack)',
        prompt: 'Read n and n ints; print first strictly greater element on the right for each position, else -1.',
        banglaHint: 'স্ট্যাকের ইনডেক্সের মান `a[i]`-এর চেয়ে ছোট থাকা পর্যন্ত পপ করে উত্তর বসাও।',
        starterCode: `#include <iostream>\n#include <stack>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n; vector<long long> a(n), ans(n, -1);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    stack<int> st;\n    for (int i = 0; i < n; i++) { while (!st.empty() && a[st.top()] < a[i]) { ans[st.top()] = a[i]; st.pop(); } st.push(i); }\n    for (int i = 0; i < n; i++) cout << ans[i] << (i + 1 == n ? "\\n" : " ");\n    return 0;\n}`,
        sampleStdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
      },
      {
        id: 'cpp-ch-23-q4',
        difficulty: 'Medium',
        title: '4. Shortest Distance S to T via BFS',
        prompt: 'Read n, m, S, T and m undirected edges; output shortest distance from S to T or -1.',
        banglaHint: '`S` থেকে BFS চালিয়ে `dist[T]` প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, m, S, T; cin >> n >> m >> S >> T;\n    vector<vector<int>> adj(n);\n    for (int i = 0, u, v; i < m; i++) { cin >> u >> v; adj[u].push_back(v); adj[v].push_back(u); }\n    vector<int> dist(n, -1); queue<int> q; dist[S] = 0; q.push(S);\n    while (!q.empty()) { int u = q.front(); q.pop(); for (int v : adj[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); } }\n    cout << dist[T] << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-23-q5',
        difficulty: 'Hard',
        title: '5. Tree Depth (Longest Root-to-Leaf Path) via DFS',
        prompt: 'Read n nodes (0..n-1) rooted at 0 and n-1 tree edges; output max depth in edges.',
        banglaHint: 'প্যারেন্ট নোড বাদ দিয়ে সব সন্তানের মধ্যে সর্বোচ্চ `1 + dfs(child)` বের করো।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0, u, v; i < n - 1; i++) { cin >> u >> v; adj[u].push_back(v); adj[v].push_back(u); }\n    auto dfs = [&](auto& self, int u, int p) -> int {\n        int best = 0;\n        for (int v : adj[u]) if (v != p) best = max(best, 1 + self(self, v, u));\n        return best;\n    };\n    cout << dfs(dfs, 0, -1) << "\\n";\n    return 0;\n}`,
        sampleStdin: '5\n0 1\n0 2\n1 3\n3 4',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'C++23 STL Stack & Shortest-Path BFS Graph Engine',
      description: 'Validates bracket nesting and computes shortest graph paths using std::stack, std::queue, and adjacency vectors.',
      banglaGoal: 'C++ STL stack, queue এবং adjacency vector দিয়ে ব্র্যাকেট যাচাই ও BFS শর্টেস্ট পাথ চালানো।',
      combinesChapters: 'Ch 1–23',
      starterCode: `#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0, u, v; i < m; i++) { cin >> u >> v; adj[u].push_back(v); adj[v].push_back(u); }\n    vector<int> dist(n, -1); queue<int> q; dist[0] = 0; q.push(0);\n    while (!q.empty()) { int u = q.front(); q.pop(); for (int v : adj[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); } }\n    for (int i = 0; i < n; i++) cout << dist[i] << (i + 1 == n ? "\\n" : " ");\n    return 0;\n}`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    stack<char> st; bool ok = true;\n    for (char c : s) {\n        if (c == '(' || c == '[' || c == '{') st.push(c);\n        else {\n            if (st.empty()) { ok = false; break; }\n            char t = st.top(); st.pop();\n            if ((c == ')' && t != '(') || (c == ']' && t != '[') || (c == '}' && t != '{')) { ok = false; break; }\n        }\n    }\n    cout << (ok && st.empty() ? "VALID" : "INVALID") << "\\n";\n    return 0;\n}`,
    sampleStdin: '{[()]}',
    expectedSampleOutput: 'VALID',
    testCases: [
      { id: 'cpp23-t1', input: '{[()]}', expectedOutput: 'VALID' },
      { id: 'cpp23-t2', input: '([)]', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'C++ Chapter 24 (C++23): Stream Parsing, Exceptions, Mutex/Async & Modular Headers',
    banglaTitle: 'C++ অধ্যায় ২৪ (C++23): স্ট্রিম পার্সিং, এক্সেপশন, কনকারেন্সি ও মডুলার হেডার',
    subtitle: 'RAII ifstream/stringstream parsing, try/catch exceptions, std::expected/variant, and std::async / std::mutex safety.',
    zeroIntuition: {
      plainEnglishStory:
        'In modern C++, RAII eliminates manual resource cleanup leaks: an `ifstream` closes its OS handle automatically when its destructor runs at scope exit—even if an exception throws! Combining `std::getline` with `std::istringstream` cleanly separates raw line framing from token parsing so malformed lines never jam `cin` forever.\n\nFor error handling without silent failure, choose between throwing domain exceptions (`try/catch(const exception&)`) and zero-overhead `std::variant<Value, Error>` values, while protecting concurrent threads with `std::scoped_lock` or `std::atomic`.',
      asciiFlowchart: `  getline(cin, line) -> istringstream iss(line)
     |-- (iss >> a >> b) ok --> process batch
     +-- malformed line ------> catch / skip cleanly, stream stays healthy!`,
      pseudocode: [
        '1. READ lines cleanly with std::getline + std::istringstream instead of brittle >> alone',
        '2. USE RAII objects (vector, string, unique_ptr, lock_guard) for automatic cleanup',
        '3. CATCH exceptions by const reference (catch (const std::exception& e)) to avoid slicing',
        '4. GUARD multi-threaded state with std::atomic or std::scoped_lock',
      ],
      banglaZeroToHero: {
        analogyTitle: 'RAII স্বয়ংক্রিয় তালা, নিরাপদ স্ট্রিম ও থ্রেড-সেফ কনকারেন্সি (C++23)',
        explanation:
          'C++-এর সবচেয়ে শক্তিশালী বৈশিষ্ট্য হলো RAII (Resource Acquisition Is Initialization)—অর্থাৎ ফাইল (`std::ifstream`), মেমোরি (`unique_ptr`) বা মিউটেক্স (`lock_guard`) অবজেক্টের স্কোপ শেষ হওয়ামাত্র ডিস্ট্রাক্টর নিজে থেকেই সেটি নিরাপদে বন্ধ/ফ্রি করে দেয়, এমনকি মাঝপথে এরর বা এক্সেপশন ছুড়লেও কোনো লিক হয় না! ইনপুট বা ফাইল লাইন ধরে ধরে পার্স করতে সরাসরি `cin >>` না চালিয়ে `std::getline` + `std::istringstream` ব্যবহার করলে একটি নষ্ট লাইনের কারণে পরের সব ইনপুট নষ্ট হয় না। এরর ধরার জন্য `try { ... } catch (const std::exception& e)` ব্লকে অবশ্যই `const &` রেফারেন্স নেবে যাতে অবজেক্ট কপি বা স্লাইস না হয়। এছাড়া মাল্টি-থ্রেড প্রোগ্রামিংয়ে ডেটা রেস ঠেকাতে `std::atomic<long long>` বা `std::scoped_lock` ব্যবহার করা আবশ্যক।',
        everydayExample: 'হোটেল রুম ছাড়লেই অটোমেটিক চাবি ডিঅ্যাক্টিভেট হওয়া এবং লাইট অফ হয়ে যাওয়াই হলো RAII ও ডিস্ট্রাক্টর নিরাপত্তা!',
        keyTakeaways: [
          'এক্সেপশন ক্যাচ করার সময় সর্বদা `catch (const std::exception& e)` লিখবে, ভ্যালু-কপি নয়।',
          '`std::getline` + `std::istringstream` দিয়ে প্রতিটি লাইন আলাদাভাবে পার্স করলে ফরম্যাট এরর সামলানো সহজ হয়।',
          '`std::mutex` নিজে lock/unlock না করে `std::lock_guard` বা `std::scoped_lock` দিয়ে RAII লক নেবে।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Domain Exceptions With std::runtime_error & const Reference Catch',
        englishParagraphs: [
          'Throwing `std::invalid_argument` on bad divisors separates normal math flow from error handling while stack unwinding cleans up every local RAII object cleanly.',
        ],
        banglaParagraphs: [
          'শূন্য দিয়ে ভাগের সময় প্রোগ্রাম ক্র্যাশ না করিয়ে `std::invalid_argument` ছুড়ে `catch (const exception& e)` দিয়ে ধরা হয়েছে।',
        ],
        memoryDiagram: `safeDiv(10, 0) -> throws invalid_argument -> caught safely -> OK(5) ERR`,
        code: `#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nlong long safeDiv(long long a, long long b) {\n    if (b == 0) throw invalid_argument("ERR_DIV_ZERO");\n    return a / b;\n}\n\nint main() {\n    long long a, b;\n    if (!(cin >> a >> b)) return 0;\n    try { cout << "OK:" << safeDiv(a, b) << "\\n"; }\n    catch (const exception& e) { cout << e.what() << "\\n"; }\n    return 0;\n}`,
        stdin: '20 4',
        expectedOutput: 'OK:5',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'catch (const exception& e) { cout << e.what() << "\\n"; }', whatItMeans: 'Catches base exception polymorphically by const reference.', whyItIsThere: 'Preserves exact message without object slicing.', ifDeletedError: 'Uncaught exception terminates program abruptly.' },
        ],
      },
      {
        id: 'cpp-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fault-Tolerant Line Stream Parser (getline + istringstream)',
        englishParagraphs: [
          'Framing input with `getline(cin, line)` then parsing via `istringstream` skips malformed records cleanly without leaving `cin` stuck in `failbit`!',
        ],
        banglaParagraphs: [
          '`getline` ও `istringstream` দিয়ে প্রতি লাইন আলাদা পার্স করলে মাঝখানে ভুল ডেটা এলেও পরের লাইন নির্ভুলভাবে পড়া যায়।',
        ],
        memoryDiagram: `"4 6" -> SUM=10 | "bad" -> SKIP_INVALID | "10 5" -> SUM=15`,
        code: `#include <iostream>\n#include <sstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        if (line.empty()) continue;\n        istringstream iss(line);\n        long long a, b;\n        if (iss >> a >> b) cout << "SUM=" << (a + b) << "\\n";\n        else cout << "SKIP_INVALID\\n";\n    }\n    return 0;\n}`,
        stdin: '4 6\nbad_line\n10 5',
        expectedOutput: 'SUM=10\nSKIP_INVALID\nSUM=15',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'istringstream iss(line);', whatItMeans: 'Wraps single line string in an isolated input stream.', whyItIsThere: 'Parse errors stay localized to current line only.', ifDeletedError: 'Malformed line sets failbit on global cin.' },
        ],
      },
      {
        id: 'cpp-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Type-Safe Result Pattern via std::variant (No Exception Overhead)',
        englishParagraphs: [
          'In low-latency C++, `std::variant<long long, string>` carries either a valid result or an explicit error message cleanly at zero heap allocation.',
        ],
        banglaParagraphs: [
          'এক্সেপশন ছাড়াই `std::variant` দিয়ে টাইপ-সেফ Result/Error রিটার্ন করার আধুনিক C++ প্যাটার্ন।',
        ],
        memoryDiagram: `parseToken("42") -> index 0 (42) | parseToken("abc") -> index 1 ("PARSE_ERR")`,
        code: `#include <iostream>\n#include <string>\n#include <variant>\nusing namespace std;\n\nvariant<long long, string> parseIntSafe(const string& s) {\n    try { size_t pos = 0; long long v = stoll(s, &pos); return (pos == s.size()) ? variant<long long, string>(v) : string("TRAILING_CHARS"); }\n    catch (...) { return string("PARSE_ERR"); }\n}\n\nint main() {\n    string s; int n; if (!(cin >> n)) return 0;\n    while (n-- && cin >> s) {\n        auto res = parseIntSafe(s);\n        if (holds_alternative<long long>(res)) cout << "VAL=" << get<long long>(res) << "\\n";\n        else cout << get<string>(res) << "\\n";\n    }\n    return 0;\n}`,
        stdin: '3\n42 12x bad',
        expectedOutput: 'VAL=42\nTRAILING_CHARS\nPARSE_ERR',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'long long v = stoll(s, &pos);', whatItMeans: 'Records number of parsed characters inside pos.', whyItIsThere: 'Detects partial numbers like "12x" that plain stoll accepts silently.', ifDeletedError: 'Silently parses "12x" as 12.' },
        ],
      },
      {
        id: 'cpp-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Concurrency Task Batching & Thread-Safe Atomic Aggregation',
        englishParagraphs: [
          'Combining `std::atomic<long long>` with deterministic worker lambdas prevents race conditions cleanly when aggregating concurrent metrics.',
        ],
        banglaParagraphs: [
          '`std::atomic` ব্যবহার করলে কনকারেন্ট অপারেশনেও কোনো ডেটা রেস ছাড়াই নির্ভুল যোগফল মেলে।',
        ],
        memoryDiagram: `atomic<long long> total{0} -> fetch_add(val) -> race-free sum`,
        code: `#include <atomic>\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    atomic<long long> total{0};\n    vector<long long> jobs(n);\n    for (int i = 0; i < n; i++) cin >> jobs[i];\n    for (long long v : jobs) total.fetch_add(v, memory_order_relaxed);\n    cout << total.load() << "\\n";\n    return 0;\n}`,
        stdin: '4\n10 20 30 40',
        expectedOutput: '100',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'total.fetch_add(v, memory_order_relaxed);', whatItMeans: 'Performs indivisible atomic addition.', whyItIsThere: 'Guarantees zero lost increments under multi-thread execution.', ifDeletedError: 'Total stays 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: '#include <stdexcept>', whatItMeans: 'Provides std::invalid_argument and std::runtime_error.', whyItIsThere: 'Standard structured exception hierarchy.', ifDeletedError: 'Compile error: invalid_argument undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long safeDiv(long long a, long long b) {', whatItMeans: 'Validates division precondition before executing a / b.', whyItIsThere: 'Eliminates hardware divide-by-zero traps.', ifDeletedError: 'Function missing.' },
      { lineNumber: 'Line 6', codeSnippet: 'if (b == 0) throw invalid_argument("ERR_DIV_ZERO");', whatItMeans: 'Unwinds stack cleanly with descriptive reason string.', whyItIsThere: 'Enforces explicit error handling at boundary.', ifDeletedError: 'Dividing by zero crashes process.' },
      { lineNumber: 'Line 13', codeSnippet: 'try { cout << "OK:" << safeDiv(a, b) << "\\n"; }', whatItMeans: 'Protected execution block forwarding domain errors cleanly.', whyItIsThere: 'Separates happy path from error recovery.', ifDeletedError: 'No exception handler installed.' },
      { lineNumber: 'Line 14', codeSnippet: 'catch (const exception& e) { cout << e.what() << "\\n"; }', whatItMeans: 'Handles any standard exception cleanly via const ref.', whyItIsThere: 'Emits structured error output without aborting.', ifDeletedError: 'Unhandled throw aborts runtime.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read a=20, b=4', memoryOrStack: 'Enter try block', note: 'Call safeDiv(20, 4)' },
      { step: 2, state: 'Check b == 0', memoryOrStack: '4 != 0 -> compute 20 / 4', note: 'Returns 5' },
      { step: 3, state: 'Catch bypassed', memoryOrStack: 'No exception thrown', note: 'Happy path prints OK:5' },
      { step: 4, state: 'If b == 0', memoryOrStack: 'throw -> catch prints ERR_DIV_ZERO', note: 'Zero crash guaranteed' },
    ],
    harryBugTraps: [
      {
        title: 'Catching Exceptions by Value Instead of const Reference',
        brokenCode: 'catch (std::exception e) { /* slices runtime_error! */ }',
        fixedCode: '#include <iostream>\n#include <stdexcept>\nint main() { try { throw std::runtime_error("Boom"); } catch (const std::exception& e) { std::cout << e.what() << "\\n"; } }',
        whyItBreaks: 'Catching by value slices away the derived class vtable, erasing the custom error message.',
      },
      {
        title: 'Ignoring stoll() Unparsed Suffixes like "12abc"',
        brokenCode: 'long long x = stoll("12abc"); // silently returns 12!',
        fixedCode: '#include <iostream>\n#include <string>\nint main() { size_t p = 0; long long x = std::stoll("12abc", &p); std::cout << (p == 5 ? "OK" : "BAD_SUFFIX") << "\\n"; }',
        whyItBreaks: 'Without checking &pos == str.size(), trailing non-digits pass silently as valid numbers.',
      },
      {
        title: 'Manual mutex.lock() Without lock_guard (Deadlock on Throw)',
        brokenCode: 'mtx.lock(); doWork(); mtx.unlock(); // skipped if doWork throws!',
        fixedCode: '#include <iostream>\n#include <mutex>\nint main() { std::mutex m; std::scoped_lock lk(m); std::cout << "RAII locked\\n"; }',
        whyItBreaks: 'An early return or exception leaves the mutex locked forever, deadlocking waiting threads.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-24-q1',
        difficulty: 'Easy',
        title: '1. Safe Division Exception Guard',
        prompt: 'Read two integers a and b; output `OK:<a/b>` or `ERR_DIV_ZERO` using try/catch.',
        banglaHint: '`b == 0` হলে `throw invalid_argument("ERR_DIV_ZERO")` করো এবং `catch` করো।',
        starterCode: `#include <iostream>\n#include <stdexcept>\nusing namespace std;\nint main() {\n    long long a, b; if (!(cin >> a >> b)) return 0;\n    try { if (b == 0) throw invalid_argument("ERR_DIV_ZERO"); cout << "OK:" << (a / b) << "\\n"; }\n    catch (const exception& e) { cout << e.what() << "\\n"; }\n    return 0;\n}`,
        sampleStdin: '20 4',
        expectedOutput: 'OK:5',
      },
      {
        id: 'cpp-ch-24-q2',
        difficulty: 'Easy',
        title: '2. Sum Valid Lines via istringstream',
        prompt: 'Read lines from stdin until EOF; print `a + b` for valid two-integer lines and `BAD` otherwise.',
        banglaHint: '`getline(cin, line)` পড়ে `istringstream iss(line)` দিয়ে দুটি সংখ্যা পার্স করো।',
        starterCode: `#include <iostream>\n#include <sstream>\n#include <string>\nusing namespace std;\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        istringstream iss(line); long long a, b;\n        if (iss >> a >> b) cout << (a + b) << "\\n"; else cout << "BAD\\n";\n    }\n    return 0;\n}`,
        sampleStdin: '3 7\nhello\n10 -2',
        expectedOutput: '10\nBAD\n8',
      },
      {
        id: 'cpp-ch-24-q3',
        difficulty: 'Medium',
        title: '3. Strict Whole-String Integer Validator',
        prompt: 'Read n tokens; print each parsed integer or `INVALID` if any non-digit character appears.',
        banglaHint: '`stoll(s, &pos)` ব্যবহার করে `pos == s.size()` চেক করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n; cin >> n; string s;\n    while (n-- && cin >> s) {\n        try { size_t p = 0; long long v = stoll(s, &p); if (p == s.size()) cout << v << "\\n"; else cout << "INVALID\\n"; }\n        catch (...) { cout << "INVALID\\n"; }\n    }\n    return 0;\n}`,
        sampleStdin: '3\n99 12z -5',
        expectedOutput: '99\nINVALID\n-5',
      },
      {
        id: 'cpp-ch-24-q4',
        difficulty: 'Medium',
        title: '4. Worker Task Queue Batch Runner',
        prompt: 'Read n then n integers; wrap each in a lambda task inside a vector and execute sequentially for total sum.',
        banglaHint: '`vector<function<long long()>>` বা সরাসরি ল্যাম্বডা লিস্ট চালিয়ে মোট যোগফল বের করো।',
        starterCode: `#include <functional>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<function<long long()>> q;\n    for (int i = 0; i < n; i++) { long long x; cin >> x; q.push_back([x]() { return x; }); }\n    long long sum = 0; for (auto& job : q) sum += job(); cout << sum << "\\n";\n    return 0;\n}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'cpp-ch-24-q5',
        difficulty: 'Hard',
        title: '5. Scoped RAII Guard Trace (Commit vs Rollback)',
        prompt: 'Write an RAII Transaction guard that rolls back automatically unless `.commit()` is called; test both paths.',
        banglaHint: 'ডিস্ট্রাক্টরে `if (!committed)` হলে Rollback প্রিন্ট করো যাতে এক্সেপশনেও কাজ হয়।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nstruct Tx {\n    bool committed = false; string name;\n    explicit Tx(string n) : name(move(n)) {}\n    void commit() { committed = true; cout << name << ":COMMIT\\n"; }\n    ~Tx() { if (!committed) cout << name << ":ROLLBACK\\n"; }\n};\nint main() {\n    string mode; cin >> mode;\n    { Tx t("DB"); if (mode == "ok") t.commit(); }\n    return 0;\n}`,
        sampleStdin: 'fail',
        expectedOutput: 'DB:ROLLBACK',
      },
    ],
    miniBuild: {
      title: 'C++23 Fault-Tolerant Exception & Stream Batch Engine',
      description: 'Processes safe division with RAII error guards and deterministic structured output.',
      banglaGoal: 'RAII এবং স্ট্রাকচার্ড এক্সেপশন হ্যান্ডলিংসহ নিরাপদ অপারেশন ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–24',
      starterCode: `#include <iostream>\n#include <stdexcept>\nusing namespace std;\nlong long safeDiv(long long a, long long b) { if (b == 0) throw invalid_argument("ERR_DIV_ZERO"); return a / b; }\nint main() {\n    long long a, b; if (!(cin >> a >> b)) return 0;\n    try { cout << "OK:" << safeDiv(a, b) << "\\n"; }\n    catch (const exception& e) { cout << e.what() << "\\n"; }\n    return 0;\n}`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `#include <iostream>\n#include <stdexcept>\nusing namespace std;\nlong long safeDiv(long long a, long long b) { if (b == 0) throw invalid_argument("ERR_DIV_ZERO"); return a / b; }\nint main() {\n    long long a, b; if (!(cin >> a >> b)) return 0;\n    try { cout << "OK:" << safeDiv(a, b) << "\\n"; }\n    catch (const exception& e) { cout << e.what() << "\\n"; }\n    return 0;\n}`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'cpp24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'cpp24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'C++ Chapter 25 (C++23): Full-Stack Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'C++ অধ্যায় ২৫ (C++23): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট (মেগা ক্যাপস্টোন)',
    subtitle: 'HTTP request parsing with std::string_view, unordered_map route dispatch, JSON responses, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'Modern full-stack applications pair a browser frontend with ultra-fast backend microservices, search engines, and database engines powered by C++ (Crow, Drogon, ClickHouse, Envoy Proxy). Every incoming client click arrives as a structured HTTP request (`GET /api/add 15 27`), which a C++ backend tokenizes using zero-copy `string_view`, verifies against method/auth rules, dispatches via `unordered_map` route handlers, and serializes as clean JSON (`200 {"sum":42}`).\n\nIn this C++23 Mega Capstone, you unify all 25 chapters—types, overflow-safe `long long`, bitwise/hash maps, RAII structs, lambdas, exception guards, and deterministic HTTP routing—into an end-to-end Backend Request Engine.',
      asciiFlowchart: `  [ Client HTTP Line: "POST /api/add 15 27" ]
         |
         v  (Validate Method -> unordered_map Route -> Execute Handler)
  [ HTTP Status + JSON: "200 {\\"sum\\":42}" | 404 | 405 ]`,
      pseudocode: [
        '1. PARSE HTTP request record { method, path, a, b } safely from stream',
        '2. GUARD allowed HTTP verbs (GET / POST) returning 405 MethodNotAllowed otherwise',
        '3. DISPATCH route handlers stored in unordered_map<string, function<void(long long, long long)>>',
        '4. EMIT deterministic HTTP status code + strict JSON payload or 404 JSON error',
      ],
      banglaZeroToHero: {
        analogyTitle: 'আধুনিক ওয়েব ব্যাকএন্ড, রাউট ম্যাপ ও ফুল-স্ট্যাক ইঞ্জিন (Mega Capstone)',
        explanation:
          'একটি পূর্ণাঙ্গ ওয়েবসাইটের ফ্রন্টএন্ড (HTML/CSS/React) থেকে যখন কোনো ইউজার বাটনে ক্লিক করে, তখন ব্রাউজার একটি HTTP রিকোয়েস্ট সার্ভারে পাঠায়—যেমন `POST /api/add 15 27`। আধুনিক অনেক হাই-স্পিড এপিআই গেটওয়ে, গেম ব্যাকএন্ড ও ডাটাবেস ইঞ্জিন C++-এ তৈরি হয়! C++23-তে সার্ভার প্রথমে মেথড (`GET` নাকি `POST`) যাচাই করে—ভুল মেথড হলে `405 MethodNotAllowed` ফেরত দেয়। এরপর `std::unordered_map`-ভিত্তিক রাউট ডিসপ্যাচ টেবিল থেকে O(1) সময়ে সঠিক হ্যান্ডলার ল্যাম্বডা খুঁজে বের করে এবং শেষে পরিচ্ছন্ন JSON রেসপন্স (`200 {"sum":42}`) প্রিন্ট করে; আর পথ না মিললে `404 {"error":"not_found"}` দেয়! এছাড়া উৎপাদনশীল সার্ভারে কপি কমাতে `std::string_view`, ইনজেকশন ঠেকাতে ইনপুট ভ্যালিডেশন ও রেট-লিমিটার কিউ অত্যন্ত গুরুত্বপূর্ণ। এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১ থেকে ২৪-এর সব ধারণা—`long long`, কন্টেইনার, হ্যাশ ম্যাপ, স্ট্রাক্ট, ল্যাম্বডা এবং এরর গার্ড—একসাথে মিলিয়ে একটি সম্পূর্ণ C++23 ওয়েব এপিআই রাউটার তৈরি করবে!',
        everydayExample:
          'সচিবালয়ের রিসেপশনে আবেদনপত্রের (`GET /health`) সিল দেখে নির্দিষ্ট ডেস্কে (`unordered_map` রাউটার) পাঠানো হয়—অজানা ঠিকানা হলে সাথে সাথেই `404` ফেরত আসে!',
        keyTakeaways: [
          'C++ সার্ভারে `unordered_map<string, function<...>>` দিয়ে O(1) সময়ে ক্লিন রাউট ডিসপ্যাচ বানানো যায়।',
          'রাউটে ঢোকার আগেই HTTP মেথড (`GET`/`POST`) ও অথেন্টিকেশন টোকেন যাচাই করা নিরাপত্তা নীতি।',
          'স্ট্রিং অযথা কপি না করে পার্স করতে `std::string_view` ব্যবহার করলে সার্ভার থ্রুপুট বহুগুণ বাড়ে।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Parsing HTTP Request Line With stringstream & Struct',
        englishParagraphs: [
          'Separating raw HTTP request tokens (`GET /health HTTP/1.1`) into an `HttpReq` struct lets every downstream middleware inspect `.method` and `.path` cleanly.',
        ],
        banglaParagraphs: [
          '`istringstream` দিয়ে HTTP রিকোয়েস্ট লাইন ভেঙে `HttpReq` স্ট্রাক্টে সংরক্ষণ করা হয়েছে।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> HttpReq{method="GET", path="/health"}`,
        code: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

struct HttpReq { string method, path, version; };

int main() {
    string line = "GET /health HTTP/1.1";
    istringstream iss(line);
    HttpReq req;
    if (iss >> req.method >> req.path >> req.version) {
        cout << "method=" << req.method << " path=" << req.path << "\\n";
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'istringstream iss(line);', whatItMeans: 'Wraps raw HTTP line in an input stream for safe whitespace tokenization.', whyItIsThere: 'Avoids fixed-size char array overflows cleanly.', ifDeletedError: 'Compile error: iss not declared.' },
        ],
      },
      {
        id: 'cpp-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'JSON Serializer & Query Parameter Parser',
        englishParagraphs: [
          'Building structured JSON strings cleanly with `long long` fields preserves full precision on large counters and user IDs.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে ইউজারনেম ও স্কোর পড়ে `HTTP/1.1 200 OK` হেডারসহ নির্ভুল JSON তৈরি করা হয়েছে।',
        ],
        memoryDiagram: `"argon 95" -> HTTP/1.1 200 OK + {"user":"argon","score":95}`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string user; long long score = 0;
    if (cin >> user >> score) {
        cout << "HTTP/1.1 200 OK\\n";
        cout << "{\\"user\\":\\"" << user << "\\",\\"score\\":" << score << "}\\n";
    }
    return 0;
}`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'cout << "{\\"user\\":\\"" << user << "\\",\\"score\\":" << score << "}\\n";', whatItMeans: 'Formats exact escaped JSON payload to standard output.', whyItIsThere: 'Emits machine-readable API response.', ifDeletedError: 'Response body missing.' },
        ],
      },
      {
        id: 'cpp-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'unordered_map Route Table & Auth Guard',
        englishParagraphs: [
          'Storing route handlers inside an `unordered_map<string, function<string()>>` eliminates long `if / else if` chains cleanly.',
        ],
        banglaParagraphs: [
          'অথেন্টিকেশন টোকেন চেক করে `unordered_map` রাউট টেবিল থেকে সঠিক হ্যান্ডলার ল্যাম্বডা কল করা হয়েছে।',
        ],
        memoryDiagram: `req(/health, secret) -> auth OK -> routes["/health"]() -> 200`,
        code: `#include <functional>
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, function<string()>> routes = {
        {"/health", []() { return string("200 {\\"ok\\":true}"); }},
        {"/version", []() { return string("200 {\\"ver\\":\\"cpp23\\"}"); }},
    };
    string path, tok;
    if (cin >> path >> tok) {
        if (tok != "secret") { cout << "401 Unauthorized\\n"; return 0; }
        auto it = routes.find(path);
        cout << (it != routes.end() ? it->second() : "404 NotFound") << "\\n";
    }
    return 0;
}`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 15', codeSnippet: 'auto it = routes.find(path);', whatItMeans: 'Looks up handler in O(1) expected time without creating empty map entries.', whyItIsThere: 'Safely returns 404 when path does not exist.', ifDeletedError: 'Cannot distinguish valid vs missing endpoints.' },
        ],
      },
      {
        id: 'cpp-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Full-Stack HTTP Request Router + JSON API',
        englishParagraphs: [
          'Handles multiple sequential API requests (`METHOD /path a b`), validating allowed HTTP verbs (`405`), routing `/health` and `/api/add` with 64-bit `long long` math, and emitting standardized `404` JSON errors.',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন: একটানা একাধিক HTTP রিকোয়েস্ট প্রসেস করে মেথড যাচাই (`405`), রাউটিং (`/health`, `/api/add`) ও `404` JSON এরর উত্তর তৈরি করা হয়েছে!',
        ],
        memoryDiagram: `Stream -> Method Gate (405) -> Route Table (200 JSON) / 404`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n = 0;
    if (!(cin >> n)) return 0;
    for (int i = 0; i < n; i++) {
        string method, path; long long a = 0, b = 0;
        if (!(cin >> method >> path >> a >> b)) break;
        if (method != "GET" && method != "POST") {
            cout << "405 MethodNotAllowed\\n";
        } else if (path == "/health") {
            cout << "200 {\\"status\\":\\"ok\\"}\\n";
        } else if (path == "/api/add") {
            cout << "200 {\\"sum\\":" << (a + b) << "}\\n";
        } else {
            cout << "404 {\\"error\\":\\"not_found\\"}\\n";
        }
    }
    return 0;
}`,
        stdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
        expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'if (method != "GET" && method != "POST") {', whatItMeans: 'Enforces HTTP method whitelist before invoking route handlers.', whyItIsThere: 'Returns standard 405 status cleanly.', ifDeletedError: 'Invalid verbs like DELETE pass through into handlers.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <iostream>', whatItMeans: 'Provides fast standard stream I/O for requests and responses.', whyItIsThere: 'Reads request lines and emits HTTP output.', ifDeletedError: 'Compile error: cin/cout unknown.' },
      { lineNumber: 'Line 6', codeSnippet: 'struct HttpReq { string method, path, version; };', whatItMeans: 'Aggregates parsed request metadata into a clean C++ type.', whyItIsThere: 'Decouples parsing from handler logic.', ifDeletedError: 'Compile error: HttpReq undeclared.' },
      { lineNumber: 'Line 10', codeSnippet: 'istringstream iss(line);', whatItMeans: 'Creates in-memory stream tokenizer over raw request line.', whyItIsThere: 'Avoids manual C-string index arithmetic.', ifDeletedError: 'Cannot parse tokens out of line.' },
      { lineNumber: 'Line 12', codeSnippet: 'if (iss >> req.method >> req.path >> req.version) {', whatItMeans: 'Extracts three whitespace-delimited HTTP header tokens safely.', whyItIsThere: 'Skips malformed empty lines cleanly.', ifDeletedError: 'Fields stay empty strings.' },
      { lineNumber: 'Line 13', codeSnippet: 'cout << "method=" << req.method << " path=" << req.path << "\\n";', whatItMeans: 'Prints parsed method and URL path.', whyItIsThere: 'Confirms request line extraction succeeded.', ifDeletedError: 'Produces empty output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "GET /health 0 0"', memoryOrStack: 'method="GET", path="/health"', note: 'Valid HTTP verb' },
      { step: 2, state: 'Dispatch "/health"', memoryOrStack: 'Emits 200 {"status":"ok"}', note: 'Health endpoint hit' },
      { step: 3, state: 'Read "POST /api/add 15 27"', memoryOrStack: 'a=15, b=27 -> a+b=42', note: '200 {"sum":42}' },
      { step: 4, state: 'Read "GET /unknown 0 0"', memoryOrStack: 'Unmatched route -> 404', note: 'JSON not_found emitted' },
    ],
    harryBugTraps: [
      {
        title: 'Using routes[path] Lookup Inserting Empty Handler on Missing Routes',
        brokenCode: `auto fn = routes[path]; // Inserts nullptr/empty function on every 404, leaking RAM!`,
        fixedCode: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\nint main() { unordered_map<string, int> r{{"/health", 200}}; cout << (r.contains("/x") ? "HIT" : "404") << "\\n"; return 0; }`,
        whyItBreaks: 'operator[] inserts a default-constructed value on misses; under 404 fuzzing it leaks memory unboundedly. Use .find() or .contains().',
      },
      {
        title: 'Returning std::string_view Pointing to a Local Dead std::string',
        brokenCode: `string_view bad() { string s = "/api"; return s; } // Dangling view -> UB!`,
        fixedCode: `#include <iostream>\n#include <string>\nusing namespace std;\nstring good() { return "/api"; }\nint main() { cout << good() << "\\n"; return 0; }`,
        whyItBreaks: 'string_view does not own memory; returning a view into a local stack string causes dangling-pointer garbage reads.',
      },
      {
        title: 'Integer Overflow When Summing Large Request Metrics in 32-bit int',
        brokenCode: `int total = 2000000000 + 2000000000; // Signed 32-bit UB!`,
        fixedCode: `#include <iostream>\nusing namespace std;\nint main() { long long a = 2000000000LL, b = 2000000000LL; cout << (a + b) << "\\n"; return 0; }`,
        whyItBreaks: 'API counters and payloads easily exceed 2^31-1; always accumulate counters in 64-bit long long.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-25-q1',
        difficulty: 'Easy',
        title: 'HTTP Status Code Labeler',
        prompt: 'Read status code int (200, 404, 500) and print OK / NOT_FOUND / SERVER_ERR.',
        banglaHint: 'ইঙ্গিত: `if / else if` দিয়ে স্ট্যাটাস কোড ম্যাপ করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() { int c; if (cin >> c) cout << (c == 200 ? "OK" : (c == 404 ? "NOT_FOUND" : "SERVER_ERR")) << "\\n"; return 0; }`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'cpp-ch-25-q2',
        difficulty: 'Easy',
        title: 'Safe JSON Key-Value Emitter',
        prompt: 'Read key and long long value; print exact `{"<key>":<val>}`.',
        banglaHint: 'ইঙ্গিত: `"{\\"" << k << "\\":" << v << "}"` ফরম্যাটে প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() { string k; long long v; if (cin >> k >> v) cout << "{\\"" << k << "\\":" << v << "}\\n"; return 0; }`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'cpp-ch-25-q3',
        difficulty: 'Medium',
        title: 'URL Query id Extractor',
        prompt: 'Read query token like `id=42&mode=pro`; extract and print integer value of `id`.',
        banglaHint: 'ইঙ্গিত: `substr(3)` বা `find("=")` ও `find("&")` ব্যবহার করে সংখ্যা বের করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string q; if (!(cin >> q)) return 0;\n    size_t eq = q.find("id="), amp = q.find('&', eq);\n    cout << q.substr(eq + 3, amp == string::npos ? string::npos : amp - (eq + 3)) << "\\n";\n    return 0;\n}`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch-25-q4',
        difficulty: 'Medium',
        title: 'Sliding-Window API Rate Limiter',
        prompt: 'Read cap and n sorted timestamps; count accepted requests with <= cap requests inside trailing 10s window.',
        banglaHint: 'ইঙ্গিত: `queue<long long>` বা ডাবল-এন্ড কিউ থেকে `t - q.front() >= 10` সব পপ করে `q.size() < cap` চেক করো!',
        starterCode: `#include <deque>\n#include <iostream>\nusing namespace std;\nint main() {\n    int cap, n, accepted = 0; if (!(cin >> cap >> n)) return 0;\n    deque<long long> win;\n    for (int i = 0; i < n; i++) {\n        long long t; cin >> t;\n        while (!win.empty() && t - win.front() >= 10) win.pop_front();\n        if ((int)win.size() < cap) { win.push_back(t); accepted++; }\n    }\n    cout << accepted << "\\n";\n    return 0;\n}`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'cpp-ch-25-q5',
        difficulty: 'Hard',
        title: 'In-Memory REST KV Store Simulator',
        prompt: 'Process n commands: `SET id val` or `GET id`; print stored value (0 if unset) for each GET.',
        banglaHint: 'ইঙ্গিত: `unordered_map<int, long long> db;` ব্যবহার করো এবং `.find()` দিয়ে ডিফল্ট ০ প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    unordered_map<int, long long> db;\n    for (int i = 0; i < n; i++) {\n        string cmd; int id; cin >> cmd >> id;\n        if (cmd == "SET") { long long v; cin >> v; db[id] = v; }\n        else cout << (db.contains(id) ? db[id] : 0) << "\\n";\n    }\n    return 0;\n}`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): C++23 Full-Stack HTTP Router & JSON Engine',
      description: 'Combines request validation, route dispatch, 64-bit arithmetic, and JSON output into a live API server.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ C++23 HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n = 0; if (!(cin >> n)) return 0;\n    for (int i = 0; i < n; i++) {\n        string m, p; long long a = 0, b = 0;\n        if (!(cin >> m >> p >> a >> b)) break;\n        if (m != "GET" && m != "POST") cout << "405 MethodNotAllowed\\n";\n        else if (p == "/health") cout << "200 {\\"status\\":\\"ok\\"}\\n";\n        else if (p == "/api/add") cout << "200 {\\"sum\\":" << (a + b) << "}\\n";\n        else cout << "404 {\\"error\\":\\"not_found\\"}\\n";\n    }\n    return 0;\n}`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n = 0; if (!(cin >> n)) return 0;\n    for (int i = 0; i < n; i++) {\n        string m, p; long long a = 0, b = 0;\n        if (!(cin >> m >> p >> a >> b)) break;\n        if (m != "GET" && m != "POST") cout << "405 MethodNotAllowed\\n";\n        else if (p == "/health") cout << "200 {\\"status\\":\\"ok\\"}\\n";\n        else if (p == "/api/add") cout << "200 {\\"sum\\":" << (a + b) << "}\\n";\n        else cout << "404 {\\"error\\":\\"not_found\\"}\\n";\n    }\n    return 0;\n}`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'cpp25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'cpp25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};

