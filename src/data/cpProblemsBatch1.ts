import type { Problem } from '../types/academy';

export const CP_PROBLEMS_BATCH_1: Problem[] = [
  // =========================================================================
  // 1. GREEDY — Codeforces Div. 2 A · 800
  // =========================================================================
  {
    id: 'cf-watermelon-parity',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Greedy',
    sourceTag: 'Codeforces Div. 2 A · 800',
    companyTags: ['Codeforces 800', 'Div. 2 A', 'Greedy Parity'],
    difficulty: 'Easy',
    title: 'Watermelon Even Split',
    banglaTitle: 'তরমুজ সম-জোড় ভাগ (প্যারিটি গ্রিডি)',
    xpReward: 90,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Pete and Billy bought a watermelon weighing w kilos. They want to divide the melon into two pieces so that each piece weighs a positive even number of kilos (the two pieces do not have to weigh the same). Determine if such a split is possible.',
    inputFormat: 'A single integer w (1 <= w <= 100), the weight of the watermelon in kilos.',
    outputFormat: 'Print YES if the watermelon can be divided into two positive even weights, otherwise print NO.',
    constraints: ['1 <= w <= 100', 'Both parts must be strictly positive (> 0) and even.'],
    samples: [
      { id: 'wm-s1', input: '8', expectedOutput: 'YES', explanation: '8 = 2 + 6 (or 4 + 4), both parts are positive and even.' },
      { id: 'wm-s2', input: '5', expectedOutput: 'NO', explanation: 'Odd weight 5 cannot be the sum of two even integers.' },
    ],
    hiddenTests: [
      { id: 'wm-h1', input: '2', expectedOutput: 'NO', isHidden: true },
      { id: 'wm-h2', input: '4', expectedOutput: 'YES', isHidden: true },
      { id: 'wm-h3', input: '99', expectedOutput: 'NO', isHidden: true },
    ],
    hints: [
      'Sum of two even numbers is ALWAYS even. What about odd w?',
      'Wait! Is EVERY even number w valid? Check w = 2 very carefully!',
      'Condition: w > 2 && w % 2 == 0. For w >= 4 even, we can always split as 2 + (w - 2).',
    ],
    approaches: {
      brute: {
        label: 'Test All Splits (a, w - a) from 1..w-1',
        timeComplexity: 'O(w)',
        spaceComplexity: 'O(1)',
        intuition: 'Loop a from 1 to w - 1 and check whether both a % 2 == 0 and (w - a) % 2 == 0.',
        banglaIntuition: '১ থেকে w-1 পর্যন্ত সব জোড়া (a, w-a) ভাগ করে দেখে নেওয়া কোনটাতে দুই অংশই জোড় হয়।',
        whyTleOrSuboptimal: 'Unnecessary loop when an O(1) parity formula solves any w up to 10^18.',
        pseudocode: 'for a in 1..w-1: if a%2==0 and (w-a)%2==0: return YES; return NO',
      },
      better: {
        label: 'Smallest Even Piece Greedy Trial (2 and w - 2)',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        intuition: 'Greedily try giving Billy the smallest positive even weight 2, then check if the remaining (w - 2) is positive and even.',
        banglaIntuition: 'একজনকে সবচেয়ে ছোট ধনাত্মক জোড় সংখ্যা ২ কেজি দিয়ে বাকি (w - 2) ধনাত্মক ও জোড় কি না দেখা।',
        whyTleOrSuboptimal: 'Equivalent to checking w > 2 and w % 2 == 0, expressed greedily.',
        pseudocode: 'b = w - 2; return (b > 0 and b % 2 == 0) ? YES : NO',
      },
      optimal: {
        label: 'O(1) Parity & Edge-Case Formula',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        intuition: 'Every even integer >= 4 decomposes into 2 + (w - 2), both positive and even. Only w = 2 fails because 2 = 1 + 1 (odd).',
        banglaIntuition: '২ বাদে যেকোনো জোড় সংখ্যাকেই (২ + বাকি জোড় অংশ) আকারে ভাগ করা যায়। তাই শুধু w > 2 এবং w % 2 == 0 চেক করলেই O(1)-এ উত্তর আসে!',
        whyTleOrSuboptimal: 'Div. 2 A Classic! Catches the famous w = 2 corner case cleanly.',
        pseudocode: 'print (w > 2 and w % 2 == 0) ? "YES" : "NO"',
      },
    },
    editorial: {
      bruteForceReason: 'Looping over all splits works for w <= 100 but misses the mathematical invariant that scales to any integer.',
      optimalApproach: 'Output YES if and only if w > 2 and w % 2 == 0.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'w = 2', memoryOrStack: '2 > 2 is false', note: 'Only positive split is 1 + 1 -> NO' },
        { step: 2, state: 'w = 8', memoryOrStack: '8 > 2 && 8 % 2 == 0', note: '2 + 6 valid -> YES' },
      ],
      banglaEditorial:
        'দুইটি জোড় সংখ্যার যোগফল সবসময় জোড় হয়। তবে w = 2 হলে একমাত্র ধনাত্মক ভাগ হলো 1 + 1 (বিজোড়), তাই w = 2 এর উত্তর NO! বাকি সব জোড় সংখ্যা (4, 6, 8...) কে অন্তত 2 + (w - 2) হিসেবে ভাগ করা সম্ভব।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    int w; scanf("%d", &w);\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int w; cin >> w;\n    return 0;\n}`,
      python: `w = int(input())\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int w = new Scanner(System.in).nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst w = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\n`,
      typescript: `import * as fs from 'fs';\nconst w: number = Number(fs.readFileSync(0, 'utf8').trim());\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int w;
    if (scanf("%d", &w) != 1) return 0;
    printf("%s\\n", (w > 2 && w % 2 == 0) ? "YES" : "NO");
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int w{};
    if (cin >> w) {
        cout << (w > 2 && w % 2 == 0 ? "YES" : "NO") << '\\n';
    }
    return 0;
}`,
      python: `import sys
w = int(sys.stdin.read().strip())
print("YES" if w > 2 and w % 2 == 0 else "NO")`,
      java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int w = Integer.parseInt(br.readLine().trim());
        System.out.println(w > 2 && w % 2 == 0 ? "YES" : "NO");
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const w = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());
console.log(w > 2 && w % 2 === 0 ? 'YES' : 'NO');`,
      typescript: `import * as fs from 'fs';
const w: number = Number(fs.readFileSync(0, 'utf8').trim());
console.log(w > 2 && w % 2 === 0 ? 'YES' : 'NO');`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let w: i32 = s.trim().parse().unwrap();
    println!("{}", if w > 2 && w % 2 == 0 { "YES" } else { "NO" });
}`,
    },
  },

  // =========================================================================
  // 2. GREEDY — CodeChef 1-Star / CF Div. 2 A · 800
  // =========================================================================
  {
    id: 'cf-team-threshold',
    category: 'cp',
    platform: 'CodeChef',
    topic: 'Greedy',
    sourceTag: 'CodeChef 1-Star · CF 800',
    companyTags: ['CodeChef 1-Star', 'Codeforces 800', 'Majority Vote'],
    difficulty: 'Easy',
    title: 'Team Contest Majority Vote',
    banglaTitle: 'দলীয় প্রোগ্রামিং কনটেস্ট ভোট গণনা',
    xpReward: 95,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Three friends Petya, Vasya, and Tonya form an ICPC team. Before the contest of n problems, each writes 1 if sure about solving problem i, or 0 otherwise. The team implements a problem if at least two members are sure about it. Count how many problems they implement.',
    inputFormat: 'First line: integer n (1 <= n <= 1000). Next n lines: three space-separated integers (each 0 or 1).',
    outputFormat: 'Print a single integer: the total number of problems the team solves.',
    constraints: ['1 <= n <= 1000', 'Each confidence flag is either 0 or 1.'],
    samples: [
      { id: 'tm-s1', input: '3\n1 1 0\n1 1 1\n1 0 0', expectedOutput: '2', explanation: 'Problems 1 and 2 have sums >= 2.' },
    ],
    hiddenTests: [
      { id: 'tm-h1', input: '2\n1 0 0\n0 1 1', expectedOutput: '1', isHidden: true },
      { id: 'tm-h2', input: '4\n0 0 0\n1 1 1\n0 1 0\n1 0 1', expectedOutput: '2', isHidden: true },
    ],
    hints: [
      'Each problem is completely independent of the others.',
      'Since flags are only 0 or 1, "at least two 1s" is equivalent to a + b + c >= 2.',
      'Maintain a running counter ans and stream rows in O(1) memory without storing a 2D matrix.',
    ],
    approaches: {
      brute: {
        label: 'Store n x 3 Matrix & Count Manually',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Read the entire n x 3 grid into memory first, then loop again checking pairwise conditions (a&b || b&c || a&c).',
        banglaIntuition: 'পুরো ২ডি অ্যারে মেমোরিতে জমা রেখে তারপর (a&b || b&c || a&c) শর্ত দিয়ে গোনা।',
        whyTleOrSuboptimal: 'Allocates O(n) matrix memory unnecessarily when each row can be processed on the fly.',
        pseudocode: 'grid = read(n, 3); ans = 0; for (a,b,c) in grid: if (a&b)|(b&c)|(a&c): ans++',
      },
      better: {
        label: 'Row Sum Threshold Comparison',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Read rows into an array and increment ans whenever (a + b + c) >= 2.',
        banglaIntuition: 'প্রতি সারির তিনটি মান যোগ করে ২ বা তার বেশি হলে কাউন্টার বাড়ানো।',
        whyTleOrSuboptimal: 'Clean logic, still keeps full input array in memory.',
        pseudocode: 'for row in rows: ans += (sum(row) >= 2)',
      },
      optimal: {
        label: 'O(1)-Space Streaming Row Accumulation',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Accumulate ans += ((a + b + c) >= 2) while streaming tokens one row at a time with zero auxiliary arrays.',
        banglaIntuition: 'অতিরিক্ত কোনো অ্যারে ছাড়াই প্রতিটি সারি ইনপুট নেওয়ার সাথে সাথেই a + b + c >= 2 কি না দেখে ans বাড়ালে মেমোরি থাকে O(1)!',
        whyTleOrSuboptimal: 'Optimal streaming solution: linear time and constant memory.',
        pseudocode: 'ans=0; repeat n times: read a,b,c; if a+b+c >= 2: ans++; print ans',
      },
    },
    editorial: {
      bruteForceReason: 'Storing an n x 3 table wastes O(n) memory when problems are independent.',
      optimalApproach: 'Stream (a, b, c) triples and increment answer whenever a + b + c >= 2 in O(n) time and O(1) space.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'Row 1: 1 1 0', memoryOrStack: 'sum=2 >= 2 -> ans=1', note: 'Solved' },
        { step: 2, state: 'Row 2: 1 1 1', memoryOrStack: 'sum=3 >= 2 -> ans=2', note: 'Solved' },
        { step: 3, state: 'Row 3: 1 0 0', memoryOrStack: 'sum=1 < 2 -> ans=2', note: 'Skipped' },
      ],
      banglaEditorial:
        'যেহেতু ইনপুট শুধু ০ এবং ১, তাই কমপক্ষে দুইজন নিশ্চিত হওয়ার শর্তটি সোজা হয়ে দাঁড়ায়: a + b + c >= 2। কোনো অ্যারে ছাড়াই সরাসরি স্ট্রিমিং লুপে এটি O(1) স্পেসে গণনা করা যায়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    int n; scanf("%d", &n);\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n, a, b, c, ans = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        scanf("%d %d %d", &a, &b, &c);
        if (a + b + c >= 2) ans++;
    }
    printf("%d\\n", ans);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; cin >> n;
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        int a, b, c;
        cin >> a >> b >> c;
        ans += (a + b + c >= 2);
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
ans = sum(1 for i in range(n) if d[1 + 3*i] + d[2 + 3*i] + d[3 + 3*i] >= 2)
print(ans)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        int ans = 0;
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int s = Integer.parseInt(st.nextToken()) + Integer.parseInt(st.nextToken()) + Integer.parseInt(st.nextToken());
            if (s >= 2) ans++;
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
let ans = 0;
for (let i = 0; i < d[0]; i++) {
  if (d[1 + 3 * i] + d[2 + 3 * i] + d[3 + 3 * i] >= 2) ans++;
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let ans = 0;
for (let i = 0; i < d[0]; i++) {
  if (d[1 + 3 * i] + d[2 + 3 * i] + d[3 + 3 * i] >= 2) ans++;
}
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let ans = (0..n).filter(|&i| d[1 + 3 * i] + d[2 + 3 * i] + d[3 + 3 * i] >= 2).count();
    println!("{}", ans);
}`,
    },
  },

  // =========================================================================
  // 3. GREEDY — CodeChef 2-Star · Interval Scheduling
  // =========================================================================
  {
    id: 'cc-greedy-activity-slots',
    category: 'cp',
    platform: 'CodeChef',
    topic: 'Greedy',
    sourceTag: 'CodeChef 2-Star · Interval Greedy',
    companyTags: ['CodeChef 2-Star', 'CSES Movie Festival', 'Amazon', 'Greedy'],
    difficulty: 'Medium',
    title: 'Maximum Non-Overlapping Contests',
    banglaTitle: 'সর্বাধিক ওভারল্যাপহীন কনটেস্ট শিডিউলিং (গ্রিডি)',
    xpReward: 135,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'During Coding Week, n contests are scheduled. Contest i runs during [start_i, end_i]. You can attend a contest only from start to end, and you may join another contest immediately when the previous one ends (start_next >= end_prev). Find the maximum number of contests you can attend.',
    inputFormat: 'First line: integer n (1 <= n <= 10^5). Next n lines: two integers start_i and end_i (0 <= start_i < end_i <= 10^9).',
    outputFormat: 'Print a single integer: the maximum number of non-overlapping contests.',
    constraints: ['1 <= n <= 10^5', '0 <= start_i < end_i <= 10^9'],
    samples: [
      { id: 'act-s1', input: '4\n1 3\n2 5\n3 9\n6 8', expectedOutput: '2', explanation: 'Pick [1, 3] then [6, 8].' },
    ],
    hiddenTests: [
      { id: 'act-h1', input: '3\n1 2\n2 3\n3 4', expectedOutput: '3', isHidden: true },
      { id: 'act-h2', input: '4\n1 10\n2 3\n4 5\n6 7', expectedOutput: '3', isHidden: true },
    ],
    hints: [
      'Sorting by start time fails! Counterexample: [1, 10], [2, 3], [4, 5] — picking [1, 10] blocks everything else!',
      'What choice leaves the MOST remaining time for future contests? Finishing as early as possible!',
      'Sort intervals by ascending end time (tie-break by start), then greedily pick every contest with start >= lastEnd.',
    ],
    approaches: {
      brute: {
        label: 'Subset Enumeration / Backtracking (First Thought)',
        timeComplexity: 'O(2^n)',
        spaceComplexity: 'O(n)',
        intuition: 'Try every possible subset of intervals, verify none overlap, and track the largest valid subset.',
        banglaIntuition: 'সব সম্ভাব্য সাবসেট নিয়ে কোনো ওভারল্যাপ না থাকলে সর্বোচ্চ সংখ্যা খোঁজা—এটি O(2^n) সময়ে TLE দেয়।',
        whyTleOrSuboptimal: 'Exponential TLE! Completely unusable beyond n = 22.',
        pseudocode: 'for mask in 0..(1<<n): if nonOverlapping(mask): best = max(best, popcount(mask))',
      },
      better: {
        label: 'Sort by Start + Weighted-Interval DP with Binary Search',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort by start time and run DP[i] = max(DP[i+1], 1 + DP[nextNonOverlap(i)]) using upper_bound.',
        banglaIntuition: 'শুরুর সময় অনুযায়ী সর্ট করে বাইনারি সার্চ সহ ডায়নামিক প্রোগ্রামিং চালানো।',
        whyTleOrSuboptimal: 'Works in O(n log n), but DP table + binary searches add unnecessary complexity when weights are all 1.',
        pseudocode: 'sort by start; dp[i] = max(dp[i+1], 1 + dp[lower_bound(end[i])])',
      },
      optimal: {
        label: 'Sort by Earliest End Time Greedy',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort all intervals by end_i ascending. Always select the next interval whose start_i >= currentEnd, updating currentEnd = end_i.',
        banglaIntuition: 'যে কনটেস্ট সবার আগে শেষ হয় (Earliest End Time), সেটি নিলে পরের কাজগুলোর জন্য সর্বোচ্চ ফাঁকা সময় বেঁচে থাকে! তাই end_i অনুযায়ী সর্ট করে এক পাসেই উত্তর আসে।',
        whyTleOrSuboptimal: 'Classic Exchange-Argument Greedy Winner! Simple, fast, O(n log n).',
        pseudocode: 'sort intervals by (end, start); lastEnd = -1; ans = 0; for (s, e): if s >= lastEnd: ans++; lastEnd = e',
      },
    },
    editorial: {
      bruteForceReason: 'Sorting by start time or shortest duration fails counterexamples, and subset DP takes O(2^n) unless binary-searched.',
      optimalApproach: 'Sort contests by ascending finish time (end_i) and greedily accept every interval with start_i >= lastEnd.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Sort by end', memoryOrStack: '[1,3], [2,5], [6,8], [3,9]', note: 'Sorted order' },
        { step: 2, state: 'Take [1,3]', memoryOrStack: 'lastEnd=3, ans=1', note: 'Skip [2,5] since 2 < 3' },
        { step: 3, state: 'Take [6,8]', memoryOrStack: '6 >= 3 -> lastEnd=8, ans=2', note: 'Skip [3,9] since 3 < 8' },
      ],
      banglaEditorial:
        'অনেকেই শুরুর সময় বা দৈর্ঘ্য দিয়ে সর্ট করে ভুল করে—যেমন [1, 10] শুরুতে থাকলেও ওটা নিলে [2, 3], [4, 5], [6, 7] সবগুলো বাদ পড়ে যায়! সঠিক গ্রিডি হলো: শেষ হওয়ার সময় (end_i) অনুযায়ী ছোট থেকে বড় সর্ট করা, কারণ যেটি আগে শেষ হবে তা পরের কনটেস্টের জন্য সবচেয়ে বেশি সুযোগ তৈরি করে।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
typedef struct { long long s, e; } Seg;
int cmp(const void *a, const void *b) {
    const Seg *x = a, *y = b;
    if (x->e != y->e) return (x->e > y->e) - (x->e < y->e);
    return (x->s > y->s) - (x->s < y->s);
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    Seg *a = malloc((size_t)n * sizeof(Seg));
    for (int i = 0; i < n; i++) scanf("%lld %lld", &a[i].s, &a[i].e);
    qsort(a, (size_t)n, sizeof(Seg), cmp);
    long long lastEnd = -1; int ans = 0;
    for (int i = 0; i < n; i++) {
        if (a[i].s >= lastEnd) { ans++; lastEnd = a[i].e; }
    }
    printf("%d\\n", ans);
    free(a);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; cin >> n;
    vector<pair<long long, long long>> iv(n);
    for (auto &[s, e] : iv) cin >> s >> e;
    ranges::sort(iv, [](const auto &a, const auto &b) {
        return a.second != b.second ? a.second < b.second : a.first < b.first;
    });
    long long last_end = -1;
    int ans = 0;
    for (auto [s, e] : iv) {
        if (s >= last_end) {
            ++ans;
            last_end = e;
        }
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
iv = [(d[1 + 2*i], d[2 + 2*i]) for i in range(n)]
iv.sort(key=lambda p: (p[1], p[0]))
last_end, ans = -1, 0
for s, e in iv:
    if s >= last_end:
        ans += 1
        last_end = e
print(ans)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        long[][] iv = new long[n][2];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            iv[i][0] = Long.parseLong(st.nextToken());
            iv[i][1] = Long.parseLong(st.nextToken());
        }
        Arrays.sort(iv, (a, b) -> a[1] != b[1] ? Long.compare(a[1], b[1]) : Long.compare(a[0], b[0]));
        long lastEnd = -1; int ans = 0;
        for (long[] seg : iv) {
            if (seg[0] >= lastEnd) { ans++; lastEnd = seg[1]; }
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0];
const iv = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
let lastEnd = -1, ans = 0;
for (const [s, e] of iv) {
  if (s >= lastEnd) { ans++; lastEnd = e; }
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const iv: number[][] = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
let lastEnd = -1;
let ans = 0;
for (const seg of iv) {
  if (seg[0] >= lastEnd) { ans++; lastEnd = seg[1]; }
}
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut iv: Vec<(i64, i64)> = (0..n).map(|i| (d[1 + 2 * i], d[2 + 2 * i])).collect();
    iv.sort_unstable_by_key(|&(st, en)| (en, st));
    let mut last_end = -1;
    let mut ans = 0;
    for (st, en) in iv {
        if st >= last_end {
            ans += 1;
            last_end = en;
        }
    }
    println!("{}", ans);
}`,
    },
  },

  // =========================================================================
  // 4. NUMBER THEORY / SIEVE — Codeforces Div. 2 B · 1300
  // =========================================================================
  {
    id: 'cf-t-primes-sieve',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Number Theory / Sieve',
    sourceTag: 'Codeforces Div. 2 B · 1300',
    companyTags: ['Codeforces 1300', 'Div. 2 B', 'Sieve of Eratosthenes'],
    difficulty: 'Medium',
    title: 'T-Primes (Exactly Three Divisors)',
    banglaTitle: 'টি-প্রাইম সংখ্যা যাচাই (সিভ ও বর্গমূল)',
    xpReward: 150,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    statement:
      'A positive integer is called a T-prime if it has exactly three distinct positive divisors. For example, 4 has divisors {1, 2, 4}. Given n integers x_i (1 <= x_i <= 10^12), determine for each x_i whether it is a T-prime.',
    inputFormat: 'First line: integer n (1 <= n <= 10^5). Second line: n space-separated integers x_i.',
    outputFormat: 'Print n lines: YES if x_i is a T-prime, otherwise NO.',
    constraints: ['1 <= n <= 10^5', '1 <= x_i <= 10^12 (requires 64-bit integer!).'],
    samples: [
      { id: 'tp-s1', input: '3\n4 5 6', expectedOutput: 'YES\nNO\nNO', explanation: '4=2^2 has {1,2,4}; 5 has {1,5}; 6 has {1,2,3,6}.' },
    ],
    hiddenTests: [
      { id: 'tp-h1', input: '3\n1 9 999966000289', expectedOutput: 'NO\nYES\nYES', isHidden: true },
      { id: 'tp-h2', input: '3\n16 25 49', expectedOutput: 'NO\nYES\nYES', isHidden: true },
    ],
    hints: [
      'Divisors normally come in pairs (d, x/d). For the total divisor count to be ODD (specifically 3), x MUST be a perfect square p^2!',
      'If x = r^2 and r is composite (say r = a*b), then x has >= 5 divisors (1, a, b, r, x). So r MUST be prime!',
      'Precompute primes up to 10^6 with Sieve of Eratosthenes. For each x: compute exact integer sqrt r; print YES iff r*r == x and isPrime[r].',
    ],
    approaches: {
      brute: {
        label: 'Count All Divisors up to sqrt(x) per Query',
        timeComplexity: 'O(n * sqrt(x))',
        spaceComplexity: 'O(1)',
        intuition: 'For each of the 10^5 numbers, loop d = 1..sqrt(x) to count divisors and check if count == 3.',
        banglaIntuition: 'প্রতিটি সংখ্যার জন্য 1 থেকে sqrt(x) পর্যন্ত লুপ চালিয়ে ভাজক গোনা—এতে 10^5 * 10^6 = 10^11 অপারেশন লেগে TLE হয়!',
        whyTleOrSuboptimal: 'Severe TLE! 10^5 * 10^6 = 10^11 operations far exceeds 2 seconds.',
        pseudocode: 'for x in queries: cnt=0; for d in 1..sqrt(x): ...; print cnt==3',
      },
      better: {
        label: 'Check Square Root + Primality Trial Division',
        timeComplexity: 'O(n * x^(1/4))',
        spaceComplexity: 'O(1)',
        intuition: 'First check x is a perfect square r^2, then test if r <= 10^6 is prime in O(sqrt(r)) = O(1000) steps.',
        banglaIntuition: 'বর্গমূল r বের করে r মৌলিক কি না সেটা O(sqrt(r)) লুপে যাচাই করা।',
        whyTleOrSuboptimal: 'Up to 10^8 inner loop checks in worst case—borderline TLE in Python/Java!',
        pseudocode: 'r = isqrt(x); if r*r == x and isPrimeTrial(r): YES else NO',
      },
      optimal: {
        label: 'Sieve of Eratosthenes up to 10^6 + O(1) Query Check',
        timeComplexity: 'O(M log log M + n)',
        spaceComplexity: 'O(M), M = 10^6',
        intuition: 'Run Sieve once up to M = 10^6. A number x <= 10^12 has 3 divisors iff x = p^2 for prime p <= 10^6, checked in O(1) via exact integer sqrt.',
        banglaIntuition: 'কেবল মৌলিক সংখ্যার বর্গ (p^2)-এরই ঠিক ৩টি ভাজক থাকে: {1, p, p^2}! তাই একবার 10^6 পর্যন্ত Sieve বানিয়ে নিলে প্রতি কুয়েরি O(1) সময়ে যাচাই হয়।',
        whyTleOrSuboptimal: 'Div. 2 B Classic! Instant O(1) per query after O(M log log M) sieve.',
        pseudocode: 'sieve(10^6); for x in queries: r = isqrt(x); print (r*r == x && prime[r]) ? YES : NO',
      },
    },
    editorial: {
      bruteForceReason: 'Counting divisors or running trial-division primality on 10^5 inputs up to 10^12 takes 10^8 to 10^11 operations and causes TLE.',
      optimalApproach: 'An integer has 3 divisors iff it equals p^2 for prime p. Precompute primes up to 10^6 using Sieve of Eratosthenes and test exact integer square root in O(1) per query.',
      timeComplexity: 'O(M log log M + n), M = 10^6',
      spaceComplexity: 'O(M)',
      dryRunSteps: [
        { step: 1, state: 'Sieve M = 10^6', memoryOrStack: 'prime[2]=T, prime[3]=T, prime[4]=F', note: 'Precomputed once' },
        { step: 2, state: 'Query x = 4', memoryOrStack: 'r = 2, 2*2==4, prime[2]==T', note: 'YES ({1,2,4})' },
        { step: 3, state: 'Query x = 16', memoryOrStack: 'r = 4, 4*4==16, prime[4]==F', note: 'NO (5 divisors)' },
      ],
      banglaEditorial:
        'সাধারণ সংখ্যার ভাজক জোড়ায় জোড়ায় থাকে, তাই বিজোড় সংখ্যক ভাজক থাকতে হলে সংখ্যাটিকে অবশ্যই পূর্ণবর্গ (r^2) হতে হবে। আবার r যদি যৌগিক হয়, তবে ৩টির বেশি ভাজক থাকবে। তাই একমাত্র শর্ত: x = p^2 যেখানে p একটি মৌলিক সংখ্যা! ১০^১২ পর্যন্ত x-এর জন্য p সর্বোচ্চ ১০^৬, যা Sieve দিয়ে সহজেই প্রি-কম্পিউট করা যায়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#define MAXP 1000000
int main(void) {
    unsigned char *prime = malloc(MAXP + 1);
    for (int i = 0; i <= MAXP; i++) prime[i] = 1;
    prime[0] = prime[1] = 0;
    for (int i = 2; (long long)i * i <= MAXP; i++) {
        if (prime[i]) for (int j = i * i; j <= MAXP; j += i) prime[j] = 0;
    }
    int n;
    if (scanf("%d", &n) != 1) { free(prime); return 0; }
    for (int i = 0; i < n; i++) {
        long long x; scanf("%lld", &x);
        long long r = (long long)sqrt((double)x);
        while (r * r < x) r++;
        while (r * r > x) r--;
        printf("%s\\n", (r * r == x && r <= MAXP && prime[r]) ? "YES" : "NO");
    }
    free(prime);
    return 0;
}`,
      cpp: `#include <cmath>
#include <cstdint>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    constexpr int MAXP = 1'000'000;
    vector<uint8_t> prime(MAXP + 1, 1);
    prime[0] = prime[1] = 0;
    for (int i = 2; 1LL * i * i <= MAXP; ++i) {
        if (prime[i]) {
            for (int j = i * i; j <= MAXP; j += i) prime[j] = 0;
        }
    }
    int n{}; cin >> n;
    while (n--) {
        long long x{}; cin >> x;
        long long r = static_cast<long long>(sqrtl(static_cast<long double>(x)));
        while (r * r < x) ++r;
        while (r * r > x) --r;
        cout << (r * r == x && r <= MAXP && prime[r] ? "YES" : "NO") << '\\n';
    }
    return 0;
}`,
      python: `import math, sys
MAXP = 1_000_000
prime = bytearray([1]) * (MAXP + 1)
prime[0] = prime[1] = 0
for i in range(2, int(MAXP ** 0.5) + 1):
    if prime[i]:
        prime[i * i : MAXP + 1 : i] = bytearray(len(range(i * i, MAXP + 1, i)))
d = list(map(int, sys.stdin.read().split()))
out = []
for x in d[1 : 1 + d[0]]:
    r = math.isqrt(x)
    out.append("YES" if r * r == x and r <= MAXP and prime[r] else "NO")
print("\\n".join(out))`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        final int MAXP = 1_000_000;
        boolean[] prime = new boolean[MAXP + 1];
        Arrays.fill(prime, true);
        prime[0] = prime[1] = false;
        for (int i = 2; (long) i * i <= MAXP; i++) {
            if (prime[i]) for (int j = i * i; j <= MAXP; j += i) prime[j] = false;
        }
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer("");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long x = Long.parseLong(st.nextToken());
            long r = (long) Math.sqrt(x);
            while (r * r < x) r++;
            while (r * r > x) r--;
            sb.append(r * r == x && r <= MAXP && prime[(int) r] ? "YES\\n" : "NO\\n");
        }
        System.out.print(sb);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const MAXP = 1000000;
const prime = new Uint8Array(MAXP + 1).fill(1);
prime[0] = prime[1] = 0;
for (let i = 2; i * i <= MAXP; i++) {
  if (prime[i]) for (let j = i * i; j <= MAXP; j += i) prime[j] = 0;
}
const out = [];
for (let i = 1; i <= d[0]; i++) {
  const x = d[i];
  const r = Math.floor(Math.sqrt(x));
  out.push(r * r === x && r <= MAXP && prime[r] ? 'YES' : 'NO');
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const MAXP = 1000000;
const prime = new Uint8Array(MAXP + 1).fill(1);
prime[0] = prime[1] = 0;
for (let i = 2; i * i <= MAXP; i++) {
  if (prime[i]) for (let j = i * i; j <= MAXP; j += i) prime[j] = 0;
}
const out: string[] = [];
for (let i = 1; i <= d[0]; i++) {
  const x = d[i];
  const r = Math.floor(Math.sqrt(x));
  out.push(r * r === x && r <= MAXP && prime[r] ? 'YES' : 'NO');
}
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    const MAXP: usize = 1_000_000;
    let mut prime = vec![true; MAXP + 1];
    prime[0] = false; prime[1] = false;
    let mut i = 2;
    while i * i <= MAXP {
        if prime[i] {
            let mut j = i * i;
            while j <= MAXP { prime[j] = false; j += i; }
        }
        i += 1;
    }
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut out = Vec::with_capacity(n);
    for _ in 0..n {
        let x: u64 = it.next().unwrap().parse().unwrap();
        let mut r = (x as f64).sqrt() as u64;
        while r * r < x { r += 1; }
        while r * r > x { r -= 1; }
        if r * r == x && (r as usize) <= MAXP && prime[r as usize] {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    println!("{}", out.join("\\n"));
}`,
    },
  },

  // =========================================================================
  // 5. NUMBER THEORY / SIEVE — CodeChef 2-Star · Sieve + Prefix Queries
  // =========================================================================
  {
    id: 'cc-sieve-prime-count',
    category: 'cp',
    platform: 'CodeChef',
    topic: 'Number Theory / Sieve',
    sourceTag: 'CodeChef 2-Star · Sieve + Prefix',
    companyTags: ['CodeChef 2-Star', 'Number Theory', 'Prefix Sieve'],
    difficulty: 'Medium',
    title: 'Prime Range Counting Queries',
    banglaTitle: 'নির্দিষ্ট সীমায় মৌলিক সংখ্যা গণনা (সিভ + প্রিফিক্স সাম)',
    xpReward: 140,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'You are given q queries. Each query specifies two integers L and R (1 <= L <= R <= 10^6). For each query, output how many prime numbers exist in the closed range [L, R].',
    inputFormat: 'First line: integer q (1 <= q <= 10^5). Next q lines: two integers L and R.',
    outputFormat: 'Print q lines, each containing the number of primes in [L, R].',
    constraints: ['1 <= q <= 10^5', '1 <= L <= R <= 10^6'],
    samples: [
      { id: 'sp-s1', input: '3\n1 10\n11 20\n2 2', expectedOutput: '4\n4\n1', explanation: '[1,10]: 2,3,5,7 (4); [11,20]: 11,13,17,19 (4); [2,2]: 2 (1).' },
    ],
    hiddenTests: [
      { id: 'sp-h1', input: '2\n1 1\n90 100', expectedOutput: '0\n1', isHidden: true },
      { id: 'sp-h2', input: '2\n1 100\n999900 1000000', expectedOutput: '25\n8', isHidden: true },
    ],
    hints: [
      'Testing every number in [L, R] inside each query repeats primality checks billions of times across 10^5 queries!',
      'Run Sieve of Eratosthenes ONCE up to 10^6 so prime[x] is known in O(1).',
      'Build a prefix sum array pref[i] = pref[i - 1] + prime[i]. Answer [L, R] in O(1) via pref[R] - pref[L - 1]!',
    ],
    approaches: {
      brute: {
        label: 'Trial Division Over Every [L..R] per Query',
        timeComplexity: 'O(q * (R - L) * sqrt(R))',
        spaceComplexity: 'O(1)',
        intuition: 'Loop x from L to R inside every query and divide x by 2..sqrt(x) to test primality.',
        banglaIntuition: 'প্রতিটি কুয়েরিতে L থেকে R পর্যন্ত সব সংখ্যা আলাদাভাবে ভাগ করে মৌলিক যাচাই করা—একটি বড় রেঞ্জেই TLE দেয়!',
        whyTleOrSuboptimal: 'Massive TLE! 10^5 queries x 10^6 range = 10^14 operations.',
        pseudocode: 'for (L, R): cnt=0; for x in L..R: if isPrime(x): cnt++',
      },
      better: {
        label: 'Sieve Once + Count Loop Across [L..R] per Query',
        timeComplexity: 'O(M log log M + q * (R - L))',
        spaceComplexity: 'O(M)',
        intuition: 'Precompute isPrime[] up to 10^6, then sum isPrime[L..R] for each query.',
        banglaIntuition: 'Sieve বানিয়ে নিলেও প্রতি কুয়েরিতে L থেকে R পর্যন্ত যোগ করতে গেলে 10^11 অপারেশন হয়ে TLE হয়!',
        whyTleOrSuboptimal: 'Still TLE when 10^5 queries all ask [1, 10^6].',
        pseudocode: 'sieve(10^6); for (L, R): print sum(prime[L..R])',
      },
      optimal: {
        label: 'Sieve + Prefix Sum Array O(1) Per Query',
        timeComplexity: 'O(M log log M + q)',
        spaceComplexity: 'O(M), M = 10^6',
        intuition: 'Convert prime[0..M] into prefix counts pref[i] = pref[i-1] + prime[i], then answer any [L, R] in O(1) as pref[R] - pref[L - 1].',
        banglaIntuition: 'Sieve বানানোর পরই pref[i] = pref[i-1] + isPrime[i] তৈরি করলে যেকোনো [L, R] কুয়েরির উত্তর পাওয়া যায় মাত্র ১ বিয়োগে (pref[R] - pref[L - 1])!',
        whyTleOrSuboptimal: 'Optimal! Handles 100,000 queries instantaneously.',
        pseudocode: 'sieve(M); for i in 1..M: pref[i]=pref[i-1]+prime[i]; for (L,R): print pref[R]-pref[L-1]',
      },
    },
    editorial: {
      bruteForceReason: 'Looping from L to R inside 10^5 queries reaches 10^11 iterations even with a precomputed Sieve.',
      optimalApproach: 'Combine Sieve of Eratosthenes with a 1D Prefix Sum array so every range count [L, R] executes in O(1) time.',
      timeComplexity: 'O(M log log M + q)',
      spaceComplexity: 'O(M)',
      dryRunSteps: [
        { step: 1, state: 'isPrime[0..10]', memoryOrStack: '[0,0,1,1,0,1,0,1,0,0,0]', note: '2,3,5,7 are prime' },
        { step: 2, state: 'Build pref[0..10]', memoryOrStack: '[0,0,1,2,2,3,3,4,4,4,4]', note: 'Cumulative counts' },
        { step: 3, state: 'Query [1, 10]', memoryOrStack: 'pref[10] - pref[0] = 4', note: 'O(1) answer' },
      ],
      banglaEditorial:
        'এই সমস্যাটি দুইটি বিখ্যাত কৌশলের দারুণ সমন্বয়: Sieve + Prefix Sum! একবার 10^6 পর্যন্ত Sieve দিয়ে মৌলিক সংখ্যা চিহ্নিত করে প্রিফিক্স সাম অ্যারে pref[i] বানিয়ে নিলে 10^5 টি কুয়েরির প্রতিটি মাত্র O(1) সময়ে pref[R] - pref[L - 1] দিয়ে উত্তর দেওয়া যায়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#define MAXN 1000000
int main(void) {
    int *pref = calloc(MAXN + 1, sizeof(int));
    for (int i = 2; i <= MAXN; i++) pref[i] = 1;
    for (int i = 2; (long long)i * i <= MAXN; i++) {
        if (pref[i]) for (int j = i * i; j <= MAXN; j += i) pref[j] = 0;
    }
    for (int i = 1; i <= MAXN; i++) pref[i] += pref[i - 1];
    int q, l, r;
    if (scanf("%d", &q) == 1) {
        while (q--) { scanf("%d %d", &l, &r); printf("%d\\n", pref[r] - pref[l - 1]); }
    }
    free(pref);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    constexpr int MAXN = 1'000'000;
    vector<int> pref(MAXN + 1, 1);
    pref[0] = pref[1] = 0;
    for (int i = 2; 1LL * i * i <= MAXN; ++i) {
        if (pref[i]) {
            for (int j = i * i; j <= MAXN; j += i) pref[j] = 0;
        }
    }
    for (int i = 1; i <= MAXN; ++i) pref[i] += pref[i - 1];
    int q{}; cin >> q;
    while (q--) {
        int l{}, r{}; cin >> l >> r;
        cout << pref[r] - pref[l - 1] << '\\n';
    }
    return 0;
}`,
      python: `import sys
MAXN = 1_000_000
prime = bytearray([1]) * (MAXN + 1)
prime[0] = prime[1] = 0
for i in range(2, int(MAXN ** 0.5) + 1):
    if prime[i]:
        prime[i * i : MAXN + 1 : i] = bytearray(len(range(i * i, MAXN + 1, i)))
pref = [0] * (MAXN + 1)
run = 0
for i in range(1, MAXN + 1):
    run += prime[i]
    pref[i] = run
d = list(map(int, sys.stdin.read().split()))
q = d[0]
print("\\n".join(str(pref[d[2 + 2*i]] - pref[d[1 + 2*i] - 1]) for i in range(q)))`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        final int MAXN = 1_000_000;
        int[] pref = new int[MAXN + 1];
        Arrays.fill(pref, 2, MAXN + 1, 1);
        for (int i = 2; (long) i * i <= MAXN; i++) {
            if (pref[i] == 1) for (int j = i * i; j <= MAXN; j += i) pref[j] = 0;
        }
        for (int i = 1; i <= MAXN; i++) pref[i] += pref[i - 1];
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int q = Integer.parseInt(br.readLine().trim());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int l = Integer.parseInt(st.nextToken());
            int r = Integer.parseInt(st.nextToken());
            sb.append(pref[r] - pref[l - 1]).append('\\n');
        }
        System.out.print(sb);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const MAXN = 1000000;
const pref = new Int32Array(MAXN + 1);
pref.fill(1, 2);
for (let i = 2; i * i <= MAXN; i++) {
  if (pref[i]) for (let j = i * i; j <= MAXN; j += i) pref[j] = 0;
}
for (let i = 1; i <= MAXN; i++) pref[i] += pref[i - 1];
const out = [];
for (let i = 0; i < d[0]; i++) {
  out.push(pref[d[2 + 2 * i]] - pref[d[1 + 2 * i] - 1]);
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const MAXN = 1000000;
const pref = new Int32Array(MAXN + 1);
pref.fill(1, 2);
for (let i = 2; i * i <= MAXN; i++) {
  if (pref[i]) for (let j = i * i; j <= MAXN; j += i) pref[j] = 0;
}
for (let i = 1; i <= MAXN; i++) pref[i] += pref[i - 1];
const out: number[] = [];
for (let i = 0; i < d[0]; i++) {
  out.push(pref[d[2 + 2 * i]] - pref[d[1 + 2 * i] - 1]);
}
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    const MAXN: usize = 1_000_000;
    let mut pref = vec![1i32; MAXN + 1];
    pref[0] = 0; pref[1] = 0;
    let mut i = 2;
    while i * i <= MAXN {
        if pref[i] == 1 {
            let mut j = i * i;
            while j <= MAXN { pref[j] = 0; j += i; }
        }
        i += 1;
    }
    for k in 1..=MAXN { pref[k] += pref[k - 1]; }
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut out = Vec::with_capacity(d[0]);
    for q in 0..d[0] {
        let l = d[1 + 2 * q];
        let r = d[2 + 2 * q];
        out.push((pref[r] - pref[l - 1]).to_string());
    }
    println!("{}", out.join("\\n"));
}`,
    },
  },

  // =========================================================================
  // 6. NUMBER THEORY — Codeforces Div. 2 B · 1100 (Minimum LCM Split)
  // =========================================================================
  {
    id: 'cf-min-lcm-split',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Number Theory / Sieve',
    sourceTag: 'Codeforces Div. 2 B · 1100',
    companyTags: ['Codeforces 1100', 'Div. 2 B', 'Divisors & LCM'],
    difficulty: 'Easy',
    title: 'Minimum LCM Split (n = a + b)',
    banglaTitle: 'সর্বনিম্ন LCM বিভাজন (n = a + b)',
    xpReward: 120,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'You are given t test cases. In each test case, you receive an integer n (2 <= n <= 10^9). Split n into two positive integers a <= b such that a + b = n and LCM(a, b) is as small as possible.',
    inputFormat: 'First line: integer t (1 <= t <= 100). Next t lines: integer n (2 <= n <= 10^9).',
    outputFormat: 'For each test case, print two integers a and b (a <= b) on its own line.',
    constraints: ['1 <= t <= 100', '2 <= n <= 10^9'],
    samples: [
      { id: 'ml-s1', input: '3\n4\n6\n9', expectedOutput: '2 2\n3 3\n3 6', explanation: 'For n=9: divisors give (3,6) with LCM=6, better than (1,8)->8.' },
    ],
    hiddenTests: [
      { id: 'ml-h1', input: '3\n2\n7\n15', expectedOutput: '1 1\n1 6\n5 10', isHidden: true },
    ],
    hints: [
      'Notice gcd(a, b) = gcd(a, n - a) = gcd(a, n)! So gcd(a, b) MUST divide n!',
      'Moreover, LCM(a, b) is at least b >= ceil(n / 2). When can LCM(a, b) equal b exactly? Whenever a divides b (which implies a divides n)!',
      'To minimize b = n - a, maximize divisor a < n! That is a = n / p where p is the smallest prime factor of n (or a = 1 if n is prime)!',
    ],
    approaches: {
      brute: {
        label: 'Try All Pairs (a, n - a) for a = 1..n/2',
        timeComplexity: 'O(t * n * log n)',
        spaceComplexity: 'O(1)',
        intuition: 'Loop a from 1 to n/2, compute lcm(a, n - a) using gcd, and pick the minimum pair.',
        banglaIntuition: '১ থেকে n/2 পর্যন্ত সব (a, n-a) জোড়ার LCM বের করে সবচেয়ে ছোটটি নেওয়া—n = 10^9 হলে এটি সাথে সাথে TLE দেয়!',
        whyTleOrSuboptimal: 'Severe TLE! Looping to 5 * 10^8 per test case exceeds 1 second by orders of magnitude.',
        pseudocode: 'for a in 1..n/2: check lcm(a, n-a) and keep min',
      },
      better: {
        label: 'Check All Divisors d | n via sqrt(n)',
        timeComplexity: 'O(t * sqrt(n) * log n)',
        spaceComplexity: 'O(1)',
        intuition: 'Realize the optimal a must divide n, so enumerate every divisor d | n up to sqrt(n) and evaluate LCM(d, n - d) and LCM(n/d, n - n/d).',
        banglaIntuition: 'n-এর সব ভাজক sqrt(n) পর্যন্ত খুঁজে বের করে প্রতিটির জন্য LCM(d, n - d) হিসাব করা।',
        whyTleOrSuboptimal: 'Fast O(t * sqrt(n)), though we only actually need the SINGLE smallest prime factor p!',
        pseudocode: 'for d in divisors(n): minimize lcm(d, n-d)',
      },
      optimal: {
        label: 'Smallest Prime Factor O(sqrt(n)) Direct Formula',
        timeComplexity: 'O(t * sqrt(n))',
        spaceComplexity: 'O(1)',
        intuition: 'Find the smallest prime factor p of n in O(sqrt(n)). Set a = n / p (largest proper divisor of n, or 1 if n is prime) and b = n - a. Then a | b so LCM(a, b) = b is strictly minimal!',
        banglaIntuition: 'সংখ্যা n-এর সবচেয়ে ছোট মৌলিক উৎপাদক p খুঁজে a = n / p নিলেই b = n - a হয় a-এর গুণিতক—ফলে LCM(a, b) = b সর্বনিম্ন হয়! আর n নিজেই মৌলিক হলে a = 1, b = n - 1।',
        whyTleOrSuboptimal: 'Optimal Number Theory Trick! Zero gcd calls needed inside the loop.',
        pseudocode: 'a = 1; for d in 2..sqrt(n): if n%d==0: a = n/d; break; print a, n-a',
      },
    },
    editorial: {
      bruteForceReason: 'Testing every split 1..n/2 requires 10^9 steps per test case.',
      optimalApproach: 'Since gcd(a, n - a) = gcd(a, n), minimizing LCM(a, b) reduces to picking a = n / p where p is the smallest prime divisor of n (so b = n - a is divisible by a, yielding LCM = n - a).',
      timeComplexity: 'O(t * sqrt(n))',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'n = 9', memoryOrStack: 'smallest factor d=3 -> a=9/3=3', note: 'b = 9 - 3 = 6; LCM(3,6) = 6' },
        { step: 2, state: 'n = 7 (prime)', memoryOrStack: 'no factor <= sqrt(7) -> a=1', note: 'b = 6; LCM(1,6) = 6' },
      ],
      banglaEditorial:
        'যেকোনো (a, b) ভাগের জন্য gcd(a, b) = gcd(a, n - a) = gcd(a, n)। আবার b >= n/2 হওয়ায় সর্বনিম্ন সম্ভাব্য LCM হলো b নিজেই—যা তখনই সম্ভব যখন a দিয়ে b নিঃশেষে ভাগ যায় (অর্থাৎ a নিজেই n-এর একটি ভাজক)। তাই n-এর সবচেয়ে বড় প্রকৃত ভাজক a = n / smallestPrimeFactor(n) বেছে নিলেই উত্তর পাওয়া যায়!',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 0;
    while (t--) {
        long long n; scanf("%lld", &n);
        long long a = 1;
        for (long long d = 2; d * d <= n; d++) {
            if (n % d == 0) { a = n / d; break; }
        }
        printf("%lld %lld\\n", a, n - a);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t{}; cin >> t;
    while (t--) {
        long long n{}; cin >> n;
        long long a = 1;
        for (long long d = 2; d * d <= n; ++d) {
            if (n % d == 0) { a = n / d; break; }
        }
        cout << a << ' ' << n - a << '\\n';
    }
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
out = []
for n in d[1 : 1 + d[0]]:
    a = 1
    k = 2
    while k * k <= n:
        if n % k == 0:
            a = n // k
            break
        k += 1
    out.append(f"{a} {n - a}")
print("\\n".join(out))`,
      java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine().trim());
        StringBuilder sb = new StringBuilder();
        while (t-- > 0) {
            long n = Long.parseLong(br.readLine().trim());
            long a = 1;
            for (long d = 2; d * d <= n; d++) {
                if (n % d == 0) { a = n / d; break; }
            }
            sb.append(a).append(' ').append(n - a).append('\\n');
        }
        System.out.print(sb);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const out = [];
for (let i = 1; i <= d[0]; i++) {
  const n = d[i];
  let a = 1;
  for (let k = 2; k * k <= n; k++) {
    if (n % k === 0) { a = n / k; break; }
  }
  out.push(\`\${a} \${n - a}\`);
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const out: string[] = [];
for (let i = 1; i <= d[0]; i++) {
  const n = d[i];
  let a = 1;
  for (let k = 2; k * k <= n; k++) {
    if (n % k === 0) { a = n / k; break; }
  }
  out.push(\`\${a} \${n - a}\`);
}
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut out = Vec::new();
    for &n in &d[1..=d[0] as usize] {
        let mut a = 1;
        let mut k = 2;
        while k * k <= n {
            if n % k == 0 { a = n / k; break; }
            k += 1;
        }
        out.push(format!("{} {}", a, n - a));
    }
    println!("{}", out.join("\\n"));
}`,
    },
  },

  // =========================================================================
  // 7. PREFIX SUMS — Codeforces Div. 2 B · 1200 (Kuriyama Mirai's Stones)
  // =========================================================================
  {
    id: 'cf-kuriyama-prefix-queries',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Prefix Sums',
    sourceTag: 'Codeforces Div. 2 B · 1200',
    companyTags: ['Codeforces 1200', 'Div. 2 B', 'Prefix Sums'],
    difficulty: 'Medium',
    title: "Stones Cost Prefix Queries (Original & Sorted)",
    banglaTitle: 'পাথরের দাম প্রিফিক্স সাম কুয়েরি (মূল ও সর্টেড)',
    xpReward: 135,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    statement:
      'You are given n stones with costs v_1, v_2, ..., v_n (1-indexed). You must answer m queries of two types: Type 1 (1 L R) asks for the sum of costs from index L to R in the original order. Type 2 (2 L R) asks for the sum of costs from index L to R if the stones were sorted in non-decreasing order.',
    inputFormat: 'Line 1: n (1 <= n <= 10^5). Line 2: n integers v_i (1 <= v_i <= 10^9). Line 3: m (1 <= m <= 10^5). Next m lines: type, L, R (1 <= L <= R <= n).',
    outputFormat: 'Print m lines, one 64-bit integer sum per query.',
    constraints: ['1 <= n, m <= 10^5', '1 <= v_i <= 10^9 (total sum up to 10^14 -> MUST use 64-bit integer!)'],
    samples: [
      { id: 'km-s1', input: '6\n6 4 2 7 2 7\n3\n2 3 6\n1 3 4\n1 1 6', expectedOutput: '24\n9\n28', explanation: 'Sorted array is [2,2,4,6,7,7]; sum(3..6)=4+6+7+7=24.' },
    ],
    hiddenTests: [
      { id: 'km-h1', input: '4\n1000000000 1000000000 1000000000 1000000000\n2\n1 1 4\n2 2 3', expectedOutput: '4000000000\n2000000000', isHidden: true },
    ],
    hints: [
      'Notice the maximum sum of 10^5 elements of 10^9 is 10^14 — standard 32-bit int overflows immediately!',
      'Precompute TWO separate arrays: the original array v and a sorted copy u.',
      'Build 64-bit prefix sums p1 and p2 for both arrays in O(n log n); answer every (type, L, R) in O(1) via p[R] - p[L - 1].',
    ],
    approaches: {
      brute: {
        label: 'Loop L..R (and Re-Sort) per Query',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(n)',
        intuition: 'For each query, scan from index L to R summing elements (using a pre-sorted copy for type 2).',
        banglaIntuition: 'প্রতিটি কুয়েরির জন্য L থেকে R পর্যন্ত লুপ চালিয়ে যোগ করা—এতে 10^5 × 10^5 = 10^10 ধাপে TLE আসে।',
        whyTleOrSuboptimal: 'Gives TLE! 10^5 queries x 10^5 elements = 10^10 additions.',
        pseudocode: 'for (type, L, R): sum = 0; for i in L..R: sum += (type==1 ? v[i] : sorted[i])',
      },
      better: {
        label: 'Segment Tree / Fenwick Tree Over Both Arrays',
        timeComplexity: 'O(n log n + m log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Maintain two Fenwick Trees to query arbitrary [L, R] sums in O(log n) per query.',
        banglaIntuition: 'দুটি Fenwick Tree বানিয়ে প্রতি কুয়েরিতে O(log n) সময়ে রেঞ্জ সাম বের করা।',
        whyTleOrSuboptimal: 'Since there are NO point updates, Fenwick/Segment Tree adds unnecessary O(log n) query overhead over O(1) prefix sums.',
        pseudocode: 'build BIT1(v), BIT2(sorted); for (t,L,R): print query(t, R) - query(t, L-1)',
      },
      optimal: {
        label: 'Dual 64-Bit Prefix Sum Arrays',
        timeComplexity: 'O(n log n + m)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort a copy of the array once. Build 1-indexed 64-bit prefix sum arrays p1 (original) and p2 (sorted), then answer each query in exact O(1) time.',
        banglaIntuition: 'কপি অ্যারে সর্ট করে আসল ও সর্টেড—দুটি অ্যারেরই ৬৪-বিট প্রিফিক্স সাম বানিয়ে রাখলে যেকোনো (L, R) কুয়েরি O(1) সময়ে p[R] - p[L - 1] দিয়ে মেলে!',
        whyTleOrSuboptimal: 'Div. 2 B Gold Standard! O(1) per query and immune to 32-bit overflow.',
        pseudocode: 'u = sort(v); build p1[i]=p1[i-1]+v[i], p2[i]=p2[i-1]+u[i]; query: (t==1?p1:p2)[R]-(t==1?p1:p2)[L-1]',
      },
    },
    editorial: {
      bruteForceReason: 'Summing [L..R] in a loop for 10^5 queries takes 10^10 operations (TLE), and using 32-bit int overflows 10^14 sums.',
      optimalApproach: 'Build 64-bit prefix sums over both the original array and a sorted copy so every query executes in O(1).',
      timeComplexity: 'O(n log n + m)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'v = [6,4,2,7,2,7]', memoryOrStack: 'p1 = [0,6,10,12,19,21,28]', note: 'Original prefix sums' },
        { step: 2, state: 'u = [2,2,4,6,7,7]', memoryOrStack: 'p2 = [0,2,4,8,14,21,28]', note: 'Sorted prefix sums' },
        { step: 3, state: 'Query (2, 3, 6)', memoryOrStack: 'p2[6] - p2[2] = 28 - 4 = 24', note: 'Instant O(1) answer' },
      ],
      banglaEditorial:
        'অ্যারেতে কোনো আপডেট নেই—শুধু রেঞ্জ [L, R] এর যোগফল চাওয়া হয়েছে, তাই Segment Tree না বানিয়ে সরাসরি 1D Prefix Sum ব্যবহার করলেই প্রতিটি কুয়েরি O(1) সময়ে চলে! অবশ্যই `long long` / 64-bit ব্যবহার করবে, নইলে 10^14 যোগফলে ওভারফ্লো হবে।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmp_ll(const void *a, const void *b) {
    long long d = *(const long long *)a - *(const long long *)b;
    return (d > 0) - (d < 0);
}
int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 0;
    long long *u = malloc((size_t)n * sizeof(long long));
    long long *p1 = calloc((size_t)n + 1, sizeof(long long));
    long long *p2 = calloc((size_t)n + 1, sizeof(long long));
    for (int i = 0; i < n; i++) {
        scanf("%lld", &u[i]);
        p1[i + 1] = p1[i] + u[i];
    }
    qsort(u, (size_t)n, sizeof(long long), cmp_ll);
    for (int i = 0; i < n; i++) p2[i + 1] = p2[i] + u[i];
    scanf("%d", &m);
    while (m--) {
        int t, l, r; scanf("%d %d %d", &t, &l, &r);
        printf("%lld\\n", t == 1 ? p1[r] - p1[l - 1] : p2[r] - p2[l - 1]);
    }
    free(u); free(p1); free(p2);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; cin >> n;
    vector<long long> u(n), p1(n + 1, 0), p2(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        cin >> u[i];
        p1[i + 1] = p1[i] + u[i];
    }
    ranges::sort(u);
    for (int i = 0; i < n; ++i) p2[i + 1] = p2[i] + u[i];
    int m{}; cin >> m;
    while (m--) {
        int t{}, l{}, r{};
        cin >> t >> l >> r;
        cout << (t == 1 ? p1[r] - p1[l - 1] : p2[r] - p2[l - 1]) << '\\n';
    }
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
v = d[1 : 1 + n]
u = sorted(v)
p1 = [0] * (n + 1)
p2 = [0] * (n + 1)
for i in range(n):
    p1[i + 1] = p1[i] + v[i]
    p2[i + 1] = p2[i] + u[i]
m = d[1 + n]
idx = 2 + n
out = []
for _ in range(m):
    t, l, r = d[idx], d[idx + 1], d[idx + 2]
    idx += 3
    out.append(str(p1[r] - p1[l - 1] if t == 1 else p2[r] - p2[l - 1]))
print("\\n".join(out))`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        long[] u = new long[n];
        long[] p1 = new long[n + 1];
        long[] p2 = new long[n + 1];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            u[i] = Long.parseLong(st.nextToken());
            p1[i + 1] = p1[i] + u[i];
        }
        Arrays.sort(u);
        for (int i = 0; i < n; i++) p2[i + 1] = p2[i] + u[i];
        int m = Integer.parseInt(br.readLine().trim());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int t = Integer.parseInt(st.nextToken());
            int l = Integer.parseInt(st.nextToken());
            int r = Integer.parseInt(st.nextToken());
            sb.append(t == 1 ? p1[r] - p1[l - 1] : p2[r] - p2[l - 1]).append('\\n');
        }
        System.out.print(sb);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0];
const u = d.slice(1, 1 + n);
const p1 = [0];
for (let i = 0; i < n; i++) p1.push(p1[i] + u[i]);
u.sort((a, b) => a - b);
const p2 = [0];
for (let i = 0; i < n; i++) p2.push(p2[i] + u[i]);
const m = d[1 + n];
const out = [];
let idx = 2 + n;
for (let i = 0; i < m; i++) {
  const t = d[idx++], l = d[idx++], r = d[idx++];
  out.push(t === 1 ? p1[r] - p1[l - 1] : p2[r] - p2[l - 1]);
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const u: number[] = d.slice(1, 1 + n);
const p1: number[] = [0];
for (let i = 0; i < n; i++) p1.push(p1[i] + u[i]);
u.sort((a, b) => a - b);
const p2: number[] = [0];
for (let i = 0; i < n; i++) p2.push(p2[i] + u[i]);
const m: number = d[1 + n];
const out: number[] = [];
let idx = 2 + n;
for (let i = 0; i < m; i++) {
  const t = d[idx++], l = d[idx++], r = d[idx++];
  out.push(t === 1 ? p1[r] - p1[l - 1] : p2[r] - p2[l - 1]);
}
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut u = d[1..=n].to_vec();
    let mut p1 = vec![0i64; n + 1];
    for i in 0..n { p1[i + 1] = p1[i] + u[i]; }
    u.sort_unstable();
    let mut p2 = vec![0i64; n + 1];
    for i in 0..n { p2[i + 1] = p2[i] + u[i]; }
    let m = d[1 + n] as usize;
    let mut idx = 2 + n;
    let mut out = Vec::with_capacity(m);
    for _ in 0..m {
        let t = d[idx]; let l = d[idx + 1] as usize; let r = d[idx + 2] as usize;
        idx += 3;
        out.push((if t == 1 { p1[r] - p1[l - 1] } else { p2[r] - p2[l - 1] }).to_string());
    }
    println!("{}", out.join("\\n"));
}`,
    },
  },

  // =========================================================================
  // 8. PREFIX SUMS — CodeChef 3-Star / Codeforces Div. 2 C · 1500
  // =========================================================================
  {
    id: 'cc-subarray-divisible-k',
    category: 'cp',
    platform: 'CodeChef',
    topic: 'Prefix Sums',
    sourceTag: 'CodeChef 3-Star · CF Div. 2 C 1500',
    companyTags: ['CodeChef 3-Star', 'Codeforces 1500', 'Amazon', 'Prefix Modulo'],
    difficulty: 'Medium',
    title: 'Subarrays Divisible by K (Modulo Prefix Counts)',
    banglaTitle: 'K দ্বারা বিভাজ্য সাব-অ্যারে গণনা (মডুলো প্রিফিক্স সাম)',
    xpReward: 160,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given an array of n integers (which may be negative) and a positive integer k, count the total number of non-empty contiguous subarrays whose element sum is evenly divisible by k.',
    inputFormat: 'First line: n and k (1 <= n, k <= 10^5). Second line: n space-separated integers a_i (-10^9 <= a_i <= 10^9).',
    outputFormat: 'Print a single 64-bit integer: the number of contiguous subarrays divisible by k.',
    constraints: ['1 <= n, k <= 10^5', '-10^9 <= a_i <= 10^9', 'Negative remainders in C/C++/Java/Rust must be normalized into [0, k-1]!'],
    samples: [
      { id: 'sdk-s1', input: '5 5\n3 1 2 7 4', expectedOutput: '1', explanation: 'Only subarray [1, 2, 7] has sum 10 divisible by 5.' },
      { id: 'sdk-s2', input: '6 5\n4 5 0 -2 -3 1', expectedOutput: '7', explanation: '[5], [5,0], [5,0,-2,-3], [0], [0,-2,-3], [-2,-3], [4,5,0,-2,-3,1].' },
    ],
    hiddenTests: [
      { id: 'sdk-h1', input: '3 3\n3 3 3', expectedOutput: '6', isHidden: true },
      { id: 'sdk-h2', input: '4 2\n-1 -1 -1 -1', expectedOutput: '4', isHidden: true },
    ],
    hints: [
      'A subarray (l, r] has sum pref[r] - pref[l]. Divisibility by k means (pref[r] - pref[l]) % k == 0, so pref[r] % k == pref[l] % k!',
      'Watch out for negative numbers! In C++, (-7) % 5 = -2 instead of +3. Always normalize: rem = ((sum % k) + k) % k.',
      'Keep a frequency array cnt[0..k-1] initialized with cnt[0] = 1 (for the empty prefix). At each element, add cnt[rem] to ans, then increment cnt[rem].',
    ],
    approaches: {
      brute: {
        label: 'Check All O(n^2) Subarrays',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(n)',
        intuition: 'Fix every start l, accumulate sum across r = l..n-1, and increment ans whenever sum % k == 0.',
        banglaIntuition: 'দুটি লুপ চালিয়ে সব (l, r) সাব-অ্যারের যোগফল বের করে k দিয়ে ভাগ যায় কি না দেখা—n = 10^5 এর জন্য TLE!',
        whyTleOrSuboptimal: 'Gives TLE! 5 × 10^9 checks cannot finish inside 1 second.',
        pseudocode: 'for l in 0..n: s=0; for r in l..n: s+=a[r]; if s%k==0: ans++',
      },
      better: {
        label: 'HashMap of Prefix Remainders',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(n, k))',
        intuition: 'Track frequency of normalized prefix modulo remainders inside an unordered_map/HashMap.',
        banglaIntuition: 'হ্যাশ ম্যাপে প্রতিটি রিমাইন্ডার কতবার এসেছে তা জমা রেখে O(n) সময়ে গণনা করা।',
        whyTleOrSuboptimal: 'Optimal O(n) asymptotically, though an array cnt[k] avoids hashing collisions when k <= 10^5.',
        pseudocode: 'cnt = {0: 1}; for x in a: rem=((rem+x)%k+k)%k; ans+=cnt[rem]; cnt[rem]++',
      },
      optimal: {
        label: 'O(k) Frequency Array + Normalized Modulo Prefix',
        timeComplexity: 'O(n + k)',
        spaceComplexity: 'O(k)',
        intuition: 'Maintain cnt[0..k-1] with cnt[0]=1. Update rem = ((rem + x % k) + k) % k, add cnt[rem] (pairs sharing the same remainder mod k!), then increment cnt[rem].',
        banglaIntuition: 'দুটি প্রিফিক্স সামের ভাগশেষ সমান হলেই তাদের মাঝের অংশের যোগফল k দ্বারা বিভাজ্য হয়! তাই cnt[0]=1 দিয়ে শুরু করে প্রতিটি ধাপে শুধু ইতিবাচক ভাগশেষ rem বের করে ans += cnt[rem]; cnt[rem]++ করলেই এক পাসেই সমাধান মেলে।',
        whyTleOrSuboptimal: 'CodeChef 3-Star & CF Div. 2 C Classic! Zero hash overhead and handles negative numbers cleanly.',
        pseudocode: 'cnt=[0]*k; cnt[0]=1; rem=0; ans=0; for x in a: rem=((rem+x%k)+k)%k; ans+=cnt[rem]; cnt[rem]++',
      },
    },
    editorial: {
      bruteForceReason: 'Enumerating all O(n^2) subarrays hits 5 × 10^9 operations for n = 10^5.',
      optimalApproach: '(pref[r] - pref[l]) % k == 0 holds iff pref[r] and pref[l] leave the same non-negative remainder modulo k. Count matching earlier remainders in O(n).',
      timeComplexity: 'O(n + k)',
      spaceComplexity: 'O(k)',
      dryRunSteps: [
        { step: 1, state: 'Start (empty prefix)', memoryOrStack: 'cnt[0]=1, rem=0, ans=0', note: 'Accounts for prefixes divisible by k' },
        { step: 2, state: 'Read 4, 5, 0 (k=5)', memoryOrStack: 'rems: 4 -> 4 (+1) -> 4 (+2)', note: 'cnt[4]=3, ans=3' },
        { step: 3, state: 'Read -2, -3, 1', memoryOrStack: 'rems: 2 -> 4 (+3) -> 0 (+1)', note: 'Total ans=7' },
      ],
      banglaEditorial:
        'যদি দুটি প্রিফিক্স সাম P[r] এবং P[l]-কে k দিয়ে ভাগ করলে একই ভাগশেষ থাকে, তবে তাদের বিয়োগফল (P[r] - P[l]) অর্থাৎ (l+1..r) সাব-অ্যারেটি অবশ্যই k দ্বারা বিভাজ্য! ঋণাত্মক সংখ্যার ভাগশেষ ঠিক রাখতে `((rem + x % k) + k) % k` ব্যবহার করতে ভুলবে না।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    long long *cnt = calloc((size_t)k, sizeof(long long));
    cnt[0] = 1;
    long long rem = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long x; scanf("%lld", &x);
        rem = ((rem + x % k) % k + k) % k;
        ans += cnt[rem];
        cnt[rem]++;
    }
    printf("%lld\\n", ans);
    free(cnt);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}, k{}; cin >> n >> k;
    vector<long long> cnt(k, 0);
    cnt[0] = 1;
    long long rem = 0, ans = 0;
    for (int i = 0; i < n; ++i) {
        long long x{}; cin >> x;
        rem = ((rem + x % k) % k + k) % k;
        ans += cnt[rem]++;
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
cnt = [0] * k
cnt[0] = 1
rem = ans = 0
for x in d[2 : 2 + n]:
    rem = (rem + x) % k
    ans += cnt[rem]
    cnt[rem] += 1
print(ans)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken()), k = Integer.parseInt(st.nextToken());
        long[] cnt = new long[k];
        cnt[0] = 1;
        long rem = 0, ans = 0;
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long x = Long.parseLong(st.nextToken());
            rem = ((rem + x % k) % k + k) % k;
            ans += cnt[(int) rem]++;
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1];
const cnt = new Float64Array(k);
cnt[0] = 1;
let rem = 0, ans = 0;
for (let i = 0; i < n; i++) {
  rem = (((rem + (d[2 + i] % k)) % k) + k) % k;
  ans += cnt[rem];
  cnt[rem]++;
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1];
const cnt = new Float64Array(k);
cnt[0] = 1;
let rem = 0, ans = 0;
for (let i = 0; i < n; i++) {
  rem = (((rem + (d[2 + i] % k)) % k) + k) % k;
  ans += cnt[rem];
  cnt[rem]++;
}
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1]);
    let mut cnt = vec![0i64; k as usize];
    cnt[0] = 1;
    let mut rem = 0i64;
    let mut ans = 0i64;
    for &x in &d[2..2 + n] {
        rem = (rem + x).rem_euclid(k);
        ans += cnt[rem as usize];
        cnt[rem as usize] += 1;
    }
    println!("{}", ans);
}`,
    },
  },
];
