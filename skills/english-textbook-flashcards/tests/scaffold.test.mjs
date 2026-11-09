import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { scaffold } from '../scripts/scaffold.mjs';

test('scaffold 生成可用的空词库站点', () => {
  const target = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'flashcard-scaffold-')), 'site');
  const dir = scaffold(target);
  assert.equal(dir, target);
  assert.ok(fs.existsSync(path.join(dir, 'index.html')));
  assert.ok(fs.existsSync(path.join(dir, 'assets/app.js')));
  assert.ok(fs.existsSync(path.join(dir, 'assets/icons')));
  assert.ok(fs.existsSync(path.join(dir, 'scripts/build_words.mjs')));
  assert.equal(fs.readFileSync(path.join(dir, 'data/textbook-index.json'), 'utf8').trim(), '[]');
  assert.match(fs.readFileSync(path.join(dir, 'assets/words.js'), 'utf8'), /WORD_CATEGORIES = \[\]/);
  assert.ok(fs.existsSync(path.join(dir, 'data/sources')));
  assert.ok(fs.existsSync(path.join(dir, 'music/README.md')));
});

test('目标目录非空时默认拒绝，--force 才覆盖', () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), 'flashcard-scaffold-'));
  fs.writeFileSync(path.join(target, 'keep.txt'), 'x');
  assert.throws(() => scaffold(target), /目标目录非空/);
  assert.doesNotThrow(() => scaffold(target, { force: true }));
});