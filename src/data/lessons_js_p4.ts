import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JS_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'DOM Tree, Object References & Event Bubbling',
    banglaTitle: 'DOM ট্রি, অবজেক্ট রেফারেন্স ও ইভেন্ট বাবলিং (JavaScript)',
    subtitle: 'Heap object references, shallow vs structuredClone, and DOM event bubbling simulation',
    zeroIntuition: {
      plainEnglishStory:
        'In JavaScript, primitive values (`number`, `string`, `boolean`) copy cleanly by value, whereas objects, arrays, and DOM elements (`document.querySelector(...)`) are always passed and stored by reference to a single object living on the V8 heap. Assigning `const b = a` shares the exact same object identity, so mutating `b.count++` changes `a.count` immediately—which is why `structuredClone(obj)` is essential for deep independent state updates.\n\nIn the browser, the DOM itself is a live tree of nested object references where user clicks bubble upward from the inner target node (`button`) through parent containers (`card` -> `main`). Attaching one listener on a parent (Event Delegation) inspects `event.target` efficiently instead of binding hundreds of individual listeners.',
      asciiFlowchart:
        'DOM Tree (Object References):\n  <main> (delegated listener checks event.target)\n    +-- <section class="card">\n          +-- <button> (click bubbles UP: button -> card -> main)',
      pseudocode: ["node = target","while node != null:","runListeners(node, event)","if event.stopped: break","node = node.parent"],
      banglaZeroToHero: {
        analogyTitle: 'DOM হলো পরিবারের বংশবৃক্ষ, আর অবজেক্ট রেফারেন্স হলো একই ঘরের চাবি',
        explanation:
          'জাভাস্ক্রিপ্টে সংখ্যা বা স্ট্রিং কপি করলে পুরোপুরি আলাদা কপি তৈরি হয়, কিন্তু অবজেক্ট, অ্যারে বা ব্রাউজারের যেকোনো DOM এলিমেন্ট ভ্যারিয়েবলে রাখলে সেটি আসলে হিপ মেমোরির একটি রেফারেন্স ধরে রাখে। তাই `const b = a` লিখে `b.score = 99` করলে `a.score`-ও সাথে সাথে বদলে যায়; আলাদা কপি বানাতে হলে অগভীর কপিতে স্প্রেড `{ ...a }` এবং গভীর নেস্টেড অবজেক্টে `structuredClone(a)` ব্যবহার করতে হয়। ব্রাউজারে HTML পেজটি লোড হলে জাভাস্ক্রিপ্টের জন্য একটি গাছ বা DOM ট্রি তৈরি হয়—প্রতিটি ট্যাগ একটি করে অবজেক্ট নোড। কোনো ভেতরের বাটনে ক্লিক করলে সেই ক্লিক ইভেন্টটি শুধু বাটনেই থেমে থাকে না, বুদবুদের মতো ওপরের প্যারেন্ট কার্ড ও মেইন কনটেইনারের দিকে উঠতে থাকে—একেই Event Bubbling বলে। এই কারণে তালিকার ১০০টি আইটেমে আলাদা লিসেনার না লাগিয়ে প্যারেন্টে একটিমাত্র লিসেনার বসিয়ে `event.target` দেখে কাজ করাকে Event Delegation বলে, যা প্রচুর মেমোরি বাঁচায়। কোথাও বাবলিং থামাতে চাইলে `stopPropagation()` ব্যবহার করতে হয়। আজকের অধ্যায়ে রেফারেন্স অ্যালিয়াসিং, ডিপ ক্লোনিং ও DOM ইভেন্ট বাবলিংয়ের ভেতরের মেকানিক্স হাতে-কলমে শিখবে।',
        everydayExample: 'একটি ক্লাসরুমে কোনো ছাত্র হাত তুললে খবরটি তার বেঞ্চ থেকে সারির লিডার হয়ে শিক্ষকের কাছে পৌঁছায়—আবার শিক্ষক একা দাঁড়িয়ে পুরো রুমের ডাকে সাড়া দেন (Event Delegation)।',
        keyTakeaways: [
          'অবজেক্ট ও অ্যারে অ্যাসাইন করলে রেফারেন্স শেয়ার হয়; নেস্টেড স্টেটের স্বাধীন কপি বানাতে `structuredClone()` ব্যবহার করো।',
          'Event Bubbling-এ ভেতরের টার্গেট থেকে প্যারেন্টের দিকে ইভেন্ট ওঠে, আর `stopPropagation()` তা থামায়।',
          'Event Delegation প্যারেন্টে একটিমাত্র লিসেনার রেখে `event.target` দিয়ে চাইল্ড ক্লিক হ্যান্ডল করে RAM বাঁচায়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Object Reference Mutation vs. Shallow Spread Clone',
        englishParagraphs: [
          'See how `alias = state` mutates the original object while `{ ...state }` isolates top-level property edits.',
        ],
        banglaParagraphs: [
          'অবজেক্ট রেফারেন্স শেয়ার বনাম `{ ...state }` কপি কীভাবে কাজ করে তা সরাসরি রান করে দেখো।',
        ],
        memoryDiagram: 'alias === state (true) | copy === state (false)',
        code: `const state = { clicks: 1, tag: 'nav' };\nconst alias = state;\nconst copy = { ...state };\nalias.clicks += 4;\ncopy.tag = 'modal';\nconsole.log(state.clicks, state.tag, copy.tag, state === alias);`,
        stdin: '',
        expectedOutput: '5 nav modal true',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"const alias = state;","whatItMeans":"Points `alias` to exact same heap object as `state`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`alias` is undefined."},
          {"lineNumber":"Line 3","codeSnippet":"const copy = { ...state };","whatItMeans":"Allocates separate object with cloned top-level fields.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`copy` is undefined."},
          {"lineNumber":"Line 4","codeSnippet":"alias.clicks += 4;","whatItMeans":"Updates shared `state.clicks` to `5`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`state.clicks` stays `1`."},
        ],
      },
      {
        id: 'js-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Deep Cloning Nested Configs with structuredClone',
        englishParagraphs: [
          'Shallow spread copies only top-level keys; nested arrays remain shared unless duplicated with `structuredClone` before applying input edits.',
        ],
        banglaParagraphs: [
          'নেস্টেড অ্যারে বা অবজেক্ট থাকলে শ্যালো কপিতেও মূল ডেটা বদলে যায়—এখানে `structuredClone` কীভাবে রক্ষা করে তা দেখো।',
        ],
        memoryDiagram: 'structuredClone(cfg) isolates nested cfg.items array',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst addVal = Number(raw.trim());\nconst orig = { meta: { active: true }, items: [10, 20] };\nconst draft = structuredClone(orig);\ndraft.items.push(addVal);\nconsole.log(orig.items.length + ' ' + draft.items.join(','));`,
        stdin: '30',
        expectedOutput: '2 10,20,30',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"const draft = structuredClone(orig);","whatItMeans":"Recursively duplicates nested objects and arrays cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Shallow `{ ...orig }` shares `items` with `orig`."},
          {"lineNumber":"Line 6","codeSnippet":"draft.items.push(addVal);","whatItMeans":"Mutates only `draft.items` leaving `orig.items.length === 2`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Draft does not receive `addVal`."},
        ],
      },
      {
        id: 'js-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'DOM Tree Event Bubbling & stopPropagation Simulator',
        englishParagraphs: [
          'Model a parent-linked DOM tree (`btn -> card -> root`) and trace click propagation upward until an ancestor stops bubbling or reaches root.',
        ],
        banglaParagraphs: [
          'প্যারেন্ট লিংকযুক্ত DOM নোড ট্রিতে বাটন ক্লিক কীভাবে ওপরের দিকে বাবল হয়ে ওঠে তা সিমুলেট করো।',
        ],
        memoryDiagram: 'btn.parent -> card.parent -> main -> null',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst stopAt = raw.trim();\nconst root = { id: 'main', parent: null };\nconst card = { id: 'card', parent: root };\nconst btn = { id: 'btn', parent: card };\nconst trail = [];\nlet cur = btn;\nwhile (cur !== null) {\n  trail.push(cur.id);\n  if (cur.id === stopAt) break;\n  cur = cur.parent;\n}\nconsole.log(trail.join(' -> '));`,
        stdin: 'card',
        expectedOutput: 'btn -> card',
        lineByLine: [
          {"lineNumber":"Line 9","codeSnippet":"while (cur !== null) {","whatItMeans":"Walks upward along DOM `parent` object references.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Event never bubbles to ancestors."},
          {"lineNumber":"Line 11","codeSnippet":"  if (cur.id === stopAt) break;","whatItMeans":"Simulates `event.stopPropagation()` halting further bubbling.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Event always bubbles all the way to `main`."},
        ],
      },
      {
        id: 'js-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Event Delegation Lookup Over Many Child Nodes',
        englishParagraphs: [
          'Rather than allocating N listener closures per list button, inspect the dispatched `target` against a parent handler map in O(1).',
        ],
        banglaParagraphs: [
          'প্রতিটি চাইল্ডে আলাদা ফাংশন না বসিয়ে প্যারেন্ট ডেলিগেশন হ্যান্ডলার থেকে `target` দেখে এক জায়গায় কাজ করো।',
        ],
        memoryDiagram: 'parent.onClick(target) -> resolves closest action handler',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst actions = { save: 10, delete: -5, share: 3 };\nlet score = 0;\nfor (const evt of raw.trim().split(/\\s+/)) {\n  if (Object.prototype.hasOwnProperty.call(actions, evt)) score += actions[evt];\n}\nconsole.log(score);`,
        stdin: 'save share delete save',
        expectedOutput: '18',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"const actions = { save: 10, delete: -5, share: 3 };","whatItMeans":"Central delegation lookup table replacing N child callbacks.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Delegated action scores missing."},
          {"lineNumber":"Line 6","codeSnippet":"  if (Object.prototype.hasOwnProperty.call(actions, evt)) score += actions[evt];","whatItMeans":"Safely dispatches only recognized action names.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prototype keys could pollute lookup."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"const state = { clicks: 1, tag: 'nav' };","whatItMeans":"Allocates object on V8 heap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`state` undefined."},
      {"lineNumber":"Line 2","codeSnippet":"const alias = state;","whatItMeans":"Creates alias pointing to same heap object.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`alias` undefined."},
      {"lineNumber":"Line 3","codeSnippet":"const copy = { ...state };","whatItMeans":"Creates separate shallow object copy.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`copy` undefined."},
      {"lineNumber":"Line 4","codeSnippet":"alias.clicks += 4;","whatItMeans":"Modifies `state.clicks` to 5 through alias.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`clicks` stays 1."},
      {"lineNumber":"Line 6","codeSnippet":"console.log(state.clicks, state.tag, copy.tag, state === alias);","whatItMeans":"Prints updated state and identity check.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output."},
    ],
    dryRunTable: [
      { step: 1, state: 'state = {clicks:1, tag:"nav"}', memoryOrStack: 'HeapObj#1', note: 'Primary reference created' },
      { step: 2, state: 'alias = state', memoryOrStack: 'alias -> HeapObj#1', note: 'Reference shared' },
      { step: 3, state: 'copy = {...state}', memoryOrStack: 'copy -> HeapObj#2', note: 'Distinct object allocated' },
      { step: 4, state: 'alias.clicks += 4', memoryOrStack: 'HeapObj#1.clicks = 5', note: 'Prints 5 nav modal true' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Assuming `{ ...obj }` Clones Nested Arrays/Objects',
        brokenCode: 'const copy = { ...user }; copy.roles.push("admin"); // mutates user.roles too!',
        fixedCode: 'const copy = structuredClone(user); copy.roles.push("admin");',
        whyItBreaks: 'Spread syntax performs a shallow copy only, leaving nested references linked.',
      },
      {
        title: 'Trap 2: Mutating Parameter Object Unintentionally in Pure Helper',
        brokenCode: 'function activate(u) { u.active = true; return u; }',
        fixedCode: 'function activate(u) { return { ...u, active: true }; }',
        whyItBreaks: 'Mutating the reference changes caller state globally, breaking React/state predictability.',
      },
      {
        title: 'Trap 3: Comparing Object Values with `===`',
        brokenCode: 'console.log({ id: 1 } === { id: 1 }); // false!',
        fixedCode: 'console.log(a.id === b.id); // true',
        whyItBreaks: '`===` checks heap reference identity on objects, not deep field equality.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch16-p1',
        difficulty: 'Easy',
        title: 'Immutable State Patcher',
        prompt: 'Write `patchScore(obj, delta)` that returns a new object with `score + delta` without mutating the original object.',
        banglaHint: '`return { ...obj, score: obj.score + delta };` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [s, d] = raw.trim().split(/\\s+/).map(Number);\nfunction patchScore(obj, delta) { return { ...obj, score: obj.score + delta }; }\nconst orig = { score: s };\nconst next = patchScore(orig, d);\nconsole.log(orig.score + ' ' + next.score);`,
        sampleStdin: '10 5',
        expectedOutput: '10 15',
      },
      {
        id: 'js-ch16-p2',
        difficulty: 'Easy',
        title: 'Identity vs. Content Audit',
        prompt: 'Given two numbers `a b`, create two objects `{ v: a }` and `{ v: b }`, and print `SAME_VAL` or `DIFF` (never rely on `===` object identity).',
        banglaHint: 'অবজেক্টের `.v` ফিল্ড তুলনা করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/).map(Number);\nconst o1 = { v: a }, o2 = { v: b };\nconsole.log(o1.v === o2.v ? 'SAME_VAL' : 'DIFF');`,
        sampleStdin: '7 7',
        expectedOutput: 'SAME_VAL',
      },
      {
        id: 'js-ch16-p3',
        difficulty: 'Medium',
        title: 'Deep Clone Nested Matrix Snapshot',
        prompt: 'Create a 2x2 matrix from 4 stdin ints, deep-clone it, multiply `clone[1][1]` by `10`, and print `orig[1][1] clone[1][1]`.',
        banglaHint: '`structuredClone(grid)` ব্যবহার করলে মূল গ্রিড অক্ষত থাকে।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b, c, d] = raw.trim().split(/\\s+/).map(Number);\nconst grid = [[a, b], [c, d]];\nconst clone = structuredClone(grid);\nclone[1][1] *= 10;\nconsole.log(grid[1][1] + ' ' + clone[1][1]);`,
        sampleStdin: '1 2 3 4',
        expectedOutput: '4 40',
      },
      {
        id: 'js-ch16-p4',
        difficulty: 'Medium',
        title: 'DOM Node Ancestor Depth Counter',
        prompt: 'Given `n` nodes with parent indices (`-1` for root) and a target node `t`, count how many steps an event bubbles up including `t` and root.',
        banglaHint: '`while (cur !== -1) { cnt++; cur = parent[cur]; }` চালিয়ে বাবল ধাপ গোনো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], target = nums[1];\nconst parent = nums.slice(2, 2 + n);\nlet cur = target, steps = 0;\nwhile (cur !== -1) { steps++; cur = parent[cur]; }\nconsole.log(steps);`,
        sampleStdin: '4 3\n-1 0 1 2',
        expectedOutput: '4',
      },
      {
        id: 'js-ch16-p5',
        difficulty: 'Hard',
        title: 'DOM Tree QuerySelector by Class Match',
        prompt: 'Represent a small node tree (`{ tag, cls, children }`), collect all `tag` names whose `cls` matches target class in pre-order DFS.',
        banglaHint: 'রিকার্সনে প্রতিটি নোডের `cls === target` হলে `out.push(node.tag)` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst want = raw.trim();\nconst dom = { tag: 'main', cls: 'wrap', children: [\n  { tag: 'h1', cls: 'title', children: [] },\n  { tag: 'button', cls: 'btn', children: [] },\n  { tag: 'a', cls: 'btn', children: [] }\n]};\nconst found = [];\nfunction walk(n) {\n  if (n.cls === want) found.push(n.tag);\n  for (const ch of n.children) walk(ch);\n}\nwalk(dom);\nconsole.log(found.join(' '));`,
        sampleStdin: 'btn',
        expectedOutput: 'button a',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Virtual DOM Dispatcher & Immutable Store Snapshots',
      description: 'Combine tree bubbling with `structuredClone` snapshots to dispatch delegated UI commands and preserve undo history.',
      banglaGoal: 'DOM ইভেন্ট বাবলিং ও `structuredClone` স্ন্যাপশট একসাথে জুড়ে একটি ভার্চুয়াল স্টেট ডিসপ্যাচার তৈরি করো।',
      combinesChapters: "Ch 11, 15, 16",
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst cmds = raw.trim().split(/\\s+/);\nconst state = { count: 0, log: [] };\nconst initSnap = structuredClone(state);\nfor (const c of cmds) {\n  if (c === 'inc') { state.count++; state.log.push('+'); }\n  else if (c === 'dec') { state.count--; state.log.push('-'); }\n}\nconsole.log(initSnap.count + ' -> ' + state.count + ' (' + state.log.join('') + ')');`,
      sampleStdin: 'inc inc dec inc',
      expectedOutput: '0 -> 2 (++-+)',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst cmds = raw.trim().split(/\\s+/);\nconst state = { count: 0, log: [] };\nconst initSnap = structuredClone(state);\nfor (const c of cmds) {\n  if (c === 'inc') { state.count++; state.log.push('+'); }\n  else if (c === 'dec') { state.count--; state.log.push('-'); }\n}\nconsole.log(initSnap.count + ' -> ' + state.count + ' (' + state.log.join('') + ')');`,
    sampleStdin: 'inc inc dec inc',
    expectedSampleOutput: '0 -> 2 (++-+)',
    testCases: [
      { id: 'js16-t1', input: 'inc inc dec inc', expectedOutput: '0 -> 2 (++-+)' },
      { id: 'js16-t2', input: 'dec dec', expectedOutput: '0 -> -2 (--)', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'Heap vs. Stack Memory, Closures & Garbage Collection in JS',
    banglaTitle: 'হিপ বনাম স্ট্যাক, ক্লোজার ও গার্বেজ কালেকশন (JavaScript)',
    subtitle: 'V8 Call Stack, Heap closures, Mark-and-Sweep GC, and WeakMap memory safety',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript engines (like V8 in Chrome and Node.js) keep local primitive variables and function execution frames on the fast Call Stack, while objects, arrays, and function closures live on the Heap. Normally a stack frame vanishes when its function returns, but if an inner function (a closure) still holds a reference to an outer variable, V8 lifts that variable to a heap context so it survives.\n\nV8’s Mark-and-Sweep Garbage Collector periodically walks from global/stack roots and frees any unreachable heap objects. Hidden leaks happen when forgotten event listeners, timers, or unbounded `Map` caches pin giant objects permanently—whereas `WeakMap` holds weak object keys that vanish automatically once the object itself is discarded.',
      asciiFlowchart:
        'Call Stack [ main() ] --ref--> Heap Closure [ count = 2 ]\nGlobal Root -> [ Active Cache ] (Kept by Mark-and-Sweep)\nDetached Object (No path from Root) -> Swept & Freed!',
      pseudocode: ["function makeCounter():","let c = 0   // hoisted to Heap closure because inner fn uses it","return () => ++c"],
      banglaZeroToHero: {
        analogyTitle: 'রাস্তার পরিচ্ছন্নতাকর্মীর মতো Mark-and-Sweep আর ক্লোজার হলো ঝুলন্ত ব্যাগ',
        explanation:
          'জাভাস্ক্রিপ্টের V8 ইঞ্জিনে প্রিমিটিভ মান ও ফাংশন কল ফ্রেম থাকে দ্রুতগতির কল স্ট্যাকে, আর অ্যারে, অবজেক্ট ও ফাংশন থাকে হিপ মেমোরিতে। সাধারণত ফাংশন রিটার্ন করলেই স্ট্যাক ফ্রেম মুছে যায়, কিন্তু কোনো ভেতরের ফাংশন (Closure) যদি বাইরের ভ্যারিয়েবলকে মনে রাখে, তাহলে V8 সেই ভ্যারিয়েবলটিকে হিপে সরিয়ে রাখে যেন ফাংশন শেষ হলেও মানটি টিকে থাকে। অব্যবহৃত হিপ মেমোরি পরিষ্কার করে Mark-and-Sweep গার্বেজ কালেক্টর: এটি স্ট্যাক ও গ্লোবাল রুট থেকে যেসব অবজেক্টে পৌঁছানো যায় তাদের মার্ক করে, আর বাকি সব পরিত্যক্ত অবজেক্ট ঝেঁটিয়ে পরিষ্কার করে দেয়। কিন্তু অসাবধানতাবশত বিশাল ক্যাশ অ্যারে বা ভুলে যাওয়া ইভেন্ট লিসেনার রেখে দিলে GC সেই মেমোরি মুক্ত করতে পারে না—একেই মেমোরি লিক বলে। কোনো অবজেক্টের সাথে অতিরিক্ত মেটাডেটা জুড়তে হলে সাধারণ `Map`-এর বদলে `WeakMap` ব্যবহার করলে মূল অবজেক্ট মুছে যাওয়ার সাথে সাথেই ক্যাশ থেকেও তা নিজে থেকেই অদৃশ্য হয়ে যায়। এছাড়া `Array.from` বা ইটারেটর জেনারেটর (`function*`) ব্যবহার করে অযথা বড় ইন্টারমিডিয়েট অ্যারে না বানিয়েও হিপের চাপ কমানো যায়। এই অধ্যায়ে ক্লোজার, জেনারেটর ও GC-বান্ধব কোড লেখা শিখবে।',
        everydayExample: 'বাড়ির কোনো জিনিস ব্যবহারে থাকলে ট্যাগ লাগিয়ে রাখা (Mark) আর যেগুলোর কোনো মালিক বা সুতো বাঁধা নেই সেগুলো ফেলে দেওয়া (Sweep)।',
        keyTakeaways: [
          'Closure ভেতরের ফাংশনের মাধ্যমে বাইরের স্কোপের ভ্যারিয়েবলকে হিপে জীবিত রাখে।',
          'সাধারণ `Map` অবজেক্ট কী-কে ধরে রেখে মেমোরি লিক করতে পারে; মেটাডেটার জন্য `WeakMap` নিরাপদ।',
          'অপ্রয়োজনীয় `timer`, গ্লোবাল অ্যারে বা বড় ক্লোজার স্কোপ ক্যাপচার করে রাখলে GC তা পরিষ্কার করতে পারে না।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Heap-Lifted Closure State Beyond Stack Return',
        englishParagraphs: [
          'Create two independent counters with `makeCounter()`. Even after `makeCounter` pops off the call stack, each closure keeps its private `n` alive on the heap.',
        ],
        banglaParagraphs: [
          'একটি ফাংশন রিটার্ন করে যাওয়ার পরও ক্লোজার কীভাবে হিপে নিজস্ব প্রাইভেট স্টেট ধরে রাখে তা দেখো।',
        ],
        memoryDiagram: 'c1 -> HeapContext{n:2} | c2 -> HeapContext{n:1}',
        code: `function makeCounter(start) {\n  let n = start;\n  return () => ++n;\n}\nconst a = makeCounter(10);\nconst b = makeCounter(0);\nconsole.log(a(), a(), b());`,
        stdin: '',
        expectedOutput: '11 12 1',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"  let n = start;","whatItMeans":"Captured by inner arrow function, so V8 stores `n` in a heap Context.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`n` undefined inside arrow."},
          {"lineNumber":"Line 3","codeSnippet":"  return () => ++n;","whatItMeans":"Returns closure referencing that instance’s private `n`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function returns `undefined`."},
        ],
      },
      {
        id: 'js-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Lazy Generator Function vs. Eager Array Buffer',
        englishParagraphs: [
          'A generator (`function*`) pauses stack execution at `yield` and resumes on demand, letting you sum filtered values in `O(1)` extra heap space.',
        ],
        banglaParagraphs: [
          '`function*` ও `yield` ব্যবহার করে অতিরিক্ত অ্যারে না বানিয়েই ইনপুট স্ট্রিম প্রসেস করো।',
        ],
        memoryDiagram: 'function* stream -> yields 1 item at a time -> O(1) RAM',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nfunction* positives(nums) {\n  for (const x of nums) {\n    if (x > 0) yield x * x;\n  }\n}\nconst nums = raw.trim().split(/\\s+/).map(Number);\nlet sum = 0;\nfor (const sq of positives(nums)) sum += sq;\nconsole.log(sum);`,
        stdin: '-3 2 0 4 -1 5',
        expectedOutput: '45',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"function* positives(nums) {","whatItMeans":"Declares lazy generator emitting values without buffering an array.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Generator unavailable."},
          {"lineNumber":"Line 5","codeSnippet":"    if (x > 0) yield x * x;","whatItMeans":"Yields one squared positive value on each `for..of` pull.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nothing yielded."},
        ],
      },
      {
        id: 'js-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'WeakMap Metadata Without Preventing Garbage Collection',
        englishParagraphs: [
          'Attach request metadata to an object using `WeakMap` so dropping references to that object allows GC to reclaim both the object and its cached metadata.',
        ],
        banglaParagraphs: [
          '`WeakMap` দিয়ে কোনো অবজেক্টের সাথে প্রাইভেট মেটাডেটা যুক্ত করো যেন অবজেক্ট মুছলে মেটাডেটাও লিক না করে।',
        ],
        memoryDiagram: 'WeakMap(obj -> meta) holds weak key ref (GC-safe)',
        code: `const meta = new WeakMap();\nlet userA = { name: 'Rafi' };\nlet userB = { name: 'Nadia' };\nmeta.set(userA, { hits: 3 });\nmeta.set(userB, { hits: 8 });\nconsole.log(meta.get(userA).hits + meta.get(userB).hits);\nuserA = null;\nconsole.log(meta.has(userB));`,
        stdin: '',
        expectedOutput: '11\ntrue',
        lineByLine: [
          {"lineNumber":"Line 1","codeSnippet":"const meta = new WeakMap();","whatItMeans":"Holds weak object-keyed associations that do not block GC.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Strong `Map` pins objects forever unless manually deleted."},
          {"lineNumber":"Line 7","codeSnippet":"userA = null;","whatItMeans":"Clears sole strong reference so `userA` and its entry become GC-eligible.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Reference stays pinned."},
        ],
      },
      {
        id: 'js-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Pre-Allocated Array Join vs. Loop String Churn',
        englishParagraphs: [
          'Collecting tokens in a single array and joining once avoids churning thousands of intermediate heap strings in tight loops.',
        ],
        banglaParagraphs: [
          'লুপের ভেতরে `+=` করে স্ট্রিং গার্বেজ না বাড়িয়ে অ্যারেতে পুশ করে একবারে `.join("")` করো।',
        ],
        memoryDiagram: 'parts.push(tok) + parts.join("-") -> low GC churn',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst parts = [];\nfor (let i = 1; i <= n; i++) parts.push('#' + i);\nconsole.log(parts.join('-'));`,
        stdin: '4',
        expectedOutput: '#1-#2-#3-#4',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"const parts = [];","whatItMeans":"Collects chunks into a single backing buffer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output buffer."},
          {"lineNumber":"Line 6","codeSnippet":"console.log(parts.join('-'));","whatItMeans":"Allocates final formatted string once.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nothing printed."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"function makeCounter(start) {","whatItMeans":"Creates outer factory scope.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`makeCounter` undefined."},
      {"lineNumber":"Line 2","codeSnippet":"  let n = start;","whatItMeans":"Promoted to heap closure context.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`n` undeclared."},
      {"lineNumber":"Line 3","codeSnippet":"  return () => ++n;","whatItMeans":"Closure retains heap access to `n`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Counter callable missing."},
      {"lineNumber":"Line 7","codeSnippet":"console.log(a(), a(), b());","whatItMeans":"Invokes separate closures showing isolated heap counters.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output."},
    ],
    dryRunTable: [
      { step: 1, state: 'a = makeCounter(10)', memoryOrStack: 'a -> Closure{n:10}', note: 'Stack frame pops; n stays on heap' },
      { step: 2, state: 'b = makeCounter(0)', memoryOrStack: 'b -> Closure{n:0}', note: 'Separate heap context created' },
      { step: 3, state: 'a(), a()', memoryOrStack: 'a.n becomes 12', note: 'Returns 11, then 12' },
      { step: 4, state: 'b()', memoryOrStack: 'b.n becomes 1', note: 'Independent state outputs 11 12 1' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Unbounded Strong `Map` Cache Holding Dead Objects',
        brokenCode: 'const cache = new Map(); // holds DOM/session objects forever -> OOM leak',
        fixedCode: 'const cache = new WeakMap(); // auto-evicts when key object is dropped',
        whyItBreaks: 'Strong references inside `Map` prevent Mark-and-Sweep from reclaiming unused objects.',
      },
      {
        title: 'Trap 2: Shared `var` Closure Loop Bug',
        brokenCode: 'const fns = []; for (var i = 0; i < 3; i++) fns.push(() => i);',
        fixedCode: 'const fns = []; for (let i = 0; i < 3; i++) fns.push(() => i);',
        whyItBreaks: '`var` shares one function-scoped slot (all closures print `3`), while `let` creates a fresh binding per iteration.',
      },
      {
        title: 'Trap 3: Large Closure Capturing Unneeded Heavy Objects',
        brokenCode: 'function setup() { const huge = new Array(1e6); return () => console.log("hi"); }',
        fixedCode: 'function setup() { { const huge = new Array(1e6); } return () => console.log("hi"); }',
        whyItBreaks: 'Shared closure contexts in the same function scope can accidentally retain large objects.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch17-p1',
        difficulty: 'Easy',
        title: 'Closure Step Accumulator',
        prompt: 'Write `makeAdder(start)` returning a function `add(x)` that adds `x` into closure state and returns the running total.',
        banglaHint: '`let total = start; return (x) => { total += x; return total; };` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nfunction makeAdder(start) {\n  let total = start;\n  return (x) => { total += x; return total; };\n}\nconst add = makeAdder(nums[0]);\nconst out = [];\nfor (let i = 1; i < nums.length; i++) out.push(add(nums[i]));\nconsole.log(out.join(' '));`,
        sampleStdin: '10 3 7 5',
        expectedOutput: '13 20 25',
      },
      {
        id: 'js-ch17-p2',
        difficulty: 'Easy',
        title: 'Lazy Generator Fibonacci Sum',
        prompt: 'Write a `function* fib(k)` generator yielding the first `k` Fibonacci numbers (`0, 1, 1, 2, ...`) and print their sum.',
        banglaHint: '`yield a` এবং `[a, b] = [b, a + b]` দিয়ে ক্লিন জেনারেটর বানাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst k = Number(raw.trim());\nfunction* fib(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) { yield a; const t = a + b; a = b; b = t; }\n}\nlet s = 0;\nfor (const v of fib(k)) s += v;\nconsole.log(s);`,
        sampleStdin: '6',
        expectedOutput: '12',
      },
      {
        id: 'js-ch17-p3',
        difficulty: 'Medium',
        title: 'Block-Scoped `let` Closure Array',
        prompt: 'Push `n` closures returning their exact index `0..n-1` into an array and print the combined output.',
        banglaHint: 'লুপে অবশ্যই `var`-এর বদলে `let i = 0` ব্যবহার করবে।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst fns = [];\nfor (let i = 0; i < n; i++) fns.push(() => i * 2);\nconsole.log(fns.map((fn) => fn()).join(' '));`,
        sampleStdin: '4',
        expectedOutput: '0 2 4 6',
      },
      {
        id: 'js-ch17-p4',
        difficulty: 'Medium',
        title: 'WeakMap Private Object Tagging',
        prompt: 'Store secret scores in a `WeakMap` for two temporary objects, sum their scores, and print the result.',
        banglaHint: '`secrets.set(obj, val)` ব্যবহার করে প্রাইভেট ডেটা রাখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [x, y] = raw.trim().split(/\\s+/).map(Number);\nconst secrets = new WeakMap();\nconst o1 = { id: 1 }, o2 = { id: 2 };\nsecrets.set(o1, x);\nsecrets.set(o2, y);\nconsole.log(secrets.get(o1) + secrets.get(o2));`,
        sampleStdin: '14 28',
        expectedOutput: '42',
      },
      {
        id: 'js-ch17-p5',
        difficulty: 'Hard',
        title: 'Fixed-Size Sliding Ring Buffer (Bounded Heap)',
        prompt: 'Process `m` numbers into a fixed-length `k` array (`buf[i % k] = x`) so memory never exceeds `k` slots, and print the sum of final retained elements.',
        banglaHint: '`buf[i % k] = x` দিয়ে পুরোনো স্লট ওভাররাইট করলে হিপ সাইজ স্থির থাকে।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst k = nums[0];\nconst arr = nums.slice(1);\nconst buf = new Array(k).fill(0);\nfor (let i = 0; i < arr.length; i++) buf[i % k] = arr[i];\nlet sum = 0;\nfor (const v of buf) sum += v;\nconsole.log(sum);`,
        sampleStdin: '3 1 2 3 10 20',
        expectedOutput: '33',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Bounded Closure Metrics Stream',
      description: 'Combine a lazy `function*` filter with a closure accumulator to compute positive count and total in O(1) extra memory.',
      banglaGoal: 'জেনারেটর এবং ক্লোজার অ্যাকিউমুলেটর মিলিয়ে O(1) অতিরিক্ত মেমোরিতে স্ট্রিম এগ্রিগেটর বানাও।',
      combinesChapters: "Ch 9, 15, 17",
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nfunction* validEvents(nums) {\n  for (const x of nums) if (x > 0) yield x;\n}\nfunction makeStats() {\n  let cnt = 0, sum = 0;\n  return {\n    push: (x) => { cnt++; sum += x; },\n    read: () => cnt + ':' + sum,\n  };\n}\nconst stats = makeStats();\nfor (const v of validEvents(raw.trim().split(/\\s+/).map(Number))) stats.push(v);\nconsole.log(stats.read());`,
      sampleStdin: '-5 10 0 15 20',
      expectedOutput: '3:45',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nfunction* validEvents(nums) {\n  for (const x of nums) if (x > 0) yield x;\n}\nfunction makeStats() {\n  let cnt = 0, sum = 0;\n  return {\n    push: (x) => { cnt++; sum += x; },\n    read: () => cnt + ':' + sum,\n  };\n}\nconst stats = makeStats();\nfor (const v of validEvents(raw.trim().split(/\\s+/).map(Number))) stats.push(v);\nconsole.log(stats.read());`,
    sampleStdin: '-5 10 0 15 20',
    expectedSampleOutput: '3:45',
    testCases: [
      { id: 'js17-t1', input: '-5 10 0 15 20', expectedOutput: '3:45' },
      { id: 'js17-t2', input: '1 2 3 -9', expectedOutput: '3:6', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'ES2025 Classes, #private Fields & Encapsulation in JavaScript',
    banglaTitle: 'ক্লাস, #private ফিল্ড ও এনক্যাপসুলেশন (JavaScript)',
    subtitle: 'True runtime #private fields, getters/setters, static factories, and method binding traps',
    zeroIntuition: {
      plainEnglishStory:
        'Historically JavaScript used a leading underscore `_bal` by gentleman’s agreement to signal private properties—anyone could still overwrite `wallet._bal = -500`. Modern ES2025 provides true language-enforced `#bal` private fields: accessing `wallet.#bal` outside the class throws a SyntaxError before execution even starts!\n\nPair `#private` fields with `constructor` invariant checks, clean `get` accessors, and `static` factory methods, while remembering never to detach methods without arrow binding because detached methods lose `this`.',
      asciiFlowchart:
        'class Wallet { #bal = 0; }\n  w.deposit(50)  --> validates > 0 -> #bal = 50\n  w.#bal         --> SyntaxError! Truly private at runtime!',
      pseudocode: [
        '1. DECLARE #field inside class body for hard runtime privacy',
        '2. GUARD initial state in constructor and validate inside mutators',
        '3. EXPOSE read-only state via get propertyName()',
      ],
      banglaZeroToHero: {
        analogyTitle: 'আগে ছিল মৌখিক নিষেধ (`_bal`), এখন আসল স্টিলের তালা (`#bal`)',
        explanation:
          'পুরোনো জাভাস্ক্রিপ্টে কোনো প্রোপার্টি গোপন রাখতে নামের আগে আন্ডারস্কোর `_bal` লেখা হতো, কিন্তু বাইরের কোড চাইলে তখনও `obj._bal = -100` করে সব ভণ্ডুল করে দিতে পারত! আধুনিক ES2025-এ হ্যাশট্যাগ প্রাইভেট ফিল্ড (`#bal`) যোগ হওয়ায় ক্লাসের বাইরে থেকে `obj.#bal` লিখলেই প্রোগ্রাম চালানোর আগেই SyntaxError ধরে দেয়—এটাই আসল রানটাইম এনক্যাপসুলেশন। কনস্ট্রাক্টরের ভেতর প্রাথমিক মান যাচাই করে নিলে অবজেক্ট তৈরি হওয়া মাত্রই বৈধ অবস্থায় থাকে। পড়া সহজ করতে `get balance()` গেটার ব্যবহার করা যায়, যাতে বাইরের কোড `w.balance` হিসেবে মান পড়তে পারে কিন্তু সরাসরি বদলাতে না পারে। আরেকটি বড় বিষয় হলো `this` বাইন্ডিং: কোনো অবজেক্টের মেথডকে `const fn = w.deposit` হিসেবে আলাদা করে নিলে কল করার সময় `this` হারিয়ে `undefined` হয়ে যায়! সেজন্য কলব্যাক হিসেবে পাঠালে অ্যারো ফাংশন `() => w.deposit(x)` ব্যবহার করতে হয়। `static` মেথড পুরো ক্লাসের জন্য কাজ করে, আলাদা ইনস্ট্যান্স ছাড়াই কল করা যায়। এই অধ্যায়ে `#private` এনক্যাপসুলেশন ও নিরাপদ `this` ব্যবহার শিখবে।',
        everydayExample: 'আগে লাইব্রেরির রেজিস্টারে "স্পর্শ নিষেধ" স্টিকার ছিল, আর `#private` হলো কাঁচের ভেতর তালাবদ্ধ সিন্দুক।',
        keyTakeaways: [
          'আসল প্রাইভেসির জন্য ক্লাস বডির শুরুতে `#field` ডিক্লেয়ার করো; কনস্ট্রাক্টরের ভেতরে নতুন করে তৈরি করা যায় না।',
          'মেথড ডিটাচ (`const fn = obj.method`) করলে `this` হারিয়ে যায়—কলব্যাকে অ্যারো ফাংশন ব্যবহার করো।',
          'ডিবাগ/ভ্যালিডেশন ছাড়া বাইরের কোডকে সরাসরি `#field` বদলাতে দেবে না।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch18-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'True #private State & Guarded Mutators',
        englishParagraphs: [
          'Protect `#count` inside `SafeCounter` so `sub(d)` rejects invalid drops cleanly.',
        ],
        banglaParagraphs: [
          '`#count` প্রাইভেট ফিল্ড ব্যবহার করে নিশ্চিত করো কাউন্টার কখনো শূন্যের নিচে না নামে।',
        ],
        memoryDiagram: 'SafeCounter(3) -> #count=3 -> sub(2)->1 -> sub(5)->false',
        code: `class SafeCounter {
  #count;
  constructor(start = 0) {
    this.#count = Math.max(0, start);
  }
  sub(d) {
    if (d <= 0 || d > this.#count) return false;
    this.#count -= d;
    return true;
  }
  get value() {
    return this.#count;
  }
}
const c = new SafeCounter(3);
console.log(c.sub(2), c.sub(5), c.value);`,
        stdin: '',
        expectedOutput: 'true false 1',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: '#count;', whatItMeans: 'Declares hard runtime-private field on each instance.', whyItIsThere: 'Blocks external `c.#count = -9` tampering.', ifDeletedError: 'SyntaxError referencing undeclared `#count`.' },
          { lineNumber: 'Line 11', codeSnippet: 'get value() { return this.#count; }', whatItMeans: 'Read-only getter accessor exposing safe copy of `#count`.', whyItIsThere: 'Lets callers read `c.value` without setter write access.', ifDeletedError: '`c.value` is undefined.' },
        ],
      },
      {
        id: 'js-ch18-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Encapsulated Wallet Ledger From Stdin',
        englishParagraphs: [
          'Process `D x` and `W x` transactions from stdin inside a `Wallet` class enforcing non-negative balance invariants.',
        ],
        banglaParagraphs: [
          'স্ট্যান্ডার্ড ইনপুট থেকে `D` ও `W` লেনদেন পড়ে `Wallet` ক্লাসের নিরাপদ ব্যালেন্স বের করো।',
        ],
        memoryDiagram: 'Wallet(100) -> D 50 -> 150 -> W 200 ignored -> W 30 -> 120',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
class Wallet {
  #bal;
  constructor(init) { this.#bal = Math.max(0, init); }
  deposit(x) { if (x > 0) this.#bal += x; }
  withdraw(x) { if (x > 0 && x <= this.#bal) this.#bal -= x; }
  get balance() { return this.#bal; }
}
const t = raw.trim().split(/\\s+/);
const w = new Wallet(Number(t[0]));
for (let i = 1; i + 1 < t.length; i += 2) {
  const amt = Number(t[i + 1]);
  if (t[i] === 'D') w.deposit(amt); else w.withdraw(amt);
}
console.log(w.balance);`,
        stdin: '100 D 50 W 200 W 30',
        expectedOutput: '120',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'withdraw(x) { if (x > 0 && x <= this.#bal) this.#bal -= x; }', whatItMeans: 'Enforces overdraft invariant cleanly.', whyItIsThere: 'Prevents negative wallet balances.', ifDeletedError: 'Overdrafts succeed or drop silently.' },
        ],
      },
      {
        id: 'js-ch18-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Static Factory & Method Dispatch on Task Model',
        englishParagraphs: [
          'Provide `static fromCsv(line)` to parse structured data into validated instances cleanly.',
        ],
        banglaParagraphs: [
          '`static fromPair` ফ্যাক্টরি মেথড দিয়ে স্ট্রিং টোকেন থেকে সরাসরি ভ্যালিডেটেড অবজেক্ট বানাও।',
        ],
        memoryDiagram: 'Task.fromPair("lint", "1") -> Task(#name="lint", #prio=1)',
        code: `class Task {
  #name; #prio;
  constructor(name, prio) {
    this.#name = name;
    this.#prio = Math.max(0, prio);
  }
  static fromPair(name, prioStr) {
    return new Task(name, Number(prioStr));
  }
  summary() { return this.#name + ':' + this.#prio; }
}
const tasks = [Task.fromPair('ship', '3'), Task.fromPair('lint', '1')];
console.log(tasks.map((t) => t.summary()).join(' | '));`,
        stdin: '',
        expectedOutput: 'ship:3 | lint:1',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'static fromPair(name, prioStr) {', whatItMeans: 'Factory method attached to class constructor itself.', whyItIsThere: 'Centralizes parsing logic alongside the model.', ifDeletedError: 'Caller must parse strings manually before `new Task(...)`.' },
        ],
      },
      {
        id: 'js-ch18-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Fixing Detached Method `this` Loss Trap',
        englishParagraphs: [
          'Passing `obj.inc` directly as a callback strips `this` (`undefined` in class strict mode)! Wrap in an arrow callback `() => obj.inc()` or arrow field.',
        ],
        banglaParagraphs: [
          'অবজেক্টের মেথড সরাসরি কলব্যাক হিসেবে পাঠালে `this` হারিয়ে যায়! সর্বদা অ্যারো র‍্যাপার `() => obj.inc()` ব্যবহার করো।',
        ],
        memoryDiagram: 'const fn = () => box.inc() preserves `this === box`',
        code: `class Box {
  #n = 10;
  inc = () => { this.#n += 5; return this.#n; };
}
const b = new Box();
const fn = b.inc;
console.log(fn());`,
        stdin: '',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'inc = () => { this.#n += 5; return this.#n; };', whatItMeans: 'Class field arrow function lexically binds `this` to instance.', whyItIsThere: 'Detaching `const fn = b.inc` still remembers `b`.', ifDeletedError: 'Regular method `inc()` throws TypeError when detached.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: '#count;', whatItMeans: 'Runtime-enforced private field declaration.', whyItIsThere: 'Prevents external mutations.', ifDeletedError: 'SyntaxError when writing `this.#count`.' },
      { lineNumber: 'Line 3', codeSnippet: 'constructor(start = 0) {', whatItMeans: 'Initializes instance on `new SafeCounter(3)`.', whyItIsThere: 'Establishes `>= 0` invariant.', ifDeletedError: '`#count` stays `undefined`.' },
      { lineNumber: 'Line 11', codeSnippet: 'get value() {', whatItMeans: 'Read-only getter property.', whyItIsThere: 'Permits inspection without exposing setter.', ifDeletedError: 'Value inaccessible outside.' },
    ],
    dryRunTable: [
      { step: 1, state: 'new SafeCounter(3)', memoryOrStack: '#count = 3', note: 'Private slot created' },
      { step: 2, state: 'c.sub(2)', memoryOrStack: '#count = 1', note: 'Returns true' },
      { step: 3, state: 'c.sub(5)', memoryOrStack: '#count = 1', note: '5 > 1 guarded -> false' },
      { step: 4, state: 'c.value', memoryOrStack: 'true false 1', note: 'Getter reads private slot' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Accessing `#field` Outside the Class Body', brokenCode: 'console.log(c.#count); // SyntaxError!', fixedCode: 'console.log(c.value);', whyItBreaks: 'JS enforces `#field` visibility strictly inside the declaring class braces.' },
      { title: 'Trap 2: Detached Method Losing `this` in Class Mode', brokenCode: 'const f = counter.sub; f(1); // TypeError: cannot read #count of undefined!', fixedCode: 'const f = (d) => counter.sub(d);', whyItBreaks: 'Class bodies run in strict mode, so unbound calls set `this` to `undefined`.' },
      { title: 'Trap 3: Returning Mutable Internal Array from Getter', brokenCode: 'get items() { return this.#items; }', fixedCode: 'get items() { return [...this.#items]; }', whyItBreaks: 'Callers running `.push()` on the returned array still mutate `#items`.' },
    ],
    practiceSheet: [
      {
        id: 'js-ch18-p1',
        difficulty: 'Easy',
        title: 'Rectangle Encapsulated Area & Perimeter',
        prompt: 'Create `Rect(w, h)` clamping dimensions `>= 1` with `area()` and `perim()` methods.',
        banglaHint: '`Math.max(1, w)` দিয়ে প্রাইভেট `#w`, `#h` সেট করে আউটপুট দেখাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Rect {\n  #w; #h;\n  constructor(w, h) { this.#w = Math.max(1, w); this.#h = Math.max(1, h); }\n  area() { return this.#w * this.#h; }\n  perim() { return 2 * (this.#w + this.#h); }\n}\nconst [w, h] = raw.trim().split(/\\s+/).map(Number);\nconst r = new Rect(w, h);\nconsole.log(r.area() + ' ' + r.perim());`,
        sampleStdin: '5 8',
        expectedOutput: '40 26',
      },
      {
        id: 'js-ch18-p2',
        difficulty: 'Easy',
        title: 'Clamped Temperature Getter & Setter',
        prompt: 'Add `set temp(v)` clamping below `-273` up to `-273` and log `s.temp`.',
        banglaHint: '`set temp(v) { this.#t = Math.max(-273, v); }` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Sensor {\n  #t = 0;\n  get temp() { return this.#t; }\n  set temp(v) { this.#t = Math.max(-273, v); }\n}\nconst s = new Sensor();\ns.temp = Number(raw.trim());\nconsole.log(s.temp);`,
        sampleStdin: '-350',
        expectedOutput: '-273',
      },
      {
        id: 'js-ch18-p3',
        difficulty: 'Medium',
        title: 'Static Factory Top-Scorer Finder',
        prompt: 'Use `Student.fromTokens` to build objects from stdin and print highest scorer `name score`.',
        banglaHint: 'লুপে সর্বোচ্চ `s.score` ট্র্যাক করে প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Student {\n  constructor(name, score) { this.name = name; this.score = score; }\n  static from(n, s) { return new Student(n, Number(s)); }\n}\nconst t = raw.trim().split(/\\s+/);\nconst n = Number(t[0]);\nlet best = null;\nfor (let i = 0; i < n; i++) {\n  const cur = Student.from(t[1 + 2 * i], t[2 + 2 * i]);\n  if (!best || cur.score > best.score) best = cur;\n}\nconsole.log(best.name + ' ' + best.score);`,
        sampleStdin: '3\nArif 78 Sadia 94 Nabil 85',
        expectedOutput: 'Sadia 94',
      },
      {
        id: 'js-ch18-p4',
        difficulty: 'Medium',
        title: 'Bound Arrow Counter Callback',
        prompt: 'Store an arrow method `inc = (v) => ...` on a `Tally` class and invoke it detached inside an array loop.',
        banglaHint: '`inc = (v) => { this.#sum += v; }` দিয়ে `this` বাইন্ড রাখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Tally {\n  #sum = 0;\n  add = (v) => { this.#sum += v; };\n  get total() { return this.#sum; }\n}\nconst t = new Tally();\nconst fn = t.add;\nfor (const x of raw.trim().split(/\\s+/).map(Number)) fn(x);\nconsole.log(t.total);`,
        sampleStdin: '4 6 10',
        expectedOutput: '20',
      },
      {
        id: 'js-ch18-p5',
        difficulty: 'Hard',
        title: 'Encapsulated Capacity-Capped History Stack',
        prompt: 'Implement `HistoryStack(cap)` discarding the oldest item on overflow (`PUSH x` / `POP`) and print remaining sum.',
        banglaHint: 'অ্যারের দৈর্ঘ্য `cap`-এর বেশি হলে `shift()` করে পুরোনোটি বাদ দাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass History {\n  #cap; #arr = [];\n  constructor(cap) { this.#cap = cap; }\n  push(x) { if (this.#arr.length === this.#cap) this.#arr.shift(); this.#arr.push(x); }\n  pop() { this.#arr.pop(); }\n  sum() { return this.#arr.reduce((a, b) => a + b, 0); }\n}\nconst t = raw.trim().split(/\\s+/);\nconst h = new History(Number(t[0]));\nlet i = 2;\nfor (let c = 0; c < Number(t[1]); c++) {\n  if (t[i] === 'PUSH') { h.push(Number(t[i + 1])); i += 2; } else { h.pop(); i += 1; }\n}\nconsole.log(h.sum());`,
        sampleStdin: '2 4 PUSH 10 PUSH 20 PUSH 30 POP',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: #private Warehouse Stock Engine',
      description: 'Protect warehouse stock quantity inside `#qty` across `ADD` and `SELL` commands from stdin.',
      banglaGoal: '`#private` ফিল্ড ও ভ্যালিডেটেড মেথড দিয়ে নিরাপদ স্টক ইঞ্জিন বানাও।',
      combinesChapters: 'Ch 11, 16, 18',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Stock {\n  #qty;\n  constructor(q) { this.#qty = Math.max(0, q); }\n  add(x) { if (x > 0) this.#qty += x; }\n  sell(x) { if (x > 0 && x <= this.#qty) this.#qty -= x; }\n  get qty() { return this.#qty; }\n}\nconst t = raw.trim().split(/\\s+/);\nconst s = new Stock(Number(t[0]));\nfor (let i = 1; i + 1 < t.length; i += 2) {\n  if (t[i] === 'ADD') s.add(Number(t[i + 1])); else s.sell(Number(t[i + 1]));\n}\nconsole.log(s.qty);`,
      sampleStdin: '10 ADD 15 SELL 30 SELL 8',
      expectedOutput: '17',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Stock {\n  #qty;\n  constructor(q) { this.#qty = Math.max(0, q); }\n  add(x) { if (x > 0) this.#qty += x; }\n  sell(x) { if (x > 0 && x <= this.#qty) this.#qty -= x; }\n  get qty() { return this.#qty; }\n}\nconst t = raw.trim().split(/\\s+/);\nconst s = new Stock(Number(t[0]));\nfor (let i = 1; i + 1 < t.length; i += 2) {\n  if (t[i] === 'ADD') s.add(Number(t[i + 1])); else s.sell(Number(t[i + 1]));\n}\nconsole.log(s.qty);`,
    sampleStdin: '10 ADD 15 SELL 30 SELL 8',
    expectedSampleOutput: '17',
    testCases: [
      { id: 'js18-t1', input: '10 ADD 15 SELL 30 SELL 8', expectedOutput: '17' },
      { id: 'js18-t2', input: '5 ADD 5 SELL 10', expectedOutput: '0', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'Inheritance (extends/super), Prototypes & Polymorphism in JS',
    banglaTitle: 'ইনহেরিট্যান্স (extends/super) ও পলিমরফিজম (JavaScript)',
    subtitle: 'Prototype chain lookup, super() ordering, method overriding, and polymorphic dispatch',
    zeroIntuition: {
      plainEnglishStory:
        'Every JavaScript object delegates missing property lookups up its `[[Prototype]]` chain. The ES class syntax (`class BonusEmp extends Employee`) wraps that prototype linkage cleanly while adding `super(...)` constructor chaining and `super.method()` delegation.\n\nBecause JS is dynamically typed, polymorphism needs zero verbose interface keywords: any objects implementing matching method names (like `.area()` on `Rect` and `Square`) dispatch seamlessly in a single loop without `switch (item.type)` clutter.',
      asciiFlowchart:
        'BonusEmp instance -> [[Prototype]] -> BonusEmp.prototype -> Employee.prototype\n  constructor() MUST call super() BEFORE using `this`!\n  shapes.map(s => s.area())  # polymorphic prototype dispatch',
      pseudocode: [
        '1. EXTEND shared base behavior with class Child extends Parent',
        '2. CALL super(...) first inside subclass constructor before reading this',
        '3. DISPATCH uniformly across mixed objects implementing shared methods',
      ],
      banglaZeroToHero: {
        analogyTitle: 'প্রোটোটাইপের উত্তরাধিকার চেইন এবং একটি সাধারণ মেথড ডাক (`s.area()`)',
        explanation:
          'জাভাস্ক্রিপ্টে প্রতিটি অবজেক্টের পেছনে একটি অদৃশ্য চেইন (`[[Prototype]]`) থাকে—নিজের মধ্যে কোনো মেথড না পেলে সে ওপরের প্যারেন্ট প্রোটোটাইপের কাছে খুঁজতে যায়। আধুনিক ES2025-এ `class Sub extends Base` লেখার মাধ্যমে আমরা খুব পরিষ্কারভাবে এই উত্তরাধিকার তৈরি করতে পারি। তবে মনে রাখবে: কোনো সাবক্লাসে যদি `constructor` লেখো, তাহলে `this` স্পর্শ করার আগেই সবার প্রথম লাইনে `super(...)` কল করা বাধ্যতামূলক, নইলে `ReferenceError` আসবে! মেথড ওভাররাইড করার সময় সাবক্লাস থেকে প্যারেন্টের মূল মেথডটি চালাতে `super.method()` ব্যবহার করা যায়। জাভাস্ক্রিপ্ট ডাইনামিক ভাষা হওয়ায় একই অ্যারের মধ্যে `Rect` এবং `Square` রেখে `[...].reduce((sum, s) => sum + s.area(), 0)` চালালেই প্রতিটি অবজেক্ট নিজের `.area()` মেথড চালায়—এটাই পলিমরফিজম। ফলে নতুন কোনো শেপ বা পেমেন্ট টাইপ যোগ করলে মূল লুপে একটিও `if-else` বদলাতে হয় না! তবে ৩-৪ স্তরের গভীর ইনহেরিট্যান্স না বানিয়ে ছোট পাতলা বেস ক্লাস ও কম্পোজিশন ব্যবহার করা ভালো। এই অধ্যায়ে `extends`, `super` এবং পলিমরফিক ডিসপ্যাচ শিখবে।',
        everydayExample: 'গাড়ি বা রিকশা যাই হোক না কেন, ট্রাফিক সিগন্যালে সবার ওপর `.move()` কল করলে প্রত্যেকে নিজের ইঞ্জিন অনুযায়ী চলতে শুরু করে।',
        keyTakeaways: [
          'সাবক্লাস কনস্ট্রাক্টরে `this` ব্যবহার করার আগে অবশ্যই `super(...)` কল করতে হবে।',
          'প্যারেন্টের পুরোনো লজিকের সাথে নতুন কিছু যোগ করতে `super.method()` কল করো।',
          'অ্যারেতে `if (x.type === ...)` না লিখে সরাসরি পলিমরফিক `.area()` বা `.eval()` কল করো।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch19-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Base Class & Polymorphic Overridden Dispatch',
        englishParagraphs: [
          'Override `send(msg)` in `Email` and `Sms` subclasses and invoke both through one array loop.',
        ],
        banglaParagraphs: [
          '`Email` ও `Sms` সাবক্লাসে `send()` ওভাররাইড করে একটি লুপ দিয়ে উভয়কে পলিমরফিকভাবে চালাও।',
        ],
        memoryDiagram: '[new Email(), new Sms()].map(c => c.send("OK"))',
        code: `class Notifier {
  send(msg) { return msg; }
}
class Email extends Notifier {
  send(msg) { return 'EMAIL:' + msg; }
}
class Sms extends Notifier {
  send(msg) { return 'SMS:' + msg; }
}
const channels = [new Email(), new Sms()];
console.log(channels.map((c) => c.send('OK')).join(' | '));`,
        stdin: '',
        expectedOutput: 'EMAIL:OK | SMS:OK',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'class Email extends Notifier {', whatItMeans: 'Links `Email.prototype` to `Notifier.prototype`.', whyItIsThere: 'Establishes inheritance chain cleanly.', ifDeletedError: 'Email becomes standalone unrelated class.' },
          { lineNumber: 'Line 11', codeSnippet: "console.log(channels.map((c) => c.send('OK')).join(' | '));", whatItMeans: 'Invokes concrete `send` dynamically per element.', whyItIsThere: 'Avoids conditional type checks.', ifDeletedError: 'Output omitted.' },
        ],
      },
      {
        id: 'js-ch19-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Chaining super() & super.pay() With Stdin',
        englishParagraphs: [
          'Extend `Employee` into `BonusEmp`, invoking `super(base)` first in constructor and reusing `super.pay()`.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে বেতন ও বোনাস পড়ে `super(base)` এবং `super.pay()` দিয়ে মোট বেতন হিসাব করো।',
        ],
        memoryDiagram: 'BonusEmp(1000, 250) -> super(1000) -> super.pay()+250 = 1250',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
class Employee {
  constructor(base) { this.base = base; }
  pay() { return this.base; }
}
class BonusEmp extends Employee {
  constructor(base, bonus) {
    super(base);
    this.bonus = bonus;
  }
  pay() { return super.pay() + this.bonus; }
}
const [b, bon] = raw.trim().split(/\\s+/).map(Number);
console.log(new BonusEmp(b, bon).pay());`,
        stdin: '1000 250',
        expectedOutput: '1250',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'super(base);', whatItMeans: 'Calls `Employee` constructor to allocate and initialize `this`.', whyItIsThere: 'Required before assigning `this.bonus` in JS subclasses.', ifDeletedError: 'ReferenceError: Must call super constructor before accessing this.' },
        ],
      },
      {
        id: 'js-ch19-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Duck-Typed Pricing Strategies Without Base Hierarchy',
        englishParagraphs: [
          'Combine `Flat` and `Pct` pricing classes sharing only `.apply(amt)` cleanly.',
        ],
        banglaParagraphs: [
          'একই `.apply(amt)` মেথড রেখে ফ্ল্যাট ও পার্সেন্টেজ ডিসকাউন্ট কৌশল একত্রে প্রয়োগ করো।',
        ],
        memoryDiagram: '[Flat(15).apply(100), Pct(10).apply(200)] -> 85 + 180 = 265',
        code: `class Flat {
  constructor(d) { this.d = d; }
  apply(x) { return Math.max(0, x - this.d); }
}
class Pct {
  constructor(p) { this.p = p; }
  apply(x) { return x - Math.trunc((x * this.p) / 100); }
}
const total = new Flat(15).apply(100) + new Pct(10).apply(200);
console.log(total);`,
        stdin: '',
        expectedOutput: '265',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'apply(x) { return x - Math.trunc((x * this.p) / 100); }', whatItMeans: 'Uses integer truncation cleanly matching contest arithmetic.', whyItIsThere: 'Avoids floating-point fractional cents.', ifDeletedError: 'Pct discount missing.' },
        ],
      },
      {
        id: 'js-ch19-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Fixing `super()` Before `this` & Recursive Expression Tree',
        englishParagraphs: [
          'Evaluate recursive AST nodes (`Num`, `Add`) cleanly via `.eval()` without brittle tag switches.',
        ],
        banglaParagraphs: [
          '`Num` এবং `Add` নোডে রিকার্সিভ `.eval()` চালিয়ে অ্যারিথমেটিক এক্সপ্রেশন ট্রি মূল্যায়ন করো।',
        ],
        memoryDiagram: 'Add(Add(Num(3), Num(4)), Num(5)).eval() -> 12',
        code: `class Num {
  constructor(v) { this.v = v; }
  eval() { return this.v; }
}
class Add {
  constructor(l, r) { this.l = l; this.r = r; }
  eval() { return this.l.eval() + this.r.eval(); }
}
const expr = new Add(new Add(new Num(3), new Num(4)), new Num(5));
console.log(expr.eval());`,
        stdin: '',
        expectedOutput: '12',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'eval() { return this.l.eval() + this.r.eval(); }', whatItMeans: 'Polymorphically evaluates child subtrees.', whyItIsThere: 'Handles arbitrarily deep trees uniformly.', ifDeletedError: 'Cannot evaluate composite addition.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'class Notifier {', whatItMeans: 'Base prototype class defining contract.', whyItIsThere: 'Establishes shared API for subclasses.', ifDeletedError: 'Subclasses cannot extend `Notifier`.' },
      { lineNumber: 'Line 4', codeSnippet: 'class Email extends Notifier {', whatItMeans: 'Sets prototype chain to inherit from `Notifier`.', whyItIsThere: 'Enables shared behavior and `instanceof Notifier`.', ifDeletedError: '`Email` undeclared.' },
      { lineNumber: 'Line 11', codeSnippet: "channels.map((c) => c.send('OK'))", whatItMeans: 'Polymorphic method invocation across variants.', whyItIsThere: 'Avoids `if (c instanceof ...)` clutter.', ifDeletedError: 'No result generated.' },
    ],
    dryRunTable: [
      { step: 1, state: 'channels = [Email, Sms]', memoryOrStack: '2 subclass objects', note: 'Each owns prototype link' },
      { step: 2, state: 'c = Email', memoryOrStack: 'c.send("OK")', note: 'Resolves Email.prototype.send' },
      { step: 3, state: 'c = Sms', memoryOrStack: 'c.send("OK")', note: 'Resolves Sms.prototype.send' },
      { step: 4, state: 'join(" | ")', memoryOrStack: 'EMAIL:OK | SMS:OK', note: 'Uniform polymorphic output' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Accessing `this` Before Calling `super()`', brokenCode: 'constructor(x) { this.x = x; super(); } // ReferenceError!', fixedCode: 'constructor(x) { super(); this.x = x; }', whyItBreaks: 'In derived classes, `super()` allocates and initializes `this`; touching `this` earlier crashes.' },
      { title: 'Trap 2: Omitting `new` When Instantiating a Class', brokenCode: 'const e = Email(); // TypeError!', fixedCode: 'const e = new Email();', whyItBreaks: 'ES6 classes refuse direct function invocation without `new`.' },
      { title: 'Trap 3: Checking `if (obj.kind === ...)` Instead of Method Dispatch', brokenCode: 'if (s.kind === "R") s.w*s.h else s.a*s.a', fixedCode: 's.area()', whyItBreaks: 'Scattering type conditionals forces editing every file when adding a new shape.' },
    ],
    practiceSheet: [
      {
        id: 'js-ch19-p1',
        difficulty: 'Easy',
        title: 'Animal Sound Dispatch',
        prompt: 'Extend `Animal` with `Dog` (`WOOF`) and `Cat` (`MEOW`) and print space-separated sounds for stdin `D`/`C` tokens.',
        banglaHint: '`t === "D" ? new Dog() : new Cat()` তৈরি করে `.speak()` ম্যাপ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Animal { speak() { return ''; } }\nclass Dog extends Animal { speak() { return 'WOOF'; } }\nclass Cat extends Animal { speak() { return 'MEOW'; } }\nconst out = raw.trim().split(/\\s+/).map((t) => (t === 'D' ? new Dog() : new Cat()).speak());\nconsole.log(out.join(' '));`,
        sampleStdin: 'D C D',
        expectedOutput: 'WOOF MEOW WOOF',
      },
      {
        id: 'js-ch19-p2',
        difficulty: 'Easy',
        title: 'super() Discount Price Subclass',
        prompt: 'Create `Item(price)` and `DiscountItem(price, off)` calling `super(price)` and `super.finalPrice()`.',
        banglaHint: '`Math.max(0, super.finalPrice() - this.off)` রিটার্ন করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Item { constructor(p) { this.p = p; } finalPrice() { return this.p; } }\nclass DiscountItem extends Item {\n  constructor(p, off) { super(p); this.off = off; }\n  finalPrice() { return Math.max(0, super.finalPrice() - this.off); }\n}\nconst [p, off] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(new DiscountItem(p, off).finalPrice());`,
        sampleStdin: '500 120',
        expectedOutput: '380',
      },
      {
        id: 'js-ch19-p3',
        difficulty: 'Medium',
        title: 'Polymorphic Pricing Strategy Sum',
        prompt: 'Evaluate `n` `F x d` / `P x p` commands through `Flat` and `Pct` objects cleanly.',
        banglaHint: '`Math.trunc((x * p) / 100)` ব্যবহার করে শতাংশ বাদ দাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Flat { constructor(d) { this.d = d; } apply(x) { return Math.max(0, x - this.d); } }\nclass Pct { constructor(p) { this.p = p; } apply(x) { return x - Math.trunc((x * this.p) / 100); } }\nconst t = raw.trim().split(/\\s+/);\nlet n = Number(t[0]), tot = 0, idx = 1;\nfor (let i = 0; i < n; i++) {\n  const k = t[idx], x = Number(t[idx + 1]), d = Number(t[idx + 2]); idx += 3;\n  tot += (k === 'F' ? new Flat(d) : new Pct(d)).apply(x);\n}\nconsole.log(tot);`,
        sampleStdin: '2 F 100 15 P 200 10',
        expectedOutput: '265',
      },
      {
        id: 'js-ch19-p4',
        difficulty: 'Medium',
        title: 'Polymorphic Event Logger Formatter',
        prompt: 'Dispatch `INFO msg` and `WARN msg` through `InfoLog` and `WarnLog` `.format()` methods.',
        banglaHint: 'প্রতিটি লগ লাইনের জন্য সঠিক ফরম্যাটার ক্লাস বেছে প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Info { constructor(m) { this.m = m; } fmt() { return '[INFO] ' + this.m; } }\nclass Warn { constructor(m) { this.m = m; } fmt() { return '[WARN] ' + this.m; } }\nconst lines = raw.trim().split(/\\n+/);\nfor (const line of lines) {\n  const [tag, ...rest] = line.trim().split(' ');\n  const log = tag === 'INFO' ? new Info(rest.join(' ')) : new Warn(rest.join(' '));\n  console.log(log.fmt());\n}`,
        sampleStdin: 'INFO Ready\nWARN LowMem',
        expectedOutput: '[INFO] Ready\n[WARN] LowMem',
      },
      {
        id: 'js-ch19-p5',
        difficulty: 'Hard',
        title: 'Prefix Expression Tree Evaluator',
        prompt: 'Parse prefix tokens (`+`, `*`, integers) into `Num` and `BinOp` AST classes and evaluate `.eval()`.',
        banglaHint: 'ইন্ডেক্স কার্সর ব্যবহার করে রিকার্সিভভাবে `BinOp` ও `Num` নোড তৈরি করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Num { constructor(v) { this.v = v; } eval() { return this.v; } }\nclass BinOp { constructor(op, l, r) { this.op = op; this.l = l; this.r = r; } eval() { return this.op === '+' ? this.l.eval() + this.r.eval() : this.l.eval() * this.r.eval(); } }\nconst t = raw.trim().split(/\\s+/); let p = 0;\nfunction parse() { const cur = t[p++]; return (cur === '+' || cur === '*') ? new BinOp(cur, parse(), parse()) : new Num(Number(cur)); }\nconsole.log(parse().eval());`,
        sampleStdin: '* + 2 3 4',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Polymorphic Geometry Area Aggregator',
      description: 'Instantiate `Rect` and `Square` objects extending `Shape` from stdin commands and sum all `.area()` calls.',
      banglaGoal: '`extends` ও পলিমরফিক `.area()` ডিসপ্যাচ মিলিয়ে জ্যামিতিক ক্ষেত্রফল গণনা করো।',
      combinesChapters: 'Ch 11, 18, 19',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Shape { area() { return 0; } }\nclass Rect extends Shape { constructor(w, h) { super(); this.w = w; this.h = h; } area() { return this.w * this.h; } }\nclass Square extends Shape { constructor(a) { super(); this.a = a; } area() { return this.a * this.a; } }\nconst t = raw.trim().split(/\\s+/);\nlet n = Number(t[0]), idx = 1;\nconst shapes = [];\nfor (let i = 0; i < n; i++) {\n  if (t[idx] === 'R') { shapes.push(new Rect(Number(t[idx + 1]), Number(t[idx + 2]))); idx += 3; }\n  else { shapes.push(new Square(Number(t[idx + 1]))); idx += 2; }\n}\nconsole.log(shapes.reduce((acc, s) => acc + s.area(), 0));`,
      sampleStdin: '2\nR 4 5\nS 6',
      expectedOutput: '56',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass Shape { area() { return 0; } }\nclass Rect extends Shape { constructor(w, h) { super(); this.w = w; this.h = h; } area() { return this.w * this.h; } }\nclass Square extends Shape { constructor(a) { super(); this.a = a; } area() { return this.a * this.a; } }\nconst t = raw.trim().split(/\\s+/);\nlet n = Number(t[0]), idx = 1;\nconst shapes = [];\nfor (let i = 0; i < n; i++) {\n  if (t[idx] === 'R') { shapes.push(new Rect(Number(t[idx + 1]), Number(t[idx + 2]))); idx += 3; }\n  else { shapes.push(new Square(Number(t[idx + 1]))); idx += 2; }\n}\nconsole.log(shapes.reduce((acc, s) => acc + s.area(), 0));`,
    sampleStdin: '2\nR 4 5\nS 6',
    expectedSampleOutput: '56',
    testCases: [
      { id: 'js19-t1', input: '2\nR 4 5\nS 6', expectedOutput: '56' },
      { id: 'js19-t2', input: '3\nS 2\nS 3\nR 1 10', expectedOutput: '23', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'JavaScript Chapter 20: Built-in Map/Set, Array HOFs & Fetch Data Pipelines — Merger 4',
    banglaTitle: 'JavaScript অধ্যায় ২০: Map/Set, অ্যারে মেথড ও ডেটা পাইপলাইন — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Replace brittle plain objects with O(1) Map/Set, functional Array HOFs, and clean response normalization.',
    zeroIntuition: {
      plainEnglishStory:
        'Using plain JavaScript objects {} as dynamic frequency maps fails silently on prototype keys like "constructor" or "toString" and lacks a quick .size property. ES6 Map and Set solve both cleanly with O(1) hash lookups, preserved insertion order, and arbitrary key types.\n\nPairing Map/Set with Array higher-order functions (filter, map, reduce, sort) mirrors how modern frontend apps normalize API JSON payloads (e.g. from fetch) into sorted leaderboards, grouped summaries, and deduplicated feeds.',
      asciiFlowchart: `  [ Raw Input / Payload Stream ]
          |
          +--> new Set(...)      (O(1) deduplication)
          +--> new Map(...)      (safe frequency / grouping without prototype bugs)
          +--> Array.from(map.entries()).sort((a, b) => ...)
          |
          v
  [ Clean Ranked Feed Output ]`,
      pseudocode: [
        '1. PARSE structured records from raw stdin / simulated payload tokens',
        '2. COUNT keys safely inside Map using (map.get(k) ?? 0) + 1',
        '3. SORT [...map.entries()] descending by count, ascending via localeCompare',
        '4. FORMAT clean lines using .map().join("\\n")',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নিরাপদ লকারবক্স Map/Set ও ডেটা প্রসেসিং কনভেয়ার বেল্ট',
        explanation:
          'ধরো তুমি একটি সার্ভার থেকে আসা হাজার হাজার কমেন্ট বা ট্যাগের হিসাব রাখবে, কিন্তু সাধারণ অবজেক্ট {} ব্যবহার করলে "toString" বা "constructor"-এর মতো শব্দের সাথে JavaScript-এর বিল্ট-ইন প্রোটোটাইপ কনফ্লিক্ট হয়ে বাগ তৈরি হয়! ঠিক এই সমস্যার আধুনিক সমাধান হলো Map এবং Set। Map ব্যবহার করলে যেকোনো শব্দ বা অবজেক্ট নিরাপদ কী হিসেবে থাকে এবং সরাসরি .size দিয়ে সংখ্যা জানা যায়। আর Set মুহূর্তেই ডুপ্লিকেট বাদ দিয়ে কেবল অনন্য মানগুলো ধরে রাখে। এদের সাথে যখন অ্যারের filter, map, reduce এবং sort মেথড জোড়া লাগে, তখন API থেকে fetch করা কাঁচা ডেটাকে চোখের পলকে পরিচ্ছন্ন ড্যাশবোর্ডে রূপান্তর করা যায়। মার্জার ৪ অধ্যায়ে আমরা ক্লাস, অ্যাসিঙ্ক চিন্তাভাবনা, Map/Set আর ফাংশনাল অ্যারে মেথড মিলিয়ে রিয়েল-ওয়ার্ল্ড ডেটা পাইপলাইন তৈরি করবো। React বা Node.js-এ প্রতিদিনই এই প্যাটার্নে ডেটা ট্রান্সফর্ম করতে হয়। সবসময় মনে রাখবে .sort() মূল অ্যারে বদলে দেয়, তাই কপি করে সর্ট করা নিরাপদ অভ্যাস।',
        everydayExample: 'কারখানার সর্টিং কনভেয়ার: প্রথম ছাঁকনিতে (Set) ডুপ্লিকেট বাদ যায়, পরের ধাপে (Map) গোনা হয় এবং শেষে (sort) র‍্যাঙ্ক অনুযায়ী প্যাক হয়।',
        keyTakeaways: [
          'ডায়নামিক কী-ভ্যালু কাউন্টিংয়ে {} এর বদলে সবসময় new Map() ব্যবহার করা নিরাপদ।',
          'Set দিয়ে O(n) সময়ে ডুপ্লিকেট বাদ দিয়ে [...new Set(arr)] করা যায়।',
          'arr.sort() মূল অ্যারে মিউটেট করে; তাই [...arr].sort(...) ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Safe Map Frequency & Set Deduplication',
        englishParagraphs: [
          'Count arbitrary tokens (even "toString" or "constructor") safely with Map and compute unique count with Set.',
        ],
        banglaParagraphs: [
          'Map দিয়ে যেকোনো কী নিরাপদে গুনে Set দিয়ে ইউনিক সংখ্যা বের করো।',
        ],
        memoryDiagram: `Map { "js" => 2, "toString" => 1 } (zero prototype collision)`,
        code: `const tags = ['js', 'rust', 'js', 'toString', 'rust'];
const uniq = new Set(tags);
const freq = new Map();
for (const t of tags) freq.set(t, (freq.get(t) ?? 0) + 1);
console.log(uniq.size + ' ' + freq.get('js') + ' ' + freq.get('toString'));`,
        stdin: '',
        expectedOutput: '3 2 1',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const uniq = new Set(tags);',
            whatItMeans: 'Deduplicates array values into an O(1)-lookup Set.',
            whyItIsThere: 'Quickly tracks distinct tags.',
            ifDeletedError: 'uniq is undefined.',
          },
          {
            lineNumber: 'Line 4',
            codeSnippet: 'for (const t of tags) freq.set(t, (freq.get(t) ?? 0) + 1);',
            whatItMeans: 'Safely increments counts in Map without prototype collisions.',
            whyItIsThere: 'Prevents crashes on keys like toString.',
            ifDeletedError: 'Frequency map remains empty.',
          },
        ],
      },
      {
        id: 'js-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Map Entry Leaderboard With Tie-Break Sort',
        englishParagraphs: [
          'Read n tokens from stdin, count with Map, and sort entries by frequency descending then alphabetically.',
        ],
        banglaParagraphs: [
          'stdin থেকে শব্দ গুনে ফ্রিকোয়েন্সি ও নামের ক্রমে সাজানো লিডারবোর্ড প্রিন্ট করো।',
        ],
        memoryDiagram: `Map -> [...map.entries()].sort((a,b) => b[1]-a[1] || strcmp)`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const toks = raw.trim().split(/\\s+/);
const n = Number(toks[0]);
const freq = new Map();
for (let i = 1; i <= n; i++) {
  const w = toks[i];
  freq.set(w, (freq.get(w) ?? 0) + 1);
}
const rows = [...freq.entries()].sort((a, b) =>
  b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)
);
console.log(rows.map(([k, v]) => k + ':' + v).join('\\n'));`,
        stdin: '5\njs rust js go rust',
        expectedOutput: 'js:2\nrust:2\ngo:1',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'const rows = [...freq.entries()].sort((a, b) =>',
            whatItMeans: 'Converts Map iterator to array and sorts multi-key.',
            whyItIsThere: 'Orders ties deterministically.',
            ifDeletedError: 'Output stays in insertion order.',
          },
        ],
      },
      {
        id: 'js-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'API Payload Aggregation With filter/map/reduce',
        englishParagraphs: [
          'Chain filter, Map grouping, and reduce to summarize valid paid invoice totals cleanly.',
        ],
        banglaParagraphs: [
          'filter ও Map দিয়ে API পেলোডের মতো ডেটা থেকে গ্রুপভিত্তিক মোট হিসাব বের করা।',
        ],
        memoryDiagram: `records -> filter(status === "OK") -> Map group sum`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/);
const groups = new Map();
for (let i = 0; i < t.length; i += 3) {
  const status = t[i], cat = t[i + 1], amt = Number(t[i + 2]);
  if (status === 'OK') groups.set(cat, (groups.get(cat) ?? 0) + amt);
}
const summary = [...groups.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([k, v]) => k + '=' + v);
console.log(summary.join(' '));`,
        stdin: 'OK cloud 40 ERR cloud 99 OK ai 60 OK cloud 15',
        expectedOutput: 'ai=60 cloud=55',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: "if (status === 'OK') groups.set(cat, (groups.get(cat) ?? 0) + amt);",
            whatItMeans: 'Filters valid records and accumulates per-category sum in O(1).',
            whyItIsThere: 'Skips failed/cancelled payloads cleanly.',
            ifDeletedError: 'Failed records inflate revenue.',
          },
        ],
      },
      {
        id: 'js-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Numeric Comparator vs. Default Lexicographic .sort()',
        englishParagraphs: [
          'Calling .sort() with no arguments converts numbers to strings, sorting [10, 2] as [10, 2]! Always pass (a, b) => a - b.',
        ],
        banglaParagraphs: [
          'আর্গুমেন্ট ছাড়া .sort() ডাকলে ১০ কে ২-এর আগে রাখে কারণ তা স্ট্রিং হিসেবে তুলনা করে!',
        ],
        memoryDiagram: `[10, 2].sort() => [10, 2] (BUG!) | [10, 2].sort((a,b) => a - b) => [2, 10]`,
        code: `const nums = [10, 2, 100, 25];
const sorted = [...nums].sort((a, b) => a - b);
console.log(sorted.join(' ') + ' | orig:' + nums[0]);`,
        stdin: '',
        expectedOutput: '2 10 25 100 | orig:10',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const sorted = [...nums].sort((a, b) => a - b);',
            whatItMeans: 'Clones array and applies explicit numeric comparator.',
            whyItIsThere: 'Prevents both lexicographic string sorting and input mutation.',
            ifDeletedError: 'Sorts alphabetically as 10 100 2 25.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: "const tags = ['js', 'rust', 'js', 'toString', 'rust'];",
        whatItMeans: 'Initializes sample tag list including reserved Object method name.',
        whyItIsThere: 'Demonstrates prototype-safe handling in Map.',
        ifDeletedError: 'tags array is undefined.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'const uniq = new Set(tags);',
        whatItMeans: 'Deduplicates array values into an O(1)-lookup Set.',
        whyItIsThere: 'Quickly tracks distinct tags.',
        ifDeletedError: 'uniq is undefined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const freq = new Map();',
        whatItMeans: 'Creates an empty ES6 Map free of Object.prototype keys.',
        whyItIsThere: 'Stores frequency counts safely.',
        ifDeletedError: 'freq is undefined.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'for (const t of tags) freq.set(t, (freq.get(t) ?? 0) + 1);',
        whatItMeans: 'Safely increments counts in Map without prototype collisions.',
        whyItIsThere: 'Prevents crashes on keys like toString.',
        ifDeletedError: 'Frequency map remains empty.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Process "js", "rust", "js"', memoryOrStack: 'Map { js=>2, rust=>1 }', note: 'Safe O(1) updates' },
      { step: 2, state: 'Process "go", "rust"', memoryOrStack: 'Map { js=>2, rust=>2, go=>1 }', note: '3 entries total' },
      { step: 3, state: 'Sort entries', memoryOrStack: '[["js",2],["rust",2],["go",1]]', note: 'Count desc, key asc' },
      { step: 4, state: 'map(([k,v])=>k+":"+v)', memoryOrStack: 'js:2 / rust:2 / go:1', note: 'Joined cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Calling .sort() on Numbers Without a Comparator',
        brokenCode: `[10, 2, 30].sort()`,
        fixedCode: `[10, 2, 30].sort((a, b) => a - b)`,
        whyItBreaks: 'Default Array.prototype.sort converts elements to UTF-16 strings, placing "10" before "2".',
      },
      {
        title: 'Using Plain {} for Arbitrary User Keys',
        brokenCode: `const counts = {}; counts["constructor"] = (counts["constructor"] || 0) + 1;`,
        fixedCode: `const counts = new Map(); counts.set(k, (counts.get(k) ?? 0) + 1);`,
        whyItBreaks: 'Plain objects inherit Object.prototype properties so counts["constructor"] is already a Function!',
      },
      {
        title: 'Using || 0 Instead of ?? 0 When 0 Is Valid',
        brokenCode: `const val = map.get(k) || -1; // breaks if stored value is 0!`,
        fixedCode: `const val = map.get(k) ?? -1;`,
        whyItBreaks: 'Logical OR treats 0 as falsy and replaces valid zero metrics with fallback -1.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-20-p1',
        difficulty: 'Easy',
        title: 'Set Intersection Count',
        prompt: 'Read n, array A of length n, m, array B of length m; print count of common unique values.',
        banglaHint: 'ইঙ্গিত: A-কে new Set()-এ রেখে B-এর উপাদান setA.has(x) দিয়ে পরীক্ষা করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0];\nconst setA = new Set(nums.slice(1, 1 + n));\nconst setB = new Set(nums.slice(2 + n));\nlet common = 0;\nfor (const x of setB) if (setA.has(x)) common++;\nconsole.log(common);`,
        sampleStdin: '4 1 2 2 3 3 2 3 4',
        expectedOutput: '2',
      },
      {
        id: 'js-ch-20-p2',
        difficulty: 'Easy',
        title: 'Array Pipeline Positive Squares Sum',
        prompt: 'Read integers, keep positive numbers, double them, and sum with reduce.',
        banglaHint: 'ইঙ্গিত: filter(x => x > 0).map(x => x * 2).reduce((a, b) => a + b, 0) ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst ans = raw.trim().split(/\\s+/).map(Number).filter((x) => x > 0).map((x) => x * 2).reduce((a, b) => a + b, 0);\nconsole.log(ans);`,
        sampleStdin: '-3 4 0 5 -1',
        expectedOutput: '18',
      },
      {
        id: 'js-ch-20-p3',
        difficulty: 'Medium',
        title: 'Two-Sum Indices Using Map',
        prompt: 'Read target followed by distinct integers; print i j (0-indexed) whose sum equals target.',
        banglaHint: 'ইঙ্গিত: Map-এ মান -> ইনডেক্স রেখে target - x আগে দেখা গেছে কি না খুঁজো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst target = nums[0], arr = nums.slice(1);\nconst seen = new Map();\nfor (let i = 0; i < arr.length; i++) {\n  const need = target - arr[i];\n  if (seen.has(need)) { console.log(seen.get(need) + ' ' + i); break; }\n  seen.set(arr[i], i);\n}`,
        sampleStdin: '9 2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'js-ch-20-p4',
        difficulty: 'Medium',
        title: 'Group Numbers by Remainder With Map',
        prompt: 'Read m followed by integers; group by ((x % m) + m) % m and print sorted "rem:count".',
        banglaHint: 'ইঙ্গিত: Map<rem, array> অথবা গণনা রেখে sorted এন্ট্রি প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst m = nums[0], mp = new Map();\nfor (let i = 1; i < nums.length; i++) {\n  const r = ((nums[i] % m) + m) % m;\n  mp.set(r, (mp.get(r) ?? 0) + 1);\n}\nconsole.log([...mp.entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => k + ':' + v).join(' '));`,
        sampleStdin: '3 4 7 9 10 12',
        expectedOutput: '0:2 1:3',
      },
      {
        id: 'js-ch-20-p5',
        difficulty: 'Hard',
        title: 'Top-K Frequent Words Pipeline',
        prompt: 'Read k and words; print top k words sorted by frequency desc then lexicographically asc.',
        banglaHint: 'ইঙ্গিত: Map-এ ফ্রিকোয়েন্সি তুলে কাস্টম sort ও .slice(0, k) প্রয়োগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/);\nconst k = Number(t[0]);\nconst freq = new Map();\nfor (let i = 1; i < t.length; i++) freq.set(t[i], (freq.get(t[i]) ?? 0) + 1);\nconst top = [...freq.entries()].sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : 1)).slice(0, k).map((e) => e[0]);\nconsole.log(top.join(' '));`,
        sampleStdin: '2 api db api cache db log',
        expectedOutput: 'api db',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Map/Set Frequency Leaderboard',
      description: 'Combine Map, Set, Array higher-order methods, and deterministic multi-key sorting to rank input tokens.',
      banglaGoal: 'মার্জার ৪: Map, Set ও অ্যারে HOF ব্যবহার করে ফ্রিকোয়েন্সি লিডারবোর্ড তৈরি করা।',
      combinesChapters: 'Ch 11, 14, 18, 20',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst toks = raw.trim().split(/\\s+/);\nconst n = Number(toks[0]);\nconst freq = new Map();\nfor (let i = 1; i <= n; i++) {\n  const w = toks[i];\n  freq.set(w, (freq.get(w) ?? 0) + 1);\n}\nconst rows = [...freq.entries()].sort((a, b) =>\n  b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)\n);\nconsole.log(rows.map(([k, v]) => k + ':' + v).join('\\n'));`,
      sampleStdin: '5\njs rust js go rust',
      expectedOutput: 'js:2\nrust:2\ngo:1',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst toks = raw.trim().split(/\\s+/);\nconst n = Number(toks[0]);\nconst freq = new Map();\nfor (let i = 1; i <= n; i++) {\n  const w = toks[i];\n  freq.set(w, (freq.get(w) ?? 0) + 1);\n}\nconst rows = [...freq.entries()].sort((a, b) =>\n  b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)\n);\nconsole.log(rows.map(([k, v]) => k + ':' + v).join('\\n'));`,
    sampleStdin: '5\njs rust js go rust',
    expectedSampleOutput: 'js:2\nrust:2\ngo:1',
    testCases: [
      { id: 'js20-t1', input: '5\njs rust js go rust', expectedOutput: 'js:2\nrust:2\ngo:1' },
      { id: 'js20-t2', input: '3\na a b', expectedOutput: 'a:2\nb:1', isHidden: true },
    ],
  },
};
