/**
 * 英文歌谣数据源（全部为公版童谣，无版权风险）
 * 结构：{ id, zh, en, icon, color, desc, rate, lines: [{ en, zh, notes }] }
 * rate：整首连读时的语速，歌谣放慢到 0.78，方便跟读。
 * 纯静态脚本（非 ES Module），可直接用 file:// 打开。
 */
window.SONG_LIBRARY = [
  {
    id: 'twinkle',
    zh: '小星星',
    en: 'Twinkle Twinkle Little Star',
    icon: '⭐',
    color: '#7C86C7',
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
    ],
  },
  {
    id: 'row',
    zh: '划小船',
    en: 'Row Row Row Your Boat',
    icon: '🛶',
    color: '#4F9BB5',
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
    id: 'bus',
    zh: '公交车上的轮子',
    en: 'The Wheels on the Bus',
    icon: '🚌',
    color: '#D7A23F',
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
        notes: { round: '/raʊnd/' },
      },
      {
        en: 'The wheels on the bus go round and round,',
        zh: '公交车上的轮子转呀转，',
        notes: { wheels: '/wiːlz/', round: '/raʊnd/' },
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
        notes: { through: '/θruː/' },
      },
      {
        en: 'The wipers on the bus go swish, swish, swish,',
        zh: '公交车上的雨刷唰唰唰，',
        notes: { wipers: '/ˈwaɪpəz/', swish: '/swɪʃ/' },
      },
      {
        en: 'The horn on the bus goes beep, beep, beep.',
        zh: '公交车上的喇叭嘀嘀嘀。',
        notes: { horn: '/hɔːn/' },
      },
    ],
  },
  {
    id: 'farm',
    zh: '老麦克唐纳有个农场',
    en: 'Old MacDonald Had a Farm',
    icon: '🐄',
    color: '#8FA85E',
    desc: '认识农场动物和它们的叫声',
    rate: 0.78,
    lines: [
      {
        en: 'Old MacDonald had a farm,',
        zh: '老麦克唐纳有个农场，',
        notes: { MacDonald: '/məkˈdɒnəld/', farm: '/fɑːm/' },
      },
      {
        en: 'E-I-E-I-O.',
        zh: '咿呀咿呀哟。',
      },
      {
        en: 'And on his farm he had a cow,',
        zh: '他的农场里有一头奶牛，',
        notes: { farm: '/fɑːm/' },
      },
      {
        en: 'E-I-E-I-O.',
        zh: '咿呀咿呀哟。',
      },
      {
        en: 'With a moo moo here and a moo moo there,',
        zh: '这里哞哞，那里哞哞，',
      },
      {
        en: 'Here a moo, there a moo, everywhere a moo moo.',
        zh: '这里哞，那里哞，到处都哞哞。',
        notes: { everywhere: '/ˈevriweə(r)/' },
      },
    ],
  },
];
