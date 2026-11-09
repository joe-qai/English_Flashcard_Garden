# 数据模型

## 1. `data/textbook-index.json`

教材词表底稿，按册组织：

```json
[
  {
    "grade": 3,
    "term": 1,
    "source": "https://.../sanshang/hjbsz_danci.html",
    "units": [
      {
        "unit": 1,
        "title": "Unit 1 Hello",
        "words": [{ "en": "hello", "ipa": "hə'ləʊ", "zh": "int.你好" }]
      }
    ]
  }
]
```

- `grade`：1–6
- `term`：1 上册 / 2 下册
- `units[].title`：可带 `Unit N` 前缀；生成时会去掉并套用档案里的 `unitTitleFix`
- `words[].ipa`：页面音标，可能为空或格式不规范，只作候选

## 2. `data/sources/g{grade}t{term}.json`

抓取缓存：

```json
{
  "profile": "hjbsz",
  "grade": 3,
  "term": 1,
  "fetchedAt": "ISO 时间",
  "source": "实际抓取的 URL",
  "units": ["与 textbook-index 的 units 同构"]
}
```

- 校对优先用它；没有缓存才回退 `textbook-index.json`
- 不进入版本库（`.gitignore` 已忽略 `data/sources/`）

## 3. `assets/words.js`

生成产物，**不要手改**：

```js
window.WORD_CATEGORIES = [
  {
    id: 'book-g3t1',
    group: 'textbook',
    words: [
      {
        en: 'apple',
        ipa: '/ˈæpl/',
        zh: '苹果',
        icon: '🍎',
        pos: 'n.',
        grade: 3,
        term: 1,
        unit: 1,
        unitTitle: 'What do you know about fruit?',
        level: 'core'
      }
    ]
  }
];
```

- `level: 'core'`：教材词，必须有 `grade / term / unit`
- `level: 'extension'`：教材之外的拓展词，只在「拓展」筛选里出现
- `icon` / `swatch` 二选一：emoji 或首字母色块
- 分类 id `book-g{grade}t{term}` 对应 12 册

## 4. `data/word-overrides.json`

人工修正的集中入口：

```json
{
  "skip": ["I", "OK"],
  "rename": { "ice cream": "ice cream" },
  "hiddenCategories": [],
  "ipa": { "apple": "ˈæpl" },
  "gloss": { "present": "礼物" },
  "icon": { "apple": "🍎" },
  "pos": { "apple": "n." }
}
```

- `skip`：不进入词库（单字母、缩写等）
- `rename`：英文名修正
- `gloss` / `ipa` / `icon` / `pos`：人工覆盖，优先级最高
- `hiddenCategories`：隐藏主题分类

## 5. `data/ipa-supplement.json`

缺失音标的补充表，`{ "word": "ipa" }`。构建时在旧词库之后、页面音标之前使用。

## 6. `data/word-icons.json`

图标兜底映射，`{ "word": "emoji 或图标名" }`。找不到时才退回首字母色块。

## 7. `reports/`

- `audit-g{grade}t{term}.md`：只读校对报告
- `import-g{grade}t{term}.md`：导入过程记录（如需要）

`reports/` 与 `data/sources/` 都不进版本库。

## 优先级

音标：

```
word-overrides.ipa > 旧词库 words.js > ipa-supplement > 页面音标
```

释义：

```
word-overrides.gloss > 旧词库 words.js > 教材页面释义（经 cleanGloss / tidyZh）
```

图标：

```
word-overrides.icon > 旧词库 words.js > word-icons.json > 词内单词的图标 > 首字母色块
```