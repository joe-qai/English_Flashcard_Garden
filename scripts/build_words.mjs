/**
 * 生成 assets/words.js
 *
 * 教材优先（textbook-first）：
 *  - 以 data/textbook-index.json 为词表底稿，按 12 册（一年级上 … 六年级下）建分类；
 *  - 每条词按首次出现位置打 grade / term / unit / unitTitle，重复词只保留一次；
 *  - 页面音标 → 现有词库音标 → data/ipa-supplement.json 依次兜底，统一为英式音标；
 *  - 现有词库中未被教材收录的词保留为「拓展」，沿用原主题分类、图标与释义；
 *  - 人工修正集中在 data/word-overrides.json（跳过、英文名、释义、音标、图标）。
 *
 * 输入：
 *  - data/textbook-index.json
 *  - assets/words.js（现有词库：图标、音标、释义、拓展词）
 *  - data/ipa-supplement.json
 *  - data/word-overrides.json
 *
 * 输出：assets/words.js
 */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const textbook = readJson('data/textbook-index.json');
const supplementRaw = readJson('data/ipa-supplement.json');
const overrides = readJson('data/word-overrides.json');
const iconMapRaw = readJson('data/word-icons.json');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/words.js'), 'utf8'), sandbox);
const currentCats = sandbox.window.WORD_CATEGORIES;

const norm = (s) => String(s).toLowerCase().replace(/[’']/g, "'").replace(/…/g, '...').replace(/\s+/g, ' ').trim();

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

/* ---------- 12 册教材分类 ---------- */
const BOOK_META = [
  { grade: 1, term: 1, icon: '📙', color: '#F6A94D' },
  { grade: 1, term: 2, icon: '📙', color: '#E9973D' },
  { grade: 2, term: 1, icon: '📘', color: '#6BB3F0' },
  { grade: 2, term: 2, icon: '📘', color: '#4F86D9' },
  { grade: 3, term: 1, icon: '📗', color: '#3E9C52' },
  { grade: 3, term: 2, icon: '📗', color: '#2F8F6B' },
  { grade: 4, term: 1, icon: '📕', color: '#E58B7B' },
  { grade: 4, term: 2, icon: '📕', color: '#D96A6A' },
  { grade: 5, term: 1, icon: '📔', color: '#7B4FA8' },
  { grade: 5, term: 2, icon: '📔', color: '#9B6BC4' },
  { grade: 6, term: 1, icon: '📚', color: '#0E8C8C' },
  { grade: 6, term: 2, icon: '📚', color: '#0B6E6E' },
];
const GRADE_CN = ['', '一', '二', '三', '四', '五', '六'];
const bookId = (grade, term) => `book-g${grade}t${term}`;

/* ---------- 现有词库：图标 / 音标 / 释义 / 拓展词 ---------- */
const deck = new Map();
const tokenIcon = new Map();
for (const cat of currentCats) {
  for (const w of cat.words) {
    deck.set(norm(w.en), { ...w, catId: cat.id });
    if (!/\s/.test(w.en) && w.icon && !tokenIcon.has(norm(w.en))) tokenIcon.set(norm(w.en), w.icon);
  }
}

/* ---------- 释义清理 ---------- */
const POS_PREFIX = /^(?:(?:n|v|adj|adv|pron|prep|conj|num|art|int|phr|phra|sent)\.\s*)+/i;
function cleanGloss(raw, en) {
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

function detectPos(raw, en) {
  const m = String(raw || '').match(POS_PREFIX);
  if (!m) return undefined;
  const s = m[0].toLowerCase();
  if (s.includes('phr')) return 'phr.';
  if (/\s/.test(en.trim())) return 'phr.';
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

/* ---------- 英式音标规范化 ---------- */
const VOWELS = 'aeiouɑɒɔəɜɪʊʌæ';
const DIPHTHONGS = ['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'ɪə', 'eə', 'ʊə', 'iə', 'uə'];
const isVowel = (ch) => VOWELS.includes(ch);

function countSyllables(ipa) {
  let n = 0;
  for (let i = 0; i < ipa.length; i++) {
    if (!isVowel(ipa[i])) continue;
    const pair = ipa.slice(i, i + 2);
    if (DIPHTHONGS.includes(pair)) i += 1;
    n += 1;
  }
  return n;
}

function normalizeIpa(raw) {
  let ipa = String(raw || '').trim().replace(/^\/|\/$/g, '');
  ipa = ipa.replace(/ɹ/g, 'r').replace(/ɐ/g, 'ə').replace(/ɛ/g, 'e');
  ipa = ipa.replace(/ɚ/g, 'ə').replace(/ɝ/g, 'ɜː').replace(/oʊ/g, 'əʊ');
  ipa = ipa.replace(/\([^)]*\)/g, '').replace(/ˌ/g, '');
  ipa = ipa.split(/[,;]/)[0].trim();
  let out = '';
  for (const ch of ipa) {
    if (ch === 'ˈ') {
      let j = out.length;
      while (j > 0) {
        const prev = out[j - 1];
        if (isVowel(prev) || prev === 'ˈ' || prev === ' ' || prev === 'ː' || prev === "'") break;
        j -= 1;
      }
      out = out.slice(0, j) + 'ˈ' + out.slice(j);
    } else out += ch;
  }
  ipa = out.replace(/\s+/g, ' ').trim();
  if (countSyllables(ipa) <= 1) ipa = ipa.replace(/ˈ/g, '');
  ipa = ipa.replace(/a(?![ɪʊ])/g, 'æ');
  return '/' + ipa + '/';
}

/* ---------- 合并教材词条 ---------- */
const overridesSkip = new Set((overrides.skip || []).map(norm));
const rename = new Map(Object.entries(overrides.rename || {}).map(([k, v]) => [norm(k), v]));
const ipaOverride = new Map(Object.entries(overrides.ipa || {}).map(([k, v]) => [norm(k), v]));
const glossOverride = new Map(Object.entries(overrides.gloss || {}).map(([k, v]) => [norm(k), v]));
const iconOverride = new Map(Object.entries(overrides.icon || {}).map(([k, v]) => [norm(k), v]));
const iconMap = new Map(Object.entries(iconMapRaw).map(([k, v]) => [norm(k), v]));
const supplement = new Map(Object.entries(supplementRaw).map(([k, v]) => [norm(k), v]));
const posOverride = new Map(Object.entries(overrides.pos || {}).map(([k, v]) => [norm(k), v]));

function resolveEn(raw) {
  const cleaned = String(raw || '')
    .replace(/\s+/g, ' ')
    .replace(/\s*(?:\.\.\.|…)\s*$/, '')
    .replace(/^\(be\)\s*/i, 'be ')
    .trim();
  return rename.get(norm(cleaned)) || cleaned;
}

const textbookWords = new Map();
const textbookOrder = [];
for (const book of textbook) {
  const unitTitleByUnit = new Map();
  for (const unit of book.units) {
    const title = UNIT_TITLE_FIX[`${book.grade}-${book.term}-${unit.unit}`]
      || unit.title.replace(/^unit\s*\d+\s*/i, '').trim()
      || null;
    unitTitleByUnit.set(unit.unit, title);
    for (const entry of unit.words) {
      const en = resolveEn(entry.en);
      if (!en || overridesSkip.has(norm(en))) continue;
      const key = norm(en);
      const existing = textbookWords.get(key);
      if (existing) {
        if (!existing.ipa && entry.ipa) existing.ipa = normalizeIpa(entry.ipa);
        continue;
      }
      textbookWords.set(key, {
        en,
        key,
        textbookZh: entry.zh,
        pageIpa: entry.ipa ? normalizeIpa(entry.ipa) : '',
        grade: book.grade,
        term: book.term,
        unit: unit.unit,
        unitTitle: unitTitleByUnit.get(unit.unit),
      });
      textbookOrder.push(key);
    }
  }
}

/* ---------- 组装核心词 ---------- */
const missingIpa = [];
const missingIcon = [];
const coreByBook = new Map();
for (const key of textbookOrder) {
  const tw = textbookWords.get(key);
  const old = deck.get(key);
  const ipa = (ipaOverride.has(key) ? normalizeIpa(ipaOverride.get(key)) : '')
    || tw.pageIpa
    || (old && old.ipa ? normalizeIpa(old.ipa) : '')
    || (supplement.has(key) ? normalizeIpa(supplement.get(key)) : '');
  if (!ipa) missingIpa.push(tw.en);

  let icon = iconOverride.get(key) || iconMap.get(key) || iconMap.get(key.replace(/[.!?]+$/g, '')) || (old && old.icon) || '';
  if (!icon) {
    const parts = key.split(' ').filter(Boolean).reverse();
    for (const p of parts) {
      const pKey = norm(p);
      if (iconMap.has(pKey)) { icon = iconMap.get(pKey); break; }
      if (tokenIcon.has(pKey)) { icon = tokenIcon.get(pKey); break; }
    }
  }
  if (!icon && !(old && old.swatch)) missingIcon.push(tw.en);

  let zh = glossOverride.get(key) || (old && old.zh) || cleanGloss(tw.textbookZh, tw.en);
  // 旧词库的释义可能带「（英文）」，与英文完全重复的去重后缀可以直接去掉
  const suffixRe = new RegExp('\\s*（\\s*' + tw.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*）\\s*$', 'i');
  zh = zh.replace(suffixRe, '').trim() || zh;
  const word = {
    en: tw.en,
    ipa,
    zh,
    icon: icon || undefined,
    swatch: old && old.swatch,
    pos: posOverride.get(key) || (old && old.pos) || detectPos(tw.textbookZh, tw.en),
    countable: old && old.countable,
    plural: old && old.plural,
    grade: tw.grade,
    term: tw.term,
    unit: tw.unit,
    unitTitle: tw.unitTitle,
    level: 'core',
  };
  const bookKey = `${tw.grade}-${tw.term}`;
  if (!coreByBook.has(bookKey)) coreByBook.set(bookKey, []);
  coreByBook.get(bookKey).push(word);
}

/* ---------- 拓展词：现有词库中未被教材收录的词 ---------- */
const textKeys = new Set(textbookWords.keys());
const extCats = [];
const hiddenIds = new Set((overrides.hiddenCategories || []));
const extSeen = new Set();
for (const cat of currentCats) {
  if (cat.hidden || cat.group === 'textbook' || /^book-g/.test(cat.id) || hiddenIds.has(cat.id)) continue;
  const words = [];
  for (const old of cat.words) {
    const key = norm(old.en);
    if (textKeys.has(key) || extSeen.has(key)) continue;
    extSeen.add(key);
    const icon = iconOverride.get(key) || iconMap.get(key) || old.icon;
    let zhExt = glossOverride.get(key) || old.zh;
    const suffixRe = new RegExp('\\s*（\\s*' + old.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*）\\s*$', 'i');
    zhExt = zhExt.replace(suffixRe, '').trim() || zhExt;
    words.push({
      en: old.en,
      ipa: ipaOverride.get(key) || normalizeIpa(old.ipa),
      zh: zhExt,
      icon,
      swatch: old.swatch,
      pos: old.pos,
      countable: old.countable,
      plural: old.plural,
      level: 'extension',
    });
  }
  if (words.length) extCats.push({ ...cat, words });
}

/* ---------- 组装分类 ---------- */
const cats = [];
for (const meta of BOOK_META) {
  const bookKey = `${meta.grade}-${meta.term}`;
  const words = coreByBook.get(bookKey) || [];
  cats.push({
    id: bookId(meta.grade, meta.term),
    en: `Grade ${meta.grade} ${meta.term === 1 ? 'A' : 'B'}`,
    zh: `${GRADE_CN[meta.grade]}年级${meta.term === 1 ? '上' : '下'}册`,
    icon: meta.icon,
    color: meta.color,
    group: 'textbook',
    words,
  });
}
for (const cat of extCats) cats.push(cat);

/* ---------- 释义唯一性检查 ---------- */
const zhSeen = new Map();
const dupZh = [];
for (const c of cats) {
  for (const w of c.words) {
    const k = w.zh.trim();
    if (!zhSeen.has(k)) {
      zhSeen.set(k, w.en);
      continue;
    }
    dupZh.push(`${w.en} / ${zhSeen.get(k)} -> ${k}`);
    w.zh = `${k}（${w.en}）`;
    zhSeen.set(w.zh, w.en);
  }
}

/* ---------- 序列化 ---------- */
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
lines.push(' * - grade/term/unit：沪教牛津版小学教材位置，1-6 年级；按册分成 12 个教材分类');
lines.push(' * - level：core = 教材词；extension = 拓展词（教材之外的常用词）');
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
  if (c.hidden) lines.push('    hidden: true,');
  lines.push('    words: [');
  for (const w of c.words) lines.push(fmtWord(w));
  lines.push('    ],');
  lines.push('  },');
}
lines.push('];');
lines.push('');

fs.writeFileSync(path.join(root, 'assets/words.js'), lines.join('\n'), 'utf8');

const coreCount = [...coreByBook.values()].reduce((n, list) => n + list.length, 0);
const extCount = extCats.reduce((n, c) => n + c.words.length, 0);
console.log(`textbook entries: ${textbookOrder.length}, words: ${coreCount} core + ${extCount} extension = ${coreCount + extCount}`);
console.log(`categories: ${cats.length} (12 textbook + ${extCats.length} theme)`);
if (missingIpa.length) console.log(`MISSING IPA (${missingIpa.length}): ${missingIpa.join(', ')}`);
if (missingIcon.length) console.log(`MISSING ICON (${missingIcon.length}): ${missingIcon.join(', ')}`);
if (dupZh.length) console.log(`DUPLICATE ZH (${dupZh.length}): ${dupZh.join(' | ')}`);