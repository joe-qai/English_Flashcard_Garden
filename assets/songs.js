/**
 * 英文歌谣 / 歌曲数据源
 * 结构：{ id, zh, en, icon, color, audio, desc, rate, lines: [{ en, zh, notes }] }
 * audio：本地音频文件，直接指向仓库根目录的 music/**.mp3（文件名保留原样，含空格）
 * rate：整首连读时的语速，歌谣 0.76~0.8，流行歌 0.82 左右，方便跟读。
 * lines 为空表示暂无歌词文本，播放器只展示音频（纯享版）。
 * 纯静态脚本（非 ES Module），可直接用 file:// 打开。
 */
window.SONG_LIBRARY = [
  /* ---------------- 一、经典童谣 ---------------- */
  {
    id: 'twinkle',
    zh: '小星星',
    en: 'Twinkle Twinkle Little Star',
    icon: '⭐',
    color: '#7C86C7',
    audio: 'music/Twinkle Twinkle Little Star.mp3',
    desc: '最经典的哄睡童谣，句子短、重复多',
    rate: 0.78,
    lines: [
      {
        en: 'Twinkle, twinkle, little star,',
        zh: '一闪一闪小星星，',
        notes: { twinkle: '/ˈtwɪŋkl/', little: '/ˈlɪtl/' },
      },
      {
        en: 'How I wonder what you are.',
        zh: '我多想知道你是什么。',
        notes: { wonder: '/ˈwʌndə(r)/' },
      },
      {
        en: 'Up above the world so high,',
        zh: '高高挂在世界之上，',
        notes: { above: '/əˈbʌv/' },
      },
      {
        en: 'Like a diamond in the sky.',
        zh: '像天上的一颗钻石。',
        notes: { diamond: '/ˈdaɪəmənd/' },
      },
    ],
  },
  {
    id: 'row',
    zh: '划小船',
    en: 'Row Row Row Your Boat',
    icon: '🛶',
    color: '#4F9BB5',
    audio: 'music/Row Row Row Your Boat.mp3',
    desc: '节奏轻快，适合拍手打节拍跟读',
    rate: 0.76,
    lines: [
      {
        en: 'Row, row, row your boat,',
        zh: '划呀划呀划小船，',
      },
      {
        en: 'Gently down the stream.',
        zh: '轻轻顺流而下。',
        notes: { gently: '/ˈdʒentli/', stream: '/striːm/' },
      },
      {
        en: 'Merrily, merrily, merrily, merrily,',
        zh: '快乐地，快乐地，快乐地，快乐地，',
        notes: { merrily: '/ˈmerəli/' },
      },
      {
        en: 'Life is but a dream.',
        zh: '人生不过一场梦。',
      },
    ],
  },
  {
    id: 'mary-lamb',
    zh: '玛丽的小羊羔',
    en: 'Mary Had a Little Lamb',
    icon: '🐑',
    color: '#9FB4D8',
    audio: 'music/Mary Had a Little Lamb.mp3',
    desc: '认识颜色与学校场景，句子押韵好记',
    rate: 0.78,
    lines: [
      {
        en: 'Mary had a little lamb,',
        zh: '玛丽有一只小羊羔，',
        notes: { lamb: '/læm/' },
      },
      {
        en: 'Its fleece was white as snow.',
        zh: '它的绒毛白得像雪。',
        notes: { fleece: '/fliːs/', snow: '/snəʊ/' },
      },
      {
        en: 'And everywhere that Mary went,',
        zh: '无论玛丽走到哪里，',
        notes: { everywhere: '/ˈevriweə(r)/' },
      },
      {
        en: 'The lamb was sure to go.',
        zh: '小羊羔一定会跟着去。',
        notes: { sure: '/ʃʊə(r)/' },
      },
    ],
  },
  {
    id: 'london-bridge',
    zh: '伦敦桥',
    en: 'London Bridge Is Falling Down',
    icon: '🌉',
    color: '#C98B5E',
    audio: 'music/London Bridge Is Falling Down.mp3',
    desc: '英国传统童谣，认识 build、stone 等动词与名词',
    rate: 0.76,
    lines: [
      {
        en: 'London Bridge is falling down,',
        zh: '伦敦桥要塌下来，',
        notes: { bridge: '/brɪdʒ/', falling: '/ˈfɔːlɪŋ/' },
      },
      {
        en: 'Falling down, falling down.',
        zh: '塌下来，塌下来。',
      },
      {
        en: 'London Bridge is falling down,',
        zh: '伦敦桥要塌下来，',
      },
      {
        en: 'My fair lady.',
        zh: '我美丽的姑娘。',
        notes: { fair: '/feə(r)/', lady: '/ˈleɪdi/' },
      },
    ],
  },
  {
    id: 'wheels-bus',
    zh: '公交车上的轮子',
    en: 'The Wheels on the Bus',
    icon: '🚌',
    color: '#D7A23F',
    audio: 'music/The Wheels on the Bus.mp3',
    desc: '认识轮子、雨刷和喇叭的拟声词',
    rate: 0.78,
    lines: [
      {
        en: 'The wheels on the bus go round and round,',
        zh: '公交车上的轮子转呀转，',
        notes: { wheels: '/wiːlz/', round: '/raʊnd/' },
      },
      {
        en: 'Round and round, round and round.',
        zh: '转呀转，转呀转。',
      },
      {
        en: 'The wheels on the bus go round and round,',
        zh: '公交车上的轮子转呀转，',
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
        notes: { through: '/θruː/' },
      },
    ],
  },
  {
    id: 'old-macdonald',
    zh: '老麦克唐纳有个农场',
    en: 'Old Macdonald Had a Farm',
    icon: '🐄',
    color: '#8FA85E',
    audio: 'music/Old Macdonald Had a Farm.mp3',
    desc: '认识农场动物和它们的叫声',
    rate: 0.78,
    lines: [
      {
        en: 'Old MacDonald had a farm, E-I-E-I-O.',
        zh: '老麦克唐纳有个农场，咿呀咿呀哟。',
        notes: { MacDonald: '/məkˈdɒnəld/', farm: '/fɑːm/' },
      },
      {
        en: 'And on his farm he had a cow, E-I-E-I-O.',
        zh: '他的农场里有一头奶牛，咿呀咿呀哟。',
        notes: { cow: '/kaʊ/' },
      },
      {
        en: 'With a moo moo here and a moo moo there,',
        zh: '这里哞哞，那里哞哞，',
        notes: { moo: '/muː/' },
      },
      {
        en: 'Here a moo, there a moo, everywhere a moo moo.',
        zh: '这里哞，那里哞，到处都哞哞。',
        notes: { everywhere: '/ˈevriweə(r)/' },
      },
    ],
  },
  {
    id: 'baa-black-sheep',
    zh: '咩咩黑羊',
    en: 'Baa Baa Black Sheep',
    icon: '🐏',
    color: '#8E9BB3',
    audio: 'music/Baa Baa Black Sheep.mp3',
    desc: '曲调和小星星一样，是最好上手的第二首',
    rate: 0.78,
    lines: [
      {
        en: 'Baa, baa, black sheep, have you any wool?',
        zh: '咩咩黑羊，你有羊毛吗？',
        notes: { wool: '/wʊl/' },
      },
      {
        en: 'Yes sir, yes sir, three bags full.',
        zh: '有的先生，有的先生，整整三袋。',
      },
      {
        en: 'One for the master, one for the dame,',
        zh: '一袋给主人，一袋给夫人，',
        notes: { master: '/ˈmɑːstə(r)/', dame: '/deɪm/' },
      },
      {
        en: 'And one for the little boy who lives down the lane.',
        zh: '还有一袋给住在巷子里的小男孩。',
        notes: { lane: '/leɪn/' },
      },
    ],
  },
  {
    id: 'humpty-dumpty',
    zh: '蛋头先生',
    en: 'Humpty Dumpty',
    icon: '🥚',
    color: '#C98F7A',
    audio: 'music/Humpty Dumpty.mp3',
    desc: '四句话讲一个小故事，押韵特别强',
    rate: 0.78,
    lines: [
      {
        en: 'Humpty Dumpty sat on a wall,',
        zh: '蛋头先生坐在墙头上，',
      },
      {
        en: 'Humpty Dumpty had a great fall.',
        zh: '蛋头先生重重地摔了下来。',
        notes: { fall: '/fɔːl/' },
      },
      {
        en: "All the king's horses and all the king's men",
        zh: '国王所有的马和所有的士兵，',
      },
      {
        en: "Couldn't put Humpty together again.",
        zh: '都没法把蛋头先生拼回去。',
      },
    ],
  },
  {
    id: 'jack-jill',
    zh: '杰克和吉尔',
    en: 'Jack and Jill',
    icon: '⛰️',
    color: '#7FA07A',
    audio: 'music/Jack And Jill.mp3',
    desc: '上山打水的小故事，练过去式 went / fell',
    rate: 0.78,
    lines: [
      {
        en: 'Jack and Jill went up the hill',
        zh: '杰克和吉尔走上山坡，',
        notes: { hill: '/hɪl/' },
      },
      {
        en: 'To fetch a pail of water.',
        zh: '去打一桶水。',
        notes: { fetch: '/fetʃ/', pail: '/peɪl/' },
      },
      {
        en: 'Jack fell down and broke his crown,',
        zh: '杰克摔倒了，磕破了头，',
        notes: { crown: '/kraʊn/' },
      },
      {
        en: 'And Jill came tumbling after.',
        zh: '吉尔也跟着滚了下来。',
        notes: { tumbling: '/ˈtʌmblɪŋ/' },
      },
    ],
  },

  /* ---------------- 二、动画电影金曲 ---------------- */
  {
    id: 'nobody-like-u',
    zh: '没人像你',
    en: 'Nobody Like U',
    icon: '💜',
    color: '#C77FA8',
    audio: 'music/Nobody Like U.mp3',
    desc: '《青春变形记》男团歌，句子极短、重复多',
    rate: 0.8,
    lines: [
      {
        en: "I've never met nobody like you,",
        zh: '我从没遇到过像你这样的人，',
      },
      {
        en: 'Nobody like you.',
        zh: '没有人像你。',
      },
      {
        en: 'There is nobody like you.',
        zh: '没有人能像你一样。',
      },
    ],
  },
  {
    id: 'peaches',
    zh: '桃子',
    en: 'Peaches',
    icon: '🍑',
    color: '#D98B6B',
    audio: 'music/Peaches.mp3',
    desc: '《超级马力欧兄弟大电影》插曲，副歌只有一句反复',
    rate: 0.8,
    lines: [
      {
        en: 'Peaches, peaches, peaches, peaches, peaches,',
        zh: '桃子，桃子，桃子，桃子，桃子，',
        notes: { peaches: '/ˈpiːtʃɪz/' },
      },
      {
        en: 'I love you, Peaches.',
        zh: '我爱你，桃子。',
      },
    ],
  },
  {
    id: 'surface-pressure',
    zh: '表面压力',
    en: 'Surface Pressure',
    icon: '🌋',
    color: '#C96F6F',
    audio: 'music/Surface.mp3',
    desc: '《魔法满屋》里唱“扛下一切”的那首，语速偏快',
    rate: 0.82,
    lines: [
      {
        en: "I'm the strong one, I'm not nervous,",
        zh: '我是最坚强的那个，我不紧张，',
        notes: { nervous: '/ˈnɜːvəs/' },
      },
      {
        en: "I'm as tough as the crust of the Earth is.",
        zh: '我像地壳一样坚硬。',
        notes: { tough: '/tʌf/', crust: '/krʌst/' },
      },
      {
        en: "I move mountains, I move churches,",
        zh: '我能移山，也能挪动教堂，',
      },
    ],
  },
  {
    id: 'bruno',
    zh: '我们不谈布鲁诺',
    en: "We Don't Talk About Bruno",
    icon: '🕯️',
    color: '#B98FC9',
    audio: "music/We Don't Talk About Bruno.mp3",
    desc: '《魔法满屋》全家大合唱，家庭成员称呼一次认全',
    rate: 0.82,
    lines: [
      {
        en: "We don't talk about Bruno, no, no, no.",
        zh: '我们不谈布鲁诺，不，不，不。',
        notes: { Bruno: '/ˈbruːnəʊ/' },
      },
      {
        en: "We don't talk about Bruno.",
        zh: '我们不谈布鲁诺。',
      },
      {
        en: 'But it was my wedding day.',
        zh: '可那天是我的婚礼。',
        notes: { wedding: '/ˈwedɪŋ/' },
      },
    ],
  },
  {
    id: 'sunflower',
    zh: '向日葵',
    en: 'Sunflower',
    icon: '🌻',
    color: '#D9A93F',
    audio: 'music/Sunflower.mp3',
    desc: '《蜘蛛侠：平行宇宙》片尾曲，节奏轻、词汇日常',
    rate: 0.82,
    lines: [
      {
        en: "You're a sunflower, I think your love would be too much.",
        zh: '你是一朵向日葵，我想你的爱太多了。',
        notes: { sunflower: '/ˈsʌnflaʊə(r)/' },
      },
      {
        en: "You'll be left in the dust unless I stuck by ya.",
        zh: '要不是我陪着你，你早就被落下了。',
        notes: { dust: '/dʌst/' },
      },
    ],
  },
  {
    id: 'enemy',
    zh: '宿敌',
    en: 'Enemy',
    icon: '⚡',
    color: '#6F7FA8',
    audio: 'music/Enemy.mp3',
    desc: '《双城之战》主题曲，节奏强，适合当背景氛围',
    rate: 0.82,
    lines: [
      {
        en: 'Everybody wants to be my enemy.',
        zh: '每个人都想成为我的敌人。',
        notes: { enemy: '/ˈenəmi/' },
      },
      {
        en: 'Spare the sympathy.',
        zh: '省下你的同情吧。',
        notes: { sympathy: '/ˈsɪmpəθi/' },
      },
    ],
  },
  {
    id: 'dance-night-away',
    zh: '跳一整夜',
    en: 'Dance the Night Away',
    icon: '💃',
    color: '#C76F9B',
    audio: 'music/Dance the Night Away.mp3',
    desc: '轻快舞曲，先听旋律找拍子，再跟着动一动',
    rate: 0.82,
    lines: [],
  },

  /* ---------------- 三、流行金曲 ---------------- */
  {
    id: 'five-hundred-miles',
    zh: '五百英里',
    en: '500 Miles',
    icon: '🛣️',
    color: '#B8763E',
    audio: 'music/500 Miles.mp3',
    desc: '离家与归途，副歌一直重复同一句，很好跟',
    rate: 0.82,
    lines: [
      {
        en: 'But I would walk five hundred miles,',
        zh: '但我愿意走五百英里，',
        notes: { hundred: '/ˈhʌndrəd/', miles: '/maɪlz/' },
      },
      {
        en: 'And I would walk five hundred more.',
        zh: '再走五百英里。',
      },
      {
        en: 'Just to be the man who walked a thousand miles',
        zh: '只为成为那个走了一千英里的人，',
        notes: { thousand: '/ˈθaʊznd/' },
      },
      {
        en: 'To fall down at your door.',
        zh: '倒在你的门前。',
      },
    ],
  },
  {
    id: 'big-big-world',
    zh: '大大世界',
    en: 'Big Big World',
    icon: '🌍',
    color: '#5AA9B5',
    audio: 'music/Big Big World-Emilia.mp3',
    desc: 'Emilia · 形容词与大小对比，语速慢、咬字清楚',
    rate: 0.8,
    lines: [
      {
        en: "I'm a big big girl in a big big world.",
        zh: '我是大大世界里的大大女孩。',
        notes: { world: '/wɜːld/' },
      },
      {
        en: "It's not a big big thing if you leave me.",
        zh: '如果你离开我，那也没什么大不了。',
      },
      {
        en: 'But I do do feel that I do do will miss you much.',
        zh: '但我真的会觉得，我会很想你。',
      },
    ],
  },
  {
    id: 'count-on-me',
    zh: '依靠我',
    en: 'Count On Me',
    icon: '🤝',
    color: '#6F9BC9',
    audio: 'music/Count On Me.mp3',
    desc: 'Bruno Mars · 友谊主题，“count on me” 是高频句',
    rate: 0.8,
    lines: [
      {
        en: 'If you ever find yourself stuck in the middle of the sea,',
        zh: '如果你发现自己困在大海中央，',
        notes: { stuck: '/stʌk/' },
      },
      {
        en: "I'll sail the world to find you.",
        zh: '我会航遍世界去找你。',
        notes: { sail: '/seɪl/' },
      },
      {
        en: 'You can count on me like one, two, three.',
        zh: '你可以依靠我，就像数一、二、三。',
      },
    ],
  },
  {
    id: 'proud-of-you',
    zh: '为你骄傲',
    en: 'Proud of You',
    icon: '🕊️',
    color: '#8FB3C9',
    audio: 'music/Proud Of You.mp3',
    desc: '冯曦妤 · “I can fly” 一响就是校园回忆',
    rate: 0.8,
    lines: [
      {
        en: 'I can fly, I am proud that I can fly.',
        zh: '我能飞，我为能飞而骄傲。',
        notes: { proud: '/praʊd/' },
      },
      {
        en: 'To give the best of mine till the end of the time.',
        zh: '献出我最好的，直到时间尽头。',
      },
      {
        en: 'Believe me I can fly, I am proud that I can fly.',
        zh: '相信我，我能飞，我为能飞而骄傲。',
      },
    ],
  },
  {
    id: 'seasons-in-the-sun',
    zh: '阳光岁月',
    en: 'Seasons in the Sun',
    icon: '☀️',
    color: '#C9915E',
    audio: 'music/Seasons In The Sun.mp3',
    desc: 'Westlife · 四季与告别，过去时和现在完成时都有',
    rate: 0.82,
    lines: [
      {
        en: 'Goodbye to you, my trusted friend,',
        zh: '再见了，我最信任的朋友，',
        notes: { trusted: '/ˈtrʌstɪd/' },
      },
      {
        en: "We've known each other since we were nine or ten.",
        zh: '我们从九岁十岁就认识了。',
      },
      {
        en: "Together we've climbed hills and trees,",
        zh: '我们一起爬过山坡、上过树，',
      },
    ],
  },
  {
    id: 'yesterday-once-more',
    zh: '昨日重现',
    en: 'Yesterday Once More',
    icon: '📻',
    color: '#9A8FB3',
    audio: 'music/Yesterday Once More.mp3',
    desc: 'Carpenters · 收音机、老歌与回忆，一般过去时范例',
    rate: 0.82,
    lines: [
      {
        en: "When I was young I'd listen to the radio,",
        zh: '我小时候常听收音机，',
        notes: { radio: '/ˈreɪdiəʊ/' },
      },
      {
        en: 'Waiting for my favorite songs.',
        zh: '等着我最喜欢的歌。',
        notes: { favorite: '/ˈfeɪvərɪt/' },
      },
      {
        en: "When they played I'd sing along,",
        zh: '它们一响，我就跟着唱，',
      },
      {
        en: 'It made me smile.',
        zh: '那让我微笑。',
      },
    ],
  },
  {
    id: 'you-are-my-sunshine',
    zh: '你是我的阳光',
    en: 'You Are My Sunshine',
    icon: '🌞',
    color: '#D9B34F',
    audio: 'music/You Are My Sunshine.mp3',
    desc: '天气、颜色与人称，教材里最常出现的一首',
    rate: 0.78,
    lines: [
      {
        en: 'You are my sunshine, my only sunshine.',
        zh: '你是我的阳光，我唯一的阳光。',
        notes: { sunshine: '/ˈsʌnʃaɪn/' },
      },
      {
        en: 'You make me happy when skies are gray.',
        zh: '天空灰暗时，你让我快乐。',
        notes: { gray: '/ɡreɪ/' },
      },
      {
        en: "You'll never know, dear, how much I love you.",
        zh: '亲爱的，你永远不知道我有多爱你。',
      },
      {
        en: "Please don't take my sunshine away.",
        zh: '请不要把我的阳光带走。',
      },
    ],
  },
  {
    id: 'let-it-be-me',
    zh: '让我陪着你',
    en: 'Let It Be Me',
    icon: '🌾',
    color: '#A8907A',
    audio: 'music/Let It Be Me.mp3',
    desc: '慢速抒情，适合睡前当背景音乐',
    rate: 0.8,
    lines: [],
  },
];