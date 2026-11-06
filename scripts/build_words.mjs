/**
 * 生成 assets/words.js
 *
 * 输入：
 *  - assets/words.js（现有 648 词，作为基础词库）
 *  - data/word-additions.json（新增主题、补词、英式拼写与释义修正）
 *  - data/textbook-index.json（沪教牛津版深圳用公开词表，用于打年级/学期/单元标签）
 *
 * 规则：
 *  - 与教材词表匹配的词标 core，并带 grade/term/unit/unitTitle；
 *  - 新增核心主题没有匹配到教材的词，落到该主题的 defaultGrade，仍算 core；
 *  - 其余词标 extension，默认不在「教材核心」视图展示。
 */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = process.cwd();
const loadWindow = (file) => {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox);
  return sandbox.window;
};

const win = loadWindow('data/words.base.js');
const baseCats = win.WORD_CATEGORIES;
const add = JSON.parse(fs.readFileSync(path.join(root, 'data/word-additions.json'), 'utf8'));
const textbook = JSON.parse(fs.readFileSync(path.join(root, 'data/textbook-index.json'), 'utf8'));

const norm = (s) => String(s).toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();

/* ---------- 教材单元标题修正（公开词表未给出主题，或空格粘连） ---------- */
const UNIT_TITLE_FIX = {
  '1-1-1': 'What is your family like?',
  '1-1-2': 'How are you today?',
  '1-1-3': 'What do you take to school?',
  '1-1-4': 'What can you do?',
  '1-1-5': 'What is your favourite animal?',
  '1-1-6': 'What colours can you see?',
  '2-1-1': 'What can you do with your five senses?',
  '2-1-2': 'What do you like about your family?',
  '2-1-5': 'What do you like about farms?',
  '2-1-6': 'How do people celebrate the Mid-Autumn Festival?',
  '4-1-1': 'Where do people live?',
  '4-1-2': 'Where do animals live?',
  '4-1-3': 'How do numbers help us?',
  '4-1-4': 'How do we go shopping?',
  '4-1-5': 'What are the four seasons?',
  '4-1-6': 'How do plants grow?',
  '4-1-7': 'How do we stay safe on the road?',
  '4-1-8': 'What do our grandparents do?',
  '5-1-1': 'What do we do at the weekend?',
  '5-1-2': 'How do we stay healthy?',
  '5-1-3': 'Which countries do you know?',
  '5-1-4': 'Where do we go on holiday?',
  '5-1-5': 'What are living things?',
  '5-1-6': 'How can we protect the Earth?',
  '5-1-7': 'What festivals do we have?',
  '5-1-8': 'How does music make us feel?',
};

/* ---------- 英式拼写对应的音标修正 ---------- */
const IPA_FIX = {
  grey: '/ɡreɪ/',
  pyjamas: '/pəˈdʒɑːməz/',
  trainers: '/ˈtreɪnəz/',
  biscuit: '/ˈbɪskɪt/',
  chips: '/tʃɪps/',
  underground: '/ˈʌndəɡraʊnd/',
  zip: '/zɪp/',
  armour: '/ˈɑːmə/',
  metre: '/ˈmiːtə/',
  litre: '/ˈliːtə/',
  rubber: '/ˈrʌbə/',
  'school bag': '/skuːl bæɡ/',
  fridge: '/frɪdʒ/',
  'police officer': '/pəˈliːs ˈɒfɪsə/',
};

const UNCOUNTABLE = new Set([
  'bread', 'rice', 'milk', 'juice', 'meat', 'water', 'soup', 'cheese', 'chocolate',
  'paper', 'hair', 'money', 'luggage', 'homework', 'information', 'news', 'music',
  'art', 'tea', 'coffee', 'sugar', 'salt', 'rain', 'wind', 'snow',
]);
const PLURAL_ONLY = new Set([
  'noodles', 'chopsticks', 'scissors', 'trousers', 'glasses', 'socks', 'shorts',
  'jeans', 'clothes', 'parents',
]);

/* ---------- 1. 整理基础分类 ---------- */
const GROUP = {
  school: ['stationery', 'colors', 'food', 'measure', 'jobs', 'time', 'weather', 'seasons', 'sports-general', 'family', 'feelings', 'school', 'chinese-festivals'],
  life: ['body', 'health', 'clothing', 'transport', 'shopping', 'rooms', 'tools', 'furniture', 'kitchenware', 'routines'],
};

const cats = baseCats.map((c) => ({
  id: c.id,
  en: c.en,
  zh: c.zh,
  icon: c.icon,
  color: c.color,
  group: GROUP.school.includes(c.id) ? 'school' : GROUP.life.includes(c.id) ? 'life' : 'fun',
  hidden: add.hiddenCategories.includes(c.id),
  words: c.words.map((w) => ({ ...w })),
}));

const byId = new Map(cats.map((c) => [c.id, c]));
const seenEn = new Map();

/* 颜色类补 orange：从水果类移出，避免同一英文出现两次 */
const fruits = byId.get('fruits');
if (fruits) fruits.words = fruits.words.filter((w) => norm(w.en) !== 'orange');

/* 个别词放错分类时在这里搬到更合适的位置（保持英文唯一） */
const MOVED_WORDS = {
  helmet: 'clothing',
};
for (const [en, targetId] of Object.entries(MOVED_WORDS)) {
  const target = byId.get(targetId);
  if (!target) continue;
  for (const c of cats) {
    if (c.id === targetId) continue;
    const idx = c.words.findIndex((w) => norm(w.en) === norm(en));
    if (idx !== -1) {
      const moved = c.words.splice(idx, 1)[0];
      target.words.push(moved);
      break;
    }
  }
}

/* ---------- 2. 英式拼写 / 英文名 / 释义修正 ---------- */
const ipaFix = new Map(Object.entries(IPA_FIX).map(([k, v]) => [k, v]));
for (const c of cats) {
  for (const w of c.words) {
    const key = norm(w.en);
    if (add.rename[key]) w.en = add.rename[key];
    if (add.enRename[w.en]) w.en = add.enRename[w.en];
    if (add.glossFix[w.en]) w.zh = add.glossFix[w.en];
    if (ipaFix.has(norm(w.en))) w.ipa = ipaFix.get(norm(w.en));
  }
}

/* ---------- 3. 新增分类与补词 ---------- */
cats.forEach((c) => c.words.forEach((w) => seenEn.set(norm(w.en), c.id)));
const addedWords = [];
for (const cat of add.categories) {
  if (byId.has(cat.id)) continue;
  const words = [];
  for (const w of cat.words) {
    const key = norm(w.en);
    if (seenEn.has(key)) {
      console.warn(`skip duplicate en: ${w.en} (already in ${seenEn.get(key)})`);
      continue;
    }
    seenEn.set(key, cat.id);
    words.push({ ...w });
    addedWords.push(w.en);
  }
  const entry = {
    id: cat.id,
    en: cat.en,
    zh: cat.zh,
    icon: cat.icon,
    color: cat.color,
    group: cat.group,
    defaultGrade: cat.defaultGrade,
    words,
  };
  cats.push(entry);
  byId.set(cat.id, entry);
}

for (const [catId, list] of Object.entries(add.addTo)) {
  const cat = byId.get(catId);
  if (!cat) continue;
  for (const w of list) {
    const key = norm(w.en);
    if (seenEn.has(key)) {
      console.warn(`skip duplicate en: ${w.en} (already in ${seenEn.get(key)})`);
      continue;
    }
    seenEn.set(key, catId);
    cat.words.push({ ...w });
    addedWords.push(w.en);
  }
}

const PLURAL_ALIAS = { socks: 'sock' };

const FORCE_PLACE = {
  grey: { grade: 3, term: 2, unit: 5, unitTitle: 'Where can we see colours?' },
};

/* ---------- 4. 教材位置索引 ---------- */
const place = new Map();
for (const book of textbook) {
  for (const unit of book.units) {
    for (const w of unit.words) {
      const key = norm(w.en);
      const info = {
        grade: book.grade,
        term: book.term,
        unit: unit.unit,
        unitTitle: UNIT_TITLE_FIX[`${book.grade}-${book.term}-${unit.unit}`] || unit.title.replace(/^unit\s*\d+\s*/i, '').trim() || null,
      };
      if (!place.has(key)) place.set(key, info);
      const renamed = add.rename[key];
      if (renamed && !place.has(norm(renamed))) place.set(norm(renamed), info);
    }
  }
}

/* ---------- 5. 打标签 ---------- */
let core = 0;
let ext = 0;
for (const c of cats) {
  for (const w of c.words) {
    const key = norm(w.en);
    const p = FORCE_PLACE[key] || place.get(key) || place.get(PLURAL_ALIAS[key]);
    if (p) {
      w.grade = p.grade;
      w.term = p.term;
      w.unit = p.unit;
      w.unitTitle = p.unitTitle;
      w.level = 'core';
      core += 1;
    } else if (c.defaultGrade) {
      w.grade = c.defaultGrade;
      w.term = null;
      w.unit = null;
      w.unitTitle = null;
      w.level = 'core';
      core += 1;
    } else {
      w.grade = null;
      w.term = null;
      w.unit = null;
      w.unitTitle = null;
      w.level = 'extension';
      ext += 1;
    }

    if (w.pos === 'n.' && w.countable === undefined) {
      const k = norm(w.en);
      if (UNCOUNTABLE.has(k)) w.countable = false;
      else if (PLURAL_ONLY.has(k)) w.plural = true;
      else if (!k.includes(' ') && !/s$/.test(k)) w.countable = true;
    }
  }
}

/* ---------- 6. 释义唯一性检查 ---------- */
const zhSeen = new Map();
for (const c of cats) {
  for (const w of c.words) {
    const k = w.zh.trim();
    if (!zhSeen.has(k)) {
      zhSeen.set(k, w.en);
      continue;
    }
    const other = zhSeen.get(k);
    console.warn(`duplicate zh "${k}": ${w.en} / ${other} -> disambiguate`);
    w.zh = `${k}（${c.zh}）`;
    zhSeen.set(w.zh, w.en);
  }
}

/* ---------- 7. 排序 ---------- */
for (const c of cats) {
  if (c.defaultGrade) {
    c.words.sort((a, b) => {
      const ga = a.grade ?? 99;
      const gb = b.grade ?? 99;
      if (ga !== gb) return ga - gb;
      const ta = a.term ?? 9;
      const tb = b.term ?? 9;
      if (ta !== tb) return ta - tb;
      const ua = a.unit ?? 99;
      const ub = b.unit ?? 99;
      return ua - ub;
    });
  }
}

/* ---------- 8. 序列化 ---------- */
const fmtStr = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const fieldOrder = ['en', 'ipa', 'zh', 'icon', 'swatch', 'pos', 'countable', 'plural', 'grade', 'term', 'unit', 'unitTitle', 'level'];
function fmtWord(w) {
  const parts = [];
  for (const key of fieldOrder) {
    if (w[key] === undefined || w[key] === null || w[key] === '') continue;
    const v = w[key];
    parts.push(`${key}: ${typeof v === 'number' || typeof v === 'boolean' ? v : fmtStr(v)}`);
  }
  return `      { ${parts.join(', ')} },`;
}

const lines = [];
lines.push('/**');
lines.push(' * 单词数据源');
lines.push(' * 结构：{ id, en, zh, icon, color, group, words: [{ en, ipa, zh, icon, pos, grade, term, unit, unitTitle, level }] }');
lines.push(' * - grade/term/unit：沪教牛津版（深圳用）小学教材位置，1-6 年级');
lines.push(' * - level：core = 教材核心词；extension = 拓展词（默认不在教材视图展示）');
lines.push(' * - 音标统一英式；卡片默认不展示音标，点击后显示');
lines.push(' * 纯静态脚本（非 ES Module），可直接用 file:// 打开。');
lines.push(' */');
lines.push('window.WORD_CATEGORIES = [');
for (const c of cats) {
  lines.push('  {');
  lines.push(`    id: ${fmtStr(c.id)},`);
  lines.push(`    en: ${fmtStr(c.en)},`);
  lines.push(`    zh: ${fmtStr(c.zh)},`);
  lines.push(`    icon: ${fmtStr(c.icon)},`);
  lines.push(`    color: ${fmtStr(c.color)},`);
  lines.push(`    group: ${fmtStr(c.group)},`);
  if (c.defaultGrade) lines.push(`    defaultGrade: ${c.defaultGrade},`);
  if (c.hidden) lines.push('    hidden: true,');
  lines.push('    words: [');
  for (const w of c.words) lines.push(fmtWord(w));
  lines.push('    ],');
  lines.push('  },');
}
lines.push('];');
lines.push('');

fs.writeFileSync(path.join(root, 'assets/words.js'), lines.join('\n'), 'utf8');

console.log(`categories: ${cats.length}`);
console.log(`words: ${cats.reduce((n, c) => n + c.words.length, 0)} (core ${core}, extension ${ext})`);
console.log(`new words: ${addedWords.length}`);