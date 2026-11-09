import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseBookHtml, replaceBook, findBook, sortIndex, flattenUnits } from '../lib/textbook.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(dir, 'fixtures/book.html'), 'utf8');

test('parseBookHtml 解析单元与词条', () => {
  const units = parseBookHtml(html);
  assert.equal(units.length, 2);
  assert.equal(units[0].unit, 1);
  assert.equal(units[0].words.length, 2);
  assert.deepEqual(units[0].words[0], { en: 'hello', ipa: "hə'ləʊ", zh: 'int.你好' });
  assert.equal(units[0].words[1].ipa, '');
  assert.match(units[1].title, /Unit 2 Colours/);
});

test('replaceBook 只替换目标册并保持排序', () => {
  const index = [
    { grade: 2, term: 1, units: [] },
    { grade: 3, term: 1, units: [{ unit: 1, title: 'old', words: [] }] },
  ];
  const next = replaceBook(index, { grade: 3, term: 1, units: [{ unit: 1, title: 'new', words: [] }] });
  assert.equal(next.length, 2);
  assert.equal(findBook(next, 3, 1).units[0].title, 'new');
  assert.equal(next[0].grade, 2);
});

test('sortIndex 按年级学期排序', () => {
  const sorted = sortIndex([{ grade: 6, term: 2 }, { grade: 1, term: 1 }, { grade: 1, term: 2 }]);
  assert.deepEqual(sorted.map((b) => `${b.grade}-${b.term}`), ['1-1', '1-2', '6-2']);
});

test('flattenUnits 带上单元号与标题', () => {
  const flat = flattenUnits([{ unit: 3, title: 'T', words: [{ en: 'a' }, { en: 'b' }] }]);
  assert.deepEqual(flat.map((w) => w.unit), [3, 3]);
  assert.equal(flat[0].unitTitle, 'T');
});