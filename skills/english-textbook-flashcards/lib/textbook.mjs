export function stripTags(html) {
  return String(html)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseBookHtml(html) {
  const chunks = String(html).split('<div class="danci-wrap');
  const units = [];
  for (const chunk of chunks.slice(1)) {
    const titleMatch = chunk.match(/<h[23][^>]*class="title"[^>]*>([\s\S]*?)<\/h[23]>/i);
    if (!titleMatch) continue;
    const rawTitle = stripTags(titleMatch[1])
      .replace(/^.*?英语/i, '')
      .replace(/\s*(单词表音频与中文翻译|单元单词表与音标释义)\s*$/i, '')
      .trim();
    const unitMatch = rawTitle.match(/unit\s*(\d+)/i);
    if (!unitMatch) continue;
    const listStart = chunk.indexOf('dc-list');
    if (listStart === -1) continue;
    const items = [...chunk.slice(listStart).matchAll(
      /<li class="dc-item"[\s\S]*?<p class="en"[^>]*>([\s\S]*?)<\/p>([\s\S]*?)<p class="cn"[^>]*>([\s\S]*?)<\/p>/gi,
    )];
    const words = [];
    for (const m of items) {
      const en = stripTags(m[1]);
      if (!en) continue;
      const ipaMatch = m[2].match(/<div class="phonetic"[^>]*>[\s\S]*?<p class="text"[^>]*>([\s\S]*?)<\/p>/i);
      words.push({ en, ipa: ipaMatch ? stripTags(ipaMatch[1]) : '', zh: stripTags(m[3]) });
    }
    units.push({
      unit: Number(unitMatch[1]),
      title: rawTitle.replace(/\s*单元单词表与音标释义\s*$/, '').trim(),
      words,
    });
  }
  return units.sort((a, b) => a.unit - b.unit);
}

export const bookKey = (grade, term) => `${grade}-${term}`;

export function findBook(index, grade, term) {
  return (index || []).find(
    (b) => Number(b.grade) === Number(grade) && Number(b.term) === Number(term),
  );
}

export function sortIndex(index) {
  return [...index].sort((a, b) => a.grade - b.grade || a.term - b.term);
}

export function replaceBook(index, book) {
  const rest = (index || []).filter(
    (b) => !(Number(b.grade) === Number(book.grade) && Number(b.term) === Number(book.term)),
  );
  return sortIndex([...rest, book]);
}

export function flattenUnits(units) {
  return (units || []).flatMap((u) => u.words.map((w) => ({ ...w, unit: u.unit, unitTitle: u.title })));
}