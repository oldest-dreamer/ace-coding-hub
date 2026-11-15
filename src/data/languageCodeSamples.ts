import type { DryRunRow, LanguageId, TestCase } from '../types/academy';

export interface ChapterRunnableSpec {
  asciiDiagram: string;
  dryRunTable: DryRunRow[];
  starterCode: Record<LanguageId, string>;
  sampleStdin: string;
  expectedSampleOutput: string;
  testCases: TestCase[];
}

export const CHAPTER_SPECS: Record<number, ChapterRunnableSpec> = {
  1: {
    asciiDiagram: `+-------------+      stdin (fd 0)      +------------------+      stdout (fd 1)      +--------------+
| Input Pipe  |  =================>   |  Program Main()  |  ==================>   | Output Stream|
| "Argon 42"  |                       |  Parse & Format  |                        | "Hello..."   |
+-------------+                       +------------------+                        +--------------+`,
    dryRunTable: [
      { step: 1, state: 'Process starts', memoryOrStack: 'stdin buffer loaded', note: 'OS binds fd 0 and fd 1' },
      { step: 2, state: 'Read name & score', memoryOrStack: 'name="Argon", n=42', note: 'Tokenizer skips whitespace' },
      { step: 3, state: 'Write formatted line', memoryOrStack: 'stdout flushed', note: 'Outputs Welcome, Argon! Score: 84' },
    ],
    sampleStdin: 'Argon 42',
    expectedSampleOutput: 'Welcome, Argon! Score: 84',
    testCases: [
      { id: 'c1-t1', input: 'Argon 42', expectedOutput: 'Welcome, Argon! Score: 84' },
      { id: 'c1-t2', input: 'Dhaka 10', expectedOutput: 'Welcome, Dhaka! Score: 20', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    char name[64];
    int score = 0;
    if (scanf("%63s %d", name, &score) == 2) {
        printf("Welcome, %s! Score: %d\\n", name, score * 2);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string name;
    int score = 0;
    if (cin >> name >> score) {
        cout << "Welcome, " << name << "! Score: " << (score * 2) << "\\n";
    }
    return 0;
}`,
      python: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 2:
    name = parts[0]
    score = int(parts[1])
    print(f"Welcome, {name}! Score: {score * 2}")`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String name = sc.next();
            int score = sc.nextInt();
            System.out.println("Welcome, " + name + "! Score: " + (score * 2));
        }
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, scoreStr] = raw.trim().split(/\\s+/);
if (name && scoreStr) {
  console.log(\`Welcome, \${name}! Score: \${Number(scoreStr) * 2}\`);
}`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    if let (Some(name), Some(s)) = (it.next(), it.next()) {
        let score: i32 = s.parse().unwrap_or(0);
        println!("Welcome, {}! Score: {}", name, score * 2);
    }
}`,
      typescript: `import * as fs from 'fs';

const raw = fs.readFileSync(0, 'utf8').trim();
const [name, scoreStr] = raw.split(/\\s+/);
if (name && scoreStr) {
  const score: number = Number(scoreStr);
  console.log(\`Welcome, \${name}! Score: \${score * 2}\`);
}`,
      html: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    .card { max-width: 420px; border: 1px solid #334155; border-radius: 12px; padding: 20px; background: #1e293b; }
    h1 { margin: 0 0 8px; font-size: 20px; color: #38bdf8; }
    p { margin: 0; color: #cbd5e1; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Architecture & Live DOM Stream</h1>
    <p>Welcome, Argon! Score: <strong>84</strong></p>
  </main>
</body>
</html>`,
    },
  },

  2: {
    asciiDiagram: `Stack Frame (64-bit aligned)
+---------------------+--------------------+
| int32  a = 100000   | 4 bytes (0x7ff0)   |
| int64  prod = a * b | 8 bytes (0x7ff8)   |  <-- Prevents 32-bit overflow!
+---------------------+--------------------+`,
    dryRunTable: [
      { step: 1, state: 'Read a=100000, b=100000', memoryOrStack: 'a: i64, b: i64', note: 'Promote before multiplication' },
      { step: 2, state: 'Compute product', memoryOrStack: 'prod = 10000000000', note: 'Exceeds 32-bit max (2.14e9)' },
      { step: 3, state: 'Print 64-bit result', memoryOrStack: 'stdout', note: 'Outputs 10000000000 safely' },
    ],
    sampleStdin: '100000 100000',
    expectedSampleOutput: '10000000000',
    testCases: [
      { id: 'c2-t1', input: '100000 100000', expectedOutput: '10000000000' },
      { id: 'c2-t2', input: '250000 40000', expectedOutput: '10000000000', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) == 2) {
        printf("%lld\\n", a * b);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << (a * b) << "\\n";
    }
    return 0;
}`,
      python: `import sys
a, b = map(int, sys.stdin.read().split())
print(a * b)`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(a * b);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/).map(BigInt);
console.log((a * b).toString());`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    println!("{}", nums[0] * nums[1]);
}`,
      typescript: `import * as fs from 'fs';

const [a, b]: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);
console.log((a * b).toString());`,
      html: `<!doctype html>
<html><body style="font-family:monospace;background:#090d16;color:#e2e8f0;padding:24px;">
  <h2>64-Bit Memory Box Inspector</h2>
  <p>32-bit max: 2,147,483,647</p>
  <p style="color:#34d399">64-bit safe product (100000 × 100000): <strong id="out"></strong></p>
  <script>document.getElementById('out').textContent = (100000n * 100000n).toString();</script>
</body></html>`,
    },
  },

  3: {
    asciiDiagram: `n = 13 (binary: 0000 1101)
          & 1 (binary: 0000 0001)
          -----------------------
               0000 0001  ==>  ODD (1 CPU cycle!)`,
    dryRunTable: [
      { step: 1, state: 'Input n = 13', memoryOrStack: 'bin = 1101', note: 'LSB is 1' },
      { step: 2, state: 'Check (n & 1)', memoryOrStack: '13 & 1 = 1', note: 'Non-zero -> ODD' },
      { step: 3, state: 'Check (n >> 1)', memoryOrStack: '13 >> 1 = 6', note: 'Integer floor division by 2' },
    ],
    sampleStdin: '13',
    expectedSampleOutput: 'ODD 6',
    testCases: [
      { id: 'c3-t1', input: '13', expectedOutput: 'ODD 6' },
      { id: 'c3-t2', input: '24', expectedOutput: 'EVEN 12', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        printf("%s %d\\n", (n & 1) ? "ODD" : "EVEN", n >> 1);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        cout << ((n & 1) ? "ODD" : "EVEN") << " " << (n >> 1) << "\\n";
    }
    return 0;
}`,
      python: `import sys
n = int(sys.stdin.read().strip())
print("ODD" if (n & 1) else "EVEN", n >> 1)`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        System.out.println(((n & 1) == 1 ? "ODD" : "EVEN") + " " + (n >> 1));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
console.log(\`\${(n & 1) ? 'ODD' : 'EVEN'} \${n >> 1}\`);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i32 = s.trim().parse().unwrap();
    let kind = if (n & 1) == 1 { "ODD" } else { "EVEN" };
    println!("{} {}", kind, n >> 1);
}`,
      typescript: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
const parity: 'ODD' | 'EVEN' = (n & 1) ? 'ODD' : 'EVEN';
console.log(\`\${parity} \${n >> 1}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Bitwise Parity Checker</h3>
  <input id="num" type="number" value="13" style="padding:6px;border-radius:6px;background:#1e293b;color:#fff;border:1px solid #334155"/>
  <p id="res" style="margin-top:12px;color:#38bdf8;font-family:monospace"></p>
  <script>
    const inp = document.getElementById('num');
    const res = document.getElementById('res');
    const update = () => {
      const n = Number(inp.value || 0);
      res.textContent = ((n & 1) ? 'ODD ' : 'EVEN ') + (n >> 1);
    };
    inp.addEventListener('input', update);
    update();
  </script>
</body></html>`,
    },
  },

  4: {
    asciiDiagram: `n = 5 -> Sum 1..n in O(n) loop vs O(1) Gauss
Loop:  i=1(+1) -> i=2(+2) -> i=3(+3) -> i=4(+4) -> i=5(+5) = 15
Cache: [1][2][3][4][5] sequential prefetch -> 100% L1 hit`,
    dryRunTable: [
      { step: 1, state: 'Init acc=0, i=1', memoryOrStack: 'acc=0', note: 'Invariant: acc = sum(1..i-1)' },
      { step: 2, state: 'Loop i=1..5', memoryOrStack: 'acc=1,3,6,10,15', note: 'Linear O(n) single pass' },
      { step: 3, state: 'Terminate i=6', memoryOrStack: 'acc=15', note: 'Print 15' },
    ],
    sampleStdin: '5\n10 20 30 40 50',
    expectedSampleOutput: '150',
    testCases: [
      { id: 'c4-t1', input: '5\n10 20 30 40 50', expectedOutput: '150' },
      { id: 'c4-t2', input: '3\n7 8 9', expectedOutput: '24', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long sum = 0, x;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &x);
        sum += x;
    }
    printf("%lld\\n", sum);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sum = 0, x;
    for (int i = 0; i < n; i++) {
        cin >> x;
        sum += x;
    }
    cout << sum << "\\n";
    return 0;
}`,
      python: `import sys
tokens = list(map(int, sys.stdin.read().split()))
n = tokens[0]
print(sum(tokens[1:1 + n]))`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long sum = 0;
        for (int i = 0; i < n; i++) sum += sc.nextLong();
        System.out.println(sum);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0];
let sum = 0;
for (let i = 1; i <= n; i++) sum += nums[i];
console.log(sum);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums[0] as usize;
    let sum: i64 = nums[1..=n].iter().sum();
    println!("{}", sum);
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0];
let total = 0;
for (let i = 1; i <= n; i++) total += nums[i];
console.log(total);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>O(n) Linear Accumulator Trace</h3>
  <ul id="trace" style="font-family:monospace;color:#34d399"></ul>
  <script>
    const arr = [10, 20, 30, 40, 50];
    let sum = 0;
    const ul = document.getElementById('trace');
    arr.forEach((v, idx) => {
      sum += v;
      const li = document.createElement('li');
      li.textContent = \`i=\${idx} (+ \${v}) => sum=\${sum}\`;
      ul.appendChild(li);
    });
  </script>
</body></html>`,
    },
  },

  5: {
    asciiDiagram: `Call Stack (Merger Project 1: Recursive GCD + Fast Power)
+-----------------------------------+
| gcd(12, 18) -> calls gcd(18, 12)  |
|   gcd(18, 12) -> calls gcd(12, 6) |
|     gcd(12, 6) -> calls gcd(6, 0) |
|       gcd(6, 0) => Base Case: 6!  |
+-----------------------------------+`,
    dryRunTable: [
      { step: 1, state: 'gcd(12, 18)', memoryOrStack: 'frame #1', note: 'b != 0 -> recurse (18, 12%18)' },
      { step: 2, state: 'gcd(18, 12)', memoryOrStack: 'frame #2', note: 'recurse (12, 6)' },
      { step: 3, state: 'gcd(6, 0) + pow(2,5)', memoryOrStack: 'base=6, pow=32', note: 'Outputs 6 32' },
    ],
    sampleStdin: '12 18 2 5',
    expectedSampleOutput: '6 32',
    testCases: [
      { id: 'c5-t1', input: '12 18 2 5', expectedOutput: '6 32' },
      { id: 'c5-t2', input: '21 14 3 4', expectedOutput: '7 81', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long fast_pow(long long base, long long exp) {
    long long res = 1;
    while (exp > 0) {
        if (exp & 1) res *= base;
        base *= base;
        exp >>= 1;
    }
    return res;
}

int main(void) {
    long long a, b, base, exp;
    if (scanf("%lld %lld %lld %lld", &a, &b, &base, &exp) == 4) {
        printf("%lld %lld\\n", gcd(a, b), fast_pow(base, exp));
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long fastPow(long long base, long long exp) {
    long long res = 1;
    while (exp > 0) {
        if (exp & 1) res *= base;
        base *= base;
        exp >>= 1;
    }
    return res;
}

int main() {
    long long a, b, base, exp;
    if (cin >> a >> b >> base >> exp) {
        cout << gcd(a, b) << " " << fastPow(base, exp) << "\\n";
    }
    return 0;
}`,
      python: `import sys

def gcd(a: int, b: int) -> int:
    return a if b == 0 else gcd(b, a % b)

def fast_pow(base: int, exp: int) -> int:
    res = 1
    while exp > 0:
        if exp & 1:
            res *= base
        base *= base
        exp >>= 1
    return res

a, b, base, exp = map(int, sys.stdin.read().split())
print(gcd(a, b), fast_pow(base, exp))`,
      java: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    static long fastPow(long base, long exp) {
        long res = 1;
        while (exp > 0) {
            if ((exp & 1) == 1) res *= base;
            base *= base;
            exp >>= 1;
        }
        return res;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong(), b = sc.nextLong(), base = sc.nextLong(), exp = sc.nextLong();
        System.out.println(gcd(a, b) + " " + fastPow(base, exp));
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b, base, exp] = raw.trim().split(/\\s+/).map(Number);

function gcd(x, y) { return y === 0 ? x : gcd(y, x % y); }
function fastPow(x, e) {
  let res = 1;
  while (e > 0) {
    if (e & 1) res *= x;
    x *= x;
    e >>= 1;
  }
  return res;
}
console.log(\`\${gcd(a, b)} \${fastPow(base, exp)}\`);`,
      rust: `use std::io::{self, Read};

fn gcd(a: i64, b: i64) -> i64 { if b == 0 { a } else { gcd(b, a % b) } }
fn fast_pow(mut base: i64, mut exp: i64) -> i64 {
    let mut res = 1;
    while exp > 0 {
        if (exp & 1) == 1 { res *= base; }
        base *= base;
        exp >>= 1;
    }
    res
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    println!("{} {}", gcd(v[0], v[1]), fast_pow(v[2], v[3]));
}`,
      typescript: `import * as fs from 'fs';

const [a, b, base, exp] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const fastPow = (x: number, e: number): number => {
  let res = 1;
  while (e > 0) {
    if (e & 1) res *= x;
    x *= x;
    e >>= 1;
  }
  return res;
};
console.log(\`\${gcd(a, b)} \${fastPow(base, exp)}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h2>Merger Project 1: Math & Recursion Toolkit</h2>
  <p style="color:#94a3b8">Combines Ch 1 (I/O), Ch 2 (Types), Ch 3 (Bitwise), Ch 4 (Loops), Ch 5 (Recursion)</p>
  <div id="out" style="margin-top:12px;padding:12px;border:1px solid #334155;border-radius:8px;font-family:monospace;color:#38bdf8"></div>
  <script>
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const fastPow = (b, e) => { let r = 1; while (e > 0) { if (e & 1) r *= b; b *= b; e >>= 1; } return r; };
    document.getElementById('out').textContent = \`GCD(12, 18) = \${gcd(12, 18)} | FastPow(2, 5) = \${fastPow(2, 5)}\`;
  </script>
</body></html>`,
    },
  },

  6: {
    asciiDiagram: `Sorted Array Two-Pointers (Target = 13)
Index:   0     1     2     3     4
Array: [ 2,    5,    7,   11,   15 ]
         ^                       ^
        left                   right  (2+15=17 > 13 -> right--)`,
    dryRunTable: [
      { step: 1, state: 'l=0, r=4 (2+15=17)', memoryOrStack: '17 > 13', note: 'Sum too big, decrement r' },
      { step: 2, state: 'l=0, r=3 (2+11=13)', memoryOrStack: '13 == 13', note: 'Match found in O(n)!' },
      { step: 3, state: 'Return indices', memoryOrStack: '0 3', note: 'Zero extra hash memory' },
    ],
    sampleStdin: '5 13\n2 5 7 11 15',
    expectedSampleOutput: '0 3',
    testCases: [
      { id: 'c6-t1', input: '5 13\n2 5 7 11 15', expectedOutput: '0 3' },
      { id: 'c6-t2', input: '4 9\n1 3 6 10', expectedOutput: '1 2', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, target;
    if (scanf("%d %d", &n, &target) != 2) return 0;
    int *a = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int l = 0, r = n - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) { printf("%d %d\\n", l, r); break; }
        if (s < target) l++; else r--;
    }
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, r = n - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) { cout << l << " " << r << "\\n"; break; }
        if (s < target) l++; else r--;
    }
    return 0;
}`,
      python: `import sys
nums = list(map(int, sys.stdin.read().split()))
n, target = nums[0], nums[1]
arr = nums[2:2 + n]
l, r = 0, n - 1
while l < r:
    s = arr[l] + arr[r]
    if s == target:
        print(l, r)
        break
    if s < target:
        l += 1
    else:
        r -= 1`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), target = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int l = 0, r = n - 1;
        while (l < r) {
            int s = a[l] + a[r];
            if (s == target) { System.out.println(l + " " + r); break; }
            if (s < target) l++; else r--;
        }
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const [n, target] = nums;
const a = nums.slice(2, 2 + n);
let l = 0, r = n - 1;
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) { console.log(\`\${l} \${r}\`); break; }
  if (s < target) l++; else r--;
}`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (v[0] as usize, v[1]);
    let a = &v[2..2 + n];
    let (mut l, mut r) = (0usize, n - 1);
    while l < r {
        let sum = a[l] + a[r];
        if sum == target { println!("{} {}", l, r); break; }
        if sum < target { l += 1; } else { r -= 1; }
    }
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, target] = nums;
const a = nums.slice(2, 2 + n);
let l = 0, r = n - 1;
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) { console.log(\`\${l} \${r}\`); break; }
  if (s < target) l++; else r--;
}`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Two-Pointer Visualizer</h3>
  <p>Array: [2, 5, 7, 11, 15] · Target: 13</p>
  <p style="color:#34d399;font-family:monospace">Match indices: 0 and 3 (2 + 11 = 13)</p>
</body></html>`,
    },
  },

  7: {
    asciiDiagram: `Indirection / Ownership / Reference Model
+------------+       addr: 0x1040       +--------------------+
| ptr / &mut | ---------------------->  |  [10, 20] in RAM   |
+------------+   Swap in-place (O(1))   +--------------------+`,
    dryRunTable: [
      { step: 1, state: 'Before swap', memoryOrStack: 'a=10, b=20', note: 'Pass addresses / mutable ref' },
      { step: 2, state: 'Mutate via reference', memoryOrStack: 'tmp=10, *a=20, *b=10', note: 'Zero array copy' },
      { step: 3, state: 'After swap', memoryOrStack: '20 10', note: 'Caller sees updated values' },
    ],
    sampleStdin: '10 20',
    expectedSampleOutput: '20 10',
    testCases: [
      { id: 'c7-t1', input: '10 20', expectedOutput: '20 10' },
      { id: 'c7-t2', input: '-5 99', expectedOutput: '99 -5', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

void swap_ptrs(int *x, int *y) {
    int tmp = *x;
    *x = *y;
    *y = tmp;
}

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) == 2) {
        swap_ptrs(&a, &b);
        printf("%d %d\\n", a, b);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

void swapRef(int &x, int &y) {
    int tmp = x;
    x = y;
    y = tmp;
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        swapRef(a, b);
        cout << a << " " << b << "\\n";
    }
    return 0;
}`,
      python: `import sys

def swap_in_list(box: list[int]) -> None:
    box[0], box[1] = box[1], box[0]

a, b = map(int, sys.stdin.read().split())
pair = [a, b]
swap_in_list(pair)
print(pair[0], pair[1])`,
      java: `import java.util.Scanner;

public class Main {
    static void swapBox(int[] box) {
        int tmp = box[0];
        box[0] = box[1];
        box[1] = tmp;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] pair = { sc.nextInt(), sc.nextInt() };
        swapBox(pair);
        System.out.println(pair[0] + " " + pair[1]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const box = raw.trim().split(/\\s+/).map(Number);
function swapRef(ref) { [ref[0], ref[1]] = [ref[1], ref[0]]; }
swapRef(box);
console.log(\`\${box[0]} \${box[1]}\`);`,
      rust: `use std::io::{self, Read};

fn swap_borrow(x: &mut i32, y: &mut i32) {
    std::mem::swap(x, y);
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (mut a, mut b) = (v[0], v[1]);
    swap_borrow(&mut a, &mut b);
    println!("{} {}", a, b);
}`,
      typescript: `import * as fs from 'fs';

const box: [number, number] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number) as [number, number];
function swapPair(ref: [number, number]): void {
  [ref[0], ref[1]] = [ref[1], ref[0]];
}
swapPair(box);
console.log(\`\${box[0]} \${box[1]}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Live DOM Node Reference</h3>
  <button id="btn" style="padding:8px 14px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Swap Text Nodes</button>
  <p id="view" style="margin-top:12px;font-family:monospace">20 10</p>
  <script>
    let a = 10, b = 20;
    const view = document.getElementById('view');
    document.getElementById('btn').addEventListener('click', () => {
      [a, b] = [b, a];
      view.textContent = \`\${a} \${b}\`;
    });
  </script>
</body></html>`,
    },
  },

  8: {
    asciiDiagram: `Generic / Interface Contract
+------------------------+       implements       +----------------------+
| interface Scorable<T>  | <====================  | Student(name, score) |
|   getScore(): number   |                        |   rankBoost(+10)     |
+------------------------+                        +----------------------+`,
    dryRunTable: [
      { step: 1, state: 'Construct Player("Rafi", 85)', memoryOrStack: 'Object/Struct', note: 'Encapsulates name & score' },
      { step: 2, state: 'Apply boost(15)', memoryOrStack: 'score = 100', note: 'Method mutates invariant safely' },
      { step: 3, state: 'Format summary', memoryOrStack: 'Rafi:100', note: 'Outputs Rafi:100' },
    ],
    sampleStdin: 'Rafi 85 15',
    expectedSampleOutput: 'Rafi:100',
    testCases: [
      { id: 'c8-t1', input: 'Rafi 85 15', expectedOutput: 'Rafi:100' },
      { id: 'c8-t2', input: 'Nadia 40 25', expectedOutput: 'Nadia:65', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

typedef struct {
    char name[32];
    int score;
} Player;

void boost(Player *p, int delta) { p->score += delta; }

int main(void) {
    Player p;
    int delta = 0;
    if (scanf("%31s %d %d", p.name, &p.score, &delta) == 3) {
        boost(&p, delta);
        printf("%s:%d\\n", p.name, p.score);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

template <typename T>
struct Player {
    string name;
    T score;
    void boost(T delta) { score += delta; }
};

int main() {
    Player<int> p;
    int delta;
    if (cin >> p.name >> p.score >> delta) {
        p.boost(delta);
        cout << p.name << ":" << p.score << "\\n";
    }
    return 0;
}`,
      python: `import sys
from dataclasses import dataclass

@dataclass
class Player:
    name: str
    score: int
    def boost(self, delta: int) -> None:
        self.score += delta

parts = sys.stdin.read().split()
p = Player(parts[0], int(parts[1]))
p.boost(int(parts[2]))
print(f"{p.name}:{p.score}")`,
      java: `import java.util.Scanner;

public class Main {
    static class Player<T extends Number> {
        String name;
        int score;
        Player(String name, int score) { this.name = name; this.score = score; }
        void boost(int delta) { this.score += delta; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Player<Integer> p = new Player<>(sc.next(), sc.nextInt());
        p.boost(sc.nextInt());
        System.out.println(p.name + ":" + p.score);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, s, d] = raw.trim().split(/\\s+/);
class Player {
  constructor(name, score) { this.name = name; this.score = score; }
  boost(delta) { this.score += delta; }
}
const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
      rust: `use std::io::{self, Read};

trait Scorable { fn boost(&mut self, delta: i32); }
struct Player { name: String, score: i32 }
impl Scorable for Player {
    fn boost(&mut self, delta: i32) { self.score += delta; }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let parts: Vec<&str> = s.split_whitespace().collect();
    let mut p = Player { name: parts[0].to_string(), score: parts[1].parse().unwrap() };
    p.boost(parts[2].parse().unwrap());
    println!("{}:{}", p.name, p.score);
}`,
      typescript: `import * as fs from 'fs';

interface Scorable<T> { name: string; score: T; boost(delta: T): void; }
class Player implements Scorable<number> {
  constructor(public name: string, public score: number) {}
  boost(delta: number): void { this.score += delta; }
}
const [name, s, d] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Reusable Component Card</h3>
  <article style="border:1px solid #334155;padding:16px;border-radius:10px;max-width:300px">
    <strong>Player:</strong> Rafi<br/>
    <span style="color:#34d399">Boosted Score: 100</span>
  </article>
</body></html>`,
    },
  },

  9: {
    asciiDiagram: `Standard Library HashMap + Sort Pipeline
Input: [4, 1, 2, 1, 2, 1]
  -> HashMap Count: { 1:3, 2:2, 4:1 }
  -> Sort Unique Keys: [1, 2, 4]`,
    dryRunTable: [
      { step: 1, state: 'Count frequencies', memoryOrStack: 'Map {1:3, 2:2, 4:1}', note: 'O(n) hash table pass' },
      { step: 2, state: 'Find most frequent', memoryOrStack: 'bestKey=1, count=3', note: 'Tie-break by smaller key' },
      { step: 3, state: 'Print result', memoryOrStack: '1 3', note: 'Outputs 1 3' },
    ],
    sampleStdin: '6\n4 1 2 1 2 1',
    expectedSampleOutput: '1 3',
    testCases: [
      { id: 'c9-t1', input: '6\n4 1 2 1 2 1', expectedOutput: '1 3' },
      { id: 'c9-t2', input: '5\n9 9 3 3 5', expectedOutput: '3 2', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *a = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    qsort(a, n, sizeof(int), cmp);
    int best = a[0], best_c = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] == a[i - 1]) cur++;
        else cur = 1;
        if (cur > best_c) { best_c = cur; best = a[i]; }
    }
    printf("%d %d\\n", best, best_c);
    free(a);
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) { cin >> x; freq[x]++; }
    int best = 0, bestC = -1;
    for (auto &[k, v] : freq) {
        if (v > bestC) { bestC = v; best = k; }
    }
    cout << best << " " << bestC << "\\n";
    return 0;
}`,
      python: `import sys
from collections import Counter

nums = list(map(int, sys.stdin.read().split()))
counts = Counter(nums[1:1 + nums[0]])
best_k, best_v = min(counts.items(), key=lambda kv: (-kv[1], kv[0]))
print(best_k, best_v)`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, Integer> freq = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            freq.put(x, freq.getOrDefault(x, 0) + 1);
        }
        int best = 0, bestC = -1;
        for (var e : freq.entrySet()) {
            if (e.getValue() > bestC) { bestC = e.getValue(); best = e.getKey(); }
        }
        System.out.println(best + " " + bestC);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const freq = new Map();
for (let i = 1; i <= nums[0]; i++) freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
const [[bestK, bestV]] = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
console.log(\`\${bestK} \${bestV}\`);`,
      rust: `use std::collections::BTreeMap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut freq = BTreeMap::new();
    for &x in &nums[1..=nums[0] as usize] {
        *freq.entry(x).or_insert(0) += 1;
    }
    let (mut best, mut best_c) = (0, -1);
    for (k, c) in freq {
        if c > best_c { best_c = c; best = k; }
    }
    println!("{} {}", best, best_c);
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const freq = new Map<number, number>();
for (let i = 1; i <= nums[0]; i++) freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1);
const [[bestK, bestV]] = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
console.log(\`\${bestK} \${bestV}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Collections & Frequency Leaderboard</h3>
  <pre style="color:#38bdf8">Input: [4, 1, 2, 1, 2, 1]\nWinner: 1 (3 times)</pre>
</body></html>`,
    },
  },

  10: {
    asciiDiagram: `Merger Project 2 Pipeline (Ch 6-10)
[Raw Records] -> [Validate/Error Check] -> [HashMap Aggregate] -> [Sort Top-K] -> [Report]`,
    dryRunTable: [
      { step: 1, state: 'Parse 4 score records', memoryOrStack: 'alice:30, bob:50', note: 'Aggregates repeated users' },
      { step: 2, state: 'Sort desc by score, asc by name', memoryOrStack: '[bob:50, alice:30]', note: 'Deterministic tie-break' },
      { step: 3, state: 'Print Top Leader', memoryOrStack: 'bob 50', note: 'Safe against malformed rows' },
    ],
    sampleStdin: '3\nalice 20\nbob 50\nalice 15',
    expectedSampleOutput: 'bob 50',
    testCases: [
      { id: 'c10-t1', input: '3\nalice 20\nbob 50\nalice 15', expectedOutput: 'bob 50' },
      { id: 'c10-t2', input: '3\nzara 10\namir 25\nzara 20', expectedOutput: 'zara 30', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct { char name[32]; int total; } Entry;

int main(void) {
    int n, count = 0;
    if (scanf("%d", &n) != 1) return 0;
    Entry list[100];
    for (int i = 0; i < n; i++) {
        char name[32]; int val;
        scanf("%31s %d", name, &val);
        int found = -1;
        for (int j = 0; j < count; j++) if (strcmp(list[j].name, name) == 0) found = j;
        if (found >= 0) list[found].total += val;
        else { strcpy(list[count].name, name); list[count].total = val; count++; }
    }
    int best = 0;
    for (int i = 1; i < count; i++) {
        if (list[i].total > list[best].total || (list[i].total == list[best].total && strcmp(list[i].name, list[best].name) < 0))
            best = i;
    }
    printf("%s %d\\n", list[best].name, list[best].total);
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n, val;
    string name;
    cin >> n;
    map<string, int> totals;
    for (int i = 0; i < n; i++) { cin >> name >> val; totals[name] += val; }
    string bestName;
    int bestScore = -1;
    for (auto &[k, v] : totals) {
        if (v > bestScore) { bestScore = v; bestName = k; }
    }
    cout << bestName << " " << bestScore << "\\n";
    return 0;
}`,
      python: `import sys
from collections import defaultdict

lines = sys.stdin.read().strip().splitlines()
n = int(lines[0])
totals = defaultdict(int)
for line in lines[1:1 + n]:
    name, score = line.split()
    totals[name] += int(score)
winner, score = min(totals.items(), key=lambda kv: (-kv[1], kv[0]))
print(winner, score)`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<String, Integer> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            String name = sc.next();
            int val = sc.nextInt();
            map.put(name, map.getOrDefault(name, 0) + val);
        }
        String best = ""; int bestScore = -1;
        for (var e : map.entrySet()) {
            if (e.getValue() > bestScore) { bestScore = e.getValue(); best = e.getKey(); }
        }
        System.out.println(best + " " + bestScore);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const totals = new Map();
for (let i = 1; i <= n; i++) {
  const [name, s] = lines[i].trim().split(/\\s+/);
  totals.set(name, (totals.get(name) || 0) + Number(s));
}
const [[winner, score]] = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`\${winner} \${score}\`);`,
      rust: `use std::collections::BTreeMap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut totals = BTreeMap::new();
    for _ in 0..n {
        let name = it.next().unwrap().to_string();
        let val: i32 = it.next().unwrap().parse().unwrap();
        *totals.entry(name).or_insert(0) += val;
    }
    let (mut best_name, mut best_val) = (String::new(), -1);
    for (k, v) in totals {
        if v > best_val { best_val = v; best_name = k; }
    }
    println!("{} {}", best_name, best_val);
}`,
      typescript: `import * as fs from 'fs';

const lines = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const totals = new Map<string, number>();
for (let i = 1; i <= n; i++) {
  const [name, s] = lines[i].trim().split(/\\s+/);
  totals.set(name, (totals.get(name) ?? 0) + Number(s));
}
const [[winner, score]] = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`\${winner} \${score}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h2>Merger Project 2: Top-K Leaderboard</h2>
  <p style="color:#34d399;font-family:monospace">Leader: bob (50 pts)</p>
</body></html>`,
    },
  },

  11: {
    asciiDiagram: `Process Virtual Address Space
+-------------------------+  High Addr (0x7fff...)
|   STACK (grows down)    |  <- Local variables, return addrs
|           |             |
|           v             |
|           ^             |
|           |             |
|   HEAP  (grows up)      |  <- Dynamic Vec / malloc / Objects
+-------------------------+  Low Addr`,
    dryRunTable: [
      { step: 1, state: 'Allocate n-item buffer on Heap', memoryOrStack: 'heap ptr -> [1..n]', note: 'Safe even when n = 1,000,000' },
      { step: 2, state: 'Compute prefix sums', memoryOrStack: 'pref[i] = pref[i-1] + a[i]', note: 'In-place or linear heap pass' },
      { step: 3, state: 'Free / RAII drop', memoryOrStack: '0 leaked bytes', note: 'Clean exit' },
    ],
    sampleStdin: '4\n3 1 4 2',
    expectedSampleOutput: '3 4 8 10',
    testCases: [
      { id: 'c11-t1', input: '4\n3 1 4 2', expectedOutput: '3 4 8 10' },
      { id: 'c11-t2', input: '3\n5 5 5', expectedOutput: '5 10 15', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long *pref = calloc(n, sizeof(long long));
    long long run = 0;
    for (int i = 0; i < n; i++) {
        long long x; scanf("%lld", &x);
        run += x;
        pref[i] = run;
        printf("%lld%s", pref[i], i + 1 == n ? "\\n" : " ");
    }
    free(pref);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> pref(n);
    long long run = 0, x;
    for (int i = 0; i < n; i++) {
        cin >> x; run += x; pref[i] = run;
        cout << pref[i] << (i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
      python: `import sys
nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
run = 0
out = []
for x in nums[1:1 + n]:
    run += x
    out.append(str(run))
print(" ".join(out))`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] pref = new long[n];
        long run = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            run += sc.nextLong();
            pref[i] = run;
            if (i > 0) sb.append(' ');
            sb.append(pref[i]);
        }
        System.out.println(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
let run = 0;
const pref = nums.slice(1, 1 + nums[0]).map((x) => (run += x));
console.log(pref.join(' '));`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut run = 0;
    let pref: Vec<String> = nums[1..=nums[0] as usize].iter().map(|&x| { run += x; run.to_string() }).collect();
    println!("{}", pref.join(" "));
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let run = 0;
const pref: number[] = nums.slice(1, 1 + nums[0]).map((x) => (run += x));
console.log(pref.join(' '));`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Heap vs Stack Prefix Sum</h3>
  <p style="font-family:monospace;color:#38bdf8">Input: [3, 1, 4, 2] -> Heap Prefix: [3, 4, 8, 10]</p>
</body></html>`,
    },
  },

  12: {
    asciiDiagram: `BFS Shortest Path (Unweighted Graph)
(0) --- (1) --- (3)
 |               |
 +----- (2) -----+   Queue: [0] -> [1, 2] -> [3] => dist[3] = 2`,
    dryRunTable: [
      { step: 1, state: 'Push start node 0', memoryOrStack: 'dist[0]=0, q=[0]', note: 'Mark visited on push' },
      { step: 2, state: 'Pop 0 -> push 1, 2', memoryOrStack: 'dist[1]=1, dist[2]=1', note: 'Level 1 neighbors' },
      { step: 3, state: 'Pop 1 -> push 3', memoryOrStack: 'dist[3]=2', note: 'Shortest path to target=3 is 2' },
    ],
    sampleStdin: '4 4 0 3\n0 1\n0 2\n1 3\n2 3',
    expectedSampleOutput: '2',
    testCases: [
      { id: 'c12-t1', input: '4 4 0 3\n0 1\n0 2\n1 3\n2 3', expectedOutput: '2' },
      { id: 'c12-t2', input: '4 2 0 3\n0 1\n1 2', expectedOutput: '-1', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n, m, src, dst;
    if (scanf("%d %d %d %d", &n, &m, &src, &dst) != 4) return 0;
    int adj[50][50] = {0}, deg[50] = {0}, dist[50], q[50];
    for (int i = 0; i < n; i++) dist[i] = -1;
    for (int i = 0; i < m; i++) {
        int u, v; scanf("%d %d", &u, &v);
        adj[u][deg[u]++] = v;
        adj[v][deg[v]++] = u;
    }
    int head = 0, tail = 0;
    dist[src] = 0; q[tail++] = src;
    while (head < tail) {
        int u = q[head++];
        for (int i = 0; i < deg[u]; i++) {
            int v = adj[u][i];
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q[tail++] = v; }
        }
    }
    printf("%d\\n", dist[dst]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m, src, dst;
    cin >> n >> m >> src >> dst;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    vector<int> dist(n, -1);
    queue<int> q;
    dist[src] = 0; q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
        }
    }
    cout << dist[dst] << "\\n";
    return 0;
}`,
      python: `import sys
from collections import deque

data = list(map(int, sys.stdin.read().split()))
n, m, src, dst = data[0], data[1], data[2], data[3]
adj = [[] for _ in range(n)]
idx = 4
for _ in range(m):
    u, v = data[idx], data[idx + 1]
    adj[u].append(v); adj[v].append(u)
    idx += 2
dist = [-1] * n
dist[src] = 0
q = deque([src])
while q:
    u = q.popleft()
    for v in adj[u]:
        if dist[v] == -1:
            dist[v] = dist[u] + 1
            q.append(v)
print(dist[dst])`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt(), src = sc.nextInt(), dst = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(u).add(v); adj.get(v).add(u);
        }
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        dist[src] = 0; q.add(src);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.add(v); }
        }
        System.out.println(dist[dst]);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const [n, m, src, dst] = d;
const adj = Array.from({ length: n }, () => []);
for (let i = 0, p = 4; i < m; i++, p += 2) {
  adj[d[p]].push(d[p + 1]); adj[d[p + 1]].push(d[p]);
}
const dist = Array(n).fill(-1);
dist[src] = 0;
const q = [src];
for (let head = 0; head < q.length; head++) {
  const u = q[head];
  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
}
console.log(dist[dst]);`,
      rust: `use std::collections::VecDeque;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, m, src, dst) = (d[0], d[1], d[2], d[3]);
    let mut adj = vec![vec![]; n];
    for i in 0..m {
        let (u, v) = (d[4 + 2 * i], d[5 + 2 * i]);
        adj[u].push(v); adj[v].push(u);
    }
    let mut dist = vec![-1i32; n];
    let mut q = VecDeque::new();
    dist[src] = 0; q.push_back(src);
    while let Some(u) = q.pop_front() {
        for &v in &adj[u] {
            if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); }
        }
    }
    println!("{}", dist[dst]);
}`,
      typescript: `import * as fs from 'fs';

const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, m, src, dst] = d;
const adj: number[][] = Array.from({ length: n }, () => []);
for (let i = 0, p = 4; i < m; i++, p += 2) {
  adj[d[p]].push(d[p + 1]); adj[d[p + 1]].push(d[p]);
}
const dist = Array<number>(n).fill(-1);
dist[src] = 0;
const q: number[] = [src];
for (let h = 0; h < q.length; h++) {
  const u = q[h];
  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
}
console.log(dist[dst]);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>DOM Tree & Graph BFS</h3>
  <p style="font-family:monospace;color:#34d399">Shortest path from node 0 to node 3: 2 hops</p>
</body></html>`,
    },
  },

  13: {
    asciiDiagram: `Concurrency: Sequential vs Parallel/Async Batch
Sequential: [Task A: 4ms] -> [Task B: 4ms] -> [Task C: 4ms] = 12ms
Concurrent: [Task A + Task B + Task C] interleaved/parallel = ~4ms`,
    dryRunTable: [
      { step: 1, state: 'Spawn worker tasks', memoryOrStack: '3 futures/threads', note: 'Independent sub-ranges' },
      { step: 2, state: 'Await / Join results', memoryOrStack: 'partial sums [10, 20, 30]', note: 'Zero shared mutable race' },
      { step: 3, state: 'Reduce final answer', memoryOrStack: 'total = 60', note: 'Safe message-passing merge' },
    ],
    sampleStdin: '3\n10 20 30',
    expectedSampleOutput: '60',
    testCases: [
      { id: 'c13-t1', input: '3\n10 20 30', expectedOutput: '60' },
      { id: 'c13-t2', input: '4\n5 10 15 20', expectedOutput: '50', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

// Safe thread-isolated task reduction pattern
long long run_task(long long x) { return x; }

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long total = 0, x;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &x);
        total += run_task(x);
    }
    printf("%lld\\n", total);
    return 0;
}`,
      cpp: `#include <iostream>
#include <future>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<future<long long>> tasks;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        tasks.push_back(async(launch::deferred, [x]() { return x; }));
    }
    long long total = 0;
    for (auto &t : tasks) total += t.get();
    cout << total << "\\n";
    return 0;
}`,
      python: `import asyncio, sys

async def worker(val: int) -> int:
    return val

async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    results = await asyncio.gather(*(worker(x) for x in nums[1:1 + nums[0]]))
    print(sum(results))

asyncio.run(main())`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        long total = items.parallelStream().mapToLong(Long::longValue).sum();
        System.out.println(total);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
async function main() {
  const tasks = nums.slice(1, 1 + nums[0]).map((x) => Promise.resolve(x));
  const results = await Promise.all(tasks);
  console.log(results.reduce((a, b) => a + b, 0));
}
main();`,
      rust: `use std::io::{self, Read};
use std::thread;

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let handles: Vec<_> = nums[1..=nums[0] as usize]
        .iter()
        .map(|&x| thread::spawn(move || x))
        .collect();
    let total: i64 = handles.into_iter().map(|h| h.join().unwrap()).sum();
    println!("{}", total);
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
async function run(): Promise<void> {
  const results = await Promise.all(nums.slice(1, 1 + nums[0]).map((x) => Promise.resolve(x)));
  console.log(results.reduce((a, b) => a + b, 0));
}
run();`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Promise.all Concurrent Fetch Demo</h3>
  <p id="status" style="font-family:monospace;color:#38bdf8">Loading concurrent tasks...</p>
  <script>
    Promise.all([Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)]).then(vals => {
      document.getElementById('status').textContent = 'Merged sum: ' + vals.reduce((a, b) => a + b, 0);
    });
  </script>
</body></html>`,
    },
  },

  14: {
    asciiDiagram: `DP Memoization + Input Sanitization
fib(40) Naive Recursion: 331,160,281 calls (Slow!)
fib(40) Memoized DP:             40 steps (0.001ms!)`,
    dryRunTable: [
      { step: 1, state: 'Initialize dp[0]=0, dp[1]=1', memoryOrStack: 'dp array O(n)', note: 'Base states cached' },
      { step: 2, state: 'Compute dp[i] = dp[i-1] + dp[i-2]', memoryOrStack: 'dp[10]=55', note: 'Single linear pass' },
      { step: 3, state: 'Sanitize bounded input', memoryOrStack: 'n in [0..90]', note: 'Prevents overflow / DoS' },
    ],
    sampleStdin: '10',
    expectedSampleOutput: '55',
    testCases: [
      { id: 'c14-t1', input: '10', expectedOutput: '55' },
      { id: 'c14-t2', input: '20', expectedOutput: '6765', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long long next = a + b;
        a = b; b = next;
    }
    printf("%lld\\n", a);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long long next = a + b;
        a = b; b = next;
    }
    cout << a << "\\n";
    return 0;
}`,
      python: `import sys
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    return n if n <= 1 else fib(n - 1) + fib(n - 2)

n = int(sys.stdin.read().strip())
print(fib(max(0, min(90, n))))`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        if (n < 0 || n > 90) return;
        long a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            long next = a + b;
            a = b; b = next;
        }
        System.out.println(a);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n {
        let next = a + b;
        a = b; b = next;
    }
    println!("{}", a);
}`,
      typescript: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>XSS-Safe Rendering (textContent vs innerHTML)</h3>
  <p id="safe" style="color:#34d399;font-family:monospace"></p>
  <script>
    const untrusted = '<img src=x onerror=alert(1)> Fib(10)=55';
    document.getElementById('safe').textContent = untrusted;
  </script>
</body></html>`,
    },
  },

  15: {
    asciiDiagram: `Full-Stack Website Architecture (Mega Capstone Ch 1-15)
+-------------------+     HTTPS / JSON      +------------------------+
|  Browser Client   | <===================> |  Backend API Service   |
|  HTML + CSS + TS  |                       | Py / Java / Rust / C++ |
+-------------------+                       +-----------+------------+
                                                        | SQL / Cache
                                                        v
                                            +------------------------+
                                            |   Persistent Storage   |
                                            +------------------------+`,
    dryRunTable: [
      { step: 1, state: 'Receive JSON/API request payload', memoryOrStack: 'user="mina", xp=150', note: 'Validate input at boundary' },
      { step: 2, state: 'Compute level & rank', memoryOrStack: 'level=2, status="OK"', note: 'Business logic layer' },
      { step: 3, state: 'Serialize JSON response', memoryOrStack: '{"user":"mina","level":2}', note: 'Returned to browser UI' },
    ],
    sampleStdin: 'mina 150',
    expectedSampleOutput: '{"user":"mina","level":2,"status":"OK"}',
    testCases: [
      { id: 'c15-t1', input: 'mina 150', expectedOutput: '{"user":"mina","level":2,"status":"OK"}' },
      { id: 'c15-t2', input: 'tariq 50', expectedOutput: '{"user":"tariq","level":1,"status":"OK"}', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    char user[64];
    int xp = 0;
    if (scanf("%63s %d", user, &xp) == 2) {
        int level = (xp / 100) + 1;
        printf("{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", user, level);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string user;
    int xp = 0;
    if (cin >> user >> xp) {
        int level = (xp / 100) + 1;
        cout << "{\\"user\\":\\"" << user << "\\",\\"level\\":" << level << ",\\"status\\":\\"OK\\"}\\n";
    }
    return 0;
}`,
      python: `import json, sys

parts = sys.stdin.read().split()
user, xp = parts[0], int(parts[1])
payload = {"user": user, "level": (xp // 100) + 1, "status": "OK"}
print(json.dumps(payload, separators=(",", ":")))`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String user = sc.next();
        int xp = sc.nextInt();
        int level = (xp / 100) + 1;
        System.out.println("{\\"user\\":\\"" + user + "\\",\\"level\\":" + level + ",\\"status\\":\\"OK\\"}");
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, xpStr] = raw.trim().split(/\\s+/);
const level = Math.floor(Number(xpStr) / 100) + 1;
console.log(JSON.stringify({ user, level, status: 'OK' }));`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let user = it.next().unwrap();
    let xp: i32 = it.next().unwrap().parse().unwrap();
    let level = (xp / 100) + 1;
    println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", user, level);
}`,
      typescript: `import * as fs from 'fs';

interface ApiResponse { user: string; level: number; status: 'OK'; }
const [user, xpStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: ApiResponse = { user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' };
console.log(JSON.stringify(res));`,
      html: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #090d16; color: #f8fafc; padding: 20px; }
    .panel { border: 1px solid #1e293b; border-radius: 12px; padding: 18px; background: #0f172a; max-width: 460px; }
    button { background: #38bdf8; color: #090d16; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 700; cursor: pointer; }
    pre { background: #020617; padding: 12px; border-radius: 8px; color: #34d399; overflow-x: auto; }
  </style>
</head>
<body>
  <main class="panel">
    <h2>Full-Stack Client + API Simulator</h2>
    <p>HTML Structure + CSS Layout + JS State + Backend JSON Contract</p>
    <button id="syncBtn">Simulate Backend API Call</button>
    <pre id="jsonOut">Click button to fetch JSON payload...</pre>
  </main>
  <script>
    document.getElementById('syncBtn').addEventListener('click', () => {
      const mockBackendPayload = { user: 'mina', level: 2, status: 'OK', engine: 'Python/Rust API' };
      document.getElementById('jsonOut').textContent = JSON.stringify(mockBackendPayload, null, 2);
    });
  </script>
</body>
</html>`,
    },
  },
};
