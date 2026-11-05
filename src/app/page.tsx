'use client';

import { useMemo, useState } from 'react';
import { categories } from '@/lib/words';
import type { Word } from '@/lib/words';

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function WordCard({ word, accent }: { word: Word; accent: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(word.en)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/5 bg-card p-4 text-left shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
      title={`点击播放发音：${word.en}`}
      aria-label={`播放 ${word.en} 的发音`}
    >
      <div
        className="mb-3 flex h-20 w-full items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accent}22` }}
      >
        <span className="text-5xl drop-shadow-sm transition-transform duration-200 ease-out group-hover:scale-110">
          {word.icon}
        </span>
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="text-lg font-bold leading-none text-foreground">
          {word.en}
        </div>
        <div className="font-mono text-sm text-muted-foreground">{word.ipa}</div>
        <div className="mt-1 text-sm font-medium text-foreground/70">
          {word.zh}
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [query, setQuery] = useState('');

  const active = useMemo(
    () => categories.find((c) => c.id === activeId) ?? categories[0],
    [activeId],
  );

  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return active.words;
    return active.words.filter(
      (w) =>
        w.en.toLowerCase().includes(q) ||
        w.zh.includes(q) ||
        w.ipa.toLowerCase().includes(q),
    );
  }, [active, query]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-10 sm:px-8">
      {/* 页头 */}
      <header className="mb-8 text-center">
        <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
          <span aria-hidden>💬</span> 常见单词中英对照 · 附音标
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          英文闪卡园
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        按生活场景挑选常见英文单词，配图、音标与中文释义。点击任意卡片即可播放发音，分类切换轻松学习。
      </p>
      </header>

      {/* 分类导航 */}
      <nav
        className="mb-6 flex gap-2 overflow-x-auto pb-2"
        aria-label="单词分类"
      >
        {categories.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveId(c.id);
                setQuery('');
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'border-transparent text-white shadow-sm'
                  : 'border-black/5 bg-card text-foreground/80 hover:bg-accent'
              }`}
              style={
                isActive ? { backgroundColor: c.color } : undefined
              }
              aria-pressed={isActive}
            >
              <span aria-hidden>{c.icon}</span>
              <span>{c.zh}</span>
              <span className={isActive ? 'text-white/75' : 'text-muted-foreground'}>
                {c.en}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 当前分类标题 + 搜索 */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
            style={{ backgroundColor: `${active.color}22` }}
            aria-hidden
          >
            {active.icon}
          </span>
          <h2 className="text-lg font-semibold text-foreground">
            {active.zh} · {active.en}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredWords.length} 词
          </span>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索英文 / 音标 / 中文…"
          className="w-full rounded-full border border-black/5 bg-card px-4 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring sm:w-64"
          aria-label="搜索单词"
        />
      </div>

      {/* 单词卡片 */}
      {filteredWords.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredWords.map((w) => (
            <WordCard key={w.en} word={w} accent={active.color} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/10 bg-card/60 py-16 text-center text-muted-foreground">
          没有找到匹配“{query}”的单词
        </div>
      )}
    </main>
  );
}