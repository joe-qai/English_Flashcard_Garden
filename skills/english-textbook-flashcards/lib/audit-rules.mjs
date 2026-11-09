import { norm, countSyllables, tidyZh } from './normalize.mjs';

const COLOR_WORDS = new Set([
  'red', 'blue', 'green', 'yellow', 'black', 'white',
  'orange', 'pink', 'purple', 'brown', 'grey', 'gray',
]);

const POS_IN_GLOSS = /(?:^|\s)(?:n|v|adj|adv|pron|prep|conj|num|art|int|phr|sent)\./i;
const HALF_WIDTH = /[(),;!?]/;
const ELLIPSIS = /\.\.\./;

function sourceSequence(units) {
  const seen = new Set();
  const seq = [];
  for (const unit of units || []) {
    for (const word of unit.words || []) {
      const key = norm(word.en);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      seq.push({
        en: word.en,
        key,
        unit: Number(unit.unit),
        unitTitle: unit.title,
        ipa: word.ipa || '',
        zh: word.zh || '',
      });
    }
  }
  return seq;
}

function orderedDiff(sourceSeq, deckSeq) {
  const sourceKeys = new Set(sourceSeq.map((w) => w.key));
  const deckKeys = new Set(deckSeq.map((w) => norm(w.en)));
  const a = sourceSeq.filter((w) => deckKeys.has(w.key));
  const b = deckSeq.filter((w) => sourceKeys.has(norm(w.en)));
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i += 1) {
    if (a[i].key !== norm(b[i].en)) {
      return {
        index: i,
        expected: a[i].en,
        actual: b[i].en,
        expectedPrev: i > 0 ? a[i - 1].en : null,
        actualPrev: i > 0 ? b[i - 1].en : null,
      };
    }
  }
  return null;
}

export function auditBook({ units, words, allWords, skip }) {
  const skipSet = new Set((skip || []).map((w) => norm(w)));
  const globalKeys = new Set((allWords || words || []).filter((w) => w && w.en).map((w) => norm(w.en)));
  const sourceSeq = sourceSequence(units).filter((w) => !skipSet.has(w.key));
  const sourceMap = new Map(sourceSeq.map((w) => [w.key, w]));

  const deck = (words || []).filter((w) => w && w.en);
  const deckMap = new Map();
  for (const w of deck) {
    const key = norm(w.en);
    if (!deckMap.has(key)) deckMap.set(key, w);
  }

  const missing = sourceSeq
    .filter((s) => !globalKeys.has(s.key))
    .map((s) => ({
      en: s.en,
      unit: s.unit,
      detail: '教材源有，词库没有',
      evidence: `U${s.unit} · ${s.zh || '无释义'}`,
      suggestion: '确认是否漏收；确认后加入 data/textbook-index.json 再重建',
    }));

  const extra = deck
    .filter((w) => !sourceMap.has(norm(w.en)))
    .map((w) => ({
      en: w.en,
      unit: w.unit,
      detail: '词库有，教材源没有',
      evidence: `U${w.unit ?? '?'} · ${w.zh || '无释义'}`,
      suggestion: '核对是否该册词；误收则从教材源移除，或改成拓展词',
    }));

  const unitMismatch = [];
  for (const s of sourceSeq) {
    const w = deckMap.get(s.key);
    if (!w) continue;
    if (Number(w.unit) !== s.unit) {
      unitMismatch.push({
        en: w.en,
        unit: s.unit,
        detail: `单元归属不一致`,
        evidence: `源 U${s.unit} → 词库 U${w.unit}`,
        suggestion: `确认教材单元后改成 U${s.unit}`,
      });
    }
  }

  const diff = orderedDiff(sourceSeq, deck);
  const orderIssues = diff
    ? [{
        en: diff.actual,
        unit: null,
        detail: `第 ${diff.index + 1} 个共有词顺序不一致`,
        evidence: `源顺序 ${diff.expected}；词库顺序 ${diff.actual}` +
          (diff.expectedPrev ? `（前一个共有词：${diff.expectedPrev} / ${diff.actualPrev}）` : ''),
        suggestion: `按教材顺序重排，确保 ${diff.expected} 在 ${diff.actual} 之前`,
      }]
    : [];

  const ipaIssues = [];
  const glossIssues = [];
  const iconIssues = [];
  const zhMap = new Map();

  for (const w of deck) {
    const ipa = String(w.ipa || '').trim();
    if (!ipa) {
      ipaIssues.push({ en: w.en, unit: w.unit, detail: '缺音标', evidence: 'ipa 为空', suggestion: '补 data/ipa-supplement.json 或人工 override' });
    } else {
      if (!/^\/.*\/$/.test(ipa)) {
        ipaIssues.push({ en: w.en, unit: w.unit, detail: '音标缺少首尾斜杠', evidence: ipa, suggestion: `/${ipa.replace(/^\/|\/$/g, '')}/` });
      }
      if (/[:'"]/.test(ipa)) {
        ipaIssues.push({ en: w.en, unit: w.unit, detail: '音标含未规范化符号', evidence: ipa, suggestion: '统一为 ː / ˈ / ˌ' });
      }
      const inner = ipa.replace(/^\/|\/$/g, '');
      if (/a(?![ɪʊ])/.test(inner)) {
        ipaIssues.push({ en: w.en, unit: w.unit, detail: '音标里的 a 未英式化', evidence: ipa, suggestion: inner.replace(/a(?![ɪʊ])/g, 'æ') });
      }
      if (!inner.includes(' ') && countSyllables(inner) >= 2 && !inner.includes('ˈ')) {
        ipaIssues.push({ en: w.en, unit: w.unit, detail: '多音节缺重音', evidence: ipa, suggestion: '补 ˈ' });
      }
      if (!inner.includes(' ') && countSyllables(inner) <= 1 && inner.includes('ˈ')) {
        ipaIssues.push({ en: w.en, unit: w.unit, detail: '单音节不应标重音', evidence: ipa, suggestion: inner.replace(/ˈ/g, '') });
      }
    }

    const zh = String(w.zh || '').trim();
    if (!zh) {
      glossIssues.push({ en: w.en, unit: w.unit, detail: '释义为空', evidence: 'zh 为空', suggestion: '按教材释义补全' });
    } else {
      if (POS_IN_GLOSS.test(zh)) {
        glossIssues.push({ en: w.en, unit: w.unit, detail: '释义残留词性', evidence: zh, suggestion: tidyZh(zh) });
      }
      if (HALF_WIDTH.test(zh)) {
        glossIssues.push({ en: w.en, unit: w.unit, detail: '释义含半角标点', evidence: zh, suggestion: tidyZh(zh) });
      }
      if (ELLIPSIS.test(zh)) {
        glossIssues.push({ en: w.en, unit: w.unit, detail: '释义省略号未统一', evidence: zh, suggestion: tidyZh(zh) });
      }
      const suffix = `（${w.en}）`;
      if (zh.endsWith(suffix)) {
        glossIssues.push({ en: w.en, unit: w.unit, detail: '释义带与英文重复的后缀', evidence: zh, suggestion: zh.slice(0, -suffix.length) });
      }
      const key = zh;
      if (!zhMap.has(key)) zhMap.set(key, []);
      zhMap.get(key).push(w.en);
    }

    if (!w.icon && !w.swatch) {
      iconIssues.push({ en: w.en, unit: w.unit, detail: '无图标也无色块', evidence: 'icon/swatch 都为空', suggestion: '功能词可保留首字母色块；实物词补 data/word-icons.json' });
    }
    if (COLOR_WORDS.has(norm(w.en)) && !w.icon) {
      iconIssues.push({ en: w.en, unit: w.unit, detail: '颜色词缺图标', evidence: 'icon 为空', suggestion: '补对应颜色块或 emoji' });
    }
  }

  for (const [zh, ens] of zhMap) {
    if (ens.length < 2) continue;
    for (const en of ens) {
      glossIssues.push({
        en,
        unit: deckMap.get(norm(en))?.unit,
        detail: '释义与其他词重复',
        evidence: `「${zh}」同时对应 ${ens.join(' / ')}`,
        suggestion: '按语义拆分中文释义，避免一对多',
      });
    }
  }

  const sections = { missing, extra, unitMismatch, orderIssues, ipaIssues, glossIssues, iconIssues };
  const summary = {
    sourceWords: sourceSeq.length,
    deckWords: deckMap.size,
    missing: missing.length,
    extra: extra.length,
    unitMismatch: unitMismatch.length,
    orderIssues: orderIssues.length,
    ipaIssues: ipaIssues.length,
    glossIssues: glossIssues.length,
    iconIssues: iconIssues.length,
  };
  return { summary, sections };
}