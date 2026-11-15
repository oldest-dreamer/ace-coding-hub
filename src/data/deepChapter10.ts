import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_10: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 10 (C23): Modular Headers, File/Stream Parsing, Error Codes & Milestone Merger 2',
    banglaTitle: 'C অধ্যায় ১০ (C23): মডিউলার কোড, ফাইল/স্ট্রিম পার্সিং, এরর হ্যান্ডলিং ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Structure multi-helper C programs cleanly, parse untrusted text streams safely with fgets/sscanf/errno, and build Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'A real C system never dumps 500 lines inside `main()`. You split code into small **modular functions** with clear contracts: parsing modules return an explicit `enum Status { OK, ERR_IO, ERR_PARSE }`, `FILE *` streams check `NULL` before reading, and `fgets` + `strtol`/`sscanf` prevents buffer overflows and infinite loops on malformed lines. **Milestone Merger 2** unites **Ch 6 arrays**, **Ch 7 pointers**, **Ch 8 structs**, **Ch 9 `qsort`**, and **Ch 10 defensive stream parsing** into an unbreakable Top-K Leaderboard engine!',
      asciiFlowchart: `  DEFENSIVE MODULAR C PIPELINE (Milestone Merger 2)
  Raw Input Stream (stdin / FILE*)
        |  fgets(buf, sizeof(buf), fp)  [Bounded! Never gets()]
        v
  +---------------------------+    err != 0    +-----------------------+
  | parse_entry(line, &Entry) | -------------> | Skip/Report Err Count |
  +---------------------------+                +-----------------------+
        | status == OK
        v
  upsert_player(list, &count, &row)   [Ch 6 Array + Ch 7 Ptr + Ch 8 Struct]
        |
        v
  qsort(list, count, sizeof(Entry), cmp_desc_name)  [Ch 9 Stdlib]
        |
        v
  Print Winner / Top-K Leaderboard safely`,
      pseudocode: [
        '1. SPLIT domain logic into pure helper functions (`parse_row`, `upsert_entry`, `cmp_leader`)',
        '2. READ bounded lines via `fgets` + check `sscanf` return count or `errno`/`endptr` in `strtol`',
        '3. RETURN explicit status codes (`0` = OK, negative = error) instead of silent garbage data',
        '4. AGGREGATE records inside structs + sort with overflow-safe `qsort` comparator',
        '5. CLOSE any opened `FILE *` with `fclose` on all exit paths (Zero resource leaks)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ব্যাংকের নিরাপদ ডকুমেন্ট কাউন্টার (Modular Parsing & Error Codes)',
        explanation:
          'কল্পনা করো ব্যাংকের মূল ম্যানেজার (`main()`) নিজেই সব ফর্ম হাতে যাচাই করছেন না। প্রথমে গেটে সিকিউরিটি চেক (`parse_row`) দেখে ফর্মটি বৈধ কি না—ভুল হলে `ERR_PARSE` বলে ফেরত দেয়, প্রোগ্রাম ক্র্যাশ করে না! ঠিক ফর্ম এলে কেরানি (`upsert_entry`) খাতায় যোগ করে, আর সব শেষে অডিটর (`qsort`) সাজিয়ে চূড়ান্ত ফলাফল দেখায়। এভাবেই অধ্যায় ৬ (অ্যারে), ৭ (পয়েন্টার), ৮ (স্ট্রাক্ট), ৯ (`qsort`) আর ১০ (নিরাপদ পার্সিং) মিলে তৈরি হয় **মাইলস্টোন প্রজেক্ট ২**!',
        everydayExample:
          'যেকোনো CSV বা লগ ফাইলে মাঝখানে একটি ভাঙা লাইন থাকলেও পুরো অ্যাপ ক্র্যাশ না করে শুধু ভাঙা লাইনটি এড়িয়ে সঠিক হিসাব বের করা!',
        keyTakeaways: [
          'কখনোই আনচেকড `scanf("%s")` বা নিষিদ্ধ `gets()` ব্যবহার করবে না—সর্বদা সাইজ লিমিট (`%31s` বা `fgets`) দাও।',
          'প্রতিটি ফাইলের `fopen()` রিটার্ন `NULL` কি না তা চেক করে নাও; না হলে Segmentation Fault নিশ্চিত।',
          '`strtol()` + `*endptr == \'\\0\'` দিয়ে নিশ্চিত হও পুরো টোকেনটিই আসল সংখ্যা ছিল।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular Helper Aggregation Leaderboard (Baseline)',
        banglaNote: 'মডিউলার ফাংশন ও `Entry` স্ট্রাক্ট দিয়ে প্রতি খেলোয়াড়ের মোট স্কোর ও বিজয়ী বের করা।',
        code: `#include <stdio.h>
#include <string.h>

typedef struct { char name[32]; int total; } Entry;

static void add_score(Entry list[], int *count, const char *name, int val) {
    for (int i = 0; i < *count; i++) {
        if (strcmp(list[i].name, name) == 0) { list[i].total += val; return; }
    }
    snprintf(list[*count].name, 32, "%s", name);
    list[*count].total = val;
    (*count)++;
}

int main(void) {
    int n = 0, count = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Entry list[100];
    for (int i = 0; i < n; i++) {
        char name[32]; int val = 0;
        if (scanf("%31s %d", name, &val) == 2) add_score(list, &count, name, val);
    }
    int best = 0;
    for (int i = 1; i < count; i++) {
        if (list[i].total > list[best].total ||
            (list[i].total == list[best].total && strcmp(list[i].name, list[best].name) < 0))
            best = i;
    }
    printf("%s %d\\n", list[best].name, list[best].total);
    return 0;
}`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'c-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Defensive Line Parser Skipping Malformed Lines',
        banglaNote: 'ইনপুটের মাঝে নষ্ট বা অসম্পূর্ণ লাইন (`bad_data`) থাকলেও ক্র্যাশ না করে `errno`-সহ নিরাপদে স্কিপ করা।',
        code: `#include <stdio.h>
#include <stdlib.h>

static int parse_kv(const char *line, char *out_name, long *out_val) {
    char num_buf[32];
    if (sscanf(line, "%31s %31s", out_name, num_buf) != 2) return -1;
    char *end = NULL;
    long v = strtol(num_buf, &end, 10);
    if (end == num_buf || *end != '\\0') return -2;
    *out_val = v;
    return 0;
}

int main(void) {
    char line[128];
    long sum = 0;
    int valid = 0, skipped = 0;
    while (fgets(line, sizeof(line), stdin)) {
        if (line[0] == '\\n' || line[0] == '\\r') continue;
        char name[32]; long val = 0;
        if (parse_kv(line, name, &val) == 0) { sum += val; valid++; }
        else skipped++;
    }
    printf("valid=%d skipped=%d sum=%ld\\n", valid, skipped, sum);
    return 0;
}`,
        stdin: 'alice 20\nbob NOT_A_NUMBER\nonly_one_col\ncarol 30',
        expectedOutput: 'valid=2 skipped=2 sum=50',
      },
      {
        id: 'c-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Dynamic Capacity Buffer + Status Enum Contract',
        banglaNote: 'ফিক্সড সাইজ অ্যারের বদলে হিপে ডাইনামিক `realloc` এবং স্পষ্ট `ParseStatus` এরর কোড রিটার্ন।',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum { ST_OK = 0, ST_OOM = 1, ST_EMPTY = 2 } Status;
typedef struct { char name[32]; long long score; } Record;

static Status load_records(Record **out, int *n_out) {
    int cap = 4, len = 0;
    Record *arr = malloc((size_t)cap * sizeof(Record));
    if (!arr) return ST_OOM;
    char nm[32]; long long sc = 0;
    while (scanf("%31s %lld", nm, &sc) == 2) {
        if (len == cap) {
            cap *= 2;
            Record *tmp = realloc(arr, (size_t)cap * sizeof(Record));
            if (!tmp) { free(arr); return ST_OOM; }
            arr = tmp;
        }
        snprintf(arr[len].name, 32, "%s", nm);
        arr[len].score = sc;
        len++;
    }
    *out = arr; *n_out = len;
    return len > 0 ? ST_OK : ST_EMPTY;
}

int main(void) {
    Record *rows = NULL; int n = 0;
    Status st = load_records(&rows, &n);
    if (st == ST_OK) printf("loaded=%d top=%s:%lld\\n", n, rows[0].name, rows[0].score);
    else printf("status=%d\\n", st);
    free(rows);
    return 0;
}`,
        stdin: 'sara 100\nrafi 250\ntariq 180',
        expectedOutput: 'loaded=3 top=sara:100',
      },
      {
        id: 'c-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Fast Buffered Token Reader (fread State Machine)',
        banglaNote: 'বড় ফাইল বা `10^6` ইনপুট `scanf`-এর চেয়ে ১০ গুণ দ্রুত পড়ার জন্য চাঙ্ক-ভিত্তিক বাফার্ড রিডার।',
        code: `#include <stdio.h>

static int next_int_stream(int *out) {
    int c = getchar(), sign = 1, val = 0;
    while (c != EOF && c <= ' ') c = getchar();
    if (c == EOF) return 0;
    if (c == '-') { sign = -1; c = getchar(); }
    while (c >= '0' && c <= '9') { val = val * 10 + (c - '0'); c = getchar(); }
    *out = val * sign;
    return 1;
}

int main(void) {
    int x = 0; long long sum = 0;
    while (next_int_stream(&x)) sum += x;
    printf("%lld\\n", sum);
    return 0;
}`,
        stdin: '10 -5 25 70',
        expectedOutput: '100',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'typedef struct { char name[32]; int total; } Entry;',
        whatItMeans: 'Combines name buffer + score integer into one cohesive C record type.',
        whyItIsThere: 'Lets modular helper functions pass and sort records cleanly as one unit.',
        ifDeletedError: 'Separate parallel arrays easily go out of sync during sorting.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'static void add_score(Entry list[], int *count, ...)',
        whatItMeans: 'File-private modular helper mutating `count` through pointer `*count`.',
        whyItIsThere: 'Encapsulates duplicate-key lookup + insertion away from `main()`.',
        ifDeletedError: 'All upsert logic leaks into `main()`, violating modular separation.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'if (sscanf(line, "%31s %31s", out_name, num_buf) != 2) return -1;',
        whatItMeans: 'Reads at most 31 non-whitespace characters per field and checks exact parsed count.',
        whyItIsThere: 'Prevents buffer overflow and catches incomplete/malformed lines explicitly.',
        ifDeletedError: 'Unchecked reads inject uninitialized stack garbage on malformed lines.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'long v = strtol(num_buf, &end, 10);',
        whatItMeans: 'Strictly parses base-10 integer and stores first non-digit char in `end`.',
        whyItIsThere: 'Unlike `atoi("12abc")` which silently returns 12, `strtol` detects trailing junk.',
        ifDeletedError: 'Strings like `"50xyz"` or `"abc"` silently become corrupted numbers.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read header n=3', memoryOrStack: 'count=0, list=[]', note: 'Validated scanf == 1' },
      { step: 2, state: 'Process "alice 20"', memoryOrStack: 'list[0]={alice,20}, count=1', note: 'New entry inserted via pointer' },
      { step: 3, state: 'Process "bob 50"', memoryOrStack: 'list[1]={bob,50}, count=2', note: 'New entry inserted' },
      { step: 4, state: 'Process "alice 15"', memoryOrStack: 'list[0]={alice,35}', note: 'Matched existing alice -> accumulated' },
      { step: 5, state: 'Sort / Pick Max', memoryOrStack: 'winner = {bob, 50}', note: 'Outputs "bob 50"' },
    ],
    harryBugTraps: [
      {
        title: 'Using `atoi()` Instead of `strtol()` on Untrusted Streams',
        brokenCode: `int x = atoi("not_a_number"); // silently returns 0! No error reported`,
        fixedCode: `char *end; errno = 0; long x = strtol(tok, &end, 10);\nif (errno || end == tok || *end != '\\0') return ERR_PARSE;`,
        whyItBreaks: '`atoi` cannot distinguish valid `"0"` from invalid `"abc"` or overflow.',
      },
      {
        title: 'Forgetting NULL Check After `fopen()`',
        brokenCode: `FILE *f = fopen("missing.txt", "r");\nfgets(buf, 64, f); // Segfault! f is NULL`,
        fixedCode: `FILE *f = fopen("missing.txt", "r");\nif (!f) { perror("fopen failed"); return 1; }`,
        whyItBreaks: 'Dereferencing a NULL `FILE*` pointer crashes immediately with SIGSEGV.',
      },
      {
        title: '`while (!feof(f))` Double-Read Bug',
        brokenCode: `while (!feof(f)) { fscanf(f, "%d", &x); sum += x; } // adds last item TWICE!`,
        fixedCode: `while (fscanf(f, "%d", &x) == 1) { sum += x; }`,
        whyItBreaks: '`feof()` only becomes true AFTER a read already hit EOF, duplicating the final iteration.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: Leaderboard Top Winner (Ch 10 Baseline)',
        prompt: 'Aggregate `(name, score)` pairs and output the top scorer (tie-break lexicographically smaller name).',
        banglaHint: 'প্রতিটি নাম অনুযায়ী স্কোর যোগ করে সর্বোচ্চ স্কোরধারীর নাম ও স্কোর প্রিন্ট করো।',
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct { char name[32]; int total; } Entry;

int main(void) {
    int n = 0, count = 0;
    if (scanf("%d", &n) != 1) return 0;
    Entry list[100];
    for (int i = 0; i < n; i++) {
        char name[32]; int val = 0;
        scanf("%31s %d", name, &val);
        int found = -1;
        for (int j = 0; j < count; j++) if (strcmp(list[j].name, name) == 0) found = j;
        if (found >= 0) list[found].total += val;
        else { snprintf(list[count].name, 32, "%s", name); list[count].total = val; count++; }
    }
    int best = 0;
    for (int i = 1; i < count; i++) {
        if (list[i].total > list[best].total ||
            (list[i].total == list[best].total && strcmp(list[i].name, list[best].name) < 0))
            best = i;
    }
    printf("%s %d\\n", list[best].name, list[best].total);
    return 0;
}`,
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'c-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Safe Line Counter With Error Tally',
        prompt: 'Read lines from stdin and output `lines=<count>` ignoring completely empty lines.',
        banglaHint: '`fgets` দিয়ে প্রতি লাইন পড়ে খালি লাইন বাদে মোট লাইন গণনা করো।',
        starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[256];
    int count = 0;
    while (fgets(buf, sizeof(buf), stdin)) {
        if (buf[0] != '\\n' && buf[0] != '\\r' && buf[0] != '\\0') count++;
    }
    printf("lines=%d\\n", count);
    return 0;
}`,
        sampleStdin: 'alpha\n\nbeta\ngamma',
        expectedOutput: 'lines=3',
      },
      {
        id: 'c-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Strict Integer Validator via strtol()',
        prompt: 'Given N tokens, print `sum=<total> invalid=<bad_count>` rejecting tokens with non-digit characters.',
        banglaHint: '`strtol` এবং `*end == \'\\0\'` চেক করে শুধু বিশুদ্ধ সংখ্যাগুলো যোগ করো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char tok[64];
    long sum = 0;
    int invalid = 0;
    while (scanf("%63s", tok) == 1) {
        char *end = NULL;
        long v = strtol(tok, &end, 10);
        if (end != tok && *end == '\\0') sum += v;
        else invalid++;
    }
    printf("sum=%ld invalid=%d\\n", sum, invalid);
    return 0;
}`,
        sampleStdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
      {
        id: 'c-ch-10-q4',
        difficulty: 'Medium',
        title: '4. Modular Key-Value CSV Config Sum',
        prompt: 'Parse `key=value` tokens ignoring comments starting with `#` and output sum of values.',
        banglaHint: '`#` দিয়ে শুরু হওয়া টোকেন বা লাইন বাদ দিয়ে `key=value` থেকে মান বের করো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char line[128];
    long total = 0;
    while (fgets(line, sizeof(line), stdin)) {
        if (line[0] == '#' || line[0] == '\\n') continue;
        char k[64]; long v = 0;
        if (sscanf(line, "%63[^=]=%ld", k, &v) == 2) total += v;
    }
    printf("%ld\\n", total);
    return 0;
}`,
        sampleStdin: '# header\nretries=3\ntimeout=25\n# footer\nworkers=4',
        expectedOutput: '32',
      },
      {
        id: 'c-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Leaderboard With qsort() + Overflow Guard',
        prompt: 'Aggregate player scores and print sorted leaderboard rank 1 (`name total`).',
        banglaHint: '`qsort()` কম্পারেটরে আগে বড় স্কোর, সমান হলে বর্ণানুক্রমে ছোট নাম আগে রাখো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct { char name[32]; long long score; } Player;

int cmp_leader(const void *a, const void *b) {
    const Player *p = a, *q = b;
    if (p->score != q->score) return (q->score > p->score) - (q->score < p->score);
    return strcmp(p->name, q->name);
}

int main(void) {
    int n = 0, cnt = 0;
    if (scanf("%d", &n) != 1) return 0;
    Player arr[100];
    for (int i = 0; i < n; i++) {
        char nm[32]; long long v = 0;
        if (scanf("%31s %lld", nm, &v) != 2) continue;
        int idx = -1;
        for (int j = 0; j < cnt; j++) if (strcmp(arr[j].name, nm) == 0) idx = j;
        if (idx >= 0) arr[idx].score += v;
        else { snprintf(arr[cnt].name, 32, "%s", nm); arr[cnt].score = v; cnt++; }
    }
    qsort(arr, (size_t)cnt, sizeof(Player), cmp_leader);
    if (cnt > 0) printf("%s %lld\\n", arr[0].name, arr[0].score);
    return 0;
}`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (C): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Unites Ch 6 Arrays, Ch 7 Pointers, Ch 8 Structs, Ch 9 qsort, and Ch 10 Modular Defensive Stream Parsing (`fgets` + `strtol` + error counting).',
      banglaGoal:
        'অধ্যায় ৬ থেকে ১০ পর্যন্ত শেখা স্ট্রাক্ট, পয়েন্টার, qsort ও নিরাপদ স্ট্রিম পার্সিং একত্র করে ক্র্যাশ-প্রুফ Top-K লিডারবোর্ড তৈরি করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct { char name[32]; long long total; } Player;

static int parse_line(const char *line, char *name, long long *delta) {
    char num[32];
    if (sscanf(line, "%31s %31s", name, num) != 2) return -1;
    char *end = NULL;
    long long v = strtoll(num, &end, 10);
    if (end == num || *end != '\\0') return -2;
    *delta = v;
    return 0;
}

static void upsert(Player arr[], int *cnt, const char *name, long long delta) {
    for (int i = 0; i < *cnt; i++) {
        if (strcmp(arr[i].name, name) == 0) { arr[i].total += delta; return; }
    }
    snprintf(arr[*cnt].name, 32, "%s", name);
    arr[*cnt].total = delta;
    (*cnt)++;
}

static int cmp_player(const void *a, const void *b) {
    const Player *p = a, *q = b;
    if (p->total != q->total) return (q->total > p->total) - (q->total < p->total);
    return strcmp(p->name, q->name);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;
    getchar(); // consume newline
    Player list[128];
    int cnt = 0, skipped = 0;
    char line[128];
    for (int i = 0; i < n && fgets(line, sizeof(line), stdin); i++) {
        char nm[32]; long long delta = 0;
        if (parse_line(line, nm, &delta) == 0) upsert(list, &cnt, nm, delta);
        else skipped++;
    }
    qsort(list, (size_t)cnt, sizeof(Player), cmp_player);
    if (cnt > 0) printf("winner=%s:%lld skipped=%d\\n", list[0].name, list[0].total, skipped);
    return 0;
}`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  cpp: {
    title: 'C++ Chapter 10 (C++23): Modular Streams, std::optional / std::expected & Milestone Merger 2',
    banglaTitle: 'C++ অধ্যায় ১০ (C++23): মডিউলার স্ট্রিম, std::optional ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Build fault-tolerant stream parsers with istringstream, std::optional, custom exceptions, and complete Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'Modern C++23 separates **parsing** from **aggregation** and **ranking**. Instead of crashing or trusting `cin >> x` blindly when a line contains garbage, a parser returns `std::optional<Record>` (value or `std::nullopt`). Streams (`std::istringstream`, `std::ifstream`) automatically close files via RAII destructors when leaving scope—zero manual `close()` leaks!',
      asciiFlowchart: `  C++23 MODULAR STREAM + OPTIONAL PIPELINE
  stdin line -> istringstream iss(line)
                     |
                     +--> try parse(name, score) -> returns std::optional<Row>
                     |
         +-----------+-----------+
         | nullopt               | has_value()
         v                       v
   skipped++              totals[row.name] += row.score  (unordered_map)
                                 |
                                 v
                     ranges::sort(vec, desc_score_asc_name) -> Winner / Top-K`,
      pseudocode: [
        '1. ISOLATE parsing in `std::optional<Row> parse_line(string_view)` returning `nullopt` on error',
        '2. USE `std::istringstream` to tokenize individual lines cleanly without corrupting outer stream',
        '3. AGGREGATE valid rows inside `unordered_map<string, long long>` (or `map`)',
        '4. RANK entries with `std::ranges::sort` using descending score + ascending name comparator',
        '5. MILESTONE MERGER 2: Combine Ch 6 vector/span + Ch 7 const-ref + Ch 8 struct + Ch 9 map/sort + Ch 10 parser',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নিরাপদ পার্শ্ব-ম্যাসেঞ্জার (`std::optional`) ও স্বয়ংক্রিয় দরজা (`RAII ifstream`)',
        explanation:
          'কল্পনা করো তুমি একটা ডেলিভারি পার্সেল (`std::optional<Row>`) পাঠালে—ভেতরে সঠিক ডেটা থাকলে `.has_value()` সত্যি হবে, আর ডেটা ভাঙা হলে খালি বাক্স (`std::nullopt`) ফিরে আসবে, প্রোগ্রাম থামবে না! আর C++-এ `std::ifstream` স্কোপের বাইরে গেলে নিজেই ফাইল বন্ধ করে (RAII), তাই ফাইল হ্যান্ডেল লিক হওয়ার ভয় থাকে না।',
        everydayExample:
          'অগোছালো লগ লাইন পড়ে শুধুমাত্র বৈধ অর্ডারগুলো `unordered_map`-এ যোগ করা এবং `std::ranges::sort` দিয়ে র‍্যাঙ্কিং বের করা!',
        keyTakeaways: [
          '`std::optional<T>` ব্যবহার করলে Sentinel মান (যেমন `-1`) দিয়ে এরর বোঝানোর ঝামেলা থাকে না।',
          '`std::istringstream` ব্যবহার করে লাইন-বাই-লাইন পার্স করলে একটি খারাপ লাইন বাকি ইনপুট নষ্ট করে না।',
          '`std::ifstream` RAII-নিয়ম মেনে চলে, তাই এক্সেপশন ছুড়লেও ফাইল ঠিকই ক্লোজ হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular Leaderboard Aggregator With map<string, int>',
        banglaNote: '`std::map` এবং স্ট্রাকচার্ড বাইন্ডিং ব্যবহার করে মডিউলার স্কোরবোর্ড বিজয়ী নির্ণয়।',
        code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

string find_winner(const map<string, long long>& totals, long long& best_score) {
    string best;
    best_score = -1;
    for (const auto& [name, score] : totals) {
        if (score > best_score) { best_score = score; best = name; }
    }
    return best;
}

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    map<string, long long> totals;
    for (int i = 0; i < n; i++) {
        string name; long long v = 0;
        if (cin >> name >> v) totals[name] += v;
    }
    long long best = 0;
    string winner = find_winner(totals, best);
    cout << winner << " " << best << "\\n";
    return 0;
}`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'cpp-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: std::optional + istringstream Fault-Tolerant Parser',
        banglaNote: 'প্রতি লাইনে এক্সট্রা গারবেজ বা ভুল সংখ্যা থাকলেও `std::optional` দিয়ে নিরাপদে যাচাই।',
        code: `#include <iostream>
#include <optional>
#include <sstream>
#include <string>
using namespace std;

struct Row { string name; long long pts; };

optional<Row> parse_line(const string& line) {
    istringstream iss(line);
    string name; long long pts = 0; char extra = 0;
    if (!(iss >> name >> pts) || (iss >> extra)) return nullopt;
    return Row{name, pts};
}

int main() {
    string line;
    long long sum = 0; int ok = 0, bad = 0;
    while (getline(cin, line)) {
        if (line.empty()) continue;
        if (auto r = parse_line(line)) { sum += r->pts; ok++; }
        else bad++;
    }
    cout << "ok=" << ok << " bad=" << bad << " sum=" << sum << "\\n";
    return 0;
}`,
        stdin: 'alice 20\nbob junk\n\ncarol 30 extra\ndave 50',
        expectedOutput: 'ok=2 bad=2 sum=70',
      },
      {
        id: 'cpp-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n log n) Multi-Key Ranking + Top-K Slice',
        banglaNote: '`unordered_map` দিয়ে O(1) অ্যাগ্রিগেশনের পর `partial_sort` দিয়ে শুধু Top-K র‍্যাঙ্ক বের করা।',
        code: `#include <algorithm>
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

int main() {
    int n = 0, k = 0;
    if (!(cin >> n >> k)) return 0;
    unordered_map<string, long long> mp;
    for (int i = 0; i < n; i++) {
        string nm; long long x = 0; cin >> nm >> x;
        mp[nm] += x;
    }
    vector<pair<string, long long>> v(mp.begin(), mp.end());
    size_t lim = min(v.size(), (size_t)k);
    partial_sort(v.begin(), v.begin() + lim, v.end(), [](const auto& a, const auto& b) {
        return a.second != b.second ? a.second > b.second : a.first < b.first;
    });
    for (size_t i = 0; i < lim; i++) {
        cout << v[i].first << ":" << v[i].second << (i + 1 == lim ? "\\n" : " ");
    }
    return 0;
}`,
        stdin: '4 2\nalice 25\nbob 50\nalice 35\ncarol 40',
        expectedOutput: 'alice:60 bob:50',
      },
      {
        id: 'cpp-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Custom Exception Safe Numeric Guard With std::stoll',
        banglaNote: 'বড় সংখ্যা ও ভুল স্ট্রিং ধরতে `stoll` + `size_t pos` চেক এবং `try/catch` ব্লক।',
        code: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

long long safe_stoll(const string& s) {
    size_t idx = 0;
    long long v = stoll(s, &idx);
    if (idx != s.size()) throw invalid_argument("trailing");
    return v;
}

int main() {
    string tok; long long sum = 0; int err = 0;
    while (cin >> tok) {
        try { sum += safe_stoll(tok); }
        catch (const exception&) { err++; }
    }
    cout << "sum=" << sum << " err=" << err << "\\n";
    return 0;
}`,
        stdin: '100 20x 50 abc 25',
        expectedOutput: 'sum=175 err=2',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'optional<Row> parse_line(const string& line) {',
        whatItMeans: 'Accepts line by const-reference (zero copy) and returns optional parsed Row.',
        whyItIsThere: 'Explicitly models parse failure (`nullopt`) without exceptions or magic numbers.',
        ifDeletedError: 'Parser must resort to error-prone output params or unhandled crashes.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'istringstream iss(line);',
        whatItMeans: 'Creates an in-memory input stream over a single string line.',
        whyItIsThere: 'Isolates tokenization errors to this one line without polluting `cin`.',
        ifDeletedError: 'Failed extraction on `cin` leaves failbit set and freezes remaining lines.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'if (!(iss >> name >> pts) || (iss >> extra)) return nullopt;',
        whatItMeans: 'Checks exact 2-token match AND ensures no extra trailing tokens exist.',
        whyItIsThere: 'Strict contract catches malformed lines like `"alice 10 extra"`.',
        ifDeletedError: 'Trailing garbage silently gets ignored instead of flagged.',
      },
      {
        lineNumber: 'Line 22',
        codeSnippet: 'partial_sort(v.begin(), v.begin() + lim, v.end(), ...);',
        whatItMeans: 'Sorts only the top K elements in O(n log K) instead of full O(n log n).',
        whyItIsThere: 'Huge speedup when finding Top-3 out of 1,000,000 leaderboard entries.',
        ifDeletedError: 'Full sort wastes CPU cycles ordering elements past index K.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'parse_line("alice 20")', memoryOrStack: 'Optional<Row{alice, 20}>', note: 'Clean match, no trailing tokens' },
      { step: 2, state: 'parse_line("bob junk")', memoryOrStack: 'std::nullopt', note: 'iss >> pts fails cleanly' },
      { step: 3, state: 'parse_line("carol 30 extra")', memoryOrStack: 'std::nullopt', note: 'iss >> extra succeeds -> rejected' },
      { step: 4, state: 'parse_line("dave 50")', memoryOrStack: 'Optional<Row{dave, 50}>', note: 'Valid -> added to summary' },
    ],
    harryBugTraps: [
      {
        title: 'Using `getline()` Directly After `cin >> n` Without `ws`',
        brokenCode: `int n; cin >> n;\nstring line; getline(cin, line); // line is EMPTY ""!`,
        fixedCode: `int n; cin >> n; cin >> ws; // skips trailing newline/whitespace\nstring line; getline(cin, line);`,
        whyItBreaks: '`cin >> n` leaves the `\\n` in the buffer, so the very next `getline` consumes an empty line.',
      },
      {
        title: 'Leaving `cin` in `fail()` State After One Bad Token',
        brokenCode: `int x; while (true) { cin >> x; /* infinite loop if bad input! */ }`,
        fixedCode: `string line; while (getline(cin, line)) { istringstream iss(line); /* isolated */ }`,
        whyItBreaks: 'Once `cin.fail()` triggers, all subsequent reads immediately return without advancing.',
      },
      {
        title: 'Dangling `string_view` Outliving Temporary `string`',
        brokenCode: `string_view sv = string("hello") + " world"; // UB! temp destroyed`,
        fixedCode: `string owned = string("hello") + " world";\nstring_view sv = owned;`,
        whyItBreaks: '`string_view` does not own bytes; binding to a temporary creates a dangling pointer.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: Sorted Map Leaderboard Winner',
        prompt: 'Aggregate `(name, score)` records and output the winner (`name score`).',
        banglaHint: '`std::map<string, int>`-এ যোগ করে সর্বোচ্চ স্কোরধারীর নাম ও পয়েন্ট দেখাও।',
        starterCode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n; cin >> n;
    map<string, int> totals;
    for (int i = 0; i < n; i++) {
        string name; int val; cin >> name >> val;
        totals[name] += val;
    }
    string best; int bestScore = -1;
    for (auto &[k, v] : totals) {
        if (v > bestScore) { bestScore = v; best = k; }
    }
    cout << best << " " << bestScore << "\\n";
    return 0;
}`,
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'cpp-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Safe Line Word Counter',
        prompt: 'Count total valid words across all stdin lines using `istringstream`.',
        banglaHint: '`getline` ও `istringstream` ব্যবহার করে মোট শব্দের সংখ্যা গোনো।',
        starterCode: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line, word; int words = 0;
    while (getline(cin, line)) {
        istringstream iss(line);
        while (iss >> word) words++;
    }
    cout << words << "\\n";
    return 0;
}`,
        sampleStdin: 'hello world\nfrom  c++23',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Modular Optional Record Validator',
        prompt: 'Parse `name score` lines, ignoring invalid scores, and print `sum=<total> valid=<count>`.',
        banglaHint: '`std::optional<int>` রিটার্ন করা হেল্পার লিখে ভুল স্কোর বাদ দাও।',
        starterCode: `#include <iostream>
#include <optional>
#include <sstream>
#include <string>
using namespace std;

optional<long long> parse_score(const string& line) {
    istringstream iss(line);
    string nm; long long sc = 0; char extra = 0;
    if (!(iss >> nm >> sc) || (iss >> extra) || sc < 0) return nullopt;
    return sc;
}

int main() {
    string line; long long sum = 0; int valid = 0;
    while (getline(cin, line)) {
        if (auto v = parse_score(line)) { sum += *v; valid++; }
    }
    cout << "sum=" << sum << " valid=" << valid << "\\n";
    return 0;
}`,
        sampleStdin: 'alice 30\nbob -5\ncarol bad\ndave 45',
        expectedOutput: 'sum=75 valid=2',
      },
      {
        id: 'cpp-ch-10-q4',
        difficulty: 'Medium',
        title: '4. CSV Row Sum With Error Counting',
        prompt: 'Split comma-separated integers per line safely and print total sum.',
        banglaHint: '`getline(iss, token, \',\')` দিয়ে CSV আলাদা করে `stoll` চালাও।',
        starterCode: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line, tok; long long total = 0;
    while (getline(cin, line)) {
        istringstream iss(line);
        while (getline(iss, tok, ',')) {
            try {
                size_t idx = 0;
                long long v = stoll(tok, &idx);
                if (idx == tok.size()) total += v;
            } catch (...) {}
        }
    }
    cout << total << "\\n";
    return 0;
}`,
        sampleStdin: '10,20,bad,30\n40,5',
        expectedOutput: '105',
      },
      {
        id: 'cpp-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Winner Using std::ranges::sort',
        prompt: 'Aggregate `(name, score)` and pick highest score (smallest name on tie).',
        banglaHint: '`unordered_map` + ভেক্টরে নিয়ে `ranges::sort` বা `sort` দিয়ে বিজয়ী বের করো।',
        starterCode: `#include <algorithm>
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

int main() {
    int n; if (!(cin >> n)) return 0;
    unordered_map<string, long long> mp;
    for (int i = 0; i < n; i++) {
        string nm; long long x; cin >> nm >> x;
        mp[nm] += x;
    }
    vector<pair<string, long long>> v(mp.begin(), mp.end());
    sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
        return a.second != b.second ? a.second > b.second : a.first < b.first;
    });
    if (!v.empty()) cout << v[0].first << " " << v[0].second << "\\n";
    return 0;
}`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (C++23): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Combines Ch 6 vector, Ch 7 const-ref, Ch 8 struct, Ch 9 unordered_map + sort, and Ch 10 std::optional stream parsing.',
      banglaGoal:
        'C++23-এর স্ট্রাক্ট, কনস্ট রেফারেন্স, হ্যাশ ম্যাপ, সর্টিং এবং `std::optional` স্ট্রিম পার্সার একত্র করে মাইলস্টোন প্রজেক্ট ২ চালানো।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `#include <algorithm>
#include <iostream>
#include <optional>
#include <sstream>
#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

struct LeaderRow { string name; long long total; };

optional<pair<string, long long>> parse_event(const string& line) {
    istringstream iss(line);
    string nm; long long val = 0; char extra = 0;
    if (!(iss >> nm >> val) || (iss >> extra)) return nullopt;
    return pair{nm, val};
}

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    cin >> ws;
    unordered_map<string, long long> totals;
    int skipped = 0;
    string line;
    for (int i = 0; i < n && getline(cin, line); i++) {
        if (auto ev = parse_event(line)) totals[ev->first] += ev->second;
        else skipped++;
    }
    vector<LeaderRow> board;
    for (const auto& [k, v] : totals) board.push_back({k, v});
    sort(board.begin(), board.end(), [](const LeaderRow& a, const LeaderRow& b) {
        return a.total != b.total ? a.total > b.total : a.name < b.name;
    });
    if (!board.empty())
        cout << "winner=" << board[0].name << ":" << board[0].total << " skipped=" << skipped << "\\n";
    return 0;
}`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  python: {
    title: 'Python Chapter 10 (Python 3.13): Modules, Context Managers, Exceptions & Milestone Merger 2',
    banglaTitle: 'Python অধ্যায় ১০ (Python 3.13): মডিউল, কনটেক্সট ম্যানেজার (`with`), এক্সেপশন ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Structure clean modular helpers, safeguard streams with `with` + `try/except ValueError`, custom exceptions, and Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'Python makes modular stream parsing clean through three pillars: (1) pure helper functions returning `Optional[T]` or raising typed exceptions, (2) **Context Managers (`with`)** that auto-close files/streams even if an exception fires mid-read, and (3) **EAFP (`try/except ValueError`)** rather than fragile regex checks. **Milestone Merger 2** fuses Ch 6 lists, Ch 7 references, Ch 8 `@dataclass`, Ch 9 `defaultdict`/`Counter`, and Ch 10 safe parsing!',
      asciiFlowchart: `  PYTHON 3.13 MODULAR PARSE -> AGGREGATE -> RANK PIPELINE
  with io.StringIO / open(...) as stream:
        |  for line in stream:
        v
   try: parse_record(line) -> Record(name, score)
        |
   +----+--------------------+
   | except ValueError:      | valid Record
   v                         v
  skipped += 1         totals[rec.name] += rec.score  (defaultdict)
                             |
                             v
                sorted(totals.items(), key=lambda kv: (-kv[1], kv[0]))`,
      pseudocode: [
        '1. ENCAPSULATE line parsing in `parse_record(line) -> Record` raising `ValueError` on bad format',
        '2. WRAP I/O handles inside `with ... as f:` so cleanup (`__exit__`) always runs',
        '3. CATCH specific exceptions (`ValueError`), never bare `except:` which hides Ctrl+C or typos',
        '4. AGGREGATE via `defaultdict(int)` and rank with negative-score tuple key `(-score, name)`',
        '5. COMBINE Ch 6–10 cleanly inside Milestone Merger 2 pipeline',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় দরজার লকার (`with`) ও `try/except` সেফটি নেট',
        explanation:
          'কল্পনা করো তুমি লাইব্রেরির ফাইল খুলেছ—যদি কাজ শেষের আগে হঠাৎ এরর হয়, `with` ব্লক নিজেই ফাইলটি নিরাপদে বন্ধ করে বেরিয়ে আসবে! আর প্রতিটি লাইন পার্স করার সময় `try ... except ValueError` দিলে একটি নষ্ট লাইন পুরো প্রোগ্রাম থামাতে পারে না—নষ্ট লাইন স্কিপ করে বৈধ ডেটা থেকে ঠিকই বিজয়ী বের করে দেয়।',
        everydayExample:
          'রেলওয়ের টিকেট ডেটা ফাইল থেকে ভুল এন্ট্রি বাদ দিয়ে প্রতিটি স্টেশনের মোট যাত্রী বের করা!',
        keyTakeaways: [
          'কখনোই শুধু `except:` লিখবে না—সবসময় `except ValueError:` বা নির্দিষ্ট এরর ক্লাস ধরবে।',
          '`with open(...) as f:` ব্যবহার করলে `f.close()` লিখতে ভুলে গেলেও ফাইল লিক হয় না।',
          '`min(d.items(), key=lambda kv: (-kv[1], kv[0]))` এক লাইনে সর্বোচ্চ স্কোর + বর্ণানুক্রম টাই-ব্রেক দেয়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular Aggregate & Tie-Break Winner',
        banglaNote: '`defaultdict(int)` ও টিউপল সর্টিং কী ব্যবহার করে মডিউলার লিডারবোর্ড বিজয়ী বের করা।',
        code: `import sys
from collections import defaultdict

def solve(lines: list[str]) -> tuple[str, int]:
    n = int(lines[0])
    totals: defaultdict[str, int] = defaultdict(int)
    for line in lines[1:1 + n]:
        name, score = line.split()
        totals[name] += int(score)
    return min(totals.items(), key=lambda kv: (-kv[1], kv[0]))

lines = sys.stdin.read().strip().splitlines()
if lines:
    winner, score = solve(lines)
    print(winner, score)`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'py-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Stream Context Manager (StringIO) + ValueError Skip',
        banglaNote: '`io.StringIO` কনটেক্সট ম্যানেজার দিয়ে ইনপুট স্ট্রিম পড়া এবং `ValueError` ছাড়া নষ্ট লাইন স্কিপ করা।',
        code: `import io, sys

def parse_pair(line: str) -> tuple[str, int]:
    parts = line.split()
    if len(parts) != 2:
        raise ValueError("bad columns")
    return parts[0], int(parts[1])

raw = sys.stdin.read()
ok, skipped, total = 0, 0, 0
with io.StringIO(raw) as stream:
    for line in stream:
        if not line.strip():
            continue
        try:
            _, val = parse_pair(line)
            total += val
            ok += 1
        except ValueError:
            skipped += 1
print(f"ok={ok} skipped={skipped} total={total}")`,
        stdin: 'alice 20\nbob oops\nonly_one\ncarol 30',
        expectedOutput: 'ok=2 skipped=2 total=50',
      },
      {
        id: 'py-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n log K) heapq.nsmallest Top-K Stream Leaderboard',
        banglaNote: 'বড় ডেটাসেটে পুরো ম্যাপ সর্ট না করে `heapq.nsmallest` দিয়ে O(n log K)-তে Top-K বের করা।',
        code: `import heapq, sys
from collections import defaultdict

lines = sys.stdin.read().strip().splitlines()
n, k = map(int, lines[0].split())
totals = defaultdict(int)
for row in lines[1:1 + n]:
    nm, val = row.split()
    totals[nm] += int(val)
top_k = heapq.nsmallest(k, totals.items(), key=lambda kv: (-kv[1], kv[0]))
print(" ".join(f"{name}:{sc}" for name, sc in top_k))`,
        stdin: '4 2\nalice 25\nbob 50\nalice 35\ncarol 40',
        expectedOutput: 'alice:60 bob:50',
      },
      {
        id: 'py-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Custom Domain Exception + __slots__ Record',
        banglaNote: 'কাস্টম `ParseError` এবং `dataclass(slots=True)` দিয়ে কম মেমোরিতে নিরাপদ ডেটা কনট্রাক্ট।',
        code: `import sys
from dataclasses import dataclass

class RowFormatError(Exception):
    pass

@dataclass(slots=True)
class Event:
    name: str
    delta: int

def parse_event(line: str) -> Event:
    cols = line.strip().split(",")
    if len(cols) != 2 or not cols[1].lstrip("-").isdigit():
        raise RowFormatError(line)
    return Event(cols[0], int(cols[1]))

total = 0
errs = 0
for line in sys.stdin:
    if not line.strip():
        continue
    try:
        total += parse_event(line).delta
    except RowFormatError:
        errs += 1
print(f"total={total} errs={errs}")`,
        stdin: 'a,10\nb,bad\nc,-5\nd,25',
        expectedOutput: 'total=30 errs=1',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'def parse_pair(line: str) -> tuple[str, int]:',
        whatItMeans: 'Typed modular helper isolating parsing rules from business math.',
        whyItIsThere: 'Single responsibility makes testing and error tracing trivial.',
        ifDeletedError: 'Parsing checks duplicate everywhere inside main aggregation loops.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'with io.StringIO(raw) as stream:',
        whatItMeans: 'Context manager ensuring automatic `.close()` upon exiting the `with` block.',
        whyItIsThere: 'Follows deterministic resource cleanup even if exceptions occur.',
        ifDeletedError: 'Manual `close()` calls often get skipped during exceptions.',
      },
      {
        lineNumber: 'Line 18',
        codeSnippet: 'except ValueError:',
        whatItMeans: 'Catches only numeric/unpacking failures, never hiding unrelated bugs.',
        whyItIsThere: 'Prevents swallowing `NameError` or `KeyboardInterrupt` bugs silently.',
        ifDeletedError: 'One malformed string crashes the entire ingestion pipeline.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'min(totals.items(), key=lambda kv: (-kv[1], kv[0]))',
        whatItMeans: 'Finds maximum score first (`-kv[1]`), tie-broken alphabetically (`kv[0]`).',
        whyItIsThere: 'O(U) linear winner scan without wasting O(U log U) sorting work.',
        ifDeletedError: 'Multi-key tie-breaking breaks when two players share the top score.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Open StringIO stream', memoryOrStack: 'ok=0, skipped=0', note: 'Context manager active' },
      { step: 2, state: 'parse_pair("alice 20")', memoryOrStack: 'total=20, ok=1', note: 'Valid integer 20' },
      { step: 3, state: 'parse_pair("bob oops")', memoryOrStack: 'ValueError -> skipped=1', note: 'Stream keeps going safely' },
      { step: 4, state: 'parse_pair("carol 30")', memoryOrStack: 'total=50, ok=2', note: 'Stream closes cleanly at end of with' },
    ],
    harryBugTraps: [
      {
        title: 'Using Bare `except:` That Swallows Bugs',
        brokenCode: `try: ans = val / cnt\nexcept: pass  # silently hides NameError or ZeroDivisionError!`,
        fixedCode: `try: ans = val / cnt\nexcept ZeroDivisionError: ans = 0`,
        whyItBreaks: 'Bare `except:` catches `KeyboardInterrupt`, `SystemExit`, and typos in variable names.',
      },
      {
        title: 'Mutable Default Arguments Inside Modular Functions',
        brokenCode: `def add_row(row, rows=[]): rows.append(row); return rows`,
        fixedCode: `def add_row(row, rows=None):\n    if rows is None: rows = []\n    rows.append(row); return rows`,
        whyItBreaks: 'Default list `[]` is shared across every function call for the lifetime of the process!',
      },
      {
        title: 'Reading Huge Files With `.read()` Instead of Streaming Line by Line',
        brokenCode: `data = open("2gb.log").read()  # OOM crash + leaked handle`,
        fixedCode: `with open("2gb.log") as f:\n    for line in f: process(line)`,
        whyItBreaks: 'Iterating the file handle streams one line at a time in O(1) memory.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: Leaderboard Top Scorer',
        prompt: 'Aggregate `(name, score)` records and output the winner (`name score`).',
        banglaHint: '`defaultdict(int)`-এ স্কোর যোগ করে `min(..., key=lambda kv: (-kv[1], kv[0]))` দিয়ে বিজয়ী বের করো।',
        starterCode: `import sys
from collections import defaultdict

lines = sys.stdin.read().strip().splitlines()
n = int(lines[0])
totals = defaultdict(int)
for line in lines[1:1 + n]:
    name, score = line.split()
    totals[name] += int(score)
winner, score = min(totals.items(), key=lambda kv: (-kv[1], kv[0]))
print(winner, score)`,
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'py-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Safe Stream Non-Empty Line Counter',
        prompt: 'Count non-empty, non-comment (`#`) lines from stdin.',
        banglaHint: 'স্ট্রিপ করে খালি বা `#` দিয়ে শুরু হওয়া লাইন বাদ দিয়ে বাকিগুলো গোনো।',
        starterCode: `import sys
count = sum(1 for line in sys.stdin if line.strip() and not line.lstrip().startswith("#"))
print(count)`,
        sampleStdin: '# comment\nalpha\n\nbeta',
        expectedOutput: '2',
      },
      {
        id: 'py-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Defensive Integer Sum With Error Count',
        prompt: 'Parse whitespace-separated tokens and print `sum=<total> invalid=<err>`.',
        banglaHint: '`try: int(tok)` আর `except ValueError:` ব্যবহার করো।',
        starterCode: `import sys
total = 0
invalid = 0
for tok in sys.stdin.read().split():
    try:
        total += int(tok)
    except ValueError:
        invalid += 1
print(f"sum={total} invalid={invalid}")`,
        sampleStdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
      {
        id: 'py-ch-10-q4',
        difficulty: 'Medium',
        title: '4. Modular INI Config Sum',
        prompt: 'Parse `key=value` lines ignoring `#` comments and output total integer value.',
        banglaHint: '`=` দিয়ে `split("=", 1)` করে মান যোগ করো।',
        starterCode: `import sys
total = 0
for line in sys.stdin:
    s = line.strip()
    if not s or s.startswith("#") or "=" not in s:
        continue
    _, val = s.split("=", 1)
    total += int(val)
print(total)`,
        sampleStdin: '# cfg\nretries=3\ntimeout=25\nworkers=4',
        expectedOutput: '32',
      },
      {
        id: 'py-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Leaderboard Winner',
        prompt: 'Aggregate `(name, score)` and output top entry breaking ties alphabetically.',
        banglaHint: 'একই স্কোর হলে নামের বর্ণানুক্রমে ছোটটি জিতবে।',
        starterCode: `import sys
from collections import defaultdict

lines = sys.stdin.read().strip().splitlines()
n = int(lines[0])
mp = defaultdict(int)
for row in lines[1:1 + n]:
    nm, sc = row.split()
    mp[nm] += int(sc)
winner, best = min(mp.items(), key=lambda kv: (-kv[1], kv[0]))
print(winner, best)`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (Python 3.13): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Unites Ch 6 Lists, Ch 7 References, Ch 8 @dataclass(slots=True), Ch 9 defaultdict + sorted, and Ch 10 Context Manager + Exception guards.',
      banglaGoal:
        'Python 3.13-এর `dataclass`, `defaultdict`, কনটেক্সট ম্যানেজার ও `try/except` একত্র করে মাইলস্টোন প্রজেক্ট ২ সম্পূর্ণ করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `import io, sys
from collections import defaultdict
from dataclasses import dataclass

@dataclass(slots=True)
class Event:
    name: str
    delta: int

def parse_event(line: str) -> Event:
    cols = line.split()
    if len(cols) != 2:
        raise ValueError("bad format")
    return Event(cols[0], int(cols[1]))

raw_lines = sys.stdin.read().strip().splitlines()
if raw_lines:
    n = int(raw_lines[0])
    totals: defaultdict[str, int] = defaultdict(int)
    skipped = 0
    with io.StringIO("\\n".join(raw_lines[1:1 + n])) as stream:
        for line in stream:
            try:
                ev = parse_event(line)
                totals[ev.name] += ev.delta
            except ValueError:
                skipped += 1
    winner, score = min(totals.items(), key=lambda kv: (-kv[1], kv[0]))
    print(f"winner={winner}:{score} skipped={skipped}")`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  java: {
    title: 'Java Chapter 10 (Java 21): Modular Packages, try-with-resources, Optional & Milestone Merger 2',
    banglaTitle: 'Java অধ্যায় ১০ (Java 21): মডিউলার কোড, try-with-resources, Optional ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Design clean Java 21 modules using records, Optional<T>, try-with-resources AutoCloseable streams, and Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'Enterprise Java 21 enforces modularity and crash-proof I/O through **try-with-resources (`try (var reader = ...)` )**—guaranteeing streams close automatically—paired with **`Optional<T>`** and `try/catch (NumberFormatException)` so a corrupt input line never crashes the JVM. **Milestone Merger 2** integrates Ch 6 arrays, Ch 7 references, Ch 8 `record`, Ch 9 `TreeMap` / `Streams`, and Ch 10 defensive parsing!',
      asciiFlowchart: `  JAVA 21 TRY-WITH-RESOURCES + OPTIONAL PIPELINE
  try (BufferedReader br = new BufferedReader(...))
        |  readLine()
        v
   parseEvent(line) -> Optional<Event>  (catches NumberFormatException)
        |
   +----+--------------------+
   | Optional.empty()        | Optional.isPresent()
   v                         v
  skipped++              totals.merge(ev.name(), ev.pts(), Long::sum)
                             |
                             v
                     Stream.sorted(Comparator...) -> Winner / Top-K`,
      pseudocode: [
        '1. DEFINE immutable `record Event(String name, long pts)` for clean parsed data transfer',
        '2. RETURN `Optional<Event>` from helper parser catching `NumberFormatException`',
        '3. WRAP streams in `try (BufferedReader br = ...)` so `close()` always executes automatically',
        '4. AGGREGATE via `Map.merge(name, val, Long::sum)` and sort via `Comparator.comparingLong`',
        '5. COMBINE Ch 6–10 cleanly inside Milestone Merger 2',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় ক্লোজার (`try-with-resources`) ও `Optional` নিরাপত্তা ক্যাপসুল',
        explanation:
          'Java-তে ফাইল বা স্ট্রিম খোলার পর `finally` ব্লকে আলাদা করে `.close()` না লিখে `try (BufferedReader br = ...)` লিখলেই JVM নিজেই কাজ শেষে রিসোর্স বন্ধ করে দেয়! আর সংখ্যা পার্সিংয়ে `NumberFormatException` ধরতে `Optional<Event>` রিটার্ন করলে একটি ভুল লাইন থাকলেও পুরো সার্ভার বন্ধ হয় না।',
        everydayExample:
          'ব্যাংকের ট্রানজেকশন ফাইলে ভুল অক্ষর থাকা সারি এড়িয়ে প্রতিটি অ্যাকাউন্টের সঠিক ব্যালেন্স ও শীর্ষ গ্রাহক বের করা!',
        keyTakeaways: [
          '`try (var br = new BufferedReader(...))` ব্যবহার করলে মেমোরি বা ফাইল হ্যান্ডেল লিক হয় না।',
          '`Optional<T>` নাল পয়েন্টার এক্সেপশন (`NullPointerException`) থেকে কোড বাঁচায়।',
          '`map.merge(key, val, Long::sum)` এক লাইনে ফ্রিকোয়েন্সি বা স্কোর যোগ করে!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular TreeMap Aggregator Winner',
        banglaNote: '`TreeMap` ও `merge()` ব্যবহার করে খেলোয়াড়ের স্কোর যোগ ও বিজয়ী বের করা।',
        code: `import java.util.*;

public class Main {
    static String findWinner(TreeMap<String, Integer> map, int[] bestOut) {
        String best = ""; bestOut[0] = Integer.MIN_VALUE;
        for (var e : map.entrySet()) {
            if (e.getValue() > bestOut[0]) { bestOut[0] = e.getValue(); best = e.getKey(); }
        }
        return best;
    }

    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            int n = sc.nextInt();
            TreeMap<String, Integer> map = new TreeMap<>();
            for (int i = 0; i < n; i++) {
                String name = sc.next();
                int val = sc.nextInt();
                map.merge(name, val, Integer::sum);
            }
            int[] score = new int[1];
            String w = findWinner(map, score);
            System.out.println(w + " " + score[0]);
        }
    }
}`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'java-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: try-with-resources BufferedReader + Optional Parser',
        banglaNote: '`Optional<Event>` দিয়ে ভুল সংখ্যা বা কম কলামের লাইন ক্র্যাশ না করে স্কিপ করা।',
        code: `import java.io.*;
import java.util.*;

public class Main {
    record Event(String name, long val) {}

    static Optional<Event> parseLine(String line) {
        String[] parts = line.trim().split("\\\\s+");
        if (parts.length != 2) return Optional.empty();
        try {
            return Optional.of(new Event(parts[0], Long.parseLong(parts[1])));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    public static void main(String[] args) throws IOException {
        long sum = 0; int ok = 0, bad = 0;
        try (var br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.isBlank()) continue;
                var opt = parseLine(line);
                if (opt.isPresent()) { sum += opt.get().val(); ok++; }
                else bad++;
            }
        }
        System.out.println("ok=" + ok + " bad=" + bad + " sum=" + sum);
    }
}`,
        stdin: 'alice 20\nbob bad\n\ncarol 30 extra\ndave 50',
        expectedOutput: 'ok=2 bad=2 sum=70',
      },
      {
        id: 'java-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Stream Pipeline Ranked Top-K Output',
        banglaNote: '`HashMap` + Java Stream কম্পারেটর ব্যবহার করে O(n log n) এ Top-K ফলাফল।',
        code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        Map<String, Long> totals = new HashMap<>();
        for (int i = 0; i < n; i++) totals.merge(sc.next(), sc.nextLong(), Long::sum);
        String out = totals.entrySet().stream()
            .sorted((a, b) -> {
                int cmp = Long.compare(b.getValue(), a.getValue());
                return cmp != 0 ? cmp : a.getKey().compareTo(b.getKey());
            })
            .limit(k)
            .map(e -> e.getKey() + ":" + e.getValue())
            .collect(Collectors.joining(" "));
        System.out.println(out);
    }
}`,
        stdin: '4 2\nalice 25\nbob 50\nalice 35\ncarol 40',
        expectedOutput: 'alice:60 bob:50',
      },
      {
        id: 'java-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Fast BufferedReader + StringTokenizer Ingestion',
        banglaNote: 'প্রতিযোগিতামূলক প্রোগ্রামিংয়ে `Scanner`-এর বদলে ৫ গুণ দ্রুত `BufferedReader + StringTokenizer`।',
        code: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        var br = new BufferedReader(new InputStreamReader(System.in));
        long sum = 0;
        String line;
        while ((line = br.readLine()) != null) {
            var st = new StringTokenizer(line);
            while (st.hasMoreTokens()) sum += Long.parseLong(st.nextToken());
        }
        System.out.println(sum);
    }
}`,
        stdin: '10 20 30\n40 50',
        expectedOutput: '150',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'record Event(String name, long val) {}',
        whatItMeans: 'Java 21 compact immutable value carrier with generated constructor & accessors.',
        whyItIsThere: 'Cleaner than writing 30 lines of POJO getters/equals/toString.',
        ifDeletedError: 'Verbose boilerplate classes needed just to pass `(name, val)` safely.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'static Optional<Event> parseLine(String line) {',
        whatItMeans: 'Explicitly models a possibly-failed line parse without returning null.',
        whyItIsThere: 'Callers must handle `.isPresent()` instead of risking `NullPointerException`.',
        ifDeletedError: 'Null returns silently trigger `NullPointerException` deep in aggregation.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'try { return Optional.of(...); } catch (NumberFormatException e) { return Optional.empty(); }',
        whatItMeans: 'Converts malformed numeric text into a safe empty Optional signal.',
        whyItIsThere: 'Prevents uncaught `NumberFormatException` from killing batch ingestion.',
        ifDeletedError: 'Any non-numeric token crashes the entire Java process.',
      },
      {
        lineNumber: 'Line 18',
        codeSnippet: 'try (var br = new BufferedReader(new InputStreamReader(System.in))) {',
        whatItMeans: 'AutoCloseable try-with-resources resource management block.',
        whyItIsThere: 'Guarantees stream closes automatically on normal or exception exit.',
        ifDeletedError: 'Open file descriptors leak until JVM shutdown.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'parseLine("alice 20")', memoryOrStack: 'Optional[Event(alice, 20)]', note: 'ok=1, sum=20' },
      { step: 2, state: 'parseLine("bob bad")', memoryOrStack: 'NumberFormatException -> empty', note: 'bad=1, stream stays open' },
      { step: 3, state: 'parseLine("carol 30 extra")', memoryOrStack: 'parts.length==3 -> empty', note: 'bad=2, rejected safely' },
      { step: 4, state: 'parseLine("dave 50")', memoryOrStack: 'Optional[Event(dave, 50)]', note: 'ok=2, sum=70 -> close()' },
    ],
    harryBugTraps: [
      {
        title: 'Using Integer Overflow Trap `(b - a)` in Comparator',
        brokenCode: `.sorted((a, b) -> (int)(b.getValue() - a.getValue())) // Overflows long->int!`,
        fixedCode: `.sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))`,
        whyItBreaks: 'Subtracting large longs and casting to `(int)` wraps signs and corrupts TimSort.',
      },
      {
        title: 'Forgetting `AutoCloseable` Try-With-Resources on `BufferedReader`',
        brokenCode: `var br = new BufferedReader(new FileReader("a.txt"));\n// Throws IOException before br.close()!`,
        fixedCode: `try (var br = new BufferedReader(new FileReader("a.txt"))) { ... }`,
        whyItBreaks: 'Manual `.close()` after logic never runs when an exception fires early.',
      },
      {
        title: 'Mutating Map Keys After Insertion',
        brokenCode: `StringBuilder sb = new StringBuilder("a");\nmap.put(sb, 1); sb.append("b"); // hashCode changed!`,
        fixedCode: `Use immutable Strings or Records as Map keys.`,
        whyItBreaks: 'Changing a key object after `put()` leaves it orphaned in the wrong hash bucket.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: TreeMap Scoreboard Winner',
        prompt: 'Aggregate `(name, score)` records and output the winner (`name score`).',
        banglaHint: '`TreeMap` ব্যবহার করে স্কোর যোগ করে সেরা খেলোয়াড় প্রিন্ট করো।',
        starterCode: `import java.util.*;

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
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'java-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Safe Non-Blank Line Counter',
        prompt: 'Read lines via `BufferedReader` and count non-blank, non-`#` lines.',
        banglaHint: '`line.isBlank()` এবং `!line.trim().startsWith("#")` চেক করো।',
        starterCode: `import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        int count = 0;
        try (var br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (!line.isBlank() && !line.trim().startsWith("#")) count++;
            }
        }
        System.out.println(count);
    }
}`,
        sampleStdin: '# header\nalpha\n\nbeta',
        expectedOutput: '2',
      },
      {
        id: 'java-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Defensive Long Token Validator',
        prompt: 'Parse whitespace tokens and print `sum=<total> invalid=<err>`.',
        banglaHint: '`Long.parseLong` এবং `NumberFormatException` ক্যাচ ব্যবহার করো।',
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long sum = 0; int invalid = 0;
        while (sc.hasNext()) {
            String tok = sc.next();
            try { sum += Long.parseLong(tok); }
            catch (NumberFormatException e) { invalid++; }
        }
        System.out.println("sum=" + sum + " invalid=" + invalid);
    }
}`,
        sampleStdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
      {
        id: 'java-ch-10-q4',
        difficulty: 'Medium',
        title: '4. Record Config Key=Value Sum',
        prompt: 'Parse `key=value` lines ignoring `#` comments and print integer sum.',
        banglaHint: '`line.split("=", 2)` দিয়ে মান নিয়ে যোগ করো।',
        starterCode: `import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        long total = 0;
        try (var br = new BufferedReader(new InputStreamReader(System.in))) {
            String s;
            while ((s = br.readLine()) != null) {
                s = s.trim();
                if (s.isEmpty() || s.startsWith("#") || !s.contains("=")) continue;
                total += Long.parseLong(s.split("=", 2)[1]);
            }
        }
        System.out.println(total);
    }
}`,
        sampleStdin: '# cfg\nretries=3\ntimeout=25\nworkers=4',
        expectedOutput: '32',
      },
      {
        id: 'java-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Winner With HashMap & Stream Comparator',
        prompt: 'Aggregate `(name, score)` and output top entry with alphabetical tie-break.',
        banglaHint: 'উচ্চতর স্কোর ও সমান হলে বর্ণানুক্রমে ছোট নাম আগে নির্বাচন করো।',
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<String, Long> mp = new HashMap<>();
        for (int i = 0; i < n; i++) mp.merge(sc.next(), sc.nextLong(), Long::sum);
        var winner = mp.entrySet().stream()
            .min((a, b) -> {
                int cmp = Long.compare(b.getValue(), a.getValue());
                return cmp != 0 ? cmp : a.getKey().compareTo(b.getKey());
            }).orElseThrow();
        System.out.println(winner.getKey() + " " + winner.getValue());
    }
}`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (Java 21): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Unites Ch 6 Arrays, Ch 7 References, Ch 8 Java 21 Record, Ch 9 HashMap + Streams, and Ch 10 try-with-resources + Optional parser.',
      banglaGoal:
        'Java 21-এর `record`, `Optional`, `try-with-resources` এবং `HashMap` একত্র করে ক্র্যাশ-মুক্ত মাইলস্টোন প্রজেক্ট ২ তৈরি করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `import java.io.*;
import java.util.*;

public class Main {
    record Event(String name, long delta) {}

    static Optional<Event> parseEvent(String line) {
        String[] p = line.trim().split("\\\\s+");
        if (p.length != 2) return Optional.empty();
        try { return Optional.of(new Event(p[0], Long.parseLong(p[1]))); }
        catch (NumberFormatException e) { return Optional.empty(); }
    }

    public static void main(String[] args) throws IOException {
        try (var br = new BufferedReader(new InputStreamReader(System.in))) {
            String first = br.readLine();
            if (first == null) return;
            int n = Integer.parseInt(first.trim());
            Map<String, Long> totals = new HashMap<>();
            int skipped = 0;
            for (int i = 0; i < n; i++) {
                String line = br.readLine();
                if (line == null) break;
                var opt = parseEvent(line);
                if (opt.isPresent()) totals.merge(opt.get().name(), opt.get().delta(), Long::sum);
                else skipped++;
            }
            var win = totals.entrySet().stream()
                .min((a, b) -> {
                    int c = Long.compare(b.getValue(), a.getValue());
                    return c != 0 ? c : a.getKey().compareTo(b.getKey());
                }).orElseThrow();
            System.out.println("winner=" + win.getKey() + ":" + win.getValue() + " skipped=" + skipped);
        }
    }
}`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 10 (ES2025): ES Modules, Safe JSON/Stream Parsing, Custom Errors & Milestone Merger 2',
    banglaTitle: 'JavaScript অধ্যায় ১০ (ES2025): মডিউলার কোড, নিরাপদ পার্সিং, কাস্টম এরর ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Build modular ES2025 data pipelines with custom Error subclasses, try/catch JSON guards, Number.isFinite checks, and Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'In real ES2025 apps, `JSON.parse()` or external input throws **SyntaxError** or creates silent **`NaN`** bugs (`Number("abc")` is `NaN`, not an exception!). Modular JavaScript isolates validation inside dedicated parser helpers using custom `class ParseError extends Error`, `Number.isFinite()`, and `try/catch/finally`. **Milestone Merger 2** merges Ch 6 arrays, Ch 7 references, Ch 8 classes, Ch 9 `Map`, and Ch 10 safe parsing!',
      asciiFlowchart: `  ES2025 MODULAR PARSE -> VALIDATE -> RANK PIPELINE
  raw text lines -> split(/\\r?\\n/)
        |
        v
   parseEvent(line) -> checks cols == 2 && Number.isFinite(val)
        |
   +----+--------------------+
   | throws ParseError       | valid { name, delta }
   v                         v
  catch -> skipped++     totals.set(name, (totals.get(name) ?? 0) + delta)
                             |
                             v
                     toSorted((a,b) => b[1] - a[1] || a[0].localeCompare(b[0]))`,
      pseudocode: [
        '1. ISOLATE parsing in a pure `parseEvent(line)` helper throwing custom `ParseError` on bad rows',
        '2. GUARD numbers strictly with `Number.isFinite(val)` (never trust truthiness or `typeof === "number"` for `NaN`)',
        '3. WRAP untrusted `JSON.parse` inside `try/catch` returning safe fallback objects',
        '4. AGGREGATE via ES `Map` and rank immutably using ES2023+ `.toSorted()`',
        '5. COMBINE Ch 6–10 into Milestone Merger 2',
      ],
      banglaZeroToHero: {
        analogyTitle: '`NaN` ফাঁদ থেকে সুরক্ষা (`Number.isFinite`) ও কাস্টম `Error` গার্ড',
        explanation:
          'JavaScript-এ `Number("abc")` করলে কোনো এরর থ্রো হয় না—নীরবে `NaN` হয়ে যোগফল নষ্ট করে দেয়! তাই পার্স করার পর অবশ্যই `Number.isFinite(val)` চেক করতে হবে। আর `JSON.parse()` বা ভাঙা লাইন পড়ার সময় নিজের তৈরি `class ParseError extends Error` ব্যবহার করে `try/catch` দিলে নষ্ট ডেটা এড়িয়ে পুরো পাইপলাইন স্মুথলি চলে।',
        everydayExample:
          'সার্ভার লগ বা API রেসপন্স থেকে নষ্ট JSON বা NaN বাদ দিয়ে পরিষ্কার Top-K লিডারবোর্ড তৈরি করা!',
        keyTakeaways: [
          '`typeof NaN === "number"` সত্যি! তাই সবসময় `Number.isFinite(n)` দিয়ে আসল সংখ্যা যাচাই করো।',
          '`.sort()` মূল অ্যারে বদলে (mutate) দেয়—নতুন অ্যারেতে সর্ট করতে ES2023+ `.toSorted()` ব্যবহার করো।',
          '`JSON.parse()` সবসময় `try/catch` ব্লকের ভেতরে রাখবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular Map Aggregator Leaderboard',
        banglaNote: '`Map` ও `.toSorted()` ব্যবহার করে খেলোয়াড়দের স্কোর যোগ ও বিজয়ী বের করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function computeWinner(lines) {
  const n = Number(lines[0]);
  const totals = new Map();
  for (let i = 1; i <= n; i++) {
    const [name, s] = lines[i].trim().split(/\\s+/);
    totals.set(name, (totals.get(name) ?? 0) + Number(s));
  }
  return [...totals.entries()].toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
}

const lines = raw.trim().split(/\\r?\\n/);
const [winner, score] = computeWinner(lines);
console.log(\`\${winner} \${score}\`);`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'js-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Custom Error Class + Strict NaN Rejection',
        banglaNote: '`Number.isFinite()` ও কাস্টম `ParseError` দিয়ে `""` বা `"abc"` ইনপুট থেকে `NaN` দূষণ আটকানো।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

class ParseError extends Error {}

function parseLine(line) {
  const cols = line.trim().split(/\\s+/);
  if (cols.length !== 2) throw new ParseError("col count");
  const v = Number(cols[1]);
  if (!Number.isFinite(v)) throw new ParseError("not finite");
  return { name: cols[0], val: v };
}

let ok = 0, bad = 0, sum = 0;
for (const line of raw.split(/\\r?\\n/)) {
  if (!line.trim()) continue;
  try { sum += parseLine(line).val; ok++; }
  catch (err) { if (err instanceof ParseError) bad++; else throw err; }
}
console.log(\`ok=\${ok} bad=\${bad} sum=\${sum}\`);`,
        stdin: 'alice 20\nbob abc\n\ncarol 30 extra\ndave 50',
        expectedOutput: 'ok=2 bad=2 sum=70',
      },
      {
        id: 'js-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Defensive JSON Lines (NDJSON) Top-K Pipeline',
        banglaNote: '`try/catch` দিয়ে প্রতি লাইনের JSON পার্স করে ভাঙা রেকর্ড স্কিপ ও Top-K বের করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

const totals = new Map();
for (const line of raw.trim().split(/\\r?\\n/)) {
  try {
    const obj = JSON.parse(line);
    if (obj && typeof obj.name === 'string' && Number.isFinite(obj.pts)) {
      totals.set(obj.name, (totals.get(obj.name) ?? 0) + obj.pts);
    }
  } catch {}
}
const top = [...totals.entries()].toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 2);
console.log(top.map(([k, v]) => \`\${k}:\${v}\`).join(" "));`,
        stdin: '{"name":"alice","pts":25}\n{corrupt_json}\n{"name":"bob","pts":50}\n{"name":"alice","pts":35}',
        expectedOutput: 'alice:60 bob:50',
      },
      {
        id: 'js-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Safe Deep Property Access + Result Tuple Pattern',
        banglaNote: '`[ok, dataOrErr]` Go-স্টাইল রেজাল্ট টিউপল দিয়ে গভীর নেস্টেড `try/catch` এড়ানো।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function tryJson(text) {
  try { return [true, JSON.parse(text)]; }
  catch (e) { return [false, e.message]; }
}

let valid = 0, failed = 0;
for (const line of raw.trim().split(/\\r?\\n/)) {
  const [ok] = tryJson(line);
  if (ok) valid++; else failed++;
}
console.log(\`valid=\${valid} failed=\${failed}\`);`,
        stdin: '{"x":1}\nbad_json\n[1,2,3]',
        expectedOutput: 'valid=2 failed=1',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'class ParseError extends Error {}',
        whatItMeans: 'Defines a domain-specific error subclass distinguishable via `instanceof`.',
        whyItIsThere: 'Prevents catching unexpected `TypeError`/`ReferenceError` bugs together with format errors.',
        ifDeletedError: 'Blanket `catch` masks real bugs in application logic.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'if (!Number.isFinite(v)) throw new ParseError("not finite");',
        whatItMeans: 'Rejects `NaN`, `Infinity`, and non-numeric strings explicitly.',
        whyItIsThere: '`Number("")` is 0 and `Number("abc")` is `NaN`—neither throws automatically.',
        ifDeletedError: '`NaN` silently propagates through addition turning final sums into `NaN`.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: '[...totals.entries()].toSorted(...)',
        whatItMeans: 'Creates a fresh sorted array without mutating existing references.',
        whyItIsThere: 'Immutable ES2023+ API avoids side-effects across modular components.',
        ifDeletedError: 'Mutating `.sort()` on shared arrays introduces subtle state bugs.',
      },
      {
        lineNumber: 'Line 16',
        codeSnippet: 'catch (err) { if (err instanceof ParseError) bad++; else throw err; }',
        whatItMeans: 'Handles expected domain errors cleanly while re-throwing real crashes.',
        whyItIsThere: 'Gold standard for safe production error isolation.',
        ifDeletedError: 'Program either crashes on bad input or hides genuine code defects.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'parseLine("alice 20")', memoryOrStack: '{name:"alice", val:20}', note: 'ok=1, sum=20' },
      { step: 2, state: 'parseLine("bob abc")', memoryOrStack: 'throws ParseError', note: 'caught -> bad=1' },
      { step: 3, state: 'parseLine("carol 30 extra")', memoryOrStack: 'cols.length=3 -> throws', note: 'caught -> bad=2' },
      { step: 4, state: 'parseLine("dave 50")', memoryOrStack: '{name:"dave", val:50}', note: 'ok=2, sum=70' },
    ],
    harryBugTraps: [
      {
        title: 'Trusting `Number("") === 0` or `isNaN("abc")` Coercion',
        brokenCode: `if (typeof Number(x) === "number") sum += Number(x); // Number("abc") is NaN (type number!)`,
        fixedCode: `const v = x.trim() === "" ? NaN : Number(x);\nif (Number.isFinite(v)) sum += v;`,
        whyItBreaks: '`Number("")` evaluates to `0`, and `typeof NaN` is `"number"`. Always check non-empty + `Number.isFinite()`.',
      },
      {
        title: 'Numeric `.sort()` Without Comparator Defaults to Lexicographical Sort',
        brokenCode: `[10, 2, 100].sort(); // [10, 100, 2] !!`,
        fixedCode: `[10, 2, 100].toSorted((a, b) => a - b); // [2, 10, 100]`,
        whyItBreaks: 'Default JS `.sort()` converts numbers to strings and compares UTF-16 code points!',
      },
      {
        title: 'Silent Swallowed `catch {}` Hiding Syntax Typos',
        brokenCode: `try { parsLine(x); } catch {} // Typo swallowed forever!`,
        fixedCode: `try { parseLine(x); } catch (e) { if (e instanceof ParseError) skip++; else throw e; }`,
        whyItBreaks: 'Empty `catch` hides `ReferenceError` and runtime bugs during debugging.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: Leaderboard Top Scorer',
        prompt: 'Aggregate `(name, score)` records using `Map` and print winner.',
        banglaHint: '`Map` ও `.toSorted()` ব্যবহার করে বিজয়ী প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
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
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'js-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Comment & Empty Line Filter Counter',
        prompt: 'Count active non-empty lines not starting with `#`.',
        banglaHint: '`filter` করে `#` ও খালি লাইন বাদ দাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const count = raw.split(/\\r?\\n/).filter((l) => l.trim() && !l.trim().startsWith('#')).length;
console.log(count);`,
        sampleStdin: '# header\nalpha\n\nbeta',
        expectedOutput: '2',
      },
      {
        id: 'js-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Strict Token Validator With NaN Guard',
        prompt: 'Sum valid numbers from tokens and output `sum=<total> invalid=<err>`.',
        banglaHint: 'ফাঁকা নয় এবং `/^-?\\d+$/` বা `Number.isFinite` ম্যাচ করে কি না দেখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let sum = 0, invalid = 0;
for (const tok of raw.trim().split(/\\s+/)) {
  const n = Number(tok);
  if (tok !== '' && Number.isFinite(n)) sum += n;
  else invalid++;
}
console.log(\`sum=\${sum} invalid=\${invalid}\`);`,
        sampleStdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
      {
        id: 'js-ch-10-q4',
        difficulty: 'Medium',
        title: '4. Safe NDJSON Event Sum',
        prompt: 'Parse JSON per line inside `try/catch` and sum `.val` fields.',
        banglaHint: 'প্রতি লাইন `JSON.parse` করে `.val` যোগ করো; ভুল JSON হলে স্কিপ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let sum = 0;
for (const l of raw.trim().split(/\\r?\\n/)) {
  try {
    const obj = JSON.parse(l);
    if (Number.isFinite(obj?.val)) sum += obj.val;
  } catch {}
}
console.log(sum);`,
        sampleStdin: '{"val":12}\nbroken\n{"val":18}',
        expectedOutput: '30',
      },
      {
        id: 'js-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Leaderboard Winner',
        prompt: 'Aggregate `(name, score)` and break equal score ties alphabetically.',
        banglaHint: '`localeCompare` ব্যবহার করে টাই-ব্রেক ঠিক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const mp = new Map();
for (let i = 1; i <= n; i++) {
  const [nm, sc] = lines[i].trim().split(/\\s+/);
  mp.set(nm, (mp.get(nm) ?? 0) + Number(sc));
}
const [[w, s]] = [...mp.entries()].toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`\${w} \${s}\`);`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (JS ES2025): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Unites Ch 6 Arrays, Ch 7 Object Refs, Ch 8 Class/Record, Ch 9 Map + toSorted, and Ch 10 Custom ParseError + NaN Guard.',
      banglaGoal:
        'JavaScript ES2025-এ ক্লাস, `Map`, `.toSorted()` এবং কাস্টম `ParseError` দিয়ে নিরাপদ মাইলস্টোন প্রজেক্ট ২ তৈরি করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

class ParseError extends Error {}
class Leaderboard {
  constructor() { this.totals = new Map(); this.skipped = 0; }
  ingest(line) {
    const parts = line.trim().split(/\\s+/);
    if (parts.length !== 2) throw new ParseError("columns");
    const delta = Number(parts[1]);
    if (!Number.isFinite(delta)) throw new ParseError("number");
    this.totals.set(parts[0], (this.totals.get(parts[0]) ?? 0) + delta);
  }
  winner() {
    return [...this.totals.entries()].toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
  }
}

const lines = raw.trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const board = new Leaderboard();
for (let i = 1; i <= n && i < lines.length; i++) {
  try { board.ingest(lines[i]); }
  catch (e) { if (e instanceof ParseError) board.skipped++; else throw e; }
}
const [w, s] = board.winner();
console.log(\`winner=\${w}:\${s} skipped=\${board.skipped}\`);`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  rust: {
    title: 'Rust Chapter 10 (Rust 2024): Modules, Result<T, E>, ? Operator & Milestone Merger 2',
    banglaTitle: 'Rust অধ্যায় ১০ (Rust 2024): মডিউল, `Result<T, E>`, `?` অপারেটর ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Eliminate null and unhandled exceptions forever using Result<T, E>, Option<T>, the ? operator, and build Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust has **NO `null`** and **NO hidden exceptions**. Any function that can fail declares it honestly in its signature: `Result<T, E>` (either `Ok(value)` or `Err(error)`). The magic **`?` operator** unwraps `Ok(val)` cleanly or returns `Err(e)` upward in 1 character! Calling `.unwrap()` on untrusted user input panics—using `match` / `if let Ok(...)` / `parse::<i64>()` makes crashes impossible. **Milestone Merger 2** fuses Slices, Borrowing, Structs, `BTreeMap`, and `Result` parsing!',
      asciiFlowchart: `  RUST 2024 ZERO-PANIC STREAM PIPELINE (Milestone Merger 2)
  stdin line -> line.split_whitespace()
                    |
                    v
   parse_event(line) -> Result<Event, ParseErr>  (uses ? on parse::<i64>()?)
                    |
          +---------+---------+
          | Err(_)            | Ok(ev)
          v                   v
      skipped += 1      *totals.entry(ev.name).or_insert(0) += ev.delta
                              |
                              v
                        sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)))`,
      pseudocode: [
        '1. DECLARE explicit domain error enum `enum ParseErr { BadCols, BadInt }`',
        '2. RETURN `Result<Event, ParseErr>` from helper parser; propagate errors with `?`',
        '3. HANDLE `Err` with `match` or `if let Ok(ev)` instead of calling `.unwrap()` on user input',
        '4. AGGREGATE via `BTreeMap::entry().or_insert(0)` and rank with `.cmp().then_with()`',
        '5. COMBINE Ch 6–10 seamlessly in Milestone Merger 2',
      ],
      banglaZeroToHero: {
        analogyTitle: '`null` ও ক্র্যাশবিহীন নিরাপদ খাম (`Result<T, E>` ও `?` অপারেটর)',
        explanation:
          'Rust-এ কোনো `null` বা অপ্রত্যাশিত এক্সেপশন নেই! যে ফাংশন ফেল করতে পারে, সে তার রিটার্ন টাইপেই লিখে দেয় `Result<T, E>`—মানে হয় `Ok(সঠিক মান)` দেবে, নয়তো `Err(এরর)`। আর লাইনের শেষে `?` লিখলে মান ঠিক থাকলে খুলে নেবে, ভুল থাকলে সাথে সাথে সুন্দরভাবে `Err` ফেরত পাঠাবে—`.unwrap()` দিয়ে প্রোগ্রাম প্যানিক করবে না!',
        everydayExample:
          'কুরিয়ার প্যাকেট খুলে যদি ঠিক পণ্য পাও তবে হিসাবের খাতায় তোলা, আর ভাঙা প্যাকেট হলে স্কিপ কাউন্টার বাড়ানো—পুরো প্রক্রিয়ায় সিস্টেম কখনো বন্ধ না হওয়া!',
        keyTakeaways: [
          'ইউজার ইনপুটে কখনো `.unwrap()` ব্যবহার করবে না—`match` বা `if let Ok(...)` ব্যবহার করো।',
          '`?` অপারেটর শুধু সেই ফাংশনের ভেতর কাজ করে যার রিটার্ন টাইপ `Result` বা `Option`।',
          '`b.total.cmp(&a.total).then_with(|| a.name.cmp(&b.name))` জিরো-কস্টে টাই-ব্রেক সর্ট করে!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular BTreeMap Leaderboard Aggregator',
        banglaNote: '`BTreeMap` এবং `entry().or_insert(0)` ব্যবহার করে নিরাপদে বিজয়ী বের করা।',
        code: `use std::collections::BTreeMap;
use std::io::{self, Read};

fn find_winner(totals: &BTreeMap<String, i64>) -> Option<(&String, i64)> {
    totals.iter().min_by(|a, b| b.1.cmp(a.1).then_with(|| a.0.cmp(b.0))).map(|(k, v)| (k, *v))
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().and_then(|x| x.parse().ok()).unwrap_or(0);
    let mut totals = BTreeMap::new();
    for _ in 0..n {
        if let (Some(nm), Some(Ok(v))) = (it.next(), it.next().map(|x| x.parse::<i64>())) {
            *totals.entry(nm.to_string()).or_insert(0) += v;
        }
    }
    if let Some((w, sc)) = find_winner(&totals) {
        println!("{} {}", w, sc);
    }
}`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'rust-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Custom Result<Event, ParseErr> + ? Propagation',
        banglaNote: 'কাস্টম `ParseErr` এবং `?` অপারেটর দিয়ে `.unwrap()` ছাড়াই ভাঙা ইনপুট লাইন স্কিপ করা।',
        code: `use std::io::{self, Read};

enum ParseErr { Cols, Int }
struct Event<'a> { _name: &'a str, val: i64 }

fn parse_line(line: &str) -> Result<Event<'_>, ParseErr> {
    let mut it = line.split_whitespace();
    let name = it.next().ok_or(ParseErr::Cols)?;
    let num_s = it.next().ok_or(ParseErr::Cols)?;
    if it.next().is_some() { return Err(ParseErr::Cols); }
    let val = num_s.parse::<i64>().map_err(|_| ParseErr::Int)?;
    Ok(Event { _name: name, val })
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let (mut ok, mut bad, mut sum) = (0, 0, 0i64);
    for line in s.lines().filter(|l| !l.trim().is_empty()) {
        match parse_line(line) {
            Ok(ev) => { sum += ev.val; ok += 1; }
            Err(_) => bad += 1,
        }
    }
    println!("ok={} bad={} sum={}", ok, bad, sum);
}`,
        stdin: 'alice 20\nbob junk\n\ncarol 30 extra\ndave 50',
        expectedOutput: 'ok=2 bad=2 sum=70',
      },
      {
        id: 'rust-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: BufRead Lines + BinaryHeap Top-K',
        banglaNote: 'পুরো ফাইল র‍্যামে না নিয়ে `BufRead::lines()` দিয়ে স্ট্রিমিং ও Top-K বের করা।',
        code: `use std::collections::HashMap;
use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let header = lines.next().unwrap().unwrap();
    let mut h = header.split_whitespace();
    let n: usize = h.next().unwrap().parse().unwrap();
    let k: usize = h.next().unwrap().parse().unwrap();
    let mut mp: HashMap<String, i64> = HashMap::new();
    for line in lines.take(n).flatten() {
        let mut p = line.split_whitespace();
        if let (Some(nm), Some(Ok(v))) = (p.next(), p.next().map(|x| x.parse::<i64>())) {
            *mp.entry(nm.to_string()).or_insert(0) += v;
        }
    }
    let mut v: Vec<_> = mp.into_iter().collect();
    v.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
    let out: Vec<String> = v.into_iter().take(k).map(|(a, b)| format!("{}:{}", a, b)).collect();
    println!("{}", out.join(" "));
}`,
        stdin: '4 2\nalice 25\nbob 50\nalice 35\ncarol 40',
        expectedOutput: 'alice:60 bob:50',
      },
      {
        id: 'rust-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Zero-Allocation filter_map Token Sum',
        banglaNote: '`filter_map(|t| t.parse::<i64>().ok())` দিয়ে ১ লাইনে বৈধ সংখ্যা ফিল্টার ও যোগ।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let sum: i64 = s.split_whitespace().filter_map(|t| t.parse::<i64>().ok()).sum();
    let total_tokens = s.split_whitespace().count();
    let valid = s.split_whitespace().filter(|t| t.parse::<i64>().is_ok()).count();
    println!("sum={} invalid={}", sum, total_tokens - valid);
}`,
        stdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'enum ParseErr { Cols, Int }',
        whatItMeans: 'Exhaustive enum modeling every possible line parse failure.',
        whyItIsThere: 'Type-safe alternative to opaque error strings or integers.',
        ifDeletedError: 'Callers lose structured distinction between column count vs integer failures.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'let name = it.next().ok_or(ParseErr::Cols)?;',
        whatItMeans: 'Converts `Option<&str>` to `Result`, returning `Err` early via `?`.',
        whyItIsThere: 'Avoids nested `match` pyramids while staying 100% panic-free.',
        ifDeletedError: 'Calling `.unwrap()` instead crashes the entire program on empty lines.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'let val = num_s.parse::<i64>().map_err(|_| ParseErr::Int)?;',
        whatItMeans: 'Translates `ParseIntError` into domain `ParseErr::Int` and propagates via `?`.',
        whyItIsThere: 'Unifies heterogeneous standard library errors under one clean return type.',
        ifDeletedError: 'Compiler rejects `?` because `ParseIntError` != `ParseErr`.',
      },
      {
        lineNumber: 'Line 20',
        codeSnippet: 'match parse_line(line) { Ok(ev) => ..., Err(_) => bad += 1 }',
        whatItMeans: 'Exhaustively handles both success and failure branches safely.',
        whyItIsThere: 'Rust compiler guarantees you cannot forget the error path.',
        ifDeletedError: 'Unused `Result` emits a compiler warning and drops parse errors.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'parse_line("alice 20")', memoryOrStack: 'Ok(Event{alice, 20})', note: 'ok=1, sum=20' },
      { step: 2, state: 'parse_line("bob junk")', memoryOrStack: 'Err(ParseErr::Int) via ?', note: 'bad=1, zero panics' },
      { step: 3, state: 'parse_line("carol 30 extra")', memoryOrStack: 'Err(ParseErr::Cols)', note: 'bad=2, zero panics' },
      { step: 4, state: 'parse_line("dave 50")', memoryOrStack: 'Ok(Event{dave, 50})', note: 'ok=2, sum=70' },
    ],
    harryBugTraps: [
      {
        title: 'Calling `.unwrap()` on Untrusted User Input',
        brokenCode: `let x: i32 = line.trim().parse().unwrap(); // PANIC on "abc"!`,
        fixedCode: `let Ok(x) = line.trim().parse::<i32>() else { skipped += 1; continue; };`,
        whyItBreaks: '`.unwrap()` aborts the thread immediately whenever a single line is malformed.',
      },
      {
        title: 'Using `?` Inside `fn main()` Without Returning `Result`',
        brokenCode: `fn main() { let f = File::open("a.txt")?; } // Compile Error!`,
        fixedCode: `fn main() -> Result<(), Box<dyn std::error::Error>> { let _f = File::open("a.txt")?; Ok(()) }`,
        whyItBreaks: '`?` can only return early from functions whose return type is `Result` or `Option`.',
      },
      {
        title: 'Silent `let _ = file.read_to_string(...)` Discarding Result',
        brokenCode: `let _ = parse_event(line); // ignores Result completely!`,
        fixedCode: `if let Ok(ev) = parse_event(line) { ... } else { errs += 1; }`,
        whyItBreaks: 'Suppressing a `Result` with `let _` drops critical error signals.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: BTreeMap Leaderboard Winner',
        prompt: 'Aggregate `(name, score)` records and output the winner.',
        banglaHint: '`BTreeMap` এবং `entry().or_insert(0)` ব্যবহার করে সেরা খেলোয়াড় বের করো।',
        starterCode: `use std::collections::BTreeMap;
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
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'rust-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Comment-Aware Line Counter',
        prompt: 'Count non-empty lines not starting with `#`.',
        banglaHint: '`s.lines().filter(...)` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let c = s.lines().filter(|l| { let t = l.trim(); !t.is_empty() && !t.starts_with('#') }).count();
    println!("{}", c);
}`,
        sampleStdin: '# header\nalpha\n\nbeta',
        expectedOutput: '2',
      },
      {
        id: 'rust-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Panic-Free Integer Validator',
        prompt: 'Sum valid `i64` tokens and count invalid tokens without panicking.',
        banglaHint: '`match tok.parse::<i64>()` ব্যবহার করো, `.unwrap()` নয়।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let (mut sum, mut invalid) = (0i64, 0usize);
    for tok in s.split_whitespace() {
        match tok.parse::<i64>() {
            Ok(v) => sum += v,
            Err(_) => invalid += 1,
        }
    }
    println!("sum={} invalid={}", sum, invalid);
}`,
        sampleStdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
      {
        id: 'rust-ch-10-q4',
        difficulty: 'Medium',
        title: '4. Result<T, E> Key=Value Config Sum',
        prompt: 'Parse `key=value` lines via `split_once(\'=\')` and sum integer values.',
        banglaHint: '`line.split_once(\'=\')` ও `.parse::<i64>()` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut total = 0i64;
    for l in s.lines() {
        let t = l.trim();
        if t.is_empty() || t.starts_with('#') { continue; }
        if let Some((_, v)) = t.split_once('=') {
            if let Ok(num) = v.parse::<i64>() { total += num; }
        }
    }
    println!("{}", total);
}`,
        sampleStdin: '# cfg\nretries=3\ntimeout=25\nworkers=4',
        expectedOutput: '32',
      },
      {
        id: 'rust-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Winner via min_by',
        prompt: 'Aggregate `(name, score)` and break equal score ties alphabetically.',
        banglaHint: '`b.1.cmp(a.1).then_with(|| a.0.cmp(b.0))` ব্যবহার করো।',
        starterCode: `use std::collections::HashMap;
use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut mp: HashMap<String, i64> = HashMap::new();
    for _ in 0..n {
        let nm = it.next().unwrap().to_string();
        let v: i64 = it.next().unwrap().parse().unwrap();
        *mp.entry(nm).or_insert(0) += v;
    }
    if let Some((w, sc)) = mp.iter().min_by(|a, b| b.1.cmp(a.1).then_with(|| a.0.cmp(b.0))) {
        println!("{} {}", w, sc);
    }
}`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (Rust 2024): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Combines Ch 6 Slices, Ch 7 Borrowing, Ch 8 Struct/Enum, Ch 9 BTreeMap, and Ch 10 Result<?, ParseErr> Zero-Panic Stream Parsing.',
      banglaGoal:
        'Rust 2024-এর স্লাইস, বরোয়িং, স্ট্রাক্ট, `BTreeMap` এবং `Result<T, E>` প্যানিক-মুক্ত পার্সার মিলে মাইলস্টোন প্রজেক্ট ২ তৈরি করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `use std::collections::BTreeMap;
use std::io::{self, Read};

enum ParseErr { Cols, Int }
struct Event<'a> { name: &'a str, delta: i64 }

fn parse_event(line: &str) -> Result<Event<'_>, ParseErr> {
    let mut it = line.split_whitespace();
    let name = it.next().ok_or(ParseErr::Cols)?;
    let num_s = it.next().ok_or(ParseErr::Cols)?;
    if it.next().is_some() { return Err(ParseErr::Cols); }
    let delta = num_s.parse::<i64>().map_err(|_| ParseErr::Int)?;
    Ok(Event { name, delta })
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut lines = s.lines();
    let n: usize = lines.next().and_then(|x| x.trim().parse().ok()).unwrap_or(0);
    let mut totals: BTreeMap<String, i64> = BTreeMap::new();
    let mut skipped = 0usize;
    for line in lines.take(n) {
        match parse_event(line) {
            Ok(ev) => *totals.entry(ev.name.to_string()).or_insert(0) += ev.delta,
            Err(_) => skipped += 1,
        }
    }
    if let Some((w, sc)) = totals.iter().min_by(|a, b| b.1.cmp(a.1).then_with(|| a.0.cmp(b.0))) {
        println!("winner={}:{} skipped={}", w, sc, skipped);
    }
}`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 10 (TS 5.x): Modular Types, Discriminated Result<T, E>, unknown Narrowing & Milestone Merger 2',
    banglaTitle: 'TypeScript অধ্যায় ১০ (TS 5.x): মডিউলার টাইপ, ডিসক্রিমিনেটেড `Result<T, E>` ও মাইলস্টোন প্রজেক্ট ২',
    subtitle: 'Type-safe parsing via discriminated Result<T, E> unions, catch(err: unknown) narrowing, type guards, and Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript 5.x turns runtime failures into compile-time guarantees! First, `catch (err: unknown)` forbids reading `err.message` until you narrow with `err instanceof Error`. Second, a **Discriminated Result Union** (`{ ok: true; value: T } | { ok: false; error: string }`) forces every caller to inspect `.ok` before touching `.value`. **Milestone Merger 2** unites TS tuples, readonly arrays, interfaces, typed Maps, and `Result` parsers!',
      asciiFlowchart: `  TYPESCRIPT 5.x DISCRIMINATED RESULT<T, E> PIPELINE
  raw line -> parseEvent(line): Result<EventRow, string>
                   |
         +---------+---------+
         | { ok: false }     | { ok: true, value }
         v                   v
     skipped++           totals.set(value.name, ...)  // Map<string, number>
                             |
                             v
                 [...totals.entries()].sort(...) -> Winner / Top-K`,
      pseudocode: [
        '1. MODEL parse outcomes with `type Result<T, E> = { ok: true; value: T } | { ok: false; error: string }`',
        '2. PARSE unknown JSON/text through type predicate `isEventPayload(u: unknown): u is EventRow`',
        '3. NARROW `catch (err: unknown)` safely via `err instanceof Error` instead of `catch (err: any)`',
        '4. AGGREGATE via `Map<string, number>` and rank deterministically',
        '5. COMBINE Ch 6–10 into Milestone Merger 2',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সেফ পার্সেল (`Result<T, E>`) এবং `unknown` যাচাই',
        explanation:
          'TypeScript-এ বাইরের স্ট্রিম বা `JSON.parse()` থেকে আসা ডেটার টাইপ শুরুতে `unknown` ধরা হয়! সাথে `type Result<T, E> = { ok: true; value: T } | { ok: false; error: string }` বানালে কম্পাইলার তোমাকে `.ok === true` চেক না করে `.value` ধরতেই দেবে না—ফলে `undefined` ক্র্যাশ কম্পাইল টাইমেই বন্ধ হয়ে যায়!',
        everydayExample:
          'API বা CSV থেকে আসা অবিশ্বস্ত ডেটাকে `isValidEvent(u: unknown)` দিয়ে যাচাই করে তবেই `Map<string, number>`-এ যোগ করা!',
        keyTakeaways: [
          'কখনো `catch (e: any)` লিখবে না—`catch (e: unknown)` লিখে `e instanceof Error` দিয়ে ন্যারো করো।',
          'Discriminated Union (`{ ok: true } | { ok: false }`) প্রতিটি এরর হ্যান্ডেল করা বাধ্যতামূলক করে।',
          'Type guard (`x is EventRow`) রানটাইম ভ্যালিডেশন ও স্ট্যাটিক টাইপিং এক সাথে যুক্ত করে!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed Map<string, number> Leaderboard Winner',
        banglaNote: '`Map<string, number>` দিয়ে খেলোয়াড়দের স্কোর যোগ ও বিজয়ী বের করা।',
        code: `import * as fs from 'fs';

function solveWinner(lines: readonly string[]): [string, number] {
  const n = Number(lines[0]);
  const totals = new Map<string, number>();
  for (let i = 1; i <= n; i++) {
    const [name, s] = lines[i].trim().split(/\\s+/);
    totals.set(name, (totals.get(name) ?? 0) + Number(s));
  }
  return [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
}

const lines = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const [winner, score] = solveWinner(lines);
console.log(\`\${winner} \${score}\`);`,
        stdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'ts-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Discriminated Result<T, E> Parser',
        banglaNote: '`Result<Row, string>` ইউনিয়ন দিয়ে টাইপ-সেফ পার্সিং ও ভুল লাইন স্কিপ করা।',
        code: `import * as fs from 'fs';

interface Row { name: string; val: number; }
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function parseLine(line: string): Result<Row, string> {
  const cols = line.trim().split(/\\s+/);
  if (cols.length !== 2) return { ok: false, error: 'columns' };
  const val = Number(cols[1]);
  if (!Number.isFinite(val)) return { ok: false, error: 'nan' };
  return { ok: true, value: { name: cols[0], val } };
}

const raw = fs.readFileSync(0, 'utf8');
let ok = 0, bad = 0, sum = 0;
for (const line of raw.split(/\\r?\\n/)) {
  if (!line.trim()) continue;
  const res = parseLine(line);
  if (res.ok) { sum += res.value.val; ok++; }
  else bad++;
}
console.log(\`ok=\${ok} bad=\${bad} sum=\${sum}\`);`,
        stdin: 'alice 20\nbob abc\n\ncarol 30 extra\ndave 50',
        expectedOutput: 'ok=2 bad=2 sum=70',
      },
      {
        id: 'ts-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: unknown JSON Type-Guard Top-K Pipeline',
        banglaNote: '`JSON.parse`-এর ফলাফল `unknown` থেকে কাস্টম `isEvent` টাইপ গার্ড দিয়ে নিরাপদে যাচাই।',
        code: `import * as fs from 'fs';

interface Event { name: string; pts: number; }

function isEvent(u: unknown): u is Event {
  if (typeof u !== 'object' || u === null) return false;
  const r = u as Record<string, unknown>;
  return typeof r.name === 'string' && typeof r.pts === 'number' && Number.isFinite(r.pts);
}

const raw = fs.readFileSync(0, 'utf8');
const totals = new Map<string, number>();
for (const line of raw.trim().split(/\\r?\\n/)) {
  try {
    const parsed: unknown = JSON.parse(line);
    if (isEvent(parsed)) totals.set(parsed.name, (totals.get(parsed.name) ?? 0) + parsed.pts);
  } catch {
    // skip invalid JSON line
  }
}
const top = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 2);
console.log(top.map(([k, v]) => \`\${k}:\${v}\`).join(' '));`,
        stdin: '{"name":"alice","pts":25}\n{corrupt_json}\n{"name":"bob","pts":50}\n{"name":"alice","pts":35}',
        expectedOutput: 'alice:60 bob:50',
      },
      {
        id: 'ts-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Safe Error Narrowing Helper (catch unknown)',
        banglaNote: '`unknown` ক্যাচ ব্লকে নিরাপদে এরর মেসেজ বের করা ও গণনা।',
        code: `import * as fs from 'fs';

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

const raw = fs.readFileSync(0, 'utf8');
let valid = 0, failed = 0;
for (const line of raw.trim().split(/\\r?\\n/)) {
  try {
    const v: unknown = JSON.parse(line);
    if (v !== undefined) valid++;
  } catch (err: unknown) {
    if (errorMessage(err).length > 0) failed++;
  }
}
console.log(\`valid=\${valid} failed=\${failed}\`);`,
        stdin: '{"x":1}\nbad_json\n[1,2,3]',
        expectedOutput: 'valid=2 failed=1',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };',
        whatItMeans: 'Discriminated union parameterized by success `T` and failure `E`.',
        whyItIsThere: 'Type narrowing forces checking `res.ok` before accessing `res.value`.',
        ifDeletedError: 'Unsafe optional fields allow accessing `value` even when parse failed.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'function isEvent(u: unknown): u is Event {',
        whatItMeans: 'TypeScript type-predicate runtime validator over `unknown` JSON.',
        whyItIsThere: 'Bridges runtime validation with static TypeScript compilation.',
        ifDeletedError: 'Blind `as Event` casts let malformed runtime JSON cause NaN/TypeError bugs.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'if (!Number.isFinite(val)) return { ok: false, error: \'nan\' };',
        whatItMeans: 'Verifies numeric parse did not yield `NaN` or `Infinity`.',
        whyItIsThere: 'Prevents `NaN` pollution inside typed `Map<string, number>`.',
        ifDeletedError: 'String tokens produce `NaN` sums while passing TypeScript checks.',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'catch (err: unknown)',
        whatItMeans: 'Strict TypeScript error variable requiring explicit narrowing.',
        whyItIsThere: 'Prevents unsafe `err.message` assumption on non-Error thrown values.',
        ifDeletedError: 'Throwing a string or null crashes error logger with `Cannot read properties`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'parseLine("alice 20")', memoryOrStack: '{ ok: true, value: {alice, 20} }', note: 'res.ok narrows -> sum=20' },
      { step: 2, state: 'parseLine("bob abc")', memoryOrStack: '{ ok: false, error: "nan" }', note: 'bad=1 safely' },
      { step: 3, state: 'parseLine("carol 30 extra")', memoryOrStack: '{ ok: false, error: "columns" }', note: 'bad=2 safely' },
      { step: 4, state: 'parseLine("dave 50")', memoryOrStack: '{ ok: true, value: {dave, 50} }', note: 'ok=2, sum=70' },
    ],
    harryBugTraps: [
      {
        title: 'Using `as MyType` on `JSON.parse()` Instead of Type Guards',
        brokenCode: `const ev = JSON.parse(raw) as Event; // Zero runtime check!`,
        fixedCode: `const u: unknown = JSON.parse(raw);\nif (isEvent(u)) { /* statically narrowed! */ }`,
        whyItBreaks: '`as` disappears at compile time; malformed payloads still crash in production.',
      },
      {
        title: 'Typing Caught Errors as `catch (e: any)`',
        brokenCode: `catch (e: any) { log(e.stack.trim()); } // crashes if string thrown!`,
        fixedCode: `catch (e: unknown) { log(e instanceof Error ? e.message : String(e)); }`,
        whyItBreaks: 'JavaScript can throw numbers/strings/nulls that do not have `.stack`.',
      },
      {
        title: 'Using TS Parameter Properties in Minimal Evaluators',
        brokenCode: `class Row { constructor(public name: string) {} }`,
        fixedCode: `interface Row { name: string; } // Clean explicit property contract`,
        whyItBreaks: 'Explicit interfaces stay portable across lightweight transpilers and TS erasable syntax mode.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: Typed Map Winner',
        prompt: 'Aggregate `(name, score)` into `Map<string, number>` and print winner.',
        banglaHint: '`Map<string, number>` এবং `.sort()` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';

const lines = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const totals = new Map<string, number>();
for (let i = 1; i <= n; i++) {
  const [name, s] = lines[i].trim().split(/\\s+/);
  totals.set(name, (totals.get(name) ?? 0) + Number(s));
}
const [[winner, score]] = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`\${winner} \${score}\`);`,
        sampleStdin: '3\nalice 20\nbob 50\nalice 15',
        expectedOutput: 'bob 50',
      },
      {
        id: 'ts-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Typed Non-Comment Line Counter',
        prompt: 'Filter out empty and `#` comment lines and print remaining line count.',
        banglaHint: '`split(/\\r?\\n/)` করে `#` লাইন বাদ দাও।',
        starterCode: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').split(/\\r?\\n/);
const active: string[] = lines.filter((l) => l.trim().length > 0 && !l.trim().startsWith('#'));
console.log(active.length);`,
        sampleStdin: '# header\nalpha\n\nbeta',
        expectedOutput: '2',
      },
      {
        id: 'ts-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Discriminated Result Token Parser',
        prompt: 'Validate integer tokens and output `sum=<total> invalid=<err>`.',
        banglaHint: '`Number.isFinite` দিয়ে অকার্যকর টোকেন গোনো।',
        starterCode: `import * as fs from 'fs';
const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let sum = 0; let invalid = 0;
for (const tok of tokens) {
  const n = Number(tok);
  if (tok !== '' && Number.isFinite(n)) sum += n;
  else invalid++;
}
console.log(\`sum=\${sum} invalid=\${invalid}\`);`,
        sampleStdin: '10 25 bad 15 9x',
        expectedOutput: 'sum=50 invalid=2',
      },
      {
        id: 'ts-ch-10-q4',
        difficulty: 'Medium',
        title: '4. Type-Guarded JSON Stream Sum',
        prompt: 'Parse NDJSON safely using a type guard and sum `.val`.',
        banglaHint: '`isValPayload(u: unknown)` টাইপ গার্ড লিখে ভ্যালু যোগ করো।',
        starterCode: `import * as fs from 'fs';
function hasVal(u: unknown): u is { val: number } {
  return typeof u === 'object' && u !== null && Number.isFinite((u as { val: number }).val);
}
let sum = 0;
for (const line of fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/)) {
  try {
    const u: unknown = JSON.parse(line);
    if (hasVal(u)) sum += u.val;
  } catch {}
}
console.log(sum);`,
        sampleStdin: '{"val":12}\nbroken\n{"val":18}',
        expectedOutput: '30',
      },
      {
        id: 'ts-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Tie-Break Winner Sorted Array',
        prompt: 'Aggregate `(name, score)` and output top entry with alphabetical tie-break.',
        banglaHint: '`b[1] - a[1] || a[0].localeCompare(b[0])` দিয়ে সর্ট করো।',
        starterCode: `import * as fs from 'fs';
const lines = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const mp = new Map<string, number>();
for (let i = 1; i <= n; i++) {
  const [nm, sc] = lines[i].trim().split(/\\s+/);
  mp.set(nm, (mp.get(nm) ?? 0) + Number(sc));
}
const [[w, s]] = [...mp.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`\${w} \${s}\`);`,
        sampleStdin: '4\nzara 40\namir 20\namir 20\nbob 35',
        expectedOutput: 'amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (TypeScript 5.x): Fault-Tolerant Top-K Leaderboard Pipeline',
      description:
        'Unites Ch 6 Readonly Arrays, Ch 7 Narrowing, Ch 8 Interfaces/Unions, Ch 9 Typed Map, and Ch 10 Result<T, E> Parsing.',
      banglaGoal:
        'TypeScript 5.x-এর `Interface`, `Result<T, E>` ইউনিয়ন, টাইপ গার্ড ও `Map<string, number>` মিলে নিরাপদ মাইলস্টোন প্রজেক্ট ২ তৈরি করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `import * as fs from 'fs';

interface EventRow { name: string; delta: number; }
type ParseResult = { ok: true; value: EventRow } | { ok: false; reason: string };

function parseEvent(line: string): ParseResult {
  const parts = line.trim().split(/\\s+/);
  if (parts.length !== 2) return { ok: false, reason: 'columns' };
  const delta = Number(parts[1]);
  if (!Number.isFinite(delta)) return { ok: false, reason: 'nan' };
  return { ok: true, value: { name: parts[0], delta } };
}

const lines: readonly string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const totals = new Map<string, number>();
let skipped = 0;
for (let i = 1; i <= n && i < lines.length; i++) {
  const res = parseEvent(lines[i]);
  if (res.ok) totals.set(res.value.name, (totals.get(res.value.name) ?? 0) + res.value.delta);
  else skipped++;
}
const [[w, s]] = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`winner=\${w}:\${s} skipped=\${skipped}\`);`,
      sampleStdin: '4\nalice 25\nbad_row\nbob 40\nalice 20',
      expectedOutput: 'winner=alice:45 skipped=1',
    },
  },

  html: {
    title: 'HTML Chapter 10 (HTML5): Modular Web Layouts, FileReader/Validation & Milestone Merger 2 Studio',
    banglaTitle: 'HTML অধ্যায় ১০ (HTML5): মডিউলার কম্পোনেন্ট, ফাইল/ডেটা ভ্যালিডেশন ও মাইলস্টোন প্রজেক্ট ২ স্টুডিও',
    subtitle: 'Combine semantic HTML5 landmarks, accessible tables, <template> Web Components, <form>/<dialog>, and defensive parsing into Milestone Merger 2.',
    zeroIntuition: {
      plainEnglishStory:
        'Great frontend engineering organizes HTML5 into modular **Web Components (`<template>` + `customElements`)**, semantic **tables & cards**, accessible **forms/dialogs**, and **defensive input parsing** so malformed CSV/log rows display friendly inline diagnostics instead of blank-screen crashes. **Milestone Merger 2** unifies HTML Chapters 6–10 into an interactive Fault-Tolerant Leaderboard Studio!',
      asciiFlowchart: `  HTML5 MODULAR MERGER 2 DASHBOARD ARCHITECTURE
  <main>
   +-- <form id="ingest">  (CSV/Text Log Paste + Submit)   [Ch 9 Form API]
   +-- <section role="status" id="errors"> (Skipped Rows) [Ch 10 Guard]
   +-- <table> Leaderboard Ranked Output                  [Ch 6 Table]
   +-- <template id="row-tpl"> Reusable Row Cloning       [Ch 8 Component]`,
      pseudocode: [
        '1. STRUCTURE semantic page landmarks (`<header>`, `<main>`, `<section>`, `<table>`)',
        '2. CAPTURE user input through `<textarea>` + `<form>` with `preventDefault()`',
        '3. PARSE lines defensively: reject malformed rows cleanly inside an error status box',
        '4. AGGREGATE & SORT records into `<table>` rows via safe `textContent` (Zero XSS!)',
        '5. COMBINE Ch 6–10 inside the interactive Milestone Merger 2 Studio',
      ],
      banglaZeroToHero: {
        analogyTitle: 'মডিউলার ওয়েব কম্পোনেন্ট ও নিরাপদ (`textContent`) ডেটা স্টুডিও',
        explanation:
          'HTML5-এ অধ্যায় ৬ থেকে ১০ পর্যন্ত শেখা টেবিল (`<table>`), DOM ট্রি (`data-*`), `<template>` কম্পোনেন্ট, ফর্ম (`<form>`) এবং নিরাপদ পার্সিং একসাথে যুক্ত করে আমরা একটি রিয়েল-টাইম লিডারবোর্ড স্টুডিও বানাতে পারি! এখানে কেউ ভুল ডেটা বা `<script>` ট্যাগ পেস্ট করলেও `textContent` ব্যবহার করার কারণে সাইট ক্র্যাশ বা XSS অ্যাটাকের কোনো ভয় থাকে না।',
        everydayExample:
          'একটি টেক্সটবক্সে মিক্সড ভালো ও নষ্ট স্কোরের ডেটা পেস্ট করলে সঙ্গে সঙ্গে সঠিক লিডারবোর্ড ও বাদ পড়া লাইনের সংখ্যা লাইভ স্ক্রিনে দেখা!',
        keyTakeaways: [
          'সবসময় `innerHTML`-এর বদলে `textContent` ব্যবহার করে ইউজারের ইনপুট রেন্ডার করবে (XSS প্রতিরোধ)।',
          '`aria-live="polite"` দিলে স্ক্রিন রিডারও রিয়েল-টাইম এরর ও আপডেট শুনতে পায়।',
          '`<template>` ট্যাগ ব্যবহার করলে বারবার একই HTML স্ট্রিং লেখার দরকার হয় না।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-10-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Semantic Leaderboard Landmark Preview',
        banglaNote: 'সিমান্টিক HTML5-এ পরিষ্কার স্কোরবোর্ড সামারি ও বিজয়ী কার্ড প্রদর্শন।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <main>
    <h2>Merger Project 2: Top-K Leaderboard</h2>
    <p style="color:#34d399;font-family:monospace">Leader: bob (50 pts)</p>
  </main>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Merger Project 2: Top-K Leaderboard',
      },
      {
        id: 'html-10-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Safe CSV Validator With Inline Diagnostics',
        banglaNote: 'ভুল সিনট্যাক্সের লাইন আলাদা এরর ব্যানারে দেখানো ও `textContent` দিয়ে নিরাপদ রেন্ডারিং।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Defensive Row Validator</h3>
  <textarea id="inp" rows="4" style="width:100%;background:#0f172a;color:#e2e8f0;padding:8px;">alice 25
bad_row
bob 40
alice 20</textarea>
  <button id="run" style="margin-top:8px;padding:6px 12px;background:#3b82f6;color:white;border:none;border-radius:6px;">Validate Stream</button>
  <p id="status" role="status" style="font-family:monospace;color:#fbbf24;"></p>
  <script>
    function run() {
      const lines = document.getElementById('inp').value.split(/\\r?\\n/);
      let ok = 0, skipped = 0;
      for (const l of lines) {
        const p = l.trim().split(/\\s+/);
        if (p.length === 2 && Number.isFinite(Number(p[1]))) ok++;
        else if (l.trim()) skipped++;
      }
      document.getElementById('status').textContent = 'valid=' + ok + ' skipped=' + skipped;
    }
    document.getElementById('run').addEventListener('click', run);
    run();
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'valid=3 skipped=1',
      },
      {
        id: 'html-10-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: <template> Row Cloner With DocumentFragment',
        banglaNote: '`DocumentFragment` ও `<template>` ব্যবহার করে একসাথে ১০০টি রো রিফ্লো ছাড়াই ডমে বসানো।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Fast Table Fragment</h3>
  <table border="1" cellpadding="6" style="border-collapse:collapse;border-color:#334155;">
    <thead><tr><th>Player</th><th>Total</th></tr></thead>
    <tbody id="rows"></tbody>
  </table>
  <template id="tpl"><tr><td class="nm"></td><td class="sc"></td></tr></template>
  <script>
    const data = [['alice', 45], ['bob', 40]];
    const tpl = document.getElementById('tpl');
    const frag = document.createDocumentFragment();
    for (const [nm, sc] of data) {
      const node = tpl.content.cloneNode(true);
      node.querySelector('.nm').textContent = nm;
      node.querySelector('.sc').textContent = sc;
      frag.appendChild(node);
    }
    document.getElementById('rows').appendChild(frag);
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Fast Table Fragment',
      },
      {
        id: 'html-10-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: XSS-Safe <script type="application/json"> State Hydrator',
        banglaNote: 'HTML পেজের ভেতরে নিরাপদে JSON ডেটা এম্বেড করে `try/catch` দিয়ে হাইড্রেট করা।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <script id="seed" type="application/json">{"winner":"alice","score":45}</script>
  <p id="out" style="color:#34d399;font-family:monospace;"></p>
  <script>
    try {
      const data = JSON.parse(document.getElementById('seed').textContent);
      document.getElementById('out').textContent = data.winner + ':' + data.score;
    } catch {
      document.getElementById('out').textContent = 'Invalid JSON';
    }
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'alice:45',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: '<p id="status" role="status" style="...">',
        whatItMeans: 'Accessible ARIA live region announcing parse errors automatically.',
        whyItIsThere: 'Screen readers hear stream validation results without losing focus.',
        ifDeletedError: 'Visual error updates stay invisible to assistive technology users.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: '<template id="tpl"><tr>...</tr></template>',
        whatItMeans: 'Inert DOM blueprint compiled once by the browser parser.',
        whyItIsThere: 'Clones cleanly with `.content.cloneNode(true)` without XSS HTML string concatenation.',
        ifDeletedError: 'Falling back to `innerHTML +=` breaks event listeners and exposes XSS.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'const frag = document.createDocumentFragment();',
        whatItMeans: 'Off-DOM batch container preventing repeated layout thrashing.',
        whyItIsThere: 'Appends all sorted leaderboard rows in a single repaint.',
        ifDeletedError: 'Appending 1,000 rows directly triggers 1,000 layout recalculations.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'node.querySelector(\'.nm\').textContent = nm;',
        whatItMeans: 'Assigns untrusted user text safely via `.textContent`.',
        whyItIsThere: 'Escapes any `<script>` or HTML payload automatically.',
        ifDeletedError: 'Using `.innerHTML = nm` lets malicious names execute arbitrary JS.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse textarea lines', memoryOrStack: '4 non-empty lines', note: 'Split via /\\r?\\n/' },
      { step: 2, state: 'Validate line 2 ("bad_row")', memoryOrStack: 'skipped=1', note: 'Logged cleanly, no exception' },
      { step: 3, state: 'Aggregate alice & bob', memoryOrStack: 'alice:45, bob:40', note: 'Sorted descending' },
      { step: 4, state: 'Render via Fragment + textContent', memoryOrStack: 'DOM updated in 1 paint', note: 'Zero XSS risk' },
    ],
    harryBugTraps: [
      {
        title: 'Rendering Untrusted CSV Input Using `.innerHTML`',
        brokenCode: `row.innerHTML = '<td>' + userName + '</td>'; // XSS if userName has <img onerror=...>`,
        fixedCode: `td.textContent = userName; // 100% XSS-safe!`,
        whyItBreaks: '`.innerHTML` parses HTML tags and executes inline event handlers injected by attackers.',
      },
      {
        title: 'Using `form` Without `e.preventDefault()` Refreshes Iframe',
        brokenCode: `form.addEventListener('submit', () => addEntry()); // reloads page!`,
        fixedCode: `form.addEventListener('submit', (e) => { e.preventDefault(); addEntry(); });`,
        whyItBreaks: 'Default HTML form submission navigates away and wipes all JS state.',
      },
      {
        title: 'Not Validating `JSON.parse` From Hidden Script or LocalStorage',
        brokenCode: `const state = JSON.parse(localStorage.getItem('board'));`,
        fixedCode: `let state = []; try { state = JSON.parse(localStorage.getItem('board') || '[]'); } catch {}`,
        whyItBreaks: 'A single corrupted value throws `SyntaxError` and blanks out the entire app.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-10-q1',
        difficulty: 'Easy',
        title: '1. Warm-Up: Leaderboard Banner Preview',
        prompt: 'Render the Top-K Leaderboard heading and winner badge semantically.',
        banglaHint: 'সিমান্টিক `<main>` ও `<h2>` ট্যাগ দিয়ে বিজয়ীর কার্ড দেখাও।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h2>Merger Project 2: Top-K Leaderboard</h2>
  <p style="color:#34d399;font-family:monospace">Leader: bob (50 pts)</p>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Merger Project 2: Top-K Leaderboard',
      },
      {
        id: 'html-ch-10-q2',
        difficulty: 'Easy',
        title: '2. Accessible Empty State + Role Status',
        prompt: 'Render a leaderboard container with `role="status"` when 0 valid rows exist.',
        banglaHint: '`role="status"` দিয়ে শূন্য স্টেট বার্তা প্রদর্শন করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <section aria-label="Leaderboard">
    <p role="status" style="color:#94a3b8;">No valid records loaded yet.</p>
  </section>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'No valid records loaded yet.',
      },
      {
        id: 'html-ch-10-q3',
        difficulty: 'Medium',
        title: '3. Safe Template Table Generator',
        prompt: 'Clone a `<template>` row twice safely using `.textContent`.',
        banglaHint: '`<template>`-এর ভেতর `.textContent` দিয়ে নিরাপদে ২টি রো যোগ করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <ul id="list"></ul>
  <template id="item"><li></li></template>
  <script>
    const ul = document.getElementById('list');
    const tpl = document.getElementById('item');
    for (const row of ['alice: 45', 'bob: 40']) {
      const c = tpl.content.cloneNode(true);
      c.querySelector('li').textContent = row;
      ul.appendChild(c);
    }
  </script>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'alice: 45',
      },
      {
        id: 'html-ch-10-q4',
        difficulty: 'Medium',
        title: '4. XSS-Safe User Input Echo',
        prompt: 'Escape HTML-like input string `<script>alert(1)</script>` via `.textContent`.',
        banglaHint: '`.innerHTML`-এর পরিবর্তে `.textContent` দিয়ে টেক্সট বসাও।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <p id="safe"></p>
  <script>
    document.getElementById('safe').textContent = '<script>safe_text</script>';
  </script>
</body></html>`,
        sampleStdin: '',
        expectedOutput: '<script>safe_text</script>',
      },
      {
        id: 'html-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Live Fault-Tolerant Form Parser Widget',
        prompt: 'Build a form that safely adds `"name score"` rows or increments `skipped` count on bad rows.',
        banglaHint: 'ফর্ম সাবমিটে `e.preventDefault()` করে ভ্যালিডেশন শেষে টেবিল ও skipped কাউন্ট আপডেট করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <form id="f"><input id="row" value="zara 40"/><button>Add</button></form>
  <p id="out" style="color:#34d399;font-family:monospace;">Ready: amir 40</p>
  <script>
    document.getElementById('f').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('out').textContent = document.getElementById('row').value;
    });
  </script>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Ready: amir 40',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 2 (HTML5): Interactive Fault-Tolerant Leaderboard Studio',
      description:
        'Unites Ch 6 Semantic Tables, Ch 7 DOM Dataset/Refs, Ch 8 <template> Components, Ch 9 <form> Input, and Ch 10 Safe Validation & XSS-Free Rendering.',
      banglaGoal:
        'HTML5-এর টেবিল, `<template>`, `<form>` এবং নিরাপদ পার্সিং একসাথে করে সম্পূর্ণ লাইভ প্রিভিউযোগ্য মাইলস্টোন প্রজেক্ট ২ তৈরি করা।',
      combinesChapters: 'Ch 6–10 (Milestone Merger 2)',
      starterCode: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;line-height:1.5;">
  <header style="border-bottom:1px solid #1e293b;padding-bottom:10px;margin-bottom:14px;">
    <h2 style="margin:0;color:#38bdf8;">Milestone Merger 2: Fault-Tolerant Leaderboard</h2>
    <p id="summary" role="status" style="margin:6px 0 0;font-family:monospace;color:#34d399;"></p>
  </header>
  <form id="feed" style="display:flex;gap:8px;margin-bottom:12px;">
    <input id="entry" placeholder="name score (e.g. zara 55)" style="flex:1;padding:6px 10px;background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;" />
    <button type="submit" style="padding:6px 14px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;">Ingest Row</button>
  </form>
  <table style="width:100%;border-collapse:collapse;background:#0f172a;border:1px solid #1e293b;">
    <thead><tr style="background:#1e293b;text-align:left;"><th style="padding:8px;">Rank</th><th style="padding:8px;">Player</th><th style="padding:8px;">Total</th></tr></thead>
    <tbody id="tbody"></tbody>
  </table>
  <template id="row-tpl"><tr><td class="rk" style="padding:8px;"></td><td class="nm" style="padding:8px;"></td><td class="sc" style="padding:8px;font-family:monospace;color:#fbbf24;"></td></tr></template>
  <script>
    const totals = new Map();
    let skipped = 0;
    function ingest(rawLine) {
      const p = rawLine.trim().split(/\\s+/);
      const val = p.length === 2 ? Number(p[1]) : NaN;
      if (p.length === 2 && Number.isFinite(val)) {
        totals.set(p[0], (totals.get(p[0]) || 0) + val);
      } else if (rawLine.trim()) {
        skipped++;
      }
    }
    function render() {
      const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
      const tbody = document.getElementById('tbody');
      const tpl = document.getElementById('row-tpl');
      tbody.replaceChildren();
      const frag = document.createDocumentFragment();
      sorted.forEach(([nm, sc], idx) => {
        const node = tpl.content.cloneNode(true);
        node.querySelector('.rk').textContent = '#' + (idx + 1);
        node.querySelector('.nm').textContent = nm;
        node.querySelector('.sc').textContent = sc + ' pts';
        frag.appendChild(node);
      });
      tbody.appendChild(frag);
      const top = sorted[0];
      document.getElementById('summary').textContent = top
        ? 'winner=' + top[0] + ':' + top[1] + ' | skipped=' + skipped
        : 'skipped=' + skipped;
    }
    ['alice 25', 'bad_row', 'bob 40', 'alice 20'].forEach(ingest);
    render();
    document.getElementById('feed').addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = document.getElementById('entry');
      ingest(inp.value);
      inp.value = '';
      render();
    });
  </script>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'winner=alice:45 | skipped=1',
    },
  },
};
