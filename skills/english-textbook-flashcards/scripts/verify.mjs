#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from '../lib/args.mjs';
import { assertWorkspace, loadWordCategories, loadGlobal } from '../lib/workspace.mjs';

export function verifySite(root) {
  const errors = [];
  const warnings = [];
  const stats = { categories: 0, words: 0, core: 0, missingIpa: 0, noIcon: 0, duplicateZh: 0 };

  let cats;
  try {
    cats = loadWordCategories(root);
  } catch (err) {
    errors.push(`assets/words.js 解析失败：${err.message}`);
    return { errors, warnings, stats };
  }

  if (!cats.length) warnings.push('词库为空（新建站点属正常，导入一册后应大于 0）');
  const ids = cats.map((c) => c.id);
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupIds.length) errors.push(`分类 id 重复：${[...new Set(dupIds)].join(', ')}`);

  const words = cats.flatMap((c) => c.words || []);
  const zh = new Map();
  for (const w of words) {
    if (!w.en || !w.zh) errors.push(`词条缺 en/zh：${JSON.stringify(w).slice(0, 80)}`);
    if (!w.ipa) stats.missingIpa += 1;
    if (!w.icon && !w.swatch) stats.noIcon += 1;
    if (w.level === 'core') {
      stats.core += 1;
      if (w.grade == null || w.term == null || w.unit == null) {
        errors.push(`核心词缺年级/学期/单元：${w.en}`);
      }
    }
    const key = String(w.zh || '').trim();
    if (key) zh.set(key, (zh.get(key) || 0) + 1);
  }
  stats.categories = cats.length;
  stats.words = words.length;
  stats.duplicateZh = [...zh.values()].filter((n) => n > 1).length;

  if (stats.missingIpa) warnings.push(`缺音标 ${stats.missingIpa} 条`);
  if (stats.noIcon) warnings.push(`无图标 ${stats.noIcon} 条（功能词属预期）`);
  if (stats.duplicateZh) warnings.push(`重复释义 ${stats.duplicateZh} 组`);

  const scenes = loadGlobal(root, 'assets/scenes.js', 'DIALOGUE_SCENES');
  const htmlFile = path.join(root, 'index.html');
  const html = fs.readFileSync(htmlFile, 'utf8');
  const m = html.match(/id="scene-total"[^>]*>(\d+)</);
  if (m && Number(m[1]) !== scenes.length) {
    errors.push(`index.html 的 scene-total=${m[1]}，scenes.js 实际 ${scenes.length}`);
  }

  return { errors, warnings, stats };
}

function main() {
  const args = parseArgs();
  const root = path.resolve(process.cwd(), typeof args.root === 'string' ? args.root : '.');
  assertWorkspace(root);
  const result = verifySite(root);

  console.log(
    `词库：${result.stats.words} 词 / ${result.stats.categories} 分类 / 核心词 ${result.stats.core}`,
  );
  for (const w of result.warnings) console.log(`  ! ${w}`);

  if (result.errors.length) {
    console.error(`\n✗ 校验失败（${result.errors.length} 项）`);
    for (const e of result.errors) console.error(`  - ${e}`);
    process.exitCode = 1;
    return;
  }
  console.log('✓ 校验通过');
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main();
}