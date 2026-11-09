import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const REQUIRED = ['index.html', 'assets/words.js', 'data/textbook-index.json'];

export function isWorkspace(root) {
  return REQUIRED.every((rel) => fs.existsSync(path.join(root, rel)));
}

export function assertWorkspace(root) {
  if (isWorkspace(root)) return root;
  throw new Error(
    `不是闪卡工作区：${root}\n` +
      `需要同时存在 ${REQUIRED.join(' / ')}。\n` +
      `请用 --root 指向已有站点，或先运行 scripts/scaffold.mjs 新建。`,
  );
}

export function readJson(root, rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
}

export function writeJson(root, rel, value) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
  return file;
}

export function loadWordCategories(root) {
  const file = path.join(root, 'assets/words.js');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  return Array.isArray(sandbox.window.WORD_CATEGORIES) ? sandbox.window.WORD_CATEGORIES : [];
}

export function loadGlobal(root, rel, key) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return [];
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  const value = sandbox.window[key];
  return Array.isArray(value) ? value : [];
}