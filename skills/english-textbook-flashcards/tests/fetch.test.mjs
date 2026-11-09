import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchBook, readCache, writeCache, sourcePath } from '../scripts/fetch_words.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(dir, 'fixtures/book.html'), 'utf8');

const profile = {
  id: 'hjbsz',
  source: {
    base: 'https://example.test',
    files: ['hjbsz_danci.html', 'hjbsq_danci.html'],
    slug: { '3-1': 'sanshang' },
  },
};

test('第一个文件名 404 时回退到第二个', async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.endsWith('hjbsz_danci.html')) return { ok: false, text: async () => '' };
    return { ok: true, text: async () => html };
  };
  const { url, units } = await fetchBook(profile, 3, 1, { fetchImpl });
  assert.equal(calls.length, 2);
  assert.match(url, /hjbsq_danci\.html$/);
  assert.equal(units.length, 2);
  assert.equal(units[0].words[0].en, 'hello');
});

test('全部失败时抛出带尝试列表的错误', async () => {
  const fetchImpl = async () => ({ ok: false, text: async () => '' });
  await assert.rejects(() => fetchBook(profile, 3, 1, { fetchImpl }), (err) => {
    assert.match(err.message, /抓取失败/);
    assert.equal(err.tried.length, 2);
    return true;
  });
});

test('档案没有对应 slug 时直接报错', async () => {
  await assert.rejects(
    () => fetchBook(profile, 6, 2, { fetchImpl: async () => ({ ok: true, text: async () => html }) }),
    /没有 6-2 的 slug/,
  );
});

test('缓存读写往返', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'flashcard-fetch-'));
  const file = writeCache(root, 3, 1, { grade: 3, term: 1, units: [] });
  assert.equal(file, sourcePath(root, 3, 1));
  assert.deepEqual(readCache(root, 3, 1), { grade: 3, term: 1, units: [] });
  assert.equal(readCache(root, 3, 2), null);
});