#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isMain } from '../lib/main.mjs';
import { parseArgs } from '../lib/args.mjs';

const SKILL_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TEMPLATE = path.join(SKILL_ROOT, 'templates', 'site');

export function scaffold(target, { force = false, templateDir = TEMPLATE } = {}) {
  const abs = path.resolve(target);
  if (!fs.existsSync(templateDir)) throw new Error(`模板不存在：${templateDir}`);

  if (fs.existsSync(abs)) {
    const entries = fs.readdirSync(abs).filter((name) => name !== '.git');
    if (entries.length && !force) {
      throw new Error(`目标目录非空：${abs}\n确认要覆盖请加 --force，或换一个空目录。`);
    }
  }

  fs.mkdirSync(abs, { recursive: true });
  fs.cpSync(templateDir, abs, { recursive: true });
  return abs;
}

function main() {
  const args = parseArgs();
  if (typeof args.target !== 'string') throw new Error('缺少参数 --target <目录>');
  const dir = scaffold(args.target, { force: Boolean(args.force) });
  console.log(`✓ 已生成站点骨架：${dir}`);
  console.log('\n下一步：');
  console.log(`  cd "${dir}"`);
  console.log('  node scripts/build_words.mjs');
  console.log('  # 或让 skill 导入一册：整理三年级上');
}

if (isMain(import.meta.url)) {
  try {
    main();
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
    process.exitCode = 1;
  }
}