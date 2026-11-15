import type { CompiledLanguageId, DryRunRow, Problem, SystemChallenge, TestCase } from '../types/academy';
import { ALL_ARENA_KERNELS } from './arenaKernels';
import { createRng, randInt } from './arenaKernels/types';

interface SysKernel {
  id: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  hints: [string, string, string];
  timeComplexity: string;
  spaceComplexity: string;
  bruteComplexity: string;
  betterComplexity: string;
  bruteIntuition: string;
  bruteBangla: string;
  bruteWhyTle: string;
  brutePseudo: string;
  betterIntuition: string;
  betterBangla: string;
  betterTradeoff: string;
  betterPseudo: string;
  optimalIntuition: string;
  optimalBangla: string;
  optimalWhyWins: string;
  optimalPseudo: string;
  banglaEditorial: string;
  dryRunSteps: DryRunRow[];
  solveJs: (stdin: string) => string;
  generateInputs: (seed: number) => { sampleInputs: string[]; hiddenInputs: string[] };
  starterTemplates: Record<CompiledLanguageId, string>;
  solutions: Record<CompiledLanguageId, string>;
}

function sysStarter(lang: CompiledLanguageId, name: string): string {
  switch (lang) {
    case 'c':
      return `#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n// System Challenge: ${name}\nint main(void) {\n    // Parse commands from stdin and emit protocol output\n    return 0;\n}\n`;
    case 'cpp':
      return `#include <bits/stdc++.h>\nusing namespace std;\n\n// System Challenge: ${name}\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}\n`;
    case 'python':
      return `import sys\n\n# System Challenge: ${name}\ndef solve() -> None:\n    lines = sys.stdin.read().strip().splitlines()\n    if not lines:\n        return\n\nif __name__ == "__main__":\n    solve()\n`;
    case 'java':
      return `import java.io.*;\nimport java.util.*;\n\n// System Challenge: ${name}\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n    }\n}\n`;
    case 'javascript':
      return `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\n\n// System Challenge: ${name}\nconst lines = raw.trim().split(/\\r?\\n/);\n`;
    case 'typescript':
      return `import * as fs from 'fs';\n\n// System Challenge: ${name}\nconst lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);\n`;
    case 'rust':
      return `use std::io::{self, Read};\n\n// System Challenge: ${name}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n}\n`;
  }
}

const SYS_KERNELS: Record<string, SysKernel> = {
  // 1. O(1) LRU Cache Engine (Doubly Linked List / Ordered Map semantics)
  lru_cache_engine: {
    id: 'lru_cache_engine',
    inputFormat: 'First line: capacity C (1 <= C <= 10^4) and Q commands (1 <= Q <= 5*10^4). Next Q lines: either "PUT k v" (1 <= k, v <= 10^9) or "GET k".',
    outputFormat: 'For every GET k command, print the cached integer value on its own line, or -1 if missing/evicted.',
    constraints: ['1 <= C <= 10^4', '1 <= Q <= 5 * 10^4', 'O(1) average per GET and PUT'],
    hints: [
      'A plain hash map cannot track recency in O(1); pair a hash map (key -> node) with a doubly linked list ordered by recency.',
      'In JS/TS/Python, Map / OrderedDict preserves insertion order so deleting + re-inserting moves a key to Most Recently Used in O(1).',
      'Always refresh recency on BOTH GET hits and PUT updates on existing keys before checking eviction when size exceeds C.',
    ],
    timeComplexity: 'O(1) per GET/PUT',
    spaceComplexity: 'O(C)',
    bruteComplexity: 'O(C * Q)',
    betterComplexity: 'O(Q log C)',
    bruteIntuition: 'Scan an array of (key, value, timestamp) entries linearly on every GET and PUT.',
    bruteBangla: 'প্রতিটি GET এবং PUT অপারেশনে পুরো অ্যারে স্ক্যান করে পুরোনো আইটেম খোঁজা।',
    bruteWhyTle: 'O(C * Q) reaches 5 * 10^8 operations for large caches.',
    brutePseudo: 'on GET/PUT: scan entries to update or evict min(lastUsed)',
    betterIntuition: 'Use a balanced BST or heap of timestamps with lazy deletion.',
    betterBangla: 'হিপ বা ট্রি ব্যবহার করে O(log C) সময়ে টাইমস্ট্যাম্প ম্যানেজ করা।',
    betterTradeoff: 'O(log C) per operation instead of true O(1) cache guarantees.',
    betterPseudo: 'map[k]=ver; heap.push((ver, k))',
    optimalIntuition: 'Combine Hash Map + Doubly Linked List (or ordered Map move-to-back) so both GET promotion and LRU head eviction run in O(1).',
    optimalBangla: 'হ্যাশ ম্যাপের সাথে ডাবলি লিংকড লিস্ট (বা অর্ডারড ম্যাপ) যুক্ত করে O(1) সময়ে রিসেন্সি আপডেট ও ইভিকশন।',
    optimalWhyWins: 'Strict O(1) per operation regardless of cache size C.',
    optimalPseudo: 'GET k -> move node to tail, return val; PUT k v -> update/insert at tail, if len>C pop head',
    banglaEditorial: 'LRU ক্যাশে দুইটি কাজ O(1)-এ করতে হয়: কী খোঁজা (Hash Map) আর সবচেয়ে পুরোনো কী সরানো (Doubly Linked List বা JS Map insertion order)।',
    dryRunSteps: [
      { step: 1, state: 'C=2; PUT 1 10, PUT 2 20', memoryOrStack: 'order=[1:10, 2:20]', note: '2 is MRU, 1 is LRU' },
      { step: 2, state: 'GET 1', memoryOrStack: 'order=[2:20, 1:10] -> out 10', note: '1 promoted to MRU' },
      { step: 3, state: 'PUT 3 30', memoryOrStack: 'evict 2 -> order=[1:10, 3:30]', note: 'LRU key 2 evicted' },
      { step: 4, state: 'GET 2', memoryOrStack: 'out -1', note: 'Evicted key returns -1' },
    ],
    solveJs: (stdin: string) => {
      const lines = stdin.trim().split(/\r?\n/);
      if (!lines[0]) return '';
      const [cap, q] = lines[0].trim().split(/\s+/).map(Number);
      const cache = new Map<number, number>();
      const out: string[] = [];
      for (let i = 1; i <= q; i++) {
        const parts = lines[i].trim().split(/\s+/);
        if (parts[0] === 'GET') {
          const k = Number(parts[1]);
          if (!cache.has(k)) out.push('-1');
          else {
            const v = cache.get(k)!;
            cache.delete(k);
            cache.set(k, v);
            out.push(String(v));
          }
        } else {
          const k = Number(parts[1]);
          const v = Number(parts[2]);
          if (cache.has(k)) cache.delete(k);
          cache.set(k, v);
          if (cache.size > cap) {
            const oldestKey = cache.keys().next().value as number;
            cache.delete(oldestKey);
          }
        }
      }
      return out.join('\n');
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = [
        '2 7\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nPUT 4 40\nGET 1',
        '1 5\nPUT 5 50\nGET 5\nPUT 6 60\nGET 5\nGET 6',
      ];
      const hidden = [
        '2 6\nGET 1\nPUT 1 100\nPUT 1 200\nGET 1\nPUT 2 300\nGET 1',
        '3 8\nPUT 1 1\nPUT 2 2\nPUT 3 3\nGET 1\nGET 2\nPUT 4 4\nGET 3\nGET 1',
      ];
      for (let t = 0; t < 10; t++) {
        const cap = randInt(rng, 2, 8);
        const q = randInt(rng, 18, 45);
        const cmds: string[] = [`${cap} ${q}`];
        let hasGet = false;
        for (let i = 0; i < q; i++) {
          if (i === q - 1 || (!hasGet && i > 4) || rng() < 0.45) {
            cmds.push(`GET ${randInt(rng, 1, cap + 4)}`);
            hasGet = true;
          } else {
            cmds.push(`PUT ${randInt(rng, 1, cap + 4)} ${randInt(rng, 10, 999)}`);
          }
        }
        hidden.push(cmds.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: sysStarter('c', 'LRU Cache Engine'),
      cpp: sysStarter('cpp', 'LRU Cache Engine'),
      python: sysStarter('python', 'LRU Cache Engine'),
      java: sysStarter('java', 'LRU Cache Engine'),
      javascript: sysStarter('javascript', 'LRU Cache Engine'),
      typescript: sysStarter('typescript', 'LRU Cache Engine'),
      rust: sysStarter('rust', 'LRU Cache Engine'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct Node { int k, v; struct Node *prev, *next; } Node;
int main(void) {
    int cap, q;
    if (scanf("%d %d", &cap, &q) != 2) return 0;
    Node *head = calloc(1, sizeof(Node)), *tail = calloc(1, sizeof(Node));
    head->next = tail; tail->prev = head;
    int sz = 0;
    for (int i = 0; i < q; i++) {
        char op[8]; int k;
        scanf("%s %d", op, &k);
        Node *found = NULL;
        for (Node *cur = head->next; cur != tail; cur = cur->next) if (cur->k == k) { found = cur; break; }
        if (op[0] == 'G') {
            if (!found) { printf("-1\\n"); continue; }
            found->prev->next = found->next; found->next->prev = found->prev;
            found->prev = tail->prev; found->next = tail;
            tail->prev->next = found; tail->prev = found;
            printf("%d\\n", found->v);
        } else {
            int v; scanf("%d", &v);
            if (found) {
                found->v = v;
                found->prev->next = found->next; found->next->prev = found->prev;
            } else {
                if (sz == cap) {
                    Node *old = head->next;
                    head->next = old->next; old->next->prev = head;
                    free(old); sz--;
                }
                found = malloc(sizeof(Node)); found->k = k; found->v = v; sz++;
            }
            found->prev = tail->prev; found->next = tail;
            tail->prev->next = found; tail->prev = found;
        }
    }
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int cap, q;
    if (!(cin >> cap >> q)) return 0;
    list<pair<int, int>> dll;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
    while (q--) {
        string op; int k;
        cin >> op >> k;
        if (op == "GET") {
            auto it = mp.find(k);
            if (it == mp.end()) cout << -1 << "\\n";
            else {
                dll.splice(dll.end(), dll, it->second);
                cout << it->second->second << "\\n";
            }
        } else {
            int v; cin >> v;
            auto it = mp.find(k);
            if (it != mp.end()) {
                it->second->second = v;
                dll.splice(dll.end(), dll, it->second);
            } else {
                if ((int)dll.size() == cap) {
                    mp.erase(dll.front().first);
                    dll.pop_front();
                }
                dll.push_back({k, v});
                mp[k] = prev(dll.end());
            }
        }
    }
    return 0;
}`,
      python: `import sys
from collections import OrderedDict
def solve():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    cap, q = map(int, lines[0].split())
    cache = OrderedDict()
    out = []
    for i in range(1, q + 1):
        parts = lines[i].split()
        if parts[0] == 'GET':
            k = int(parts[1])
            if k not in cache: out.append('-1')
            else:
                cache.move_to_end(k)
                out.append(str(cache[k]))
        else:
            k, v = int(parts[1]), int(parts[2])
            if k in cache: cache.move_to_end(k)
            cache[k] = v
            if len(cache) > cap: cache.popitem(last=False)
    if out: print("\\n".join(out))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int cap = Integer.parseInt(st.nextToken());
        int q = Integer.parseInt(st.nextToken());
        LinkedHashMap<Integer, Integer> map = new LinkedHashMap<>(cap, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > cap;
            }
        };
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            st = new StringTokenizer(br.readLine());
            String op = st.nextToken();
            int k = Integer.parseInt(st.nextToken());
            if (op.equals("GET")) {
                sb.append(map.getOrDefault(k, -1)).append('\\n');
            } else {
                int v = Integer.parseInt(st.nextToken());
                map.put(k, v);
            }
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
if (lines[0]) {
  const [cap, q] = lines[0].trim().split(/\\s+/).map(Number);
  const cache = new Map();
  const out = [];
  for (let i = 1; i <= q; i++) {
    const parts = lines[i].trim().split(/\\s+/);
    if (parts[0] === 'GET') {
      const k = Number(parts[1]);
      if (!cache.has(k)) out.push('-1');
      else { const v = cache.get(k); cache.delete(k); cache.set(k, v); out.push(String(v)); }
    } else {
      const k = Number(parts[1]), v = Number(parts[2]);
      if (cache.has(k)) cache.delete(k);
      cache.set(k, v);
      if (cache.size > cap) cache.delete(cache.keys().next().value);
    }
  }
  console.log(out.join('\\n'));
}`,
      typescript: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
if (lines[0]) {
  const hdr: number[] = lines[0].trim().split(/\\s+/).map(Number);
  const cap: number = hdr[0];
  const q: number = hdr[1];
  const cache: Map<number, number> = new Map<number, number>();
  const out: string[] = [];
  for (let i = 1; i <= q; i++) {
    const parts: string[] = lines[i].trim().split(/\\s+/);
    if (parts[0] === 'GET') {
      const k: number = Number(parts[1]);
      if (!cache.has(k)) {
        out.push('-1');
      } else {
        const v: number = cache.get(k)!;
        cache.delete(k);
        cache.set(k, v);
        out.push(String(v));
      }
    } else {
      const k: number = Number(parts[1]);
      const v: number = Number(parts[2]);
      if (cache.has(k)) cache.delete(k);
      cache.set(k, v);
      if (cache.size > cap) {
        const first: number = cache.keys().next().value as number;
        cache.delete(first);
      }
    }
  }
  console.log(out.join('\\n'));
}`,
      rust: `use std::collections::{HashMap, VecDeque};
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let cap: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let q: usize = it.next().unwrap().parse().unwrap();
    let mut map: HashMap<i64, (i64, usize)> = HashMap::new();
    let mut order: VecDeque<(i64, usize)> = VecDeque::new();
    let mut ver = 0usize;
    for _ in 0..q {
        let op = it.next().unwrap();
        let k: i64 = it.next().unwrap().parse().unwrap();
        ver += 1;
        if op == "GET" {
            if let Some(entry) = map.get_mut(&k) {
                entry.1 = ver;
                order.push_back((k, ver));
                println!("{}", entry.0);
            } else { println!("-1"); }
        } else {
            let v: i64 = it.next().unwrap().parse().unwrap();
            map.insert(k, (v, ver));
            order.push_back((k, ver));
            while map.len() > cap {
                if let Some((ok, ov)) = order.pop_front() {
                    if let Some(&(_, cur_v)) = map.get(&ok) {
                        if cur_v == ov { map.remove(&ok); }
                    }
                }
            }
        }
    }
}`,
    },
  },

  // 2. Token Bucket Rate Limiter (Multi-Tenant Per-Key Refill Engine)
  token_bucket_limiter: {
    id: 'token_bucket_limiter',
    inputFormat: 'First line: capacity C, refillRatePerSec R, and Q requests. Next Q lines: "timestamp key cost" sorted by non-decreasing integer timestamp.',
    outputFormat: 'For each request print "ALLOW remaining" if tokens >= cost after refill (subtracting cost), else "DENY remaining" without deducting.',
    constraints: ['1 <= C <= 10^6', '1 <= R <= 10^5', 'Timestamps non-decreasing up to 10^9'],
    hints: [
      'Initialize every unseen tenant key with full capacity C at its first timestamp.',
      'Before checking cost, refill: tokens = min(C, tokens + (ts - lastTs) * R), and update lastTs = ts.',
      'Only deduct cost when tokens >= cost; on DENY, keep the refilled token count capped at C.',
    ],
    timeComplexity: 'O(1) per request',
    spaceComplexity: 'O(K) active tenants',
    bruteComplexity: 'O(T_max * K)',
    betterComplexity: 'O(Q) float',
    bruteIntuition: 'Simulate every single elapsed second tick in a loop refilling all active keys.',
    bruteBangla: 'প্রতি সেকেন্ডে লুপ চালিয়ে সব ইউজারের টোকেন রিফিল করা।',
    bruteWhyTle: 'Timestamp jumps up to 10^9 cause immediate TLE.',
    brutePseudo: 'for sec=lastTs+1..ts: for key in keys: tokens[key]=min(C, tokens[key]+R)',
    betterIntuition: 'Lazy refill only when a key receives a request, using floating point numbers.',
    betterBangla: 'ফ্লোটিং পয়েন্ট ব্যবহার করে রিকোয়েস্ট আসার সময় টোকেন আপডেট।',
    betterTradeoff: 'Integer math is exact; floating point loses precision on large timestamps.',
    betterPseudo: 'tokens = min(C, tokens + (ts - last) * R)',
    optimalIntuition: 'Lazy per-key integer refill: on each request (ts, key, cost), initialize (C, ts) if unseen, refill min(C, tok + (ts - last)*R), then allow/deny atomically.',
    optimalBangla: 'প্রতিটি কী-এর শেষ টাইমস্ট্যাম্প রেখে (ts - last) * R যোগ করে O(1) সময়ে নির্ভুল রেট লিমিটিং।',
    optimalWhyWins: 'O(1) per request, exact integer arithmetic, supports billions of idle seconds cleanly.',
    optimalPseudo: 'tok=min(C, tok+(ts-last)*R); last=ts; if tok>=cost: tok-=cost; print ALLOW else DENY',
    banglaEditorial: 'প্রতি সেকেন্ডে টোকেন না বাড়িয়ে কেবল রিকোয়েস্ট আসার মুহূর্তেই (বর্তমান সময় - শেষ সময়) * R দিয়ে অলসভাবে (lazy refill) টোকেন আপডেট করলেই O(1) সময়ে পারফেক্ট রেট লিমিটার তৈরি হয়।',
    dryRunSteps: [
      { step: 1, state: 'C=10, R=2; req t=0 u1 cost=4', memoryOrStack: 'u1: min(10, 10+0)=10 -> 6', note: 'ALLOW 6' },
      { step: 2, state: 'req t=1 u1 cost=8', memoryOrStack: 'u1: min(10, 6+1*2)=8 -> 0', note: 'ALLOW 0' },
      { step: 3, state: 'req t=1 u1 cost=1', memoryOrStack: 'u1: 0 < 1', note: 'DENY 0' },
      { step: 4, state: 'req t=4 u1 cost=5', memoryOrStack: 'u1: min(10, 0+3*2)=6 -> 1', note: 'ALLOW 1' },
    ],
    solveJs: (stdin: string) => {
      const lines = stdin.trim().split(/\r?\n/);
      if (!lines[0]) return '';
      const [capStr, rateStr, qStr] = lines[0].trim().split(/\s+/);
      const C = BigInt(capStr);
      const R = BigInt(rateStr);
      const q = Number(qStr);
      const state = new Map<string, [bigint, bigint]>();
      const out: string[] = [];
      for (let i = 1; i <= q; i++) {
        const [tsStr, key, costStr] = lines[i].trim().split(/\s+/);
        const ts = BigInt(tsStr);
        const cost = BigInt(costStr);
        let cur = state.get(key);
        if (!cur) cur = [C, ts];
        else {
          let refilled = cur[0] + (ts - cur[1]) * R;
          if (refilled > C) refilled = C;
          cur[0] = refilled;
          cur[1] = ts;
        }
        if (cur[0] >= cost) {
          cur[0] -= cost;
          out.push(`ALLOW ${cur[0]}`);
        } else {
          out.push(`DENY ${cur[0]}`);
        }
        state.set(key, cur);
      }
      return out.join('\n');
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = [
        '10 2 4\n0 u1 4\n1 u1 8\n1 u1 1\n4 u1 5',
        '5 1 4\n0 apiA 5\n2 apiA 3\n2 apiB 4\n3 apiA 3',
      ];
      const hidden = [
        '10 3 5\n0 k1 10\n1000000 k1 10\n1000000 k1 1\n1000001 k1 2\n1000002 k1 4',
        '4 1 5\n5 a 2\n5 a 3\n6 a 3\n7 a 4\n10 a 4',
      ];
      for (let t = 0; t < 10; t++) {
        const cap = randInt(rng, 5, 25);
        const rate = randInt(rng, 1, 5);
        const q = randInt(rng, 12, 30);
        const cmds: string[] = [`${cap} ${rate} ${q}`];
        let ts = 0;
        const tenants = ['tA', 'tB', 'tC'];
        for (let i = 0; i < q; i++) {
          ts += randInt(rng, 0, 3);
          const key = tenants[randInt(rng, 0, 2)];
          const cost = randInt(rng, 1, cap + 3);
          cmds.push(`${ts} ${key} ${cost}`);
        }
        hidden.push(cmds.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: sysStarter('c', 'Token Bucket Rate Limiter'),
      cpp: sysStarter('cpp', 'Token Bucket Rate Limiter'),
      python: sysStarter('python', 'Token Bucket Rate Limiter'),
      java: sysStarter('java', 'Token Bucket Rate Limiter'),
      javascript: sysStarter('javascript', 'Token Bucket Rate Limiter'),
      typescript: sysStarter('typescript', 'Token Bucket Rate Limiter'),
      rust: sysStarter('rust', 'Token Bucket Rate Limiter'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <string.h>
typedef struct { char key[64]; long long tok, last; } Bucket;
int main(void) {
    long long C, R; int Q;
    if (scanf("%lld %lld %d", &C, &R, &Q) != 3) return 0;
    Bucket b[256]; int n = 0;
    for (int i = 0; i < Q; i++) {
        long long ts, cost; char key[64];
        scanf("%lld %s %lld", &ts, key, &cost);
        int idx = -1;
        for (int j = 0; j < n; j++) if (strcmp(b[j].key, key) == 0) { idx = j; break; }
        if (idx == -1) { idx = n++; strcpy(b[idx].key, key); b[idx].tok = C; b[idx].last = ts; }
        else {
            long long add = (ts - b[idx].last) * R;
            b[idx].tok = b[idx].tok + add > C ? C : b[idx].tok + add;
            b[idx].last = ts;
        }
        if (b[idx].tok >= cost) { b[idx].tok -= cost; printf("ALLOW %lld\\n", b[idx].tok); }
        else { printf("DENY %lld\\n", b[idx].tok); }
    }
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long C, R; int Q;
    if (!(cin >> C >> R >> Q)) return 0;
    unordered_map<string, pair<long long, long long>> mp;
    while (Q--) {
        long long ts, cost; string key;
        cin >> ts >> key >> cost;
        auto it = mp.find(key);
        if (it == mp.end()) mp[key] = {C, ts};
        else {
            long long refilled = it->second.first + (ts - it->second.second) * R;
            it->second.first = min(C, refilled);
            it->second.second = ts;
        }
        auto &b = mp[key];
        if (b.first >= cost) { b.first -= cost; cout << "ALLOW " << b.first << "\\n"; }
        else { cout << "DENY " << b.first << "\\n"; }
    }
    return 0;
}`,
      python: `import sys
def solve():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    C, R, Q = map(int, lines[0].split())
    mp = {}
    out = []
    for i in range(1, Q + 1):
        ts_s, key, cost_s = lines[i].split()
        ts, cost = int(ts_s), int(cost_s)
        if key not in mp: mp[key] = [C, ts]
        else:
            tok, last = mp[key]
            mp[key][0] = min(C, tok + (ts - last) * R)
            mp[key][1] = ts
        if mp[key][0] >= cost:
            mp[key][0] -= cost
            out.append(f"ALLOW {mp[key][0]}")
        else:
            out.append(f"DENY {mp[key][0]}")
    print("\\n".join(out))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        long C = Long.parseLong(st.nextToken());
        long R = Long.parseLong(st.nextToken());
        int Q = Integer.parseInt(st.nextToken());
        Map<String, long[]> mp = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Q; i++) {
            st = new StringTokenizer(br.readLine());
            long ts = Long.parseLong(st.nextToken());
            String key = st.nextToken();
            long cost = Long.parseLong(st.nextToken());
            long[] b = mp.get(key);
            if (b == null) { b = new long[]{C, ts}; mp.put(key, b); }
            else { b[0] = Math.min(C, b[0] + (ts - b[1]) * R); b[1] = ts; }
            if (b[0] >= cost) { b[0] -= cost; sb.append("ALLOW ").append(b[0]).append('\\n'); }
            else { sb.append("DENY ").append(b[0]).append('\\n'); }
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
if (lines[0]) {
  const [cS, rS, qS] = lines[0].trim().split(/\\s+/);
  const C = BigInt(cS), R = BigInt(rS), Q = Number(qS);
  const mp = new Map();
  const out = [];
  for (let i = 1; i <= Q; i++) {
    const [tS, key, costS] = lines[i].trim().split(/\\s+/);
    const ts = BigInt(tS), cost = BigInt(costS);
    let b = mp.get(key);
    if (!b) b = [C, ts];
    else {
      let ref = b[0] + (ts - b[1]) * R;
      if (ref > C) ref = C;
      b[0] = ref; b[1] = ts;
    }
    if (b[0] >= cost) { b[0] -= cost; out.push('ALLOW ' + b[0]); }
    else out.push('DENY ' + b[0]);
    mp.set(key, b);
  }
  console.log(out.join('\\n'));
}`,
      typescript: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
if (lines[0]) {
  const hdr: string[] = lines[0].trim().split(/\\s+/);
  const C: bigint = BigInt(hdr[0]);
  const R: bigint = BigInt(hdr[1]);
  const Q: number = Number(hdr[2]);
  const tokMap: Map<string, bigint> = new Map<string, bigint>();
  const tsMap: Map<string, bigint> = new Map<string, bigint>();
  const out: string[] = [];
  for (let i = 1; i <= Q; i++) {
    const pts: string[] = lines[i].trim().split(/\\s+/);
    const ts: bigint = BigInt(pts[0]);
    const key: string = pts[1];
    const cost: bigint = BigInt(pts[2]);
    let tok: bigint = C;
    if (tokMap.has(key)) {
      const prevTok: bigint = tokMap.get(key)!;
      const prevTs: bigint = tsMap.get(key)!;
      tok = prevTok + (ts - prevTs) * R;
      if (tok > C) tok = C;
    }
    if (tok >= cost) {
      tok -= cost;
      out.push('ALLOW ' + tok.toString());
    } else {
      out.push('DENY ' + tok.toString());
    }
    tokMap.set(key, tok);
    tsMap.set(key, ts);
  }
  console.log(out.join('\\n'));
}`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let c: i64 = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let r: i64 = it.next().unwrap().parse().unwrap();
    let q: usize = it.next().unwrap().parse().unwrap();
    let mut mp: HashMap<String, (i64, i64)> = HashMap::new();
    for _ in 0..q {
        let ts: i64 = it.next().unwrap().parse().unwrap();
        let key = it.next().unwrap().to_string();
        let cost: i64 = it.next().unwrap().parse().unwrap();
        let entry = mp.entry(key).or_insert((c, ts));
        let refilled = (entry.0 + (ts - entry.1) * r).min(c);
        entry.0 = refilled;
        entry.1 = ts;
        if entry.0 >= cost {
            entry.0 -= cost;
            println!("ALLOW {}", entry.0);
        } else {
            println!("DENY {}", entry.0);
        }
    }
}`,
    },
  },

  // 3. In-Memory Transactional Key-Value Store (Nested BEGIN / COMMIT / ROLLBACK)
  transactional_kv_store: {
    id: 'transactional_kv_store',
    inputFormat: 'First line: integer Q (1 <= Q <= 5*10^4). Next Q lines: commands among "SET k v", "UNSET k", "GET k", "BEGIN", "ROLLBACK", "COMMIT".',
    outputFormat: 'Print output for GET (value or NULL), and print "NO TRANSACTION" if ROLLBACK or COMMIT is called when no active transaction exists.',
    constraints: ['1 <= Q <= 5 * 10^4', 'Arbitrary nested transactions supported', 'O(1) SET/GET/BEGIN; COMMIT merges into parent or base store'],
    hints: [
      'Maintain a base map plus a stack of delta frames (one Map per active BEGIN block).',
      'Use a sentinel value (like TOMBSTONE / null) inside transaction delta frames so UNSET inside a nested transaction shadows outer SETs cleanly!',
      'ROLLBACK simply pops the top delta frame in O(1); COMMIT merges the top frame into the frame directly underneath (or the base store).',
    ],
    timeComplexity: 'O(1) GET/SET/BEGIN/ROLLBACK; amortized O(1) COMMIT',
    spaceComplexity: 'O(U) changed keys',
    bruteComplexity: 'O(N * Q)',
    betterComplexity: 'O(Q) undo log',
    bruteIntuition: 'Deep-clone the entire key-value store on every BEGIN.',
    bruteBangla: 'প্রতিটি BEGIN-এ পুরো ডেটাবেসের কপি তৈরি করা।',
    bruteWhyTle: 'Cloning N keys across T nested transactions is O(N * T) -> TLE & OOM.',
    brutePseudo: 'BEGIN -> stack.push(copy(currentDB))',
    betterIntuition: 'Keep an undo log of old values per key for every mutation.',
    betterBangla: 'প্রতি পরিবর্তনের আগের মান আনডু লগে রাখা।',
    betterTradeoff: 'Delta frames with tombstones are even cleaner for nested COMMITs.',
    betterPseudo: 'stack of undo logs',
    optimalIntuition: 'Stack of per-transaction overlay delta maps with explicit NULL tombstones. GET reads top-to-bottom until first hit; ROLLBACK pops top overlay.',
    optimalBangla: 'ট্রানজ্যাকশন প্রতি ডেল্টা ওভারলে স্ট্যাক ও টম্বস্টোন মার্কার রাখলে O(1)-এ BEGIN/ROLLBACK হয় এবং নেস্টেড COMMIT নিরাপদে মার্জ হয়।',
    optimalWhyWins: 'Zero full-DB copies, clean nested isolation, exact UNSET shadowing.',
    optimalPseudo: 'stack=[base]; BEGIN->stack.push({}); SET/UNSET->stack.top[k]=val|NULL; ROLLBACK->pop(); COMMIT->merge top into below',
    banglaEditorial: 'প্রতিবার BEGIN হলে পুরো ডেটাবেস কপি না করে স্ট্যাকে কেবল নতুন পরিবর্তনগুলো (delta map) রাখুন। UNSET করলে কী ডিলিট না করে TOMBSTONE রেখে দিন যাতে নিচের পুরোনো মান ঢেকে যায়।',
    dryRunSteps: [
      { step: 1, state: 'SET a 10; BEGIN; SET a 20; GET a', memoryOrStack: 'base={a:10}, tx1={a:20} -> 20', note: 'Top frame shadows base' },
      { step: 2, state: 'BEGIN; UNSET a; GET a', memoryOrStack: 'tx2={a:TOMBSTONE} -> NULL', note: 'Tombstone hides outer 20 & 10' },
      { step: 3, state: 'ROLLBACK; GET a', memoryOrStack: 'tx2 popped -> 20', note: 'Restored tx1 view' },
      { step: 4, state: 'COMMIT; GET a', memoryOrStack: 'base={a:20} -> 20', note: 'Merged into base' },
    ],
    solveJs: (stdin: string) => {
      const lines = stdin.trim().split(/\r?\n/);
      if (!lines[0]) return '';
      const q = Number(lines[0]);
      const base = new Map<string, string>();
      const stack: Array<Map<string, string | null>> = [];
      const out: string[] = [];
      for (let i = 1; i <= q; i++) {
        const pts = lines[i].trim().split(/\s+/);
        const op = pts[0];
        if (op === 'SET') {
          const target = stack.length ? stack[stack.length - 1] : base;
          target.set(pts[1], pts[2]);
        } else if (op === 'UNSET') {
          if (stack.length) stack[stack.length - 1].set(pts[1], null);
          else base.delete(pts[1]);
        } else if (op === 'GET') {
          let found: string | null | undefined = undefined;
          for (let s = stack.length - 1; s >= 0; s--) {
            if (stack[s].has(pts[1])) {
              found = stack[s].get(pts[1]);
              break;
            }
          }
          if (found === undefined) found = base.get(pts[1]);
          out.push(found === undefined || found === null ? 'NULL' : found);
        } else if (op === 'BEGIN') {
          stack.push(new Map());
        } else if (op === 'ROLLBACK') {
          if (!stack.length) out.push('NO TRANSACTION');
          else stack.pop();
        } else if (op === 'COMMIT') {
          if (!stack.length) out.push('NO TRANSACTION');
          else {
            const top = stack.pop()!;
            if (stack.length) {
              const parent = stack[stack.length - 1];
              for (const [k, v] of top.entries()) parent.set(k, v);
            } else {
              for (const [k, v] of top.entries()) {
                if (v === null) base.delete(k);
                else base.set(k, v);
              }
            }
          }
        }
      }
      return out.join('\n');
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = [
        '11\nSET a 10\nBEGIN\nSET a 20\nGET a\nBEGIN\nUNSET a\nGET a\nROLLBACK\nGET a\nCOMMIT\nGET a',
        '6\nROLLBACK\nCOMMIT\nBEGIN\nSET x 5\nROLLBACK\nGET x',
      ];
      const hidden = [
        '9\nBEGIN\nSET k 1\nBEGIN\nSET k 2\nCOMMIT\nGET k\nROLLBACK\nGET k\nSET k 9',
        '8\nSET x 7\nBEGIN\nUNSET x\nCOMMIT\nGET x\nBEGIN\nSET x 3\nGET x',
      ];
      const keys = ['k1', 'k2', 'k3', 'k4'];
      for (let t = 0; t < 10; t++) {
        const cmds: string[] = [];
        let depth = 0;
        const steps = randInt(rng, 16, 35);
        for (let i = 0; i < steps - 2; i++) {
          const r = rng();
          const k = keys[randInt(rng, 0, keys.length - 1)];
          if (r < 0.28) cmds.push(`SET ${k} ${randInt(rng, 1, 99)}`);
          else if (r < 0.42) cmds.push(`UNSET ${k}`);
          else if (r < 0.65) cmds.push(`GET ${k}`);
          else if (r < 0.78 && depth < 3) { cmds.push('BEGIN'); depth++; }
          else if (r < 0.9) { cmds.push('ROLLBACK'); if (depth > 0) depth--; }
          else { cmds.push('COMMIT'); if (depth > 0) depth--; }
        }
        cmds.push(`GET k1`);
        cmds.push(`GET k2`);
        hidden.push(`${cmds.length}\n${cmds.join('\n')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: sysStarter('c', 'Transactional KV Store'),
      cpp: sysStarter('cpp', 'Transactional KV Store'),
      python: sysStarter('python', 'Transactional KV Store'),
      java: sysStarter('java', 'Transactional KV Store'),
      javascript: sysStarter('javascript', 'Transactional KV Store'),
      typescript: sysStarter('typescript', 'Transactional KV Store'),
      rust: sysStarter('rust', 'Transactional KV Store'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <string.h>
typedef struct { char k[32], v[32]; int alive; } Entry;
typedef struct { Entry e[256]; int n; } Frame;
static Frame frames[64];
static int top = 0;
void set_val(Frame *f, const char *k, const char *v, int alive) {
    for (int i = 0; i < f->n; i++) if (strcmp(f->e[i].k, k) == 0) {
        strcpy(f->e[i].v, v); f->e[i].alive = alive; return;
    }
    strcpy(f->e[f->n].k, k); strcpy(f->e[f->n].v, v); f->e[f->n].alive = alive; f->n++;
}
int main(void) {
    int q; if (scanf("%d", &q) != 1) return 0;
    while (q--) {
        char op[16]; scanf("%s", op);
        if (strcmp(op, "SET") == 0) { char k[32], v[32]; scanf("%s %s", k, v); set_val(&frames[top], k, v, 1); }
        else if (strcmp(op, "UNSET") == 0) { char k[32]; scanf("%s", k); set_val(&frames[top], k, "", 0); }
        else if (strcmp(op, "GET") == 0) {
            char k[32]; scanf("%s", k);
            int found = 0;
            for (int f = top; f >= 0 && !found; f--) {
                for (int i = 0; i < frames[f].n; i++) if (strcmp(frames[f].e[i].k, k) == 0) {
                    printf("%s\\n", frames[f].e[i].alive ? frames[f].e[i].v : "NULL");
                    found = 1; break;
                }
            }
            if (!found) printf("NULL\\n");
        } else if (strcmp(op, "BEGIN") == 0) { frames[++top].n = 0; }
        else if (strcmp(op, "ROLLBACK") == 0) {
            if (top == 0) printf("NO TRANSACTION\\n"); else top--;
        } else if (strcmp(op, "COMMIT") == 0) {
            if (top == 0) printf("NO TRANSACTION\\n");
            else {
                for (int i = 0; i < frames[top].n; i++) set_val(&frames[top-1], frames[top].e[i].k, frames[top].e[i].v, frames[top].e[i].alive);
                top--;
            }
        }
    }
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q; if (!(cin >> q)) return 0;
    vector<unordered_map<string, pair<bool, string>>> st(1);
    while (q--) {
        string op; cin >> op;
        if (op == "SET") { string k, v; cin >> k >> v; st.back()[k] = {true, v}; }
        else if (op == "UNSET") { string k; cin >> k; st.back()[k] = {false, ""}; }
        else if (op == "GET") {
            string k; cin >> k;
            bool done = false;
            for (int i = (int)st.size() - 1; i >= 0; i--) {
                auto it = st[i].find(k);
                if (it != st[i].end()) {
                    cout << (it->second.first ? it->second.second : "NULL") << "\\n";
                    done = true; break;
                }
            }
            if (!done) cout << "NULL\\n";
        } else if (op == "BEGIN") { st.emplace_back(); }
        else if (op == "ROLLBACK") {
            if (st.size() == 1) cout << "NO TRANSACTION\\n"; else st.pop_back();
        } else if (op == "COMMIT") {
            if (st.size() == 1) cout << "NO TRANSACTION\\n";
            else {
                auto top = move(st.back()); st.pop_back();
                for (auto &[k, val] : top) st.back()[k] = val;
            }
        }
    }
    return 0;
}`,
      python: `import sys
def solve():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    q = int(lines[0])
    stack = [{}]
    out = []
    for i in range(1, q + 1):
        p = lines[i].split()
        op = p[0]
        if op == 'SET': stack[-1][p[1]] = p[2]
        elif op == 'UNSET': stack[-1][p[1]] = None
        elif op == 'GET':
            res = 'NULL'
            for frame in reversed(stack):
                if p[1] in frame:
                    res = frame[p[1]] if frame[p[1]] is not None else 'NULL'
                    break
            out.append(res)
        elif op == 'BEGIN': stack.append({})
        elif op == 'ROLLBACK':
            if len(stack) == 1: out.append('NO TRANSACTION')
            else: stack.pop()
        elif op == 'COMMIT':
            if len(stack) == 1: out.append('NO TRANSACTION')
            else:
                top = stack.pop()
                stack[-1].update(top)
    if out: print("\\n".join(out))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static final String TOMB = "\\u0000__TOMB__";
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int q = Integer.parseInt(br.readLine().trim());
        List<Map<String, String>> st = new ArrayList<>();
        st.add(new HashMap<>());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            StringTokenizer tok = new StringTokenizer(br.readLine());
            String op = tok.nextToken();
            if (op.equals("SET")) st.get(st.size() - 1).put(tok.nextToken(), tok.nextToken());
            else if (op.equals("UNSET")) st.get(st.size() - 1).put(tok.nextToken(), TOMB);
            else if (op.equals("GET")) {
                String k = tok.nextToken(), res = "NULL";
                for (int f = st.size() - 1; f >= 0; f--) {
                    if (st.get(f).containsKey(k)) {
                        String val = st.get(f).get(k);
                        res = val.equals(TOMB) ? "NULL" : val;
                        break;
                    }
                }
                sb.append(res).append('\\n');
            } else if (op.equals("BEGIN")) st.add(new HashMap<>());
            else if (op.equals("ROLLBACK")) {
                if (st.size() == 1) sb.append("NO TRANSACTION\\n");
                else st.remove(st.size() - 1);
            } else if (op.equals("COMMIT")) {
                if (st.size() == 1) sb.append("NO TRANSACTION\\n");
                else {
                    Map<String, String> top = st.remove(st.size() - 1);
                    st.get(st.size() - 1).putAll(top);
                }
            }
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
if (lines[0]) {
  const q = Number(lines[0]);
  const stack = [new Map()];
  const out = [];
  for (let i = 1; i <= q; i++) {
    const p = lines[i].trim().split(/\\s+/);
    const op = p[0];
    if (op === 'SET') stack[stack.length - 1].set(p[1], p[2]);
    else if (op === 'UNSET') stack[stack.length - 1].set(p[1], null);
    else if (op === 'GET') {
      let ans = 'NULL';
      for (let f = stack.length - 1; f >= 0; f--) {
        if (stack[f].has(p[1])) {
          const v = stack[f].get(p[1]);
          ans = v === null ? 'NULL' : v;
          break;
        }
      }
      out.push(ans);
    } else if (op === 'BEGIN') stack.push(new Map());
    else if (op === 'ROLLBACK') {
      if (stack.length === 1) out.push('NO TRANSACTION');
      else stack.pop();
    } else if (op === 'COMMIT') {
      if (stack.length === 1) out.push('NO TRANSACTION');
      else {
        const top = stack.pop();
        for (const [k, v] of top.entries()) stack[stack.length - 1].set(k, v);
      }
    }
  }
  console.log(out.join('\\n'));
}`,
      typescript: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
if (lines[0]) {
  const q: number = Number(lines[0]);
  const TOMB = '__NULL_TOMB__';
  const stack: Map<string, string>[] = [new Map<string, string>()];
  const out: string[] = [];
  for (let i = 1; i <= q; i++) {
    const p: string[] = lines[i].trim().split(/\\s+/);
    const op: string = p[0];
    if (op === 'SET') {
      stack[stack.length - 1].set(p[1], p[2]);
    } else if (op === 'UNSET') {
      stack[stack.length - 1].set(p[1], TOMB);
    } else if (op === 'GET') {
      let ans = 'NULL';
      for (let f = stack.length - 1; f >= 0; f--) {
        if (stack[f].has(p[1])) {
          const v: string = stack[f].get(p[1])!;
          ans = v === TOMB ? 'NULL' : v;
          break;
        }
      }
      out.push(ans);
    } else if (op === 'BEGIN') {
      stack.push(new Map<string, string>());
    } else if (op === 'ROLLBACK') {
      if (stack.length === 1) out.push('NO TRANSACTION');
      else stack.pop();
    } else if (op === 'COMMIT') {
      if (stack.length === 1) out.push('NO TRANSACTION');
      else {
        const top = stack.pop()!;
        for (const entry of top.entries()) {
          stack[stack.length - 1].set(entry[0], entry[1]);
        }
      }
    }
  }
  console.log(out.join('\\n'));
}`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let q: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let mut stack: Vec<HashMap<String, Option<String>>> = vec![HashMap::new()];
    for _ in 0..q {
        let op = it.next().unwrap();
        match op {
            "SET" => {
                let k = it.next().unwrap().to_string();
                let v = it.next().unwrap().to_string();
                stack.last_mut().unwrap().insert(k, Some(v));
            }
            "UNSET" => {
                let k = it.next().unwrap().to_string();
                stack.last_mut().unwrap().insert(k, None);
            }
            "GET" => {
                let k = it.next().unwrap();
                let mut res = "NULL";
                for f in stack.iter().rev() {
                    if let Some(opt) = f.get(k) {
                        res = match opt { Some(v) => v.as_str(), None => "NULL" };
                        break;
                    }
                }
                println!("{}", res);
            }
            "BEGIN" => stack.push(HashMap::new()),
            "ROLLBACK" => {
                if stack.len() == 1 { println!("NO TRANSACTION"); } else { stack.pop(); }
            }
            "COMMIT" => {
                if stack.len() == 1 { println!("NO TRANSACTION"); } else {
                    let top = stack.pop().unwrap();
                    let parent = stack.last_mut().unwrap();
                    for (k, v) in top { parent.insert(k, v); }
                }
            }
            _ => {}
        }
    }
}`,
    },
  },

  // 4. Consistent Hashing Ring Load Balancer
  consistent_hash_ring: {
    id: 'consistent_hash_ring',
    inputFormat: 'First line: integer Q (1 <= Q <= 2*10^4). Next Q lines: "ADD serverName pos", "REMOVE serverName", or "ROUTE keyHash" (positions and keyHashes in [0, 10^9]).',
    outputFormat: 'For every ROUTE command, print the clockwise assigned serverName (lowest position >= keyHash, wrapping around to smallest ring position), or "EMPTY" if no servers exist.',
    constraints: ['0 <= pos, keyHash <= 10^9', 'All active server positions are distinct', 'O(log S) lookup via sorted ring / binary search'],
    hints: [
      'Maintain the ring sorted by position ascending (pair `[pos, serverName]`).',
      'On ROUTE x, binary search (lower_bound) for the first node with pos >= x.',
      'If x exceeds the largest position on the ring, wrap clockwise back to index 0 (smallest pos)!',
    ],
    timeComplexity: 'O(log S) per ROUTE',
    spaceComplexity: 'O(S) servers',
    bruteComplexity: 'O(S * Q)',
    betterComplexity: 'O(Q * S log S)',
    bruteIntuition: 'Scan all registered servers on every ROUTE request to find smallest pos >= keyHash.',
    bruteBangla: 'প্রতিটি রিকোয়েস্টে সব সার্ভার লিনিয়ারলি খুঁজে দেখা।',
    bruteWhyTle: 'O(S * Q) degrades when thousands of virtual shards are added.',
    brutePseudo: 'scan servers for min pos >= x else global min pos',
    betterIntuition: 'Keep unsorted array and sort before batch ROUTE calls.',
    betterBangla: 'রুট করার আগে সর্ট করা।',
    betterTradeoff: 'Interleaved ADD/REMOVE/ROUTE forces repeated O(S log S) sorts.',
    betterPseudo: 're-sort on dirty flag',
    optimalIntuition: 'Maintain sorted ring (balanced BST / TreeMap in C++/Java/Rust, sorted array + bisect in JS/Python) so ROUTE executes lower_bound + wrap-around in O(log S).',
    optimalBangla: 'সর্টেড রিং (বা TreeMap) রেখে বাইনারি সার্চে প্রথম pos >= keyHash খুঁজুন; না পেলে ইনডেক্স ০-তে র‍্যাপ করুন।',
    optimalWhyWins: 'O(log S) routing and minimal key movement when nodes join or leave.',
    optimalPseudo: 'idx = lower_bound(ring, keyHash); if idx == ring.len() idx = 0; return ring[idx].name',
    banglaEditorial: 'কনসিসটেন্ট হ্যাশিংয়ে সার্ভারগুলো [0..10^9] রিংয়ে অবস্থান করে। ROUTE keyHash এলে keyHash-এর সমান বা ঠিক পরের (clockwise) সার্ভারটি বাইনারি সার্চে বের করুন; না থাকলে রিং ঘুরে সবচেয়ে ছোট পজিশনের সার্ভারটি বেছে নিন।',
    dryRunSteps: [
      { step: 1, state: 'ADD s1 100, ADD s2 300, ADD s3 700', memoryOrStack: 'ring=[(100,s1),(300,s2),(700,s3)]', note: 'Sorted positions' },
      { step: 2, state: 'ROUTE 250', memoryOrStack: 'lower_bound(250)->300 => s2', note: 'Clockwise to s2' },
      { step: 3, state: 'ROUTE 900', memoryOrStack: 'wrap-around index 0 => s1', note: 'Wraps past 700 to 100' },
      { step: 4, state: 'REMOVE s2; ROUTE 250', memoryOrStack: 'ring=[(100,s1),(700,s3)] => s3', note: 'Minimal disruption' },
    ],
    solveJs: (stdin: string) => {
      const lines = stdin.trim().split(/\r?\n/);
      if (!lines[0]) return '';
      const q = Number(lines[0]);
      const ring: Array<[number, string]> = [];
      const posByName = new Map<string, number>();
      const out: string[] = [];
      for (let i = 1; i <= q; i++) {
        const pts = lines[i].trim().split(/\s+/);
        if (pts[0] === 'ADD') {
          const name = pts[1], pos = Number(pts[2]);
          posByName.set(name, pos);
          let lo = 0, hi = ring.length;
          while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (ring[mid][0] < pos) lo = mid + 1; else hi = mid;
          }
          ring.splice(lo, 0, [pos, name]);
        } else if (pts[0] === 'REMOVE') {
          const name = pts[1];
          const pos = posByName.get(name);
          if (pos !== undefined) {
            posByName.delete(name);
            const idx = ring.findIndex((r) => r[0] === pos && r[1] === name);
            if (idx !== -1) ring.splice(idx, 1);
          }
        } else if (pts[0] === 'ROUTE') {
          if (ring.length === 0) out.push('EMPTY');
          else {
            const h = Number(pts[1]);
            let lo = 0, hi = ring.length;
            while (lo < hi) {
              const mid = (lo + hi) >> 1;
              if (ring[mid][0] < h) lo = mid + 1; else hi = mid;
            }
            out.push(ring[lo === ring.length ? 0 : lo][1]);
          }
        }
      }
      return out.join('\n');
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = [
        '7\nADD nodeA 100\nADD nodeB 300\nADD nodeC 700\nROUTE 250\nROUTE 900\nREMOVE nodeB\nROUTE 250',
        '4\nROUTE 50\nADD s1 200\nROUTE 200\nROUTE 999',
      ];
      const hidden = [
        '5\nADD s1 10\nREMOVE s1\nROUTE 5\nADD s2 50\nROUTE 60',
        '6\nADD b 500\nADD a 100\nROUTE 100\nROUTE 101\nROUTE 500\nROUTE 501',
      ];
      for (let t = 0; t < 10; t++) {
        const cmds: string[] = [];
        const active = new Map<string, number>();
        const usedPos = new Set<number>();
        let nextId = 1;
        const steps = randInt(rng, 14, 28);
        for (let i = 0; i < steps - 1; i++) {
          const r = rng();
          if (r < 0.45 || active.size === 0) {
            const name = `srv${nextId++}`;
            let pos = randInt(rng, 1, 10000);
            while (usedPos.has(pos)) pos = randInt(rng, 1, 10000);
            usedPos.add(pos);
            active.set(name, pos);
            cmds.push(`ADD ${name} ${pos}`);
          } else if (r < 0.6 && active.size > 1) {
            const arr = Array.from(active.keys());
            const kill = arr[randInt(rng, 0, arr.length - 1)];
            usedPos.delete(active.get(kill)!);
            active.delete(kill);
            cmds.push(`REMOVE ${kill}`);
          } else {
            cmds.push(`ROUTE ${randInt(rng, 0, 10500)}`);
          }
        }
        cmds.push(`ROUTE ${randInt(rng, 0, 10500)}`);
        hidden.push(`${cmds.length}\n${cmds.join('\n')}`);
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: sysStarter('c', 'Consistent Hashing Ring'),
      cpp: sysStarter('cpp', 'Consistent Hashing Ring'),
      python: sysStarter('python', 'Consistent Hashing Ring'),
      java: sysStarter('java', 'Consistent Hashing Ring'),
      javascript: sysStarter('javascript', 'Consistent Hashing Ring'),
      typescript: sysStarter('typescript', 'Consistent Hashing Ring'),
      rust: sysStarter('rust', 'Consistent Hashing Ring'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <string.h>
typedef struct { long long pos; char name[64]; } Node;
int main(void) {
    int q; if (scanf("%d", &q) != 1) return 0;
    Node ring[1024]; int n = 0;
    while (q--) {
        char op[16]; scanf("%s", op);
        if (op[0] == 'A') {
            char name[64]; long long pos; scanf("%s %lld", name, &pos);
            int i = n;
            while (i > 0 && ring[i-1].pos > pos) { ring[i] = ring[i-1]; i--; }
            ring[i].pos = pos; strcpy(ring[i].name, name); n++;
        } else if (op[0] == 'R' && op[1] == 'E') {
            char name[64]; scanf("%s", name);
            for (int i = 0; i < n; i++) if (strcmp(ring[i].name, name) == 0) {
                for (int j = i; j < n - 1; j++) ring[j] = ring[j + 1];
                n--; break;
            }
        } else {
            long long h; scanf("%lld", &h);
            if (n == 0) printf("EMPTY\\n");
            else {
                int lo = 0, hi = n;
                while (lo < hi) { int m = (lo + hi) / 2; if (ring[m].pos < h) lo = m + 1; else hi = m; }
                printf("%s\\n", ring[lo == n ? 0 : lo].name);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q; if (!(cin >> q)) return 0;
    map<long long, string> ring;
    unordered_map<string, long long> byName;
    while (q--) {
        string op; cin >> op;
        if (op == "ADD") {
            string name; long long pos; cin >> name >> pos;
            ring[pos] = name; byName[name] = pos;
        } else if (op == "REMOVE") {
            string name; cin >> name;
            auto it = byName.find(name);
            if (it != byName.end()) { ring.erase(it->second); byName.erase(it); }
        } else {
            long long h; cin >> h;
            if (ring.empty()) cout << "EMPTY\\n";
            else {
                auto it = ring.lower_bound(h);
                if (it == ring.end()) it = ring.begin();
                cout << it->second << "\\n";
            }
        }
    }
    return 0;
}`,
      python: `import sys, bisect
def solve():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    q = int(lines[0])
    pos_list, names, by_name = [], {}, {}
    out = []
    for i in range(1, q + 1):
        p = lines[i].split()
        if p[0] == 'ADD':
            name, pos = p[1], int(p[2])
            bisect.insort(pos_list, pos)
            names[pos] = name
            by_name[name] = pos
        elif p[0] == 'REMOVE':
            name = p[1]
            if name in by_name:
                pos = by_name.pop(name)
                del names[pos]
                idx = bisect.bisect_left(pos_list, pos)
                pos_list.pop(idx)
        else:
            if not pos_list: out.append('EMPTY')
            else:
                h = int(p[1])
                idx = bisect.bisect_left(pos_list, h)
                if idx == len(pos_list): idx = 0
                out.append(names[pos_list[idx]])
    print("\\n".join(out))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int q = Integer.parseInt(br.readLine().trim());
        TreeMap<Long, String> ring = new TreeMap<>();
        Map<String, Long> byName = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            String op = st.nextToken();
            if (op.equals("ADD")) {
                String name = st.nextToken(); long pos = Long.parseLong(st.nextToken());
                ring.put(pos, name); byName.put(name, pos);
            } else if (op.equals("REMOVE")) {
                String name = st.nextToken();
                Long pos = byName.remove(name);
                if (pos != null) ring.remove(pos);
            } else {
                long h = Long.parseLong(st.nextToken());
                if (ring.isEmpty()) sb.append("EMPTY\\n");
                else {
                    Map.Entry<Long, String> e = ring.ceilingEntry(h);
                    if (e == null) e = ring.firstEntry();
                    sb.append(e.getValue()).append('\\n');
                }
            }
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
if (lines[0]) {
  const q = Number(lines[0]);
  const ring = [];
  const byName = new Map();
  const out = [];
  for (let i = 1; i <= q; i++) {
    const pts = lines[i].trim().split(/\\s+/);
    if (pts[0] === 'ADD') {
      const name = pts[1], pos = Number(pts[2]);
      byName.set(name, pos);
      let lo = 0, hi = ring.length;
      while (lo < hi) { const m = (lo + hi) >> 1; if (ring[m][0] < pos) lo = m + 1; else hi = m; }
      ring.splice(lo, 0, [pos, name]);
    } else if (pts[0] === 'REMOVE') {
      const pos = byName.get(pts[1]);
      if (pos !== undefined) {
        byName.delete(pts[1]);
        const idx = ring.findIndex((r) => r[0] === pos && r[1] === pts[1]);
        if (idx !== -1) ring.splice(idx, 1);
      }
    } else {
      if (!ring.length) out.push('EMPTY');
      else {
        const h = Number(pts[1]);
        let lo = 0, hi = ring.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (ring[m][0] < h) lo = m + 1; else hi = m; }
        out.push(ring[lo === ring.length ? 0 : lo][1]);
      }
    }
  }
  console.log(out.join('\\n'));
}`,
      typescript: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
if (lines[0]) {
  const q: number = Number(lines[0]);
  const posArr: number[] = [];
  const nameArr: string[] = [];
  const byName: Map<string, number> = new Map<string, number>();
  const out: string[] = [];
  for (let i = 1; i <= q; i++) {
    const pts: string[] = lines[i].trim().split(/\\s+/);
    if (pts[0] === 'ADD') {
      const name: string = pts[1];
      const pos: number = Number(pts[2]);
      byName.set(name, pos);
      let lo = 0;
      let hi = posArr.length;
      while (lo < hi) {
        const m: number = (lo + hi) >> 1;
        if (posArr[m] < pos) lo = m + 1;
        else hi = m;
      }
      posArr.splice(lo, 0, pos);
      nameArr.splice(lo, 0, name);
    } else if (pts[0] === 'REMOVE') {
      const pos = byName.get(pts[1]);
      if (pos !== undefined) {
        byName.delete(pts[1]);
        for (let k = 0; k < posArr.length; k++) {
          if (posArr[k] === pos && nameArr[k] === pts[1]) {
            posArr.splice(k, 1);
            nameArr.splice(k, 1);
            break;
          }
        }
      }
    } else {
      if (posArr.length === 0) {
        out.push('EMPTY');
      } else {
        const h: number = Number(pts[1]);
        let lo = 0;
        let hi = posArr.length;
        while (lo < hi) {
          const m: number = (lo + hi) >> 1;
          if (posArr[m] < h) lo = m + 1;
          else hi = m;
        }
        out.push(nameArr[lo === posArr.length ? 0 : lo]);
      }
    }
  }
  console.log(out.join('\\n'));
}`,
      rust: `use std::collections::{BTreeMap, HashMap};
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let q: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let mut ring: BTreeMap<i64, String> = BTreeMap::new();
    let mut by_name: HashMap<String, i64> = HashMap::new();
    for _ in 0..q {
        match it.next().unwrap() {
            "ADD" => {
                let name = it.next().unwrap().to_string();
                let pos: i64 = it.next().unwrap().parse().unwrap();
                ring.insert(pos, name.clone());
                by_name.insert(name, pos);
            }
            "REMOVE" => {
                let name = it.next().unwrap();
                if let Some(pos) = by_name.remove(name) { ring.remove(&pos); }
            }
            _ => {
                let h: i64 = it.next().unwrap().parse().unwrap();
                if ring.is_empty() { println!("EMPTY"); }
                else if let Some((_, name)) = ring.range(h..).next().or_else(|| ring.iter().next()) {
                    println!("{}", name);
                }
            }
        }
    }
}`,
    },
  },

  // 5. Mini In-Memory SQL / JSON Table Query Engine (GROUP BY / SUM / COUNT / WHERE)
  mini_sql_query_engine: {
    id: 'mini_sql_query_engine',
    inputFormat: 'First line: N records (1 <= N <= 5*10^4) and Q queries (1 <= Q <= 10^4). Next N lines: "category status amount" (strings + non-negative integer). Next Q lines: "QUERY category statusMinAmount" (use * for wildcard category).',
    outputFormat: 'For each query print two space-separated integers: "matchingCount totalAmount" across records matching category (or *) with amount >= statusMinAmount.',
    constraints: ['1 <= N <= 5 * 10^4', '1 <= Q <= 10^4', 'Use 64-bit integer for totalAmount'],
    hints: [
      'Group amounts into per-category sorted arrays AND maintain a global sorted array for wildcard "*" queries.',
      'Precompute suffix (or prefix) 64-bit sums over each sorted amount array!',
      'Then every query executes a single binary search (lower_bound on statusMinAmount) and reads count + range sum in O(log N)!',
    ],
    timeComplexity: 'O(N log N + Q log N)',
    spaceComplexity: 'O(N)',
    bruteComplexity: 'O(N * Q)',
    betterComplexity: 'O(N + Q * |bucket|)',
    bruteIntuition: 'Scan all N records for each of Q queries.',
    bruteBangla: 'প্রতিটি কুয়েরিতে পুরো টেবিল স্ক্যান করে যোগফল ও গণনা বের করা।',
    bruteWhyTle: 'O(N * Q) hits 5 * 10^8 operations and TLEs.',
    brutePseudo: 'for query: loop all N rows checking category and amount >= minAmt',
    betterIntuition: 'Partition by category map, then scan that category list.',
    betterBangla: 'ক্যাটাগরি অনুযায়ী ম্যাপে ভাগ করে তারপর লিনিয়ার স্ক্যান।',
    betterTradeoff: 'Wildcard "*" or hot categories still degrade to O(N * Q).',
    betterPseudo: 'for row in byCat[cat]: if amt >= minAmt accumulate',
    optimalIntuition: 'Sort amounts ascending per category (and globally), build 64-bit suffix sums, and answer every query via lower_bound in O(log N).',
    optimalBangla: 'প্রতিটি ক্যাটাগরি ও গ্লোবাল লিস্ট সর্ট করে সাফিক্স যোগফল রেখে বাইনারি সার্চে O(log N)-এ COUNT এবং SUM বের করা।',
    optimalWhyWins: 'Builds index in O(N log N) and answers each query in O(log N).',
    optimalPseudo: 'idx=lower_bound(arr, minAmt); count=len-idx; sum=suffixSum[idx]',
    banglaEditorial: 'মিনি SQL ইঞ্জিনে WHERE + COUNT/SUM দ্রুত চালাতে প্রতিটি ক্যাটাগরির amount সর্ট করে suffix sum রাখুন। কুয়েরি এলেই lower_bound দিয়ে কতগুলো রেকর্ড শর্ত মানে আর তাদের মোট যোগফল O(log N)-এ পাওয়া যায়।',
    dryRunSteps: [
      { step: 1, state: 'Rows: (books,10),(books,30),(tech,50)', memoryOrStack: 'books=[10,30], all=[10,30,50]', note: 'Sorted index + suffix sums' },
      { step: 2, state: 'QUERY books 15', memoryOrStack: 'idx=1 -> count=1, sum=30', note: 'Only 30 >= 15' },
      { step: 3, state: 'QUERY * 20', memoryOrStack: 'all[1..2]=[30,50] -> count=2, sum=80', note: 'Wildcard uses global sorted index' },
    ],
    solveJs: (stdin: string) => {
      const lines = stdin.trim().split(/\r?\n/);
      if (!lines[0]) return '';
      const [n, q] = lines[0].trim().split(/\s+/).map(Number);
      const buckets = new Map<string, number[]>();
      const all: number[] = [];
      for (let i = 1; i <= n; i++) {
        const pts = lines[i].trim().split(/\s+/);
        const cat = pts[0];
        const amt = Number(pts[2]);
        all.push(amt);
        if (!buckets.has(cat)) buckets.set(cat, []);
        buckets.get(cat)!.push(amt);
      }
      const buildIdx = (arr: number[]): [number[], bigint[]] => {
        arr.sort((a, b) => a - b);
        const suf: bigint[] = new Array(arr.length + 1).fill(0n);
        for (let i = arr.length - 1; i >= 0; i--) suf[i] = suf[i + 1] + BigInt(arr[i]);
        return [arr, suf];
      };
      const idxMap = new Map<string, [number[], bigint[]]>();
      idxMap.set('*', buildIdx(all));
      for (const [k, arr] of buckets.entries()) idxMap.set(k, buildIdx(arr));
      const out: string[] = [];
      for (let i = n + 1; i <= n + q; i++) {
        const pts = lines[i].trim().split(/\s+/);
        const cat = pts[1];
        const minAmt = Number(pts[2]);
        const entry = idxMap.get(cat);
        if (!entry) out.push('0 0');
        else {
          const [arr, suf] = entry;
          let lo = 0, hi = arr.length;
          while (lo < hi) {
            const m = (lo + hi) >> 1;
            if (arr[m] < minAmt) lo = m + 1; else hi = m;
          }
          out.push(`${arr.length - lo} ${suf[lo].toString()}`);
        }
      }
      return out.join('\n');
    },
    generateInputs: (seed: number) => {
      const rng = createRng(seed);
      const samples = [
        '4 3\nbooks ok 10\nbooks ok 30\ntech ok 50\nfood fail 20\nQUERY books 15\nQUERY * 20\nQUERY games 0',
        '3 2\napi ok 1000000000\napi ok 1000000000\ndb ok 5\nQUERY api 500\nQUERY * 10',
      ];
      const hidden = [
        '2 3\na ok 10\na ok 20\nQUERY a 25\nQUERY * 10\nQUERY b 0',
      ];
      const cats = ['books', 'tech', 'cloud', 'infra'];
      for (let t = 0; t < 11; t++) {
        const n = randInt(rng, 10, 35);
        const q = randInt(rng, 6, 15);
        const lines: string[] = [`${n} ${q}`];
        for (let i = 0; i < n; i++) lines.push(`${cats[randInt(rng, 0, 3)]} ok ${randInt(rng, 1, 50000000)}`);
        for (let i = 0; i < q; i++) {
          const c = rng() < 0.35 ? '*' : cats[randInt(rng, 0, 3)];
          lines.push(`QUERY ${c} ${randInt(rng, 0, 40000000)}`);
        }
        hidden.push(lines.join('\n'));
      }
      return { sampleInputs: samples, hiddenInputs: hidden };
    },
    starterTemplates: {
      c: sysStarter('c', 'Mini SQL Query Engine'),
      cpp: sysStarter('cpp', 'Mini SQL Query Engine'),
      python: sysStarter('python', 'Mini SQL Query Engine'),
      java: sysStarter('java', 'Mini SQL Query Engine'),
      javascript: sysStarter('javascript', 'Mini SQL Query Engine'),
      typescript: sysStarter('typescript', 'Mini SQL Query Engine'),
      rust: sysStarter('rust', 'Mini SQL Query Engine'),
    },
    solutions: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct { char cat[32]; long long amt; } Row;
int main(void) {
    int n, q; if (scanf("%d %d", &n, &q) != 2) return 0;
    Row *rows = malloc(n * sizeof(Row));
    for (int i = 0; i < n; i++) { char st[16]; scanf("%s %s %lld", rows[i].cat, st, &rows[i].amt); }
    for (int i = 0; i < q; i++) {
        char cmd[16], cat[32]; long long mn;
        scanf("%s %s %lld", cmd, cat, &mn);
        int cnt = 0; long long sum = 0;
        int star = strcmp(cat, "*") == 0;
        for (int j = 0; j < n; j++) {
            if ((star || strcmp(rows[j].cat, cat) == 0) && rows[j].amt >= mn) { cnt++; sum += rows[j].amt; }
        }
        printf("%d %lld\\n", cnt, sum);
    }
    free(rows);
    return 0;
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q; if (!(cin >> n >> q)) return 0;
    unordered_map<string, vector<long long>> mp;
    vector<long long> all;
    for (int i = 0; i < n; i++) {
        string cat, st; long long amt;
        cin >> cat >> st >> amt;
        mp[cat].push_back(amt);
        all.push_back(amt);
    }
    unordered_map<string, vector<long long>> suf;
    auto prep = [&](const string& k, vector<long long>& v) {
        sort(v.begin(), v.end());
        vector<long long> s(v.size() + 1, 0);
        for (int i = (int)v.size() - 1; i >= 0; i--) s[i] = s[i + 1] + v[i];
        suf[k] = move(s);
    };
    mp["*"] = move(all);
    for (auto &[k, v] : mp) prep(k, v);
    while (q--) {
        string cmd, cat; long long mn;
        cin >> cmd >> cat >> mn;
        if (!mp.count(cat)) cout << "0 0\\n";
        else {
            auto &v = mp[cat];
            int idx = lower_bound(v.begin(), v.end(), mn) - v.begin();
            cout << (v.size() - idx) << " " << suf[cat][idx] << "\\n";
        }
    }
    return 0;
}`,
      python: `import sys, bisect
from collections import defaultdict
def solve():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    n, q = map(int, lines[0].split())
    mp = defaultdict(list)
    for i in range(1, n + 1):
        cat, _, amt = lines[i].split()
        val = int(amt)
        mp[cat].append(val)
        mp['*'].append(val)
    idx_map = {}
    for k, arr in mp.items():
        arr.sort()
        suf = [0] * (len(arr) + 1)
        for j in range(len(arr) - 1, -1, -1): suf[j] = suf[j + 1] + arr[j]
        idx_map[k] = (arr, suf)
    out = []
    for i in range(n + 1, n + q + 1):
        _, cat, mn_s = lines[i].split()
        mn = int(mn_s)
        if cat not in idx_map: out.append('0 0')
        else:
            arr, suf = idx_map[cat]
            pos = bisect.bisect_left(arr, mn)
            out.append(f"{len(arr) - pos} {suf[pos]}")
    print("\\n".join(out))
solve()`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken()), q = Integer.parseInt(st.nextToken());
        Map<String, List<Long>> mp = new HashMap<>();
        mp.put("*", new ArrayList<>());
        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine());
            String cat = st.nextToken(); st.nextToken();
            long amt = Long.parseLong(st.nextToken());
            mp.computeIfAbsent(cat, k -> new ArrayList<>()).add(amt);
            mp.get("*").add(amt);
        }
        Map<String, long[]> vals = new HashMap<>(), sufs = new HashMap<>();
        for (Map.Entry<String, List<Long>> e : mp.entrySet()) {
            List<Long> l = e.getValue(); Collections.sort(l);
            long[] a = new long[l.size()], s = new long[l.size() + 1];
            for (int i = 0; i < l.size(); i++) a[i] = l.get(i);
            for (int i = l.size() - 1; i >= 0; i--) s[i] = s[i + 1] + a[i];
            vals.put(e.getKey(), a); sufs.put(e.getKey(), s);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < q; i++) {
            st = new StringTokenizer(br.readLine());
            st.nextToken(); String cat = st.nextToken(); long mn = Long.parseLong(st.nextToken());
            long[] a = vals.get(cat);
            if (a == null) { sb.append("0 0\\n"); continue; }
            int lo = 0, hi = a.length;
            while (lo < hi) { int m = (lo + hi) >>> 1; if (a[m] < mn) lo = m + 1; else hi = m; }
            sb.append(a.length - lo).append(' ').append(sufs.get(cat)[lo]).append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
      javascript: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
if (lines[0]) {
  const [n, q] = lines[0].trim().split(/\\s+/).map(Number);
  const buckets = new Map(); buckets.set('*', []);
  for (let i = 1; i <= n; i++) {
    const pts = lines[i].trim().split(/\\s+/);
    const cat = pts[0], amt = Number(pts[2]);
    buckets.get('*').push(amt);
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat).push(amt);
  }
  const idxMap = new Map();
  for (const [k, arr] of buckets.entries()) {
    arr.sort((a, b) => a - b);
    const suf = new Array(arr.length + 1).fill(0n);
    for (let i = arr.length - 1; i >= 0; i--) suf[i] = suf[i + 1] + BigInt(arr[i]);
    idxMap.set(k, [arr, suf]);
  }
  const out = [];
  for (let i = n + 1; i <= n + q; i++) {
    const pts = lines[i].trim().split(/\\s+/);
    const e = idxMap.get(pts[1]);
    if (!e) out.push('0 0');
    else {
      const [arr, suf] = e, mn = Number(pts[2]);
      let lo = 0, hi = arr.length;
      while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] < mn) lo = m + 1; else hi = m; }
      out.push((arr.length - lo) + ' ' + suf[lo].toString());
    }
  }
  console.log(out.join('\\n'));
}`,
      typescript: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
if (lines[0]) {
  const hdr: number[] = lines[0].trim().split(/\\s+/).map(Number);
  const n: number = hdr[0];
  const q: number = hdr[1];
  const buckets: Map<string, number[]> = new Map<string, number[]>();
  buckets.set('*', []);
  for (let i = 1; i <= n; i++) {
    const pts: string[] = lines[i].trim().split(/\\s+/);
    const cat: string = pts[0];
    const amt: number = Number(pts[2]);
    buckets.get('*')!.push(amt);
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat)!.push(amt);
  }
  const arrMap: Map<string, number[]> = new Map<string, number[]>();
  const sufMap: Map<string, bigint[]> = new Map<string, bigint[]>();
  for (const entry of buckets.entries()) {
    const k: string = entry[0];
    const arr: number[] = entry[1];
    arr.sort((a: number, b: number) => a - b);
    const suf: bigint[] = new Array<bigint>(arr.length + 1).fill(0n);
    for (let i = arr.length - 1; i >= 0; i--) suf[i] = suf[i + 1] + BigInt(arr[i]);
    arrMap.set(k, arr);
    sufMap.set(k, suf);
  }
  const out: string[] = [];
  for (let i = n + 1; i <= n + q; i++) {
    const pts: string[] = lines[i].trim().split(/\\s+/);
    const cat: string = pts[1];
    const mn: number = Number(pts[2]);
    if (!arrMap.has(cat)) {
      out.push('0 0');
    } else {
      const arr: number[] = arrMap.get(cat)!;
      const suf: bigint[] = sufMap.get(cat)!;
      let lo = 0;
      let hi = arr.length;
      while (lo < hi) {
        const m: number = (lo + hi) >> 1;
        if (arr[m] < mn) lo = m + 1;
        else hi = m;
      }
      out.push((arr.length - lo) + ' ' + suf[lo].toString());
    }
  }
  console.log(out.join('\\n'));
}`,
      rust: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let q: usize = it.next().unwrap().parse().unwrap();
    let mut mp: HashMap<String, Vec<i64>> = HashMap::new();
    for _ in 0..n {
        let cat = it.next().unwrap().to_string();
        let _st = it.next().unwrap();
        let amt: i64 = it.next().unwrap().parse().unwrap();
        mp.entry(cat).or_default().push(amt);
        mp.entry("*".to_string()).or_default().push(amt);
    }
    let mut sufs: HashMap<String, Vec<i64>> = HashMap::new();
    for (k, v) in mp.iter_mut() {
        v.sort_unstable();
        let mut sf = vec![0i64; v.len() + 1];
        for i in (0..v.len()).rev() { sf[i] = sf[i + 1] + v[i]; }
        sufs.insert(k.clone(), sf);
    }
    for _ in 0..q {
        let _cmd = it.next().unwrap();
        let cat = it.next().unwrap();
        let mn: i64 = it.next().unwrap().parse().unwrap();
        if let Some(v) = mp.get(cat) {
            let idx = v.partition_point(|&x| x < mn);
            println!("{} {}", v.len() - idx, sufs[cat][idx]);
        } else {
            println!("0 0");
        }
    }
}`,
    },
  },
};

export interface SystemChallengeSpec {
  id: string;
  title: string;
  banglaTitle: string;
  domain: string;
  difficulty: 'Medium' | 'Hard';
  xpReward: number;
  companies: string[];
  kernelId: string;
  seed: number;
  statement: string;
  systemRequirements: string[];
  architectureOverview: string;
}

const SYSTEM_SPECS: SystemChallengeSpec[] = [
  {
    id: 'sys-01-lru-cache',
    title: '01 · High-Throughput O(1) LRU Cache Engine',
    banglaTitle: 'উচ্চ-গতির O(1) এলআরইউ ক্যাশ ইঞ্জিন',
    domain: 'Caching & Storage',
    difficulty: 'Medium',
    xpReward: 140,
    companies: ['Google', 'Meta', 'Stripe'],
    kernelId: 'lru_cache_engine',
    seed: 9101,
    statement: 'Design an in-memory Least Recently Used (LRU) Cache Engine handling interleaved PUT and GET operations with strict O(1) recency promotion and capacity eviction.',
    systemRequirements: [
      'Support fixed positive capacity C up to 10,000 active keys.',
      'Promote keys to Most Recently Used on BOTH GET hits and existing-key PUT updates.',
      'Evict the Least Recently Used key atomically whenever inserting a new key exceeds capacity C.',
      'Guarantee deterministic O(1) amortized lookup, insertion, and eviction under 50,000 mixed commands.',
    ],
    architectureOverview: 'Hash Table (key -> node pointer) + Doubly Linked List (head=LRU, tail=MRU). Every access splices the node to tail in 4 pointer swaps without shifting elements.',
  },
  {
    id: 'sys-02-token-bucket',
    title: '02 · Multi-Tenant Token Bucket Rate Limiter',
    banglaTitle: 'মাল্টি-টেন্যান্ট টোকেন বাকেট রেট লিমিটার',
    domain: 'API Gateway & Infra',
    difficulty: 'Medium',
    xpReward: 145,
    companies: ['Stripe', 'Uber', 'Netflix'],
    kernelId: 'token_bucket_limiter',
    seed: 9102,
    statement: 'Build a multi-tenant API Gateway Token Bucket Rate Limiter that enforces burst capacity C and steady refill rate R per second lazily per tenant key.',
    systemRequirements: [
      'Initialize every newly seen tenant key with a full bucket of C tokens at its initial request timestamp.',
      'Compute lazy integer refill: min(C, prevTokens + (ts - lastTs) * R) without background timer loops.',
      'Allow variable-cost requests atomically when tokens >= cost; otherwise return DENY with current refilled count.',
      'Prevent 32-bit overflow across idle gaps up to 10^9 seconds using 64-bit arithmetic.',
    ],
    architectureOverview: 'Per-tenant state map { tokens, lastTimestamp }. Refills occur purely on the request path using exact elapsed-second integer math, enabling zero-cron horizontal scaling.',
  },
  {
    id: 'sys-03-transactional-kv',
    title: '03 · In-Memory Transactional KV Store (ACID Rollback)',
    banglaTitle: 'ইন-মেমোরি ট্রানজ্যাকশনাল কী-ভ্যালু স্টোর',
    domain: 'Databases & Engines',
    difficulty: 'Hard',
    xpReward: 180,
    companies: ['Stripe', 'Google', 'Amazon'],
    kernelId: 'transactional_kv_store',
    seed: 9103,
    statement: 'Implement an in-memory transactional key-value database engine supporting nested BEGIN, SET, UNSET, GET, ROLLBACK, and COMMIT blocks without full-store cloning.',
    systemRequirements: [
      'Support arbitrary nested transaction frames with isolated uncommitted reads and writes.',
      'Ensure UNSET inside an inner transaction shadows outer SET values using explicit tombstones.',
      'ROLLBACK discards the innermost active transaction in O(1); print NO TRANSACTION when at base depth.',
      'COMMIT merges the innermost delta overlay into the parent frame (or base storage at depth 1).',
    ],
    architectureOverview: 'Stack of delta overlay hash maps (Map<string, Value | TOMBSTONE>). Reads walk stack top-down to first hit; rollbacks pop the top frame without touching outer frames.',
  },
  {
    id: 'sys-04-consistent-hashing',
    title: '04 · Consistent Hashing Ring Load Balancer',
    banglaTitle: 'কনসিসটেন্ট হ্যাশিং রিং লোড ব্যালেন্সার',
    domain: 'Distributed Systems',
    difficulty: 'Hard',
    xpReward: 175,
    companies: ['Netflix', 'Amazon', 'Uber'],
    kernelId: 'consistent_hash_ring',
    seed: 9104,
    statement: 'Architect a distributed consistent-hashing ring router that adds/removes shard nodes dynamically and routes request hashes clockwise in O(log S) time.',
    systemRequirements: [
      'Maintain active servers ordered along a [0, 10^9] hash ring.',
      'Route any keyHash clockwise to the first node with pos >= keyHash, wrapping around to index 0 when past the maximum node.',
      'Handle dynamic node additions and removals without rebalancing unrelated keys; emit EMPTY when zero nodes are active.',
    ],
    architectureOverview: 'Ordered ring index (TreeMap / sorted array + binary search lower_bound) + reverse server-to-position map for O(log S) routing and clean teardown.',
  },
  {
    id: 'sys-05-mini-sql',
    title: '05 · Mini SQL / JSON Analytical Query Engine',
    banglaTitle: 'মিনি এসকিউএল অ্যানালিটিক্যাল কুয়েরি ইঞ্জিন',
    domain: 'Data & Query Engines',
    difficulty: 'Medium',
    xpReward: 155,
    companies: ['Google', 'Meta', 'Stripe'],
    kernelId: 'mini_sql_query_engine',
    seed: 9105,
    statement: 'Build an indexed analytical query engine ingesting structured records and serving WHERE category + amount >= threshold COUNT/SUM queries in O(log N) per query.',
    systemRequirements: [
      'Support exact category predicates as well as wildcard "*" full-table aggregations.',
      'Precompute per-category and global sorted columnar indexes with 64-bit suffix sums.',
      'Answer each analytical COUNT + SUM query via lower_bound binary search in O(log N) instead of full table scans.',
    ],
    architectureOverview: 'Columnar inverted index per partition key plus global wildcard partition, each pairing a sorted value vector with a 64-bit suffix-sum array.',
  },
  {
    id: 'sys-06-dag-scheduler',
    title: '06 · Task Scheduler & Topological Dependency Resolver',
    banglaTitle: 'টাস্ক সিডিউলার ও ডিপেন্ডেন্সি রিজলভার',
    domain: 'Workflow Orchestration',
    difficulty: 'Medium',
    xpReward: 155,
    companies: ['Google', 'Airbnb/Uber', 'Microsoft'],
    kernelId: 'graph_topo_feasible',
    seed: 9106,
    statement: 'Build a deterministic CI/CD DAG task scheduler that emits the lexicographically smallest valid execution order across N dependent jobs or detects deadlocks (-1).',
    systemRequirements: [
      'Enforce every prerequisite edge u -> v so task u strictly precedes task v.',
      'Resolve ties deterministically by always dispatching the smallest ready task ID via a min-heap.',
      'Detect cyclic dependency deadlocks and output -1 instead of hanging.',
    ],
    architectureOverview: 'Kahn’s topological sort backed by an adjacency list, indegree array, and min-heap priority queue running in O((N + M) log N).',
  },
  {
    id: 'sys-07-trie-autocomplete',
    title: '07 · Typeahead Search & Prefix Trie Engine',
    banglaTitle: 'টাইপঅ্যাহেড সার্চ ও প্রিফিক্স ট্রাই ইঞ্জিন',
    domain: 'Search Infrastructure',
    difficulty: 'Medium',
    xpReward: 145,
    companies: ['Google', 'Apple', 'Meta'],
    kernelId: 'trie_prefix_count',
    seed: 9107,
    statement: 'Engineer a prefix-tree search index storing N catalog keywords and answering Q instant prefix-frequency queries in linear query length time.',
    systemRequirements: [
      'Index all N strings tracking subtree word counts at each Trie character edge.',
      'Handle overlapping prefixes and missing query prefixes cleanly without full dictionary scans.',
    ],
    architectureOverview: '26-way (or hash-edged) Prefix Trie maintaining incremental `passCount` counters along every inserted prefix path.',
  },
  {
    id: 'sys-08-sliding-telemetry',
    title: '08 · Real-Time Streaming Telemetry Window Max Engine',
    banglaTitle: 'রিয়েল-টাইম টেলিমেট্রি উইন্ডো ম্যাক্স ইঞ্জিন',
    domain: 'Streaming Systems',
    difficulty: 'Hard',
    xpReward: 165,
    companies: ['Netflix', 'Uber', 'Amazon'],
    kernelId: 'mono_deque_window_max',
    seed: 9108,
    statement: 'Build an O(N) streaming telemetry aggregator that computes rolling K-sample peak latency across high-velocity metric streams without per-window sorting.',
    systemRequirements: [
      'Maintain amortized O(1) per sample across up to 2 * 10^5 telemetry frames.',
      'Evict out-of-window indices cleanly from the deque front while preserving monotonicity.',
    ],
    architectureOverview: 'Monotonic decreasing index deque invariant: front always holds the maximum valid index within [i - K + 1, i].',
  },
  {
    id: 'sys-09-lfu-session-cache',
    title: '09 · Edge Session Eviction Cache Service',
    banglaTitle: 'এজ সেশন ইভিকশন ক্যাশ সার্ভিস',
    domain: 'Caching & Storage',
    difficulty: 'Medium',
    xpReward: 145,
    companies: ['Meta', 'Netflix', 'Amazon'],
    kernelId: 'lru_cache_engine',
    seed: 9109,
    statement: 'Implement a bounded-memory edge session cache service supporting O(1) token lookups, in-place TTL/value refreshes, and automatic cold-entry eviction.',
    systemRequirements: [
      'Keep active entries capped strictly at C across PUT bursts.',
      'Refresh ordering on GET hits and overwrite updates without leaking stale keys.',
    ],
    architectureOverview: 'Linked hash map pattern combining hash indexing with O(1) doubly-linked recency list updates.',
  },
  {
    id: 'sys-10-billing-rate-guard',
    title: '10 · Stripe-Style Webhook Burst & Rate Guard',
    banglaTitle: 'ওয়েবহুক বার্স্ট ও রেট গার্ড সিস্টেম',
    domain: 'API Gateway & Infra',
    difficulty: 'Medium',
    xpReward: 150,
    companies: ['Stripe', 'Google', 'Microsoft'],
    kernelId: 'token_bucket_limiter',
    seed: 9110,
    statement: 'Design a webhook delivery rate guard enforcing burst allowances and per-endpoint refill quotas with exact remaining-quota telemetry.',
    systemRequirements: [
      'Allow controlled traffic bursts up to bucket capacity C.',
      'Track isolated quotas per webhook endpoint key with integer refill accuracy.',
    ],
    architectureOverview: 'Lazy per-endpoint token bucket engine computing exact delta refills on demand.',
  },
  {
    id: 'sys-11-config-mvcc',
    title: '11 · Nested Configuration Sandbox (MVCC Overlay)',
    banglaTitle: 'নেস্টেড কনফিগারেশন স্যান্ডবক্স (MVCC)',
    domain: 'Databases & Engines',
    difficulty: 'Hard',
    xpReward: 180,
    companies: ['Google', 'Stripe', 'Microsoft'],
    kernelId: 'transactional_kv_store',
    seed: 9111,
    statement: 'Build a multi-layer feature-flag configuration sandbox supporting nested staging commits, atomic rollbacks, and explicit key tombstones.',
    systemRequirements: [
      'Isolate experimental BEGIN blocks from committed production state.',
      'Support UNSET tombstones overriding inherited base keys cleanly.',
    ],
    architectureOverview: 'Layered transaction overlay stack supporting O(1) BEGIN/ROLLBACK and incremental COMMIT merges.',
  },
  {
    id: 'sys-12-shard-rebalancer',
    title: '12 · Stateful Storage Shard Rebalancer',
    banglaTitle: 'স্টেটফুল স্টোরেজ শার্ড রিব্যালেন্সার',
    domain: 'Distributed Systems',
    difficulty: 'Hard',
    xpReward: 175,
    companies: ['Amazon', 'Uber', 'Netflix'],
    kernelId: 'consistent_hash_ring',
    seed: 9112,
    statement: 'Engineer a partition placement ring routing object hash keys across dynamically joining and draining storage shards.',
    systemRequirements: [
      'Support clockwise wrap-around hashing on ring [0, 10^9].',
      'Return EMPTY safely when all shards drain out.',
    ],
    architectureOverview: 'Sorted ring structure with O(log S) lower_bound lookup and reverse index cleanup on REMOVE.',
  },
  {
    id: 'sys-13-metrics-olap',
    title: '13 · Columnar Event Metrics OLAP Filter Engine',
    banglaTitle: 'কলামার ইভেন্ট মেট্রিক্স ওল্যাপ ইঞ্জিন',
    domain: 'Data & Query Engines',
    difficulty: 'Medium',
    xpReward: 155,
    companies: ['Meta', 'Stripe', 'Netflix'],
    kernelId: 'mini_sql_query_engine',
    seed: 9113,
    statement: 'Build an in-memory columnar OLAP query processor indexing high-volume event streams for sub-millisecond threshold COUNT & SUM aggregations.',
    systemRequirements: [
      'Support category-partitioned and global "*" queries with 64-bit exact sums.',
      'Eliminate linear scans via sorted vectors + suffix accumulators.',
    ],
    architectureOverview: 'Partitioned sorted value arrays paired with 64-bit suffix sum tables and binary search.',
  },
  {
    id: 'sys-14-shortest-routing-mesh',
    title: '14 · Weighted Microservice Mesh Shortest Path Router',
    banglaTitle: 'মাইক্রোসার্ভিস মেশ শর্টেস্ট রাউটার',
    domain: 'Networking & Routing',
    difficulty: 'Hard',
    xpReward: 175,
    companies: ['Google', 'Uber', 'Amazon'],
    kernelId: 'graph_dijkstra',
    seed: 9114,
    statement: 'Build a minimum-latency service mesh pathfinder routing RPC traffic from gateway 1 to sink N across weighted directed microservice links.',
    systemRequirements: [
      'Handle edge latencies up to 10^9 and cumulative 64-bit path costs cleanly.',
      'Skip stale priority queue pops to guarantee O((N + M) log N) performance.',
    ],
    architectureOverview: 'Adjacency list + binary min-heap Dijkstra with stale distance filtering and 64-bit BigInt/long long accumulators.',
  },
  {
    id: 'sys-15-network-backbone-mst',
    title: '15 · Multi-Region Fiber Backbone Provisioner (MST)',
    banglaTitle: 'মাল্টি-রিজিওন ফাইবার ব্যাকবোন (MST)',
    domain: 'Networking & Routing',
    difficulty: 'Hard',
    xpReward: 170,
    companies: ['Meta', 'Amazon', 'Google'],
    kernelId: 'graph_dsu_mst',
    seed: 9115,
    statement: 'Architect a regional network planner selecting the minimum-cost subset of fiber links that connects all N datacenters without cycles.',
    systemRequirements: [
      'Unite all N regions with exactly N - 1 links minimizing total 64-bit deployment cost.',
      'Detect partitioned topologies and output -1 when full connectivity is impossible.',
    ],
    architectureOverview: 'Kruskal’s greedy edge sorter paired with path-compressed union-by-size Disjoint Set Union (DSU).',
  },
  {
    id: 'sys-16-log-pattern-ids',
    title: '16 · Intrusion Detection Log Signature Scanner (KMP)',
    banglaTitle: 'লগ সিগনেচার স্ক্যানার (KMP)',
    domain: 'Security & Observability',
    difficulty: 'Medium',
    xpReward: 150,
    companies: ['Google', 'Microsoft', 'Stripe'],
    kernelId: 'kmp_pattern_count',
    seed: 9116,
    statement: 'Build a linear-time intrusion-detection scanner that counts every overlapping signature match in massive payload logs without regex backtracking.',
    systemRequirements: [
      'Guaranteed O(|T| + |P|) worst-case time even on pathological repeating patterns like "aaaa...ab".',
      'Count all overlapping occurrences accurately.',
    ],
    architectureOverview: 'Knuth-Morris-Pratt Longest Prefix Suffix (LPS) failure table avoiding backward text pointer resets.',
  },
  {
    id: 'sys-17-traffic-sweep-aggregator',
    title: '17 · Time-Series Peak Concurrency Sweep Engine',
    banglaTitle: 'টাইম-সিরিজ পিক কনকারেন্সি ইঞ্জিন',
    domain: 'Streaming Systems',
    difficulty: 'Medium',
    xpReward: 150,
    companies: ['Uber', 'Netflix', 'Amazon'],
    kernelId: 'diff_array_max',
    seed: 9117,
    statement: 'Implement an O(N + Q) interval sweep-line aggregator tracking peak concurrent load across 10^5 time buckets under range reservation bursts.',
    systemRequirements: [
      'Apply Q range increments [L, R, val] in O(1) each via difference array boundaries.',
      'Recover exact 64-bit peak concurrency in one linear prefix sweep.',
    ],
    architectureOverview: '1-indexed Difference Array storing +val at L and -val at R+1, followed by prefix reconstruction.',
  },
  {
    id: 'sys-18-calendar-conflict-merger',
    title: '18 · Distributed Booking Window Coalescer',
    banglaTitle: 'ডিস্ট্রিবিউটেড বুকিং উইন্ডো মার্জার',
    domain: 'Scheduling Systems',
    difficulty: 'Medium',
    xpReward: 145,
    companies: ['Google', 'Meta', 'Stripe'],
    kernelId: 'merge_intervals_count',
    seed: 9118,
    statement: 'Build a booking compaction service that merges all overlapping time reservations into minimal sorted disjoint blocks.',
    systemRequirements: [
      'Handle touching and nested closed intervals [L, R] cleanly.',
      'Emit both compacted block count and sorted merged windows.',
    ],
    architectureOverview: 'Sort intervals by start time ascending and sweep greedily extending active right endpoint max(curEnd, nextEnd).',
  },
  {
    id: 'sys-19-fleet-capacity-planner',
    title: '19 · Cloud Batch SLA Capacity Planner',
    banglaTitle: 'ক্লাউড ব্যাচ এসএলএ ক্যাপাসিটি প্ল্যানার',
    domain: 'Workflow Orchestration',
    difficulty: 'Medium',
    xpReward: 155,
    companies: ['Amazon', 'Google', 'Stripe'],
    kernelId: 'bs_min_capacity_days',
    seed: 9119,
    statement: 'Design an automated cluster capacity sizer finding the minimum worker throughput needed to drain ordered job queues within D SLA windows.',
    systemRequirements: [
      'Maintain strict FIFO job ordering across D consecutive days/windows.',
      'Converge onto exact optimal capacity via monotonic binary search over [maxItem, sumItems].',
    ],
    architectureOverview: 'Binary Search on Answer with linear greedy feasibility checker running in O(N log(sum)).',
  },
  {
    id: 'sys-20-replica-placement',
    title: '20 · Geo-Distributed Rack Isolation Placer',
    banglaTitle: 'জিও-ডিস্ট্রিবিউটেড র‍্যাক প্লেসার',
    domain: 'Distributed Systems',
    difficulty: 'Medium',
    xpReward: 155,
    companies: ['Google', 'Meta', 'Apple'],
    kernelId: 'bs_aggressive_cows',
    seed: 9120,
    statement: 'Build a replica placement optimizer choosing K rack slots out of N candidate coordinates to maximize minimum physical blast-radius distance.',
    systemRequirements: [
      'Maximize the minimum pairwise spacing across K selected coordinates.',
      'Finish within O(N log(maxCoord)) regardless of coordinate magnitude up to 10^9.',
    ],
    architectureOverview: 'Sort coordinates + binary search largest feasible spacing d using greedy left-to-right placement verification.',
  },
  {
    id: 'sys-21-ledger-range-index',
    title: '21 · Financial Ledger Immutable Prefix Index',
    banglaTitle: 'ফিন্যান্সিয়াল লেজার প্রিফিক্স ইনডেক্স',
    domain: 'Data & Query Engines',
    difficulty: 'Medium',
    xpReward: 135,
    companies: ['Stripe', 'Meta', 'Amazon'],
    kernelId: 'prefix_sum_queries',
    seed: 9121,
    statement: 'Build an immutable financial ledger query layer answering hundreds of thousands of inclusive [L, R] balance audits in O(1) per query.',
    systemRequirements: [
      'Support 64-bit signed ledger amounts with zero per-query scanning.',
      'Return exact range sums for arbitrary 1-based [L, R] queries.',
    ],
    architectureOverview: 'Precomputed 64-bit prefix sum array P[0..N] answering sum(L..R) = P[R] - P[L - 1] in constant time.',
  },
  {
    id: 'sys-22-json-brace-linter',
    title: '22 · Streaming Bracket & Payload Repair Linter',
    banglaTitle: 'স্ট্রিমিং ব্র্যাকেট ও পেলোড রিপেয়ার',
    domain: 'Compilers & Parsers',
    difficulty: 'Medium',
    xpReward: 140,
    companies: ['Meta', 'Stripe', 'Microsoft'],
    kernelId: 'valid_parentheses_min_add',
    seed: 9122,
    statement: 'Build a minimal-edit delimiter repair pass computing the exact minimum bracket insertions required to recover valid nesting.',
    systemRequirements: [
      'Run in a single O(N) pass and O(1) extra space.',
      'Track unmatched closing brackets immediately alongside unclosed opening balance.',
    ],
    architectureOverview: 'Greedy balance counter tracking `open` depth and incrementing `fixes` whenever `open` would dip below zero.',
  },
  {
    id: 'sys-23-fuzzy-spell-diff',
    title: '23 · Fuzzy Command Matcher & Diff Engine',
    banglaTitle: 'ফাজি কমান্ড ও ডিফ এডিট ইঞ্জিন',
    domain: 'Search Infrastructure',
    difficulty: 'Medium',
    xpReward: 155,
    companies: ['Apple', 'Microsoft', 'Google'],
    kernelId: 'edit_distance_levenshtein',
    seed: 9123,
    statement: 'Implement a space-optimized Levenshtein edit distance engine computing minimum insert/delete/replace transforms for CLI typo recovery.',
    systemRequirements: [
      'Compute optimal edit distance in O(|A| * |B|) time and O(min(|A|, |B|)) space.',
      'Support strings up to length 1000 cleanly.',
    ],
    architectureOverview: 'Rolling 1D dynamic programming row maintaining previous diagonal cell `prevDiag` during left-to-right column updates.',
  },
  {
    id: 'sys-24-container-packing-dp',
    title: '24 · Server Workload 0/1 Bin Value Optimizer',
    banglaTitle: 'সার্ভার ওয়ার্কলোড ০/১ অপটিমাইজার',
    domain: 'Workflow Orchestration',
    difficulty: 'Medium',
    xpReward: 160,
    companies: ['Amazon', 'Netflix', 'Google'],
    kernelId: 'dp_knapsack_01',
    seed: 9124,
    statement: 'Build a container placement optimizer packing discrete microservice pods (weight, priority value) into fixed node memory capacity W.',
    systemRequirements: [
      'Ensure each pod is scheduled at most once via reverse capacity DP sweep.',
      'Accumulate 64-bit priority values without overflow.',
    ],
    architectureOverview: '1D 0/1 Knapsack DP sweeping capacity W down to w[i] for each candidate pod.',
  },
  {
    id: 'sys-25-worker-task-allocator',
    title: '25 · Optimal Dedicated GPU Worker Assigner',
    banglaTitle: 'অপটিমাল ডেডিকেটেড জিপিইউ অ্যাসাইনার',
    domain: 'Distributed Systems',
    difficulty: 'Hard',
    xpReward: 185,
    companies: ['Google', 'Uber', 'Stripe'],
    kernelId: 'dp_bitmask_assign',
    seed: 9125,
    statement: 'Architect an exact optimal 1-to-1 worker-to-job affinity assigner over N dedicated nodes via Bitmask Dynamic Programming.',
    systemRequirements: [
      'Guarantee global minimum total affinity cost over N! permutations in O(N * 2^N).',
      'Support zero-cost affinities and asymmetric cost matrices cleanly.',
    ],
    architectureOverview: 'State compression DP indexed by bitmask of assigned tasks, deriving current worker index from popcount(mask).',
  },
];

function materializeSystemProblem(spec: SystemChallengeSpec, idx: number): {
  problem: Problem;
  challenge: SystemChallenge;
} {
  const kern = SYS_KERNELS[spec.kernelId];
  if (!kern) throw new Error(`Missing system kernel ${spec.kernelId}`);

  const { sampleInputs, hiddenInputs } = kern.generateInputs(spec.seed);
  const samples: TestCase[] = sampleInputs.map((input, idx) => ({
    id: `${spec.id}-s${idx + 1}`,
    input,
    expectedOutput: kern.solveJs(input).trim(),
  }));
  const hiddenTests: TestCase[] = hiddenInputs.map((input, idx) => ({
    id: `${spec.id}-h${idx + 1}`,
    input,
    expectedOutput: kern.solveJs(input).trim(),
    isHidden: true,
  }));

  const problem: Problem = {
    id: spec.id,
    category: 'cp',
    platform: 'System Design',
    topic: spec.domain,
    sourceTag: `System Build · ${spec.domain}`,
    companyTags: spec.companies,
    difficulty: spec.difficulty,
    title: spec.title,
    banglaTitle: spec.banglaTitle,
    xpReward: spec.xpReward,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement: spec.statement,
    inputFormat: kern.inputFormat,
    outputFormat: kern.outputFormat,
    constraints: kern.constraints,
    samples,
    hiddenTests,
    hints: kern.hints,
    systemRequirements: spec.systemRequirements,
    architectureOverview: spec.architectureOverview,
    approaches: {
      brute: {
        label: 'Baseline Naive Design',
        timeComplexity: kern.bruteComplexity,
        spaceComplexity: 'O(N)',
        intuition: kern.bruteIntuition,
        banglaIntuition: kern.bruteBangla,
        whyTleOrSuboptimal: kern.bruteWhyTle,
        pseudocode: kern.brutePseudo,
      },
      better: {
        label: 'Intermediate Indexed Design',
        timeComplexity: kern.betterComplexity,
        spaceComplexity: kern.spaceComplexity,
        intuition: kern.betterIntuition,
        banglaIntuition: kern.betterBangla,
        whyTleOrSuboptimal: kern.betterTradeoff,
        pseudocode: kern.betterPseudo,
      },
      optimal: {
        label: 'Production-Grade Architecture',
        timeComplexity: kern.timeComplexity,
        spaceComplexity: kern.spaceComplexity,
        intuition: kern.optimalIntuition,
        banglaIntuition: kern.optimalBangla,
        whyTleOrSuboptimal: kern.optimalWhyWins,
        pseudocode: kern.optimalPseudo,
      },
    },
    editorial: {
      bruteForceReason: kern.bruteWhyTle,
      optimalApproach: kern.optimalIntuition,
      timeComplexity: kern.timeComplexity,
      spaceComplexity: kern.spaceComplexity,
      dryRunSteps: kern.dryRunSteps,
      banglaEditorial: kern.banglaEditorial,
    },
    starterTemplates: kern.starterTemplates,
    solutions: kern.solutions,
  };

  const challenge: SystemChallenge = {
    id: spec.id,
    number: idx + 1,
    title: spec.title,
    banglaTitle: spec.banglaTitle,
    domain: spec.domain,
    difficulty: spec.difficulty,
    xpReward: spec.xpReward,
    systemRequirements: spec.systemRequirements,
    architectureOverview: spec.architectureOverview,
    problem,
  };

  return { problem, challenge };
}

// Re-export shared algorithmic kernels into SYS_KERNELS so all 25 specs resolve cleanly
for (const [k, v] of Object.entries(ALL_ARENA_KERNELS)) {
  if (!SYS_KERNELS[k]) {
    SYS_KERNELS[k] = v;
  }
}

const materialized = SYSTEM_SPECS.map((spec, idx) => materializeSystemProblem(spec, idx));

export const SYSTEM_ENGINEERING_CHALLENGES: SystemChallenge[] = materialized.map((m) => m.challenge);
export const SYSTEM_CHALLENGE_PROBLEMS: Problem[] = materialized.map((m) => m.problem);
