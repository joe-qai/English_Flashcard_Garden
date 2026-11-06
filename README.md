# 英文闪卡园 · Flashcard Garden · 纯静态版

按主题分类的常见英文单词闪卡：emoji 图标 + 英文 + 国际音标 + 中文释义，点击卡片即可听发音；另附 28 个场景对话、24 首英文歌曲、5 个安徒生童话与互动小游戏。中文默认隐藏，一键切换。

**纯 HTML / CSS / JavaScript，无框架、无构建、无后端、无外部依赖**。双击 `index.html` 就能用，也可以直接托管到 GitHub Pages。

## 功能

- **27 个主题分类**：水果、颜色、食物、动物、文具、家具、厨具、侏罗纪、海洋生物、植物、军事武器、二十四节气、四季、天气、穿着、身体部位、健康看病、购物付款、交通出行、职业工作、房间家居、工具维修、时间概念、爱好休闲、数字计量、运动综合、节日庆典，共 648 个单词
- **28 个场景对话**：洗漱、早上、中午、晚上、吃饭、上厕所、上课、运动（足球）、徒步、睡觉、问时间、问路、认一认、问问题、心情，以及侏罗纪、海洋生物、动物园、历史、军事、在商店、在餐厅、看医生、坐公交、过生日、周末计划、修理东西、寄快递
- **24 首英文歌曲**：童谣 9 首（小星星、划小船、玛丽的小羊羔、伦敦桥、公交车上的轮子、老麦克唐纳、咩咩黑羊、蛋头先生、杰克和吉尔）、动画金曲 7 首（Nobody Like U、Peaches、Surface Pressure、We Don't Talk About Bruno、Sunflower、Enemy、Dance the Night Away）、流行金曲 8 首（500 Miles、Big Big World、Count On Me、Proud of You、Seasons in the Sun、Yesterday Once More、You Are My Sunshine、Let It Be Me）；音频统一放在根目录 `music/`，有歌词的歌曲另配可跟读歌词
- **5 个安徒生童话**：丑小鸭、拇指姑娘、皇帝的新装、卖火柴的小女孩、海的女儿，逐句朗读，可单句循环
- **全局中文开关**：右上角一键隐藏/显示所有中文（卡片释义、对话译文、歌词译文、标题），英文与音标始终保留，状态记忆在 `localStorage`
- **互动小游戏**：英文→中文、中文→英文两种题型，20 题一轮，记录正确率与最长连对
- **句中音标**：对话与歌词里多音节、不易读的单词会以小号灰字标注音标，只标首次出现
- **点击发音**：调用浏览器内置 Web Speech API 朗读单词或整句对话（不支持时静默降级）
- **连续播放**：场景对话「播放全部」、歌曲「朗读歌词」逐句跟读，可随时停止
- **深色模式**：跟随系统偏好，手动切换后记忆在 `localStorage`
- **可分享链接**：单词分类写入 URL hash（如 `#animals`），刷新或分享后直达对应分类
- **键盘友好**：卡片与对话句子支持 Tab 聚焦与回车触发
- **响应式布局**：桌面五列、平板三到四列、手机两列网格；分类与曲目导航横向滚动，不挤压内容；尊重 `prefers-reduced-motion`

## 目录结构

```
index.html              # 页面骨架（可直接双击打开）
favicon.svg             # 站点图标
assets/style.css        # 全部样式（设计基调见 DESIGN.md）
assets/words.js         # 单词数据源（27 分类 × 24 词）
assets/scenes.js        # 场景对话数据源
assets/songs.js         # 歌曲数据源（24 首，歌词 + 音频路径）
assets/stories.js       # 故事会数据源（安徒生童话改写）
music/*.mp3             # 24 首歌曲音频（文件名即曲目名）
assets/app.js           # 页签 / 发音 / 播放 / 中文开关 / 游戏 / 主题
.nojekyll               # 告诉 GitHub Pages 跳过 Jekyll 处理
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

## 维护场景对话

只改 `assets/scenes.js`：

```js
window.DIALOGUE_SCENES = [
  {
    id: 'morning',     // 保持唯一
    zh: '早上',
    en: 'Morning',
    icon: '🌅',
    color: '#F6A94D',  // 场景标签与播放按钮的主题色
    desc: '起床、问早、出门前的几句话',
    lines: [
      {
        who: 'Mom',
        en: 'Good morning, dear. Time to get up.',
        zh: '早上好，宝贝。该起床了。',
        notes: { morning: '/ˈmɔːnɪŋ/' },  // 可选：句中音标
      },
    ],
  },
];
```

`notes` 的键写句子中出现的单词（不区分大小写），值为音标；同一个词只在首次出现处标注。不加 `notes` 的行正常渲染，不影响朗读。

页脚的场景数量会自动统计；对话句子点击即可单独朗读，「播放全部」按顺序连读。`who` 是可选字段，留空时该行不显示说话人（歌曲就是这样）。

## 维护英文歌曲

只改 `assets/songs.js`：

```js
window.SONG_LIBRARY = [
  {
    id: 'twinkle',                  // 保持唯一
    zh: '小星星',
    en: 'Twinkle Twinkle Little Star',
    icon: '⭐',
    color: '#7C86C7',
    desc: '最经典的哄睡童谣，句子短、重复多',
    audio: 'music/Twinkle Twinkle Little Star.mp3',  // 指向 music/ 下的文件
    rate: 0.78,                     // 整首连读的语速，建议 0.75~0.85
    lines: [
      { en: 'Twinkle, twinkle, little star,', zh: '一闪一闪小星星，', notes: { twinkle: '/ˈtwɪŋkl/' } },
    ],
  },
];
```

歌曲与场景对话共用同一套播放器样式与交互，多一个 `audio` 字段用于挂载音频、一个 `rate` 字段用于放慢朗读语速；句间停顿比对话更长，方便跟读。

音频放在仓库根目录的 `music/`，文件名原样写进 `audio` 即可（含空格也没问题，路径里出现单引号时用双引号包裹）。`lines` 留空数组时，播放器只展示音频并提示「纯享版」，不会出现朗读按钮。

> ⚠️ `music/` 里的曲目多为版权作品，仅适合本地自用；公开部署前请先确认授权，或把 `music/` 加入 `.gitignore` 只保留目录说明。

## 说明

- 发音依赖系统语音包，Chrome / Edge / Safari 均可；离线状态下音色取决于本地 TTS。
- 页面无任何网络请求（字体使用系统栈、图像使用 emoji），断网或国内环境都能正常打开。
- 仓库内的 `src/`、`package.json` 等是早期 Next.js 版本的实现，仅作对照保留，静态站点完全不依赖它们；如需精简仓库，可以直接删除 `src/`、`scripts/`、`public/`、`package.json`、`pnpm-lock.yaml` 及各类构建配置。旧版说明见 [README.nextjs.md](./README.nextjs.md)。
