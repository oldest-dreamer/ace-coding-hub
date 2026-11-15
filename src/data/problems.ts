import type { Problem } from '../types/academy';
import { CP_PROBLEMS_BATCH_1 } from './cpProblemsBatch1';
import { CP_PROBLEMS_BATCH_2 } from './cpProblemsBatch2';
import { INTERVIEW_PROBLEMS_BATCH_1 } from './interviewProblemsBatch1';
import { INTERVIEW_PROBLEMS_BATCH_2 } from './interviewProblemsBatch2';

const BASE_PROBLEMS: Problem[] = [
  {
    id: 'cp-weird-collatz',
    category: 'cp',
    sourceTag: 'CSES · Introductory',
    companyTags: ['CSES', 'Codeforces 800', 'Google Warmup'],
    difficulty: 'Easy',
    title: 'Weird Algorithm Sequence',
    banglaTitle: 'অদ্ভুত অ্যালগরিদম সিকোয়েন্স (3n + 1)',
    xpReward: 100,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Consider an algorithm that takes as input a positive integer n. If n is even, divide it by two; if n is odd, multiply it by three and add one. Repeat this until n becomes 1. Print all values of n during the execution.',
    inputFormat: 'The only input line contains an integer n (1 <= n <= 10^6).',
    outputFormat: 'Print a line containing all values of n separated by spaces.',
    constraints: ['1 <= n <= 10^6', 'Warning: intermediate values of n can exceed 32-bit signed integer limits! Use 64-bit integers.'],
    samples: [
      { id: 'w-s1', input: '3', expectedOutput: '3 10 5 16 8 4 2 1', explanation: '3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1' },
    ],
    hiddenTests: [
      { id: 'w-h1', input: '1', expectedOutput: '1', isHidden: true },
      { id: 'w-h2', input: '6', expectedOutput: '6 3 10 5 16 8 4 2 1', isHidden: true },
    ],
    hints: [
      'Notice the constraint n <= 10^6. When n = 113,383, intermediate values climb past 2.4 × 10^9!',
      'Simulate directly with a while loop checking n != 1, using 64-bit integers (long long / i64 / long).',
      'Pseudocode: print n; while n > 1: n = n/2 if even else 3*n+1; print n.',
    ],
    approaches: {
      brute: {
        label: '32-Bit Recursive / String Trace (First Thought)',
        timeComplexity: 'O(steps(n))',
        spaceComplexity: 'O(steps(n))',
        intuition: 'Beginners often use standard 32-bit `int` and store every number in a recursive call stack or giant string.',
        banglaIntuition: 'প্রথমে অনেকেই ৩২-বিট int নিয়ে রিকার্শন চালিয়ে দেয়—এতে n=113383 এলে সংখ্যাটি 2×10^9 ছাড়িয়ে Integer Overflow হয়ে যায়!',
        whyTleOrSuboptimal: '32-bit signed integer overflows mid-sequence (turns negative -> infinite loop or WA), and recursion risks stack overflow.',
        pseudocode: 'solve(int n): print n; if n > 1: solve(n%2==0 ? n/2 : 3*n+1)',
      },
      better: {
        label: '64-Bit Iterative Simulation + Buffer Array',
        timeComplexity: 'O(steps(n))',
        spaceComplexity: 'O(steps(n))',
        intuition: 'Switch to 64-bit `long long` / `i64` and push terms into a vector/list before joining with spaces.',
        banglaIntuition: '৬৪-বিট (long long) ব্যবহার করে লুপ চালালে আর ওভারফ্লো হয় না এবং একসাথে প্রিন্ট করা যায়।',
        whyTleOrSuboptimal: 'Stores the entire output sequence in extra heap memory before printing instead of streaming.',
        pseudocode: 'res = [n]; while n > 1: n = even ? n/2 : 3*n+1; res.push(n); print join(res)',
      },
      optimal: {
        label: '64-Bit O(1)-Space Streaming While Loop',
        timeComplexity: 'O(steps(n))',
        spaceComplexity: 'O(1)',
        intuition: 'Use a 64-bit integer and stream each step directly to buffered stdout inside a simple while loop until n == 1.',
        banglaIntuition: '৬৪-বিট ভ্যারিয়েবল নিয়ে কোনো অতিরিক্ত অ্যারে ছাড়াই লুপের ভেতর সরাসরি আউটপুট দিলে মেমোরি থাকে O(1) এবং কোড চলে সবচেয়ে দ্রুত।',
        whyTleOrSuboptimal: 'Optimal! Handles 64-bit intermediate peaks cleanly in O(1) auxiliary space.',
        pseudocode: 'print n; while n > 1: n = (n & 1) ? 3*n+1 : n>>1; print " " + n',
      },
    },
    editorial: {
      bruteForceReason: 'Direct simulation IS optimal here, EXCEPT using 32-bit int causes signed integer overflow on inputs like 113383, triggering Wrong Answer or Infinite Loop.',
      optimalApproach: 'Use 64-bit integer arithmetic (`long long` in C/C++, `i64` in Rust, `long` in Java, `int` in Python) and stream the sequence cleanly.',
      timeComplexity: 'O(steps(n))',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'n = 3 (odd)', memoryOrStack: 'out: 3', note: '3*3 + 1 = 10' },
        { step: 2, state: 'n = 10 (even)', memoryOrStack: 'out: 3 10', note: '10 / 2 = 5' },
        { step: 3, state: '5 -> 16 -> 8 -> 4 -> 2 -> 1', memoryOrStack: 'halt at 1', note: 'Total 8 values printed' },
      ],
      banglaEditorial:
        'এই সমস্যায় সরাসরি লুপ চালিয়ে সমাধান করা যায়, কিন্তু সবচেয়ে বড় ফাঁদ হলো Integer Overflow! n এর মান ১০^৬ হলেও মাঝপথে 3n+1 বাড়তে বাড়তে ৩২-বিট (2×10^9) ছাড়িয়ে যেতে পারে। তাই অবশ্যই ৬৪-বিট ইন্টিজার (long long / i64) ব্যবহার করতে হবে।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    long long n;\n    if (scanf("%lld", &n) != 1) return 0;\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nn = int(sys.stdin.read().strip())\n# Write your solution\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nlet n = Number(raw.trim());\n`,
      typescript: `import * as fs from 'fs';\nlet n: number = Number(fs.readFileSync(0, 'utf8').trim());\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut n: i64 = s.trim().parse().unwrap();\n}`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 0;
    printf("%lld", n);
    while (n > 1) {
        n = (n % 2 == 0) ? (n / 2) : (3 * n + 1);
        printf(" %lld", n);
    }
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    cin >> n;
    cout << n;
    while (n > 1) {
        n = (n % 2 == 0) ? (n / 2) : (3 * n + 1);
        cout << " " << n;
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys
n = int(sys.stdin.read().strip())
res = [str(n)]
while n > 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    res.append(str(n))
print(" ".join(res))`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        long n = new Scanner(System.in).nextLong();
        StringBuilder sb = new StringBuilder();
        sb.append(n);
        while (n > 1) {
            n = (n % 2 == 0) ? (n / 2) : (3 * n + 1);
            sb.append(' ').append(n);
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let n = Number(raw.trim());
const res = [n];
while (n > 1) {
  n = n % 2 === 0 ? n / 2 : 3 * n + 1;
  res.push(n);
}
console.log(res.join(' '));`,
      typescript: `import * as fs from 'fs';
let n: number = Number(fs.readFileSync(0, 'utf8').trim());
const res: number[] = [n];
while (n > 1) {
  n = n % 2 === 0 ? n / 2 : 3 * n + 1;
  res.push(n);
}
console.log(res.join(' '));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut n: i64 = s.trim().parse().unwrap();
    let mut out = vec![n.to_string()];
    while n > 1 {
        n = if n % 2 == 0 { n / 2 } else { 3 * n + 1 };
        out.push(n.to_string());
    }
    println!("{}", out.join(" "));
}`,
    },
  },

  {
    id: 'interview-two-sum',
    category: 'interview',
    sourceTag: 'FAANG Top 150 · Array/Hash',
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'],
    difficulty: 'Easy',
    title: 'Two Sum (Hash Complement)',
    banglaTitle: 'টু সাম (হ্যাশ ম্যাপ কমপ্লিমেন্ট)',
    xpReward: 110,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given an array of integers nums and an integer target, find the 0-based indices i < j such that nums[i] + nums[j] == target. Assume exactly one valid pair exists.',
    inputFormat: 'First line: n and target. Second line: n space-separated integers.',
    outputFormat: 'Print two 0-based indices i and j separated by a space.',
    constraints: ['2 <= n <= 10^5', '-10^9 <= nums[i], target <= 10^9'],
    samples: [
      { id: 'ts-s1', input: '4 9\n2 7 11 15', expectedOutput: '0 1', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
    ],
    hiddenTests: [
      { id: 'ts-h1', input: '3 6\n3 2 4', expectedOutput: '1 2', isHidden: true },
      { id: 'ts-h2', input: '2 6\n3 3', expectedOutput: '0 1', isHidden: true },
    ],
    hints: [
      'If you know nums[j], what exact number must exist earlier in the array? complement = target - nums[j].',
      'Store previously visited values and their indices in a HashMap for O(1) average lookup.',
      'For each index j: if (target - nums[j]) is in seen, return seen[target - nums[j]] and j; otherwise seen[nums[j]] = j.',
    ],
    approaches: {
      brute: {
        label: 'Nested Loop All Pairs (First Thought)',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'Try every index i from 0..n-1 and every j from i+1..n-1, checking if nums[i] + nums[j] == target.',
        banglaIntuition: 'দুইটি নেস্টেড লুপ চালিয়ে প্রতিটি জোড়া (i, j) যোগ করে target-এর সমান কি না দেখা—সবচেয়ে সহজ চিন্তা, কিন্তু ধীর।',
        whyTleOrSuboptimal: 'Gives TLE! For n = 10^5, ~5 × 10^9 pair checks take ~50 seconds vs the 1 second limit.',
        pseudocode: 'for i in 0..n: for j in i+1..n: if nums[i] + nums[j] == target: print i, j',
      },
      better: {
        label: 'Sort (Value, Index) Pairs + Two Pointers',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Store (value, originalIndex) pairs, sort by value, and move left/right pointers inward based on sum vs target.',
        banglaIntuition: 'সংখ্যাগুলোকে (মান, মূল ইনডেক্স) জোড়া হিসেবে সর্ট করে দুই পাশ থেকে Left ও Right পয়েন্টার এনে জোড়া খোঁজা।',
        whyTleOrSuboptimal: 'Passes 1s limit cleanly, though sorting costs O(n log n) extra time compared to hashing.',
        pseudocode: 'sort pairs; l=0, r=n-1; while l<r: sum<target ? l++ : sum>target ? r-- : return idx',
      },
      optimal: {
        label: 'Single-Pass HashMap Complement Lookup',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'As you scan x = nums[i], look up (target - x) in an O(1) HashMap of previously seen values; if absent, insert x -> i.',
        banglaIntuition: 'একবার লুপ চালিয়ে প্রতিবার ভাবি: আমার হাতে x আছে, তাই আর শুধু (target - x) দরকার! সেটি আগে দেখা হয়েছে কি না HashMap-এ O(1) সময়ে চেক করি।',
        whyTleOrSuboptimal: 'Interview Winner! Achieves optimal O(n) single-pass runtime.',
        pseudocode: 'seen={}; for i, x in nums: if (target-x) in seen: return seen[target-x], i; seen[x]=i',
      },
    },
    editorial: {
      bruteForceReason: 'Checking every pair (i, j) takes O(n^2) time. When n = 10^5, 5 × 10^9 comparisons trigger TLE.',
      optimalApproach: 'Single-pass HashMap: as we scan index j from 0 to n-1, check if (target - nums[j]) already exists in the map. This drops runtime from O(n^2) to O(n).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'j=0, val=2, need=7', memoryOrStack: 'map={2:0}', note: '7 not in map yet; store 2->0' },
        { step: 2, state: 'j=1, val=7, need=2', memoryOrStack: 'found 2 at idx 0', note: 'Return 0 1 immediately!' },
      ],
      banglaEditorial:
        'ব্রুট ফোর্স (দুইটি লুপ) চালালে O(n^2) সময় লাগে যা n = 10^5 এর জন্য TLE দেবে। এর বদলে একটি HashMap-এ আগের দেখা সংখ্যা ও তার ইনডেক্স জমা রাখো। বর্তমান সংখ্যা x হলে চেক করো (target - x) আগে দেখা হয়েছে কি না—এক পাসেই O(n) সময়ে উত্তর পাওয়া যাবে!',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    int n; long long target;\n    scanf("%d %lld", &n, &target);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; long long target; cin >> n >> target;\n    return 0;\n}`,
      python: `import sys\ndata = list(map(int, sys.stdin.read().split()))\nn, target = data[0], data[1]\nnums = data[2:2+n]\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct { long long key; int idx; } Item;
int cmp(const void *a, const void *b) {
    long long d = ((Item*)a)->key - ((Item*)b)->key;
    return (d > 0) - (d < 0);
}
int main(void) {
    int n; long long target;
    if (scanf("%d %lld", &n, &target) != 2) return 0;
    Item *arr = malloc(n * sizeof(Item));
    for (int i = 0; i < n; i++) { scanf("%lld", &arr[i].key); arr[i].idx = i; }
    qsort(arr, n, sizeof(Item), cmp);
    int l = 0, r = n - 1;
    while (l < r) {
        long long s = arr[l].key + arr[r].key;
        if (s == target) {
            int i = arr[l].idx, j = arr[r].idx;
            if (i > j) { int t = i; i = j; j = t; }
            printf("%d %d\\n", i, j);
            break;
        }
        if (s < target) l++; else r--;
    }
    free(arr);
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long target;
    cin >> n >> target;
    unordered_map<long long, int> seen;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        auto it = seen.find(target - x);
        if (it != seen.end()) {
            cout << it->second << " " << i << "\\n";
            return 0;
        }
        seen[x] = i;
    }
    return 0;
}`,
      python: `import sys
data = list(map(int, sys.stdin.read().split()))
n, target = data[0], data[1]
nums = data[2:2 + n]
seen = {}
for i, x in enumerate(nums):
    need = target - x
    if need in seen:
        print(seen[need], i)
        break
    seen[x] = i`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long target = sc.nextLong();
        Map<Long, Integer> seen = new HashMap<>();
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            long need = target - x;
            if (seen.containsKey(need)) {
                System.out.println(seen.get(need) + " " + i);
                return;
            }
            seen.put(x, i);
        }
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const [n, target] = d;
const seen = new Map();
for (let i = 0; i < n; i++) {
  const x = d[2 + i];
  const need = target - x;
  if (seen.has(need)) { console.log(\`\${seen.get(need)} \${i}\`); break; }
  seen.set(x, i);
}`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, target] = d;
const seen = new Map<number, number>();
for (let i = 0; i < n; i++) {
  const x = d[2 + i];
  const need = target - x;
  if (seen.has(need)) { console.log(\`\${seen.get(need)} \${i}\`); break; }
  seen.set(x, i);
}`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (d[0] as usize, d[1]);
    let mut seen: HashMap<i64, usize> = HashMap::new();
    for i in 0..n {
        let x = d[2 + i];
        if let Some(&j) = seen.get(&(target - x)) {
            println!("{} {}", j, i);
            return;
        }
        seen.insert(x, i);
    }
}`,
    },
  },

  {
    id: 'cp-kadane-max-subarray',
    category: 'cp',
    sourceTag: 'CSES · Sorting & Searching',
    companyTags: ['Microsoft', 'Amazon', 'LinkedIn', 'CSES', 'Atlassian'],
    difficulty: 'Medium',
    title: 'Maximum Subarray Sum (Kadane)',
    banglaTitle: 'সর্বোচ্চ সাব-অ্যারে যোগফল (ক্যাডানে অ্যালগরিদম)',
    xpReward: 140,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given an array of n integers (which may be negative), find the maximum sum of a contiguous non-empty subarray.',
    inputFormat: 'First line: integer n. Second line: n integers.',
    outputFormat: 'Print a single integer: the maximum subarray sum.',
    constraints: ['1 <= n <= 2 × 10^5', '-10^9 <= a[i] <= 10^9'],
    samples: [
      { id: 'k-s1', input: '8\n-1 3 -2 5 3 -5 2 2', expectedOutput: '9', explanation: 'Subarray [3, -2, 5, 3] has sum 9.' },
    ],
    hiddenTests: [
      { id: 'k-h1', input: '4\n-5 -2 -9 -1', expectedOutput: '-1', isHidden: true },
      { id: 'k-h2', input: '5\n1 2 3 4 5', expectedOutput: '15', isHidden: true },
    ],
    hints: [
      'At each index i, the best subarray ending at i either extends the previous subarray or starts fresh at a[i].',
      'Use Kadane’s DP relation: cur = max(a[i], cur + a[i]); best = max(best, cur).',
      'Initialize cur = a[0] and best = a[0] using 64-bit integers so all-negative arrays work!',
    ],
    approaches: {
      brute: {
        label: 'Triple Nested Subarray Sum (First Thought)',
        timeComplexity: 'O(n^3)',
        spaceComplexity: 'O(1)',
        intuition: 'Pick every start l, every end r >= l, and loop k from l to r to compute the sum.',
        banglaIntuition: 'তিনটি লুপ চালিয়ে সব সাব-অ্যারে [l..r] আলাদা করে যোগফল বের করা—অতি ধীর।',
        whyTleOrSuboptimal: 'Massive TLE! For n = 2×10^5, O(n^3) needs 8 × 10^15 operations.',
        pseudocode: 'for l in 0..n: for r in l..n: sum=0; for k in l..r: sum+=a[k]; best=max(best,sum)',
      },
      better: {
        label: 'Running Sum / Prefix Sum Two Loops',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'Keep a running sum while expanding r from l to n-1 so inner summation drops from O(n) to O(1).',
        banglaIntuition: 'দ্বিতীয় লুপেই চলমান যোগফল রেখে দিলে তৃতীয় লুপ লাগে না, সময় কমে O(n^2) হয়—তবুও n = 2×10^5 এ TLE খায়।',
        whyTleOrSuboptimal: 'Still TLE on n = 2×10^5 because (2×10^5)^2 = 4×10^10 > 10^8 ops/sec.',
        pseudocode: 'for l in 0..n: sum=0; for r in l..n: sum+=a[r]; best=max(best,sum)',
      },
      optimal: {
        label: 'Kadane’s Algorithm (O(n) Single-Pass DP)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        intuition: 'Maintain cur = max(a[i], cur + a[i]). Whenever the carried prefix sum becomes negative, discard it and restart at a[i].',
        banglaIntuition: 'আগের সাব-অ্যারের যোগফল যদি বোঝা হয়ে দাঁড়ায় (ঋণাত্মক হয়ে যায়), তাহলে সেটা ফেলে দিয়ে বর্তমান সংখ্যা থেকেই নতুন করে শুরু করো—এটাই Kadane’s Algorithm!',
        whyTleOrSuboptimal: 'Interview & Contest Winner! Linear time O(n) and O(1) extra space.',
        pseudocode: 'cur=best=a[0]; for i in 1..n: cur=max(a[i], cur+a[i]); best=max(best, cur)',
      },
    },
    editorial: {
      bruteForceReason: 'Testing all O(n^2) pairs (l, r) takes 4 × 10^10 steps for n = 2 × 10^5, causing TLE.',
      optimalApproach: 'Kadane’s Algorithm tracks the maximum sum ending at the current element in a single O(n) pass with O(1) memory. If the running prefix turns worse than starting fresh at a[i], reset.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      dryRunSteps: [
        { step: 1, state: 'a=[-1, 3, -2, 5, 3]', memoryOrStack: 'cur=-1, best=-1', note: 'Start at index 0' },
        { step: 2, state: 'i=1 (val=3)', memoryOrStack: 'cur=max(3, 2)=3, best=3', note: 'Drop negative prefix -1' },
        { step: 3, state: 'i=2..4 (-2, +5, +3)', memoryOrStack: 'cur=1->6->9, best=9', note: 'Peak subarray sum = 9' },
      ],
      banglaEditorial:
        'নেস্টেড লুপে সব সাব-অ্যারে যোগ করলে O(n^2) সময় লাগে। Kadane’s Algorithm-এ প্রতিটি ধাপে শুধু ভাবি: আগের সাব-অ্যারের সাথে current সংখ্যা যোগ করলে ভালো হবে, নাকি এখান থেকে নতুন করে শুরু করলে? এই একটি সিদ্ধান্তেই O(n) সময়ে উত্তর আসে। সব সংখ্যা ঋণাত্মক হলে উত্তর ঋণাত্মক হতে পারে, তাই cur ও best কে a[0] দিয়ে শুরু করতে হবে।',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    int n; scanf("%d", &n);\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}`,
      python: `import sys\ndata = list(map(int, sys.stdin.read().split()))\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long x, cur, best;
    scanf("%lld", &x);
    cur = best = x;
    for (int i = 1; i < n; i++) {
        scanf("%lld", &x);
        cur = (cur + x > x) ? (cur + x) : x;
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    long long x, cur, best;
    cin >> x;
    cur = best = x;
    for (int i = 1; i < n; i++) {
        cin >> x;
        cur = max(x, cur + x);
        best = max(best, cur);
    }
    cout << best << "\\n";
    return 0;
}`,
      python: `import sys
nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
arr = nums[1:1 + n]
cur = best = arr[0]
for x in arr[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)
print(best)`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long cur = sc.nextLong();
        long best = cur;
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
const nums = raw.trim().split(/\\s+/).map(Number);
let cur = nums[1], best = nums[1];
for (let i = 2; i <= nums[0]; i++) {
  cur = Math.max(nums[i], cur + nums[i]);
  best = Math.max(best, cur);
}
console.log(best);`,
      typescript: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let cur = nums[1], best = nums[1];
for (let i = 2; i <= nums[0]; i++) {
  cur = Math.max(nums[i], cur + nums[i]);
  best = Math.max(best, cur);
}
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

  {
    id: 'interview-valid-parens',
    category: 'interview',
    sourceTag: 'FAANG Top 150 · Stack',
    companyTags: ['Meta', 'Amazon', 'Google', 'Bloomberg', 'Atlassian'],
    difficulty: 'Easy',
    title: 'Valid Parentheses Balance',
    banglaTitle: 'সঠিক ব্র্যাকেট ব্যালেন্সিং (স্ট্যাক)',
    xpReward: 115,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given a string containing just the characters (, ), {, }, [ and ], determine if the input string is valid. Print YES if valid, otherwise NO.',
    inputFormat: 'A single non-empty string s of bracket characters.',
    outputFormat: 'Print YES or NO.',
    constraints: ['1 <= |s| <= 10^5'],
    samples: [
      { id: 'vp-s1', input: '({[]})', expectedOutput: 'YES' },
      { id: 'vp-s2', input: '([)]', expectedOutput: 'NO' },
    ],
    hiddenTests: [
      { id: 'vp-h1', input: '((()))[]{}', expectedOutput: 'YES', isHidden: true },
      { id: 'vp-h2', input: '(((', expectedOutput: 'NO', isHidden: true },
    ],
    hints: [
      'The most recently opened bracket must be the first one closed (LIFO order).',
      'Use a Stack! Push opening brackets; when seeing a closing bracket, check if the stack top matches.',
      'At the end, the stack MUST be empty—otherwise unclosed openers remain.',
    ],
    approaches: {
      brute: {
        label: 'Repeated String Replacement "()","[]","{}"',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(n)',
        intuition: 'Keep replacing adjacent valid pairs "()", "[]", "{}" with "" until no replacements happen; check if string is empty.',
        banglaIntuition: 'স্ট্রিংয়ের ভেতর থেকে বারবার "()", "[]", "{}" কেটে বাদ দেওয়া। প্রতিবার খুঁজতে ও কাটতে O(n) লাগে বলে মোট সময় O(n^2) হয়ে যায়।',
        whyTleOrSuboptimal: 'Gives TLE for |s| = 10^5 on deeply nested strings like "((((...))))".',
        pseudocode: 'while contains("()"|"[]"|"{{}}"): replace pairs with ""; return s == ""',
      },
      better: {
        label: 'Two-Pointer / In-Place Index Stack Simulation',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) (or O(1) mutating char array)',
        intuition: 'Simulate a top index pointer over a mutable character buffer to avoid dynamic object/string allocations.',
        banglaIntuition: 'আলাদা অবজেক্ট না বানিয়ে একটি অ্যারে ও top ইনডেক্স দিয়ে স্ট্যাকের কাজ চালানো।',
        whyTleOrSuboptimal: 'Already O(n), though mutating input directly can harm readability in immutable-string languages.',
        pseudocode: 'top=-1; for c in s: if opener buffer[++top]=c else match(buffer[top--], c)',
      },
      optimal: {
        label: 'Single-Pass Stack with Hash/Switch Matching',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: 'Push every opening bracket onto a LIFO stack. On any closing bracket, verify stack is non-empty and top matches.',
        banglaIntuition: 'যে ব্র্যাকেট সবার শেষে খোলে, সেটি সবার আগে বন্ধ হয় (LIFO)—তাই Stack দিয়ে এক পাসেই O(n) সময়ে ১০০% নির্ভুল উত্তর আসে।',
        whyTleOrSuboptimal: 'Interview Winner! Cleanest O(n) time solution with zero edge-case flaws.',
        pseudocode: 'for c in s: if open push(c) else if empty or pop()!=match[c] return NO; return empty',
      },
    },
    editorial: {
      bruteForceReason: 'Repeatedly replacing "()", "[]", "{}" in a string takes O(n^2) time in the worst case.',
      optimalApproach: 'Use a Stack in O(n) time and O(n) space: push openers, pop & match on closers, verify stack is empty at the end.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Read "(" "{" "["', memoryOrStack: 'stack = [(, {, []', note: 'Push opening brackets' },
        { step: 2, state: 'Read "]" "}" ")"', memoryOrStack: 'stack = []', note: 'Each matches top and pops' },
        { step: 3, state: 'End of string', memoryOrStack: 'empty -> YES', note: 'All pairs closed in order' },
      ],
      banglaEditorial:
        'ব্র্যাকেট বন্ধ করার নিয়ম হলো: যেটি সবার শেষে খুলেছে, সেটি সবার আগে বন্ধ হবে (LIFO)। এই কাজের জন্য Stack সেরা ডেটা স্ট্রাকচার। ওপেনিং ব্র্যাকেট পেলে স্ট্যাকে পুশ করো, ক্লোজিং পেলে স্ট্যাকের টপের সাথে মিলিয়ে পপ করো। শেষে স্ট্যাক ফাঁকা থাকলে YES, নইলে NO!',
    },
    starterTemplates: {
      c: `#include <stdio.h>\nint main(void) {\n    char s[100005]; scanf("%100000s", s);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    return 0;\n}`,
      python: `import sys\ns = sys.stdin.read().strip()\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst s = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim();\n`,
      typescript: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').trim();\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    },
    solutions: {
      c: `#include <stdio.h>
char st[100005];
int main(void) {
    char s[100005];
    if (scanf("%100000s", s) != 1) return 0;
    int top = 0;
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') st[top++] = c;
        else {
            if (top == 0) { printf("NO\\n"); return 0; }
            char t = st[--top];
            if ((c == ')' && t != '(') || (c == '}' && t != '{') || (c == ']' && t != '[')) {
                printf("NO\\n"); return 0;
            }
        }
    }
    printf("%s\\n", top == 0 ? "YES" : "NO");
    return 0;
}`,
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;
int main() {
    string s; cin >> s;
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) { cout << "NO\\n"; return 0; }
            char t = st.top(); st.pop();
            if ((c == ')' && t != '(') || (c == '}' && t != '{') || (c == ']' && t != '[')) {
                cout << "NO\\n"; return 0;
            }
        }
    }
    cout << (st.empty() ? "YES" : "NO") << "\\n";
    return 0;
}`,
      python: `import sys
s = sys.stdin.read().strip()
pairs = {')': '(', '}': '{', ']': '['}
st = []
ok = True
for c in s:
    if c in '({[':
        st.append(c)
    elif not st or st.pop() != pairs.get(c):
        ok = False
        break
print("YES" if ok and not st else "NO")`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.isEmpty()) { System.out.println("NO"); return; }
                char t = st.pop();
                if ((c == ')' && t != '(') || (c == '}' && t != '{') || (c == ']' && t != '[')) {
                    System.out.println("NO"); return;
                }
            }
        }
        System.out.println(st.isEmpty() ? "YES" : "NO");
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const s = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim();
const match = { ')': '(', '}': '{', ']': '[' };
const st = [];
let ok = true;
for (const c of s) {
  if ('({['.includes(c)) st.push(c);
  else if (st.pop() !== match[c]) { ok = false; break; }
}
console.log(ok && st.length === 0 ? 'YES' : 'NO');`,
      typescript: `import * as fs from 'fs';
const s: string = fs.readFileSync(0, 'utf8').trim();
const match: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
const st: string[] = [];
let ok = true;
for (const c of s) {
  if (c === '(' || c === '{' || c === '[') st.push(c);
  else if (st.pop() !== match[c]) { ok = false; break; }
}
console.log(ok && st.length === 0 ? 'YES' : 'NO');`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut st = Vec::new();
    for c in s.trim().chars() {
        match c {
            '(' | '{' | '[' => st.push(c),
            ')' => if st.pop() != Some('(') { println!("NO"); return; },
            '}' => if st.pop() != Some('{') { println!("NO"); return; },
            ']' => if st.pop() != Some('[') { println!("NO"); return; },
            _ => {}
        }
    }
    println!("{}", if st.is_empty() { "YES" } else { "NO" });
}`,
    },
  },

  {
    id: 'cp-binary-search-bounds',
    category: 'cp',
    sourceTag: 'Codeforces 1300 · Binary Search',
    companyTags: ['Codeforces 1300', 'Google', 'Microsoft', 'Uber'],
    difficulty: 'Medium',
    title: 'Lower Bound Frequency Query',
    banglaTitle: 'বাইনারি সার্চ লোয়ার বাউন্ড কুয়েরি',
    xpReward: 150,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Given a sorted array of n integers and q queries, for each query value x, print how many elements in the array are strictly less than x.',
    inputFormat: 'First line: n and q. Second line: n sorted integers. Next q values: query integers x.',
    outputFormat: 'For each query, print the count of elements < x on a space-separated line.',
    constraints: ['1 <= n, q <= 10^5', 'Array is sorted in non-decreasing order'],
    samples: [
      { id: 'bs-s1', input: '5 3\n1 3 3 7 9\n3 8 1', expectedOutput: '1 4 0' },
    ],
    hiddenTests: [
      { id: 'bs-h1', input: '4 2\n2 4 6 8\n10 0', expectedOutput: '4 0', isHidden: true },
    ],
    hints: [
      'Linearly counting elements < x per query takes O(n * q) = 10^10 operations (TLE).',
      'Since the array is sorted, the count of elements < x is exact index of the first element >= x (lower_bound)!',
      'Binary search range [lo=0, hi=n): if a[mid] < x then lo = mid + 1 else hi = mid. Answer is lo.',
    ],
    approaches: {
      brute: {
        label: 'Linear Scan per Query (First Thought)',
        timeComplexity: 'O(n * q)',
        spaceComplexity: 'O(n)',
        intuition: 'For each of the q queries, loop i from 0 to n-1 and increment count whenever a[i] < x.',
        banglaIntuition: 'প্রতিটি কুয়েরির জন্য শুরু থেকে শেষ পর্যন্ত পুরো অ্যারে গুনে দেখা x-এর চেয়ে ছোট কয়টি আছে।',
        whyTleOrSuboptimal: 'Gives TLE! With n = 10^5 and q = 10^5, 10^10 comparisons far exceed 1 second.',
        pseudocode: 'for x in queries: cnt=0; for v in a: if v < x: cnt++; print cnt',
      },
      better: {
        label: 'Sort Queries + One-Pass Two-Pointer Sweep',
        timeComplexity: 'O(q log q + n + q)',
        spaceComplexity: 'O(n + q)',
        intuition: 'Pair each query with its original index, sort queries ascending, and advance a single pointer over sorted array a.',
        banglaIntuition: 'কুয়েরিগুলোকে সর্ট করে নিলে একটি পয়েন্টার সামনে এগিয়ে নিয়েই সব কুয়েরির উত্তর দেওয়া যায়।',
        whyTleOrSuboptimal: 'Offline method: requires storing and re-ordering all queries before answering any.',
        pseudocode: 'sort (x, idx); ptr=0; for (x,idx): while ptr<n and a[ptr]<x: ptr++; ans[idx]=ptr',
      },
      optimal: {
        label: 'Binary Search Lower Bound (Online O(log n) / Query)',
        timeComplexity: 'O((n + q) log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Exploit sorted order: binary search for the first index i where a[i] >= x. Every element before i is strictly < x, so count = i.',
        banglaIntuition: 'অ্যারে সর্টেড থাকায় প্রতি ধাপে মাঝখান দেখে অর্ধেক বাদ দেওয়া (Binary Search / lower_bound)—মাত্র ~১৭ ধাপেই ১ লক্ষ সংখ্যার ভেতর উত্তর মেলে!',
        whyTleOrSuboptimal: 'Contest & Interview Winner! Answers each query independently online in O(log n).',
        pseudocode: 'lo=0, hi=n; while lo<hi: mid=(lo+hi)/2; if a[mid]<x lo=mid+1 else hi=mid; return lo',
      },
    },
    editorial: {
      bruteForceReason: 'Scanning the array for each of q queries is O(n * q), which exceeds 10^8 ops when n, q = 10^5.',
      optimalApproach: 'Binary search (lower_bound) finds the first index where a[idx] >= x in O(log n) per query, achieving O((n + q) log n) total.',
      timeComplexity: 'O((n + q) log n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Query x=3 on [1,3,3,7,9]', memoryOrStack: 'lo=0, hi=5, mid=2', note: 'a[2]=3 >= 3 -> hi=2' },
        { step: 2, state: 'lo=0, hi=2, mid=1', memoryOrStack: 'a[1]=3 >= 3 -> hi=1', note: 'Move hi left' },
        { step: 3, state: 'lo=0, hi=1, mid=0', memoryOrStack: 'a[0]=1 < 3 -> lo=1', note: 'lo==hi==1 -> answer is 1' },
      ],
      banglaEditorial:
        'প্রতিটি কুয়েরির জন্য পুরো অ্যারে স্ক্যান করলে O(n × q) সময় লাগবে। যেহেতু অ্যারেটি আগে থেকেই সর্টেড, তাই x-এর চেয়ে ছোট কতটি সংখ্যা আছে তা বের করতে প্রথম (>= x) উপাদানের ইনডেক্স খুঁজলেই চলে—একেই Lower Bound বলে। বাইনারি সার্চে এটি মাত্র O(log n) ধাপে পাওয়া যায়!',
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
int lower_bound(const int *a, int n, int x) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
int main(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    int *a = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 0; i < q; i++) {
        int x; scanf("%d", &x);
        printf("%d%s", lower_bound(a, n, x), i + 1 == q ? "\\n" : " ");
    }
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
    int n, q; cin >> n >> q;
    vector<int> a(n);
    for (int &v : a) cin >> v;
    for (int i = 0; i < q; i++) {
        int x; cin >> x;
        int idx = lower_bound(a.begin(), a.end(), x) - a.begin();
        cout << idx << (i + 1 == q ? "\\n" : " ");
    }
    return 0;
}`,
      python: `import bisect, sys
d = list(map(int, sys.stdin.read().split()))
n, q = d[0], d[1]
arr = d[2:2 + n]
queries = d[2 + n:2 + n + q]
print(" ".join(str(bisect.bisect_left(arr, x)) for x in queries))`,
      java: `import java.util.*;
public class Main {
    static int lowerBound(int[] a, int x) {
        int lo = 0, hi = a.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] < x) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            if (i > 0) sb.append(' ');
            sb.append(lowerBound(a, sc.nextInt()));
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const [n, q] = d;
const a = d.slice(2, 2 + n);
const lb = (x) => {
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] < x) lo = mid + 1; else hi = mid;
  }
  return lo;
};
console.log(d.slice(2 + n, 2 + n + q).map(lb).join(' '));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, q] = d;
const a = d.slice(2, 2 + n);
const lb = (x: number): number => {
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] < x) lo = mid + 1; else hi = mid;
  }
  return lo;
};
console.log(d.slice(2 + n, 2 + n + q).map(lb).join(' '));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, q) = (d[0] as usize, d[1] as usize);
    let a = &d[2..2 + n];
    let ans: Vec<String> = d[2 + n..2 + n + q].iter().map(|&x| a.partition_point(|&v| v < x).to_string()).collect();
    println!("{}", ans.join(" "));
}`,
    },
  },

  {
    id: 'interview-coin-change',
    category: 'interview',
    sourceTag: 'FAANG Top 150 · Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Atlassian', 'Meta'],
    difficulty: 'Hard',
    title: 'Minimum Coin Change (Bottom-Up DP)',
    banglaTitle: 'ন্যূনতম কয়েন চেঞ্জ (ডায়নামিক প্রোগ্রামিং)',
    xpReward: 190,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'You are given n coin denominations and a target amount S. Compute the fewest number of coins needed to make up amount S. If S cannot be formed, print -1.',
    inputFormat: 'First line: n and S. Second line: n coin denominations.',
    outputFormat: 'Print a single integer: the minimum number of coins or -1.',
    constraints: ['1 <= n <= 100', '0 <= S <= 10^4', '1 <= coin[i] <= 10^4'],
    samples: [
      { id: 'cc-s1', input: '3 11\n1 2 5', expectedOutput: '3', explanation: '11 = 5 + 5 + 1 (3 coins)' },
      { id: 'cc-s2', input: '1 3\n2', expectedOutput: '-1' },
    ],
    hiddenTests: [
      { id: 'cc-h1', input: '3 6\n1 3 4', expectedOutput: '2', isHidden: true },
    ],
    hints: [
      'Greedy (always picking the largest coin) FAILS! For coins [1, 3, 4] and S=6, greedy picks 4+1+1 (3 coins) while optimal is 3+3 (2 coins).',
      'Define dp[x] = minimum coins needed to form sum x, with dp[0] = 0 and dp[1..S] = INF.',
      'Transition: for each x from 1 to S and each coin c <= x: dp[x] = min(dp[x], dp[x - c] + 1).',
    ],
    approaches: {
      brute: {
        label: 'Pure Recursion Try-Every-Coin (First Thought)',
        timeComplexity: 'O(n^S)',
        spaceComplexity: 'O(S) call stack',
        intuition: 'Recursively try subtracting each coin c from remaining amount rem and take 1 + min(solve(rem - c)).',
        banglaIntuition: 'সব কয়েন দিয়ে আলাদাভাবে চেষ্টা করে দেখা—একই অঙ্কের হিসাব কোটি কোটি বার রিপিট হয় বলে কোড হ্যাং হয়ে যায়!',
        whyTleOrSuboptimal: 'Exponential TLE! Recomputes identical subproblems millions of times (also Greedy fails on [1,3,4], S=6).',
        pseudocode: 'solve(rem): if rem==0 return 0; best=INF; for c: best=min(best, 1+solve(rem-c))',
      },
      better: {
        label: 'Top-Down Recursion + Memoization Table',
        timeComplexity: 'O(n * S)',
        spaceComplexity: 'O(S) memo + O(S) recursion stack',
        intuition: 'Cache computed results in memo[rem] so each amount 0..S is solved at most once.',
        banglaIntuition: 'আগে করা হিসাব memo অ্যারেতে সেভ করে রাখলে আর বারবার হিসাব করতে হয় না।',
        whyTleOrSuboptimal: 'Optimal time O(n*S), though deep recursion for S=10^4 incurs function-call stack overhead.',
        pseudocode: 'if memo[rem]!=-1 return memo[rem]; memo[rem]=min(1+solve(rem-c))',
      },
      optimal: {
        label: 'Bottom-Up 1D Tabulation DP (Iterative)',
        timeComplexity: 'O(n * S)',
        spaceComplexity: 'O(S)',
        intuition: 'Build dp[0..S] bottom-up from base case dp[0]=0: for x=1..S, transition dp[x] = min(dp[x], dp[x-c] + 1) across coins c <= x.',
        banglaIntuition: '০ থেকে শুরু করে S পর্যন্ত ছোট ছোট অঙ্কের উত্তর টেবিলে সাজিয়ে নিলে কোনো রিকার্শন ছাড়াই দ্রুততম ও নিরাপদ সমাধান পাওয়া যায়।',
        whyTleOrSuboptimal: 'Interview & CP Winner! Zero recursion overhead and tight sequential cache locality.',
        pseudocode: 'dp=[INF]*(S+1); dp[0]=0; for x in 1..S: for c in coins: if c<=x: dp[x]=min(dp[x], dp[x-c]+1)',
      },
    },
    editorial: {
      bruteForceReason: 'Greedy fails on canonical counterexamples like [1, 3, 4] for target 6, while naive recursion explodes to exponential O(n^S) time.',
      optimalApproach: '1D Bottom-Up Dynamic Programming computes dp[0..S] iteratively in O(n * S) time and O(S) space.',
      timeComplexity: 'O(n * S)',
      spaceComplexity: 'O(S)',
      dryRunSteps: [
        { step: 1, state: 'coins=[1,3,4], S=6', memoryOrStack: 'dp=[0,INF,INF,INF,INF,INF,INF]', note: 'Initialize base case dp[0]=0' },
        { step: 2, state: 'Fill x=1..5', memoryOrStack: 'dp[1]=1, dp[2]=2, dp[3]=1, dp[4]=1, dp[5]=2', note: 'Optimal subproblems stored' },
        { step: 3, state: 'Compute dp[6]', memoryOrStack: 'min(dp[5]+1, dp[3]+1, dp[2]+1) = 2', note: 'Outputs 2 (3 + 3)' },
      ],
      banglaEditorial:
        'এখানে সব সময় সবচেয়ে বড় কয়েন নিলে (Greedy) ভুল উত্তর আসতে পারে—যেমন কয়েন [1, 3, 4] এবং টার্গেট 6 হলে গ্রিডি নেবে 4+1+1 (৩টি), কিন্তু আসল উত্তর 3+3 (২টি)! তাই dp[x] অ্যারে বানিয়ে 0 থেকে S পর্যন্ত প্রতিটি অঙ্কের সর্বনিম্ন কয়েন সংখ্যা সেভ করে রেখে সমাধান করতে হয়।',
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
    int n, S;
    if (scanf("%d %d", &n, &S) != 2) return 0;
    int coins[105], dp[10005];
    for (int i = 0; i < n; i++) scanf("%d", &coins[i]);
    const int INF = 1000000000;
    for (int i = 0; i <= S; i++) dp[i] = INF;
    dp[0] = 0;
    for (int x = 1; x <= S; x++) {
        for (int i = 0; i < n; i++) {
            if (coins[i] <= x && dp[x - coins[i]] + 1 < dp[x]) {
                dp[x] = dp[x - coins[i]] + 1;
            }
        }
    }
    printf("%d\\n", dp[S] >= INF ? -1 : dp[S]);
    return 0;
}`,
      cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, S; cin >> n >> S;
    vector<int> coins(n);
    for (int &c : coins) cin >> c;
    const int INF = 1e9;
    vector<int> dp(S + 1, INF);
    dp[0] = 0;
    for (int x = 1; x <= S; x++) {
        for (int c : coins) {
            if (c <= x) dp[x] = min(dp[x], dp[x - c] + 1);
        }
    }
    cout << (dp[S] >= INF ? -1 : dp[S]) << "\\n";
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, S = d[0], d[1]
coins = d[2:2 + n]
INF = 10**9
dp = [INF] * (S + 1)
dp[0] = 0
for x in range(1, S + 1):
    for c in coins:
        if c <= x and dp[x - c] + 1 < dp[x]:
            dp[x] = dp[x - c] + 1
print(-1 if dp[S] >= INF else dp[S])`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), S = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();
        int INF = 1_000_000_000;
        int[] dp = new int[S + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int x = 1; x <= S; x++) {
            for (int c : coins) if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
        }
        System.out.println(dp[S] >= INF ? -1 : dp[S]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const [n, S] = d;
const coins = d.slice(2, 2 + n);
const INF = 1e9;
const dp = Array(S + 1).fill(INF);
dp[0] = 0;
for (let x = 1; x <= S; x++) {
  for (const c of coins) if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
}
console.log(dp[S] >= INF ? -1 : dp[S]);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, S] = d;
const coins = d.slice(2, 2 + n);
const INF = 1e9;
const dp = Array<number>(S + 1).fill(INF);
dp[0] = 0;
for (let x = 1; x <= S; x++) {
  for (const c of coins) if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
}
console.log(dp[S] >= INF ? -1 : dp[S]);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, S) = (d[0], d[1]);
    let coins = &d[2..2 + n];
    let inf = 1_000_000_000i32;
    let mut dp = vec![inf; S + 1];
    dp[0] = 0;
    for x in 1..=S {
        for &c in coins {
            if c <= x { dp[x] = dp[x].min(dp[x - c] + 1); }
        }
    }
    println!("{}", if dp[S] >= inf { -1 } else { dp[S] });
}`,
    },
  },
];

export const PROBLEMS: Problem[] = [
  ...BASE_PROBLEMS,
  ...CP_PROBLEMS_BATCH_1,
  ...CP_PROBLEMS_BATCH_2,
  ...INTERVIEW_PROBLEMS_BATCH_1,
  ...INTERVIEW_PROBLEMS_BATCH_2,
];

export const VIRTUAL_CONTEST_PROBLEM_IDS = [
  'cp-weird-collatz',
  'cp-binary-search-bounds',
  'interview-coin-change',
];
