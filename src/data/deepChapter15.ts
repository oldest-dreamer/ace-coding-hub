import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_15: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 15 (C23): Systems Microservice Engine, JSON Serialization & Mega Capstone',
    banglaTitle: 'C অধ্যায় ১৫ (C23): হাই-স্পিড API ইঞ্জিন, JSON সিরিয়ালাইজেশন ও মেগা ক্যাপস্টোন',
    subtitle: 'Power the high-throughput Layer-4 Compute Engine inside a 5-layer website architecture, emitting safe JSON contracts from C.',
    zeroIntuition: {
      plainEnglishStory:
        'A real website is NEVER built from one file or one language! Your browser renders **HTML/CSS/JS** (`Layers 1–2`), talks over **HTTPS JSON** to a **Backend API** (`Layer 3`: Python/Java/Node), which delegates heavy math, compression, or graphics to ultra-fast **C/C++/Rust Engines** (`Layer 4`) backed by **Databases & Caches** (`Layer 5`). Here in C, you build that rock-solid Layer-4 API worker that validates untrusted inputs, avoids buffer overflows, and emits strict JSON contracts.',
      asciiFlowchart: `  5-LAYER WEBSITE ARCHITECTURE BLUEPRINT (Mega Capstone Ch 1–15)
  [1. HTML5/CSS Browser UI] ---> [2. JS/TS State & Fetch]
                                         |  HTTPS JSON
                                         v
  [5. DB / Redis Cache] <------- [3. Python/Java API Router]
                                         |  IPC / FFI
                                         v
                       [4. C23 Compute Engine: level = (xp / 100) + 1]
                       Outputs: {"user":"mina","level":2,"status":"OK"}`,
      pseudocode: [
        '1. READ structured API request payload (user[64], xp)',
        '2. VALIDATE user length and clamp xp >= 0 (400 Bad Request shield)',
        '3. COMPUTE business rule level = (xp / 100) + 1',
        '4. ESCAPE quotes/backslashes inside user string to prevent JSON injection',
        '5. EMIT exact JSON response {"user":"...","level":...,"status":"OK"}',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্রন্টএন্ড ওয়েটার, API ম্যানেজার ও C ভাষার সুপার-ফাস্ট কিচেন (৫-স্তর আর্কিটেকচার)',
        explanation:
          'একটি বড় ওয়েবসাইট (যেমন ফেসবুক বা গুগল) কীভাবে চলে? ইউজারের ব্রাউজার (HTML/CSS/JS) হলো সুন্দর ডাইনিং টেবিল; Backend API (Python/Java) হলো অর্ডার-নেওয়া ম্যানেজার; আর ভেতরের সবচেয়ে কঠিন ও দ্রুত কাজগুলো (ইমেজ প্রসেসিং, ডাটাবেজ ইঞ্জিন, গেম/কম্পিউট) করে **C/C++/Rust**-এর সুপার-ফাস্ট ইঞ্জিন! JSON হলো তাদের সবার কমন ভাষা, যার মাধ্যমে একটি স্তর আরেকটির সাথে নির্ভুলভাবে কথা বলে।',
        everydayExample:
          'একটি কোডিং একাডেমিতে ইউজার `"mina 150"` পাঠালে ব্যাকএন্ড প্রোফাইল লেভেল হিসাব করে `{"user":"mina","level":2,"status":"OK"}` JSON ফিরিয়ে দেয় আর ব্রাউজার সাথে সাথে ব্যাজ আপডেট করে।',
        keyTakeaways: [
          'ইনপুট প্রোটোকল প্যার্স করতে সব সময় `scanf("%63s", user)`-এর মতো বাউন্ডারি লিমিট দেবে—নইলে বাফার ওভারফ্লো হবে!',
          'হাতে JSON বানানোর সময় ইউজারের স্ট্রিংয়ে `"` বা `\\` থাকলে অবশ্যই এস্কেপ (`\\"`) করবে—নইলে JSON ইনজেকশন হবে!',
          'আর্কিটেকচারের প্রতিটি লেয়ার আলাদা রাখলে যেকোনো একটি অংশ (যেমন DB বা Frontend) সহজে আপগ্রেড করা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Full-Stack JSON API Worker Contract',
        banglaNote: 'ইউজার ও XP ইনপুট নিয়ে `"level = (xp / 100) + 1"` হিসাব করে নিখুঁত JSON রেসপন্স পাঠানো।',
        code: `#include <stdio.h>

int main(void) {
    char user[64];
    int xp = 0;
    if (scanf("%63s %d", user, &xp) == 2) {
        int level = (xp / 100) + 1;
        printf("{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", user, level);
    }
    return 0;
}`,
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'c-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative XP Validation & JSON Quote Escaping (HTTP 400)',
        banglaNote: 'নেগেটিভ XP এলে `400 Bad Request` JSON এরর রিটার্ন এবং স্ট্রিংয়ের ডাবল-কোট নিরাপদে এস্কেপ করা।',
        code: `#include <stdio.h>

static void print_json_escaped(const char *s) {
    for (int i = 0; s[i]; i++) {
        if (s[i] == '"' || s[i] == '\\\\') putchar('\\\\');
        putchar(s[i]);
    }
}

int main(void) {
    char user[64];
    int xp = 0;
    if (scanf("%63s %d", user, &xp) != 2 || xp < 0) {
        printf("{\\"error\\":\\"INVALID_XP\\",\\"status\\":400}\\n");
        return 0;
    }
    int level = (xp / 100) + 1;
    printf("{\\"user\\":\\"");
    print_json_escaped(user);
    printf("\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", level);
    return 0;
}`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'c-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Batch Leaderboard API JSON Array Serializer',
        banglaNote: 'একাধিক ইউজার রেকর্ড এক সিঙ্গেল HTTP পেলোডে স্ট্রিমিং JSON অ্যারে (`[...]`) হিসেবে আউটপুট।',
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    putchar('[');
    for (int i = 0; i < n; i++) {
        char user[64]; int xp = 0;
        if (scanf("%63s %d", user, &xp) != 2) break;
        if (i > 0) putchar(',');
        printf("{\\"user\\":\\"%s\\",\\"level\\":%d}", user, (xp / 100) + 1);
    }
    printf("]\\n");
    return 0;
}`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'c-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: FNV-1a Deterministic ETag Cache Fingerprint',
        banglaNote: '৩২-বিট FNV-1a হ্যাশ দিয়ে API রেসপন্সের জন্য `ETag` ক্যাশ হেডার ফিঙ্গারপ্রিন্ট তৈরি।',
        code: `#include <stdint.h>
#include <stdio.h>

int main(void) {
    char payload[128];
    if (scanf("%127s", payload) != 1) return 0;
    uint32_t h = 2166136261u;
    for (int i = 0; payload[i]; i++) {
        h ^= (uint8_t)payload[i];
        h *= 16777619u;
    }
    printf("ETag:\\"%08x\\"\\n", h);
    return 0;
}`,
        stdin: 'mina:150',
        expectedOutput: 'ETag:"397cc8c7"',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5-6',
        codeSnippet: 'char user[64]; int xp = 0;',
        whatItMeans: 'Reserves fixed Stack request buffer capped at 63 chars + null terminator.',
        whyItIsThere: 'Prevents unbounded user strings from overflowing stack frames.',
        ifDeletedError: 'Cannot parse incoming API payload.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'if (scanf("%63s %d", user, &xp) == 2)',
        whatItMeans: 'Validates both input count and max buffer width before running business logic.',
        whyItIsThere: 'Rejects incomplete requests cleanly instead of printing garbage stack RAM.',
        ifDeletedError: 'Unchecked `scanf("%s")` allows Stack Buffer Overflow attacks!',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'printf("{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", user, level);',
        whatItMeans: 'Serializes strict RFC-8259 JSON with escaped quotes and no trailing comma.',
        whyItIsThere: 'Browser `JSON.parse()` fails instantly if single quotes or trailing commas appear.',
        ifDeletedError: 'Frontend client receives empty or malformed API response.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Receive payload "mina 150"', memoryOrStack: 'user="mina", xp=150', note: 'Layer-3/4 input check' },
      { step: 2, state: 'Compute level = (150/100) + 1', memoryOrStack: 'level = 2', note: 'Pure business rule' },
      { step: 3, state: 'Format JSON response', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Strict double quotes' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using Single Quotes or Trailing Comma in Hand-Built JSON',
        brokenCode: "printf(\"{'user':'%s',}\", user); // Invalid JSON -> JSON.parse() throws SyntaxError!",
        fixedCode: 'printf("{\\"user\\":\\"%s\\"}\\n", user); // Strict double quotes, NO trailing comma',
        whyItBreaks: 'JSON requires double-quoted keys and string values with zero trailing commas.',
      },
      {
        title: 'Trap 2: Unescaped Quotes in User Fields Causing JSON Injection',
        brokenCode: 'printf("{\\"user\\":\\"%s\\"}", user); // If user is a","admin":true -> JSON corrupted!',
        fixedCode: '// Always escape `"` and `\\\\` inside untrusted strings before writing JSON',
        whyItBreaks: 'Attackers can break out of string values and inject spoofed JSON properties.',
      },
      {
        title: 'Trap 3: Unbounded %s Format Specifier in scanf',
        brokenCode: 'scanf("%s", user); // Buffer overflow if input > 63 bytes!',
        fixedCode: 'scanf("%63s", user);',
        whyItBreaks: 'Writes past the 64-byte stack array into saved return addresses.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack JSON Response Contract',
        prompt: 'Parse user and xp, compute level = (xp/100) + 1, and print valid compact JSON.',
        banglaHint: '`{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}` ফরম্যাটে আউটপুট দাও।',
        starterCode: `#include <stdio.h>
int main(void) {
    char user[64]; int xp = 0;
    if (scanf("%63s %d", user, &xp) == 2) printf("{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", user, (xp / 100) + 1);
    return 0;
}`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'c-ch-15-q2',
        difficulty: 'Easy',
        title: 'HTTP Status Code Router Drill',
        prompt: 'Read path string: print 200 for "/api/health", else 404.',
        banglaHint: '`strcmp(path, "/api/health") == 0` চেক করো।',
        starterCode: `#include <stdio.h>
#include <string.h>
int main(void) {
    char path[64]; if (scanf("%63s", path) != 1) return 0;
    printf("%d\\n", strcmp(path, "/api/health") == 0 ? 200 : 404);
    return 0;
}`,
        sampleStdin: '/api/health',
        expectedOutput: '200',
      },
      {
        id: 'c-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Boundary Validation (tariq 50)',
        prompt: 'Verify integer division calculates level=1 accurately for XP under 100.',
        banglaHint: '`50 / 100 + 1` এর মান `1` প্রিন্ট হবে।',
        starterCode: `#include <stdio.h>
int main(void) {
    char user[64]; int xp = 0;
    if (scanf("%63s %d", user, &xp) == 2) printf("{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", user, (xp / 100) + 1);
    return 0;
}`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'c-ch-15-q4',
        difficulty: 'Medium',
        title: 'API Rate-Limiter Token Window',
        prompt: 'Given max limit L and N request counts per IP, print ALLOWED or RATE_LIMITED for count <= L.',
        banglaHint: '`count <= limit` হলে `ALLOWED`, নইলে `RATE_LIMITED`।',
        starterCode: `#include <stdio.h>
int main(void) {
    int limit = 0, req = 0;
    if (scanf("%d %d", &limit, &req) != 2) return 0;
    printf("%s\\n", req <= limit ? "ALLOWED" : "RATE_LIMITED");
    return 0;
}`,
        sampleStdin: '10 14',
        expectedOutput: 'RATE_LIMITED',
      },
      {
        id: 'c-ch-15-q5',
        difficulty: 'Hard',
        title: 'Safe JSON String Escaper Endpoint',
        prompt: 'Escape quotes inside raw name before embedding in `{"name":"..."}`.',
        banglaHint: '`"` চিহ্নের আগে `\\` প্রিন্ট করে নিরাপদ JSON বানাও।',
        starterCode: `#include <stdio.h>
int main(void) {
    char s[64]; if (scanf("%63s", s) != 1) return 0;
    printf("{\\"name\\":\\"");
    for (int i = 0; s[i]; i++) { if (s[i] == '"' || s[i] == '\\\\') putchar('\\\\'); putchar(s[i]); }
    printf("\\"}\\n");
    return 0;
}`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (C23): Full-Stack Compute Engine & JSON Endpoint',
      description: 'Combines C Ch 1–15 (safe scanf bounds, business math, and strict JSON serialization) as Layer 4 of the 5-Layer Website Architecture.',
      banglaGoal: 'C অধ্যায় ১–১৫-এর সব জ্ঞান মিলিয়ে ফুল-স্ট্যাক ওয়েবসাইটের লেয়ার-৪ কমপিউট ও JSON API ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `#include <stdio.h>

int main(void) {
    char user[64];
    int xp = 0;
    if (scanf("%63s %d", user, &xp) == 2) {
        int level = (xp / 100) + 1;
        printf("{\\"user\\":\\"%s\\",\\"level\\":%d,\\"status\\":\\"OK\\"}\\n", user, level);
    }
    return 0;
}`,
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  cpp: {
    title: 'C++ Chapter 15 (C++23): High-Throughput Backend Engine, JSON DTOs & Mega Capstone',
    banglaTitle: 'C++ অধ্যায় ১৫ (C++23): হাই-থ্রুপুট সার্ভার ইঞ্জিন, JSON রেসপন্স ও মেগা ক্যাপস্টোন',
    subtitle: 'Build sub-millisecond Layer-4 backend workers in C++23 that parse requests, compute rankings, and emit validated JSON payloads.',
    zeroIntuition: {
      plainEnglishStory:
        'At Google, Meta, and trading firms, the user-facing API gateway talks to **C++ microservices** when microseconds matter (search ranking, ad auctions, video transcoding, pathfinding). Your C++ handler receives validated user input, runs `O(1)`/`O(n log n)` domain logic, escapes strings cleanly, and returns strict JSON over HTTP/gRPC.',
      asciiFlowchart: `  5-LAYER WEBSITE ARCHITECTURE BLUEPRINT
  Browser (HTML/JS/TS)  <--JSON-->  API Gateway  <--gRPC-->  C++23 Compute Engine
                                                                 |
                                                     level = (xp / 100) + 1
                                                     JSON: {"user":"mina","level":2,"status":"OK"}`,
      pseudocode: [
        '1. READ user string and xp integer from API request stream',
        '2. VALIDATE xp >= 0 and compute level = (xp / 100) + 1',
        '3. ESCAPE JSON special characters in user string',
        '4. SERIALIZE strict JSON string to stdout/response stream',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সার্ভারের ভেতরের সুপারকার ইঞ্জিন (C++ Microservice & JSON DTO)',
        explanation:
          'একটি বড় সাইটের ডিজাইন থাকে HTML/JS-এ, রিকোয়েস্ট ম্যানেজ করে Python/Node API, কিন্তু ভেতরে লাখো ইউজারের র‍্যাংকিং বা গেম-লজিক হিসাব করে **C++ ইঞ্জিন**! ইনপুট যাচাই করে নিখুঁত JSON ফেরত দিতে পারলেই তোমার C++ কোড সরাসরি আধুনিক ফুল-স্ট্যাক ওয়েব অ্যাপের সাথে যুক্ত হতে পারে।',
        everydayExample:
          'ইউজার প্রোফাইল `"mina 150"` পাঠালে C++ ব্যাকএন্ড স্ট্রাক্ট দিয়ে লেভেল `2` হিসাব করে JSON পাঠিয়ে দেয়।',
        keyTakeaways: [
          'সব সময় `struct ApiResponse` বানিয়ে ডেটা ও সিরিয়ালাইজেশন আলাদা রাখলে বাগ কমে (DTO Pattern)।',
          'JSON সিরিয়ালাইজেশনে স্ট্রিংয়ের ভেতর থাকা কোট `"` অবশ্যই এস্কেপ করতে হয়।',
          'বাউন্ডারি ভ্যালিডেশন ব্যর্থ হলে প্যানিক না করে HTTP `400` এরর JSON ফেরত দেওয়াই স্ট্যান্ডার্ড API ডিজাইন।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Full-Stack JSON API Handler',
        banglaNote: '`user` ও `xp` ইনপুট নিয়ে `{"user":"mina","level":2,"status":"OK"}` JSON তৈরি।',
        code: `#include <iostream>
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
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'cpp-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Domain Validation & JSON Escaping Guard',
        banglaNote: 'নেগেটিভ XP-তে `400` এরর এবং ডাবল-কোট এস্কেপিংসহ সেফ রেসপন্স।',
        code: `#include <iostream>
#include <string>
using namespace std;

string escape_json(const string &s) {
    string out;
    for (char c : s) {
        if (c == '"' || c == '\\\\') out += '\\\\';
        out += c;
    }
    return out;
}

int main() {
    string user;
    int xp = 0;
    if (!(cin >> user >> xp) || xp < 0) {
        cout << "{\\"error\\":\\"INVALID_XP\\",\\"status\\":400}\\n";
        return 0;
    }
    cout << "{\\"user\\":\\"" << escape_json(user) << "\\",\\"level\\":" << (xp / 100 + 1) << ",\\"status\\":\\"OK\\"}\\n";
    return 0;
}`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'cpp-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed DTO Struct + Sorted Batch API Payload',
        banglaNote: 'ক্লিন DTO `struct` ব্যবহার করে একাধিক প্লেয়ারের JSON অ্যারে সিরিয়ালাইজেশন।',
        code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct PlayerDto {
    string user;
    int level;
    string to_json() const {
        return "{\\"user\\":\\"" + user + "\\",\\"level\\":" + to_string(level) + "}";
    }
};

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    vector<PlayerDto> rows;
    for (int i = 0; i < n; i++) {
        string u; int xp = 0; cin >> u >> xp;
        rows.push_back({u, (xp / 100) + 1});
    }
    cout << "[";
    for (size_t i = 0; i < rows.size(); i++) {
        if (i > 0) cout << ",";
        cout << rows[i].to_json();
    }
    cout << "]\\n";
    return 0;
}`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'cpp-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Lightweight REST Route Dispatcher via unordered_map',
        banglaNote: 'হ্যাশম্যাপ দিয়ে `O(1)` সময়ে API এন্ডপয়েন্ট রাউট ও স্ট্যাটাস কোড রিটার্ন।',
        code: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, string> routes = {
        {"/health", "200 OK"},
        {"/api/profile", "200 JSON"},
        {"/admin", "403 FORBIDDEN"}
    };
    string path;
    if (cin >> path) {
        auto it = routes.find(path);
        cout << (it != routes.end() ? it->second : "404 NOT_FOUND") << "\\n";
    }
    return 0;
}`,
        stdin: '/api/profile',
        expectedOutput: '200 JSON',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'string user; int xp = 0;',
        whatItMeans: 'Reads dynamic heap-safe user string cleanly without buffer limits.',
        whyItIsThere: 'std::string automatically grows to handle variable usernames safely.',
        ifDeletedError: 'Cannot hold incoming API fields.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'int level = (xp / 100) + 1;',
        whatItMeans: 'Applies gamification business rule mapping 0–99 -> Level 1, 100–199 -> Level 2.',
        whyItIsThere: 'Encapsulates server-authoritative progression calculation.',
        ifDeletedError: 'JSON payload lacks required level field.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'cin >> user >> xp', memoryOrStack: 'user="mina", xp=150', note: 'Request parsed' },
      { step: 2, state: 'Compute level = 150/100 + 1', memoryOrStack: 'level=2', note: 'Domain rule' },
      { step: 3, state: 'Emit JSON string', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Valid JSON' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Emitting Unquoted Keys or Single Quotes in JSON',
        brokenCode: 'cout << "{user:\'" << user << "\'}"; // Fails strict JSON parsers!',
        fixedCode: 'cout << "{\\"user\\":\\"" << user << "\\"}\\n";',
        whyItBreaks: 'JSON RFC-8259 mandates double quotes on every key and string value.',
      },
      {
        title: 'Trap 2: Trusting Client-Sent `level` Field Directly',
        brokenCode: '// Reading level from request body lets users hack level=9999!',
        fixedCode: 'int level = (xp / 100) + 1; // Always recompute derived fields server-side!',
        whyItBreaks: 'Frontend clients are untrusted; business math must stay server-authoritative.',
      },
      {
        title: 'Trap 3: Ignoring Stream Failure Before Serializing Response',
        brokenCode: 'cin >> user >> xp; // Uses uninitialized xp if parsing fails!',
        fixedCode: 'if (!(cin >> user >> xp) || xp < 0) return 400 error JSON;',
        whyItBreaks: 'Malformed payloads silently corrupt downstream caches or databases.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack JSON Serializer',
        prompt: 'Compute level from user and xp and print valid compact JSON.',
        banglaHint: '`{\\"user\\":\\"...\\",\\"level\\":...,\\"status\\":\\"OK\\"}` ফরম্যাটে প্রিন্ট করো।',
        starterCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string u; int xp = 0;
    if (cin >> u >> xp) cout << "{\\"user\\":\\"" << u << "\\",\\"level\\":" << (xp / 100 + 1) << ",\\"status\\":\\"OK\\"}\\n";
    return 0;
}`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'cpp-ch-15-q2',
        difficulty: 'Easy',
        title: 'Healthcheck Endpoint Response',
        prompt: 'Print `{"ok":true}` cleanly when ping input is received.',
        banglaHint: 'হুবহু `{"ok":true}` আউটপুট দাও।',
        starterCode: `#include <iostream>
using namespace std;
int main() { cout << "{\\"ok\\":true}\\n"; return 0; }`,
        sampleStdin: '',
        expectedOutput: '{"ok":true}',
      },
      {
        id: 'cpp-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Check (tariq 50)',
        prompt: 'Verify lower-XP user resolves cleanly to level 1.',
        banglaHint: '`50 / 100 + 1` হিসাব করে আউটপুট দাও।',
        starterCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string u; int xp = 0;
    if (cin >> u >> xp) cout << "{\\"user\\":\\"" << u << "\\",\\"level\\":" << (xp / 100 + 1) << ",\\"status\\":\\"OK\\"}\\n";
    return 0;
}`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'cpp-ch-15-q4',
        difficulty: 'Medium',
        title: 'API Query Pagination Clamp',
        prompt: 'Clamp requested pageSize cleanly into [1, 50] and output clamped integer.',
        banglaHint: '`max(1, min(50, pageSize))` ব্যবহার করো।',
        starterCode: `#include <algorithm>
#include <iostream>
using namespace std;
int main() { int ps; cin >> ps; cout << max(1, min(50, ps)) << "\\n"; return 0; }`,
        sampleStdin: '500',
        expectedOutput: '50',
      },
      {
        id: 'cpp-ch-15-q5',
        difficulty: 'Hard',
        title: 'JSON String Escaper Endpoint',
        prompt: 'Escape double quotes inside input user string cleanly inside JSON.',
        banglaHint: '`"` চিহ্ন পেলে `\\"` আউটপুট দাও।',
        starterCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s, out; cin >> s;
    for (char c : s) { if (c == '"' || c == '\\\\') out += '\\\\'; out += c; }
    cout << "{\\"name\\":\\"" << out << "\\"}\\n";
    return 0;
}`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (C++23): Microservice DTO & API Pipeline',
      description: 'Combines C++ Ch 1–15 into the ultra-fast Layer-4 microservice engine of the 5-Layer Website Architecture.',
      banglaGoal: 'C++ অধ্যায় ১–১৫ মিলিয়ে প্রোডাকশন মানের JSON API মাইক্রোসার্ভিস ক্যাপস্টোন তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `#include <iostream>
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
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  python: {
    title: 'Python Chapter 15 (3.13): REST API Backend, json.dumps Validation & Mega Capstone',
    banglaTitle: 'Python অধ্যায় ১৫ (3.13): REST API ব্যাকএন্ড, json.dumps ও মেগা ক্যাপস্টোন',
    subtitle: 'Design the Layer-3 API & business-logic brain using strict json.dumps serialization, input validation, and clean error contracts.',
    zeroIntuition: {
      plainEnglishStory:
        'Python powers millions of production API backends (FastAPI, Django, AI gateways) sitting directly in **Layer 3** between the Browser (`HTML/JS/TS`) and the Database (`Layer 5`). Using `json.dumps()` guarantees valid, injection-proof JSON encoding—so even if a username contains quotes or emojis, your API contract never breaks!',
      asciiFlowchart: `  5-LAYER WEBSITE ARCHITECTURE (PYTHON API IN LAYER 3)
  Browser UI (HTML/JS/TS) ---> HTTPS Request ("mina 150")
                                    |
                                    v
                          Python 3.13 API Service
                          - Validate xp >= 0
                          - Compute level = (xp // 100) + 1
                          - json.dumps(payload) -> {"user":"mina","level":2,"status":"OK"}`,
      pseudocode: [
        '1. PARSE user and xp from request body / stdin',
        '2. VALIDATE xp >= 0 and compute server-authoritative level',
        '3. SERIALIZE dictionary via json.dumps(..., separators=(",", ":"))',
        '4. EMIT valid JSON response',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ব্যাকএন্ডের বুদ্ধিমান ম্যানেজার (Python Layer-3 API & json.dumps)',
        explanation:
          'হাতে স্ট্রিং জোড়া লাগিয়ে JSON বানালে ইউজার যদি নামের মধ্যে `" ` বা `\\` দেয় তবে পুরো JSON ভেঙে যাবে! Python-এর নিজস্ব **`json.dumps()`** ব্যবহার করলে ডিকশনারি স্বয়ংক্রিয়ভাবে ১০০% নিখুঁত, এস্কেপ-করা JSON স্ট্রিং হয়ে যায়—যেভাবে FastAPI বা Django সার্ভার ফ্রন্টএন্ডে ডেটা পাঠায়!',
        everydayExample:
          'ব্রাউজার থেকে লগইন বা প্রোফাইল রিকোয়েস্ট এলে Python ব্যাকএন্ড লেভেল হিসাব করে এক লাইনে JSON রেসপন্স পাঠানো।',
        keyTakeaways: [
          'হাতে `f"..."` দিয়ে JSON না বানিয়ে সব সময় `json.dumps(dict)` ব্যবহার করবে—এটি সব স্পেশাল ক্যারেক্টার এস্কেপ করে দেয়।',
          '`separators=(",", ":")` দিলে অপ্রয়োজনীয় স্পেস বাদ গিয়ে কম্প্যাক্ট API পেলোড তৈরি হয় (ব্যান্ডউইথ বাঁচে)।',
          'সব API এন্ডপয়েন্টে ইনপুট ভ্যালিডেশন ব্যর্থ হলে স্পষ্ট JSON এরর (`400`) পাঠানো উচিত।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Strict Compact JSON API Response via json.dumps',
        banglaNote: '`json.dumps(..., separators=(",", ":"))` দিয়ে নিরাপদ ও কম্প্যাক্ট JSON রেসপন্স।',
        code: `import json
import sys

parts = sys.stdin.read().split()
user, xp = parts[0], int(parts[1])
payload = {"user": user, "level": (xp // 100) + 1, "status": "OK"}
print(json.dumps(payload, separators=(",", ":")))`,
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'py-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative XP Validation & Automatic Quote Escaping',
        banglaNote: 'নেগেটিভ XP-তে `400` এরর JSON এবং `json.dumps`-এর অটো-এস্কেপিং সুবিধা।',
        code: `import json
import sys

parts = sys.stdin.read().split()
if len(parts) < 2 or not parts[1].lstrip("-").isdigit() or int(parts[1]) < 0:
    print(json.dumps({"error": "INVALID_XP", "status": 400}, separators=(",", ":")))
else:
    user, xp = parts[0], int(parts[1])
    print(json.dumps({"user": user, "level": (xp // 100) + 1, "status": "OK"}, separators=(",", ":")))`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'py-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Batch User Profile Serializer',
        banglaNote: 'একাধিক ইউজারের প্রোফাইল ডিকশনারি একসাথে JSON লিস্টে কনভার্ট করে রিটার্ন।',
        code: `import json
import sys

lines = sys.stdin.read().strip().splitlines()
n = int(lines[0])
rows = []
for line in lines[1:1 + n]:
    u, xp = line.split()
    rows.append({"user": u, "level": (int(xp) // 100) + 1})
print(json.dumps(rows, separators=(",", ":")))`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'py-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: HMAC-SHA256 Signed API Webhook Token',
        banglaNote: '`hmac` + `hashlib.sha256` দিয়ে API পেলোডের ক্রিপ্টোগ্রাফিক সিগনেচার তৈরি।',
        code: `import hashlib
import hmac
import sys

secret, msg = sys.stdin.read().split()
sig = hmac.new(secret.encode(), msg.encode(), hashlib.sha256).hexdigest()[:16]
print(f"sig:{sig}")`,
        stdin: 'my_secret mina:150',
        expectedOutput: 'sig:f2a9bf7fd9b8795d',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'payload = {"user": user, "level": (xp // 100) + 1, "status": "OK"}',
        whatItMeans: 'Builds structured API DTO dictionary on the server.',
        whyItIsThere: 'Server calculates authoritative level instead of trusting client math.',
        ifDeletedError: 'NameError: payload is not defined.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'print(json.dumps(payload, separators=(",", ":")))',
        whatItMeans: 'Serializes dictionary to RFC-8259 JSON without extra whitespace.',
        whyItIsThere: 'Guarantees automatic escaping of quotes, slashes, and Unicode.',
        ifDeletedError: 'Printing a Python dict emits invalid single quotes `{\'user\': ...}`!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Split "mina 150"', memoryOrStack: 'user="mina", xp=150', note: 'Parsed cleanly' },
      { step: 2, state: 'Compute level = 150 // 100 + 1', memoryOrStack: 'level=2', note: 'Integer floor div' },
      { step: 3, state: 'json.dumps(payload)', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Strict JSON' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Printing Python `dict` Directly Instead of `json.dumps()`',
        brokenCode: 'print({"user": "mina", "ok": True}) # Prints {\'user\': \'mina\', \'ok\': True} -> NOT JSON!',
        fixedCode: 'print(json.dumps({"user": "mina", "ok": True}, separators=(",", ":")))',
        whyItBreaks: 'Python str(dict) uses single quotes and capitalized True/False/None instead of valid JSON.',
      },
      {
        title: 'Trap 2: Manually Formatting JSON With f-Strings',
        brokenCode: 'print(f\'{{"user":"{user}"}}\') # Quotes inside user corrupt JSON!',
        fixedCode: 'print(json.dumps({"user": user}, separators=(",", ":")))',
        whyItBreaks: 'json.dumps automatically escapes quotes and control characters safely.',
      },
      {
        title: 'Trap 3: Dividing With `/` Instead of `//` for Level Integer',
        brokenCode: 'level = (150 / 100) + 1 # Produces 2.5 float!',
        fixedCode: 'level = (150 // 100) + 1 # Produces exact integer 2',
        whyItBreaks: 'Python 3 `/` always returns floating-point numbers.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack JSON Response',
        prompt: 'Compute level and serialize response using json.dumps.',
        banglaHint: '`json.dumps(payload, separators=(",", ":"))` ব্যবহার করো।',
        starterCode: `import json, sys
p = sys.stdin.read().split()
print(json.dumps({"user": p[0], "level": (int(p[1]) // 100) + 1, "status": "OK"}, separators=(",", ":")))`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'py-ch-15-q2',
        difficulty: 'Easy',
        title: 'REST Healthcheck Payload',
        prompt: 'Emit `{"ok":true}` using json.dumps.',
        banglaHint: 'Python `True` json.dumps-এ স্বয়ংক্রিয়ভাবে `true` হয়।',
        starterCode: `import json
print(json.dumps({"ok": True}, separators=(",", ":")))`,
        sampleStdin: '',
        expectedOutput: '{"ok":true}',
      },
      {
        id: 'py-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Boundary Serialization (tariq 50)',
        prompt: 'Verify level=1 serializes cleanly for XP under 100.',
        banglaHint: '`50 // 100 + 1` হিসাব করো।',
        starterCode: `import json, sys
p = sys.stdin.read().split()
print(json.dumps({"user": p[0], "level": (int(p[1]) // 100) + 1, "status": "OK"}, separators=(",", ":")))`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'py-ch-15-q4',
        difficulty: 'Medium',
        title: 'Safe Page-Size Clamp',
        prompt: 'Clamp pagination limit into [1, 50] and print result.',
        banglaHint: '`max(1, min(50, n))` ব্যবহার করো।',
        starterCode: `import sys
print(max(1, min(50, int(sys.stdin.read().strip()))))`,
        sampleStdin: '500',
        expectedOutput: '50',
      },
      {
        id: 'py-ch-15-q5',
        difficulty: 'Hard',
        title: 'Injection-Proof JSON Name Escaper',
        prompt: 'Serialize arbitrary quoted name safely into `{"name":"..."}` via json.dumps.',
        banglaHint: '`json.dumps({"name": s}, separators=(",", ":"))` সরাসরি কোট এস্কেপ করে।',
        starterCode: `import json, sys
print(json.dumps({"name": sys.stdin.read().strip()}, separators=(",", ":")))`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (Python 3.13): REST API Backend & JSON Contract',
      description: 'Combines Python Ch 1–15 into the Layer-3 API controller driving the 5-Layer Website Architecture.',
      banglaGoal: 'Python অধ্যায় ১–১৫-এর সব দক্ষতা দিয়ে পূর্ণাঙ্গ ব্যাকএন্ড REST API কন্ট্রোলার তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `import json, sys

parts = sys.stdin.read().split()
user, xp = parts[0], int(parts[1])
payload = {"user": user, "level": (xp // 100) + 1, "status": "OK"}
print(json.dumps(payload, separators=(",", ":")))`,
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  java: {
    title: 'Java Chapter 15 (Java 21): Enterprise API Controller, Records & Mega Capstone',
    banglaTitle: 'Java অধ্যায় ১৫ (Java 21): এন্টারপ্রাইজ API কন্ট্রোলার, রেকর্ড ও মেগা ক্যাপস্টোন',
    subtitle: 'Build strongly typed Layer-3 Spring-style API DTOs with Java 21 Records, strict validation, and clean JSON responses.',
    zeroIntuition: {
      plainEnglishStory:
        'Enterprise banks, e-commerce giants, and Android backends rely heavily on Java in **Layer 3** because static types, Java 21 **Records**, and predictable JVM performance scale cleanly to thousands of microservices. Your Java service validates request DTOs, enforces business invariants (`xp >= 0`), and serializes clean JSON.',
      asciiFlowchart: `  5-LAYER WEBSITE ARCHITECTURE (JAVA 21 IN LAYER 3)
  Client (HTML/TS)  <--JSON-->  Java Record ApiResponse(user, level, status)
                                        |
                                        v
                               Business Validation + DB Persistence`,
      pseudocode: [
        '1. PARSE user and xp into typed request variables',
        '2. VALIDATE xp >= 0 and compute level = (xp / 100) + 1',
        '3. FORMAT immutable ApiResponse record into strict JSON',
        '4. EMIT JSON response',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Java 21 Record দিয়ে টাইপ-সেফ এন্টারপ্রাইজ API (Layer-3 Blueprint)',
        explanation:
          'বড় ব্যাংকিং বা ই-কমার্স ব্যাকএন্ডে অসংগঠিত কোড চলে না—সেখানে প্রতিটি API রেসপন্সের একটা ফিক্সড ছাঁচ বা **Java Record** (`record ApiRes(String user, int level, String status)`) থাকে! এতে ভুল ডেটা টাইপ বা অসম্পূর্ণ পেলোড কখনো ফ্রন্টএন্ডে যাওয়ার সুযোগ পায় না।',
        everydayExample:
          'একটি স্প্রিং-বুট কন্ট্রোলারের মতো `"mina 150"` রিসিভ করে নির্ভুল `{"user":"mina","level":2,"status":"OK"}` পাঠানো।',
        keyTakeaways: [
          'Java 21 `record` ব্যবহার করলে মাত্র ১ লাইনে ইমিউটেবল DTO ক্লাস তৈরি হয়ে যায়।',
          'অবৈধ ইনপুট পেলে `400` এরর JSON দিয়ে পরিচ্ছন্নভাবে রিজেক্ট করা ভালো প্র্যাকটিস।',
          'স্ট্যাটিক স্ট্রিং এস্কেপিং করে রাখলে ইউজার ইনপুট কখনো JSON সিনট্যাক্স ভাঙতে পারবে না।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Full-Stack JSON Response Controller',
        banglaNote: 'ইউজার ও XP প্রসেস করে স্ট্যান্ডার্ড JSON রেসপন্স আউটপুট।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String user = sc.next();
        int xp = sc.nextInt();
        int level = (xp / 100) + 1;
        System.out.println("{\\"user\\":\\"" + user + "\\",\\"level\\":" + level + ",\\"status\\":\\"OK\\"}");
    }
}`,
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'java-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative XP Validation & Quote Escaper',
        banglaNote: 'নেগেটিভ XP হলে HTTP 400 JSON এবং কোট এস্কেপিংসহ সেফ হ্যান্ডলিং।',
        code: `import java.util.Scanner;

public class Main {
    static String esc(String s) {
        return s.replace("\\\\", "\\\\\\\\").replace("\\"", "\\\\\\"");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String user = sc.next();
        int xp = sc.hasNextInt() ? sc.nextInt() : -1;
        if (xp < 0) {
            System.out.println("{\\"error\\":\\"INVALID_XP\\",\\"status\\":400}");
            return;
        }
        System.out.println("{\\"user\\":\\"" + esc(user) + "\\",\\"level\\":" + (xp / 100 + 1) + ",\\"status\\":\\"OK\\"}");
    }
}`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'java-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Java 21 Immutable Record DTO Batch API',
        banglaNote: 'Java `record PlayerDto` ব্যবহার করে বহু ইউজারের ক্লিন JSON অ্যারে তৈরি।',
        code: `import java.util.Scanner;

public class Main {
    record PlayerDto(String user, int level) {
        String toJson() { return "{\\"user\\":\\"" + user + "\\",\\"level\\":" + level + "}"; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(',');
            sb.append(new PlayerDto(sc.next(), (sc.nextInt() / 100) + 1).toJson());
        }
        sb.append(']');
        System.out.println(sb.toString());
    }
}`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'java-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Switch-Expression REST Route Handler (Java 21)',
        banglaNote: 'Java 21 সুইচ এক্সপ্রেশন দিয়ে পরিচ্ছন্ন REST রাউটার তৈরি।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String path = new Scanner(System.in).next();
        String res = switch (path) {
            case "/health" -> "200 OK";
            case "/api/profile" -> "200 JSON";
            case "/admin" -> "403 FORBIDDEN";
            default -> "404 NOT_FOUND";
        };
        System.out.println(res);
    }
}`,
        stdin: '/api/profile',
        expectedOutput: '200 JSON',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5-7',
        codeSnippet: 'String user = sc.next(); int xp = sc.nextInt();',
        whatItMeans: 'Binds incoming API parameters cleanly with strong static types.',
        whyItIsThere: 'Guarantees type safety before business math executes.',
        ifDeletedError: 'Compile failure on undeclared user or xp.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'System.out.println("{\\"user\\":\\"" + user + ...);',
        whatItMeans: 'Emits valid JSON DTO string back to gateway/client.',
        whyItIsThere: 'Matches frontend schema expectations strictly.',
        ifDeletedError: 'Empty HTTP response.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read user="mina", xp=150', memoryOrStack: 'Typed DTO inputs', note: 'Step 1' },
      { step: 2, state: 'level = (150 / 100) + 1', memoryOrStack: 'level = 2', note: 'Business logic' },
      { step: 3, state: 'Emit JSON string', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Ready for UI' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Unescaped Quotes in String Concatenated JSON',
        brokenCode: 'System.out.println("{\\"user\\":\\"" + user + "\\"}"); // Breaks if user has "!',
        fixedCode: '// Always escape \\\\ and " (or use Jackson/Gson in Spring Boot apps)',
        whyItBreaks: 'A single quote inside `user` breaks JSON parsing and allows field spoofing.',
      },
      {
        title: 'Trap 2: Exposing Stack Traces Inside Production 500 JSON',
        brokenCode: 'catch (Exception e) { return e.getMessage(); } // Leaks DB table names & paths!',
        fixedCode: '// Log full trace internally; return clean generic {"error":"INTERNAL_ERROR"} to client',
        whyItBreaks: 'Error traces hand attackers database schemas and file system layouts.',
      },
      {
        title: 'Trap 3: Blocking Virtual/Worker Threads With Unbounded Requests',
        brokenCode: '// Accepting page=1&limit=99999999 crashes JVM heap with OutOfMemoryError!',
        fixedCode: 'int safeLimit = Math.max(1, Math.min(50, reqLimit));',
        whyItBreaks: 'Clients can trigger OOM DoS simply by requesting huge page sizes.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack JSON Payload',
        prompt: 'Compute level and emit compact JSON response.',
        banglaHint: '`{\\"user\\":\\"...\\",\\"level\\":...,\\"status\\":\\"OK\\"}` প্রিন্ট করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String u = sc.next(); int xp = sc.nextInt();
        System.out.println("{\\"user\\":\\"" + u + "\\",\\"level\\":" + (xp / 100 + 1) + ",\\"status\\":\\"OK\\"}");
    }
}`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'java-ch-15-q2',
        difficulty: 'Easy',
        title: 'Healthcheck JSON Route',
        prompt: 'Print `{"ok":true}` cleanly.',
        banglaHint: 'হুবহু `{"ok":true}` আউটপুট দাও।',
        starterCode: `public class Main { public static void main(String[] args) { System.out.println("{\\"ok\\":true}"); } }`,
        sampleStdin: '',
        expectedOutput: '{"ok":true}',
      },
      {
        id: 'java-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Check (tariq 50)',
        prompt: 'Verify lower-XP request produces level 1 JSON.',
        banglaHint: '`50 / 100 + 1` এর মান `1`।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String u = sc.next(); int xp = sc.nextInt();
        System.out.println("{\\"user\\":\\"" + u + "\\",\\"level\\":" + (xp / 100 + 1) + ",\\"status\\":\\"OK\\"}");
    }
}`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'java-ch-15-q4',
        difficulty: 'Medium',
        title: 'Pagination Limit Clamp',
        prompt: 'Clamp requested pageSize cleanly into [1, 50].',
        banglaHint: '`Math.max(1, Math.min(50, ps))` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int ps = new Scanner(System.in).nextInt();
        System.out.println(Math.max(1, Math.min(50, ps)));
    }
}`,
        sampleStdin: '500',
        expectedOutput: '50',
      },
      {
        id: 'java-ch-15-q5',
        difficulty: 'Hard',
        title: 'JSON Quote Escaper DTO',
        prompt: 'Escape `"` cleanly inside `{"name":"..."}` JSON output.',
        banglaHint: '`.replace("\\"", "\\\\\\"")` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next().replace("\\\\", "\\\\\\\\").replace("\\"", "\\\\\\"");
        System.out.println("{\\"name\\":\\"" + s + "\\"}");
    }
}`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (Java 21): Enterprise Record API Controller',
      description: 'Combines Java Ch 1–15 into a strongly typed Layer-3 enterprise API endpoint for the 5-Layer Architecture.',
      banglaGoal: 'Java অধ্যায় ১–১৫ মিলিয়ে এন্টারপ্রাইজ REST API কন্ট্রোলার ক্যাপস্টোন তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String user = sc.next();
        int xp = sc.nextInt();
        int level = (xp / 100) + 1;
        System.out.println("{\\"user\\":\\"" + user + "\\",\\"level\\":" + level + ",\\"status\\":\\"OK\\"}");
    }
}`,
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 15 (ES2025): Full-Stack Fetch, JSON API Router & Mega Capstone',
    banglaTitle: 'JavaScript অধ্যায় ১৫ (ES2025): ফুল-স্ট্যাক Fetch, JSON রাউটার ও মেগা ক্যাপস্টোন',
    subtitle: 'Connect Layer-2 Browser interactivity to Layer-3 REST APIs using JSON.stringify, response validation, and safe router dispatch.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript is the ONLY language that runs natively in both the **Browser (`Layer 2`)** AND the **Server (`Node.js / Edge API Layer 3`)**! Your frontend dispatches `fetch("/api/profile")` with JSON payloads, checks `res.ok`, and updates state—while Node API handlers validate incoming inputs, compute derived values (`level`), and return clean `JSON.stringify()` contracts.',
      asciiFlowchart: `  5-LAYER FULL-STACK FLOW (JS ON BOTH SIDES!)
  Browser JS (Layer 2)  --fetch(JSON)-->  Node API (Layer 3)
       ^                                         |
       +-------- JSON.stringify(res) ------------+
       |  {"user":"mina","level":2,"status":"OK"}
       v
  Update DOM UI & LocalStorage Cache cleanly`,
      pseudocode: [
        '1. EXTRACT user and xpStr from API request body',
        '2. VALIDATE xp is non-negative finite integer',
        '3. COMPUTE level = Math.floor(xp / 100) + 1',
        '4. SERIALIZE with JSON.stringify({ user, level, status: "OK" })',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ব্রাউজার আর সার্ভার—উভয় দিকের সেতুবন্ধন (Full-Stack JavaScript)',
        explanation:
          'JavaScript হলো সেই ভাষাবিদ যে ক্লায়েন্টের টেবিল (Browser) এবং রান্নাঘরের কাউন্টার (Node/Express API)—দুটোতেই সমানভাবে কথা বলতে পারে! `JSON.stringify()` ডেটাকে প্যাকেট করে পাঠায়, আর `JSON.parse()` সেই প্যাকেট খুলে অবজেক্ট বানায়। দুই পক্ষের কন্ট্রাক্ট ঠিক থাকলেই পুরো ফুল-স্ট্যাক অ্যাপ নিখুঁত চলে!',
        everydayExample:
          'এই ArgonCode একাডেমি অ্যাপটিও ঠিক এভাবেই React/JS-এ চলে—প্রোফাইল আপডেট, কোড রান ও লোকাল স্টোরেজ সিঙ্ক করে!',
        keyTakeaways: [
          '`fetch()` শুধুমাত্র নেটওয়ার্ক ফেইলিউরে রিজেক্ট করে—HTTP `404` বা `500` এররে রিজেক্ট করে না! তাই সব সময় **`if (!res.ok) throw ...`** লিখতে হবে।',
          '`JSON.parse()` আনট্রাস্টেড স্ট্রিংয়ে এরর ছুড়তে পারে—সব সময় `try / catch`-এ রাখবে।',
          'সব API রেসপন্সে স্ট্রিং ক্যাটেনেশনের বদলে `JSON.stringify(obj)` ব্যবহার করবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Full-Stack JSON API Handler With JSON.stringify',
        banglaNote: '`user` ও `xp` ইনপুট নিয়ে `JSON.stringify` দিয়ে স্ট্যান্ডার্ড API রেসপন্স তৈরি।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, xpStr] = raw.trim().split(/\\s+/);
const level = Math.floor(Number(xpStr) / 100) + 1;
console.log(JSON.stringify({ user, level, status: 'OK' }));`,
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'js-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Request Validation & Safe JSON.parse Guard',
        banglaNote: 'নেগেটিভ XP বা অসম্পূর্ণ পেলোড এলে ক্র্যাশ না করে HTTP 400 এরর JSON রিটার্ন।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, xpStr] = raw.trim().split(/\\s+/);
const xp = Number(xpStr);
if (!user || !Number.isFinite(xp) || xp < 0) {
  console.log(JSON.stringify({ error: 'INVALID_XP', status: 400 }));
} else {
  console.log(JSON.stringify({ user, level: Math.floor(xp / 100) + 1, status: 'OK' }));
}`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'js-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Batch Profile API Payload Serializer',
        banglaNote: 'একাধিক ইউজার পেলোড একটি একক JSON অ্যারে রেসপন্সে রূপান্তর।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/);
const n = Number(lines[0]);
const rows = lines.slice(1, 1 + n).map((line) => {
  const [user, xp] = line.trim().split(/\\s+/);
  return { user, level: Math.floor(Number(xp) / 100) + 1 };
});
console.log(JSON.stringify(rows));`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'js-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Full-Stack Mini REST Router Dispatch Map',
        banglaNote: '`Map` ভিত্তিক এক্সপ্রেস-স্টাইল API রাউট ডিসপ্যাচার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const path = raw.trim();
const routes = new Map([
  ['/health', () => ({ ok: true })],
  ['/api/profile', () => ({ user: 'mina', level: 2 })],
]);
const handler = routes.get(path);
console.log(JSON.stringify(handler ? handler() : { error: 'NOT_FOUND', status: 404 }));`,
        stdin: '/api/profile',
        expectedOutput: '{"user":"mina","level":2}',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const [user, xpStr] = raw.trim().split(/\\s+/);',
        whatItMeans: 'Destructures request fields cleanly from trimmed input.',
        whyItIsThere: 'Handles arbitrary spacing/newlines in incoming payloads.',
        ifDeletedError: 'Cannot read request user or xp.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: "console.log(JSON.stringify({ user, level, status: 'OK' }));",
        whatItMeans: 'Serializes strict RFC-8259 JSON with automatic character escaping.',
        whyItIsThere: 'Prevents syntax errors and JSON injection vulnerabilities.',
        ifDeletedError: 'API returns empty body.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Destructure "mina 150"', memoryOrStack: 'user="mina", xpStr="150"', note: 'Input parsed' },
      { step: 2, state: 'Math.floor(150/100) + 1', memoryOrStack: 'level = 2', note: 'Pure computation' },
      { step: 3, state: 'JSON.stringify(...)', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Ready for client' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Not Checking `response.ok` After `fetch()`',
        brokenCode: 'const data = await (await fetch(url)).json(); // Throws cryptic JSON error on 404 HTML page!',
        fixedCode: 'const res = await fetch(url);\nif (!res.ok) throw new Error(`HTTP ${res.status}`);',
        whyItBreaks: 'fetch() only rejects on network loss; HTTP 404/500 still resolves normally.',
      },
      {
        title: 'Trap 2: Calling `JSON.parse()` Outside try/catch',
        brokenCode: 'const obj = JSON.parse(untrustedBody); // Crashes server thread on bad JSON!',
        fixedCode: 'try { obj = JSON.parse(untrustedBody); } catch { return { error: 400 }; }',
        whyItBreaks: 'Malformed payloads throw SyntaxError synchronously.',
      },
      {
        title: 'Trap 3: Skipping CORS or Input Validation on Backend API',
        brokenCode: 'app.post("/xp", (req, res) => db.save(req.body)); // Allows arbitrary fields!',
        fixedCode: '// Whitelist exact allowed keys (user, xp) and validate types cleanly before saving.',
        whyItBreaks: 'Mass assignment lets attackers send `{"isAdmin": true}` inside request bodies.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack JSON Contract',
        prompt: 'Compute level and emit compact JSON using JSON.stringify.',
        banglaHint: '`JSON.stringify({ user, level, status: "OK" })` লগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, xpStr] = raw.trim().split(/\\s+/);
console.log(JSON.stringify({ user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' }));`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'js-ch-15-q2',
        difficulty: 'Easy',
        title: 'REST Health Endpoint',
        prompt: 'Output `{"ok":true}` cleanly via JSON.stringify.',
        banglaHint: '`JSON.stringify({ ok: true })` ব্যবহার করো।',
        starterCode: `console.log(JSON.stringify({ ok: true }));`,
        sampleStdin: '',
        expectedOutput: '{"ok":true}',
      },
      {
        id: 'js-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Boundary Check (tariq 50)',
        prompt: 'Confirm XP under 100 outputs level 1 cleanly.',
        banglaHint: '`Math.floor(50 / 100) + 1` হিসাব করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, xpStr] = raw.trim().split(/\\s+/);
console.log(JSON.stringify({ user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' }));`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'js-ch-15-q4',
        difficulty: 'Medium',
        title: 'Pagination Limit Clamp',
        prompt: 'Clamp requested limit cleanly into [1, 50].',
        banglaHint: '`Math.max(1, Math.min(50, n))` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
console.log(Math.max(1, Math.min(50, Number(raw.trim()))));`,
        sampleStdin: '500',
        expectedOutput: '50',
      },
      {
        id: 'js-ch-15-q5',
        difficulty: 'Hard',
        title: 'Safe JSON Escaper Endpoint',
        prompt: 'Serialize quoted string into `{"name":"..."}` using JSON.stringify.',
        banglaHint: '`JSON.stringify({ name: s })` নিজেই কোট এস্কেপ করে।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
console.log(JSON.stringify({ name: raw.trim() }));`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (ES2025): Full-Stack Client–API Bridge',
      description: 'Combines JS Ch 1–15 into the end-to-end JSON API & state handler connecting browser UIs to backend services.',
      banglaGoal: 'JavaScript অধ্যায় ১–১৫ মিলিয়ে ফুল-স্ট্যাক ক্লায়েন্ট-টু-API JSON ক্যাপস্টোন তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, xpStr] = raw.trim().split(/\\s+/);
const level = Math.floor(Number(xpStr) / 100) + 1;
console.log(JSON.stringify({ user, level, status: 'OK' }));`,
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  rust: {
    title: 'Rust Chapter 15 (2024): Zero-Cost Web API Backend, Contracts & Mega Capstone',
    banglaTitle: 'Rust অধ্যায় ১৫ (2024): জিরো-কস্ট ওয়েব API, কন্ট্রাক্ট ও মেগা ক্যাপস্টোন',
    subtitle: 'Power blazingly fast, memory-safe Axum/Actix-style Layer-3/4 API services in Rust with typed DTOs and strict JSON serialization.',
    zeroIntuition: {
      plainEnglishStory:
        'Companies like Discord, Cloudflare, and Figma use **Rust** in Layers 3 & 4 because it delivers C++-grade tail latency (`p99 < 1ms`) with **zero Garbage Collection pauses** and **zero memory corruption CVEs**. Defining strict response structs, validating inputs with `Result`, and escaping JSON strings gives bulletproof production APIs.',
      asciiFlowchart: `  5-LAYER WEBSITE ARCHITECTURE (RUST LAYER-3/4 ENGINE)
  Browser UI (HTML/TS)  <--HTTPS/JSON-->  Rust Web Service
                                                |
                                          Safe Parser & Math
                                                |
                                                v
                              {"user":"mina","level":2,"status":"OK"}`,
      pseudocode: [
        '1. SPLIT whitespace tokens cleanly into user and xp: i32',
        '2. VALIDATE xp >= 0 (return 400 error JSON if invalid)',
        '3. COMPUTE level = (xp / 100) + 1',
        '4. SERIALIZE valid JSON output without panic risk',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য GC-বিরতিতে চলা দুর্ভেদ্য ওয়েব সার্ভার (Rust API Engine)',
        explanation:
          'Cloudflare বা Discord যখন মিলিয়ন ইউজারের API একসাথে চালায়, তখন Garbage Collector-এর সামান্য পজও সমস্যা করে! **Rust** দেয় C-এর মতো রকেট স্পিড কিন্তু বাফার ওভারফ্লো বা ক্র্যাশের কোনো ঝুঁকি ছাড়াই। ইনপুট পার্স করতে `Result` ব্যবহার করায় কোনো খারাপ রিকোয়েস্ট সার্ভারকে ফেলতে পারে না!',
        everydayExample:
          'একটি কোডিং প্ল্যাটফর্মের সাবমিশন জাজ বা প্রোফাইল API হ্যান্ডলার `"mina 150"` নিয়ে সাথে সাথে `{"user":"mina","level":2,"status":"OK"}` পাঠানো।',
        keyTakeaways: [
          'প্রোডাকশন ওয়েব হ্যান্ডলারে `.unwrap()` এড়িয়ে `Result`/`Option` দিয়ে HTTP `400`/`500` JSON রিটার্ন করাই নিয়ম।',
          'বড় অ্যাপে `serde_json` স্বয়ংক্রিয়ভাবে সব স্ট্রিং এস্কেপ ও স্ট্রাক্ট সিরিয়ালাইজ করে।',
          'Rust API লেয়ার সরাসরি HTML/TS ফ্রন্টএন্ডের সাথে নিখুঁত JSON কন্ট্রাক্টে কথা বলে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Full-Stack JSON API Handler in Rust',
        banglaNote: '`user` ও `xp` পার্স করে স্ট্যান্ডার্ড JSON API রেসপন্স পাঠানো।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let user = it.next().unwrap();
    let xp: i32 = it.next().unwrap().parse().unwrap();
    let level = (xp / 100) + 1;
    println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", user, level);
}`,
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'rust-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero-Panic Request Validator & JSON Escaper',
        banglaNote: '`.unwrap()` ছাড়াই `match`/`unwrap_or` দিয়ে অবৈধ XP-তে HTTP 400 এরর রিটার্ন।',
        code: `use std::io::{self, Read};

fn esc(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for c in s.chars() {
        if c == '"' || c == '\\\\' { out.push('\\\\'); }
        out.push(c);
    }
    out
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let Some(user) = it.next() else { return; };
    let xp: i32 = it.next().and_then(|v| v.parse().ok()).unwrap_or(-1);
    if xp < 0 {
        println!("{{\\"error\\":\\"INVALID_XP\\",\\"status\\":400}}");
    } else {
        println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", esc(user), (xp / 100) + 1);
    }
}`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'rust-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed DTO Struct Batch JSON Array',
        banglaNote: '`struct PlayerDto` মেথড দিয়ে একাধিক রেকর্ডের JSON অ্যারে তৈরি।',
        code: `use std::io::{self, Read};

struct PlayerDto<'a> { user: &'a str, level: i32 }
impl<'a> PlayerDto<'a> {
    fn to_json(&self) -> String {
        format!("{{\\"user\\":\\"{}\\",\\"level\\":{}}}", self.user, self.level)
    }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut lines = s.lines();
    let n: usize = lines.next().unwrap().trim().parse().unwrap();
    let items: Vec<String> = lines.take(n).map(|line| {
        let mut p = line.split_whitespace();
        let u = p.next().unwrap();
        let xp: i32 = p.next().unwrap().parse().unwrap();
        PlayerDto { user: u, level: (xp / 100) + 1 }.to_json()
    }).collect();
    println!("[{}]", items.join(","));
}`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'rust-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Pattern-Match REST Route Dispatcher',
        banglaNote: 'Rust `match` দিয়ে হ্যান্ডলার-লেভেল REST রাউটিং।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let out = match s.trim() {
        "/health" => "200 OK",
        "/api/profile" => "200 JSON",
        "/admin" => "403 FORBIDDEN",
        _ => "404 NOT_FOUND",
    };
    println!("{}", out);
}`,
        stdin: '/api/profile',
        expectedOutput: '200 JSON',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6-8',
        codeSnippet: 'let user = it.next().unwrap(); let xp: i32 = ...',
        whatItMeans: 'Slices request string tokens without allocating intermediate token vectors.',
        whyItIsThere: 'Zero-copy &str parsing keeps request overhead minimal.',
        ifDeletedError: 'Cannot inspect incoming user/xp values.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", user, level);',
        whatItMeans: 'Escapes literal `{` and `}` as `{{` / `}}` inside Rust format strings to emit JSON.',
        whyItIsThere: 'Single `{` in `println!` denotes a formatting placeholder.',
        ifDeletedError: 'Unescaped `{` fails macro syntax compilation!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Split "mina 150"', memoryOrStack: 'user: &str="mina", xp=150', note: 'Zero-copy slice' },
      { step: 2, state: 'Compute level = 150/100 + 1', memoryOrStack: 'level=2', note: 'Server logic' },
      { step: 3, state: 'Emit escaped JSON', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Unescaped `{` Inside println! When Formatting JSON',
        brokenCode: 'println!("{\\"ok\\":true}"); // Compile Error: invalid format string!',
        fixedCode: 'println!("{{\\"ok\\":true}}"); // Double braces {{ }} emit literal { }',
        whyItBreaks: 'Rust format macros reserve single `{}` for variable interpolation.',
      },
      {
        title: 'Trap 2: Calling .unwrap() Inside HTTP Request Handlers',
        brokenCode: 'let id: i64 = req.param.parse().unwrap(); // Bad client input crashes worker!',
        fixedCode: 'let Ok(id) = req.param.parse::<i64>() else { return Http400; };',
        whyItBreaks: 'Untrusted HTTP input must return 400 Bad Request, never panic.',
      },
      {
        title: 'Trap 3: Blocking Tokio Async Runtime With Heavy Sync I/O',
        brokenCode: 'async fn api() { std::thread::sleep(...); } // Stalls thousands of requests!',
        fixedCode: '// Use tokio::task::spawn_blocking for CPU/sync file calls inside async routes.',
        whyItBreaks: 'Sync blocking starves async executor worker threads.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack JSON Contract',
        prompt: 'Parse user and xp and print valid compact JSON.',
        banglaHint: '`println!` এ ডাবল ব্রেস `{{` `}}` ব্যবহার করে JSON প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let u = it.next().unwrap(); let xp: i32 = it.next().unwrap().parse().unwrap();
    println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", u, (xp / 100) + 1);
}`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'rust-ch-15-q2',
        difficulty: 'Easy',
        title: 'REST Healthcheck Endpoint',
        prompt: 'Emit `{"ok":true}` cleanly from Rust.',
        banglaHint: '`println!("{{\\"ok\\":true}}");` লিখো।',
        starterCode: `fn main() { println!("{{\\"ok\\":true}}"); }`,
        sampleStdin: '',
        expectedOutput: '{"ok":true}',
      },
      {
        id: 'rust-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Check (tariq 50)',
        prompt: 'Confirm XP under 100 outputs level 1 cleanly.',
        banglaHint: '`50 / 100 + 1` হিসাব করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let u = it.next().unwrap(); let xp: i32 = it.next().unwrap().parse().unwrap();
    println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", u, (xp / 100) + 1);
}`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'rust-ch-15-q4',
        difficulty: 'Medium',
        title: 'Pagination Limit Clamp',
        prompt: 'Clamp requested pageSize cleanly into 1..=50.',
        banglaHint: '`.clamp(1, 50)` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let ps: i32 = s.trim().parse().unwrap_or(10);
    println!("{}", ps.clamp(1, 50));
}`,
        sampleStdin: '500',
        expectedOutput: '50',
      },
      {
        id: 'rust-ch-15-q5',
        difficulty: 'Hard',
        title: 'Zero-Panic JSON Escaper',
        prompt: 'Escape quotes cleanly before embedding user text in `{"name":"..."}`.',
        banglaHint: '`"` এর আগে `\\` বসাও।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let mut out = String::new();
    for c in s.trim().chars() { if c == '"' || c == '\\\\' { out.push('\\\\'); } out.push(c); }
    println!("{{\\"name\\":\\"{}\\"}}", out);
}`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (Rust 2024): Zero-Cost API Engine',
      description: 'Combines Rust Ch 1–15 into the memory-safe, ultra-fast API & compute engine inside the 5-Layer Architecture.',
      banglaGoal: 'Rust অধ্যায় ১–১৫ মিলিয়ে মেমোরি-নিরাপদ জিরো-কস্ট API ইঞ্জিন ক্যাপস্টোন তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let user = it.next().unwrap();
    let xp: i32 = it.next().unwrap().parse().unwrap();
    let level = (xp / 100) + 1;
    println!("{{\\"user\\":\\"{}\\",\\"level\\":{},\\"status\\":\\"OK\\"}}", user, level);
}`,
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 15 (TS 5.x): Full-Stack End-to-End API Contracts & Mega Capstone',
    banglaTitle: 'TypeScript অধ্যায় ১৫ (TS 5.x): এন্ড-টু-এন্ড API কন্ট্রাক্ট ও মেগা ক্যাপস্টোন',
    subtitle: 'Share exact ApiResponse contracts between frontend UI and backend API routes so client and server never drift out of sync.',
    zeroIntuition: {
      plainEnglishStory:
        'Why does **TypeScript** dominate modern web engineering (`Next.js`, `tRPC`, `Express`, `React`)? Because BOTH the **Browser UI (`Layer 2`)** and the **API Server (`Layer 3`)** can share the exact same `interface ApiResponse { user: string; level: number; status: "OK"; }`! If someone renames `level` on the backend, the frontend refuses to compile until updated—zero silent production mismatches.',
      asciiFlowchart: `  END-TO-END TYPESCRIPT CONTRACT (SHARED TYPES)
  Shared Contract: interface ApiResponse { user: string; level: number; status: 'OK'; }
         |                                           |
         v                                           v
  [React/TS Frontend Layer 2]  <--JSON-->  [Node/TS Backend API Layer 3]`,
      pseudocode: [
        '1. DEFINE interface ApiResponse { user: string; level: number; status: "OK"; }',
        '2. PARSE user and xpStr from stdin/request',
        '3. CONSTRUCT strictly typed res: ApiResponse object',
        '4. LOG JSON.stringify(res)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ক্লায়েন্ট ও সার্ভারের যৌথ চুক্তিনামা (Shared ApiResponse Contract)',
        explanation:
          'ধরো সার্ভার `xp_level` নাম বদলে `level` করে দিল কিন্তু ফ্রন্টএন্ড জানে না—ফলাফল: ব্রাউজারে পর্দা ফাঁকা! TypeScript ইন্টারফেস `ApiResponse` হলো এমন এক **চুক্তিনামা**, যেখানে সার্ভার ও ফ্রন্টএন্ড দুজনই সই করে থাকে। এক পাশে ফিল্ড বদলালেই অন্য পাশে লাল দাগ পড়ে যায়!',
        everydayExample:
          'এই অ্যাপের `/api/execute` ও `src/types/academy.ts` ঠিক এভাবেই টাইপ শেয়ার করে নির্ভুল কাজ করে!',
        keyTakeaways: [
          '`interface ApiResponse` শুধু ডেভেলপমেন্টের সময় টাইপ চেক করে, রানটাইমে `JSON.stringify()` প্লেইন JSON পাঠায়।',
          'নেটওয়ার্ক থেকে আসা অজানা ডেটায় রানটাইম চেক (`typeof x === "number"`) করতে কখনো ভুলবে না।',
          'স্ট্যাটাস ফিল্ডে `"OK" | "ERR"` লিটারেল টাইপ দিলে ভুল স্ট্যাটাস লেখা অসম্ভব হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed ApiResponse Contract & JSON Serialization',
        banglaNote: '`interface ApiResponse` দিয়ে টাইপড পেলোড তৈরি করে JSON আউটপুট।',
        code: `import * as fs from 'fs';

interface ApiResponse { user: string; level: number; status: 'OK'; }
const [user, xpStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: ApiResponse = { user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' };
console.log(JSON.stringify(res));`,
        stdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'ts-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Runtime Request Guard + Error Union Contract',
        banglaNote: 'ডিস্ক্রিমিনেটেড ইউনিয়ন রেজাল্ট ও রানটাইম ইনপুট ভ্যালিডেশনসহ 400 এরর রিটার্ন।',
        code: `import * as fs from 'fs';

type ApiResult = { user: string; level: number; status: 'OK' } | { error: string; status: 400 };
const [user, xpStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const xp: number = Number(xpStr);
const res: ApiResult = !user || !Number.isFinite(xp) || xp < 0
  ? { error: 'INVALID_XP', status: 400 }
  : { user, level: Math.floor(xp / 100) + 1, status: 'OK' };
console.log(JSON.stringify(res));`,
        stdin: 'arif -20',
        expectedOutput: '{"error":"INVALID_XP","status":400}',
      },
      {
        id: 'ts-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed Batch DTO Array Serializer',
        banglaNote: '`PlayerDto[]` অ্যারে সিরিয়ালাইজ করে একসাথে একাধিক ইউজার প্রোফাইল পাঠানো।',
        code: `import * as fs from 'fs';

interface PlayerDto { user: string; level: number; }
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const n: number = Number(lines[0]);
const rows: PlayerDto[] = lines.slice(1, 1 + n).map((line) => {
  const [user, xp] = line.trim().split(/\\s+/);
  return { user, level: Math.floor(Number(xp) / 100) + 1 };
});
console.log(JSON.stringify(rows));`,
        stdin: '2\nmina 150\ntariq 50',
        expectedOutput: '[{"user":"mina","level":2},{"user":"tariq","level":1}]',
      },
      {
        id: 'ts-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Type-Safe REST Route Table Dispatcher',
        banglaNote: '`Record<string, () => unknown>` দিয়ে পরিচ্ছন্ন API রাউট হ্যান্ডলার টেবিল।',
        code: `import * as fs from 'fs';

const path: string = fs.readFileSync(0, 'utf8').trim();
const routes = new Map<string, () => unknown>([
  ['/health', () => ({ ok: true })],
  ['/api/profile', () => ({ user: 'mina', level: 2 })],
]);
const fn = routes.get(path);
console.log(JSON.stringify(fn ? fn() : { error: 'NOT_FOUND', status: 404 }));`,
        stdin: '/api/profile',
        expectedOutput: '{"user":"mina","level":2}',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: "interface ApiResponse { user: string; level: number; status: 'OK'; }",
        whatItMeans: 'Defines exact JSON schema shared between API server and frontend.',
        whyItIsThere: 'Catches missing/misnamed response fields at compile time.',
        ifDeletedError: 'API DTO drifts unnoticed between client and server.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'console.log(JSON.stringify(res));',
        whatItMeans: 'Emits typed response payload as compact RFC-8259 JSON.',
        whyItIsThere: 'Guarantees safe string escaping and strict JSON formatting.',
        ifDeletedError: 'No response body sent.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse "mina 150"', memoryOrStack: 'user="mina", xpStr="150"', note: 'Strict strings' },
      { step: 2, state: 'Build ApiResponse object', memoryOrStack: '{ user:"mina", level:2, status:"OK" }', note: 'Type checked' },
      { step: 3, state: 'JSON.stringify(res)', memoryOrStack: '{"user":"mina","level":2,"status":"OK"}', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trusting `res.json()` With Blind Type Assertion',
        brokenCode: 'const user = (await res.json()) as UserDto; // Could actually be { error: "down" }!',
        fixedCode: '// Check `res.ok` and validate required fields before treating parsed JSON as UserDto.',
        whyItBreaks: 'TypeScript interfaces do not validate runtime JSON payloads from external networks.',
      },
      {
        title: 'Trap 2: Duplicating API Types Separately in Client and Server',
        brokenCode: '// Client uses { xpLevel }, Server sends { level } -> runtime undefined!',
        fixedCode: '// Place shared DTO interfaces inside one shared types module (like src/types/).',
        whyItBreaks: 'Manual copy-paste contracts drift out of sync quickly.',
      },
      {
        title: 'Trap 3: Serializing `Date` or `undefined` Assuming JSON Preserves Types',
        brokenCode: '// JSON.stringify drops keys whose value is `undefined` and converts Date to ISO string!',
        fixedCode: '// Explicitly use `null` or ISO string fields inside serialized API interfaces.',
        whyItBreaks: 'JSON only supports string, number, boolean, null, array, and object.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Typed ApiResponse Serializer',
        prompt: 'Compute level and serialize typed ApiResponse JSON.',
        banglaHint: '`interface ApiResponse` তৈরি করে `JSON.stringify(res)` লগ করো।',
        starterCode: `import * as fs from 'fs';
interface ApiResponse { user: string; level: number; status: 'OK'; }
const [user, xpStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: ApiResponse = { user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' };
console.log(JSON.stringify(res));`,
        sampleStdin: 'mina 150',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'ts-ch-15-q2',
        difficulty: 'Easy',
        title: 'Typed Healthcheck JSON',
        prompt: 'Serialize `{ ok: true }` cleanly.',
        banglaHint: '`JSON.stringify({ ok: true })` ব্যবহার করো।',
        starterCode: `console.log(JSON.stringify({ ok: true }));`,
        sampleStdin: '',
        expectedOutput: '{"ok":true}',
      },
      {
        id: 'ts-ch-15-q3',
        difficulty: 'Medium',
        title: 'Level-1 Contract Check (tariq 50)',
        prompt: 'Confirm XP under 100 resolves to level 1 cleanly.',
        banglaHint: '`Math.floor(50 / 100) + 1` হিসাব করো।',
        starterCode: `import * as fs from 'fs';
interface ApiResponse { user: string; level: number; status: 'OK'; }
const [user, xpStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: ApiResponse = { user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' };
console.log(JSON.stringify(res));`,
        sampleStdin: 'tariq 50',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
      {
        id: 'ts-ch-15-q4',
        difficulty: 'Medium',
        title: 'Pagination Bounds Clamp',
        prompt: 'Clamp requested pageSize cleanly into [1, 50].',
        banglaHint: '`Math.max(1, Math.min(50, ps))` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';
const ps: number = Number(fs.readFileSync(0, 'utf8').trim());
console.log(Math.max(1, Math.min(50, ps)));`,
        sampleStdin: '500',
        expectedOutput: '50',
      },
      {
        id: 'ts-ch-15-q5',
        difficulty: 'Hard',
        title: 'Safe JSON Escaper Endpoint',
        prompt: 'Serialize quoted string cleanly into `{"name":"..."}` JSON.',
        banglaHint: '`JSON.stringify({ name })` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';
const name: string = fs.readFileSync(0, 'utf8').trim();
console.log(JSON.stringify({ name }));`,
        sampleStdin: 'ada"lovelace',
        expectedOutput: '{"name":"ada\\"lovelace"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (TS 5.x): End-to-End Full-Stack API Contract',
      description: 'Combines TS Ch 1–15 into strict shared client–server API contracts inside the 5-Layer Architecture.',
      banglaGoal: 'TypeScript অধ্যায় ১–১৫ মিলিয়ে স্ট্রিক্ট এন্ড-টু-এন্ড ফুল-স্ট্যাক API ক্যাপস্টোন তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `import * as fs from 'fs';

interface ApiResponse { user: string; level: number; status: 'OK'; }
const [user, xpStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: ApiResponse = { user, level: Math.floor(Number(xpStr) / 100) + 1, status: 'OK' };
console.log(JSON.stringify(res));`,
      sampleStdin: 'mina 150',
      expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
    },
  },

  html: {
    title: 'HTML5 Chapter 15: Full-Stack Client–API Simulator, Website Architecture & Mega Capstone',
    banglaTitle: 'HTML5 অধ্যায় ১৫: ফুল-স্ট্যাক ক্লায়েন্ট-API সিমুলেটর ও মেগা ক্যাপস্টোন',
    subtitle: 'Unite HTML5 semantics, CSS Flexbox/Grid, interactive JS state, and backend JSON APIs into a complete Full-Stack Website Capstone.',
    zeroIntuition: {
      plainEnglishStory:
        'Everything you learned across **Chapters 1–15** snaps together right here! In a complete modern website: **HTML5** structures accessible semantics (`<main>`, `<form>`, `<button>`, `<pre>`), **CSS** creates polished responsive layout, **JS/TS** manages local state & triggers API requests, and **Backend Python/Java/Rust/C++** returns clean **JSON** that updates the DOM safely via `textContent`. Open the **Website Blueprint** tab anytime to explore all 5 layers interactively!',
      asciiFlowchart: `  THE COMPLETE WEBSITE ARCHITECTURE BLUEPRINT
  +-------------------+    1. Submit Input ("mina", 150)    +---------------------+
  |  HTML5 + CSS UI   | ==================================> |  JS/TS Event Layer  |
  +-------------------+                                     +----------+----------+
           ^                                                           | 2. HTTPS JSON
           |  4. Safe textContent DOM Update                           v
  +--------+----------+    3. level = (xp/100)+1 JSON       +---------------------+
  |  Live Rendered UI | <================================== | Backend API + Engine|
  +-------------------+   {"user":"mina","level":2,"OK"}    +---------------------+`,
      pseudocode: [
        '1. BUILD semantic <main class="panel"> card with accessible button & output <pre>',
        '2. WIRE click listener simulating REST API request with dynamic input',
        '3. COMPUTE / PARSE JSON response safely (JSON.stringify)',
        '4. RENDER formatted JSON cleanly via .textContent (XSS-proof!)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সব অধ্যায়ের মহাসম্মিলন: ১টি পূর্ণাঙ্গ ফুল-স্ট্যাক ওয়েবসাইট (Mega Capstone)',
        explanation:
          'অভিনন্দন! তুমি HTML ট্যাগ থেকে শুরু করে লেআউট, ফর্ম, DOM, Graph/Async এবং সিকিউরিটি পেরিয়ে একদম **মেগা ক্যাপস্টোন (অধ্যায় ১৫)**-এ পৌঁছে গেছো! একটি বাস্তব ওয়েবসাইটে ব্রাউজারের বাটনে ক্লিক করলে JS ব্যাকএন্ড API-তে রিকোয়েস্ট পাঠায়, Python/Java/Rust সার্ভার ডেটা প্রসেস করে JSON পাঠায়, আর HTML সেই ডেটা ইউজারের সামনে নিরাপদে দেখায়—আজ তুমি নিজের হাতেই সেই পুরো চক্রটি বানাবে!',
        everydayExample:
          'নিচের লাইভ প্রিভিউতে `Simulate Backend API Call` বাটনে ক্লিক করেই দেখো ব্রাউজার ফ্রন্টএন্ড কীভাবে ব্যাকএন্ড JSON রেসপন্স লাইভ আপডেট করে!',
        keyTakeaways: [
          '১টি প্রোডাকশন ওয়েবসাইটে ফ্রন্টএন্ড (HTML/CSS/JS) ও ব্যাকএন্ড API সব সময় JSON কন্ট্রাক্ট দিয়ে যুক্ত থাকে।',
          'ফ্রন্টএন্ডে API রেসপন্স দেখানোর সময় সব সময় `.textContent` ব্যবহার করে XSS থেকে মুক্ত থাকবে।',
          'একাডেমির **Website Blueprint** ট্যাবে গিয়ে ৫টি স্তর (HTML -> JS/TS -> API -> C/Rust Engine -> DB) এক ক্লিকেই অনুশীলন করতে পারবে!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-15-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Full-Stack Client + Backend JSON API Simulator',
        banglaNote: 'বাটনে ক্লিক করে ব্রাউজার ফ্রন্টএন্ড থেকে ব্যাকএন্ড JSON রেসপন্স লাইভ ফেচ ও প্রদর্শন।',
        code: `<!doctype html>
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
        stdin: '',
        expectedOutput: 'Full-Stack Client + API Simulator',
      },
      {
        id: 'html-15-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Interactive Form Validation -> 400 Error vs 200 OK JSON',
        banglaNote: 'ইউজারের ইনপুট যাচাই করে ভুল হলে HTTP 400 এরর আর সঠিক হলে লেভেল ক্যালকুলেশন JSON দেখানো।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <form id="apiForm" style="display:flex;gap:8px;margin-bottom:10px">
    <input id="u" value="mina" aria-label="Username" style="padding:6px;border-radius:6px;background:#0f172a;color:#fff;border:1px solid #334155"/>
    <input id="xp" type="number" value="150" aria-label="XP" style="width:80px;padding:6px;border-radius:6px;background:#0f172a;color:#fff;border:1px solid #334155"/>
    <button type="submit" style="background:#38bdf8;color:#090d16;border:none;padding:6px 12px;border-radius:6px;font-weight:700">Send API</button>
  </form>
  <pre id="res" style="background:#020617;padding:10px;border-radius:6px;color:#34d399"></pre>
  <script>
    const run = () => {
      const user = document.getElementById('u').value.trim();
      const xp = Number(document.getElementById('xp').value);
      const body = (!user || xp < 0) ? { error: 'INVALID_XP', status: 400 } : { user, level: Math.floor(xp / 100) + 1, status: 'OK' };
      document.getElementById('res').textContent = JSON.stringify(body, null, 2);
    };
    document.getElementById('apiForm').addEventListener('submit', (e) => { e.preventDefault(); run(); });
    run();
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: '"level": 2',
      },
      {
        id: 'html-15-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: 5-Layer Architecture Interactive Pipeline Diagram',
        banglaNote: 'এক ক্লিকে HTML UI -> JS -> API -> Compute -> DB লেয়ারগুলো ভিজ্যুয়ালি ট্রেস করা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3 style="margin-top:0">5-Layer Stack Tracer</h3>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font-size:12px;text-align:center">
    <div style="background:#0f172a;padding:8px;border:1px solid #38bdf8;border-radius:6px">1. HTML5</div>
    <div style="background:#0f172a;padding:8px;border:1px solid #38bdf8;border-radius:6px">2. JS/TS</div>
    <div style="background:#0f172a;padding:8px;border:1px solid #34d399;border-radius:6px">3. API</div>
    <div style="background:#0f172a;padding:8px;border:1px solid #a78bfa;border-radius:6px">4. Rust/C++</div>
    <div style="background:#0f172a;padding:8px;border:1px solid #fbbf24;border-radius:6px">5. DB/Cache</div>
  </div>
</body></html>`,
        stdin: '',
        expectedOutput: '5-Layer Stack Tracer',
      },
      {
        id: 'html-15-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Optimistic UI + Rollback Guard With LocalStorage Sync',
        banglaNote: 'সার্ভার রেসপন্স আসার আগেই UI ইনস্ট্যান্ট আপডেট করে নিরাপদে JSON সিঙ্ক।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <p id="badge" style="font-family:monospace;color:#34d399">User: mina | Level: 2 | Synced</p>
</body></html>`,
        stdin: '',
        expectedOutput: 'User: mina | Level: 2 | Synced',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 12',
        codeSnippet: '<main class="panel">',
        whatItMeans: 'Wraps the application widget inside a semantic landmark container.',
        whyItIsThere: 'Screen readers and keyboard navigation rely on `<main>` landmarks.',
        ifDeletedError: 'Accessibility audit fails semantic landmark checks.',
      },
      {
        lineNumber: 'Line 15-16',
        codeSnippet: '<button id="syncBtn">...<pre id="jsonOut">',
        whatItMeans: 'Pairs an interactive control trigger with a monospace JSON display region.',
        whyItIsThere: 'Preserves exact JSON indentation cleanly without HTML collapsing.',
        ifDeletedError: 'Button click has nowhere to render API output.',
      },
      {
        lineNumber: 'Line 21',
        codeSnippet: "document.getElementById('jsonOut').textContent = JSON.stringify(...);",
        whatItMeans: 'Renders formatted backend payload safely via textContent (XSS-proof).',
        whyItIsThere: 'Prevents attacker-controlled JSON fields from executing HTML.',
        ifDeletedError: 'Using innerHTML opens XSS vulnerabilities if API strings contain tags.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Page loads <main> UI', memoryOrStack: 'jsonOut="Click button..."', note: 'Layer 1 HTML painted' },
      { step: 2, state: 'User clicks "Simulate Backend API Call"', memoryOrStack: 'JS constructs API request', note: 'Layer 2 trigger' },
      { step: 3, state: 'Receive JSON payload', memoryOrStack: '{"user":"mina","level":2}', note: 'Layer 3/4 contract' },
      { step: 4, state: 'Set jsonOut.textContent', memoryOrStack: 'Formatted JSON rendered', note: 'Zero XSS risk' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Rendering API JSON Responses Using innerHTML',
        brokenCode: 'jsonOut.innerHTML = JSON.stringify(apiPayload); // XSS if API echoes <img onerror=...>',
        fixedCode: 'jsonOut.textContent = JSON.stringify(apiPayload, null, 2);',
        whyItBreaks: 'Any unescaped HTML inside backend strings executes inside the user session.',
      },
      {
        title: 'Trap 2: Omitting `e.preventDefault()` on API Form Submit',
        brokenCode: 'form.onsubmit = () => fetch("/api"); // Browser reloads page immediately and cancels fetch!',
        fixedCode: 'form.addEventListener("submit", (e) => { e.preventDefault(); sendApi(); });',
        whyItBreaks: 'Default HTML form submission triggers a full page navigation.',
      },
      {
        title: 'Trap 3: Hardcoding API Secrets Inside Frontend HTML/JS Files',
        brokenCode: 'const API_SECRET = "sk_live_12345"; // Anyone opening DevTools View Source steals it!',
        fixedCode: '// Keep secret keys strictly on your Layer-3 backend proxy (/api/*); expose only public tokens.',
        whyItBreaks: 'All HTML/CSS/JS sent to the browser is 100% public and readable.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-15-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Full-Stack Client + API Simulator',
        prompt: 'Render the semantic Client + API Simulator HTML page cleanly.',
        banglaHint: '`Full-Stack Client + API Simulator` হেডিং ও বাটন রেন্ডার করো।',
        starterCode: `<!doctype html><html lang="en"><head><style>body{font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px}.panel{border:1px solid #1e293b;border-radius:12px;padding:18px;background:#0f172a;max-width:460px}button{background:#38bdf8;color:#090d16;border:none;padding:8px 14px;border-radius:6px;font-weight:700;cursor:pointer}pre{background:#020617;padding:12px;border-radius:8px;color:#34d399}</style></head><body><main class="panel"><h2>Full-Stack Client + API Simulator</h2><p>HTML Structure + CSS Layout + JS State + Backend JSON Contract</p><button id="syncBtn">Simulate Backend API Call</button><pre id="jsonOut">Click button to fetch JSON payload...</pre></main><script>document.getElementById('syncBtn').addEventListener('click',()=>{document.getElementById('jsonOut').textContent=JSON.stringify({user:'mina',level:2,status:'OK'},null,2);});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Full-Stack Client + API Simulator',
      },
      {
        id: 'html-ch-15-q2',
        difficulty: 'Easy',
        title: 'Accessible Form Submit Prevention',
        prompt: 'Render a semantic form that computes JSON cleanly on load without page reload.',
        banglaHint: '`e.preventDefault()` ব্যবহার করে ফর্ম হ্যান্ডল করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><main><p id="out">Ch15 Capstone Ready</p></main></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Ch15 Capstone Ready',
      },
      {
        id: 'html-ch-15-q3',
        difficulty: 'Medium',
        title: 'Interactive Level Calculator Widget',
        prompt: 'Compute level=(xp/100)+1 in JS and render compact JSON inside <pre>.',
        banglaHint: '`textContent = JSON.stringify(...)` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><pre id="out"></pre><script>document.getElementById('out').textContent=JSON.stringify({user:'mina',level:2,status:'OK'});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: '{"user":"mina","level":2,"status":"OK"}',
      },
      {
        id: 'html-ch-15-q4',
        difficulty: 'Medium',
        title: '5-Layer Stack Architecture Cards',
        prompt: 'Render semantic 5-layer stack cards using CSS Grid.',
        banglaHint: '`grid-template-columns: repeat(5, 1fr)` লেআউট দাও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><section style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px"><div>HTML5</div><div>JS/TS</div><div>API</div><div>Rust/C++</div><div>Database</div></section></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Database',
      },
      {
        id: 'html-ch-15-q5',
        difficulty: 'Hard',
        title: 'End-to-End Safe JSON + Input Validation Panel',
        prompt: 'Validate XP >= 0, compute level, and render XSS-safe formatted JSON inside <pre>.',
        banglaHint: '`xp < 0` হলে `400` এরর JSON দেখাও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><main><pre id="apiRes"></pre></main><script>const user='tariq',xp=50;const payload=xp<0?{error:'INVALID',status:400}:{user,level:Math.floor(xp/100)+1,status:'OK'};document.getElementById('apiRes').textContent=JSON.stringify(payload);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: '{"user":"tariq","level":1,"status":"OK"}',
      },
    ],
    miniBuild: {
      title: '🔥 Mega Capstone Project (HTML5): Full-Stack Client–API Simulator & 5-Layer UI',
      description: 'Combines HTML5 Ch 1–15 (semantic UI, responsive CSS card, interactive JS state, and safe JSON contract rendering) into a live executable Full-Stack Capstone.',
      banglaGoal: 'HTML5 অধ্যায় ১–১৫-এর সব জ্ঞান মিলিয়ে লাইভ ইন্টারঅ্যাক্টিভ ফুল-স্ট্যাক ক্লায়েন্ট ও API সিমুলেটর তৈরি করা।',
      combinesChapters: 'Ch 1–15 (Mega Capstone & Website Architecture)',
      starterCode: `<!doctype html>
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
      sampleStdin: '',
      expectedOutput: 'Full-Stack Client + API Simulator',
    },
  },
};
