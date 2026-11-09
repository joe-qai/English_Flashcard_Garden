#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isMain } from '../lib/main.mjs';
import { parseArgs } from '../lib/args.mjs';

const SKILL_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const CN_DIGITS = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6 };

export function loadProfile(id = 'hjbsz') {
  const file = path.join(SKILL_ROOT, 'profiles', `${id}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function resolveRequest(input, profile = { id: 'hjbsz', aliases: [] }) {
  const text = String(input || '')
    .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0))
    .trim();
  const missing = [];

  let grade = null;
  let term = null;

  const compact = text.match(/\bg\s*([1-6])\s*t\s*([12])\b/i);
  if (compact) {
    grade = Number(compact[1]);
    term = Number(compact[2]) === 1 ? 1 : 2;
  }

  if (!grade) {
    const gradeMatch =
      text.match(/([1-6一二三四五六])\s*年级/) ||
      text.match(/([1-6一二三四五六])\s*[上下]/);
    if (gradeMatch) grade = CN_DIGITS[gradeMatch[1]] || Number(gradeMatch[1]);
  }

  if (!term) {
    const termMatch =
      text.match(/(?:年级|[1-6一二三四五六])\s*([上下])/) ||
      text.match(/([上下])\s*[册学]/);
    if (termMatch) term = termMatch[1] === '下' ? 2 : 1;
  }
  if (!term && /(下\s*册|下\s*学期|第二学期|\bt\s*2\b|\bterm\s*2\b)/i.test(text)) term = 2;
  if (!term && /(上\s*册|上\s*学期|第一学期|\bt\s*1\b|\bterm\s*1\b)/i.test(text)) term = 1;

  if (!grade) missing.push('grade');
  if (!term) missing.push('term');

  return { ok: missing.length === 0, profile: profile.id, grade, term, missing };
}

function main() {
  const args = parseArgs();
  const profile = loadProfile(typeof args.profile === 'string' ? args.profile : 'hjbsz');
  const input = args._.join(' ');
  const result = resolveRequest(input, profile);

  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) {
    console.error(
      `\n无法唯一确定教材册：缺少 ${result.missing
        .map((k) => (k === 'grade' ? '年级' : '学期'))
        .join('、')}。请补充，例如「三年级上」。`,
    );
    process.exitCode = 2;
  }
}

if (isMain(import.meta.url)) {
  main();
}