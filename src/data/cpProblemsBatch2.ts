import type { Problem } from '../types/academy';

export const CP_PROBLEMS_BATCH_2: Problem[] = [
  // =========================================================================
  // 9. BINARY SEARCH ON ANSWER — CodeChef 2-Star / CF Div. 2 B · 1400
  // =========================================================================
  {
    id: 'cc-aggressive-stalls',
    category: 'cp',
    platform: 'CodeChef',
    topic: 'Binary Search on Answer',
    sourceTag: 'CodeChef 2-Star · CF Div. 2 B 1400',
    companyTags: ['CodeChef 2-Star', 'Codeforces 1400', 'Aggressive Cows', 'Amazon'],
    difficulty: 'Medium',
    title: 'Aggressive Cows (Maximize Minimum Distance)',
    banglaTitle: 'সর্বোচ্চ ন্যূনতম দূরত্ব নির্ণয় (অ্যান্সারে বাইনারি সার্চ)',
    xpReward: 155,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Farmer John built a long barn with n stalls located along a straight line at coordinates x_1, x_2, ..., x_n. His c cows become aggressive if placed too close together. Assign the c cows to distinct stalls so that the minimum distance between any two cows is as large as possible. Output that largest minimum distance.',
    inputFormat: 'First line: n and c (2 <= c <= n <= 10^5). Second line: n integers x_i (0 <= x_i <= 10^9).',
    outputFormat: 'Print a single integer: the largest possible minimum distance.',
    constraints: ['2 <= c <= n <= 10^5', '0 <= x_i <= 10^9 (unsorted input -> sort first!)'],
    samples: [
      { id: 'ac-s1', input: '5 3\n1 2 8 4 9', expectedOutput: '3', explanation: 'Sorted stalls [1,2,4,8,9]: place cows at 1, 4, 8 -> min distance = 3.' },
    ],
    hiddenTests: [
      { id: 'ac-h1', input: '3 2\n0 1000000000 5', expectedOutput: '1000000000', isHidden: true },
      { id: 'ac-h2', input: '4 4\n1 5 9 13', expectedOutput: '4', isHidden: true },
    ],
    hints: [
      'If a minimum spacing D works, then every smaller spacing D\' < D also works! That monotonic YES...YES, NO...NO pattern unlocks Binary Search on Answer.',
      'Sort the stall coordinates first. How do you test if spacing D is feasible in O(n)?',
      'Greedily put cow #1 at x[0], and each next cow at the first stall x[i] with x[i] - lastPos >= D. If placed >= c, try larger D (lo = mid).',
    ],
    approaches: {
      brute: {
        label: 'Test Every Candidate Distance D = 1..maxX',
        timeComplexity: 'O(n log n + n * maxX)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort stalls, then try D = 1, 2, 3, ... one by one with a greedy check until D stops fitting c cows.',
        banglaIntuition: 'দূরত্ব D = 1, 2, 3... প্রতিটি মান ধরে ধরে চেক করা—x[i] <= 10^9 হলে ১০০ কোটি ধাপ লেগে সাথে সাথে TLE দেয়!',
        whyTleOrSuboptimal: 'Extreme TLE! When maxX = 10^9, testing D linearly takes 10^14 steps.',
        pseudocode: 'sort(x); for D in 1..x[n-1]-x[0]: if !canPlace(D): return D-1',
      },
      better: {
        label: 'Test All C(n, c) Cow Combinations (Backtracking)',
        timeComplexity: 'O(C(n, c))',
        spaceComplexity: 'O(c)',
        intuition: 'Enumerate all ways to choose c stalls out of n and maximize the minimum adjacent gap.',
        banglaIntuition: 'n-টি স্টল থেকে c-টি স্টল বেছে নেওয়ার সব কম্বিনেশন দেখা—এক্সপোনেনশিয়াল সময়ে TLE আসে।',
        whyTleOrSuboptimal: 'Exponential blowup! Impossible for n > 25.',
        pseudocode: 'dfs(idx, chosen): maximize min adjacent diff across c chosen stalls',
      },
      optimal: {
        label: 'Sort + Binary Search on Answer D + O(n) Greedy Check',
        timeComplexity: 'O(n log n + n log(maxX))',
        spaceComplexity: 'O(n)',
        intuition: 'Sort coordinates x. Binary search D in [0, x[n-1] - x[0]]. For candidate mid, greedily place the first cow at x[0] and subsequent cows whenever x[i] - last >= mid.',
        banglaIntuition: 'যদি দূরত্ব D-তে গরু বসানো যায়, তবে এর চেয়ে ছোট সব দূরত্বেও বসানো যাবে! এই মনোটোনিক বৈশিষ্ট্য কাজে লাগিয়ে উত্তর D-এর ওপর বাইনারি সার্চ এবং প্রতি ধাপে O(n) গ্রিডি চেক করলেই মাত্র ~৩০ ধাপে উত্তর মেলে!',
        whyTleOrSuboptimal: 'Must-Know Placement & CP Classic! Reduces 10^9 range checks down to 30 iterations.',
        pseudocode: 'sort(x); lo=0, hi=x[n-1]-x[0]; while lo<hi: mid=(lo+hi+1)/2; if canPlace(mid) lo=mid else hi=mid-1',
      },
    },
    editorial: {
      bruteForceReason: 'Testing every integer distance D up to 10^9 linearly takes 10^14 operations.',
      optimalApproach: 'Sort stalls, then binary search the maximum feasible distance D in [0, max - min] using an O(n) greedy placement check.',
      timeComplexity: 'O(n log n + n log(maxX))',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Sort [1,2,8,4,9]', memoryOrStack: 'x = [1, 2, 4, 8, 9]', note: 'lo=0, hi=8' },
        { step: 2, state: 'mid = 4 -> greedy', memoryOrStack: 'place 1 -> 8 (only 2 cows < 3)', note: 'hi = 3' },
        { step: 3, state: 'mid = 3 -> greedy', memoryOrStack: 'place 1 -> 4 -> 8 (3 cows!)', note: 'lo = 3; converges to 3' },
      ],
      banglaEditorial:
        'অনেকেই শুধু অ্যারের ভেতরে Binary Search করতে জানে, কিন্তু "উত্তরের ওপর Binary Search" (Binary Search on Answer) হলো কনটেস্টের অন্যতম শক্তিশালী অস্ত্র! এখানে সম্ভাব্য দূরত্ব ০ থেকে (max - min) এর মধ্যে বাইনারি সার্চ করে প্রতিবার গ্রিডি উপায়ে দেখি c-টি গরু বসানো যায় কি না।',
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
int can_place(const long long *x, int n, int c, long long dist) {
    int cnt = 1; long long last = x[0];
    for (int i = 1; i < n; i++) {
        if (x[i] - last >= dist) { cnt++; last = x[i]; if (cnt >= c) return 1; }
    }
    return 0;
}
int main(void) {
    int n, c;
    if (scanf("%d %d", &n, &c) != 2) return 0;
    long long *x = malloc((size_t)n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &x[i]);
    qsort(x, (size_t)n, sizeof(long long), cmp_ll);
    long long lo = 0, hi = x[n - 1] - x[0];
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2;
        if (can_place(x, n, c, mid)) lo = mid; else hi = mid - 1;
    }
    printf("%lld\\n", lo);
    free(x);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}, c{}; cin >> n >> c;
    vector<long long> x(n);
    for (auto &v : x) cin >> v;
    ranges::sort(x);
    auto ok = [&](long long dist) {
        int cnt = 1;
        long long last = x[0];
        for (int i = 1; i < n; ++i) {
            if (x[i] - last >= dist) {
                if (++cnt >= c) return true;
                last = x[i];
            }
        }
        return false;
    };
    long long lo = 0, hi = x.back() - x.front();
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2;
        if (ok(mid)) lo = mid;
        else hi = mid - 1;
    }
    cout << lo << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, c = d[0], d[1]
x = sorted(d[2 : 2 + n])
def ok(dist):
    cnt, last = 1, x[0]
    for v in x[1:]:
        if v - last >= dist:
            cnt += 1
            last = v
            if cnt >= c:
                return True
    return False
lo, hi = 0, x[-1] - x[0]
while lo < hi:
    mid = (lo + hi + 1) // 2
    if ok(mid):
        lo = mid
    else:
        hi = mid - 1
print(lo)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static boolean ok(long[] x, int c, long dist) {
        int cnt = 1; long last = x[0];
        for (int i = 1; i < x.length; i++) {
            if (x[i] - last >= dist) {
                cnt++; last = x[i];
                if (cnt >= c) return true;
            }
        }
        return false;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken()), c = Integer.parseInt(st.nextToken());
        long[] x = new long[n];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            x[i] = Long.parseLong(st.nextToken());
        }
        Arrays.sort(x);
        long lo = 0, hi = x[n - 1] - x[0];
        while (lo < hi) {
            long mid = lo + (hi - lo + 1) / 2;
            if (ok(x, c, mid)) lo = mid; else hi = mid - 1;
        }
        System.out.println(lo);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0], c = d[1];
const x = d.slice(2, 2 + n).sort((a, b) => a - b);
function ok(dist) {
  let cnt = 1, last = x[0];
  for (let i = 1; i < n; i++) {
    if (x[i] - last >= dist) {
      cnt++; last = x[i];
      if (cnt >= c) return true;
    }
  }
  return false;
}
let lo = 0, hi = x[n - 1] - x[0];
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo + 1) / 2);
  if (ok(mid)) lo = mid; else hi = mid - 1;
}
console.log(lo);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], c: number = d[1];
const x: number[] = d.slice(2, 2 + n).sort((a, b) => a - b);
function ok(dist: number): boolean {
  let cnt = 1, last = x[0];
  for (let i = 1; i < n; i++) {
    if (x[i] - last >= dist) {
      cnt++; last = x[i];
      if (cnt >= c) return true;
    }
  }
  return false;
}
let lo = 0, hi = x[n - 1] - x[0];
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo + 1) / 2);
  if (ok(mid)) lo = mid; else hi = mid - 1;
}
console.log(lo);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|v| v.parse().unwrap()).collect();
    let (n, c) = (d[0] as usize, d[1] as usize);
    let mut x = d[2..2 + n].to_vec();
    x.sort_unstable();
    let ok = |dist: i64| -> bool {
        let mut cnt = 1usize;
        let mut last = x[0];
        for &pos in &x[1..] {
            if pos - last >= dist {
                cnt += 1;
                last = pos;
                if cnt >= c { return true; }
            }
        }
        false
    };
    let (mut lo, mut hi) = (0i64, x[n - 1] - x[0]);
    while lo < hi {
        let mid = lo + (hi - lo + 1) / 2;
        if ok(mid) { lo = mid; } else { hi = mid - 1; }
    }
    println!("{}", lo);
}`,
    },
  },

  // =========================================================================
  // 10. BINARY SEARCH ON ANSWER — CodeChef 2-Star · Minimum Batch Speed
  // =========================================================================
  {
    id: 'cc-min-batch-speed',
    category: 'cp',
    platform: 'CodeChef',
    topic: 'Binary Search on Answer',
    sourceTag: 'CodeChef 2-Star · Koko Speed BS',
    companyTags: ['CodeChef 2-Star', 'Google', 'Meta', 'Binary Search'],
    difficulty: 'Medium',
    title: 'Minimum Batch Processing Speed',
    banglaTitle: 'সর্বনিম্ন প্রসেসিং গতি নির্ণয় (কোকো ব্যানানা বাইনারি সার্চ)',
    xpReward: 145,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'There are n server queues, where queue i contains p_i jobs. An engineer sets a fixed hourly processing speed k (jobs per hour). Each hour, the server picks one non-empty queue and finishes up to k jobs from it (if fewer than k jobs remain in that queue, it finishes all remaining jobs and waits until the next hour). Given deadline h hours (h >= n), find the MINIMUM integer speed k needed to finish all jobs within h hours.',
    inputFormat: 'First line: n and h (1 <= n <= 10^5, n <= h <= 10^9). Second line: n integers p_i (1 <= p_i <= 10^9).',
    outputFormat: 'Print the minimum integer speed k >= 1.',
    constraints: ['1 <= n <= 10^5', 'n <= h <= 10^9', '1 <= p_i <= 10^9 (use 64-bit integer for hour summation!)'],
    samples: [
      { id: 'bs-sp-s1', input: '4 8\n3 6 7 11', expectedOutput: '4', explanation: 'At k=4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 <= 8.' },
    ],
    hiddenTests: [
      { id: 'bs-sp-h1', input: '5 5\n30 11 23 4 20', expectedOutput: '30', isHidden: true },
      { id: 'bs-sp-h2', input: '5 6\n30 11 23 4 20', expectedOutput: '23', isHidden: true },
    ],
    hints: [
      'Hours taken by queue i at speed k is ceil(p_i / k), computed cleanly with integer math as (p_i + k - 1) / k.',
      'As speed k increases, total hours needed ONLY decreases or stays equal (monotonic)!',
      'Binary search k in [1, max(p)]. Whenever totalHours(mid) <= h, record hi = mid; otherwise lo = mid + 1.',
    ],
    approaches: {
      brute: {
        label: 'Try Speed k = 1, 2, 3, ... Linearly',
        timeComplexity: 'O(n * max(p))',
        spaceComplexity: 'O(n)',
        intuition: 'Start at k = 1 and increment k until sum((p[i] + k - 1) / k) <= h.',
        banglaIntuition: 'k = 1, 2, 3 করে প্রতিবার সবগুলো কিউ যোগ করে দেখা—p_i <= 10^9 হওয়ায় সাথে সাথে TLE আসে!',
        whyTleOrSuboptimal: 'Massive TLE! Takes up to 10^14 operations when max(p) = 10^9.',
        pseudocode: 'for k in 1..max(p): if sum(ceil(p[i]/k)) <= h: return k',
      },
      better: {
        label: 'Start From Lower Bound ceil(sum(p) / h) Linearly',
        timeComplexity: 'O(n * max(p))',
        spaceComplexity: 'O(n)',
        intuition: 'Start at k = ceil(totalJobs / h) and step up linearly by 1.',
        banglaIntuition: 'মোট কাজকে h দিয়ে ভাগ করে সেখান থেকে +১ করে খোঁজা—বড় ফাঁক থাকলে তবুও TLE হয়।',
        whyTleOrSuboptimal: 'Still O(n * max(p)) in worst case (e.g., [10^9, 1, 1...] with small gap).',
        pseudocode: 'k = ceil(sum(p)/h); while hours(k) > h: k++',
      },
      optimal: {
        label: 'Binary Search on Speed k in [1, max(p)]',
        timeComplexity: 'O(n log(max(p)))',
        spaceComplexity: 'O(n)',
        intuition: 'Binary search the minimum feasible speed k in [1, max(p)], summing (p_i + k - 1) / k in 64-bit integers with early cutoff if hours > h.',
        banglaIntuition: 'গতি k বাড়ালে সময় কমে—এই একমুখী সম্পর্কের ওপর [1, max(p)] রেঞ্জে বাইনারি সার্চ করলে মাত্র ৩০ ধাপেই সর্বনিম্ন গতি k বের হয়ে আসে! সিলিং ভাগের জন্য (p + k - 1) / k ব্যবহার করবে।',
        whyTleOrSuboptimal: 'FAANG & CodeChef 2-Star Favorite! Optimal O(n log maxP) runtime.',
        pseudocode: 'lo=1, hi=max(p); while lo<hi: mid=(lo+hi)/2; if hours(mid)<=h hi=mid else lo=mid+1',
      },
    },
    editorial: {
      bruteForceReason: 'Incrementing k linearly from 1 (or sum/h) takes up to 10^9 outer steps for large p_i.',
      optimalApproach: 'Binary search speed k in [1, max(p_i)] checking sum((p_i + k - 1) / k) <= h in 64-bit arithmetic.',
      timeComplexity: 'O(n log(max(p)))',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'p=[3,6,7,11], h=8', memoryOrStack: 'lo=1, hi=11, mid=6', note: 'hrs(6)=1+1+2+2=6 <= 8 -> hi=6' },
        { step: 2, state: 'lo=1, hi=6, mid=3', memoryOrStack: 'hrs(3)=1+2+3+4=10 > 8', note: 'Too slow -> lo=4' },
        { step: 3, state: 'lo=4, hi=6 -> ... -> 4', memoryOrStack: 'hrs(4)=1+2+2+3=8 <= 8', note: 'Minimum k = 4' },
      ],
      banglaEditorial:
        'ফ্লোটিং পয়েন্ট `ceil()` এড়িয়ে পূর্ণসংখ্যায় `(p + k - 1) / k` দিয়ে প্রতিটি কিউয়ের ঘণ্টা বের করা নিরাপদ। আর যেহেতু গতি k বাড়ালে মোট সময় শুধু কমেই (মনোটোনিক), তাই [1, max(p)] এর মধ্যে বাইনারি সার্চ করলেই সবচেয়ে দ্রুত সর্বনিম্ন k পাওয়া যায়।',
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
    int n; long long h;
    if (scanf("%d %lld", &n, &h) != 2) return 0;
    long long *p = malloc((size_t)n * sizeof(long long));
    long long mx = 1;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &p[i]);
        if (p[i] > mx) mx = p[i];
    }
    long long lo = 1, hi = mx;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, hrs = 0;
        for (int i = 0; i < n && hrs <= h; i++) hrs += (p[i] + mid - 1) / mid;
        if (hrs <= h) hi = mid; else lo = mid + 1;
    }
    printf("%lld\\n", lo);
    free(p);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; long long h{};
    cin >> n >> h;
    vector<long long> p(n);
    long long hi = 1;
    for (auto &v : p) { cin >> v; hi = max(hi, v); }
    long long lo = 1;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        long long hrs = 0;
        for (long long v : p) {
            hrs += (v + mid - 1) / mid;
            if (hrs > h) break;
        }
        if (hrs <= h) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, h = d[0], d[1]
p = d[2 : 2 + n]
lo, hi = 1, max(p)
while lo < hi:
    mid = (lo + hi) // 2
    hrs = sum((v + mid - 1) // mid for v in p)
    if hrs <= h:
        hi = mid
    else:
        lo = mid + 1
print(lo)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long h = Long.parseLong(st.nextToken());
        long[] p = new long[n];
        long lo = 1, hi = 1;
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            p[i] = Long.parseLong(st.nextToken());
            hi = Math.max(hi, p[i]);
        }
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2, hrs = 0;
            for (long v : p) {
                hrs += (v + mid - 1) / mid;
                if (hrs > h) break;
            }
            if (hrs <= h) hi = mid; else lo = mid + 1;
        }
        System.out.println(lo);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0], h = d[1];
const p = d.slice(2, 2 + n);
let lo = 1, hi = Math.max(...p);
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  let hrs = 0;
  for (let i = 0; i < n && hrs <= h; i++) hrs += Math.floor((p[i] + mid - 1) / mid);
  if (hrs <= h) hi = mid; else lo = mid + 1;
}
console.log(lo);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], h: number = d[1];
const p: number[] = d.slice(2, 2 + n);
let lo = 1, hi = Math.max(...p);
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  let hrs = 0;
  for (let i = 0; i < n && hrs <= h; i++) hrs += Math.floor((p[i] + mid - 1) / mid);
  if (hrs <= h) hi = mid; else lo = mid + 1;
}
console.log(lo);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, h) = (d[0] as usize, d[1]);
    let p = &d[2..2 + n];
    let (mut lo, mut hi) = (1i64, *p.iter().max().unwrap());
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        let mut hrs = 0i64;
        for &v in p {
            hrs += (v + mid - 1) / mid;
            if hrs > h { break; }
        }
        if hrs <= h { hi = mid; } else { lo = mid + 1; }
    }
    println!("{}", lo);
}`,
    },
  },

  // =========================================================================
  // 11. BINARY SEARCH ON ANSWER — Codeforces Div. 2 C · 1700 (Factory Machines)
  // =========================================================================
  {
    id: 'cf-factory-machines',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Binary Search on Answer',
    sourceTag: 'Codeforces Div. 2 C · 1700',
    companyTags: ['Codeforces 1700', 'Div. 2 C', 'CSES Factory Machines', 'Overflow-Safe BS'],
    difficulty: 'Hard',
    title: 'Factory Parallel Machines (Overflow-Safe BS)',
    banglaTitle: 'সমান্তরাল কারখানা মেশিন সময় (ওভারফ্লো-মুক্ত বাইনারি সার্চ)',
    xpReward: 175,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'A factory has n machines working in parallel. Machine i requires k_i seconds to manufacture a single product. You want to manufacture at least t products in total. Find the MINIMUM time T (in seconds) after which at least t products have been manufactured.',
    inputFormat: 'First line: n (1 <= n <= 10^5) and t (1 <= t <= 10^9). Second line: n integers k_i (1 <= k_i <= 10^9).',
    outputFormat: 'Print a single 64-bit integer: the minimum number of seconds.',
    constraints: ['1 <= n <= 10^5', '1 <= t, k_i <= 10^9', 'Warning: summing floor(T / k_i) across all machines can overflow 64-bit signed int if you do not break early when total >= t!'],
    samples: [
      { id: 'fm-s1', input: '3 7\n3 2 5', expectedOutput: '8', explanation: 'At T=8: floor(8/3)+floor(8/2)+floor(8/5) = 2+4+1 = 7 products.' },
    ],
    hiddenTests: [
      { id: 'fm-h1', input: '2 10\n1 1', expectedOutput: '5', isHidden: true },
      { id: 'fm-h2', input: '1 1000000\n1000000', expectedOutput: '1000000000000', isHidden: true },
    ],
    hints: [
      'In T seconds, machine i independently completes floor(T / k_i) products. Total products = sum(floor(T / k_i)).',
      'Even a single machine with k_min = min(k_i) guarantees finishing t products by time hi = min(k_i) * t!',
      'CRITICAL TRAP: If T = 10^18 and k_i = 1 for 10^5 machines, total = 10^23 overflows 64-bit int! Break out of the inner sum loop as soon as total >= t!',
    ],
    approaches: {
      brute: {
        label: 'Simulate Second-by-Second or Min-Heap Next Finish',
        timeComplexity: 'O(t log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Push (k_i, k_i) into a min-priority queue and pop the earliest finishing machine t times.',
        banglaIntuition: 'প্রতি সেকেন্ড বা Min-Heap দিয়ে ১টা ১টা করে প্রোডাক্ট তৈরি সিমুলেট করা—t = 10^9 হলে এটি O(t log n) সময়ে TLE খায়!',
        whyTleOrSuboptimal: 'Severe TLE! t <= 10^9 makes any O(t) simulation time out.',
        pseudocode: 'pq.push(k_i, i); repeat t times: (time, i) = pq.pop(); pq.push(time + k_i, i)',
      },
      better: {
        label: 'Unbounded Binary Search Without Early Break (Overflow Risk!)',
        timeComplexity: 'O(n log(k_max * t))',
        spaceComplexity: 'O(n)',
        intuition: 'Binary search T up to 10^18 summing T / k_i across all n machines without breaking early.',
        banglaIntuition: 'সর্বোচ্চ সীমা 10^18 ধরে বাইনারি সার্চ করলেও মাঝপথে যোগফল ৬৪-বিট ছাড়িয়ে নেগেটিভ হয়ে যেতে পারে!',
        whyTleOrSuboptimal: 'Signed 64-bit integer overflow produces Wrong Answer when T = 10^18 and many machines have k_i = 1.',
        pseudocode: 'total = 0; for k in arr: total += mid / k // OVERFLOWS if total > 9e18!',
      },
      optimal: {
        label: 'Tight Upper Bound (min_k * t) + Early-Cutoff Binary Search',
        timeComplexity: 'O(n log(min_k * t))',
        spaceComplexity: 'O(n)',
        intuition: 'Set hi = min(k_i) * t so hi never overshoots. Inside check(mid), break immediately once made >= t so made stays bounded below 2^63 - 1.',
        banglaIntuition: 'সবচেয়ে দ্রুত মেশিন একা t-টি বানাতে যত সময় নেয় (min_k * t), উত্তর তার চেয়ে বড় হতেই পারে না! আর check লুপে made >= t হওয়ামাত্র break করলে কখনোই ৬৪-বিট ওভারফ্লো হবে না।',
        whyTleOrSuboptimal: '1700+ Rated Div. 2 C Mastery! Tight bounds + early break prevents overflow in C++/Java/Rust.',
        pseudocode: 'lo=1, hi=min(k)*t; while lo<hi: mid=(lo+hi)/2; made=0; for x in k: made+=mid/x; if made>=t break; ...',
      },
    },
    editorial: {
      bruteForceReason: 'Priority queue simulation is O(t log n), timing out at t = 10^9, while naive BS without early exit overflows 64-bit integers.',
      optimalApproach: 'Binary search T in [1, min(k) * t] and break out of the summation loop immediately once made >= t.',
      timeComplexity: 'O(n log(min(k) * t))',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'k=[3,2,5], t=7', memoryOrStack: 'min_k=2 -> lo=1, hi=14', note: 'Tight upper bound = 2*7 = 14' },
        { step: 2, state: 'mid = 7 -> made(7)', memoryOrStack: '7/3 + 7/2 + 7/5 = 2+3+1 = 6 < 7', note: 'lo = 8' },
        { step: 3, state: 'mid = 8 -> made(8)', memoryOrStack: '8/3 + 8/2 + 8/5 = 2+4+1 = 7 >= 7', note: 'hi = 8 -> answer 8' },
      ],
      banglaEditorial:
        'একটি দারুণ ১৭০০-রেটেড সূক্ষ্ম ফাঁদ এখানে লুকানো: তুমি যদি `hi = 1e18` ধরো এবং `k_i = 1` হয়, তবে `mid / k_i` যোগ করতে করতে যোগফল `9e18` (signed 64-bit সীমা) ছাড়িয়ে ওভারফ্লো হয়ে ভুল উত্তর দেবে! দুটি অভ্যাস বাঁচাবে: (১) `hi = min(k_i) * t` ধরা এবং (২) `made >= t` হওয়ামাত্র লুপ `break` করে দেওয়া।',
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
    int n; long long t;
    if (scanf("%d %lld", &n, &t) != 2) return 0;
    long long *k = malloc((size_t)n * sizeof(long long));
    long long min_k = 1000000000000LL;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &k[i]);
        if (k[i] < min_k) min_k = k[i];
    }
    long long lo = 1, hi = min_k * t;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, made = 0;
        for (int i = 0; i < n; i++) {
            made += mid / k[i];
            if (made >= t) break;
        }
        if (made >= t) hi = mid; else lo = mid + 1;
    }
    printf("%lld\\n", lo);
    free(k);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; long long t{};
    cin >> n >> t;
    vector<long long> k(n);
    long long min_k = 1'000'000'000LL;
    for (auto &v : k) { cin >> v; min_k = min(min_k, v); }
    long long lo = 1, hi = min_k * t;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, made = 0;
        for (long long v : k) {
            made += mid / v;
            if (made >= t) break;
        }
        if (made >= t) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, t = d[0], d[1]
k = d[2 : 2 + n]
lo, hi = 1, min(k) * t
while lo < hi:
    mid = (lo + hi) // 2
    made = 0
    for v in k:
        made += mid // v
        if made >= t:
            break
    if made >= t:
        hi = mid
    else:
        lo = mid + 1
print(lo)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long t = Long.parseLong(st.nextToken());
        long[] k = new long[n];
        long minK = Long.MAX_VALUE;
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            k[i] = Long.parseLong(st.nextToken());
            minK = Math.min(minK, k[i]);
        }
        long lo = 1, hi = minK * t;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2, made = 0;
            for (long v : k) {
                made += mid / v;
                if (made >= t) break;
            }
            if (made >= t) hi = mid; else lo = mid + 1;
        }
        System.out.println(lo);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0], t = d[1];
const k = d.slice(2, 2 + n);
let lo = 1, hi = Math.min(...k) * t;
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  let made = 0;
  for (let i = 0; i < n; i++) {
    made += Math.floor(mid / k[i]);
    if (made >= t) break;
  }
  if (made >= t) hi = mid; else lo = mid + 1;
}
console.log(lo);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], t: number = d[1];
const k: number[] = d.slice(2, 2 + n);
let lo = 1, hi = Math.min(...k) * t;
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  let made = 0;
  for (let i = 0; i < n; i++) {
    made += Math.floor(mid / k[i]);
    if (made >= t) break;
  }
  if (made >= t) hi = mid; else lo = mid + 1;
}
console.log(lo);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, t) = (d[0] as usize, d[1]);
    let k = &d[2..2 + n];
    let min_k = *k.iter().min().unwrap();
    let (mut lo, mut hi) = (1i64, min_k.saturating_mul(t));
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        let mut made = 0i64;
        for &v in k {
            made += mid / v;
            if made >= t { break; }
        }
        if made >= t { hi = mid; } else { lo = mid + 1; }
    }
    println!("{}", lo);
}`,
    },
  },

  // =========================================================================
  // 12. BITMASKING — Codeforces Div. 2 A · 1000 (Raising Bacteria)
  // =========================================================================
  {
    id: 'cf-raising-bacteria',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Bitmasking',
    sourceTag: 'Codeforces Div. 2 A · 1000',
    companyTags: ['Codeforces 1000', 'Div. 2 A', 'Bit Manipulation', 'Popcount'],
    difficulty: 'Easy',
    title: 'Raising Bacteria (Binary Popcount)',
    banglaTitle: 'ব্যাকটেরিয়া দ্বিগুণ ও বিটমাস্ক পপকাউন্ট',
    xpReward: 110,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'You are a lover of bacteria. You start with an empty box. Each morning you may put any non-negative number of bacteria into the box, and every night every bacterium currently inside splits into two. You wish to see EXACTLY x bacteria inside the box on some morning. What is the minimum total number of bacteria you have to put into the box across all mornings?',
    inputFormat: 'A single integer x (1 <= x <= 10^9).',
    outputFormat: 'Print one integer: the minimum number of bacteria to manually add.',
    constraints: ['1 <= x <= 10^9'],
    samples: [
      { id: 'rb-s1', input: '5', expectedOutput: '2', explanation: 'Add 1 on morning 1 -> 2 -> 4; add 1 on morning 3 -> 5 (total added = 2).' },
      { id: 'rb-s2', input: '8', expectedOutput: '1', explanation: 'Add 1 on morning 1 -> doubles 3 nights -> 8.' },
    ],
    hiddenTests: [
      { id: 'rb-h1', input: '7', expectedOutput: '3', isHidden: true },
      { id: 'rb-h2', input: '1023', expectedOutput: '10', isHidden: true },
    ],
    hints: [
      'A single bacterium added k nights before the end multiplies by 2^k!',
      'So if you want x bacteria at the end, you are decomposing x as a sum of distinct powers of 2!',
      'Every number has a UNIQUE binary representation! Minimum additions = number of 1-bits (popcount) in binary x!',
    ],
    approaches: {
      brute: {
        label: 'Reverse Halving Loop Counting Odd Remainder',
        timeComplexity: 'O(log x)',
        spaceComplexity: 'O(1)',
        intuition: 'Work backwards from x: if x is odd, you MUST have dropped 1 bacterium that morning (ans++, x--); divide x by 2 until 0.',
        banglaIntuition: 'উল্টো দিক থেকে এগিয়ে বিজোড় হলে ১টি যোগ ধরো ও জোড় হলে ২ দিয়ে ভাগ করে O(log x)-এ গোনা।',
        whyTleOrSuboptimal: 'Already O(log x) and very intuitive—identical to inspecting binary bits one by one!',
        pseudocode: 'ans=0; while x > 0: if x%2==1 ans++; x /= 2; print ans',
      },
      better: {
        label: 'Brian Kernighan Bit Clear Loop (x &= x - 1)',
        timeComplexity: 'O(popcount(x))',
        spaceComplexity: 'O(1)',
        intuition: 'Use x = x & (x - 1) to strip only the lowest set bit in each step without visiting 0-bits.',
        banglaIntuition: 'প্রতি ধাপে x &= (x - 1) করে শুধু ১-বিটগুলোই সরাসরি মুছে গণনা করা।',
        whyTleOrSuboptimal: 'Faster than scanning all 32 bits, cleanly visits only set bits.',
        pseudocode: 'ans=0; while x > 0: x &= (x - 1); ans++',
      },
      optimal: {
        label: 'Hardware Popcount (C++23 std::popcount / Rust count_ones)',
        timeComplexity: 'O(1) CPU instruction',
        spaceComplexity: 'O(1)',
        intuition: 'Think in base-2: doubling shifts all bits left (<< 1), so each 1-bit in x corresponds to exactly 1 bacterium added on the right morning. Hardware POPCNT returns the answer in 1 cycle!',
        banglaIntuition: 'প্রতি রাতে ব্যাকটেরিয়া দ্বিগুণ হওয়া মানে বাইনারিতে বাঁদিকে ১ ঘর শিফট (`<< 1`)! তাই x-এর বাইনারিতে যতগুলো `1` বিট আছে, ঠিক ততটি ব্যাকটেরিয়া দিলেই হলো—C++23-এ `std::popcount` এবং Rust-এ `.count_ones()` এক লাইনে কাজ সারে!',
        whyTleOrSuboptimal: 'Ultimate Bitmasking Insight! Maps biological doubling directly to binary representation.',
        pseudocode: 'print popcount(x)',
      },
    },
    editorial: {
      bruteForceReason: 'Searching all sequences of morning additions explodes, whereas reversing odd/even steps directly uncovers binary bits.',
      optimalApproach: 'Doubling multiplies by 2 (left bit shift), so each 1-bit in x requires adding 1 bacterium. Output popcount(x).',
      timeComplexity: 'O(log x) / O(1) hardware popcnt',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'x = 5 (binary 101)', memoryOrStack: '5 & 1 == 1 -> ans=1, x=2', note: 'Lowest bit represents morning 3 addition' },
        { step: 2, state: 'x = 2 -> 1 -> 0', memoryOrStack: '2 is even; 1 is odd -> ans=2', note: '2 set bits -> minimum 2 bacteria' },
      ],
      banglaEditorial:
        'একটি ব্যাকটেরিয়া k রাত পার হলে ২^k গুণ হয়ে যায়। তাই x সংখ্যক ব্যাকটেরিয়া বানাতে চাইলে x-কে ২-এর ঘাতের যোগফল হিসেবে সাজাতে হবে—যা তার বাইনারি রূপ! বাইনারিতে যতগুলো ১ আছে (যেমন ৫ = ১০১, দুটি ১), উত্তর ঠিক ততই!',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <bit>\n#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `x = int(input())\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    unsigned int x;
    if (scanf("%u", &x) != 1) return 0;
    int ans = 0;
    while (x) { x &= (x - 1); ans++; }
    printf("%d\\n", ans);
    return 0;
}`,
      cpp: `#include <bit>
#include <cstdint>
#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    uint32_t x{};
    if (cin >> x) cout << popcount(x) << '\\n';
    return 0;
}`,
      python: `import sys
x = int(sys.stdin.read().strip())
print(x.bit_count())`,
      java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int x = Integer.parseInt(br.readLine().trim());
        System.out.println(Integer.bitCount(x));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
let x = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());
let ans = 0;
while (x > 0) { x &= (x - 1); ans++; }
console.log(ans);`,
      typescript: `import * as fs from 'fs';
let x: number = Number(fs.readFileSync(0, 'utf8').trim());
let ans = 0;
while (x > 0) { x &= (x - 1); ans++; }
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let x: u32 = s.trim().parse().unwrap();
    println!("{}", x.count_ones());
}`,
    },
  },

  // =========================================================================
  // 13. BITMASKING — Codeforces Div. 2 C · 1900 (Minimum Cost Assignment DP)
  // =========================================================================
  {
    id: 'cf-task-assignment-bitmask',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Bitmasking',
    sourceTag: 'Codeforces Div. 2 C · 1900',
    companyTags: ['Codeforces 1900', 'Div. 2 C', 'Bitmask DP', 'Google'],
    difficulty: 'Hard',
    title: 'Minimum-Cost Worker-Task Bitmask DP',
    banglaTitle: 'সর্বনিম্ন খরচে কাজ বণ্টন (বিটমাস্ক ডিপি)',
    xpReward: 195,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'There are n workers (0..n-1) and n tasks (0..n-1). Assigning worker i to task j costs cost[i][j]. Each worker must receive exactly one distinct task. Find the minimum possible total assignment cost.',
    inputFormat: 'First line: integer n (1 <= n <= 12). Next n lines: n space-separated integers cost[i][j] (0 <= cost[i][j] <= 10^6).',
    outputFormat: 'Print a single integer: the minimum total assignment cost.',
    constraints: ['1 <= n <= 12', '0 <= cost[i][j] <= 10^6', 'O(n!) = 4.79 × 10^8 times out; Bitmask DP O(n * 2^n) takes only ~49,152 states!'],
    samples: [
      { id: 'ta-s1', input: '3\n9 2 7\n6 4 3\n5 8 1', expectedOutput: '9', explanation: 'Assign worker 0->task 1 (2), 1->task 0 (6), 2->task 2 (1) => 2+6+1 = 9.' },
    ],
    hiddenTests: [
      { id: 'ta-h1', input: '2\n1 100\n100 1', expectedOutput: '2', isHidden: true },
      { id: 'ta-h2', input: '4\n10 2 8 6\n5 12 3 9\n7 4 11 1\n2 9 6 14', expectedOutput: '8', isHidden: true },
    ],
    hints: [
      'Why do we NOT need to store which worker is currently being assigned inside the DP state? Because the number of 1-bits in mask (popcount(mask)) equals the index of the next worker `i`!',
      'Let dp[mask] = minimum total cost to assign the first i = popcount(mask) workers to the set of tasks encoded in bitmask `mask`.',
      'Transition from mask (with i = popcount(mask) < n): for every unused task j where !(mask & (1 << j)): dp[mask | (1 << j)] = min(..., dp[mask] + cost[i][j]).',
    ],
    approaches: {
      brute: {
        label: 'Test All n! Permutations (First Thought)',
        timeComplexity: 'O(n * n!)',
        spaceComplexity: 'O(n)',
        intuition: 'Try every permutation of tasks [0..n-1] using next_permutation / backtracking and track minimum cost.',
        banglaIntuition: 'n! উপায়ে সব পারমুটেশন বানিয়ে খরচ বের করা—n = 12 হলে 479,001,600 বার ঘুরে সাথে সাথে TLE খায় (n=15 হলে অসম্ভব)!',
        whyTleOrSuboptimal: 'Factorial TLE! For n = 12..15, n! explodes far past 10^8 operations.',
        pseudocode: 'for perm in permutations(0..n): best = min(best, sum(cost[i][perm[i]]))',
      },
      better: {
        label: 'Memoized Top-Down Bitmask Recursion solve(worker, mask)',
        timeComplexity: 'O(n * 2^n)',
        spaceComplexity: 'O(n * 2^n)',
        intuition: 'Cache solve(i, mask) in a 2D memo table; note that worker i is redundant since i == popcount(mask).',
        banglaIntuition: '(worker, mask) দুইটি ডাইমেনশনে মেমো টেবিল বানিয়ে রিকার্শন চালানো।',
        whyTleOrSuboptimal: 'Uses n times more memory than needed because worker index equals popcount(mask).',
        pseudocode: 'memo[i][mask] = min over free j of (cost[i][j] + solve(i+1, mask | (1<<j)))',
      },
      optimal: {
        label: '1D Bottom-Up Bitmask DP (i = popcount(mask))',
        timeComplexity: 'O(n * 2^n)',
        spaceComplexity: 'O(2^n)',
        intuition: 'Represent the subset of assigned tasks as an integer mask in 0..(1<<n)-1. Since tasks are assigned one worker per step, worker i = popcount(mask). Push transitions forward to mask | (1 << j).',
        banglaIntuition: 'একটি পূর্ণসংখ্যা `mask`-এর প্রতি বিট দিয়ে কোন কোন কাজ হয়ে গেছে তা রাখো! `mask`-এ যতগুলো `1` বিট আছে (popcount), ঠিক ততজন কর্মী ইতিমধ্যে কাজ পেয়েছে—তাই পরের কর্মী হলো `i = popcount(mask)`! এতে `n!` থেকে সময় কমে মাত্র `n * 2^n`-এ নেমে আসে!',
        whyTleOrSuboptimal: '1900-Rated Bitmask DP Classic! Drops 4.8×10^8 down to ~49,000 operations.',
        pseudocode: 'dp=[INF]*(1<<n); dp[0]=0; for mask in 0..(1<<n): i=popcount(mask); for j not in mask: dp[mask|(1<<j)] = min(..., dp[mask]+cost[i][j])',
      },
    },
    editorial: {
      bruteForceReason: 'Checking all n! permutations is factorial-time and fails as n reaches 12–16.',
      optimalApproach: '1D Bitmask DP over assigned task subsets: dp[mask] stores minimum cost for the first popcount(mask) workers in O(n * 2^n) time and O(2^n) memory.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(2^n)',
      dryRunSteps: [
        { step: 1, state: 'mask = 000 (i=0)', memoryOrStack: 'dp[001]=9, dp[010]=2, dp[100]=7', note: 'Assign worker 0 to task 0, 1, or 2' },
        { step: 2, state: 'mask = 010 (i=1)', memoryOrStack: 'dp[011]=2+6=8, dp[110]=2+3=5', note: 'Assign worker 1' },
        { step: 3, state: 'mask = 111', memoryOrStack: 'dp[011] + cost[2][2] = 8 + 1 = 9', note: 'Minimum total cost = 9' },
      ],
      banglaEditorial:
        'বিটমাস্ক ডিপির জাদু হলো পুরো একটি সেটকে মাত্র একটি ইন্টিজার `mask` দিয়ে প্রকাশ করা! `mask`-এর `j`-তম বিট ১ হওয়া মানে কাজ `j` নেওয়া হয়েছে। যেহেতু প্রতিটি ধাপে ১ জন কর্মীকে ১টি কাজ দিচ্ছি, তাই `popcount(mask)`-ই বলে দেয় এখন কোন কর্মীর পালা। এই কৌশলে ৪৭ কোটির বদলে মাত্র ~৫০ হাজার ধাপেই নিখুঁত উত্তর মেলে!',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    return 0;\n}`,
      cpp: `#include <bit>\n#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}`,
      python: `import sys\n`,
      java: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
int popcnt(int x) { int c = 0; while (x) { x &= x - 1; c++; } return c; }
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long cost[15][15];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%lld", &cost[i][j]);
    int FULL = 1 << n;
    long long dp[4096];
    for (int m = 0; m < FULL; m++) dp[m] = (1LL << 60);
    dp[0] = 0;
    for (int m = 0; m < FULL; m++) {
        int i = popcnt(m);
        if (i >= n) continue;
        for (int j = 0; j < n; j++) {
            if (!(m & (1 << j))) {
                long long cand = dp[m] + cost[i][j];
                if (cand < dp[m | (1 << j)]) dp[m | (1 << j)] = cand;
            }
        }
    }
    printf("%lld\\n", dp[FULL - 1]);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <bit>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; cin >> n;
    vector<vector<long long>> cost(n, vector<long long>(n));
    for (auto &row : cost)
        for (auto &v : row) cin >> v;
    int FULL = 1 << n;
    vector<long long> dp(FULL, 1LL << 60);
    dp[0] = 0;
    for (unsigned mask = 0; mask < static_cast<unsigned>(FULL); ++mask) {
        int i = popcount(mask);
        if (i >= n) continue;
        for (int j = 0; j < n; ++j) {
            if (!(mask & (1U << j))) {
                unsigned nxt = mask | (1U << j);
                dp[nxt] = min(dp[nxt], dp[mask] + cost[i][j]);
            }
        }
    }
    cout << dp[FULL - 1] << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
cost = [d[1 + i*n : 1 + (i+1)*n] for i in range(n)]
FULL = 1 << n
INF = 10**18
dp = [INF] * FULL
dp[0] = 0
for mask in range(FULL - 1):
    i = mask.bit_count()
    base = dp[mask]
    for j in range(n):
        if not (mask & (1 << j)):
            nxt = mask | (1 << j)
            if base + cost[i][j] < dp[nxt]:
                dp[nxt] = base + cost[i][j]
print(dp[FULL - 1])`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        long[][] cost = new long[n][n];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) cost[i][j] = Long.parseLong(st.nextToken());
        }
        int FULL = 1 << n;
        long[] dp = new long[FULL];
        Arrays.fill(dp, 1L << 60);
        dp[0] = 0;
        for (int mask = 0; mask < FULL - 1; mask++) {
            int i = Integer.bitCount(mask);
            for (int j = 0; j < n; j++) {
                if ((mask & (1 << j)) == 0) {
                    int nxt = mask | (1 << j);
                    dp[nxt] = Math.min(dp[nxt], dp[mask] + cost[i][j]);
                }
            }
        }
        System.out.println(dp[FULL - 1]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0];
const cost = Array.from({ length: n }, (_, i) => d.slice(1 + i * n, 1 + (i + 1) * n));
const FULL = 1 << n;
const dp = Array(FULL).fill(1e15);
dp[0] = 0;
for (let mask = 0; mask < FULL - 1; mask++) {
  let tmp = mask, i = 0;
  while (tmp) { tmp &= tmp - 1; i++; }
  for (let j = 0; j < n; j++) {
    if (!(mask & (1 << j))) {
      const nxt = mask | (1 << j);
      if (dp[mask] + cost[i][j] < dp[nxt]) dp[nxt] = dp[mask] + cost[i][j];
    }
  }
}
console.log(dp[FULL - 1]);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const cost: number[][] = Array.from({ length: n }, (_, i) => d.slice(1 + i * n, 1 + (i + 1) * n));
const FULL = 1 << n;
const dp: number[] = Array(FULL).fill(1e15);
dp[0] = 0;
for (let mask = 0; mask < FULL - 1; mask++) {
  let tmp = mask, i = 0;
  while (tmp) { tmp &= tmp - 1; i++; }
  for (let j = 0; j < n; j++) {
    if (!(mask & (1 << j))) {
      const nxt = mask | (1 << j);
      if (dp[mask] + cost[i][j] < dp[nxt]) dp[nxt] = dp[mask] + cost[i][j];
    }
  }
}
console.log(dp[FULL - 1]);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let full = 1usize << n;
    let mut dp = vec![1i64 << 60; full];
    dp[0] = 0;
    for mask in 0..full - 1 {
        let i = mask.count_ones() as usize;
        let base = dp[mask];
        for j in 0..n {
            if mask & (1 << j) == 0 {
                let nxt = mask | (1 << j);
                dp[nxt] = dp[nxt].min(base + d[1 + i * n + j]);
            }
        }
    }
    println!("{}", dp[full - 1]);
}`,
    },
  },

  // =========================================================================
  // 14. INTRO DP — Codeforces Div. 2 A/C · 1500 (Boredom / House Robber on Values)
  // =========================================================================
  {
    id: 'cf-boredom-dp',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Intro DP',
    sourceTag: 'Codeforces Div. 2 C · 1500',
    companyTags: ['Codeforces 1500', 'Div. 2 C', 'Intro DP', 'Google'],
    difficulty: 'Medium',
    title: 'Boredom (Value-Frequency Linear DP)',
    banglaTitle: 'সংখ্যা মুছে সর্বোচ্চ স্কোর (ভ্যালু ডায়নামিক প্রোগ্রামিং)',
    xpReward: 165,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Alex has an array of n positive integers. In one step he can choose any remaining element a_k, earn a_k points, and then delete that element along with ALL elements equal to a_k - 1 and ALL elements equal to a_k + 1. Find the maximum total points Alex can earn.',
    inputFormat: 'First line: integer n (1 <= n <= 10^5). Second line: n integers a_i (1 <= a_i <= 10^5).',
    outputFormat: 'Print a single 64-bit integer: the maximum points possible.',
    constraints: ['1 <= n <= 10^5', '1 <= a_i <= 10^5', 'Max score can reach 10^10 -> use 64-bit integer!'],
    samples: [
      { id: 'bd-s1', input: '9\n1 2 1 3 2 2 2 2 3', expectedOutput: '10', explanation: 'Pick value 2 (deletes 1s and 3s); all five 2s give 5 * 2 = 10.' },
    ],
    hiddenTests: [
      { id: 'bd-h1', input: '3\n1 2 3', expectedOutput: '4', isHidden: true },
      { id: 'bd-h2', input: '5\n100000 100000 100000 100000 100000', expectedOutput: '500000', isHidden: true },
    ],
    hints: [
      'Notice that if you decide to pick value v ONCE, deleting v-1 and v+1 is already paid—so you should ALWAYS take ALL copies of v!',
      'Aggregate total value per number: total[v] = count[v] * v (in 64-bit!). Now you cannot take both v and v - 1.',
      'House Robber DP on values 1..maxVal: dp[v] = max(dp[v - 1], dp[v - 2] + total[v]), reducible to O(1) rolling variables!',
    ],
    approaches: {
      brute: {
        label: 'Recursive Backtracking Over Distinct Values',
        timeComplexity: 'O(2^M)',
        spaceComplexity: 'O(M)',
        intuition: 'For each value v from 1..maxVal, recursively branch on picking v (skip v+1) vs skipping v.',
        banglaIntuition: 'প্রতিটি মানের জন্য "নেব নাকি বাদ দেব" রিকার্শন চালানো—একই সাবপ্রবলেম বারবার আসায় এক্সপোনেনশিয়াল TLE হয়।',
        whyTleOrSuboptimal: 'Exponential TLE! Fails for M > 30.',
        pseudocode: 'solve(v): return max(solve(v-1), total[v] + solve(v-2))',
      },
      better: {
        label: 'Bottom-Up 1D DP Array dp[0..maxVal]',
        timeComplexity: 'O(n + maxVal)',
        spaceComplexity: 'O(maxVal)',
        intuition: 'Build frequency-sum total[v] and fill dp[v] = max(dp[v-1], dp[v-2] + total[v]) iteratively.',
        banglaIntuition: 'total[v] = count[v] * v বের করে 1D dp[] টেবিলে মানগুলো ভরে ফেলা।',
        whyTleOrSuboptimal: 'Optimal O(n + maxVal) time, using one extra dp[] array.',
        pseudocode: 'dp[1]=total[1]; for v in 2..maxV: dp[v]=max(dp[v-1], dp[v-2]+total[v])',
      },
      optimal: {
        label: 'Value-Frequency Sum + O(1) Rolling-Pair DP',
        timeComplexity: 'O(n + maxVal)',
        spaceComplexity: 'O(maxVal) freq only',
        intuition: 'Accumulate total[v] += v (64-bit!) as you read input. Then roll only two variables (prev2, prev1): cur = max(prev1, prev2 + total[v]).',
        banglaIntuition: 'কোনো সংখ্যা v একবার নিলেই তার প্রতিবেশী v-1 ও v+1 মুছে যায়, তাই v-এর সব কপি নেওয়াই বুদ্ধিমানের! total[v] += v জমানোর পর শুধু prev2 ও prev1 দুটি ভ্যারিয়েবল দিয়েই House-Robber DP O(n + M) সময়ে সমাধান দেয়!',
        whyTleOrSuboptimal: 'Codeforces 1500 Icon! Clean linear time and rolling memory.',
        pseudocode: 'for x in a: total[x]+=x; p2=0, p1=0; for v in 1..maxV: cur=max(p1, p2+total[v]); p2=p1; p1=cur',
      },
    },
    editorial: {
      bruteForceReason: 'Picking arbitrarily without collapsing equal values or without DP yields exponential branching.',
      optimalApproach: 'Collapse equal values into total[v] = count[v] * v, then compute dp[v] = max(dp[v-1], dp[v-2] + total[v]) in 64-bit arithmetic.',
      timeComplexity: 'O(n + maxVal)',
      spaceComplexity: 'O(maxVal)',
      dryRunSteps: [
        { step: 1, state: 'a=[1,2,1,3,2,2,2,2,3]', memoryOrStack: 'total[1]=2, total[2]=10, total[3]=6', note: 'Collapse frequency * value' },
        { step: 2, state: 'v=1 -> v=2', memoryOrStack: 'dp[1]=2; dp[2]=max(2, 0+10)=10', note: 'Taking all 2s beats 1s' },
        { step: 3, state: 'v=3', memoryOrStack: 'dp[3]=max(10, 2+6)=10', note: 'Final maximum = 10' },
      ],
      banglaEditorial:
        'কনটেস্টের অন্যতম পরিচিত ১৫০০-রেটেড DP! মনে রাখবে: কোনো সংখ্যা v নিলে শুধু একবার নিলে ক্ষতি—যদি v-1 আর v+1 মুছেই যায়, তবে v যতবার আছে সবগুলোই নিয়ে নাও! তারপর সমস্যাটি সোজা House Robber DP-তে পরিণত হয়: পাশাপাশি মান v ও v-1 একসাথে নেওয়া যাবে না।',
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
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long *tot = calloc(100001, sizeof(long long));
    int mx = 0;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        tot[x] += x;
        if (x > mx) mx = x;
    }
    long long p2 = 0, p1 = 0;
    for (int v = 1; v <= mx; v++) {
        long long take = p2 + tot[v];
        long long cur = take > p1 ? take : p1;
        p2 = p1; p1 = cur;
    }
    printf("%lld\\n", p1);
    free(tot);
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
    vector<long long> tot(100001, 0);
    int mx = 0;
    for (int i = 0; i < n; ++i) {
        int x{}; cin >> x;
        tot[x] += x;
        mx = max(mx, x);
    }
    long long p2 = 0, p1 = 0;
    for (int v = 1; v <= mx; ++v) {
        long long cur = max(p1, p2 + tot[v]);
        p2 = p1;
        p1 = cur;
    }
    cout << p1 << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
arr = d[1 : 1 + n]
mx = max(arr)
tot = [0] * (mx + 1)
for x in arr:
    tot[x] += x
p2 = p1 = 0
for v in range(1, mx + 1):
    p2, p1 = p1, max(p1, p2 + tot[v])
print(p1)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        long[] tot = new long[100001];
        int mx = 0;
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int x = Integer.parseInt(st.nextToken());
            tot[x] += x;
            if (x > mx) mx = x;
        }
        long p2 = 0, p1 = 0;
        for (int v = 1; v <= mx; v++) {
            long cur = Math.max(p1, p2 + tot[v]);
            p2 = p1; p1 = cur;
        }
        System.out.println(p1);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0];
let mx = 0;
for (let i = 1; i <= n; i++) if (d[i] > mx) mx = d[i];
const tot = new Float64Array(mx + 1);
for (let i = 1; i <= n; i++) tot[d[i]] += d[i];
let p2 = 0, p1 = 0;
for (let v = 1; v <= mx; v++) {
  const cur = Math.max(p1, p2 + tot[v]);
  p2 = p1; p1 = cur;
}
console.log(p1);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let mx = 0;
for (let i = 1; i <= n; i++) if (d[i] > mx) mx = d[i];
const tot = new Float64Array(mx + 1);
for (let i = 1; i <= n; i++) tot[d[i]] += d[i];
let p2 = 0, p1 = 0;
for (let v = 1; v <= mx; v++) {
  const cur = Math.max(p1, p2 + tot[v]);
  p2 = p1; p1 = cur;
}
console.log(p1);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0];
    let mx = *d[1..=n].iter().max().unwrap_or(&0);
    let mut tot = vec![0i64; mx + 1];
    for &x in &d[1..=n] { tot[x] += x as i64; }
    let (mut p2, mut p1) = (0i64, 0i64);
    for v in 1..=mx {
        let cur = p1.max(p2 + tot[v]);
        p2 = p1;
        p1 = cur;
    }
    println!("{}", p1);
}`,
    },
  },

  // =========================================================================
  // 15. INTRO DP — Codeforces Div. 2 C / Edu DP · 2200 (Value-Indexed Knapsack)
  // =========================================================================
  {
    id: 'cf-knapsack-value-dp',
    category: 'cp',
    platform: 'Codeforces',
    topic: 'Intro DP',
    sourceTag: 'Codeforces Div. 2 C · 2200',
    companyTags: ['Codeforces 2200', 'Div. 2 C/D', 'State-Swapped DP', 'Amazon'],
    difficulty: 'Hard',
    title: '0/1 Knapsack With 10^9 Weight Capacity',
    banglaTitle: '১০^৯ ধারণক্ষমতার ০/১ ন্যাপস্যাক (স্টেট-উল্টানো ডিপি)',
    xpReward: 220,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    statement:
      'You have n items (1 <= n <= 100) and a knapsack of weight capacity W (1 <= W <= 10^9). Item i has weight w_i (1 <= w_i <= 10^9) and small value v_i (1 <= v_i <= 1000). Choose a subset of items with total weight at most W to MAXIMIZE total value.',
    inputFormat: 'First line: n and W. Next n lines: w_i and v_i.',
    outputFormat: 'Print one integer: the maximum total value achievable.',
    constraints: ['1 <= n <= 100', '1 <= W <= 10^9', '1 <= w_i <= 10^9', '1 <= v_i <= 1000 -> total value <= 10^5!'],
    samples: [
      { id: 'kv-s1', input: '3 8\n3 30\n4 50\n5 60', expectedOutput: '90', explanation: 'Pick items (3, 30) and (5, 60): total weight 8 <= 8, value = 90.' },
    ],
    hiddenTests: [
      { id: 'kv-h1', input: '3 1000000000\n500000000 10\n600000000 15\n400000000 8', expectedOutput: '23', isHidden: true },
      { id: 'kv-h2', input: '2 10\n12 100\n15 200', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Standard Knapsack dp[weight] needs an array of size W + 1 = 10^9 — instant Memory Limit Exceeded and Time Limit Exceeded!',
      'Look at the constraints carefully! Why is n <= 100 and v_i <= 1000? Because sum(v_i) <= 100,000!',
      'Swap DP dimension and value! Let dp[val] = MINIMUM total weight needed to obtain exact value val. Answer is the largest val where dp[val] <= W!',
    ],
    approaches: {
      brute: {
        label: 'Standard Weight-Indexed Knapsack dp[0..W]',
        timeComplexity: 'O(n * W) -> TLE & MLE',
        spaceComplexity: 'O(W) -> 4 GB+ RAM',
        intuition: 'Maintain dp[w] = maximum value using capacity w, looping w from W down to w_i.',
        banglaIntuition: 'সাধারণ Knapsack-এ ওজন W অনুযায়ী dp[W] অ্যারে নিলে W = 10^9 এর জন্য ৪ গিগাবাইট মেমোরি লেগে সাথে সাথে MLE/TLE হয়ে যায়!',
        whyTleOrSuboptimal: 'Impossible! W = 10^9 causes 4 GB Memory Limit Exceeded and 10^11 TLE.',
        pseudocode: 'dp = [0] * (W + 1); for (w, v): for cap in W..w: dp[cap] = max(dp[cap], dp[cap-w]+v)',
      },
      better: {
        label: 'Meet-in-the-Middle / Sparse Map States',
        timeComplexity: 'O(2^(n/2)) or Unbounded HashMap',
        spaceComplexity: 'O(2^(n/2))',
        intuition: 'For n <= 40, Meet-in-the-Middle splits into halves; for n = 100, 2^50 still explodes.',
        banglaIntuition: 'অর্ধেক ভাগ করে Meet-in-the-Middle বা HashMap রাখলেও n = 100 এর জন্য স্টেট 2^50 ছাড়িয়ে যায়।',
        whyTleOrSuboptimal: 'Fails for n = 100! Does not exploit the small v_i <= 1000 bound.',
        pseudocode: 'split n/2 -> works only when n <= 40',
      },
      optimal: {
        label: 'State-Swapped Value-Indexed 1D DP (dp[val] = Min Weight)',
        timeComplexity: 'O(n * sum(v_i))',
        spaceComplexity: 'O(sum(v_i))',
        intuition: 'Since sum(v_i) <= 10^5, define dp[val] = minimum weight required to reach exact value val (init INF, dp[0]=0). Loop backward val = V_max..v_i: dp[val] = min(dp[val], dp[val - v_i] + w_i). Output largest val with dp[val] <= W.',
        banglaIntuition: '২২০০-রেটেড DP-এর ক্লাসিক ট্রিক: যেহেতু W বিশাল (10^9) কিন্তু মোট মান V = sum(v_i) ছোট (<= 10^5), তাই অ্যারের ইনডেক্সে ওজন না রেখে "মান" বসাও, আর ভেতরে রাখো ওই মান পেতে সর্বনিম্ন কত ওজন লাগে! শেষে সবচেয়ে বড় যে val-এ dp[val] <= W, সেটাই উত্তর!',
        whyTleOrSuboptimal: '2200-Rated CP Mastery! Shrinks 10^11 operations down to <= 10^7.',
        pseudocode: 'V=sum(v); dp=[INF]*(V+1); dp[0]=0; for (w,v): for s in V..v: dp[s]=min(dp[s], dp[s-v]+w); print max s where dp[s]<=W',
      },
    },
    editorial: {
      bruteForceReason: 'Indexing DP by weight capacity W = 10^9 requires 10^9 memory and 10^11 operations (MLE/TLE).',
      optimalApproach: 'Swap the DP key and value: dp[val] = minimum weight to form value val, running backward across 0..sum(v) in O(n * sum(v)) time.',
      timeComplexity: 'O(n * sum(v_i))',
      spaceComplexity: 'O(sum(v_i))',
      dryRunSteps: [
        { step: 1, state: 'Item (w=3, v=30)', memoryOrStack: 'dp[0]=0, dp[30]=3', note: 'Min weight for value 30 is 3' },
        { step: 2, state: 'Item (w=4, v=50)', memoryOrStack: 'dp[50]=4, dp[80]=7', note: 'Update descending' },
        { step: 3, state: 'Item (w=5, v=60), W=8', memoryOrStack: 'dp[90]=3+5=8 <= 8; dp[140]=12 > 8', note: 'Largest val with dp[val] <= 8 is 90' },
      ],
      banglaEditorial:
        'প্রশ্নে যখন দেখবে একটি কনস্ট্রেইন্ট বিশাল (W <= 10^9) কিন্তু আরেকটি কনস্ট্রেইন্ট ছোট (n <= 100, v_i <= 1000), তখনই বুঝবে DP-এর স্টেট ও মান অদলবদল করতে হবে! `dp[val]` মানে হলো `val` পরিমাণ মূল্য বানানোর জন্য সর্বনিম্ন কত ওজন লাগে। একদম শেষে ডান থেকে বামে প্রথম যে `dp[val] <= W` হবে, সেই `val`-ই সর্বোচ্চ উত্তর!',
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
    int n; long long W;
    if (scanf("%d %lld", &n, &W) != 2) return 0;
    long long w[105]; int v[105]; int maxV = 0;
    for (int i = 0; i < n; i++) { scanf("%lld %d", &w[i], &v[i]); maxV += v[i]; }
    long long *dp = malloc((size_t)(maxV + 1) * sizeof(long long));
    const long long INF = (1LL << 60);
    for (int s = 0; s <= maxV; s++) dp[s] = INF;
    dp[0] = 0;
    int curMax = 0;
    for (int i = 0; i < n; i++) {
        curMax += v[i];
        for (int s = curMax; s >= v[i]; s--) {
            long long cand = dp[s - v[i]] + w[i];
            if (cand < dp[s]) dp[s] = cand;
        }
    }
    int ans = 0;
    for (int s = maxV; s >= 0; s--) if (dp[s] <= W) { ans = s; break; }
    printf("%d\\n", ans);
    free(dp);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n{}; long long W{};
    cin >> n >> W;
    vector<long long> w(n);
    vector<int> v(n);
    int maxV = 0;
    for (int i = 0; i < n; ++i) {
        cin >> w[i] >> v[i];
        maxV += v[i];
    }
    constexpr long long INF = 1LL << 60;
    vector<long long> dp(maxV + 1, INF);
    dp[0] = 0;
    int curMax = 0;
    for (int i = 0; i < n; ++i) {
        curMax += v[i];
        for (int s = curMax; s >= v[i]; --s) {
            dp[s] = min(dp[s], dp[s - v[i]] + w[i]);
        }
    }
    int ans = 0;
    for (int s = maxV; s >= 0; --s) {
        if (dp[s] <= W) { ans = s; break; }
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, W = d[0], d[1]
items = [(d[2 + 2*i], d[3 + 2*i]) for i in range(n)]
maxV = sum(v for _, v in items)
INF = 10**18
dp = [INF] * (maxV + 1)
dp[0] = 0
cur_max = 0
for w, v in items:
    cur_max += v
    for s in range(cur_max, v - 1, -1):
        if dp[s - v] + w < dp[s]:
            dp[s] = dp[s - v] + w
ans = max(s for s in range(maxV + 1) if dp[s] <= W)
print(ans)`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long W = Long.parseLong(st.nextToken());
        long[] w = new long[n];
        int[] v = new int[n];
        int maxV = 0;
        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine());
            w[i] = Long.parseLong(st.nextToken());
            v[i] = Integer.parseInt(st.nextToken());
            maxV += v[i];
        }
        long[] dp = new long[maxV + 1];
        Arrays.fill(dp, 1L << 60);
        dp[0] = 0;
        int curMax = 0;
        for (int i = 0; i < n; i++) {
            curMax += v[i];
            for (int s = curMax; s >= v[i]; s--) {
                dp[s] = Math.min(dp[s], dp[s - v[i]] + w[i]);
            }
        }
        int ans = 0;
        for (int s = maxV; s >= 0; s--) {
            if (dp[s] <= W) { ans = s; break; }
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const d = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);
const n = d[0], W = d[1];
let maxV = 0;
for (let i = 0; i < n; i++) maxV += d[3 + 2 * i];
const dp = Array(maxV + 1).fill(1e15);
dp[0] = 0;
let curMax = 0;
for (let i = 0; i < n; i++) {
  const w = d[2 + 2 * i], v = d[3 + 2 * i];
  curMax += v;
  for (let s = curMax; s >= v; s--) {
    if (dp[s - v] + w < dp[s]) dp[s] = dp[s - v] + w;
  }
}
let ans = 0;
for (let s = maxV; s >= 0; s--) if (dp[s] <= W) { ans = s; break; }
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], W: number = d[1];
let maxV = 0;
for (let i = 0; i < n; i++) maxV += d[3 + 2 * i];
const dp: number[] = Array(maxV + 1).fill(1e15);
dp[0] = 0;
let curMax = 0;
for (let i = 0; i < n; i++) {
  const w = d[2 + 2 * i], v = d[3 + 2 * i];
  curMax += v;
  for (let s = curMax; s >= v; s--) {
    if (dp[s - v] + w < dp[s]) dp[s] = dp[s - v] + w;
  }
}
let ans = 0;
for (let s = maxV; s >= 0; s--) if (dp[s] <= W) { ans = s; break; }
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, cap) = (d[0] as usize, d[1]);
    let mut max_v = 0usize;
    for i in 0..n { max_v += d[3 + 2 * i] as usize; }
    let mut dp = vec![1i64 << 60; max_v + 1];
    dp[0] = 0;
    let mut cur_max = 0usize;
    for i in 0..n {
        let (w, v) = (d[2 + 2 * i], d[3 + 2 * i] as usize);
        cur_max += v;
        for val in (v..=cur_max).rev() {
            dp[val] = dp[val].min(dp[val - v] + w);
        }
    }
    let ans = (0..=max_v).rev().find(|&val| dp[val] <= cap).unwrap_or(0);
    println!("{}", ans);
}`,
    },
  },
];
