import type { Problem } from '../types/academy';

export const INTERVIEW_PROBLEMS_BATCH_1: Problem[] = [
  {
    id: 'interview-3sum-triplets',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Two Pointers',
    sourceTag: 'FAANG Top 150 · Two Pointers',
    companyTags: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    difficulty: 'Medium',
    title: '3Sum (Unique Zero-Sum Triplets)',
    banglaTitle: 'থ্রি-সাম (শূন্য যোগফলের অনন্য ত্রয়ী — টু পয়েন্টার)',
    xpReward: 150,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
    statement:
      'Given an integer array nums of length n, find all unique triplets [nums[i], nums[j], nums[k]] with i != j != k such that nums[i] + nums[j] + nums[k] == 0. Print each triplet sorted in non-decreasing order, and sort the list of triplets lexicographically. If no triplet exists, print NONE.',
    inputFormat: 'First line: integer n. Second line: n space-separated integers.',
    outputFormat: 'Print each unique sorted triplet "a b c" on its own line, or NONE if none exist.',
    constraints: ['3 <= n <= 3000', '-10^5 <= nums[i] <= 10^5'],
    samples: [
      {
        id: '3s-s1',
        input: '6\n-1 0 1 2 -1 -4',
        expectedOutput: '-1 -1 2\n-1 0 1',
        explanation: 'Distinct zero-sum triplets sorted ascending are (-1, -1, 2) and (-1, 0, 1).',
      },
    ],
    hiddenTests: [
      { id: '3s-h1', input: '3\n0 1 1', expectedOutput: 'NONE', isHidden: true },
      { id: '3s-h2', input: '4\n0 0 0 0', expectedOutput: '0 0 0', isHidden: true },
    ],
    hints: [
      'Sorting nums first costs O(n log n) and lets you avoid duplicate triplets without a slow string-based HashSet.',
      'Fix the first number nums[i] (skipping if nums[i] == nums[i-1]), then solve 2Sum for target = -nums[i] on nums[i+1..n-1].',
      'Use lo = i + 1 and hi = n - 1: if sum < 0 move lo++, if sum > 0 move hi--, else record triplet and skip duplicate lo and hi values.',
    ],
    approaches: {
      brute: {
        label: 'Triple Nested Loops + Set Deduplication',
        timeComplexity: 'O(n^3 log k)',
        spaceComplexity: 'O(k)',
        intuition: 'Check all (i, j, k) triples, sort each valid triple, and insert into a Set to remove duplicates.',
        banglaIntuition: 'তিনটি নেস্টেড লুপ দিয়ে সব ত্রয়ী (i, j, k) পরীক্ষা করে সেটে রাখা—কিন্তু n=3000 হলেই ২৭ বিলিয়ন অপারেশনে TLE হবে!',
        whyTleOrSuboptimal: 'O(n^3) explodes to ~4.5 × 10^9 checks for n = 3000, causing guaranteed Time Limit Exceeded.',
        pseudocode: 'for i: for j>i: for k>j: if a[i]+a[j]+a[k]==0: add sorted (a[i],a[j],a[k]) to set',
      },
      better: {
        label: 'HashSet Two-Sum Inside Outer Loop',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(n)',
        intuition: 'Fix nums[i] and run HashSet Two-Sum for -nums[i] on the suffix, deduplicating output pairs via a Set.',
        banglaIntuition: 'বাইরের লুপে i ফিক্স করে বাকি অংশে HashSet দিয়ে Two Sum চালালে O(n^2) হয়, তবে ডুপ্লিকেট বাদ দিতে অতিরিক্ত মেমোরি লাগে।',
        whyTleOrSuboptimal: 'Requires O(n) HashSet overhead per outer iteration plus extra deduplication logic.',
        pseudocode: 'for i: seen={}; for j>i: if -(a[i]+a[j]) in seen: record; seen.add(a[j])',
      },
      optimal: {
        label: 'Sort + Two-Pointer Squeeze with Duplicate Skipping',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1) extra',
        intuition: 'Sort nums ascending. For each i (skipping nums[i] == nums[i-1], stopping early if nums[i] > 0), squeeze lo = i + 1 and hi = n - 1 while skipping duplicate values on match.',
        banglaIntuition: 'প্রথমে অ্যারেটি সর্ট করে নিলে প্রতিটি i-এর জন্য বাকি অংশে বাম (lo) ও ডান (hi) দুই প্রান্ত থেকে টু-পয়েন্টার চালিয়ে একদম O(1) অতিরিক্ত মেমোরিতেই সব ইউনিক ত্রয়ী পাওয়া যায়!',
        whyTleOrSuboptimal: 'FAANG Interview Winner! Zero HashSet allocations and clean deterministic lexicographic order.',
        pseudocode: 'sort(a); for i: if i>0 && a[i]==a[i-1] continue; lo=i+1, hi=n-1; while lo<hi: adjust & skip dups',
      },
    },
    editorial: {
      bruteForceReason: 'Trying all three indices is O(n^3), which times out once n reaches a few thousand.',
      optimalApproach: 'Sorting transforms 3Sum into n instances of sorted Two-Pointer 2Sum in O(n^2) time and O(1) auxiliary space.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1) auxiliary',
      dryRunSteps: [
        { step: 1, state: 'Sort [-1,0,1,2,-1,-4]', memoryOrStack: '[-4, -1, -1, 0, 1, 2]', note: 'Sorted ascending' },
        { step: 2, state: 'i=0 (a[0]=-4), lo=1, hi=5', memoryOrStack: '-4 + (-1) + 2 = -3 < 0', note: 'Move lo right; no match' },
        { step: 3, state: 'i=1 (a[1]=-1), lo=2, hi=5', memoryOrStack: '-1 + (-1) + 2 = 0', note: 'Record (-1,-1,2); next (-1,0,1); skip i=2 duplicate' },
      ],
      banglaEditorial:
        'অ্যারেটি সর্ট করে নিলে তিনটি সংখ্যার যোগফল বের করা খুব সহজ হয়ে যায়। প্রথম সংখ্যা a[i] ঠিক রেখে ডানদিকের অংশে lo = i+1 এবং hi = n-1 পয়েন্টার রাখি। যোগফল ০-এর ছোট হলে lo বাড়াই, বড় হলে hi কমাই, আর ০ হলে উত্তর সেভ করে একই মানের ডুপ্লিকেটগুলো স্কিপ করে এগিয়ে যাই।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    int n;\n    if (scanf("%d", &n) != 1) return 0;\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\n`,
      typescript: `import * as fs from 'fs';\n`,
      rust: `use std::io::{self, Read};\nfn main() {}\n`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    qsort(a, (size_t)n, sizeof(int), cmp_int);
    int found = 0;
    for (int i = 0; i < n - 2; i++) {
        if (a[i] > 0) break;
        if (i > 0 && a[i] == a[i - 1]) continue;
        int lo = i + 1, hi = n - 1;
        while (lo < hi) {
            long long s = (long long)a[i] + a[lo] + a[hi];
            if (s < 0) lo++;
            else if (s > 0) hi--;
            else {
                printf("%d %d %d\\n", a[i], a[lo], a[hi]);
                found = 1;
                while (lo < hi && a[lo] == a[lo + 1]) lo++;
                while (lo < hi && a[hi] == a[hi - 1]) hi--;
                lo++; hi--;
            }
        }
    }
    if (!found) printf("NONE\\n");
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
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    sort(a.begin(), a.end());
    bool found = false;
    for (int i = 0; i < n - 2; i++) {
        if (a[i] > 0) break;
        if (i > 0 && a[i] == a[i - 1]) continue;
        int lo = i + 1, hi = n - 1;
        while (lo < hi) {
            long long s = 1LL * a[i] + a[lo] + a[hi];
            if (s < 0) lo++;
            else if (s > 0) hi--;
            else {
                cout << a[i] << " " << a[lo] << " " << a[hi] << "\\n";
                found = true;
                while (lo < hi && a[lo] == a[lo + 1]) lo++;
                while (lo < hi && a[hi] == a[hi - 1]) hi--;
                lo++; hi--;
            }
        }
    }
    if (!found) cout << "NONE\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
a = sorted(d[1:1 + n])
out = []
for i in range(n - 2):
    if a[i] > 0:
        break
    if i > 0 and a[i] == a[i - 1]:
        continue
    lo, hi = i + 1, n - 1
    while lo < hi:
        s = a[i] + a[lo] + a[hi]
        if s < 0:
            lo += 1
        elif s > 0:
            hi -= 1
        else:
            out.append(f"{a[i]} {a[lo]} {a[hi]}")
            while lo < hi and a[lo] == a[lo + 1]:
                lo += 1
            while lo < hi and a[hi] == a[hi - 1]:
                hi -= 1
            lo += 1
            hi -= 1
print("\\n".join(out) if out else "NONE")`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        Arrays.sort(a);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n - 2; i++) {
            if (a[i] > 0) break;
            if (i > 0 && a[i] == a[i - 1]) continue;
            int lo = i + 1, hi = n - 1;
            while (lo < hi) {
                long s = (long) a[i] + a[lo] + a[hi];
                if (s < 0) lo++;
                else if (s > 0) hi--;
                else {
                    sb.append(a[i]).append(' ').append(a[lo]).append(' ').append(a[hi]).append('\\n');
                    while (lo < hi && a[lo] == a[lo + 1]) lo++;
                    while (lo < hi && a[hi] == a[hi - 1]) hi--;
                    lo++; hi--;
                }
            }
        }
        System.out.print(sb.length() == 0 ? "NONE\\n" : sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
const a = d.slice(1, 1 + n).sort((x, y) => x - y);
const out = [];
for (let i = 0; i < n - 2; i++) {
  if (a[i] > 0) break;
  if (i > 0 && a[i] === a[i - 1]) continue;
  let lo = i + 1, hi = n - 1;
  while (lo < hi) {
    const s = a[i] + a[lo] + a[hi];
    if (s < 0) lo++;
    else if (s > 0) hi--;
    else {
      out.push(\`\${a[i]} \${a[lo]} \${a[hi]}\`);
      while (lo < hi && a[lo] === a[lo + 1]) lo++;
      while (lo < hi && a[hi] === a[hi - 1]) hi--;
      lo++; hi--;
    }
  }
}
console.log(out.length ? out.join('\\n') : 'NONE');`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const a: number[] = d.slice(1, 1 + n).sort((x, y) => x - y);
const out: string[] = [];
for (let i = 0; i < n - 2; i++) {
  if (a[i] > 0) break;
  if (i > 0 && a[i] === a[i - 1]) continue;
  let lo = i + 1, hi = n - 1;
  while (lo < hi) {
    const s = a[i] + a[lo] + a[hi];
    if (s < 0) lo++;
    else if (s > 0) hi--;
    else {
      out.push(\`\${a[i]} \${a[lo]} \${a[hi]}\`);
      while (lo < hi && a[lo] === a[lo + 1]) lo++;
      while (lo < hi && a[hi] === a[hi - 1]) hi--;
      lo++; hi--;
    }
  }
}
console.log(out.length ? out.join('\\n') : 'NONE');`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut a = d[1..1 + n].to_vec();
    a.sort_unstable();
    let mut out = Vec::new();
    for i in 0..n.saturating_sub(2) {
        if a[i] > 0 { break; }
        if i > 0 && a[i] == a[i - 1] { continue; }
        let (mut lo, mut hi) = (i + 1, n - 1);
        while lo < hi {
            let sum = a[i] + a[lo] + a[hi];
            if sum < 0 { lo += 1; }
            else if sum > 0 { hi -= 1; }
            else {
                out.push(format!("{} {} {}", a[i], a[lo], a[hi]));
                while lo < hi && a[lo] == a[lo + 1] { lo += 1; }
                while lo < hi && a[hi] == a[hi - 1] { hi -= 1; }
                lo += 1;
                if hi == 0 { break; }
                hi -= 1;
            }
        }
    }
    if out.is_empty() { println!("NONE"); } else { println!("{}", out.join("\\n")); }
}`,
    },
  },

  {
    id: 'interview-container-water',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Two Pointers',
    sourceTag: 'FAANG Top 150 · Two Pointers',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    difficulty: 'Medium',
    title: 'Container With Most Water',
    banglaTitle: 'সর্বাধিক পানি ধারণক্ষমতার পাত্র (টু পয়েন্টার)',
    xpReward: 140,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given n vertical lines where line i has height h[i] at x-coordinate i, find two lines that together with the x-axis form a container holding the maximum amount of water.',
    inputFormat: 'First line: integer n. Second line: n space-separated heights h[i].',
    outputFormat: 'Print one integer: the maximum water area.',
    constraints: ['2 <= n <= 10^5', '0 <= h[i] <= 10^4'],
    samples: [
      {
        id: 'cw-s1',
        input: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
        explanation: 'Lines at indices 1 (h=8) and 8 (h=7) yield width 7 × min(8, 7) = 49.',
      },
    ],
    hiddenTests: [
      { id: 'cw-h1', input: '2\n1 1', expectedOutput: '1', isHidden: true },
      { id: 'cw-h2', input: '5\n4 3 2 1 4', expectedOutput: '16', isHidden: true },
    ],
    hints: [
      'Area between lines l and r equals (r - l) * min(h[l], h[r]).',
      'Width (r - l) shrinks as pointers move inward, so the ONLY way to beat the current best is to find a taller limiting wall!',
      'Always advance the pointer pointing to the SHORTER wall (if h[l] < h[r] then l++ else r--).',
    ],
    approaches: {
      brute: {
        label: 'Check Every Pair of Walls',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'Loop over all pairs (i, j) and compute max((j - i) * min(h[i], h[j])).',
        banglaIntuition: 'প্রতিটি দুই দেয়ালের জোড়া (i, j) নিয়ে ক্ষেত্রফল মাপা—কিন্তু n=10^5 এর জন্য ৫ বিলিয়ন জোড়ায় TLE হবে!',
        whyTleOrSuboptimal: 'O(n^2) times out for n = 10^5 (~5 × 10^9 pair evaluations).',
        pseudocode: 'for i: for j>i: ans = max(ans, (j-i)*min(h[i], h[j]))',
      },
      better: {
        label: 'Sort Heights Decreasing + Track Min/Max X-Coords',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Process heights from tallest to shortest while tracking leftmost and rightmost seen indices.',
        banglaIntuition: 'উচ্চতাগুলো বড় থেকে ছোট সাজিয়ে বাম-ডান প্রান্তের ইনডেক্স রাখলে O(n log n) সময় লাগে, কিন্তু সর্টিং অপ্রয়োজনীয়।',
        whyTleOrSuboptimal: 'Extra O(n log n) sorting and O(n) storage when O(n) single-pass suffices.',
        pseudocode: 'sort (h[i], i) desc; track minIdx, maxIdx; ans = max(ans, h * max(|i-minIdx|, |maxIdx-i|))',
      },
      optimal: {
        label: 'Greedy Opposite-End Two Pointers',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Start at widest span l = 0, r = n - 1. Compute area and discard whichever wall is shorter—keeping the shorter wall and shrinking width can never produce a larger area.',
        banglaIntuition: 'সর্বোচ্চ প্রস্থ (l=0, r=n-1) থেকে শুরু করে প্রতি ধাপে ছোট দেয়ালটিকে ভেতরে সরিয়ে দিলে একবার লুপ চালিয়েই O(n) সময়ে সঠিক উত্তর মেলে!',
        whyTleOrSuboptimal: 'Optimal! Single linear scan with O(1) memory.',
        pseudocode: 'l=0, r=n-1; while l<r: ans=max(ans, (r-l)*min(h[l],h[r])); if h[l]<h[r] l++ else r--',
      },
    },
    editorial: {
      bruteForceReason: 'Evaluating all n(n-1)/2 pairs is quadratic and fails when n = 10^5.',
      optimalApproach: 'Two pointers from both ends always discard the shorter boundary because width decreases and height is capped by the shorter wall.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'l=0 (1), r=8 (7)', memoryOrStack: 'area = 8 * min(1,7) = 8', note: 'h[0] < h[8] -> l=1' },
        { step: 2, state: 'l=1 (8), r=8 (7)', memoryOrStack: 'area = 7 * min(8,7) = 49', note: 'h[8] < h[1] -> r=7' },
        { step: 3, state: 'Remaining inward steps', memoryOrStack: 'max stays 49', note: 'Outputs 49' },
      ],
      banglaEditorial:
        'দুটি দেয়ালের মাঝে পানি ধরে রাখা হয় ছোট দেয়ালের উচ্চতা পর্যন্ত। আমরা দুই প্রান্ত l=0 ও r=n-1 থেকে শুরু করি। প্রস্থ কমতে থাকায় বেশি পানি পেতে হলে অবশ্যই ছোট দেয়ালটি বদলে বড় দেয়াল খুঁজতে হবে—তাই h[l] < h[r] হলে l++ নতুবা r-- করি।',
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
    if (scanf("%d", &n) != 1) return 0;
    int *h = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    int l = 0, r = n - 1;
    long long best = 0;
    while (l < r) {
        long long mh = h[l] < h[r] ? h[l] : h[r];
        long long area = (long long)(r - l) * mh;
        if (area > best) best = area;
        if (h[l] < h[r]) l++;
        else r--;
    }
    printf("%lld\\n", best);
    free(h);
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
    vector<long long> h(n);
    for (long long &x : h) cin >> x;
    int l = 0, r = n - 1;
    long long best = 0;
    while (l < r) {
        best = max(best, 1LL * (r - l) * min(h[l], h[r]));
        if (h[l] < h[r]) l++;
        else r--;
    }
    cout << best << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
h = d[1:1 + n]
l, r, best = 0, n - 1, 0
while l < r:
    best = max(best, (r - l) * min(h[l], h[r]))
    if h[l] < h[r]:
        l += 1
    else:
        r -= 1
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        int l = 0, r = n - 1;
        long best = 0;
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
const n = d[0], h = d.slice(1, 1 + n);
let l = 0, r = n - 1, best = 0;
while (l < r) {
  best = Math.max(best, (r - l) * Math.min(h[l], h[r]));
  if (h[l] < h[r]) l++; else r--;
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0], h: number[] = d.slice(1, 1 + n);
let l = 0, r = n - 1, best = 0;
while (l < r) {
  best = Math.max(best, (r - l) * Math.min(h[l], h[r]));
  if (h[l] < h[r]) l++; else r--;
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
        best = best.max((r - l) as i64 * h[l].min(h[r]));
        if h[l] < h[r] { l += 1; } else { r -= 1; }
    }
    println!("{}", best);
}`,
    },
  },

  {
    id: 'interview-longest-unique-substring',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Sliding Window',
    sourceTag: 'FAANG Top 150 · Sliding Window',
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    difficulty: 'Medium',
    title: 'Longest Substring Without Repeating Characters',
    banglaTitle: 'পুনরাবৃত্তি ছাড়া দীর্ঘতম সাবস্ট্রিং (স্লাইডিং উইন্ডো)',
    xpReward: 145,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given a string s of ASCII characters, find the length of the longest contiguous substring without any repeating characters.',
    inputFormat: 'Single line containing string s (no leading/trailing whitespace).',
    outputFormat: 'Print one integer: the length of the longest unique-character substring.',
    constraints: ['1 <= |s| <= 10^5', 'Characters are printable ASCII'],
    samples: [
      { id: 'lu-s1', input: 'abcabcbb', expectedOutput: '3', explanation: 'Longest unique substring is "abc" with length 3.' },
      { id: 'lu-s2', input: 'bbbbb', expectedOutput: '1' },
    ],
    hiddenTests: [
      { id: 'lu-h1', input: 'pwwkew', expectedOutput: '3', isHidden: true },
      { id: 'lu-h2', input: 'dvdf', expectedOutput: '3', isHidden: true },
    ],
    hints: [
      'Maintain a sliding window [left..right] where every character inside has frequency <= 1.',
      'When s[right] already appeared inside [left..right-1], you do NOT have to shrink left one step at a time.',
      'Store lastSeen[char] = index; jump left = max(left, lastSeen[s[right]] + 1) directly!',
    ],
    approaches: {
      brute: {
        label: 'Enumerate All Substrings + Visited Set',
        timeComplexity: 'O(n^3) or O(n^2)',
        spaceComplexity: 'O(min(n, charset))',
        intuition: 'For every start i, extend end j while characters are unseen and track max(j - i + 1).',
        banglaIntuition: 'প্রতিটি শুরু i থেকে একটি করে অক্ষর নিয়ে পুনরাবৃত্তি না হওয়া পর্যন্ত চেক করা—n=10^5 এর জন্য TLE হয়ে যায়।',
        whyTleOrSuboptimal: 'Quadratic O(n^2) times out for |s| = 10^5.',
        pseudocode: 'for i: seen=set(); for j=i..n-1: if s[j] in seen break; seen.add(s[j]); ans=max(ans,j-i+1)',
      },
      better: {
        label: 'Sliding Window with Frequency Array & While-Shrink',
        timeComplexity: 'O(2n) = O(n)',
        spaceComplexity: 'O(128)',
        intuition: 'Increment freq[s[right]] and while freq[s[right]] > 1, decrement freq[s[left]] and left++.',
        banglaIntuition: 'উইন্ডোতে ডানদিক থেকে অক্ষর যোগ করে ডুপ্লিকেট এলে বাম দিক এক এক করে ছোট করা।',
        whyTleOrSuboptimal: 'Visits each character up to twice (2n steps) instead of direct index jumping.',
        pseudocode: 'for r: freq[s[r]]++; while freq[s[r]]>1: freq[s[l++]]--; ans=max(ans, r-l+1)',
      },
      optimal: {
        label: 'Last-Seen Index Jump Sliding Window',
        timeComplexity: 'O(n) single pass',
        spaceComplexity: 'O(128) = O(1)',
        intuition: 'Store last[c] = most recent index of char c (initialized to -1). For each r, jump l = max(l, last[s[r]] + 1), update last[s[r]] = r, and maximize r - l + 1.',
        banglaIntuition: 'প্রতিটি অক্ষর সর্বশেষ কোন ইনডেক্সে দেখা গেছে তা last[] অ্যারেতে রাখলে পুনরাবৃত্তি ঘটামাত্র বাম প্রান্ত l এক লাফে (last[ch]+1)-এ চলে যেতে পারে!',
        whyTleOrSuboptimal: 'Optimal single-pass solution! Never steps l backward thanks to max(l, ...).',
        pseudocode: 'last=[-1]*256; l=0; for r: l=max(l, last[s[r]]+1); last[s[r]]=r; ans=max(ans, r-l+1)',
      },
    },
    editorial: {
      bruteForceReason: 'Checking every starting index i with an inner loop is O(n^2), exceeding limits for |s| = 10^5.',
      optimalApproach: 'Track the last seen index of each ASCII code in O(1) space and jump the left pointer directly past collisions.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 's="dvdf", r=0 (d)', memoryOrStack: 'l=0, last[d]=0', note: 'best=1 ("d")' },
        { step: 2, state: 'r=1 (v), r=2 (d)', memoryOrStack: 'l=max(0, 0+1)=1, last[d]=2', note: 'Window jumps to "vd", len=2' },
        { step: 3, state: 'r=3 (f)', memoryOrStack: 'l=1, window="vdf"', note: 'best = 3' },
      ],
      banglaEditorial:
        'স্লাইডিং উইন্ডো টেকনিকে বাম (l) ও ডান (r) দুটি পয়েন্টারের ভেতর সব সময় ইউনিক অক্ষর রাখা হয়। কোনো অক্ষর আগে দেখা থাকলে এবং তার ইনডেক্স >= l হয়, তাহলে l সরাসরি ওই পুরোনো ইনডেক্সের পরের ঘরে (last[ch] + 1) লাফ দেয়—তাই এক পাসেই O(n) সময়ে উত্তর মেলে।',
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
int main(void) {
    static char s[100005];
    if (scanf("%100000s", s) != 1) return 0;
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int l = 0, best = 0, n = (int)strlen(s);
    for (int r = 0; r < n; r++) {
        unsigned char ch = (unsigned char)s[r];
        if (last[ch] + 1 > l) l = last[ch] + 1;
        last[ch] = r;
        if (r - l + 1 > best) best = r - l + 1;
    }
    printf("%d\\n", best);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <array>
#include <iostream>
#include <string>
using namespace std;
int main() {
    string s; cin >> s;
    array<int, 256> last;
    last.fill(-1);
    int l = 0, best = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        unsigned char c = static_cast<unsigned char>(s[r]);
        l = max(l, last[c] + 1);
        last[c] = r;
        best = max(best, r - l + 1);
    }
    cout << best << "\\n";
    return 0;
}`,
      python: `import sys
s = sys.stdin.read().strip()
last = {}
l = best = 0
for r, ch in enumerate(s):
    if ch in last and last[ch] + 1 > l:
        l = last[ch] + 1
    last[ch] = r
    best = max(best, r - l + 1)
print(best)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        int[] last = new int[256];
        Arrays.fill(last, -1);
        int l = 0, best = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            l = Math.max(l, last[c] + 1);
            last[c] = r;
            best = Math.max(best, r - l + 1);
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const s = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim();
const last = new Int32Array(256).fill(-1);
let l = 0, best = 0;
for (let r = 0; r < s.length; r++) {
  const code = s.charCodeAt(r);
  l = Math.max(l, last[code] + 1);
  last[code] = r;
  best = Math.max(best, r - l + 1);
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const s: string = fs.readFileSync(0, 'utf8').trim();
const last = new Map<string, number>();
let l = 0, best = 0;
for (let r = 0; r < s.length; r++) {
  const ch = s[r];
  const prev = last.get(ch);
  if (prev !== undefined && prev + 1 > l) l = prev + 1;
  last.set(ch, r);
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
        let ri = r as i32;
        l = l.max(last[b as usize] + 1);
        last[b as usize] = ri;
        best = best.max(ri - l + 1);
    }
    println!("{}", best);
}`,
    },
  },

  {
    id: 'interview-min-window-substring',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Sliding Window',
    sourceTag: 'FAANG Top 150 · Sliding Window',
    companyTags: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    difficulty: 'Hard',
    title: 'Minimum Window Substring',
    banglaTitle: 'ন্যূনতম উইন্ডো সাবস্ট্রিং (হার্ড স্লাইডিং উইন্ডো)',
    xpReward: 195,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given two strings s and t, return the shortest contiguous substring of s such that every character in t (including duplicates) is included in the window. If no such window exists, print NONE.',
    inputFormat: 'Two whitespace-separated strings s and t.',
    outputFormat: 'Print the minimum window substring (earliest if tied), or NONE.',
    constraints: ['1 <= |s|, |t| <= 10^5', 'Strings consist of English letters'],
    samples: [
      { id: 'mw-s1', input: 'ADOBECODEBANC ABC', expectedOutput: 'BANC', explanation: '"BANC" has length 4 and contains A, B, and C.' },
      { id: 'mw-s2', input: 'a aa', expectedOutput: 'NONE' },
    ],
    hiddenTests: [
      { id: 'mw-h1', input: 'a a', expectedOutput: 'a', isHidden: true },
      { id: 'mw-h2', input: 'ab b', expectedOutput: 'b', isHidden: true },
    ],
    hints: [
      'Count needed frequencies of characters in t, and track how many distinct characters (or total required chars) are still missing.',
      'Expand right pointer until missing == 0 (all characters of t are covered).',
      'Once valid, greedily shrink left pointer as far as possible while missing stays 0, updating best length & start index.',
    ],
    approaches: {
      brute: {
        label: 'Check All O(n^2) Substrings Against Frequency Table',
        timeComplexity: 'O(n^2 * |charset|)',
        spaceComplexity: 'O(|charset|)',
        intuition: 'Try every substring s[i..j] and check if every letter frequency meets need[c].',
        banglaIntuition: 'সব সাবস্ট্রিং s[i..j] নিয়ে প্রতিটিতে t-এর সব অক্ষর আছে কি না মেলানো—n=10^5 এ TLE নিশ্চিত।',
        whyTleOrSuboptimal: 'O(n^2) times out rapidly for |s| = 10^5.',
        pseudocode: 'for i: for j>=i: if covers(s[i..j], t): update best',
      },
      better: {
        label: 'Filtered Index List + Sliding Window',
        timeComplexity: 'O(|s| + |t|)',
        spaceComplexity: 'O(|s|)',
        intuition: 'Filter s down to only indices whose characters appear in t, then slide across the filtered list.',
        banglaIntuition: 'কেবল t-তে থাকা অক্ষরগুলোর ইনডেক্স আলাদা লিস্টে নিয়ে উইন্ডো স্লাইড করা।',
        whyTleOrSuboptimal: 'Allocates extra O(|s|) filtered pair list unnecessarily when direct two-pointer takes O(1) extra array.',
        pseudocode: 'filtered = [(i, s[i]) for i if s[i] in t]; slide window over filtered',
      },
      optimal: {
        label: 'Expand-Until-Valid, Shrink-While-Valid Sliding Window',
        timeComplexity: 'O(|s| + |t|)',
        spaceComplexity: 'O(128) = O(1)',
        intuition: 'Keep remaining = |t| and need[c] counts. When adding s[r], if need[s[r]] > 0 decrement remaining; always decrement need[s[r]]. While remaining == 0, record best window and pop s[l] (if need[s[l]] == 0, remaining++).',
        banglaIntuition: 'remaining কাউন্টার ব্যবহার করে ডান প্রান্ত (r) বাড়িয়ে সব অক্ষর পূরণ করি; পূরণ হওয়া মাত্র বাম প্রান্ত (l) যতটা সম্ভব ছোট করে সবচেয়ে ছোট উইন্ডো বের করি!',
        whyTleOrSuboptimal: 'Classic Meta/Google Hard Window Template! O(|s| + |t|) time, O(1) fixed ASCII array.',
        pseudocode: 'for r: if need[s[r]]-- > 0: rem--; while rem==0: update best; if ++need[s[l++]] > 0: rem++',
      },
    },
    editorial: {
      bruteForceReason: 'Inspecting all substrings takes quadratic O(n^2) time and fails on inputs up to 10^5.',
      optimalApproach: 'A single pass expand-and-contract window maintains the exact deficit counter in O(|s| + |t|) time and O(1) ASCII space.',
      timeComplexity: 'O(|s| + |t|)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 's="ADOBECODEBANC", t="ABC"', memoryOrStack: 'need[A]=1, B=1, C=1, rem=3', note: 'Expand r until C at idx 5' },
        { step: 2, state: 'r=5: "ADOBEC" valid (rem=0)', memoryOrStack: 'best="ADOBEC" (len=6)', note: 'Shrink l=0 past A -> rem=1' },
        { step: 3, state: 'r=12: shrink to "BANC"', memoryOrStack: 'best="BANC" (len=4)', note: 'Smallest covering window found' },
      ],
      banglaEditorial:
        'একটি স্থির ১২৮-সাইজের অ্যারেতে t-এর অক্ষরের চাহিদা রাখি। ডান দিক থেকে r বাড়াতে বাড়াতে যখন সব অক্ষর (rem == 0) মিলে যায়, তখন বাম প্রান্ত l সরিয়ে উইন্ডোটি ছোট করি যেন অপ্রয়োজনীয় অক্ষর বাদ পড়ে। প্রতিটি অক্ষর সর্বোচ্চ দুবার স্পর্শ হয় বলে মোট সময় O(|s| + |t|)।',
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
int main(void) {
    static char s[100005], t[100005];
    if (scanf("%100000s %100000s", s, t) != 2) return 0;
    int need[128] = {0};
    int slen = (int)strlen(s), tlen = (int)strlen(t);
    for (int i = 0; i < tlen; i++) need[(unsigned char)t[i]]++;
    int rem = tlen, l = 0, bestLen = slen + 1, bestStart = 0;
    for (int r = 0; r < slen; r++) {
        if (need[(unsigned char)s[r]]-- > 0) rem--;
        while (rem == 0) {
            if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestStart = l; }
            if (++need[(unsigned char)s[l++]] > 0) rem++;
        }
    }
    if (bestLen > slen) printf("NONE\\n");
    else printf("%.*s\\n", bestLen, s + bestStart);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, t; cin >> s >> t;
    int need[128] = {};
    for (char c : t) need[(unsigned char)c]++;
    int rem = (int)t.size(), l = 0, bestLen = (int)s.size() + 1, bestStart = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        if (need[(unsigned char)s[r]]-- > 0) rem--;
        while (rem == 0) {
            if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestStart = l; }
            if (++need[(unsigned char)s[l++]] > 0) rem++;
        }
    }
    cout << (bestLen > (int)s.size() ? "NONE" : s.substr(bestStart, bestLen)) << "\\n";
    return 0;
}`,
      python: `import sys
s, t = sys.stdin.read().split()
need = {}
for ch in t:
    need[ch] = need.get(ch, 0) + 1
rem = len(t)
l = 0
best_len, best_start = len(s) + 1, 0
for r, ch in enumerate(s):
    if need.get(ch, 0) > 0:
        rem -= 1
    need[ch] = need.get(ch, 0) - 1
    while rem == 0:
        if r - l + 1 < best_len:
            best_len, best_start = r - l + 1, l
        need[s[l]] = need.get(s[l], 0) + 1
        if need[s[l]] > 0:
            rem += 1
        l += 1
print("NONE" if best_len > len(s) else s[best_start:best_start + best_len])`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next(), t = sc.next();
        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int rem = t.length(), l = 0, bestLen = s.length() + 1, bestStart = 0;
        for (int r = 0; r < s.length(); r++) {
            if (need[s.charAt(r)]-- > 0) rem--;
            while (rem == 0) {
                if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestStart = l; }
                if (++need[s.charAt(l++)] > 0) rem++;
            }
        }
        System.out.println(bestLen > s.length() ? "NONE" : s.substring(bestStart, bestStart + bestLen));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [s, t] = raw.trim().split(/\\s+/);
const need = new Int32Array(128);
for (let i = 0; i < t.length; i++) need[t.charCodeAt(i)]++;
let rem = t.length, l = 0, bestLen = s.length + 1, bestStart = 0;
for (let r = 0; r < s.length; r++) {
  if (need[s.charCodeAt(r)]-- > 0) rem--;
  while (rem === 0) {
    if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestStart = l; }
    if (++need[s.charCodeAt(l++)] > 0) rem++;
  }
}
console.log(bestLen > s.length ? 'NONE' : s.slice(bestStart, bestStart + bestLen));`,
      typescript: `import * as fs from 'fs';
const [s, t] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const need = new Int32Array(128);
for (let i = 0; i < t.length; i++) need[t.charCodeAt(i)]++;
let rem = t.length, l = 0, bestLen = s.length + 1, bestStart = 0;
for (let r = 0; r < s.length; r++) {
  if (need[s.charCodeAt(r)]-- > 0) rem--;
  while (rem === 0) {
    if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestStart = l; }
    if (++need[s.charCodeAt(l++)] > 0) rem++;
  }
}
console.log(bestLen > s.length ? 'NONE' : s.slice(bestStart, bestStart + bestLen));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    let s = it.next().unwrap().as_bytes();
    let t = it.next().unwrap().as_bytes();
    let mut need = [0i32; 128];
    for &b in t { need[b as usize] += 1; }
    let mut rem = t.len() as i32;
    let (mut l, mut best_len, mut best_start) = (0usize, s.len() + 1, 0usize);
    for (r, &b) in s.iter().enumerate() {
        if need[b as usize] > 0 { rem -= 1; }
        need[b as usize] -= 1;
        while rem == 0 {
            if r - l + 1 < best_len { best_len = r - l + 1; best_start = l; }
            let lb = s[l] as usize;
            need[lb] += 1;
            if need[lb] > 0 { rem += 1; }
            l += 1;
        }
    }
    if best_len > s.len() { println!("NONE"); }
    else { println!("{}", std::str::from_utf8(&s[best_start..best_start + best_len]).unwrap()); }
}`,
    },
  },

  {
    id: 'interview-reverse-linked-list',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Linked List',
    sourceTag: 'FAANG Top 150 · Linked List',
    companyTags: ['Microsoft', 'Amazon', 'Meta', 'Google'],
    difficulty: 'Easy',
    title: 'Reverse Singly Linked List (In-Place Pointers)',
    banglaTitle: 'সিঙ্গলি লিংকড লিস্ট ইন-প্লেস রিভার্সাল',
    xpReward: 120,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Construct a singly linked list of ListNode objects from n input values, reverse its next pointers completely in-place without allocating new nodes for reversal, and print the reversed list values.',
    inputFormat: 'First line: integer n. Second line: n space-separated integers.',
    outputFormat: 'Print the reversed linked list values separated by spaces.',
    constraints: ['1 <= n <= 10^5', '-10^9 <= val <= 10^9'],
    samples: [
      { id: 'rll-s1', input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', explanation: '1->2->3->4->5 becomes 5->4->3->2->1.' },
    ],
    hiddenTests: [
      { id: 'rll-h1', input: '2\n10 20', expectedOutput: '20 10', isHidden: true },
      { id: 'rll-h2', input: '1\n99', expectedOutput: '99', isHidden: true },
    ],
    hints: [
      'Before flipping curr.next = prev, ALWAYS save nxt = curr.next so you do not lose the rest of the list!',
      'Advance the three pointers in lockstep: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt.',
      'When curr becomes null, prev is the new head of the reversed list.',
    ],
    approaches: {
      brute: {
        label: 'Copy Values into Array & Rebuild Nodes',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Walk the linked list, push values to a vector/stack, and overwrite node values backward.',
        banglaIntuition: 'লিংকড লিস্টের মানগুলো একটি অ্যারেতে কপি করে উল্টো দিক থেকে বসানো—ইন্টারভিউতে এটি প্রত্যাখ্যাত হয় কারণ পয়েন্টার রিভার্স করতে বলা হয়েছে।',
        whyTleOrSuboptimal: 'Uses O(n) extra memory and violates in-place pointer reversal constraints.',
        pseudocode: 'vals = []; for p: vals.push(p.val); p=head; for v in rev(vals): p.val=v',
      },
      better: {
        label: 'Recursive Pointer Reversal',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) call stack',
        intuition: 'Recursively reverse head.next, then set head.next.next = head and head.next = null.',
        banglaIntuition: 'রিকার্শন দিয়ে রিভার্স করা সহজ, কিন্তু n=10^5 হলে কল-স্ট্যাক ওভারফ্লো হতে পারে!',
        whyTleOrSuboptimal: 'O(n) recursion depth risks Stack Overflow when n = 10^5.',
        pseudocode: 'rev(h): if !h || !h.next return h; nh=rev(h.next); h.next.next=h; h.next=null; return nh',
      },
      optimal: {
        label: 'Iterative Three-Pointer Reversal (prev, curr, nxt)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Maintain prev = null and curr = head. On each step save nxt = curr.next, redirect curr.next = prev, then shift prev = curr and curr = nxt.',
        banglaIntuition: 'তিনটি পয়েন্টার (prev, curr, nxt) ব্যবহার করে পরের নোডের ঠিকানা সেভ রেখে বর্তমান লিংক উল্টে দিলে O(n) সময়ে ও O(1) মেমোরিতেই পুরো লিস্ট রিভার্স হয়!',
        whyTleOrSuboptimal: 'FAANG Standard! Zero recursion stack risk and true O(1) auxiliary space.',
        pseudocode: 'prev=null, curr=head; while curr: nxt=curr.next; curr.next=prev; prev=curr; curr=nxt; return prev',
      },
    },
    editorial: {
      bruteForceReason: 'Storing all node values in an auxiliary array or using O(n) recursion stack wastes O(n) space and can crash at n = 10^5.',
      optimalApproach: 'Flip each node’s next pointer iteratively using prev, curr, and nxt in O(n) time and O(1) extra memory.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'prev=null, curr=1->2->3', memoryOrStack: 'nxt = 2', note: 'Save rest of list' },
        { step: 2, state: '1->null, prev=1, curr=2', memoryOrStack: 'nxt = 3', note: 'Flip node 2 -> 1' },
        { step: 3, state: 'curr=null, prev=3', memoryOrStack: '3->2->1->null', note: 'prev is new head' },
      ],
      banglaEditorial:
        'লিংকড লিস্টের পয়েন্টার উল্টাতে গেলে পরের নোডের লিংক হারিয়ে যাওয়ার ভয় থাকে। তাই আগে nxt = curr.next সেভ করে curr.next = prev সেট করি, তারপর prev ও curr এক ধাপ এগিয়ে নিই।',
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
typedef struct Node { int val; struct Node *next; } Node;
Node* reverseList(Node *head) {
    Node *prev = NULL, *curr = head;
    while (curr) {
        Node *nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v; scanf("%d", &v);
        Node *node = malloc(sizeof(Node));
        node->val = v; node->next = NULL;
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    head = reverseList(head);
    for (Node *p = head; p; ) {
        printf("%d%s", p->val, p->next ? " " : "\\n");
        Node *tmp = p; p = p->next; free(tmp);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int v) : val(v), next(nullptr) {}
};
ListNode* reverseList(ListNode *head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode *nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    ListNode *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        auto *node = new ListNode(v);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    head = reverseList(head);
    for (ListNode *p = head; p; ) {
        cout << p->val << (p->next ? " " : "\\n");
        ListNode *tmp = p; p = p->next; delete tmp;
    }
    return 0;
}`,
      python: `import sys
class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

d = list(map(int, sys.stdin.read().split()))
n = d[0]
head = tail = None
for v in d[1:1 + n]:
    node = ListNode(v)
    if head is None:
        head = tail = node
    else:
        tail.next = node
        tail = node

prev, curr = None, head
while curr:
    nxt = curr.next
    curr.next = prev
    prev = curr
    curr = nxt

out = []
p = prev
while p:
    out.append(str(p.val))
    p = p.next
print(" ".join(out))`,
      java: `import java.util.*;
public class Main {
    static class ListNode {
        int val; ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(sc.nextInt());
            if (head == null) head = tail = node;
            else { tail.next = node; tail = node; }
        }
        head = reverseList(head);
        StringBuilder sb = new StringBuilder();
        for (ListNode p = head; p != null; p = p.next) {
            if (p != head) sb.append(' ');
            sb.append(p.val);
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
let head = null, tail = null;
for (let i = 1; i <= n; i++) {
  const node = { val: d[i], next: null };
  if (!head) head = tail = node;
  else { tail.next = node; tail = node; }
}
let prev = null, curr = head;
while (curr) {
  const nxt = curr.next;
  curr.next = prev;
  prev = curr;
  curr = nxt;
}
const out = [];
for (let p = prev; p; p = p.next) out.push(p.val);
console.log(out.join(' '));`,
      typescript: `import * as fs from 'fs';
interface ListNode { val: number; next: ListNode | null; }
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let head: ListNode | null = null, tail: ListNode | null = null;
for (let i = 1; i <= n; i++) {
  const node: ListNode = { val: d[i], next: null };
  if (!head) { head = node; tail = node; }
  else if (tail) { tail.next = node; tail = node; }
}
let prev: ListNode | null = null, curr: ListNode | null = head;
while (curr) {
  const nxt: ListNode | null = curr.next;
  curr.next = prev;
  prev = curr;
  curr = nxt;
}
const out: number[] = [];
for (let p: ListNode | null = prev; p; p = p.next) out.push(p.val);
console.log(out.join(' '));`,
      rust: `use std::io::{self, Read};
struct ListNode { val: i32, next: Option<Box<ListNode>> }
fn reverse_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut prev: Option<Box<ListNode>> = None;
    while let Some(mut node) = head {
        head = node.next.take();
        node.next = prev;
        prev = Some(node);
    }
    prev
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut head: Option<Box<ListNode>> = None;
    for &v in d[1..1 + n].iter().rev() {
        head = Some(Box::new(ListNode { val: v, next: head }));
    }
    let mut p = reverse_list(head);
    let mut out = Vec::new();
    while let Some(node) = p {
        out.push(node.val.to_string());
        p = node.next;
    }
    println!("{}", out.join(" "));
}`,
    },
  },

  {
    id: 'interview-linked-list-cycle',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Linked List',
    sourceTag: 'FAANG Top 150 · Linked List',
    companyTags: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    difficulty: 'Medium',
    title: "Linked List Cycle II (Floyd's Tortoise & Hare)",
    banglaTitle: 'লিংকড লিস্ট সাইকেল ডিটেকশন (ফ্লয়েডের ফাস্ট-স্লো পয়েন্টার)',
    xpReward: 160,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Build a singly linked list of n nodes where the last node optionally points back to the 0-based node at index pos (or NULL if pos == -1). Using O(1) extra space, detect whether a cycle exists and return the 0-based index of the node where the cycle begins (or -1 if acyclic).',
    inputFormat: 'Line 1: n. Line 2: n integers. Line 3: integer pos (-1 or 0 <= pos < n).',
    outputFormat: 'Print one integer: the 0-based entry index of the cycle, or -1 if no cycle exists.',
    constraints: ['1 <= n <= 10^5', '-1 <= pos < n'],
    samples: [
      { id: 'llc-s1', input: '4\n3 2 0 -4\n1', expectedOutput: '1', explanation: 'Tail (-4) links back to index 1 (value 2), forming a cycle starting at index 1.' },
      { id: 'llc-s2', input: '2\n1 2\n0', expectedOutput: '0' },
    ],
    hiddenTests: [
      { id: 'llc-h1', input: '3\n10 20 30\n-1', expectedOutput: '-1', isHidden: true },
      { id: 'llc-h2', input: '1\n7\n0', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Advance slow by 1 step and fast by 2 steps; if there is a cycle they MUST collide inside the loop.',
      'Mathematical proof: let L = distance from head to cycle entry, C = cycle length, X = meeting offset from entry. Then 2(L + X) - (L + X) = k*C => L = k*C - X!',
      'Reset a pointer to head and advance both head-pointer and slow by 1 step; their first meeting point is the exact cycle entry!',
    ],
    approaches: {
      brute: {
        label: 'Visited Node Address HashSet',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Walk next pointers from head and insert each node reference into a HashSet until a repeat or null.',
        banglaIntuition: 'প্রতিটি দেখা নোডের ঠিকানা HashSet-এ রেখে প্রথম রিপিট পাওয়া—কিন্তু এতে O(n) মেমোরি নষ্ট হয়।',
        whyTleOrSuboptimal: 'Violates the strict O(1) auxiliary memory constraint expected by FAANG interviewers.',
        pseudocode: 'seen=set(); cur=head; while cur: if cur in seen return cur; seen.add(cur); cur=cur.next',
      },
      better: {
        label: 'Brent’s Cycle Detection / Pointer Tagging',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Use power-of-two teleporting slow pointer (Brent) or mutate a visited bit in pointers, though pointer tagging mutates data.',
        banglaIntuition: 'পয়েন্টারে বিট ট্যাগিং করলে ডেটা নষ্ট হয়, আর ব্রেন্টের পদ্ধতি একটু জটিল।',
        whyTleOrSuboptimal: 'Mutating node fields corrupts the input structure unless prohibited.',
        pseudocode: 'teleport slow at powers of 2; measure cycle length lambda; synchronize two pointers',
      },
      optimal: {
        label: "Floyd's Two-Phase Tortoise & Hare",
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Phase 1: move slow 1x and fast 2x until slow == fast (or fast reaches null). Phase 2: start ptr at head and walk ptr & slow 1x together; they meet at the cycle entry!',
        banglaIntuition: 'একটি স্লো (১ ধাপ) ও ফাস্ট (২ ধাপ) পয়েন্টার চালালে সাইকেল থাকলে তারা ভেতরে মিলিত হবেই। এরপর আরেকটি পয়েন্টার মাথা (head) থেকে ১ ধাপ করে চালালে ঠিক সাইকেলের মুখে গিয়ে দেখা হয়!',
        whyTleOrSuboptimal: 'O(n) time, O(1) space, non-destructive read-only traversal!',
        pseudocode: 'slow=fast=head; while fast && fast.next: slow=slow.next; fast=fast.next.next; if slow==fast break; reset ptr=head; advance both',
      },
    },
    editorial: {
      bruteForceReason: 'Storing visited node pointers in a HashSet takes O(n) RAM, failing the O(1) space follow-up.',
      optimalApproach: "Floyd's 2-phase algorithm detects collision in O(n) and recovers the cycle entrance using zero extra memory.",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'List 3->2->0->-4->(back to 2)', memoryOrStack: 'slow=3, fast=3', note: 'Start at head (idx 0)' },
        { step: 2, state: 'Phase 1 collision', memoryOrStack: 'slow=fast=-4 (after 3 steps)', note: 'Cycle confirmed' },
        { step: 3, state: 'Phase 2: ptr=3, slow=-4', memoryOrStack: '1 step -> both at node 2 (idx 1)', note: 'Entry index = 1' },
      ],
      banglaEditorial:
        'কচ্ছপ ও খরগোশ (Slow 1 step, Fast 2 steps) পদ্ধতিতে সাইকেল থাকলে খরগোশ পেছন থেকে ঘুরে কচ্ছপকে ধরবেই। গণিত অনুযায়ী মাথা থেকে সাইকেলের মুখের দূরত্ব L আর মিলিত স্থান থেকে মুখের বাকি দূরত্ব সমান (মডুলো সাইকেল দৈর্ঘ্য)—তাই দুইটি পয়েন্টার সমান বেগে চালালেই সাইকেল শুরুর ইনডেক্স বের হয়ে আসে।',
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
typedef struct Node { int val; struct Node *next; } Node;
int detectCycleIndex(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            Node *ptr = head;
            int idx = 0;
            while (ptr != slow) { ptr = ptr->next; slow = slow->next; idx++; }
            return idx;
        }
    }
    return -1;
}
int main(void) {
    int n, pos;
    if (scanf("%d", &n) != 1) return 0;
    Node *nodes = malloc((size_t)n * sizeof(Node));
    for (int i = 0; i < n; i++) {
        scanf("%d", &nodes[i].val);
        nodes[i].next = (i + 1 < n) ? &nodes[i + 1] : NULL;
    }
    scanf("%d", &pos);
    if (pos >= 0 && pos < n) nodes[n - 1].next = &nodes[pos];
    printf("%d\\n", detectCycleIndex(&nodes[0]));
    free(nodes);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
struct ListNode {
    int val = 0;
    ListNode *next = nullptr;
};
int detectCycleIndex(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            ListNode *ptr = head;
            int idx = 0;
            while (ptr != slow) { ptr = ptr->next; slow = slow->next; idx++; }
            return idx;
        }
    }
    return -1;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<ListNode> nodes(n);
    for (int i = 0; i < n; i++) {
        cin >> nodes[i].val;
        if (i + 1 < n) nodes[i].next = &nodes[i + 1];
    }
    int pos; cin >> pos;
    if (pos >= 0 && pos < n) nodes[n - 1].next = &nodes[pos];
    cout << detectCycleIndex(&nodes[0]) << "\\n";
    return 0;
}`,
      python: `import sys
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

d = list(map(int, sys.stdin.read().split()))
n = d[0]
nodes = [ListNode(v) for v in d[1:1 + n]]
for i in range(n - 1):
    nodes[i].next = nodes[i + 1]
pos = d[1 + n]
if 0 <= pos < n:
    nodes[-1].next = nodes[pos]

slow = fast = nodes[0]
ans = -1
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast:
        ptr = nodes[0]
        idx = 0
        while ptr is not slow:
            ptr = ptr.next
            slow = slow.next
            idx += 1
        ans = idx
        break
print(ans)`,
      java: `import java.util.*;
public class Main {
    static class ListNode { int val; ListNode next; ListNode(int v) { val = v; } }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ListNode[] nodes = new ListNode[n];
        for (int i = 0; i < n; i++) nodes[i] = new ListNode(sc.nextInt());
        for (int i = 0; i < n - 1; i++) nodes[i].next = nodes[i + 1];
        int pos = sc.nextInt();
        if (pos >= 0 && pos < n) nodes[n - 1].next = nodes[pos];
        ListNode slow = nodes[0], fast = nodes[0];
        int ans = -1;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode ptr = nodes[0];
                int idx = 0;
                while (ptr != slow) { ptr = ptr.next; slow = slow.next; idx++; }
                ans = idx;
                break;
            }
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
const nodes = Array.from({ length: n }, (_, i) => ({ val: d[1 + i], next: null }));
for (let i = 0; i < n - 1; i++) nodes[i].next = nodes[i + 1];
const pos = d[1 + n];
if (pos >= 0 && pos < n) nodes[n - 1].next = nodes[pos];
let slow = nodes[0], fast = nodes[0], ans = -1;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) {
    let ptr = nodes[0], idx = 0;
    while (ptr !== slow) { ptr = ptr.next; slow = slow.next; idx++; }
    ans = idx;
    break;
  }
}
console.log(ans);`,
      typescript: `import * as fs from 'fs';
interface ListNode { val: number; next: ListNode | null; }
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
const nodes: ListNode[] = Array.from({ length: n }, (_, i) => ({ val: d[1 + i], next: null }));
for (let i = 0; i < n - 1; i++) nodes[i].next = nodes[i + 1];
const pos: number = d[1 + n];
if (pos >= 0 && pos < n) nodes[n - 1].next = nodes[pos];
let slow: ListNode | null = nodes[0], fast: ListNode | null = nodes[0], ans = -1;
while (fast && fast.next && slow) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) {
    let ptr: ListNode | null = nodes[0];
    let idx = 0;
    while (ptr && slow && ptr !== slow) { ptr = ptr.next; slow = slow.next; idx++; }
    ans = idx;
    break;
  }
}
console.log(ans);`,
      rust: `use std::io::{self, Read};
struct Node { _val: i32, next: Option<usize> }
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut nodes: Vec<Node> = (0..n).map(|i| Node { _val: d[1 + i] as i32, next: if i + 1 < n { Some(i + 1) } else { None } }).collect();
    let pos = d[1 + n];
    if pos >= 0 && (pos as usize) < n { nodes[n - 1].next = Some(pos as usize); }
    let (mut slow, mut fast) = (Some(0usize), Some(0usize));
    let mut ans: i64 = -1;
    while let (Some(si), Some(fi)) = (slow, fast) {
        let f1 = nodes[fi].next;
        let f2 = f1.and_then(|x| nodes[x].next);
        slow = nodes[si].next;
        fast = f2;
        if slow.is_some() && slow == fast {
            let mut ptr = Some(0usize);
            let mut idx = 0i64;
            while ptr != slow {
                ptr = nodes[ptr.unwrap()].next;
                slow = nodes[slow.unwrap()].next;
                idx += 1;
            }
            ans = idx;
            break;
        }
    }
    println!("{}", ans);
}`,
    },
  },

  {
    id: 'interview-tree-level-order-bfs',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Binary Tree',
    sourceTag: 'FAANG Top 150 · Binary Tree BFS',
    companyTags: ['Meta', 'Amazon', 'Microsoft', 'Google'],
    difficulty: 'Medium',
    title: 'Binary Tree Level Order Traversal (Queue BFS)',
    banglaTitle: 'বাইনারি ট্রি লেভেল অর্ডার ট্রাভার্সাল (BFS কিউ)',
    xpReward: 150,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given a binary tree encoded as n level-order tokens (using "#" for null children), reconstruct the TreeNode tree and output its level-order traversal with one level per line.',
    inputFormat: 'First line: integer n. Second line: n level-order tokens (integer values or "#").',
    outputFormat: 'Print each non-empty tree level on a separate line with space-separated node values.',
    constraints: ['1 <= n <= 10^4', 'First token is a valid root integer', '-10^5 <= node.val <= 10^5'],
    samples: [
      { id: 'lo-s1', input: '7\n3 9 20 # # 15 7', expectedOutput: '3\n9 20\n15 7' },
    ],
    hiddenTests: [
      { id: 'lo-h1', input: '1\n1', expectedOutput: '1', isHidden: true },
      { id: 'lo-h2', input: '5\n1 # 2 # 3', expectedOutput: '1\n2\n3', isHidden: true },
    ],
    hints: [
      'A FIFO Queue naturally visits nodes in increasing order of depth (level 0, level 1, level 2...).',
      'At the start of each iteration of the outer while loop, snapshot levelSize = queue.length!',
      'Pop exactly levelSize nodes in an inner for loop, collect their values, and push their non-null left and right children.',
    ],
    approaches: {
      brute: {
        label: 'Repeated Height Calculation + Print-Kth-Level DFS',
        timeComplexity: 'O(n^2) on skewed tree',
        spaceComplexity: 'O(h)',
        intuition: 'Compute tree height h, then for d = 0..h-1 call DFS(root, d) printing nodes at depth d.',
        banglaIntuition: 'প্রতিটি লেভেলের জন্য আলাদা আলাদা DFS চালালে স্কিউড ট্রিতে O(n^2) সময় নষ্ট হয়।',
        whyTleOrSuboptimal: 'Degrades to O(n^2) on degenerate chain-shaped trees.',
        pseudocode: 'for d in 0..height(root): printLevel(root, d)',
      },
      better: {
        label: 'Pre-Order DFS Carrying Depth Parameter',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) + O(h) recursion stack',
        intuition: 'Maintain levels[][] vector and pass depth into dfs(node, depth), appending node.val to levels[depth].',
        banglaIntuition: 'DFS-এ depth প্যারামিটার পাঠিয়ে levels[depth]-এ মান রাখলেও O(n) হয়, কিন্তু স্কিউড ট্রিতে রিকার্শন স্ট্যাক ওভারফ্লো হতে পারে।',
        whyTleOrSuboptimal: 'Recursive call stack can overflow on deep skewed trees (n = 10^4+).',
        pseudocode: 'dfs(u, d): levels[d].push(u.val); dfs(u.left, d+1); dfs(u.right, d+1)',
      },
      optimal: {
        label: 'Iterative Queue Level-Snapshot BFS',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(w) max level width',
        intuition: 'Push root into a queue. While queue is non-empty, read sz = queue.size(), process those sz nodes as one level, and enqueue non-null children.',
        banglaIntuition: 'কিউ (Queue)-তে রুট রেখে প্রতিটি ধাপে বর্তমান কিউয়ের আকার `sz = queue.size()` গুনে নিলেই এক লেভেলের সব নোড আলাদা হয়ে যায়—কোনো রিকার্শন ছাড়াই O(n) সমাধান!',
        whyTleOrSuboptimal: 'FAANG Interview Standard! True breadth-first iterative sweep.',
        pseudocode: 'q=[root]; while q: sz=len(q); lvl=[]; for _ in sz: u=q.pop(); lvl.push(u.val); push children',
      },
    },
    editorial: {
      bruteForceReason: 'Calling a separate DFS for each depth level traverses upper nodes repeatedly in O(n^2) time on skewed trees.',
      optimalApproach: 'Snapshotting the queue size before popping a level separates levels cleanly in one O(n) BFS pass.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Queue = [3]', memoryOrStack: 'sz = 1', note: 'Pop 3 -> push 9, 20 -> Level 0: "3"' },
        { step: 2, state: 'Queue = [9, 20]', memoryOrStack: 'sz = 2', note: 'Pop 9, 20 -> push 15, 7 -> Level 1: "9 20"' },
        { step: 3, state: 'Queue = [15, 7]', memoryOrStack: 'sz = 2', note: 'Pop 15, 7 -> Level 2: "15 7"' },
      ],
      banglaEditorial:
        'বাইনারি ট্রি লেভেল-বাই-লেভেল প্রিন্ট করতে Queue-ভিত্তিক BFS সবচেয়ে সহজ ও নিরাপদ। প্রতিটি রাউন্ডের শুরুতে কিউ-তে ঠিক কয়টি নোড আছে (`sz = queue.size()`) তা মেপে নিয়ে কেবল সেই `sz`-টি নোড প্রসেস করলেই প্রতিটি লেভেল নিখুঁতভাবে আলাদা লাইনে চলে আসে।',
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
#include <string.h>
typedef struct TreeNode { int val; struct TreeNode *left, *right; } TreeNode;
TreeNode* newNode(int v) {
    TreeNode *u = malloc(sizeof(TreeNode));
    u->val = v; u->left = u->right = NULL;
    return u;
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    char tok[32];
    scanf("%31s", tok);
    TreeNode *root = newNode(atoi(tok));
    TreeNode **q = malloc((size_t)(n + 5) * sizeof(TreeNode*));
    int head = 0, tail = 0;
    q[tail++] = root;
    int read = 1;
    while (head < tail && read < n) {
        TreeNode *u = q[head++];
        scanf("%31s", tok); read++;
        if (strcmp(tok, "#") != 0) { u->left = newNode(atoi(tok)); q[tail++] = u->left; }
        if (read < n) {
            scanf("%31s", tok); read++;
            if (strcmp(tok, "#") != 0) { u->right = newNode(atoi(tok)); q[tail++] = u->right; }
        }
    }
    head = 0; tail = 0;
    q[tail++] = root;
    while (head < tail) {
        int sz = tail - head;
        for (int i = 0; i < sz; i++) {
            TreeNode *u = q[head++];
            printf("%d%s", u->val, i + 1 == sz ? "\\n" : " ");
            if (u->left) q[tail++] = u->left;
            if (u->right) q[tail++] = u->right;
        }
    }
    for (int i = 0; i < tail; i++) free(q[i]);
    free(q);
    return 0;
}`,
      cpp: `#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int v) : val(v) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<string> tok(n);
    for (auto &x : tok) cin >> x;
    TreeNode *root = new TreeNode(stoi(tok[0]));
    queue<TreeNode*> build;
    build.push(root);
    int idx = 1;
    while (!build.empty() && idx < n) {
        TreeNode *u = build.front(); build.pop();
        if (tok[idx] != "#") { u->left = new TreeNode(stoi(tok[idx])); build.push(u->left); }
        idx++;
        if (idx < n && tok[idx] != "#") { u->right = new TreeNode(stoi(tok[idx])); build.push(u->right); }
        idx++;
    }
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = (int)q.size();
        for (int i = 0; i < sz; i++) {
            TreeNode *u = q.front(); q.pop();
            cout << u->val << (i + 1 == sz ? "\\n" : " ");
            if (u->left) q.push(u->left);
            if (u->right) q.push(u->right);
        }
    }
    return 0;
}`,
      python: `from collections import deque
import sys

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

tok = sys.stdin.read().split()
n = int(tok[0])
arr = tok[1:1 + n]
root = TreeNode(int(arr[0]))
build = deque([root])
idx = 1
while build and idx < n:
    u = build.popleft()
    if arr[idx] != '#':
        u.left = TreeNode(int(arr[idx]))
        build.append(u.left)
    idx += 1
    if idx < n and arr[idx] != '#':
        u.right = TreeNode(int(arr[idx]))
        build.append(u.right)
    idx += 1

q = deque([root])
lines = []
while q:
    lvl = []
    for _ in range(len(q)):
        u = q.popleft()
        lvl.append(str(u.val))
        if u.left: q.append(u.left)
        if u.right: q.append(u.right)
    lines.append(" ".join(lvl))
print("\\n".join(lines))`,
      java: `import java.util.*;
public class Main {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] tok = new String[n];
        for (int i = 0; i < n; i++) tok[i] = sc.next();
        TreeNode root = new TreeNode(Integer.parseInt(tok[0]));
        Queue<TreeNode> build = new ArrayDeque<>();
        build.add(root);
        int idx = 1;
        while (!build.isEmpty() && idx < n) {
            TreeNode u = build.poll();
            if (!tok[idx].equals("#")) { u.left = new TreeNode(Integer.parseInt(tok[idx])); build.add(u.left); }
            idx++;
            if (idx < n && !tok[idx].equals("#")) { u.right = new TreeNode(Integer.parseInt(tok[idx])); build.add(u.right); }
            idx++;
        }
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode u = q.poll();
                if (i > 0) sb.append(' ');
                sb.append(u.val);
                if (u.left != null) q.add(u.left);
                if (u.right != null) q.add(u.right);
            }
            sb.append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tok = raw.trim().split(/\\s+/);
const n = Number(tok[0]);
const arr = tok.slice(1, 1 + n);
const root = { val: Number(arr[0]), left: null, right: null };
const build = [root];
let bi = 0, idx = 1;
while (bi < build.length && idx < n) {
  const u = build[bi++];
  if (arr[idx] !== '#') { u.left = { val: Number(arr[idx]), left: null, right: null }; build.push(u.left); }
  idx++;
  if (idx < n && arr[idx] !== '#') { u.right = { val: Number(arr[idx]), left: null, right: null }; build.push(u.right); }
  idx++;
}
let q = [root];
const out = [];
while (q.length) {
  const next = [], vals = [];
  for (const u of q) {
    vals.push(u.val);
    if (u.left) next.push(u.left);
    if (u.right) next.push(u.right);
  }
  out.push(vals.join(' '));
  q = next;
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
const tok: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tok[0]);
const arr: string[] = tok.slice(1, 1 + n);
const root: TreeNode = { val: Number(arr[0]), left: null, right: null };
const build: TreeNode[] = [root];
let bi = 0, idx = 1;
while (bi < build.length && idx < n) {
  const u = build[bi++];
  if (arr[idx] !== '#') { u.left = { val: Number(arr[idx]), left: null, right: null }; build.push(u.left); }
  idx++;
  if (idx < n && arr[idx] !== '#') { u.right = { val: Number(arr[idx]), left: null, right: null }; build.push(u.right); }
  idx++;
}
let q: TreeNode[] = [root];
const out: string[] = [];
while (q.length) {
  const next: TreeNode[] = [];
  const vals: number[] = [];
  for (const u of q) {
    vals.push(u.val);
    if (u.left) next.push(u.left);
    if (u.right) next.push(u.right);
  }
  out.push(vals.join(' '));
  q = next;
}
console.log(out.join('\\n'));`,
      rust: `use std::collections::VecDeque;
use std::io::{self, Read};
struct Node { val: i32, left: Option<usize>, right: Option<usize> }
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let tok: Vec<&str> = s.split_whitespace().collect();
    let n: usize = tok[0].parse().unwrap();
    let arr = &tok[1..1 + n];
    let mut nodes = vec![Node { val: arr[0].parse().unwrap(), left: None, right: None }];
    let mut build = VecDeque::from([0usize]);
    let mut idx = 1usize;
    while let Some(u) = build.pop_front() {
        if idx >= n { break; }
        if arr[idx] != "#" {
            let li = nodes.len();
            nodes.push(Node { val: arr[idx].parse().unwrap(), left: None, right: None });
            nodes[u].left = Some(li);
            build.push_back(li);
        }
        idx += 1;
        if idx < n && arr[idx] != "#" {
            let ri = nodes.len();
            nodes.push(Node { val: arr[idx].parse().unwrap(), left: None, right: None });
            nodes[u].right = Some(ri);
            build.push_back(ri);
        }
        idx += 1;
    }
    let mut q = VecDeque::from([0usize]);
    while !q.is_empty() {
        let sz = q.len();
        let mut line = Vec::with_capacity(sz);
        for _ in 0..sz {
            let u = q.pop_front().unwrap();
            line.push(nodes[u].val.to_string());
            if let Some(l) = nodes[u].left { q.push_back(l); }
            if let Some(r) = nodes[u].right { q.push_back(r); }
        }
        println!("{}", line.join(" "));
    }
}`,
    },
  },

  {
    id: 'interview-tree-max-path-sum-dfs',
    category: 'interview',
    platform: 'FAANG',
    topic: 'Binary Tree',
    sourceTag: 'FAANG Top 150 · Binary Tree DFS',
    companyTags: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    difficulty: 'Hard',
    title: 'Binary Tree Maximum Path Sum (Post-Order DFS)',
    banglaTitle: 'বাইনারি ট্রি সর্বোচ্চ পাথ সাম (পোস্ট-অর্ডার DFS)',
    xpReward: 200,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'A path in a binary tree is any sequence of nodes connected by parent-child edges (each node visited at most once, containing at least one node). Given the tree in level-order ("#" for null), find the maximum possible sum along any path.',
    inputFormat: 'First line: integer n. Second line: n level-order tokens (integer values or "#").',
    outputFormat: 'Print one integer: the maximum path sum.',
    constraints: ['1 <= n <= 10^4', '-10^4 <= node.val <= 10^4'],
    samples: [
      { id: 'mps-s1', input: '7\n-10 9 20 # # 15 7', expectedOutput: '42', explanation: 'Optimal path is 15 -> 20 -> 7 = 42.' },
      { id: 'mps-s2', input: '3\n1 2 3', expectedOutput: '6' },
    ],
    hiddenTests: [
      { id: 'mps-h1', input: '1\n-3', expectedOutput: '-3', isHidden: true },
      { id: 'mps-h2', input: '5\n2 -1 # # 5', expectedOutput: '6', isHidden: true },
    ],
    hints: [
      'Every path has a unique highest node (its "bend" or LCA) where it may take a left branch, a right branch, or both!',
      'At node u, clamp negative child contributions to 0: leftGain = max(0, dfs(u.left)) and rightGain = max(0, dfs(u.right)).',
      'Update global best = max(best, u.val + leftGain + rightGain), but return ONLY u.val + max(leftGain, rightGain) upward to u’s parent!',
    ],
    approaches: {
      brute: {
        label: 'All-Pairs Tree Path Enumeration',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(n)',
        intuition: 'Run DFS from every node as a starting point to find the heaviest simple path.',
        banglaIntuition: 'প্রতিটি নোডকে শুরু ধরে আলাদা DFS চালালে O(n^2) সময় লাগে এবং বড় ট্রিতে TLE আসে।',
        whyTleOrSuboptimal: 'Quadratic O(n^2) recomputes overlapping subpaths repeatedly.',
        pseudocode: 'for u in nodes: ans = max(ans, longestPathFrom(u))',
      },
      better: {
        label: 'Bottom-Up Subtree Path DP Map',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) HashMap',
        intuition: 'Compute post-order downward branch sums into a HashMap<Node, int>, then iterate all nodes to evaluate val + L + R.',
        banglaIntuition: 'সব নোডের নিচে যাওয়ার মান HashMap-এ রেখে পরে যোগ করা—একটি ফাংশনেই একই কাজ O(1) অতিরিক্ত ম্যাপ ছাড়াই করা যায়।',
        whyTleOrSuboptimal: 'Extra HashMap storage when a single post-order DFS tracks the global maximum on the fly.',
        pseudocode: 'gain[u]=u.val+max(0,gain[L],gain[R]); ans=max(u.val+max(0,gain[L])+max(0,gain[R]))',
      },
      optimal: {
        label: 'Single-Pass Post-Order DFS (Split Global vs Return Value)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) tree height',
        intuition: 'Post-order dfs(u) returns the best single downward arm u.val + max(L, R) to its parent while checking u.val + L + R as a complete arch against global best (initialized to -INF for all-negative trees).',
        banglaIntuition: 'একটি পোস্ট-অর্ডার DFS ফাংশন দুটি কাজ করে: ১) বর্তমান নোডটিকে ব্রিজ ধরে L + u.val + R দিয়ে গ্লোবাল ম্যাক্স আপডেট করে, আর ২) প্যারেন্টের কাছে কেবল একটি দিক (u.val + max(L, R)) রিটার্ন করে!',
        whyTleOrSuboptimal: 'Google/Meta Hard Favorite! Visits every node once in O(n).',
        pseudocode: 'dfs(u): L=max(0,dfs(u.left)); R=max(0,dfs(u.right)); best=max(best, u.val+L+R); return u.val+max(L,R)',
      },
    },
    editorial: {
      bruteForceReason: 'Searching paths from every node separately takes O(n^2) time.',
      optimalApproach: 'Post-order DFS decouples the arch sum (used to update the global answer) from the single-branch gain returned to the parent.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      dryRunSteps: [
        { step: 1, state: 'Leaves 9, 15, 7', memoryOrStack: 'gains: 9, 15, 7', note: 'best = 15' },
        { step: 2, state: 'Node 20 (L=15, R=7)', memoryOrStack: 'arch=20+15+7=42; return 20+15=35', note: 'best = 42' },
        { step: 3, state: 'Root -10 (L=9, R=35)', memoryOrStack: 'arch=-10+9+35=34 < 42', note: 'Final best = 42' },
      ],
      banglaEditorial:
        'এই Hard প্রবলেমের মূল কৌশল হলো—একটি পাথ কোনো নোড থেকে নিচে বাঁয়ে ও ডানে উভয় দিকেই নামতে পারে (V-আকৃতি), কিন্তু প্যারেন্টের কাছে ফেরার সময় কেবল একটি শাখাই (হয় বাম, নয় ডান) উপরে পাঠানো যায়! আর কোনো শাখার যোগফল ঋণাত্মক হলে তা না নেওয়াই ভালো (max(0, gain))।',
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
#include <string.h>
typedef struct TreeNode { int val; struct TreeNode *left, *right; } TreeNode;
TreeNode* newNode(int v) {
    TreeNode *u = malloc(sizeof(TreeNode));
    u->val = v; u->left = u->right = NULL;
    return u;
}
long long best = -1000000000000LL;
long long dfs(TreeNode *u) {
    if (!u) return 0;
    long long l = dfs(u->left); if (l < 0) l = 0;
    long long r = dfs(u->right); if (r < 0) r = 0;
    if (u->val + l + r > best) best = u->val + l + r;
    return u->val + (l > r ? l : r);
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    char tok[32]; scanf("%31s", tok);
    TreeNode *root = newNode(atoi(tok));
    TreeNode **q = malloc((size_t)(n + 5) * sizeof(TreeNode*));
    int head = 0, tail = 0, read = 1;
    q[tail++] = root;
    while (head < tail && read < n) {
        TreeNode *u = q[head++];
        scanf("%31s", tok); read++;
        if (strcmp(tok, "#") != 0) { u->left = newNode(atoi(tok)); q[tail++] = u->left; }
        if (read < n) {
            scanf("%31s", tok); read++;
            if (strcmp(tok, "#") != 0) { u->right = newNode(atoi(tok)); q[tail++] = u->right; }
        }
    }
    dfs(root);
    printf("%lld\\n", best);
    for (int i = 0; i < tail; i++) free(q[i]);
    free(q);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int v) : val(v) {}
};
long long bestSum = -1e18;
long long dfs(TreeNode *u) {
    if (!u) return 0;
    long long l = max(0LL, dfs(u->left));
    long long r = max(0LL, dfs(u->right));
    bestSum = max(bestSum, (long long)u->val + l + r);
    return u->val + max(l, r);
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<string> tok(n);
    for (auto &x : tok) cin >> x;
    TreeNode *root = new TreeNode(stoi(tok[0]));
    queue<TreeNode*> q;
    q.push(root);
    int idx = 1;
    while (!q.empty() && idx < n) {
        TreeNode *u = q.front(); q.pop();
        if (tok[idx] != "#") { u->left = new TreeNode(stoi(tok[idx])); q.push(u->left); }
        idx++;
        if (idx < n && tok[idx] != "#") { u->right = new TreeNode(stoi(tok[idx])); q.push(u->right); }
        idx++;
    }
    dfs(root);
    cout << bestSum << "\\n";
    return 0;
}`,
      python: `from collections import deque
import sys
sys.setrecursionlimit(20000)

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

tok = sys.stdin.read().split()
n = int(tok[0])
arr = tok[1:1 + n]
root = TreeNode(int(arr[0]))
q = deque([root])
idx = 1
while q and idx < n:
    u = q.popleft()
    if arr[idx] != '#':
        u.left = TreeNode(int(arr[idx]))
        q.append(u.left)
    idx += 1
    if idx < n and arr[idx] != '#':
        u.right = TreeNode(int(arr[idx]))
        q.append(u.right)
    idx += 1

best = -10**18
def dfs(u):
    global best
    if not u:
        return 0
    l = max(0, dfs(u.left))
    r = max(0, dfs(u.right))
    best = max(best, u.val + l + r)
    return u.val + max(l, r)

dfs(root)
print(best)`,
      java: `import java.util.*;
public class Main {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static long best = Long.MIN_VALUE / 4;
    static long dfs(TreeNode u) {
        if (u == null) return 0;
        long l = Math.max(0, dfs(u.left));
        long r = Math.max(0, dfs(u.right));
        best = Math.max(best, u.val + l + r);
        return u.val + Math.max(l, r);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] tok = new String[n];
        for (int i = 0; i < n; i++) tok[i] = sc.next();
        TreeNode root = new TreeNode(Integer.parseInt(tok[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int idx = 1;
        while (!q.isEmpty() && idx < n) {
            TreeNode u = q.poll();
            if (!tok[idx].equals("#")) { u.left = new TreeNode(Integer.parseInt(tok[idx])); q.add(u.left); }
            idx++;
            if (idx < n && !tok[idx].equals("#")) { u.right = new TreeNode(Integer.parseInt(tok[idx])); q.add(u.right); }
            idx++;
        }
        dfs(root);
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tok = raw.trim().split(/\\s+/);
const n = Number(tok[0]);
const arr = tok.slice(1, 1 + n);
const root = { val: Number(arr[0]), left: null, right: null };
const q = [root];
let qi = 0, idx = 1;
while (qi < q.length && idx < n) {
  const u = q[qi++];
  if (arr[idx] !== '#') { u.left = { val: Number(arr[idx]), left: null, right: null }; q.push(u.left); }
  idx++;
  if (idx < n && arr[idx] !== '#') { u.right = { val: Number(arr[idx]), left: null, right: null }; q.push(u.right); }
  idx++;
}
let best = -Infinity;
function dfs(u) {
  if (!u) return 0;
  const l = Math.max(0, dfs(u.left));
  const r = Math.max(0, dfs(u.right));
  best = Math.max(best, u.val + l + r);
  return u.val + Math.max(l, r);
}
dfs(root);
console.log(best);`,
      typescript: `import * as fs from 'fs';
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
const tok: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tok[0]);
const arr: string[] = tok.slice(1, 1 + n);
const root: TreeNode = { val: Number(arr[0]), left: null, right: null };
const q: TreeNode[] = [root];
let qi = 0, idx = 1;
while (qi < q.length && idx < n) {
  const u = q[qi++];
  if (arr[idx] !== '#') { u.left = { val: Number(arr[idx]), left: null, right: null }; q.push(u.left); }
  idx++;
  if (idx < n && arr[idx] !== '#') { u.right = { val: Number(arr[idx]), left: null, right: null }; q.push(u.right); }
  idx++;
}
let best = -Infinity;
function dfs(u: TreeNode | null): number {
  if (!u) return 0;
  const l = Math.max(0, dfs(u.left));
  const r = Math.max(0, dfs(u.right));
  best = Math.max(best, u.val + l + r);
  return u.val + Math.max(l, r);
}
dfs(root);
console.log(best);`,
      rust: `use std::collections::VecDeque;
use std::io::{self, Read};
struct Node { val: i64, left: Option<usize>, right: Option<usize> }
fn dfs(u: usize, nodes: &[Node], best: &mut i64) -> i64 {
    let l = nodes[u].left.map_or(0, |li| dfs(li, nodes, best)).max(0);
    let r = nodes[u].right.map_or(0, |ri| dfs(ri, nodes, best)).max(0);
    *best = (*best).max(nodes[u].val + l + r);
    nodes[u].val + l.max(r)
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let tok: Vec<&str> = s.split_whitespace().collect();
    let n: usize = tok[0].parse().unwrap();
    let arr = &tok[1..1 + n];
    let mut nodes = vec![Node { val: arr[0].parse().unwrap(), left: None, right: None }];
    let mut q = VecDeque::from([0usize]);
    let mut idx = 1usize;
    while let Some(u) = q.pop_front() {
        if idx >= n { break; }
        if arr[idx] != "#" {
            let li = nodes.len();
            nodes.push(Node { val: arr[idx].parse().unwrap(), left: None, right: None });
            nodes[u].left = Some(li);
            q.push_back(li);
        }
        idx += 1;
        if idx < n && arr[idx] != "#" {
            let ri = nodes.len();
            nodes.push(Node { val: arr[idx].parse().unwrap(), left: None, right: None });
            nodes[u].right = Some(ri);
            q.push_back(ri);
        }
        idx += 1;
    }
    let mut best = i64::MIN / 4;
    dfs(0, &nodes, &mut best);
    println!("{}", best);
}`,
    },
  },
];
