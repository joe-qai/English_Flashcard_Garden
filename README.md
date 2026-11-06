# 英文闪卡园 · Flashcard Garden · 纯静态版

按主题分类的常见英文单词闪卡，词表对齐**沪教牛津版（深圳用）小学 1–6 年级教材单元**：实物图 + 英文 + 中文释义，点击卡片即可听发音；音标默认隐藏，生词高亮，点开卡片才显示音标。另附 28 个场景对话、24 首英文歌曲、33 篇中外故事与互动小游戏。中文默认显示，右上角 `CN` 开关一键切换。

**纯 HTML / CSS / JavaScript，无框架、无构建、无后端、无外部依赖**。双击 `index.html` 就能用，也可以直接托管到 GitHub Pages。

## 功能

- **31 个可见主题 / 770 个单词**：300 个教材核心词（标年级、学期、单元）+ 470 个拓展词。核心主题覆盖家庭、情绪、校园、日常、中国节日，以及水果、颜色、食物、动物、文具、家具、厨具、侏罗纪、海洋生物、植物、二十四节气、四季、天气、穿着、身体部位、健康看病、购物付款、交通出行、职业工作、房间家居、工具维修、时间概念、爱好休闲、数字计量、运动综合、节日庆典；军事武器分类保留 23 个词在数据中但默认隐藏
- **教材单元对齐**：按「全部 / 一~六年级 / 拓展」筛选；卡片底部标注 `三年级上 · U5` 之类的教材位置，核心词与拓展词分层
- **英式发音与拼写**：统一 `en-GB` 朗读，优先使用系统里的自然音/在线音，拼写采用英式（grey、pyjamas、trainers、biscuit、chips、underground、fridge、rubber、school bag 等）
- **生词与音标**：没点开过的词右上角有小圆点；音标默认隐藏，点击卡片显示音标并朗读，已读状态记在 `localStorage`
- **中文释义唯一**：同一中文释义不会对应多个英文单词（如 `gift` = 赠品、`present` = 礼物），避免歧义
- **28 个场景对话**：洗漱、早上、中午、晚上、吃饭、上厕所、上课、运动（足球）、徒步、睡觉、问时间、问路、认一认、问问题、心情，以及侏罗纪、海洋生物、动物园、历史、军事、在商店、在餐厅、看医生、坐公交、过生日、周末计划、修理东西、寄快递
- **分角色朗读**：场景对话按 `who` 分配角色音色——小孩优先童声、女性优先女声、男性优先男声，同一场里每个角色尽量拿到不同音色（同班同学、两位成年人也不会撞音）；系统童声不足时用最清楚的空闲音色 + 轻微音高（1.1~1.14）塑成童声，整体音高上限 1.32，避免变调过猛带来失真、听不清。每句还带情绪：场景氛围 + 标点 + 情绪词共同决定快慢高低，感叹句更跳、疑问句上扬、迟疑句放慢。故事自动拆分旁白与引号对白，旁白沉稳、对白带感叹 / 疑问语气
- **24 首英文歌曲**：童谣 9 首（小星星、划小船、玛丽的小羊羔、伦敦桥、公交车上的轮子、老麦克唐纳、咩咩黑羊、蛋头先生、杰克和吉尔）、动画金曲 7 首（Nobody Like U、Peaches、Surface Pressure、We Don't Talk About Bruno、Sunflower、Enemy、Dance the Night Away）、流行金曲 8 首（500 Miles、Big Big World、Count On Me、Proud of You、Seasons in the Sun、Yesterday Once More、You Are My Sunshine、Let It Be Me）；音频统一放在根目录 `music/`。9 首公版童谣配**完整歌词**并可逐句跟读；其余 15 首为版权曲目，只提供音频（纯享版），不摘录歌词。一首播完即停，不会自动切到下一首
- **33 篇双语故事**：安徒生 5 篇（丑小鸭、拇指姑娘、皇帝的新装、卖火柴的小女孩、海的女儿）、伊索寓言 10 篇、格林童话 9 篇，以及中国故事 9 篇（司马光砸缸、孔融让梨、曹冲称象、守株待兔、拔苗助长、亡羊补牢、花木兰、年的传说、嫦娥奔月）；全部用 A1~A2 短句改写，逐句中英对照。朗读时先读标题，再用旁白语气逐句读正文，引号里的对白会自动换角色音色；一篇读完即停，不会自动接下一篇；生词会在词后标注音标
- **全局中文开关**：右上角 `CN` 开关，**高亮（橙色）= 显示中文，置灰 = 隐藏中文**，一键隐藏卡片释义、对话译文、歌词译文与标题，英文与音标始终保留，状态记忆在 `localStorage`
- **图物一致**：能对上实物的一律用 emoji；emoji 里没有的实物（火龙果、柚子、冰箱、洗衣机、衣柜、抽屉、水壶、护膝等）配 `assets/icons/` 下的手绘 SVG，画的就是那个东西；颜色类直接用真实色块，杜绝「火龙果配一条龙」这类错配
- **互动小游戏**：英文→中文、中文→英文两种题型，20 题一轮，记录正确率与最长连对
- **句中音标**：对话、歌词与故事正文里多音节、不易读的单词会以小号灰字标注音标；对话与歌词只标首次出现，故事会标出每一次出现
- **点击发音**：调用浏览器内置 Web Speech API 朗读单词或整句对话；浏览器不支持或缺少英文语音包时弹出提示，建议改用 Chrome / Safari / Edge
- **连续播放**：场景对话「播放全部」、歌曲「朗读歌词」在同一篇内逐句跟读，可随时停止；读完当前篇 / 当前首即停，不自动续播下一篇 / 下一首
- **深色模式**：跟随系统偏好，手动切换后记忆在 `localStorage`
- **可分享链接**：单词分类写入 URL hash（如 `#animals`），刷新或分享后直达对应分类
- **键盘友好**：卡片与对话句子支持 Tab 聚焦与回车触发
- **响应式布局**：桌面五列、平板三到四列、手机两列网格；分类与曲目导航横向滚动，不挤压内容；尊重 `prefers-reduced-motion`

## 目录结构

```
index.html              # 页面骨架（可直接双击打开）
server.cjs              # 零依赖静态服务器（部署 / 本地预览）
favicon.svg             # 站点图标（叠放闪卡 + Aa，同时用于顶栏 logo）
assets/style.css        # 全部样式（设计基调见 DESIGN.md）
assets/words.js         # 单词数据源（由 scripts/build_words.mjs 生成，勿手改）
assets/icons/*.svg      # 手绘实物图标（emoji 画不对或没有的词）
assets/scenes.js        # 场景对话数据源
assets/songs.js         # 歌曲数据源（24 首，歌词 + 音频路径）
assets/stories.js       # 故事会数据源（33 篇：安徒生 5 + 伊索 10 + 格林 9 + 中国故事 9）
data/words.base.js      # 648 词历史底稿（生成器的输入快照）
data/textbook-index.json# 沪教牛津版（深圳用）1–6 年级单元词表索引
data/word-additions.json# 新增分类、补词、英式拼写与释义修正
scripts/build_words.mjs # 生成 assets/words.js，并校验英文 / 中文释义唯一
scripts/build_textbook_index.mjs # 抓取公开词表生成 data/textbook-index.json
music/*.mp3             # 24 首歌曲音频（文件名即曲目名）
assets/app.js           # 页签 / 年级筛选 / 发音 / 播放 / 中文开关 / 游戏 / 主题
.nojekyll               # 告诉 GitHub Pages 跳过 Jekyll 处理
```

## 本地预览

```bash
# 方式一：直接双击 index.html

# 方式二：用内置零依赖静态服务器
node server.cjs
# 打开 http://localhost:5000

# 方式三：任意静态服务器
python -m http.server 8080
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

`assets/words.js` 是生成产物，**不要手改**。词库由三份输入合成：

| 文件 | 作用 |
|---|---|
| `data/words.base.js` | 648 词历史底稿 |
| `data/word-additions.json` | 新增分类、补词、英式拼写映射（`rename`）、释义修正（`glossFix`）、隐藏分类 |
| `data/textbook-index.json` | 沪教牛津版（深圳用）1–6 年级单元词表，用于打 `grade / term / unit` 标签 |

改完输入后运行：

```bash
node scripts/build_words.mjs
```

生成器会同步做两件校验：**英文单词不重复**、**中文释义不重复**；发现重复会打印告警并自动给释义加分类后缀。

词条结构：

```js
{ en: 'apple', ipa: '/ˈæpl/', zh: '苹果', icon: '🍎', pos: 'n.',
  grade: 1, term: 1, unit: 3, unitTitle: 'What do you take to school?', level: 'core' }
```

- `level: 'core'` 表示教材核心词，带 `grade / term / unit`；`extension` 表示拓展词，默认只在「拓展」筛选里出现
- 分类级字段：`group`（school / life / fun）、`defaultGrade`（新增核心主题未匹配教材时落到的年级）、`hidden`（隐藏分类，如 military）
- 音标统一英式；卡片默认不展示音标，点击后显示

`icon` 的三种写法，按「图物一致」优先选：

| 写法 | 用途 |
|---|---|
| `icon: '🍎'` | emoji 里**确实有**这个实物时首选 |
| `icon: 'assets/icons/xxx.svg'` | emoji 里没有的实物，用手绘 SVG（`scripts/make_icons.py` 生成） |
| `swatch: '#E23B3B'` | 颜色类单词，直接渲染真实色片 |

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

页脚的场景数量会自动统计；对话句子点击即可单独朗读，「播放全部」按顺序连读。`who` 是可选字段：填写后会按角色分配不同音色（如 Mom 女声、Tom 童声）；留空时该行不显示说话人（歌曲就是这样）。

分音规则（`assets/app.js` 的 `speakerProfile` / `pickCastVoice` / `castEntry`）：

- 角色性别来自 `who`：`Mom / Teacher / Lily` 女，`Dad / Doctor / Tom` 男，`Class / Everyone` 合唱
- 优先童声（Alfie / Bella / Maisie / Hollie / Noah 等）给小孩，成年音色给成年人；被占用的音色会大幅降权，一场对话里两个同学、两位大人都不会共用同一音色
- 系统没有童声时，小孩改用最清楚的空闲音色 + 轻微音高（1.1~1.14）塑形；音高抬得越高越容易出现“含混”的失真，所以整体音高上限压到 1.32，成人 0.8~1.0
- 句子的情绪由「场景 mood + 标点 + 情绪词」决定：感叹句更快更高、疑问句尾音上扬、省略号放慢、`sorry` 低沉、`Hurry / Look out` 更急；句间停顿也跟着变（感叹句紧、迟疑句留白）
- 调试：在地址后加 `?debug=cast`，控制台执行 `__castDebug.scene('washup')` 查看分音结果，`__castDebug.tone('Nice shot!', 'energetic')` 查看语气参数

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
    lines: [                       // 完整歌词；没有就写 []
      { en: 'Twinkle, twinkle, little star,', zh: '一闪一闪小星星，', notes: { twinkle: '/ˈtwɪŋkl/' } },
      // …整首歌词逐句列完
    ],
  },
];
```

歌曲与场景对话共用同一套播放器样式与交互，多一个 `audio` 字段用于挂载音频、一个 `rate` 字段用于放慢朗读语速；句间停顿比对话更长，方便跟读。歌曲播放器不自动续播，一首播完即停。

音频放在仓库根目录的 `music/`，文件名原样写进 `audio` 即可（含空格也没问题，路径里出现单引号时用双引号包裹）。

**歌词规则：要么写完整，要么不写。** `lines` 留空数组时，播放器只展示音频并显示 `note` 提示（默认「纯享版」），不会出现「朗读歌词」按钮。目前 9 首公有领域童谣是完整歌词，15 首版权曲目只放音频——不摘录半首歌词。想给某首歌补歌词，把 `lines` 填成完整版本即可。

> ⚠️ `music/` 里的版权曲目已随仓库提交，公开仓库托管存在被投诉下架的风险；如要长期公开部署，建议换成已授权音源或把 `music/` 移出版本库。

## 维护英文故事

只改 `assets/stories.js` 的两个导出：

```js
window.STORY_LIBRARY = [
  {
    id: 'ugly-duckling',            // 保持唯一
    zh: '丑小鸭',
    en: 'The Ugly Duckling',
    icon: '🦢',
    color: '#8FB3C9',
    desc: '安徒生 · 被嘲笑的小鸭子，原来是一只白天鹅',
    sentences: [
      { en: 'Mother Duck sits on her eggs.', zh: '鸭妈妈坐在她的蛋上。' },
      // …
    ],
  },
];

// 生词音标：键 = 正文中真实出现的拼写（含 -s / -es 变形）
window.STORY_GLOSSARY = {
  duckling: '/ˈdʌklɪŋ/',
  // …
};
```

朗读时先读 `en` 标题，再逐句读 `sentences`；旁白用沉稳语气，引号里的对白会自动拆分、换角色音色并抬高语调。一篇读完即停，不会自动切到下一篇。正文渲染时会用 `STORY_GLOSSARY` 给命中词加音标，**键必须和正文拼写完全一致**（`duckling` 匹配不到 `ducklings`）。

## 浏览器兼容

语音朗读依赖浏览器内置的 Web Speech API 与系统英文语音包，歌曲播放依赖 HTML5 `<audio>`：

- **推荐浏览器**：Chrome、Safari、Edge（桌面与移动端均可）
- **可能无声**：华为自带浏览器、微信 / QQ / 钉钉 / 支付宝 / 微博内置浏览器、UC、夸克、小米浏览器等。这类内核常常没有英文语音包，表现为「点了没声音」
- **发音人自动优选**：默认按「自然音 > 在线音 > 本机音、英式优先」排序，Edge 的 Libby / Sonia / Ryan 等在线自然音会优先于老式 SAPI 音色；右上角 🔊 下拉可手动切换，选择记在 `localStorage`（`flashcard:voice`）
- **在线音兜底**：在线自然音断网或超时（5 秒未发声）时自动退回本机英式音，避免朗读卡住
- **页面内的兜底**：
  - 识别到上述弱环境，或浏览器完全没有 Web Speech API 时，页面底部弹出提示条，附「复制本页链接」方便换浏览器打开；点「知道了」后不再主动弹出（记在 `localStorage`）
  - 语音调用本机音 1.8 秒仍未开始、或触发「非主动打断」类错误时，判定为不可用并提示，避免「点了没反应」
  - 歌曲音频加载失败、自动播放被拦截时分别给出提示（检查网络 / 手动点 ▶）

## 说明

- 发音依赖系统语音包，Chrome / Edge / Safari 均可；离线状态下音色取决于本地 TTS。
- 页面无任何网络请求（字体使用系统栈，图像用 emoji 与本地 SVG），断网或国内环境都能正常打开。
- 仓库内的 `src/`、`package.json`、`public/` 等是早期 Next.js 版本的实现，静态站点完全不依赖它们；如需精简仓库，可以删除 `src/`、`public/`、`package.json`、`pnpm-lock.yaml` 及 Next.js 构建配置，但请保留 `assets/`、`data/`、`scripts/` 和 `server.cjs`。旧版说明见 [README.nextjs.md](./README.nextjs.md)。
