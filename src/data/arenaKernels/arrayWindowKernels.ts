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

export const ARRAY_WINDOW_KERNELS: Record<string, ArenaKernel> = {
  two_sum_indices: {
    id: 'two_sum_indices',
    defaultTopic: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: two integers n and target (2 <= n <= 2*10^5). Second line: n integers.',
    outputFormat: 'Print 0-based indices i j (i < j) of the first pair summing to target (earliest second index j, smallest i), or -1 -1 if none.',
    constraints: ['2 <= n <= 2 * 10^5', '-10^9 <= a[i], target <= 10^9'],
    hints: [
      'Iterate j from 0 to n-1 and look up complement = target - a[j] in a hash map.',
      'Store value -> earliest index in the map after checking complement.',
      'Checking as you scan left-to-right guarantees smallest second index j.',
    ],
    bruteIntuition: 'Check all pairs (i, j) with i < j using nested loops.',
    bruteBangla: 'দুটি নেস্টেড লুপ চালিয়ে প্রতিটি জোড়ার যোগফল target কি না দেখা।',
    bruteWhyTle: 'O(n^2) exceeds 10^8 operations when n = 2*10^5.',
    brutePseudo: 'for j in 0..n: for i in 0..j: if a[i]+a[j]==target return i,j',
    betterIntuition: 'Sort value-index pairs and run Two Pointers from both ends.',
    betterBangla: 'মান ও ইনডেক্স জোড়া করে সর্ট করে টু-পয়েন্টার চালানো।',
    betterTradeoff: 'O(n log n) sorting time and does not naturally give earliest second index without extra work.',
    betterPseudo: 'sort pairs; l=0, r=n-1; move inward',
    optimalIntuition: 'Single-pass hash table mapping seen values to earliest index achieves O(n) lookup.',
    optimalBangla: 'হ্যাশ ম্যাপে প্রতিটি সংখ্যার ইনডেক্স রেখে target - a[j] আগে এসেছে কি না O(1)-এ চেক করো।',
    optimalWhyWins: 'Guaranteed O(n) average time and deterministic earliest j match.',
    optimalPseudo: 'seen = {}; for j=0..n-1: if target-a[j] in seen: return seen[target-a[j]], j; seen.setdefault(a[j], j)',
    banglaEditorial: 'বাম থেকে ডানে স্ক্যান করে প্রতিটি উপাদানের জন্য complement = target - a[j] হ্যাশম্যাপে খুঁজলে O(n)-এ উত্তর আসে।',
    dryRunSteps: [
      { step: 1, state: 'nums=[2,7,11,15], target=9', memoryOrStack: 'j=0: seen={2:0}', note: 'need 7' },
      { step: 2, state: 'j=1: val=7, need=2', memoryOrStack: '2 found at index 0', note: 'Output: 0 1' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], target = d[1];
      const seen = new Map<number, number>();
      for (let j = 0; j < n; j++) {
        const v = d[2 + j];
        const need = target - v;
        if (seen.has(need)) return `${seen.get(need)} ${j}`;
        if (!seen.has(v)) seen.set(v, j);
      }
      return '-1 -1';
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['4 9\n2 7 11 15', '3 6\n3 2 4'];
      const hiddenInputs = ['2 6\n3 3', '4 100\n1 2 3 4', '5 0\n-5 2 8 5 10'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 6, 30);
        const arr = Array.from({ length: n }, () => randInt(rng, -40, 40));
        const i = randInt(rng, 0, n - 2), j = randInt(rng, i + 1, n - 1);
        const target = k === 6 ? 999999 : arr[i] + arr[j];
        hiddenInputs.push(`${n} ${target}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; long long t; scanf("%d %lld", &n, &t);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; long long t; cin >> n >> t;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long t = sc.nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
typedef struct { long long val; int idx; } Pair;
int cmp(const void *a, const void *b) {
    long long x = ((const Pair*)a)->val, y = ((const Pair*)b)->val;
    if (x != y) return x < y ? -1 : 1;
    return ((const Pair*)a)->idx - ((const Pair*)b)->idx;
}
int main(void) {
    int n; long long target; if (scanf("%d %lld", &n, &target) != 2) return 0;
    long long *a = malloc(n * sizeof(long long));
    Pair *p = malloc(n * sizeof(Pair));
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); p[i].val = a[i]; p[i].idx = i; }
    qsort(p, n, sizeof(Pair), cmp);
    int bestJ = n + 1, bestI = -1;
    for (int j = 0; j < n; j++) {
        long long need = target - a[j];
        int l = 0, r = n - 1, found = -1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (p[m].val >= need) { if (p[m].val == need) found = m; r = m - 1; }
            else l = m + 1;
        }
        if (found != -1 && p[found].idx < j) { bestI = p[found].idx; bestJ = j; break; }
    }
    if (bestI == -1) printf("-1 -1\\n"); else printf("%d %d\\n", bestI, bestJ);
    free(a); free(p);
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; long long target; cin >> n >> target;
    unordered_map<long long, int> seen;
    for (int j = 0; j < n; j++) {
        long long v; cin >> v;
        auto it = seen.find(target - v);
        if (it != seen.end()) { cout << it->second << ' ' << j << '\\n'; return 0; }
        seen.emplace(v, j);
    }
    cout << "-1 -1\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, target = d[0], d[1]
seen = {}
for j in range(n):
    v = d[2 + j]
    if target - v in seen:
        print(seen[target - v], j)
        sys.exit(0)
    if v not in seen: seen[v] = j
print("-1 -1")`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long target = sc.nextLong();
        Map<Long, Integer> seen = new HashMap<>();
        for (int j = 0; j < n; j++) {
            long v = sc.nextLong();
            if (seen.containsKey(target - v)) { System.out.println(seen.get(target - v) + " " + j); return; }
            seen.putIfAbsent(v, j);
        }
        System.out.println("-1 -1");
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], target = d[1], seen = new Map();
let ans = '-1 -1';
for (let j = 0; j < n; j++) {
  const v = d[2 + j], need = target - v;
  if (seen.has(need)) { ans = seen.get(need) + ' ' + j; break; }
  if (!seen.has(v)) seen.set(v, j);
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], target: number = d[1];
const seen: Map<number, number> = new Map<number, number>();
let ans: string = '-1 -1';
for (let j = 0; j < n; j++) {
  const v: number = d[2 + j], need: number = target - v;
  if (seen.has(need)) { ans = String(seen.get(need)) + ' ' + String(j); break; }
  if (!seen.has(v)) seen.set(v, j);
}
console.log(ans);`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (d[0] as usize, d[1]);
    let mut seen: HashMap<i64, usize> = HashMap::new();
    for j in 0..n {
        let v = d[2 + j];
        if let Some(&i) = seen.get(&(target - v)) { println!("{} {}", i, j); return; }
        seen.entry(v).or_insert(j);
    }
    println!("-1 -1");
}`,
    },
  },

  kadane_max_subarray: {
    id: 'kadane_max_subarray',
    defaultTopic: "Kadane's",
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: integer n (1 <= n <= 2*10^5). Second line: n integers (can be all negative).',
    outputFormat: 'Single 64-bit integer: maximum sum of any non-empty contiguous subarray.',
    constraints: ['1 <= n <= 2 * 10^5', '-10^9 <= a[i] <= 10^9', 'Use 64-bit integer for sum!'],
    hints: [
      'Notice the subarray must be NON-EMPTY (handle all-negative arrays without returning 0).',
      'At index i, best ending at i is max(a[i], cur + a[i]).',
      'Initialize both cur and best to a[0].',
    ],
    bruteIntuition: 'Enumerate every pair (l, r) and compute subarray sum.',
    bruteBangla: 'সব (l, r) জোড়ার সাব-অ্যারে যোগফল বের করে সর্বোচ্চ মান নেওয়া।',
    bruteWhyTle: 'O(n^2) times out for n = 2*10^5.',
    brutePseudo: 'for l: sum=0; for r>=l: sum+=a[r]; best=max(best,sum)',
    betterIntuition: 'Divide and conquer splitting at midpoint, computing crossing suffix + prefix max.',
    betterBangla: 'মাঝখান থেকে ভাগ করে বাম, ডান ও ক্রসিং অংশের সর্বোচ্চ যোগফল মেলানো।',
    betterTradeoff: 'O(n log n) time and O(log n) recursion stack.',
    betterPseudo: 'max(leftBest, rightBest, maxSuffixLeft + maxPrefixRight)',
    optimalIntuition: "Kadane's DP tracks max subarray ending at current index in O(n) time and O(1) space.",
    optimalBangla: 'কাডানে অ্যালগরিদমে প্রতিটি ঘরে গিয়ে হয় নতুন সাব-অ্যারে শুরু করি অথবা আগের cur-এর সাথে যোগ করি।',
    optimalWhyWins: 'Optimal single-pass O(n) time and O(1) auxiliary space.',
    optimalPseudo: 'cur=best=a[0]; for x in a[1..]: cur=max(x, cur+x); best=max(best, cur)',
    banglaEditorial: 'সব সংখ্যা ঋণাত্মক হলে শূন্য ধরা যাবে না—তাই cur ও best দুটোই a[0] দিয়ে শুরু করে কাডানে লুপ চালাতে হবে।',
    dryRunSteps: [
      { step: 1, state: 'a=[-2, 1, -3, 4, -1, 2, 1]', memoryOrStack: 'cur=4, best=4 at idx 3', note: 'Reset cur at 4' },
      { step: 2, state: 'Continue to +2, +1', memoryOrStack: 'cur=6, best=6', note: 'Subarray [4,-1,2,1] = 6' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      let cur = d[1], best = d[1];
      for (let i = 2; i <= n; i++) {
        cur = Math.max(d[i], cur + d[i]);
        best = Math.max(best, cur);
      }
      return String(best);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['9\n-2 1 -3 4 -1 2 1 -5 4', '4\n-8 -3 -6 -2'];
      const hiddenInputs = ['1\n-100', '5\n1 2 3 4 5', '4\n1000000000 1000000000 -1 1000000000'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 30);
        const arr = Array.from({ length: n }, () => randInt(rng, -50, 50));
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
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    long long v, cur, best;
    scanf("%lld", &v); cur = best = v;
    for (int i = 1; i < n; i++) {
        scanf("%lld", &v);
        cur = (v > cur + v) ? v : (cur + v);
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    return 0;
}`,
      cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    long long v; cin >> v;
    long long cur = v, best = v;
    for (int i = 1; i < n; i++) {
        cin >> v;
        cur = max(v, cur + v);
        best = max(best, cur);
    }
    cout << best << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
cur = best = d[1]
for x in d[2:1+d[0]]:
    cur = max(x, cur + x)
    best = max(best, cur)
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long cur = sc.nextLong(), best = cur;
        for (int i = 1; i < n; i++) {
            long x = sc.nextLong();
            cur = Math.max(x, cur + x);
            best = Math.max(best, cur);
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
let cur = d[1], best = d[1];
for (let i = 2; i <= d[0]; i++) { cur = Math.max(d[i], cur + d[i]); best = Math.max(best, cur); }
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let cur: number = d[1], best: number = d[1];
for (let i = 2; i <= d[0]; i++) { cur = Math.max(d[i], cur + d[i]); best = Math.max(best, cur); }
console.log(best);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut cur = d[1];
    let mut best = cur;
    for &x in &d[2..=d[0] as usize] {
        cur = x.max(cur + x);
        best = best.max(cur);
    }
    println!("{}", best);
}`,
    },
  },

  prefix_sum_queries: {
    id: 'prefix_sum_queries',
    defaultTopic: 'Prefix Sums',
    timeComplexity: 'O(n + q)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n * q)',
    betterComplexity: 'O(q * sqrt(n))',
    inputFormat: 'First line: n and q (1 <= n, q <= 2*10^5). Second line: n integers. Next q lines: two 1-based integers L, R (1 <= L <= R <= n).',
    outputFormat: 'Print q lines, each with sum of elements from index L to R inclusive (64-bit).',
    constraints: ['1 <= n, q <= 2 * 10^5', 'Use 64-bit integer prefix array!'],
    hints: [
      'Build 1-based prefix array pref[0] = 0, pref[i] = pref[i-1] + a[i].',
      'Answer any range sum [L, R] in O(1) as pref[R] - pref[L - 1].',
      'Use 64-bit integers since sum can exceed 2*10^9.',
    ],
    bruteIntuition: 'Loop from L to R on every query and accumulate sum.',
    bruteBangla: 'প্রতিটি কুয়েরির জন্য L থেকে R পর্যন্ত লুপ চালিয়ে যোগফল বের করা।',
    bruteWhyTle: 'O(n * q) = 4*10^10 operations triggers immediate TLE.',
    brutePseudo: 'for each (L, R): sum(a[L..R])',
    betterIntuition: 'Precompute block sums of size sqrt(n) for each chunk.',
    betterBangla: 'sqrt(n) আকারের ব্লক সাম প্রি-কম্পিউট করা।',
    betterTradeoff: 'O(sqrt(n)) per query vs O(1) with prefix sums.',
    betterPseudo: 'blockSum[idx/B] += a[idx]',
    optimalIntuition: '1D Prefix sum array gives exact O(1) per query after O(n) preprocessing.',
    optimalBangla: 'pref[i] = pref[i-1] + a[i] বানিয়ে রাখলে প্রতিটি রেঞ্জ যোগফল pref[R] - pref[L-1] দিয়ে O(1)-এ পাওয়া যায়।',
    optimalWhyWins: 'O(n + q) total time.',
    optimalPseudo: 'pref[i] = pref[i-1] + a[i]; query(L, R) = pref[R] - pref[L-1]',
    banglaEditorial: 'প্রিফিক্স সাম অ্যারে তৈরি করে নিলে pref[R] - pref[L-1] ব্যবহার করে O(1)-এ প্রতিটি কুয়েরি উত্তর দেওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'a=[3,2,4,5,1]', memoryOrStack: 'pref=[0,3,5,9,14,15]', note: '1-based prefix sums' },
      { step: 2, state: 'Query L=2, R=4', memoryOrStack: 'pref[4] - pref[1] = 14 - 3', note: 'Sum = 11' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], q = d[1];
      const pref = new Float64Array(n + 1);
      for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + d[1 + i];
      const out: string[] = [];
      let p = 2 + n;
      for (let i = 0; i < q; i++) {
        const L = d[p++], R = d[p++];
        out.push(String(pref[R] - pref[L - 1]));
      }
      return out.join('\n');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5 3\n3 2 4 5 1\n1 5\n2 4\n3 3', '4 2\n10 -3 7 2\n1 3\n2 4'];
      const hiddenInputs = ['1 2\n42\n1 1\n1 1'];
      for (let k = 0; k < 9; k++) {
        const n = randInt(rng, 6, 30), q = randInt(rng, 4, 10);
        const arr = Array.from({ length: n }, () => randInt(rng, -50, 100));
        const qs = Array.from({ length: q }, () => {
          const l = randInt(rng, 1, n);
          const r = randInt(rng, l, n);
          return `${l} ${r}`;
        });
        hiddenInputs.push(`${n} ${q}\n${arr.join(' ')}\n${qs.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, q; scanf("%d %d", &n, &q);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, q; cin >> n >> q;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), q = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, q; if (scanf("%d %d", &n, &q) != 2) return 0;
    long long *pref = calloc(n + 1, sizeof(long long));
    for (int i = 1; i <= n; i++) { long long v; scanf("%lld", &v); pref[i] = pref[i - 1] + v; }
    while (q--) { int l, r; scanf("%d %d", &l, &r); printf("%lld\\n", pref[r] - pref[l - 1]); }
    free(pref);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, q; cin >> n >> q;
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) { long long v; cin >> v; pref[i] = pref[i - 1] + v; }
    while (q--) { int l, r; cin >> l >> r; cout << pref[r] - pref[l - 1] << '\\n'; }
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, q = d[0], d[1]
pref = [0] * (n + 1)
for i in range(1, n + 1): pref[i] = pref[i - 1] + d[1 + i]
p = 2 + n
out = []
for _ in range(q):
    out.append(str(pref[d[p + 1]] - pref[d[p] - 1]))
    p += 2
print("\\n".join(out))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        long[] pref = new long[n + 1];
        for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + sc.nextLong();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) { int l = sc.nextInt(), r = sc.nextInt(); sb.append(pref[r] - pref[l - 1]).append('\\n'); }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], q = d[1], pref = Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + d[1 + i];
const out = [];
for (let i = 0; i < q; i++) out.push(pref[d[2 + n + 2 * i + 1]] - pref[d[2 + n + 2 * i] - 1]);
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], q: number = d[1];
const pref: number[] = new Array<number>(n + 1).fill(0);
for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + d[1 + i];
const out: number[] = [];
for (let i = 0; i < q; i++) out.push(pref[d[2 + n + 2 * i + 1]] - pref[d[2 + n + 2 * i] - 1]);
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, q) = (d[0] as usize, d[1] as usize);
    let mut pref = vec![0i64; n + 1];
    for i in 1..=n { pref[i] = pref[i - 1] + d[1 + i]; }
    for i in 0..q {
        let l = d[2 + n + 2 * i] as usize;
        let r = d[2 + n + 2 * i + 1] as usize;
        println!("{}", pref[r] - pref[l - 1]);
    }
}`,
    },
  },

  diff_array_max: {
    id: 'diff_array_max',
    defaultTopic: 'Prefix Sums',
    timeComplexity: 'O(n + q)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n * q)',
    betterComplexity: 'O(q log q)',
    inputFormat: 'First line: n and q (1 <= n, q <= 10^5). Next q lines: three integers L R val (1 <= L <= R <= n, 1 <= val <= 10^9).',
    outputFormat: 'Single 64-bit integer: maximum value in the 1-indexed zero-initialized array after all q range increments [L, R] += val.',
    constraints: ['1 <= n, q <= 10^5', '1 <= val <= 10^9'],
    hints: [
      'A Difference Array updates [L, R] by +val in O(1): diff[L] += val and diff[R + 1] -= val.',
      'After all q updates, run a single prefix sum over diff[1..n] to reconstruct final values.',
      'Track the maximum running prefix sum!',
    ],
    bruteIntuition: 'For each query, loop i from L to R and add val to arr[i].',
    bruteBangla: 'প্রতিটি আপডেটে L থেকে R পর্যন্ত লুপ চালিয়ে মান যোগ করা।',
    bruteWhyTle: 'O(n * q) reaches 10^10 operations.',
    brutePseudo: 'for (L, R, v): for i in L..R: arr[i] += v',
    betterIntuition: 'Use a Segment Tree with lazy propagation.',
    betterBangla: 'লেজি প্রোপাগেশনসহ সেগমেন্ট ট্রি ব্যবহার করা।',
    betterTradeoff: 'O((n + q) log n) and heavy implementation when updates happen strictly before queries.',
    betterPseudo: 'segtree.rangeAdd(1, 1, n, L, R, v)',
    optimalIntuition: 'Difference array records +val at L and -val at R+1, then prefix-sums in O(n + q).',
    optimalBangla: 'ডিফারেন্স অ্যারেতে diff[L] += v এবং diff[R+1] -= v বসিয়ে শেষে একবার প্রিফিক্স সাম নিলেই O(n+q)-এ উত্তর আসে।',
    optimalWhyWins: 'Optimal O(n + q) linear time.',
    optimalPseudo: 'diff[L] += v; diff[R+1] -= v; run prefix sum and track max',
    banglaEditorial: 'সবগুলো রেঞ্জ আপডেট শেষে মান চাওয়া হলে Difference Array-তে O(1)-এ আপডেট মার্ক করে শেষে একবার প্রিফিক্স সাম নিলেই সর্বোচ্চ মান পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'n=5, [1,2]+10, [2,5]+5', memoryOrStack: 'diff=[0,10,5,-10,0,0,-5]', note: '2 updates in O(1)' },
      { step: 2, state: 'Prefix sum', memoryOrStack: '[10, 15, 5, 5, 5]', note: 'Max = 15' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], q = d[1];
      const diff = new Float64Array(n + 2);
      for (let i = 0; i < q; i++) {
        const L = d[2 + 3 * i], R = d[3 + 3 * i], v = d[4 + 3 * i];
        diff[L] += v;
        diff[R + 1] -= v;
      }
      let cur = 0, mx = 0;
      for (let i = 1; i <= n; i++) {
        cur += diff[i];
        if (cur > mx) mx = cur;
      }
      return String(mx);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5 3\n1 2 100\n2 5 100\n3 4 100', '4 2\n1 4 10\n2 3 5'];
      const hiddenInputs = ['1 1\n1 1 1000000000', '5 2\n1 5 0\n2 4 7'];
      for (let k = 0; k < 8; k++) {
        const n = randInt(rng, 5, 35), q = randInt(rng, 3, 12);
        const rows = Array.from({ length: q }, () => {
          const l = randInt(rng, 1, n);
          const r = randInt(rng, l, n);
          return `${l} ${r} ${randInt(rng, 1, 500)}`;
        });
        hiddenInputs.push(`${n} ${q}\n${rows.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n, q; scanf("%d %d", &n, &q);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n, q; cin >> n >> q;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), q = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, q; if (scanf("%d %d", &n, &q) != 2) return 0;
    long long *diff = calloc(n + 2, sizeof(long long));
    while (q--) { int l, r; long long v; scanf("%d %d %lld", &l, &r, &v); diff[l] += v; diff[r + 1] -= v; }
    long long cur = 0, mx = 0;
    for (int i = 1; i <= n; i++) { cur += diff[i]; if (cur > mx) mx = cur; }
    printf("%lld\\n", mx);
    free(diff);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, q; cin >> n >> q;
    vector<long long> diff(n + 2, 0);
    while (q--) { int l, r; long long v; cin >> l >> r >> v; diff[l] += v; diff[r + 1] -= v; }
    long long cur = 0, mx = 0;
    for (int i = 1; i <= n; i++) { cur += diff[i]; mx = max(mx, cur); }
    cout << mx << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, q = d[0], d[1]
diff = [0] * (n + 2)
for i in range(q):
    l, r, v = d[2 + 3*i], d[3 + 3*i], d[4 + 3*i]
    diff[l] += v
    diff[r + 1] -= v
cur = mx = 0
for i in range(1, n + 1):
    cur += diff[i]
    if cur > mx: mx = cur
print(mx)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        long[] diff = new long[n + 2];
        while (q-- > 0) { int l = sc.nextInt(), r = sc.nextInt(); long v = sc.nextLong(); diff[l] += v; diff[r + 1] -= v; }
        long cur = 0, mx = 0;
        for (int i = 1; i <= n; i++) { cur += diff[i]; if (cur > mx) mx = cur; }
        System.out.println(mx);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], q = d[1], diff = Array(n + 2).fill(0);
for (let i = 0; i < q; i++) { diff[d[2 + 3*i]] += d[4 + 3*i]; diff[d[3 + 3*i] + 1] -= d[4 + 3*i]; }
let cur = 0, mx = 0;
for (let i = 1; i <= n; i++) { cur += diff[i]; if (cur > mx) mx = cur; }
console.log(mx);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], q: number = d[1];
const diff: number[] = new Array<number>(n + 2).fill(0);
for (let i = 0; i < q; i++) { diff[d[2 + 3*i]] += d[4 + 3*i]; diff[d[3 + 3*i] + 1] -= d[4 + 3*i]; }
let cur: number = 0, mx: number = 0;
for (let i = 1; i <= n; i++) { cur += diff[i]; if (cur > mx) mx = cur; }
console.log(mx);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, q) = (d[0] as usize, d[1] as usize);
    let mut diff = vec![0i64; n + 2];
    for i in 0..q {
        let l = d[2 + 3 * i] as usize;
        let r = d[3 + 3 * i] as usize;
        let v = d[4 + 3 * i];
        diff[l] += v; diff[r + 1] -= v;
    }
    let (mut cur, mut mx) = (0i64, 0i64);
    for i in 1..=n { cur += diff[i]; mx = mx.max(cur); }
    println!("{}", mx);
}`,
    },
  },

  sliding_window_fixed_max_sum: {
    id: 'sliding_window_fixed_max_sum',
    defaultTopic: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n * k)',
    betterComplexity: 'O(n)',
    inputFormat: 'First line: two integers n and k (1 <= k <= n <= 2*10^5). Second line: n integers.',
    outputFormat: 'Single 64-bit integer: maximum sum of any contiguous subarray of exact length k.',
    constraints: ['1 <= k <= n <= 2 * 10^5', '-10^9 <= a[i] <= 10^9'],
    hints: [
      'Maintain the sum of the current window of size k.',
      'Slide one step right by adding a[i] and subtracting a[i - k].',
      'Track maximum over all n - k + 1 windows.',
    ],
    bruteIntuition: 'Recompute sum of all k elements from scratch for each start index.',
    bruteBangla: 'প্রতিটি শুরুর ইনডেক্স থেকে k-টি উপাদান নতুন করে যোগ করা।',
    bruteWhyTle: 'O(n * k) degrades to 10^10 operations when k = n / 2.',
    brutePseudo: 'for i in 0..n-k: sum(a[i..i+k-1])',
    betterIntuition: 'Build full prefix sum array of size n + 1 and query pref[i] - pref[i - k].',
    betterBangla: 'অতিরিক্ত O(n) প্রিফিক্স সাম অ্যারে বানিয়ে রেঞ্জ যোগফল বের করা।',
    betterTradeoff: 'Requires O(n) prefix array instead of O(1) sliding scalar if array is already stored.',
    betterPseudo: 'max(pref[i] - pref[i - k])',
    optimalIntuition: 'Fixed-size sliding window updates sum in O(1) per step.',
    optimalBangla: 'উইন্ডো ডানে সরালে নতুন উপাদান যোগ করে এবং বের হয়ে যাওয়া উপাদান বিয়োগ করে O(n)-এ সমাধান।',
    optimalWhyWins: 'Single linear pass.',
    optimalPseudo: 'win = sum(a[0..k]); best = win; for i=k..n-1: win += a[i]-a[i-k]; best=max(best,win)',
    banglaEditorial: 'ফিক্সড সাইজের স্লাইডিং উইন্ডোতে আগের যোগফল থেকে বামের সংখ্যা বাদ দিয়ে ডানের নতুন সংখ্যা যোগ করলেই O(n)-এ উত্তর আসে।',
    dryRunSteps: [
      { step: 1, state: 'a=[2,1,5,1,3,2], k=3', memoryOrStack: 'win=2+1+5=8', note: 'best=8' },
      { step: 2, state: 'Slide to [1,5,1], [5,1,3]', memoryOrStack: 'win=7, then 9', note: 'best=9' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], k = d[1];
      let win = 0;
      for (let i = 0; i < k; i++) win += d[2 + i];
      let best = win;
      for (let i = k; i < n; i++) {
        win += d[2 + i] - d[2 + i - k];
        if (win > best) best = win;
      }
      return String(best);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['6 3\n2 1 5 1 3 2', '4 2\n-5 -2 -1 -9'];
      const hiddenInputs = ['1 1\n7', '5 5\n1 2 3 4 5'];
      for (let t = 0; t < 8; t++) {
        const n = randInt(rng, 5, 30), k = randInt(rng, 1, n);
        const arr = Array.from({ length: n }, () => randInt(rng, -40, 60));
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
int main(void) {
    int n, k; if (scanf("%d %d", &n, &k) != 2) return 0;
    long long *a = malloc(n * sizeof(long long)), win = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); if (i < k) win += a[i]; }
    long long best = win;
    for (int i = k; i < n; i++) { win += a[i] - a[i - k]; if (win > best) best = win; }
    printf("%lld\\n", best);
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, k; cin >> n >> k;
    vector<long long> a(n);
    long long win = 0;
    for (int i = 0; i < n; i++) { cin >> a[i]; if (i < k) win += a[i]; }
    long long best = win;
    for (int i = k; i < n; i++) { win += a[i] - a[i - k]; best = max(best, win); }
    cout << best << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
a = d[2:2+n]
win = sum(a[:k])
best = win
for i in range(k, n):
    win += a[i] - a[i - k]
    if win > best: best = win
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        long[] a = new long[n]; long win = 0;
        for (int i = 0; i < n; i++) { a[i] = sc.nextLong(); if (i < k) win += a[i]; }
        long best = win;
        for (int i = k; i < n; i++) { win += a[i] - a[i - k]; if (win > best) best = win; }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1];
let win = 0;
for (let i = 0; i < k; i++) win += d[2 + i];
let best = win;
for (let i = k; i < n; i++) { win += d[2 + i] - d[2 + i - k]; if (win > best) best = win; }
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1];
let win: number = 0;
for (let i = 0; i < k; i++) win += d[2 + i];
let best: number = win;
for (let i = k; i < n; i++) { win += d[2 + i] - d[2 + i - k]; if (win > best) best = win; }
console.log(best);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1] as usize);
    let a = &d[2..2 + n];
    let mut win: i64 = a[..k].iter().sum();
    let mut best = win;
    for i in k..n { win += a[i] - a[i - k]; best = best.max(win); }
    println!("{}", best);
}`,
    },
  },

  sliding_window_longest_le_k: {
    id: 'sliding_window_longest_le_k',
    defaultTopic: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: two integers n and k (1 <= n <= 2*10^5, 0 <= k <= 10^14). Second line: n non-negative integers.',
    outputFormat: 'Print length of longest contiguous subarray with sum <= k.',
    constraints: ['1 <= n <= 2 * 10^5', '0 <= a[i] <= 10^9', 'Non-negative elements preserve monotonicity!'],
    hints: [
      'Because all elements are >= 0, expanding right never decreases the sum and shrinking left never increases it.',
      'Advance r from 0 to n-1 adding a[r], and while sum > k increment l and subtract a[l].',
      'Update best = max(best, r - l + 1).',
    ],
    bruteIntuition: 'Test all subarrays [l..r] and keep longest with sum <= k.',
    bruteBangla: 'সব জোড়া (l, r) পরীক্ষা করে যোগফল <= k হয় এমন দীর্ঘতম অংশ খোঁজা।',
    bruteWhyTle: 'O(n^2) times out for n = 2*10^5.',
    brutePseudo: 'for l: sum=0; for r>=l: sum+=a[r]; if sum<=k update best',
    betterIntuition: 'Compute prefix sums and binary search earliest valid left endpoint for each r.',
    betterBangla: 'প্রিফিক্স সামে বাইনারি সার্চ চালিয়ে প্রতিটি r-এর জন্য বাম প্রান্ত খোঁজা।',
    betterTradeoff: 'O(n log n) time and O(n) prefix memory instead of O(n) two pointers.',
    betterPseudo: 'for r: find smallest l with pref[r] - pref[l] <= k',
    optimalIntuition: 'Monotonic variable sliding window expands r and shrinks l in amortized O(n) time.',
    optimalBangla: 'অঋণাত্মক সংখ্যা হওয়ায় ডানে বাড়লে যোগফল বাড়ে, আর k ছাড়ালে বাম থেকে কমিয়ে O(n)-এ সমাধান হয়।',
    optimalWhyWins: 'Each pointer moves at most n times -> strict O(n) time, O(1) auxiliary space.',
    optimalPseudo: 'l=0, sum=0; for r: sum+=a[r]; while sum>k: sum-=a[l++]; best=max(best, r-l+1)',
    banglaEditorial: 'সব মান অঋণাত্মক হওয়ায় ভ্যারিয়েবল স্লাইডিং উইন্ডো (r বাড়ানো ও sum > k হলে l কমানো) O(n)-এ নিশ্চিত উত্তর দেয়।',
    dryRunSteps: [
      { step: 1, state: 'a=[3,1,2,1], k=4', memoryOrStack: '[3,1] sum=4, len=2', note: 'add 2 -> sum=6 > 4' },
      { step: 2, state: 'shrink l to 1', memoryOrStack: '[1,2,1] sum=4, len=3', note: 'Answer = 3' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], k = d[1];
      let l = 0, sum = 0, best = 0;
      for (let r = 0; r < n; r++) {
        sum += d[2 + r];
        while (sum > k && l <= r) sum -= d[2 + l++];
        if (r - l + 1 > best) best = r - l + 1;
      }
      return String(best);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['4 5\n3 1 2 1', '5 3\n4 5 6 7 8'];
      const hiddenInputs = ['1 10\n5', '1 2\n5', '5 0\n0 0 1 0 0'];
      for (let t = 0; t < 7; t++) {
        const n = randInt(rng, 6, 30), k = randInt(rng, 5, 45);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 15));
        hiddenInputs.push(`${n} ${k}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; long long k; scanf("%d %lld", &n, &k);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; long long k; cin >> n >> k;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long k = sc.nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n; long long k; if (scanf("%d %lld", &n, &k) != 2) return 0;
    long long *a = malloc(n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    int l = 0, best = 0; long long sum = 0;
    for (int r = 0; r < n; r++) {
        sum += a[r];
        while (sum > k && l <= r) sum -= a[l++];
        if (r - l + 1 > best) best = r - l + 1;
    }
    printf("%d\\n", best);
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; long long k; cin >> n >> k;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, best = 0; long long sum = 0;
    for (int r = 0; r < n; r++) {
        sum += a[r];
        while (sum > k && l <= r) sum -= a[l++];
        best = max(best, r - l + 1);
    }
    cout << best << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
a = d[2:2+n]
l = s = best = 0
for r, x in enumerate(a):
    s += x
    while s > k and l <= r:
        s -= a[l]
        l += 1
    if r - l + 1 > best: best = r - l + 1
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long k = sc.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        int l = 0, best = 0; long sum = 0;
        for (int r = 0; r < n; r++) {
            sum += a[r];
            while (sum > k && l <= r) sum -= a[l++];
            best = Math.max(best, r - l + 1);
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1];
let l = 0, sum = 0, best = 0;
for (let r = 0; r < n; r++) {
  sum += d[2 + r];
  while (sum > k && l <= r) sum -= d[2 + l++];
  if (r - l + 1 > best) best = r - l + 1;
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1];
let l: number = 0, sum: number = 0, best: number = 0;
for (let r = 0; r < n; r++) {
  sum += d[2 + r];
  while (sum > k && l <= r) sum -= d[2 + l++];
  if (r - l + 1 > best) best = r - l + 1;
}
console.log(best);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1]);
    let a = &d[2..2 + n];
    let (mut l, mut sum, mut best) = (0usize, 0i64, 0usize);
    for r in 0..n {
        sum += a[r];
        while sum > k && l <= r { sum -= a[l]; l += 1; }
        best = best.max(r - l + 1);
    }
    println!("{}", best);
}`,
    },
  },

  subarray_sum_equals_k: {
    id: 'subarray_sum_equals_k',
    defaultTopic: 'Hashing',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n^2)',
    inputFormat: 'First line: two integers n and k (1 <= n <= 2*10^5). Second line: n integers (may include negatives and zeros).',
    outputFormat: 'Single 64-bit integer: total count of contiguous subarrays summing to k.',
    constraints: ['1 <= n <= 2 * 10^5', '-10^9 <= a[i], k <= 10^9', 'Sliding window FAILS when negative numbers exist!'],
    hints: [
      'Two pointers fail because elements can be negative or zero.',
      'Let pref be the running prefix sum. Subarray (l..r] sums to k iff pref[r] - pref[l] == k.',
      'Maintain a HashMap of prefixSum -> frequency initialized with {0: 1}.',
    ],
    bruteIntuition: 'Enumerate every subarray [l..r] and count sums equal to k.',
    bruteBangla: 'প্রতিটি (l, r) জোড়ার সাব-অ্যারে যোগ করে k-এর সমান কি না দেখা।',
    bruteWhyTle: 'O(n^2) exceeds time limit on n = 2*10^5.',
    brutePseudo: 'for l: sum=0; for r>=l: sum+=a[r]; if sum==k ans++',
    betterIntuition: 'Precompute prefix array and search matching earlier prefixes linearly.',
    betterBangla: 'প্রিফিক্স অ্যারে তৈরি করে লিনিয়ার সার্চ চালানো।',
    betterTradeoff: 'Still O(n^2) without hash map frequency table.',
    betterPseudo: 'count pairs i < j with pref[j] - pref[i] == k',
    optimalIntuition: 'Prefix Sum + HashMap frequency counting solves arbitrary signed arrays in O(n).',
    optimalBangla: 'নেগেটিভ সংখ্যা থাকলে স্লাইডিং উইন্ডো কাজ করে না; তাই prefix sum + HashMap ফ্রিকোয়েন্সি কাউন্টার দিয়ে O(n)-এ সমাধান করো।',
    optimalWhyWins: 'Exact O(n) single pass; handles negatives, zeros, and duplicates seamlessly.',
    optimalPseudo: 'cnt={0:1}; pref=0; for x: pref+=x; ans+=cnt[pref-k]; cnt[pref]++',
    banglaEditorial: 'ম্যাপে {0: 1} রেখে সামনে এগোতে থাকলে প্রতিটি pref-এর জন্য আগে কতবার (pref - k) এসেছে তা যোগ করলেই সব সাব-অ্যারে গণনা হয়ে যায়।',
    dryRunSteps: [
      { step: 1, state: 'a=[1,1,1], k=2', memoryOrStack: 'cnt={0:1, 1:1}, pref=2', note: 'pref-k=0 -> ans+=1' },
      { step: 2, state: 'next +1 -> pref=3', memoryOrStack: 'pref-k=1 -> ans+=1', note: 'Total = 2' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], k = d[1];
      const cnt = new Map<number, number>([[0, 1]]);
      let pref = 0, ans = 0;
      for (let i = 0; i < n; i++) {
        pref += d[2 + i];
        ans += cnt.get(pref - k) || 0;
        cnt.set(pref, (cnt.get(pref) || 0) + 1);
      }
      return String(ans);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['3 2\n1 1 1', '5 0\n1 -1 0 1 -1'];
      const hiddenInputs = ['1 0\n0', '4 5\n1 2 3 4', '6 3\n3 0 3 -3 3 0'];
      for (let t = 0; t < 7; t++) {
        const n = randInt(rng, 6, 30), k = randInt(rng, -5, 10);
        const arr = Array.from({ length: n }, () => randInt(rng, -5, 8));
        hiddenInputs.push(`${n} ${k}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; long long k; scanf("%d %lld", &n, &k);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; long long k; cin >> n >> k;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long k = sc.nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmpLL(const void *a, const void *b) {
    long long x = *(const long long*)a, y = *(const long long*)b;
    return (x > y) - (x < y);
}
int main(void) {
    int n; long long k; if (scanf("%d %lld", &n, &k) != 2) return 0;
    long long *pref = malloc((n + 1) * sizeof(long long));
    long long *vals = malloc((n + 1) * sizeof(long long));
    pref[0] = 0; vals[0] = 0;
    for (int i = 1; i <= n; i++) { long long v; scanf("%lld", &v); pref[i] = pref[i - 1] + v; vals[i] = pref[i]; }
    qsort(vals, n + 1, sizeof(long long), cmpLL);
    int m = 0;
    for (int i = 0; i <= n; i++) if (i == 0 || vals[i] != vals[m - 1]) vals[m++] = vals[i];
    int *cnt = calloc(m, sizeof(int));
    long long ans = 0;
    for (int i = 0; i <= n; i++) {
        long long need = pref[i] - k;
        int l = 0, r = m - 1, pos = -1;
        while (l <= r) { int mid = (l + r) / 2; if (vals[mid] == need) { pos = mid; break; } if (vals[mid] < need) l = mid + 1; else r = mid - 1; }
        if (pos != -1) ans += cnt[pos];
        l = 0; r = m - 1;
        while (l <= r) { int mid = (l + r) / 2; if (vals[mid] == pref[i]) { cnt[mid]++; break; } if (vals[mid] < pref[i]) l = mid + 1; else r = mid - 1; }
    }
    printf("%lld\\n", ans);
    free(pref); free(vals); free(cnt);
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; long long k; cin >> n >> k;
    unordered_map<long long, long long> cnt;
    cnt[0] = 1;
    long long pref = 0, ans = 0, v;
    for (int i = 0; i < n; i++) {
        cin >> v; pref += v;
        auto it = cnt.find(pref - k);
        if (it != cnt.end()) ans += it->second;
        cnt[pref]++;
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
from collections import defaultdict
d = list(map(int, sys.stdin.read().split()))
n, k = d[0], d[1]
cnt = defaultdict(int)
cnt[0] = 1
pref = ans = 0
for x in d[2:2+n]:
    pref += x
    ans += cnt[pref - k]
    cnt[pref] += 1
print(ans)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long k = sc.nextLong();
        Map<Long, Long> cnt = new HashMap<>();
        cnt.put(0L, 1L);
        long pref = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            pref += sc.nextLong();
            ans += cnt.getOrDefault(pref - k, 0L);
            cnt.put(pref, cnt.getOrDefault(pref, 0L) + 1L);
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], k = d[1], cnt = new Map([[0, 1]]);
let pref = 0, ans = 0;
for (let i = 0; i < n; i++) {
  pref += d[2 + i];
  ans += cnt.get(pref - k) || 0;
  cnt.set(pref, (cnt.get(pref) || 0) + 1);
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], k: number = d[1];
const cnt: Map<number, number> = new Map<number, number>([[0, 1]]);
let pref: number = 0, ans: number = 0;
for (let i = 0; i < n; i++) {
  pref += d[2 + i];
  ans += cnt.get(pref - k) || 0;
  cnt.set(pref, (cnt.get(pref) || 0) + 1);
}
console.log(ans);`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, k) = (d[0] as usize, d[1]);
    let mut cnt: HashMap<i64, i64> = HashMap::new();
    cnt.insert(0, 1);
    let (mut pref, mut ans) = (0i64, 0i64);
    for &x in &d[2..2 + n] {
        pref += x;
        if let Some(&c) = cnt.get(&(pref - k)) { ans += c; }
        *cnt.entry(pref).or_insert(0) += 1;
    }
    println!("{}", ans);
}`,
    },
  },

  two_pointer_container_water: {
    id: 'two_pointer_container_water',
    defaultTopic: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: integer n (2 <= n <= 2*10^5). Second line: n non-negative heights h[0..n-1].',
    outputFormat: 'Single 64-bit integer: maximum water area (j - i) * min(h[i], h[j]).',
    constraints: ['2 <= n <= 2 * 10^5', '0 <= h[i] <= 10^9'],
    hints: [
      'Start with the widest container: l = 0, r = n - 1.',
      'Area is limited by the shorter wall min(h[l], h[r]).',
      'Moving the taller wall inward can never improve the area; always move the shorter wall inward!',
    ],
    bruteIntuition: 'Test all pairs (i, j) and take max area.',
    bruteBangla: 'সব জোড়া (i, j) চেক করে সর্বোচ্চ ক্ষেত্রফল বের করা।',
    bruteWhyTle: 'O(n^2) times out for n = 2*10^5.',
    brutePseudo: 'for i: for j>i: best=max(best, (j-i)*min(h[i],h[j]))',
    betterIntuition: 'Sort heights descending and track running min/max indices.',
    betterBangla: 'উচ্চতা সর্ট করে বাম-ডান প্রান্তের ইনডেক্স রাখা।',
    betterTradeoff: 'O(n log n) sorting vs linear O(n) two pointers.',
    betterPseudo: 'sort by height desc; track minIdx, maxIdx',
    optimalIntuition: 'Converging Two Pointers from both ends discard the shorter boundary at every step in O(n).',
    optimalBangla: 'দুই প্রান্ত থেকে দুটি পয়েন্টার নিয়ে সবসময় ছোট দেয়ালটি ভেতরে সরালেই O(n)-এ সর্বোচ্চ পানি ধারণক্ষমতা বের হয়।',
    optimalWhyWins: 'Strict O(n) time and O(1) extra space.',
    optimalPseudo: 'l=0, r=n-1; while l<r: update best; if h[l]<h[r] l++ else r--',
    banglaEditorial: 'দুই প্রান্তের মধ্যে ছোট দেয়ালই পানির উচ্চতা নির্ধারণ করে—তাই ছোট দেয়াল সরালেই কেবল বড় এলাকা পাওয়ার সুযোগ থাকে।',
    dryRunSteps: [
      { step: 1, state: 'h=[1,8,6,2,5,4,8,3,7]', memoryOrStack: 'l=0(1), r=8(7) -> area=8', note: 'move l (shorter)' },
      { step: 2, state: 'l=1(8), r=8(7)', memoryOrStack: '7 * 7 = 49', note: 'Max area = 49' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      let l = 0, r = n - 1, best = 0;
      while (l < r) {
        const hl = d[1 + l], hr = d[1 + r];
        best = Math.max(best, (r - l) * Math.min(hl, hr));
        if (hl < hr) l++;
        else r--;
      }
      return String(best);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['9\n1 8 6 2 5 4 8 3 7', '2\n1 1'];
      const hiddenInputs = ['2\n0 100', '5\n5 4 3 2 1', '5\n1 2 3 4 5'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 30);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 100));
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
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    int l = 0, r = n - 1; long long best = 0;
    while (l < r) {
        long long mn = h[l] < h[r] ? h[l] : h[r];
        long long area = (long long)(r - l) * mn;
        if (area > best) best = area;
        if (h[l] < h[r]) l++; else r--;
    }
    printf("%lld\\n", best);
    free(h);
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
    int l = 0, r = n - 1; long long best = 0;
    while (l < r) {
        best = max(best, 1LL * (r - l) * min(h[l], h[r]));
        if (h[l] < h[r]) l++; else r--;
    }
    cout << best << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]; h = d[1:1+n]
l, r, best = 0, n - 1, 0
while l < r:
    best = max(best, (r - l) * min(h[l], h[r]))
    if h[l] < h[r]: l += 1
    else: r -= 1
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();
        int l = 0, r = n - 1; long best = 0;
        while (l < r) {
            best = Math.max(best, (long)(r - l) * Math.min(h[l], h[r]));
            if (h[l] < h[r]) l++; else r--;
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
let l = 0, r = d[0] - 1, best = 0;
while (l < r) {
  best = Math.max(best, (r - l) * Math.min(d[1 + l], d[1 + r]));
  if (d[1 + l] < d[1 + r]) l++; else r--;
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let l: number = 0, r: number = d[0] - 1, best: number = 0;
while (l < r) {
  best = Math.max(best, (r - l) * Math.min(d[1 + l], d[1 + r]));
  if (d[1 + l] < d[1 + r]) l++; else r--;
}
console.log(best);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let h = &d[1..1 + n];
    let (mut l, mut r, mut best) = (0usize, n - 1, 0i64);
    while l < r {
        best = best.max(((r - l) as i64) * h[l].min(h[r]));
        if h[l] < h[r] { l += 1; } else { r -= 1; }
    }
    println!("{}", best);
}`,
    },
  },

  trap_rain_water: {
    id: 'trap_rain_water',
    defaultTopic: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n)',
    inputFormat: 'First line: integer n (1 <= n <= 2*10^5). Second line: n non-negative integers h[0..n-1].',
    outputFormat: 'Single 64-bit integer: total units of rainwater trapped between elevation bars.',
    constraints: ['1 <= n <= 2 * 10^5', '0 <= h[i] <= 10^9'],
    hints: [
      'Water above bar i equals max(0, min(leftMax[i], rightMax[i]) - h[i]).',
      'Two pointers l and r track running lMax and rMax in O(1) space.',
      'Whenever h[l] <= h[r], left water level is strictly governed by lMax!',
    ],
    bruteIntuition: 'For each index i, scan left for lMax and right for rMax.',
    bruteBangla: 'প্রতিটি স্তম্ভের বামে ও ডানে সর্বোচ্চ দেয়াল খুঁজে পানি হিসাব করা।',
    bruteWhyTle: 'O(n^2) times out for n = 2*10^5.',
    brutePseudo: 'for i: sum += min(max(h[0..i]), max(h[i..n-1])) - h[i]',
    betterIntuition: 'Precompute prefixMax[] and suffixMax[] arrays in O(n) space.',
    betterBangla: 'দুটি prefixMax ও suffixMax অ্যারে বানিয়ে O(n) স্পেসে সমাধান।',
    betterTradeoff: 'Uses O(n) auxiliary arrays instead of O(1) space.',
    betterPseudo: 'ans += min(prefMax[i], sufMax[i]) - h[i]',
    optimalIntuition: 'In-place Two Pointers maintain lMax and rMax in O(n) time and O(1) auxiliary space.',
    optimalBangla: 'টু-পয়েন্টারে lMax ও rMax বজায় রেখে ছোট দিক থেকে পানি যোগ করলে অতিরিক্ত অ্যারে ছাড়াই O(n)-এ উত্তর আসে।',
    optimalWhyWins: 'Optimal O(n) time, O(1) extra space.',
    optimalPseudo: 'while l<r: if h[l]<=h[r]: lMax=max(lMax,h[l]); ans+=lMax-h[l++] else ...',
    banglaEditorial: 'দুই দিকের মধ্যে ছোট উচ্চতার দিকে সর্বোচ্চ বাঁধ জানা থাকে বলেই টু-পয়েন্টারে O(1) অতিরিক্ত মেমোরিতে মোট পানি গোনা যায়।',
    dryRunSteps: [
      { step: 1, state: 'h=[0,1,0,2,1,0,1,3,2,1,2,1]', memoryOrStack: 'lMax=2, rMax=3', note: 'Pockets accumulate 1+1+2+1+1' },
      { step: 2, state: 'Final sum', memoryOrStack: 'water = 6', note: 'Output: 6' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      let l = 0, r = n - 1, lm = 0, rm = 0, ans = 0;
      while (l < r) {
        if (d[1 + l] <= d[1 + r]) {
          lm = Math.max(lm, d[1 + l]);
          ans += lm - d[1 + l++];
        } else {
          rm = Math.max(rm, d[1 + r]);
          ans += rm - d[1 + r--];
        }
      }
      return String(ans);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['12\n0 1 0 2 1 0 1 3 2 1 2 1', '6\n4 2 0 3 2 5'];
      const hiddenInputs = ['1\n5', '3\n1 2 3', '4\n5 0 0 5'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 30);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 20));
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
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    int l = 0, r = n - 1; long long lm = 0, rm = 0, ans = 0;
    while (l < r) {
        if (h[l] <= h[r]) { if (h[l] > lm) lm = h[l]; ans += lm - h[l++]; }
        else { if (h[r] > rm) rm = h[r]; ans += rm - h[r--]; }
    }
    printf("%lld\\n", ans);
    free(h);
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
    int l = 0, r = n - 1; long long lm = 0, rm = 0, ans = 0;
    while (l < r) {
        if (h[l] <= h[r]) { lm = max(lm, h[l]); ans += lm - h[l++]; }
        else { rm = max(rm, h[r]); ans += rm - h[r--]; }
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]; h = d[1:1+n]
l, r, lm, rm, ans = 0, n - 1, 0, 0, 0
while l < r:
    if h[l] <= h[r]:
        lm = max(lm, h[l]); ans += lm - h[l]; l += 1
    else:
        rm = max(rm, h[r]); ans += rm - h[r]; r -= 1
print(ans)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextLong();
        int l = 0, r = n - 1; long lm = 0, rm = 0, ans = 0;
        while (l < r) {
            if (h[l] <= h[r]) { lm = Math.max(lm, h[l]); ans += lm - h[l++]; }
            else { rm = Math.max(rm, h[r]); ans += rm - h[r--]; }
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
let l = 0, r = d[0] - 1, lm = 0, rm = 0, ans = 0;
while (l < r) {
  if (d[1 + l] <= d[1 + r]) { lm = Math.max(lm, d[1 + l]); ans += lm - d[1 + l++]; }
  else { rm = Math.max(rm, d[1 + r]); ans += rm - d[1 + r--]; }
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let l: number = 0, r: number = d[0] - 1, lm: number = 0, rm: number = 0, ans: number = 0;
while (l < r) {
  if (d[1 + l] <= d[1 + r]) { lm = Math.max(lm, d[1 + l]); ans += lm - d[1 + l++]; }
  else { rm = Math.max(rm, d[1 + r]); ans += rm - d[1 + r--]; }
}
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let h = &d[1..1 + n];
    let (mut l, mut r, mut lm, mut rm, mut ans) = (0usize, n - 1, 0i64, 0i64, 0i64);
    while l < r {
        if h[l] <= h[r] { lm = lm.max(h[l]); ans += lm - h[l]; l += 1; }
        else { rm = rm.max(h[r]); ans += rm - h[r]; r -= 1; }
    }
    println!("{}", ans);
}`,
    },
  },

  merge_intervals_count: {
    id: 'merge_intervals_count',
    defaultTopic: 'Merge Intervals',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: integer n (1 <= n <= 10^5). Next n lines: two integers L and R (0 <= L <= R <= 10^9).',
    outputFormat: 'First line: integer m (number of merged disjoint intervals). Next m lines: each merged interval "L R" sorted ascending.',
    constraints: ['1 <= n <= 10^5', '0 <= L <= R <= 10^9'],
    hints: [
      'Sort all intervals by start point L ascending (break ties by R ascending).',
      'Compare next interval [l, r] against last merged [curL, curR].',
      'If l <= curR, merge via curR = max(curR, r); otherwise start a new interval.',
    ],
    bruteIntuition: 'Repeatedly scan all pairs of intervals and merge overlapping ones until fixed point.',
    bruteBangla: 'বারবার সব জোড়া ইন্টারভাল চেক করে ওভারল্যাপ থাকলে যুক্ত করা।',
    bruteWhyTle: 'O(n^2) fails for n = 10^5.',
    brutePseudo: 'while mergedAny: scan all pairs (i, j)',
    betterIntuition: 'Coordinate sweep with +1/-1 events sorted by timestamp.',
    betterBangla: 'ইভেন্ট সুইপ লাইন (+১/-১) দিয়ে শুরু ও শেষ ট্র্যাক করা।',
    betterTradeoff: 'Requires careful tie-breaking when end == next start.',
    betterPseudo: 'events (+1 at L, -1 after R); emit when balance hits 0',
    optimalIntuition: 'Sort by start time ascending and sweep linearly merging whenever next.L <= cur.R.',
    optimalBangla: 'শুরুর সময় অনুযায়ী সর্ট করে প্রতিটি নতুন ইন্টারভালের L আগের R-এর ছোট বা সমান হলে একীভূত করো।',
    optimalWhyWins: 'Clean O(n log n) sort + O(n) single pass.',
    optimalPseudo: 'sort(iv); for [l,r]: if l <= last.r: last.r = max(last.r, r) else push([l,r])',
    banglaEditorial: 'শুরুর সময় দিয়ে সর্ট করলে সম্ভাব্য সব ওভারল্যাপ পাশাপাশি চলে আসে, তাই একবার লিনিয়ার পাসে মার্জ করা যায়।',
    dryRunSteps: [
      { step: 1, state: '[[1,3],[2,6],[8,10]]', memoryOrStack: '2 <= 3 -> merge [1,6]', note: 'Overlap merged' },
      { step: 2, state: 'Next [8,10]', memoryOrStack: '8 > 6 -> new [8,10]', note: '2 intervals remain' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      const iv: [number, number][] = [];
      for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
      iv.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const res: [number, number][] = [];
      for (const [l, r] of iv) {
        if (!res.length || l > res[res.length - 1][1]) res.push([l, r]);
        else res[res.length - 1][1] = Math.max(res[res.length - 1][1], r);
      }
      return `${res.length}\n${res.map(([l, r]) => `${l} ${r}`).join('\n')}`;
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['4\n1 3\n2 6\n8 10\n15 18', '2\n1 4\n4 5'];
      const hiddenInputs = ['1\n0 10', '3\n5 10\n1 4\n2 6'];
      for (let k = 0; k < 8; k++) {
        const n = randInt(rng, 3, 18);
        const rows = Array.from({ length: n }, () => {
          const l = randInt(rng, 0, 40);
          return `${l} ${l + randInt(rng, 0, 12)}`;
        });
        hiddenInputs.push(`${n}\n${rows.join('\n')}`);
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
typedef struct { long long l, r; } Iv;
int cmp(const void *a, const void *b) {
    const Iv *x = a, *y = b;
    if (x->l != y->l) return x->l < y->l ? -1 : 1;
    return (x->r > y->r) - (x->r < y->r);
}
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    Iv *a = malloc(n * sizeof(Iv)), *res = malloc(n * sizeof(Iv));
    for (int i = 0; i < n; i++) scanf("%lld %lld", &a[i].l, &a[i].r);
    qsort(a, n, sizeof(Iv), cmp);
    int m = 0;
    for (int i = 0; i < n; i++) {
        if (m == 0 || a[i].l > res[m - 1].r) res[m++] = a[i];
        else if (a[i].r > res[m - 1].r) res[m - 1].r = a[i].r;
    }
    printf("%d\\n", m);
    for (int i = 0; i < m; i++) printf("%lld %lld\\n", res[i].l, res[i].r);
    free(a); free(res);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<pair<long long, long long>> iv(n), res;
    for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;
    sort(iv.begin(), iv.end());
    for (auto &p : iv) {
        if (res.empty() || p.first > res.back().second) res.push_back(p);
        else res.back().second = max(res.back().second, p.second);
    }
    cout << res.size() << '\\n';
    for (auto &p : res) cout << p.first << ' ' << p.second << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
iv = sorted((d[1+2*i], d[2+2*i]) for i in range(n))
res = []
for l, r in iv:
    if not res or l > res[-1][1]: res.append([l, r])
    else: res[-1][1] = max(res[-1][1], r)
print(len(res))
for l, r in res: print(l, r)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[][] iv = new long[n][2];
        for (int i = 0; i < n; i++) { iv[i][0] = sc.nextLong(); iv[i][1] = sc.nextLong(); }
        Arrays.sort(iv, (a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
        List<long[]> res = new ArrayList<>();
        for (long[] p : iv) {
            if (res.isEmpty() || p[0] > res.get(res.size() - 1)[1]) res.add(new long[]{p[0], p[1]});
            else res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], p[1]);
        }
        StringBuilder sb = new StringBuilder().append(res.size()).append('\\n');
        for (long[] p : res) sb.append(p[0]).append(' ').append(p[1]).append('\\n');
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], iv = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const res = [];
for (const p of iv) {
  if (!res.length || p[0] > res[res.length - 1][1]) res.push([p[0], p[1]]);
  else res[res.length - 1][1] = Math.max(res[res.length - 1][1], p[1]);
}
console.log(res.length + '\\n' + res.map((x) => x[0] + ' ' + x[1]).join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const iv: number[][] = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const res: number[][] = [];
for (const p of iv) {
  if (!res.length || p[0] > res[res.length - 1][1]) res.push([p[0], p[1]]);
  else res[res.length - 1][1] = Math.max(res[res.length - 1][1], p[1]);
}
console.log(String(res.length) + '\\n' + res.map((x) => String(x[0]) + ' ' + String(x[1])).join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut iv: Vec<(i64, i64)> = (0..n).map(|i| (d[1 + 2 * i], d[2 + 2 * i])).collect();
    iv.sort();
    let mut res: Vec<(i64, i64)> = Vec::new();
    for (l, r) in iv {
        if let Some(last) = res.last_mut() {
            if l <= last.1 { last.1 = last.1.max(r); continue; }
        }
        res.push((l, r));
    }
    println!("{}", res.len());
    for (l, r) in res { println!("{} {}", l, r); }
}`,
    },
  },

  activity_max_non_overlap: {
    id: 'activity_max_non_overlap',
    defaultTopic: 'Greedy',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(2^n)',
    betterComplexity: 'O(n^2)',
    inputFormat: 'First line: integer n (1 <= n <= 2*10^5). Next n lines: start s_i and end e_i (0 <= s_i < e_i <= 10^9).',
    outputFormat: 'Single integer: maximum number of mutually non-overlapping intervals (touching endpoints s_j >= e_i allowed).',
    constraints: ['1 <= n <= 2 * 10^5', '0 <= s_i < e_i <= 10^9'],
    hints: [
      'Sorting by start time or duration fails on counterexamples!',
      'Sort intervals by earliest END time e_i ascending.',
      'Greedily take every interval with s_i >= lastEnd and update lastEnd = e_i.',
    ],
    bruteIntuition: 'Backtrack over subsets of intervals checking pairwise disjointness.',
    bruteBangla: 'সব সাবসেট পরীক্ষা করে সর্বোচ্চ অ-ওভারল্যাপিং সেট বের করা।',
    bruteWhyTle: 'O(2^n) times out at n = 25.',
    brutePseudo: 'backtrack(idx, lastEnd)',
    betterIntuition: 'Sort by start time and run O(n^2) LIS-style DP.',
    betterBangla: 'শুরুর সময় অনুযায়ী সর্ট করে O(n^2) DP চালানো।',
    betterTradeoff: 'O(n^2) exceeds time limit on n = 2*10^5.',
    betterPseudo: 'dp[i] = 1 + max(dp[j] for e_j <= s_i)',
    optimalIntuition: 'Earliest Finish Time greedy selects maximum non-overlapping intervals in O(n log n).',
    optimalBangla: 'শেষের সময় (end time) অনুযায়ী ছোট থেকে বড় সাজালে সবচেয়ে আগে শেষ হওয়া কাজটি নেওয়া সবসময়ই সর্বোত্তম।',
    optimalWhyWins: 'Provably optimal exchange argument in O(n log n) time.',
    optimalPseudo: 'sort by end asc; last=-inf; for [s,e]: if s >= last: cnt++; last=e',
    banglaEditorial: 'যে কাজ সবচেয়ে দ্রুত শেষ হয় সেটি নিলে পরের কাজগুলোর জন্য সবচেয়ে বেশি সময় বাকি থাকে—এটাই অ্যাক্টিভিটি সিলেকশন গ্রিডি।',
    dryRunSteps: [
      { step: 1, state: '[[1,3],[2,5],[3,9],[6,8]]', memoryOrStack: 'sort by end: [1,3],[2,5],[6,8],[3,9]', note: 'pick [1,3], last=3' },
      { step: 2, state: 'skip [2,5], pick [6,8]', memoryOrStack: 'cnt = 2', note: 'skip [3,9]' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      const iv: [number, number][] = [];
      for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
      iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
      let cnt = 0, last = -1;
      for (const [s, e] of iv) {
        if (s >= last) {
          cnt++;
          last = e;
        }
      }
      return String(cnt);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['4\n1 3\n2 5\n3 9\n6 8', '3\n1 2\n2 3\n3 4'];
      const hiddenInputs = ['1\n0 5', '4\n1 10\n2 3\n4 5\n6 7'];
      for (let k = 0; k < 8; k++) {
        const n = randInt(rng, 4, 25);
        const rows = Array.from({ length: n }, () => {
          const s = randInt(rng, 0, 50);
          return `${s} ${s + randInt(rng, 1, 15)}`;
        });
        hiddenInputs.push(`${n}\n${rows.join('\n')}`);
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
typedef struct { long long s, e; } Act;
int cmp(const void *a, const void *b) {
    const Act *x = a, *y = b;
    if (x->e != y->e) return x->e < y->e ? -1 : 1;
    return (x->s > y->s) - (x->s < y->s);
}
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    Act *a = malloc(n * sizeof(Act));
    for (int i = 0; i < n; i++) scanf("%lld %lld", &a[i].s, &a[i].e);
    qsort(a, n, sizeof(Act), cmp);
    int cnt = 0; long long last = -1;
    for (int i = 0; i < n; i++) if (a[i].s >= last) { cnt++; last = a[i].e; }
    printf("%d\\n", cnt);
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    vector<pair<long long, long long>> iv(n);
    for (int i = 0; i < n; i++) cin >> iv[i].second >> iv[i].first;
    sort(iv.begin(), iv.end());
    int cnt = 0; long long last = -1;
    for (auto [e, s] : iv) if (s >= last) { cnt++; last = e; }
    cout << cnt << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
iv = sorted(((d[2+2*i], d[1+2*i]) for i in range(n)))
cnt, last = 0, -1
for e, s in iv:
    if s >= last:
        cnt += 1; last = e
print(cnt)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[][] iv = new long[n][2];
        for (int i = 0; i < n; i++) { iv[i][0] = sc.nextLong(); iv[i][1] = sc.nextLong(); }
        Arrays.sort(iv, (a, b) -> Long.compare(a[1], b[1]));
        int cnt = 0; long last = -1;
        for (long[] p : iv) if (p[0] >= last) { cnt++; last = p[1]; }
        System.out.println(cnt);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], iv = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
let cnt = 0, last = -1;
for (const [s, e] of iv) if (s >= last) { cnt++; last = e; }
console.log(cnt);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const iv: number[][] = [];
for (let i = 0; i < n; i++) iv.push([d[1 + 2 * i], d[2 + 2 * i]]);
iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
let cnt: number = 0, last: number = -1;
for (const p of iv) if (p[0] >= last) { cnt++; last = p[1]; }
console.log(cnt);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut iv: Vec<(i64, i64)> = (0..n).map(|i| (d[2 + 2 * i], d[1 + 2 * i])).collect();
    iv.sort();
    let (mut cnt, mut last) = (0, -1i64);
    for (e, st) in iv { if st >= last { cnt += 1; last = e; } }
    println!("{}", cnt);
}`,
    },
  },

  three_sum_count_zero: {
    id: 'three_sum_count_zero',
    defaultTopic: 'Two Pointers',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    bruteComplexity: 'O(n^3)',
    betterComplexity: 'O(n^2 log n)',
    inputFormat: 'First line: two integers n and target (3 <= n <= 2000). Second line: n integers.',
    outputFormat: 'Single integer: number of UNIQUE value triplets (a <= b <= c) from distinct indices whose sum equals target.',
    constraints: ['3 <= n <= 2000', '-10^6 <= a[i], target <= 10^6'],
    hints: [
      'Sort the array first in O(n log n).',
      'Fix a[i] (skipping duplicates i > 0 && a[i] == a[i-1]) and run Two Pointers l = i+1, r = n-1.',
      'When a[i] + a[l] + a[r] == target, increment count and skip duplicate values at both l and r!',
    ],
    bruteIntuition: 'Three nested loops checking i < j < k and deduplicating with a Set.',
    bruteBangla: 'তিনটি নেস্টেড লুপ চালিয়ে সব (i, j, k) ত্রয়ী চেক করে সেটে রাখা।',
    bruteWhyTle: 'O(n^3) = 8*10^9 operations for n = 2000.',
    brutePseudo: 'for i: for j: for k: if sum==target set.add((a[i],a[j],a[k]))',
    betterIntuition: 'Fix two elements and binary search or hash-lookup the third.',
    betterBangla: 'দুটি উপাদান ধরে তৃতীয়টি হ্যাশ সেটে খোঁজা।',
    betterTradeoff: 'Requires expensive tuple deduplication hashing.',
    betterPseudo: 'for i: seen={}; for j>i: check target-a[i]-a[j]',
    optimalIntuition: 'Sort + Two Pointers skips duplicate values in-place in O(n^2) time.',
    optimalBangla: 'অ্যারে সর্ট করে একটি উপাদান স্থির রেখে বাকি অংশে টু-পয়েন্টার ও ডুপ্লিকেট স্কিপ করলে O(n^2)-এ নির্ভুল গণনা হয়।',
    optimalWhyWins: 'O(n^2) time with O(1) extra space beyond sorting.',
    optimalPseudo: 'sort(a); for i: skip dup; two-pointer l,r skipping dups on hit',
    banglaEditorial: 'অ্যারে সর্ট করে a[i] ঠিক রেখে ডানে l, r টু-পয়েন্টার চালালে এবং ডুপ্লিকেট মানগুলো স্কিপ করলে O(n^2)-এ সব অনন্য ত্রয়ী গোনা যায়।',
    dryRunSteps: [
      { step: 1, state: 'a=[-1,0,1,2,-1,-4], target=0', memoryOrStack: 'sorted=[-4,-1,-1,0,1,2]', note: 'i=1(-1) finds (-1,-1,2) & (-1,0,1)' },
      { step: 2, state: 'i=2(-1) skipped', memoryOrStack: 'dup of a[1]', note: 'Total unique = 2' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0], target = d[1];
      const a = d.slice(2, 2 + n).sort((x, y) => x - y);
      let cnt = 0;
      for (let i = 0; i < n - 2; i++) {
        if (i > 0 && a[i] === a[i - 1]) continue;
        let l = i + 1, r = n - 1;
        while (l < r) {
          const s = a[i] + a[l] + a[r];
          if (s === target) {
            cnt++;
            while (l < r && a[l] === a[l + 1]) l++;
            while (l < r && a[r] === a[r - 1]) r--;
            l++; r--;
          } else if (s < target) l++;
          else r--;
        }
      }
      return String(cnt);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['6 0\n-1 0 1 2 -1 -4', '4 0\n0 0 0 0'];
      const hiddenInputs = ['3 6\n1 2 3', '3 5\n1 2 3', '6 3\n1 1 1 1 1 1'];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 6, 25), target = randInt(rng, -6, 12);
        const arr = Array.from({ length: n }, () => randInt(rng, -6, 8));
        hiddenInputs.push(`${n} ${target}\n${arr.join(' ')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; long long t; scanf("%d %lld", &n, &t);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; long long t; cin >> n >> t;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long t = sc.nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmp(const void *a, const void *b) {
    long long x = *(const long long*)a, y = *(const long long*)b;
    return (x > y) - (x < y);
}
int main(void) {
    int n; long long target; if (scanf("%d %lld", &n, &target) != 2) return 0;
    long long *a = malloc(n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    qsort(a, n, sizeof(long long), cmp);
    int cnt = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && a[i] == a[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            long long s = a[i] + a[l] + a[r];
            if (s == target) {
                cnt++;
                while (l < r && a[l] == a[l + 1]) l++;
                while (l < r && a[r] == a[r - 1]) r--;
                l++; r--;
            } else if (s < target) l++; else r--;
        }
    }
    printf("%d\\n", cnt);
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; long long target; cin >> n >> target;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    int cnt = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && a[i] == a[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            long long s = a[i] + a[l] + a[r];
            if (s == target) {
                cnt++;
                while (l < r && a[l] == a[l + 1]) l++;
                while (l < r && a[r] == a[r - 1]) r--;
                l++; r--;
            } else if (s < target) l++; else r--;
        }
    }
    cout << cnt << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, target = d[0], d[1]
a = sorted(d[2:2+n])
cnt = 0
for i in range(n - 2):
    if i > 0 and a[i] == a[i - 1]: continue
    l, r = i + 1, n - 1
    while l < r:
        s = a[i] + a[l] + a[r]
        if s == target:
            cnt += 1
            while l < r and a[l] == a[l + 1]: l += 1
            while l < r and a[r] == a[r - 1]: r -= 1
            l += 1; r -= 1
        elif s < target: l += 1
        else: r -= 1
print(cnt)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long target = sc.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        Arrays.sort(a);
        int cnt = 0;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && a[i] == a[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                long s = a[i] + a[l] + a[r];
                if (s == target) {
                    cnt++;
                    while (l < r && a[l] == a[l + 1]) l++;
                    while (l < r && a[r] == a[r - 1]) r--;
                    l++; r--;
                } else if (s < target) l++; else r--;
            }
        }
        System.out.println(cnt);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0], target = d[1], a = d.slice(2, 2 + n).sort((x, y) => x - y);
let cnt = 0;
for (let i = 0; i < n - 2; i++) {
  if (i > 0 && a[i] === a[i - 1]) continue;
  let l = i + 1, r = n - 1;
  while (l < r) {
    const s = a[i] + a[l] + a[r];
    if (s === target) {
      cnt++;
      while (l < r && a[l] === a[l + 1]) l++;
      while (l < r && a[r] === a[r - 1]) r--;
      l++; r--;
    } else if (s < target) l++; else r--;
  }
}
console.log(cnt);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], target: number = d[1];
const a: number[] = d.slice(2, 2 + n).sort((x, y) => x - y);
let cnt: number = 0;
for (let i = 0; i < n - 2; i++) {
  if (i > 0 && a[i] === a[i - 1]) continue;
  let l: number = i + 1, r: number = n - 1;
  while (l < r) {
    const s: number = a[i] + a[l] + a[r];
    if (s === target) {
      cnt++;
      while (l < r && a[l] === a[l + 1]) l++;
      while (l < r && a[r] === a[r - 1]) r--;
      l++; r--;
    } else if (s < target) l++; else r--;
  }
}
console.log(cnt);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (d[0] as usize, d[1]);
    let mut a = d[2..2 + n].to_vec();
    a.sort();
    let mut cnt = 0;
    for i in 0..n.saturating_sub(2) {
        if i > 0 && a[i] == a[i - 1] { continue; }
        let (mut l, mut r) = (i + 1, n - 1);
        while l < r {
            let sum = a[i] + a[l] + a[r];
            if sum == target {
                cnt += 1;
                while l < r && a[l] == a[l + 1] { l += 1; }
                while l < r && a[r] == a[r - 1] { r -= 1; }
                l += 1; r -= 1;
            } else if sum < target { l += 1; } else { r -= 1; }
        }
    }
    println!("{}", cnt);
}`,
    },
  },
};
