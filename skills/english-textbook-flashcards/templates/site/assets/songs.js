/**
 * 英文歌曲数据源
 * 结构：{ id, zh, en, icon, color, audio, desc, rate, lines: [{ en, zh, notes }], note? }
 * audio：本地音频文件，直接指向仓库根目录的 music/**.mp3（文件名保留原样，含空格）
 * rate：整首连读时的语速，童谣 0.76~0.78，流行歌 0.8~0.82，方便跟读。
 * lines：完整歌词。公版童谣写全本；版权曲目不下歌词（lines 为空），只放音频。
 * note：lines 为空时显示在播放器下方的提示。
 * 纯静态脚本（非 ES Module），可直接用 file:// 打开。
 */
window.SONG_LIBRARY = [
  /* ---------------- 一、经典童谣（公有领域，歌词完整） ---------------- */
  {
    id: 'twinkle',
    zh: '小星星',
    en: 'Twinkle Twinkle Little Star',
    icon: '⭐',
    color: '#7C86C7',
    audio: null,
    desc: '最经典的哄睡童谣，全诗五节，句子短、重复多',
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
      },
      {
        en: 'How I wonder what you are.',
        zh: '我多想知道你是什么。',
      },

      {
        en: 'When the blazing sun is gone,',
        zh: '当炽热的太阳落下，',
        notes: { blazing: '/ˈbleɪzɪŋ/' },
      },
      {
        en: 'When he nothing shines upon,',
        zh: '当它不再照亮什么，',
      },
      {
        en: 'Then you show your little light,',
        zh: '你就亮起小小的光，',
      },
      {
        en: 'Twinkle, twinkle, all the night.',
        zh: '一闪一闪，整夜不息。',
      },
      {
        en: 'Twinkle, twinkle, little star,',
        zh: '一闪一闪小星星，',
      },
      {
        en: 'How I wonder what you are.',
        zh: '我多想知道你是什么。',
      },

      {
        en: 'Then the traveller in the dark',
        zh: '于是黑夜里赶路的人',
        notes: { traveller: '/ˈtrævələ(r)/' },
      },
      {
        en: 'Thanks you for your tiny spark;',
        zh: '感谢你这点小小的火花；',
        notes: { spark: '/spɑːk/' },
      },
      {
        en: 'He could not see which way to go,',
        zh: '他本看不清该往哪儿走，',
      },
      {
        en: 'If you did not twinkle so.',
        zh: '若不是你这样闪烁。',
      },
      {
        en: 'Twinkle, twinkle, little star,',
        zh: '一闪一闪小星星，',
      },
      {
        en: 'How I wonder what you are.',
        zh: '我多想知道你是什么。',
      },

      {
        en: 'In the dark blue sky you keep,',
        zh: '你在深蓝的夜空里守候，',
      },
      {
        en: 'And often through my curtains peep,',
        zh: '常常透过我的窗帘张望，',
        notes: { curtains: '/ˈkɜːtnz/', peep: '/piːp/' },
      },
      {
        en: 'For you never shut your eye',
        zh: '因为你从不闭上眼，',
      },
      {
        en: 'Till the sun is in the sky.',
        zh: '直到太阳升上天空。',
      },
      {
        en: 'Twinkle, twinkle, little star,',
        zh: '一闪一闪小星星，',
      },
      {
        en: 'How I wonder what you are.',
        zh: '我多想知道你是什么。',
      },

      {
        en: 'As your bright and tiny spark',
        zh: '你明亮又微小的火花',
      },
      {
        en: 'Lights the traveller in the dark,',
        zh: '照亮黑夜里的旅人，',
      },
      {
        en: 'Though I know not what you are,',
        zh: '虽然我不知道你是什么，',
      },
      {
        en: 'Twinkle, twinkle, little star.',
        zh: '一闪一闪小星星。',
      },
      {
        en: 'Twinkle, twinkle, little star,',
        zh: '一闪一闪小星星，',
      },
      {
        en: 'How I wonder what you are.',
        zh: '我多想知道你是什么。',
      },
    ],
  },
  {
    id: 'row',
    zh: '划小船',
    en: 'Row Row Row Your Boat',
    icon: '🛶',
    color: '#4F9BB5',
    audio: null,
    desc: '一整首就是四句，可以几组人轮着唱',
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
    audio: null,
    desc: '四段完整故事：小羊跟去学校，又被请出教室',
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

      {
        en: 'It followed her to school one day,',
        zh: '有一天它跟着她去了学校，',
        notes: { followed: '/ˈfɒləʊd/', school: '/skuːl/' },
      },
      {
        en: 'Which was against the rule.',
        zh: '这可是违反校规的。',
        notes: { against: '/əˈɡenst/', rule: '/ruːl/' },
      },
      {
        en: 'It made the children laugh and play,',
        zh: '它让孩子们又笑又玩，',
        notes: { children: '/ˈtʃɪldrən/', laugh: '/lɑːf/' },
      },
      {
        en: 'To see a lamb at school.',
        zh: '因为在学校里看到了一只小羊。',
      },

      {
        en: 'And so the teacher turned it out,',
        zh: '于是老师把它请了出去，',
      },
      {
        en: 'But still it lingered near,',
        zh: '可它仍在附近徘徊，',
        notes: { lingered: '/ˈlɪŋɡəd/' },
      },
      {
        en: 'And waited patiently about,',
        zh: '耐心地等在旁边，',
        notes: { patiently: '/ˈpeɪʃntli/' },
      },
      {
        en: 'Till Mary did appear.',
        zh: '直到玛丽出现。',
      },

      {
        en: '"Why does the lamb love Mary so?"',
        zh: '“小羊为什么这么爱玛丽？”',
      },
      {
        en: 'The eager children cry.',
        zh: '性急的孩子们喊道。',
        notes: { eager: '/ˈiːɡə(r)/' },
      },
      {
        en: '"Why, Mary loves the lamb, you know,"',
        zh: '“因为玛丽爱小羊呀，”',
      },
      {
        en: 'The teacher did reply.',
        zh: '老师回答说。',
      },
    ],
  },
  {
    id: 'london-bridge',
    zh: '伦敦桥',
    en: 'London Bridge Is Falling Down',
    icon: '🌉',
    color: '#C98B5E',
    audio: null,
    desc: '五段完整歌词：塌了、用木头修、被水冲走、换砖石、换钢铁',
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

      {
        en: 'Build it up with wood and clay,',
        zh: '用木头和黏土把它建起来，',
        notes: { clay: '/kleɪ/' },
      },
      {
        en: 'Wood and clay, wood and clay.',
        zh: '木头和黏土，木头和黏土。',
      },
      {
        en: 'Build it up with wood and clay,',
        zh: '用木头和黏土把它建起来，',
      },
      {
        en: 'My fair lady.',
        zh: '我美丽的姑娘。',
      },

      {
        en: 'Wood and clay will wash away,',
        zh: '木头和黏土会被水冲走，',
      },
      {
        en: 'Wash away, wash away.',
        zh: '会被冲走，会被冲走。',
      },
      {
        en: 'Wood and clay will wash away,',
        zh: '木头和黏土会被水冲走，',
      },
      {
        en: 'My fair lady.',
        zh: '我美丽的姑娘。',
      },

      {
        en: 'Build it up with bricks and mortar,',
        zh: '用砖头和灰泥把它建起来，',
        notes: { bricks: '/brɪks/', mortar: '/ˈmɔːtə(r)/' },
      },
      {
        en: 'Bricks and mortar, bricks and mortar.',
        zh: '砖头和灰泥，砖头和灰泥。',
      },
      {
        en: 'Build it up with bricks and mortar,',
        zh: '用砖头和灰泥把它建起来，',
      },
      {
        en: 'My fair lady.',
        zh: '我美丽的姑娘。',
      },

      {
        en: 'Build it up with iron and steel,',
        zh: '用铁和钢把它建起来，',
        notes: { iron: '/ˈaɪən/', steel: '/stiːl/' },
      },
      {
        en: 'Iron and steel, iron and steel.',
        zh: '铁和钢，铁和钢。',
      },
      {
        en: 'Build it up with iron and steel,',
        zh: '用铁和钢把它建起来，',
      },
      {
        en: 'My fair lady.',
        zh: '我美丽的姑娘。',
      },
    ],
  },
  {
    id: 'wheels-bus',
    zh: '公交车上的轮子',
    en: 'The Wheels on the Bus',
    icon: '🚌',
    color: '#D7A23F',
    audio: null,
    desc: '六段完整歌词：轮子、雨刷、喇叭、宝宝、家长、车门',
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

      {
        en: 'The wipers on the bus go swish, swish, swish,',
        zh: '公交车上的雨刷唰唰唰，',
        notes: { wipers: '/ˈwaɪpəz/', swish: '/swɪʃ/' },
      },
      {
        en: 'Swish, swish, swish, swish, swish, swish.',
        zh: '唰唰唰，唰唰唰。',
      },
      {
        en: 'The wipers on the bus go swish, swish, swish,',
        zh: '公交车上的雨刷唰唰唰，',
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
      },

      {
        en: 'The horn on the bus goes beep, beep, beep,',
        zh: '公交车上的喇叭嘀嘀嘀，',
        notes: { horn: '/hɔːn/' },
      },
      {
        en: 'Beep, beep, beep, beep, beep, beep.',
        zh: '嘀嘀嘀，嘀嘀嘀。',
      },
      {
        en: 'The horn on the bus goes beep, beep, beep,',
        zh: '公交车上的喇叭嘀嘀嘀，',
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
      },

      {
        en: 'The babies on the bus go wah, wah, wah,',
        zh: '公交车上的宝宝哇哇哇，',
        notes: { babies: '/ˈbeɪbiz/' },
      },
      {
        en: 'Wah, wah, wah, wah, wah, wah.',
        zh: '哇哇哇，哇哇哇。',
      },
      {
        en: 'The babies on the bus go wah, wah, wah,',
        zh: '公交车上的宝宝哇哇哇，',
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
      },

      {
        en: 'The parents on the bus go shh, shh, shh,',
        zh: '公交车上的家长嘘嘘嘘，',
        notes: { parents: '/ˈpeərənts/' },
      },
      {
        en: 'Shh, shh, shh, shh, shh, shh.',
        zh: '嘘嘘嘘，嘘嘘嘘。',
      },
      {
        en: 'The parents on the bus go shh, shh, shh,',
        zh: '公交车上的家长嘘嘘嘘，',
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
      },

      {
        en: 'The doors on the bus go open and shut,',
        zh: '公交车上的门开了又关，',
        notes: { doors: '/dɔːz/' },
      },
      {
        en: 'Open and shut, open and shut.',
        zh: '开了又关，开了又关。',
      },
      {
        en: 'The doors on the bus go open and shut,',
        zh: '公交车上的门开了又关，',
      },
      {
        en: 'All through the town.',
        zh: '穿过整个小镇。',
      },
    ],
  },
  {
    id: 'old-macdonald',
    zh: '老麦克唐纳有个农场',
    en: 'Old Macdonald Had a Farm',
    icon: '🐄',
    color: '#8FA85E',
    audio: null,
    desc: '五段完整歌词：奶牛、小猪、鸭子、马、绵羊',
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
      {
        en: 'Old MacDonald had a farm, E-I-E-I-O.',
        zh: '老麦克唐纳有个农场，咿呀咿呀哟。',
      },

      {
        en: 'And on his farm he had a pig, E-I-E-I-O.',
        zh: '他的农场里有一头小猪，咿呀咿呀哟。',
        notes: { pig: '/pɪɡ/' },
      },
      {
        en: 'With an oink oink here and an oink oink there,',
        zh: '这里哼哼，那里哼哼，',
        notes: { oink: '/ɔɪŋk/' },
      },
      {
        en: 'Here an oink, there an oink, everywhere an oink oink.',
        zh: '这里哼，那里哼，到处都哼哼。',
      },
      {
        en: 'Old MacDonald had a farm, E-I-E-I-O.',
        zh: '老麦克唐纳有个农场，咿呀咿呀哟。',
      },

      {
        en: 'And on his farm he had a duck, E-I-E-I-O.',
        zh: '他的农场里有一只鸭子，咿呀咿呀哟。',
        notes: { duck: '/dʌk/' },
      },
      {
        en: 'With a quack quack here and a quack quack there,',
        zh: '这里嘎嘎，那里嘎嘎，',
        notes: { quack: '/kwæk/' },
      },
      {
        en: 'Here a quack, there a quack, everywhere a quack quack.',
        zh: '这里嘎，那里嘎，到处都嘎嘎。',
      },
      {
        en: 'Old MacDonald had a farm, E-I-E-I-O.',
        zh: '老麦克唐纳有个农场，咿呀咿呀哟。',
      },

      {
        en: 'And on his farm he had a horse, E-I-E-I-O.',
        zh: '他的农场里有一匹马，咿呀咿呀哟。',
        notes: { horse: '/hɔːs/' },
      },
      {
        en: 'With a neigh neigh here and a neigh neigh there,',
        zh: '这里咴咴，那里咴咴，',
        notes: { neigh: '/neɪ/' },
      },
      {
        en: 'Here a neigh, there a neigh, everywhere a neigh neigh.',
        zh: '这里咴，那里咴，到处都咴咴。',
      },
      {
        en: 'Old MacDonald had a farm, E-I-E-I-O.',
        zh: '老麦克唐纳有个农场，咿呀咿呀哟。',
      },

      {
        en: 'And on his farm he had a sheep, E-I-E-I-O.',
        zh: '他的农场里有一只绵羊，咿呀咿呀哟。',
        notes: { sheep: '/ʃiːp/' },
      },
      {
        en: 'With a baa baa here and a baa baa there,',
        zh: '这里咩咩，那里咩咩，',
        notes: { baa: '/bɑː/' },
      },
      {
        en: 'Here a baa, there a baa, everywhere a baa baa.',
        zh: '这里咩，那里咩，到处都咩咩。',
      },
      {
        en: 'Old MacDonald had a farm, E-I-E-I-O.',
        zh: '老麦克唐纳有个农场，咿呀咿呀哟。',
      },
    ],
  },
  {
    id: 'baa-black-sheep',
    zh: '咩咩黑羊',
    en: 'Baa Baa Black Sheep',
    icon: '🐏',
    color: '#8E9BB3',
    audio: null,
    desc: '一整首就是四句，曲调和小星星一样',
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
    audio: null,
    desc: '一整首就是四句，讲一个摔下墙头的小故事',
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
    audio: null,
    desc: '两段完整歌词：摔下坡之后，一瘸一拐回家包扎',
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

      {
        en: 'Up Jack got, and home did trot,',
        zh: '杰克爬了起来，一溜小跑回家，',
        notes: { trot: '/trɒt/' },
      },
      {
        en: 'As fast as he could caper,',
        zh: '跑得能多快就多快，',
        notes: { caper: '/ˈkeɪpə(r)/' },
      },
      {
        en: 'To old Dame Dob, who patched his nob',
        zh: '去找多布婆婆，她给他修补脑袋，',
        notes: { patched: '/pætʃt/', nob: '/nɒb/' },
      },
      {
        en: 'With vinegar and brown paper.',
        zh: '用的是醋和牛皮纸。',
        notes: { vinegar: '/ˈvɪnɪɡə(r)/' },
      },
    ],
  },

  /* ---------------- 二、动画电影金曲（版权曲目，只放音频） ---------------- */
  {
    id: 'nobody-like-u',
    zh: '没人像你',
    en: 'Nobody Like U',
    icon: '💜',
    color: '#C77FA8',
    audio: null,
    desc: '《青春变形记》男团歌，句子极短、重复多',
    rate: 0.8,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'peaches',
    zh: '桃子',
    en: 'Peaches',
    icon: '🍑',
    color: '#D98B6B',
    audio: null,
    desc: '《超级马力欧兄弟大电影》插曲，副歌只有一句反复',
    rate: 0.8,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'surface-pressure',
    zh: '表面压力',
    en: 'Surface Pressure',
    icon: '🌋',
    color: '#C96F6F',
    audio: null,
    desc: '《魔法满屋》里唱“扛下一切”的那首，语速偏快',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'bruno',
    zh: '我们不谈布鲁诺',
    en: "We Don't Talk About Bruno",
    icon: '🕯️',
    color: '#B98FC9',
    audio: null,
    desc: '《魔法满屋》全家大合唱，家庭成员称呼一次认全',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'sunflower',
    zh: '向日葵',
    en: 'Sunflower',
    icon: '🌻',
    color: '#D9A93F',
    audio: null,
    desc: '《蜘蛛侠：平行宇宙》片尾曲，节奏轻、词汇日常',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'enemy',
    zh: '宿敌',
    en: 'Enemy',
    icon: '⚡',
    color: '#6F7FA8',
    audio: null,
    desc: '《双城之战》主题曲，节奏强，适合当背景氛围',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'dance-night-away',
    zh: '跳一整夜',
    en: 'Dance the Night Away',
    icon: '💃',
    color: '#C76F9B',
    audio: null,
    desc: '轻快舞曲，先听旋律找拍子，再跟着动一动',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },

  /* ---------------- 三、流行金曲（版权曲目，只放音频） ---------------- */
  {
    id: 'five-hundred-miles',
    zh: '五百英里',
    en: '500 Miles',
    icon: '🛣️',
    color: '#B8763E',
    audio: null,
    desc: '离家与归途，副歌一直重复同一句，很好跟',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'big-big-world',
    zh: '大大世界',
    en: 'Big Big World',
    icon: '🌍',
    color: '#5AA9B5',
    audio: null,
    desc: 'Emilia · 形容词与大小对比，语速慢、咬字清楚',
    rate: 0.8,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'count-on-me',
    zh: '依靠我',
    en: 'Count On Me',
    icon: '🤝',
    color: '#6F9BC9',
    audio: null,
    desc: 'Bruno Mars · 友谊主题，“count on me” 是高频句',
    rate: 0.8,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'proud-of-you',
    zh: '为你骄傲',
    en: 'Proud of You',
    icon: '🕊️',
    color: '#8FB3C9',
    audio: null,
    desc: '冯曦妤 · “I can fly” 一响就是校园回忆',
    rate: 0.8,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'seasons-in-the-sun',
    zh: '阳光岁月',
    en: 'Seasons in the Sun',
    icon: '☀️',
    color: '#C9915E',
    audio: null,
    desc: 'Westlife · 四季与告别，过去时和现在完成时都有',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'yesterday-once-more',
    zh: '昨日重现',
    en: 'Yesterday Once More',
    icon: '📻',
    color: '#9A8FB3',
    audio: null,
    desc: 'Carpenters · 收音机、老歌与回忆，一般过去时范例',
    rate: 0.82,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'you-are-my-sunshine',
    zh: '你是我的阳光',
    en: 'You Are My Sunshine',
    icon: '🌞',
    color: '#D9B34F',
    audio: null,
    desc: '天气、颜色与人称，教材里最常出现的一首',
    rate: 0.78,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
  {
    id: 'let-it-be-me',
    zh: '让我陪着你',
    en: 'Let It Be Me',
    icon: '🌾',
    color: '#A8907A',
    audio: null,
    desc: '慢速抒情，适合睡前当背景音乐',
    rate: 0.8,
    lines: [],
    note: '纯享版 · 版权曲目，只提供音频，歌词请看官方 MV',
  },
];