# 英语教材闪卡 Skill 设计文档

## 1. 背景与目标

现有「英文闪卡园」已经验证了一条可用的内容流水线：教材词表 → 规范化 → 生成词库 → 静态站点 → 校验上线。但每次上新册仍依赖对当前仓库脚本和文件位置的记忆，无法直接复用到其他目录或其他机器。

目标：把这套流水线封装成一个全局 skill，做到——

- **一句话上新**：给出「某地某年三年级上英语」这类自然语言，自动定位教材版本、抓取词表、规范化、构建、校验，产出可直接打开的 HTML。
- **一句话校对**：对已有年级做只读体检，输出问题报告，不改任何文件。
- **空目录建站**：在没有现成项目的目录里，用内置模板一键生成同款站点。

## 2. 非目标

- 不做多出版社的完整适配。第一版只内置沪教牛津版档案，但结构上按「版本档案」配置化，后续只加配置。
- 不做教材原文录入。对话、歌谣、故事仍为原创或公版内容。
- 不做自动发布。commit / push 必须由用户显式触发。
- 不在校对模式自动改文件。

## 3. 使用场景

### 3.1 导入模式

输入示例：

- 「整理三年级上的英语教材」
- 「〈地区〉〈年份〉五年级下册英语内容」
- 「g4t2 上新」

流程：

1. `resolve` 解析出 `{ profile, grade, term }`；无法唯一确定时向用户确认。
2. `fetch_words` 按档案中的来源抓取公开词表，原始响应缓存到 `data/sources/g{grade}t{term}.json`。
3. `normalize` 规范化词形、音标、释义、单元标题。
4. 输出预览：新增 / 变更 / 冲突条数与样例。
5. 用户确认后 `merge_textbook` 合并进 `data/textbook-index.json`，只改目标册。
6. `build` 生成 `assets/words.js`，打印缺失音标、缺失图标、重复释义。
7. `audit` 自动体检，输出 `reports/import-g{grade}t{term}.md`。
8. 用户明确说「发布」后，才提交并推送。

### 3.2 校对模式

输入示例：「校对三年级上」「检查五年级下册单词」。

只读流程：

1. 定位目标册；若本地没有该册的源数据，先抓取并缓存，不写词库。
2. 对照教材源与现有词库，按五类规则体检。
3. 输出 `reports/audit-g{grade}t{term}.md`，每条包含：位置、问题、证据、建议值。
4. 不修改任何文件；用户确认后再走导入/修正流程。

### 3.3 建站模式

在空目录中执行 scaffold：

1. 复制 `templates/site`（`index.html`、`assets/app.js`、`assets/style.css`、空 `data/`）。
2. 生成空的 `data/textbook-index.json`、`data/word-overrides.json` 等输入骨架。
3. 后续接导入流程。

## 4. 架构

```
english-textbook-flashcards/
├── SKILL.md
├── profiles/
│   └── hjbsz.json
├── scripts/
│   ├── resolve.mjs
│   ├── fetch_words.mjs
│   ├── normalize.mjs
│   ├── merge_textbook.mjs
│   ├── audit.mjs
│   ├── build.mjs
│   ├── verify.mjs
│   └── scaffold.mjs
├── templates/site/
└── references/
    ├── data-model.md
    ├── ipa-rules.md
    └── audit-checklist.md
```

### 4.1 工作区判定

- 当前目录同时存在 `index.html`、`assets/words.js`、`data/textbook-index.json` → 视为工作区，直接操作。
- 否则要求 `--root <dir>`；仍不存在时提示先 scaffold。

### 4.2 版本档案

`profiles/hjbsz.json` 至少包含：

- 版本标识与显示名
- 年级/学期与册的映射
- 词表来源（按册的 URL 模板、解析方式）
- 音标策略（三源优先级）
- 单元标题修正表
- 站点内容约束（哪些字段不进发布内容）

## 5. 数据契约

- `data/textbook-index.json`：`[{ grade, term, source, units: [{ unit, title, words: [{ en, ipa, zh }] }] }]`
- `assets/words.js`：生成产物，不手改；词条字段为 `en / ipa / zh / icon / swatch / pos / grade / term / unit / unitTitle / level`。
- `data/word-overrides.json`：`skip / rename / gloss / ipa / icon / pos / hiddenCategories`。
- `data/ipa-supplement.json`：缺失音标补充。
- `data/word-icons.json`：图标兜底映射。
- 生成的报告统一放 `reports/`，命名 `audit-g{grade}t{term}.md`、`import-g{grade}t{term}.md`。

## 6. 校对规则

| 类别 | 判定 | 证据来源 |
|---|---|---|
| 缺词 / 多词 | 教材源与词库互相差集 | 教材源 + words.js |
| 单元归属 / 顺序 | grade/term/unit 与教材源不一致，或同单元顺序被打乱 | 教材源 + words.js |
| 音标 | 音节数、重音位置、英式符号、与词典结果不一致 | 词典 + ipa-supplement + overrides |
| 释义 | 截断、残留词性、半角括号、重复释义、中英重复后缀 | 规则扫描 |
| 图标 | 无图、图物不符、颜色词缺色块 | 图标映射 + 人工清单 |

报告只给建议，不自动写入。

## 7. 安全边界

- 校对模式只读。
- 写入 `data/` 前必须展示 diff 预览并等待确认。
- 音标优先级：人工 override > 词典/补充 > 页面音标。
- 批量删除或重命名必须逐条列出。
- 构建后必须执行词库校验与浏览器断言：卡片数、破图、控制台错误、教材顺序。
- 自然语言中的地区、年份只用于定位教材，不写入站点内容。

## 8. 验收标准

1. 在当前仓库执行「校对三年级上」，生成报告且 `git status` 无文件改动。
2. 执行「整理三年级上」，能完成抓取 → 规范化 → 预览 → 合并 → 构建 → 校验，最终词条数与教材源一致。
3. 在空目录执行 scaffold，能生成可直接打开的单站点，并完成至少一册导入。
4. 生成的站点通过现有校验：词条数、分类数、缺失音标为 0、无破图、无控制台错误。
5. 任何写入动作在用户确认前不会发生。

## 9. 风险与应对

| 风险 | 应对 |
|---|---|
| 公开词表页面结构变化 | 解析器失败时保留原始缓存，报告解析失败位置，要求人工提供词表 |
| 页面音标质量差 | 页面音标只作候选，词典与人工修正优先 |
| 自然语言解析歧义 | 无法唯一确定年级/学期时直接询问，不猜测 |
| skill 脚本与项目脚本重复 | 第一版以 skill 脚本为准，项目脚本保持不动；稳定后再把项目脚本收敛为薄壳 |
| 教材版权 | 只使用词表事实数据，对话、歌谣、故事保持原创或公版 |