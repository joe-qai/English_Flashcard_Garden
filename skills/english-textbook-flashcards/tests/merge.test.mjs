import test from 'node:test';
import assert from 'node:assert/strict';
import { diffBook, buildMergedIndex, renderDiff } from '../scripts/merge_textbook.mjs';

const current = {
  grade: 3,
  term: 1,
  units: [
    { unit: 1, title: 'Old Title', words: [{ en: 'apple', ipa: '/ˈæpl/', zh: '苹果' }, { en: 'banana', zh: '香蕉' }] },
    { unit: 2, title: 'U2', words: [{ en: 'cat', zh: '猫' }] },
  ],
};

const incoming = {
  grade: 3,
  term: 1,
  units: [
    { unit: 1, title: 'New Title', words: [{ en: 'apple', ipa: '/ˈæpəl/', zh: '苹果' }, { en: 'cherry', zh: '樱桃' }] },
    { unit: 2, title: 'U2', words: [{ en: 'cat', zh: '猫' }] },
  ],
};

test('diffBook 识别新增 / 删除 / 变更 / 标题变化', () => {
  const diff = diffBook(current, incoming);
  assert.deepEqual(diff.added.map((w) => w.en), ['cherry']);
  assert.deepEqual(diff.removed.map((w) => w.en), ['banana']);
  assert.equal(diff.changed.length, 1);
  assert.deepEqual(diff.changed[0].fields, ['ipa']);
  assert.equal(diff.titleChanges[0].after, 'New Title');
});

test('diffBook 大小写与撇号归一化后不算新增', () => {
  const diff = diffBook(
    { units: [{ unit: 1, words: [{ en: "Let’s", zh: '让我们' }] }] },
    { units: [{ unit: 1, words: [{ en: "let's", zh: '让我们' }] }] },
  );
  assert.equal(diff.added.length, 0);
  assert.equal(diff.removed.length, 0);
});

test('buildMergedIndex 只替换目标册', () => {
  const index = [{ grade: 1, term: 1, units: [] }, current];
  const { next, diff } = buildMergedIndex(index, incoming);
  assert.equal(next.length, 2);
  assert.equal(next[0].grade, 1);
  assert.equal(next[1].units[0].title, 'New Title');
  assert.equal(diff.added.length, 1);
});

test('renderDiff 给出删除确认提示', () => {
  const text = renderDiff(diffBook(current, incoming), { grade: 3, term: 1, label: '沪教牛津版' });
  assert.match(text, /--allow-remove/);
  assert.match(text, /cherry/);
});