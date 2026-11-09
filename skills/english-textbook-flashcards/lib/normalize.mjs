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