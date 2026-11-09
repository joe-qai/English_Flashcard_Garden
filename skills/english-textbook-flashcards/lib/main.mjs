import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 判断模块是否被直接执行。
 * 用 realpath 比较，保证通过 junction / 软链接调用时也能正确进入 CLI 分支。
 */
export function isMain(metaUrl) {
  if (!process.argv[1]) return false;
  try {
    const self = fs.realpathSync(fileURLToPath(metaUrl));
    const argv = fs.realpathSync(process.argv[1]);
    return path.resolve(self).toLowerCase() === path.resolve(argv).toLowerCase();
  } catch {
    return false;
  }
}