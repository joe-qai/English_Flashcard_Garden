import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { verifySite } from '../scripts/verify.mjs';

function workspace({ words, scenes = [], sceneTotal = 0, categoryId = 'book-g3t1' }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'flashcard-verify-'));
  fs.mkdirSync(path.join(root, 'assets'), { recursive: true });
  fs.mkdirSync(path.join(root, 'data'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'assets/words.js'),
    `window.WORD_CATEGORIES = ${JSON.stringify([{ id: categoryId, words }])};\n`,
    'utf8',
  );
  fs.writeFileSync(
    path.join(root, 'assets/scenes.js'),
    `window.DIALOGUE_SCENES = ${JSON.stringify(scenes)};\n`,
    'utf8',
  );
  fs.writeFileSync(path.join(root, 'data/textbook-index.json'), '[]\n', 'utf8');
  fs.writeFileSync(path.join(root, 'index.html'), `<span id="scene-total">${sceneTotal}</span>\n`, 'utf8');
  return root;
}

test('完整词库通过校验', () => {
  const root = workspace({
    words: [{ en: 'apple', ipa: '/ˈæpl/', zh: '苹果', icon: '🍎', grade: 3, term: 1, unit: 1, level: 'core' }],
    scenes: [{ id: 'a' }],
    sceneTotal: 1,
  });
  const r = verifySite(root);
  assert.deepEqual(r.errors, []);
  assert.equal(r.stats.words, 1);
  assert.equal(r.stats.core, 1);
});

test('核心词缺字段时报错', () => {
  const root = workspace({ words: [{ en: 'apple', ipa: '/ˈæpl/', zh: '苹果', level: 'core' }] });
  const r = verifySite(root);
  assert.ok(r.errors.some((e) => e.includes('核心词缺年级')));
});

test('分类 id 重复时报错', () => {
  const root = workspace({ words: [] });
  fs.writeFileSync(
    path.join(root, 'assets/words.js'),
    'window.WORD_CATEGORIES = [{id:"a",words:[]},{id:"a",words:[]}];\n',
    'utf8',
  );
  const r = verifySite(root);
  assert.ok(r.errors.some((e) => e.includes('分类 id 重复')));
});

test('场景计数不一致时报错', () => {
  const root = workspace({ words: [], scenes: [{ id: 'a' }], sceneTotal: 2 });
  const r = verifySite(root);
  assert.ok(r.errors.some((e) => e.includes('scene-total')));
});