#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { isMain } from '../lib/main.mjs';
import { parseArgs, requireNumber } from '../lib/args.mjs';
import { assertWorkspace, readJson, loadWordCategories } from '../lib/workspace.mjs';
import { findBook } from '../lib/textbook.mjs';
import { auditBook } from '../lib/audit-rules.mjs';
import { mdTable } from '../lib/report.mjs';
import { readCache, sourcePath } from './fetch_words.mjs';

const SECTIONS = [
  ['missing', '1. 缺词', ['单词', '单元', '说明', '证据', '建议']],
  ['extra', '2. 多词', ['单词', '单元', '说明', '证据', '建议']],
  ['unitMismatch', '3. 单元归属', ['单词', '源单元', '说明', '证据', '建议']],
  ['orderIssues', '4. 顺序', ['单词', '位置', '说明', '证据', '建议']],
  ['ipaIssues', '5. 音标', ['单词', '单元', '问题', '当前值', '建议']],
  ['glossIssues', '6. 释义', ['单词', '单元', '问题', '当前值', '建议']],
  ['iconIssues', '7. 图标', ['单词', '单元', '问题', '当前值', '建议']],
];

function rowFor(key, item) {
  if (key === 'missing' || key === 'extra') {
    return [item.en, item.unit == null ? '' : `U${item.unit}`, item.detail, item.evidence, item.suggestion];
  }
  if (key === 'unitMismatch') {
    return [item.en, item.unit == null ? '' : `U${item.unit}`, item.detail, item.evidence, item.suggestion];
  }
  if (key === 'orderIssues') {
    return [item.en, item.unit == null ? '' : item.unit, item.detail, item.evidence, item.suggestion];
  }
  return [item.en, item.unit == null ? '' : `U${item.unit}`, item.detail, item.evidence, item.suggestion];
}

export function renderReport(result, meta) {
  const { summary, sections } = result;
  const lines = [];
  lines.push(`# 校对报告 · ${meta.grade} 年级${meta.term === 1 ? '上' : '下'}（${meta.profileName}）`);
  lines.push('');
  lines.push(`- 教材源：${summary.sourceWords} 词（${meta.sourceKind}）`);
  lines.push(`- 当前词库：${summary.deckWords} 词`);
  lines.push(`- 生成时间：${meta.generatedAt}`);
  lines.push('');
  lines.push('## 汇总');
  lines.push('');
  lines.push(
    mdTable(
      ['类别', '数量'],
      [
        ['缺词', summary.missing],
        ['多词', summary.extra],
        ['单元归属', summary.unitMismatch],
        ['顺序', summary.orderIssues],
        ['音标', summary.ipaIssues],
        ['释义', summary.glossIssues],
        ['图标', summary.iconIssues],
      ],
    ),
  );

  for (const [key, title, headers] of SECTIONS) {
    const items = sections[key] || [];
    lines.push('', `## ${title}`, '');
    if (!items.length) {
      lines.push('（无）');
      continue;
    }
    lines.push(mdTable(headers, items.slice(0, 50).map((item) => rowFor(key, item))));
    if (items.length > 50) lines.push('', `……还有 ${items.length - 50} 条`);
  }
  lines.push('');
  lines.push('> 本报告只读，未修改任何词库文件。确认后再走导入或修正流程。');
  return lines.join('\n');
}

function main() {
  const args = parseArgs();
  const root = path.resolve(process.cwd(), typeof args.root === 'string' ? args.root : '.');
  assertWorkspace(root);

  const grade = requireNumber(args, 'grade');
  const term = requireNumber(args, 'term');
  const profileId = typeof args.profile === 'string' ? args.profile : 'hjbsz';
  const profileName = profileId === 'hjbsz' ? '沪教牛津版' : profileId;

  const index = readJson(root, 'data/textbook-index.json');
  const book = findBook(index, grade, term);
  const cached = readCache(root, grade, term);
  const units = cached?.units || book?.units;
  if (!units) {
    throw new Error(`找不到 ${grade} 年级${term === 1 ? '上' : '下'} 的教材源。请先运行 fetch_words.mjs。`);
  }

  const cats = loadWordCategories(root);
  const allWords = cats.flatMap((c) => c.words || []);
  const words = allWords.filter(
    (w) => w.level === 'core' && Number(w.grade) === grade && Number(w.term) === term,
  );
  let skip = [];
  try {
    skip = readJson(root, 'data/word-overrides.json').skip || [];
  } catch {
    skip = [];
  }

  const result = auditBook({ units, words, allWords, skip });
  const report = renderReport(result, {
    grade,
    term,
    profileName,
    generatedAt: new Date().toISOString(),
    sourceKind: cached ? `缓存 ${path.relative(root, sourcePath(root, grade, term))}` : 'data/textbook-index.json',
  });

  if (args.stdout) {
    console.log(report);
  } else {
    const out = path.join(root, 'reports', `audit-g${grade}t${term}.md`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, report + '\n', 'utf8');
    console.log(
      `✓ 校对完成：缺词 ${result.summary.missing} / 多词 ${result.summary.extra} / ` +
        `音标 ${result.summary.ipaIssues} / 释义 ${result.summary.glossIssues}`,
    );
    console.log(`  报告：${out}`);
  }

  if (args.strict) {
    const errors =
      result.summary.missing +
      result.summary.extra +
      result.summary.unitMismatch +
      result.summary.orderIssues +
      result.summary.ipaIssues +
      result.summary.glossIssues;
    if (errors) process.exitCode = 1;
  }
}

if (isMain(import.meta.url)) {
  try {
    main();
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
    process.exitCode = 1;
  }
}