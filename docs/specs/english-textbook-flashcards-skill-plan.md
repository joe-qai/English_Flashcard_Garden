# 英语教材闪卡 Skill 实施计划

> 对应设计文档：`docs/specs/english-textbook-flashcards-skill-design.md`
> 文件名不带日期，沿用项目「发布内容不出现年份」的约束；文档内用〈地区〉〈年份〉占位。
>
> 执行方式：每个任务独立可验证、独立 commit。测试一律用 Node 内置 `node:test`，不引入依赖。

## 0. 目标与边界

交付一个全局可用的 skill，支持三种模式：

| 模式 | 输入 | 输出 | 是否改文件 |
|---|---|---|---|
| 导入 | 「三年级上英语」 | 抓词表 → 规范化 → 预览 → 合并 → 构建 → 校验 | 确认后才改 `data/`、`assets/words.js` |
| 校对 | 「校对三年级上」 | `reports/audit-g3t1.md` | 否（只写报告） |
| 建站 | 空目录 | 同款静态站点骨架 | 是（仅目标目录） |

不在本期范围：多出版社适配、教材原文录入、自动 commit/push。

## 1. 目录与产物

```
D:\pythonworkspace\projects\skills\english-textbook-flashcards\
├── SKILL.md
├── profiles\
│   └── hjbsz.json
├── lib\
│   ├── args.mjs              # 极简 CLI 参数解析
│   ├── textbook.mjs          # 词表 HTML 解析、册操作
│   ├── normalize.mjs         # 音标/释义规范化（纯函数）
│   ├── workspace.mjs         # 工作区判定、读 words.js
│   └── report.mjs            # Markdown 表格拼接
├── scripts\
│   ├── resolve.mjs
│   ├── fetch_words.mjs
│   ├── merge_textbook.mjs
│   ├── audit.mjs
│   ├── build.mjs
│   ├── verify.mjs
│   └── scaffold.mjs
├── templates\site\           # 站点骨架（见任务 9）
├── references\
│   ├── data-model.md
│   ├── ipa-rules.md
│   └── audit-checklist.md
└── tests\
    ├── fixtures\book.html
    ├── resolve.test.mjs
    ├── normalize.test.mjs
    ├── textbook.test.mjs
    ├── merge.test.mjs
    ├── audit.test.mjs
    └── scaffold.test.mjs
```

全局挂载：

```
C:\Users\EDY\.config\opencode\skills\english-textbook-flashcards
  → junction → D:\pythonworkspace\projects\skills\english-textbook-flashcards
```

`reports/` 与 `data/sources/` 加入 `.gitignore`，保证验收时 `git status` 干净。

---

## 任务 1：初始化 skill 骨架与忽略规则

**文件**

- 新建 `skills/english-textbook-flashcards/` 上述目录
- 修改 `.gitignore`

**.gitignore 追加**

```gitignore
# 英语教材闪卡 skill 的运行产物
reports/
data/sources/
```

**验收**

```powershell
node -e "const fs=require('fs');const p='skills/english-textbook-flashcards';for(const d of ['profiles','lib','scripts','templates/site','references','tests/fixtures'])fs.mkdirSync(p+'/'+d,{recursive:true});console.log('ok')"
git status --short
```

**Commit**

```
chore(skill): 初始化英语教材闪卡 skill 目录
```

---

## 任务 2：`lib/args.mjs` 与 `lib/workspace.mjs`

**`lib/args.mjs`**

```js
export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[key] = true;
      else { out[key] = next; i += 1; }
    } else out._.push(token);
  }
  return out;
}

export function requireString(args, key, fallback) {
  const value = args[key] ?? fallback;
  if (typeof value !== 'string' || !value.trim()) throw new Error(`缺少参数 --${key}`);
  return value.trim();
}
```

**`lib/workspace.mjs`**

```js
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const REQUIRED = ['index.html', 'assets/words.js', 'data/textbook-index.json'];

export function isWorkspace(root) {
  return REQUIRED.every((rel) => fs.existsSync(path.join(root, rel)));
}

export function assertWorkspace(root) {
  if (isWorkspace(root)) return root;
  throw new Error(
    `不是闪卡工作区：${root}\n` +
      `需要同时存在 ${REQUIRED.join(' / ')}。\n` +
      `请用 --root 指向已有站点，或先运行 scripts/scaffold.mjs 新建。`,
  );
}

export function readJson(root, rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
}

export function writeJson(root, rel, value) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
  return file;
}

export function loadWordCategories(root) {
  const file = path.join(root, 'assets/words.js');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  return Array.isArray(sandbox.window.WORD_CATEGORIES) ? sandbox.window.WORD_CATEGORIES : [];
}
```

**验收**

```powershell
node -e "import('./skills/english-textbook-flashcards/lib/args.mjs').then(m=>console.log(m.parseArgs(['--grade','3','x'])))"
node -e "import('./skills/english-textbook-flashcards/lib/workspace.mjs').then(m=>console.log(m.isWorkspace(process.cwd())))"
```

**Commit**

```
feat(skill): 参数解析与工作区判定
```

---

## 任务 3：`lib/normalize.mjs`（纯函数，TDD）

从 `scripts/build_words.mjs` 抽取，行为必须一致。

**先写测试 `tests/normalize.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  norm, cleanGloss, tidyZh, detectPos, normalizeIpa, countSyllables, resolveEn,
} from '../lib/normalize.mjs';

test('norm 统一大小写、撇号与空白', () => {
  assert.equal(norm('  Let’s   Go  '), "let's go");
});

test('cleanGloss 去掉词性与复数标记', () => {
  assert.equal(cleanGloss('n. 苹果', 'apple'), '苹果');
  assert.equal(cleanGloss('adj.（复数）大的', 'big'), '大的');
});

test('tidyZh 统一全角标点并清掉夹带词性', () => {
  assert.equal(tidyZh('展示;显示 n. 演出'), '展示；显示；演出');
  assert.equal(tidyZh('他们 (宾格)'), '他们（宾格）');
  assert.equal(tidyZh('苹果...'), '苹果…');
});

test('detectPos 识别短语与词性', () => {
  assert.equal(detectPos('v.感觉到', 'feel'), 'v.');
  assert.equal(detectPos('n.宠物店', 'pet shop'), 'phr.');
});

test('countSyllables 处理成音节 /l/、/n/', () => {
  assert.equal(countSyllables('ˈæpl'), 2);
  assert.equal(countSyllables('ˈteɪbl'), 2);
  assert.equal(countSyllables('kæt'), 1);
});

test('normalizeIpa 英式化并处理重音', () => {
  assert.equal(normalizeIpa('ˈæpl'), '/ˈæpl/');
  assert.equal(normalizeIpa("w'ɒn"), '/wɒn/');
  assert.equal(normalizeIpa('kənˈdɪʃənə'), '/kənˈdɪʃənə/');
  assert.equal(normalizeIpa('oʊ'), '/əʊ/');
  assert.equal(normalizeIpa('ˈkʌlə(r)'), '/ˈkʌlə/');
});

test('resolveEn 去掉省略号与 (be) 前缀', () => {
  assert.equal(resolveEn('(be) happy'), 'be happy');
  assert.equal(resolveEn('apple...'), 'apple');
});
```

**再写 `lib/normalize.mjs`**

```js
export const norm = (s) =>
  String(s).toLowerCase().replace(/[’']/g, "'").replace(/…/g, '...').replace(/\s+/g, ' ').trim();

const POS_PREFIX = /^(?:(?:n|v|adj|adv|pron|prep|conj|num|art|int|phr|phra|sent)\.\s*)+/i;

export function cleanGloss(raw, en) {
  let zh = String(raw || '')
    .replace(/\s+/g, ' ')
    .replace(/\s*（复数）\s*/g, '')
    .replace(/\s*\(复数\)\s*/g, '')
    .replace(POS_PREFIX, '')
    .replace(/^n\.X\s*/i, '')
    .replace(/…/g, '...')
    .replace(/\s*\.\.\.\s*/g, '...')
    .replace(/^[.\s]+|[.\s]+$/g, '')
    .replace(/\s*([，。；！？、：])\s*/g, '$1')
    .replace(/\s*([（【])\s*/g, '$1')
    .replace(/\s*([）】])\s*/g, '$1')
    .replace(/;+/g, '；')
    .replace(/,+/g, '，')
    .replace(/，?(?:等等|等)$/g, '')
    .trim();
  if (!zh) zh = en;
  return zh;
}

export function tidyZh(zh) {
  const out = String(zh || '')
    .replace(/^\s*\/\s*(?:n|v|adj|adv|pron|prep|conj|num|art|int|phr|sent)\.\s*/i, '')
    .replace(/\s+(?:n|v|adj|adv|pron|prep|conj|num|art|int|phr|sent)\.\s*/gi, '；')
    .replace(/⋯+/g, '…')
    .replace(/\.{3,}/g, '…')
    .replace(/\s*\(\s*/g, '（')
    .replace(/\s*\)\s*/g, '）')
    .replace(/!/g, '！')
    .replace(/\?/g, '？')
    .replace(/\s*([，。；！？、：（）])\s*/g, '$1')
    .replace(/；{2,}/g, '；')
    .replace(/^；+|；+$/g, '')
    .trim();
  return out || zh;
}

export function detectPos(raw, en) {
  const m = String(raw || '').match(POS_PREFIX);
  if (!m) return undefined;
  const s = m[0].toLowerCase();
  if (s.includes('phr')) return 'phr.';
  if (/\s/.test(String(en).trim())) return 'phr.';
  if (s.includes('adj')) return 'adj.';
  if (s.includes('adv')) return 'adv.';
  if (s.includes('pron')) return 'pron.';
  if (s.includes('prep')) return 'prep.';
  if (s.includes('conj')) return 'conj.';
  if (s.includes('num')) return 'num.';
  if (s.includes('art')) return 'art.';
  if (s.includes('int')) return 'int.';
  if (s.includes('n')) return 'n.';
  if (s.includes('v')) return 'v.';
  return undefined;
}

export const VOWELS = 'aeiouɑɒɔəɜɪʊʌæ';
export const DIPHTHONGS = ['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'ɪə', 'eə', 'ʊə', 'iə', 'uə'];
const isVowel = (ch) => VOWELS.includes(ch);

export function countSyllables(ipa) {
  let n = 0;
  for (let i = 0; i < ipa.length; i += 1) {
    if (!isVowel(ipa[i])) continue;
    if (DIPHTHONGS.includes(ipa.slice(i, i + 2))) i += 1;
    n += 1;
  }
  if (/[^aeiouɑɒɔəɜɪʊʌæ][ln]$/.test(ipa)) n += 1;
  return n;
}

export function normalizeIpa(raw) {
  let ipa = String(raw || '').trim().replace(/^\/|\/$/g, '');
  ipa = ipa.replace(/'/g, 'ˈ').replace(/"/g, 'ˌ').replace(/:/g, 'ː');
  ipa = ipa.replace(/ɹ/g, 'r').replace(/ɐ/g, 'ə').replace(/ɛ/g, 'e');
  ipa = ipa.replace(/ɚ/g, 'ə').replace(/ɝ/g, 'ɜː').replace(/oʊ/g, 'əʊ');
  ipa = ipa.replace(/\([^)]*\)/g, '').replace(/ˌ/g, '');
  ipa = ipa.split(/[,;]/)[0].trim();
  let out = '';
  for (let i = 0; i < ipa.length; i += 1) {
    const ch = ipa[i];
    if (ch === 'ˈ') {
      const next = ipa[i + 1] || '';
      if (isVowel(next) || DIPHTHONGS.includes(ipa.slice(i + 1, i + 3))) {
        let j = out.length;
        while (j > 0) {
          const prev = out[j - 1];
          if (isVowel(prev) || prev === 'ˈ' || prev === ' ' || prev === 'ː') break;
          j -= 1;
        }
        out = out.slice(0, j) + 'ˈ' + out.slice(j);
      } else out += ch;
    } else out += ch;
  }
  ipa = out.replace(/\s+/g, ' ').trim();
  if (countSyllables(ipa) <= 1) ipa = ipa.replace(/ˈ/g, '');
  ipa = ipa.replace(/a(?![ɪʊ])/g, 'æ');
  return '/' + ipa + '/';
}

export function resolveEn(raw) {
  const cleaned = String(raw || '')
    .replace(/\s+/g, ' ')
    .replace(/\s*(?:\.\.\.|…)\s*$/, '')
    .replace(/^\(be\)\s*/i, 'be ')
    .trim();
  return cleaned;
}
```

**运行**

```powershell
node --test skills/english-textbook-flashcards/tests/normalize.test.mjs
```

**Commit**

```
feat(skill): 抽出音标与释义规范化纯函数
```

---

## 任务 4：`lib/textbook.mjs` + `tests/fixtures/book.html`

**fixture** 从真实页面结构裁剪（两个单元，含音标与无音标各一条）：

```html
<div class="danci-wrap">
  <h2 class="title">三年级上册英语 Unit 1 Hello 单元单词表与音标释义</h2>
  <ul class="dc-list">
    <li class="dc-item"><p class="en">hello</p><div class="phonetic"><p class="text">hə'ləʊ</p></div><p class="cn">int.你好</p></li>
    <li class="dc-item"><p class="en">morning</p><p class="cn">n.早晨</p></li>
  </ul>
</div>
<div class="danci-wrap">
  <h2 class="title">三年级上册英语 Unit 2 Colours 单元单词表与音标释义</h2>
  <ul class="dc-list">
    <li class="dc-item"><p class="en">red</p><div class="phonetic"><p class="text">red</p></div><p class="cn">adj.红色的</p></li>
  </ul>
</div>
```

**`tests/textbook.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseBookHtml, replaceBook, findBook, sortIndex } from '../lib/textbook.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(dir, 'fixtures/book.html'), 'utf8');

test('parseBookHtml 解析单元与词条', () => {
  const units = parseBookHtml(html);
  assert.equal(units.length, 2);
  assert.equal(units[0].unit, 1);
  assert.equal(units[0].words.length, 2);
  assert.deepEqual(units[0].words[0], { en: 'hello', ipa: "hə'ləʊ", zh: 'int.你好' });
  assert.equal(units[0].words[1].ipa, '');
  assert.match(units[1].title, /Unit 2 Colours/);
});

test('replaceBook 只替换目标册并保持排序', () => {
  const index = [
    { grade: 2, term: 1, units: [] },
    { grade: 3, term: 1, units: [{ unit: 1, title: 'old', words: [] }] },
  ];
  const next = replaceBook(index, { grade: 3, term: 1, units: [{ unit: 1, title: 'new', words: [] }] });
  assert.equal(next.length, 2);
  assert.equal(findBook(next, 3, 1).units[0].title, 'new');
  assert.equal(next[0].grade, 2);
});

test('sortIndex 按年级学期排序', () => {
  const sorted = sortIndex([{ grade: 6, term: 2 }, { grade: 1, term: 1 }, { grade: 1, term: 2 }]);
  assert.deepEqual(sorted.map((b) => `${b.grade}-${b.term}`), ['1-1', '1-2', '6-2']);
});
```

**`lib/textbook.mjs`**

```js
export function stripTags(html) {
  return String(html)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseBookHtml(html) {
  const chunks = String(html).split('<div class="danci-wrap');
  const units = [];
  for (const chunk of chunks.slice(1)) {
    const titleMatch = chunk.match(/<h[23][^>]*class="title"[^>]*>([\s\S]*?)<\/h[23]>/i);
    if (!titleMatch) continue;
    const rawTitle = stripTags(titleMatch[1])
      .replace(/^.*?英语/i, '')
      .replace(/\s*(单词表音频与中文翻译|单元单词表与音标释义)\s*$/i, '')
      .trim();
    const unitMatch = rawTitle.match(/unit\s*(\d+)/i);
    if (!unitMatch) continue;
    const listStart = chunk.indexOf('dc-list');
    if (listStart === -1) continue;
    const items = [...chunk.slice(listStart).matchAll(
      /<li class="dc-item"[\s\S]*?<p class="en"[^>]*>([\s\S]*?)<\/p>([\s\S]*?)<p class="cn"[^>]*>([\s\S]*?)<\/p>/gi,
    )];
    const words = [];
    for (const m of items) {
      const en = stripTags(m[1]);
      if (!en) continue;
      const ipaMatch = m[2].match(/<div class="phonetic"[^>]*>[\s\S]*?<p class="text"[^>]*>([\s\S]*?)<\/p>/i);
      words.push({ en, ipa: ipaMatch ? stripTags(ipaMatch[1]) : '', zh: stripTags(m[3]) });
    }
    units.push({
      unit: Number(unitMatch[1]),
      title: rawTitle.replace(/\s*单元单词表与音标释义\s*$/, '').trim(),
      words,
    });
  }
  return units.sort((a, b) => a.unit - b.unit);
}

export const bookKey = (grade, term) => `${grade}-${term}`;

export function findBook(index, grade, term) {
  return (index || []).find((b) => Number(b.grade) === Number(grade) && Number(b.term) === Number(term));
}

export function sortIndex(index) {
  return [...index].sort((a, b) => a.grade - b.grade || a.term - b.term);
}

export function replaceBook(index, book) {
  const rest = (index || []).filter(
    (b) => !(Number(b.grade) === Number(book.grade) && Number(b.term) === Number(book.term)),
  );
  return sortIndex([...rest, book]);
}

export function flattenUnits(units) {
  return (units || []).flatMap((u) => u.words.map((w) => ({ ...w, unit: u.unit, unitTitle: u.title })));
}
```

**运行**

```powershell
node --test skills/english-textbook-flashcards/tests/textbook.test.mjs
```

**Commit**

```
feat(skill): 词表页面解析与册合并工具
```

---

## 任务 5：`profiles/hjbsz.json`

从 `scripts/build_textbook_index.mjs` 的 `BOOKS` 与 `scripts/build_words.mjs` 的 `UNIT_TITLE_FIX` 迁移。

```json
{
  "id": "hjbsz",
  "name": "沪教牛津版小学英语",
  "aliases": ["沪教牛津", "牛津上海版", "沪教版", "深圳牛津"],
  "terms": { "1": "上册", "2": "下册" },
  "source": {
    "type": "yyld",
    "base": "https://yyld.51jiaoxi.com",
    "files": ["hjbsz_danci.html", "hjbsq_danci.html"],
    "slug": {
      "1-1": "yishang", "1-2": "yixia",
      "2-1": "ershang", "2-2": "erxia",
      "3-1": "sanshang", "3-2": "sanxia",
      "4-1": "sishang", "4-2": "sixia",
      "5-1": "wushang", "5-2": "wuxia",
      "6-1": "liushang", "6-2": "liuxia"
    }
  },
  "ipaPolicy": ["override", "existing", "supplement", "page"],
  "unitTitleFix": {
    "1-1-1": "What is your family like?",
    "1-1-2": "How are you today?",
    "1-1-3": "What do you take to school?",
    "1-1-4": "What can you do?",
    "1-1-5": "What is your favourite animal?",
    "1-1-6": "What colours can you see?",
    "2-1-1": "What can you do with your five senses?",
    "2-1-2": "What do you like about your family?",
    "2-1-5": "What do you like about farms?",
    "2-1-6": "How do people celebrate the Mid-Autumn Festival?",
    "4-1-1": "Where do people live?",
    "4-1-2": "Where do animals live?",
    "4-1-3": "How do numbers help us?",
    "4-1-4": "How do we go shopping?",
    "4-1-5": "What are the four seasons?",
    "4-1-6": "How do plants grow?",
    "4-1-7": "How do we stay safe on the road?",
    "4-1-8": "What do our grandparents do?",
    "5-1-1": "What do we do at the weekend?",
    "5-1-2": "How do we stay healthy?",
    "5-1-3": "Which countries do you know?",
    "5-1-4": "Where do we go on holiday?",
    "5-1-5": "What are living things?",
    "5-1-6": "How can we protect the Earth?",
    "5-1-7": "What festivals do we have?",
    "5-1-8": "How does music make us feel?"
  },
  "contentPolicy": {
    "locatorOnly": "输入里的地区、年份仅用于定位教材，不写入站点内容、报告标题或提交信息。"
  }
}
```

> 注：`unitTitleFix` 的 key 是「年级-学期-单元」，与现有 `build_words.mjs` 完全一致。

**Commit**

```
feat(skill): 沪教牛津版教材档案
```

---

## 任务 6：`scripts/resolve.mjs`（TDD）

**测试**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRequest } from '../scripts/resolve.mjs';

const profile = { id: 'hjbsz', aliases: ['沪教牛津', '牛津上海版'] };

test('中文年级 + 上/下册', () => {
  assert.deepEqual(resolveRequest('整理三年级上的英语教材', profile), {
    ok: true, profile: 'hjbsz', grade: 3, term: 1, missing: [],
  });
  assert.equal(resolveRequest('五年级下册英语', profile).term, 2);
});

test('缩写 g3t1 / 3上 / 三上', () => {
  assert.equal(resolveRequest('g3t1 上新', profile).grade, 3);
  assert.equal(resolveRequest('g3t1 上新', profile).term, 1);
  assert.equal(resolveRequest('3下', profile).term, 2);
  assert.equal(resolveRequest('三上', profile).grade, 3);
});

test('全角数字', () => {
  assert.equal(resolveRequest('三年级上册', profile).grade, 3);
});

test('自然语言里带地区年份也能解析', () => {
  const r = resolveRequest('〈地区〉〈年份〉3年级上的英语内容', profile);
  assert.equal(r.ok, true);
  assert.equal(r.grade, 3);
  assert.equal(r.term, 1);
});

test('缺年级或学期时返回 missing', () => {
  assert.deepEqual(resolveRequest('整理英语教材', profile).missing, ['grade', 'term']);
  assert.deepEqual(resolveRequest('三年级英语', profile).missing, ['term']);
});

test('识别版本别名', () => {
  assert.equal(resolveRequest('沪教牛津 四年级下', profile).profile, 'hjbsz');
});
```

**实现要点**

```js
const CN_DIGITS = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6 };

export function resolveRequest(input, profile = { id: 'hjbsz', aliases: [] }) {
  const text = String(input || '')
    .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0))
    .trim();
  const missing = [];

  let grade = null;
  let term = null;

  const compact = text.match(/\bg\s*([1-6])\s*t\s*([12])\b/i);
  if (compact) {
    grade = Number(compact[1]);
    term = Number(compact[2]) === 1 ? 1 : 2;
  }

  if (!grade) {
    const gradeMatch =
      text.match(/([1-6一二三四五六])\s*年级/) ||
      text.match(/([1-6一二三四五六])\s*[上下]/);
    if (gradeMatch) grade = CN_DIGITS[gradeMatch[1]] || Number(gradeMatch[1]);
  }

  if (!term) {
    const termMatch =
      text.match(/(?:年级|[1-6一二三四五六])\s*([上下])/) ||
      text.match(/([上下])\s*[册学]/);
    if (termMatch) term = termMatch[1] === '下' ? 2 : 1;
  }
  if (!term && /(下\s*册|下\s*学期|第二学期|\bt\s*2\b|\bterm\s*2\b)/i.test(text)) term = 2;
  if (!term && /(上\s*册|上\s*学期|第一学期|\bt\s*1\b|\bterm\s*1\b)/i.test(text)) term = 1;

  if (!grade) missing.push('grade');
  if (!term) missing.push('term');

  return { ok: missing.length === 0, profile: profile.id, grade, term, missing };
}
```

CLI：打印 JSON；`!ok` 时退出码 2，并给出「请补充年级/学期」提示。

**Commit**

```
feat(skill): 自然语言解析教材册
```

---

## 任务 7：`scripts/fetch_words.mjs`（缓存优先）

**接口**

```js
export async function fetchBook(profile, grade, term, { fetchImpl = fetch } = {}) {
  const slug = profile.source.slug[`${grade}-${term}`];
  if (!slug) throw new Error(`档案没有 ${grade}-${term} 的 slug`);
  const tried = [];
  for (const file of profile.source.files) {
    const url = `${profile.source.base}/${slug}/${file}`;
    tried.push(url);
    try {
      const res = await fetchImpl(url);
      if (!res.ok) continue;
      const units = parseBookHtml(await res.text());
      if (units.length) return { url, units };
    } catch {
      // 试下一个文件名
    }
  }
  const err = new Error(`抓取失败，已尝试：\n${tried.join('\n')}`);
  err.tried = tried;
  throw err;
}
```

**CLI 行为**

- 参数：`--root`（默认 `process.cwd()`）、`--grade`、`--term`、`--profile`、`--offline`、`--force`
- 缓存：`data/sources/g{grade}t{term}.json`，结构 `{ profile, grade, term, fetchedAt, source, units }`
- `--offline`：只读缓存，没有则报错
- 有缓存且未 `--force`：直接用缓存，打印来源
- 成功：打印 `✓ 3 年级上：8 单元 / 250 词 / 190 条页面音标`
- **绝不修改** `data/textbook-index.json`

**测试**（不联网）：注入假 `fetchImpl`，第一次返回 404，第二次返回 fixture；断言选中的 URL 与解析结果；再断言 slug 缺失时抛错。

**Commit**

```
feat(skill): 词表抓取与本地缓存
```

---

## 任务 8：`scripts/merge_textbook.mjs`（默认只预览）

**纯函数**

```js
export function diffBook(current, incoming) {
  const before = new Map(flattenUnits(current?.units).map((w) => [norm(w.en), w]));
  const after = new Map(flattenUnits(incoming?.units).map((w) => [norm(w.en), w]));
  const added = [...after.keys()].filter((k) => !before.has(k)).map((k) => after.get(k));
  const removed = [...before.keys()].filter((k) => !after.has(k)).map((k) => before.get(k));
  const changed = [...after.keys()]
    .filter((k) => before.has(k))
    .map((k) => ({ before: before.get(k), after: after.get(k) }))
    .filter(({ before: a, after: b }) => a.zh !== b.zh || a.ipa !== b.ipa || a.unit !== b.unit);
  const titleChanges = (incoming?.units || [])
    .filter((u) => {
      const old = (current?.units || []).find((x) => x.unit === u.unit);
      return old && old.title !== u.title;
    })
    .map((u) => ({ unit: u.unit, before: (current.units.find((x) => x.unit === u.unit)).title, after: u.title }));
  return { added, removed, changed, titleChanges };
}
```

**CLI**

- `--write` 才落盘；默认 dry-run
- 预览输出 Markdown 表格，最多每类展示 20 条，其余折叠为「还有 N 条」
- 有删除项时，即使加了 `--write` 也要求再加 `--allow-remove`，否则拒绝写入
- 写入时 `replaceBook`，并保留其他册原样
- 写前打印 `将写入 data/textbook-index.json（仅 X 年级 X 册）`

**验收**

```powershell
node skills/english-textbook-flashcards/scripts/merge_textbook.mjs --root . --grade 3 --term 1
git status --short   # 必须无改动
```

**Commit**

```
feat(skill): 教材册合并与差异预览
```

---

## 任务 9：`scripts/audit.mjs`（只读，核心）

### 9.1 规则实现

`lib/audit-rules.mjs` 新增，导出 `auditBook({ units, words, allWords, skip })`，返回：

```js
{
  summary: { sourceWords, deckWords, missing, extra, unitMismatch, orderIssues, ipaIssues, glossIssues, iconIssues },
  sections: {
    missing: [], extra: [], unitMismatch: [], orderIssues: [],
    ipaIssues: [], glossIssues: [], iconIssues: [],
  },
}
```

每条问题统一结构：

```js
{ en, unit, detail, evidence, suggestion }
```

### 9.2 五类检查

1. **缺词 / 多词**
   - 源词序列去重（保留首次出现）后与词库 `level === 'core'` 的本册词做差集。
   - 归一化用 `norm(en)`。

2. **单元归属 / 顺序**
   - 单元号不同 → `unitMismatch`，证据 `源 U3 → 词库 U4`。
   - 顺序：把两侧都按「源顺序去重」展开，找出第一个错位位置，报告该词及前后各一个词。

3. **音标**
   - 缺失或不是 `/.../`
   - 含 `:` / `'` / `"`
   - `/a(?![ɪʊ])/`（未英式化）
   - 多音节（`countSyllables >= 2`）但没有 `ˈ`
   - 单音节却有 `ˈ`
   - 首尾空格

4. **释义**
   - 空值
   - 残留词性：`/(?:^|\s)(?:n|v|adj|adv|pron|prep|conj|num|art|int|phr|sent)\./i`
   - 半角标点：`/[(),;!?]/`
   - 残留 `...`（应为 `…`）
   - 与英文重复的后缀：`（word）`
   - 全局重复释义（同一中文对应多个词）

5. **图标**
   - 既无 `icon` 也无 `swatch` → 提示（功能词属预期）
   - `icon` 为 1–2 个拉丁字母且有 `swatch` → 不报
   - 颜色词（red/blue/green/yellow/black/white/orange/pink/purple/brown/grey）无图标 → 警告

### 9.3 报告

`reports/audit-g{grade}t{term}.md`：

```md
# 校对报告 · 三年级上（沪教牛津版）

- 教材源：248 词 / 8 单元
- 当前词库：250 词
- 生成时间：〈运行时〉

## 汇总

| 类别 | 数量 |
|---|---|
| 缺词 | 0 |
| 多词 | 2 |
| 单元归属 | 1 |
| 顺序 | 1 |
| 音标 | 3 |
| 释义 | 5 |
| 图标 | 2 |

## 1. 缺词

（无）

## 2. 多词

| 单词 | 单元 | 说明 | 建议 |
...
```

**只读保证**

- 审计函数不接收写入回调
- CLI 唯一写操作是 `fs.writeFileSync(reportPath, ...)`
- 测试：临时目录跑 CLI，记录 `assets/words.js` 与 `data/textbook-index.json` 的 hash，断言不变，且只新增 `reports/audit-g3t1.md`

### 9.4 源数据优先级

1. `data/sources/g{g}t{t}.json`（最新抓取）
2. `data/textbook-index.json` 对应册（离线可用）

报告里注明用的是哪一个。

**验收**

```powershell
node skills/english-textbook-flashcards/scripts/audit.mjs --root . --grade 3 --term 1
git status --short   # reports/ 已忽略，应无输出
```

**Commit**

```
feat(skill): 五类只读校对与 Markdown 报告
```

---

## 任务 10：`scripts/build.mjs` 与 `scripts/verify.mjs`

**build.mjs**

- 依次 `spawnSync(process.execPath, ['scripts/build_words.mjs'], { cwd: root, stdio: 'inherit' })`
- 再跑 `verify.mjs`
- 任一步非 0 退出即中止
- 打印「下一步：人工抽查 / 校对 / 发布」

**verify.mjs**

零依赖静态校验：

- `assets/words.js` 可解析，`WORD_CATEGORIES` 非空
- 每个词 `en / ipa / zh` 非空
- `core` 词必须有 `grade / term / unit`
- 分类 id 唯一
- `index.html` 中 `scene-total` 与 `assets/scenes.js` 的 `DIALOGUE_SCENES.length` 一致
- 警告项：缺失音标数、无图标数、重复释义数（不退出非 0，只打印）
- 硬失败项：解析失败、核心词缺字段、分类 id 重复

**测试**：临时目录放最小 `assets/words.js` 与 `index.html`，断言通过；再改坏一个字段断言失败。

**Commit**

```
feat(skill): 构建与静态校验
```

---

## 任务 11：`scripts/scaffold.mjs` + `templates/site/`

### 11.1 模板内容

从当前站点复制（一次性脚本完成，提交产物）：

```
templates/site/
├── index.html
├── favicon.svg
├── assets/
│   ├── app.js
│   ├── style.css
│   ├── scenes.js
│   ├── songs.js          # 去掉 audio 字段，避免引用不存在的 music/
│   ├── stories.js
│   ├── icons/            # 276 个图标，约 0.2 MB
│   └── words.js          # 隐藏的种子词库：全部 category.hidden = true
├── scripts/
│   ├── build_words.mjs
│   └── verify_words.cjs
├── data/
│   ├── textbook-index.json      # []
│   ├── word-overrides.json      # { "skip": [...], "rename": {}, "gloss": {}, "ipa": {}, "icon": {}, "pos": {}, "hiddenCategories": [] }
│   ├── ipa-supplement.json      # 复制当前 317 条
│   ├── word-icons.json          # 复制当前 685 条
│   └── sources/.gitkeep
└── music/
    └── README.md                # 说明：需要自有音频时放入 mp3 并给 songs.js 补 audio
```

> `songs.js` 用一次性脚本把 `audio: 'music/...'` 改成 `audio: null`，保留歌词与结构。

### 11.2 scaffold CLI

- `--target <dir>` 必填
- 目录非空且无 `--force` → 拒绝
- `fs.cpSync(template, target, { recursive: true })`
- 打印后续命令：

```
cd <target>
node scripts/build_words.mjs
# 或让 skill 执行导入：整理三年级上
```

**测试**：临时目录 scaffold → 断言关键文件存在、`words.js` 是全部 `hidden` 的种子词库、`data/textbook-index.json` 为 `[]`；重复执行无 `--force` 时报错。

**Commit**

```
feat(skill): 站点模板与空目录建站
```

---

## 任务 12：`SKILL.md` 与 references

### 12.1 SKILL.md 结构

```md
---
name: english-textbook-flashcards
description: 把小学英语教材整理成静态闪卡站点，或对已有词库做只读校对。当用户说「整理三年级上英语」「导入新册」「校对单词」「生成英语闪卡」「教材词表做成 HTML」时使用。支持一句话输入、单站点多册、校对只出报告。
---

# 英语教材闪卡

## 什么时候用
...

## 工作区判定
1. 当前目录同时有 index.html / assets/words.js / data/textbook-index.json → 直接用
2. 否则 --root <dir>
3. 都没有 → 先 scaffold

## 三种模式
### 导入
1. resolve
2. fetch_words
3. 预览
4. 等用户确认
5. merge --write
6. build
7. audit

### 校对
...

### 建站
...

## 安全边界
- 校对只读
- 写入前必须确认
- 音标优先级
- 地区/年份只用于定位
- 不自动 commit/push

## 命令速查
...

## 参考
- references/data-model.md
- references/ipa-rules.md
- references/audit-checklist.md
```

### 12.2 references

- `data-model.md`：五份输入/输出文件的字段与优先级
- `ipa-rules.md`：英式音标符号、重音、成音节、常见错误对照
- `audit-checklist.md`：五类规则的可判定条件与建议值写法

**验收**：把 SKILL.md 给一个不了解项目的读者看，能否独立跑通「校对三年级上」。

**Commit**

```
docs(skill): SKILL.md 与参考资料
```

---

## 任务 13：全局挂载

```powershell
New-Item -ItemType Junction `
  -Path "C:\Users\EDY\.config\opencode\skills\english-textbook-flashcards" `
  -Target "D:\pythonworkspace\projects\skills\english-textbook-flashcards"
Get-ChildItem "C:\Users\EDY\.config\opencode\skills\english-textbook-flashcards"
```

验收：

- 目录能列出 `SKILL.md`
- 修改项目内文件，全局路径同步可见
- 若 opencode 未识别，重启会话后再验证

**Commit**（仅项目侧）

```
chore(skill): 记录全局挂载方式
```

---

## 任务 14：端到端验收

### 14.1 校对只读

```powershell
node skills/english-textbook-flashcards/scripts/audit.mjs --root . --grade 3 --term 1
Get-Content reports\audit-g3t1.md -TotalCount 20
git status --short
```

通过标准：

- 报告生成，五个小节齐全
- `git status --short` 无输出

### 14.2 单元测试全绿

```powershell
node --test "skills/english-textbook-flashcards/tests/*.test.mjs"
```

### 14.3 导入 dry-run

```powershell
node skills/english-textbook-flashcards/scripts/fetch_words.mjs --root . --grade 3 --term 1 --force
node skills/english-textbook-flashcards/scripts/merge_textbook.mjs --root . --grade 3 --term 1
git status --short
```

通过标准：

- 抓取成功或明确报错（不吞异常）
- 预览显示新增/变更/删除数量
- 未写 `data/textbook-index.json`

### 14.4 建站

```powershell
$tmp = Join-Path $env:TEMP 'flashcard-scaffold-test'
Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
node skills/english-textbook-flashcards/scripts/scaffold.mjs --target $tmp
node $tmp\scripts\build_words.mjs
node $tmp\scripts\verify_words.cjs
```

通过标准：站点可打开，词库为 0 词但页面不报错。

### 14.5 发布

用户明确说「发布」后：

```powershell
git add -A
git commit -m "feat(skill): 英语教材闪卡通用 skill"
git push origin main
```

---

## 任务顺序与依赖

```
1 骨架
└─ 2 args/workspace
   ├─ 3 normalize
   ├─ 4 textbook
   │  ├─ 5 profile
   │  ├─ 6 resolve
   │  └─ 7 fetch
   ├─ 8 merge（依赖 3/4）
   ├─ 9 audit（依赖 3/4/2）
   ├─ 10 build/verify
   └─ 11 scaffold（依赖模板）
      └─ 12 SKILL.md
         ├─ 13 挂载
         └─ 14 验收
```

## 风险与回滚

| 风险 | 应对 |
|---|---|
| 页面结构变化导致解析为空 | 解析器返回空数组即报错，不用空数据覆盖任何文件 |
| 音标规则在新册上误判 | 审计只给建议值，不自动写 |
| 模板与项目站点漂移 | 模板一次性快照；项目站点后续改动不影响已生成站点 |
| 全局 junction 失效 | 重跑任务 13；项目内源文件始终是权威副本 |
| 导入误删词 | merge 默认 dry-run，删除项逐条列出并等待确认 |