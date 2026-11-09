#!/usr/bin/env node
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs, requireNumber } from '../lib/args.mjs';
import { assertWorkspace, readJson, writeJson } from '../lib/workspace.mjs';
import { findBook, flattenUnits, replaceBook } from '../lib/textbook.mjs';
import { norm } from '../lib/normalize.mjs';
import { mdTable, previewList } from '../lib/report.mjs';
import { readCache, sourcePath } from './fetch_words.mjs';

export function diffBook(current, incoming) {
  const before = new Map(flattenUnits(current?.units).map((w) => [norm(w.en), w]));
  const after = new Map(flattenUnits(incoming?.units).map((w) => [norm(w.en), w]));

  const added = [...after.keys()].filter((k) => !before.has(k)).map((k) => after.get(k));
  const removed = [...before.keys()].filter((k) => !after.has(k)).map((k) => before.get(k));
  const changed = [...after.keys()]
    .filter((k) => before.has(k))
    .map((k) => {
      const a = before.get(k);
      const b = after.get(k);
      const fields = [];
      if (a.zh !== b.zh) fields.push('zh');
      if (a.ipa !== b.ipa) fields.push('ipa');
      if (Number(a.unit) !== Number(b.unit)) fields.push('unit');
      return { before: a, after: b, fields };
    })
    .filter((x) => x.fields.length);

  const titleChanges = (incoming?.units || [])
    .map((u) => {
      const old = (current?.units || []).find((x) => Number(x.unit) === Number(u.unit));
      return old && old.title !== u.title ? { unit: u.unit, before: old.title, after: u.title } : null;
    })
    .filter(Boolean);

  return { added, removed, changed, titleChanges };
}

export function buildMergedIndex(index, incoming) {
  const current = findBook(index, incoming.grade, incoming.term);
  return {
    current,
    next: replaceBook(index, incoming),
    diff: diffBook(current, incoming),
  };
}

export function renderDiff(diff, { grade, term, label }) {
  const lines = [];
  lines.push(`# 导入预览 · ${grade} 年级${term === 1 ? '上' : '下'}（${label}）`);
  lines.push('');
  lines.push(
    mdTable(
      ['项目', '数量'],
      [
        ['新增', diff.added.length],
        ['删除', diff.removed.length],
        ['变更', diff.changed.length],
        ['单元标题变化', diff.titleChanges.length],
      ],
    ),
  );

  if (diff.added.length) {
    lines.push('', '## 新增', '', previewList(diff.added, 20, (w) => `- \`${w.en}\` · U${w.unit} · ${w.zh}`));
  }
  if (diff.removed.length) {
    lines.push(
      '',
      '## 删除（需要 --allow-remove 才会写入）',
      '',
      previewList(diff.removed, 20, (w) => `- \`${w.en}\` · U${w.unit} · ${w.zh}`),
    );
  }
  if (diff.changed.length) {
    lines.push(
      '',
      '## 变更',
      '',
      mdTable(
        ['单词', '字段', '原值', '新值'],
        diff.changed.slice(0, 20).map(({ before, after, fields }) => [
          after.en,
          fields.join(', '),
          fields.map((f) => String(before[f] ?? '')).join(' / '),
          fields.map((f) => String(after[f] ?? '')).join(' / '),
        ]),
      ),
    );
    if (diff.changed.length > 20) lines.push('', `……还有 ${diff.changed.length - 20} 条`);
  }
  if (diff.titleChanges.length) {
    lines.push(
      '',
      '## 单元标题变化',
      '',
      mdTable(
        ['单元', '原值', '新值'],
        diff.titleChanges.map((t) => [`U${t.unit}`, t.before, t.after]),
      ),
    );
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs();
  const root = path.resolve(process.cwd(), typeof args.root === 'string' ? args.root : '.');
  assertWorkspace(root);

  const grade = requireNumber(args, 'grade');
  const term = requireNumber(args, 'term');
  const profileId = typeof args.profile === 'string' ? args.profile : 'hjbsz';
  const label = profileId === 'hjbsz' ? '沪教牛津版' : profileId;

  const source = readCache(root, grade, term);
  if (!source) {
    throw new Error(`没有词表缓存：${sourcePath(root, grade, term)}\n请先运行 fetch_words.mjs --grade ${grade} --term ${term}`);
  }

  const index = readJson(root, 'data/textbook-index.json');
  const incoming = { grade, term, source: source.source, units: source.units };
  const { next, diff } = buildMergedIndex(index, incoming);

  console.log(renderDiff(diff, { grade, term, label }));
  console.log('');

  if (!args.write) {
    console.log('（预览模式，未写入任何文件。确认无误后加 --write）');
    return;
  }
  if (diff.removed.length && !args['allow-remove']) {
    throw new Error(`本次会删除 ${diff.removed.length} 个词。请逐条核对后加 --allow-remove 再写入。`);
  }

  const file = writeJson(root, 'data/textbook-index.json', next);
  console.log(`✓ 已写入 ${file}（仅 ${grade} 年级${term === 1 ? '上' : '下'}）`);
  console.log('下一步：node scripts/build.mjs --root .');
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().catch((err) => {
    console.error(`\n✗ ${err.message}`);
    process.exitCode = 1;
  });
}