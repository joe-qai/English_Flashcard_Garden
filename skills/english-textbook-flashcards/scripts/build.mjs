#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { isMain } from '../lib/main.mjs';
import { parseArgs } from '../lib/args.mjs';
import { assertWorkspace } from '../lib/workspace.mjs';

const SKILL_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export function runBuild(root) {
  const buildScript = path.join(root, 'scripts', 'build_words.mjs');
  if (!fs.existsSync(buildScript)) {
    throw new Error(`找不到构建脚本：${buildScript}`);
  }
  const build = spawnSync(process.execPath, [buildScript], { cwd: root, stdio: 'inherit' });
  if (build.status !== 0) throw new Error(`build_words.mjs 退出码 ${build.status}`);

  const verify = spawnSync(
    process.execPath,
    [path.join(SKILL_ROOT, 'scripts', 'verify.mjs'), '--root', root],
    { cwd: root, stdio: 'inherit' },
  );
  if (verify.status !== 0) throw new Error(`verify.mjs 退出码 ${verify.status}`);
}

function main() {
  const args = parseArgs();
  const root = path.resolve(process.cwd(), typeof args.root === 'string' ? args.root : '.');
  assertWorkspace(root);

  console.log(`→ 构建：${root}`);
  runBuild(root);
  console.log('\n✓ 构建与校验完成');
  console.log('下一步：抽查页面 → 校对报告 → 用户明确说「发布」后再 commit/push');
}

if (isMain(import.meta.url)) {
  try {
    main();
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
    process.exitCode = 1;
  }
}