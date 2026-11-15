import { createRng, randInt, type ArenaKernel } from './types';

function makeStarter(stub: {
  c: string;
  cpp: string;
  python: string;
  java: string;
  javascript: string;
  typescript: string;
  rust: string;
}) {
  return stub;
}

export const SEARCH_STACK_STRING_KERNELS: Record<string, ArenaKernel> = {
  bs_lower_upper_count: {
    id: 'bs_lower_upper_count',
    defaultTopic: 'Binary Search',
    timeComplexity: 'O((n + q) log n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n * q)',
    betterComplexity: 'O(n + q)',
    inputFormat: 'First line: n and q (1 <= n, q <= 10^5). Second line: n sorted non-decreasing integers. Third line: q query integers.',
    outputFormat: 'Print q space-separated counts showing how many times each query value appears in the sorted array.',
    constraints: ['1 <= n, q <= 10^5', '-10^9 <= a[i], x <= 10^9'],
    hints: [
      'Use lower_bound(x) for the first index >= x.',
      'Use upper_bound(x) for the first index > x.',
      'Frequency of x equals upper_bound(x) - lower_bound(x).',
    ],
    bruteIntuition: 'Linear scan the array for every query x.',
    bruteBangla: 'প্রতিটি কুয়েরির জন্য পুরো অ্যারে ঘুরে গোনা।',
    bruteWhyTle: 'O(n * q) takes 10^10 operations on n = q = 10^5.',
    brutePseudo: 'for x in queries: count(a[i] == x)',
    betterIntuition: 'HashMap frequency table of all values.',
    betterBangla: 'HashMap-এ ফ্রিকোয়েন্সি সেভ করে রাখা।',
    betterTradeoff: 'Uses O(n) hash map overhead ignoring the sorted property.',
    betterPseudo: 'freq = Counter(a); print freq[x]',
    optimalIntuition: 'Binary search lower_bound and upper_bound directly on the sorted array in O(log n) per query.',
    optimalBangla: 'সর্টেড অ্যারেতে lower_bound ও upper_bound বের করে পার্থক্য নিলে কোনো অতিরিক্ত মেমোরি ছাড়াই O(log n)-এ গণনা হয়।',
    optimalWhyWins: 'Zero hash overhead and strict O(log n) worst-case query speed.',
    optimalPseudo: 'count(x) = upperBound(x) - lowerBound(x)',
    banglaEditorial: 'lower_bound প্রথম সমান বা বড় ইনডেক্স দেয় এবং upper_bound প্রথম বড় ইনডেক্স দেয়—এদের বিয়োগফলই সংখ্যাটি কতবার আছে।',
    dryRunSteps: [
      { step: 1, state: 'a=[1,2,2,2,5], x=2', memoryOrStack: 'lb=1, ub=4', note: '4 - 1 = 3 occurrences' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], q = d[1], a = d.slice(2, 2 + n);
      const lb = (x: number) => {
        let l = 0, r = n;
        while (l < r) { const m = (l + r) >> 1; if (a[m] < x) l = m + 1; else r = m; }
        return l;
      };
      const ub = (x: number) => {
        let l = 0, r = n;
        while (l < r) { const m = (l + r) >> 1; if (a[m] <= x) l = m + 1; else r = m; }
        return l;
      };
      const out: number[] = [];
      for (let i = 0; i < q; i++) out.push(ub(d[2 + n + i]) - lb(d[2 + n + i]));
      return out.join(' ');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5 3\n1 2 2 2 5\n2 4 5', '4 2\n-5 -5 0 3\n-5 10'];
      const hiddenInputs = ['1 2\n7\n7 8', '5 3\n1 1 1 1 1\n1 0 2'];
      for (let k = 0; k < 8; k++) {
        const n = randInt(rng, 6, 30), q = randInt(rng, 3, 10);
        const a = Array.from({ length: n }, () => randInt(rng, -15, 25)).sort((x, y) => x - y);
        const qs = Array.from({ length: q }, () => randInt(rng, -18, 28));
        hiddenInputs.push(`${n} ${q}\n${a.join(' ')}\n${qs.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, q; scanf("%d %d", &n, &q);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, q; cin >> n >> q;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys, bisect\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), q = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int lb(const long long *a, int n, long long x) {
    int l = 0, r = n;
    while (l < r) { int m = l + (r - l) / 2; if (a[m] < x) l = m + 1; else r = m; }
    return l;
}
int ub(const long long *a, int n, long long x) {
    int l = 0, r = n;
    while (l < r) { int m = l + (r - l) / 2; if (a[m] <= x) l = m + 1; else r = m; }
    return l;
}
int main(void) {
    int n, q; if (scanf("%d %d", &n, &q) != 2) return 0;
    long long *a = malloc(n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    for (int i = 0; i < q; i++) {
        long long x; scanf("%lld", &x);
        printf("%s%d", i ? " " : "", ub(a, n, x) - lb(a, n, x));
    }
    printf("\\n");
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, q; cin >> n >> q;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < q; i++) {
        long long x; cin >> x;
        cout << (i ? " " : "") << (upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x));
    }
    cout << '\\n';
    return 0;
}`,
      python: `import sys, bisect
d = list(map(int, sys.stdin.read().split()))
n, q = d[0], d[1]
a = d[2:2+n]
print(" ".join(str(bisect.bisect_right(a, x) - bisect.bisect_left(a, x)) for x in d[2+n:2+n+q]))`,
      java: `import java.util.*;
public class Main {
    static int lb(long[] a, long x) {
        int l = 0, r = a.length;
        while (l < r) { int m = (l + r) >>> 1; if (a[m] < x) l = m + 1; else r = m; }
        return l;
    }
    static int ub(long[] a, long x) {
        int l = 0, r = a.length;
        while (l < r) { int m = (l + r) >>> 1; if (a[m] <= x) l = m + 1; else r = m; }
        return l;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            long x = sc.nextLong();
            if (i > 0) sb.append(' ');
            sb.append(ub(a, x) - lb(a, x));
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], q = d[1], a = d.slice(2, 2 + n);
const lb = (x) => { let l = 0, r = n; while (l < r) { const m = (l + r) >> 1; if (a[m] < x) l = m + 1; else r = m; } return l; };
const ub = (x) => { let l = 0, r = n; while (l < r) { const m = (l + r) >> 1; if (a[m] <= x) l = m + 1; else r = m; } return l; };
const out = [];
for (let i = 0; i < q; i++) out.push(ub(d[2 + n + i]) - lb(d[2 + n + i]));
console.log(out.join(' '));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], q: number = d[1], a: number[] = d.slice(2, 2 + n);
function lb(x: number): number { let l: number = 0, r: number = n; while (l < r) { const m: number = (l + r) >> 1; if (a[m] < x) l = m + 1; else r = m; } return l; }
function ub(x: number): number { let l: number = 0, r: number = n; while (l < r) { const m: number = (l + r) >> 1; if (a[m] <= x) l = m + 1; else r = m; } return l; }
const out: number[] = [];
for (let i = 0; i < q; i++) out.push(ub(d[2 + n + i]) - lb(d[2 + n + i]));
console.log(out.join(' '));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, q) = (d[0] as usize, d[1] as usize);
    let a = &d[2..2 + n];
    let mut out = Vec::with_capacity(q);
    for &x in &d[2 + n..2 + n + q] {
        let lb = a.partition_point(|&v| v < x);
        let ub = a.partition_point(|&v| v <= x);
        out.push((ub - lb).to_string());
    }
    println!("{}", out.join(" "));
}`,
    },
  },

  bs_min_capacity_days: {
    id: 'bs_min_capacity_days',
    defaultTopic: 'Binary Search on Answer',
    timeComplexity: 'O(n log(sum))',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n * sum)',
    betterComplexity: 'O(n^2 * D)',
    inputFormat: 'First line: n (items) and D (max partitions/days), 1 <= D <= n <= 10^5. Second line: n positive weights.',
    outputFormat: 'Single 64-bit integer: minimum capacity C so all items can be shipped in order within D days.',
    constraints: ['1 <= D <= n <= 10^5', '1 <= w[i] <= 10^6'],
    hints: [
      'Lower bound of answer is max(w); upper bound is sum(w).',
      'If capacity C succeeds in <= D days, any larger capacity also succeeds -> monotonic predicate!',
      'Binary search C in [max(w), sum(w)] with greedy check(C).',
    ],
    bruteIntuition: 'Test capacities C = max(w), max(w)+1, ... until greedy simulation fits in D days.',
    bruteBangla: 'সর্বোচ্চ ওজন থেকে শুরু করে এক এক করে ক্যাপাসিটি বাড়িয়ে চেক করা।',
    bruteWhyTle: 'O(n * sum(w)) times out completely when sum(w) reaches 10^10.',
    brutePseudo: 'for C = max(w)..sum(w): if feasible(C) <= D return C',
    betterIntuition: '2D Partition DP: dp[d][i] = min max load splitting prefix i into d days.',
    betterBangla: '২ডি ডিপি দিয়ে D দিনে ভাগ করার মিনিমাম লোড বের করা।',
    betterTradeoff: 'O(D * n^2) exceeds time & memory on n = 10^5.',
    betterPseudo: 'dp[d][i] = min_j max(dp[d-1][j], sum(j+1..i))',
    optimalIntuition: 'Binary Search on Answer evaluates monotonic greedy feasibility in O(n log(sum)).',
    optimalBangla: 'উত্তরের রেঞ্জ [max(w), sum(w)]-এর ওপর বাইনারি সার্চ চালিয়ে গ্রিডি ফিজিবিলিটি চেক করলে O(n log sum)-এ সমাধান হয়।',
    optimalWhyWins: 'Only ~40 checks regardless of large weights.',
    optimalPseudo: 'lo=max(w), hi=sum(w); while lo<hi: mid=(lo+hi)//2; if daysNeeded(mid)<=D hi=mid else lo=mid+1',
    banglaEditorial: 'ক্যাপাসিটি বাড়ালে প্রয়োজনীয় দিনের সংখ্যা কমে—এই মনোটোনিক ধর্ম কাজে লাগিয়ে বাইনারি সার্চ চালালেই সর্বনিম্ন ক্যাপাসিটি পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'w=[1,2,3,4,5,6,7,8,9,10], D=5', memoryOrStack: 'lo=10, hi=55 -> mid=32', note: '32 takes 2 days <= 5' },
      { step: 2, state: 'Converge', memoryOrStack: 'lo=hi=15', note: 'Min capacity = 15' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], D = d[1];
      let lo = 0, hi = 0;
      for (let i = 0; i < n; i++) { lo = Math.max(lo, d[2 + i]); hi += d[2 + i]; }
      const ok = (cap: number) => {
        let days = 1, cur = 0;
        for (let i = 0; i < n; i++) {
          if (cur + d[2 + i] > cap) { days++; cur = d[2 + i]; }
          else cur += d[2 + i];
        }
        return days <= D;
      };
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (ok(mid)) hi = mid;
        else lo = mid + 1;
      }
      return String(lo);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['10 5\n1 2 3 4 5 6 7 8 9 10', '6 3\n3 2 2 4 1 4'];
      const hiddenInputs = ['1 1\n50', '5 1\n10 20 30 40 50', '5 5\n10 20 30 40 50'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 25), D = randInt(rng, 1, n);
        const arr = Array.from({ length: n }, () => randInt(rng, 1, 100));
        hiddenInputs.push(`${n} ${D}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, D; scanf("%d %d", &n, &D);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, D; cin >> n >> D;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), D = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, D; if (scanf("%d %d", &n, &D) != 2) return 0;
    long long *w = malloc(n * sizeof(long long)), lo = 0, hi = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &w[i]); if (w[i] > lo) lo = w[i]; hi += w[i]; }
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, cur = 0;
        int days = 1;
        for (int i = 0; i < n; i++) { if (cur + w[i] > mid) { days++; cur = w[i]; } else cur += w[i]; }
        if (days <= D) hi = mid; else lo = mid + 1;
    }
    printf("%lld\\n", lo);
    free(w);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, D; cin >> n >> D;
    vector<long long> w(n);
    long long lo = 0, hi = 0;
    for (int i = 0; i < n; i++) { cin >> w[i]; lo = max(lo, w[i]); hi += w[i]; }
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, cur = 0;
        int days = 1;
        for (long long x : w) { if (cur + x > mid) { days++; cur = x; } else cur += x; }
        if (days <= D) hi = mid; else lo = mid + 1;
    }
    cout << lo << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, D = d[0], d[1]
w = d[2:2+n]
lo, hi = max(w), sum(w)
while lo < hi:
    mid = (lo + hi) // 2
    days, cur = 1, 0
    for x in w:
        if cur + x > mid: days += 1; cur = x
        else: cur += x
    if days <= D: hi = mid
    else: lo = mid + 1
print(lo)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), D = sc.nextInt();
        long[] w = new long[n]; long lo = 0, hi = 0;
        for (int i = 0; i < n; i++) { w[i] = sc.nextLong(); lo = Math.max(lo, w[i]); hi += w[i]; }
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2, cur = 0; int days = 1;
            for (long x : w) { if (cur + x > mid) { days++; cur = x; } else cur += x; }
            if (days <= D) hi = mid; else lo = mid + 1;
        }
        System.out.println(lo);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], D = d[1];
let lo = 0, hi = 0;
for (let i = 0; i < n; i++) { lo = Math.max(lo, d[2 + i]); hi += d[2 + i]; }
while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  let days = 1, cur = 0;
  for (let i = 0; i < n; i++) { if (cur + d[2 + i] > mid) { days++; cur = d[2 + i]; } else cur += d[2 + i]; }
  if (days <= D) hi = mid; else lo = mid + 1;
}
console.log(lo);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], D: number = d[1];
let lo: number = 0, hi: number = 0;
for (let i = 0; i < n; i++) { lo = Math.max(lo, d[2 + i]); hi += d[2 + i]; }
while (lo < hi) {
  const mid: number = Math.floor((lo + hi) / 2);
  let days: number = 1, cur: number = 0;
  for (let i = 0; i < n; i++) { if (cur + d[2 + i] > mid) { days++; cur = d[2 + i]; } else cur += d[2 + i]; }
  if (days <= D) hi = mid; else lo = mid + 1;
}
console.log(lo);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, cap_days) = (d[0] as usize, d[1]);
    let w = &d[2..2 + n];
    let mut lo = *w.iter().max().unwrap();
    let mut hi: i64 = w.iter().sum();
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        let (mut days, mut cur) = (1i64, 0i64);
        for &x in w { if cur + x > mid { days += 1; cur = x; } else { cur += x; } }
        if days <= cap_days { hi = mid; } else { lo = mid + 1; }
    }
    println!("{}", lo);
}`,
    },
  },

  bs_aggressive_cows: {
    id: 'bs_aggressive_cows',
    defaultTopic: 'Binary Search on Answer',
    timeComplexity: 'O(n log(maxPos))',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(C(n, k) * k)',
    betterComplexity: 'O(n * maxPos)',
    inputFormat: 'First line: n (positions) and k (items to place), 2 <= k <= n <= 10^5. Second line: n positions x_i (0 <= x_i <= 10^9).',
    outputFormat: 'Single integer: maximized minimum distance between any two placed items.',
    constraints: ['2 <= k <= n <= 10^5', '0 <= x[i] <= 10^9'],
    hints: [
      'Sort positions ascending first!',
      'Given candidate minimum spacing D, greedily place the first item at x[0] and each next item at the first stall >= last + D.',
      'Binary search the largest feasible D in [0, x[n-1] - x[0]].',
    ],
    bruteIntuition: 'Test all k-subsets of stalls and compute minimum pairwise gap.',
    bruteBangla: 'সব k-সাবসেট পরীক্ষা করে সর্বোচ্চ মিনিমাম দূরত্ব বের করা।',
    bruteWhyTle: 'Combinatorial O(n choose k) explodes immediately.',
    brutePseudo: 'check all combinations of k stalls',
    betterIntuition: 'Linearly test spacing D = 1, 2, 3, ... up to span.',
    betterBangla: '১ থেকে ক্রমান্বয়ে প্রতিটি দূরত্ব D পরীক্ষা করা।',
    betterTradeoff: 'O(n * 10^9) times out on large coordinates.',
    betterPseudo: 'for D=1..span: if canPlace(D) ans=D',
    optimalIntuition: 'Sort coordinates + Binary Search on Answer D using greedy placement check.',
    optimalBangla: 'অবস্থানগুলো সর্ট করে সম্ভাব্য দূরত্বের ওপর বাইনারি সার্চ চালিয়ে গ্রিডি প্লেসমেন্ট চেক করলে O(n log maxX)-এ সমাধান।',
    optimalWhyWins: 'Runs in ~30 binary search checks regardless of coordinate magnitude.',
    optimalPseudo: 'sort(x); binary search largest D such that greedyPlace(D) >= k',
    banglaEditorial: 'অবস্থানগুলো সর্ট করে নিলে দূরত্ব D বজায় রেখে k-টি বসানো সম্ভব কি না তা O(n)-এ গ্রিডি দিয়ে চেক করা যায়।',
    dryRunSteps: [
      { step: 1, state: 'x=[1,2,8,4,9], k=3', memoryOrStack: 'sorted=[1,2,4,8,9]', note: 'Check D=3: place 1,4,8 -> 3 OK' },
      { step: 2, state: 'Check D=4', memoryOrStack: 'place 1,8 -> only 2', note: 'Optimal D = 3' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], k = d[1];
      const x = d.slice(2, 2 + n).sort((a, b) => a - b);
      let lo = 0, hi = x[n - 1] - x[0];
      const ok = (dist: number) => {
        let cnt = 1, last = x[0];
        for (let i = 1; i < n; i++) {
          if (x[i] - last >= dist) { cnt++; last = x[i]; if (cnt >= k) return true; }
        }
        return cnt >= k;
      };
      while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (ok(mid)) lo = mid; else hi = mid - 1;
      }
      return String(lo);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5 3\n1 2 8 4 9', '4 2\n10 1 5 20'];
      const hiddenInputs = ['2 2\n0 1000000000', '4 4\n1 3 6 10'];
      for (let t = 0; t < 8; t++) {
        const n = randInt(rng, 5, 25), k = randInt(rng, 2, n);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 500));
        hiddenInputs.push(`${n} ${k}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, k; scanf("%d %d", &n, &k);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, k; cin >> n >> k;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmp(const void *a, const void *b) { long long x = *(const long long*)a, y = *(const long long*)b; return (x > y) - (x < y); }
int main(void) {
    int n, k; if (scanf("%d %d", &n, &k) != 2) return 0;
    long long *x = malloc(n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &x[i]);
    qsort(x, n, sizeof(long long), cmp);
    long long lo = 0, hi = x[n - 1] - x[0];
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2, last = x[0]; int cnt = 1;
        for (int i = 1; i < n; i++) if (x[i] - last >= mid) { cnt++; last = x[i]; }
        if (cnt >= k) lo = mid; else hi = mid - 1;
    }
    printf("%lld\\n", lo);
    free(x);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, k; cin >> n >> k;
    vector<long long> x(n);
    for (int i = 0; i < n; i++) cin >> x[i];
    sort(x.begin(), x.end());
    long long lo = 0, hi = x[n - 1] - x[0];
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2, last = x[0]; int cnt = 1;
        for (int i = 1; i < n; i++) if (x[i] - last >= mid) { cnt++; last = x[i]; }
        if (cnt >= k) lo = mid; else hi = mid - 1;
    }
    cout << lo << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
x = sorted(d[2:2+n])
lo, hi = 0, x[-1] - x[0]
while lo < hi:
    mid = (lo + hi + 1) // 2
    cnt, last = 1, x[0]
    for p in x[1:]:
        if p - last >= mid: cnt += 1; last = p
    if cnt >= k: lo = mid
    else: hi = mid - 1
print(lo)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        long[] x = new long[n];
        for (int i = 0; i < n; i++) x[i] = sc.nextLong();
        Arrays.sort(x);
        long lo = 0, hi = x[n - 1] - x[0];
        while (lo < hi) {
            long mid = lo + (hi - lo + 1) / 2, last = x[0]; int cnt = 1;
            for (int i = 1; i < n; i++) if (x[i] - last >= mid) { cnt++; last = x[i]; }
            if (cnt >= k) lo = mid; else hi = mid - 1;
        }
        System.out.println(lo);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1], x = d.slice(2, 2 + n).sort((a, b) => a - b);
let lo = 0, hi = x[n - 1] - x[0];
while (lo < hi) {
  const mid = Math.floor((lo + hi + 1) / 2);
  let cnt = 1, last = x[0];
  for (let i = 1; i < n; i++) if (x[i] - last >= mid) { cnt++; last = x[i]; }
  if (cnt >= k) lo = mid; else hi = mid - 1;
}
console.log(lo);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1], x: number[] = d.slice(2, 2 + n).sort((a, b) => a - b);
let lo: number = 0, hi: number = x[n - 1] - x[0];
while (lo < hi) {
  const mid: number = Math.floor((lo + hi + 1) / 2);
  let cnt: number = 1, last: number = x[0];
  for (let i = 1; i < n; i++) if (x[i] - last >= mid) { cnt++; last = x[i]; }
  if (cnt >= k) lo = mid; else hi = mid - 1;
}
console.log(lo);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1]);
    let mut x = d[2..2 + n].to_vec();
    x.sort();
    let (mut lo, mut hi) = (0i64, x[n - 1] - x[0]);
    while lo < hi {
        let mid = lo + (hi - lo + 1) / 2;
        let (mut cnt, mut last) = (1i64, x[0]);
        for &p in &x[1..] { if p - last >= mid { cnt += 1; last = p; } }
        if cnt >= k { lo = mid; } else { hi = mid - 1; }
    }
    println!("{}", lo);
}`,
    },
  },

  mono_stack_next_greater: {
    id: 'mono_stack_next_greater',
    defaultTopic: 'Monotonic Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: integer n (1 <= n <= 2*10^5). Second line: n integers.',
    outputFormat: 'Print n space-separated integers: for each index i, the first strictly greater value to its right, or -1 if none.',
    constraints: ['1 <= n <= 2 * 10^5', '-10^9 <= a[i] <= 10^9'],
    hints: [
      'Maintain a decreasing monotonic stack of unresolved indices.',
      'When a[i] > a[stack.top()], a[i] is the Next Greater Element for stack.pop()!',
      'Each index is pushed and popped at most once -> O(n).',
    ],
    bruteIntuition: 'For each index i, scan j = i+1..n-1 until a[j] > a[i].',
    bruteBangla: 'প্রতিটি উপাদানের ডানে লুপ চালিয়ে প্রথম বড় সংখ্যা খোঁজা।',
    bruteWhyTle: 'O(n^2) times out on strictly decreasing arrays of size 2*10^5.',
    brutePseudo: 'for i: scan j>i for first a[j] > a[i]',
    betterIntuition: 'Scan right-to-left using jump pointers.',
    betterBangla: 'ডান থেকে বামে জাম্প পয়েন্টার ব্যবহার করা।',
    betterTradeoff: 'Stack encodes the exact same monotonic jump structure cleanly.',
    betterPseudo: 'jump[i] = first greater index',
    optimalIntuition: 'Monotonic decreasing stack resolves all pending smaller elements in O(n) total operations.',
    optimalBangla: 'মনোটনিক স্ট্যাকে ছোট উপাদানগুলো জমা রেখে বড় মান পেলেই পপ করে উত্তর বসালে O(n)-এ সমাধান হয়।',
    optimalWhyWins: 'Strict O(n) amortized time and O(n) stack space.',
    optimalPseudo: 'for i: while st and a[st[-1]] < a[i]: ans[st.pop()]=a[i]; st.push(i)',
    banglaEditorial: 'স্ট্যাকে ইনডেক্সগুলো কমতে থাকা ক্রমে রাখলে নতুন বড় মান আসা মাত্রই আগের ছোটগুলোর Next Greater Element নির্ধারিত হয়ে যায়।',
    dryRunSteps: [
      { step: 1, state: 'a=[2, 1, 2, 4, 3]', memoryOrStack: 'stack=[0(2), 1(1)]', note: '2 > 1 pops idx 1 -> ans[1]=2' },
      { step: 2, state: 'i=3 (val=4)', memoryOrStack: 'pops idx 2 & 0 -> ans=4', note: 'Output: 4 2 4 -1 -1' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], a = d.slice(1, 1 + n);
      const ans = new Array(n).fill(-1);
      const st: number[] = [];
      for (let i = 0; i < n; i++) {
        while (st.length && a[st[st.length - 1]] < a[i]) ans[st.pop()!] = a[i];
        st.push(i);
      }
      return ans.join(' ');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5\n2 1 2 4 3', '4\n4 3 2 1'];
      const hiddenInputs = ['1\n10', '5\n1 2 3 4 5', '5\n5 5 5 5 5'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 30);
        const arr = Array.from({ length: n }, () => randInt(rng, -50, 100));
        hiddenInputs.push(`${n}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; scanf("%d", &n);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    long long *a = malloc(n * sizeof(long long)), *ans = malloc(n * sizeof(long long));
    int *st = malloc(n * sizeof(int)), top = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); ans[i] = -1; }
    for (int i = 0; i < n; i++) {
        while (top > 0 && a[st[top - 1]] < a[i]) ans[st[--top]] = a[i];
        st[top++] = i;
    }
    for (int i = 0; i < n; i++) printf("%s%lld", i ? " " : "", ans[i]);
    printf("\\n");
    free(a); free(ans); free(st);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> a(n), ans(n, -1);
    vector<int> st;
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.back()] < a[i]) { ans[st.back()] = a[i]; st.pop_back(); }
        st.push_back(i);
    }
    for (int i = 0; i < n; i++) cout << (i ? " " : "") << ans[i];
    cout << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]; a = d[1:1+n]
ans = [-1] * n
st = []
for i, v in enumerate(a):
    while st and a[st[-1]] < v: ans[st.pop()] = v
    st.append(i)
print(" ".join(map(str, ans)))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] a = new long[n], ans = new long[n];
        Arrays.fill(ans, -1);
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
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
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], a = d.slice(1, 1 + n), ans = Array(n).fill(-1), st = [];
for (let i = 0; i < n; i++) {
  while (st.length && a[st[st.length - 1]] < a[i]) ans[st.pop()] = a[i];
  st.push(i);
}
console.log(ans.join(' '));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], a: number[] = d.slice(1, 1 + n);
const ans: number[] = new Array<number>(n).fill(-1);
const st: number[] = [];
for (let i = 0; i < n; i++) {
  while (st.length && a[st[st.length - 1]] < a[i]) ans[st.pop()!] = a[i];
  st.push(i);
}
console.log(ans.join(' '));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let a = &d[1..1 + n];
    let mut ans = vec![-1i64; n];
    let mut st: Vec<usize> = Vec::new();
    for i in 0..n {
        while let Some(&top) = st.last() {
            if a[top] < a[i] { ans[top] = a[i]; st.pop(); } else { break; }
        }
        st.push(i);
    }
    let out: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
    println!("{}", out.join(" "));
}`,
    },
  },

  mono_stack_histogram: {
    id: 'mono_stack_histogram',
    defaultTopic: 'Monotonic Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: integer n (1 <= n <= 2*10^5). Second line: n non-negative bar heights.',
    outputFormat: 'Single 64-bit integer: area of the largest rectangle inside the histogram.',
    constraints: ['1 <= n <= 2 * 10^5', '0 <= h[i] <= 10^9'],
    hints: [
      'Every bar h[i] can expand left and right until hitting a strictly shorter bar.',
      'Use an increasing monotonic stack of indices; append a sentinel height 0 at index n to flush remaining bars.',
      'When popping bar idx on height < h[idx], width = stack.empty() ? i : i - stack.top() - 1.',
    ],
    bruteIntuition: 'For each bar i, expand left and right linearly to find nearest shorter bars.',
    bruteBangla: 'প্রতিটি স্তম্ভের বামে ও ডানে ছোট স্তম্ভ না পাওয়া পর্যন্ত প্রসারিত হওয়া।',
    bruteWhyTle: 'O(n^2) times out for n = 2*10^5.',
    brutePseudo: 'for i: expand l, r while h>=h[i]; update area',
    betterIntuition: 'Divide and conquer around the range-minimum bar using a Segment Tree.',
    betterBangla: 'সেগমেন্ট ট্রি দিয়ে সর্বনিম্ন উচ্চতা খুঁজে ডিভাইড অ্যান্ড কনকোয়ার।',
    betterTradeoff: 'O(n log n) vs single-pass O(n) monotonic stack.',
    betterPseudo: 'solve(l, r) around argmin(h[l..r])',
    optimalIntuition: 'Single-pass increasing monotonic stack computes both nearest smaller boundaries on pop in O(n).',
    optimalBangla: 'ইনক্রিজিং মনোটনিক স্ট্যাক ও শেষে ০ হাইট সেন্টিনেল রাখলে প্রতিটি বার পপ হওয়ার সময়ই সর্বোচ্চ প্রস্থ জানা যায়।',
    optimalWhyWins: 'Optimal O(n) time and O(n) space.',
    optimalPseudo: 'for i=0..n: cur=(i==n?0:h[i]); while st and h[st[-1]]>=cur: pop and update area; st.push(i)',
    banglaEditorial: 'বাড়তে থাকা মনোটনিক স্ট্যাকে ছোট উচ্চতা এলেই আগের বড় স্তম্ভ পপ হয়—তখন বর্তমান ও স্ট্যাক-টপ ইনডেক্সের মাঝে প্রস্থ হিসাব করা যায়।',
    dryRunSteps: [
      { step: 1, state: 'h=[2,1,5,6,2,3]', memoryOrStack: 'pop 6(w=1)->6, pop 5(w=2)->10', note: 'Max area = 10' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], h = d.slice(1, 1 + n);
      const st: number[] = [];
      let best = 0;
      for (let i = 0; i <= n; i++) {
        const cur = i === n ? 0 : h[i];
        while (st.length && h[st[st.length - 1]] >= cur) {
          const height = h[st.pop()!];
          const w = st.length ? i - st[st.length - 1] - 1 : i;
          best = Math.max(best, height * w);
        }
        st.push(i);
      }
      return String(best);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['6\n2 1 5 6 2 3', '2\n2 4'];
      const hiddenInputs = ['1\n0', '1\n1000000000', '5\n5 4 3 2 1'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 25);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 50));
        hiddenInputs.push(`${n}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; scanf("%d", &n);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    long long *h = malloc(n * sizeof(long long));
    int *st = malloc((n + 1) * sizeof(int)), top = 0;
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        long long cur = (i == n) ? 0 : h[i];
        while (top > 0 && h[st[top - 1]] >= cur) {
            long long ht = h[st[--top]];
            long long w = top ? (i - st[top - 1] - 1) : i;
            if (ht * w > best) best = ht * w;
        }
        st[top++] = i;
    }
    printf("%lld\\n", best);
    free(h); free(st);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    vector<int> st; long long best = 0;
    for (int i = 0; i <= n; i++) {
        long long cur = (i == n) ? 0 : h[i];
        while (!st.empty() && h[st.back()] >= cur) {
            long long ht = h[st.back()]; st.pop_back();
            long long w = st.empty() ? i : (i - st.back() - 1);
            best = max(best, ht * w);
        }
        st.push_back(i);
    }
    cout << best << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]; h = d[1:1+n]
st, best = [], 0
for i in range(n + 1):
    cur = 0 if i == n else h[i]
    while st and h[st[-1]] >= cur:
        ht = h[st.pop()]
        w = i - st[-1] - 1 if st else i
        if ht * w > best: best = ht * w
    st.append(i)
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();
        Deque<Integer> st = new ArrayDeque<>(); long best = 0;
        for (int i = 0; i <= n; i++) {
            long cur = (i == n) ? 0 : h[i];
            while (!st.isEmpty() && h[st.peek()] >= cur) {
                long ht = h[st.pop()];
                long w = st.isEmpty() ? i : (i - st.peek() - 1);
                best = Math.max(best, ht * w);
            }
            st.push(i);
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], h = d.slice(1, 1 + n), st = [];
let best = 0;
for (let i = 0; i <= n; i++) {
  const cur = i === n ? 0 : h[i];
  while (st.length && h[st[st.length - 1]] >= cur) {
    const ht = h[st.pop()], w = st.length ? i - st[st.length - 1] - 1 : i;
    best = Math.max(best, ht * w);
  }
  st.push(i);
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], h: number[] = d.slice(1, 1 + n);
const st: number[] = [];
let best: number = 0;
for (let i = 0; i <= n; i++) {
  const cur: number = i === n ? 0 : h[i];
  while (st.length && h[st[st.length - 1]] >= cur) {
    const ht: number = h[st.pop()!], w: number = st.length ? i - st[st.length - 1] - 1 : i;
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
    let h = &d[1..1 + n];
    let mut st: Vec<usize> = Vec::new();
    let mut best = 0i64;
    for i in 0..=n {
        let cur = if i == n { 0 } else { h[i] };
        while let Some(&top) = st.last() {
            if h[top] >= cur {
                st.pop();
                let w = if let Some(&prev) = st.last() { (i - prev - 1) as i64 } else { i as i64 };
                best = best.max(h[top] * w);
            } else { break; }
        }
        st.push(i);
    }
    println!("{}", best);
}`,
    },
  },

  mono_deque_window_max: {
    id: 'mono_deque_window_max',
    defaultTopic: 'Monotonic Queue',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    bruteComplexity: 'O(n * k)',
    betterComplexity: 'O(n log k)',
    inputFormat: 'First line: two integers n and k (1 <= k <= n <= 2*10^5). Second line: n integers.',
    outputFormat: 'Print n - k + 1 space-separated maximums for each sliding window of length k.',
    constraints: ['1 <= k <= n <= 2 * 10^5', '-10^9 <= a[i] <= 10^9'],
    hints: [
      'Use a Monotonic Decreasing Deque storing indices.',
      'Pop front if dq[0] <= i - k (outside current window).',
      'Pop back while a[dq.back()] <= a[i], then push i; answer for window ending at i >= k-1 is a[dq.front()].',
    ],
    bruteIntuition: 'Scan all k elements inside every window to find max.',
    bruteBangla: 'প্রতিটি উইন্ডোতে k-টি সংখ্যা লুপ করে সর্বোচ্চ খোঁজা।',
    bruteWhyTle: 'O(n * k) = 10^10 operations on k = n / 2.',
    brutePseudo: 'for i in 0..n-k: max(a[i..i+k-1])',
    betterIntuition: 'Maintain a max-heap or balanced BST of window elements.',
    betterBangla: 'ম্যাক্স-হিপ বা ট্রি-সেটে উইন্ডোর মান রেখে সর্বোচ্চ নেওয়া।',
    betterTradeoff: 'O(n log k) vs amortized O(n) with monotonic deque.',
    betterPseudo: 'priority_queue with lazy deletion',
    optimalIntuition: 'Monotonic Decreasing Deque maintains window maximum at front in O(n) total time.',
    optimalBangla: 'মনোটনিক ডিকিউতে সামনে থেকে মেয়াদোত্তীর্ণ ইনডেক্স আর পেছন থেকে ছোট মান বাদ দিলে প্রতি উইন্ডোর সর্বোচ্চ মান থাকে ফ্রন্টে।',
    optimalWhyWins: 'Every index enters and leaves deque once -> O(n) time, O(k) space.',
    optimalPseudo: 'pop front if <= i-k; pop back while a[back]<=a[i]; push i; emit a[front]',
    banglaEditorial: 'ডিকিউ-এর ফ্রন্টে সবসময় বর্তমান উইন্ডোর সর্বোচ্চ উপাদানের ইনডেক্স থাকে—তাই মোট টাইম O(n)।',
    dryRunSteps: [
      { step: 1, state: 'a=[1,3,-1,-3,5,3,6,7], k=3', memoryOrStack: 'dq=[1(3),2(-1)] -> max=3', note: 'First window' },
      { step: 2, state: 'Slide to end', memoryOrStack: '3 3 5 5 6 7', note: '6 outputs' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], k = d[1], a = d.slice(2, 2 + n);
      const dq: number[] = [];
      let head = 0;
      const out: number[] = [];
      for (let i = 0; i < n; i++) {
        if (head < dq.length && dq[head] <= i - k) head++;
        while (dq.length > head && a[dq[dq.length - 1]] <= a[i]) dq.pop();
        dq.push(i);
        if (i >= k - 1) out.push(a[dq[head]]);
      }
      return out.join(' ');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['8 3\n1 3 -1 -3 5 3 6 7', '3 1\n4 -2 9'];
      const hiddenInputs = ['5 5\n9 1 8 2 7', '5 2\n5 4 3 2 1'];
      for (let t = 0; t < 8; t++) {
        const n = randInt(rng, 5, 25), k = randInt(rng, 1, n);
        const arr = Array.from({ length: n }, () => randInt(rng, -50, 50));
        hiddenInputs.push(`${n} ${k}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, k; scanf("%d %d", &n, &k);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, k; cin >> n >> k;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nfrom collections import deque\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, k; if (scanf("%d %d", &n, &k) != 2) return 0;
    long long *a = malloc(n * sizeof(long long));
    int *dq = malloc(n * sizeof(int)), h = 0, t = 0, first = 1;
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    for (int i = 0; i < n; i++) {
        if (h < t && dq[h] <= i - k) h++;
        while (h < t && a[dq[t - 1]] <= a[i]) t--;
        dq[t++] = i;
        if (i >= k - 1) { printf("%s%lld", first ? "" : " ", a[dq[h]]); first = 0; }
    }
    printf("\\n");
    free(a); free(dq);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, k; cin >> n >> k;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    deque<int> dq; bool first = true;
    for (int i = 0; i < n; i++) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) { cout << (first ? "" : " ") << a[dq.front()]; first = false; }
    }
    cout << '\\n';
    return 0;
}`,
      python: `import sys
from collections import deque
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]; a = d[2:2+n]
dq, out = deque(), []
for i, v in enumerate(a):
    if dq and dq[0] <= i - k: dq.popleft()
    while dq and a[dq[-1]] <= v: dq.pop()
    dq.append(i)
    if i >= k - 1: out.append(str(a[dq[0]]))
print(" ".join(out))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        Deque<Integer> dq = new ArrayDeque<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
            while (!dq.isEmpty() && a[dq.peekLast()] <= a[i]) dq.pollLast();
            dq.addLast(i);
            if (i >= k - 1) { if (i >= k) sb.append(' '); sb.append(a[dq.peekFirst()]); }
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1], a = d.slice(2, 2 + n), dq = [];
let head = 0;
const out = [];
for (let i = 0; i < n; i++) {
  if (head < dq.length && dq[head] <= i - k) head++;
  while (dq.length > head && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (i >= k - 1) out.push(a[dq[head]]);
}
console.log(out.join(' '));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1], a: number[] = d.slice(2, 2 + n);
const dq: number[] = [];
let head: number = 0;
const out: number[] = [];
for (let i = 0; i < n; i++) {
  if (head < dq.length && dq[head] <= i - k) head++;
  while (dq.length > head && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (i >= k - 1) out.push(a[dq[head]]);
}
console.log(out.join(' '));`,
      rust: `use std::collections::VecDeque;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1] as usize);
    let a = &d[2..2 + n];
    let mut dq: VecDeque<usize> = VecDeque::new();
    let mut out = Vec::new();
    for i in 0..n {
        if let Some(&f) = dq.front() { if f + k <= i { dq.pop_front(); } }
        while let Some(&b) = dq.back() { if a[b] <= a[i] { dq.pop_back(); } else { break; } }
        dq.push_back(i);
        if i + 1 >= k { out.push(a[*dq.front().unwrap()].to_string()); }
    }
    println!("{}", out.join(" "));
}`,
    },
  },

  heap_kth_largest: {
    id: 'heap_kth_largest',
    defaultTopic: 'Heaps',
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    bruteComplexity: 'O(n * k)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: n and k (1 <= k <= n <= 2*10^5). Second line: n integers.',
    outputFormat: 'Single integer: the k-th largest element (1-indexed among sorted descending values, duplicates counted).',
    constraints: ['1 <= k <= n <= 2 * 10^5', '-10^9 <= a[i] <= 10^9'],
    hints: [
      'Sorting descending gives O(n log n); can we keep space O(k)?',
      'Maintain a Min-Heap of capacity k.',
      'Push each element and pop whenever heap size > k; the top of the min-heap is the k-th largest!',
    ],
    bruteIntuition: 'Perform selection sort k times picking the maximum each pass.',
    bruteBangla: 'k বার সর্বোচ্চ উপাদান খুঁজে বের করে সরিয়ে ফেলা।',
    bruteWhyTle: 'O(n * k) = 4*10^10 operations when k = n / 2.',
    brutePseudo: 'repeat k times: pick and remove max(arr)',
    betterIntuition: 'Full sort descending in O(n log n) and return a[k - 1].',
    betterBangla: 'অ্যারে বড় থেকে ছোট সর্ট করে k-তম উপাদান নেওয়া।',
    betterTradeoff: 'O(n log n) time and O(n) storage vs O(n log k) and O(k) heap.',
    betterPseudo: 'sort desc(a); return a[k - 1]',
    optimalIntuition: 'Size-k Min-Heap retains the k largest elements seen so far in O(n log k) time and O(k) memory.',
    optimalBangla: 'k আকারের একটি মিন-হিপ রাখলে প্রতিবার সবচেয়ে ছোটটি বাদ গিয়ে শেষে হিপের শীর্ষেই k-তম বৃহত্তম মান থাকে।',
    optimalWhyWins: 'Streaming O(k) memory and O(n log k) runtime.',
    optimalPseudo: 'minHeap; for x: push(x); if size>k pop(); return top()',
    banglaEditorial: 'মিন-হিপে সর্বোচ্চ k-টি উপাদান রাখলে হিপের রুটেই থাকে k-তম বৃহত্তম সংখ্যাটি।',
    dryRunSteps: [
      { step: 1, state: 'a=[3,2,1,5,6,4], k=2', memoryOrStack: 'heap keeps [5, 6]', note: 'heap top = 5' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], k = d[1];
      const a = d.slice(2, 2 + n).sort((x, y) => y - x);
      return String(a[k - 1]);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['6 2\n3 2 1 5 6 4', '9 4\n3 2 3 1 2 4 5 5 6'];
      const hiddenInputs = ['1 1\n42', '5 5\n5 4 3 2 1'];
      for (let t = 0; t < 8; t++) {
        const n = randInt(rng, 5, 30), k = randInt(rng, 1, n);
        const arr = Array.from({ length: n }, () => randInt(rng, -50, 100));
        hiddenInputs.push(`${n} ${k}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, k; scanf("%d %d", &n, &k);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, k; cin >> n >> k;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys, heapq\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmp(const void *a, const void *b) { long long x = *(const long long*)a, y = *(const long long*)b; return (y > x) - (y < x); }
int main(void) {
    int n, k; if (scanf("%d %d", &n, &k) != 2) return 0;
    long long *a = malloc(n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    qsort(a, n, sizeof(long long), cmp);
    printf("%lld\\n", a[k - 1]);
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, k; cin >> n >> k;
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x; pq.push(x);
        if ((int)pq.size() > k) pq.pop();
    }
    cout << pq.top() << '\\n';
    return 0;
}`,
      python: `import sys, heapq
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
h = []
for x in d[2:2+n]:
    if len(h) < k: heapq.heappush(h, x)
    elif x > h[0]: heapq.heapreplace(h, x)
print(h[0])`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            pq.add(sc.nextLong());
            if (pq.size() > k) pq.poll();
        }
        System.out.println(pq.peek());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1], a = d.slice(2, 2 + n).sort((x, y) => y - x);
console.log(a[k - 1]);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1], a: number[] = d.slice(2, 2 + n).sort((x, y) => y - x);
console.log(a[k - 1]);`,
      rust: `use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1] as usize);
    let mut pq: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
    for &x in &d[2..2 + n] {
        pq.push(Reverse(x));
        if pq.len() > k { pq.pop(); }
    }
    println!("{}", pq.peek().unwrap().0);
}`,
    },
  },

  valid_parentheses_min_add: {
    id: 'valid_parentheses_min_add',
    defaultTopic: 'Stacks',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n)',
    inputFormat: 'Single line containing a non-empty string s of parentheses "(" and ")" (1 <= |s| <= 2*10^5).',
    outputFormat: 'Single integer: minimum number of parentheses "(" or ")" to insert to make s balanced.',
    constraints: ['1 <= |s| <= 2 * 10^5', 'Characters are only "(" and ")"'],
    hints: [
      'Track unmatched open "(" count in variable `open`.',
      'When seeing ")", if open > 0 pair it (open--); else an insertion of "(" is needed (adds++).',
      'At the end, remaining unmatched open "(" also need matching ")" -> total = adds + open.',
    ],
    bruteIntuition: 'Repeatedly erase "()" substrings until no more pairs remain.',
    bruteBangla: 'বারবার "()" জোড়া মুছে ফেলে বাকি অক্ষর গোনা।',
    bruteWhyTle: 'Repeated string scanning takes O(n^2) time.',
    brutePseudo: 'while "()" in s: s = s.replace("()", ""); return len(s)',
    betterIntuition: 'Use an explicit stack pushing "(" and popping on ")" if top is "(".',
    betterBangla: 'স্ট্যাক ব্যবহার করে মিল না পাওয়া ব্র্যাকেট জমা রাখা।',
    betterTradeoff: 'O(n) stack space instead of O(1) counters.',
    betterPseudo: 'stack of unmatched chars; return stack.size()',
    optimalIntuition: 'Two integer counters (open, unmatchedRight) solve min additions in O(n) time and O(1) space.',
    optimalBangla: 'দুটি কাউন্টার (open ও adds) রাখলে স্ট্যাক ছাড়াই O(1) স্পেসে উত্তর পাওয়া যায়।',
    optimalWhyWins: 'Zero heap allocation and linear pass.',
    optimalPseudo: 'for ch: if ch=="(" open++ else if open>0 open-- else adds++; print open+adds',
    banglaEditorial: 'খোলা ব্র্যাকেটের কাউন্ট রেখে ")" পেলে ম্যাচ করাও; না পারলে একটি অতিরিক্ত "(" দরকার। শেষে অবশিষ্ট খোলা ব্র্যাকেট যোগ করো।',
    dryRunSteps: [
      { step: 1, state: 's = "()))(("', memoryOrStack: 'open=0, adds=2 after first 4 chars', note: 'Last 2 "(" leave open=2' },
      { step: 2, state: 'Total = open + adds', memoryOrStack: '2 + 2 = 4', note: 'Output: 4' },
    ],
    solveJs(stdin) {
      const s = stdin.trim();
      let open = 0, adds = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') open++;
        else if (open > 0) open--;
        else adds++;
      }
      return String(open + adds);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['())', '()))(('];
      const hiddenInputs = ['(', ')', '((()))', ')()('];
      for (let k = 0; k < 8; k++) {
        const len = randInt(rng, 4, 40);
        const s = Array.from({ length: len }, () => (rng() < 0.5 ? '(' : ')')).join('');
        hiddenInputs.push(s);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    // Read string and solve\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\ns = sys.stdin.read().strip()\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim();\n`,
      typescript: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').trim();\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int c, open = 0, adds = 0;
    while ((c = getchar()) != EOF) {
        if (c == '(') open++;
        else if (c == ')') { if (open > 0) open--; else adds++; }
    }
    printf("%d\\n", open + adds);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string s; cin >> s;
    int open = 0, adds = 0;
    for (char c : s) { if (c == '(') open++; else if (open > 0) open--; else adds++; }
    cout << open + adds << '\\n';
    return 0;
}`,
      python: `import sys
s = sys.stdin.read().strip()
open_c = adds = 0
for ch in s:
    if ch == '(': open_c += 1
    elif open_c > 0: open_c -= 1
    else: adds += 1
print(open_c + adds)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next().trim();
        int open = 0, adds = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') open++;
            else if (open > 0) open--;
            else adds++;
        }
        System.out.println(open + adds);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const s = raw.trim();
let open = 0, adds = 0;
for (let i = 0; i < s.length; i++) {
  if (s[i] === '(') open++; else if (open > 0) open--; else adds++;
}
console.log(open + adds);`,
      typescript: `import * as fs from 'fs';
const s: string = fs.readFileSync(0, 'utf8').trim();
let open: number = 0, adds: number = 0;
for (let i = 0; i < s.length; i++) {
  if (s[i] === '(') open++; else if (open > 0) open--; else adds++;
}
console.log(open + adds);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let (mut open, mut adds) = (0i32, 0i32);
    for b in s.trim().bytes() {
        if b == b'(' { open += 1; } else if open > 0 { open -= 1; } else { adds += 1; }
    }
    println!("{}", open + adds);
}`,
    },
  },

  longest_unique_substr: {
    id: 'longest_unique_substr',
    defaultTopic: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^3)',
    betterComplexity: 'O(n^2)',
    inputFormat: 'Single line containing a non-empty string s of printable ASCII characters (1 <= |s| <= 2*10^5).',
    outputFormat: 'Single integer: length of the longest substring without duplicate characters.',
    constraints: ['1 <= |s| <= 2 * 10^5', 'Printable non-whitespace ASCII characters'],
    hints: [
      'Track the last seen index of every ASCII character.',
      'Maintain window left boundary `l`. When seeing s[r] previously at idx >= l, jump l = idx + 1!',
      'Update best = max(best, r - l + 1).',
    ],
    bruteIntuition: 'Check all substrings s[i..j] for uniqueness.',
    bruteBangla: 'সব সাবস্ট্রিং পরীক্ষা করে কোনটিতে রিপিট নেই তা দেখা।',
    bruteWhyTle: 'O(n^3) or O(n^2) times out for |s| = 2*10^5.',
    brutePseudo: 'for i: set={}; for j>=i: if s[j] in set break; set.add(s[j])',
    betterIntuition: 'Sliding window shrinking `l` one step at a time while s[r] is in set.',
    betterBangla: 'হ্যাশ সেট নিয়ে ডুপ্লিকেট থাকা পর্যন্ত l এক ধাপ করে সামনে বাড়ানো।',
    betterTradeoff: 'Up to 2n operations vs direct jump table of size 128.',
    betterPseudo: 'while s[r] in set: remove s[l++]',
    optimalIntuition: 'Last-seen ASCII index array jumps `l` directly in O(n) time and O(1) fixed space.',
    optimalBangla: 'প্রতিটি অক্ষরের সর্বশেষ ইনডেক্স সংরক্ষণ করে ডুপ্লিকেট দেখা মাত্রই l-কে সরাসরি last[ch] + 1-এ পাঠিয়ে O(n)-এ সমাধান।',
    optimalWhyWins: 'Strict single-pass O(n) time and constant 128-int array.',
    optimalPseudo: 'last = [-1]*256; l=0; for r: l = max(l, last[s[r]]+1); last[s[r]]=r; best=max(best, r-l+1)',
    banglaEditorial: 'প্রতিটি অক্ষরের শেষ অবস্থান মনে রাখলে রিপিট দেখা মাত্রই উইন্ডোর বাম প্রান্ত এক লাফে নতুন নিরাপদ অবস্থানে চলে যায়।',
    dryRunSteps: [
      { step: 1, state: 's = "abcabcbb"', memoryOrStack: 'abc -> len=3, second a jumps l=1', note: 'best stays 3' },
    ],
    solveJs(stdin) {
      const s = stdin.trim();
      const last = new Int32Array(256).fill(-1);
      let l = 0, best = 0;
      for (let r = 0; r < s.length; r++) {
        const c = s.charCodeAt(r);
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        if (r - l + 1 > best) best = r - l + 1;
      }
      return String(best);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['abcabcbb', 'pwwkew'];
      const hiddenInputs = ['a', 'bbbbb', 'abcdefg', 'dvdf', 'abba'];
      const alpha = 'abcdefghij';
      for (let k = 0; k < 7; k++) {
        const len = randInt(rng, 10, 45);
        const s = Array.from({ length: len }, () => alpha[randInt(rng, 0, alpha.length - 1)]).join('');
        hiddenInputs.push(s);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    // Read string and solve\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\ns = sys.stdin.read().strip()\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim();\n`,
      typescript: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').trim();\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int last[256]; for (int i = 0; i < 256; i++) last[i] = -1;
    int c, l = 0, r = 0, best = 0;
    while ((c = getchar()) != EOF) {
        if (c <= ' ') continue;
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        if (r - l + 1 > best) best = r - l + 1;
        r++;
    }
    printf("%d\\n", best);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string s; cin >> s;
    vector<int> last(256, -1);
    int l = 0, best = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        unsigned char c = s[r];
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        best = max(best, r - l + 1);
    }
    cout << best << '\\n';
    return 0;
}`,
      python: `import sys
s = sys.stdin.read().strip()
last = {}
l = best = 0
for r, ch in enumerate(s):
    if ch in last and last[ch] >= l: l = last[ch] + 1
    last[ch] = r
    if r - l + 1 > best: best = r - l + 1
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next().trim();
        int[] last = new int[256]; Arrays.fill(last, -1);
        int l = 0, best = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (last[c] >= l) l = last[c] + 1;
            last[c] = r;
            best = Math.max(best, r - l + 1);
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const s = raw.trim();
const last = new Int32Array(256).fill(-1);
let l = 0, best = 0;
for (let r = 0; r < s.length; r++) {
  const c = s.charCodeAt(r);
  if (last[c] >= l) l = last[c] + 1;
  last[c] = r;
  best = Math.max(best, r - l + 1);
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const s: string = fs.readFileSync(0, 'utf8').trim();
const last = new Int32Array(256).fill(-1);
let l: number = 0, best: number = 0;
for (let r = 0; r < s.length; r++) {
  const c: number = s.charCodeAt(r);
  if (last[c] >= l) l = last[c] + 1;
  last[c] = r;
  best = Math.max(best, r - l + 1);
}
console.log(best);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let bytes = s.trim().as_bytes();
    let mut last = [-1i32; 256];
    let (mut l, mut best) = (0i32, 0i32);
    for (r, &b) in bytes.iter().enumerate() {
        let idx = b as usize;
        if last[idx] >= l { l = last[idx] + 1; }
        last[idx] = r as i32;
        best = best.max(r as i32 - l + 1);
    }
    println!("{}", best);
}`,
    },
  },

  kmp_pattern_count: {
    id: 'kmp_pattern_count',
    defaultTopic: 'Strings',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(m)',
    bruteComplexity: 'O(n * m)',
    betterComplexity: 'O(n + m)',
    inputFormat: 'First line: text string T. Second line: pattern string P (1 <= |P|, |T| <= 2*10^5).',
    outputFormat: 'Single integer: total number of (possibly overlapping) occurrences of P in T.',
    constraints: ['1 <= |T|, |P| <= 2 * 10^5', 'Lowercase English letters'],
    hints: [
      'Naive matching backtracks T to O(|T|*|P|) on strings like "aaaa...a" and "aaab".',
      'Build the KMP Longest Proper Prefix-Suffix (LPS / pi) array on pattern P in O(|P|).',
      'Whenever j == |P|, increment count and jump j = lps[j - 1] to handle overlapping matches!',
    ],
    bruteIntuition: 'Compare P against T starting at every offset i = 0..|T|-|P|.',
    bruteBangla: 'প্রতিটি অবস্থান থেকে প্যাটার্নটি ক্যারেক্টার বাই ক্যারেক্টার মিলিয়ে দেখা।',
    bruteWhyTle: 'O(n * m) fails on repetitive adversarial strings.',
    brutePseudo: 'for i: if T[i..i+m] == P: cnt++',
    betterIntuition: 'Rolling Polynomial Hash (Rabin-Karp).',
    betterBangla: 'রোলিং হ্যাশ ব্যবহার করে সাবস্ট্রিং হ্যাশ মেলানো।',
    betterTradeoff: 'Carries collision risk without double-mod hashing.',
    betterPseudo: 'compare rolling hashes mod 10^9+7',
    optimalIntuition: 'Knuth-Morris-Pratt (KMP) prefix function guarantees worst-case O(|T| + |P|) matching.',
    optimalBangla: 'KMP অ্যালগরিদমে LPS অ্যারে বানিয়ে ব্যাকট্র্যাক ছাড়া O(n + m)-এ ওভারল্যাপিংসহ সব ম্যাচ গোনা যায়।',
    optimalWhyWins: 'Deterministic linear time, zero hash collisions.',
    optimalPseudo: 'build lps(P); scan T keeping j=lps[j-1] on mismatch and on full match',
    banglaEditorial: 'KMP-র LPS অ্যারে অমিল হলেই প্যাটার্ন কতটুকু পেছাতে হবে বলে দেয়, তাই টেক্সটের পয়েন্টার কখনো পেছনে ফিরে যায় না।',
    dryRunSteps: [
      { step: 1, state: 'T="ababa", P="aba"', memoryOrStack: 'lps=[0,0,1]', note: 'Match at 0 -> j=lps[2]=1' },
      { step: 2, state: 'Continue to idx 4', memoryOrStack: 'Second match at idx 2', note: 'Total = 2' },
    ],
    solveJs(stdin) {
      const lines = stdin.trim().split(/\s+/);
      const t = lines[0] || '', p = lines[1] || '';
      if (!p.length || p.length > t.length) return '0';
      const m = p.length;
      const lps = new Int32Array(m);
      for (let i = 1, len = 0; i < m; ) {
        if (p[i] === p[len]) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
      }
      let cnt = 0;
      for (let i = 0, j = 0; i < t.length; ) {
        if (t[i] === p[j]) { i++; j++; if (j === m) { cnt++; j = lps[j - 1]; } }
        else if (j > 0) j = lps[j - 1];
        else i++;
      }
      return String(cnt);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['ababa\naba', 'saippuakauppias\npp'];
      const hiddenInputs = ['aaaaaaa\naa', 'abc\nabcd', 'xyzxyzxyz\nxyz'];
      for (let k = 0; k < 7; k++) {
        const p = Array.from({ length: randInt(rng, 2, 4) }, () => 'ab'[randInt(rng, 0, 1)]).join('');
        const t = Array.from({ length: randInt(rng, 15, 45) }, () => 'ab'[randInt(rng, 0, 1)]).join('');
        hiddenInputs.push(`${t}\n${p}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    // Read text and pattern\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string t, p; cin >> t >> p;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nt, p = sys.stdin.read().split()\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String t = sc.next(), p = sc.next();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [t, p] = raw.trim().split(/\\s+/);\n`,
      typescript: `import * as fs from 'fs';\nconst parts: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>
static char T[200005], P[200005];
int main(void) {
    if (scanf("%200000s %200000s", T, P) != 2) return 0;
    int n = strlen(T), m = strlen(P);
    int *lps = calloc(m, sizeof(int));
    for (int i = 1, len = 0; i < m; ) {
        if (P[i] == P[len]) lps[i++] = ++len;
        else if (len) len = lps[len - 1];
        else lps[i++] = 0;
    }
    int cnt = 0;
    for (int i = 0, j = 0; i < n; ) {
        if (T[i] == P[j]) { i++; j++; if (j == m) { cnt++; j = lps[j - 1]; } }
        else if (j) j = lps[j - 1];
        else i++;
    }
    printf("%d\\n", cnt);
    free(lps);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string t, p; cin >> t >> p;
    int n = t.size(), m = p.size();
    vector<int> lps(m, 0);
    for (int i = 1, len = 0; i < m; ) {
        if (p[i] == p[len]) lps[i++] = ++len;
        else if (len) len = lps[len - 1];
        else lps[i++] = 0;
    }
    int cnt = 0;
    for (int i = 0, j = 0; i < n; ) {
        if (t[i] == p[j]) { i++; j++; if (j == m) { cnt++; j = lps[j - 1]; } }
        else if (j) j = lps[j - 1];
        else i++;
    }
    cout << cnt << '\\n';
    return 0;
}`,
      python: `import sys
t, p = sys.stdin.read().split()
n, m = len(t), len(p)
lps = [0] * m
i, length = 1, 0
while i < m:
    if p[i] == p[length]:
        length += 1; lps[i] = length; i += 1
    elif length: length = lps[length - 1]
    else: i += 1
cnt = i = j = 0
while i < n:
    if t[i] == p[j]:
        i += 1; j += 1
        if j == m: cnt += 1; j = lps[j - 1]
    elif j: j = lps[j - 1]
    else: i += 1
print(cnt)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String t = sc.next(), p = sc.next();
        int n = t.length(), m = p.length();
        int[] lps = new int[m];
        for (int i = 1, len = 0; i < m; ) {
            if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
            else if (len > 0) len = lps[len - 1];
            else lps[i++] = 0;
        }
        int cnt = 0;
        for (int i = 0, j = 0; i < n; ) {
            if (t.charAt(i) == p.charAt(j)) { i++; j++; if (j == m) { cnt++; j = lps[j - 1]; } }
            else if (j > 0) j = lps[j - 1];
            else i++;
        }
        System.out.println(cnt);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [t, p] = raw.trim().split(/\\s+/);
const m = p.length, lps = Array(m).fill(0);
for (let i = 1, len = 0; i < m; ) {
  if (p[i] === p[len]) lps[i++] = ++len;
  else if (len) len = lps[len - 1];
  else lps[i++] = 0;
}
let cnt = 0;
for (let i = 0, j = 0; i < t.length; ) {
  if (t[i] === p[j]) { i++; j++; if (j === m) { cnt++; j = lps[j - 1]; } }
  else if (j) j = lps[j - 1];
  else i++;
}
console.log(cnt);`,
      typescript: `import * as fs from 'fs';
const parts: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const t: string = parts[0], p: string = parts[1];
const m: number = p.length, lps: number[] = new Array<number>(m).fill(0);
for (let i = 1, len = 0; i < m; ) {
  if (p[i] === p[len]) lps[i++] = ++len;
  else if (len) len = lps[len - 1];
  else lps[i++] = 0;
}
let cnt: number = 0;
for (let i = 0, j = 0; i < t.length; ) {
  if (t[i] === p[j]) { i++; j++; if (j === m) { cnt++; j = lps[j - 1]; } }
  else if (j) j = lps[j - 1];
  else i++;
}
console.log(cnt);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let t = it.next().unwrap().as_bytes();
    let p = it.next().unwrap().as_bytes();
    let m = p.len();
    let mut lps = vec![0usize; m];
    let (mut i, mut len) = (1, 0);
    while i < m {
        if p[i] == p[len] { len += 1; lps[i] = len; i += 1; }
        else if len > 0 { len = lps[len - 1]; }
        else { i += 1; }
    }
    let (mut ti, mut j, mut cnt) = (0, 0, 0);
    while ti < t.len() {
        if t[ti] == p[j] { ti += 1; j += 1; if j == m { cnt += 1; j = lps[j - 1]; } }
        else if j > 0 { j = lps[j - 1]; }
        else { ti += 1; }
    }
    println!("{}", cnt);
}`,
    },
  },

  edit_distance_levenshtein: {
    id: 'edit_distance_levenshtein',
    defaultTopic: 'Dynamic Programming',
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(m)',
    bruteComplexity: 'O(3^(n+m))',
    betterComplexity: 'O(n * m)',
    inputFormat: 'First line: string A. Second line: string B (1 <= |A|, |B| <= 1000).',
    outputFormat: 'Single integer: minimum number of insert, delete, or replace operations to transform A into B.',
    constraints: ['1 <= |A|, |B| <= 1000', 'Lowercase English letters'],
    hints: [
      'Define dp[i][j] as edit distance between A[0..i) and B[0..j).',
      'If A[i-1] == B[j-1], dp[i][j] = dp[i-1][j-1].',
      'Otherwise take 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) (delete, insert, replace).',
    ],
    bruteIntuition: 'Recursive branching over insert, delete, and replace at every mismatch.',
    bruteBangla: 'প্রতিটি অমিল স্থানে ৩টি অপারেশন রিকার্শনে চেষ্টা করা।',
    bruteWhyTle: 'Exponential O(3^(n+m)) explodes past length 12.',
    brutePseudo: 'f(i,j): 1 + min(f(i-1,j), f(i,j-1), f(i-1,j-1))',
    betterIntuition: 'Full 2D DP matrix dp[n+1][m+1].',
    betterBangla: 'সম্পূর্ণ ২ডি টেবিল dp[n+1][m+1] তৈরি করা।',
    betterTradeoff: 'Uses O(n * m) memory when rolling 1D row needs only O(m).',
    betterPseudo: '2D table of size (n+1)x(m+1)',
    optimalIntuition: 'Space-optimized rolling 1D DP computes Levenshtein distance in O(n * m) time and O(m) memory.',
    optimalBangla: 'দুটি রো বা সিঙ্গেল রো রোলিং ডিপি ব্যবহার করে মাত্র O(m) মেমোরিতে এডিট ডিস্ট্যান্স বের করা যায়।',
    optimalWhyWins: 'Cache-friendly O(m) memory footprint.',
    optimalPseudo: 'prev[j]=j; for i=1..n: cur[0]=i; update cur[j] from prev[j-1], prev[j], cur[j-1]',
    banglaEditorial: 'দুটি স্ট্রিং-এর মিল থাকলে ডায়াগোনাল থেকে মান আসে, আর অমিল হলে ইনসার্ট/ডিলিট/রিপ্লেসের মধ্যে সর্বনিম্ন + ১ নিতে হয়।',
    dryRunSteps: [
      { step: 1, state: 'A="horse", B="ros"', memoryOrStack: 'h->r, del r, del e', note: 'Min edits = 3' },
    ],
    solveJs(stdin) {
      const [a, b] = stdin.trim().split(/\s+/);
      const n = a.length, m = b.length;
      let prev = Array.from({ length: m + 1 }, (_, j) => j);
      for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1);
        cur[0] = i;
        for (let j = 1; j <= m; j++) {
          if (a[i - 1] === b[j - 1]) cur[j] = prev[j - 1];
          else cur[j] = 1 + Math.min(prev[j], cur[j - 1], prev[j - 1]);
        }
        prev = cur;
      }
      return String(prev[m]);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['horse\nros', 'intention\nexecution'];
      const hiddenInputs = ['a\na', 'abc\nabc', 'kitten\nsitting', 'love\nmovie'];
      const chars = 'abcdex';
      for (let k = 0; k < 6; k++) {
        const s1 = Array.from({ length: randInt(rng, 5, 16) }, () => chars[randInt(rng, 0, 5)]).join('');
        const s2 = Array.from({ length: randInt(rng, 5, 16) }, () => chars[randInt(rng, 0, 5)]).join('');
        hiddenInputs.push(`${s1}\n${s2}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    // Read two strings\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string a, b; cin >> a >> b;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\na, b = sys.stdin.read().split()\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next(), b = sc.next();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/);\n`,
      typescript: `import * as fs from 'fs';\nconst p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int mn3(int a, int b, int c) { int m = a < b ? a : b; return m < c ? m : c; }
int main(void) {
    char A[1005], B[1005];
    if (scanf("%1000s %1000s", A, B) != 2) return 0;
    int n = strlen(A), m = strlen(B);
    int *prev = malloc((m + 1) * sizeof(int)), *cur = malloc((m + 1) * sizeof(int));
    for (int j = 0; j <= m; j++) prev[j] = j;
    for (int i = 1; i <= n; i++) {
        cur[0] = i;
        for (int j = 1; j <= m; j++) {
            if (A[i - 1] == B[j - 1]) cur[j] = prev[j - 1];
            else cur[j] = 1 + mn3(prev[j], cur[j - 1], prev[j - 1]);
        }
        int *tmp = prev; prev = cur; cur = tmp;
    }
    printf("%d\\n", prev[m]);
    free(prev); free(cur);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    string a, b; cin >> a >> b;
    int n = a.size(), m = b.size();
    vector<int> prev(m + 1), cur(m + 1);
    for (int j = 0; j <= m; j++) prev[j] = j;
    for (int i = 1; i <= n; i++) {
        cur[0] = i;
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) cur[j] = prev[j - 1];
            else cur[j] = 1 + min({prev[j], cur[j - 1], prev[j - 1]});
        }
        swap(prev, cur);
    }
    cout << prev[m] << '\\n';
    return 0;
}`,
      python: `import sys
a, b = sys.stdin.read().split()
n, m = len(a), len(b)
prev = list(range(m + 1))
for i in range(1, n + 1):
    cur = [i] + [0] * m
    for j in range(1, m + 1):
        if a[i - 1] == b[j - 1]: cur[j] = prev[j - 1]
        else: cur[j] = 1 + min(prev[j], cur[j - 1], prev[j - 1])
    prev = cur
print(prev[m])`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.next(), b = sc.next();
        int n = a.length(), m = b.length();
        int[] prev = new int[m + 1], cur = new int[m + 1];
        for (int j = 0; j <= m; j++) prev[j] = j;
        for (int i = 1; i <= n; i++) {
            cur[0] = i;
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) cur[j] = prev[j - 1];
                else cur[j] = 1 + Math.min(prev[j], Math.min(cur[j - 1], prev[j - 1]));
            }
            int[] tmp = prev; prev = cur; cur = tmp;
        }
        System.out.println(prev[m]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
const n = a.length, m = b.length;
let prev = Array.from({ length: m + 1 }, (_, j) => j);
for (let i = 1; i <= n; i++) {
  const cur = Array(m + 1).fill(0); cur[0] = i;
  for (let j = 1; j <= m; j++) {
    cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j], cur[j - 1], prev[j - 1]);
  }
  prev = cur;
}
console.log(prev[m]);`,
      typescript: `import * as fs from 'fs';
const parts: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const a: string = parts[0], b: string = parts[1];
const n: number = a.length, m: number = b.length;
let prev: number[] = Array.from({ length: m + 1 }, (_, j) => j);
for (let i = 1; i <= n; i++) {
  const cur: number[] = new Array<number>(m + 1).fill(0); cur[0] = i;
  for (let j = 1; j <= m; j++) {
    cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j], cur[j - 1], prev[j - 1]);
  }
  prev = cur;
}
console.log(prev[m]);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a = it.next().unwrap().as_bytes();
    let b = it.next().unwrap().as_bytes();
    let (n, m) = (a.len(), b.len());
    let mut prev: Vec<usize> = (0..=m).collect();
    let mut cur = vec![0usize; m + 1];
    for i in 1..=n {
        cur[0] = i;
        for j in 1..=m {
            cur[j] = if a[i - 1] == b[j - 1] { prev[j - 1] }
                     else { 1 + prev[j].min(cur[j - 1]).min(prev[j - 1]) };
        }
        std::mem::swap(&mut prev, &mut cur);
    }
    println!("{}", prev[m]);
}`,
    },
  },

  trie_prefix_count: {
    id: 'trie_prefix_count',
    defaultTopic: 'Tries',
    timeComplexity: 'O(totalChars)',
    spaceComplexity: 'O(totalChars)',
    bruteComplexity: 'O(q * n * len)',
    betterComplexity: 'O(n log n + q log n)',
    inputFormat: 'First line: n (words) and q (prefix queries). Next n lines: dictionary words. Next q lines: query prefixes.',
    outputFormat: 'Print q lines, each with the count of dictionary words starting with that prefix.',
    constraints: ['1 <= n, q <= 10^4', 'Total characters <= 10^5', 'Lowercase English letters'],
    hints: [
      'Insert every word character-by-character into a Trie, incrementing `passCount` at each visited node.',
      'For each prefix query, walk down the Trie along the prefix characters.',
      'If any character edge is missing, return 0; otherwise return node.passCount!',
    ],
    bruteIntuition: 'For each query, scan all n words and check startsWith.',
    bruteBangla: 'প্রতিটি প্রিফিক্স কুয়েরির জন্য সব শব্দ ঘুরে startsWith চেক করা।',
    bruteWhyTle: 'O(q * n * len) times out on 10^4 words and queries.',
    brutePseudo: 'for p in queries: count(w.startsWith(p) for w in words)',
    betterIntuition: 'Sort words and binary search range [prefix, prefix + "~"].',
    betterBangla: 'শব্দগুলো সর্ট করে প্রিফিক্স রেঞ্জের ওপর বাইনারি সার্চ চালানো।',
    betterTradeoff: 'Requires O(len * log n) string comparisons per query instead of O(len).',
    betterPseudo: 'bisect_left(prefix + "~") - bisect_left(prefix)',
    optimalIntuition: 'Prefix Trie tracks passCount at every node for exact O(|prefix|) query latency.',
    optimalBangla: 'ট্রাই-এর প্রতিটি নোডে passCount রাখলে প্রিফিক্সটির দৈর্ঘ্য অনুযায়ী O(|P|) সময়ে উত্তর আসে।',
    optimalWhyWins: 'Optimal O(total characters) construction and O(|P|) per query.',
    optimalPseudo: 'insert(w): walk/create child, node.cnt++; query(p): walk child, return node.cnt',
    banglaEditorial: 'Trie ডাটা স্ট্রাকচারে শব্দ যোগ করার সময় প্রতিটি নোডের passCount বাড়ালে যেকোনো প্রিফিক্স কতটি শব্দে আছে তা সাথে সাথে পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'words=["apple","app","apricot"]', memoryOrStack: 'a(3)->p(3)->p(2)', note: 'Query "ap"=3, "app"=2' },
    ],
    solveJs(stdin) {
      const tokens = stdin.trim().split(/\s+/);
      const n = Number(tokens[0]), q = Number(tokens[1]);
      const words = tokens.slice(2, 2 + n).sort();
      const queries = tokens.slice(2 + n, 2 + n + q);
      const lb = (s: string) => {
        let l = 0, r = n;
        while (l < r) { const m = (l + r) >> 1; if (words[m] < s) l = m + 1; else r = m; }
        return l;
      };
      return queries.map((p) => String(lb(p + '\uffff') - lb(p))).join('\n');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['4 3\napple\napp\napricot\nbanana\nap\napp\nba', '3 2\ncode\ncoder\ncoding\nco\nz'];
      const hiddenInputs = ['1 2\na\na\nb'];
      const pool = ['al', 'ar', 'ba', 'be', 'ca', 'co', 'da', 'de'];
      for (let k = 0; k < 9; k++) {
        const n = randInt(rng, 5, 20), q = randInt(rng, 3, 7);
        const ws = Array.from({ length: n }, () => pool[randInt(rng, 0, pool.length - 1)] + 'abc'[randInt(rng, 0, 2)] + 'xyz'[randInt(rng, 0, 2)]);
        const qs = Array.from({ length: q }, () => pool[randInt(rng, 0, pool.length - 1)] + (rng() < 0.5 ? 'a' : ''));
        hiddenInputs.push(`${n} ${q}\n${ws.join('\n')}\n${qs.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, q; scanf("%d %d", &n, &q);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, q; cin >> n >> q;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\ntok = sys.stdin.read().split()\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), q = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst tok = raw.trim().split(/\\s+/);\n`,
      typescript: `import * as fs from 'fs';\nconst tok: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct { int next[26]; int cnt; } Node;
static Node tr[100005];
static int sz = 1;
static char buf[100005];
int main(void) {
    int n, q; if (scanf("%d %d", &n, &q) != 2) return 0;
    for (int i = 0; i < n; i++) {
        scanf("%100000s", buf);
        int u = 0;
        for (int j = 0; buf[j]; j++) {
            int c = buf[j] - 'a';
            if (!tr[u].next[c]) tr[u].next[c] = sz++;
            u = tr[u].next[c]; tr[u].cnt++;
        }
    }
    while (q--) {
        scanf("%100000s", buf);
        int u = 0, ok = 1;
        for (int j = 0; buf[j]; j++) {
            int c = buf[j] - 'a';
            if (!tr[u].next[c]) { ok = 0; break; }
            u = tr[u].next[c];
        }
        printf("%d\\n", ok ? tr[u].cnt : 0);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <array>
#include <string>
using namespace std;
struct Node { array<int, 26> ch{}; int cnt = 0; };
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, q; cin >> n >> q;
    vector<Node> tr(1);
    for (int i = 0; i < n; i++) {
        string w; cin >> w; int u = 0;
        for (char ch : w) {
            int c = ch - 'a';
            if (!tr[u].ch[c]) { tr[u].ch[c] = tr.size(); tr.emplace_back(); }
            u = tr[u].ch[c]; tr[u].cnt++;
        }
    }
    while (q--) {
        string p; cin >> p; int u = 0; bool ok = true;
        for (char ch : p) {
            int c = ch - 'a';
            if (!tr[u].ch[c]) { ok = false; break; }
            u = tr[u].ch[c];
        }
        cout << (ok ? tr[u].cnt : 0) << '\\n';
    }
    return 0;
}`,
      python: `import sys
tok = sys.stdin.read().split()
n, q = int(tok[0]), int(tok[1])
root = {}
for w in tok[2:2+n]:
    cur = root
    for ch in w:
        nxt = cur.get(ch)
        if nxt is None:
            nxt = [0, {}]
            cur[ch] = nxt
        nxt[0] += 1
        cur = nxt[1]
out = []
for p in tok[2+n:2+n+q]:
    cur = root; cnt = 0; ok = True
    for ch in p:
        nxt = cur.get(ch)
        if nxt is None: ok = False; break
        cnt = nxt[0]; cur = nxt[1]
    out.append(str(cnt if ok else 0))
print("\\n".join(out))`,
      java: `import java.util.*;
public class Main {
    static class Node { Node[] ch = new Node[26]; int cnt; }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        Node root = new Node();
        for (int i = 0; i < n; i++) {
            String w = sc.next(); Node u = root;
            for (int j = 0; j < w.length(); j++) {
                int c = w.charAt(j) - 'a';
                if (u.ch[c] == null) u.ch[c] = new Node();
                u = u.ch[c]; u.cnt++;
            }
        }
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            String p = sc.next(); Node u = root;
            for (int j = 0; j < p.length() && u != null; j++) u = u.ch[p.charAt(j) - 'a'];
            sb.append(u == null ? 0 : u.cnt).append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tok = raw.trim().split(/\\s+/);
const n = Number(tok[0]), q = Number(tok[1]);
const words = tok.slice(2, 2 + n).sort();
const lb = (s) => { let l = 0, r = n; while (l < r) { const m = (l + r) >> 1; if (words[m] < s) l = m + 1; else r = m; } return l; };
const out = [];
for (let i = 0; i < q; i++) { const p = tok[2 + n + i]; out.push(lb(p + '\\uffff') - lb(p)); }
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const tok: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tok[0]), q: number = Number(tok[1]);
const words: string[] = tok.slice(2, 2 + n).sort();
function lb(s: string): number { let l: number = 0, r: number = n; while (l < r) { const m: number = (l + r) >> 1; if (words[m] < s) l = m + 1; else r = m; } return l; }
const out: number[] = [];
for (let i = 0; i < q; i++) { const p: string = tok[2 + n + i]; out.push(lb(p + '\\uffff') - lb(p)); }
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
#[derive(Default)]
struct Node { ch: [usize; 26], cnt: usize }
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let tok: Vec<&str> = s.split_whitespace().collect();
    let n: usize = tok[0].parse().unwrap();
    let q: usize = tok[1].parse().unwrap();
    let mut tr = vec![Node::default()];
    for &w in &tok[2..2 + n] {
        let mut u = 0;
        for &b in w.as_bytes() {
            let c = (b - b'a') as usize;
            if tr[u].ch[c] == 0 { tr[u].ch[c] = tr.len(); tr.push(Node::default()); }
            u = tr[u].ch[c]; tr[u].cnt += 1;
        }
    }
    for &p in &tok[2 + n..2 + n + q] {
        let mut u = 0; let mut ok = true;
        for &b in p.as_bytes() {
            let c = (b - b'a') as usize;
            if tr[u].ch[c] == 0 { ok = false; break; }
            u = tr[u].ch[c];
        }
        println!("{}", if ok { tr[u].cnt } else { 0 });
    }
}`,
    },
  },
};
