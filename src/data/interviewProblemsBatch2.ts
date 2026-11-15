import type { Problem } from '../types/academy';

export const INTERVIEW_PROBLEMS_BATCH_2: Problem[] = [
  {
    id: 'interview-max-circular-kadane',
    category: 'interview',
    platform: 'FAANG',
    topic: "Kadane's",
    sourceTag: "FAANG Top 150 · Kadane's Algorithm",
    companyTags: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    difficulty: 'Medium',
    title: "Maximum Sum Circular Subarray (Dual Kadane's)",
    banglaTitle: 'বৃত্তাকার সর্বোচ্চ সাব-অ্যারে যোগফল (ডুয়াল ক্যাডানে অ্যালগরিদম)',
    xpReward: 155,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given a circular integer array nums of length n (where the end wraps around to the beginning), find the maximum possible sum of a non-empty contiguous subarray without wrapping around any element more than once.',
    inputFormat: 'First line: integer n. Second line: n space-separated integers.',
    outputFormat: 'Print one integer: the maximum circular subarray sum.',
    constraints: ['1 <= n <= 10^5', '-3 * 10^4 <= nums[i] <= 3 * 10^4'],
    samples: [
      { id: 'ck-s1', input: '3\n5 -3 5', expectedOutput: '10', explanation: 'Subarray [5] at index 2 wraps around to [5] at index 0 -> 5 + 5 = 10.' },
      { id: 'ck-s2', input: '3\n-3 -2 -3', expectedOutput: '-2', explanation: 'All elements are negative; non-empty maximum is max(nums) = -2.' },
    ],
    hiddenTests: [
      { id: 'ck-h1', input: '4\n1 -2 3 -2', expectedOutput: '3', isHidden: true },
      { id: 'ck-h2', input: '4\n3 -1 2 -1', expectedOutput: '4', isHidden: true },
    ],
    hints: [
      'A circular maximum subarray takes ONE of two shapes: Case 1 (normal non-wrapping subarray via standard Kadane maxSum) OR Case 2 (prefix + suffix wrapping around the ends).',
      'What is left in the middle when you take a prefix + suffix? A contiguous middle subarray! Maximizing prefix + suffix = minimizing the middle subarray (totalSum - minSum)!',
      'CRITICAL EDGE CASE: If EVERY number is negative, minSum == totalSum (leaving an empty wrap subarray), so return maxSum when maxSum < 0!',
    ],
    approaches: {
      brute: {
        label: 'Run Standard Kadane Starting at Every Rotation',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'Duplicate the array to length 2n and run standard Kadane limited to length n from each start index 0..n-1.',
        banglaIntuition: 'প্রতিটি ইনডেক্সকে শুরু ধরে আলাদাভাবে ক্যাডানে চালালে n=10^5 এর জন্য O(n^2) সময়ে TLE আসে।',
        whyTleOrSuboptimal: 'O(n^2) fails when n = 10^5 (~10^10 operations).',
        pseudocode: 'for start in 0..n-1: run Kadane of max length n from start',
      },
      better: {
        label: 'Double Array + Monotonic Deque over Prefix Sums',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Build prefix sums of nums + nums and use a monotonic deque to maintain minimum P[j] within window size n.',
        banglaIntuition: '২n দৈর্ঘ্যের প্রিফিক্স সাম ও মনোটোনিক ডিকিউ দিয়ে সমাধান করলেও O(n) অতিরিক্ত মেমোরি লাগে।',
        whyTleOrSuboptimal: 'Requires O(n) extra deque & doubled prefix array when O(1) Dual Kadane exists.',
        pseudocode: 'P = prefix(a + a); maintain increasing deque of size <= n to maximize P[i] - P[dq.front]',
      },
      optimal: {
        label: "Single-Pass Dual Kadane's (Max Subarray vs Total - Min Subarray)",
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Simultaneously compute maxSum (standard Kadane), minSum (inverted Kadane), and total. If maxSum < 0 (all negative), return maxSum; otherwise return max(maxSum, total - minSum).',
        banglaIntuition: 'একই লুপে সাধারণ সর্বোচ্চ সাব-অ্যারে (maxSum) এবং সর্বনিম্ন সাব-অ্যারে (minSum) বের করি। প্রান্ত ঘুরে নেওয়া মানে মাঝের সর্বনিম্ন অংশ বাদ দেওয়া (total - minSum)! তবে সব সংখ্যা ঋণাত্মক হলে শুধু maxSum রিটার্ন করতে হবে।',
        whyTleOrSuboptimal: 'Optimal! One linear pass with O(1) scalar variables.',
        pseudocode: 'for x: curMax=max(x, curMax+x); maxS=max(maxS,curMax); curMin=min(x, curMin+x); minS=min(minS,curMin); tot+=x; return maxS<0 ? maxS : max(maxS, tot-minS)',
      },
    },
    editorial: {
      bruteForceReason: 'Testing every circular rotation of length n takes O(n^2) time and times out for n = 10^5.',
      optimalApproach: 'Tracking both maximum and minimum contiguous subarray sums in one O(n) scan handles both non-wrapping and wrapping subarrays in O(1) space.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'nums = [5, -3, 5]', memoryOrStack: 'total = 7, maxSum = 7', note: 'Non-wrapping best is 7' },
        { step: 2, state: 'Minimum middle subarray', memoryOrStack: 'minSum = -3', note: 'Wrapped = 7 - (-3) = 10' },
        { step: 3, state: 'Check maxSum > 0', memoryOrStack: 'max(7, 10) = 10', note: 'Outputs 10' },
      ],
      banglaEditorial:
        'বৃত্তাকার অ্যারেতে সেরা সাব-অ্যারে হয় মাঝেই থাকবে (স্বাভাবিক Kadane), নয়তো দুই প্রান্ত ঘুরে থাকবে। দুই প্রান্ত ঘুরে নেওয়ার অর্থ হলো পুরো যোগফল (total) থেকে মাঝের সবচেয়ে খারাপ (সর্বনিম্ন) অংশটি বাদ দেওয়া! কেবল সব সংখ্যা নেগেটিভ হলে total - minSum করলে ০ (খালি সাব-অ্যারে) চলে আসে, তাই maxSum < 0 হলে সরাসরি maxSum-ই উত্তর।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long total = 0, curMax = -1000000000000LL, maxSum = -1000000000000LL;
    long long curMin = 1000000000000LL, minSum = 1000000000000LL;
    for (int i = 0; i < n; i++) {
        long long x; scanf("%lld", &x);
        total += x;
        curMax = (i == 0 || curMax < 0) ? x : curMax + x;
        if (curMax > maxSum) maxSum = curMax;
        curMin = (i == 0 || curMin > 0) ? x : curMin + x;
        if (curMin < minSum) minSum = curMin;
    }
    long long ans = maxSum < 0 ? maxSum : (total - minSum > maxSum ? total - minSum : maxSum);
    printf("%lld\\n", ans);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    long long total = 0, curMax = 0, maxSum = -1e18, curMin = 0, minSum = 1e18;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        total += x;
        curMax = max(x, curMax + x);
        maxSum = max(maxSum, curMax);
        curMin = min(x, curMin + x);
        minSum = min(minSum, curMin);
    }
    cout << (maxSum < 0 ? maxSum : max(maxSum, total - minSum)) << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
nums = d[1:1 + n]
total = cur_max = cur_min = 0
max_sum, min_sum = nums[0], nums[0]
for x in nums:
    cur_max = max(x, cur_max + x)
    max_sum = max(max_sum, cur_max)
    cur_min = min(x, cur_min + x)
    min_sum = min(min_sum, cur_min)
    total += x
print(max_sum if max_sum < 0 else max(max_sum, total - min_sum))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long total = 0, curMax = 0, maxSum = Long.MIN_VALUE / 4, curMin = 0, minSum = Long.MAX_VALUE / 4;
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            total += x;
            curMax = Math.max(x, curMax + x);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(x, curMin + x);
            minSum = Math.min(minSum, curMin);
        }
        System.out.println(maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
let total = 0, curMax = 0, maxSum = -Infinity, curMin = 0, minSum = Infinity;
for (let i = 1; i <= n; i++) {
  const x = d[i];
  total += x;
  curMax = Math.max(x, curMax + x);
  maxSum = Math.max(maxSum, curMax);
  curMin = Math.min(x, curMin + x);
  minSum = Math.min(minSum, curMin);
}
console.log(maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let total = 0, curMax = 0, maxSum = -Infinity, curMin = 0, minSum = Infinity;
for (let i = 1; i <= n; i++) {
  const x = d[i];
  total += x;
  curMax = Math.max(x, curMax + x);
  maxSum = Math.max(maxSum, curMax);
  curMin = Math.min(x, curMin + x);
  minSum = Math.min(minSum, curMin);
}
console.log(maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let (mut total, mut cur_max, mut cur_min) = (0i64, 0i64, 0i64);
    let (mut max_sum, mut min_sum) = (i64::MIN / 4, i64::MAX / 4);
    for &x in &d[1..1 + n] {
        total += x;
        cur_max = x.max(cur_max + x);
        max_sum = max_sum.max(cur_max);
        cur_min = x.min(cur_min + x);
        min_sum = min_sum.min(cur_min);
    }
    println!("{}", if max_sum < 0 { max_sum } else { max_sum.max(total - min_sum) });
}`,
    },
  },

  {
    id: 'interview-merge-intervals',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Merge Intervals',
    sourceTag: 'FAANG Top 150 · Merge Intervals',
    companyTags: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    difficulty: 'Medium',
    title: 'Merge Overlapping Intervals',
    banglaTitle: 'ওভারল্যাপিং ইন্টারভাল মার্জ করা',
    xpReward: 135,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given n closed intervals [start_i, end_i], merge all overlapping intervals (including touching endpoints where next.start <= current.end) and print the disjoint intervals sorted by start time.',
    inputFormat: 'First line: integer n. Next n lines: two integers start_i and end_i.',
    outputFormat: 'Print each merged interval "start end" on its own line.',
    constraints: ['1 <= n <= 10^5', '0 <= start_i <= end_i <= 10^9'],
    samples: [
      { id: 'mi-s1', input: '4\n1 3\n2 6\n8 10\n15 18', expectedOutput: '1 6\n8 10\n15 18', explanation: '[1,3] and [2,6] overlap and merge into [1,6].' },
    ],
    hiddenTests: [
      { id: 'mi-h1', input: '2\n1 4\n4 5', expectedOutput: '1 5', isHidden: true },
      { id: 'mi-h2', input: '3\n6 8\n1 9\n2 4', expectedOutput: '1 9', isHidden: true },
    ],
    hints: [
      'Unordered intervals might overlap out of sequence (e.g., [6,8] before [1,9]), so sort all intervals by start_i first!',
      'Once sorted by start time, any interval that overlaps the current merged interval MUST overlap the very last merged interval in your output list.',
      'Condition: if cur.start <= last.end, set last.end = max(last.end, cur.end); otherwise append [cur.start, cur.end].',
    ],
    approaches: {
      brute: {
        label: 'Repeated Pairwise Graph Connected Components',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(n^2)',
        intuition: 'Build a graph connecting every overlapping pair of intervals and take [minStart, maxEnd] per connected component.',
        banglaIntuition: 'প্রতিটি জোড়া ইন্টারভাল একে অপরকে ছেদ করে কি না দেখে গ্রাফ বানালে O(n^2) সময় ও মেমোরি লেগে TLE হয়ে যাবে।',
        whyTleOrSuboptimal: 'Quadratic O(n^2) fails when n = 10^5.',
        pseudocode: 'for each pair (i,j): if overlap(i,j) connect; take min/max of each component',
      },
      better: {
        label: 'Sweep-Line Events (+1 start, -1 end)',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Convert intervals into 2n endpoint events (start before end on tie) and emit an interval whenever active count drops back to 0.',
        banglaIntuition: 'শুরু (+1) ও শেষ (-1) ইভেন্ট সাজিয়ে সুইপ-লাইন চালালেও কাজ হয়, তবে সরাসরি ইন্টারভাল সর্ট করা আরও সরল।',
        whyTleOrSuboptimal: 'Creates 2n event objects and extra tie-breaking logic compared to direct sort-and-merge.',
        pseudocode: 'events = [(s,-1), (e,+1)]; sort; track active==0 transitions',
      },
      optimal: {
        label: 'Sort by Start Time + Linear In-Place Merge',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n) output',
        intuition: 'Sort intervals by start coordinate. Maintain the active merged interval and either extend its end with max(end, curEnd) when curStart <= end, or flush it and start a new one.',
        banglaIntuition: 'শুরুর সময় অনুযায়ী সব ইন্টারভাল সর্ট করে এক পাসেই পরীক্ষা করি: পরেরটার শুরু যদি বর্তমান শেষের চেয়ে ছোট বা সমান হয়, তবে end আপডেট করে জুড়ে দিই!',
        whyTleOrSuboptimal: 'Meta Top-3 Most Asked Interview Question! Cleanest O(n log n) greedy sweep.',
        pseudocode: 'sort(iv); out=[iv[0]]; for [s,e] in iv[1:]: if s<=out.back.e: out.back.e=max(out.back.e,e) else out.push([s,e])',
      },
    },
    editorial: {
      bruteForceReason: 'Checking all interval overlaps pairwise is O(n^2) and exceeds limits for n = 10^5.',
      optimalApproach: 'Sorting intervals by start ensures overlapping intervals become adjacent, allowing a single linear merge pass in O(n log n) total time.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Sort [[6,8],[1,9],[2,4]]', memoryOrStack: '[[1,9],[2,4],[6,8]]', note: 'Ordered by start' },
        { step: 2, state: 'Check [2,4] against [1,9]', memoryOrStack: '2 <= 9 -> max(9,4)=9', note: 'Merged remains [1,9]' },
        { step: 3, state: 'Check [6,8] against [1,9]', memoryOrStack: '6 <= 9 -> max(9,8)=9', note: 'Outputs 1 9' },
      ],
      banglaEditorial:
        'শুরুর মান অনুযায়ী সর্ট করে নিলে ওভারল্যাপ করা সব ইন্টারভাল পাশাপাশি চলে আসে। তারপর একটি করে ইন্টারভাল নিয়ে আগের মার্জ করা শেষ ইন্টারভালের সাথে মেলাই—যদি `cur.start <= prev.end` হয়, তবে দুটি একত্র করে `prev.end = max(prev.end, cur.end)` করে দিই।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
typedef struct { long long s, e; } Iv;
int cmp_iv(const void *a, const void *b) {
    const Iv *x = a, *y = b;
    if (x->s != y->s) return x->s < y->s ? -1 : 1;
    return (x->e > y->e) - (x->e < y->e);
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Iv *iv = malloc((size_t)n * sizeof(Iv));
    for (int i = 0; i < n; i++) scanf("%lld %lld", &iv[i].s, &iv[i].e);
    qsort(iv, (size_t)n, sizeof(Iv), cmp_iv);
    long long cs = iv[0].s, ce = iv[0].e;
    for (int i = 1; i < n; i++) {
        if (iv[i].s <= ce) {
            if (iv[i].e > ce) ce = iv[i].e;
        } else {
            printf("%lld %lld\\n", cs, ce);
            cs = iv[i].s; ce = iv[i].e;
        }
    }
    printf("%lld %lld\\n", cs, ce);
    free(iv);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<pair<long long, long long>> iv(n);
    for (auto &[s, e] : iv) cin >> s >> e;
    sort(iv.begin(), iv.end());
    long long cs = iv[0].first, ce = iv[0].second;
    for (int i = 1; i < n; i++) {
        if (iv[i].first <= ce) ce = max(ce, iv[i].second);
        else {
            cout << cs << " " << ce << "\\n";
            cs = iv[i].first; ce = iv[i].second;
        }
    }
    cout << cs << " " << ce << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
iv = sorted((d[1 + 2 * i], d[2 + 2 * i]) for i in range(n))
merged = [list(iv[0])]
for s, e in iv[1:]:
    if s <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], e)
    else:
        merged.append([s, e])
print("\\n".join(f"{s} {e}" for s, e in merged))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[][] iv = new long[n][2];
        for (int i = 0; i < n; i++) { iv[i][0] = sc.nextLong(); iv[i][1] = sc.nextLong(); }
        Arrays.sort(iv, (a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
        StringBuilder sb = new StringBuilder();
        long cs = iv[0][0], ce = iv[0][1];
        for (int i = 1; i < n; i++) {
            if (iv[i][0] <= ce) ce = Math.max(ce, iv[i][1]);
            else {
                sb.append(cs).append(' ').append(ce).append('\\n');
                cs = iv[i][0]; ce = iv[i][1];
            }
        }
        sb.append(cs).append(' ').append(ce).append('\\n');
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
const iv = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const out = [iv[0]];
for (let i = 1; i < n; i++) {
  const last = out[out.length - 1];
  if (iv[i][0] <= last[1]) last[1] = Math.max(last[1], iv[i][1]);
  else out.push(iv[i]);
}
console.log(out.map(([s, e]) => \`\${s} \${e}\`).join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const iv: [number, number][] = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const out: [number, number][] = [iv[0]];
for (let i = 1; i < n; i++) {
  const last = out[out.length - 1];
  if (iv[i][0] <= last[1]) last[1] = Math.max(last[1], iv[i][1]);
  else out.push(iv[i]);
}
console.log(out.map(([s, e]) => \`\${s} \${e}\`).join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut iv: Vec<(i64, i64)> = (0..n).map(|i| (d[1 + 2 * i], d[2 + 2 * i])).collect();
    iv.sort_unstable();
    let mut out: Vec<(i64, i64)> = vec![iv[0]];
    for &(st, en) in &iv[1..] {
        let last = out.last_mut().unwrap();
        if st <= last.1 { last.1 = last.1.max(en); }
        else { out.push((st, en)); }
    }
    for (st, en) in out { println!("{} {}", st, en); }
}`,
    },
  },

  {
    id: 'interview-meeting-rooms-ii',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Merge Intervals',
    sourceTag: 'FAANG Top 150 · Interval Sweep',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    difficulty: 'Medium',
    title: 'Minimum Meeting Rooms Required (Chronological Sweep)',
    banglaTitle: 'সর্বনিম্ন মিটিং রুম নির্ণয় (ইন্টারভাল সুইপ)',
    xpReward: 150,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given n half-open meeting time intervals [start_i, end_i), find the minimum number of conference rooms required so all meetings can take place without conflict (a meeting ending at t frees its room for a meeting starting at t).',
    inputFormat: 'First line: integer n. Next n lines: start_i and end_i.',
    outputFormat: 'Print one integer: the minimum number of rooms needed.',
    constraints: ['1 <= n <= 10^5', '0 <= start_i < end_i <= 10^9'],
    samples: [
      { id: 'mr-s1', input: '3\n0 30\n5 10\n15 20', expectedOutput: '2', explanation: '[0,30) overlaps both [5,10) and [15,20), which do not overlap each other -> 2 rooms.' },
      { id: 'mr-s2', input: '2\n7 10\n2 4', expectedOutput: '1' },
    ],
    hiddenTests: [
      { id: 'mr-h1', input: '4\n1 5\n5 10\n2 6\n6 9', expectedOutput: '2', isHidden: true },
    ],
    hints: [
      'You do not even need to know WHICH specific meeting ended—only WHEN the earliest meeting ends!',
      'Sort all start times into starts[] and all end times into ends[] independently.',
      'Walk i over starts[]: if starts[i] < ends[endPtr], increment rooms; otherwise endPtr++ (reusing the freed room)!',
    ],
    approaches: {
      brute: {
        label: 'Simulate Room Assignment Array Scan',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort by start time and for each meeting linearly scan all existing rooms to find one whose end <= start.',
        banglaIntuition: 'প্রতিটি নতুন মিটিংয়ের জন্য সবগুলো রুম ঘুরে খালি রুম খুঁজলে O(n^2) সময় লাগে।',
        whyTleOrSuboptimal: 'Quadratic O(n^2) times out when n = 10^5 overlapping meetings exist.',
        pseudocode: 'sort intervals; for [s,e]: scan rooms for end<=s else push new room',
      },
      better: {
        label: 'Sort by Start + Min-Heap of Active End Times',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Maintain a min-heap of active room end times; pop top if minHeap.peek() <= start, then push end.',
        banglaIntuition: 'Min-Heap-এ চলমান রুমের শেষ সময় রাখলে কাজ হয়, তবে দুটি আলাদা অ্যারে সর্ট করা আরও দ্রুত ও কম কোডের।',
        whyTleOrSuboptimal: 'Requires priority-queue heapify allocations while chronological two-pointer is cache-friendly.',
        pseudocode: 'sort intervals; if heap.top <= s: heap.pop(); heap.push(e); ans = max(ans, heap.size)',
      },
      optimal: {
        label: 'Separated Start/End Chronological Two-Pointer Sweep',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort starts[] and ends[] separately. Iterate s over starts[]: if s < ends[ePtr], we need an extra room (rooms++); otherwise a meeting ended before or at s, so reuse that room (ePtr++).',
        banglaIntuition: 'সব শুরুর সময় (starts) এবং শেষের সময় (ends) আলাদাভাবে সর্ট করলে পরের মিটিং শুরুর আগে কোনো রুম খালি হয়েছে কি না (starts[i] >= ends[ePtr]) তা এক নজরেই ধরা যায়!',
        whyTleOrSuboptimal: 'Optimal! Simple array sorts and a single O(n) pointer sweep.',
        pseudocode: 'sort(starts); sort(ends); for s in starts: if s < ends[e]: rooms++; else e++',
      },
    },
    editorial: {
      bruteForceReason: 'Scanning all previously opened rooms for each new meeting degrades to O(n^2) time.',
      optimalApproach: 'Sorting start and end timestamps independently transforms room allocation into a fast O(n log n) two-pointer sweep.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'starts=[0,5,15], ends=[10,20,30]', memoryOrStack: 'rooms=0, e=0', note: 'Separated sorted arrays' },
        { step: 2, state: 's=0 < 10; s=5 < 10', memoryOrStack: 'rooms=2, e=0', note: 'Need 2 rooms at t=5' },
        { step: 3, state: 's=15 >= ends[0]=10', memoryOrStack: 'e=1, rooms stays 2', note: 'Reuse freed room; answer = 2' },
      ],
      banglaEditorial:
        'একই সময়ে সর্বোচ্চ কয়টি মিটিং চলছে—সেটিই সর্বনিম্ন রুমের সংখ্যা। আমরা সব মিটিংয়ের start ও end আলাদা দুটি অ্যারেতে সর্ট করি। যখন নতুন মিটিংয়ের start আগের সবচেয়ে কাছাকাছি end-এর ছোট হয়, তখন নতুন রুম লাগে; আর সমান বা বড় হলে আগের খালি হওয়া রুমটাই ব্যবহার করা যায়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *st = malloc((size_t)n * sizeof(long long));
    long long *en = malloc((size_t)n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld %lld", &st[i], &en[i]);
    qsort(st, (size_t)n, sizeof(long long), cmp_ll);
    qsort(en, (size_t)n, sizeof(long long), cmp_ll);
    int rooms = 0, ep = 0;
    for (int i = 0; i < n; i++) {
        if (st[i] < en[ep]) rooms++;
        else ep++;
    }
    printf("%d\\n", rooms);
    free(st); free(en);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> st(n), en(n);
    for (int i = 0; i < n; i++) cin >> st[i] >> en[i];
    sort(st.begin(), st.end());
    sort(en.begin(), en.end());
    int rooms = 0, ep = 0;
    for (int i = 0; i < n; i++) {
        if (st[i] < en[ep]) rooms++;
        else ep++;
    }
    cout << rooms << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
st = sorted(d[1 + 2 * i] for i in range(n))
en = sorted(d[2 + 2 * i] for i in range(n))
rooms = ep = 0
for s in st:
    if s < en[ep]:
        rooms += 1
    else:
        ep += 1
print(rooms)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] st = new long[n], en = new long[n];
        for (int i = 0; i < n; i++) { st[i] = sc.nextLong(); en[i] = sc.nextLong(); }
        Arrays.sort(st);
        Arrays.sort(en);
        int rooms = 0, ep = 0;
        for (int i = 0; i < n; i++) {
            if (st[i] < en[ep]) rooms++; else ep++;
        }
        System.out.println(rooms);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
const st = [], en = [];
for (let i = 0; i < n; i++) { st.push(d[1 + 2 * i]); en.push(d[2 + 2 * i]); }
st.sort((a, b) => a - b);
en.sort((a, b) => a - b);
let rooms = 0, ep = 0;
for (let i = 0; i < n; i++) {
  if (st[i] < en[ep]) rooms++; else ep++;
}
console.log(rooms);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const st: number[] = [], en: number[] = [];
for (let i = 0; i < n; i++) { st.push(d[1 + 2 * i]); en.push(d[2 + 2 * i]); }
st.sort((a, b) => a - b);
en.sort((a, b) => a - b);
let rooms = 0, ep = 0;
for (let i = 0; i < n; i++) {
  if (st[i] < en[ep]) rooms++; else ep++;
}
console.log(rooms);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut st: Vec<i64> = (0..n).map(|i| d[1 + 2 * i]).collect();
    let mut en: Vec<i64> = (0..n).map(|i| d[2 + 2 * i]).collect();
    st.sort_unstable();
    en.sort_unstable();
    let (mut rooms, mut ep) = (0usize, 0usize);
    for &x in &st {
        if x < en[ep] { rooms += 1; } else { ep += 1; }
    }
    println!("{}", rooms);
}`,
    },
  },

  {
    id: 'interview-daily-temperatures',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Monotonic Stack',
    sourceTag: 'FAANG Top 150 · Monotonic Stack',
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    difficulty: 'Medium',
    title: 'Daily Temperatures (Next Greater Element)',
    banglaTitle: 'দৈনিক তাপমাত্রা অপেক্ষা (মনোটোনিক স্ট্যাক)',
    xpReward: 145,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given an array of n daily temperatures, compute for each day i how many days you must wait until a strictly warmer temperature occurs. If no future day is warmer, output 0.',
    inputFormat: 'First line: integer n. Second line: n space-separated integers.',
    outputFormat: 'Print n space-separated integers representing wait days.',
    constraints: ['1 <= n <= 10^5', '30 <= temp[i] <= 100'],
    samples: [
      { id: 'dt-s1', input: '8\n73 74 75 71 69 72 76 73', expectedOutput: '1 1 4 2 1 1 0 0', explanation: 'Day 2 (75) waits 4 days for Day 6 (76).' },
    ],
    hiddenTests: [
      { id: 'dt-h1', input: '4\n30 40 50 60', expectedOutput: '1 1 1 0', isHidden: true },
      { id: 'dt-h2', input: '3\n90 80 70', expectedOutput: '0 0 0', isHidden: true },
    ],
    hints: [
      'A day waiting for a warmer temperature does not care about cooler days that came in between—it only waits for the FIRST strictly warmer day.',
      'Maintain a stack of INDICES whose temperatures are strictly non-increasing from bottom to top.',
      'When today’s temp[i] > temp[stack.top], pop index j = stack.pop() and set ans[j] = i - j!',
    ],
    approaches: {
      brute: {
        label: 'Look Ahead Until Warmer Day',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'For each day i, loop j = i+1..n-1 until temps[j] > temps[i].',
        banglaIntuition: 'প্রতিটি দিনের জন্য সামনের দিনগুলো একে একে চেক করলে ডিক্রিজিং তাপমাত্রায় O(n^2) সময়ে TLE হবে।',
        whyTleOrSuboptimal: 'On descending temperatures, takes ~5 × 10^9 checks for n = 10^5.',
        pseudocode: 'for i: for j=i+1..n-1: if t[j]>t[i]: ans[i]=j-i; break',
      },
      better: {
        label: 'Reverse Jump-Pointer Sweep (No Stack)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) extra',
        intuition: 'Iterate i from n-2 down to 0, jumping forward via already-computed ans[j] offsets.',
        banglaIntuition: 'পেছন থেকে ans[j] ধরে লাফ দিয়েও O(n) হয়, তবে মনোটোনিক স্ট্যাক সব Next Greater সমস্যায় সার্বজনীনভাবে কাজ করে।',
        whyTleOrSuboptimal: 'Slightly trickier boundary handling; Monotonic Stack transfers directly to Histogram and Next Greater.',
        pseudocode: 'for i=n-2..0: j=i+1; while t[j]<=t[i]: if ans[j]==0 break; j+=ans[j]',
      },
      optimal: {
        label: 'Monotonic Decreasing Index Stack',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Push unresolved day indices onto a decreasing stack. Whenever t[i] exceeds the stack top’s temperature, pop each cooler day j and record i - j. Every index is pushed and popped at most once.',
        banglaIntuition: 'স্ট্যাকের ভেতর ঠান্ডা দিনের ইনডেক্স জমিয়ে রাখি; যেই দিন বেশি গরম তাপমাত্রা আসবে, স্ট্যাক থেকে ছোটগুলো বের করে `(i - prevIndex)` বসিয়ে দিই! প্রতিটি দিন মাত্র একবার ঢোকে ও বের হয়—তাই সময় O(n)!',
        whyTleOrSuboptimal: 'Universal Monotonic Stack Pattern! Clean amortized O(n).',
        pseudocode: 'st=[]; for i: while st && t[i] > t[st.top]: j=st.pop(); ans[j]=i-j; st.push(i)',
      },
    },
    editorial: {
      bruteForceReason: 'Scanning forward for every index degrades to O(n^2) on decreasing arrays.',
      optimalApproach: 'A monotonic decreasing stack resolves every unresolved index on its first warmer encounter in amortized O(n) time.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 't=[73,74,75,71,69,72,76]', memoryOrStack: 'i=0->1: pop 0 (ans[0]=1)', note: '74 > 73 resolves day 0' },
        { step: 2, state: 'i=2..4: push 2(75), 3(71), 4(69)', memoryOrStack: 'st = [2, 3, 4]', note: 'Decreasing temperatures wait' },
        { step: 3, state: 'i=5 (72) pops 4,3; i=6 (76) pops 5,2', memoryOrStack: 'ans[2] = 6-2 = 4', note: 'Outputs 1 1 4 2 1 1 0 0' },
      ],
      banglaEditorial:
        'Next Greater Element ধরনের সব প্রবলেমের প্রধান অস্ত্র হলো মনোটোনিক স্ট্যাক। স্ট্যাকে আমরা ইনডেক্স রাখি যেন ওপর থেকে নিচে তাপমাত্রা ক্রমশ বড় থাকে। নতুন দিনের তাপমাত্রা স্ট্যাকের টপের চেয়ে বেশি হলে টপের অপেক্ষা শেষ—তাই পপ করে `i - j` বসিয়ে দিই।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int *t = malloc((size_t)n * sizeof(int));
    int *ans = calloc((size_t)n, sizeof(int));
    int *st = malloc((size_t)n * sizeof(int));
    int top = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &t[i]);
        while (top > 0 && t[i] > t[st[top - 1]]) {
            int j = st[--top];
            ans[j] = i - j;
        }
        st[top++] = i;
    }
    for (int i = 0; i < n; i++) printf("%d%s", ans[i], i + 1 == n ? "\\n" : " ");
    free(t); free(ans); free(st);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<int> t(n), ans(n, 0), st;
    for (int i = 0; i < n; i++) {
        cin >> t[i];
        while (!st.empty() && t[i] > t[st.back()]) {
            ans[st.back()] = i - st.back();
            st.pop_back();
        }
        st.push_back(i);
    }
    for (int i = 0; i < n; i++) cout << ans[i] << (i + 1 == n ? "\\n" : " ");
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
t = d[1:1 + n]
ans = [0] * n
st = []
for i, v in enumerate(t):
    while st and v > t[st[-1]]:
        j = st.pop()
        ans[j] = i - j
    st.append(i)
print(" ".join(map(str, ans)))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] t = new int[n], ans = new int[n], st = new int[n];
        int top = 0;
        for (int i = 0; i < n; i++) {
            t[i] = sc.nextInt();
            while (top > 0 && t[i] > t[st[top - 1]]) {
                int j = st[--top];
                ans[j] = i - j;
            }
            st[top++] = i;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(' ');
            sb.append(ans[i]);
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], t = d.slice(1, 1 + n);
const ans = Array(n).fill(0), st = [];
for (let i = 0; i < n; i++) {
  while (st.length && t[i] > t[st[st.length - 1]]) {
    const j = st.pop();
    ans[j] = i - j;
  }
  st.push(i);
}
console.log(ans.join(' '));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], t: number[] = d.slice(1, 1 + n);
const ans: number[] = Array<number>(n).fill(0);
const st: number[] = [];
for (let i = 0; i < n; i++) {
  while (st.length && t[i] > t[st[st.length - 1]]) {
    const j = st.pop()!;
    ans[j] = i - j;
  }
  st.push(i);
}
console.log(ans.join(' '));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let t = &d[1..1 + n];
    let mut ans = vec![0usize; n];
    let mut st: Vec<usize> = Vec::new();
    for i in 0..n {
        while let Some(&j) = st.last() {
            if t[i] > t[j] { st.pop(); ans[j] = i - j; }
            else { break; }
        }
        st.push(i);
    }
    println!("{}", ans.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
    },
  },

  {
    id: 'interview-largest-rectangle-histogram',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Monotonic Stack',
    sourceTag: 'FAANG Top 150 · Monotonic Stack Hard',
    companyTags: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    difficulty: 'Hard',
    title: 'Largest Rectangle in Histogram',
    banglaTitle: 'হিস্টোগ্রামে বৃহত্তম আয়তক্ষেত্র (মনোটোনিক স্ট্যাক)',
    xpReward: 200,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given n histogram bar heights of width 1, find the area of the largest rectangle formed inside the histogram.',
    inputFormat: 'First line: integer n. Second line: n non-negative integers h[i].',
    outputFormat: 'Print one integer: the largest rectangular area.',
    constraints: ['1 <= n <= 10^5', '0 <= h[i] <= 10^4'],
    samples: [
      { id: 'lrh-s1', input: '6\n2 1 5 6 2 3', expectedOutput: '10', explanation: 'Bars of heights [5, 6] yield height 5 × width 2 = 10.' },
      { id: 'lrh-s2', input: '2\n2 4', expectedOutput: '4' },
    ],
    hiddenTests: [
      { id: 'lrh-h1', input: '5\n2 2 2 2 2', expectedOutput: '10', isHidden: true },
      { id: 'lrh-h2', input: '4\n6 2 5 4', expectedOutput: '8', isHidden: true },
    ],
    hints: [
      'Every maximal rectangle has its height equal to some bar h[k], extending left and right until hitting the first strictly shorter bar!',
      'Maintain a monotonically INCREASING stack of bar indices (so every popped bar knows its right smaller boundary is current index i, and its left smaller boundary is the new stack top!).',
      'Append a virtual sentinel bar of height 0 at index n so every remaining bar on the stack gets popped and evaluated automatically!',
    ],
    approaches: {
      brute: {
        label: 'Expand Left & Right Per Bar',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'For every bar i, walk left until h[L] < h[i] and walk right until h[R] < h[i], then compute h[i] * (R - L - 1).',
        banglaIntuition: 'প্রতিটি বারের বাম ও ডানে গিয়ে ছোট বার খোঁজা—n=10^5 সমান উচ্চতার বারে এটি O(n^2) হয়ে TLE খাবে।',
        whyTleOrSuboptimal: 'O(n^2) times out when bars are ascending or equal for n = 10^5.',
        pseudocode: 'for i: expand L left, R right while >= h[i]; ans=max(ans, h[i]*(R-L-1))',
      },
      better: {
        label: 'Precompute LeftSmaller[] & RightSmaller[] Arrays (3 Passes)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) (3 arrays)',
        intuition: 'Run two separate monotonic stack passes to fill nextSmallerLeft[i] and nextSmallerRight[i], then evaluate max h[i]*(R[i]-L[i]-1).',
        banglaIntuition: 'আলাদাভাবে বাম ও ডান ছোট বারের দুটি অ্যারে বের করে গুণ করলেও O(n) হয়, তবে এক পাসেই একই স্ট্যাক থেকে দুটো পাওয়া যায়।',
        whyTleOrSuboptimal: 'Uses 3 passes and extra boundary arrays vs single-pass sentinel stack.',
        pseudocode: 'L = prevSmaller(h); R = nextSmaller(h); ans = max(h[i]*(R[i]-L[i]-1))',
      },
      optimal: {
        label: 'Single-Pass Increasing Stack + Sentinel Zero Bar',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Keep an increasing stack of bar indices. For i = 0..n (with h[n] = 0), while curH < h[stack.top], pop idx: height = h[idx], width = stack.empty ? i : i - stack.top - 1.',
        banglaIntuition: 'ক্রমবর্ধমান উচ্চতার মনোটোনিক স্ট্যাক রাখি; যেই ছোট বার (বা শেষে 0 সেন্টিনেল) আসে, স্ট্যাক থেকে পপ হওয়া বারের বাম ও ডান দুই সীমানাই তৎক্ষণাৎ জানা থাকায় এক পাসেই সর্বোচ্চ আয়তক্ষেত্র বের হয়!',
        whyTleOrSuboptimal: 'Google/Meta Classic Hard! One linear pass, one stack.',
        pseudocode: 'for i in 0..n: cur=(i==n?0:h[i]); while st && cur < h[st.top]: H=h[st.pop()]; W=st.empty?i:i-st.top-1; best=max(best,H*W); st.push(i)',
      },
    },
    editorial: {
      bruteForceReason: 'Expanding outward for each bar separately takes O(n^2) time on monotonic sequences.',
      optimalApproach: 'A single-pass monotonically increasing stack with a trailing 0-height sentinel computes each bar’s maximal rectangle width on pop in O(n) time.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'h=[2,1,5,6,2,3], i=0..1', memoryOrStack: 'i=1 (1 < 2) pops 0', note: 'Area = 2 * 1 = 2; stack=[1]' },
        { step: 2, state: 'i=2(5), i=3(6), i=4(2)', memoryOrStack: '2 < 6 pops 3 (6*1=6), pops 2 (5*2=10)', note: 'best = 10' },
        { step: 3, state: 'Sentinel 0 at i=6 flushes stack', memoryOrStack: 'Widths evaluated cleanly', note: 'Outputs 10' },
      ],
      banglaEditorial:
        'একটি বার h[k] সর্বোচ্চ কতটুকু চওড়া আয়তক্ষেত্র বানাতে পারবে, তা নির্ভর করে এর বামে ও ডানে প্রথম কোন বারটি এর চেয়ে ছোট। ক্রমবর্ধমান মনোটোনিক স্ট্যাকে কোনো বার পপ হওয়ার সময় ডানের ছোট বারটি হলো বর্তমান i, আর বামের ছোট বারটি হলো পপ করার পর স্ট্যাকের টপ! শেষে একটি 0 উচ্চতার ডামি বার যোগ করলে বাকি সব বারও হিসাব হয়ে যায়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *h = malloc((size_t)(n + 1) * sizeof(long long));
    int *st = malloc((size_t)(n + 1) * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    h[n] = 0;
    int top = 0;
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        while (top > 0 && h[i] < h[st[top - 1]]) {
            long long ht = h[st[--top]];
            long long w = top == 0 ? i : i - st[top - 1] - 1;
            if (ht * w > best) best = ht * w;
        }
        st[top++] = i;
    }
    printf("%lld\\n", best);
    free(h); free(st);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> h(n + 1, 0);
    for (int i = 0; i < n; i++) cin >> h[i];
    vector<int> st;
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        while (!st.empty() && h[i] < h[st.back()]) {
            long long ht = h[st.back()];
            st.pop_back();
            long long w = st.empty() ? i : i - st.back() - 1;
            best = max(best, ht * w);
        }
        st.push_back(i);
    }
    cout << best << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
h = d[1:1 + n] + [0]
st = []
best = 0
for i, cur in enumerate(h):
    while st and cur < h[st[-1]]:
        ht = h[st.pop()]
        w = i if not st else i - st[-1] - 1
        best = max(best, ht * w)
    st.append(i)
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] h = new long[n + 1];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();
        int[] st = new int[n + 1];
        int top = 0;
        long best = 0;
        for (int i = 0; i <= n; i++) {
            while (top > 0 && h[i] < h[st[top - 1]]) {
                long ht = h[st[--top]];
                long w = top == 0 ? i : i - st[top - 1] - 1;
                best = Math.max(best, ht * w);
            }
            st[top++] = i;
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], h = d.slice(1, 1 + n);
h.push(0);
const st = [];
let best = 0;
for (let i = 0; i <= n; i++) {
  while (st.length && h[i] < h[st[st.length - 1]]) {
    const ht = h[st.pop()];
    const w = st.length === 0 ? i : i - st[st.length - 1] - 1;
    best = Math.max(best, ht * w);
  }
  st.push(i);
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], h: number[] = d.slice(1, 1 + n);
h.push(0);
const st: number[] = [];
let best = 0;
for (let i = 0; i <= n; i++) {
  while (st.length && h[i] < h[st[st.length - 1]]) {
    const ht = h[st.pop()!];
    const w = st.length === 0 ? i : i - st[st.length - 1] - 1;
    best = Math.max(best, ht * w);
  }
  st.push(i);
}
console.log(best);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut h = d[1..1 + n].to_vec();
    h.push(0);
    let mut st: Vec<usize> = Vec::new();
    let mut best = 0i64;
    for i in 0..=n {
        while let Some(&top) = st.last() {
            if h[i] < h[top] {
                st.pop();
                let w = match st.last() {
                    Some(&prev) => (i - prev - 1) as i64,
                    None => i as i64,
                };
                best = best.max(h[top] * w);
            } else { break; }
        }
        st.push(i);
    }
    println!("{}", best);
}`,
    },
  },

  {
    id: 'interview-house-robber',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Dynamic Programming',
    sourceTag: 'FAANG Top 150 · 1D Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Meta'],
    difficulty: 'Medium',
    title: 'House Robber (Non-Adjacent Maximum Sum DP)',
    banglaTitle: 'হাউস রবার (পাশাপাশি ঘর বাদে সর্বোচ্চ মান ডিপি)',
    xpReward: 135,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'You are given n houses along a street where house i stores nums[i] money. Adjacent houses trigger an alarm if both are robbed. Compute the maximum total amount you can collect without picking two adjacent houses.',
    inputFormat: 'First line: integer n. Second line: n non-negative integers.',
    outputFormat: 'Print one integer: the maximum non-adjacent sum.',
    constraints: ['1 <= n <= 10^5', '0 <= nums[i] <= 10^4'],
    samples: [
      { id: 'hr-s1', input: '4\n1 2 3 1', expectedOutput: '4', explanation: 'Pick house 0 (1) + house 2 (3) = 4.' },
      { id: 'hr-s2', input: '5\n2 7 9 3 1', expectedOutput: '12', explanation: 'Pick 2 + 9 + 1 = 12.' },
    ],
    hiddenTests: [
      { id: 'hr-h1', input: '1\n10', expectedOutput: '10', isHidden: true },
      { id: 'hr-h2', input: '4\n2 1 1 2', expectedOutput: '4', isHidden: true },
    ],
    hints: [
      'Greedy (even-indexed vs odd-indexed sums) FAILS! On [2, 1, 1, 2], skipping two adjacent houses gives 2 + 2 = 4!',
      'At house i, you have two choices: skip house i (keep dp[i-1]) OR rob house i (dp[i-2] + nums[i]).',
      'Since dp[i] only depends on dp[i-1] and dp[i-2], collapse the array into two variables: prev2, prev1!',
    ],
    approaches: {
      brute: {
        label: 'Exponential Take-or-Skip Recursion',
        timeComplexity: 'O(2^n)',
        spaceComplexity: 'O(n)',
        intuition: 'Recursively branch between rob(i+2) + nums[i] and rob(i+1).',
        banglaIntuition: 'প্রতিটি ঘরের জন্য নেওয়া-বা-না-নেওয়া রিকার্শন চালালে ২^n পথে ভেঙে পড়ে এবং TLE খায়।',
        whyTleOrSuboptimal: 'Exponential O(2^n) hangs around n = 40.',
        pseudocode: 'solve(i): if i>=n return 0; return max(a[i]+solve(i+2), solve(i+1))',
      },
      better: {
        label: '1D Tabulation DP Array dp[0..n]',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Fill dp[i] = max(dp[i-1], dp[i-2] + nums[i]) iteratively.',
        banglaIntuition: 'dp[n] অ্যারে রাখলে O(n) সময়ে উত্তর মেলে, তবে শুধু আগের দুটি মান রাখলেই অ্যারের দরকার পড়ে না।',
        whyTleOrSuboptimal: 'Allocates O(n) array when only the previous two states are needed.',
        pseudocode: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
      },
      optimal: {
        label: 'O(1)-Space Rolling Two-Variable DP (prev2, prev1)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Maintain prev2 = best up to i-2 and prev1 = best up to i-1. For each x: next = max(prev1, prev2 + x); prev2 = prev1; prev1 = next.',
        banglaIntuition: 'শুধু দুটি ভ্যারিয়েবল `prev2` ও `prev1` রাখি: প্রতিটি নতুন ঘর x-এর জন্য `max(prev1, prev2 + x)` হিসাব করে আপডেট করলেই O(n) সময় ও O(1) মেমোরিতে সমাধান সম্পন্ন!',
        whyTleOrSuboptimal: 'Interview Gold Standard! Linear time, constant RAM.',
        pseudocode: 'prev2=0, prev1=0; for x in nums: cur=max(prev1, prev2+x); prev2=prev1; prev1=cur; return prev1',
      },
    },
    editorial: {
      bruteForceReason: 'Taking vs skipping recursively recomputes overlapping suffixes in O(2^n) time; even-odd greedy fails on [2, 1, 1, 2].',
      optimalApproach: 'Rolling two-state DP computes max(prev1, prev2 + nums[i]) in O(n) time and O(1) space.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'nums=[2,1,1,2], x=2', memoryOrStack: 'prev2=0, prev1=2', note: 'Take 2' },
        { step: 2, state: 'x=1, x=1', memoryOrStack: 'prev1=max(2,0+1)=2; then max(2,2+1)=3', note: 'prev2=2, prev1=3' },
        { step: 3, state: 'x=2', memoryOrStack: 'cur=max(3, 2+2)=4', note: 'Outputs 4 (2 + 2)' },
      ],
      banglaEditorial:
        'জোড় বনাম বিজোড় ইনডেক্সের যোগফল নিলে ভুল হতে পারে—যেমন [2, 1, 1, 2] অ্যারেতে প্রথম ও শেষ ঘর (২ + ২ = ৪) নিলে দুটি ঘর মাঝে বাদ যায়। তাই DP স্টেট `dp[i] = max(dp[i-1], dp[i-2] + a[i])` ব্যবহার করে মাত্র দুটি ভ্যারিয়েবল `prev2`, `prev1` দিয়েই O(1) স্পেসে সমাধান করা যায়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        long long x; scanf("%lld", &x);
        long long cur = (prev2 + x > prev1) ? (prev2 + x) : prev1;
        prev2 = prev1;
        prev1 = cur;
    }
    printf("%lld\\n", prev1);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    long long prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        long long cur = max(prev1, prev2 + x);
        prev2 = prev1;
        prev1 = cur;
    }
    cout << prev1 << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
prev2 = prev1 = 0
for x in d[1:1 + n]:
    prev2, prev1 = prev1, max(prev1, prev2 + x)
print(prev1)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long prev2 = 0, prev1 = 0;
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            long cur = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        System.out.println(prev1);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
let prev2 = 0, prev1 = 0;
for (let i = 1; i <= n; i++) {
  const cur = Math.max(prev1, prev2 + d[i]);
  prev2 = prev1;
  prev1 = cur;
}
console.log(prev1);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let prev2 = 0, prev1 = 0;
for (let i = 1; i <= n; i++) {
  const cur = Math.max(prev1, prev2 + d[i]);
  prev2 = prev1;
  prev1 = cur;
}
console.log(prev1);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let (mut prev2, mut prev1) = (0i64, 0i64);
    for &x in &d[1..1 + n] {
        let cur = prev1.max(prev2 + x);
        prev2 = prev1;
        prev1 = cur;
    }
    println!("{}", prev1);
}`,
    },
  },

  {
    id: 'interview-edit-distance',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Dynamic Programming',
    sourceTag: 'FAANG Top 150 · String 2D->1D DP',
    companyTags: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    difficulty: 'Hard',
    title: 'Edit Distance (Levenshtein 1D Rolling DP)',
    banglaTitle: 'এডিট ডিস্ট্যান্স (লেভেনশটাইন স্ট্রিং ডিপি)',
    xpReward: 195,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given two strings word1 and word2, find the minimum number of single-character operations (insert, delete, or replace) required to convert word1 into word2.',
    inputFormat: 'Two whitespace-separated strings word1 and word2.',
    outputFormat: 'Print one integer: the minimum edit distance.',
    constraints: ['1 <= |word1|, |word2| <= 500', 'Strings contain lowercase English letters'],
    samples: [
      { id: 'ed-s1', input: 'horse ros', expectedOutput: '3', explanation: 'horse -> rorse (replace h->r) -> rose (delete r) -> ros (delete e).' },
      { id: 'ed-s2', input: 'intention execution', expectedOutput: '5' },
    ],
    hiddenTests: [
      { id: 'ed-h1', input: 'abc abc', expectedOutput: '0', isHidden: true },
      { id: 'ed-h2', input: 'kitten sitting', expectedOutput: '3', isHidden: true },
    ],
    hints: [
      'Define dp[i][j] = minimum edits to convert prefix word1[0..i-1] to prefix word2[0..j-1].',
      'If word1[i-1] == word2[j-1], no edit is needed: dp[i][j] = dp[i-1][j-1]. Otherwise take 1 + min(dp[i-1][j] delete, dp[i][j-1] insert, dp[i-1][j-1] replace).',
      'Space-optimize the n × m table into a single 1D row dp[0..m] by saving diagonal = dp[j] before overwriting dp[j]!',
    ],
    approaches: {
      brute: {
        label: '3-Way Branching Recursion',
        timeComplexity: 'O(3^(m+n))',
        spaceComplexity: 'O(m+n)',
        intuition: 'At mismatch (i, j), recursively try insert (i, j+1), delete (i+1, j), and replace (i+1, j+1).',
        banglaIntuition: 'প্রতিটি অমিল অক্ষরে ৩টি করে ব্রাঞ্চ খুললে ৩^(m+n) হয়ে মুহূর্তেই TLE খাবে।',
        whyTleOrSuboptimal: 'Exponential blowup on strings longer than ~15 chars.',
        pseudocode: 'ed(i,j): if w1[i]==w2[j] return ed(i+1,j+1); return 1+min(ed(i+1,j), ed(i,j+1), ed(i+1,j+1))',
      },
      better: {
        label: 'Full 2D DP Table dp[n+1][m+1]',
        timeComplexity: 'O(n * m)',
        spaceComplexity: 'O(n * m)',
        intuition: 'Build the full (n+1) × (m+1) matrix using top, left, and top-left neighbors.',
        banglaIntuition: 'পুরো ২ডি ম্যাট্রিক্স বানালে O(n × m) সময়ে কাজ হয়, তবে O(n × m) মেমোরির বদলে এক সারি দিয়েই সম্ভব।',
        whyTleOrSuboptimal: 'Uses O(n * m) heap table when a 1D rolling array needs only O(m) space.',
        pseudocode: 'dp[i][j] = (w1[i-1]==w2[j-1]) ? dp[i-1][j-1] : 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])',
      },
      optimal: {
        label: '1D Rolling-Row DP with Diagonal Temp',
        timeComplexity: 'O(n * m)',
        spaceComplexity: 'O(m)',
        intuition: 'Maintain a 1D array dp[0..m] initialized to [0..m]. On row i, track prevDiag = dp[0], set dp[0] = i, and for j = 1..m update dp[j] while preserving old dp[j] as next prevDiag.',
        banglaIntuition: '২ডি টেবিলের বদলে মাত্র ১টি রো `dp[0..m]` ও একটি ডায়াগোনাল ভ্যারিয়েবল `prevDiag` রাখলেই O(n × m) সময়ে ও মাত্র O(m) মেমোরিতে লেভেনশটাইন ডিস্ট্যান্স বের হয়!',
        whyTleOrSuboptimal: 'Optimal! Minimal memory footprint and tight 1D cache locality.',
        pseudocode: 'dp=[0..m]; for i in 1..n: diag=dp[0]; dp[0]=i; for j in 1..m: tmp=dp[j]; dp[j]=match?diag:1+min(dp[j],dp[j-1],diag); diag=tmp',
      },
    },
    editorial: {
      bruteForceReason: 'Trying all three edit operations recursively at every mismatch explodes exponentially in O(3^(n+m)).',
      optimalApproach: '1D space-compressed Levenshtein DP computes the exact edit table in O(n * m) time and O(m) space.',
      timeComplexity: 'O(n * m)',
      spaceComplexity: 'O(m)',
      dryRunSteps: [
        { step: 1, state: 'w1="horse", w2="ros"', memoryOrStack: 'dp = [0, 1, 2, 3]', note: 'Base row: converting "" to "", "r", "ro", "ros"' },
        { step: 2, state: 'Rows h, o, r, s, e', memoryOrStack: 'h->r (1), ho->ro (1), hor->ros (2)...', note: 'Tracks delete/insert/replace costs' },
        { step: 3, state: 'Final cell dp[3]', memoryOrStack: 'dp[3] = 3', note: 'Outputs 3' },
      ],
      banglaEditorial:
        'দুটি শব্দের মিল ও অমিল তুলনা করতে `dp[i][j]` মানে প্রথম শব্দের প্রথম `i` অক্ষরকে দ্বিতীয় শব্দের প্রথম `j` অক্ষরে রূপান্তর করতে ন্যূনতম কয়টি অপারেশন লাগবে। অক্ষর মিলে গেলে কোনো খরচ নেই (`dp[i-1][j-1]`), আর না মিললে Delete, Insert বা Replace—এই তিনটির ন্যূনতমের সাথে +১ যোগ হয়।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <string.h>
int min3(int a, int b, int c) { int m = a < b ? a : b; return m < c ? m : c; }
int main(void) {
    static char a[505], b[505];
    if (scanf("%500s %500s", a, b) != 2) return 0;
    int n = (int)strlen(a), m = (int)strlen(b);
    int dp[505];
    for (int j = 0; j <= m; j++) dp[j] = j;
    for (int i = 1; i <= n; i++) {
        int diag = dp[0];
        dp[0] = i;
        for (int j = 1; j <= m; j++) {
            int tmp = dp[j];
            if (a[i - 1] == b[j - 1]) dp[j] = diag;
            else dp[j] = 1 + min3(dp[j], dp[j - 1], diag);
            diag = tmp;
        }
    }
    printf("%d\\n", dp[m]);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() {
    string a, b; cin >> a >> b;
    int n = (int)a.size(), m = (int)b.size();
    vector<int> dp(m + 1);
    for (int j = 0; j <= m; j++) dp[j] = j;
    for (int i = 1; i <= n; i++) {
        int diag = dp[0];
        dp[0] = i;
        for (int j = 1; j <= m; j++) {
            int tmp = dp[j];
            if (a[i - 1] == b[j - 1]) dp[j] = diag;
            else dp[j] = 1 + min({dp[j], dp[j - 1], diag});
            diag = tmp;
        }
    }
    cout << dp[m] << "\\n";
    return 0;
}`,
      python: `import sys
a, b = sys.stdin.read().split()
n, m = len(a), len(b)
dp = list(range(m + 1))
for i in range(1, n + 1):
    diag = dp[0]
    dp[0] = i
    for j in range(1, m + 1):
        tmp = dp[j]
        if a[i - 1] == b[j - 1]:
            dp[j] = diag
        else:
            dp[j] = 1 + min(dp[j], dp[j - 1], diag)
        diag = tmp
print(dp[m])`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.next(), b = sc.next();
        int n = a.length(), m = b.length();
        int[] dp = new int[m + 1];
        for (int j = 0; j <= m; j++) dp[j] = j;
        for (int i = 1; i <= n; i++) {
            int diag = dp[0];
            dp[0] = i;
            for (int j = 1; j <= m; j++) {
                int tmp = dp[j];
                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = diag;
                else dp[j] = 1 + Math.min(diag, Math.min(dp[j], dp[j - 1]));
                diag = tmp;
            }
        }
        System.out.println(dp[m]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
const n = a.length, m = b.length;
const dp = Array.from({ length: m + 1 }, (_, j) => j);
for (let i = 1; i <= n; i++) {
  let diag = dp[0];
  dp[0] = i;
  for (let j = 1; j <= m; j++) {
    const tmp = dp[j];
    if (a[i - 1] === b[j - 1]) dp[j] = diag;
    else dp[j] = 1 + Math.min(dp[j], dp[j - 1], diag);
    diag = tmp;
  }
}
console.log(dp[m]);`,
      typescript: `import * as fs from 'fs';
const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = a.length, m: number = b.length;
const dp: number[] = Array.from({ length: m + 1 }, (_, j) => j);
for (let i = 1; i <= n; i++) {
  let diag = dp[0];
  dp[0] = i;
  for (let j = 1; j <= m; j++) {
    const tmp = dp[j];
    if (a[i - 1] === b[j - 1]) dp[j] = diag;
    else dp[j] = 1 + Math.min(dp[j], dp[j - 1], diag);
    diag = tmp;
  }
}
console.log(dp[m]);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a = it.next().unwrap().as_bytes();
    let b = it.next().unwrap().as_bytes();
    let (n, m) = (a.len(), b.len());
    let mut dp: Vec<usize> = (0..=m).collect();
    for i in 1..=n {
        let mut diag = dp[0];
        dp[0] = i;
        for j in 1..=m {
            let tmp = dp[j];
            if a[i - 1] == b[j - 1] {
                dp[j] = diag;
            } else {
                dp[j] = 1 + dp[j].min(dp[j - 1]).min(diag);
            }
            diag = tmp;
        }
    }
    println!("{}", dp[m]);
}`,
    },
  },
];
