const fs = require('fs');
const vm = require('vm');
const sb = { window: {} };
vm.createContext(sb);
for (const f of ['assets/words.js', 'assets/scenes.js', 'assets/songs.js', 'assets/stories.js']) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), sb);
}
const cats = sb.window.WORD_CATEGORIES;
const all = cats.flatMap((c) => c.words);
const visible = cats.filter((c) => !c.hidden);
console.log('visible categories', visible.length, 'all', cats.length);
console.log('words', all.length, 'visible', visible.flatMap((c) => c.words).length);
const byLevel = all.reduce((a, w) => { a[w.level] = (a[w.level] || 0) + 1; return a; }, {});
console.log('level', byLevel);
const byGrade = all.reduce((a, w) => { const k = w.grade == null ? 'ext' : w.grade; a[k] = (a[k] || 0) + 1; return a; }, {});
console.log('grade', byGrade);
const en = new Map();
for (const c of cats) for (const w of c.words) en.set(w.en.toLowerCase(), (en.get(w.en.toLowerCase()) || 0) + 1);
console.log('dup en', [...en].filter(([, n]) => n > 1));
const zh = new Map();
for (const w of all) { const k = w.zh.trim(); zh.set(k, (zh.get(k) || 0) + 1); }
console.log('dup zh', [...zh].filter(([, n]) => n > 1));
console.log('scenes', sb.window.DIALOGUE_SCENES.length, 'songs', sb.window.SONG_LIBRARY.length, 'stories', sb.window.STORY_LIBRARY.length);
const sids = sb.window.STORY_LIBRARY.map((s) => s.id);
console.log('dup story ids', sids.filter((id, i) => sids.indexOf(id) !== i));
console.log('story sentence counts', sb.window.STORY_LIBRARY.map((s) => s.id + ':' + s.sentences.length).join(' '));
console.log('glossary keys', Object.keys(sb.window.STORY_GLOSSARY).length);
const bad = cats.flatMap((c) => c.words.filter((w) => !w.en || !w.zh || !w.ipa));
console.log('missing fields', bad.length);
const noGradeCore = all.filter((w) => w.level === 'core' && (w.grade == null || typeof w.grade !== 'number'));
console.log('core missing grade', noGradeCore.length);
const emptyCats = visible.filter((c) => !c.words.length).map((c) => c.id);
console.log('empty visible cats', emptyCats);