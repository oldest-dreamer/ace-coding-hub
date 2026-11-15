import { CHAPTER_SPECS, type ChapterRunnableSpec } from './languageCodeSamples';

export const CHAPTER_SPECS_25: Record<number, ChapterRunnableSpec> = {
  // Phase 2: Control Flow, Loops & Complexity (Ch 6-10)
  6: {
    asciiDiagram: `score (e.g. 85)
   |
   +--> [score >= 90] --YES--> "A+"
   |
   +--> [score >= 80] --YES--> "A"
   |
   +--> [score >= 70] --YES--> "B"
   |
   +--> [else] --------------> "C / F"`,
    dryRunTable: [
      { step: 1, state: 'Read score from stdin', memoryOrStack: 'score = 85', note: 'Validate range before branching' },
      { step: 2, state: 'Check score >= 90', memoryOrStack: '85 >= 90 -> false', note: 'Falls through to next branch' },
      { step: 3, state: 'Check score >= 80', memoryOrStack: '85 >= 80 -> true', note: 'Selects grade = "A"' },
      { step: 4, state: 'Emit grade', memoryOrStack: 'stdout = "A"', note: 'Mutually exclusive branch terminates chain' },
    ],
    sampleStdin: '85',
    expectedSampleOutput: 'A',
    testCases: [
      { id: 'c6-t1', input: '85', expectedOutput: 'A' },
      { id: 'c6-t2', input: '62', expectedOutput: 'C', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int score = 0;
    if (scanf("%d", &score) == 1) {
        if (score < 0 || score > 100) printf("INVALID\\n");
        else if (score >= 90) printf("A+\\n");
        else if (score >= 80) printf("A\\n");
        else if (score >= 70) printf("B\\n");
        else if (score >= 60) printf("C\\n");
        else printf("F\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int score = 0;
    if (cin >> score) {
        if (score < 0 || score > 100) cout << "INVALID\\n";
        else if (score >= 90) cout << "A+\\n";
        else if (score >= 80) cout << "A\\n";
        else if (score >= 70) cout << "B\\n";
        else if (score >= 60) cout << "C\\n";
        else cout << "F\\n";
    }
    return 0;
}`,
      python: `import sys

raw = sys.stdin.read().strip()
if raw:
    score = int(raw)
    if score < 0 or score > 100:
        print("INVALID")
    elif score >= 90:
        print("A+")
    elif score >= 80:
        print("A")
    elif score >= 70:
        print("B")
    elif score >= 60:
        print("C")
    else:
        print("F")`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int score = sc.nextInt();
        String grade = (score < 0 || score > 100) ? "INVALID"
            : (score >= 90) ? "A+"
            : (score >= 80) ? "A"
            : (score >= 70) ? "B"
            : (score >= 60) ? "C" : "F";
        System.out.println(grade);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const score = Number(raw.trim());
const grade = score < 0 || score > 100 ? 'INVALID'
  : score >= 90 ? 'A+'
  : score >= 80 ? 'A'
  : score >= 70 ? 'B'
  : score >= 60 ? 'C' : 'F';
console.log(grade);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    if let Ok(score) = s.trim().parse::<i32>() {
        let grade = match score {
            90..=100 => "A+",
            80..=89 => "A",
            70..=79 => "B",
            60..=69 => "C",
            0..=59 => "F",
            _ => "INVALID",
        };
        println!("{}", grade);
    }
}`,
      typescript: `import * as fs from 'fs';

const score: number = Number(fs.readFileSync(0, 'utf8').trim());
const grade: string = score < 0 || score > 100 ? 'INVALID'
  : score >= 90 ? 'A+'
  : score >= 80 ? 'A'
  : score >= 70 ? 'B'
  : score >= 60 ? 'C' : 'F';
console.log(grade);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Conditional Grade Classifier</h3>
  <p style="font-family:monospace;color:#38bdf8">Score 85 -> Branch (score >= 80) -> Grade: A</p>
</body></html>`,
    },
  },

  7: CHAPTER_SPECS[4],

  8: {
    asciiDiagram: `Outer Row (i = 1..n)   Inner Cols (j = 1..i)
   i = 1   ==========>   "1"
   i = 2   ==========>   "1 2"
   i = 3   ==========>   "1 2 3"`,
    dryRunTable: [
      { step: 1, state: 'Read n = 3', memoryOrStack: 'n = 3', note: 'Outer loop controls rows' },
      { step: 2, state: 'Row i = 1', memoryOrStack: 'j runs 1..1 -> "1"', note: 'Emit newline after row' },
      { step: 3, state: 'Row i = 2', memoryOrStack: 'j runs 1..2 -> "1 2"', note: 'Inner loop resets each row' },
      { step: 4, state: 'Row i = 3', memoryOrStack: 'j runs 1..3 -> "1 2 3"', note: 'Outer loop finishes cleanly' },
    ],
    sampleStdin: '3',
    expectedSampleOutput: '1\n1 2\n1 2 3',
    testCases: [
      { id: 'c8-t1', input: '3', expectedOutput: '1\n1 2\n1 2 3' },
      { id: 'c8-t2', input: '1', expectedOutput: '1', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                printf("%d%s", j, j == i ? "\\n" : " ");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                cout << j << (j == i ? "\\n" : " ");
            }
        }
    }
    return 0;
}`,
      python: `import sys

n = int(sys.stdin.read().strip() or 0)
for i in range(1, n + 1):
    print(" ".join(str(j) for j in range(1, i + 1)))`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if (j > 1) sb.append(' ');
                sb.append(j);
            }
            sb.append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
const lines = [];
for (let i = 1; i <= n; i++) {
  const row = [];
  for (let j = 1; j <= i; j++) row.push(j);
  lines.push(row.join(' '));
}
console.log(lines.join('\\n'));`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);
    for i in 1..=n {
        let row: Vec<String> = (1..=i).map(|j| j.to_string()).collect();
        println!("{}", row.join(" "));
    }
}`,
      typescript: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
const lines: string[] = [];
for (let i: number = 1; i <= n; i++) {
  const row: number[] = [];
  for (let j: number = 1; j <= i; j++) row.push(j);
  lines.push(row.join(' '));
}
console.log(lines.join('\\n'));`,
      html: `<!doctype html>
<html><body style="font-family:monospace;background:#090d16;color:#38bdf8;padding:24px;">
  <h3>Nested Loop Number Triangle (n=3)</h3>
  <pre>1
1 2
1 2 3</pre>
</body></html>`,
    },
  },

  9: {
    asciiDiagram: `Caller Frame: a=12, b=18
   |
   +--> gcd(12, 18) -> gcd(18, 12) -> gcd(12, 6) -> gcd(6, 0) => returns 6
   |
   +--> Back in main(): prints 6 cleanly`,
    dryRunTable: [
      { step: 1, state: 'Call gcd(12, 18)', memoryOrStack: 'Frame1: a=12, b=18', note: 'b != 0, compute 12 % 18 = 12' },
      { step: 2, state: 'Step gcd(18, 12)', memoryOrStack: 'Frame2: a=18, b=12', note: '18 % 12 = 6' },
      { step: 3, state: 'Step gcd(12, 6)', memoryOrStack: 'Frame3: a=12, b=6', note: '12 % 6 = 0' },
      { step: 4, state: 'Base b == 0', memoryOrStack: 'returns 6', note: 'Stack frame pops cleanly back to main' },
    ],
    sampleStdin: '12 18',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'c9-t1', input: '12 18', expectedOutput: '6' },
      { id: 'c9-t2', input: '35 14', expectedOutput: '7', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a < 0 ? -a : a;
}

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) == 2) {
        printf("%lld\\n", gcd(a, b));
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

long long computeGcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a < 0 ? -a : a;
}

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << computeGcd(a, b) << "\\n";
    }
    return 0;
}`,
      python: `import sys

def compute_gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return abs(a)

parts = list(map(int, sys.stdin.read().split()))
if len(parts) >= 2:
    print(compute_gcd(parts[0], parts[1]))`,
      java: `import java.util.Scanner;

public class Main {
    static long computeGcd(long a, long b) {
        while (b != 0) {
            long rem = a % b;
            a = b;
            b = rem;
        }
        return Math.abs(a);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            long b = sc.nextLong();
            System.out.println(computeGcd(a, b));
        }
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
function computeGcd(a, b) {
  while (b !== 0) { [a, b] = [b, a % b]; }
  return Math.abs(a);
}
const [a, b] = raw.trim().split(/\\s+/).map(Number);
console.log(computeGcd(a, b));`,
      rust: `use std::io::{self, Read};

fn compute_gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let rem = a % b;
        a = b;
        b = rem;
    }
    a.abs()
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    if v.len() >= 2 {
        println!("{}", compute_gcd(v[0], v[1]));
    }
}`,
      typescript: `import * as fs from 'fs';

function computeGcd(a: number, b: number): number {
  while (b !== 0) {
    const rem: number = a % b;
    a = b;
    b = rem;
  }
  return Math.abs(a);
}

const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(computeGcd(a, b));`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Modular Function Scope &amp; Return</h3>
  <p style="font-family:monospace;color:#34d399">gcd(12, 18) -> returns 6 without mutating caller vars</p>
</body></html>`,
    },
  },

  10: {
    asciiDiagram: `n = 100,000 -> 10^8 Ops Rule Comparison
+---------------------------+------------------------------+
| Naive Loop O(n): 100k ops | Gauss Formula O(1): 3 ops!   |
| sum += i                  | n * (n + 1) / 2 = 5000050000 |
+---------------------------+------------------------------+`,
    dryRunTable: [
      { step: 1, state: 'Read n = 100000', memoryOrStack: 'n (64-bit) = 100000', note: 'Must use 64-bit to avoid overflow' },
      { step: 2, state: 'Compute n * (n + 1)', memoryOrStack: '100000 * 100001 = 10000100000', note: 'Fits cleanly in 64-bit (~9e18 max)' },
      { step: 3, state: 'Divide by 2', memoryOrStack: '5000050000', note: 'Executed in O(1) constant time' },
      { step: 4, state: 'Print result', memoryOrStack: 'stdout = 5000050000', note: 'Even for n=10^9 runs under 1ms' },
    ],
    sampleStdin: '100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'c10-t1', input: '100000', expectedOutput: '5000050000' },
      { id: 'c10-t2', input: '10', expectedOutput: '55', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1) {
        long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        printf("%lld\\n", ans);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        cout << ans << "\\n";
    }
    return 0;
}`,
      python: `import sys

n = int(sys.stdin.read().strip() or 0)
print(n * (n + 1) // 2)`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = BigInt(raw.trim());
console.log(((n * (n + 1n)) / 2n).toString());`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i64 = s.trim().parse().unwrap_or(0);
    let ans = if n % 2 == 0 { (n / 2) * (n + 1) } else { n * ((n + 1) / 2) };
    println!("{}", ans);
}`,
      typescript: `import * as fs from 'fs';

const n: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());
const ans: bigint = (n * (n + 1n)) / 2n;
console.log(ans.toString());`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Big-O Milestone Merger 2: 10^8 Rule</h3>
  <p style="font-family:monospace;color:#38bdf8">n=100,000 -> O(1) Gauss Sum = 5000050000 (0.001ms)</p>
</body></html>`,
    },
  },

  // Phase 3: Arrays, Strings & Recursion (Ch 11-15)
  11: {
    asciiDiagram: `1D Contiguous Array + Frequency Sweep (target = 2)
Index:   0    1    2    3    4
Value: [ 1 |  2 |  3 |  2 |  2 ]
         ^max=1   max=2  max=3  freq=2  freq=3 -> "3 3"`,
    dryRunTable: [
      { step: 1, state: 'Read n=5, target=2', memoryOrStack: 'maxVal=1, freq=0', note: 'Start single O(n) pass' },
      { step: 2, state: 'Scan idx 1..2', memoryOrStack: 'maxVal=3, freq=1', note: 'Track running max and count' },
      { step: 3, state: 'Scan idx 3..4', memoryOrStack: 'maxVal=3, freq=3', note: 'Target 2 seen three times' },
      { step: 4, state: 'Print max and freq', memoryOrStack: 'stdout = "3 3"', note: 'O(n) time, O(n) or O(1) extra space' },
    ],
    sampleStdin: '5 2\n1 2 3 2 2',
    expectedSampleOutput: '3 3',
    testCases: [
      { id: 'c11-t1', input: '5 2\n1 2 3 2 2', expectedOutput: '3 3' },
      { id: 'c11-t2', input: '4 9\n4 9 1 5', expectedOutput: '9 1', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n, target;
    if (scanf("%d %d", &n, &target) != 2 || n <= 0) return 0;
    long long mx = 0;
    int freq = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        scanf("%lld", &x);
        if (i == 0 || x > mx) mx = x;
        if (x == target) freq++;
    }
    printf("%lld %d\\n", mx, freq);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    if (!(cin >> n >> target) || n <= 0) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    long long mx = a[0];
    int freq = 0;
    for (long long x : a) {
        if (x > mx) mx = x;
        if (x == target) freq++;
    }
    cout << mx << " " << freq << "\\n";
    return 0;
}`,
      python: `import sys

vals = list(map(int, sys.stdin.read().split()))
n, target = vals[0], vals[1]
arr = vals[2:2 + n]
print(max(arr), arr.count(target))`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long target = sc.nextLong();
        long mx = Long.MIN_VALUE;
        int freq = 0;
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            if (x > mx) mx = x;
            if (x == target) freq++;
        }
        System.out.println(mx + " " + freq);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0];
const target = nums[1];
const arr = nums.slice(2, 2 + n);
let mx = arr[0], freq = 0;
for (const x of arr) {
  if (x > mx) mx = x;
  if (x === target) freq++;
}
console.log(\`\${mx} \${freq}\`);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (nums[0] as usize, nums[1]);
    let arr = &nums[2..2 + n];
    let mx = *arr.iter().max().unwrap();
    let freq = arr.iter().filter(|&&x| x == target).count();
    println!("{} {}", mx, freq);
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0];
const target: number = nums[1];
const arr: number[] = nums.slice(2, 2 + n);
let mx: number = arr[0];
let freq: number = 0;
for (const x of arr) {
  if (x > mx) mx = x;
  if (x === target) freq++;
}
console.log(\`\${mx} \${freq}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>1D Array Traversal &amp; Frequency</h3>
  <p style="font-family:monospace;color:#38bdf8">[1, 2, 3, 2, 2], target=2 -> max=3 freq=3</p>
</body></html>`,
    },
  },

  12: CHAPTER_SPECS[6],
  13: CHAPTER_SPECS[11],

  14: {
    asciiDiagram: `Two-Pointer Palindrome & Vowel Scan: s = "racecar"
  l -> r  a  c  e  c  a  r <- r
  [r == r] [a == a] [c == c] [e]  => Palindrome = YES, Vowels = 3`,
    dryRunTable: [
      { step: 1, state: 'Read word "racecar"', memoryOrStack: 'l=0, r=6, vowels=0', note: 'Start two pointers at ends' },
      { step: 2, state: 'Compare s[l] vs s[r]', memoryOrStack: 'r==r, a==a, c==c', note: 'All mirror pairs match -> isPal = true' },
      { step: 3, state: 'Count a/e/i/o/u vowels', memoryOrStack: 'a(2) + e(1) = 3', note: 'Single linear pass' },
      { step: 4, state: 'Print result', memoryOrStack: 'stdout = "YES 3"', note: 'O(len) time, O(1) extra work' },
    ],
    sampleStdin: 'racecar',
    expectedSampleOutput: 'YES 3',
    testCases: [
      { id: 'c14-t1', input: 'racecar', expectedOutput: 'YES 3' },
      { id: 'c14-t2', input: 'argon', expectedOutput: 'NO 2', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int is_vowel(char ch) {
    char c = (char)tolower((unsigned char)ch);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    char s[256];
    if (scanf("%255s", s) == 1) {
        size_t len = strlen(s);
        int ok = 1, vowels = 0;
        for (size_t i = 0; i < len; i++) {
            if (is_vowel(s[i])) vowels++;
            if (s[i] != s[len - 1 - i]) ok = 0;
        }
        printf("%s %d\\n", ok ? "YES" : "NO", vowels);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s;
    if (cin >> s) {
        int l = 0, r = (int)s.size() - 1;
        bool ok = true;
        while (l < r) {
            if (s[l] != s[r]) { ok = false; break; }
            l++; r--;
        }
        int vowels = 0;
        for (char ch : s) {
            char c = (char)tolower((unsigned char)ch);
            if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') vowels++;
        }
        cout << (ok ? "YES" : "NO") << " " << vowels << "\\n";
    }
    return 0;
}`,
      python: `import sys

s = sys.stdin.read().strip()
is_pal = "YES" if s == s[::-1] else "NO"
vowels = sum(1 for ch in s.lower() if ch in "aeiou")
print(is_pal, vowels)`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        int l = 0, r = s.length() - 1;
        boolean ok = true;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) { ok = false; break; }
        }
        int vowels = 0;
        for (char ch : s.toLowerCase().toCharArray()) {
            if ("aeiou".indexOf(ch) >= 0) vowels++;
        }
        System.out.println((ok ? "YES" : "NO") + " " + vowels);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const s = raw.trim();
const isPal = s === s.split('').reverse().join('') ? 'YES' : 'NO';
let vowels = 0;
for (const ch of s.toLowerCase()) if ('aeiou'.includes(ch)) vowels++;
console.log(\`\${isPal} \${vowels}\`);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let s = buf.trim();
    let rev: String = s.chars().rev().collect();
    let is_pal = if s == rev { "YES" } else { "NO" };
    let vowels = s.chars().filter(|c| matches!(c.to_ascii_lowercase(), 'a'|'e'|'i'|'o'|'u')).count();
    println!("{} {}", is_pal, vowels);
}`,
      typescript: `import * as fs from 'fs';

const s: string = fs.readFileSync(0, 'utf8').trim();
const isPal: string = s === s.split('').reverse().join('') ? 'YES' : 'NO';
let vowels: number = 0;
for (const ch of s.toLowerCase()) if ('aeiou'.includes(ch)) vowels++;
console.log(\`\${isPal} \${vowels}\`);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>String Palindrome &amp; Vowel Analyzer</h3>
  <p style="font-family:monospace;color:#34d399">"racecar" -> Palindrome: YES | Vowels: 3</p>
</body></html>`,
    },
  },

  15: CHAPTER_SPECS[5],

  // Phase 4: Memory, Pointers/Ownership & OOP (Ch 16-20)
  16: CHAPTER_SPECS[7],

  17: {
    asciiDiagram: `Stack vs Heap Lifecycle: Dynamic Buffer Allocation
+-------------------+        points to         +---------------------------+
| Stack: ptr (8B)   |  =====================>  | Heap: [-2, 1, -3, 4, 5]   |
+-------------------+   RAII / free() drops    +---------------------------+`,
    dryRunTable: [
      { step: 1, state: 'Allocate n-item array on Heap', memoryOrStack: 'heap arr len=5', note: 'Avoids fixed stack overflow on 10^6' },
      { step: 2, state: 'Run Kadane DP pass', memoryOrStack: 'cur=9, best=9', note: 'Subarray [4, 5] sums to 9' },
      { step: 3, state: 'Release heap memory', memoryOrStack: 'free(arr) / Drop', note: 'Zero memory leaks on exit' },
      { step: 4, state: 'Print best sum', memoryOrStack: 'stdout = "9"', note: 'O(n) time, clean heap teardown' },
    ],
    sampleStdin: '5\n-2 1 -3 4 5',
    expectedSampleOutput: '9',
    testCases: [
      { id: 'c17-t1', input: '5\n-2 1 -3 4 5', expectedOutput: '9' },
      { id: 'c17-t2', input: '4\n-5 -2 -8 -1', expectedOutput: '-1', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *arr = (long long *)malloc((size_t)n * sizeof(long long));
    if (!arr) return 1;
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    long long cur = arr[0], best = arr[0];
    for (int i = 1; i < n; i++) {
        cur = (cur + arr[i] > arr[i]) ? (cur + arr[i]) : arr[i];
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    free(arr);
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n) || n <= 0) return 0;
    auto arr = make_unique<long long[]>(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    long long cur = arr[0], best = arr[0];
    for (int i = 1; i < n; i++) {
        cur = max(arr[i], cur + arr[i]);
        best = max(best, cur);
    }
    cout << best << "\\n";
    return 0; // unique_ptr auto-frees heap array
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
        long[] heapArr = new long[n];
        for (int i = 0; i < n; i++) heapArr[i] = sc.nextLong();
        long cur = heapArr[0], best = heapArr[0];
        for (int i = 1; i < n; i++) {
            cur = Math.max(heapArr[i], cur + heapArr[i]);
            best = Math.max(best, cur);
        }
        System.out.println(best);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const arr = nums.slice(1, 1 + nums[0]);
let cur = arr[0], best = arr[0];
for (let i = 1; i < arr.length; i++) {
  cur = Math.max(arr[i], cur + arr[i]);
  best = Math.max(best, cur);
}
console.log(best);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let arr: Box<[i64]> = nums[1..=nums[0] as usize].into();
    let (mut cur, mut best) = (arr[0], arr[0]);
    for &x in &arr[1..] {
        cur = x.max(cur + x);
        best = best.max(cur);
    }
    println!("{}", best);
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const arr: number[] = nums.slice(1, 1 + nums[0]);
let cur: number = arr[0];
let best: number = arr[0];
for (let i: number = 1; i < arr.length; i++) {
  cur = Math.max(arr[i], cur + arr[i]);
  best = Math.max(best, cur);
}
console.log(best);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Heap Buffer &amp; Smart Pointer Safety</h3>
  <p style="font-family:monospace;color:#38bdf8">unique_ptr / Box&lt;[i64]&gt; -> Max Subarray = 9, 0 leaks</p>
</body></html>`,
    },
  },

  18: {
    ...CHAPTER_SPECS[8],
    starterCode: {
      ...CHAPTER_SPECS[8].starterCode,
      typescript: `import * as fs from 'fs';

interface Scorable<T> { name: string; score: T; boost(delta: T): void; }
class Player implements Scorable<number> {
  name: string;
  score: number;
  constructor(name: string, score: number) { this.name = name; this.score = score; }
  boost(delta: number): void { this.score += delta; }
}
const [name, s, d] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const p = new Player(name, Number(s));
p.boost(Number(d));
console.log(\`\${p.name}:\${p.score}\`);`,
    },
  },

  19: {
    asciiDiagram: `   Interface / Trait: Shape { area() }
        ^                       ^
        | implements            | implements
  [Rect(w, h)]           [Square(side)]
   w * h = 20             side * side = 36`,
    dryRunTable: [
      { step: 1, state: 'Read shape kind & dims', memoryOrStack: 'kind="rect", w=4, h=5', note: 'Dispatch target chosen dynamically/statically' },
      { step: 2, state: 'Bind Shape interface', memoryOrStack: 'shape -> Rect(4, 5)', note: 'Polymorphic contract Shape.area()' },
      { step: 3, state: 'Invoke shape.area()', memoryOrStack: '4 * 5 = 20', note: 'Same call works for Square or Rect' },
      { step: 4, state: 'Emit area', memoryOrStack: 'stdout = "20"', note: 'Extensible without changing caller' },
    ],
    sampleStdin: 'rect 4 5',
    expectedSampleOutput: '20',
    testCases: [
      { id: 'c19-t1', input: 'rect 4 5', expectedOutput: '20' },
      { id: 'c19-t2', input: 'sq 6 6', expectedOutput: '36', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct {
    int a, b;
    int (*area)(int, int);
} Shape;

int rect_area(int w, int h) { return w * h; }
int sq_area(int s, int unused) { (void)unused; return s * s; }

int main(void) {
    char kind[16];
    int x = 0, y = 0;
    if (scanf("%15s %d %d", kind, &x, &y) >= 2) {
        Shape s = strcmp(kind, "rect") == 0
            ? (Shape){ x, y, rect_area }
            : (Shape){ x, y, sq_area };
        printf("%d\\n", s.area(s.a, s.b));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Shape {
    virtual long long area() const = 0;
    virtual ~Shape() = default;
};
struct Rect : Shape {
    long long w, h;
    Rect(long long w, long long h) : w(w), h(h) {}
    long long area() const override { return w * h; }
};
struct Square : Shape {
    long long s;
    explicit Square(long long s) : s(s) {}
    long long area() const override { return s * s; }
};

int main() {
    string kind; long long a = 0, b = 0;
    if (cin >> kind >> a >> b) {
        unique_ptr<Shape> shape = (kind == "rect")
            ? make_unique<Rect>(a, b)
            : make_unique<Square>(a);
        cout << shape->area() << "\\n";
    }
    return 0;
}`,
      python: `import sys
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> int: ...

class Rect(Shape):
    def __init__(self, w: int, h: int):
        self.w, self.h = w, h
    def area(self) -> int:
        return self.w * self.h

class Square(Shape):
    def __init__(self, s: int):
        self.s = s
    def area(self) -> int:
        return self.s * self.s

parts = sys.stdin.read().split()
if len(parts) >= 3:
    shape = Rect(int(parts[1]), int(parts[2])) if parts[0] == "rect" else Square(int(parts[1]))
    print(shape.area())`,
      java: `import java.util.Scanner;

interface Shape { long area(); }
class Rect implements Shape {
    long w, h;
    Rect(long w, long h) { this.w = w; this.h = h; }
    public long area() { return w * h; }
}
class Square implements Shape {
    long s;
    Square(long s) { this.s = s; }
    public long area() { return s * s; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        long a = sc.nextLong(), b = sc.nextLong();
        Shape shape = kind.equals("rect") ? new Rect(a, b) : new Square(a);
        System.out.println(shape.area());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
class Shape { area() { return 0; } }
class Rect extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}
class Square extends Shape {
  constructor(s) { super(); this.s = s; }
  area() { return this.s * this.s; }
}
const [kind, a, b] = raw.trim().split(/\\s+/);
const shape = kind === 'rect' ? new Rect(Number(a), Number(b)) : new Square(Number(a));
console.log(shape.area());`,
      rust: `use std::io::{self, Read};

trait Shape {
    fn area(&self) -> i64;
}
struct Rect(i64, i64);
struct Square(i64);
impl Shape for Rect { fn area(&self) -> i64 { self.0 * self.1 } }
impl Shape for Square { fn area(&self) -> i64 { self.0 * self.0 } }

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let p: Vec<&str> = s.split_whitespace().collect();
    let a: i64 = p[1].parse().unwrap();
    let b: i64 = p[2].parse().unwrap();
    let shape: Box<dyn Shape> = if p[0] == "rect" { Box::new(Rect(a, b)) } else { Box::new(Square(a)) };
    println!("{}", shape.area());
}`,
      typescript: `import * as fs from 'fs';

interface Shape { area(): number; }
class Rect implements Shape {
  w: number; h: number;
  constructor(w: number, h: number) { this.w = w; this.h = h; }
  area(): number { return this.w * this.h; }
}
class Square implements Shape {
  s: number;
  constructor(s: number) { this.s = s; }
  area(): number { return this.s * this.s; }
}
const [kind, a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const shape: Shape = kind === 'rect' ? new Rect(Number(a), Number(b)) : new Square(Number(a));
console.log(shape.area());`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Polymorphism &amp; Trait Dispatch</h3>
  <p style="font-family:monospace;color:#34d399">Shape::area() -> Rect(4, 5) = 20</p>
</body></html>`,
    },
  },

  20: CHAPTER_SPECS[9],

  // Phase 5: Algorithms, Concurrency & Architecture (Ch 21-25)
  21: {
    asciiDiagram: `Binary Search (Lower Bound >= 7) on Sorted Array [1, 3, 5, 7, 9]
   lo=0, hi=4 -> mid=2 (arr[2]=5 < 7) -> lo=3
   lo=3, hi=4 -> mid=3 (arr[3]=7 >= 7) -> ans=3, hi=2 => stops, prints 3`,
    dryRunTable: [
      { step: 1, state: 'Sort array & set lo=0, hi=4', memoryOrStack: 'arr=[1,3,5,7,9], ans=-1', note: 'Monotonic predicate arr[mid] >= target' },
      { step: 2, state: 'mid = 2 -> arr[2] = 5', memoryOrStack: '5 < 7 -> lo = 3', note: 'Discard left half in O(1)' },
      { step: 3, state: 'mid = 3 -> arr[3] = 7', memoryOrStack: '7 >= 7 -> ans = 3, hi = 2', note: 'Keep searching left for first match' },
      { step: 4, state: 'Loop ends lo > hi', memoryOrStack: 'stdout = "3"', note: 'O(log n) search complete' },
    ],
    sampleStdin: '5 7\n9 1 5 3 7',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'c21-t1', input: '5 7\n9 1 5 3 7', expectedOutput: '3' },
      { id: 'c21-t2', input: '4 10\n2 4 6 8', expectedOutput: '-1', isHidden: true },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp_ll(const void *a, const void *b) {
    long long va = *(const long long *)a, vb = *(const long long *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    int n; long long target;
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0) return 0;
    long long *a = (long long *)malloc((size_t)n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    qsort(a, (size_t)n, sizeof(long long), cmp_ll);
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= target) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
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
    int n; long long target;
    if (!(cin >> n >> target) || n <= 0) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= target) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    cout << ans << "\\n";
    return 0;
}`,
      python: `import sys

nums = list(map(int, sys.stdin.read().split()))
n, target = nums[0], nums[1]
arr = sorted(nums[2:2 + n])
lo, hi, ans = 0, n - 1, -1
while lo <= hi:
    mid = lo + (hi - lo) // 2
    if arr[mid] >= target:
        ans = mid
        hi = mid - 1
    else:
        lo = mid + 1
print(ans)`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long target = sc.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        Arrays.sort(a);
        int lo = 0, hi = n - 1, ans = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] >= target) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        System.out.println(ans);
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0], target = nums[1];
const arr = nums.slice(2, 2 + n).sort((a, b) => a - b);
let lo = 0, hi = n - 1, ans = -1;
while (lo <= hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (arr[mid] >= target) { ans = mid; hi = mid - 1; }
  else lo = mid + 1;
}
console.log(ans);`,
      rust: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, target) = (nums[0] as usize, nums[1]);
    let mut arr = nums[2..2 + n].to_vec();
    arr.sort_unstable();
    let (mut lo, mut hi, mut ans) = (0_isize, n as isize - 1, -1_isize);
    while lo <= hi {
        let mid = lo + (hi - lo) / 2;
        if arr[mid as usize] >= target { ans = mid; hi = mid - 1; }
        else { lo = mid + 1; }
    }
    println!("{}", ans);
}`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0];
const target: number = nums[1];
const arr: number[] = nums.slice(2, 2 + n).sort((a, b) => a - b);
let lo: number = 0, hi: number = n - 1, ans: number = -1;
while (lo <= hi) {
  const mid: number = lo + ((hi - lo) >> 1);
  if (arr[mid] >= target) { ans = mid; hi = mid - 1; }
  else lo = mid + 1;
}
console.log(ans);`,
      html: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Sorting &amp; Binary Search (Lower Bound)</h3>
  <p style="font-family:monospace;color:#38bdf8">[1, 3, 5, 7, 9] >= 7 -> First index: 3</p>
</body></html>`,
    },
  },

  22: CHAPTER_SPECS[10],
  23: CHAPTER_SPECS[12],
  24: {
    ...CHAPTER_SPECS[13],
    starterCode: {
      ...CHAPTER_SPECS[13].starterCode,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0] || 0;
const taskQueue = nums.slice(1, 1 + n).map((val) => () => val);
let total = 0;
for (const runWorker of taskQueue) total += runWorker();
console.log(total);`,
      typescript: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0] || 0;
const taskQueue: Array<() => number> = nums.slice(1, 1 + n).map((val) => () => val);
let total: number = 0;
for (const runWorker of taskQueue) total += runWorker();
console.log(total);`,
    },
  },
  25: CHAPTER_SPECS[15],
};
