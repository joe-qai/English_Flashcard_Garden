---
name: english-textbook-flashcards
description: 把小学英语教材整理成可直接打开的静态闪卡站点，或对已有词库做只读校对。当用户说「整理三年级上英语」「导入新册」「开学上新」「校对单词/音标/释义」「把教材词表做成 HTML」「英语闪卡」时使用。支持一句话输入、单站点多册、校对只出报告。
---

# 英语教材闪卡

把「教材词表 → 音标/释义规范化 → 静态站点 → 校验」固化成一条可重复的流水线。第一版内置**沪教牛津版小学英语**档案，其他出版社通过新增 `profiles/*.json` 扩展。

## 什么时候用

- 新开学，要把某一册英语教材整理成闪卡网页
- 已有站点，想检查某册的词、音标、释义、图标是否出错
- 想在一个空目录里生成同款站点

## 工作区判定

按顺序判断：

1. 当前目录同时存在 `index.html`、`assets/words.js`、`data/textbook-index.json` → 直接当工作区
2. 否则加 `--root <目录>` 指向已有站点
3. 都没有 → 先建站：

```bash
node <skill>/scripts/scaffold.mjs --target <空目录>
```

`<skill>` 指本 skill 目录（全局挂载后通常是 `~/.config/opencode/skills/english-textbook-flashcards`）。

## 三种模式

### 1. 导入（一句话上新）

输入示例：「整理三年级上的英语教材」「g4t2 上新」「〈地区〉〈年份〉五年级下册英语内容」。

步骤：

1. **解析册**：`scripts/resolve.mjs` 把一句话转成 `{ profile, grade, term }`。缺年级或学期就停下来问用户，不猜。
2. **抓词表**：`scripts/fetch_words.mjs` 抓公开词表，缓存到 `data/sources/g{grade}t{term}.json`。已有缓存默认复用，`--force` 才重抓。
3. **预览差异**：`scripts/merge_textbook.mjs` 默认 dry-run，列出新增 / 删除 / 变更 / 单元标题变化。**此时不要写文件。**
4. **等用户确认**：把预览里的数字和样例给用户看；有删除项时必须逐条说明。
5. **写入**：确认后加 `--write`；有删除项还要 `--allow-remove`。
6. **构建**：`scripts/build.mjs` 调用工作区的 `build_words.mjs`，再跑 `verify.mjs`。
7. **自动体检**：`scripts/audit.mjs` 生成 `reports/audit-g{grade}t{term}.md`。
8. **发布**：只有用户明确说「发布」才 `git add / commit / push`。

命令：

```bash
node <skill>/scripts/resolve.mjs "三年级上"
node <skill>/scripts/fetch_words.mjs --root . --grade 3 --term 1
node <skill>/scripts/merge_textbook.mjs --root . --grade 3 --term 1
node <skill>/scripts/merge_textbook.mjs --root . --grade 3 --term 1 --write
node <skill>/scripts/build.mjs --root .
node <skill>/scripts/audit.mjs --root . --grade 3 --term 1
```

### 2. 校对（只读）

输入示例：「校对三年级上」「检查五年级下册单词」。

```bash
node <skill>/scripts/audit.mjs --root . --grade 3 --term 1
```

- 输出 `reports/audit-g{grade}t{term}.md`
- 五类检查：缺词/多词、单元归属/顺序、音标、释义、图标
- **不修改任何词库文件**；`reports/` 已在 `.gitignore`
- 需要看完整内容但不落盘时加 `--stdout`
- 想在有问题时返回非 0（例如 CI）加 `--strict`

### 3. 建站（空目录）

```bash
node <skill>/scripts/scaffold.mjs --target <目录>
```

生成：

- `index.html` + `assets/`（app、样式、场景、歌曲、故事、图标）
- `assets/words.js` 为空词库
- `data/` 输入骨架（`textbook-index.json` 为 `[]`，带音标补充与图标映射）
- `scripts/build_words.mjs`、`scripts/verify_words.cjs`
- `music/` 说明文件（模板不含 mp3）

生成后接导入流程。目录非空时脚本会拒绝，确认覆盖加 `--force`。

## 安全边界

1. **校对只读**：唯一写操作是报告文件。
2. **写入前必须确认**：merge 默认 dry-run；`--write` 是用户的明确授权。
3. **删除要单独确认**：有删除项时额外要求 `--allow-remove`。
4. **音标优先级固定**：人工 override > 旧词库/词典 > 补充表 > 页面音标。页面音标只作候选。
5. **地区/年份只用于定位教材**，不写进站点文案、报告标题或提交信息。
6. **不自动发布**：commit / push 必须由用户明确触发。

## 目录

```
profiles/hjbsz.json      教材档案（册映射、来源、单元标题修正）
lib/                     纯函数与共用工具
scripts/                 七个可执行脚本
templates/site/          站点骨架
references/              数据模型、音标规则、校对清单
tests/                   node:test，无外部依赖
```

## 测试

```bash
node --test "skills/english-textbook-flashcards/tests/*.test.mjs"
```

## 参考

- `references/data-model.md`：五份输入/输出文件的字段
- `references/ipa-rules.md`：英式音标规则与常见坑
- `references/audit-checklist.md`：五类校对项的判定标准

## 已知限制

- 第一版只内置沪教牛津版；换出版社需要新增 `profiles/<id>.json`，并调整工作区 `scripts/build_words.mjs` 里的 `UNIT_TITLE_FIX`
- 页面结构变化时 `parseBookHtml` 会返回空数组并报错，不会用空数据覆盖词库
- 歌曲模板不含音频，页面会退回朗读模式