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

export const MATH_IMPL_KERNELS: Record<string, ArenaKernel> = {
  parity_split: {
    id: 'parity_split',
    defaultTopic: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(w)',
    betterComplexity: 'O(1)',
    inputFormat: 'First line contains integer t (number of test cases). Each of the next t lines contains integer w (1 <= w <= 10^9).',
    outputFormat: 'For each test case, print YES if w can be split into two positive even integers, else NO.',
    constraints: ['1 <= t <= 1000', '1 <= w <= 10^9'],
    hints: [
      'Sum of two even integers is always even.',
      'Be careful with the smallest positive even integer w = 2.',
      'Print YES iff w > 2 and w % 2 == 0.',
    ],
    bruteIntuition: 'Loop x from 2 to w - 2 by 2 and check if w - x is positive and even.',
    bruteBangla: '২ থেকে w-2 পর্যন্ত জোড় সংখ্যা লুপ করে w-x ও জোড় হয় কি না দেখা।',
    bruteWhyTle: 'O(w) fails instantaneously when w <= 10^9 across t = 1000 test cases.',
    brutePseudo: 'for x in 2..w-2 step 2: if (w-x)%2 == 0 return YES',
    betterIntuition: 'Test only x = 2 and inspect remainder w - 2.',
    betterBangla: 'প্রথম ভাগ ২ ধরে বাকি w-2 ধনাত্মক ও জোড় কি না পরীক্ষা করা।',
    betterTradeoff: 'O(1) per query, identical to the direct parity identity.',
    betterPseudo: 'return (w - 2 > 0 && (w - 2) % 2 == 0)',
    optimalIntuition: 'Any even w >= 4 splits cleanly as 2 + (w - 2), whereas w = 2 only splits as 1 + 1.',
    optimalBangla: 'w > 2 এবং জোড় হলেই কেবল ২ ও w-2 আকারে ভাগ করা যায়।',
    optimalWhyWins: 'Constant O(1) time per test case, immune to 10^9 constraints.',
    optimalPseudo: 'for each w: print (w > 2 && w % 2 == 0) ? YES : NO',
    banglaEditorial: 'প্রতিটি টেস্ট কেসে w > 2 এবং w % 2 == 0 হলে YES, নতুবা NO।',
    dryRunSteps: [
      { step: 1, state: 'w = 2', memoryOrStack: '2 > 2 -> false', note: 'Outputs NO' },
      { step: 2, state: 'w = 8', memoryOrStack: '8 > 2 && 8 % 2 == 0', note: 'Outputs YES (2 + 6)' },
    ],
    solveJs(stdin) {
      const nums = stdin.trim().split(/\s+/).map(Number);
      const t = nums[0] || 0;
      const out: string[] = [];
      for (let i = 1; i <= t; i++) {
        const w = nums[i];
        out.push(w > 2 && w % 2 === 0 ? 'YES' : 'NO');
      }
      return out.join('\n');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['3\n8\n2\n5', '2\n4\n11'];
      const hiddenInputs = [
        '4\n1\n2\n3\n4',
        '3\n100\n99\n1000000000',
        '3\n999999999\n6\n14',
      ];
      for (let k = 0; k < 7; k++) {
        const t = randInt(rng, 4, 12);
        const vals = Array.from({ length: t }, () => randInt(rng, 1, 500000000));
        hiddenInputs.push(`${t}\n${vals.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int t; scanf("%d", &t);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int t; cin >> t;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 0;
    while (t--) {
        long long w;
        scanf("%lld", &w);
        printf("%s\\n", (w > 2 && w % 2 == 0) ? "YES" : "NO");
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t; cin >> t;
    while (t--) {
        long long w; cin >> w;
        cout << ((w > 2 && w % 2 == 0) ? "YES" : "NO") << '\\n';
    }
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
t = d[0]
out = ["YES" if w > 2 and w % 2 == 0 else "NO" for w in d[1:1+t]]
print("\\n".join(out))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < t; i++) {
            long w = sc.nextLong();
            sb.append(w > 2 && w % 2 == 0 ? "YES\\n" : "NO\\n");
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const t = d[0];
const out = [];
for (let i = 1; i <= t; i++) out.push(d[i] > 2 && d[i] % 2 === 0 ? 'YES' : 'NO');
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const t: number = d[0];
const out: string[] = [];
for (let i = 1; i <= t; i++) out.push(d[i] > 2 && d[i] % 2 === 0 ? 'YES' : 'NO');
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().map(|x| x.parse::<i64>().unwrap());
    let t = it.next().unwrap_or(0);
    for _ in 0..t {
        let w = it.next().unwrap();
        println!("{}", if w > 2 && w % 2 == 0 { "YES" } else { "NO" });
    }
}`,
    },
  },

  team_consensus: {
    id: 'team_consensus',
    defaultTopic: 'Implementation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n)',
    betterComplexity: 'O(n)',
    inputFormat: 'First line: integer n (1 <= n <= 1000). Next n lines each have 3 binary integers (0 or 1).',
    outputFormat: 'Single integer: count of rows where at least 2 entries equal 1.',
    constraints: ['1 <= n <= 1000', 'Each entry is 0 or 1'],
    hints: [
      'Since values are only 0 or 1, sum of the 3 votes tells you how many voted 1.',
      'Check if a + b + c >= 2 for each row.',
      'Accumulate count in O(1) memory.',
    ],
    bruteIntuition: 'Store the entire n x 3 matrix in memory and inspect conditional pairs.',
    bruteBangla: 'পুরো n x 3 ম্যাট্রিক্স সেভ করে জোড়ায় জোড়ায় 1 চেক করা।',
    bruteWhyTle: 'Allocates O(n) matrix needlessly instead of streaming.',
    brutePseudo: 'store matrix; count rows with (a&&b)||(b&&c)||(a&&c)',
    betterIntuition: 'Stream row by row and check pair conditions without storing matrix.',
    betterBangla: 'ম্যাট্রিক্স সেভ না করে প্রতিটি সারি পড়ে শর্ত চেক করা।',
    betterTradeoff: 'Same O(n) time, cleanly removes O(n) array memory.',
    betterPseudo: 'for row: if (a&&b)||(b&&c)||(a&&c): ans++',
    optimalIntuition: 'Sum the 3 binary votes directly: a + b + c >= 2 in O(1) auxiliary space.',
    optimalBangla: 'তিনটি মানের যোগফল >= 2 হলেই কাউন্টার ১ বাড়িয়ে দেওয়া।',
    optimalWhyWins: 'Branch-minimal, streaming O(n) time and O(1) memory.',
    optimalPseudo: 'for row (a,b,c): if a + b + c >= 2: ans++',
    banglaEditorial: 'প্রতিটি সারিতে ৩টি সংখ্যার যোগফল অন্তত ২ হলে উত্তর ১ বাড়াও।',
    dryRunSteps: [
      { step: 1, state: 'Row 1: 1 1 0', memoryOrStack: 'sum = 2 >= 2', note: 'ans = 1' },
      { step: 2, state: 'Row 2: 1 0 0', memoryOrStack: 'sum = 1 < 2', note: 'ans stays 1' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0] || 0;
      let ans = 0;
      for (let i = 0; i < n; i++) {
        if (d[1 + i * 3] + d[2 + i * 3] + d[3 + i * 3] >= 2) ans++;
      }
      return String(ans);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['3\n1 1 0\n1 1 1\n1 0 0', '2\n1 0 0\n0 1 1'];
      const hiddenInputs = [
        '1\n0 0 0',
        '1\n1 1 1',
        '4\n0 1 0\n1 0 1\n0 0 1\n1 1 0',
      ];
      for (let k = 0; k < 7; k++) {
        const n = randInt(rng, 5, 30);
        const rows = Array.from({ length: n }, () => `${randInt(rng, 0, 1)} ${randInt(rng, 0, 1)} ${randInt(rng, 0, 1)}`);
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
int main(void) {
    int n, ans = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        int a, b, c;
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
    int n, ans = 0; cin >> n;
    for (int i = 0; i < n; i++) {
        int a, b, c; cin >> a >> b >> c;
        if (a + b + c >= 2) ans++;
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
ans = sum(1 for i in range(n) if d[1+3*i] + d[2+3*i] + d[3+3*i] >= 2)
print(ans)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), ans = 0;
        for (int i = 0; i < n; i++) {
            if (sc.nextInt() + sc.nextInt() + sc.nextInt() >= 2) ans++;
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
let ans = 0;
for (let i = 0; i < n; i++) if (d[1 + 3 * i] + d[2 + 3 * i] + d[3 + 3 * i] >= 2) ans++;
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let ans: number = 0;
for (let i = 0; i < n; i++) if (d[1 + 3 * i] + d[2 + 3 * i] + d[3 + 3 * i] >= 2) ans++;
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut ans = 0;
    for i in 0..n {
        if d[1 + 3 * i] + d[2 + 3 * i] + d[3 + 3 * i] >= 2 { ans += 1; }
    }
    println!("{}", ans);
}`,
    },
  },

  paving_tiles: {
    id: 'paving_tiles',
    defaultTopic: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n / a + m / a)',
    betterComplexity: 'O(1)',
    inputFormat: 'Single line with three integers n, m, a (1 <= n, m, a <= 10^9).',
    outputFormat: 'Single 64-bit integer: minimum number of a x a tiles needed to cover n x m rectangle.',
    constraints: ['1 <= n, m, a <= 10^9', 'Use 64-bit integers to avoid overflow when result reaches 10^18!'],
    hints: [
      'Rows needed = ceil(n / a), columns needed = ceil(m / a).',
      'Integer ceiling formula without floating point: (n + a - 1) / a.',
      'Multiply using 64-bit integers (long long / i64 / BigInt).',
    ],
    bruteIntuition: 'Repeatedly add a until covering length n and width m.',
    bruteBangla: 'দৈর্ঘ্য ও প্রস্থ বরাবর এক এক করে টাইলস বসিয়ে গণনা করা।',
    bruteWhyTle: 'When n = 10^9 and a = 1, stepping takes 10^9 iterations (TLE).',
    brutePseudo: 'r=0; while(r*a < n) r++; c=0; while(c*a < m) c++; print r*c',
    betterIntuition: 'Use floating-point Math.ceil(n / a) * Math.ceil(m / a).',
    betterBangla: 'ফ্লোটিং-পয়েন্ট ceil() ফাংশন ব্যবহার করে হিসাব করা।',
    betterTradeoff: 'Floating point doubles lose exact integer precision beyond 2^53 (~9e15) when n*m approaches 10^18!',
    betterPseudo: 'print ceil(n/double(a)) * ceil(m/double(a))',
    optimalIntuition: 'Exact integer ceiling division ((n + a - 1) / a) * ((m + a - 1) / a) in 64-bit / BigInt.',
    optimalBangla: 'দশমিক এড়াতে ((n + a - 1) // a) * ((m + a - 1) // a) এবং ৬৪-বিট ইন্টিজার ব্যবহার করো।',
    optimalWhyWins: 'Zero precision loss up to 10^18 in O(1) operations.',
    optimalPseudo: 'rows = (n + a - 1) // a; cols = (m + a - 1) // a; print rows * cols',
    banglaEditorial: 'ফ্লোটিং-পয়েন্ট ceil এড়িয়ে পূর্ণসংখ্যার সূত্র ((n+a-1)//a)*((m+a-1)//a) এবং ৬৪-বিট টাইপ ব্যবহার করলে ওভারফ্লো হবে না।',
    dryRunSteps: [
      { step: 1, state: 'n=6, m=6, a=4', memoryOrStack: 'rows=(6+3)/4=2, cols=2', note: '2 * 2 = 4 tiles' },
      { step: 2, state: 'n=10^9, m=10^9, a=1', memoryOrStack: '64-bit product', note: '10^18 requires BigInt / long long' },
    ],
    solveJs(stdin) {
      const [n, m, a] = stdin.trim().split(/\s+/).map(BigInt);
      const r = (n + a - 1n) / a;
      const c = (m + a - 1n) / a;
      return String(r * c);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['6 6 4', '1 1 1'];
      const hiddenInputs = [
        '1000000000 1000000000 1',
        '1000000000 1000000000 1000000000',
        '7 9 3',
        '12 5 4',
      ];
      for (let k = 0; k < 6; k++) {
        hiddenInputs.push(`${randInt(rng, 1, 100000000)} ${randInt(rng, 1, 100000000)} ${randInt(rng, 1, 50000)}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    long long n, m, a; scanf("%lld %lld %lld", &n, &m, &a);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n, m, a; cin >> n >> m >> a;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nn, m, a = map(int, sys.stdin.read().split())\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong(), m = sc.nextLong(), a = sc.nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [n, m, a] = raw.trim().split(/\\s+/).map(BigInt);\n`,
      typescript: `import * as fs from 'fs';\nconst parts: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    long long n, m, a;
    if (scanf("%lld %lld %lld", &n, &m, &a) != 3) return 0;
    printf("%lld\\n", ((n + a - 1) / a) * ((m + a - 1) / a));
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    long long n, m, a; cin >> n >> m >> a;
    cout << ((n + a - 1) / a) * ((m + a - 1) / a) << '\\n';
    return 0;
}`,
      python: `import sys
n, m, a = map(int, sys.stdin.read().split())
print(((n + a - 1) // a) * ((m + a - 1) // a))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong(), m = sc.nextLong(), a = sc.nextLong();
        System.out.println(((n + a - 1) / a) * ((m + a - 1) / a));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [n, m, a] = raw.trim().split(/\\s+/).map(BigInt);
console.log(String(((n + a - 1n) / a) * ((m + a - 1n) / a)));`,
      typescript: `import * as fs from 'fs';
const p: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);
const n: bigint = p[0], m: bigint = p[1], a: bigint = p[2];
console.log(String(((n + a - 1n) / a) * ((m + a - 1n) / a)));`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, m, a) = (d[0], d[1], d[2]);
    println!("{}", ((n + a - 1) / a) * ((m + a - 1) / a));
}`,
    },
  },

  missing_number_sum: {
    id: 'missing_number_sum',
    defaultTopic: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n log n)',
    inputFormat: 'First line: integer n (2 <= n <= 2*10^5). Second line: n - 1 distinct integers from 1..n.',
    outputFormat: 'Print the single missing integer.',
    constraints: ['2 <= n <= 2 * 10^5', 'Use 64-bit arithmetic or XOR to prevent n*(n+1)/2 overflow!'],
    hints: [
      'Sum of 1..n is n*(n+1)/2, or XOR 1..n with all given numbers.',
      'For n = 2*10^5, n*(n+1)/2 exceeds 32-bit int!',
      'Using XOR completely avoids overflow even in 32-bit integers.',
    ],
    bruteIntuition: 'For every number 1..n, linearly scan the input array to see if it exists.',
    bruteBangla: '১ থেকে n পর্যন্ত প্রতিটি সংখ্যা অ্যারেতে আছে কি না লুপ চালিয়ে খোঁজা।',
    bruteWhyTle: 'O(n^2) does 4*10^10 operations on n = 2*10^5 (TLE).',
    brutePseudo: 'for x in 1..n: if x not in arr: return x',
    betterIntuition: 'Sort the array or insert into a HashSet, then scan 1..n.',
    betterBangla: 'অ্যারে সর্ট করে অথবা HashSet-এ রেখে মিসিং সংখ্যা বের করা।',
    betterTradeoff: 'Uses O(n) extra memory or O(n log n) sorting time.',
    betterPseudo: 'sort(arr); find first i where arr[i] != i + 1',
    optimalIntuition: 'XOR all numbers 1..n together with all n-1 input elements; duplicates cancel to 0.',
    optimalBangla: '১ থেকে n এবং ইনপুটের সব সংখ্যার বিটওয়াইজ XOR নিলে জোড়াগুলো কেটে গিয়ে শুধু মিসিং সংখ্যাটি বাকি থাকে।',
    optimalWhyWins: 'O(n) time, O(1) extra memory, zero integer overflow risk.',
    optimalPseudo: 'x = 0; for i in 1..n: x ^= i; for v in arr: x ^= v; print x',
    banglaEditorial: 'n*(n+1)/2 সূত্রে ৩২-বিট ওভারফ্লো হতে পারে, কিন্তু XOR পদ্ধতিতে O(n) টাইম ও O(1) স্পেসে নিখুঁত উত্তর আসে।',
    dryRunSteps: [
      { step: 1, state: 'n=5, arr=[2,3,1,5]', memoryOrStack: 'xor(1..5) = 1', note: 'Expected XOR computed' },
      { step: 2, state: 'XOR with [2,3,1,5]', memoryOrStack: '1 ^ 2^3^1^5 = 4', note: 'Missing = 4' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      let x = 0;
      for (let i = 1; i <= n; i++) x ^= i;
      for (let i = 1; i < n; i++) x ^= d[i];
      return String(x);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const makeCase = (n: number, miss: number) => {
        const arr: number[] = [];
        for (let i = 1; i <= n; i++) if (i !== miss) arr.push(i);
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return `${n}\n${arr.join(' ')}`;
      };
      const sampleInputs = ['5\n2 3 1 5', '2\n2'];
      const hiddenInputs = ['2\n1', makeCase(10, 1), makeCase(10, 10), makeCase(25, 13)];
      for (let k = 0; k < 6; k++) {
        const n = randInt(rng, 15, 60);
        hiddenInputs.push(makeCase(n, randInt(rng, 1, n)));
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
    int n, v, x = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 1; i <= n; i++) x ^= i;
    for (int i = 1; i < n; i++) { scanf("%d", &v); x ^= v; }
    printf("%d\\n", x);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, v, x = 0; cin >> n;
    for (int i = 1; i <= n; i++) x ^= i;
    for (int i = 1; i < n; i++) { cin >> v; x ^= v; }
    cout << x << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n = d[0]
x = 0
for i in range(1, n + 1): x ^= i
for v in d[1:n]: x ^= v
print(x)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), x = 0;
        for (int i = 1; i <= n; i++) x ^= i;
        for (int i = 1; i < n; i++) x ^= sc.nextInt();
        System.out.println(x);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
let x = 0;
for (let i = 1; i <= n; i++) x ^= i;
for (let i = 1; i < n; i++) x ^= d[i];
console.log(x);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let x: number = 0;
for (let i = 1; i <= n; i++) x ^= i;
for (let i = 1; i < n; i++) x ^= d[i];
console.log(x);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0];
    let mut x = 0;
    for i in 1..=n { x ^= i; }
    for &v in &d[1..(n as usize)] { x ^= v; }
    println!("{}", x);
}`,
    },
  },

  gcd_lcm_pair: {
    id: 'gcd_lcm_pair',
    defaultTopic: 'Number Theory',
    timeComplexity: 'O(t log(min(a,b)))',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(min(a,b))',
    betterComplexity: 'O(sqrt(a))',
    inputFormat: 'First line: integer t (1 <= t <= 1000). Next t lines each contain two integers a, b (1 <= a, b <= 10^9).',
    outputFormat: 'For each test case, print two space-separated integers: gcd(a, b) and lcm(a, b).',
    constraints: ['1 <= t <= 1000', '1 <= a, b <= 10^9', 'Divide before multiplying in lcm: (a / g) * b to avoid overflow!'],
    hints: [
      'Use Euclidean algorithm: gcd(a, b) = gcd(b, a % b).',
      'lcm(a, b) = (a / gcd(a, b)) * b.',
      'Use 64-bit / BigInt because lcm can reach 10^18.',
    ],
    bruteIntuition: 'Check every divisor d from min(a, b) down to 1.',
    bruteBangla: 'min(a, b) থেকে ১ পর্যন্ত সব সংখ্যা দিয়ে ভাগ করে গসাগু খোঁজা।',
    bruteWhyTle: 'O(min(a, b)) times out immediately when a, b = 10^9.',
    brutePseudo: 'for d from min(a,b) down to 1: if a%d==0 and b%d==0: return d',
    betterIntuition: 'Factorize a and b in O(sqrt(a)) and intersect prime powers.',
    betterBangla: 'মৌলিক উৎপাদকে বিশ্লেষণ করে সাধারণ গুণনীয়ক নেওয়া।',
    betterTradeoff: 'Much slower than Euclid on 10^9 inputs across 1000 queries.',
    betterPseudo: 'factorize(a), factorize(b), multiply common prime powers',
    optimalIntuition: 'Euclidean GCD runs in O(log(min(a, b))) steps; compute LCM as (a / g) * b in 64-bit.',
    optimalBangla: 'ইউক্লিডের gcd(b, a % b) অ্যালগরিদম এবং (a / g) * b সূত্র ব্যবহার করে O(log n)-এ সমাধান।',
    optimalWhyWins: 'At most ~60 modulo steps even for 10^18 inputs.',
    optimalPseudo: 'gcd(a,b): while b: (a,b)=(b,a%b); return a; lcm=(a/g)*b',
    banglaEditorial: 'ইউক্লিডীয় গসাগু এবং (a / g) * b দিয়ে লসাগু বের করলে মধ্যবর্তী গুণফলে ওভারফ্লো হয় না।',
    dryRunSteps: [
      { step: 1, state: 'a=12, b=18', memoryOrStack: 'gcd(18,12)->gcd(12,6)->6', note: 'g = 6' },
      { step: 2, state: 'lcm = (12/6)*18', memoryOrStack: '2 * 18 = 36', note: 'Output: 6 36' },
    ],
    solveJs(stdin) {
      const nums = stdin.trim().split(/\s+/).map(BigInt);
      const t = Number(nums[0] || 0n);
      const gcd = (a: bigint, b: bigint): bigint => {
        while (b !== 0n) {
          const r = a % b;
          a = b;
          b = r;
        }
        return a;
      };
      const out: string[] = [];
      for (let i = 0; i < t; i++) {
        const a = nums[1 + 2 * i];
        const b = nums[2 + 2 * i];
        const g = gcd(a, b);
        out.push(`${g} ${(a / g) * b}`);
      }
      return out.join('\n');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['3\n12 18\n7 13\n100 25', '2\n1 1\n24 36'];
      const hiddenInputs = [
        '3\n1000000000 999999999\n1000000000 1000000000\n48 180',
        '3\n17 51\n999983 999979\n144 216',
      ];
      for (let k = 0; k < 8; k++) {
        const t = randInt(rng, 3, 8);
        const rows = Array.from({ length: t }, () => `${randInt(rng, 1, 500000)} ${randInt(rng, 1, 500000)}`);
        hiddenInputs.push(`${t}\n${rows.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int t; scanf("%d", &t);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int t; cin >> t;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys, math\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(BigInt);\n`,
      typescript: `import * as fs from 'fs';\nconst d: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
long long gcd(long long a, long long b) { while (b) { long long r = a % b; a = b; b = r; } return a; }
int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 0;
    while (t--) {
        long long a, b; scanf("%lld %lld", &a, &b);
        long long g = gcd(a, b);
        printf("%lld %lld\\n", g, (a / g) * b);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <numeric>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t; cin >> t;
    while (t--) {
        long long a, b; cin >> a >> b;
        long long g = std::gcd(a, b);
        cout << g << ' ' << (a / g) * b << '\\n';
    }
    return 0;
}`,
      python: `import sys, math
d = list(map(int, sys.stdin.read().split()))
t = d[0]
out = []
for i in range(t):
    a, b = d[1+2*i], d[2+2*i]
    g = math.gcd(a, b)
    out.append(f"{g} {(a // g) * b}")
print("\\n".join(out))`,
      java: `import java.util.*;
public class Main {
    static long gcd(long a, long b) { while (b != 0) { long r = a % b; a = b; b = r; } return a; }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (t-- > 0) {
            long a = sc.nextLong(), b = sc.nextLong(), g = gcd(a, b);
            sb.append(g).append(' ').append((a / g) * b).append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(BigInt);
const t = Number(d[0]);
const gcd = (a, b) => { while (b !== 0n) { const r = a % b; a = b; b = r; } return a; };
const out = [];
for (let i = 0; i < t; i++) {
  const a = d[1 + 2 * i], b = d[2 + 2 * i], g = gcd(a, b);
  out.push(g + ' ' + ((a / g) * b));
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);
const t: number = Number(d[0]);
function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) { const r: bigint = a % b; a = b; b = r; }
  return a;
}
const out: string[] = [];
for (let i = 0; i < t; i++) {
  const a: bigint = d[1 + 2 * i], b: bigint = d[2 + 2 * i], g: bigint = gcd(a, b);
  out.push(String(g) + ' ' + String((a / g) * b));
}
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn gcd(mut a: i64, mut b: i64) -> i64 { while b != 0 { let r = a % b; a = b; b = r; } a }
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let t = d[0] as usize;
    for i in 0..t {
        let (a, b) = (d[1 + 2 * i], d[2 + 2 * i]);
        let g = gcd(a, b);
        println!("{} {}", g, (a / g) * b);
    }
}`,
    },
  },

  sieve_prime_count: {
    id: 'sieve_prime_count',
    defaultTopic: 'Number Theory / Sieve',
    timeComplexity: 'O(R log log R)',
    spaceComplexity: 'O(R)',
    bruteComplexity: 'O((R - L) * sqrt(R))',
    betterComplexity: 'O(R * sqrt(R))',
    inputFormat: 'Single line with two integers L and R (1 <= L <= R <= 10^6).',
    outputFormat: 'Single integer: count of prime numbers p such that L <= p <= R.',
    constraints: ['1 <= L <= R <= 10^6', '1 is NOT a prime number.'],
    hints: [
      'Use Sieve of Eratosthenes up to R.',
      'Mark multiples starting from i * i.',
      'Count remaining unmarked indices in [max(2, L), R].',
    ],
    bruteIntuition: 'Test each number x in [L, R] using trial division up to x-1.',
    bruteBangla: 'প্রতিটি সংখ্যার জন্য ২ থেকে x-1 পর্যন্ত ভাগ করে প্রাইম চেক করা।',
    bruteWhyTle: 'Quadratic O(R^2) times out well before R = 10^5.',
    brutePseudo: 'for x in L..R: if isPrimeNaive(x) count++',
    betterIntuition: 'Run O(sqrt(x)) trial division for every odd number in [L, R].',
    betterBangla: 'প্রতিটি সংখ্যার বর্গমূল পর্যন্ত ভাগ করে দেখা।',
    betterTradeoff: 'O((R-L) sqrt(R)) approaches ~5*10^8 ops when L=1, R=10^6.',
    betterPseudo: 'for x in L..R: check d=2..sqrt(x)',
    optimalIntuition: 'Sieve of Eratosthenes marks composite multiples from i*i in O(R log log R) time.',
    optimalBangla: 'Sieve of Eratosthenes দিয়ে একবারেই R পর্যন্ত সব কম্পোজিট সংখ্যা কেটে প্রাইম গণনা করো।',
    optimalWhyWins: 'Runs in ~15ms even at R = 10^6.',
    optimalPseudo: 'isPrime[0..1]=false; for i=2..sqrt(R): mark i*i, i*i+i... false',
    banglaEditorial: 'Sieve of Eratosthenes চালিয়ে ২ থেকে R পর্যন্ত প্রাইম টেবিল তৈরি করে L..R রেঞ্জের প্রাইম সংখ্যা গুনলেই O(R log log R)-এ সমাধান হয়।',
    dryRunSteps: [
      { step: 1, state: 'L=1, R=10', memoryOrStack: 'sieve up to 10', note: '1 marked composite' },
      { step: 2, state: 'Primes found', memoryOrStack: '2, 3, 5, 7', note: 'Count = 4' },
    ],
    solveJs(stdin) {
      const [L, R] = stdin.trim().split(/\s+/).map(Number);
      const isP = new Uint8Array(R + 1);
      isP.fill(1);
      isP[0] = 0;
      if (R >= 1) isP[1] = 0;
      for (let i = 2; i * i <= R; i++) {
        if (isP[i]) {
          for (let j = i * i; j <= R; j += i) isP[j] = 0;
        }
      }
      let cnt = 0;
      for (let x = Math.max(2, L); x <= R; x++) cnt += isP[x];
      return String(cnt);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['1 10', '10 30'];
      const hiddenInputs = ['1 1', '2 2', '1 100', '50 50', '100 1000', '9900 10000'];
      for (let k = 0; k < 6; k++) {
        const l = randInt(rng, 1, 4000);
        const r = l + randInt(rng, 20, 4000);
        hiddenInputs.push(`${l} ${r}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int l, r; scanf("%d %d", &l, &r);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int l, r; cin >> l >> r;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nl, r = map(int, sys.stdin.read().split())\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int l = sc.nextInt(), r = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [l, r] = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int l, r;
    if (scanf("%d %d", &l, &r) != 2) return 0;
    char *p = malloc(r + 1);
    for (int i = 0; i <= r; i++) p[i] = 1;
    p[0] = 0; if (r >= 1) p[1] = 0;
    for (int i = 2; (long long)i * i <= r; i++)
        if (p[i]) for (int j = i * i; j <= r; j += i) p[j] = 0;
    int ans = 0;
    for (int x = l < 2 ? 2 : l; x <= r; x++) ans += p[x];
    printf("%d\\n", ans);
    free(p);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int l, r; cin >> l >> r;
    vector<char> p(r + 1, 1);
    p[0] = 0; if (r >= 1) p[1] = 0;
    for (int i = 2; 1LL * i * i <= r; i++)
        if (p[i]) for (int j = i * i; j <= r; j += i) p[j] = 0;
    int ans = 0;
    for (int x = max(2, l); x <= r; x++) ans += p[x];
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
l, r = map(int, sys.stdin.read().split())
p = bytearray([1]) * (r + 1)
p[0] = 0
if r >= 1: p[1] = 0
i = 2
while i * i <= r:
    if p[i]:
        p[i*i:r+1:i] = bytearray(len(range(i*i, r+1, i)))
    i += 1
print(sum(p[max(2, l):r+1]))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int l = sc.nextInt(), r = sc.nextInt();
        boolean[] comp = new boolean[r + 1];
        comp[0] = true; if (r >= 1) comp[1] = true;
        for (int i = 2; (long)i * i <= r; i++)
            if (!comp[i]) for (int j = i * i; j <= r; j += i) comp[j] = true;
        int ans = 0;
        for (int x = Math.max(2, l); x <= r; x++) if (!comp[x]) ans++;
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [l, r] = raw.trim().split(/\\s+/).map(Number);
const p = new Uint8Array(r + 1);
p.fill(1); p[0] = 0; if (r >= 1) p[1] = 0;
for (let i = 2; i * i <= r; i++) if (p[i]) for (let j = i * i; j <= r; j += i) p[j] = 0;
let ans = 0;
for (let x = Math.max(2, l); x <= r; x++) ans += p[x];
console.log(ans);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const l: number = d[0], r: number = d[1];
const p = new Uint8Array(r + 1);
p.fill(1); p[0] = 0; if (r >= 1) p[1] = 0;
for (let i = 2; i * i <= r; i++) if (p[i]) for (let j = i * i; j <= r; j += i) p[j] = 0;
let ans: number = 0;
for (let x = Math.max(2, l); x <= r; x++) ans += p[x];
console.log(ans);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (l, r) = (d[0], d[1]);
    let mut p = vec![true; r + 1];
    p[0] = false; if r >= 1 { p[1] = false; }
    let mut i = 2;
    while i * i <= r {
        if p[i] {
            let mut j = i * i;
            while j <= r { p[j] = false; j += i; }
        }
        i += 1;
    }
    let ans = (l.max(2)..=r).filter(|&x| p[x]).count();
    println!("{}", ans);
}`,
    },
  },

  mod_pow_fermat: {
    id: 'mod_pow_fermat',
    defaultTopic: 'Modular Arithmetic',
    timeComplexity: 'O(t log b)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(t * b)',
    betterComplexity: 'O(t * sqrt(b))',
    inputFormat: 'First line: integer t (1 <= t <= 1000). Next t lines each contain three integers a, b, m (0 <= a, b <= 10^9, 1 <= m <= 10^9+7).',
    outputFormat: 'For each query, print (a^b) mod m (with 0^0 mod m = 1 mod m).',
    constraints: ['1 <= t <= 1000', '0 <= a, b <= 10^9', '1 <= m <= 10^9 + 7'],
    hints: [
      'Repeated multiplication O(b) times out when b = 10^9.',
      'Use Binary Exponentiation: square the base while halving the exponent.',
      'Handle m = 1 cleanly by reducing result % m at the start!',
    ],
    bruteIntuition: 'Multiply result by a inside a loop b times modulo m.',
    bruteBangla: 'b বার লুপ চালিয়ে a গুণ করে mod m নেওয়া।',
    bruteWhyTle: 'b <= 10^9 takes 10^12 total operations for t = 1000 (TLE).',
    brutePseudo: 'res = 1 % m; repeat b times: res = (res * a) % m',
    betterIntuition: 'Compute power recursively dividing exponent by 2 without tail loop.',
    betterBangla: 'রিকার্শন দিয়ে পাওয়ার অর্ধেক করে গুণ করা।',
    betterTradeoff: 'Uses O(log b) call stack instead of O(1) iterative loop.',
    betterPseudo: 'pow(a,b): h=pow(a,b/2); return b odd ? h*h*a : h*h',
    optimalIntuition: 'Iterative binary exponentiation using 64-bit / BigInt modular products.',
    optimalBangla: 'ইটারেটিভ বাইনারি এক্সপোনেনশিয়েশন দিয়ে মাত্র ৩০ ধাপে ১০^৯ পাওয়ার নির্ণয় করা যায়।',
    optimalWhyWins: 'O(log b) time and O(1) memory per query.',
    optimalPseudo: 'res=1%m; a%=m; while b>0: if b&1: res=res*a%m; a=a*a%m; b>>=1',
    banglaEditorial: 'বাইনারি এক্সপোনেনশিয়েশনে ঘাতের প্রতিটি বিট দেখে O(log b) ধাপে নির্ভুল মডুলার পাওয়ার বের হয়।',
    dryRunSteps: [
      { step: 1, state: 'a=3, b=5 (101_2), m=100', memoryOrStack: 'res=1, base=3', note: 'LSB=1 -> res=3' },
      { step: 2, state: 'b=2, base=9 -> b=1, base=81', memoryOrStack: 'res = 3 * 81 % 100', note: 'Result = 43' },
    ],
    solveJs(stdin) {
      const nums = stdin.trim().split(/\s+/).map(BigInt);
      const t = Number(nums[0] || 0n);
      const modPow = (a: bigint, b: bigint, m: bigint): bigint => {
        let res = 1n % m;
        a %= m;
        while (b > 0n) {
          if (b & 1n) res = (res * a) % m;
          a = (a * a) % m;
          b >>= 1n;
        }
        return res;
      };
      const out: string[] = [];
      for (let i = 0; i < t; i++) {
        out.push(String(modPow(nums[1 + 3 * i], nums[2 + 3 * i], nums[3 + 3 * i])));
      }
      return out.join('\n');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['3\n2 10 1000000007\n3 5 100\n0 0 1000000007', '2\n5 0 7\n10 9 1'];
      const hiddenInputs = [
        '3\n2 1000000000 1000000007\n998244352 998244351 998244353\n123456789 987654321 1000000007',
      ];
      for (let k = 0; k < 9; k++) {
        const t = randInt(rng, 3, 7);
        const rows = Array.from(
          { length: t },
          () => `${randInt(rng, 1, 1000000000)} ${randInt(rng, 0, 1000000000)} ${randInt(rng, 2, 1000000007)}`,
        );
        hiddenInputs.push(`${t}\n${rows.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int t; scanf("%d", &t);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int t; cin >> t;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(BigInt);\n`,
      typescript: `import * as fs from 'fs';\nconst d: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
long long mpow(long long a, long long b, long long m) {
    long long r = 1 % m; a %= m;
    while (b > 0) {
        if (b & 1LL) r = (r * a) % m;
        a = (a * a) % m;
        b >>= 1;
    }
    return r;
}
int main(void) {
    int t; if (scanf("%d", &t) != 1) return 0;
    while (t--) {
        long long a, b, m; scanf("%lld %lld %lld", &a, &b, &m);
        printf("%lld\\n", mpow(a, b, m));
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
long long mpow(long long a, long long b, long long m) {
    long long r = 1 % m; a %= m;
    while (b > 0) {
        if (b & 1LL) r = (r * a) % m;
        a = (a * a) % m;
        b >>= 1;
    }
    return r;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t; cin >> t;
    while (t--) {
        long long a, b, m; cin >> a >> b >> m;
        cout << mpow(a, b, m) << '\\n';
    }
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
t = d[0]
print("\\n".join(str(pow(d[1+3*i], d[2+3*i], d[3+3*i])) for i in range(t)))`,
      java: `import java.util.*;
public class Main {
    static long mpow(long a, long b, long m) {
        long r = 1 % m; a %= m;
        while (b > 0) {
            if ((b & 1L) == 1L) r = (r * a) % m;
            a = (a * a) % m;
            b >>= 1;
        }
        return r;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (t-- > 0) sb.append(mpow(sc.nextLong(), sc.nextLong(), sc.nextLong())).append('\\n');
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(BigInt);
const t = Number(d[0]);
const mpow = (a, b, m) => {
  let r = 1n % m; a %= m;
  while (b > 0n) { if (b & 1n) r = (r * a) % m; a = (a * a) % m; b >>= 1n; }
  return r;
};
const out = [];
for (let i = 0; i < t; i++) out.push(String(mpow(d[1+3*i], d[2+3*i], d[3+3*i])));
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const d: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);
const t: number = Number(d[0]);
function mpow(a: bigint, b: bigint, m: bigint): bigint {
  let r: bigint = 1n % m; a %= m;
  while (b > 0n) { if (b & 1n) r = (r * a) % m; a = (a * a) % m; b >>= 1n; }
  return r;
}
const out: string[] = [];
for (let i = 0; i < t; i++) out.push(String(mpow(d[1 + 3 * i], d[2 + 3 * i], d[3 + 3 * i])));
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
fn mpow(mut a: u128, mut b: u128, m: u128) -> u128 {
    let mut r = 1 % m; a %= m;
    while b > 0 {
        if b & 1 == 1 { r = (r * a) % m; }
        a = (a * a) % m;
        b >>= 1;
    }
    r
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<u128> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let t = d[0] as usize;
    for i in 0..t { println!("{}", mpow(d[1+3*i], d[2+3*i], d[3+3*i])); }
}`,
    },
  },

  ncr_mod_1e9_7: {
    id: 'ncr_mod_1e9_7',
    defaultTopic: 'Combinatorics',
    timeComplexity: 'O(N + q)',
    spaceComplexity: 'O(N)',
    bruteComplexity: 'O(q * N)',
    betterComplexity: 'O(N^2)',
    inputFormat: 'First line: integer q (1 <= q <= 1000). Next q lines each have two integers n, r (0 <= r <= n <= 10^5).',
    outputFormat: 'For each query, print C(n, r) mod 1000000007.',
    constraints: ['1 <= q <= 1000', '0 <= r <= n <= 10^5', 'MOD = 10^9 + 7 is prime'],
    hints: [
      'Precompute factorials fact[0..N] modulo 10^9 + 7.',
      'By Fermat Little Theorem, inverse(x) = x^(MOD - 2) mod MOD.',
      'Precompute invFact[N] = modPow(fact[N], MOD - 2) and sweep backwards: invFact[i - 1] = invFact[i] * i % MOD.',
    ],
    bruteIntuition: 'Recompute numerator and denominator products for every query separately.',
    bruteBangla: 'প্রতিটি কুয়েরির জন্য আলাদাভাবে লব-হর গুণ করে C(n, r) বের করা।',
    bruteWhyTle: 'O(q * n) hits 10^8+ operations and division fails modulo prime without modular inverse.',
    brutePseudo: 'for each query: loop i=1..r multiplying (n-i+1)/i',
    betterIntuition: 'Build Pascal triangle dp[n][r].',
    betterBangla: 'প্যাসকেলের ত্রিভুজ টেবিল বানিয়ে উত্তর নেওয়া।',
    betterTradeoff: 'O(N^2) memory (10^10 ints) exceeds 256MB when N = 10^5!',
    betterPseudo: 'C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD',
    optimalIntuition: 'Linear O(N) precomputation of factorials & modular inverse factorials answers each query in O(1).',
    optimalBangla: 'fact[] ও invFact[] একবারে O(N)-এ প্রি-কম্পিউট করে রাখলে প্রতিটি কুয়েরির উত্তর আসে O(1)-এ।',
    optimalWhyWins: 'O(N + q) total time and O(N) memory.',
    optimalPseudo: 'ans = fact[n] * invFact[r] % MOD * invFact[n - r] % MOD',
    banglaEditorial: 'MOD = 10^9+7 মৌলিক সংখ্যা হওয়ায় ফ্যাক্টোরিয়াল ও ফার্মার লিটল থিওরেম দিয়ে ইনভার্স ফ্যাক্টোরিয়াল প্রি-কম্পিউট করলে প্রতিটি C(n,r) বের হয় O(1)-এ।',
    dryRunSteps: [
      { step: 1, state: 'n=5, r=2', memoryOrStack: 'fact[5]=120, invFact[2]*invFact[3]', note: '120 / (2*6) = 10' },
      { step: 2, state: 'n=100, r=0', memoryOrStack: 'invFact[0] = 1', note: 'Outputs 1' },
    ],
    solveJs(stdin) {
      const MOD = 1000000007n;
      const nums = stdin.trim().split(/\s+/).map(Number);
      const q = nums[0] || 0;
      let maxN = 1;
      for (let i = 0; i < q; i++) maxN = Math.max(maxN, nums[1 + 2 * i]);
      const fact: bigint[] = new Array(maxN + 1);
      const inv: bigint[] = new Array(maxN + 1);
      fact[0] = 1n;
      for (let i = 1; i <= maxN; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
      const modPow = (a: bigint, b: bigint): bigint => {
        let r = 1n;
        a %= MOD;
        while (b > 0n) {
          if (b & 1n) r = (r * a) % MOD;
          a = (a * a) % MOD;
          b >>= 1n;
        }
        return r;
      };
      inv[maxN] = modPow(fact[maxN], MOD - 2n);
      for (let i = maxN; i >= 1; i--) inv[i - 1] = (inv[i] * BigInt(i)) % MOD;
      const out: string[] = [];
      for (let i = 0; i < q; i++) {
        const n = nums[1 + 2 * i];
        const r = nums[2 + 2 * i];
        if (r < 0 || r > n) out.push('0');
        else out.push(String((((fact[n] * inv[r]) % MOD) * inv[n - r]) % MOD));
      }
      return out.join('\n');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['3\n5 2\n10 0\n10 5', '2\n100 50\n1 1'];
      const hiddenInputs = [
        '4\n0 0\n20 10\n1000 500\n5000 2500',
        '3\n100000 50000\n99999 12345\n42 21',
      ];
      for (let k = 0; k < 8; k++) {
        const q = randInt(rng, 3, 8);
        const rows = Array.from({ length: q }, () => {
          const n = randInt(rng, 5, 5000);
          return `${n} ${randInt(rng, 0, n)}`;
        });
        hiddenInputs.push(`${q}\n${rows.join('\n')}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int q; scanf("%d", &q);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int q; cin >> q;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nd = list(map(int, sys.stdin.read().split()))\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#define MOD 1000000007LL
long long mpow(long long a, long long b) {
    long long r = 1; a %= MOD;
    while (b > 0) { if (b & 1) r = r * a % MOD; a = a * a % MOD; b >>= 1; }
    return r;
}
int main(void) {
    int q; if (scanf("%d", &q) != 1) return 0;
    int *ns = malloc(q * sizeof(int)), *rs = malloc(q * sizeof(int)), mx = 1;
    for (int i = 0; i < q; i++) { scanf("%d %d", &ns[i], &rs[i]); if (ns[i] > mx) mx = ns[i]; }
    long long *f = malloc((mx + 1) * sizeof(long long)), *inv = malloc((mx + 1) * sizeof(long long));
    f[0] = 1; for (int i = 1; i <= mx; i++) f[i] = f[i - 1] * i % MOD;
    inv[mx] = mpow(f[mx], MOD - 2);
    for (int i = mx; i >= 1; i--) inv[i - 1] = inv[i] * i % MOD;
    for (int i = 0; i < q; i++) {
        int n = ns[i], r = rs[i];
        printf("%lld\\n", (r < 0 || r > n) ? 0LL : f[n] * inv[r] % MOD * inv[n - r] % MOD);
    }
    free(ns); free(rs); free(f); free(inv);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
const long long MOD = 1000000007LL;
long long mpow(long long a, long long b) {
    long long r = 1; a %= MOD;
    while (b > 0) { if (b & 1) r = r * a % MOD; a = a * a % MOD; b >>= 1; }
    return r;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q; cin >> q;
    vector<pair<int,int>> qs(q);
    int mx = 1;
    for (int i = 0; i < q; i++) { cin >> qs[i].first >> qs[i].second; mx = max(mx, qs[i].first); }
    vector<long long> f(mx + 1, 1), inv(mx + 1, 1);
    for (int i = 1; i <= mx; i++) f[i] = f[i - 1] * i % MOD;
    inv[mx] = mpow(f[mx], MOD - 2);
    for (int i = mx; i >= 1; i--) inv[i - 1] = inv[i] * i % MOD;
    for (auto [n, r] : qs) {
        cout << ((r < 0 || r > n) ? 0LL : f[n] * inv[r] % MOD * inv[n - r] % MOD) << '\\n';
    }
    return 0;
}`,
      python: `import sys
MOD = 10**9 + 7
d = list(map(int, sys.stdin.read().split()))
q = d[0]
pairs = [(d[1+2*i], d[2+2*i]) for i in range(q)]
mx = max([n for n, _ in pairs] + [1])
f = [1] * (mx + 1)
for i in range(1, mx + 1): f[i] = f[i-1] * i % MOD
inv = [1] * (mx + 1)
inv[mx] = pow(f[mx], MOD - 2, MOD)
for i in range(mx, 0, -1): inv[i-1] = inv[i] * i % MOD
print("\\n".join(str(0 if r < 0 or r > n else f[n] * inv[r] % MOD * inv[n-r] % MOD) for n, r in pairs))`,
      java: `import java.util.*;
public class Main {
    static final long MOD = 1000000007L;
    static long mpow(long a, long b) {
        long r = 1; a %= MOD;
        while (b > 0) { if ((b & 1L) == 1L) r = r * a % MOD; a = a * a % MOD; b >>= 1; }
        return r;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt(), mx = 1;
        int[] ns = new int[q], rs = new int[q];
        for (int i = 0; i < q; i++) { ns[i] = sc.nextInt(); rs[i] = sc.nextInt(); mx = Math.max(mx, ns[i]); }
        long[] f = new long[mx + 1], inv = new long[mx + 1];
        f[0] = 1; for (int i = 1; i <= mx; i++) f[i] = f[i - 1] * i % MOD;
        inv[mx] = mpow(f[mx], MOD - 2);
        for (int i = mx; i >= 1; i--) inv[i - 1] = inv[i] * i % MOD;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            int n = ns[i], r = rs[i];
            sb.append((r < 0 || r > n) ? 0L : f[n] * inv[r] % MOD * inv[n - r] % MOD).append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const MOD = 1000000007n;
const d = raw.trim().split(/\\s+/).map(Number);
const q = d[0];
let mx = 1;
for (let i = 0; i < q; i++) mx = Math.max(mx, d[1 + 2 * i]);
const f = new Array(mx + 1); f[0] = 1n;
for (let i = 1; i <= mx; i++) f[i] = (f[i - 1] * BigInt(i)) % MOD;
const mpow = (a, b) => { let r = 1n; a %= MOD; while (b > 0n) { if (b & 1n) r = (r * a) % MOD; a = (a * a) % MOD; b >>= 1n; } return r; };
const inv = new Array(mx + 1);
inv[mx] = mpow(f[mx], MOD - 2n);
for (let i = mx; i >= 1; i--) inv[i - 1] = (inv[i] * BigInt(i)) % MOD;
const out = [];
for (let i = 0; i < q; i++) {
  const n = d[1 + 2 * i], r = d[2 + 2 * i];
  out.push(r < 0 || r > n ? '0' : String((((f[n] * inv[r]) % MOD) * inv[n - r]) % MOD));
}
console.log(out.join('\\n'));`,
      typescript: `import * as fs from 'fs';
const MOD: bigint = 1000000007n;
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const q: number = d[0];
let mx: number = 1;
for (let i = 0; i < q; i++) mx = Math.max(mx, d[1 + 2 * i]);
const f: bigint[] = new Array<bigint>(mx + 1); f[0] = 1n;
for (let i = 1; i <= mx; i++) f[i] = (f[i - 1] * BigInt(i)) % MOD;
function mpow(a: bigint, b: bigint): bigint {
  let r: bigint = 1n; a %= MOD;
  while (b > 0n) { if (b & 1n) r = (r * a) % MOD; a = (a * a) % MOD; b >>= 1n; }
  return r;
}
const inv: bigint[] = new Array<bigint>(mx + 1);
inv[mx] = mpow(f[mx], MOD - 2n);
for (let i = mx; i >= 1; i--) inv[i - 1] = (inv[i] * BigInt(i)) % MOD;
const out: string[] = [];
for (let i = 0; i < q; i++) {
  const n: number = d[1 + 2 * i], r: number = d[2 + 2 * i];
  out.push(r < 0 || r > n ? '0' : String((((f[n] * inv[r]) % MOD) * inv[n - r]) % MOD));
}
console.log(out.join('\\n'));`,
      rust: `use std::io::{self, Read};
const MOD: u64 = 1_000_000_007;
fn mpow(mut a: u64, mut b: u64) -> u64 {
    let mut r = 1; a %= MOD;
    while b > 0 { if b & 1 == 1 { r = r * a % MOD; } a = a * a % MOD; b >>= 1; }
    r
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let q = d[0];
    let mut mx = 1;
    for i in 0..q { mx = mx.max(d[1 + 2 * i]); }
    let mut f = vec![1u64; mx + 1];
    for i in 1..=mx { f[i] = f[i - 1] * (i as u64) % MOD; }
    let mut inv = vec![1u64; mx + 1];
    inv[mx] = mpow(f[mx], MOD - 2);
    for i in (1..=mx).rev() { inv[i - 1] = inv[i] * (i as u64) % MOD; }
    for i in 0..q {
        let (n, r) = (d[1 + 2 * i], d[2 + 2 * i]);
        println!("{}", if r > n { 0 } else { f[n] * inv[r] % MOD * inv[n - r] % MOD });
    }
}`,
    },
  },

  single_number_xor: {
    id: 'single_number_xor',
    defaultTopic: 'Bitwise',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n)',
    inputFormat: 'First line: odd integer n (1 <= n <= 2*10^5). Second line: n integers where all values except one appear an even number of times.',
    outputFormat: 'Print the single unique element.',
    constraints: ['1 <= n <= 2 * 10^5', '-10^9 <= a_i <= 10^9'],
    hints: [
      'Recall XOR properties: x ^ x = 0 and x ^ 0 = x.',
      'XOR is commutative and associative regardless of element ordering.',
      'XOR every number in the array into one accumulator.',
    ],
    bruteIntuition: 'For each element, scan the array to count its occurrences.',
    bruteBangla: 'প্রতিটি সংখ্যার জন্য পুরো অ্যারে ঘুরে ফ্রিকোয়েন্সি গোনা।',
    bruteWhyTle: 'O(n^2) times out when n = 2*10^5.',
    brutePseudo: 'for x in arr: if count(arr, x) == 1: return x',
    betterIntuition: 'Maintain a HashMap of frequency counts and find count == 1.',
    betterBangla: 'HashMap-এ সব সংখ্যার ফ্রিকোয়েন্সি রেখে ১ বার আসা সংখ্যা বের করা।',
    betterTradeoff: 'Uses O(n) extra heap memory instead of O(1).',
    betterPseudo: 'freq[x]++; return key with freq == 1',
    optimalIntuition: 'Single-pass bitwise XOR accumulation cancels all paired elements cleanly.',
    optimalBangla: 'সব সংখ্যার XOR নিলে জোড়ায় থাকা সংখ্যা শূন্য হয়ে যায় এবং একমাত্র অদ্বিতীয় সংখ্যাটি বাকি থাকে।',
    optimalWhyWins: 'O(n) time and O(1) extra space.',
    optimalPseudo: 'ans = 0; for x in arr: ans ^= x; print ans',
    banglaEditorial: 'x ^ x = 0 এবং x ^ 0 = x ধর্ম ব্যবহার করে O(1) মেমোরিতে অদ্বিতীয় উপাদানটি পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'arr = [4, 1, 2, 1, 2]', memoryOrStack: 'acc = 4 ^ 1 ^ 2', note: 'acc = 7' },
      { step: 2, state: 'XOR 1 ^ 2', memoryOrStack: '7 ^ 1 ^ 2 = 4', note: 'Pairs cancelled -> 4' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      let x = 0;
      for (let i = 1; i <= n; i++) x ^= d[i];
      return String(x);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const makeCase = (pairs: number, uniq: number) => {
        const arr = [uniq];
        for (let i = 0; i < pairs; i++) {
          const v = randInt(rng, -50000, 50000);
          arr.push(v, v);
        }
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return `${arr.length}\n${arr.join(' ')}`;
      };
      const sampleInputs = ['5\n4 1 2 1 2', '1\n99'];
      const hiddenInputs = ['3\n-5 7 -5', '5\n0 1000000000 0 -1000000000 -1000000000'];
      for (let k = 0; k < 8; k++) {
        hiddenInputs.push(makeCase(randInt(rng, 3, 25), randInt(rng, -100000, 100000)));
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
    long long x = 0, v;
    for (int i = 0; i < n; i++) { scanf("%lld", &v); x ^= v; }
    printf("%lld\\n", x);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    long long x = 0, v;
    while (n--) { cin >> v; x ^= v; }
    cout << x << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
x = 0
for v in d[1:1+d[0]]: x ^= v
print(x)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long x = 0;
        for (int i = 0; i < n; i++) x ^= sc.nextLong();
        System.out.println(x);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
let x = 0;
for (let i = 1; i <= d[0]; i++) x ^= d[i];
console.log(x);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let x: number = 0;
for (let i = 1; i <= d[0]; i++) x ^= d[i];
console.log(x);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut x = 0i64;
    for &v in &d[1..=d[0] as usize] { x ^= v; }
    println!("{}", x);
}`,
    },
  },

  popcount_range_sum: {
    id: 'popcount_range_sum',
    defaultTopic: 'Bitmasking',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n log n)',
    betterComplexity: 'O(n)',
    inputFormat: 'Single line with integer n (0 <= n <= 10^15).',
    outputFormat: 'Single integer: total number of 1-bits across binary representations of all integers 1..n.',
    constraints: ['0 <= n <= 10^15', 'Use 64-bit / BigInt arithmetic.'],
    hints: [
      'Count how many integers in 0..n have bit b set independently for each bit position b.',
      'Bit b repeats in cycles of size 2^(b+1), with 2^b ones in the second half of every cycle.',
      'Sum complete cycles + remainder clamping at 0.',
    ],
    bruteIntuition: 'Loop i from 1 to n and count bits using popcount(i).',
    bruteBangla: '১ থেকে n পর্যন্ত প্রতিটি সংখ্যার সেট বিট গুনে যোগ করা।',
    bruteWhyTle: 'O(n log n) is impossible when n = 10^15.',
    brutePseudo: 'sum(popcount(i) for i in 1..n)',
    betterIntuition: 'Dynamic programming dp[i] = dp[i >> 1] + (i & 1) up to n.',
    betterBangla: 'DP দিয়ে dp[i] = dp[i//2] + (i&1) টেবিল বানানো।',
    betterTradeoff: 'Still O(n) time & memory, fails for n > 10^7.',
    betterPseudo: 'for i in 1..n: dp[i] = dp[i>>1] + (i&1)',
    optimalIntuition: 'Bitwise cycle counting: for each bit b, full blocks contribute (n+1)//2^(b+1) * 2^b ones plus remainder.',
    optimalBangla: 'প্রতিটি বিট পজিশনে সাইকেল ধরে হিসাব করলে মাত্র ৫০ ধাপে O(log n)-এ মোট সেট বিট পাওয়া যায়।',
    optimalWhyWins: 'Constant ~50 loop iterations even for n = 10^15.',
    optimalPseudo: 'for b=0..52: p=1<<(b+1); ans += ((n+1)//p)*(p>>1) + max(0, (n+1)%p - (p>>1))',
    banglaEditorial: 'প্রতিটি বিটের পর্যাবৃত্ত প্যাটার্ন ব্যবহার করে পূর্ণ সাইকেল এবং বাকি অংশ যোগ করলে O(log n)-এ উত্তর পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'n = 5 (0..5 has 6 nums)', memoryOrStack: 'bit0:3, bit1:2, bit2:2', note: 'Total = 7' },
      { step: 2, state: 'Verify 1..5', memoryOrStack: '1+1+2+1+2 = 7', note: 'Exact match' },
    ],
    solveJs(stdin) {
      const n = BigInt(stdin.trim());
      if (n <= 0n) return '0';
      const total = n + 1n;
      let ans = 0n;
      for (let b = 0n; (1n << b) <= n; b++) {
        const half = 1n << b;
        const period = half << 1n;
        ans += (total / period) * half;
        const rem = total % period;
        if (rem > half) ans += rem - half;
      }
      return String(ans);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5', '12'];
      const hiddenInputs = ['0', '1', '7', '15', '1000000', '1000000000000'];
      for (let k = 0; k < 4; k++) {
        hiddenInputs.push(String(randInt(rng, 20, 500000000)));
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    long long n; scanf("%lld", &n);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nn = int(sys.stdin.read().strip())\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = BigInt(raw.trim());\n`,
      typescript: `import * as fs from 'fs';\nconst n: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    long long n; if (scanf("%lld", &n) != 1) return 0;
    if (n <= 0) { printf("0\\n"); return 0; }
    long long total = n + 1, ans = 0;
    for (int b = 0; (1LL << b) <= n; b++) {
        long long half = 1LL << b, period = half << 1;
        ans += (total / period) * half;
        long long rem = total % period;
        if (rem > half) ans += rem - half;
    }
    printf("%lld\\n", ans);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    long long n; cin >> n;
    if (n <= 0) { cout << 0 << '\\n'; return 0; }
    long long total = n + 1, ans = 0;
    for (int b = 0; (1LL << b) <= n; b++) {
        long long half = 1LL << b, period = half << 1;
        ans += (total / period) * half;
        long long rem = total % period;
        if (rem > half) ans += rem - half;
    }
    cout << ans << '\\n';
    return 0;
}`,
      python: `import sys
n = int(sys.stdin.read().strip())
if n <= 0:
    print(0)
else:
    total, ans, b = n + 1, 0, 0
    while (1 << b) <= n:
        half = 1 << b
        period = half << 1
        ans += (total // period) * half + max(0, (total % period) - half)
        b += 1
    print(ans)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        long n = new Scanner(System.in).nextLong();
        if (n <= 0) { System.out.println(0); return; }
        long total = n + 1, ans = 0;
        for (int b = 0; (1L << b) <= n; b++) {
            long half = 1L << b, period = half << 1;
            ans += (total / period) * half;
            long rem = total % period;
            if (rem > half) ans += rem - half;
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = BigInt(raw.trim());
if (n <= 0n) console.log('0');
else {
  const total = n + 1n;
  let ans = 0n;
  for (let b = 0n; (1n << b) <= n; b++) {
    const half = 1n << b, period = half << 1n;
    ans += (total / period) * half;
    const rem = total % period;
    if (rem > half) ans += rem - half;
  }
  console.log(String(ans));
}`,
      typescript: `import * as fs from 'fs';
const n: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());
if (n <= 0n) console.log('0');
else {
  const total: bigint = n + 1n;
  let ans: bigint = 0n;
  for (let b = 0n; (1n << b) <= n; b++) {
    const half: bigint = 1n << b, period: bigint = half << 1n;
    ans += (total / period) * half;
    const rem: bigint = total % period;
    if (rem > half) ans += rem - half;
  }
  console.log(String(ans));
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: u64 = s.trim().parse().unwrap_or(0);
    if n == 0 { println!("0"); return; }
    let total = n + 1;
    let mut ans = 0u64;
    let mut b = 0u32;
    while (1u64 << b) <= n {
        let half = 1u64 << b;
        let period = half << 1;
        ans += (total / period) * half;
        let rem = total % period;
        if rem > half { ans += rem - half; }
        b += 1;
    }
    println!("{}", ans);
}`,
    },
  },

  digits_reduce_steps: {
    id: 'digits_reduce_steps',
    defaultTopic: 'Implementation',
    timeComplexity: 'O(k)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(k log n)',
    betterComplexity: 'O(k)',
    inputFormat: 'Single line with two integers n and k (2 <= n <= 10^9, 1 <= k <= 50).',
    outputFormat: 'Print the resulting integer after performing k operations: if last digit != 0 subtract 1, else divide by 10.',
    constraints: ['2 <= n <= 10^9', '1 <= k <= 50', 'Final result is guaranteed >= 1'],
    hints: [
      'Inspect n % 10 at each step.',
      'If n % 10 != 0 then n -= 1 else n /= 10.',
      'Loop k times in O(k) operations.',
    ],
    bruteIntuition: 'Convert n to string on every step to inspect and slice the trailing digit.',
    bruteBangla: 'প্রতিটি ধাপে সংখ্যাটিকে স্ট্রিংয়ে রূপান্তর করে শেষ অঙ্ক কাটা।',
    bruteWhyTle: 'Creates k temporary strings unnecessarily.',
    brutePseudo: 'repeat k: s=str(n); n = s endsWith 0 ? int(s[:-1]) : n-1',
    betterIntuition: 'Use arithmetic modulo 10 in a clean for-loop.',
    betterBangla: 'n % 10 দেখে ১ বিয়োগ অথবা ১০ দিয়ে ভাগ করা।',
    betterTradeoff: 'O(k) arithmetic, already optimal for k <= 50.',
    betterPseudo: 'repeat k: if n%10==0: n/=10 else: n--',
    optimalIntuition: 'Direct arithmetic modulo simulation with O(1) space.',
    optimalBangla: 'n % 10 শূন্য হলে ১০ দিয়ে ভাগ, না হলে ১ বিয়োগ — এভাবে k বার লুপ চালাও।',
    optimalWhyWins: 'Runs in at most 50 CPU instructions.',
    optimalPseudo: 'while k--: n = (n % 10 == 0) ? n / 10 : n - 1',
    banglaEditorial: 'সংখ্যার শেষ অঙ্ক বের করতে n % 10 ব্যবহার করো। ০ হলে ১০ দিয়ে ভাগ, নাহলে ১ বিয়োগ।',
    dryRunSteps: [
      { step: 1, state: 'n=512, k=4', memoryOrStack: '512->511->510->51->50', note: 'Output: 50' },
      { step: 2, state: 'n=1000000000, k=9', memoryOrStack: '9 trailing zeros stripped', note: 'Output: 1' },
    ],
    solveJs(stdin) {
      let [n, k] = stdin.trim().split(/\s+/).map(Number);
      while (k-- > 0) n = n % 10 === 0 ? Math.floor(n / 10) : n - 1;
      return String(n);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['512 4', '1000000000 9'];
      const hiddenInputs = ['2 1', '10 1', '19 10', '999999999 45'];
      for (let i = 0; i < 6; i++) {
        const n = randInt(rng, 1000, 999999999);
        const k = randInt(rng, 1, 20);
        hiddenInputs.push(`${n} ${k}`);
      }
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    long long n; int k; scanf("%lld %d", &n, &k);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n; int k; cin >> n >> k;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nn, k = map(int, sys.stdin.read().split())\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong(); int k = sc.nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nlet [n, k] = raw.trim().split(/\\s+/).map(Number);\n`,
      typescript: `import * as fs from 'fs';\nconst d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    long long n; int k;
    if (scanf("%lld %d", &n, &k) != 2) return 0;
    while (k--) n = (n % 10 == 0) ? (n / 10) : (n - 1);
    printf("%lld\\n", n);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    long long n; int k; cin >> n >> k;
    while (k--) n = (n % 10 == 0) ? (n / 10) : (n - 1);
    cout << n << '\\n';
    return 0;
}`,
      python: `import sys
n, k = map(int, sys.stdin.read().split())
for _ in range(k):
    n = n // 10 if n % 10 == 0 else n - 1
print(n)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong(); int k = sc.nextInt();
        while (k-- > 0) n = (n % 10 == 0) ? (n / 10) : (n - 1);
        System.out.println(n);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let [n, k] = raw.trim().split(/\\s+/).map(Number);
while (k-- > 0) n = n % 10 === 0 ? Math.floor(n / 10) : n - 1;
console.log(n);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let n: number = d[0], k: number = d[1];
while (k-- > 0) n = n % 10 === 0 ? Math.floor(n / 10) : n - 1;
console.log(n);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (mut n, k) = (d[0], d[1]);
    for _ in 0..k { n = if n % 10 == 0 { n / 10 } else { n - 1 }; }
    println!("{}", n);
}`,
    },
  },

  constructive_perm_diff: {
    id: 'constructive_perm_diff',
    defaultTopic: 'Constructive Algorithms',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n!)',
    betterComplexity: 'O(n^2)',
    inputFormat: 'Single integer n (1 <= n <= 10^5).',
    outputFormat: 'Print a valid permutation of 1..n where no two adjacent numbers differ by 1 (evens ascending then odds ascending), or NO SOLUTION if impossible.',
    constraints: ['1 <= n <= 10^5', 'Print NO SOLUTION when n is 2 or 3.'],
    hints: [
      'Check small values n = 1, 2, 3, 4 by hand.',
      'Putting all even numbers first (2, 4, ...) and then all odd numbers (1, 3, ...) guarantees adjacent differences >= 2 within each group.',
      'At the boundary between last even and 1, for n >= 4 the last even is >= 4 so |last_even - 1| >= 3!',
    ],
    bruteIntuition: 'Generate permutations with backtracking until one has no |a[i] - a[i+1]| == 1.',
    bruteBangla: 'সব পারমিউটেশন তৈরি করে কোনটিতে পাশাপাশি পার্থক্য ১ নয় তা খোঁজা।',
    bruteWhyTle: 'O(n!) explodes already at n = 12.',
    brutePseudo: 'backtrack all permutations of 1..n',
    betterIntuition: 'Greedily interleave numbers starting from odd/even alternating picks.',
    betterBangla: 'জোড় ও বিজোড় সংখ্যা পর্যায়ক্রমে সাজানোর চেষ্টা করা।',
    betterTradeoff: 'Complex boundary checks compared to two simple arithmetic loops.',
    betterPseudo: 'interleave(1..n) and check adjacent diffs',
    optimalIntuition: 'For n == 2 or 3 print NO SOLUTION; otherwise print all evens 2, 4, ... followed by all odds 1, 3, ...',
    optimalBangla: 'n = ২ বা ৩ হলে NO SOLUTION; বাকি ক্ষেত্রে প্রথমে সব জোড় (২, ৪, ...) তারপর সব বিজোড় (১, ৩, ...) প্রিন্ট করো।',
    optimalWhyWins: 'O(n) streaming output, zero auxiliary arrays needed.',
    optimalPseudo: 'if n in {2,3}: NO SOLUTION else print evens 2..n then odds 1..n',
    banglaEditorial: 'সব জোড় সংখ্যা আগে এবং সব বিজোড় সংখ্যা পরে রাখলে পাশাপাশি কোনো দুটি সংখ্যার পার্থক্য ১ হতে পারে না (n >= 4 এর জন্য)।',
    dryRunSteps: [
      { step: 1, state: 'n = 3', memoryOrStack: 'n in {2, 3}', note: 'Output NO SOLUTION' },
      { step: 2, state: 'n = 5', memoryOrStack: 'evens: 2 4, odds: 1 3 5', note: '|4-1| = 3 >= 2 -> valid' },
    ],
    solveJs(stdin) {
      const n = Number(stdin.trim());
      if (n === 2 || n === 3) return 'NO SOLUTION';
      const out: number[] = [];
      for (let i = 2; i <= n; i += 2) out.push(i);
      for (let i = 1; i <= n; i += 2) out.push(i);
      return out.join(' ');
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const sampleInputs = ['5', '3'];
      const hiddenInputs = ['1', '2', '4', '6', '7', '10', '25'];
      for (let k = 0; k < 3; k++) hiddenInputs.push(String(randInt(rng, 12, 80)));
      return { sampleInputs, hiddenInputs };
    },
    starterTemplates: makeStarter({
      c: `#include <stdio.h>\nint main(void) {\n    int n; scanf("%d", &n);\n    // Write your solution\n    return 0;\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    // Write your solution\n    return 0;\n}`,
      python: `import sys\nn = int(sys.stdin.read().strip())\n# Write your solution\n`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n    }\n}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\n`,
      typescript: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\n`,
      rust: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}`,
    }),
    solutions: {
      c: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    if (n == 2 || n == 3) { printf("NO SOLUTION\\n"); return 0; }
    int first = 1;
    for (int i = 2; i <= n; i += 2) { printf("%s%d", first ? "" : " ", i); first = 0; }
    for (int i = 1; i <= n; i += 2) { printf("%s%d", first ? "" : " ", i); first = 0; }
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    if (n == 2 || n == 3) { cout << "NO SOLUTION\\n"; return 0; }
    bool first = true;
    for (int i = 2; i <= n; i += 2) { if (!first) cout << ' '; cout << i; first = false; }
    for (int i = 1; i <= n; i += 2) { if (!first) cout << ' '; cout << i; first = false; }
    cout << '\\n';
    return 0;
}`,
      python: `import sys
n = int(sys.stdin.read().strip())
if n in (2, 3):
    print("NO SOLUTION")
else:
    print(" ".join(map(str, list(range(2, n + 1, 2)) + list(range(1, n + 1, 2)))))`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        if (n == 2 || n == 3) { System.out.println("NO SOLUTION"); return; }
        StringBuilder sb = new StringBuilder();
        for (int i = 2; i <= n; i += 2) sb.append(i).append(' ');
        for (int i = 1; i <= n; i += 2) sb.append(i).append(' ');
        System.out.println(sb.toString().trim());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
if (n === 2 || n === 3) console.log('NO SOLUTION');
else {
  const out = [];
  for (let i = 2; i <= n; i += 2) out.push(i);
  for (let i = 1; i <= n; i += 2) out.push(i);
  console.log(out.join(' '));
}`,
      typescript: `import * as fs from 'fs';
const n: number = Number(fs.readFileSync(0, 'utf8').trim());
if (n === 2 || n === 3) console.log('NO SOLUTION');
else {
  const out: number[] = [];
  for (let i = 2; i <= n; i += 2) out.push(i);
  for (let i = 1; i <= n; i += 2) out.push(i);
  console.log(out.join(' '));
}`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap();
    if n == 2 || n == 3 { println!("NO SOLUTION"); return; }
    let mut out: Vec<String> = Vec::with_capacity(n);
    for i in (2..=n).step_by(2) { out.push(i.to_string()); }
    for i in (1..=n).step_by(2) { out.push(i.to_string()); }
    println!("{}", out.join(" "));
}`,
    },
  },

  matrix_diagonal_sum: {
    id: 'matrix_diagonal_sum',
    defaultTopic: 'Implementation',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    bruteComplexity: 'O(n^2)',
    betterComplexity: 'O(n^2)',
    inputFormat: 'First line: integer n (1 <= n <= 200). Next n lines each contain n integers.',
    outputFormat: 'Single integer: sum of primary and secondary diagonal elements without double-counting the center.',
    constraints: ['1 <= n <= 200', '-10^6 <= grid[i][j] <= 10^6'],
    hints: [
      'Primary diagonal cells satisfy i == j.',
      'Secondary diagonal cells satisfy i + j == n - 1.',
      'Do not double-count the center cell when n is odd.',
    ],
    bruteIntuition: 'Store matrix, sum primary diagonal, sum secondary diagonal, subtract center if n is odd.',
    bruteBangla: 'ম্যাট্রিক্স সেভ করে দুই কর্ণের যোগফল নিয়ে মাঝের ঘর বিয়োগ করা।',
    bruteWhyTle: 'Allocates O(n^2) grid memory unnecessarily.',
    brutePseudo: 'sum primary + secondary; if n%2==1 subtract mat[n/2][n/2]',
    betterIntuition: 'Stream elements and track visited flags.',
    betterBangla: 'ভিজিটেড অ্যারে রেখে ডায়াগোনাল যোগ করা।',
    betterTradeoff: 'Uses extra boolean matrix.',
    betterPseudo: 'if (i==j || i+j==n-1) sum += val',
    optimalIntuition: 'Stream row-by-row and add each element iff i == j || i + j == n - 1 in O(1) extra space.',
    optimalBangla: 'কোনো ম্যাট্রিক্স সেভ না করেই i == j অথবা i + j == n - 1 শর্তে যোগ করলে O(1) স্পেসেই উত্তর আসে।',
    optimalWhyWins: 'Zero matrix allocation; single linear scan of input.',
    optimalPseudo: 'for i in 0..n: for j in 0..n: if i==j || i+j==n-1: ans += val',
    banglaEditorial: 'প্রতিটি ঘর (i, j) পড়ার সময় i == j অথবা i + j == n - 1 হলেই যোগ করে দিলে কেন্দ্রের ঘর স্বয়ংক্রিয়ভাবে একবারই যুক্ত হয়।',
    dryRunSteps: [
      { step: 1, state: '3x3 matrix', memoryOrStack: '(0,0)+(0,2)+(1,1)+(2,0)+(2,2)', note: 'Center (1,1) added once' },
    ],
    solveJs(stdin) {
      const d = stdin.trim().split(/\s+/).map(Number);
      const n = d[0];
      let sum = 0;
      let idx = 1;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const val = d[idx++];
          if (i === j || i + j === n - 1) sum += val;
        }
      }
      return String(sum);
    },
    generateInputs(seed) {
      const rng = createRng(seed);
      const makeGrid = (n: number) => {
        const rows = Array.from({ length: n }, () =>
          Array.from({ length: n }, () => randInt(rng, -50, 100)).join(' '),
        );
        return `${n}\n${rows.join('\n')}`;
      };
      const sampleInputs = ['3\n1 2 3\n4 5 6\n7 8 9', '2\n1 1\n1 1'];
      const hiddenInputs = ['1\n42', '4\n1 0 0 2\n0 3 4 0\n0 5 6 0\n7 0 0 8'];
      for (let k = 0; k < 8; k++) hiddenInputs.push(makeGrid(randInt(rng, 2, 12)));
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
    long long sum = 0, v;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) { scanf("%lld", &v); if (i == j || i + j == n - 1) sum += v; }
    printf("%lld\\n", sum);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; cin >> n;
    long long sum = 0, v;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) { cin >> v; if (i == j || i + j == n - 1) sum += v; }
    cout << sum << '\\n';
    return 0;
}`,
      python: `import sys
d = list(map(int, sys.stdin.read().split()))
n, idx, ans = d[0], 1, 0
for i in range(n):
    for j in range(n):
        if i == j or i + j == n - 1: ans += d[idx]
        idx += 1
print(ans)`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long sum = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) { long v = sc.nextLong(); if (i == j || i + j == n - 1) sum += v; }
        System.out.println(sum);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const n = d[0];
let sum = 0, idx = 1;
for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = d[idx++]; if (i === j || i + j === n - 1) sum += v; }
console.log(sum);`,
      typescript: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = d[0];
let sum: number = 0, idx: number = 1;
for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v: number = d[idx++]; if (i === j || i + j === n - 1) sum += v; }
console.log(sum);`,
      rust: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = d[0] as usize;
    let mut sum = 0i64;
    for i in 0..n { for j in 0..n { if i == j || i + j == n - 1 { sum += d[1 + i * n + j]; } } }
    println!("{}", sum);
}`,
    },
  },
};
