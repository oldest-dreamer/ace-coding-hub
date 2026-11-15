import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JAVA_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'Java Chapter 21: Sorting Comparators & Binary Search on Answer',
    banglaTitle: 'Java অধ্যায় ২১: কাস্টম সর্টিং ও বাইনারি সার্চ অন আনসার',
    subtitle: 'Master Arrays.sort / List.sort overflow-safe comparators, binarySearch boundaries, and monotonic Binary Search on Answer.',
    zeroIntuition: {
      plainEnglishStory:
        'Searching an unsorted ArrayList takes O(n) per query, collapsing to O(n*q) TLE under contest constraints. Sorting once in O(n log n) with TimSort (List.sort / Arrays.sort) enables O(log n) lowerBound and upperBound queries.\n\nBinary Search on Answer applies the same halving logic to a monotonic answer space [lo, hi]: pick mid = lo + (hi - lo) / 2, test whether capacity mid works via a greedy O(n) check, and shrink the half accordingly.',
      asciiFlowchart: `  feasible(mid): [ false, false, false, TRUE, TRUE, TRUE ]
                      lo                  ^mid       hi
  if (feasible(mid)) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }`,
      pseudocode: [
        '1. SORT array or interval records using overflow-safe Long.compare / Integer.compare',
        '2. WRITE lowerBound(a, x) and upperBound(a, x) binary searches in O(log n)',
        '3. DEFINE monotonic predicate canShip(weights, days, cap)',
        '4. LOOP while lo <= hi storing best valid ans before tightening bounds',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সাজানো ফোনবুক খোঁজা ও সর্বনিম্ন সীমা নির্ণয় (Binary Search on Answer)',
        explanation:
          'ধরো একটি ১০ লাখ পৃষ্ঠার ডিরেক্টরি থেকে একটি নির্দিষ্ট সংখ্যা খুঁজতে বলা হলো। শুরু থেকে খুঁজতে গেলে সময় শেষ হয়ে যাবে, কিন্তু সাজানো ডেটায় মাঝখান থেকে ভাগ করে খুঁজলে মাত্র ২০ ধাপেই সঠিক অবস্থান মেলে! Java-তে Collections.sort বা Arrays.sort দিয়ে O(n log n) সময়ে ডেটা সাজিয়ে নিলে lowerBound ও upperBound লিখে মুহূর্তেই যেকোনো সংখ্যার অবস্থান ও ফ্রিকোয়েন্সি বের করা যায়। তার চেয়েও শক্তিশালী কৌশল হলো Binary Search on Answer। যখনই কোনো সমস্যায় "সর্বনিম্ন কত ট্রাক ক্যাপাসিটি হলে D দিনে সব মাল পৌঁছানো যাবে" এ ধরনের শর্ত থাকে, তখন সম্ভাব্য উত্তরের সীমা [lo, hi] ধরে মাঝের উত্তর mid নিয়ে একটি সাধারণ O(n) লুপে যাচাই করা হয়। কাজটি সম্ভব হলে আরও ছোট উত্তর খুঁজতে hi = mid - 1 করা হয়, আর অসম্ভব হলে lo = mid + 1। মনে রাখবে Java-তে কখনো কম্পারেটরে (a - b) লিখবে না, বড় সংখ্যায় ওভারফ্লো হয়; সবসময় Integer.compare বা Long.compare ব্যবহার করবে।',
        everydayExample: 'জুতার সাইজ ঠিক করা: মাঝারি সাইজ পরে দেখে ছোট বা বড় সাইজ বাছাই করলে ৩–৪ চেষ্টাতেই নিখুঁত মাপ মিলে যায়।',
        keyTakeaways: [
          'কম্পারেটরে সবসময় Integer.compare / Long.compare ব্যবহার করবে, কখনো (a - b) নয়।',
          'mid = lo + (hi - lo) / 2 লিখলে বড় long মানের যোগফলেও ওভারফ্লো হয় না।',
          'Binary Search on Answer-এ সম্ভাব্য উত্তর ans আলাদা সেভ করে তারপর hi বা lo আপডেট করতে হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Custom lowerBound & upperBound Frequency Count',
        englishParagraphs: [
          'Unlike Arrays.binarySearch (which returns any matching index), writing lowerBound and upperBound gives exact first index and duplicate count.',
        ],
        banglaParagraphs: [
          'Arrays.binarySearch ডুপ্লিকেটে যেকোনো ইনডেক্স দেয়; নিজের lowerBound ও upperBound লিখলে প্রথম ইনডেক্স ও মোট সংখ্যা পাওয়া যায়।',
        ],
        memoryDiagram: `[2, 5, 5, 5, 9] -> lb(5)=1, ub(5)=4 -> count=3`,
        code: `import java.util.*;

public class Main {
    static int lowerBound(int[] a, int x) {
        int lo = 0, hi = a.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] >= x) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    static int upperBound(int[] a, int x) {
        int lo = 0, hi = a.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] > x) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    public static void main(String[] args) {
        int[] a = {9, 5, 2, 5, 5};
        Arrays.sort(a);
        int lo = lowerBound(a, 5), hi = upperBound(a, 5);
        System.out.println(lo + " " + (hi - lo));
    }
}`,
        stdin: '',
        expectedOutput: '1 3',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'if (a[mid] >= x) hi = mid; else lo = mid + 1;',
            whatItMeans: 'Narrows search to first index where element is >= x.',
            whyItIsThere: 'Guarantees exact leftmost boundary across duplicates.',
            ifDeletedError: 'Cannot isolate first duplicate occurrence.',
          },
          {
            lineNumber: 'Line 24',
            codeSnippet: 'System.out.println(lo + " " + (hi - lo));',
            whatItMeans: 'Outputs starting index and exact frequency in O(log n).',
            whyItIsThere: 'upperBound - lowerBound equals occurrences of x.',
            ifDeletedError: 'No result printed.',
          },
        ],
      },
      {
        id: 'java-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Minimum Capacity to Ship Packages Within D Days',
        englishParagraphs: [
          'Binary search capacity between max(weights) and sum(weights) using long arithmetic to prevent overflow.',
        ],
        banglaParagraphs: [
          'long ডেটা টাইপ ব্যবহার করে সর্বোচ্চ ওজন থেকে মোট ওজনের মধ্যে সর্বনিম্ন শিপিং ক্যাপাসিটি খুঁজো।',
        ],
        memoryDiagram: `lo=5, hi=15 -> ans=6`,
        code: `import java.util.*;

public class Main {
    static boolean canShip(long[] w, long days, long cap) {
        long used = 1, cur = 0;
        for (long x : w) {
            if (cur + x > cap) { used++; cur = 0; }
            cur += x;
        }
        return used <= days;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(); long d = sc.nextLong();
        long[] w = new long[n];
        long lo = 0, hi = 0;
        for (int i = 0; i < n; i++) { w[i] = sc.nextLong(); lo = Math.max(lo, w[i]); hi += w[i]; }
        long ans = hi;
        while (lo <= hi) {
            long mid = lo + (hi - lo) / 2;
            if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;
        }
        System.out.println(ans);
    }
}`,
        stdin: '5 3\n1 2 3 4 5',
        expectedOutput: '6',
        lineByLine: [
          {
            lineNumber: 'Line 21',
            codeSnippet: 'long mid = lo + (hi - lo) / 2;',
            whatItMeans: 'Computes overflow-safe 64-bit midpoint.',
            whyItIsThere: 'Avoids overflow on sum of large weights.',
            ifDeletedError: 'Midpoint candidate missing.',
          },
        ],
      },
      {
        id: 'java-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Interval Scheduling With Record & Comparator',
        englishParagraphs: [
          'Sort interval records by finish time ascending using Comparator.comparingLong to pick maximum non-overlapping tasks.',
        ],
        banglaParagraphs: [
          'record ও Comparator.comparingLong দিয়ে মিটিং শেষের সময় অনুযায়ী সর্ট করে গ্রিডিভাবে নির্বাচন।',
        ],
        memoryDiagram: `record Interval(start, end) -> sort by end -> count non-overlapping`,
        code: `import java.util.*;

public class Main {
    record Interval(long s, long e) {}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Interval> iv = new ArrayList<>();
        for (int i = 0; i < n; i++) iv.add(new Interval(sc.nextLong(), sc.nextLong()));
        iv.sort(Comparator.comparingLong(Interval::e).thenComparingLong(Interval::s));
        long last = Long.MIN_VALUE; int cnt = 0;
        for (var p : iv) {
            if (p.s() >= last) { cnt++; last = p.e(); }
        }
        System.out.println(cnt);
    }
}`,
        stdin: '4\n1 5\n2 3\n3 6\n5 8',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'iv.sort(Comparator.comparingLong(Interval::e).thenComparingLong(Interval::s));',
            whatItMeans: 'Sorts by end time safely without 64-bit narrowing cast.',
            whyItIsThere: 'Greedy earliest-finish maximizes remaining schedule room.',
            ifDeletedError: 'Suboptimal start-time order lowers interval count.',
          },
        ],
      },
      {
        id: 'java-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Primitive int[] TimSort Trap vs. List<Integer>',
        englishParagraphs: [
          'Arrays.sort(int[]) uses Dual-Pivot Quicksort which has worst-case O(n^2) on crafted inputs; Collections.sort/List.sort uses TimSort O(n log n) guaranteed.',
        ],
        banglaParagraphs: [
          'কন্টেস্টে Arrays.sort(int[])-এ হ্যাক হতে পারে; List<Integer>-এ TimSort সবসময় O(n log n) নিশ্চিত করে।',
        ],
        memoryDiagram: `Arrays.sort(int[]) worst O(n^2) vs Collections.sort(List) guaranteed O(n log n)`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        long lo = 0, hi = Math.min(n, 2_000_000_000L), ans = 0;
        while (lo <= hi) {
            long m = lo + (hi - lo) / 2;
            if (m * m <= n) { ans = m; lo = m + 1; } else hi = m - 1;
        }
        System.out.println(ans);
    }
}`,
        stdin: '50',
        expectedOutput: '7',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'long lo = 0, hi = Math.min(n, 2_000_000_000L), ans = 0;',
            whatItMeans: 'Caps upper bound to avoid m*m overflowing signed 64-bit long.',
            whyItIsThere: 'Keeps m * m safely under Long.MAX_VALUE.',
            ifDeletedError: 'For n > 3e9, m * m could wrap negative!',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'static int lowerBound(int[] a, int x) {',
        whatItMeans: 'Binary search finding first element >= x.',
        whyItIsThere: 'Handles duplicates deterministically unlike Arrays.binarySearch.',
        ifDeletedError: 'lowerBound method missing.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'if (a[mid] >= x) hi = mid; else lo = mid + 1;',
        whatItMeans: 'Narrows search to first index where element is >= x.',
        whyItIsThere: 'Guarantees exact leftmost boundary across duplicates.',
        ifDeletedError: 'Cannot isolate first duplicate occurrence.',
      },
      {
        lineNumber: 'Line 22',
        codeSnippet: 'Arrays.sort(a);',
        whatItMeans: 'Orders array elements ascending before binary search.',
        whyItIsThere: 'Unsorted arrays break binary search monotonicity.',
        ifDeletedError: 'lowerBound/upperBound return wrong positions.',
      },
      {
        lineNumber: 'Line 24',
        codeSnippet: 'System.out.println(lo + " " + (hi - lo));',
        whatItMeans: 'Outputs starting index and exact frequency in O(log n).',
        whyItIsThere: 'upperBound - lowerBound equals occurrences of x.',
        ifDeletedError: 'No result printed.',
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
        title: 'Trusting Arrays.binarySearch() to Return First Duplicate Index',
        brokenCode: `int idx = Arrays.binarySearch(a, 5); // returns middle 5, not first 5!`,
        fixedCode: `int idx = lowerBound(a, 5);`,
        whyItBreaks: 'Standard library binarySearch may land on any duplicate index.',
      },
      {
        title: 'Using (int)(a - b) When Sorting Long Values',
        brokenCode: `list.sort((a, b) -> (int)(a.e() - b.e()));`,
        fixedCode: `list.sort(Comparator.comparingLong(Interval::e));`,
        whyItBreaks: 'Casting a large long difference to int truncates bits and flips the sign.',
      },
      {
        title: 'Overflowing mid * mid When hi = n is 10^14',
        brokenCode: `long hi = n; if (mid * mid <= n)`,
        fixedCode: `long hi = Math.min(n, 2_000_000_000L); // or mid <= n / mid`,
        whyItBreaks: '(5e13)^2 overflows 64-bit long immediately.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-21-p1',
        difficulty: 'Easy',
        title: 'First Index & Count Query',
        prompt: 'Read n, x, and n integers; sort and print first index and frequency (-1 0 if absent).',
        banglaHint: 'ইঙ্গিত: lowerBound এবং upperBound মেথড লিখে ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static int lb(int[] a, int x){ int l=0,r=a.length; while(l<r){int m=l+(r-l)/2; if(a[m]>=x)r=m; else l=m+1;} return l; }\n    static int ub(int[] a, int x){ int l=0,r=a.length; while(l<r){int m=l+(r-l)/2; if(a[m]>x)r=m; else l=m+1;} return l; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), x = sc.nextInt();\n        int[] a = new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt();\n        Arrays.sort(a);\n        int l = lb(a, x), r = ub(a, x);\n        System.out.println(l == r ? "-1 0" : (l + " " + (r - l)));\n    }\n}`,
        sampleStdin: '6 4\n7 4 1 4 9 4',
        expectedOutput: '1 3',
      },
      {
        id: 'java-ch-21-p2',
        difficulty: 'Easy',
        title: 'Floor Integer Square Root',
        prompt: 'Find largest integer m such that m*m <= n using binary search.',
        banglaHint: 'ইঙ্গিত: hi কে Math.min(n, 2_000_000_000L) এ সীমাবদ্ধ রাখো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n        long lo = 0, hi = Math.min(n, 2_000_000_000L), ans = 0;\n        while (lo <= hi) { long m = lo + (hi - lo) / 2; if (m * m <= n) { ans = m; lo = m + 1; } else hi = m - 1; }\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '101',
        expectedOutput: '10',
      },
      {
        id: 'java-ch-21-p3',
        difficulty: 'Medium',
        title: 'Koko Eating Bananas Speed Search',
        prompt: 'Given n piles and h hours, find minimum integer speed k to eat all piles within h hours.',
        banglaHint: 'ইঙ্গিত: প্রতিটি স্তূপে (x + k - 1) / k ঘণ্টা যোগ করে h এর সাথে তুলনা করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long h = sc.nextLong();\n        long[] p = new long[n]; long lo = 1, hi = 1;\n        for (int i = 0; i < n; i++) { p[i] = sc.nextLong(); hi = Math.max(hi, p[i]); }\n        long ans = hi;\n        while (lo <= hi) {\n            long k = lo + (hi - lo) / 2, hrs = 0;\n            for (long x : p) hrs += (x + k - 1) / k;\n            if (hrs <= h) { ans = k; hi = k - 1; } else lo = k + 1;\n        }\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-21-p4',
        difficulty: 'Medium',
        title: 'Max Non-Overlapping Events',
        prompt: 'Read n [start, end] intervals and print maximum mutually non-overlapping intervals.',
        banglaHint: 'ইঙ্গিত: end অনুযায়ী সর্ট করে s >= cur হলে কাউন্ট বাড়াও।',
        starterCode: `import java.util.*;\npublic class Main {\n    record Ev(long s, long e) {}\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); List<Ev> list = new ArrayList<>();\n        for (int i = 0; i < n; i++) list.add(new Ev(sc.nextLong(), sc.nextLong()));\n        list.sort(Comparator.comparingLong(Ev::e));\n        long cur = Long.MIN_VALUE; int ans = 0;\n        for (var p : list) if (p.s() >= cur) { ans++; cur = p.e(); }\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '4\n1 4\n2 3\n3 5\n4 6',
        expectedOutput: '2',
      },
      {
        id: 'java-ch-21-p5',
        difficulty: 'Hard',
        title: 'Aggressive Cows Max Min Distance',
        prompt: 'Given n stall coordinates and c cows, maximize minimum distance between any two cows.',
        banglaHint: 'ইঙ্গিত: স্টলগুলো সর্ট করে সম্ভাব্য দূরত্বের ওপর Binary Search চালাও।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), c = sc.nextInt();\n        long[] x = new long[n]; for (int i = 0; i < n; i++) x[i] = sc.nextLong();\n        Arrays.sort(x);\n        long lo = 1, hi = x[n - 1] - x[0], ans = 0;\n        while (lo <= hi) {\n            long mid = lo + (hi - lo) / 2, last = x[0]; int placed = 1;\n            for (int i = 1; i < n; i++) if (x[i] - last >= mid) { placed++; last = x[i]; }\n            if (placed >= c) { ans = mid; lo = mid + 1; } else hi = mid - 1;\n        }\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '5 3\n1 2 8 4 9',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Binary Search on Answer Capacity Solver',
      description: 'Binary search minimum truck capacity across [max(weights), sum(weights)] using a greedy simulation predicate.',
      banglaGoal: 'Binary Search on Answer দিয়ে D দিনে প্যাক ডেলিভারির সর্বনিম্ন ক্যাপাসিটি নির্ণয় করা।',
      combinesChapters: 'Ch 11, 20, 21',
      starterCode: `import java.util.*;\npublic class Main {\n    static boolean canShip(long[] w, long days, long cap) {\n        long used = 1, cur = 0;\n        for (long x : w) { if (cur + x > cap) { used++; cur = 0; } cur += x; }\n        return used <= days;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(); long d = sc.nextLong();\n        long[] w = new long[n]; long lo = 0, hi = 0;\n        for (int i = 0; i < n; i++) { w[i] = sc.nextLong(); lo = Math.max(lo, w[i]); hi += w[i]; }\n        long ans = hi;\n        while (lo <= hi) {\n            long mid = lo + (hi - lo) / 2;\n            if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;\n        }\n        System.out.println(ans);\n    }\n}`,
      sampleStdin: '5 3\n1 2 3 4 5',
      expectedOutput: '6',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    static boolean canShip(long[] w, long days, long cap) {\n        long used = 1, cur = 0;\n        for (long x : w) { if (cur + x > cap) { used++; cur = 0; } cur += x; }\n        return used <= days;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(); long d = sc.nextLong();\n        long[] w = new long[n]; long lo = 0, hi = 0;\n        for (int i = 0; i < n; i++) { w[i] = sc.nextLong(); lo = Math.max(lo, w[i]); hi += w[i]; }\n        long ans = hi;\n        while (lo <= hi) {\n            long mid = lo + (hi - lo) / 2;\n            if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;\n        }\n        System.out.println(ans);\n    }\n}`,
    sampleStdin: '5 3\n1 2 3 4 5',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'java21-t1', input: '5 3\n1 2 3 4 5', expectedOutput: '6' },
      { id: 'java21-t2', input: '4 2\n10 10 10 10', expectedOutput: '20', isHidden: true },
    ],
  },
  22: {
    chapterNumber: 22,
    title: 'Java Chapter 22: Hashing, HashMap, Sets & Sliding Window Frequency',
    banglaTitle: 'Java অধ্যায় ২২: হ্যাশিং, HashMap, সেট ও স্লাইডিং উইন্ডো ফ্রিকোয়েন্সি',
    subtitle: 'Solve O(n) Two-Sum, longest unique substring, and exact-K subarray sums with HashMap/HashSet and sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Java’s HashMap and HashSet deliver O(1) expected lookup by hashing keys into buckets (converting long collision chains into balanced red-black trees automatically in Java 8+). Storing running prefix sum counts inside HashMap<Long, Long> counts exact-K subarrays in O(n) even when negative values appear.\n\nFor string and array subwindows without duplicates, combining a sliding window [L..R] with a fast last-seen lookup array lets you maintain window invariants in a single pass.',
      asciiFlowchart: `  pref += a[i] ---> lookup cnt.getOrDefault(pref - k, 0L)
       |
       +--> cnt.merge(pref, 1L, Long::sum)
       |
  Window [L..R]: last[ch] >= L -> jump L = last[ch] + 1`,
      pseudocode: [
        '1. INITIALIZE HashMap<Long, Long> cnt with cnt.put(0L, 1L)',
        '2. SCAN array accumulating prefix sum pref += x',
        '3. ADD cnt.getOrDefault(pref - k, 0L) to running match count',
        '4. UPDATE cnt.merge(pref, 1L, Long::sum) in O(1)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দ্রুতগতির বারকোড সূচি ও চলমান জানালা (HashMap + Sliding Window)',
        explanation:
          'ধরো একটি ১০ লাখ রেকর্ডের ভেতর কোনো একটি সংখ্যা আগে ছিল কি না বারবার খুঁজতে হচ্ছে। লিস্টে খুঁজলে পুরো প্রোগ্রাম স্লো হয়ে TLE খাবে, কিন্তু Java-র HashMap আর HashSet গড় O(1) সময়ে মুহূর্তেই উত্তর এনে দেয়! Prefix Sum-এর সাথে HashMap জুড়ে দিলে অসাধারণ একটি ফল পাওয়া যায়: নেগেটিভ সংখ্যা থাকলেও pref - k আগে কতবার এসেছে তা দেখেই O(n) সময়ে ঠিক K-যোগফলের সব সাব-অ্যারে গুনে ফেলা যায়। অন্যদিকে স্ট্রিংয়ের ডুপ্লিকেটমুক্ত দীর্ঘতম অংশ খুঁজতে দুই প্রান্তে L ও R পয়েন্টার নিয়ে Sliding Window ব্যবহার করা হয়। Java-তে নিজের তৈরি কোনো ক্লাসকে HashMap-এর কী বানাতে চাইলে অবশ্যই equals() ও hashCode() উভয়ই সঠিকভাবে ওভাররাইড করতে হয় (অথবা Java 21-এর record ব্যবহার করলে তা স্বয়ংক্রিয়ভাবে হয়ে যায়)।',
        everydayExample: 'হোটেলের ডিজিটাল কী-কার্ড: গেস্টের নাম স্ক্যান করেই তাৎক্ষণিক রুম নম্বর বের করা।',
        keyTakeaways: [
          'Prefix Sum হ্যাশ টেবিলে শুরুতে cnt.put(0L, 1L) রাখা বাধ্যতামূলক।',
          'getOrDefault(key, 0L) ব্যবহার করলে NullPointerException-এর ঝুঁকি থাকে না।',
          'Java record স্বয়ংক্রিয়ভাবে সঠিক equals() ও hashCode() তৈরি করে দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(n) Two-Sum Using HashMap',
        englishParagraphs: [
          'Check if (target - a[i]) exists in HashMap before putting a[i] -> i.',
        ],
        banglaParagraphs: [
          'HashMap-এ সংখ্যা ও ইনডেক্স রেখে O(n) সময়ে Two-Sum সমাধান।',
        ],
        memoryDiagram: `seen.put(2, 0) -> x=7 checks seen.containsKey(2) -> prints "0 1"`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] a = {2, 7, 11, 15};
        int target = 9;
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < a.length; i++) {
            Integer j = seen.get(target - a[i]);
            if (j != null) {
                System.out.println(j + " " + i);
                return;
            }
            seen.put(a[i], i);
        }
    }
}`,
        stdin: '',
        expectedOutput: '0 1',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'Integer j = seen.get(target - a[i]);',
            whatItMeans: 'Looks up complement index in one hash lookup.',
            whyItIsThere: 'Avoids double lookup (containsKey + get).',
            ifDeletedError: 'Cannot retrieve matching earlier index.',
          },
        ],
      },
      {
        id: 'java-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Subarray Sums Equals K Using HashMap<Long, Long>',
        englishParagraphs: [
          'Seed cnt.put(0L, 1L), accumulate prefix sums, and sum cnt.getOrDefault(pref - k, 0L).',
        ],
        banglaParagraphs: [
          'HashMap<Long, Long> এ শুরুতে (0L, 1L) রেখে নেগেটিভ সংখ্যা থাকলেও K-যোগফল সাব-অ্যারে গুণো।',
        ],
        memoryDiagram: `cnt={0:1} -> pref=1,3,2,3,5 -> ans=3`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(); long k = sc.nextLong();
        Map<Long, Long> cnt = new HashMap<>();
        cnt.put(0L, 1L);
        long pref = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            pref += sc.nextLong();
            ans += cnt.getOrDefault(pref - k, 0L);
            cnt.merge(pref, 1L, Long::sum);
        }
        System.out.println(ans);
    }
}`,
        stdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 13',
            codeSnippet: 'ans += cnt.getOrDefault(pref - k, 0L);',
            whatItMeans: 'Adds frequency of matching prior prefix without null unboxing NPE.',
            whyItIsThere: 'Counts all subarrays ending here with sum k.',
            ifDeletedError: 'Matches are never tallied.',
          },
        ],
      },
      {
        id: 'java-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Substring Without Repeating Characters',
        englishParagraphs: [
          'Track last index of each ASCII byte in int[256] and jump L forward when duplicates collide.',
        ],
        banglaParagraphs: [
          'int[256] টেবিলে শেষ ইনডেক্স রেখে এক পাসে ডুপ্লিকেটমুক্ত সর্বোচ্চ সাবস্ট্রিং দৈর্ঘ্য বের করো।',
        ],
        memoryDiagram: `last[ch] >= L -> L = last[ch] + 1 -> best = max(best, R - L + 1)`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        int[] last = new int[256];
        Arrays.fill(last, -1);
        int L = 0, best = 0;
        for (int R = 0; R < s.length(); R++) {
            int c = s.charAt(R);
            if (last[c] >= L) L = last[c] + 1;
            last[c] = R;
            best = Math.max(best, R - L + 1);
        }
        System.out.println(best);
    }
}`,
        stdin: 'abcabcbb',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 11',
            codeSnippet: 'if (last[c] >= L) L = last[c] + 1;',
            whatItMeans: 'Moves left edge past the previous duplicate occurrence.',
            whyItIsThere: 'Prevents L from stepping backward on old occurrences.',
            ifDeletedError: 'Duplicates stay inside active window.',
          },
        ],
      },
      {
        id: 'java-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Record Key Equality vs. Broken Custom Class Without hashCode()',
        englishParagraphs: [
          'Java classes without hashCode/equals compare object identity inside HashMap; use record for value-based hash keys.',
        ],
        banglaParagraphs: [
          'সাধারণ ক্লাসে hashCode() ও equals() না লিখলে HashMap-এ একই মান খুঁজলেও মেলে না; record ব্যবহার করা সবচেয়ে নিরাপদ।',
        ],
        memoryDiagram: `record Coord(x, y) -> structural equals() & hashCode() automatic`,
        code: `import java.util.*;

public class Main {
    record Point(int x, int y) {}
    public static void main(String[] args) {
        Set<Point> visited = new HashSet<>();
        visited.add(new Point(3, 4));
        System.out.println(visited.contains(new Point(3, 4)));
    }
}`,
        stdin: '',
        expectedOutput: 'true',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'record Point(int x, int y) {}',
            whatItMeans: 'Generates canonical value-based equals() and hashCode().',
            whyItIsThere: 'Makes two distinct instances with (3,4) match in HashSet.',
            ifDeletedError: 'Plain class returns false on contains(new Point(3, 4)).',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 7',
        codeSnippet: 'Map<Integer, Integer> seen = new HashMap<>();',
        whatItMeans: 'Creates hash table mapping array values to their index.',
        whyItIsThere: 'Provides O(1) expected complement lookups.',
        ifDeletedError: 'seen map is undefined.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'Integer j = seen.get(target - a[i]);',
        whatItMeans: 'Looks up complement index in one hash lookup.',
        whyItIsThere: 'Avoids double lookup (containsKey + get).',
        ifDeletedError: 'Cannot retrieve matching earlier index.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'if (j != null) {',
        whatItMeans: 'Null-safe check before unboxing Integer.',
        whyItIsThere: 'Prevents NullPointerException when key is absent.',
        ifDeletedError: 'Using primitive int unboxes null and crashes.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'seen.put(a[i], i);',
        whatItMeans: 'Inserts current value after checking complement.',
        whyItIsThere: 'Avoids pairing an element with itself.',
        ifDeletedError: 'Later elements fail to match a[i].',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'cnt.put(0L, 1L)', memoryOrStack: 'cnt={0:1}, ans=0', note: 'Seed zero prefix' },
      { step: 2, state: 'x=1 -> pref=1', memoryOrStack: 'getOrDefault(-2,0)=0', note: 'cnt={0:1,1:1}' },
      { step: 3, state: 'x=2 -> pref=3', memoryOrStack: 'getOrDefault(0,0)=1', note: 'ans=1, cnt[3]=1' },
      { step: 4, state: 'x=-1,1,2 -> pref=3,4,6', memoryOrStack: 'hits at 0 and 3', note: 'Total ans=3' },
    ],
    harryBugTraps: [
      {
        title: 'NullPointerException From Unboxing Map.get() Into Primitive int',
        brokenCode: `int prev = cnt.get(pref - k);`,
        fixedCode: `long prev = cnt.getOrDefault(pref - k, 0L);`,
        whyItBreaks: 'Missing keys return null; assigning null directly to primitive int/long throws NPE.',
      },
      {
        title: 'Using Plain Class Without hashCode/equals Inside HashSet',
        brokenCode: `class Pair { int a, b; } // contains(new Pair(1,2)) returns false!`,
        fixedCode: `record Pair(int a, int b) {}`,
        whyItBreaks: 'Object.hashCode uses memory identity unless overridden.',
      },
      {
        title: 'Using char Value Directly Beyond 255 in int[256] for Unicode',
        brokenCode: `int[] last = new int[256]; // ArrayIndexOutOfBounds on non-ASCII`,
        fixedCode: `Map<Character, Integer> last = new HashMap<>(); // or guard < 256 for ASCII`,
        whyItBreaks: 'Unicode characters exceed index 255.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-22-p1',
        difficulty: 'Easy',
        title: 'Distinct Elements Count',
        prompt: 'Read n and n integers into HashSet<Long> and print distinct count.',
        banglaHint: 'ইঙ্গিত: HashSet<Long>-এ সংখ্যা ভরে .size() প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); Set<Long> s = new HashSet<>();\n        for (int i = 0; i < n; i++) s.add(sc.nextLong());\n        System.out.println(s.size());\n    }\n}`,
        sampleStdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-22-p2',
        difficulty: 'Easy',
        title: 'Two-Sum Indices Lookup',
        prompt: 'Read n, target, and n integers; print first 0-based indices i j summing to target.',
        banglaHint: 'ইঙ্গিত: HashMap-এ মান -> ইনডেক্স রেখে target - x খুঁজো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long t = sc.nextLong();\n        Map<Long, Integer> seen = new HashMap<>();\n        for (int i = 0; i < n; i++) {\n            long x = sc.nextLong(); Integer j = seen.get(t - x);\n            if (j != null) { System.out.println(j + " " + i); return; }\n            seen.put(x, i);\n        }\n    }\n}`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'java-ch-22-p3',
        difficulty: 'Medium',
        title: 'Longest Unique Substring Length',
        prompt: 'Read a token and print length of longest substring without repeating characters.',
        banglaHint: 'ইঙ্গিত: int[256] এ সর্বশেষ ইনডেক্স রেখে L এবং R আপডেট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n        int[] last = new int[256]; Arrays.fill(last, -1);\n        int L = 0, best = 0;\n        for (int R = 0; R < s.length(); R++) {\n            int c = s.charAt(R);\n            if (last[c] >= L) L = last[c] + 1;\n            last[c] = R; best = Math.max(best, R - L + 1);\n        }\n        System.out.println(best);\n    }\n}`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'java-ch-22-p4',
        difficulty: 'Medium',
        title: 'At-Most-K Distinct Subarray Length',
        prompt: 'Read n, k, and n ints; print longest contiguous subarray with <= k distinct values.',
        banglaHint: 'ইঙ্গিত: HashMap<Integer, Integer> এর size > k হলে বাম প্রান্ত থেকে বাদ দাও।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n        int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        Map<Integer, Integer> freq = new HashMap<>();\n        int L = 0, best = 0;\n        for (int R = 0; R < n; R++) {\n            freq.merge(a[R], 1, Integer::sum);\n            while (freq.size() > k) {\n                int c = freq.get(a[L]) - 1;\n                if (c == 0) freq.remove(a[L]); else freq.put(a[L], c);\n                L++;\n            }\n            best = Math.max(best, R - L + 1);\n        }\n        System.out.println(best);\n    }\n}`,
        sampleStdin: '6 2\n1 2 1 2 3 3',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-22-p5',
        difficulty: 'Hard',
        title: 'Subarray Sums Equals K Counter',
        prompt: 'Read n, k, and n integers; print count of subarrays summing to k.',
        banglaHint: 'ইঙ্গিত: cnt.put(0L, 1L) রেখে pref - k এর ফ্রিকোয়েন্সি যোগ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long k = sc.nextLong();\n        Map<Long, Long> cnt = new HashMap<>(); cnt.put(0L, 1L);\n        long pref = 0, ans = 0;\n        for (int i = 0; i < n; i++) {\n            pref += sc.nextLong();\n            ans += cnt.getOrDefault(pref - k, 0L);\n            cnt.merge(pref, 1L, Long::sum);\n        }\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'O(n) Subarray Sum = K Hash Engine',
      description: 'Combine running prefix sums with HashMap<Long, Long> to count exact-K subarrays in linear time.',
      banglaGoal: 'Prefix Sum এবং HashMap দিয়ে O(n) সময়ে K-যোগফল সাব-অ্যারে গণনা করা।',
      combinesChapters: 'Ch 13, 20, 22',
      starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(); long k = sc.nextLong();\n        Map<Long, Long> cnt = new HashMap<>(); cnt.put(0L, 1L);\n        long pref = 0, ans = 0;\n        for (int i = 0; i < n; i++) {\n            pref += sc.nextLong();\n            ans += cnt.getOrDefault(pref - k, 0L);\n            cnt.merge(pref, 1L, Long::sum);\n        }\n        System.out.println(ans);\n    }\n}`,
      sampleStdin: '5 3\n1 2 -1 1 2',
      expectedOutput: '3',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(); long k = sc.nextLong();\n        Map<Long, Long> cnt = new HashMap<>(); cnt.put(0L, 1L);\n        long pref = 0, ans = 0;\n        for (int i = 0; i < n; i++) {\n            pref += sc.nextLong();\n            ans += cnt.getOrDefault(pref - k, 0L);\n            cnt.merge(pref, 1L, Long::sum);\n        }\n        System.out.println(ans);\n    }\n}`,
    sampleStdin: '5 3\n1 2 -1 1 2',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'java22-t1', input: '5 3\n1 2 -1 1 2', expectedOutput: '3' },
      { id: 'java22-t2', input: '3 0\n0 0 0', expectedOutput: '6', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'Java Chapter 23 (21 LTS): ArrayDeque Stack/Queue, Trees & BFS/DFS Traversal',
    banglaTitle: 'Java অধ্যায় ২৩ (21 LTS): ArrayDeque স্ট্যাক/কিউ, ট্রি ও BFS/DFS ট্রাভার্সাল',
    subtitle: 'Preferring ArrayDeque over legacy Stack, monotonic stack NGE, ArrayList adjacency BFS, and iterative/recursive DFS.',
    zeroIntuition: {
      plainEnglishStory:
        'Never use Java’s legacy synchronized `java.util.Stack` class in modern code or competitive programming—every push/pop acquires a monitor lock! Use `ArrayDeque<Integer>` for BOTH LIFO Stacks (`push`/`pop`/`peek`) and FIFO Queues (`offer`/`poll`), delivering cache-friendly zero-lock performance.\n\nFor BFS on `List<List<Integer>> adj`, set `dist[v] = dist[u] + 1` BEFORE calling `q.offer(v)` so cycles never duplicate vertices in the queue!',
      asciiFlowchart: `  Stack: ArrayDeque<Character> st = new ArrayDeque<>(); st.push(c); st.pop();
  BFS Queue: Queue<Integer> q = new ArrayDeque<>(); dist[0]=0; q.offer(0);`,
      pseudocode: [
        '1. USE ArrayDeque<> instead of synchronized java.util.Stack or LinkedList',
        '2. GUARD !st.isEmpty() before calling pop()/peek()',
        '3. BFS: set dist[v] = dist[u] + 1 at the moment you offer(v)',
        '4. DFS: mark vis[u] = true upon entry or use explicit ArrayDeque stack on deep trees',
      ],
      banglaZeroToHero: {
        analogyTitle: 'আধুনিক ArrayDeque (বনাম পুরনো Stack) এবং গ্রাফের BFS/DFS (Java 21)',
        explanation:
          'Java-র পুরনো `java.util.Stack` ক্লাসটি থ্রেড-সেফ করতে গিয়ে প্রতিবার `push`/`pop`-এ সিনক্রোনাইজড লক নেয়—তাই আধুনিক Java 21 এবং কনটেস্টে স্ট্যাক বা কিউ দুটোর জন্যই `ArrayDeque<T>` ব্যবহার করতে হয়! এটি অনেক হালকা ও দ্রুত। স্ট্যাক হিসেবে নিলে `push()`, `pop()`, `peek()` আর কিউ হিসেবে নিলে `offer()`, `poll()` ব্যবহার করবে। মনে রাখবে স্ট্যাক খালি হলে `peek()` দিলে `null` আর `pop()` দিলে `NoSuchElementException` দেয়—তাই আগে `!st.isEmpty()` চেক করা মাস্ট! গ্রাফের শর্টেস্ট দূরত্ব বের করতে `ArrayList<ArrayList<Integer>>` অ্যাডজাসেন্সি লিস্ট ও `ArrayDeque<Integer>` কিউ নিয়ে BFS চালাবে, এবং প্রতিবেশী নোড `v` কিউতে দেওয়ার মুহূর্তেই `dist[v] = dist[u] + 1` সেট করে দেবে যাতে সাইকেলে পড়ে ডুপ্লিকেট পুশ না হয়!',
        everydayExample:
          'পুরনো ভারী লোহার গেট (`java.util.Stack`) প্রতিবার তালা খুলে ঢোকার বদলে দ্রুতগতির আধুনিক স্লাইডিং দরজা (`ArrayDeque`) ব্যবহার করা!',
        keyTakeaways: [
          'স্ট্যাক ও কিউ উভয়ের জন্যই আধুনিক Java-তে `ArrayDeque` ব্যবহার করবে—পুরনো `Stack` বা `LinkedList` নয়।',
          'BFS-এ `q.offer(v)` করার আগেই `dist[v] = dist[u] + 1` বসাতে হয়।',
          '`!st.isEmpty()` যাচাই না করে `pop()` চালালে এক্সেপশন ক্র্যাশ হবে।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Balanced Brackets Using ArrayDeque Stack',
        englishParagraphs: [
          'Using `Deque<Character> st = new ArrayDeque<>()` validates bracket streams cleanly in O(n) without legacy synchronization overhead.',
        ],
        banglaParagraphs: [
          '`ArrayDeque<Character>` স্ট্যাক দিয়ে `{[()]}` ব্র্যাকেট ব্যালান্সিং যাচাই।',
        ],
        memoryDiagram: `"{[()]}" -> ArrayDeque push { [ ( -> pop matching ) ] } -> st.isEmpty()`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        Deque<Character> st = new ArrayDeque<>();
        boolean ok = true;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.isEmpty()) { ok = false; break; }
                char t = st.pop();
                if ((c == ')' && t != '(') || (c == ']' && t != '[') || (c == '}' && t != '{')) { ok = false; break; }
            }
        }
        System.out.println((ok && st.isEmpty()) ? "VALID" : "INVALID");
    }
}`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'Deque<Character> st = new ArrayDeque<>();', whatItMeans: 'Fast non-synchronized LIFO stack implementation.', whyItIsThere: 'Outperforms legacy Stack class in latency and memory.', ifDeletedError: 'Compile error: st cannot be resolved.' },
          { lineNumber: 'Line 14', codeSnippet: 'if (st.isEmpty()) { ok = false; break; }', whatItMeans: 'Prevents NoSuchElementException on stray closers.', whyItIsThere: 'Validates stack non-empty before pop().', ifDeletedError: 'Crashes on input ")]".' },
        ],
      },
      {
        id: 'java-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Shortest-Path BFS Using ArrayDeque Queue',
        englishParagraphs: [
          'Initialize `int[] dist = new int[n]; Arrays.fill(dist, -1);` then sweep level by level with `ArrayDeque<Integer>`.',
        ],
        banglaParagraphs: [
          '`Arrays.fill(dist, -1)` ও `ArrayDeque` কিউ দিয়ে গ্রাফের শর্টেস্ট দূরত্ব নির্ণয়।',
        ],
        memoryDiagram: `0-1, 0-2, 1-3 -> dist=[0, 1, 1, 2]`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(u).add(v); adj.get(v).add(u);
        }
        int[] dist = new int[n]; Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        dist[0] = 0; q.offer(0);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) sb.append(i > 0 ? " " : "").append(dist[i]);
        System.out.println(sb.toString());
    }
}`,
        stdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
        lineByLine: [
          { lineNumber: 'Line 19', codeSnippet: 'if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); }', whatItMeans: 'Sets distance immediately on enqueue.', whyItIsThere: 'Guarantees each vertex enters the queue at most once.', ifDeletedError: 'Duplicate pushes cause TLE on cycles.' },
        ],
      },
      {
        id: 'java-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Monotonic Stack Next Greater Element (O(n))',
        englishParagraphs: [
          'Holding unresolved indices inside `Deque<Integer>` resolves each earlier bar as soon as a strictly larger value arrives.',
        ],
        banglaParagraphs: [
          'মনোটনিক স্ট্যাকে ইনডেক্স রেখে প্রতিটি সংখ্যার ডানের প্রথম বড় মান O(n) সময়ে বের করা হয়েছে।',
        ],
        memoryDiagram: `[4, 5, 2, 25] -> [5, 25, 25, -1]`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long[] a = new long[n], ans = new long[n];
        for (int i = 0; i < n; i++) { a[i] = sc.nextLong(); ans[i] = -1; }
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && a[st.peek()] < a[i]) ans[st.pop()] = a[i];
            st.push(i);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) sb.append(i > 0 ? " " : "").append(ans[i]);
        System.out.println(sb.toString());
    }
}`,
        stdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'while (!st.isEmpty() && a[st.peek()] < a[i]) ans[st.pop()] = a[i];', whatItMeans: 'Pops unresolved smaller indices in O(1) amortized.', whyItIsThere: 'Turns quadratic search into linear O(n) pass.', ifDeletedError: 'Answers remain -1.' },
        ],
      },
      {
        id: 'java-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Connected Components via Iterative DFS Stack (No JVM StackOverflowError)',
        englishParagraphs: [
          'Deep recursion in Java overflows the JVM call stack around ~10,000 frames; an explicit `ArrayDeque` DFS eliminates `StackOverflowError` completely!',
        ],
        banglaParagraphs: [
          'JVM রিকার্সন স্ট্যাক ওভারফ্লো এড়াতে নিজস্ব `ArrayDeque` স্ট্যাক ব্যবহার করে গ্রাফের কানেক্টেড কম্পোনেন্ট গণনা।',
        ],
        memoryDiagram: `5 nodes, edges (0-1),(2-3) -> 3 components safely`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) { int u = sc.nextInt(), v = sc.nextInt(); adj.get(u).add(v); adj.get(v).add(u); }
        boolean[] vis = new boolean[n];
        int comps = 0;
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                comps++; vis[i] = true; st.push(i);
                while (!st.isEmpty()) {
                    int u = st.pop();
                    for (int v : adj.get(u)) if (!vis[v]) { vis[v] = true; st.push(v); }
                }
            }
        }
        System.out.println(comps);
    }
}`,
        stdin: '5 2\n0 1\n2 3',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 18', codeSnippet: 'if (!vis[v]) { vis[v] = true; st.push(v); }', whatItMeans: 'Marks neighbor visited before pushing onto iterative DFS stack.', whyItIsThere: 'Prevents redundant stack frames and StackOverflowError.', ifDeletedError: 'Infinite loop on cycles.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 8', codeSnippet: 'Deque<Character> st = new ArrayDeque<>();', whatItMeans: 'Allocates fast ring-buffer stack.', whyItIsThere: 'Avoids synchronized lock overhead of java.util.Stack.', ifDeletedError: 'st undeclared.' },
      { lineNumber: 'Line 12', codeSnippet: "if (c == '(' || c == '[' || c == '{') st.push(c);", whatItMeans: 'Pushes opening bracket onto deque head.', whyItIsThere: 'Tracks most recent unmatched opener.', ifDeletedError: 'Never records opening brackets.' },
      { lineNumber: 'Line 14', codeSnippet: 'if (st.isEmpty()) { ok = false; break; }', whatItMeans: 'Guards against popping an empty stack.', whyItIsThere: 'Prevents NoSuchElementException.', ifDeletedError: 'Throws runtime exception on stray closer.' },
      { lineNumber: 'Line 15', codeSnippet: 'char t = st.pop();', whatItMeans: 'Removes and returns top bracket character.', whyItIsThere: 'Compares latest opener against current closer.', ifDeletedError: 't undefined.' },
      { lineNumber: 'Line 19', codeSnippet: 'System.out.println((ok && st.isEmpty()) ? "VALID" : "INVALID");', whatItMeans: 'Checks zero mismatches and empty stack.', whyItIsThere: 'Rejects unclosed trailing openers.', ifDeletedError: 'No verification output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "{[("', memoryOrStack: "st = ['(', '[', '{']", note: 'ArrayDeque top at head' },
      { step: 2, state: 'Read ")"', memoryOrStack: "pop -> '(', matches ')'", note: "st = ['[', '{']" },
      { step: 3, state: 'Read "]}"', memoryOrStack: "pops '[' then '{'", note: 'st is empty' },
      { step: 4, state: 'Evaluate ok && st.isEmpty()', memoryOrStack: 'stdout = "VALID"', note: 'Balanced expression verified' },
    ],
    harryBugTraps: [
      {
        title: 'Using Legacy Synchronized java.util.Stack Instead of ArrayDeque',
        brokenCode: 'Stack<Integer> st = new Stack<>(); // Acquires monitor lock per push/pop!',
        fixedCode: 'import java.util.*;\npublic class Main { public static void main(String[] a) { Deque<Integer> st = new ArrayDeque<>(); st.push(1); System.out.println(st.pop()); } }',
        whyItBreaks: 'java.util.Stack extends Vector and locks on every call, hurting throughput; ArrayDeque is the official fast replacement.',
      },
      {
        title: 'Calling st.pop() on Empty ArrayDeque Without isEmpty() Check',
        brokenCode: 'Deque<Integer> st = new ArrayDeque<>(); int x = st.pop(); // Throws NoSuchElementException!',
        fixedCode: 'import java.util.*;\npublic class Main { public static void main(String[] a) { Deque<Integer> st = new ArrayDeque<>(); System.out.println(st.isEmpty() ? "EMPTY" : st.pop()); } }',
        whyItBreaks: 'Unlike poll()/peek() which return null, ArrayDeque.pop() throws immediately when empty.',
      },
      {
        title: 'Recursive DFS Overflowing JVM Stack on 10^5 Nodes',
        brokenCode: 'void dfs(int u) { for (int v : adj[u]) dfs(v); } // StackOverflowError at ~10k depth!',
        fixedCode: 'import java.util.*;\npublic class Main { public static void main(String[] a) { Deque<Integer> st = new ArrayDeque<>(); st.push(0); System.out.println(st.pop()); } }',
        whyItBreaks: 'Java reserves small default thread stacks; linear 10^5 chains require iterative ArrayDeque DFS.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-23-q1',
        difficulty: 'Easy',
        title: '1. Reverse Array via ArrayDeque Stack',
        prompt: 'Read n and n ints; push onto ArrayDeque and pop to print reversed sequence.',
        banglaHint: '`Deque<Long> st = new ArrayDeque<>()` ব্যবহার করে `push` ও `pop` করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Deque<Long> st = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) st.push(sc.nextLong());\n        StringBuilder sb = new StringBuilder();\n        while (!st.isEmpty()) { sb.append(st.pop()); if (!st.isEmpty()) sb.append(' '); }\n        System.out.println(sb.toString());\n    }\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'java-ch-23-q2',
        difficulty: 'Easy',
        title: '2. Circular Queue Elimination (Josephus)',
        prompt: 'Read n and k; rotate ArrayDeque queue k-1 times and remove k-th until 1 remains.',
        banglaHint: '`q.offer(q.poll())` দিয়ে k-1 বার ঘুরিয়ে k-তম উপাদান বাদ দাও।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 1; i <= n; i++) q.offer(i);\n        while (q.size() > 1) {\n            for (int i = 1; i < k; i++) q.offer(q.poll());\n            q.poll();\n        }\n        System.out.println(q.peek());\n    }\n}`,
        sampleStdin: '5 2',
        expectedOutput: '3',
      },
      {
        id: 'java-ch-23-q3',
        difficulty: 'Medium',
        title: '3. Next Greater Element via Monotonic Stack',
        prompt: 'Read n and array; output first greater element on right for each position or -1.',
        banglaHint: '`!st.isEmpty() && a[st.peek()] < a[i]` শর্তে পপ করে উত্তর বসাও।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long[] a = new long[n], ans = new long[n];\n        for (int i = 0; i < n; i++) { a[i] = sc.nextLong(); ans[i] = -1; }\n        Deque<Integer> st = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) { while (!st.isEmpty() && a[st.peek()] < a[i]) ans[st.pop()] = a[i]; st.push(i); }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) sb.append(i > 0 ? " " : "").append(ans[i]);\n        System.out.println(sb.toString());\n    }\n}`,
        sampleStdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
      },
      {
        id: 'java-ch-23-q4',
        difficulty: 'Medium',
        title: '4. Shortest Path S to T via BFS',
        prompt: 'Read n, m, S, T and m edges; print shortest hop distance S to T or -1.',
        banglaHint: '`S` থেকে BFS শুরু করে `dist[T]` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), m = sc.nextInt(), S = sc.nextInt(), T = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) { int u = sc.nextInt(), v = sc.nextInt(); adj.get(u).add(v); adj.get(v).add(u); }\n        int[] dist = new int[n]; Arrays.fill(dist, -1);\n        Queue<Integer> q = new ArrayDeque<>(); dist[S] = 0; q.offer(S);\n        while (!q.isEmpty()) { int u = q.poll(); for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); } }\n        System.out.println(dist[T]);\n    }\n}`,
        sampleStdin: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-23-q5',
        difficulty: 'Hard',
        title: '5. Tree Depth via BFS Level Sweep',
        prompt: 'Read n tree nodes (0..n-1) rooted at 0 and n-1 edges; print max distance from root 0.',
        banglaHint: '`0` থেকে BFS চালিয়ে সর্বোচ্চ দূরত্বটি বের করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < n - 1; i++) { int u = sc.nextInt(), v = sc.nextInt(); adj.get(u).add(v); adj.get(v).add(u); }\n        int[] dist = new int[n]; Arrays.fill(dist, -1); Queue<Integer> q = new ArrayDeque<>(); dist[0] = 0; q.offer(0);\n        int best = 0;\n        while (!q.isEmpty()) { int u = q.poll(); best = Math.max(best, dist[u]); for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); } }\n        System.out.println(best);\n    }\n}`,
        sampleStdin: '5\n0 1\n0 2\n1 3\n3 4',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Java 21 ArrayDeque Stack & Shortest-Path BFS Engine',
      description: 'Processes balanced brackets and unweighted shortest-path distances cleanly via ArrayDeque.',
      banglaGoal: 'Java ArrayDeque স্ট্যাক ও কিউ দিয়ে ব্র্যাকেট যাচাই ও BFS শর্টেস্ট পাথ চালানো।',
      combinesChapters: 'Ch 1–23',
      starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) { int u = sc.nextInt(), v = sc.nextInt(); adj.get(u).add(v); adj.get(v).add(u); }\n        int[] dist = new int[n]; Arrays.fill(dist, -1);\n        Queue<Integer> q = new ArrayDeque<>(); dist[0] = 0; q.offer(0);\n        while (!q.isEmpty()) { int u = q.poll(); for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); } }\n        StringBuilder sb = new StringBuilder(); for (int i = 0; i < n; i++) sb.append(i > 0 ? " " : "").append(dist[i]);\n        System.out.println(sb.toString());\n    }\n}`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next(); Deque<Character> st = new ArrayDeque<>(); boolean ok = true;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c == '(' || c == '[' || c == '{') st.push(c);\n            else { if (st.isEmpty()) { ok = false; break; } char t = st.pop(); if ((c == ')' && t != '(') || (c == ']' && t != '[') || (c == '}' && t != '{')) { ok = false; break; } }\n        }\n        System.out.println((ok && st.isEmpty()) ? "VALID" : "INVALID");\n    }\n}`,
    sampleStdin: '{[()]}',
    expectedSampleOutput: 'VALID',
    testCases: [
      { id: 'java23-t1', input: '{[()]}', expectedOutput: 'VALID' },
      { id: 'java23-t2', input: '([)]', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'Java Chapter 24 (21 LTS): Try-With-Resources, Exceptions, Concurrency & Modules',
    banglaTitle: 'Java অধ্যায় ২৪ (21 LTS): ট্রাই-উইথ-রিসোর্সেস, এক্সেপশন, কনকারেন্সি ও মডিউল',
    subtitle: 'AutoCloseable try-with-resources, checked vs unchecked exceptions, CompletableFuture / AtomicLong, and package structure.',
    zeroIntuition: {
      plainEnglishStory:
        'In Java 21, `try (BufferedReader br = ...)` (try-with-resources) invokes `.close()` deterministically on every `AutoCloseable` resource when exiting the block—preventing stream leaks even when exceptions throw! Never swallow exceptions with empty `catch (Exception e) {}` blocks—emit clear domain errors.\n\nFor concurrency, `AtomicLong` prevents data races without explicit synchronization overhead, while `CompletableFuture.allOf` (or Java 21 Virtual Threads!) runs independent async operations concurrently instead of blocking one after another.',
      asciiFlowchart: `  try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in)))
     |-- readLine() -> try parse -> emit OK
     +-- catch (NumberFormatException | ArithmeticException e) -> clean error, auto-closed!`,
      pseudocode: [
        '1. DECLARE streams/scanners inside try (...) header for automatic close()',
        '2. CATCH narrow exception subclasses (ArithmeticException, NumberFormatException)',
        '3. COMBINE async futures concurrently via CompletableFuture.supplyAsync / allOf',
        '4. PROTECT shared counters using AtomicLong / ConcurrentHashMap',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Try-With-Resources অটো-ক্লোজ ও নিরাপদ কনকারেন্সি (Java 21)',
        explanation:
          'Java-তে ফাইল বা `BufferedReader` খোলার পর `close()` করতে ভুলে গেলে রিসোর্স লিক হয়। আধুনিক সমাধান হলো `try (BufferedReader br = ...)` অর্থাৎ Try-With-Resources—ব্লক শেষ হলে অথবা এরর থ্রো করলেও JVM নিজেই রিসোর্স বন্ধ করে দেয়! এরর ধরার সময় কখনোই খালি `catch (Exception e) {}` লিখে এরর চেপে যাবে না; বরং `ArithmeticException` বা `NumberFormatException`-এর মতো সুনির্দিষ্ট ক্লাস ধরে স্পষ্ট মেসেজ দেবে। অন্যদিকে কনকারেন্সিতে একাধিক কাজ সমান্তরালে চালিয়ে ফলাফল জুড়তে `CompletableFuture` এবং থ্রেড-সেফ কাউন্টার রাখতে `AtomicLong` ব্যবহার করলে কখনোই ডেটা রেস বা মান হারানোর ভয় থাকে না!',
        everydayExample: 'দোকান থেকে বেরোলেই অটোমেটিক লাইট ও তালা বন্ধ হওয়া (`try-with-resources`) আর একাধিক ডেলিভারি কর্মী একসাথে কাজ করে প্যাকেট জড়ো করা (`CompletableFuture`)!',
        keyTakeaways: [
          'যেকোনো স্ট্রিম বা ফাইল হ্যান্ডেল সবসময় `try (Resource r = ...)` হেডারের ভেতরে খুলবে।',
          'খালি `catch` ব্লক লিখবে না—সুনির্দিষ্ট এক্সেপশন ধরে পরিষ্কার এরর রেসপন্স পাঠাও।',
          'মাল্টি-থ্রেড কাউন্টারে সাধারণ `long` না নিয়ে `AtomicLong` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Narrow Multi-Catch Error Handling (Arithmetic & NumberFormat)',
        englishParagraphs: [
          'Java multi-catch `catch (ArithmeticException | NumberFormatException e)` handles distinct runtime faults cleanly without blank catching `Throwable`.',
        ],
        banglaParagraphs: [
          'Java-র মাল্টি-ক্যাচ সিনট্যাক্সে এক ব্লকে `ArithmeticException` ও `NumberFormatException` নিরাপদে সামলানো।',
        ],
        memoryDiagram: `"20 4" -> OK:5 | "20 0" -> ERR_DIV_ZERO | "20 abc" -> ERR_INVALID`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String sa = sc.next(), sb = sc.next();
        try {
            long a = Long.parseLong(sa), b = Long.parseLong(sb);
            if (b == 0) throw new ArithmeticException("ERR_DIV_ZERO");
            System.out.println("OK:" + (a / b));
        } catch (NumberFormatException e) {
            System.out.println("ERR_NUMBER");
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
        stdin: '20 4',
        expectedOutput: 'OK:5',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'if (b == 0) throw new ArithmeticException("ERR_DIV_ZERO");', whatItMeans: 'Emits explicit named message for zero divisor.', whyItIsThere: 'Guarantees structured output for callers/judges.', ifDeletedError: 'Emits generic "/ by zero" string.' },
        ],
      },
      {
        id: 'java-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Try-With-Resources BufferedReader Stream Parser',
        englishParagraphs: [
          'Wrapping `BufferedReader` in `try (...)` closes the stream cleanly while parsing line-by-line records safely.',
        ],
        banglaParagraphs: [
          '`try (BufferedReader br = ...)` দিয়ে লাইন-বাই-লাইন ইনপুট পার্সিং ও অটোমেটিক রিসোর্স ক্লোজিং।',
        ],
        memoryDiagram: `try(br) -> readLine() -> split(" ") -> SUM=... or SKIP_INVALID`,
        code: `import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) continue;
                try {
                    String[] p = line.split("\\\\s+");
                    long a = Long.parseLong(p[0]), b = Long.parseLong(p[1]);
                    System.out.println("SUM=" + (a + b));
                } catch (RuntimeException e) {
                    System.out.println("SKIP_INVALID");
                }
            }
        }
    }
}`,
        stdin: '4 6\nbad_line\n10 5',
        expectedOutput: 'SUM=10\nSKIP_INVALID\nSUM=15',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {', whatItMeans: 'Declares AutoCloseable stream automatically closed on block exit.', whyItIsThere: 'Prevents resource descriptor leaks cleanly.', ifDeletedError: 'Stream remains open on exceptions.' },
        ],
      },
      {
        id: 'java-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'CompletableFuture Concurrent Pipeline Composition',
        englishParagraphs: [
          'Launching independent `CompletableFuture.supplyAsync` jobs runs tasks concurrently across the fork-join pool and combines outputs cleanly with `.join()`.',
        ],
        banglaParagraphs: [
          '`CompletableFuture` দিয়ে একাধিক অ্যাসিঙ্ক কাজ একসাথে চালিয়ে `.join()` করে চূড়ান্ত যোগফল নির্ণয়।',
        ],
        memoryDiagram: `supplyAsync(job1) + supplyAsync(job2) -> join() -> combined sum`,
        code: `import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        List<CompletableFuture<Long>> jobs = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            jobs.add(CompletableFuture.supplyAsync(() -> x));
        }
        long total = 0;
        for (CompletableFuture<Long> f : jobs) total += f.join();
        System.out.println(total);
    }
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'jobs.add(CompletableFuture.supplyAsync(() -> x));', whatItMeans: 'Dispatches asynchronous computation immediately.', whyItIsThere: 'Runs all tasks concurrently instead of serially.', ifDeletedError: 'Jobs list stays empty.' },
        ],
      },
      {
        id: 'java-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Thread-Safe AtomicLong Counter & Closeable Guard',
        englishParagraphs: [
          '`AtomicLong.addAndGet(delta)` prevents lost updates without lock contention, while a custom `AutoCloseable` resource guarantees cleanup.',
        ],
        banglaParagraphs: [
          '`AtomicLong` দিয়ে লক-ফ্রি যোগফল ও `AutoCloseable` দিয়ে স্বয়ংক্রিয় রোলব্যাক/ক্লিনআপ প্রদর্শন।',
        ],
        memoryDiagram: `AtomicLong hits = 0 -> addAndGet(k) -> AutoCloseable closes cleanly`,
        code: `import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

public class Main {
    static class Guard implements AutoCloseable {
        boolean committed = false;
        public void commit() { committed = true; System.out.println("COMMIT"); }
        public void close() { if (!committed) System.out.println("ROLLBACK"); }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.hasNext() ? sc.next() : "ok";
        AtomicLong ops = new AtomicLong(0);
        try (Guard g = new Guard()) {
            ops.addAndGet(1);
            if (mode.equals("ok")) g.commit();
        }
    }
}`,
        stdin: 'fail',
        expectedOutput: 'ROLLBACK',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'public void close() { if (!committed) System.out.println("ROLLBACK"); }', whatItMeans: 'AutoCloseable hook triggered automatically by try-with-resources.', whyItIsThere: 'Guarantees rollback even when early returns or errors occur.', ifDeletedError: 'Guard fails to implement AutoCloseable.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 6', codeSnippet: 'if (!sc.hasNext()) return;', whatItMeans: 'Guards against empty input streams.', whyItIsThere: 'Prevents NoSuchElementException before reading tokens.', ifDeletedError: 'Empty stdin throws exception.' },
      { lineNumber: 'Line 8', codeSnippet: 'try {', whatItMeans: 'Opens guarded parsing and division scope.', whyItIsThere: 'Isolates numeric errors cleanly.', ifDeletedError: 'Compile error: catch without try.' },
      { lineNumber: 'Line 10', codeSnippet: 'if (b == 0) throw new ArithmeticException("ERR_DIV_ZERO");', whatItMeans: 'Explicit precondition check before division.', whyItIsThere: 'Produces deterministic standardized error code.', ifDeletedError: 'Throws generic "/ by zero" text.' },
      { lineNumber: 'Line 12', codeSnippet: '} catch (NumberFormatException e) {', whatItMeans: 'Catches invalid digit tokens specifically.', whyItIsThere: 'Avoids overly broad exception swallowing.', ifDeletedError: 'Invalid string crashes JVM.' },
      { lineNumber: 'Line 14', codeSnippet: '} catch (ArithmeticException e) {', whatItMeans: 'Catches division by zero cleanly.', whyItIsThere: 'Prints controlled error string instead of stack trace.', ifDeletedError: 'Program aborts on zero divisor.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read sa="20", sb="4"', memoryOrStack: 'a=20, b=4', note: 'Long.parseLong succeeds' },
      { step: 2, state: 'Check b == 0', memoryOrStack: '4 != 0', note: 'Proceeds to division' },
      { step: 3, state: 'Evaluate 20 / 4', memoryOrStack: '5', note: 'Prints OK:5' },
      { step: 4, state: 'If sb=="0"', memoryOrStack: 'Throws ArithmeticException', note: 'Caught cleanly -> ERR_DIV_ZERO' },
    ],
    harryBugTraps: [
      {
        title: 'Swallowing Exceptions With Empty catch (Exception e) {}',
        brokenCode: 'try { parse(x); } catch (Exception e) {} // Silent corruption!',
        fixedCode: 'public class Main { public static void main(String[] a) { try { Integer.parseInt("bad"); } catch (NumberFormatException e) { System.out.println("ERR_PARSE"); } } }',
        whyItBreaks: 'Empty catch blocks hide critical bugs and let corrupt null/zero values poison downstream data.',
      },
      {
        title: 'Leaving BufferedReader Open When Exceptions Occur',
        brokenCode: 'BufferedReader br = new BufferedReader(...); work(); br.close(); // skipped on throw!',
        fixedCode: 'import java.io.*;\npublic class Main { public static void main(String[] a) throws IOException { try (BufferedReader br = new BufferedReader(new StringReader("42"))) { System.out.println(br.readLine()); } } }',
        whyItBreaks: 'Exceptions thrown before manual br.close() leak native file descriptors.',
      },
      {
        title: 'Creating Sequential Futures One-by-One With Immediate .get()',
        brokenCode: 'long a = f1.get(); long b = f2.get(); // waits sequentially!',
        fixedCode: 'import java.util.concurrent.*;\npublic class Main { public static void main(String[] a) { var f1 = CompletableFuture.supplyAsync(()->10); var f2 = CompletableFuture.supplyAsync(()->20); System.out.println(f1.join() + f2.join()); } }',
        whyItBreaks: 'Calling .get() before spawning subsequent futures serializes async work completely.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-24-q1',
        difficulty: 'Easy',
        title: '1. Safe Division Exception Guard',
        prompt: 'Read two longs a and b; print `OK:<a/b>` or `ERR_DIV_ZERO` via try/catch.',
        banglaHint: '`b == 0` হলে `ArithmeticException` ধরে `ERR_DIV_ZERO` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), b = sc.nextLong();\n        try { if (b == 0) throw new ArithmeticException("ERR_DIV_ZERO"); System.out.println("OK:" + (a / b)); }\n        catch (ArithmeticException e) { System.out.println(e.getMessage()); }\n    }\n}`,
        sampleStdin: '20 4',
        expectedOutput: 'OK:5',
      },
      {
        id: 'java-ch-24-q2',
        difficulty: 'Easy',
        title: '2. Try-With-Resources Line Pair Summer',
        prompt: 'Read lines via `try (BufferedReader br = ...)` printing `a + b` or `BAD` on invalid lines.',
        banglaHint: '`try (BufferedReader br = ...)` এর ভেতর `Integer.parseInt` চালাও ও ভুল লাইনে `BAD` দাও।',
        starterCode: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {\n            String line; while ((line = br.readLine()) != null) {\n                if (line.trim().isEmpty()) continue;\n                try { String[] p = line.trim().split("\\\\s+"); System.out.println(Long.parseLong(p[0]) + Long.parseLong(p[1])); }\n                catch (RuntimeException e) { System.out.println("BAD"); }\n            }\n        }\n    }\n}`,
        sampleStdin: '3 7\nhello\n10 -2',
        expectedOutput: '10\nBAD\n8',
      },
      {
        id: 'java-ch-24-q3',
        difficulty: 'Medium',
        title: '3. Strict Positive Number Parser',
        prompt: 'Read n tokens; sum valid positive integers and count invalid tokens via `NumberFormatException`.',
        banglaHint: 'ভুল টোকেনে `NumberFormatException` ধরে কাউন্টার বাড়াও।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), bad = 0; long sum = 0;\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            try { long v = Long.parseLong(t); if (v > 0) sum += v; else bad++; }\n            catch (NumberFormatException e) { bad++; }\n        }\n        System.out.println(sum + " " + bad);\n    }\n}`,
        sampleStdin: '4\n10 abc -5 20',
        expectedOutput: '30 2',
      },
      {
        id: 'java-ch-24-q4',
        difficulty: 'Medium',
        title: '4. CompletableFuture Concurrent Sum',
        prompt: 'Read n then n longs; spawn `CompletableFuture.supplyAsync(() -> x * 2)` for each and print total sum.',
        banglaHint: 'সব ফিউচার তালিকায় রেখে শেষে `.join()` করে যোগ করো।',
        starterCode: `import java.util.*;\nimport java.util.concurrent.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt();\n        List<CompletableFuture<Long>> fs = new ArrayList<>();\n        for (int i = 0; i < n; i++) { long x = sc.nextLong(); fs.add(CompletableFuture.supplyAsync(() -> x * 2)); }\n        long sum = 0; for (var f : fs) sum += f.join(); System.out.println(sum);\n    }\n}`,
        sampleStdin: '3\n2 4 6',
        expectedOutput: '24',
      },
      {
        id: 'java-ch-24-q5',
        difficulty: 'Hard',
        title: '5. AutoCloseable Transaction Guard',
        prompt: 'Build an `AutoCloseable` Tx that prints `COMMIT` if `.commit()` called else `ROLLBACK`.',
        banglaHint: '`close()` মেথডে `!committed` চেক করে `ROLLBACK` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class Tx implements AutoCloseable {\n        boolean ok = false; void commit() { ok = true; System.out.println("COMMIT"); }\n        public void close() { if (!ok) System.out.println("ROLLBACK"); }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); String m = sc.next();\n        try (Tx t = new Tx()) { if (m.equals("ok")) t.commit(); }\n    }\n}`,
        sampleStdin: 'fail',
        expectedOutput: 'ROLLBACK',
      },
    ],
    miniBuild: {
      title: 'Java 21 Resilient Exception & Stream Engine',
      description: 'Validates division and token parsing cleanly using try-with-resources and narrow catch guards.',
      banglaGoal: 'try-with-resources এবং সুনির্দিষ্ট এক্সেপশন হ্যান্ডলিংসহ নিরাপদ অপারেশন ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–24',
      starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String sa = sc.next(), sb = sc.next();\n        try {\n            long a = Long.parseLong(sa), b = Long.parseLong(sb);\n            if (b == 0) throw new ArithmeticException("ERR_DIV_ZERO");\n            System.out.println("OK:" + (a / b));\n        } catch (NumberFormatException e) { System.out.println("ERR_NUMBER"); }\n        catch (ArithmeticException e) { System.out.println(e.getMessage()); }\n    }\n}`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String sa = sc.next(), sb = sc.next();\n        try {\n            long a = Long.parseLong(sa), b = Long.parseLong(sb);\n            if (b == 0) throw new ArithmeticException("ERR_DIV_ZERO");\n            System.out.println("OK:" + (a / b));\n        } catch (NumberFormatException e) { System.out.println("ERR_NUMBER"); }\n        catch (ArithmeticException e) { System.out.println(e.getMessage()); }\n    }\n}`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'java24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'java24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'Java Chapter 25 (Java 21+): Full-Stack Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'Java অধ্যায় ২৫ (Java 21+): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট (মেগা ক্যাপস্টোন)',
    subtitle: 'Spring/HTTP request parsing, Map route dispatch tables, JSON serialization, rate limiting, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'Enterprise web backends around the globe—banks, e-commerce checkouts, and payment gateways—run on Java 21+ (Spring Boot, Micronaut, Quarkus). Every frontend HTTP request arrives with verb, path, and parameters (`POST /api/add 15 27`), passes through auth filters, matches a handler inside a `Map<String, RouteHandler>`, and serializes a deterministic status code + JSON payload.\n\nIn this Java 21 Mega Capstone, you bring all 25 chapters together—Records/Classes, Collections `Map`/`Deque`, custom exception checks, and clean routing—to build a zero-dependency Java HTTP Request Router & JSON Engine.',
      asciiFlowchart: `  [ HTTP Request: "POST /api/add 15 27" ]
         |
         v  (Method Filter -> Map Route Dispatch -> JSON Formatter)
  [ 200 {"sum":42} | 404 {"error":"not_found"} | 405 MethodNotAllowed ]`,
      pseudocode: [
        '1. MODEL request metadata in a Java 21 record HttpReq(String method, String path)',
        '2. VALIDATE HTTP method ("GET" or "POST") -> reject unsupported verbs with 405',
        '3. DISPATCH route paths via Map lookup and format JSON response cleanly',
        '4. GUARD missing routes with 404 JSON error rather than throwing NullPointerException',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Spring Boot স্টাইল ব্যাকএন্ড, রুট ডিসপ্যাচ ম্যাপ ও ফুল-স্ট্যাক ইঞ্জিন (Mega Capstone)',
        explanation:
          'বিশ্বের বড় বড় ব্যাংক, পেমেন্ট গেটওয়ে ও এন্টারপ্রাইজ ওয়েব ব্যাকএন্ড (Spring Boot, Quarkus) Java 21 দিয়েই চলে! ব্রাউজারের ফ্রন্টএন্ড থেকে আসা প্রতিটি ক্লিক একটি HTTP রিকোয়েস্ট হিসেবে সার্ভারে পৌঁছায়—যেমন `POST /api/add 15 27`। Java ব্যাকএন্ডে প্রথমেই Auth ও মেথড ফিল্টার বসে: মেথড `GET` বা `POST` না হলে সাথে সাথেই `405 MethodNotAllowed` ফেরত দেয়। এরপর `Map<String, ...>` রাউট টেবিল থেকে সঠিক হ্যান্ডলার খুঁজে বের করে `long` প্রিসিশনে হিসাব কষে `200 {"sum":42}` JSON রেসপন্স পাঠায়! আর রাস্তা না মিললে কোনো `NullPointerException` ছাড়াই `404 {"error":"not_found"}` উত্তর দেয়। মনে রাখবে Java-তে স্ট্রিং তুলনা করতে কখনো `==` ব্যবহার করবে না—সবসময় `.equals()` ব্যবহার করবে! এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১–২৪-এ শেখা সব Java জ্ঞান একত্রে ব্যবহার করে একটি সম্পূর্ণ HTTP রাউটার ও JSON ইঞ্জিন তৈরি করবে!',
        everydayExample:
          'ব্যাংকের ফ্রন্ট ডেস্কে স্লিপ (`POST /api/add`) জমা দিলে টোকেন চেক করে নির্দিষ্ট কাউন্টারে (`Map` রাউটার) পাঠানো হয় ও রিসিট (`JSON`) প্রিন্ট হয়!',
        keyTakeaways: [
          'Java-তে HTTP পাথ ও মেথড তুলনায় সর্বদা `.equals()` ব্যবহার করবে, `==` নয়।',
          'Java 21 `record` ব্যবহার করে HTTP রিকোয়েস্ট ডেটা কম কোডে ও নিরাপদে মডেল করা যায়।',
          '`Map.getOrDefault()` বা নাল-চেক করলে অজানা রাউটে `NullPointerException` ছাড়াই ৪04 দেওয়া যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Java 21 Record HTTP Request Line Parser',
        englishParagraphs: [
          'A compact `record HttpReq(String method, String path) {}` holds parsed HTTP header fields cleanly without boilerplate getters or constructors.',
        ],
        banglaParagraphs: [
          'Java 21 `record` ব্যবহার করে HTTP রিকোয়েস্ট লাইনের মেথড ও পাথ আলাদা করে সংরক্ষণ করা হয়েছে।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> HttpReq[method=GET, path=/health]`,
        code: `public class Main {
    record HttpReq(String method, String path) {}
    public static void main(String[] args) {
        String[] parts = "GET /health HTTP/1.1".trim().split("\\\\s+");
        if (parts.length >= 2) {
            HttpReq req = new HttpReq(parts[0], parts[1]);
            System.out.println("method=" + req.method() + " path=" + req.path());
        }
    }
}`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'record HttpReq(String method, String path) {}', whatItMeans: 'Immutable Java 21 data carrier for parsed request line.', whyItIsThere: 'Eliminates getter/toString boilerplate cleanly.', ifDeletedError: 'Compile error: HttpReq cannot be resolved.' },
        ],
      },
      {
        id: 'java-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Structured JSON Response Formatter',
        englishParagraphs: [
          'Reading user parameters with `Scanner` and emitting `HTTP/1.1 200 OK` plus escaped JSON output using `String.formatted()`.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে ইউজার ও স্কোর পড়ে `HTTP/1.1 200 OK` ও নিখুঁত JSON প্রিন্ট করা হয়েছে।',
        ],
        memoryDiagram: `"argon 95" -> HTTP/1.1 200 OK + {"user":"argon","score":95}`,
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String user = sc.next();
        long score = sc.nextLong();
        System.out.println("HTTP/1.1 200 OK");
        System.out.println("{\\"user\\":\\"%s\\",\\"score\\":%d}".formatted(user, score));
    }
}`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'System.out.println("{\\"user\\":\\"%s\\",\\"score\\":%d}".formatted(user, score));', whatItMeans: 'Formats escaped JSON string with type-safe placeholders.', whyItIsThere: 'Produces deterministic JSON output.', ifDeletedError: 'Response body missing.' },
        ],
      },
      {
        id: 'java-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Route Map Table & Auth Filter Using Supplier',
        englishParagraphs: [
          'Combining `Map<String, Supplier<String>>` with a pre-route authentication token check models a Spring controller dispatch table cleanly.',
        ],
        banglaParagraphs: [
          'টোকেন যাচাই করার পর `Map<String, Supplier<String>>` থেকে O(1) সময়ে রাউট হ্যান্ডলার কল করা হয়েছে।',
        ],
        memoryDiagram: `/health secret -> auth OK -> routes.get("/health").get() -> 200`,
        code: `import java.util.*;
import java.util.function.Supplier;
public class Main {
    public static void main(String[] args) {
        Map<String, Supplier<String>> routes = Map.of(
            "/health", () -> "200 {\\"ok\\":true}",
            "/version", () -> "200 {\\"ver\\":\\"java21\\"}"
        );
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String path = sc.next(), tok = sc.next();
        if (!"secret".equals(tok)) { System.out.println("401 Unauthorized"); return; }
        Supplier<String> handler = routes.get(path);
        System.out.println(handler != null ? handler.get() : "404 NotFound");
    }
}`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'if (!"secret".equals(tok)) { System.out.println("401 Unauthorized"); return; }', whatItMeans: 'Null-safe string comparison blocking unauthorized access.', whyItIsThere: 'Protects endpoints cleanly.', ifDeletedError: 'Unauthenticated callers pass.' },
        ],
      },
      {
        id: 'java-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Full-Stack HTTP Router & JSON Engine',
        englishParagraphs: [
          'Processes `n` sequential API requests (`METHOD /path a b`), validates verbs (`405`), computes 64-bit `long` totals on `/api/add`, and falls back safely to `404` JSON.',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন: একাধিক HTTP রিকোয়েস্ট প্রসেস করে মেথড যাচাই, `/health` ও `/api/add` রাউটিং এবং JSON উত্তর তৈরি।',
        ],
        memoryDiagram: `Request Batch -> Verb Check -> Route Switch -> JSON Status`,
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            String m = sc.next(), p = sc.next();
            long a = sc.nextLong(), b = sc.nextLong();
            if (!"GET".equals(m) && !"POST".equals(m)) System.out.println("405 MethodNotAllowed");
            else if ("/health".equals(p)) System.out.println("200 {\\"status\\":\\"ok\\"}");
            else if ("/api/add".equals(p)) System.out.println("200 {\\"sum\\":" + (a + b) + "}");
            else System.out.println("404 {\\"error\\":\\"not_found\\"}");
        }
    }
}`,
        stdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
        expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'if (!"GET".equals(m) && !"POST".equals(m)) System.out.println("405 MethodNotAllowed");', whatItMeans: 'Uses constant-first .equals() to validate HTTP verb safely.', whyItIsThere: 'Rejects unsupported HTTP methods.', ifDeletedError: 'Unsupported verbs execute endpoint logic.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'record HttpReq(String method, String path) {}', whatItMeans: 'Defines immutable Java 21 request record.', whyItIsThere: 'Stores method and route path cleanly.', ifDeletedError: 'Compile error: HttpReq unknown.' },
      { lineNumber: 'Line 4', codeSnippet: 'String[] parts = "GET /health HTTP/1.1".trim().split("\\\\s+");', whatItMeans: 'Splits request line on whitespace.', whyItIsThere: 'Extracts request components safely.', ifDeletedError: 'Compile error: parts undefined.' },
      { lineNumber: 'Line 5', codeSnippet: 'if (parts.length >= 2) {', whatItMeans: 'Bounds check guarding array access.', whyItIsThere: 'Prevents ArrayIndexOutOfBoundsException.', ifDeletedError: 'Crashes on short lines.' },
      { lineNumber: 'Line 6', codeSnippet: 'HttpReq req = new HttpReq(parts[0], parts[1]);', whatItMeans: 'Constructs typed request carrier.', whyItIsThere: 'Encapsulates parsed HTTP verb and path.', ifDeletedError: 'req not declared.' },
      { lineNumber: 'Line 7', codeSnippet: 'System.out.println("method=" + req.method() + " path=" + req.path());', whatItMeans: 'Outputs parsed request fields.', whyItIsThere: 'Confirms tokenization.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "GET /health 0 0"', memoryOrStack: 'm="GET", p="/health"', note: 'Valid verb' },
      { step: 2, state: 'Check "/health".equals(p)', memoryOrStack: 'true -> print 200 ok', note: 'Health route hit' },
      { step: 3, state: 'Read "POST /api/add 15 27"', memoryOrStack: 'a+b = 42L', note: 'Prints 200 {"sum":42}' },
      { step: 4, state: 'Read "GET /unknown 0 0"', memoryOrStack: 'else -> 404 branch', note: 'Prints not_found JSON' },
    ],
    harryBugTraps: [
      {
        title: 'Using == Instead of .equals() for Route & Method Matching',
        brokenCode: `if (path == "/health") { ... } // Compares heap references -> almost always false!`,
        fixedCode: `public class Main { public static void main(String[] a) { String p = new String("/health"); System.out.println("/health".equals(p)); } }`,
        whyItBreaks: 'Scanner tokens are fresh String heap objects; == returns false even when characters match identically.',
      },
      {
        title: 'Calling handler.get() Without Null Check on Missing Route',
        brokenCode: `routes.get(unknownPath).get(); // Throws NullPointerException!`,
        fixedCode: `import java.util.*; public class Main { public static void main(String[] a) { var m = Map.of("/ok", 200); System.out.println(m.getOrDefault("/x", 404)); } }`,
        whyItBreaks: 'Map.get() returns null when route is absent; check != null or use getOrDefault.',
      },
      {
        title: 'Using Map.of() and Attempting to Mutate It Later',
        brokenCode: `var db = Map.of(1, 10); db.put(2, 20); // UnsupportedOperationException!`,
        fixedCode: `import java.util.*; public class Main { public static void main(String[] a) { var db = new HashMap<Integer, Long>(); db.put(5, 900L); System.out.println(db.get(5)); } }`,
        whyItBreaks: 'Map.of() creates an unmodifiable map; use new HashMap<>() for mutable in-memory stores.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-25-q1',
        difficulty: 'Easy',
        title: 'HTTP Status Labeler',
        prompt: 'Read int status code (200, 404, 500) and print OK / NOT_FOUND / SERVER_ERR.',
        banglaHint: 'ইঙ্গিত: `switch` এক্সপ্রেশন দিয়ে কোড ম্যাপ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int c = sc.nextInt();\n        System.out.println(c == 200 ? "OK" : (c == 404 ? "NOT_FOUND" : "SERVER_ERR"));\n    }\n}`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'java-ch-25-q2',
        difficulty: 'Easy',
        title: 'Safe JSON Pair Emitter',
        prompt: 'Read key and long value; output `{"<key>":<val>}`.',
        banglaHint: 'ইঙ্গিত: `formatted()` দিয়ে স্ট্রিং সাজাও।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String k = sc.next(); long v = sc.nextLong();\n        System.out.println("{\\"%s\\":%d}".formatted(k, v));\n    }\n}`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'java-ch-25-q3',
        difficulty: 'Medium',
        title: 'URL Query id Extractor',
        prompt: 'Read query string like `id=42&mode=pro`; print value of `id`.',
        banglaHint: 'ইঙ্গিত: `&` দিয়ে split করে `startsWith("id=")` চেক করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        for (String p : sc.next().split("&")) if (p.startsWith("id=")) System.out.println(p.substring(3));\n    }\n}`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'java-ch-25-q4',
        difficulty: 'Medium',
        title: 'Sliding Rate Limiter Counter',
        prompt: 'Read cap and n sorted timestamps; count requests accepted within 10s window of capacity cap.',
        banglaHint: 'ইঙ্গিত: `ArrayDeque<Long>` রেখে `t - q.peekFirst() >= 10` হলে `pollFirst()` করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int cap = sc.nextInt(), n = sc.nextInt(), ok = 0;\n        Deque<Long> q = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) {\n            long t = sc.nextLong();\n            while (!q.isEmpty() && t - q.peekFirst() >= 10) q.pollFirst();\n            if (q.size() < cap) { q.addLast(t); ok++; }\n        }\n        System.out.println(ok);\n    }\n}`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'java-ch-25-q5',
        difficulty: 'Hard',
        title: 'In-Memory REST KV Store',
        prompt: 'Read n commands (`SET id val` or `GET id`); print stored value (0 if unset) for each GET.',
        banglaHint: 'ইঙ্গিত: `HashMap<Integer, Long>`-এ সেট করে `getOrDefault(id, 0L)` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<Integer, Long> db = new HashMap<>();\n        for (int i = 0; i < n; i++) {\n            String cmd = sc.next(); int id = sc.nextInt();\n            if ("SET".equals(cmd)) db.put(id, sc.nextLong());\n            else System.out.println(db.getOrDefault(id, 0L));\n        }\n    }\n}`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): Java 21 Full-Stack HTTP Router & JSON Engine',
      description: 'Validates HTTP verbs, routes requests cleanly, and generates structured JSON responses.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ Java HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String m = sc.next(), p = sc.next();\n            long a = sc.nextLong(), b = sc.nextLong();\n            if (!"GET".equals(m) && !"POST".equals(m)) System.out.println("405 MethodNotAllowed");\n            else if ("/health".equals(p)) System.out.println("200 {\\"status\\":\\"ok\\"}");\n            else if ("/api/add".equals(p)) System.out.println("200 {\\"sum\\":" + (a + b) + "}");\n            else System.out.println("404 {\\"error\\":\\"not_found\\"}");\n        }\n    }\n}`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String m = sc.next(), p = sc.next();\n            long a = sc.nextLong(), b = sc.nextLong();\n            if (!"GET".equals(m) && !"POST".equals(m)) System.out.println("405 MethodNotAllowed");\n            else if ("/health".equals(p)) System.out.println("200 {\\"status\\":\\"ok\\"}");\n            else if ("/api/add".equals(p)) System.out.println("200 {\\"sum\\":" + (a + b) + "}");\n            else System.out.println("404 {\\"error\\":\\"not_found\\"}");\n        }\n    }\n}`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'java25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'java25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};

