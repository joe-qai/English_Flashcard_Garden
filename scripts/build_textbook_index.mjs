/**
 * 抓取沪教牛津版（深圳用）1-6 年级上下册公开词表，生成 data/textbook-index.json
 * 用途：给 assets/words.js 打「年级 / 学期 / 单元」标签。
 *
 * 数据来源：英语朗读宝（yyld.51jiaoxi.com）公开页面，仅取单元名与词条中英文，
 * 作为教材对齐的参考底稿；正式使用前请以学校实际用书复核。
 */
import fs from 'node:fs';
import path from 'node:path';

const BOOKS = [
  { grade: 1, term: 1, slug: 'yishang' },
  { grade: 1, term: 2, slug: 'yixia' },
  { grade: 2, term: 1, slug: 'ershang' },
  { grade: 2, term: 2, slug: 'erxia' },
  { grade: 3, term: 1, slug: 'sanshang' },
  { grade: 3, term: 2, slug: 'sanxia' },
  { grade: 4, term: 1, slug: 'sishang' },
  { grade: 4, term: 2, slug: 'sixia' },
  { grade: 5, term: 1, slug: 'wushang' },
  { grade: 5, term: 2, slug: 'wuxia' },
  { grade: 6, term: 1, slug: 'liushang' },
  { grade: 6, term: 2, slug: 'liuxia' },
];

const FILE_VARIANTS = ['hjbsz_danci.html', 'hjbsq_danci.html'];

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseBook(html) {
  const chunks = html.split('<div class="danci-wrap');
  const units = [];
  chunks.slice(1).forEach((chunk) => {
    const titleMatch = chunk.match(/<h[23][^>]*class="title"[^>]*>([\s\S]*?)<\/h[23]>/i);
    if (!titleMatch) return;
    const rawTitle = stripTags(titleMatch[1])
      .replace(/^.*?英语/i, '')
      .replace(/\s*(单词表音频与中文翻译|单元单词表与音标释义)\s*$/i, '')
      .trim();
    const unitMatch = rawTitle.match(/unit\s*(\d+)/i);
    if (!unitMatch) return;
    const listStart = chunk.indexOf('dc-list');
    if (listStart === -1) return;
    const listChunk = chunk.slice(listStart);
    const ens = [...listChunk.matchAll(/<p class="en"[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1]));
    const cns = [...listChunk.matchAll(/<p class="cn"[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1]));
    const words = [];
    for (let i = 0; i < ens.length; i += 1) {
      if (!ens[i]) continue;
      words.push({ en: ens[i], zh: cns[i] || '' });
    }
    units.push({
      unit: Number(unitMatch[1]),
      title: rawTitle.replace(/\s*单元单词表与音标释义\s*$/, '').trim(),
      words,
    });
  });
  return units;
}

async function fetchBook(slug) {
  for (const file of FILE_VARIANTS) {
    const url = `https://yyld.51jiaoxi.com/${slug}/${file}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      const units = parseBook(html);
      if (units.length) return { url, units };
    } catch (err) {
      // try next variant
    }
  }
  return null;
}

const out = [];
for (const book of BOOKS) {
  const data = await fetchBook(book.slug);
  if (!data) {
    console.warn(`! ${book.grade}-${book.term} ${book.slug} 抓取失败`);
    continue;
  }
  data.units.sort((a, b) => a.unit - b.unit);
  console.log(`✓ ${book.grade}年级${book.term === 1 ? '上' : '下'}  ${data.units.length} 单元 / ${data.units.reduce((n, u) => n + u.words.length, 0)} 词`);
  out.push({ grade: book.grade, term: book.term, source: data.url, units: data.units });
}

const target = path.resolve(process.cwd(), 'data', 'textbook-index.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify(out, null, 2), 'utf8');
console.log(`\n-> ${target}`);