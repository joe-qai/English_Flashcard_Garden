# 英文闪卡园 · 纯静态版

按生活场景分类的常见英文单词闪卡：emoji 图标 + 英文 + 国际音标 + 中文释义，点击卡片即可听发音。

**纯 HTML / CSS / JavaScript，无框架、无构建、无后端、无外部依赖**。双击 `index.html` 就能用，也可以直接托管到 GitHub Pages。

## 功能

- **7 个生活分类**：水果、颜色、食物、动物、文具、家具、厨具，共 113 个单词
- **点击发音**：调用浏览器内置 Web Speech API 朗读英文（不支持时静默降级）
- **站内搜索**：英文 / 音标 / 中文均可匹配，实时过滤当前分类
- **深色模式**：跟随系统偏好，手动切换后记忆在 `localStorage`
- **可分享链接**：分类写入 URL hash（如 `#animals`），刷新或分享后直达对应分类
- **键盘友好**：`/` 聚焦搜索框，`Esc` 清空或退出搜索；卡片支持 Tab 聚焦与回车触发
- **响应式**：手机 2 列、平板 3 列、桌面 4 列；尊重 `prefers-reduced-motion`

## 目录结构

```
index.html          # 页面骨架（可直接双击打开）
favicon.svg         # 站点图标
assets/style.css    # 全部样式（设计基调见 DESIGN.md）
assets/words.js     # 单词数据源（唯一需要日常维护的文件）
assets/app.js       # 分类切换 / 搜索 / 发音 / 主题
.nojekyll           # 告诉 GitHub Pages 跳过 Jekyll 处理
```

## 本地预览

```bash
# 方式一：直接双击 index.html

# 方式二：起一个本地静态服务
python -m http.server 8080
# 打开 http://localhost:8080
```

## 发布到 GitHub Pages

1. 把仓库推到 GitHub。
2. 仓库 **Settings → Pages → Build and deployment**
   - Source 选 `Deploy from a branch`
   - Branch 选 `main`，Folder 选 **`/(root)`**
   - 点击 Save
3. 稍等 1~2 分钟，访问 `https://<用户名>.github.io/<仓库名>/`。

> 想用 `/docs` 目录托管，把 `index.html`、`favicon.svg`、`assets/` 移进 `docs/`，Folder 改选 `/docs` 即可。
> 所有资源都是相对路径，放在仓库子路径下也能正常加载。

## 维护单词

只改 `assets/words.js`：

```js
window.WORD_CATEGORIES = [
  {
    id: 'fruits',      // URL hash，保持唯一
    en: 'Fruits',
    zh: '水果',
    icon: '🍎',        // 导航按钮图标
    color: '#F6A94D',  // 分类主题色，卡片与按钮自动跟随
    words: [
      { en: 'apple', ipa: '/ˈæpl/', zh: '苹果', icon: '🍎' },
    ],
  },
];
```

新增分类时，`id` 不要重复，`color` 建议沿用纸本风格的低饱和色系（见 `DESIGN.md`）。页脚的单词总数会自动统计。

## 说明

- 发音依赖系统语音包，Chrome / Edge / Safari 均可；离线状态下音色取决于本地 TTS。
- 页面无任何网络请求（字体使用系统栈、图像使用 emoji），断网或国内环境都能正常打开。
- 仓库内的 `src/`、`package.json` 等是早期 Next.js 版本的实现，仅作对照保留，静态站点完全不依赖它们；如需精简仓库，可以直接删除 `src/`、`scripts/`、`public/`、`package.json`、`pnpm-lock.yaml` 及各类构建配置。旧版说明见 [README.nextjs.md](./README.nextjs.md)。
