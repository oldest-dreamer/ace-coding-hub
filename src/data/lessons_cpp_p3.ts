import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_CPP_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'C++ Chapter 11 (C++23): 1D Arrays, std::vector & Frequency Counting',
    banglaTitle: 'C++ অধ্যায় ১১ (C++23): ১ডি অ্যারে, std::vector ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'Contiguous memory layout, O(1) random indexing, std::vector<long long>, and frequency histograms.',
    zeroIntuition: {
      plainEnglishStory:
        'A 1D array or `std::vector<int>` reserves one contiguous slab of RAM so element `a[i]` sits at exact memory offset `base_address + i * sizeof(T)`. That contiguous layout is why reading or updating `a[50000]` takes `O(1)` constant CPU time and warms up CPU L1 cache lines cleanly.\n\nUnlike fixed C arrays (`int a[100]`), `std::vector` dynamically tracks its `.size()`, initializes cleanly (`vector<int> freq(1001, 0)`), and passes safely by reference (`const vector<int>&`). Pairing an `O(N)` traversal with a frequency bucket array turns quadratic duplicate/mode searches into linear-time solutions.',
      asciiFlowchart: `std::vector<int> a = {4, 2, 4, 7};   // Contiguous RAM (4 bytes each)
   idx:    0     1     2     3
   addr: [0x10][0x14][0x18][0x1C]
   val:  [  4 ][  2 ][  4 ][  7 ]

Frequency Bucket: freq[x]++
   freq[2]=1, freq[4]=2, freq[7]=1  ==> O(N) total scan!`,
      pseudocode: [
        '1. READ N and allocate vector<long long> a(n)',
        '2. STREAM elements cleanly via range-based for (auto& x : a) cin >> x',
        '3. MAINTAIN running min/max or frequency table freq[val]++',
        '4. GUARD array bounds (0 <= idx < (int)a.size()) before indexing',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সারিবদ্ধ লকার ও ভোট গণনার বাক্স',
        explanation:
          'কল্পনা করো এক সারিতে ১০০টি লকার পাশাপাশি নম্বর দিয়ে সাজানো আছে—৫৭ নম্বর লকার খুলতে তোমাকে ১ থেকে ৫৬ পর্যন্ত হাঁটতে হবে না, সোজা `base + 57` ঠিকানায় পৌঁছে যাবে। C++-এ `std::vector` ঠিক এভাবেই মেমোরির একটানা ব্লকে ডেটা রাখে, তাই যেকোনো `a[i]` পড়া বা বদলানো মাত্র `O(1)` সময়ে হয়। সাধারণ C অ্যারের চেয়ে `vector<long long> a(n)` নিরাপদ, কারণ এটি নিজের দৈর্ঘ্য `.size()` জানে এবং শূন্য (`0`) দিয়ে অটো-ইনিশিয়ালাইজ হয়। একবারের `O(N)` স্ক্যান চালিয়েই আমরা অ্যারের সর্বোচ্চ, সর্বনিম্ন এবং যোগফল বের করতে পারি। আর যদি প্রতিটি সংখ্যা কতবার এসেছে তা গুনতে হয়, তবে আলাদা `vector<int> freq(maxVal + 1, 0)` নিয়ে `freq[x]++` করলে `O(N)` সময়েই ডুপ্লিকেট বা মোড বের হয়ে আসে—একদম আলাদা আলাদা ভোটের বাক্সে টোকেন ফেলার মতো! তবে সাবধান: `a[i]` লেখার আগে ইনডেক্স যেন `0` থেকে `n - 1`-এর ভেতরে থাকে তা নিশ্চিত করবে, নতুবা C++-এ Out-of-Bounds বাফার ওভারফ্লো হয়ে র‍্যানডম ভ্যালু বা Segmentation Fault দেখা দেবে। আরেকটি জরুরি নিয়ম হলো `vector` ফাংশনে পাঠানোর সময় সবসময় `const vector<long long>&` রেফারেন্স নেওয়া, যাতে পুরো অ্যারে কপি না হয়ে সময় বাঁচে। ভালোভাবে অ্যারে ও ফ্রিকোয়েন্সি কাউন্টিং আয়ত্ত করলে কনটেস্টের অর্ধেক সহজ-মাঝারি সমস্যা মুহূর্তেই সমাধান করা যায়।',
        everydayExample:
          'হলরুমের ১ থেকে ৫০ নম্বর সিটের প্রতিটি আসন পাশাপাশি থাকায় নম্বর জানা থাকলে সরাসরি `O(1)` সময়ে বসে যাওয়া যায়, আর `freq[rating]++` হলো ১–১০ স্টার রেটিংয়ের আলাদা ১০টি টালি বাক্স।',
        keyTakeaways: [
          '`vector<long long> a(n, 0)` সব ঘরকে নিরাপদভাবে ০ দিয়ে সাজিয়ে নেয়।',
          '`freq[x]++` ফ্রিকোয়েন্সি অ্যারে ব্যবহার করে `O(N^2)` ডুপ্লিকেট খোঁজাকে `O(N)` বানানো যায়।',
          'সবসময় `0 <= i && i < (int)a.size()` সীমা মেনে চলবে এবং ফাংশনে `&` রেফারেন্স পাঠাবে।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Contiguous std::vector Traversal & Running Max/Sum',
        englishParagraphs: [
          'Initializing `vector<long long> a = {12, 5, 27, 9}` stores four 8-byte integers side by side on the heap.',
          'A single range-based loop computes both total sum and maximum element cleanly in one `O(N)` pass.',
        ],
        banglaParagraphs: [
          '`vector<long long>` দিয়ে পাশাপাশি মেমোরিতে ডেটা রেখে একটি লুপেই যোগফল ও সর্বোচ্চ মান বের করা যায়।',
          '`auto x : a` রেঞ্জ-লুপ ইনডেক্স ভুল হওয়ার ঝুঁকি কমায়।',
        ],
        memoryDiagram: `a: [12][5][27][9] -> sum=53, max=27 in 1 pass`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> a = {12, 5, 27, 9};
    long long sum = 0, mx = a[0];
    for (long long x : a) {
        sum += x;
        if (x > mx) mx = x;
    }
    cout << "sum=" << sum << " max=" << mx << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum=53 max=27',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'vector<long long> a = {12, 5, 27, 9};', whatItMeans: 'Allocates 4 contiguous 64-bit slots.', whyItIsThere: 'Dynamic array container.', ifDeletedError: 'Undeclared a.' },
          { lineNumber: 'Line 8', codeSnippet: 'for (long long x : a) {', whatItMeans: 'Iterates sequentially across cache-friendly slots.', whyItIsThere: 'Avoids off-by-one loop bounds.', ifDeletedError: 'Loop missing.' },
        ],
      },
      {
        id: 'cpp-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Frequency Histogram Buckets (O(N))',
        englishParagraphs: [
          'Given `N` scores in `[0, 100]`, allocating `vector<int> freq(101, 0)` counts every score occurrence in `O(1)` per item.',
          'Scanning `0..100` afterwards retrieves sorted distinct values or the most frequent value cleanly.',
        ],
        banglaParagraphs: [
          'মান `0..100`-এর মধ্যে থাকলে `vector<int> freq(101, 0)` নিয়ে `freq[x]++` করলে প্রতিটি সংখ্যা কতবার এসেছে তা মুহূর্তেই গোনা যায়।',
          'পরে `0..100` ঘুরলে ছোট থেকে বড় সাজানো ফ্রিকোয়েন্সি পাওয়া যায়।',
        ],
        memoryDiagram: `input [3, 1, 3, 2, 3] -> freq[1]=1, freq[2]=1, freq[3]=3 -> mode=3`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    vector<int> freq(101, 0);
    for (int i = 0; i < n; i++) {
        int x = 0;
        cin >> x;
        if (x >= 0 && x <= 100) freq[x]++;
    }
    int mode = 0;
    for (int v = 1; v <= 100; v++) {
        if (freq[v] > freq[mode]) mode = v;
    }
    cout << "mode=" << mode << " count=" << freq[mode] << "\\n";
    return 0;
}`,
        stdin: '5\n3 1 3 2 3',
        expectedOutput: 'mode=3 count=3',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'vector<int> freq(101, 0);', whatItMeans: 'Creates 101 zero-initialized frequency buckets.', whyItIsThere: 'Prevents uninitialized garbage counts.', ifDeletedError: 'Compile error: freq undeclared.' },
          { lineNumber: 'Line 12', codeSnippet: 'if (x >= 0 && x <= 100) freq[x]++;', whatItMeans: 'Bounds-checks input before incrementing bucket.', whyItIsThere: 'Guards against out-of-range array access.', ifDeletedError: 'freq stays all zeros.' },
        ],
      },
      {
        id: 'cpp-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'In-Place Array Rotation / Reverse (O(1) Extra Space)',
        englishParagraphs: [
          'Reversing a vector in place swaps `a[l]` and `a[r]` inward while `l < r`, consuming zero extra array memory.',
          'Three reversals (`[0..k-1]`, `[k..n-1]`, `[0..n-1]`) rotate any array left by `k` steps in `O(N)` time.',
        ],
        banglaParagraphs: [
          'অতিরিক্ত অ্যারে ছাড়াই `l` ও `r` প্রান্ত অদলবদল করে পুরো `vector` উল্টে ফেলা যায়।',
          'এতে বাড়তি স্পেস লাগে মাত্র `O(1)`।',
        ],
        memoryDiagram: `[10,20,30,40] -> swap(0,3)->swap(1,2) -> [40,30,20,10]`,
        code: `#include <iostream>
#include <vector>
#include <utility>
using namespace std;

int main() {
    vector<int> a = {10, 20, 30, 40};
    int l = 0, r = (int)a.size() - 1;
    while (l < r) {
        swap(a[l++], a[r--]);
    }
    for (int i = 0; i < (int)a.size(); i++) {
        if (i > 0) cout << ' ';
        cout << a[i];
    }
    cout << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '40 30 20 10',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'swap(a[l++], a[r--]);', whatItMeans: 'Exchanges symmetric elements and shrinks bounds inward.', whyItIsThere: 'O(1) extra memory reversal.', ifDeletedError: 'Infinite loop.' },
        ],
      },
      {
        id: 'cpp-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Unsigned a.size() - 1 Underflow Trap vs Cast',
        englishParagraphs: [
          '`a.size()` returns unsigned `size_t`! If `a` is empty, `a.size() - 1` wraps around to `18446744073709551615`, causing a loop `for (int i = 0; i <= a.size() - 1; i++)` to crash with SIGSEGV!',
          'Always write `(int)a.size() - 1` or `ssize(a) - 1` (C++20/23) whenever subtracting from vector length.',
        ],
        banglaParagraphs: [
          '`a.size()` হলো আনসাইনড `size_t`, তাই ভেক্টর খালি হলে `a.size() - 1` বিয়োগ হয়ে `184467...` বিশাল সংখ্যা হয়ে ক্র্যাশ ঘটায়!',
          'C++23-এ `std::ssize(a)` অথবা `(int)a.size()` ব্যবহার করলে এই বাগ কখনোই ঘটে না।',
        ],
        memoryDiagram: `empty vec: size_t(0) - 1 = 2^64 - 1 (CRASH!) | ssize(a) - 1 = -1 (SAFE!)`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {5, 10, 15};
    for (int i = (int)a.size() - 1; i >= 0; i--) {
        if (i < (int)a.size() - 1) cout << ' ';
        cout << a[i];
    }
    cout << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '15 10 5',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'for (int i = (int)a.size() - 1; i >= 0; i--)', whatItMeans: 'Casts size_t to signed int before subtracting 1.', whyItIsThere: 'Prevents unsigned wraparound when vector is empty.', ifDeletedError: 'Compile/runtime hazard if empty.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 6', codeSnippet: 'vector<long long> a = {12, 5, 27, 9};', whatItMeans: 'Creates dynamic contiguous array of four 64-bit ints.', whyItIsThere: 'Holds sequential dataset in O(N) memory.', ifDeletedError: 'Undeclared identifier a.' },
      { lineNumber: 'Line 7', codeSnippet: 'long long sum = 0, mx = a[0];', whatItMeans: 'Seeds running sum at 0 and max at first element.', whyItIsThere: 'Handles all-negative arrays accurately (better than mx = 0).', ifDeletedError: 'mx = 0 fails if all array values are negative.' },
      { lineNumber: 'Line 8', codeSnippet: 'for (long long x : a) {', whatItMeans: 'Iterates sequentially across every element.', whyItIsThere: 'Cache-friendly O(N) pass.', ifDeletedError: 'Nothing accumulated.' },
      { lineNumber: 'Line 12', codeSnippet: 'cout << "sum=" << sum << " max=" << mx << "\\n";', whatItMeans: 'Prints aggregated array metrics.', whyItIsThere: 'Emits single clean line to stdout.', ifDeletedError: 'Silent output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'init', memoryOrStack: 'sum=0, mx=12', note: 'Seed max with a[0]' },
      { step: 2, state: 'x = 5', memoryOrStack: 'sum=17, mx=12', note: '5 > 12 false' },
      { step: 3, state: 'x = 27', memoryOrStack: 'sum=44, mx=27', note: '27 > 12 true -> update mx' },
      { step: 4, state: 'x = 9', memoryOrStack: 'sum=53, mx=27', note: 'Outputs sum=53 max=27' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Unsigned a.size() - 1 on Empty Vector', brokenCode: `for (int i = 0; i <= a.size() - 1; i++)`, fixedCode: `for (int i = 0; i < (int)a.size(); i++)`, whyItBreaks: 'When a is empty, size_t(0) - 1 underflows to SIZE_MAX and enters out-of-bounds memory.' },
      { title: 'Trap 2: Initializing mx = 0 for Negative Arrays', brokenCode: `int mx = 0; for (int x : a) mx = max(mx, x);`, fixedCode: `int mx = a[0]; for (int x : a) mx = max(mx, x);`, whyItBreaks: 'If input is {-9, -4, -2}, mx=0 falsely outputs 0 instead of -2.' },
      { title: 'Trap 3: Large Local C-Style Array Stack Overflow', brokenCode: `int main() { int a[10000000]; } // ~40 MB on small 8MB stack!`, fixedCode: `int main() { vector<int> a(10000000); } // safely heap-allocated!`, whyItBreaks: 'OS call stacks are small (~8 MB); std::vector places large buffers safely on the heap.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch11-p1', difficulty: 'Easy', title: 'Array Min & Max', prompt: 'Read N and N integers, print `min max`.', banglaHint: '`mn` ও `mx` দুটোই `a[0]` দিয়ে শুরু করো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; if(cin>>n){ vector<long long> a(n); for(auto& x:a) cin>>x; long long mn=a[0],mx=a[0]; for(auto x:a){mn=min(mn,x);mx=max(mx,x);} cout<<mn<<" "<<mx<<"\\n"; } }`, sampleStdin: '4\n-5 12 3 9', expectedOutput: '-5 12' },
      { id: 'cpp-ch11-p2', difficulty: 'Easy', title: 'Reverse Order Print', prompt: 'Read N integers and print them in reverse.', banglaHint: '`(int)a.size() - 1` থেকে `0` পর্যন্ত লুপ চালাও।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; if(cin>>n){ vector<int> a(n); for(auto& x:a) cin>>x; for(int i=n-1;i>=0;i--) cout<<a[i]<<(i?" ":"\\n"); } }`, sampleStdin: '4\n1 2 3 4', expectedOutput: '4 3 2 1' },
      { id: 'cpp-ch11-p3', difficulty: 'Medium', title: 'Count Distinct via Frequency Array', prompt: 'Given N values in [0, 1000], count how many distinct numbers appear.', banglaHint: '`freq[x]++` করে যতগুলো `freq[v] > 0` আছে তা গুনো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n,x,d=0; if(cin>>n){ vector<int> f(1001,0); for(int i=0;i<n;i++){cin>>x; f[x]++;} for(int v=0;v<=1000;v++) if(f[v]>0) d++; cout<<d<<"\\n"; } }`, sampleStdin: '6\n5 2 5 9 2 1', expectedOutput: '4' },
      { id: 'cpp-ch11-p4', difficulty: 'Medium', title: 'Second Largest Distinct Element', prompt: 'Find the second largest strictly smaller than the maximum (or -1 if none).', banglaHint: '`mx1` এবং `mx2` ট্র্যাক করে `x > mx1` ও `x < mx1 && x > mx2` আপডেট করো।', starterCode: `#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\nint main(){ int n; if(cin>>n){ vector<long long> a(n); for(auto& x:a) cin>>x; long long m1=LLONG_MIN,m2=LLONG_MIN; for(auto x:a){ if(x>m1){m2=m1;m1=x;} else if(x<m1&&x>m2) m2=x; } cout<<(m2==LLONG_MIN?-1:m2)<<"\\n"; } }`, sampleStdin: '5\n10 20 20 8 15', expectedOutput: '15' },
      { id: 'cpp-ch11-p5', difficulty: 'Hard', title: 'Missing Number in 1..N', prompt: 'Given N and N-1 unique values from 1..N, print the missing number in O(N).', banglaHint: '`1..N` যোগফল থেকে প্রদত্ত সংখ্যার যোগফল বিয়োগ করো অথবা XOR করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main(){ long long n,x,s=0; if(cin>>n){ for(long long i=0;i<n-1;i++){cin>>x; s+=x;} cout<<(n*(n+1)/2 - s)<<"\\n"; } }`, sampleStdin: '5\n1 2 4 5', expectedOutput: '3' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Mode & Frequency Analyzer',
      description: 'Read N scores in [0, 100] into a std::vector frequency table and report the most frequent value.',
      banglaGoal: 'ফ্রিকোয়েন্সি বাকেট ব্যবহার করে O(N) সময়ে সর্বাধিক বার আসা সংখ্যাটি বের করো।',
      combinesChapters: 'C++ Ch 1–11',
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    vector<int> freq(101, 0);
    for (int i = 0; i < n; i++) {
        int x = 0;
        cin >> x;
        if (x >= 0 && x <= 100) freq[x]++;
    }
    int mode = 0;
    for (int v = 1; v <= 100; v++) {
        if (freq[v] > freq[mode]) mode = v;
    }
    cout << "mode=" << mode << " count=" << freq[mode] << "\\n";
    return 0;
}`,
      sampleStdin: '5\n3 1 3 2 3',
      expectedOutput: 'mode=3 count=3',
    },
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    vector<int> freq(101, 0);
    for (int i = 0; i < n; i++) {
        int x = 0;
        cin >> x;
        if (x >= 0 && x <= 100) freq[x]++;
    }
    int mode = 0;
    for (int v = 1; v <= 100; v++) {
        if (freq[v] > freq[mode]) mode = v;
    }
    cout << "mode=" << mode << " count=" << freq[mode] << "\\n";
    return 0;
}`,
    sampleStdin: '5\n3 1 3 2 3',
    expectedSampleOutput: 'mode=3 count=3',
    testCases: [
      { id: 'cpp11-t1', input: '5\n3 1 3 2 3', expectedOutput: 'mode=3 count=3' },
      { id: 'cpp11-t2', input: '4\n7 7 2 2', expectedOutput: 'mode=2 count=2', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'C++ Chapter 12 (C++23): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'C++ অধ্যায় ১২ (C++23): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিক',
    subtitle: 'Opposite-end convergence on sorted arrays and fixed/variable sliding windows in O(N).',
    zeroIntuition: {
      plainEnglishStory:
        'A naive nested loop checking every pair `(l, r)` runs in `O(N^2)`—fatal when `N = 10^5`. Two Pointers eliminates one full loop by recognizing monotonicity: on a sorted array seeking sum `target`, if `a[l] + a[r] < target`, increasing `r` only makes things impossible (already at max end), so `l` MUST advance (`l++`); if the sum is too large, `r` MUST shrink (`r--`).\n\nSliding Window applies the same `O(N)` trick to contiguous subarrays `[l..r]`: instead of re-summing `k` items at every step, slide the frame forward by adding `a[i]` and subtracting `a[i - k]`. Because each index enters and leaves the window at most once, total work is strictly `O(N)`.',
      asciiFlowchart: `Two Pointers (Sorted Two-Sum, target=14):
  [2,  4,  7, 10, 15]
   L               R   -> 2+15=17 > 14 -> R--
   L           R       -> 2+10=12 < 14 -> L++
       L       R       -> 4+10=14 == target -> FOUND!

Fixed Sliding Window (k=3):
  [ 5, 2, 8, 1, 9 ]
  [-----] sum=15
     [-----] sum = 15 - 5 + 1 = 11`,
      pseudocode: [
        '1. TWO POINTERS: initialize l = 0, r = n - 1 on sorted vector',
        '2. COMPARE a[l] + a[r] vs target -> advance l++ if small, r-- if large',
        '3. SLIDING WINDOW (fixed k): build initial sum[0..k-1], then slide += a[i] - a[i-k]',
        '4. VARIABLE WINDOW: expand r++; while invalid shrink l++',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুই প্রান্তের ক্লিপ ও চলন্ত জানালার ফ্রেম',
        explanation:
          'মনে করো একটি লাইনে ছোট থেকে বড় হিসেবে অনেকগুলো ওজন সাজানো আছে এবং তোমাকে এমন দুটি ওজন খুঁজতে বলা হলো যাদের যোগফল ঠিক ১৪ কেজি। একজন আনাড়ি প্রোগ্রামার সব জোড়া মিলিয়ে দেখতে গিয়ে (`O(N^2)`) সময় নষ্ট করবে। কিন্তু **Two-Pointer** বুদ্ধিতে তুমি বাঁ দিকে (`L`) সবচেয়ে হালকা ও ডান দিকে (`R`) সবচেয়ে ভারী ওজনে হাত রাখবে: যদি দুইয়ের যোগফল ১৪-এর বেশি হয় তবে ভারী হাত `R` এক ধাপ বাঁয়ে সরাবে, আর কম হলে হালকা হাত `L` এক ধাপ ডানে সরাবে! এভাবে `L` আর `R` কখনোই পেছনে ফেরে না বলে মাত্র `O(N)` সময়েই সমাধান হয়ে যায়। আর **Sliding Window** হলো একটি নির্দিষ্ট মাপের কাঁচের জানালা: পরপর `k`টি সংখ্যার সর্বোচ্চ যোগফল বের করতে প্রতিবার `k`টি সংখ্যা নতুন করে যোগ না করে, ডান দিকের নতুন সংখ্যাটা যোগ আর বাঁ দিকের ফেলে আসা সংখ্যাটা বিয়োগ করলেই হয়! আর শর্তাধীন Variable Window-তে ডান প্রান্ত `r` এগোতে থাকে এবং যোগফল সীমা ছাড়ালেই বাঁ প্রান্ত `l` সঙ্কুচিত হয়। মনে রাখবে প্রতিটি উপাদান একবার ঢোকে আর সর্বোচ্চ একবার বের হয়, তাই মোট অপারেশন সবসময় `2N` অর্থাৎ `O(N)`! বড় অ্যারেতে সাম হিসাবের সময় অবশ্যই `long long` নেবে যেন ওভারফ্লো না হয়।',
        everydayExample:
          'চলন্ত ট্রেনের জানালার মতো: জানালা ১ বগি সামনে এগোলে সামনের ১টি দৃশ্য ঢোকে আর পেছনের ১টি দৃশ্য বেরিয়ে যায়—পুরো দুনিয়া নতুন করে গুনতে হয় না।',
        keyTakeaways: [
          'Two-Pointer মূলত সাজানো অ্যারেতে যোগফল খোঁজা বা প্যালিনড্রোমে `O(N)` কাজ করে।',
          'Fixed Window স্লাইডের সূত্র: `winSum += a[i] - a[i - k]`।',
          'প্রতিটি এলিমেন্ট সর্বোচ্চ একবার উইন্ডোতে ঢোকে ও একবার বের হয় বলে সময় মাত্র `O(N)`।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Sorted Two-Sum via Opposite-End Pointers',
        englishParagraphs: [
          'Starting `l = 0` and `r = n - 1` on a sorted array converges inward in at most `n - 1` steps.',
          'Each comparison eliminates either row `l` or column `r` completely.',
        ],
        banglaParagraphs: [
          'সাজানো অ্যারের দুই প্রান্তে `l` ও `r` রাখলে প্রতি ধাপে একটি করে প্রান্ত কমে আসে, ফলে সর্বোচ্চ `n` ধাপেই জোড়া পাওয়া যায়।',
          'যোগফল টার্গেটের চেয়ে বড় হলে `r--`, ছোট হলে `l++` করতে হয়।',
        ],
        memoryDiagram: `[2,4,7,10,15], target=14 -> (2+15=17>14 R--) -> (2+10=12<14 L++) -> (4+10=14 FOUND)`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {2, 4, 7, 10, 15};
    int target = 14;
    int l = 0, r = (int)a.size() - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) {
            cout << a[l] << " " << a[r] << "\\n";
            return 0;
        }
        if (s < target) l++;
        else r--;
    }
    cout << "NONE\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '4 10',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'while (l < r) {', whatItMeans: 'Ensures distinct indices l and r.', whyItIsThere: 'Prevents pairing element with itself.', ifDeletedError: 'Cannot iterate pointers.' },
          { lineNumber: 'Line 15', codeSnippet: 'if (s < target) l++; else r--;', whatItMeans: 'Monotonic pointer squeeze.', whyItIsThere: 'Guarantees O(N) convergence.', ifDeletedError: 'Infinite loop.' },
        ],
      },
      {
        id: 'cpp-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Max Sum Subarray of Fixed Length K (Sliding Window)',
        englishParagraphs: [
          'Accumulate the first `k` items once, then advance `i` from `k` to `n - 1` updating `win += a[i] - a[i - k]`.',
          'Using `long long` prevents overflow when summing large positive arrays.',
        ],
        banglaParagraphs: [
          'প্রথম `k`-টি সংখ্যা যোগ করার পর প্রতিবার `a[i]` যোগ ও `a[i - k]` বিয়োগ করলেই জানালা স্লাইড হয়ে যায়।',
          'বড় সংখ্যার যোগফলে `long long` ব্যবহার করা হয়েছে।',
        ],
        memoryDiagram: `a=[5,2,8,1,9], k=3: [5,2,8]=15 -> [2,8,1]=11 -> [8,1,9]=18 => max=18`,
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n = 0, k = 0;
    if (!(cin >> n >> k)) return 0;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long win = 0;
    for (int i = 0; i < k; i++) win += a[i];
    long long best = win;
    for (int i = k; i < n; i++) {
        win += a[i] - a[i - k];
        best = max(best, win);
    }
    cout << best << "\\n";
    return 0;
}`,
        stdin: '5 3\n5 2 8 1 9',
        expectedOutput: '18',
        lineByLine: [
          { lineNumber: 'Line 15', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Adds entering right item and drops exiting left item.', whyItIsThere: 'Keeps window size fixed at k in O(1) per step.', ifDeletedError: 'Window sum never slides.' },
        ],
      },
      {
        id: 'cpp-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Variable Sliding Window (Longest Subarray Sum <= S)',
        englishParagraphs: [
          'With non-negative integers, expanding `r` monotonically grows window sum while advancing `l` shrinks it.',
          'The inner `while (sum > S)` loop advances `l` at most `N` times total across the whole run (`O(N)` amortized).',
        ],
        banglaParagraphs: [
          'অঋণাত্মক সংখ্যার ক্ষেত্রে যোগফল `S` ছাড়ালেই `l++` করে জানালা ছোট করলে প্রতিবার `O(N)` সময়েই সর্বোচ্চ দৈর্ঘ্য পাওয়া যায়।',
          'ভেতরে `while` থাকলেও মোট `l++` সর্বোচ্চ `N` বারই ঘটে।',
        ],
        memoryDiagram: `a=[3,1,2,7,4], S=6: [3,1,2] sum=6 -> len=3`,
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<long long> a = {3, 1, 2, 7, 4};
    long long S = 6, sum = 0;
    int l = 0, best = 0;
    for (int r = 0; r < (int)a.size(); r++) {
        sum += a[r];
        while (sum > S) sum -= a[l++];
        best = max(best, r - l + 1);
    }
    cout << best << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'while (sum > S) sum -= a[l++];', whatItMeans: 'Shrinks window from left until valid again.', whyItIsThere: 'Maintains invariant sum <= S.', ifDeletedError: 'Returns whole array size even when sum > S.' },
        ],
      },
      {
        id: 'cpp-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Unchecked Negative Numbers Trap vs Sorted Deduction',
        englishParagraphs: [
          'Variable sliding window shrinks only when positive sums stay monotonic; if an array has negative values, shrinking `l` might paradoxically *increase* the sum!',
          'Use opposite-end two pointers ONLY on monotonic/sorted arrays (or non-negative arrays for variable sum windows).',
        ],
        banglaParagraphs: [
          'অ্যারেতে ঋণাত্মক সংখ্যা থাকলে সাধারণ স্লাইডিং উইন্ডো কাজ করে না, কারণ তখন `l++` করলে যোগফল কমার বদলে উল্টো বেড়ে যেতে পারে!',
          'অ-সাজানো ইনপুটে Two-Pointer চালানোর আগে অবশ্যই `sort()` করে নিতে হবে।',
        ],
        memoryDiagram: `sorted unique deduplication (read r, write slow w)`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {1, 1, 2, 2, 2, 5, 5};
    int w = 0;
    for (int r = 0; r < (int)a.size(); r++) {
        if (w == 0 || a[r] != a[w - 1]) a[w++] = a[r];
    }
    cout << "unique=" << w << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'if (w == 0 || a[r] != a[w - 1]) a[w++] = a[r];', whatItMeans: 'Slow/fast same-direction pointers deduplicating in O(1) space.', whyItIsThere: 'Overwrites duplicates cleanly in-place.', ifDeletedError: 'w remains 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 6', codeSnippet: 'vector<int> a = {2, 4, 7, 10, 15};', whatItMeans: 'Sorted input vector prerequisite for Two-Sum pointer squeeze.', whyItIsThere: 'Monotonicity guarantees l++ grows sum and r-- shrinks sum.', ifDeletedError: 'Missing data.' },
      { lineNumber: 'Line 8', codeSnippet: 'int l = 0, r = (int)a.size() - 1;', whatItMeans: 'Places left pointer at start and right pointer at end.', whyItIsThere: 'Covers widest possible pair first.', ifDeletedError: 'Pointers undeclared.' },
      { lineNumber: 'Line 10', codeSnippet: 'int s = a[l] + a[r];', whatItMeans: 'Computes current pair sum in O(1).', whyItIsThere: 'Decides pointer direction.', ifDeletedError: 'Cannot compare against target.' },
      { lineNumber: 'Line 15', codeSnippet: 'if (s < target) l++; else r--;', whatItMeans: 'Moves inward strictly one step.', whyItIsThere: 'Converges in at most N iterations.', ifDeletedError: 'Infinite loop.' },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: '2 + 15 = 17 > 14', note: 'Sum too big -> r-- to 3' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: '2 + 10 = 12 < 14', note: 'Sum too small -> l++ to 1' },
      { step: 3, state: 'l=1, r=3', memoryOrStack: '4 + 10 = 14 == 14', note: 'Match found -> print 4 10' },
      { step: 4, state: 'return 0', memoryOrStack: '3 steps total', note: 'O(N) termination' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Running Two Pointers on Unsorted Array', brokenCode: `vector<int> a = {10, 2, 15, 4}; // NOT sorted!`, fixedCode: `sort(a.begin(), a.end());`, whyItBreaks: 'Moving l++ only guarantees a larger sum when elements are sorted.' },
      { title: 'Trap 2: Allowing l <= r in Two-Distinct-Elements Sum', brokenCode: `while (l <= r) { if (a[l] + a[r] == target) ... }`, fixedCode: `while (l < r) { ... }`, whyItBreaks: 'When l == r, a[l] + a[r] reuses the exact same element twice.' },
      { title: 'Trap 3: Variable Window on Negative Numbers', brokenCode: `// a contains -5! while (sum > S) sum -= a[l++];`, fixedCode: `// Use prefix sums + deque/map when negative elements exist!`, whyItBreaks: 'Dropping a negative number increases window sum instead of shrinking it.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch12-p1', difficulty: 'Easy', title: 'Sorted Pair With Given Sum', prompt: 'Given N, target, and N sorted numbers, print `YES` if a pair sums to target else `NO`.', banglaHint: 'দুই প্রান্তে `l=0, r=n-1` বসিয়ে যোগফল মেলাও।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; long long t; if(cin>>n>>t){ vector<long long> a(n); for(auto& x:a)cin>>x; int l=0,r=n-1; bool ok=false; while(l<r){long long s=a[l]+a[r]; if(s==t){ok=true;break;} if(s<t)l++; else r--;} cout<<(ok?"YES":"NO")<<"\\n"; } }`, sampleStdin: '5 14\n2 4 7 10 15', expectedOutput: 'YES' },
      { id: 'cpp-ch12-p2', difficulty: 'Easy', title: 'Maximum K-Window Sum', prompt: 'Given N, K, and N numbers, print max sum of K consecutive elements.', banglaHint: 'প্রথম `K` যোগ করে `win += a[i] - a[i - k]` দিয়ে স্লাইড করো।', starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n,k; if(cin>>n>>k){ vector<long long> a(n); for(auto& x:a)cin>>x; long long w=0; for(int i=0;i<k;i++)w+=a[i]; long long b=w; for(int i=k;i<n;i++){w+=a[i]-a[i-k];b=max(b,w);} cout<<b<<"\\n"; } }`, sampleStdin: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'cpp-ch12-p3', difficulty: 'Medium', title: 'Longest Subarray Sum <= S', prompt: 'Given N, S, and N positive integers, output max subarray length with sum <= S.', banglaHint: '`sum > S` হলে `while` লুপে `sum -= a[l++]` করো।', starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n; long long S; if(cin>>n>>S){ vector<long long> a(n); for(auto& x:a)cin>>x; long long s=0; int l=0,b=0; for(int r=0;r<n;r++){s+=a[r]; while(s>S) s-=a[l++]; b=max(b,r-l+1);} cout<<b<<"\\n"; } }`, sampleStdin: '5 6\n3 1 2 7 4', expectedOutput: '3' },
      { id: 'cpp-ch12-p4', difficulty: 'Medium', title: 'Move All Zeros to End', prompt: 'Shift non-zero elements forward preserving order, placing zeros at end.', banglaHint: '`w` রাইট-পয়েন্টার রেখে অ-শূন্য সংখ্যা সামনে আনো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; if(cin>>n){ vector<int> a(n); for(auto& x:a)cin>>x; int w=0; for(int r=0;r<n;r++) if(a[r]!=0) swap(a[w++], a[r]); for(int i=0;i<n;i++) cout<<a[i]<<(i+1<n?" ":"\\n"); } }`, sampleStdin: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 'cpp-ch12-p5', difficulty: 'Hard', title: 'Container With Most Water', prompt: 'Given heights `h[0..n-1]`, print max `min(h[l], h[r]) * (r - l)`.', banglaHint: 'যে দিকের উচ্চতা ছোট, সেই পয়েন্টারটি ভেতরের দিকে সরাবে।', starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n; if(cin>>n){ vector<long long> h(n); for(auto& x:h)cin>>x; int l=0,r=n-1; long long best=0; while(l<r){ best=max(best,min(h[l],h[r])*(r-l)); if(h[l]<h[r]) l++; else r--; } cout<<best<<"\\n"; } }`, sampleStdin: '5\n1 8 6 2 5', expectedOutput: '15' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Max K-Window Sliding Engine',
      description: 'Compute maximum contiguous sum of length K using O(1) incremental window shifts.',
      banglaGoal: 'স্লাইডিং উইন্ডো পদ্ধতিতে `K` দৈর্ঘ্যের সর্বোচ্চ সাবঅ্যারে যোগফল নির্ণয় করো।',
      combinesChapters: 'C++ Ch 1–12',
      starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n = 0, k = 0;
    if (!(cin >> n >> k)) return 0;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long win = 0;
    for (int i = 0; i < k; i++) win += a[i];
    long long best = win;
    for (int i = k; i < n; i++) {
        win += a[i] - a[i - k];
        best = max(best, win);
    }
    cout << best << "\\n";
    return 0;
}`,
      sampleStdin: '5 3\n5 2 8 1 9',
      expectedOutput: '18',
    },
    starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n = 0, k = 0;
    if (!(cin >> n >> k)) return 0;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long win = 0;
    for (int i = 0; i < k; i++) win += a[i];
    long long best = win;
    for (int i = k; i < n; i++) {
        win += a[i] - a[i - k];
        best = max(best, win);
    }
    cout << best << "\\n";
    return 0;
}`,
    sampleStdin: '5 3\n5 2 8 1 9',
    expectedSampleOutput: '18',
    testCases: [
      { id: 'cpp12-t1', input: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'cpp12-t2', input: '4 2\n4 1 3 7', expectedOutput: '10', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'C++ Chapter 13 (C++23): Prefix Sums & Difference Arrays',
    banglaTitle: 'C++ অধ্যায় ১৩ (C++23): প্রিফিক্স সাম ও ডিফারেন্স অ্যারে (CP গেম-চেঞ্জার)',
    subtitle: '1-based cumulative prefix arrays pref[R] - pref[L-1] and O(1) difference array range updates diff[L] += V, diff[R+1] -= V.',
    zeroIntuition: {
      plainEnglishStory:
        'Imagine answering $10^5$ range sum queries `[L, R]` over an array of $10^5$ elements. Looping from `L` to `R` per query requires $10^{10}$ operations—an immediate Time Limit Exceeded (TLE). **Prefix Sums** precompute running totals `pref[i] = pref[i - 1] + a[i]` once in `O(N)` time, turning EVERY `[L, R]` range sum into a single `O(1)` subtraction: `pref[R] - pref[L - 1]`.\n\nIts twin, the **Difference Array**, reverses the problem: when given $10^5$ range increments `+V` on `[L, R]`, adding `diff[L] += V` and `diff[R + 1] -= V` marks only two boundary ticks in `O(1)`. One final prefix sum sweep reconstructs every updated value in `O(N)`.',
      asciiFlowchart: `Array a (1-based): [  _,  3,  2,  5,  1 ]
Prefix pref[]:     [  0,  3,  5, 10, 11 ]   <-- pref[i] = pref[i-1] + a[i]
Query sum(2..4):   pref[4] - pref[1] = 11 - 3 = 8  (O(1) instant!)`,
      pseudocode: [
        '1. ALLOCATE 1-based vector<long long> pref(n + 1, 0) so pref[0] = 0',
        '2. PRECOMPUTE pref[i] = pref[i - 1] + a[i] once in O(N)',
        '3. ANSWER each 1-based [L, R] sum query via pref[r] - pref[l - 1] in O(1)',
        '4. APPLY range add [L, R] += V using diff[l] += V, diff[r + 1] -= V then sweep',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেললাইনের মাইলফলক ও গেটে চিহ্ন দিয়ে রাখা',
        explanation:
          'ধরো ঢাকা থেকে চট্টগ্রামের পথে প্রতিটি স্টেশনের দূরত্ব লেখা আছে এবং ১ লাখ যাত্রী জানতে চাইলো ৩ নম্বর স্টেশন থেকে ১৫০ নম্বর স্টেশনের দূরত্ব কত। প্রতিবার মাঝের সব দূরত্ব যোগ করলে `10^10` ধাপ লেগে টাইম লিমিট শেষ হয়ে যাবে! এর জাদুকরী সমাধান হলো **Prefix Sum**: শুরুতেই ০ থেকে প্রতিটি স্টেশনের মোট দূরত্ব (`pref[i] = pref[i-1] + a[i]`) একটি ১-বেসড অ্যারেতে জমা রাখো (যেমন `pref[0] = 0`)। এরপর ৩ থেকে ১৫০ নম্বর স্টেশনের দূরত্ব জানতে চাইলে কেবল `pref[150] - pref[2]` করলেই `O(1)` সময়ে উত্তর চলে আসবে! আর ঠিক এর উল্টো কাজ করে **Difference Array**: ধরো ১ লাখ বার বলা হলো `[L, R]` রেঞ্জের প্রতিটি উপাদানের সাথে `V` যোগ করো। লুপ চালিয়ে সবগুলো বদলানোর বদলে শুধু `diff[L] += V` এবং `diff[R + 1] -= V` লিখে রাখো (`O(1)` প্রতি আপডেট)! সবার শেষে পুরো `diff` অ্যারেতে একবার প্রিফিক্স সাম চালালেই প্রতিটি ঘরের আসল মান `O(N)` সময়ে বের হয়ে আসবে। প্রিফিক্স সাম সবসময় `long long` টাইপে নেবে, নইলে বড় যোগফলে `int` ওভারফ্লো হবে।',
        everydayExample:
          'হাইওয়ের মাইলফলক ০ কিমি থেকে শুরু করে প্রতিটি শহরের দূরত্ব লেখা থাকলে দুই শহরের মধ্যকার দূরত্ব শুধু বড় মাইলফলক থেকে ছোটটি বিয়োগ করলেই মেলে।',
        keyTakeaways: [
          '`pref` অ্যারেটি `1`-based (`n + 1` সাইজ, `pref[0] = 0`) রাখলে `L = 1` কেসে `pref[L - 1]` কখনোই নেগেটিভ ইনডেক্সে যায় না।',
          'প্রিফিক্স যোগফলে অবশ্যই `vector<long long>` ব্যবহার করবে যাতে $10^5 \\times 10^9$ যোগফলে ওভারফ্লো না হয়।',
          'ডিফারেন্স অ্যারে `diff` সাইজ `n + 2` রাখলে `diff[R + 1] -= V` কখনো আউট-অফ-বাউন্ড হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-13-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1-Based Prefix Sum Array & Instant Range Queries',
        englishParagraphs: [
          'Sizing `pref(n + 1, 0)` avoids special `if (L == 0)` branches altogether.',
          'Always use `long long` because sums of $10^5$ elements exceed 32-bit `int` easily.',
        ],
        banglaParagraphs: [
          '`n + 1` সাইজের `pref` অ্যারে তৈরি করে `pref[0] = 0` রাখলে আলাদা কোনো শর্ত ছাড়াই `pref[r] - pref[l - 1]` কাজ করে।',
          'বড় যোগফলের জন্য `long long` রাখা হয়েছে।',
        ],
        memoryDiagram: `a=[3,2,5,1] -> pref=[0,3,5,10,11] -> sum(2..4)=11-3=8`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> a = {3, 2, 5, 1};
    int n = (int)a.size();
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i - 1];
    cout << "sum(2..4)=" << (pref[4] - pref[1]) << "\\n";
    cout << "sum(1..3)=" << (pref[3] - pref[0]) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum(2..4)=8\nsum(1..3)=10',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'pref[i] = pref[i - 1] + a[i - 1];', whatItMeans: 'Accumulates running total at 1-based slot i.', whyItIsThere: 'Precomputes all prefix totals in O(N).', ifDeletedError: 'All queries return 0.' },
        ],
      },
      {
        id: 'cpp-ch-13-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast Q Range Sum Queries From Stdin',
        englishParagraphs: [
          'Reads `N, Q`, builds `pref` once, and answers all `Q` `[l, r]` queries in `O(1)` each.',
          'Total complexity is `O(N + Q)` instead of `O(N * Q)`.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে `N` ও `Q` পড়ে `pref` বানিয়ে প্রতি কুয়েরি `O(1)` সময়ে উত্তর প্রিন্ট করে।',
          'সব কুয়েরির মোট খরচ মাত্র `O(N + Q)`।',
        ],
        memoryDiagram: `pref=[0,2,6,7,12] -> q(2,4)=10, q(1,3)=7`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << (pref[r] - pref[l - 1]) << "\\n";
    }
    return 0;
}`,
        stdin: '4 2\n2 4 1 5\n2 4\n1 3',
        expectedOutput: '10\n7',
        lineByLine: [
          { lineNumber: 'Line 19', codeSnippet: 'cout << (pref[r] - pref[l - 1]) << "\\n";', whatItMeans: 'Computes subarray sum [l..r] with one subtraction.', whyItIsThere: 'O(1) query answer regardless of interval length.', ifDeletedError: 'Queries emit no output.' },
        ],
      },
      {
        id: 'cpp-ch-13-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(1) Range Updates via Difference Array',
        englishParagraphs: [
          'Given `M` updates adding `V` to `[L, R]`, update only `diff[L] += V` and `diff[R + 1] -= V`.',
          'A single running-sum loop reconstructs the final array cleanly.',
        ],
        banglaParagraphs: [
          'প্রতিটি `[L, R] += V` আপডেটের জন্য কেবল শুরুতে `+V` এবং শেষের পরের ঘরে `-V` চিহ্ন দিয়ে রাখা হয়েছে।',
          'সবশেষে একবার প্রিফিক্স সাম চালালেই চূড়ান্ত মানগুলো পাওয়া যায়।',
        ],
        memoryDiagram: `diff size n+2: [1..3]+=2 -> +2 at 1, -2 at 4 -> final=[2,2,2,0]`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 5;
    vector<long long> diff(n + 2, 0);
    auto addRange = [&](int l, int r, long long v) {
        diff[l] += v;
        diff[r + 1] -= v;
    };
    addRange(1, 3, 2);
    addRange(2, 5, 3);
    long long run = 0;
    for (int i = 1; i <= n; i++) {
        run += diff[i];
        cout << run << (i < n ? " " : "\\n");
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: '2 5 5 3 3',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'diff[r + 1] -= v;', whatItMeans: 'Cancels the +v boost right after index r ends.', whyItIsThere: 'Isolates effect strictly to interval [l, r].', ifDeletedError: 'Updates bleed infinitely to index n.' },
        ],
      },
      {
        id: 'cpp-ch-13-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: '0-Based Out-of-Bounds & 32-Bit Overflow Trap vs Equilibrium Index',
        englishParagraphs: [
          'Using 0-based prefix sums invites crashes on `pref[l - 1]` when `l == 0`, while `vector<int>` overflows past $2.14 \\times 10^9$.',
          '1-based `vector<long long>` lets you compute left vs right equilibrium sums cleanly in `O(N)`.',
        ],
        banglaParagraphs: [
          '০-বেসড প্রিফিক্সে `l == 0` হলে `pref[-1]` ক্র্যাশ করে এবং `int` সহজেই ওভারফ্লো হয়!',
          '১-বেসড `long long` প্রিফিক্স দিয়ে বাম-ডান সমান যোগফলের পিভট সহজেই মেলে।',
        ],
        memoryDiagram: `[1,7,3,6,5,6] -> at 1-based idx 4: left=11, right=11`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> a = {1, 7, 3, 6, 5, 6};
    int n = (int)a.size();
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) p[i] = p[i - 1] + a[i - 1];
    int pivot = -1;
    for (int i = 1; i <= n; i++) {
        if (p[i - 1] == p[n] - p[i]) { pivot = i - 1; break; }
    }
    cout << "pivot=" << pivot << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'pivot=3',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'if (p[i - 1] == p[n] - p[i])', whatItMeans: 'Compares strict left prefix against strict right suffix in O(1).', whyItIsThere: 'Finds equilibrium index without repeated slicing.', ifDeletedError: 'pivot remains -1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 8', codeSnippet: 'vector<long long> pref(n + 1, 0);', whatItMeans: 'Allocates 1-based 64-bit prefix array seeded with 0.', whyItIsThere: 'Prevents negative index access at L=1 and integer overflow.', ifDeletedError: 'pref undeclared.' },
      { lineNumber: 'Line 9', codeSnippet: 'for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i - 1];', whatItMeans: 'Builds cumulative totals in one O(N) pass.', whyItIsThere: 'Prepares O(1) range query lookup.', ifDeletedError: 'Queries always return 0.' },
      { lineNumber: 'Line 10', codeSnippet: 'cout << "sum(2..4)=" << (pref[4] - pref[1]) << "\\n";', whatItMeans: 'Subtracts prefix before L from prefix at R.', whyItIsThere: 'Returns exact interval sum in O(1).', ifDeletedError: 'Output omitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'pref[0] = 0', memoryOrStack: 'pref=[0, 0, 0, 0, 0]', note: 'Dummy base prevents L=1 branch' },
      { step: 2, state: 'i=1..2', memoryOrStack: 'pref[1]=3, pref[2]=5', note: '3 + 2' },
      { step: 3, state: 'i=3..4', memoryOrStack: 'pref[3]=10, pref[4]=11', note: 'Cumulative array complete' },
      { step: 4, state: 'Query (2..4)', memoryOrStack: '11 - 3 = 8', note: 'Matches 2 + 5 + 1 in O(1)' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Negative Index on 0-Based Prefix Sum', brokenCode: `ans = pref[r] - pref[l - 1]; // Crash when l == 0!`, fixedCode: `// Always use 1-based pref(n + 1, 0) for 1-based [l, r]!`, whyItBreaks: 'Accessing pref[-1] causes undefined behavior / memory corruption in C++.' },
      { title: 'Trap 2: 32-bit int Overflow in Prefix Sum', brokenCode: `vector<int> pref(n + 1, 0);`, fixedCode: `vector<long long> pref(n + 1, 0);`, whyItBreaks: 'Adding 10^5 values around 10^9 reaches 10^14, overflowing signed 32-bit int.' },
      { title: 'Trap 3: Difference Array Too Small for R + 1', brokenCode: `vector<long long> diff(n + 1, 0); diff[r + 1] -= v; // Out of bounds when r == n!`, fixedCode: `vector<long long> diff(n + 2, 0);`, whyItBreaks: 'When right endpoint equals n, r + 1 equals n + 1, requiring size n + 2.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch13-p1', difficulty: 'Easy', title: '1-Based Range Sum Queries', prompt: 'Given N, Q, array, and Q pairs (L, R), output each sum in O(1).', banglaHint: '`pref` অ্যারে ১-বেসড নিয়ে `pref[r] - pref[l - 1]` প্রিন্ট করো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n,q; if(cin>>n>>q){ vector<long long> p(n+1,0); for(int i=1;i<=n;i++){long long x;cin>>x;p[i]=p[i-1]+x;} while(q--){int l,r;cin>>l>>r;cout<<(p[r]-p[l-1])<<"\\n";} } }`, sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'cpp-ch13-p2', difficulty: 'Easy', title: 'Pivot / Equilibrium Index', prompt: 'Find first 0-based index where left sum equals right sum (`-1` if none).', banglaHint: '`p[i - 1] == p[n] - p[i]` শর্ত মিলিয়ে দেখো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; if(cin>>n){ vector<long long> p(n+1,0); for(int i=1;i<=n;i++){long long x;cin>>x;p[i]=p[i-1]+x;} int ans=-1; for(int i=1;i<=n;i++) if(p[i-1]==p[n]-p[i]){ans=i-1;break;} cout<<ans<<"\\n"; } }`, sampleStdin: '6\n1 7 3 6 5 6', expectedOutput: '3' },
      { id: 'cpp-ch13-p3', difficulty: 'Medium', title: 'Difference Array Range Increments', prompt: 'Apply U updates `(l, r, v)` to an initially zero array of size N, output final array.', banglaHint: '`diff[l] += v; diff[r + 1] -= v;` করে শেষে প্রিফিক্স যোগ করো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n,u; if(cin>>n>>u){ vector<long long> d(n+2,0); while(u--){int l,r;long long v;cin>>l>>r>>v; d[l]+=v; d[r+1]-=v;} long long run=0; for(int i=1;i<=n;i++){run+=d[i]; cout<<run<<(i<n?" ":"\\n");} } }`, sampleStdin: '5 2\n1 3 2\n2 5 3', expectedOutput: '2 5 5 3 3' },
      { id: 'cpp-ch13-p4', difficulty: 'Medium', title: 'Running Prefix Maximum', prompt: 'Output prefix maximum `max(a[0..i])` at each step.', banglaHint: 'প্রতি ধাপে `mx = max(mx, a[i])` হালনাগাদ করো।', starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main(){ int n; if(cin>>n){ long long mx=0; for(int i=0;i<n;i++){long long x;cin>>x; mx=(i==0?x:max(mx,x)); cout<<mx<<(i+1<n?" ":"\\n");} } }`, sampleStdin: '5\n3 1 5 2 6', expectedOutput: '3 3 5 5 6' },
      { id: 'cpp-ch13-p5', difficulty: 'Hard', title: 'Subarray Sum Divisible by K Count', prompt: 'Count non-empty subarrays whose sum is divisible by `K`.', banglaHint: '`rem = ((pref % K) + K) % K` এর ফ্রিকোয়েন্সি গোনো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main(){ int n; long long k; if(cin>>n>>k){ vector<long long> cnt(k,0); cnt[0]=1; long long s=0,ans=0; for(int i=0;i<n;i++){long long x;cin>>x; s=(s+x%k+k)%k; ans+=cnt[s]; cnt[s]++;} cout<<ans<<"\\n"; } }`, sampleStdin: '5 3\n4 5 0 2 1', expectedOutput: '5' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N + Q) Prefix Range Query Engine',
      description: 'Precompute 1-based 64-bit prefix sums and answer all [L, R] queries in O(1).',
      banglaGoal: '১-বেসড `long long` প্রিফিক্স সাম তৈরি করে প্রতিটি রেঞ্জ যোগফল `O(1)` সময়ে উত্তর দাও।',
      combinesChapters: 'C++ Ch 1–13',
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << (pref[r] - pref[l - 1]) << "\\n";
    }
    return 0;
}`,
      sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
      expectedOutput: '10\n7',
    },
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << (pref[r] - pref[l - 1]) << "\\n";
    }
    return 0;
}`,
    sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
    expectedSampleOutput: '10\n7',
    testCases: [
      { id: 'cpp13-t1', input: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'cpp13-t2', input: '3 1\n10 20 30\n1 3', expectedOutput: '60', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'C++ Chapter 14 (C++23): Strings, std::string & Manipulation',
    banglaTitle: 'C++ অধ্যায় ১৪ (C++23): স্ট্রিং, ক্যারেক্টার অ্যারে ও ম্যানিপুলেশন',
    subtitle: 'Mutable std::string, Small String Optimization (SSO), ASCII case math, palindromes, and anagram checks.',
    zeroIntuition: {
      plainEnglishStory:
        'Unlike Java or Python where strings are immutable, C++ `std::string` is **mutable** in-place (`s[0] = \'A\'`), null-terminated safely, and stores short strings (typically $\\le 15$–$22$ chars) directly inside stack bytes via **Small String Optimization (SSO)** without touching the heap.\n\nAppending characters with `s.push_back(c)` or `s += c` runs in `O(1)` amortized time—whereas writing `s = s + c` inside a loop reallocates and copies the whole string every iteration (`O(N^2)`!). Combine ASCII arithmetic (`ch - \'a\'` into `[26]` frequency arrays) with two pointers to solve palindromes and anagrams cleanly in `O(N)`.',
      asciiFlowchart: `std::string s = "racecar"   (size=7, SSO stack buffer — zero heap!)
  index:   0   1   2   3   4   5   6
  bytes: ['r'|'a'|'c'|'e'|'c'|'a'|'r'|'\\0']
           l->                   <-r   (palindrome O(N) check!)`,
      pseudocode: [
        '1. MUTATE std::string directly in-place or append with push_back / += in O(1)',
        '2. MAP lowercase letters via int idx = ch - \'a\' into a 26-slot array',
        '3. CHECK palindromes with l = 0, r = s.size() - 1 two pointers',
        '4. AVOID s = s + c inside loops to prevent O(N^2) copy blowups',
      ],
      banglaZeroToHero: {
        analogyTitle: 'পরিবর্তনযোগ্য অক্ষরের ফিতা ও ২৬ ঘরের বর্ণমালা বাক্স',
        explanation:
          'পাইথন বা জাভার মতো C++-এ `std::string` স্থির বা immutable নয়—বরং তুমি সরাসরি `s[0] = \'A\'` লিখে ভেতরের অক্ষর বদলে ফেলতে পারো! ছোট স্ট্রিং হলে আধুনিক C++ কম্পাইলার হিপ মেমোরি না ছুঁয়েই **SSO (Small String Optimization)** প্রযুক্তি ব্যবহার করে স্ট্যাকের ভেতরেই স্ট্রিং রেখে দেয়, ফলে গতি হয় অবিশ্বাস্য! স্ট্রিংয়ের সাথে অক্ষর যোগ করার সময় লুপের ভেতরে কখনো `s = s + c` লিখবে না—এতে প্রতিবার পুরো স্ট্রিং কপি হয়ে `O(N^2)` টাইম লিমিট খেয়ে যায়; এর বদলে সবসময় `s.push_back(c)` বা `s += c` লিখবে যা `O(1)` সময়ে চলে। ইংরেজি ছোট হাতের বর্ণ (`a` থেকে `z`) গণনা করার জন্য `int cnt[26] = {0}` নিয়ে প্রতি অক্ষরে `cnt[ch - \'a\']++` করলেই `O(N)` সময়ে অ্যানাগ্রাম (Anagram) বা সবচেয়ে বেশি থাকা অক্ষর বের করা যায়। এছাড়া `cin >> word` এর পরে `getline(cin, line)` চালালে বাফারের `\n` সরানোর জন্য অবশ্যই `cin >> ws` বা `cin.ignore()` দিতে হবে।',
        everydayExample:
          'স্ল্যাটের ওপর চকের লেখা মুছে সরাসরি ঠিক করা যায় (`std::string`), কিন্তু প্রতিবার নতুন কাগজে সব অক্ষর আবার লিখতে গেলে (`s = s + c`) হাত ব্যথা হয়ে যাবে!',
        keyTakeaways: [
          'লুপে স্ট্রিং বড় করতে `s += c` বা `s.push_back(c)` ব্যবহার করবে (`s = s + c` নয়)।',
          'অক্ষর গণনার জন্য `int freq[26] = {0}` ও `ch - \'a\'` ইনডেক্স সবচেয়ে দ্রুত ও সহজ।',
          '`cin >> n` এর পর পুরো লাইন পড়তে `getline(cin >> ws, line)` দিলে বাড়তি নিউলাইন সমস্যা করে না।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-14-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'In-Place Mutation & Two-Pointer Palindrome Check',
        englishParagraphs: [
          'Normalize ASCII uppercase letters via `tolower` or `c + (\'a\' - \'A\')`, then compare opposite ends.',
          'All mutations happen inside `s` with zero extra string copies.',
        ],
        banglaParagraphs: [
          'ইন-প্লেস অক্ষর পরিবর্তন ও দুই প্রান্ত থেকে `l < r` তুলনা করে `O(N)` সময়ে প্যালিনড্রোম যাচাই করা হয়েছে।',
          'কোনো বাড়তি স্ট্রিং কপি ছাড়াই পুরো কাজ সম্পন্ন হয়।',
        ],
        memoryDiagram: `"RaceCar" -> lower "racecar" -> l=0..2 match r=6..4 => YES`,
        code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s = "RaceCar";
    for (char& c : s) c = (char)tolower((unsigned char)c);
    int l = 0, r = (int)s.size() - 1;
    bool ok = true;
    while (l < r) {
        if (s[l++] != s[r--]) { ok = false; break; }
    }
    cout << s << " -> " << (ok ? "PALINDROME" : "NO") << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'racecar -> PALINDROME',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'for (char& c : s) c = (char)tolower((unsigned char)c);', whatItMeans: 'Mutates each char reference to lowercase safely.', whyItIsThere: 'Makes palindrome check case-insensitive without extra copy.', ifDeletedError: 'Uppercase R fails match against lowercase r.' },
        ],
      },
      {
        id: 'cpp-ch-14-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(N) Anagram Checker Using 26-Letter Frequency Array',
        englishParagraphs: [
          'Two lowercase strings are anagrams iff they have identical length and matching `[26]` counts.',
          'Incrementing for `a[i]` and decrementing for `b[i]` verifies every count hits `0`.',
        ],
        banglaParagraphs: [
          'প্রথম স্ট্রিংয়ের জন্য `freq[a[i] - \'a\']++` এবং দ্বিতীয়টির জন্য `--` করলে সব ঘর `0` থাকলে অ্যানাগ্রাম প্রমাণিত হয়।',
          'সর্টিংয়ের `O(N log N)` থেকে এটি `O(N)` সময়ে দ্রুততর।',
        ],
        memoryDiagram: `"listen" +1, "silent" -1 => all 26 buckets == 0 => YES`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    if (!(cin >> a >> b)) return 0;
    if (a.size() != b.size()) {
        cout << "NO\\n";
        return 0;
    }
    int freq[26] = {0};
    for (size_t i = 0; i < a.size(); i++) {
        freq[a[i] - 'a']++;
        freq[b[i] - 'a']--;
    }
    bool ok = true;
    for (int c : freq) if (c != 0) ok = false;
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
        stdin: 'listen\nsilent',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'freq[a[i] - \'a\']++; freq[b[i] - \'a\']--;', whatItMeans: 'Balances letter frequencies in a single pass.', whyItIsThere: 'O(N) anagram verification without sorting.', ifDeletedError: 'Always prints YES falsely.' },
        ],
      },
      {
        id: 'cpp-ch-14-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Run-Length Encoding (Compression) via push_back',
        englishParagraphs: [
          'Compresses consecutive identical characters like `"aaabbc"` into `"a3b2c1"` using `push_back` and `to_string`.',
          'Appends directly to the result buffer in linear `O(N)` time.',
        ],
        banglaParagraphs: [
          'পাশাপাশি একই অক্ষর গুনে `res.push_back(ch)` ও `res += to_string(cnt)` করে `O(N)` সময়ে কম্প্রেস করা হয়েছে।',
          'প্রতি ধাপে কেবল ইন-প্লেস বাফার বাড়ে।',
        ],
        memoryDiagram: `"aaabbc" -> "a3b2c1"`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "aaabbc", out;
    for (size_t i = 0; i < s.size(); ) {
        size_t j = i;
        while (j < s.size() && s[j] == s[i]) j++;
        out.push_back(s[i]);
        out += to_string(j - i);
        i = j;
    }
    cout << out << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'a3b2c1',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'out.push_back(s[i]);', whatItMeans: 'Appends character in O(1) amortized time.', whyItIsThere: 'Avoids quadratic reallocation.', ifDeletedError: 'Missing character prefix before count.' },
        ],
      },
      {
        id: 'cpp-ch-14-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(N^2) s = s + c & cin >> + getline Trap vs Safe Input',
        englishParagraphs: [
          'Writing `res = res + ch` copies `res` every iteration (`O(N^2)` TLE on `10^5` chars); `res += ch` mutates in place (`O(N)`).',
          'Also, mixing `cin >> n` and `getline(cin, line)` reads an empty leftover newline unless you flush leading whitespace with `getline(cin >> ws, line)`.',
        ],
        banglaParagraphs: [
          '`s = s + ch` লিখলে প্রতিবার পুরো স্ট্রিং কপি হয়; সবসময় `s += ch` বা `s.push_back(ch)` লিখবে।',
          '`cin >> n`-এর পরে লাইন পড়তে `getline(cin >> ws, line)` দিলে নিউলাইন আটকায় না।',
        ],
        memoryDiagram: `TRAP: cin >> n; getline(cin, s) -> "" | FIX: getline(cin >> ws, s)`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int k;
    string line;
    if (cin >> k) {
        getline(cin >> ws, line);
        cout << k << ":" << line << "\\n";
    }
    return 0;
}`,
        stdin: '3\nArgon Academy',
        expectedOutput: '3:Argon Academy',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'getline(cin >> ws, line);', whatItMeans: 'Consumes buffered whitespace/newline before reading full line.', whyItIsThere: 'Prevents empty-string read bug after cin >>.', ifDeletedError: 'line reads empty string "".' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 7', codeSnippet: 'string s = "RaceCar";', whatItMeans: 'Creates mutable std::string buffer in SSO stack space.', whyItIsThere: 'Allows in-place character modification.', ifDeletedError: 's undeclared.' },
      { lineNumber: 'Line 8', codeSnippet: 'for (char& c : s) c = (char)tolower((unsigned char)c);', whatItMeans: 'Converts every char in-place via reference.', whyItIsThere: 'Prepares case-insensitive check.', ifDeletedError: 'Mixed case fails comparison.' },
      { lineNumber: 'Line 11', codeSnippet: 'while (l < r) {', whatItMeans: 'Two-pointer convergence from outer characters inward.', whyItIsThere: 'Checks palindrome in O(N) time and O(1) space.', ifDeletedError: 'Comparison skipped.' },
    ],
    dryRunTable: [
      { step: 1, state: 'lowercase pass', memoryOrStack: 's = "racecar"', note: 'Mutated in place' },
      { step: 2, state: 'l=0, r=6', memoryOrStack: "'r' == 'r'", note: 'l=1, r=5' },
      { step: 3, state: 'l=1..2, r=5..4', memoryOrStack: "'a'=='a', 'c'=='c'", note: 'l=3, r=3' },
      { step: 4, state: 'l < r false', memoryOrStack: 'ok = true', note: 'Outputs PALINDROME' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: O(N^2) String Building With s = s + ch', brokenCode: `for (char c : input) ans = ans + c; // Copies whole ans every step!`, fixedCode: `for (char c : input) ans.push_back(c);`, whyItBreaks: 's = s + c allocates a new string every character, timing out for 10^5 characters.' },
      { title: 'Trap 2: Empty String Read After cin >> n', brokenCode: `cin >> n; getline(cin, line); // Reads ""!`, fixedCode: `cin >> n; getline(cin >> ws, line);`, whyItBreaks: 'cin >> leaves the trailing newline in stdin which getline immediately stops on.' },
      { title: 'Trap 3: Unsigned size() - 1 Underflow on Empty String', brokenCode: `for (size_t i = 0; i < s.size() - 1; i++) // Wraps to 18446744073709551615 when s == ""!`, fixedCode: `for (size_t i = 0; i + 1 < s.size(); i++)`, whyItBreaks: 'size() is unsigned; subtracting 1 from 0 wraps to huge integer causing crash.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch14-p1', difficulty: 'Easy', title: 'Reverse Words / String', prompt: 'Read a single word and print it reversed.', banglaHint: '`l = 0, r = s.size() - 1` নিয়ে `swap(s[l++], s[r--])` করো।', starterCode: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main(){ string s; if(cin>>s){ reverse(s.begin(),s.end()); cout<<s<<"\\n"; } }`, sampleStdin: 'argon', expectedOutput: 'nogra' },
      { id: 'cpp-ch14-p2', difficulty: 'Easy', title: 'Count Vowels Case-Insensitively', prompt: 'Read a line of text and print total vowels (`a, e, i, o, u`).', banglaHint: '`tolower` করে প্রতিটি অক্ষর ভাওয়েল কি না পরীক্ষা করো।', starterCode: `#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nint main(){ string s; getline(cin>>ws,s); int c=0; for(unsigned char ch:s){char l=(char)tolower(ch); if(l=='a'||l=='e'||l=='i'||l=='o'||l=='u')c++;} cout<<c<<"\\n"; }`, sampleStdin: 'Hello Argon', expectedOutput: '4' },
      { id: 'cpp-ch14-p3', difficulty: 'Medium', title: 'Anagram Check (26-Bucket)', prompt: 'Read two lowercase strings and print `YES` if anagrams else `NO`.', banglaHint: '`int freq[26] = {0}` দিয়ে প্রথমটিতে `+1` ও দ্বিতীয়টিতে `-1` করো।', starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string a,b; if(cin>>a>>b){ if(a.size()!=b.size()){cout<<"NO\\n";return 0;} int f[26]={0}; for(size_t i=0;i<a.size();i++){f[a[i]-'a']++;f[b[i]-'a']--;} bool ok=true; for(int x:f) if(x!=0) ok=false; cout<<(ok?"YES":"NO")<<"\\n"; } }`, sampleStdin: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'cpp-ch14-p4', difficulty: 'Medium', title: 'Run-Length String Compression', prompt: 'Compress consecutive identical chars (e.g. `aaabbc` -> `a3b2c1`).', banglaHint: '`push_back` এবং `to_string` ব্যবহার করে আউটপুট জোড়া দাও।', starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s,out; if(cin>>s){ for(size_t i=0;i<s.size();){size_t j=i; while(j<s.size()&&s[j]==s[i])j++; out.push_back(s[i]); out+=to_string(j-i); i=j;} cout<<out<<"\\n"; } }`, sampleStdin: 'aaabbc', expectedOutput: 'a3b2c1' },
      { id: 'cpp-ch14-p5', difficulty: 'Hard', title: 'First Non-Repeating Character Index', prompt: 'Find 0-based index of first unique lowercase char (`-1` if none).', banglaHint: '`freq[26]` বানিয়ে দ্বিতীয়বার স্ট্রিং স্ক্যান করে `freq[s[i] - \'a\'] == 1` খুঁজো।', starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string s; if(cin>>s){ int f[26]={0}; for(char c:s)f[c-'a']++; int ans=-1; for(int i=0;i<(int)s.size();i++) if(f[s[i]-'a']==1){ans=i;break;} cout<<ans<<"\\n"; } }`, sampleStdin: 'loveleetcode', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Anagram & Frequency Inspector',
      description: 'Compare two lowercase strings cleanly using a 26-letter frequency array in O(N) time.',
      banglaGoal: '২৬ ঘরের ফ্রিকোয়েন্সি অ্যারে ব্যবহার করে দুটি স্ট্রিং অ্যানাগ্রাম কি না `O(N)` সময়ে যাচাই করো।',
      combinesChapters: 'C++ Ch 1–14',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    if (!(cin >> a >> b)) return 0;
    if (a.size() != b.size()) {
        cout << "NO\\n";
        return 0;
    }
    int freq[26] = {0};
    for (size_t i = 0; i < a.size(); i++) {
        freq[a[i] - 'a']++;
        freq[b[i] - 'a']--;
    }
    bool ok = true;
    for (int x : freq) {
        if (x != 0) ok = false;
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      sampleStdin: 'listen\nsilent',
      expectedOutput: 'YES',
    },
    starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    if (!(cin >> a >> b)) return 0;
    if (a.size() != b.size()) {
        cout << "NO\\n";
        return 0;
    }
    int freq[26] = {0};
    for (size_t i = 0; i < a.size(); i++) {
        freq[a[i] - 'a']++;
        freq[b[i] - 'a']--;
    }
    bool ok = true;
    for (int x : freq) {
        if (x != 0) ok = false;
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
    sampleStdin: 'listen\nsilent',
    expectedSampleOutput: 'YES',
    testCases: [
      { id: 'cpp14-t1', input: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'cpp14-t2', input: 'rat\ncar', expectedOutput: 'NO', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'C++ Chapter 15 (C++23): Recursion & Call Stack Visualization — Merger 3',
    banglaTitle: 'C++ অধ্যায় ১৫ (C++23): রিকার্সন ও কল-স্ট্যাক ভিজ্যুয়ালাইজেশন — মার্জার ৩',
    subtitle: 'Milestone Merger 3: Base cases, recursive stack frames, memoization vs O(2^N) explosion, and backtracking.',
    zeroIntuition: {
      plainEnglishStory:
        'Recursion solves a large problem by delegating a strictly smaller subproblem to itself until hitting a rock-solid **Base Case**. Under the hood, every recursive call pushes a brand-new **Stack Frame** (holding local parameters and return address) onto the OS Call Stack, then pops it cleanly upon `return`.\n\nTwo rules keep recursion fast and crash-free: first, a missing or unreachable base case causes **Stack Overflow** (exceeding ~1–8 MB stack RAM). Second, overlapping subtrees like naive `fib(n - 1) + fib(n - 2)` explode to `O(2^N)`—adding a memo table or using `std::string` / `std::vector` prefix indices merges all Phase 1–3 tools cleanly.',
      asciiFlowchart: `fact(3) pushes frame(n=3)
  -> calls fact(2) pushes frame(n=2)
       -> calls fact(1) returns 1   [BASE CASE HIT!]
  <- pops frame(2): 2 * 1 = 2
<- pops frame(3): 3 * 2 = 6  (LIFO Stack Unwind!)`,
      pseudocode: [
        '1. DEFINE explicit stopping Base Case FIRST inside recursive function',
        '2. SHRINK problem arguments strictly toward base case on every call',
        '3. MEMOIZE overlapping recursive states in vector<long long> to avoid O(2^N)',
        '4. TRACE stack frame depth to prevent Stack Overflow (> 10^5 deep chains)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রাশিয়ান পুতুলের ভেতর পুতুল ও প্লেটের স্তূপ (Call Stack)',
        explanation:
          'একটি ফাংশন যখন নিজেই নিজেকে ছোট ইনপুট দিয়ে ডাকে, তাকে বলে **Recursion**। ধরো তোমাকে ৫ম তলা থেকে নামতে হবে—প্রতি ধাপে তুমি শুধু এক ধাপ নেমে বাকি কাজটি নিচের ধাপের জন্য রেখে দাও, যতক্ষণ না **Base Case** (একদম নিচতলা `n <= 1`) চলে আসে! প্রতিটি কল হওয়ার সময় কম্পিউটারের **Call Stack** মেমোরিতে একটি করে নতুন প্লেটের মতো **Stack Frame** জমা হয় যেখানে ওই ধাপের লোকাল ভ্যারিয়েবল ও ফেরত আসার ঠিকানা লেখা থাকে। আর Base Case-এ পৌঁছানো মাত্র ওপর থেকে প্লেটগুলো এক এক করে নামতে থাকে (`return`) এবং গুণ-যোগ সম্পন্ন করে উত্তর ফিরিয়ে দেয়। তবে দুটি ভয়াবহ বিপদ এড়িয়ে চলতে হবে: প্রথমত, Base Case ভুল বা না থাকলে কল স্ট্যাক উপচে **Stack Overflow** ক্র্যাশ ঘটবে। দ্বিতীয়ত, `fib(n-1) + fib(n-2)`-এর মতো একই হিসাব বারবার করলে কাজ `O(2^N)` হয়ে প্রোগ্রাম থেমে যাবে—তাই `memo[n]` ভেক্টরে উত্তর জমা করে রাখলে তা `O(N)` হয়ে যায়! এই **Milestone Merger 3**-এ অ্যারে, স্ট্রিং, প্রিফিক্স ও রিকার্সন সব একত্রে মিলে শক্তিশালী সমস্যা সমাধানের ভিত্তি তৈরি করে।',
        everydayExample:
          'সিনেমা হলের পেছনের সারি থেকে সামনে কানে কানে সিট নম্বর গুণতে গুণতে ১ নম্বর সারিতে পৌঁছানো এবং ১ নম্বর সারি থেকে উত্তর পেছনে ফেরত আসা—এটাই কল-স্ট্যাক!',
        keyTakeaways: [
          'রিকার্সিভ ফাংশনের প্রথম লাইনই হতে হবে সুস্পষ্ট **Base Case** যাতে অসীম কল না হয়।',
          'প্রতিবার ইনপুট ছোট না হলে (`n - 1` বা `n / 2`) কল স্ট্যাক ভরে **Stack Overflow** হয়।',
          'একই উপ-সমস্যা বারবার এলে `vector<long long> memo(n + 1, -1)` দিয়ে মেমোয়াইজেশন করলে `O(2^N)` কমে `O(N)` হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-15-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Recursive Sum & Factorial Call Stack Unwind',
        englishParagraphs: [
          'Base case `if (n <= 1) return 1;` halts recursion cleanly before popping each stack frame in LIFO order.',
          'Always return `long long` for factorials since `13!` already overflows 32-bit `int`.',
        ],
        banglaParagraphs: [
          '`if (n <= 1) return 1;` হলো বেস কেস—এর পর স্ট্যাক ফ্রেমগুলো উল্টো ক্রমে খুলে গুণফল ফেরত দেয়।',
          'ফ্যাক্টোরিয়াল খুব দ্রুত বড় হয় বলে `long long` রিটার্ন রাখা হয়েছে।',
        ],
        memoryDiagram: `fact(5) -> 5*fact(4) -> 4*fact(3) -> 3*fact(2) -> 2*1 = 120`,
        code: `#include <iostream>
using namespace std;

long long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}

int main() {
    cout << "5!=" << fact(5) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '5!=120',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'if (n <= 1) return 1;', whatItMeans: 'Base case terminating recursive descent.', whyItIsThere: 'Prevents infinite negative calls and stack overflow.', ifDeletedError: 'Stack overflow segmentation fault.' },
        ],
      },
      {
        id: 'cpp-ch-15-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Divide-and-Conquer Fast Modular Power (O(log e))',
        englishParagraphs: [
          'Computing `a^e % mod` via binary recursion (`half = modPow(a, e / 2, mod)`) shrinks exponent `e` by half each frame (`~30` stack frames for `e = 10^9`!).',
          'Handles huge modular exponents in microseconds.',
        ],
        banglaParagraphs: [
          'বাইনারি রিকার্সনে প্রতি ধাপে `e / 2` করায় `10^9` ঘাতের জন্য স্ট্যাকে মাত্র ৩০টি ফ্রেম লাগে!',
          '`O(log e)` সময়ে নিখুঁত মডুলার পাওয়ার মেলে।',
        ],
        memoryDiagram: `modPow(2, 10) -> half(5) -> half(2) -> half(1) -> O(log e)`,
        code: `#include <iostream>
using namespace std;

long long modPow(long long a, long long e, long long m) {
    if (e == 0) return 1 % m;
    long long half = modPow(a, e / 2, m);
    long long res = (half * half) % m;
    if (e & 1) res = (res * (a % m)) % m;
    return res;
}

int main() {
    long long a, e, m;
    if (cin >> a >> e >> m) cout << modPow(a, e, m) << "\\n";
    return 0;
}`,
        stdin: '2 10 1000',
        expectedOutput: '24',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'long long half = modPow(a, e / 2, m);', whatItMeans: 'Recursively solves half exponent once instead of calling modPow twice.', whyItIsThere: 'Keeps complexity O(log e) rather than O(e).', ifDeletedError: 'Slow linear recursion.' },
        ],
      },
      {
        id: 'cpp-ch-15-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Memoized Fibonacci (O(2^N) -> O(N) Dynamic Programming Bridge)',
        englishParagraphs: [
          'Storing computed answers in `vector<long long>& memo` turns exponential recursion into linear `O(N)` execution.',
          'Each `fib(k)` state computes once and hits cache forever after.',
        ],
        banglaParagraphs: [
          'হিসাব করা মান `memo[n]` ভেক্টরে রেখে দিলে পুনরাবৃত্তি বন্ধ হয়ে `O(2^N)` কমে `O(N)` সময়ে চলে আসে।',
          'এটিই ডায়নামিক প্রোগ্রামিংয়ের প্রথম ধাপ।',
        ],
        memoryDiagram: `memo[4]=3 cached -> fib(5) reads memo[4]+memo[3] directly in O(1)`,
        code: `#include <iostream>
#include <vector>
using namespace std;

long long fibMemo(int n, vector<long long>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}

int main() {
    int n = 40;
    vector<long long> memo(n + 1, -1);
    cout << "fib(40)=" << fibMemo(n, memo) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'fib(40)=102334155',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if (memo[n] != -1) return memo[n];', whatItMeans: 'Returns cached result immediately on repeat subproblems.', whyItIsThere: 'Collapses exponential recursion tree into linear chain.', ifDeletedError: 'fib(40) repeats billions of calls.' },
        ],
      },
      {
        id: 'cpp-ch-15-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Missing Base Case / Unmemoized Tree vs Recursive Palindrome',
        englishParagraphs: [
          'Passing `const string& s` by reference instead of by value keeps every recursive frame `O(1)` in memory—passing strings by value allocates `O(N^2)` stack copies!',
          'Combining references with recursion cleanly bridges Arrays/Strings (Ch 11–14) into Call Stack mastery.',
        ],
        banglaParagraphs: [
          'রিকার্সিভ ফাংশনে `string s` ভ্যালু হিসেবে পাস না করে `const string& s` রেফারেন্স দিলে প্রতিটি ফ্রেমে অহেতুক স্ট্রিং কপি হয় না।',
          'দুই প্রান্ত `l >= r` হলেই বেস কেস `true` রিটার্ন করে।',
        ],
        memoryDiagram: `isPal(s, 0, n-1) -> O(1) frame size via const string&`,
        code: `#include <iostream>
#include <string>
using namespace std;

bool isPal(const string& s, int l, int r) {
    if (l >= r) return true;
    if (s[l] != s[r]) return false;
    return isPal(s, l + 1, r - 1);
}

int main() {
    string s = "madam";
    cout << (isPal(s, 0, (int)s.size() - 1) ? "YES" : "NO") << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'bool isPal(const string& s, int l, int r) {', whatItMeans: 'Borrows string by const reference inside each call frame.', whyItIsThere: 'Prevents O(N) substring copies per recursion depth.', ifDeletedError: 'isPal undefined.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 4', codeSnippet: 'long long fact(int n) {', whatItMeans: 'Recursive factorial returning 64-bit integer.', whyItIsThere: 'Prevents 32-bit overflow past 12!.', ifDeletedError: 'fact undefined.' },
      { lineNumber: 'Line 5', codeSnippet: 'if (n <= 1) return 1;', whatItMeans: 'Base case stopping infinite call growth.', whyItIsThere: 'Guarantees call stack unwinds back toward main().', ifDeletedError: 'Stack overflow crash.' },
      { lineNumber: 'Line 6', codeSnippet: 'return n * fact(n - 1);', whatItMeans: 'Pushes smaller subproblem frame and multiplies on unwind.', whyItIsThere: 'Implements n! = n * (n - 1)! recursively.', ifDeletedError: 'Returns undefined value.' },
    ],
    dryRunTable: [
      { step: 1, state: 'call fact(5)', memoryOrStack: 'stack: [5]', note: 'Waits for fact(4)' },
      { step: 2, state: 'descend 4..2', memoryOrStack: 'stack: [5,4,3,2]', note: 'Pushes 4 frames' },
      { step: 3, state: 'fact(1) base', memoryOrStack: 'returns 1', note: 'Stack unwinds LIFO' },
      { step: 4, state: 'unwind to main', memoryOrStack: '2*1=2 -> 6 -> 24 -> 120', note: 'Prints 5!=120' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Calling modPow(a, e/2) Twice Inside Same Expression', brokenCode: `return (modPow(a, e/2, m) * modPow(a, e/2, m)) % m; // Still O(e)!`, fixedCode: `long long h = modPow(a, e/2, m); long long r = (h * h) % m;`, whyItBreaks: 'Two recursive calls create a full binary tree of size e instead of O(log e).' },
      { title: 'Trap 2: Missing Base Case or Non-Shrinking Argument', brokenCode: `int f(int n) { return n * f(n); } // Stack Overflow!`, fixedCode: `int f(int n) { if (n <= 1) return 1; return n * f(n - 1); }`, whyItBreaks: 'Infinite stack frame allocation exhausts thread stack memory immediately.' },
      { title: 'Trap 3: Copying Large Vectors/Strings By Value in Recursion', brokenCode: `bool pal(string s, int l, int r) // Copies whole string on every frame!`, fixedCode: `bool pal(const string& s, int l, int r)`, whyItBreaks: 'Each call copies N bytes, degrading O(N) into O(N^2) time and memory.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch15-p1', difficulty: 'Easy', title: 'Recursive Factorial (long long)', prompt: 'Read `n` (`0 <= n <= 20`) and recursively print `n!`.', banglaHint: '`n <= 1` হলে `1` রিটার্ন করো।', starterCode: `#include <iostream>\nusing namespace std;\nlong long fact(int n){ return n<=1 ? 1LL : n*fact(n-1); }\nint main(){ int n; if(cin>>n) cout<<fact(n)<<"\\n"; }`, sampleStdin: '6', expectedOutput: '720' },
      { id: 'cpp-ch15-p2', difficulty: 'Easy', title: 'Recursive Digit Sum', prompt: 'Sum digits of integer `n` recursively (`(n % 10) + sumDigits(n / 10)`).', banglaHint: '`n == 0` হলে `0`, নইলে `n % 10 + f(n / 10)`।', starterCode: `#include <iostream>\nusing namespace std;\nlong long dsum(long long n){ return n==0 ? 0 : (n%10)+dsum(n/10); }\nint main(){ long long n; if(cin>>n) cout<<dsum(n)<<"\\n"; }`, sampleStdin: '9421', expectedOutput: '16' },
      { id: 'cpp-ch15-p3', difficulty: 'Medium', title: 'Recursive Array Sum via Const Ref', prompt: 'Read `N` and `N` ints, compute total sum recursively using index `i`.', banglaHint: '`i == n` হলে `0`, নইলে `a[i] + rec(a, i + 1)`।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nlong long rsum(const vector<long long>& a, int i){ return i==(int)a.size() ? 0 : a[i]+rsum(a,i+1); }\nint main(){ int n; if(cin>>n){ vector<long long> a(n); for(auto& x:a)cin>>x; cout<<rsum(a,0)<<"\\n"; } }`, sampleStdin: '4\n3 7 2 8', expectedOutput: '20' },
      { id: 'cpp-ch15-p4', difficulty: 'Medium', title: 'Memoized Fibonacci N', prompt: 'Read `n` (`0 <= n <= 50`) and compute `fib(n)` using recursion + memo table.', banglaHint: '`memo[n] != -1` চেক করে `O(N)` নিশ্চিত করো।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nlong long f(int n, vector<long long>& m){ if(n<=1)return n; if(m[n]!=-1)return m[n]; return m[n]=f(n-1,m)+f(n-2,m); }\nint main(){ int n; if(cin>>n){ vector<long long> m(n+1,-1); cout<<f(n,m)<<"\\n"; } }`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'cpp-ch15-p5', difficulty: 'Hard', title: 'Fast Binary Modular Power', prompt: 'Read `a, e, m` and recursively calculate `(a^e) % m` in `O(log e)`.', banglaHint: '`half = modPow(a, e / 2, m)` একবারই কল করো।', starterCode: `#include <iostream>\nusing namespace std;\nlong long mp(long long a, long long e, long long m){ if(e==0)return 1%m; long long h=mp(a,e/2,m); long long r=(h*h)%m; if(e&1)r=(r*(a%m))%m; return r; }\nint main(){ long long a,e,m; if(cin>>a>>e>>m) cout<<mp(a,e,m)<<"\\n"; }`, sampleStdin: '2 10 1000', expectedOutput: '24' },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Memoized Climbing Stairs & Prefix Validator',
      description: 'Combine Ch 1–15: arrays, loops, memoized recursion, and 64-bit arithmetic to compute ways to climb N stairs (1 or 2 steps).',
      banglaGoal: 'অধ্যায় ১–১৫ মিলিয়ে মেমোয়াইজড রিকার্সনে `N` তম সিঁড়িতে ওঠার মোট উপায় (`ways(n) = ways(n-1) + ways(n-2)`) নির্ণয় করো।',
      combinesChapters: 'C++ Ch 1–15 (Milestone Merger 3)',
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

long long ways(int n, vector<long long>& memo) {
    if (n <= 1) return 1;
    if (memo[n] != -1) return memo[n];
    return memo[n] = ways(n - 1, memo) + ways(n - 2, memo);
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> memo(n + 1, -1);
    cout << ways(n, memo) << "\\n";
    return 0;
}`,
      sampleStdin: '5',
      expectedOutput: '8',
    },
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

long long ways(int n, vector<long long>& memo) {
    if (n <= 1) return 1;
    if (memo[n] != -1) return memo[n];
    return memo[n] = ways(n - 1, memo) + ways(n - 2, memo);
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> memo(n + 1, -1);
    cout << ways(n, memo) << "\\n";
    return 0;
}`,
    sampleStdin: '5',
    expectedSampleOutput: '8',
    testCases: [
      { id: 'cpp15-t1', input: '5', expectedOutput: '8' },
      { id: 'cpp15-t2', input: '10', expectedOutput: '89', isHidden: true },
    ],
  },
};


