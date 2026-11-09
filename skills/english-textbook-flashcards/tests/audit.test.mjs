import test from 'node:test';
import assert from 'node:assert/strict';
import { auditBook } from '../lib/audit-rules.mjs';
import { renderReport } from '../scripts/audit.mjs';

const units = [
  { unit: 1, title: 'U1', words: [{ en: 'apple', ipa: '/ˈæpl/', zh: 'n.苹果' }, { en: 'banana', ipa: '/bəˈnɑːnə/', zh: '香蕉' }] },
  { unit: 2, title: 'U2', words: [{ en: 'cat', ipa: '/kæt/', zh: '猫' }] },
];

test('识别缺词 / 多词 / 单元不一致', () => {
  const words = [
    { en: 'apple', ipa: '/ˈæpl/', zh: '苹果', unit: 1, level: 'core' },
    { en: 'banana', ipa: '/bəˈnɑːnə/', zh: '香蕉', unit: 1, level: 'core' },
    { en: 'cat', ipa: '/kæt/', zh: '猫', unit: 3, level: 'core' },
    { en: 'dog', ipa: '/dɒɡ/', zh: '狗', unit: 2, level: 'core', icon: '🐶' },
  ];
  const r = auditBook({ units, words });
  assert.equal(r.summary.missing, 0);
  assert.equal(r.summary.extra, 1);
  assert.equal(r.summary.unitMismatch, 1);
  assert.equal(r.summary.orderIssues, 0);
  assert.match(r.sections.unitMismatch[0].evidence, /U2 → 词库 U3/);
});

test('识别顺序错位', () => {
  const words = [
    { en: 'apple', ipa: '/ˈæpl/', zh: '苹果', unit: 1, level: 'core' },
    { en: 'cat', ipa: '/kæt/', zh: '猫', unit: 2, level: 'core' },
    { en: 'banana', ipa: '/bəˈnɑːnə/', zh: '香蕉', unit: 1, level: 'core' },
  ];
  const r = auditBook({ units, words });
  assert.equal(r.summary.orderIssues, 1);
  assert.match(r.sections.orderIssues[0].evidence, /banana/);
});

test('音标规则', () => {
  const words = [
    { en: 'apple', ipa: 'ˈæpl', zh: '苹果', unit: 1, icon: '🍎' },
    { en: 'banana', ipa: '/bəˈnɑːnə/', zh: '香蕉', unit: 1, icon: '🍌' },
    { en: 'cat', ipa: '/kæt/', zh: '猫', unit: 2, icon: '🐱' },
    { en: 'dog', ipa: '/dɒg/', zh: '狗', unit: 2, icon: '🐶' },
    { en: 'bag', ipa: '/bag/', zh: '包', unit: 2, icon: '👜' },
  ];
  const r = auditBook({ units, words });
  const details = r.sections.ipaIssues.map((x) => `${x.en}:${x.detail}`);
  assert.ok(details.some((d) => d.startsWith('apple:音标缺少首尾斜杠')));
  assert.ok(details.some((d) => d.startsWith('bag:音标里的 a 未英式化')));
});

test('释义规则', () => {
  const words = [
    { en: 'apple', ipa: '/ˈæpl/', zh: '苹果 (n.)', unit: 1, icon: '🍎' },
    { en: 'banana', ipa: '/bəˈnɑːnə/', zh: '香蕉', unit: 1, icon: '🍌' },
    { en: 'cat', ipa: '/kæt/', zh: '猫...', unit: 2, icon: '🐱' },
    { en: 'dog', ipa: '/dɒɡ/', zh: '香蕉', unit: 2, icon: '🐶' },
  ];
  const r = auditBook({ units, words });
  const details = r.sections.glossIssues.map((x) => `${x.en}:${x.detail}`);
  assert.ok(details.some((d) => d.includes('半角标点')));
  assert.ok(details.some((d) => d.includes('省略号')));
  assert.ok(details.some((d) => d.includes('重复')));
});

test('颜色词缺图标会提示', () => {
  const r = auditBook({
    units: [{ unit: 1, title: 'U1', words: [{ en: 'red' }] }],
    words: [{ en: 'red', ipa: '/red/', zh: '红色', unit: 1, swatch: '#f00' }],
  });
  assert.ok(r.sections.iconIssues.some((x) => x.detail.includes('颜色词')));
});

test('跳过词与其他册已收录的词不算缺词', () => {
  const units = [{ unit: 1, title: 'U1', words: [{ en: 'I' }, { en: 'see' }, { en: 'boy' }] }];
  const allWords = [{ en: 'see', grade: 1, term: 1, level: 'core', ipa: '/siː/', zh: '看见' }];
  const r = auditBook({ units, words: [], allWords, skip: ['I'] });
  assert.equal(r.summary.missing, 1);
  assert.equal(r.sections.missing[0].en, 'boy');
});

test('报告包含汇总与只读声明', () => {
  const report = renderReport(
    auditBook({ units, words: [{ en: 'apple', ipa: '/ˈæpl/', zh: '苹果', unit: 1 }] }),
    { grade: 3, term: 1, profileName: '沪教牛津版', generatedAt: 'T', sourceKind: 'fixture' },
  );
  assert.match(report, /## 汇总/);
  assert.match(report, /本报告只读/);
  assert.match(report, /缺词/);
});