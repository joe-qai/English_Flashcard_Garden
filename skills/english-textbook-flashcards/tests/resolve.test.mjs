import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRequest } from '../scripts/resolve.mjs';

const profile = { id: 'hjbsz', aliases: ['沪教牛津', '牛津上海版'] };

test('中文年级 + 上/下', () => {
  assert.deepEqual(resolveRequest('整理三年级上的英语教材', profile), {
    ok: true,
    profile: 'hjbsz',
    grade: 3,
    term: 1,
    missing: [],
  });
  assert.equal(resolveRequest('五年级下册英语', profile).term, 2);
});

test('缩写 g3t1 / 3上 / 三上', () => {
  assert.equal(resolveRequest('g3t1 上新', profile).grade, 3);
  assert.equal(resolveRequest('g3t1 上新', profile).term, 1);
  assert.equal(resolveRequest('3下', profile).term, 2);
  assert.equal(resolveRequest('三上', profile).grade, 3);
});

test('全角数字', () => {
  assert.equal(resolveRequest('３年级上册', profile).grade, 3);
});

test('自然语言里带地区年份也能解析', () => {
  const r = resolveRequest('〈地区〉〈年份〉3年级上的英语内容', profile);
  assert.equal(r.ok, true);
  assert.equal(r.grade, 3);
  assert.equal(r.term, 1);
});

test('缺年级或学期时返回 missing', () => {
  assert.deepEqual(resolveRequest('整理英语教材', profile).missing, ['grade', 'term']);
  assert.deepEqual(resolveRequest('三年级英语', profile).missing, ['term']);
});

test('识别版本别名', () => {
  assert.equal(resolveRequest('沪教牛津 四年级下', profile).profile, 'hjbsz');
});