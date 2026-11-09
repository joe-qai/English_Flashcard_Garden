export function mdTable(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.map((c) => String(c ?? '').replace(/\|/g, '\\|')).join(' | ')} |`);
  return [head, sep, ...body].join('\n');
}

export function previewList(items, limit = 20, render = (x) => `- ${x}`) {
  if (!items.length) return '（无）';
  const shown = items.slice(0, limit).map(render);
  if (items.length > limit) shown.push(`- ……还有 ${items.length - limit} 条`);
  return shown.join('\n');
}