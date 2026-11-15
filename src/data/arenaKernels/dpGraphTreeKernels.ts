import { createRng, randInt, type ArenaKernel } from './types';

function makeStarter(lang: 'c' | 'cpp' | 'python' | 'java' | 'javascript' | 'typescript' | 'rust', title: string): string {
  switch (lang) {
    case 'c':
      return `#include <stdio.h>\n#include <stdlib.h>\n\n// ${title}\nint main(void) {\n    // Read input from stdin and print exact output\n    return 0;\n}\n`;
    case 'cpp':
      return `#include <bits/stdc++.h>\nusing namespace std;\n\n// ${title}\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Solve and print exact output\n    return 0;\n}\n`;
    case 'python':
      return `import sys\n\n# ${title}\ndef solve() -> None:\n    data = sys.stdin.read().split()\n    if not data:\n        return\n\nif __name__ == "__main__":\n    solve()\n`;
    case 'java':
      return `import java.io.*;\nimport java.util.*;\n\n// ${title}\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Parse input and print output\n    }\n}\n`;
    case 'javascript':
      return `'use strict';\nconst fs = require('fs');\n\n// ${title}\nfunction solve() {\n  const raw = fs.readFileSync(0, 'utf8').trim();\n  if (!raw) return;\n}\nsolve();\n`;
    case 'typescript':
      return `import * as fs from 'fs';\n\n// ${title}\nfunction solve(): void {\n  const raw: string = fs.readFileSync(0, 'utf8').trim();\n  if (!raw) return;\n}\nsolve();\n`;
    case 'rust':
      return `use std::io::{self, Read};\n\n// ${title}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    // Parse s and print output\n}\n`;
  }
}

export const DP_GRAPH_TREE_KERNELS: Record<string, ArenaKernel> = {
  dp_house_robber: {
    id: 'dp_house_robber',
    defaultTopic: 'Dynamic Programming',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(2^N)',
    betterComplexity: 'O(N) time, O(N) DP array',
    inputFormat: 'First line contains integer N (1 <= N <= 2 * 10^5). Second line contains N non-negative integers a_1..a_N.',
    outputFormat: 'Print a single integer: the maximum sum of elements with no two adjacent indices chosen.',
    constraints: ['1 <= N <= 2 * 10^5', '0 <= a[i] <= 10^9', 'Use 64-bit integer for the answer'],
    hints: [
      'At each index i you have two choices: skip i (keep dp[i-1]) or take i (add a[i] to dp[i-2]).',
      'Recurrence: dp[i] = max(dp[i-1], dp[i-2] + a[i]).',
      'You only need the previous two states (prev2, prev1), reducing space from O(N) to O(1).',
    ],
    bruteIntuition: 'Try taking or skipping each element recursively, skipping the next index whenever the current element is picked.',
    bruteBangla: 'প্রতিটি উপাদানের জন্য নেওয়া বা বাদ দেওয়ার সব কম্বিনেশন চেক করে দেখা।',
    bruteWhyTle: 'Without memoization, overlapping subproblems explode into O(2^N) calls and TLE around N >= 40.',
    brutePseudo: 'func f(i): if i>=n return 0; return max(f(i+1), a[i] + f(i+2))',
    betterIntuition: 'Store dp[0..N] in an array and fill iteratively left to right.',
    betterBangla: 'dp[] অ্যারেতে প্রতিটি স্টেট সংরক্ষণ করে একবার লুপ চালানো।',
    betterTradeoff: 'O(N) time and O(N) memory; simple and clean, though O(1) rolling variables save RAM.',
    betterPseudo: 'dp[0]=0; dp[1]=a[0]; for i=2..n: dp[i]=max(dp[i-1], dp[i-2]+a[i])',
    optimalIntuition: 'Maintain two rolling 64-bit variables prev2 and prev1 representing dp[i-2] and dp[i-1]. Compute cur = max(prev1, prev2 + a[i]) in O(1) space.',
    optimalBangla: 'মাত্র দুটি ভেরিয়েবল prev2 আর prev1 রেখে O(N) সময় ও O(1) মেমোরিতে সর্বোচ্চ যোগফল বের করা।',
    optimalWhyWins: 'Single linear pass with zero extra allocations and 64-bit arithmetic handles N = 2*10^5 in < 10 ms.',
    optimalPseudo: 'prev2=0; prev1=0; for x in a: cur=max(prev1, prev2+x); prev2=prev1; prev1=cur; return prev1',
    banglaEditorial: 'পাশাপাশি দুটি ঘর নেওয়া যাবে না—তাই i-তম ঘরে এসে দুটি অপশন: না নিলে আগের সেরা ফল prev1, আর নিলে prev2 + a[i]। এই দুইয়ের max নিয়ে এগোলেই উত্তর মেলে।',
    dryRunSteps: [
      { step: 1, state: 'a=[2,7,9,3,1]', memoryOrStack: 'prev2=0, prev1=0', note: 'Initialize rolling DP states' },
      { step: 2, state: 'i=0, x=2', memoryOrStack: 'prev2=0, prev1=2', note: 'max(0, 0+2) = 2' },
      { step: 3, state: 'i=1, x=7', memoryOrStack: 'prev2=2, prev1=7', note: 'max(2, 0+7) = 7' },
      { step: 4, state: 'i=2, x=9', memoryOrStack: 'prev2=7, prev1=11', note: 'max(7, 2+9) = 11' },
      { step: 5, state: 'i=4, x=1', memoryOrStack: 'prev2=11, prev1=12', note: 'Final answer = 12' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '0';
      const n = Number(p[0]);
      let p2 = 0n;
      let p1 = 0n;
      for (let i = 0; i < n; i++) {
        const val = BigInt(p[1 + i] || '0');
        const cand = p2 + val;
        const cur = cand > p1 ? cand : p1;
        p2 = p1;
        p1 = cur;
      }
      return p1.toString();
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['5\n2 7 9 3 1', '4\n1 2 3 1'];
      const hidden = [
        '1\n42',
        '2\n10 25',
        '3\n5 100 5',
        '5\n0 0 0 0 0',
        '3\n1000000000 1 1000000000',
      ];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 12, 50);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 500000000));
        hidden.push(`${n}\n${arr.join(' ')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Max Non-Adjacent Sum'),
      cpp: makeStarter('cpp', 'Max Non-Adjacent Sum'),
      python: makeStarter('python', 'Max Non-Adjacent Sum'),
      java: makeStarter('java', 'Max Non-Adjacent Sum'),
      javascript: makeStarter('javascript', 'Max Non-Adjacent Sum'),
      typescript: makeStarter('typescript', 'Max Non-Adjacent Sum'),
      rust: makeStarter('rust', 'Max Non-Adjacent Sum'),
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long p2 = 0, p1 = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        scanf("%lld", &x);
        long long cur = p2 + x > p1 ? p2 + x : p1;
        p2 = p1;
        p1 = cur;
    }
    printf("%lld\\n", p1);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    long long p2 = 0, p1 = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        long long cur = max(p1, p2 + x);
        p2 = p1;
        p1 = cur;
    }
    cout << p1 << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    it = iter(sys.stdin.read().split())
    n = int(next(it, 0))
    p2 = p1 = 0
    for _ in range(n):
        x = int(next(it))
        p2, p1 = p1, max(p1, p2 + x)
    print(p1)
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long p2 = 0, p1 = 0;
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long x = Long.parseLong(st.nextToken());
            long cur = Math.max(p1, p2 + x);
            p2 = p1;
            p1 = cur;
        }
        System.out.println(p1);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const n = Number(p[0]);
  let p2 = 0n, p1 = 0n;
  for (let i = 0; i < n; i++) {
    const cand = p2 + BigInt(p[1 + i]);
    const cur = cand > p1 ? cand : p1;
    p2 = p1;
    p1 = cur;
  }
  console.log(p1.toString());
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const n: number = Number(p[0]);
  let p2: bigint = 0n;
  let p1: bigint = 0n;
  for (let i = 0; i < n; i++) {
    const cand: bigint = p2 + BigInt(p[1 + i]);
    const cur: bigint = cand > p1 ? cand : p1;
    p2 = p1;
    p1 = cur;
  }
  console.log(p1.toString());
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let (mut p2, mut p1) = (0i64, 0i64);
    for _ in 0..n {
        let x: i64 = it.next().unwrap().parse().unwrap();
        let cur = p1.max(p2 + x);
        p2 = p1;
        p1 = cur;
    }
    println!("{}", p1);
}`,
    },
  },

  dp_coin_min: {
    id: 'dp_coin_min',
    defaultTopic: 'Dynamic Programming',
    timeComplexity: 'O(N * S)',
    spaceComplexity: 'O(S)',
    bruteComplexity: 'O(N^S)',
    betterComplexity: 'O(N * S) memoized recursion',
    inputFormat: 'First line contains N (1 <= N <= 50) and target sum S (0 <= S <= 20000). Second line contains N coin values c_i (1 <= c_i <= 10^4).',
    outputFormat: 'Print the minimum number of coins required to make sum S, or -1 if impossible.',
    constraints: ['1 <= N <= 50', '0 <= S <= 20000', 'Unlimited supply of each coin'],
    hints: [
      'Define dp[x] as the minimum coins needed to form sum x, initialized to INF except dp[0] = 0.',
      'For each coin c and each x from c to S: dp[x] = min(dp[x], dp[x - c] + 1).',
      'If dp[S] >= INF at the end, output -1.',
    ],
    bruteIntuition: 'Explore every branch subtracting each coin from remaining target recursively.',
    bruteBangla: 'প্রতিটি কয়েন বাদ দিয়ে রিকার্সনে সর্বনিম্ন কয়েন সংখ্যা খোঁজা।',
    bruteWhyTle: 'Exponential recursion without caching repeats identical remaining sums millions of times.',
    brutePseudo: 'f(rem): if rem==0 return 0; ans=INF; for c: if rem>=c ans=min(ans,1+f(rem-c))',
    betterIntuition: 'Use top-down memoization over state rem in 0..S.',
    betterBangla: 'memo[rem] ব্যবহার করে একই স্টেট বারবার না গোনা।',
    betterTradeoff: 'Recursion stack depth up to S; bottom-up loop is faster and avoids stack limits.',
    betterPseudo: 'memo[0]=0; recurse with cache',
    optimalIntuition: 'Bottom-up 1D DP table dp[0..S] initialized to S + 1 (INF), dp[0] = 0. Iterate coins and sweep x from c to S.',
    optimalBangla: 'বটম-আপ dp[0..S] টেবিলে dp[x] = min(dp[x], dp[x-c]+1) আপডেট করা।',
    optimalWhyWins: 'Cache-friendly tight 1D loop runs in O(N * S) with minimal overhead.',
    optimalPseudo: 'dp=[INF]*(S+1); dp[0]=0; for c: for x=c..S: dp[x]=min(dp[x], dp[x-c]+1)',
    banglaEditorial: 'dp[x] মানে x টাকা বানাতে কমপক্ষে কতটি কয়েন লাগে। প্রতিটি কয়েন c-এর জন্য x = c থেকে S পর্যন্ত গেলে কয়েন অসীম সংখ্যক বার ব্যবহারের সুযোগ থাকে।',
    dryRunSteps: [
      { step: 1, state: 'coins=[1,3,4], S=6', memoryOrStack: 'dp=[0,INF,INF,INF,INF,INF,INF]', note: 'Base case dp[0]=0' },
      { step: 2, state: 'coin=1', memoryOrStack: 'dp=[0,1,2,3,4,5,6]', note: 'Sweep x=1..6' },
      { step: 3, state: 'coin=3', memoryOrStack: 'dp[3]=1, dp[6]=2', note: 'dp[x]=min(dp[x], dp[x-3]+1)' },
      { step: 4, state: 'coin=4', memoryOrStack: 'dp[4]=1, dp[5]=2, dp[6]=2', note: 'Optimal answer dp[6] = 2' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '0';
      const n = p[0];
      const S = p[1];
      const INF = S + 1;
      const dp = new Int32Array(S + 1).fill(INF);
      dp[0] = 0;
      for (let i = 0; i < n; i++) {
        const c = p[2 + i];
        for (let x = c; x <= S; x++) {
          if (dp[x - c] + 1 < dp[x]) dp[x] = dp[x - c] + 1;
        }
      }
      return String(dp[S] >= INF ? -1 : dp[S]);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['3 11\n1 2 5', '2 3\n2 4'];
      const hidden = ['1 0\n5', '1 7\n7', '3 6\n1 3 4', '3 10\n3 7 12', '4 99\n5 10 20 50'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 3, 12);
        const S = randInt(rng, 20, 400);
        const coins = Array.from({ length: n }, () => randInt(rng, 2, 45));
        hidden.push(`${n} ${S}\n${coins.join(' ')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Minimum Coins DP'),
      cpp: makeStarter('cpp', 'Minimum Coins DP'),
      python: makeStarter('python', 'Minimum Coins DP'),
      java: makeStarter('java', 'Minimum Coins DP'),
      javascript: makeStarter('javascript', 'Minimum Coins DP'),
      typescript: makeStarter('typescript', 'Minimum Coins DP'),
      rust: makeStarter('rust', 'Minimum Coins DP'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, S;
    if (scanf("%d %d", &n, &S) != 2) return 0;
    int INF = S + 1;
    int *dp = malloc((S + 1) * sizeof(int));
    for (int i = 0; i <= S; i++) dp[i] = INF;
    dp[0] = 0;
    for (int i = 0; i < n; i++) {
        int c;
        scanf("%d", &c);
        for (int x = c; x <= S; x++) {
            if (dp[x - c] + 1 < dp[x]) dp[x] = dp[x - c] + 1;
        }
    }
    printf("%d\\n", dp[S] >= INF ? -1 : dp[S]);
    free(dp);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, S;
    if (!(cin >> n >> S)) return 0;
    int INF = S + 1;
    vector<int> dp(S + 1, INF);
    dp[0] = 0;
    for (int i = 0; i < n; i++) {
        int c;
        cin >> c;
        for (int x = c; x <= S; x++) dp[x] = min(dp[x], dp[x - c] + 1);
    }
    cout << (dp[S] >= INF ? -1 : dp[S]) << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, S = p[0], p[1]
    INF = S + 1
    dp = [INF] * (S + 1)
    dp[0] = 0
    for c in p[2:2+n]:
        for x in range(c, S + 1):
            if dp[x - c] + 1 < dp[x]:
                dp[x] = dp[x - c] + 1
    print(-1 if dp[S] >= INF else dp[S])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());
        int INF = S + 1;
        int[] dp = new int[S + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int c = Integer.parseInt(st.nextToken());
            for (int x = c; x <= S; x++) dp[x] = Math.min(dp[x], dp[x - c] + 1);
        }
        System.out.println(dp[S] >= INF ? -1 : dp[S]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n = p[0], S = p[1], INF = S + 1;
  const dp = new Int32Array(S + 1).fill(INF);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    const c = p[2 + i];
    for (let x = c; x <= S; x++) if (dp[x - c] + 1 < dp[x]) dp[x] = dp[x - c] + 1;
  }
  console.log(dp[S] >= INF ? -1 : dp[S]);
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n: number = p[0];
  const S: number = p[1];
  const INF: number = S + 1;
  const dp: number[] = new Array<number>(S + 1).fill(INF);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    const c: number = p[2 + i];
    for (let x = c; x <= S; x++) {
      if (dp[x - c] + 1 < dp[x]) dp[x] = dp[x - c] + 1;
    }
  }
  console.log(dp[S] >= INF ? -1 : dp[S]);
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let sum: usize = it.next().unwrap().parse().unwrap();
    let inf = sum + 1;
    let mut dp = vec![inf; sum + 1];
    dp[0] = 0;
    for _ in 0..n {
        let c: usize = it.next().unwrap().parse().unwrap();
        for x in c..=sum {
            let cand = dp[x - c] + 1;
            if cand < dp[x] { dp[x] = cand; }
        }
    }
    println!("{}", if dp[sum] >= inf { -1 } else { dp[sum] as i64 });
}`,
    },
  },

  dp_coin_ways_mod: {
    id: 'dp_coin_ways_mod',
    defaultTopic: 'Dynamic Programming',
    timeComplexity: 'O(N * S)',
    spaceComplexity: 'O(S)',
    bruteComplexity: 'O(N^S)',
    betterComplexity: 'O(N * S) 2D table',
    inputFormat: 'First line contains N (1 <= N <= 100) and target sum S (0 <= S <= 10000). Second line contains N distinct coin values c_i.',
    outputFormat: 'Print the number of unordered coin combinations summing to S, modulo 10^9 + 7.',
    constraints: ['1 <= N <= 100', '0 <= S <= 10000', 'Modulo 1000000007'],
    hints: [
      'Order of coins does NOT matter (combinations, not permutations).',
      'Loop over coins on the OUTER loop and sum x = c..S on the INNER loop.',
      'Take modulo 10^9 + 7 at every addition.',
    ],
    bruteIntuition: 'Recurse choosing how many copies of each coin to take in order.',
    bruteBangla: 'প্রতিটি কয়েন কতবার নেওয়া হবে তা রিকার্সনে চেষ্টা করা।',
    bruteWhyTle: 'Exponential branching causes TLE for even modest sums.',
    brutePseudo: 'f(idx, rem): try k=0..rem/c[idx] and sum f(idx+1, rem-k*c)',
    betterIntuition: '2D DP dp[i][s] using first i coins to form sum s.',
    betterBangla: 'dp[i][s] টেবিলে প্রথম iটি কয়েন দিয়ে s বানানোর উপায় রাখা।',
    betterTradeoff: 'Uses O(N * S) space instead of O(S) space.',
    betterPseudo: 'dp[i][s] = dp[i-1][s] + dp[i][s - c[i]]',
    optimalIntuition: 'Loop each coin c in outer loop, and sweep x from c to S in inner loop: dp[x] = (dp[x] + dp[x - c]) % MOD.',
    optimalBangla: 'বাইরের লুপে কয়েন ও ভেতরের লুপে x = c..S চালালে প্রতিটি কম্বিনেশন ঠিক একবারই গণনা হয়।',
    optimalWhyWins: 'O(S) space and O(N * S) time; putting coins outside guarantees unique combinations without permutations.',
    optimalPseudo: 'dp[0]=1; for c in coins: for x=c..S: dp[x]=(dp[x]+dp[x-c])%MOD',
    banglaEditorial: 'কম্বিনেশন গুনতে হলে কয়েনের লুপ বাইরে রাখতে হয়—তাহলে (1+2) আর (2+1) আলাদাভাবে গুনে ফেলার ভুল হয় না। প্রতি যোগে 10^9+7 মড নিন।',
    dryRunSteps: [
      { step: 1, state: 'coins=[1,2,5], S=5', memoryOrStack: 'dp=[1,0,0,0,0,0]', note: '1 way to make sum 0' },
      { step: 2, state: 'coin=1', memoryOrStack: 'dp=[1,1,1,1,1,1]', note: 'All sums reachable via 1s' },
      { step: 3, state: 'coin=2', memoryOrStack: 'dp=[1,1,2,2,3,3]', note: 'Unordered combinations updated' },
      { step: 4, state: 'coin=5', memoryOrStack: 'dp[5]=3+1=4', note: 'Final ways = 4' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '0';
      const n = p[0];
      const S = p[1];
      const MOD = 1000000007;
      const dp = new Int32Array(S + 1);
      dp[0] = 1;
      for (let i = 0; i < n; i++) {
        const c = p[2 + i];
        for (let x = c; x <= S; x++) {
          let v = dp[x] + dp[x - c];
          if (v >= MOD) v -= MOD;
          dp[x] = v;
        }
      }
      return String(dp[S]);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['3 5\n1 2 5', '2 3\n2 4'];
      const hidden = ['1 0\n3', '1 10\n2', '3 9\n2 3 5', '4 100\n1 5 10 25', '5 500\n2 3 7 11 13'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 3, 10);
        const S = randInt(rng, 25, 300);
        const set = new Set<number>();
        while (set.size < n) set.add(randInt(rng, 1, 35));
        hidden.push(`${n} ${S}\n${Array.from(set).join(' ')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Coin Combinations Mod 10^9+7'),
      cpp: makeStarter('cpp', 'Coin Combinations Mod 10^9+7'),
      python: makeStarter('python', 'Coin Combinations Mod 10^9+7'),
      java: makeStarter('java', 'Coin Combinations Mod 10^9+7'),
      javascript: makeStarter('javascript', 'Coin Combinations Mod 10^9+7'),
      typescript: makeStarter('typescript', 'Coin Combinations Mod 10^9+7'),
      rust: makeStarter('rust', 'Coin Combinations Mod 10^9+7'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#define MOD 1000000007
int main(void) {
    int n, S;
    if (scanf("%d %d", &n, &S) != 2) return 0;
    int *dp = calloc(S + 1, sizeof(int));
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        int c;
        scanf("%d", &c);
        for (int x = c; x <= S; x++) {
            dp[x] += dp[x - c];
            if (dp[x] >= MOD) dp[x] -= MOD;
        }
    }
    printf("%d\\n", dp[S]);
    free(dp);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
static const int MOD = 1000000007;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, S;
    if (!(cin >> n >> S)) return 0;
    vector<int> dp(S + 1, 0);
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        int c;
        cin >> c;
        for (int x = c; x <= S; x++) {
            dp[x] += dp[x - c];
            if (dp[x] >= MOD) dp[x] -= MOD;
        }
    }
    cout << dp[S] << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, S = p[0], p[1]
    MOD = 1000000007
    dp = [0] * (S + 1)
    dp[0] = 1
    for c in p[2:2+n]:
        for x in range(c, S + 1):
            dp[x] = (dp[x] + dp[x - c]) % MOD
    print(dp[S])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static final int MOD = 1000000007;
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());
        int[] dp = new int[S + 1];
        dp[0] = 1;
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int c = Integer.parseInt(st.nextToken());
            for (int x = c; x <= S; x++) {
                dp[x] += dp[x - c];
                if (dp[x] >= MOD) dp[x] -= MOD;
            }
        }
        System.out.println(dp[S]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n = p[0], S = p[1], MOD = 1000000007;
  const dp = new Int32Array(S + 1);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    const c = p[2 + i];
    for (let x = c; x <= S; x++) {
      let v = dp[x] + dp[x - c];
      if (v >= MOD) v -= MOD;
      dp[x] = v;
    }
  }
  console.log(dp[S]);
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n: number = p[0];
  const S: number = p[1];
  const MOD: number = 1000000007;
  const dp: number[] = new Array<number>(S + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    const c: number = p[2 + i];
    for (let x = c; x <= S; x++) {
      dp[x] = (dp[x] + dp[x - c]) % MOD;
    }
  }
  console.log(dp[S]);
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let sum: usize = it.next().unwrap().parse().unwrap();
    let mut dp = vec![0i32; sum + 1];
    dp[0] = 1;
    const MOD: i32 = 1_000_000_007;
    for _ in 0..n {
        let c: usize = it.next().unwrap().parse().unwrap();
        for x in c..=sum {
            dp[x] += dp[x - c];
            if dp[x] >= MOD { dp[x] -= MOD; }
        }
    }
    println!("{}", dp[sum]);
}`,
    },
  },

  dp_knapsack_01: {
    id: 'dp_knapsack_01',
    defaultTopic: 'Dynamic Programming',
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(W)',
    bruteComplexity: 'O(2^N)',
    betterComplexity: 'O(N * W) 2D DP',
    inputFormat: 'First line contains N (1 <= N <= 200) and capacity W (0 <= W <= 20000). Next N lines each contain weight w_i and value v_i.',
    outputFormat: 'Print a single 64-bit integer: the maximum total value achievable within capacity W.',
    constraints: ['1 <= N <= 200', '0 <= W <= 20000', '1 <= w_i <= W, 0 <= v_i <= 10^9'],
    hints: [
      'Each item can be used at most ONCE (0/1 choice).',
      'To compress 2D DP into 1D dp[0..W], iterate capacity BACKWARDS from W down to w_i!',
      'Iterating backwards prevents using the same item multiple times in one round.',
    ],
    bruteIntuition: 'Enumerate all 2^N subsets of items and keep the highest value whose weight <= W.',
    bruteBangla: 'সব সাবসেট পরীক্ষা করে W ওজনের মধ্যে সর্বোচ্চ মান খোঁজা।',
    bruteWhyTle: '2^200 combinations cannot finish before the heat death of the universe.',
    brutePseudo: 'f(i, cap): max(f(i+1, cap), v[i] + f(i+1, cap - w[i]))',
    betterIntuition: 'Keep full 2D dp[N+1][W+1] table.',
    betterBangla: 'dp[i][cap] 2D টেবিল ব্যবহার করা।',
    betterTradeoff: 'Uses O(N * W) RAM where 1D reverse sweep uses only O(W).',
    betterPseudo: 'dp[i][c] = max(dp[i-1][c], dp[i-1][c-w] + v)',
    optimalIntuition: '1D BigInt/64-bit array dp[0..W] initialized to 0. For each item (w, v), loop c from W down to w: dp[c] = max(dp[c], dp[c - w] + v).',
    optimalBangla: '1D dp[] অ্যারেতে ক্যাপাসিটি উল্টো দিকে W থেকে w পর্যন্ত চালিয়ে প্রতিটি আইটেম সর্বোচ্চ একবার ব্যবহার নিশ্চিত করা।',
    optimalWhyWins: 'O(W) memory, tight inner loop, and zero risk of reusing an item twice.',
    optimalPseudo: 'for (w,v): for c=W downto w: dp[c]=max(dp[c], dp[c-w]+v)',
    banglaEditorial: '0/1 ন্যাপস্যাকে প্রতিটি আইটেম কেবল একবার নেওয়া যায়। তাই 1D অ্যারেতে c = W থেকে নিচে w পর্যন্ত লুপ ঘোরানো জরুরি—নইলে আগের আপডেট করা মান আবার যোগ হয়ে যাবে।',
    dryRunSteps: [
      { step: 1, state: 'N=3, W=4; items=(4,5),(2,3),(2,4)', memoryOrStack: 'dp=[0,0,0,0,0]', note: 'Zero-initialized capacity array' },
      { step: 2, state: 'Item (4,5)', memoryOrStack: 'dp=[0,0,0,0,5]', note: 'Reverse loop updates dp[4]' },
      { step: 3, state: 'Item (2,3)', memoryOrStack: 'dp=[0,0,3,3,5]', note: 'dp[2]=3, dp[4] stays 5' },
      { step: 4, state: 'Item (2,4)', memoryOrStack: 'dp[4]=max(5, dp[2]+4)=7', note: 'Optimal 0/1 value = 7' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '0';
      const n = Number(p[0]);
      const W = Number(p[1]);
      const dp: bigint[] = new Array(W + 1).fill(0n);
      let idx = 2;
      for (let i = 0; i < n; i++) {
        const w = Number(p[idx++]);
        const v = BigInt(p[idx++]);
        for (let c = W; c >= w; c--) {
          const cand = dp[c - w] + v;
          if (cand > dp[c]) dp[c] = cand;
        }
      }
      return dp[W].toString();
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['3 8\n3 30\n4 50\n5 60', '3 4\n4 5\n2 3\n2 4'];
      const hidden = ['1 5\n6 100', '1 5\n5 100', '4 10\n5 10\n4 40\n6 30\n3 50', '3 100\n20 1000000000\n30 1000000000\n40 1000000000', '2 0\n1 10\n2 20'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 5, 25);
        const W = randInt(rng, 20, 150);
        const lines = [`${n} ${W}`];
        for (let i = 0; i < n; i++) lines.push(`${randInt(rng, 1, Math.max(2, Math.floor(W / 2)))} ${randInt(rng, 10, 500000000)}`);
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', '0/1 Knapsack'),
      cpp: makeStarter('cpp', '0/1 Knapsack'),
      python: makeStarter('python', '0/1 Knapsack'),
      java: makeStarter('java', '0/1 Knapsack'),
      javascript: makeStarter('javascript', '0/1 Knapsack'),
      typescript: makeStarter('typescript', '0/1 Knapsack'),
      rust: makeStarter('rust', '0/1 Knapsack'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, W;
    if (scanf("%d %d", &n, &W) != 2) return 0;
    long long *dp = calloc(W + 1, sizeof(long long));
    for (int i = 0; i < n; i++) {
        int w;
        long long v;
        scanf("%d %lld", &w, &v);
        for (int c = W; c >= w; c--) {
            if (dp[c - w] + v > dp[c]) dp[c] = dp[c - w] + v;
        }
    }
    printf("%lld\\n", dp[W]);
    free(dp);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, W;
    if (!(cin >> n >> W)) return 0;
    vector<long long> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        int w;
        long long v;
        cin >> w >> v;
        for (int c = W; c >= w; c--) dp[c] = max(dp[c], dp[c - w] + v);
    }
    cout << dp[W] << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    it = iter(sys.stdin.read().split())
    n = int(next(it, 0))
    W = int(next(it, 0))
    dp = [0] * (W + 1)
    for _ in range(n):
        w = int(next(it))
        v = int(next(it))
        for c in range(W, w - 1, -1):
            if dp[c - w] + v > dp[c]:
                dp[c] = dp[c - w] + v
    print(dp[W])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int W = Integer.parseInt(st.nextToken());
        long[] dp = new long[W + 1];
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int w = Integer.parseInt(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long v = Long.parseLong(st.nextToken());
            for (int c = W; c >= w; c--) dp[c] = Math.max(dp[c], dp[c - w] + v);
        }
        System.out.println(dp[W]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const n = Number(p[0]), W = Number(p[1]);
  const dp = new Array(W + 1).fill(0n);
  let idx = 2;
  for (let i = 0; i < n; i++) {
    const w = Number(p[idx++]);
    const v = BigInt(p[idx++]);
    for (let c = W; c >= w; c--) {
      const cand = dp[c - w] + v;
      if (cand > dp[c]) dp[c] = cand;
    }
  }
  console.log(dp[W].toString());
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const n: number = Number(p[0]);
  const W: number = Number(p[1]);
  const dp: bigint[] = new Array<bigint>(W + 1).fill(0n);
  let idx = 2;
  for (let i = 0; i < n; i++) {
    const w: number = Number(p[idx++]);
    const v: bigint = BigInt(p[idx++]);
    for (let c = W; c >= w; c--) {
      const cand: bigint = dp[c - w] + v;
      if (cand > dp[c]) dp[c] = cand;
    }
  }
  console.log(dp[W].toString());
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let wmax: usize = it.next().unwrap().parse().unwrap();
    let mut dp = vec![0i64; wmax + 1];
    for _ in 0..n {
        let w: usize = it.next().unwrap().parse().unwrap();
        let v: i64 = it.next().unwrap().parse().unwrap();
        if w <= wmax {
            for c in (w..=wmax).rev() {
                let cand = dp[c - w] + v;
                if cand > dp[c] { dp[c] = cand; }
            }
        }
    }
    println!("{}", dp[wmax]);
}`,
    },
  },

  dp_lis_nlogn: {
    id: 'dp_lis_nlogn',
    defaultTopic: 'Dynamic Programming',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    bruteComplexity: 'O(2^N)',
    betterComplexity: 'O(N^2) standard DP',
    inputFormat: 'First line contains N (1 <= N <= 2 * 10^5). Second line contains N integers a_1..a_N (-10^9 <= a_i <= 10^9).',
    outputFormat: 'Print the length of the longest strictly increasing subsequence.',
    constraints: ['1 <= N <= 2 * 10^5', '-10^9 <= a_i <= 10^9', 'Strictly increasing (a_i < a_j)'],
    hints: [
      'O(N^2) DP will TLE when N = 2 * 10^5.',
      'Maintain an array tails where tails[len-1] is the smallest possible tail element of an increasing subsequence of length len.',
      'Because tails is strictly sorted, binary search (lower_bound) finds the replacement index in O(log N).',
    ],
    bruteIntuition: 'Test every subsequence to see whether it is strictly increasing.',
    bruteBangla: 'সব সাবসিকোয়েন্স বানিয়ে কোনটি ইনক্রিজিং তা চেক করা।',
    bruteWhyTle: '2^N subsequences fails beyond N = 25.',
    brutePseudo: 'check all 2^N subsets for strict increase',
    betterIntuition: 'Classic dp[i] = 1 + max(dp[j]) for j < i and a[j] < a[i].',
    betterBangla: 'dp[i] তে i পর্যন্ত সর্বোচ্চ দৈর্ঘ্য রেখে ডাবল লুপ চালানো।',
    betterTradeoff: 'O(N^2) takes ~4*10^10 ops for N = 2*10^5 -> TLE.',
    betterPseudo: 'for i=0..n-1: for j=0..i-1: if a[j]<a[i] dp[i]=max(dp[i], dp[j]+1)',
    optimalIntuition: 'Patience sorting: maintain increasing array tails[]. For each x, binary search first element >= x (lower_bound) and replace it, or append x if greater than all tails.',
    optimalBangla: 'tails[] অ্যারেতে প্রতিটি দৈর্ঘ্যের ক্ষুদ্রতম শেষ সংখ্যা রেখে lower_bound বাইনারি সার্চ দিয়ে O(N log N) সময়ে সমাধান।',
    optimalWhyWins: 'Scales cleanly to N = 2*10^5 in under 20 ms.',
    optimalPseudo: 'for x in a: idx=lower_bound(tails,x); if idx==len(tails) tails.push(x) else tails[idx]=x; return len(tails)',
    banglaEditorial: 'tails[k] মানে k+1 দৈর্ঘ্যের ইনক্রিজিং সাবসিকোয়েন্সের সবচেয়ে ছোট শেষ উপাদান। এটি সবসময় সর্টেড থাকে বলে প্রতিটি নতুন x-এর জায়গা বাইনারি সার্চ (lower_bound) দিয়ে O(log N) সময়ে পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'a=[10,9,2,5,3,7,101,18]', memoryOrStack: 'tails=[]', note: 'Maintain smallest tail per LIS length' },
      { step: 2, state: 'Process 10, 9, 2', memoryOrStack: 'tails=[2]', note: 'Replace tails[0] via lower_bound' },
      { step: 3, state: 'Process 5, 3, 7', memoryOrStack: 'tails=[2,3,7]', note: 'Extend to length 3' },
      { step: 4, state: 'Process 101, 18', memoryOrStack: 'tails=[2,3,7,18]', note: 'LIS length = 4' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '0';
      const n = p[0];
      const tails: number[] = [];
      for (let i = 0; i < n; i++) {
        const x = p[1 + i];
        let lo = 0, hi = tails.length;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (tails[mid] < x) lo = mid + 1;
          else hi = mid;
        }
        if (lo === tails.length) tails.push(x);
        else tails[lo] = x;
      }
      return String(tails.length);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['8\n10 9 2 5 3 7 101 18', '6\n0 1 0 3 2 3'];
      const hidden = ['1\n7', '5\n5 4 3 2 1', '5\n7 7 7 7 7', '6\n-5 -2 -3 0 4 4', '7\n1 2 3 4 5 6 7'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 20, 80);
        const arr = Array.from({ length: n }, () => randInt(rng, -50, 100));
        hidden.push(`${n}\n${arr.join(' ')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'LIS O(N log N)'),
      cpp: makeStarter('cpp', 'LIS O(N log N)'),
      python: makeStarter('python', 'LIS O(N log N)'),
      java: makeStarter('java', 'LIS O(N log N)'),
      javascript: makeStarter('javascript', 'LIS O(N log N)'),
      typescript: makeStarter('typescript', 'LIS O(N log N)'),
      rust: makeStarter('rust', 'LIS O(N log N)'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long *tails = malloc(n * sizeof(long long));
    int len = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        scanf("%lld", &x);
        int lo = 0, hi = len;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = x;
        if (lo == len) len++;
    }
    printf("%d\\n", len);
    free(tails);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> tails;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << "\\n";
    return 0;
}`,
      python: `import sys, bisect
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    tails = []
    for x in p[1:1+p[0]]:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    print(len(tails))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long[] tails = new long[n];
        int len = 0;
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long x = Long.parseLong(st.nextToken());
            int lo = 0, hi = len;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails[mid] < x) lo = mid + 1;
                else hi = mid;
            }
            tails[lo] = x;
            if (lo == len) len++;
        }
        System.out.println(len);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length) {
  const n = p[0], tails = [];
  for (let i = 0; i < n; i++) {
    const x = p[1 + i];
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  console.log(tails.length);
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length) {
  const n: number = p[0];
  const tails: number[] = [];
  for (let i = 0; i < n; i++) {
    const x: number = p[1 + i];
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid: number = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  console.log(tails.length);
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let mut tails: Vec<i64> = Vec::new();
    for _ in 0..n {
        let x: i64 = it.next().unwrap().parse().unwrap();
        let pos = tails.partition_point(|&v| v < x);
        if pos == tails.len() { tails.push(x); } else { tails[pos] = x; }
    }
    println!("{}", tails.len());
}`,
    },
  },

  dp_grid_min_path: {
    id: 'dp_grid_min_path',
    defaultTopic: 'Grid DP',
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(C)',
    bruteComplexity: 'O(2^(R+C))',
    betterComplexity: 'O(R * C) 2D table',
    inputFormat: 'First line contains R and C (1 <= R, C <= 500). Next R lines each contain C non-negative integers.',
    outputFormat: 'Print the minimum sum path from top-left (1,1) to bottom-right (R,C) moving only right or down.',
    constraints: ['1 <= R, C <= 500', '0 <= grid[r][c] <= 10^6'],
    hints: [
      'You can enter cell (r, c) only from (r-1, c) or (r, c-1).',
      'dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).',
      'Rolling 1D row dp[0..C-1] reduces memory from O(R * C) to O(C).',
    ],
    bruteIntuition: 'Explore all right/down paths recursively.',
    bruteBangla: 'ডানে ও নিচে যাওয়ার সব পথ রিকার্সনে ঘুরে দেখা।',
    bruteWhyTle: 'Combinatorial explosion C(R+C-2, R-1) TLEs fast.',
    brutePseudo: 'f(r,c) = grid[r][c] + min(f(r+1,c), f(r,c+1))',
    betterIntuition: 'Store full 2D dp[R][C] table.',
    betterBangla: 'dp[R][C] ম্যাট্রিক্সে মান সংরক্ষণ করা।',
    betterTradeoff: 'Uses O(R * C) space; 1D row compression needs only O(C).',
    betterPseudo: 'dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])',
    optimalIntuition: 'Maintain 1D array dp[0..C-1] representing previous row. For each row, update dp[0] += grid[r][0], then dp[c] = grid[r][c] + min(dp[c], dp[c-1]).',
    optimalBangla: 'প্রতি সারির জন্য 1D dp[] অ্যারে আপডেট করে O(R*C) সময় ও O(C) মেমোরিতে সর্বনিম্ন পথ বের করা।',
    optimalWhyWins: 'Optimal O(R * C) time with tiny O(C) memory footprint.',
    optimalPseudo: 'for r=0..R-1: for c=0..C-1: dp[c] = grid[r][c] + min(above, left)',
    banglaEditorial: 'প্রতিটি সেলে কেবল ওপর অথবা বাম দিক থেকে আসা যায়। তাই আগের সারির dp[c] (ওপর) আর বর্তমান সারির dp[c-1] (বাম)-এর ছোটটি নিয়ে যোগ করলেই সমাধান মেলে।',
    dryRunSteps: [
      { step: 1, state: 'Row 0 [1,3,1]', memoryOrStack: 'dp=[1,4,5]', note: 'Left-to-right prefix sum' },
      { step: 2, state: 'Row 1 [1,5,1]', memoryOrStack: 'dp=[2,7,6]', note: 'min(above, left) + cell' },
      { step: 3, state: 'Row 2 [4,2,1]', memoryOrStack: 'dp=[6,8,7]', note: 'Min path dp[C-1] = 7' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '0';
      const R = Number(p[0]);
      const C = Number(p[1]);
      const dp: bigint[] = new Array(C).fill(0n);
      let idx = 2;
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          const val = BigInt(p[idx++]);
          if (r === 0 && c === 0) dp[0] = val;
          else if (r === 0) dp[c] = dp[c - 1] + val;
          else if (c === 0) dp[0] = dp[0] + val;
          else dp[c] = (dp[c] < dp[c - 1] ? dp[c] : dp[c - 1]) + val;
        }
      }
      return dp[C - 1].toString();
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['3 3\n1 3 1\n1 5 1\n4 2 1', '2 3\n1 2 3\n4 5 6'];
      const hidden = ['1 1\n42', '1 4\n5 1 2 9', '4 1\n3\n2\n7\n1', '2 2\n1000000 1\n1 1000000', '3 3\n0 0 0\n0 0 0\n0 0 0'];
      for (let t = 0; t < 5; t++) {
        const R = randInt(rng, 4, 15);
        const C = randInt(rng, 4, 15);
        const lines = [`${R} ${C}`];
        for (let r = 0; r < R; r++) {
          lines.push(Array.from({ length: C }, () => randInt(rng, 0, 500)).join(' '));
        }
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Minimum Grid Path Sum'),
      cpp: makeStarter('cpp', 'Minimum Grid Path Sum'),
      python: makeStarter('python', 'Minimum Grid Path Sum'),
      java: makeStarter('java', 'Minimum Grid Path Sum'),
      javascript: makeStarter('javascript', 'Minimum Grid Path Sum'),
      typescript: makeStarter('typescript', 'Minimum Grid Path Sum'),
      rust: makeStarter('rust', 'Minimum Grid Path Sum'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int R, C;
    if (scanf("%d %d", &R, &C) != 2) return 0;
    long long *dp = calloc(C, sizeof(long long));
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            long long v;
            scanf("%lld", &v);
            if (r == 0 && c == 0) dp[0] = v;
            else if (r == 0) dp[c] = dp[c - 1] + v;
            else if (c == 0) dp[0] += v;
            else dp[c] = (dp[c] < dp[c - 1] ? dp[c] : dp[c - 1]) + v;
        }
    }
    printf("%lld\\n", dp[C - 1]);
    free(dp);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int R, C;
    if (!(cin >> R >> C)) return 0;
    vector<long long> dp(C, 0);
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            long long v;
            cin >> v;
            if (r == 0 && c == 0) dp[0] = v;
            else if (r == 0) dp[c] = dp[c - 1] + v;
            else if (c == 0) dp[0] += v;
            else dp[c] = min(dp[c], dp[c - 1]) + v;
        }
    }
    cout << dp[C - 1] << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    it = iter(sys.stdin.read().split())
    R = int(next(it, 0))
    C = int(next(it, 0))
    if R == 0: return
    dp = [0] * C
    for r in range(R):
        for c in range(C):
            v = int(next(it))
            if r == 0 and c == 0: dp[0] = v
            elif r == 0: dp[c] = dp[c - 1] + v
            elif c == 0: dp[0] += v
            else: dp[c] = min(dp[c], dp[c - 1]) + v
    print(dp[C - 1])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int R = Integer.parseInt(st.nextToken());
        int C = Integer.parseInt(st.nextToken());
        long[] dp = new long[C];
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
                long v = Long.parseLong(st.nextToken());
                if (r == 0 && c == 0) dp[0] = v;
                else if (r == 0) dp[c] = dp[c - 1] + v;
                else if (c == 0) dp[0] += v;
                else dp[c] = Math.min(dp[c], dp[c - 1]) + v;
            }
        }
        System.out.println(dp[C - 1]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const R = Number(p[0]), C = Number(p[1]);
  const dp = new Array(C).fill(0n);
  let idx = 2;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const v = BigInt(p[idx++]);
      if (r === 0 && c === 0) dp[0] = v;
      else if (r === 0) dp[c] = dp[c - 1] + v;
      else if (c === 0) dp[0] += v;
      else dp[c] = (dp[c] < dp[c - 1] ? dp[c] : dp[c - 1]) + v;
    }
  }
  console.log(dp[C - 1].toString());
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const R: number = Number(p[0]);
  const C: number = Number(p[1]);
  const dp: bigint[] = new Array<bigint>(C).fill(0n);
  let idx = 2;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const v: bigint = BigInt(p[idx++]);
      if (r === 0 && c === 0) dp[0] = v;
      else if (r === 0) dp[c] = dp[c - 1] + v;
      else if (c === 0) dp[0] += v;
      else dp[c] = (dp[c] < dp[c - 1] ? dp[c] : dp[c - 1]) + v;
    }
  }
  console.log(dp[C - 1].toString());
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let rmax: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let cmax: usize = it.next().unwrap().parse().unwrap();
    let mut dp = vec![0i64; cmax];
    for r in 0..rmax {
        for c in 0..cmax {
            let v: i64 = it.next().unwrap().parse().unwrap();
            if r == 0 && c == 0 { dp[0] = v; }
            else if r == 0 { dp[c] = dp[c - 1] + v; }
            else if c == 0 { dp[0] += v; }
            else { dp[c] = dp[c].min(dp[c - 1]) + v; }
        }
    }
    println!("{}", dp[cmax - 1]);
}`,
    },
  },

  dp_stock_cooldown: {
    id: 'dp_stock_cooldown',
    defaultTopic: 'State-Machine DP',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(3^N)',
    betterComplexity: 'O(N) 2D DP',
    inputFormat: 'First line contains N (1 <= N <= 2 * 10^5). Second line contains N stock prices p_1..p_N (0 <= p_i <= 10^9).',
    outputFormat: 'Print the maximum profit achievable with unlimited buy/sell transactions and a mandatory 1-day cooldown after each sell.',
    constraints: ['1 <= N <= 2 * 10^5', '0 <= p_i <= 10^9', 'Cannot hold two shares simultaneously; must rest 1 day after selling'],
    hints: [
      'Model each day with 3 states: hold (currently own stock), sold (just sold today -> must cooldown tomorrow), rest (cooldown complete / no stock).',
      'Transitions: hold = max(prevHold, prevRest - price); sold = prevHold + price; rest = max(prevRest, prevSold).',
      'Answer at the end is max(sold, rest).',
    ],
    bruteIntuition: 'Recurse over day i with holding boolean and cooldown boolean.',
    bruteBangla: 'প্রতিদিন কেনা/বেচা/বিশ্রামের সব অপশন রিকার্সনে দেখা।',
    bruteWhyTle: 'Exponential 3^N branching fails quickly.',
    brutePseudo: 'f(i, holding, cool): try buy/sell/skip',
    betterIntuition: 'Keep three N-length arrays hold[i], sold[i], rest[i].',
    betterBangla: 'তিনটি N দৈর্ঘ্যের স্টেট অ্যারে রাখা।',
    betterTradeoff: 'O(N) extra memory where three scalar variables suffice.',
    betterPseudo: 'hold[i]=max(hold[i-1], rest[i-1]-p); sold[i]=hold[i-1]+p; rest[i]=max(rest[i-1], sold[i-1])',
    optimalIntuition: 'Track 3 scalar 64-bit states: hold = -p[0], sold = 0, rest = 0 (for N>=1). Iterate p[1..N-1] updating all three simultaneously.',
    optimalBangla: 'hold, sold, rest তিনটি স্টেট ভেরিয়েবলে স্টেট-মেশিন DP চালিয়ে O(N) সময় ও O(1) মেমোরিতে সর্বোচ্চ লাভ বের করা।',
    optimalWhyWins: 'O(N) single pass, O(1) memory, and immune to integer overflow with 64-bit ints.',
    optimalPseudo: 'hold=-p[0]; sold=0; rest=0; for price in p[1..]: nh=max(hold,rest-price); ns=hold+price; nr=max(rest,sold); hold,sold,rest=nh,ns,nr',
    banglaEditorial: 'শেয়ার বিক্রির পরদিন কুলডাউন থাকায় তিনটি স্পষ্ট স্টেট রাখুন: hold (হাতে শেয়ার আছে), sold (আজই বিক্রি), rest (হাতে শেয়ার নেই ও কিনতে প্রস্তুত)। প্রতিদিনের দাম অনুযায়ী ৩ স্টেট আপডেট করলেই উত্তর পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'Day 0 p=1', memoryOrStack: 'hold=-1, sold=0, rest=0', note: 'Buy on day 0 -> hold=-1' },
      { step: 2, state: 'Day 1 p=2', memoryOrStack: 'hold=-1, sold=1, rest=0', note: 'Sell -> sold=1' },
      { step: 3, state: 'Day 2 p=3', memoryOrStack: 'hold=-1, sold=2, rest=1', note: 'Cooldown rest=1' },
      { step: 4, state: 'Day 3 p=0, Day 4 p=2', memoryOrStack: 'hold=1, sold=3, rest=2', note: 'Max profit = max(sold, rest) = 3' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '0';
      const n = Number(p[0]);
      if (n <= 1) return '0';
      let hold = -BigInt(p[1]);
      let sold = 0n;
      let rest = 0n;
      for (let i = 1; i < n; i++) {
        const price = BigInt(p[1 + i]);
        const nHold = rest - price > hold ? rest - price : hold;
        const nSold = hold + price;
        const nRest = sold > rest ? sold : rest;
        hold = nHold;
        sold = nSold;
        rest = nRest;
      }
      return (sold > rest ? sold : rest).toString();
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['5\n1 2 3 0 2', '1\n5'];
      const hidden = ['2\n1 5', '2\n5 1', '4\n5 4 3 2', '6\n1 1000000000 1 1 1000000000 5', '5\n2 1 4 5 2'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 10, 45);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 50000000));
        hidden.push(`${n}\n${arr.join(' ')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Stock Trading with Cooldown'),
      cpp: makeStarter('cpp', 'Stock Trading with Cooldown'),
      python: makeStarter('python', 'Stock Trading with Cooldown'),
      java: makeStarter('java', 'Stock Trading with Cooldown'),
      javascript: makeStarter('javascript', 'Stock Trading with Cooldown'),
      typescript: makeStarter('typescript', 'Stock Trading with Cooldown'),
      rust: makeStarter('rust', 'Stock Trading with Cooldown'),
    },
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long first;
    scanf("%lld", &first);
    long long hold = -first, sold = 0, rest = 0;
    for (int i = 1; i < n; i++) {
        long long x;
        scanf("%lld", &x);
        long long nh = rest - x > hold ? rest - x : hold;
        long long ns = hold + x;
        long long nr = sold > rest ? sold : rest;
        hold = nh; sold = ns; rest = nr;
    }
    printf("%lld\\n", sold > rest ? sold : rest);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    long long first;
    cin >> first;
    long long hold = -first, sold = 0, rest = 0;
    for (int i = 1; i < n; i++) {
        long long x;
        cin >> x;
        long long nh = max(hold, rest - x);
        long long ns = hold + x;
        long long nr = max(rest, sold);
        hold = nh; sold = ns; rest = nr;
    }
    cout << max(sold, rest) << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p or p[0] <= 0: return
    hold, sold, rest = -p[1], 0, 0
    for price in p[2:1+p[0]]:
        hold, sold, rest = max(hold, rest - price), hold + price, max(rest, sold)
    print(max(sold, rest))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        if (n <= 0) { System.out.println(0); return; }
        while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
        long hold = -Long.parseLong(st.nextToken()), sold = 0, rest = 0;
        for (int i = 1; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long x = Long.parseLong(st.nextToken());
            long nh = Math.max(hold, rest - x);
            long ns = hold + x;
            long nr = Math.max(rest, sold);
            hold = nh; sold = ns; rest = nr;
        }
        System.out.println(Math.max(sold, rest));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const n = Number(p[0]);
  if (n <= 1) { console.log(0); } else {
    let hold = -BigInt(p[1]), sold = 0n, rest = 0n;
    for (let i = 1; i < n; i++) {
      const price = BigInt(p[1 + i]);
      const nh = rest - price > hold ? rest - price : hold;
      const ns = hold + price;
      const nr = sold > rest ? sold : rest;
      hold = nh; sold = ns; rest = nr;
    }
    console.log((sold > rest ? sold : rest).toString());
  }
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const n: number = Number(p[0]);
  if (n <= 1) { console.log(0); } else {
    let hold: bigint = -BigInt(p[1]);
    let sold: bigint = 0n;
    let rest: bigint = 0n;
    for (let i = 1; i < n; i++) {
      const price: bigint = BigInt(p[1 + i]);
      const nh: bigint = rest - price > hold ? rest - price : hold;
      const ns: bigint = hold + price;
      const nr: bigint = sold > rest ? sold : rest;
      hold = nh; sold = ns; rest = nr;
    }
    console.log((sold > rest ? sold : rest).toString());
  }
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    if n <= 1 { println!("0"); return; }
    let first: i64 = it.next().unwrap().parse().unwrap();
    let (mut hold, mut sold, mut rest) = (-first, 0i64, 0i64);
    for _ in 1..n {
        let price: i64 = it.next().unwrap().parse().unwrap();
        let nh = hold.max(rest - price);
        let ns = hold + price;
        let nr = rest.max(sold);
        hold = nh; sold = ns; rest = nr;
    }
    println!("{}", sold.max(rest));
}`,
    },
  },

  dp_bitmask_assign: {
    id: 'dp_bitmask_assign',
    defaultTopic: 'Bitmask DP',
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(2^N)',
    bruteComplexity: 'O(N!)',
    betterComplexity: 'O(N! with pruning)',
    inputFormat: 'First line contains N (1 <= N <= 12). Next N lines each contain N non-negative integers where cost[i][j] is the cost of assigning worker i to task j.',
    outputFormat: 'Print the minimum total cost of a 1-to-1 assignment of all N workers to N tasks.',
    constraints: ['1 <= N <= 12', '0 <= cost[i][j] <= 10^6'],
    hints: [
      'Instead of iterating N! permutations, track the set of already-assigned tasks as a bitmask of N bits.',
      'If mask has k set bits (popcount(mask) = k), the next worker to assign is worker k.',
      'For each unset bit j in mask: dp[mask | (1 << j)] = min(..., dp[mask] + cost[k][j]).',
    ],
    bruteIntuition: 'Check all N! permutations of task assignments.',
    bruteBangla: 'সব N! পার্মুটেশন চেক করে সর্বনিম্ন খরচ খোঁজা।',
    bruteWhyTle: '12! = 479,001,600 exceeds the 10^8 operation budget.',
    brutePseudo: 'for each perm of 0..N-1: update min sum cost[i][perm[i]]',
    betterIntuition: 'Branch-and-bound backtracking with partial sum pruning.',
    betterBangla: 'ব্যাকট্র্যাকিং করে বর্তমান খরচ বেস্টের বেশি হলে থেমে যাওয়া।',
    betterTradeoff: 'Worst case still approaches O(N!) on uniform cost matrices.',
    betterPseudo: 'backtrack(worker, usedMask, acc)',
    optimalIntuition: 'Bitmask DP over masks 0..(1<<N)-1. At each mask with worker = popcount(mask), relax transitions to mask | (1<<j) for every unset task j.',
    optimalBangla: 'mask-এর সেট বিট সংখ্যা দেখে কোন ওয়ার্কার অ্যাসাইন হবে তা বের করে O(N * 2^N) সময়ে মিনিমাম কস্ট নির্ণয়।',
    optimalWhyWins: '12 * 4096 = 49,152 ops vs 12! = 479M ops — 10,000x faster!',
    optimalPseudo: 'dp[0]=0; for mask=0..(1<<N)-1: k=popcount(mask); for j unset: dp[mask|1<<j] = min(..., dp[mask]+cost[k][j])',
    banglaEditorial: 'বিটমাস্ক মানে কোন টাস্কগুলো নেওয়া হয়েছে তার বাইনারি নকশা। mask-এ kটি বিট অন থাকলে ঠিক k জন ওয়ার্কার কাজ পেয়েছে, তাই পরের ওয়ার্কার k-কে বাকি ফাঁকা টাস্ক j-তে বসিয়ে dp আপডেট করতে হয়।',
    dryRunSteps: [
      { step: 1, state: 'N=3, mask=000', memoryOrStack: 'dp[0]=0', note: '0 workers assigned' },
      { step: 2, state: 'k=0 -> worker 0', memoryOrStack: 'dp[001]=c[0][0], dp[010]=c[0][1], dp[100]=c[0][2]', note: 'Assign worker 0' },
      { step: 3, state: 'popcount(mask)=1', memoryOrStack: 'assign worker 1 to unset bit j', note: 'Transition mask -> mask | (1<<j)' },
      { step: 4, state: 'mask=111', memoryOrStack: 'dp[(1<<N)-1]', note: 'Minimum full assignment cost' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '0';
      const n = Number(p[0]);
      const cost: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
      let idx = 1;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) cost[i][j] = Number(p[idx++]);
      }
      const total = 1 << n;
      const INF = 1e15;
      const dp = new Array<number>(total).fill(INF);
      dp[0] = 0;
      for (let mask = 0; mask < total; mask++) {
        if (dp[mask] >= INF) continue;
        let k = 0;
        let m = mask;
        while (m > 0) {
          m &= m - 1;
          k++;
        }
        if (k >= n) continue;
        for (let j = 0; j < n; j++) {
          if ((mask & (1 << j)) === 0) {
            const nxt = mask | (1 << j);
            const cand = dp[mask] + cost[k][j];
            if (cand < dp[nxt]) dp[nxt] = cand;
          }
        }
      }
      return String(dp[total - 1]);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['3\n9 2 7\n6 4 3\n5 8 1', '2\n10 5\n5 10'];
      const hidden = ['1\n42', '3\n1 100 100\n100 1 100\n100 100 1', '4\n0 0 0 0\n0 0 0 0\n0 0 0 0\n0 0 0 0', '4\n10 20 30 40\n40 10 20 30\n30 40 10 20\n20 30 40 10', '5\n12 4 7 9 3\n6 11 5 8 14\n9 3 15 2 6\n4 8 10 12 1\n10 5 2 7 11'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 4, 8);
        const lines = [String(n)];
        for (let i = 0; i < n; i++) lines.push(Array.from({ length: n }, () => randInt(rng, 1, 5000)).join(' '));
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Bitmask DP Assignment'),
      cpp: makeStarter('cpp', 'Bitmask DP Assignment'),
      python: makeStarter('python', 'Bitmask DP Assignment'),
      java: makeStarter('java', 'Bitmask DP Assignment'),
      javascript: makeStarter('javascript', 'Bitmask DP Assignment'),
      typescript: makeStarter('typescript', 'Bitmask DP Assignment'),
      rust: makeStarter('rust', 'Bitmask DP Assignment'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long cost[12][12];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%lld", &cost[i][j]);
    int total = 1 << n;
    long long *dp = malloc(total * sizeof(long long));
    long long INF = (long long)4e18;
    for (int i = 0; i < total; i++) dp[i] = INF;
    dp[0] = 0;
    for (int mask = 0; mask < total; mask++) {
        int k = __builtin_popcount(mask);
        if (k >= n || dp[mask] == INF) continue;
        for (int j = 0; j < n; j++) {
            if (!(mask & (1 << j))) {
                int nxt = mask | (1 << j);
                if (dp[mask] + cost[k][j] < dp[nxt]) dp[nxt] = dp[mask] + cost[k][j];
            }
        }
    }
    printf("%lld\\n", dp[total - 1]);
    free(dp);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<vector<long long>> cost(n, vector<long long>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> cost[i][j];
    int total = 1 << n;
    const long long INF = 4e18;
    vector<long long> dp(total, INF);
    dp[0] = 0;
    for (int mask = 0; mask < total; mask++) {
        int k = __builtin_popcount((unsigned)mask);
        if (k >= n || dp[mask] == INF) continue;
        for (int j = 0; j < n; j++) {
            if (!(mask & (1 << j))) {
                dp[mask | (1 << j)] = min(dp[mask | (1 << j)], dp[mask] + cost[k][j]);
            }
        }
    }
    cout << dp[total - 1] << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n = p[0]
    cost = [p[1 + i*n : 1 + (i+1)*n] for i in range(n)]
    total = 1 << n
    INF = 10**18
    dp = [INF] * total
    dp[0] = 0
    for mask in range(total):
        if dp[mask] == INF: continue
        k = mask.bit_count()
        if k >= n: continue
        base = dp[mask]
        row = cost[k]
        for j in range(n):
            if not (mask & (1 << j)):
                nxt = mask | (1 << j)
                if base + row[j] < dp[nxt]:
                    dp[nxt] = base + row[j]
    print(dp[total - 1])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long[][] cost = new long[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
                cost[i][j] = Long.parseLong(st.nextToken());
            }
        }
        int total = 1 << n;
        long INF = (long)4e18;
        long[] dp = new long[total];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int mask = 0; mask < total; mask++) {
            int k = Integer.bitCount(mask);
            if (k >= n || dp[mask] == INF) continue;
            for (int j = 0; j < n; j++) {
                if ((mask & (1 << j)) == 0) {
                    int nxt = mask | (1 << j);
                    dp[nxt] = Math.min(dp[nxt], dp[mask] + cost[k][j]);
                }
            }
        }
        System.out.println(dp[total - 1]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const n = Number(p[0]);
  const cost = Array.from({ length: n }, () => new Array(n).fill(0));
  let idx = 1;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cost[i][j] = Number(p[idx++]);
  const total = 1 << n, dp = new Array(total).fill(1e15);
  dp[0] = 0;
  for (let mask = 0; mask < total; mask++) {
    if (dp[mask] >= 1e15) continue;
    let k = 0, m = mask;
    while (m > 0) { m &= m - 1; k++; }
    if (k >= n) continue;
    for (let j = 0; j < n; j++) {
      if ((mask & (1 << j)) === 0) {
        const nxt = mask | (1 << j);
        const cand = dp[mask] + cost[k][j];
        if (cand < dp[nxt]) dp[nxt] = cand;
      }
    }
  }
  console.log(dp[total - 1]);
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const n: number = Number(p[0]);
  const cost: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  let idx = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) cost[i][j] = Number(p[idx++]);
  }
  const total: number = 1 << n;
  const dp: number[] = new Array<number>(total).fill(1e15);
  dp[0] = 0;
  for (let mask = 0; mask < total; mask++) {
    if (dp[mask] >= 1e15) continue;
    let k = 0;
    let m = mask;
    while (m > 0) { m &= m - 1; k++; }
    if (k >= n) continue;
    for (let j = 0; j < n; j++) {
      if ((mask & (1 << j)) === 0) {
        const nxt: number = mask | (1 << j);
        const cand: number = dp[mask] + cost[k][j];
        if (cand < dp[nxt]) dp[nxt] = cand;
      }
    }
  }
  console.log(dp[total - 1]);
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let mut cost = vec![vec![0i64; n]; n];
    for i in 0..n { for j in 0..n { cost[i][j] = it.next().unwrap().parse().unwrap(); } }
    let total = 1usize << n;
    let mut dp = vec![i64::MAX / 4; total];
    dp[0] = 0;
    for mask in 0..total {
        let k = mask.count_ones() as usize;
        if k >= n || dp[mask] >= i64::MAX / 4 { continue; }
        for j in 0..n {
            if (mask & (1 << j)) == 0 {
                let nxt = mask | (1 << j);
                dp[nxt] = dp[nxt].min(dp[mask] + cost[k][j]);
            }
        }
    }
    println!("{}", dp[total - 1]);
}`,
    },
  },

  graph_bfs_shortest: {
    id: 'graph_bfs_shortest',
    defaultTopic: 'Graphs & BFS',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(N + M)',
    bruteComplexity: 'O(N!)',
    betterComplexity: 'O(N^2) adjacency matrix BFS',
    inputFormat: 'First line contains N (1 <= N <= 10^5) and M (0 <= M <= 2 * 10^5). Next M lines each contain two integers u and v representing an undirected edge.',
    outputFormat: 'Print the minimum number of edges from node 1 to node N, or -1 if node N is unreachable.',
    constraints: ['1 <= N <= 10^5', '0 <= M <= 2 * 10^5', '1-indexed nodes'],
    hints: [
      'Because all edges have weight 1, BFS visits nodes in strictly non-decreasing order of distance from node 1.',
      'Mark dist[1] = 0 when pushing to the queue (NEVER mark visited only on pop, or you push duplicates!).',
      'Return dist[N] as soon as BFS finishes (or early-exit when popping N).',
    ],
    bruteIntuition: 'Use DFS over all simple paths from 1 to N and take the minimum length.',
    bruteBangla: 'DFS চালিয়ে সব সম্ভব পথ খুঁজে ছোট পথটি নেওয়া।',
    bruteWhyTle: 'Simple paths in cyclic graphs can grow exponentially.',
    brutePseudo: 'dfs(u, d): try all unvisited neighbors',
    betterIntuition: 'Run Dijkstra with priority queue even on unit edges.',
    betterBangla: 'ইউনিট ওয়েটেও Dijkstra চালানো।',
    betterTradeoff: 'Adds unnecessary O(log N) heap overhead compared to O(N + M) BFS queue.',
    betterPseudo: 'priority_queue from source 1',
    optimalIntuition: 'Build adjacency list, initialize dist[1..N] = -1, dist[1] = 0, push 1 into FIFO queue (using index pointer), and relax unvisited neighbors.',
    optimalBangla: 'সব এজ ওয়েট ১ হওয়ায় অ্যাডজেসেন্সি লিস্টের ওপর স্ট্যান্ডার্ড BFS চালিয়ে O(N+M) সময়ে ১ থেকে N-এর দূরত্ব বের করা।',
    optimalWhyWins: 'True linear O(N + M) traversal.',
    optimalPseudo: 'q=[1]; dist[1]=0; while head<len(q): u=q[head++]; for v in adj[u]: if dist[v]==-1: dist[v]=dist[u]+1; q.push(v)',
    banglaEditorial: 'অ্যাডজেসেন্সি লিস্টে ১ নম্বর নোড থেকে BFS শুরু করুন। যেকোনো নোড প্রথমবার কিউতে ঢোকার সময়ই তার সবচেয়ে ছোট দূরত্ব নিশ্চিত হয়ে যায়। তাই কিউ থেকে পপ করে নয়, কিউতে ঢোকানোর আগেই dist[v] সেট করুন।',
    dryRunSteps: [
      { step: 1, state: 'Start node 1', memoryOrStack: 'queue=[1], dist[1]=0', note: 'Initialize BFS queue' },
      { step: 2, state: 'Pop 1', memoryOrStack: 'queue=[2,3], dist[2]=1, dist[3]=1', note: 'Relax direct neighbors' },
      { step: 3, state: 'Pop 2, then 3', memoryOrStack: 'queue=[4], dist[4]=2', note: 'Node 4 already marked on push from 2' },
      { step: 4, state: 'Pop 4', memoryOrStack: 'dist[5]=3', note: 'Reached target N=5 in 3 hops' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '-1';
      const n = p[0], m = p[1];
      const adj: number[][] = Array.from({ length: n + 1 }, () => []);
      let idx = 2;
      for (let i = 0; i < m; i++) {
        const u = p[idx++], v = p[idx++];
        adj[u].push(v);
        adj[v].push(u);
      }
      const dist = new Int32Array(n + 1).fill(-1);
      const q = [1];
      dist[1] = 0;
      for (let head = 0; head < q.length; head++) {
        const u = q[head];
        if (u === n) return String(dist[u]);
        for (const v of adj[u]) {
          if (dist[v] === -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
          }
        }
      }
      return String(dist[n]);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['5 5\n1 2\n1 3\n2 4\n3 4\n4 5', '4 2\n1 2\n3 4'];
      const hidden = ['1 0', '2 1\n1 2', '3 0', '5 4\n1 2\n2 3\n3 4\n4 5', '4 5\n1 2\n2 3\n3 4\n1 4\n2 4'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 8, 25);
        const m = randInt(rng, n - 1, n * 2);
        const lines = [`${n} ${m}`];
        for (let i = 0; i < m; i++) {
          lines.push(`${randInt(rng, 1, n)} ${randInt(rng, 1, n)}`);
        }
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Unweighted Shortest Path BFS'),
      cpp: makeStarter('cpp', 'Unweighted Shortest Path BFS'),
      python: makeStarter('python', 'Unweighted Shortest Path BFS'),
      java: makeStarter('java', 'Unweighted Shortest Path BFS'),
      javascript: makeStarter('javascript', 'Unweighted Shortest Path BFS'),
      typescript: makeStarter('typescript', 'Unweighted Shortest Path BFS'),
      rust: makeStarter('rust', 'Unweighted Shortest Path BFS'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    int *head = malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) head[i] = -1;
    int cap = m * 2 + 2;
    int *to = malloc(cap * sizeof(int));
    int *nxt = malloc(cap * sizeof(int));
    int ec = 0;
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        to[ec] = v; nxt[ec] = head[u]; head[u] = ec++;
        to[ec] = u; nxt[ec] = head[v]; head[v] = ec++;
    }
    int *dist = malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) dist[i] = -1;
    int *q = malloc((n + 1) * sizeof(int));
    int qh = 0, qt = 0;
    dist[1] = 0;
    q[qt++] = 1;
    while (qh < qt) {
        int u = q[qh++];
        if (u == n) break;
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q[qt++] = v;
            }
        }
    }
    printf("%d\\n", dist[n]);
    free(head); free(to); free(nxt); free(dist); free(q);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> dist(n + 1, -1);
    queue<int> q;
    dist[1] = 0;
    q.push(1);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == n) break;
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    cout << dist[n] << "\\n";
    return 0;
}`,
      python: `import sys
from collections import deque
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, m = p[0], p[1]
    adj = [[] for _ in range(n + 1)]
    for i in range(m):
        u, v = p[2 + 2*i], p[3 + 2*i]
        adj[u].append(v)
        adj[v].append(u)
    dist = [-1] * (n + 1)
    dist[1] = 0
    q = deque([1])
    while q:
        u = q.popleft()
        if u == n: break
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    print(dist[n])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        int[] dist = new int[n + 1];
        Arrays.fill(dist, -1);
        ArrayDeque<Integer> q = new ArrayDeque<>();
        dist[1] = 0;
        q.add(1);
        while (!q.isEmpty()) {
            int u = q.poll();
            if (u == n) break;
            for (int v : adj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        System.out.println(dist[n]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n = p[0], m = p[1];
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) {
    const u = p[2 + 2*i], v = p[3 + 2*i];
    adj[u].push(v); adj[v].push(u);
  }
  const dist = new Int32Array(n + 1).fill(-1);
  const q = [1]; dist[1] = 0;
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    if (u === n) break;
    for (const v of adj[u]) {
      if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
    }
  }
  console.log(dist[n]);
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n: number = p[0];
  const m: number = p[1];
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) {
    const u: number = p[2 + 2 * i];
    const v: number = p[3 + 2 * i];
    adj[u].push(v);
    adj[v].push(u);
  }
  const dist: number[] = new Array<number>(n + 1).fill(-1);
  const q: number[] = [1];
  dist[1] = 0;
  for (let h = 0; h < q.length; h++) {
    const u: number = q[h];
    if (u === n) break;
    for (const v of adj[u]) {
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  console.log(dist[n]);
}`,
      rust: `use std::collections::VecDeque;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let m: usize = it.next().unwrap().parse().unwrap();
    let mut adj = vec![Vec::new(); n + 1];
    for _ in 0..m {
        let u: usize = it.next().unwrap().parse().unwrap();
        let v: usize = it.next().unwrap().parse().unwrap();
        adj[u].push(v);
        adj[v].push(u);
    }
    let mut dist = vec![-1i32; n + 1];
    let mut q = VecDeque::new();
    dist[1] = 0;
    q.push_back(1);
    while let Some(u) = q.pop_front() {
        if u == n { break; }
        for &v in &adj[u] {
            if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); }
        }
    }
    println!("{}", dist[n]);
}`,
    },
  },

  graph_dijkstra: {
    id: 'graph_dijkstra',
    defaultTopic: 'Shortest Paths',
    timeComplexity: 'O((N + M) log N)',
    spaceComplexity: 'O(N + M)',
    bruteComplexity: 'O(N * M) Bellman-Ford',
    betterComplexity: 'O(N^2 + M) unheaped Dijkstra',
    inputFormat: 'First line contains N (1 <= N <= 10^5) and M (0 <= M <= 2 * 10^5). Next M lines each contain u, v, and non-negative weight w (directed edge u -> v).',
    outputFormat: 'Print the minimum total weight from node 1 to node N, or -1 if unreachable.',
    constraints: ['1 <= N <= 10^5', '0 <= M <= 2 * 10^5', '1 <= w <= 10^9', 'Use 64-bit distances'],
    hints: [
      'Non-negative edge weights allow greedy relaxation via a min-heap (priority queue).',
      'Always check `if d != dist[u]: continue` right after popping from the min-heap to skip stale entries!',
      'Store distances in 64-bit integers (`long long` / `BigInt`) because path weights can reach 10^14.',
    ],
    bruteIntuition: 'Run Bellman-Ford relaxing all M edges N-1 times.',
    bruteBangla: 'Bellman-Ford চালিয়ে N-1 বার সব এজ রিলাক্স করা।',
    bruteWhyTle: 'O(N * M) = 2 * 10^10 ops when N=10^5, M=2*10^5.',
    brutePseudo: 'repeat N-1 times: for (u,v,w): dist[v]=min(dist[v], dist[u]+w)',
    betterIntuition: 'Dense Dijkstra scanning all N nodes each iteration to find min unvisited.',
    betterBangla: 'হিপ ছাড়া প্রতি ধাপে মিনিমাম নোড খোঁজা।',
    betterTradeoff: 'O(N^2) TLEs on sparse large graphs.',
    betterPseudo: 'repeat N times: pick unvisited min dist node, relax edges',
    optimalIntuition: 'Min-heap Dijkstra over adjacency list with stale-entry check (d > dist[u]) and 64-bit arithmetic.',
    optimalBangla: 'মিন-হিপ (Priority Queue) ব্যবহার করে Dijkstra চালানো এবং পপ করার পর stale এন্ট্রি বাদ দেওয়া।',
    optimalWhyWins: 'O((N + M) log N) finishes easily within 100 ms even on 10^5 nodes.',
    optimalPseudo: 'pq.push((0,1)); while pq: (d,u)=pq.pop(); if d>dist[u] continue; relax neighbors',
    banglaEditorial: 'ডাইরেক্টেড ওয়েটেড গ্রাফে অঋণাত্মক ওজন থাকলে মিন-হিপ ডাইকস্ট্রা ব্যবহার করুন। কিউ থেকে (d, u) বের করার সময় d > dist[u] হলে সেটি পুরোনো ডেটা—তাই স্কিপ করতে ভুলবেন না।',
    dryRunSteps: [
      { step: 1, state: 'Init source 1', memoryOrStack: 'dist[1]=0, pq=[(0,1)]', note: 'Push source with distance 0' },
      { step: 2, state: 'Pop (0,1)', memoryOrStack: 'dist[2]=4, dist[3]=1, pq=[(1,3),(4,2)]', note: 'Relax outgoing edges' },
      { step: 3, state: 'Pop (1,3)', memoryOrStack: 'dist[2]=3, pq=[(3,2),(4,2)]', note: 'Shorter path 1->3->2 discovered' },
      { step: 4, state: 'Pop (3,2) -> (4,2) skipped', memoryOrStack: 'dist[4]=4', note: 'Stale entry (4,2) ignored via d > dist[u]' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '-1';
      const n = Number(p[0]);
      const m = Number(p[1]);
      const adj: Array<Array<[number, bigint]>> = Array.from({ length: n + 1 }, () => []);
      let idx = 2;
      for (let i = 0; i < m; i++) {
        const u = Number(p[idx++]);
        const v = Number(p[idx++]);
        const w = BigInt(p[idx++]);
        adj[u].push([v, w]);
      }
      const INF = 10n ** 18n;
      const dist: bigint[] = new Array(n + 1).fill(INF);
      dist[1] = 0n;
      const heap: Array<[bigint, number]> = [[0n, 1]];
      const push = (item: [bigint, number]) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
          const par = (i - 1) >> 1;
          if (heap[par][0] <= heap[i][0]) break;
          const tmp = heap[par];
          heap[par] = heap[i];
          heap[i] = tmp;
          i = par;
        }
      };
      const pop = (): [bigint, number] => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
          heap[0] = last;
          let i = 0;
          while (true) {
            let sm = i;
            const l = 2 * i + 1, r = 2 * i + 2;
            if (l < heap.length && heap[l][0] < heap[sm][0]) sm = l;
            if (r < heap.length && heap[r][0] < heap[sm][0]) sm = r;
            if (sm === i) break;
            const tmp = heap[sm];
            heap[sm] = heap[i];
            heap[i] = tmp;
            i = sm;
          }
        }
        return top;
      };
      while (heap.length > 0) {
        const [d, u] = pop();
        if (d > dist[u]) continue;
        if (u === n) break;
        for (const [v, w] of adj[u]) {
          if (d + w < dist[v]) {
            dist[v] = d + w;
            push([dist[v], v]);
          }
        }
      }
      return dist[n] >= INF ? '-1' : dist[n].toString();
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['4 5\n1 2 4\n1 3 1\n3 2 2\n2 4 1\n3 4 5', '3 1\n1 2 10'];
      const hidden = ['1 0', '3 2\n1 2 1000000000\n2 3 1000000000', '4 4\n1 2 5\n1 3 2\n3 4 1\n2 4 10', '4 3\n2 3 1\n3 4 1\n1 4 9', '3 3\n1 2 10\n1 2 3\n2 3 4'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 6, 22);
        const m = randInt(rng, n, n * 3);
        const lines = [`${n} ${m}`];
        for (let i = 0; i < m; i++) {
          lines.push(`${randInt(rng, 1, n)} ${randInt(rng, 1, n)} ${randInt(rng, 1, 50000000)}`);
        }
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Weighted Shortest Path Dijkstra'),
      cpp: makeStarter('cpp', 'Weighted Shortest Path Dijkstra'),
      python: makeStarter('python', 'Weighted Shortest Path Dijkstra'),
      java: makeStarter('java', 'Weighted Shortest Path Dijkstra'),
      javascript: makeStarter('javascript', 'Weighted Shortest Path Dijkstra'),
      typescript: makeStarter('typescript', 'Weighted Shortest Path Dijkstra'),
      rust: makeStarter('rust', 'Weighted Shortest Path Dijkstra'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
typedef struct { long long d; int u; } Item;
int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    int *head = malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) head[i] = -1;
    int *to = malloc((m + 1) * sizeof(int));
    long long *wt = malloc((m + 1) * sizeof(long long));
    int *nxt = malloc((m + 1) * sizeof(int));
    for (int i = 0; i < m; i++) {
        int u, v; long long w;
        scanf("%d %d %lld", &u, &v, &w);
        to[i] = v; wt[i] = w; nxt[i] = head[u]; head[u] = i;
    }
    long long INF = (long long)4e18;
    long long *dist = malloc((n + 1) * sizeof(long long));
    for (int i = 0; i <= n; i++) dist[i] = INF;
    Item *heap = malloc((m + 5) * sizeof(Item));
    int hsz = 0;
    dist[1] = 0;
    heap[hsz++] = (Item){0, 1};
    while (hsz > 0) {
        Item top = heap[0];
        heap[0] = heap[--hsz];
        int i = 0;
        while (1) {
            int sm = i, l = 2*i+1, r = 2*i+2;
            if (l < hsz && heap[l].d < heap[sm].d) sm = l;
            if (r < hsz && heap[r].d < heap[sm].d) sm = r;
            if (sm == i) break;
            Item t = heap[sm]; heap[sm] = heap[i]; heap[i] = t; i = sm;
        }
        if (top.d > dist[top.u]) continue;
        if (top.u == n) break;
        for (int e = head[top.u]; e != -1; e = nxt[e]) {
            int v = to[e];
            long long nd = top.d + wt[e];
            if (nd < dist[v]) {
                dist[v] = nd;
                int k = hsz++;
                heap[k] = (Item){nd, v};
                while (k > 0) {
                    int p = (k - 1) / 2;
                    if (heap[p].d <= heap[k].d) break;
                    Item t = heap[p]; heap[p] = heap[k]; heap[k] = t; k = p;
                }
            }
        }
    }
    printf("%lld\\n", dist[n] >= INF ? -1 : dist[n]);
    free(head); free(to); free(wt); free(nxt); free(dist); free(heap);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    const long long INF = 4e18;
    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    dist[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        if (u == n) break;
        for (auto [v, w] : adj[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    cout << (dist[n] >= INF ? -1 : dist[n]) << "\\n";
    return 0;
}`,
      python: `import sys, heapq
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, m = p[0], p[1]
    adj = [[] for _ in range(n + 1)]
    for i in range(m):
        u, v, w = p[2 + 3*i], p[3 + 3*i], p[4 + 3*i]
        adj[u].append((v, w))
    INF = 10**18
    dist = [INF] * (n + 1)
    dist[1] = 0
    pq = [(0, 1)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        if u == n: break
        for v, w in adj[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    print(-1 if dist[n] >= INF else dist[n])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        List<List<long[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            long w = Long.parseLong(st.nextToken());
            adj.get(u).add(new long[]{v, w});
        }
        long INF = (long)4e18;
        long[] dist = new long[n + 1];
        Arrays.fill(dist, INF);
        dist[1] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingLong(a -> a[0]));
        pq.add(new long[]{0, 1});
        while (!pq.isEmpty()) {
            long[] cur = pq.poll();
            long d = cur[0]; int u = (int)cur[1];
            if (d > dist[u]) continue;
            if (u == n) break;
            for (long[] e : adj.get(u)) {
                int v = (int)e[0]; long w = e[1];
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    pq.add(new long[]{dist[v], v});
                }
            }
        }
        System.out.println(dist[n] >= INF ? -1 : dist[n]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const n = Number(p[0]), m = Number(p[1]);
  const adj = Array.from({ length: n + 1 }, () => []);
  let idx = 2;
  for (let i = 0; i < m; i++) {
    adj[Number(p[idx++])].push([Number(p[idx++]), BigInt(p[idx++])]);
  }
  const INF = 10n ** 18n, dist = new Array(n + 1).fill(INF);
  dist[1] = 0n;
  const heap = [[0n, 1]];
  const push = (it) => {
    heap.push(it);
    let i = heap.length - 1;
    while (i > 0) {
      const pa = (i - 1) >> 1;
      if (heap[pa][0] <= heap[i][0]) break;
      const t = heap[pa]; heap[pa] = heap[i]; heap[i] = t; i = pa;
    }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let sm = i, l = 2*i+1, r = 2*i+2;
        if (l < heap.length && heap[l][0] < heap[sm][0]) sm = l;
        if (r < heap.length && heap[r][0] < heap[sm][0]) sm = r;
        if (sm === i) break;
        const t = heap[sm]; heap[sm] = heap[i]; heap[i] = t; i = sm;
      }
    }
    return top;
  };
  while (heap.length) {
    const [d, u] = pop();
    if (d > dist[u]) continue;
    if (u === n) break;
    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) { dist[v] = d + w; push([dist[v], v]); }
    }
  }
  console.log(dist[n] >= INF ? '-1' : dist[n].toString());
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const n: number = Number(p[0]);
  const m: number = Number(p[1]);
  const adjV: number[][] = Array.from({ length: n + 1 }, () => []);
  const adjW: bigint[][] = Array.from({ length: n + 1 }, () => []);
  let idx = 2;
  for (let i = 0; i < m; i++) {
    const u: number = Number(p[idx++]);
    const v: number = Number(p[idx++]);
    const w: bigint = BigInt(p[idx++]);
    adjV[u].push(v);
    adjW[u].push(w);
  }
  const INF: bigint = 1000000000000000000n;
  const dist: bigint[] = new Array<bigint>(n + 1).fill(INF);
  dist[1] = 0n;
  const hD: bigint[] = [0n];
  const hU: number[] = [1];
  const push = (d: bigint, u: number) => {
    hD.push(d);
    hU.push(u);
    let i = hD.length - 1;
    while (i > 0) {
      const pa = (i - 1) >> 1;
      if (hD[pa] <= hD[i]) break;
      const td = hD[pa]; hD[pa] = hD[i]; hD[i] = td;
      const tu = hU[pa]; hU[pa] = hU[i]; hU[i] = tu;
      i = pa;
    }
  };
  while (hD.length > 0) {
    const d: bigint = hD[0];
    const u: number = hU[0];
    const ld: bigint = hD.pop()!;
    const lu: number = hU.pop()!;
    if (hD.length > 0) {
      hD[0] = ld; hU[0] = lu;
      let i = 0;
      while (true) {
        let sm = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < hD.length && hD[l] < hD[sm]) sm = l;
        if (r < hD.length && hD[r] < hD[sm]) sm = r;
        if (sm === i) break;
        const td = hD[sm]; hD[sm] = hD[i]; hD[i] = td;
        const tu = hU[sm]; hU[sm] = hU[i]; hU[i] = tu;
        i = sm;
      }
    }
    if (d > dist[u]) continue;
    if (u === n) break;
    for (let j = 0; j < adjV[u].length; j++) {
      const v = adjV[u][j];
      const w = adjW[u][j];
      if (d + w < dist[v]) {
        dist[v] = d + w;
        push(dist[v], v);
      }
    }
  }
  console.log(dist[n] >= INF ? '-1' : dist[n].toString());
}`,
      rust: `use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let m: usize = it.next().unwrap().parse().unwrap();
    let mut adj = vec![Vec::new(); n + 1];
    for _ in 0..m {
        let u: usize = it.next().unwrap().parse().unwrap();
        let v: usize = it.next().unwrap().parse().unwrap();
        let w: i64 = it.next().unwrap().parse().unwrap();
        adj[u].push((v, w));
    }
    let inf = i64::MAX / 4;
    let mut dist = vec![inf; n + 1];
    let mut pq = BinaryHeap::new();
    dist[1] = 0;
    pq.push(Reverse((0i64, 1usize)));
    while let Some(Reverse((d, u))) = pq.pop() {
        if d > dist[u] { continue; }
        if u == n { break; }
        for &(v, w) in &adj[u] {
            if d + w < dist[v] {
                dist[v] = d + w;
                pq.push(Reverse((dist[v], v)));
            }
        }
    }
    println!("{}", if dist[n] >= inf { -1 } else { dist[n] });
}`,
    },
  },

  graph_topo_feasible: {
    id: 'graph_topo_feasible',
    defaultTopic: 'Topological Sort',
    timeComplexity: 'O((N + M) log N)',
    spaceComplexity: 'O(N + M)',
    bruteComplexity: 'O(N! * M)',
    betterComplexity: 'O(N^2) min scan per step',
    inputFormat: 'First line contains N (1 <= N <= 10^5) and M (0 <= M <= 2 * 10^5). Next M lines each contain u and v meaning task u must finish before task v.',
    outputFormat: 'Print the lexicographically smallest valid topological ordering as N space-separated integers, or -1 if a cycle makes ordering impossible.',
    constraints: ['1 <= N <= 10^5', '0 <= M <= 2 * 10^5', 'Nodes numbered 1..N'],
    hints: [
      'Compute indegree[1..N] for every node.',
      'To always pick the lexicographically smallest available node (indegree == 0), use a min-heap instead of a plain queue!',
      'If fewer than N nodes are output when the min-heap becomes empty, a cycle exists -> print -1.',
    ],
    bruteIntuition: 'Enumerate permutations in lexicographical order and test whether every edge u -> v appears with pos[u] < pos[v].',
    bruteBangla: 'সব পার্মুটেশন লেক্সিকোগ্রাফিক্যালি সাজিয়ে প্রথম বৈধ অর্ডার খোঁজা।',
    bruteWhyTle: 'N! permutations is impossible for N > 10.',
    brutePseudo: 'for each perm in sorted perms: if valid return perm',
    betterIntuition: 'At each step linearly scan 1..N for the smallest unused node with indegree 0.',
    betterBangla: 'প্রতি ধাপে লিনিয়ার সার্চ করে ক্ষুদ্রতম indegree=0 নোড নেওয়া।',
    betterTradeoff: 'O(N^2) scanning TLEs for N = 10^5.',
    betterPseudo: 'repeat N times: pick min node with indeg==0, decrement neighbors',
    optimalIntuition: 'Kahn’s algorithm with a min-heap holding all zero-indegree nodes. Pop minimum u, append to order, decrement indegree[v], push if indegree[v] == 0.',
    optimalBangla: 'মিন-হিপ দিয়ে Kahn’s Topological Sort চালালে একসাথে সাইকেল চেক ও ক্ষুদ্রতম অর্ডার পাওয়া যায়।',
    optimalWhyWins: 'Guaranteed O((N + M) log N) and handles arbitrary DAGs or cyclic graphs.',
    optimalPseudo: 'minHeap of indeg==0; while heap: u=pop(); order.push(u); for v: if --indeg[v]==0 heap.push(v); print order or -1',
    banglaEditorial: 'Kahn’s অ্যালগরিদমে সাধারণ কিউ-এর বদলে মিন-হিপ ব্যবহার করলে সবসময় সবচেয়ে ছোট নম্বর নোডটি আগে আসে। শেষে যদি অর্ডারের দৈর্ঘ্য N না হয়, তবে গ্রাফে সাইকেল আছে—তাই উত্তর -1।',
    dryRunSteps: [
      { step: 1, state: 'edges (2->1),(3->4)', memoryOrStack: 'indeg=[0,1,0,0,0], heap=[2,3]', note: 'Seed zero-indegree nodes in min-heap' },
      { step: 2, state: 'Pop min 2', memoryOrStack: 'order=[2], indeg[1]=0 -> heap=[1,3]', note: 'Smallest available node popped first' },
      { step: 3, state: 'Pop 1, 3, 4', memoryOrStack: 'order=[2,1,3,4]', note: 'All N nodes emitted -> valid DAG' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '-1';
      const n = p[0], m = p[1];
      const adj: number[][] = Array.from({ length: n + 1 }, () => []);
      const indeg = new Int32Array(n + 1);
      for (let i = 0; i < m; i++) {
        const u = p[2 + 2 * i], v = p[3 + 2 * i];
        adj[u].push(v);
        indeg[v]++;
      }
      const heap: number[] = [];
      const push = (x: number) => {
        heap.push(x);
        let i = heap.length - 1;
        while (i > 0) {
          const pa = (i - 1) >> 1;
          if (heap[pa] <= heap[i]) break;
          const t = heap[pa]; heap[pa] = heap[i]; heap[i] = t; i = pa;
        }
      };
      const pop = (): number => {
        const top = heap[0], last = heap.pop()!;
        if (heap.length) {
          heap[0] = last;
          let i = 0;
          while (true) {
            let sm = i, l = 2 * i + 1, r = 2 * i + 2;
            if (l < heap.length && heap[l] < heap[sm]) sm = l;
            if (r < heap.length && heap[r] < heap[sm]) sm = r;
            if (sm === i) break;
            const t = heap[sm]; heap[sm] = heap[i]; heap[i] = t; i = sm;
          }
        }
        return top;
      };
      for (let i = 1; i <= n; i++) if (indeg[i] === 0) push(i);
      const order: number[] = [];
      while (heap.length > 0) {
        const u = pop();
        order.push(u);
        for (const v of adj[u]) {
          indeg[v]--;
          if (indeg[v] === 0) push(v);
        }
      }
      return order.length === n ? order.join(' ') : '-1';
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['4 2\n2 1\n3 4', '3 3\n1 2\n2 3\n3 1'];
      const hidden = ['1 0', '4 0', '3 2\n1 2\n2 3', '4 4\n4 3\n3 2\n2 1\n1 4', '5 4\n5 1\n4 1\n3 2\n2 1'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 5, 16);
        const perm = Array.from({ length: n }, (_, i) => i + 1);
        for (let i = n - 1; i > 0; i--) {
          const j = randInt(rng, 0, i);
          const tmp = perm[i]; perm[i] = perm[j]; perm[j] = tmp;
        }
        const edges: string[] = [];
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            if (rng() < 0.35) edges.push(`${perm[i]} ${perm[j]}`);
          }
        }
        if (t === 4 && n >= 3) edges.push(`${perm[n - 1]} ${perm[0]}`); // cycle case
        hidden.push(`${n} ${edges.length}\n${edges.join('\n')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Lexicographical Topological Sort'),
      cpp: makeStarter('cpp', 'Lexicographical Topological Sort'),
      python: makeStarter('python', 'Lexicographical Topological Sort'),
      java: makeStarter('java', 'Lexicographical Topological Sort'),
      javascript: makeStarter('javascript', 'Lexicographical Topological Sort'),
      typescript: makeStarter('typescript', 'Lexicographical Topological Sort'),
      rust: makeStarter('rust', 'Lexicographical Topological Sort'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    int *head = malloc((n + 1) * sizeof(int));
    int *indeg = calloc(n + 1, sizeof(int));
    for (int i = 0; i <= n; i++) head[i] = -1;
    int *to = malloc((m + 1) * sizeof(int));
    int *nxt = malloc((m + 1) * sizeof(int));
    for (int i = 0; i < m; i++) {
        int u, v; scanf("%d %d", &u, &v);
        to[i] = v; nxt[i] = head[u]; head[u] = i;
        indeg[v]++;
    }
    int *heap = malloc((n + 1) * sizeof(int)), hsz = 0;
    for (int i = 1; i <= n; i++) {
        if (indeg[i] == 0) {
            int k = hsz++; heap[k] = i;
            while (k > 0) {
                int p = (k - 1) / 2;
                if (heap[p] <= heap[k]) break;
                int t = heap[p]; heap[p] = heap[k]; heap[k] = t; k = p;
            }
        }
    }
    int *out = malloc(n * sizeof(int)), cnt = 0;
    while (hsz > 0) {
        int u = heap[0];
        heap[0] = heap[--hsz];
        int i = 0;
        while (1) {
            int sm = i, l = 2*i+1, r = 2*i+2;
            if (l < hsz && heap[l] < heap[sm]) sm = l;
            if (r < hsz && heap[r] < heap[sm]) sm = r;
            if (sm == i) break;
            int t = heap[sm]; heap[sm] = heap[i]; heap[i] = t; i = sm;
        }
        out[cnt++] = u;
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            if (--indeg[v] == 0) {
                int k = hsz++; heap[k] = v;
                while (k > 0) {
                    int p = (k - 1) / 2;
                    if (heap[p] <= heap[k]) break;
                    int t = heap[p]; heap[p] = heap[k]; heap[k] = t; k = p;
                }
            }
        }
    }
    if (cnt != n) printf("-1\\n");
    else {
        for (int i = 0; i < n; i++) printf("%d%c", out[i], i + 1 == n ? '\\n' : ' ');
    }
    free(head); free(indeg); free(to); free(nxt); free(heap); free(out);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        indeg[v]++;
    }
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) pq.push(i);
    vector<int> order;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        order.push_back(u);
        for (int v : adj[u]) if (--indeg[v] == 0) pq.push(v);
    }
    if ((int)order.size() != n) cout << "-1\\n";
    else {
        for (int i = 0; i < n; i++) cout << order[i] << (i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
      python: `import sys, heapq
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, m = p[0], p[1]
    adj = [[] for _ in range(n + 1)]
    indeg = [0] * (n + 1)
    for i in range(m):
        u, v = p[2 + 2*i], p[3 + 2*i]
        adj[u].append(v)
        indeg[v] += 1
    pq = [i for i in range(1, n + 1) if indeg[i] == 0]
    heapq.heapify(pq)
    order = []
    while pq:
        u = heapq.heappop(pq)
        order.append(str(u))
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                heapq.heappush(pq, v)
    print(" ".join(order) if len(order) == n else "-1")
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[n + 1];
        for (int i = 0; i < m; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            adj.get(u).add(v);
            indeg[v]++;
        }
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int i = 1; i <= n; i++) if (indeg[i] == 0) pq.add(i);
        StringBuilder sb = new StringBuilder();
        int cnt = 0;
        while (!pq.isEmpty()) {
            int u = pq.poll();
            if (cnt++ > 0) sb.append(' ');
            sb.append(u);
            for (int v : adj.get(u)) if (--indeg[v] == 0) pq.add(v);
        }
        System.out.println(cnt == n ? sb.toString() : "-1");
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n = p[0], m = p[1];
  const adj = Array.from({ length: n + 1 }, () => []);
  const indeg = new Int32Array(n + 1);
  for (let i = 0; i < m; i++) { const u = p[2+2*i], v = p[3+2*i]; adj[u].push(v); indeg[v]++; }
  const heap = [];
  const push = (x) => { heap.push(x); let i = heap.length - 1; while (i > 0) { const pa = (i - 1) >> 1; if (heap[pa] <= heap[i]) break; const t = heap[pa]; heap[pa] = heap[i]; heap[i] = t; i = pa; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; while (true) { let sm = i, l = 2*i+1, r = 2*i+2; if (l < heap.length && heap[l] < heap[sm]) sm = l; if (r < heap.length && heap[r] < heap[sm]) sm = r; if (sm === i) break; const t = heap[sm]; heap[sm] = heap[i]; heap[i] = t; i = sm; } } return top; };
  for (let i = 1; i <= n; i++) if (indeg[i] === 0) push(i);
  const order = [];
  while (heap.length) {
    const u = pop(); order.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) push(v);
  }
  console.log(order.length === n ? order.join(' ') : '-1');
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n: number = p[0];
  const m: number = p[1];
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  const indeg: number[] = new Array<number>(n + 1).fill(0);
  for (let i = 0; i < m; i++) {
    const u: number = p[2 + 2 * i];
    const v: number = p[3 + 2 * i];
    adj[u].push(v);
    indeg[v]++;
  }
  const heap: number[] = [];
  const push = (x: number) => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const pa = (i - 1) >> 1;
      if (heap[pa] <= heap[i]) break;
      const t = heap[pa]; heap[pa] = heap[i]; heap[i] = t;
      i = pa;
    }
  };
  for (let i = 1; i <= n; i++) if (indeg[i] === 0) push(i);
  const order: number[] = [];
  while (heap.length > 0) {
    const u: number = heap[0];
    const last: number = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let sm = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < heap.length && heap[l] < heap[sm]) sm = l;
        if (r < heap.length && heap[r] < heap[sm]) sm = r;
        if (sm === i) break;
        const t = heap[sm]; heap[sm] = heap[i]; heap[i] = t;
        i = sm;
      }
    }
    order.push(u);
    for (const v of adj[u]) {
      indeg[v]--;
      if (indeg[v] === 0) push(v);
    }
  }
  console.log(order.length === n ? order.join(' ') : '-1');
}`,
      rust: `use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let m: usize = it.next().unwrap().parse().unwrap();
    let mut adj = vec![Vec::new(); n + 1];
    let mut indeg = vec![0usize; n + 1];
    for _ in 0..m {
        let u: usize = it.next().unwrap().parse().unwrap();
        let v: usize = it.next().unwrap().parse().unwrap();
        adj[u].push(v);
        indeg[v] += 1;
    }
    let mut pq = BinaryHeap::new();
    for i in 1..=n { if indeg[i] == 0 { pq.push(Reverse(i)); } }
    let mut order = Vec::with_capacity(n);
    while let Some(Reverse(u)) = pq.pop() {
        order.push(u.to_string());
        for &v in &adj[u] {
            indeg[v] -= 1;
            if indeg[v] == 0 { pq.push(Reverse(v)); }
        }
    }
    if order.len() != n { println!("-1"); } else { println!("{}", order.join(" ")); }
}`,
    },
  },

  graph_dsu_mst: {
    id: 'graph_dsu_mst',
    defaultTopic: 'Union-Find & MST',
    timeComplexity: 'O(M log M)',
    spaceComplexity: 'O(N + M)',
    bruteComplexity: 'O(2^M)',
    betterComplexity: 'O(N * M) Prim without heap',
    inputFormat: 'First line contains N (1 <= N <= 10^5) and M (0 <= M <= 2 * 10^5). Next M lines each contain u, v, and weight w (undirected edge).',
    outputFormat: 'Print the total weight of the Minimum Spanning Tree connecting all N nodes, or -1 if the graph is disconnected.',
    constraints: ['1 <= N <= 10^5', '0 <= M <= 2 * 10^5', '0 <= w <= 10^9'],
    hints: [
      'Sort all M edges in non-decreasing order of weight w.',
      'Use Disjoint Set Union (DSU) with path compression and union-by-size.',
      'Add an edge whenever find(u) != find(v) and count how many edges were merged; if merged != N - 1 at the end, print -1.',
    ],
    bruteIntuition: 'Enumerate combinations of N-1 edges and check connectivity.',
    bruteBangla: 'N-1টি এজের সব কম্বিনেশন বানিয়ে কানেক্টিভিটি ও ওজন দেখা।',
    bruteWhyTle: 'Combinatorial explosion C(M, N-1) fails immediately.',
    brutePseudo: 'check all subsets of size N-1',
    betterIntuition: 'Naive cycle detection via DFS before adding each sorted edge.',
    betterBangla: 'প্রতিটি এজ যোগের আগে DFS দিয়ে সাইকেল চেক করা।',
    betterTradeoff: 'O(M * N) fails when N, M ~ 10^5.',
    betterPseudo: 'sort edges; if not reachable via DFS(u,v) add edge',
    optimalIntuition: 'Kruskal’s algorithm: sort edges by weight ascending, iterate edges, and unite disjoint components using path-compressed DSU until N-1 edges are added.',
    optimalBangla: 'এজগুলো ওজন অনুযায়ী সর্ট করে Disjoint Set Union (DSU) দিয়ে Kruskal’s MST চালানো।',
    optimalWhyWins: 'O(M log M) sorting plus near-O(1) inverse-Ackermann DSU operations.',
    optimalPseudo: 'sort edges by w; for (u,v,w): if unite(u,v): ans+=w, used++; return used==N-1 ? ans : -1',
    banglaEditorial: 'সবচেয়ে কম খরচে Nটি নোড যুক্ত করতে Kruskal-এর অ্যালগরিদম সেরা: সব এজ ছোট থেকে বড় ওজনে সাজিয়ে DSU দিয়ে যুক্ত করুন (যাতে সাইকেল না হয়)। শেষে মোট N-1টি এজ যুক্ত হলেই কেবল স্প্যানিং ট্রি সম্পূর্ণ।',
    dryRunSteps: [
      { step: 1, state: 'Sort edges ascending', memoryOrStack: '(1,3,1),(2,3,2),(1,2,4),(3,4,5)', note: '4 disjoint components initially' },
      { step: 2, state: 'Process (1,3,1)', memoryOrStack: 'sum=1, used=1', note: 'Merge {1,3}' },
      { step: 3, state: 'Process (2,3,2)', memoryOrStack: 'sum=3, used=2', note: 'Merge {1,2,3}' },
      { step: 4, state: 'Skip (1,2,4); merge (3,4,5)', memoryOrStack: 'sum=8, used=3 == N-1', note: 'Cycle edge skipped; MST complete' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/);
      if (!p[0]) return '-1';
      const n = Number(p[0]);
      const m = Number(p[1]);
      if (n === 1) return '0';
      const edges: Array<[number, number, number]> = [];
      let idx = 2;
      for (let i = 0; i < m; i++) {
        edges.push([Number(p[idx++]), Number(p[idx++]), Number(p[idx++])]);
      }
      edges.sort((a, b) => a[2] - b[2]);
      const par = new Int32Array(n + 1);
      const sz = new Int32Array(n + 1).fill(1);
      for (let i = 1; i <= n; i++) par[i] = i;
      const find = (x: number): number => {
        while (par[x] !== x) {
          par[x] = par[par[x]];
          x = par[x];
        }
        return x;
      };
      let ans = 0n;
      let used = 0;
      for (const [u, v, w] of edges) {
        let ru = find(u), rv = find(v);
        if (ru !== rv) {
          if (sz[ru] < sz[rv]) {
            const tmp = ru; ru = rv; rv = tmp;
          }
          par[rv] = ru;
          sz[ru] += sz[rv];
          ans += BigInt(w);
          used++;
          if (used === n - 1) break;
        }
      }
      return used === n - 1 ? ans.toString() : '-1';
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['4 5\n1 2 4\n1 3 1\n2 3 2\n3 4 5\n2 4 6', '4 2\n1 2 3\n3 4 5'];
      const hidden = ['1 0', '3 3\n1 2 1000000000\n2 3 1000000000\n1 3 5', '5 4\n1 2 1\n2 3 2\n3 4 3\n4 5 4', '4 0', '4 4\n1 2 2\n2 3 2\n3 1 1\n3 4 7'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 5, 18);
        const m = randInt(rng, n - 1, n * 3);
        const lines = [`${n} ${m}`];
        for (let i = 0; i < m; i++) lines.push(`${randInt(rng, 1, n)} ${randInt(rng, 1, n)} ${randInt(rng, 1, 1000000)}`);
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Minimum Spanning Tree Kruskal DSU'),
      cpp: makeStarter('cpp', 'Minimum Spanning Tree Kruskal DSU'),
      python: makeStarter('python', 'Minimum Spanning Tree Kruskal DSU'),
      java: makeStarter('java', 'Minimum Spanning Tree Kruskal DSU'),
      javascript: makeStarter('javascript', 'Minimum Spanning Tree Kruskal DSU'),
      typescript: makeStarter('typescript', 'Minimum Spanning Tree Kruskal DSU'),
      rust: makeStarter('rust', 'Minimum Spanning Tree Kruskal DSU'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
typedef struct { int u, v; long long w; } Edge;
int cmp(const void *a, const void *b) {
    long long d = ((const Edge*)a)->w - ((const Edge*)b)->w;
    return (d > 0) - (d < 0);
}
int findp(int *par, int x) {
    while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
    return x;
}
int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    if (n == 1) { printf("0\\n"); return 0; }
    Edge *e = malloc((m + 1) * sizeof(Edge));
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &e[i].u, &e[i].v, &e[i].w);
    qsort(e, m, sizeof(Edge), cmp);
    int *par = malloc((n + 1) * sizeof(int));
    int *sz = malloc((n + 1) * sizeof(int));
    for (int i = 1; i <= n; i++) { par[i] = i; sz[i] = 1; }
    long long ans = 0;
    int used = 0;
    for (int i = 0; i < m; i++) {
        int ru = findp(par, e[i].u), rv = findp(par, e[i].v);
        if (ru != rv) {
            if (sz[ru] < sz[rv]) { int t = ru; ru = rv; rv = t; }
            par[rv] = ru; sz[ru] += sz[rv];
            ans += e[i].w;
            if (++used == n - 1) break;
        }
    }
    printf("%lld\\n", used == n - 1 ? ans : -1LL);
    free(e); free(par); free(sz);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
struct Edge { int u, v; long long w; };
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    if (n == 1) { cout << 0 << "\\n"; return 0; }
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].w;
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b){ return a.w < b.w; });
    vector<int> par(n + 1), sz(n + 1, 1);
    iota(par.begin(), par.end(), 0);
    auto findp = [&](int x) {
        while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
        return x;
    };
    long long ans = 0; int used = 0;
    for (auto &e : edges) {
        int ru = findp(e.u), rv = findp(e.v);
        if (ru != rv) {
            if (sz[ru] < sz[rv]) swap(ru, rv);
            par[rv] = ru; sz[ru] += sz[rv];
            ans += e.w;
            if (++used == n - 1) break;
        }
    }
    cout << (used == n - 1 ? ans : -1LL) << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, m = p[0], p[1]
    if n == 1: print(0); return
    edges = [(p[4 + 3*i], p[2 + 3*i], p[3 + 3*i]) for i in range(m)]
    edges.sort()
    par = list(range(n + 1))
    sz = [1] * (n + 1)
    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    ans = used = 0
    for w, u, v in edges:
        ru, rv = find(u), find(v)
        if ru != rv:
            if sz[ru] < sz[rv]: ru, rv = rv, ru
            par[rv] = ru
            sz[ru] += sz[rv]
            ans += w
            used += 1
            if used == n - 1: break
    print(ans if used == n - 1 else -1)
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static int find(int[] par, int x) {
        while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
        return x;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        if (n == 1) { System.out.println(0); return; }
        long[][] edges = new long[m][3];
        for (int i = 0; i < m; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            edges[i][0] = Long.parseLong(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            edges[i][1] = Long.parseLong(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            edges[i][2] = Long.parseLong(st.nextToken());
        }
        Arrays.sort(edges, Comparator.comparingLong(a -> a[2]));
        int[] par = new int[n + 1], sz = new int[n + 1];
        for (int i = 1; i <= n; i++) { par[i] = i; sz[i] = 1; }
        long ans = 0; int used = 0;
        for (long[] e : edges) {
            int ru = find(par, (int)e[0]), rv = find(par, (int)e[1]);
            if (ru != rv) {
                if (sz[ru] < sz[rv]) { int t = ru; ru = rv; rv = t; }
                par[rv] = ru; sz[ru] += sz[rv];
                ans += e[2];
                if (++used == n - 1) break;
            }
        }
        System.out.println(used == n - 1 ? ans : -1);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/);
if (p[0]) {
  const n = Number(p[0]), m = Number(p[1]);
  if (n === 1) { console.log(0); } else {
    const edges = [];
    let idx = 2;
    for (let i = 0; i < m; i++) edges.push([Number(p[idx++]), Number(p[idx++]), Number(p[idx++])]);
    edges.sort((a, b) => a[2] - b[2]);
    const par = new Int32Array(n + 1), sz = new Int32Array(n + 1).fill(1);
    for (let i = 1; i <= n; i++) par[i] = i;
    const find = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
    let ans = 0n, used = 0;
    for (const [u, v, w] of edges) {
      let ru = find(u), rv = find(v);
      if (ru !== rv) {
        if (sz[ru] < sz[rv]) { const t = ru; ru = rv; rv = t; }
        par[rv] = ru; sz[ru] += sz[rv];
        ans += BigInt(w);
        if (++used === n - 1) break;
      }
    }
    console.log(used === n - 1 ? ans.toString() : '-1');
  }
}`,
      typescript: `import * as fs from 'fs';
const p: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (p[0]) {
  const n: number = Number(p[0]);
  const m: number = Number(p[1]);
  if (n === 1) {
    console.log(0);
  } else {
    const eu: number[] = [];
    const ev: number[] = [];
    const ew: number[] = [];
    const order: number[] = [];
    let idx = 2;
    for (let i = 0; i < m; i++) {
      eu.push(Number(p[idx++]));
      ev.push(Number(p[idx++]));
      ew.push(Number(p[idx++]));
      order.push(i);
    }
    order.sort((a: number, b: number) => ew[a] - ew[b]);
    const par: number[] = new Array<number>(n + 1);
    const sz: number[] = new Array<number>(n + 1).fill(1);
    for (let i = 1; i <= n; i++) par[i] = i;
    const find = (x: number): number => {
      while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; }
      return x;
    };
    let ans: bigint = 0n;
    let used = 0;
    for (const ei of order) {
      let ru = find(eu[ei]);
      let rv = find(ev[ei]);
      if (ru !== rv) {
        if (sz[ru] < sz[rv]) { const t = ru; ru = rv; rv = t; }
        par[rv] = ru;
        sz[ru] += sz[rv];
        ans += BigInt(ew[ei]);
        used++;
        if (used === n - 1) break;
      }
    }
    console.log(used === n - 1 ? ans.toString() : '-1');
  }
}`,
      rust: `use std::io::{self, Read};
fn find(par: &mut [usize], mut x: usize) -> usize {
    while par[x] != x { par[x] = par[par[x]]; x = par[x]; }
    x
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let m: usize = it.next().unwrap().parse().unwrap();
    if n == 1 { println!("0"); return; }
    let mut edges = Vec::with_capacity(m);
    for _ in 0..m {
        let u: usize = it.next().unwrap().parse().unwrap();
        let v: usize = it.next().unwrap().parse().unwrap();
        let w: i64 = it.next().unwrap().parse().unwrap();
        edges.push((w, u, v));
    }
    edges.sort_unstable();
    let mut par: Vec<usize> = (0..=n).collect();
    let mut sz = vec![1usize; n + 1];
    let (mut ans, mut used) = (0i64, 0usize);
    for (w, u, v) in edges {
        let mut ru = find(&mut par, u);
        let mut rv = find(&mut par, v);
        if ru != rv {
            if sz[ru] < sz[rv] { std::mem::swap(&mut ru, &mut rv); }
            par[rv] = ru; sz[ru] += sz[rv];
            ans += w;
            used += 1;
            if used == n - 1 { break; }
        }
    }
    println!("{}", if used == n - 1 { ans } else { -1 });
}`,
    },
  },

  tree_diameter_bfs: {
    id: 'tree_diameter_bfs',
    defaultTopic: 'Trees',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    bruteComplexity: 'O(N^2)',
    betterComplexity: 'O(N) Tree DP (2-pass recursion)',
    inputFormat: 'First line contains N (1 <= N <= 2 * 10^5). Next N - 1 lines each contain u and v representing an edge in the tree.',
    outputFormat: 'Print the diameter of the tree (maximum number of edges on the shortest path between any two nodes).',
    constraints: ['1 <= N <= 2 * 10^5', '1 <= u, v <= N', 'Graph is a valid connected tree'],
    hints: [
      'Start a BFS from ANY node (e.g., node 1) to find the farthest node A.',
      'Theorem: Node A is guaranteed to be one endpoint of the tree’s longest path!',
      'Run a second BFS starting from A; the maximum distance found is the exact diameter.',
    ],
    bruteIntuition: 'Run BFS/DFS from every single node u = 1..N to find the longest path.',
    bruteBangla: 'প্রতিটি নোড থেকে BFS চালিয়ে সর্বোচ্চ দূরত্ব খোঁজা।',
    bruteWhyTle: 'O(N^2) exceeds 10^8 operations when N = 2*10^5.',
    brutePseudo: 'for u=1..N: ans=max(ans, farthestDist(u))',
    betterIntuition: 'Recursive Tree DP tracking top-2 subtree depths at every node.',
    betterBangla: 'রিকার্সিভ ট্রি DP দিয়ে সর্বোচ্চ দুটি গভীরতা যোগ করা।',
    betterTradeoff: 'Deep path trees (depth 2*10^5) can cause recursion stack overflow in Python/Java/C; iterative double BFS has zero stack risk.',
    betterPseudo: 'dfs(u) returns max height and updates global max(h1+h2)',
    optimalIntuition: 'Iterative double BFS: Pass 1 finds farthest node A from 1; Pass 2 finds farthest distance from A, which equals the tree diameter.',
    optimalBangla: 'দুইবার ইটারেটিভ BFS: প্রথমবার ১ থেকে দূরের নোড A বের করে, দ্বিতীয়বার A থেকে সবচেয়ে দূরত্ব বের করলেই ট্রি-এর ডায়ামিটার মেলে।',
    optimalWhyWins: 'Strict O(N) time, iterative (never overflows stack on chain trees of size 2*10^5).',
    optimalPseudo: 'A = bfsFarthest(1).node; return bfsFarthest(A).dist',
    banglaEditorial: 'ট্রির যেকোনো নোড থেকে সবচেয়ে দূরের নোড A সবসময় ডায়ামিটারের এক প্রান্ত হয়। এরপর A থেকে আবার BFS চালিয়ে সর্বোচ্চ যে দূরত্ব পাওয়া যায় সেটাই ট্রির ডায়ামিটার। ইটারেটিভ BFS ব্যবহার করলে লম্বা চেইন ট্রিতেও স্ট্যাক ওভারফ্লো হয় না।',
    dryRunSteps: [
      { step: 1, state: 'Pass 1 BFS(1)', memoryOrStack: 'farthest node A=5 at dist=3', note: 'A is guaranteed a diameter endpoint' },
      { step: 2, state: 'Pass 2 BFS(5)', memoryOrStack: '5->4(1)->2(2)->1,3(3)', note: 'Compute max distance from endpoint A' },
      { step: 3, state: 'Diameter found', memoryOrStack: 'diam=3', note: 'Iterative BFS avoids stack overflow' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '0';
      const n = p[0];
      if (n <= 1) return '0';
      const adj: number[][] = Array.from({ length: n + 1 }, () => []);
      for (let i = 0; i < n - 1; i++) {
        const u = p[1 + 2 * i], v = p[2 + 2 * i];
        adj[u].push(v);
        adj[v].push(u);
      }
      const bfs = (start: number): [number, number] => {
        const dist = new Int32Array(n + 1).fill(-1);
        const q = [start];
        dist[start] = 0;
        let farNode = start, farDist = 0;
        for (let h = 0; h < q.length; h++) {
          const u = q[h];
          if (dist[u] > farDist) {
            farDist = dist[u];
            farNode = u;
          }
          for (const v of adj[u]) {
            if (dist[v] === -1) {
              dist[v] = dist[u] + 1;
              q.push(v);
            }
          }
        }
        return [farNode, farDist];
      };
      const [a] = bfs(1);
      const [, diam] = bfs(a);
      return String(diam);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['5\n1 2\n1 3\n3 4\n3 5', '3\n1 2\n2 3'];
      const hidden = ['1', '2\n1 2', '6\n1 2\n2 3\n3 4\n4 5\n5 6', '6\n1 2\n1 3\n1 4\n1 5\n1 6', '7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 10, 40);
        const lines = [String(n)];
        for (let i = 2; i <= n; i++) {
          lines.push(`${randInt(rng, 1, i - 1)} ${i}`);
        }
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Tree Diameter Double BFS'),
      cpp: makeStarter('cpp', 'Tree Diameter Double BFS'),
      python: makeStarter('python', 'Tree Diameter Double BFS'),
      java: makeStarter('java', 'Tree Diameter Double BFS'),
      javascript: makeStarter('javascript', 'Tree Diameter Double BFS'),
      typescript: makeStarter('typescript', 'Tree Diameter Double BFS'),
      rust: makeStarter('rust', 'Tree Diameter Double BFS'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
static int far_node;
static int bfs(int start, int n, int *head, int *to, int *nxt, int *dist, int *q) {
    for (int i = 1; i <= n; i++) dist[i] = -1;
    int qh = 0, qt = 0, best = 0;
    far_node = start; dist[start] = 0; q[qt++] = start;
    while (qh < qt) {
        int u = q[qh++];
        if (dist[u] > best) { best = dist[u]; far_node = u; }
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q[qt++] = v; }
        }
    }
    return best;
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 1) { if (n == 1) printf("0\\n"); return 0; }
    int *head = malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) head[i] = -1;
    int *to = malloc((2 * n) * sizeof(int));
    int *nxt = malloc((2 * n) * sizeof(int));
    int ec = 0;
    for (int i = 0; i < n - 1; i++) {
        int u, v; scanf("%d %d", &u, &v);
        to[ec] = v; nxt[ec] = head[u]; head[u] = ec++;
        to[ec] = u; nxt[ec] = head[v]; head[v] = ec++;
    }
    int *dist = malloc((n + 1) * sizeof(int));
    int *q = malloc((n + 1) * sizeof(int));
    bfs(1, n, head, to, nxt, dist, q);
    int diam = bfs(far_node, n, head, to, nxt, dist, q);
    printf("%d\\n", diam);
    free(head); free(to); free(nxt); free(dist); free(q);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    if (n <= 1) { cout << 0 << "\\n"; return 0; }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    auto bfs = [&](int s) -> pair<int, int> {
        vector<int> dist(n + 1, -1);
        queue<int> q;
        dist[s] = 0; q.push(s);
        int fn = s, fd = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            if (dist[u] > fd) { fd = dist[u]; fn = u; }
            for (int v : adj[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
        }
        return {fn, fd};
    };
    auto [a, _] = bfs(1);
    cout << bfs(a).second << "\\n";
    return 0;
}`,
      python: `import sys
from collections import deque
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n = p[0]
    if n <= 1: print(0); return
    adj = [[] for _ in range(n + 1)]
    for i in range(n - 1):
        u, v = p[1 + 2*i], p[2 + 2*i]
        adj[u].append(v); adj[v].append(u)
    def bfs(s):
        dist = [-1] * (n + 1)
        dist[s] = 0
        q = deque([s])
        fn, fd = s, 0
        while q:
            u = q.popleft()
            if dist[u] > fd: fd, fn = dist[u], u
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        return fn, fd
    a, _ = bfs(1)
    _, diam = bfs(a)
    print(diam)
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static int[] bfs(int s, int n, List<List<Integer>> adj) {
        int[] dist = new int[n + 1];
        Arrays.fill(dist, -1);
        ArrayDeque<Integer> q = new ArrayDeque<>();
        dist[s] = 0; q.add(s);
        int fn = s, fd = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            if (dist[u] > fd) { fd = dist[u]; fn = u; }
            for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.add(v); }
        }
        return new int[]{fn, fd};
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        if (n <= 1) { System.out.println(0); return; }
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < n - 1; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            adj.get(u).add(v); adj.get(v).add(u);
        }
        int[] r1 = bfs(1, n, adj);
        int[] r2 = bfs(r1[0], n, adj);
        System.out.println(r2[1]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length) {
  const n = p[0];
  if (n <= 1) { console.log(0); } else {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < n - 1; i++) { const u = p[1+2*i], v = p[2+2*i]; adj[u].push(v); adj[v].push(u); }
    const bfs = (s) => {
      const dist = new Int32Array(n + 1).fill(-1);
      const q = [s]; dist[s] = 0;
      let fn = s, fd = 0;
      for (let h = 0; h < q.length; h++) {
        const u = q[h];
        if (dist[u] > fd) { fd = dist[u]; fn = u; }
        for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
      }
      return [fn, fd];
    };
    const [a] = bfs(1);
    console.log(bfs(a)[1]);
  }
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length) {
  const n: number = p[0];
  if (n <= 1) {
    console.log(0);
  } else {
    const adj: number[][] = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < n - 1; i++) {
      const u: number = p[1 + 2 * i];
      const v: number = p[2 + 2 * i];
      adj[u].push(v);
      adj[v].push(u);
    }
    const bfs = (s: number): number[] => {
      const dist: number[] = new Array<number>(n + 1).fill(-1);
      const q: number[] = [s];
      dist[s] = 0;
      let fn = s;
      let fd = 0;
      for (let h = 0; h < q.length; h++) {
        const u: number = q[h];
        if (dist[u] > fd) { fd = dist[u]; fn = u; }
        for (const v of adj[u]) {
          if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
        }
      }
      return [fn, fd];
    };
    const r1: number[] = bfs(1);
    const r2: number[] = bfs(r1[0]);
    console.log(r2[1]);
  }
}`,
      rust: `use std::collections::VecDeque;
use std::io::{self, Read};
fn bfs(s: usize, adj: &[Vec<usize>]) -> (usize, i32) {
    let mut dist = vec![-1i32; adj.len()];
    let mut q = VecDeque::new();
    dist[s] = 0; q.push_back(s);
    let (mut fn_, mut fd) = (s, 0);
    while let Some(u) = q.pop_front() {
        if dist[u] > fd { fd = dist[u]; fn_ = u; }
        for &v in &adj[u] {
            if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); }
        }
    }
    (fn_, fd)
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    if n <= 1 { println!("0"); return; }
    let mut adj = vec![Vec::new(); n + 1];
    for _ in 0..n - 1 {
        let u: usize = it.next().unwrap().parse().unwrap();
        let v: usize = it.next().unwrap().parse().unwrap();
        adj[u].push(v); adj[v].push(u);
    }
    let (a, _) = bfs(1, &adj);
    let (_, diam) = bfs(a, &adj);
    println!("{}", diam);
}`,
    },
  },

  backtrack_subset_count: {
    id: 'backtrack_subset_count',
    defaultTopic: 'Backtracking & Meet-in-the-Middle',
    timeComplexity: 'O(N * S)',
    spaceComplexity: 'O(S)',
    bruteComplexity: 'O(2^N)',
    betterComplexity: 'O(2^(N/2) log 2^(N/2))',
    inputFormat: 'First line contains N (1 <= N <= 100) and target sum S (0 <= S <= 10000). Second line contains N non-negative integers a_1..a_N.',
    outputFormat: 'Print the number of subsets of a_1..a_N whose sum equals S, modulo 10^9 + 7.',
    constraints: ['1 <= N <= 100', '0 <= S <= 10000', '0 <= a_i <= 10^4'],
    hints: [
      'Watch out for elements equal to 0! Each 0 doubles the number of subsets for a given sum.',
      'Unlike Coin Combinations (unlimited supply), each element can be chosen AT MOST ONCE -> loop sum BACKWARDS from S down to a_i.',
      'Base case: dp[0] = 1 before iterating items.',
    ],
    bruteIntuition: 'Recurse over index i taking or skipping a[i], counting branches reaching rem == 0 at i == N.',
    bruteBangla: 'প্রতিটি উপাদান নিয়ে বা না নিয়ে সব 2^N সাবসেট গণনা করা।',
    bruteWhyTle: '2^100 branches is astronomical.',
    brutePseudo: 'f(i, sum): if i==N return sum==S; return f(i+1,sum)+f(i+1,sum+a[i])',
    betterIntuition: 'Meet-in-the-middle splitting array into two halves.',
    betterBangla: 'অ্যারে দুই ভাগ করে Meet-in-the-Middle করা।',
    betterTradeoff: 'Great when S is huge (10^9) and N <= 40, but 1D Subset DP is linear in S when S <= 10000 and N = 100.',
    betterPseudo: 'half1 sums + binary search complement in half2 sums',
    optimalIntuition: '1D Subset Sum Count DP: dp[0]=1, and for each element x (including 0!), loop s from S down to x: dp[s] = (dp[s] + dp[s - x]) % MOD.',
    optimalBangla: 'প্রতিটি আইটেম একবার ব্যবহারযোগ্য বলে s = S থেকে নিচে x পর্যন্ত লুপ চালিয়ে 0-সহ সব সাবসেট মোড 10^9+7 এ গোনা।',
    optimalWhyWins: 'Handles zeroes cleanly without special-casing and runs in O(N * S).',
    optimalPseudo: 'dp[0]=1; for x in a: for s=S downto x: dp[s]=(dp[s]+dp[s-x])%MOD',
    banglaEditorial: 'প্রতিটি সংখ্যা কেবল একবারই সাবসেটে থাকতে পারে—তাই ভেতরের লুপ S থেকে নিচে নামতে হবে। এতে x=0 হলেও dp[s] += dp[s] হয়ে সঠিকভাবে ২ গুণ হয়ে যায়!',
    dryRunSteps: [
      { step: 1, state: 'a=[1,2,3], S=3', memoryOrStack: 'dp=[1,0,0,0]', note: '1 empty subset makes sum 0' },
      { step: 2, state: 'x=1 (reverse sweep)', memoryOrStack: 'dp=[1,1,0,0]', note: 'Each element used at most once' },
      { step: 3, state: 'x=2', memoryOrStack: 'dp=[1,1,1,1]', note: 'Subsets: {}, {1}, {2}, {1,2}' },
      { step: 4, state: 'x=3', memoryOrStack: 'dp[3]+=dp[0]=2', note: '2 subsets make sum 3 ({1,2} and {3})' },
    ],
    solveJs: (stdin: string) => {
      const p = stdin.trim().split(/\s+/).map(Number);
      if (!p.length) return '0';
      const n = p[0], S = p[1], MOD = 1000000007;
      const dp = new Int32Array(S + 1);
      dp[0] = 1;
      for (let i = 0; i < n; i++) {
        const x = p[2 + i];
        for (let s = S; s >= x; s--) {
          let v = dp[s] + dp[s - x];
          if (v >= MOD) v -= MOD;
          dp[s] = v;
        }
      }
      return String(dp[S]);
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = ['3 3\n1 2 3', '4 0\n0 0 1 2'];
      const hidden = ['1 5\n5', '1 5\n3', '5 5\n1 1 1 1 1', '6 10\n2 3 5 6 8 10', '3 0\n0 0 0'];
      for (let t = 0; t < 5; t++) {
        const n = randInt(rng, 6, 25);
        const S = randInt(rng, 10, 120);
        const arr = Array.from({ length: n }, () => randInt(rng, 0, 25));
        hidden.push(`${n} ${S}\n${arr.join(' ')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: makeStarter('c', 'Subset Sum Count Mod 10^9+7'),
      cpp: makeStarter('cpp', 'Subset Sum Count Mod 10^9+7'),
      python: makeStarter('python', 'Subset Sum Count Mod 10^9+7'),
      java: makeStarter('java', 'Subset Sum Count Mod 10^9+7'),
      javascript: makeStarter('javascript', 'Subset Sum Count Mod 10^9+7'),
      typescript: makeStarter('typescript', 'Subset Sum Count Mod 10^9+7'),
      rust: makeStarter('rust', 'Subset Sum Count Mod 10^9+7'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#define MOD 1000000007
int main(void) {
    int n, S;
    if (scanf("%d %d", &n, &S) != 2) return 0;
    int *dp = calloc(S + 1, sizeof(int));
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        for (int s = S; s >= x; s--) {
            dp[s] += dp[s - x];
            if (dp[s] >= MOD) dp[s] -= MOD;
        }
    }
    printf("%d\\n", dp[S]);
    free(dp);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
static const int MOD = 1000000007;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, S;
    if (!(cin >> n >> S)) return 0;
    vector<int> dp(S + 1, 0);
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        for (int s = S; s >= x; s--) {
            dp[s] += dp[s - x];
            if (dp[s] >= MOD) dp[s] -= MOD;
        }
    }
    cout << dp[S] << "\\n";
    return 0;
}`,
      python: `import sys
def solve():
    p = list(map(int, sys.stdin.read().split()))
    if not p: return
    n, S = p[0], p[1]
    MOD = 1000000007
    dp = [0] * (S + 1)
    dp[0] = 1
    for x in p[2:2+n]:
        for s in range(S, x - 1, -1):
            dp[s] = (dp[s] + dp[s - x]) % MOD
    print(dp[S])
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static final int MOD = 1000000007;
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());
        int[] dp = new int[S + 1];
        dp[0] = 1;
        for (int i = 0; i < n; i++) {
            while (!st.hasMoreTokens()) st = new StringTokenizer(br.readLine());
            int x = Integer.parseInt(st.nextToken());
            for (int s = S; s >= x; s--) {
                dp[s] += dp[s - x];
                if (dp[s] >= MOD) dp[s] -= MOD;
            }
        }
        System.out.println(dp[S]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const p = raw.trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n = p[0], S = p[1], MOD = 1000000007;
  const dp = new Int32Array(S + 1);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    const x = p[2 + i];
    for (let s = S; s >= x; s--) {
      let v = dp[s] + dp[s - x];
      if (v >= MOD) v -= MOD;
      dp[s] = v;
    }
  }
  console.log(dp[S]);
}`,
      typescript: `import * as fs from 'fs';
const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
if (p.length >= 2) {
  const n: number = p[0];
  const S: number = p[1];
  const MOD: number = 1000000007;
  const dp: number[] = new Array<number>(S + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    const x: number = p[2 + i];
    for (let s = S; s >= x; s--) {
      dp[s] = (dp[s] + dp[s - x]) % MOD;
    }
  }
  console.log(dp[S]);
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let sum: usize = it.next().unwrap().parse().unwrap();
    let mut dp = vec![0i32; sum + 1];
    dp[0] = 1;
    const MOD: i32 = 1_000_000_007;
    for _ in 0..n {
        let x: usize = it.next().unwrap().parse().unwrap();
        if x <= sum {
            for k in (x..=sum).rev() {
                dp[k] += dp[k - x];
                if dp[k] >= MOD { dp[k] -= MOD; }
            }
        }
    }
    println!("{}", dp[sum]);
}`,
    },
  },
};
