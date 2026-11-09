#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs, requireNumber } from '../lib/args.mjs';
import { assertWorkspace } from '../lib/workspace.mjs';
import { parseBookHtml } from '../lib/textbook.mjs';
import { loadProfile } from './resolve.mjs';

export function sourcePath(root, grade, term) {
  return path.join(root, 'data', 'sources', `g${grade}t${term}.json`);
}

export function readCache(root, grade, term) {
  const file = sourcePath(root, grade, term);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeCache(root, grade, term, payload) {
  const file = sourcePath(root, grade, term);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  return file;
}

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

function summarize(units) {
  const words = units.reduce((n, u) => n + u.words.length, 0);
  const ipa = units.reduce((n, u) => n + u.words.filter((w) => w.ipa).length, 0);
  return { units: units.length, words, ipa };
}

async function main() {
  const args = parseArgs();
  const root = path.resolve(process.cwd(), typeof args.root === 'string' ? args.root : '.');
  assertWorkspace(root);

  const profile = loadProfile(typeof args.profile === 'string' ? args.profile : 'hjbsz');
  const grade = requireNumber(args, 'grade');
  const term = requireNumber(args, 'term');
  const cached = readCache(root, grade, term);

  if (args.offline) {
    if (!cached) throw new Error(`没有缓存：${sourcePath(root, grade, term)}`);
    const s = summarize(cached.units);
    console.log(`✓ ${grade} 年级${term === 1 ? '上' : '下'}（缓存）：${s.units} 单元 / ${s.words} 词`);
    return;
  }

  if (cached && !args.force) {
    const s = summarize(cached.units);
    console.log(`✓ ${grade} 年级${term === 1 ? '上' : '下'}（已有缓存）：${s.units} 单元 / ${s.words} 词`);
    console.log(`  来源：${cached.source}`);
    console.log('  需要重新抓取请加 --force');
    return;
  }

  const { url, units } = await fetchBook(profile, grade, term);
  const payload = {
    profile: profile.id,
    grade,
    term,
    fetchedAt: new Date().toISOString(),
    source: url,
    units,
  };
  const file = writeCache(root, grade, term, payload);
  const s = summarize(units);
  console.log(`✓ ${grade} 年级${term === 1 ? '上' : '下'}：${s.units} 单元 / ${s.words} 词 / ${s.ipa} 条页面音标`);
  console.log(`  来源：${url}`);
  console.log(`  缓存：${file}`);
  console.log('\n下一步：npm 之外无需安装依赖，直接运行 merge_textbook.mjs 预览差异。');
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().catch((err) => {
    console.error(`\n✗ ${err.message}`);
    process.exitCode = 1;
  });
}