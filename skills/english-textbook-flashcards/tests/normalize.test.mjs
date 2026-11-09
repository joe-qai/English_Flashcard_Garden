import test from 'node:test';
import assert from 'node:assert/strict';
import {
  norm,
  cleanGloss,
  tidyZh,
  detectPos,
  normalizeIpa,
  countSyllables,
  resolveEn,
} from '../lib/normalize.mjs';

test('norm 统一大小写、撇号与空白', () => {
  assert.equal(norm('  Let’s   Go  '), "let's go");
});

test('cleanGloss 去掉词性与复数标记', () => {
  assert.equal(cleanGloss('n. 苹果', 'apple'), '苹果');
  assert.equal(cleanGloss('adj.（复数）大的', 'big'), '大的');
});

test('tidyZh 统一全角标点并清掉夹带词性', () => {
  assert.equal(tidyZh('展示；显示 n. 演出'), '展示；显示；演出');
  assert.equal(tidyZh('他们 (宾格)'), '他们（宾格）');
  assert.equal(tidyZh('苹果...'), '苹果…');
});

test('detectPos 识别短语与词性', () => {
  assert.equal(detectPos('v.感觉到', 'feel'), 'v.');
  assert.equal(detectPos('n.宠物店', 'pet shop'), 'phr.');
  assert.equal(detectPos('苹果', 'apple'), undefined);
});

test('countSyllables 处理成音节 /l/、/n/', () => {
  assert.equal(countSyllables('ˈæpl'), 2);
  assert.equal(countSyllables('ˈteɪbl'), 2);
  assert.equal(countSyllables('ɡɜːl'), 1);
  assert.equal(countSyllables('kæt'), 1);
});

test('normalizeIpa 英式化并处理重音', () => {
  assert.equal(normalizeIpa('ˈæpl'), '/ˈæpl/');
  assert.equal(normalizeIpa("w'ɒn"), '/wɒn/');
  assert.equal(normalizeIpa('kənˈdɪʃənə'), '/kənˈdɪʃənə/');
  assert.equal(normalizeIpa('oʊ'), '/əʊ/');
  assert.equal(normalizeIpa('ˈkʌlə(r)'), '/ˈkʌlə/');
});

test('resolveEn 去掉省略号与 (be) 前缀', () => {
  assert.equal(resolveEn('(be) happy'), 'be happy');
  assert.equal(resolveEn('apple...'), 'apple');
});