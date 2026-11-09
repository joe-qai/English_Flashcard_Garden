export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[key] = true;
      else {
        out[key] = next;
        i += 1;
      }
    } else out._.push(token);
  }
  return out;
}

export function requireString(args, key, fallback) {
  const value = args[key] ?? fallback;
  if (typeof value !== 'string' || !value.trim()) throw new Error(`缺少参数 --${key}`);
  return value.trim();
}

export function requireNumber(args, key, fallback) {
  const value = Number(args[key] ?? fallback);
  if (!Number.isInteger(value)) throw new Error(`参数 --${key} 必须是整数`);
  return value;
}