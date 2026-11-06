/**
 * 场景对话数据源
 * 结构：{ id, zh, en, icon, color, desc, lines: [{ who, en, zh, notes }] }
 * notes：可选，{ 单词: '/音标/' }，用于给句中多音节或不易读的单词标注音标。
 * 纯静态脚本（非 ES Module），可直接用 file:// 打开。
 */
window.DIALOGUE_SCENES = [
  {
    id: 'washup',
    zh: '洗漱',
    en: 'Washing Up',
    icon: '🚿',
    color: '#4FA3C7',
    desc: '刷牙、洗脸，早晨的第一件事',
    mood: 'calm',
    lines: [
      {
        who: 'Mom',
        en: 'Time to wash up.',
        zh: '该洗漱了。',
      },
      {
        who: 'Tom',
        en: 'OK. Where is my toothbrush?',
        zh: '好的。我的牙刷在哪儿？',
        notes: {
          toothbrush: '/ˈtuːθbrʌʃ/'
        },
      },
      {
        who: 'Mom',
        en: 'It’s in the cup, next to the sink.',
        zh: '在杯子里，水槽旁边。',
      },
      {
        who: 'Tom',
        en: 'Can I use your toothpaste?',
        zh: '我可以用你的牙膏吗？',
        notes: {
          toothpaste: '/ˈtuːθpeɪst/'
        },
      },
      {
        who: 'Mom',
        en: 'Sure. Don’t forget to wash your face.',
        zh: '可以。别忘了洗脸。',
        notes: {
          forget: '/fəˈɡet/'
        },
      },
      {
        who: 'Tom',
        en: 'I’m done. My face is clean!',
        zh: '我洗好了，我的脸干净了！',
      },
    ],
  },
  {
    id: 'morning',
    zh: '早上',
    en: 'Morning',
    icon: '🌅',
    color: '#F6A94D',
    desc: '起床、问早、出门前的几句话',
    mood: 'warm',
    lines: [
      {
        who: 'Mom',
        en: 'Good morning, dear. Time to get up.',
        zh: '早上好，宝贝。该起床了。',
        notes: {
          morning: '/ˈmɔːnɪŋ/'
        },
      },
      {
        who: 'Tom',
        en: 'Morning, Mom. Just five more minutes.',
        zh: '早上好，妈妈。再睡五分钟。',
        notes: {
          minutes: '/ˈmɪnɪts/'
        },
      },
      {
        who: 'Mom',
        en: 'No, you’ll be late for school.',
        zh: '不行，你上学要迟到了。',
      },
      {
        who: 'Tom',
        en: 'OK, OK. What’s for breakfast?',
        zh: '好吧好吧。早饭吃什么？',
        notes: {
          breakfast: '/ˈbrekfəst/'
        },
      },
      {
        who: 'Mom',
        en: 'Bread, eggs and milk.',
        zh: '面包、鸡蛋和牛奶。',
      },
      {
        who: 'Tom',
        en: 'Great! I’m hungry.',
        zh: '太棒了！我饿了。',
        notes: {
          hungry: '/ˈhʌŋɡri/'
        },
      },
    ],
  },
  {
    id: 'noon',
    zh: '中午',
    en: 'Noon',
    icon: '☀️',
    color: '#E5A13B',
    desc: '中午放学，约同学一起吃饭',
    mood: 'normal',
    lines: [
      {
        who: 'Amy',
        en: 'It’s twelve o’clock. I’m so hungry.',
        zh: '十二点了，我饿坏了。',
        notes: {
          twelve: '/twelv/',
          hungry: '/ˈhʌŋɡri/'
        },
      },
      {
        who: 'Ben',
        en: 'Me too. Let’s have lunch.',
        zh: '我也是，我们去吃午饭吧。',
      },
      {
        who: 'Amy',
        en: 'What do you want to eat?',
        zh: '你想吃什么？',
      },
      {
        who: 'Ben',
        en: 'A bowl of noodles, please.',
        zh: '来一碗面吧。',
        notes: {
          noodles: '/ˈnuːdlz/'
        },
      },
      {
        who: 'Amy',
        en: 'OK. There’s a small restaurant over there.',
        zh: '好，那边有家小餐馆。',
        notes: {
          restaurant: '/ˈrestrɒnt/'
        },
      },
      {
        who: 'Ben',
        en: 'Let’s go!',
        zh: '走吧！',
      },
    ],
  },
  {
    id: 'evening',
    zh: '晚上',
    en: 'Evening',
    icon: '🌆',
    color: '#6F7BD1',
    desc: '傍晚回家，聊聊晚饭和作业',
    mood: 'calm',
    lines: [
      {
        who: 'Dad',
        en: 'It’s getting dark. Let’s go home.',
        zh: '天黑了，我们回家吧。',
        notes: {
          getting: '/ˈɡetɪŋ/'
        },
      },
      {
        who: 'Lily',
        en: 'OK. What’s for dinner, Dad?',
        zh: '好的。爸爸，晚饭吃什么？',
        notes: {
          dinner: '/ˈdɪnə(r)/'
        },
      },
      {
        who: 'Dad',
        en: 'I’ll cook some rice and fish.',
        zh: '我来做米饭和鱼。',
      },
      {
        who: 'Lily',
        en: 'Can I watch TV after dinner?',
        zh: '晚饭后我可以看电视吗？',
        notes: {
          after: '/ˈɑːftə(r)/',
          dinner: '/ˈdɪnə(r)/'
        },
      },
      {
        who: 'Dad',
        en: 'Sure, but finish your homework first.',
        zh: '可以，不过先把作业做完。',
        notes: {
          finish: '/ˈfɪnɪʃ/',
          homework: '/ˈhəʊmwɜːk/'
        },
      },
      {
        who: 'Lily',
        en: 'All right.',
        zh: '好吧。',
      },
    ],
  },
  {
    id: 'eating',
    zh: '吃饭',
    en: 'At the Table',
    icon: '🍽️',
    color: '#EF7E6B',
    desc: '餐桌上的礼貌用语',
    mood: 'warm',
    lines: [
      {
        who: 'Mom',
        en: 'Dinner is ready! Come and sit down.',
        zh: '晚饭好了！过来坐吧。',
        notes: {
          dinner: '/ˈdɪnə(r)/',
          ready: '/ˈredi/'
        },
      },
      {
        who: 'Tom',
        en: 'Wow, it smells great.',
        zh: '哇，好香啊。',
      },
      {
        who: 'Mom',
        en: 'Wash your hands first.',
        zh: '先洗手。',
      },
      {
        who: 'Tom',
        en: 'OK. Can I have some soup?',
        zh: '好的。我可以喝点汤吗？',
      },
      {
        who: 'Mom',
        en: 'Sure. Here you are. It’s hot.',
        zh: '当然，给你。小心烫。',
      },
      {
        who: 'Tom',
        en: 'Thank you. It’s delicious!',
        zh: '谢谢，真好吃！',
        notes: {
          delicious: '/dɪˈlɪʃəs/'
        },
      },
    ],
  },
  {
    id: 'toilet',
    zh: '上厕所',
    en: 'Toilet',
    icon: '🚽',
    color: '#5FB8A5',
    desc: '外出或在家，怎么开口说',
    mood: 'calm',
    lines: [
      {
        who: 'Tom',
        en: 'Mom, may I go to the toilet?',
        zh: '妈妈，我可以去一下厕所吗？',
        notes: {
          toilet: '/ˈtɔɪlət/'
        },
      },
      {
        who: 'Mom',
        en: 'Sure. Do you need any help?',
        zh: '可以，需要帮忙吗？',
      },
      {
        who: 'Tom',
        en: 'No, thanks. Where is the toilet paper?',
        zh: '不用，谢谢。厕纸在哪儿？',
        notes: {
          toilet: '/ˈtɔɪlət/',
          paper: '/ˈpeɪpə(r)/'
        },
      },
      {
        who: 'Mom',
        en: 'It’s on the shelf.',
        zh: '在架子上。',
      },
      {
        who: 'Tom',
        en: 'OK. I’ll be back in a minute.',
        zh: '好的，我马上回来。',
        notes: {
          minute: '/ˈmɪnɪt/'
        },
      },
      {
        who: 'Mom',
        en: 'Wash your hands after that.',
        zh: '上完厕所要洗手。',
        notes: {
          after: '/ˈɑːftə(r)/'
        },
      },
      {
        who: 'Tom',
        en: 'I know, Mom.',
        zh: '我知道，妈妈。',
      },
    ],
  },
  {
    id: 'class',
    zh: '上课',
    en: 'In Class',
    icon: '📚',
    color: '#6BB3F0',
    desc: '课堂问候与提问',
    mood: 'normal',
    lines: [
      {
        who: 'Teacher',
        en: 'Good morning, class. Let’s begin.',
        zh: '同学们早上好，我们开始上课。',
        notes: {
          morning: '/ˈmɔːnɪŋ/',
          begin: '/bɪˈɡɪn/'
        },
      },
      {
        who: 'Class',
        en: 'Good morning, Miss Li.',
        zh: '李老师早上好。',
        notes: {
          morning: '/ˈmɔːnɪŋ/'
        },
      },
      {
        who: 'Teacher',
        en: 'Open your books to page ten.',
        zh: '把书翻到第十页。',
      },
      {
        who: 'Lucy',
        en: 'Excuse me, may I ask a question?',
        zh: '打扰一下，我可以问个问题吗？',
        notes: {
          excuse: '/ɪkˈskjuːz/',
          question: '/ˈkwestʃən/'
        },
      },
      {
        who: 'Teacher',
        en: 'Of course. Go ahead.',
        zh: '当然，请说。',
      },
      {
        who: 'Lucy',
        en: 'What does this word mean?',
        zh: '这个单词是什么意思？',
      },
      {
        who: 'Teacher',
        en: 'It means “happy”.',
        zh: '它的意思是“开心的”。',
        notes: {
          happy: '/ˈhæpi/'
        },
      },
    ],
  },
  {
    id: 'sports',
    zh: '运动',
    en: 'Football',
    icon: '⚽',
    color: '#8FBF6E',
    desc: '约球、传球，球场上的喊话',
    mood: 'energetic',
    lines: [
      {
        who: 'Jack',
        en: 'Let’s play football after school.',
        zh: '放学后去踢足球吧。',
        notes: {
          football: '/ˈfʊtbɔːl/',
          after: '/ˈɑːftə(r)/'
        },
      },
      {
        who: 'Leo',
        en: 'Great idea! I’ll bring the ball.',
        zh: '好主意！我带球。',
        notes: {
          idea: '/aɪˈdɪə/'
        },
      },
      {
        who: 'Jack',
        en: 'Pass the ball to me!',
        zh: '把球传给我！',
      },
      {
        who: 'Leo',
        en: 'Look out! Here it comes.',
        zh: '小心！球来了。',
      },
      {
        who: 'Jack',
        en: 'Nice shot!',
        zh: '好球！',
      },
      {
        who: 'Leo',
        en: 'Let’s take a rest. I’m tired.',
        zh: '我们休息一下吧，我累了。',
        notes: {
          tired: '/ˈtaɪəd/'
        },
      },
    ],
  },
  {
    id: 'hiking',
    zh: '徒步',
    en: 'Hiking',
    icon: '🥾',
    color: '#B08968',
    desc: '户外徒步：看天气、认路线、看风景',
    mood: 'wonder',
    lines: [
      {
        who: 'Leo',
        en: 'What a beautiful day! Let’s go hiking.',
        zh: '天气真好！我们去徒步吧。',
        notes: {
          beautiful: '/ˈbjuːtɪfl/',
          hiking: '/ˈhaɪkɪŋ/'
        },
      },
      {
        who: 'Anna',
        en: 'Great! Don’t forget your water bottle.',
        zh: '太好了！别忘了带水壶。',
        notes: {
          forget: '/fəˈɡet/',
          bottle: '/ˈbɒtl/'
        },
      },
      {
        who: 'Leo',
        en: 'I have it. Is the trail long?',
        zh: '带了。这条路线长吗？',
      },
      {
        who: 'Anna',
        en: 'About two hours. Wear your boots.',
        zh: '大约两小时。穿上你的登山鞋。',
        notes: {
          about: '/əˈbaʊt/',
          hours: '/ˈaʊəz/'
        },
      },
      {
        who: 'Leo',
        en: 'Look at that view!',
        zh: '看那边的景色！',
      },
      {
        who: 'Anna',
        en: 'Amazing. Let’s take a photo here.',
        zh: '太美了，我们在这儿拍张照吧。',
        notes: {
          amazing: '/əˈmeɪzɪŋ/',
          photo: '/ˈfəʊtəʊ/'
        },
      },
      {
        who: 'Leo',
        en: 'Good idea.',
        zh: '好主意。',
        notes: {
          idea: '/aɪˈdɪə/'
        },
      },
    ],
  },
  {
    id: 'bedtime',
    zh: '睡觉',
    en: 'Bedtime',
    icon: '😴',
    color: '#9A84D8',
    desc: '睡前对话，互道晚安',
    mood: 'sleepy',
    lines: [
      {
        who: 'Mom',
        en: 'It’s nine o’clock. Time for bed.',
        zh: '九点了，该睡觉了。',
      },
      {
        who: 'Emma',
        en: 'But I’m not sleepy, Mom.',
        zh: '可是我不困，妈妈。',
        notes: {
          sleepy: '/ˈsliːpi/'
        },
      },
      {
        who: 'Mom',
        en: 'You have school tomorrow.',
        zh: '你明天还要上学。',
        notes: {
          tomorrow: '/təˈmɒrəʊ/'
        },
      },
      {
        who: 'Emma',
        en: 'Can I read one more page?',
        zh: '我可以再看一页吗？',
      },
      {
        who: 'Mom',
        en: 'OK, just one page.',
        zh: '好吧，就一页。',
      },
      {
        who: 'Emma',
        en: 'Good night, Mom.',
        zh: '晚安，妈妈。',
      },
      {
        who: 'Mom',
        en: 'Good night. Sleep tight.',
        zh: '晚安，睡个好觉。',
      },
    ],
  },
  {
    id: 'time',
    zh: '问时间',
    en: 'Asking the Time',
    icon: '⏰',
    color: '#E0883C',
    desc: '问几点、说时间、约时间',
    mood: 'normal',
    lines: [
      {
        who: 'Stranger',
        en: 'Excuse me, what time is it?',
        zh: '打扰一下，现在几点了？',
        notes: {
          excuse: '/ɪkˈskjuːz/',
          stranger: '/ˈstreɪndʒə(r)/'
        },
      },
      {
        who: 'Ben',
        en: 'It’s half past three.',
        zh: '三点半。',
      },
      {
        who: 'Stranger',
        en: 'Thanks. Is the museum still open?',
        zh: '谢谢。博物馆还开着吗？',
        notes: {
          museum: '/mjuˈziːəm/'
        },
      },
      {
        who: 'Ben',
        en: 'I think it closes at five.',
        zh: '我想它五点关门。',
        notes: {
          closes: '/ˈkləʊzɪz/'
        },
      },
      {
        who: 'Stranger',
        en: 'Good, I still have time.',
        zh: '太好了，我还有时间。',
      },
      {
        who: 'Ben',
        en: 'Have a nice day!',
        zh: '祝你今天愉快！',
      },
    ],
  },
  {
    id: 'directions',
    zh: '问路',
    en: 'Asking the Way',
    icon: '🗺️',
    color: '#4F8EDB',
    desc: '问路、指路、确认距离',
    mood: 'normal',
    lines: [
      {
        who: 'Tourist',
        en: 'Excuse me, how can I get to the train station?',
        zh: '打扰一下，请问火车站怎么走？',
        notes: {
          excuse: '/ɪkˈskjuːz/',
          station: '/ˈsteɪʃn/'
        },
      },
      {
        who: 'Lily',
        en: 'Go straight and turn left at the bank.',
        zh: '一直走，在银行那儿左转。',
        notes: {
          straight: '/streɪt/'
        },
      },
      {
        who: 'Tourist',
        en: 'Is it far?',
        zh: '远吗？',
      },
      {
        who: 'Lily',
        en: 'No, about five minutes on foot.',
        zh: '不远，走路大约五分钟。',
        notes: {
          about: '/əˈbaʊt/',
          minutes: '/ˈmɪnɪts/'
        },
      },
      {
        who: 'Tourist',
        en: 'Thank you so much.',
        zh: '太感谢了。',
      },
      {
        who: 'Lily',
        en: 'You’re welcome. Have a good trip!',
        zh: '不客气，旅途愉快！',
        notes: {
          welcome: '/ˈwelkəm/'
        },
      },
    ],
  },
  {
    id: 'identify',
    zh: '认一认',
    en: 'What’s This?',
    icon: '🔍',
    color: '#C98A5E',
    desc: '指着东西问：植物、水果、颜色、动物',
    mood: 'curious',
    lines: [
      {
        who: 'Lily',
        en: 'Dad, look! What’s this?',
        zh: '爸爸，你看！这是什么？',
      },
      {
        who: 'Dad',
        en: 'It’s a sunflower.',
        zh: '这是向日葵。',
        notes: {
          sunflower: '/ˈsʌnflaʊə(r)/'
        },
      },
      {
        who: 'Lily',
        en: 'What color is it?',
        zh: '它是什么颜色？',
      },
      {
        who: 'Dad',
        en: 'It’s yellow, like the sun.',
        zh: '是黄色的，像太阳一样。',
        notes: {
          yellow: '/ˈjeləʊ/'
        },
      },
      {
        who: 'Lily',
        en: 'And what’s that little animal?',
        zh: '那只小动物是什么？',
        notes: {
          little: '/ˈlɪtl/',
          animal: '/ˈænɪml/'
        },
      },
      {
        who: 'Dad',
        en: 'It’s a squirrel. It’s eating a nut.',
        zh: '是松鼠，它在吃坚果。',
        notes: {
          squirrel: '/ˈskwɪrəl/',
          eating: '/ˈiːtɪŋ/'
        },
      },
      {
        who: 'Lily',
        en: 'How cute!',
        zh: '好可爱！',
      },
    ],
  },
  {
    id: 'asking',
    zh: '问问题',
    en: 'Asking Questions',
    icon: '❓',
    color: '#B98BE8',
    desc: '不会说、不会拼时怎么问',
    mood: 'normal',
    lines: [
      {
        who: 'Lucy',
        en: 'Excuse me, how do you say “苹果” in English?',
        zh: '打扰一下，“苹果”用英语怎么说？',
        notes: {
          excuse: '/ɪkˈskjuːz/',
          English: '/ˈɪŋɡlɪʃ/'
        },
      },
      {
        who: 'Teacher',
        en: 'It’s “apple”.',
        zh: '是 “apple”。',
      },
      {
        who: 'Lucy',
        en: 'How do you spell it?',
        zh: '怎么拼写？',
      },
      {
        who: 'Teacher',
        en: 'A-P-P-L-E.',
        zh: '字母是 A-P-P-L-E。',
      },
      {
        who: 'Lucy',
        en: 'Can you say it again, please?',
        zh: '可以再说一遍吗？',
        notes: {
          again: '/əˈɡen/'
        },
      },
      {
        who: 'Teacher',
        en: 'Sure. Apple.',
        zh: '当然，apple。',
      },
      {
        who: 'Lucy',
        en: 'Thank you, Miss Li.',
        zh: '谢谢李老师。',
      },
    ],
  },
  {
    id: 'feelings',
    zh: '心情',
    en: 'Feelings',
    icon: '😊',
    color: '#D2799B',
    desc: '聊聊开心、紧张和累',
    mood: 'emotional',
    lines: [
      {
        who: 'Amy',
        en: 'You look happy today.',
        zh: '你今天看起来很开心。',
        notes: {
          happy: '/ˈhæpi/',
          today: '/təˈdeɪ/'
        },
      },
      {
        who: 'Ben',
        en: 'Yes! We won the football game.',
        zh: '是啊！我们赢了足球比赛。',
        notes: {
          football: '/ˈfʊtbɔːl/'
        },
      },
      {
        who: 'Amy',
        en: 'That’s great! How do you feel?',
        zh: '太棒了！你感觉怎么样？',
      },
      {
        who: 'Ben',
        en: 'I’m so excited. But also tired.',
        zh: '我特别兴奋，但也很累。',
        notes: {
          excited: '/ɪkˈsaɪtɪd/',
          tired: '/ˈtaɪəd/'
        },
      },
      {
        who: 'Amy',
        en: 'Are you worried about the next game?',
        zh: '你担心下一场比赛吗？',
        notes: {
          worried: '/ˈwʌrid/',
          about: '/əˈbaʊt/'
        },
      },
      {
        who: 'Ben',
        en: 'A little. But I’ll do my best.',
        zh: '有一点，不过我会尽力的。',
        notes: {
          little: '/ˈlɪtl/'
        },
      },
      {
        who: 'Amy',
        en: 'I’m sure you will.',
        zh: '我相信你会的。',
      },
    ],
  },
  {
    id: 'jurassic',
    zh: '侏罗纪',
    en: 'Jurassic Adventure',
    icon: '🦕',
    color: '#8A7B5C',
    desc: '在博物馆看化石，聊聊恐龙与火山',
    mood: 'wonder',
    lines: [
      {
        who: 'Lily',
        en: 'Look at this big bone! What is it?',
        zh: '看这根大骨头！这是什么？',
      },
      {
        who: 'Dad',
        en: 'It’s a fossil. It comes from a dinosaur.',
        zh: '这是一块化石，来自一只恐龙。',
        notes: {
          fossil: '/ˈfɒsl/',
          dinosaur: '/ˈdaɪnəsɔː(r)/'
        },
      },
      {
        who: 'Lily',
        en: 'Wow! Which dinosaur was it?',
        zh: '哇！是哪一种恐龙呢？',
        notes: {
          dinosaur: '/ˈdaɪnəsɔː(r)/'
        },
      },
      {
        who: 'Dad',
        en: 'Maybe a T-Rex. It had sharp teeth and claws.',
        zh: '可能是霸王龙。它有锋利的牙齿和爪子。',
        notes: {
          maybe: '/ˈmeɪbi/',
          sharp: '/ʃɑːp/',
          claws: '/klɔːz/'
        },
      },
      {
        who: 'Lily',
        en: 'Were there volcanoes here?',
        zh: '这里以前有火山吗？',
        notes: {
          volcanoes: '/vɒlˈkeɪnəʊz/'
        },
      },
      {
        who: 'Dad',
        en: 'Yes, long ago. This land was a jungle.',
        zh: '有的，很久以前。这片土地曾是丛林。',
        notes: {
          jungle: '/ˈdʒʌŋɡl/'
        },
      },
      {
        who: 'Lily',
        en: 'I want to be a scientist one day!',
        zh: '我以后想当一名科学家！',
        notes: {
          scientist: '/ˈsaɪəntɪst/'
        },
      },
    ],
  },
  {
    id: 'marine',
    zh: '海洋生物',
    en: 'Under the Sea',
    icon: '🐬',
    color: '#3E9BC4',
    desc: '坐船看海豚、鲸鱼和章鱼',
    mood: 'wonder',
    lines: [
      {
        who: 'Amy',
        en: 'Look, a dolphin is jumping out of the water!',
        zh: '看，一只海豚正跃出水面！',
        notes: {
          dolphin: '/ˈdɒlfɪn/',
          jumping: '/ˈdʒʌmpɪŋ/'
        },
      },
      {
        who: 'Ben',
        en: 'It’s so fast. Can you see the whale over there?',
        zh: '它好快。你看到那边那头鲸了吗？',
        notes: {
          whale: '/weɪl/'
        },
      },
      {
        who: 'Amy',
        en: 'Yes! It’s much bigger than our boat.',
        zh: '看到了！它比我们的船大得多。',
        notes: {
          bigger: '/ˈbɪɡə(r)/'
        },
      },
      {
        who: 'Ben',
        en: 'Be careful. There might be a shark nearby.',
        zh: '小心点。附近可能有鲨鱼。',
        notes: {
          careful: '/ˈkeəfl/',
          shark: '/ʃɑːk/',
          nearby: '/ˌnɪəˈbaɪ/'
        },
      },
      {
        who: 'Amy',
        en: 'Don’t worry. The diver says it’s safe.',
        zh: '别担心。潜水员说很安全。',
        notes: {
          worry: '/ˈwʌri/',
          diver: '/ˈdaɪvə(r)/'
        },
      },
      {
        who: 'Ben',
        en: 'Look at the little crab on the rock.',
        zh: '看岩石上那只小螃蟹。',
        notes: {
          little: '/ˈlɪtl/'
        },
      },
      {
        who: 'Amy',
        en: 'And an octopus is hiding under it!',
        zh: '还有一只章鱼藏在下面！',
        notes: {
          octopus: '/ˈɒktəpəs/',
          hiding: '/ˈhaɪdɪŋ/'
        },
      },
    ],
  },
  {
    id: 'zoo',
    zh: '动物园',
    en: 'At the Zoo',
    icon: '🦁',
    color: '#6DA36B',
    desc: '逛动物园：看大象、猴子和熊猫',
    mood: 'happy',
    lines: [
      {
        who: 'Emma',
        en: 'Dad, which animal do you want to see first?',
        zh: '爸爸，你想先看哪种动物？',
        notes: {
          animal: '/ˈænɪml/'
        },
      },
      {
        who: 'Dad',
        en: 'Let’s see the elephants. They are so huge.',
        zh: '我们去看大象吧。它们好大。',
        notes: {
          elephants: '/ˈelɪfənts/',
          huge: '/hjuːdʒ/'
        },
      },
      {
        who: 'Emma',
        en: 'Look! The monkey is eating a banana.',
        zh: '看！那只猴子在吃香蕉。',
        notes: {
          monkey: '/ˈmʌŋki/',
          banana: '/bəˈnɑːnə/'
        },
      },
      {
        who: 'Dad',
        en: 'Don’t feed the animals, Emma.',
        zh: '不要喂动物，艾玛。',
        notes: {
          animals: '/ˈænɪmlz/'
        },
      },
      {
        who: 'Emma',
        en: 'I know. Can we visit the panda house?',
        zh: '我知道。我们可以去看熊猫馆吗？',
        notes: {
          visit: '/ˈvɪzɪt/',
          panda: '/ˈpændə/'
        },
      },
      {
        who: 'Dad',
        en: 'Sure. The pandas are sleeping now.',
        zh: '当然。熊猫们正在睡觉。',
        notes: {
          pandas: '/ˈpændəz/',
          sleeping: '/ˈsliːpɪŋ/'
        },
      },
      {
        who: 'Emma',
        en: 'They are so cute and lazy!',
        zh: '它们又可爱又懒洋洋的！',
        notes: {
          lazy: '/ˈleɪzi/'
        },
      },
    ],
  },
  {
    id: 'history',
    zh: '历史',
    en: 'A Trip to History',
    icon: '🏛️',
    color: '#A0793C',
    desc: '参观历史博物馆，聊聊古人和城堡',
    mood: 'calm',
    lines: [
      {
        who: 'Teacher',
        en: 'Today we are visiting the history museum.',
        zh: '今天我们要参观历史博物馆。',
        notes: {
          visiting: '/ˈvɪzɪtɪŋ/',
          history: '/ˈhɪstri/',
          museum: '/mjuˈziːəm/'
        },
      },
      {
        who: 'Lucy',
        en: 'Wow, this pot is thousands of years old.',
        zh: '哇，这个罐子有几千年的历史了。',
        notes: {
          thousands: '/ˈθaʊzndz/'
        },
      },
      {
        who: 'Teacher',
        en: 'Yes, people made it by hand long ago.',
        zh: '是的，很久以前人们用手工制作它。',
        notes: {
          people: '/ˈpiːpl/'
        },
      },
      {
        who: 'Lucy',
        en: 'Who built this ancient castle?',
        zh: '这座古老的城堡是谁建的？',
        notes: {
          ancient: '/ˈeɪnʃənt/',
          castle: '/ˈkɑːsl/'
        },
      },
      {
        who: 'Teacher',
        en: 'A king and his soldiers.',
        zh: '一位国王和他的士兵们。',
        notes: {
          soldiers: '/ˈsəʊldʒəz/'
        },
      },
      {
        who: 'Lucy',
        en: 'Did they use horses and swords?',
        zh: '他们用马和剑吗？',
        notes: {
          horses: '/ˈhɔːsɪz/',
          swords: '/sɔːdz/'
        },
      },
      {
        who: 'Teacher',
        en: 'Yes. History tells us their stories.',
        zh: '是的。历史把他们的故事讲给我们听。',
        notes: {
          history: '/ˈhɪstri/',
          stories: '/ˈstɔːriz/'
        },
      },
    ],
  },
  {
    id: 'military',
    zh: '军事',
    en: 'The Military Museum',
    icon: '🛡️',
    color: '#7A7F8C',
    desc: '看军舰、盾牌和直升机，认识军事装备',
    mood: 'serious',
    lines: [
      {
        who: 'Jack',
        en: 'Look at that old warship in the hall.',
        zh: '看大厅里那艘旧军舰。',
        notes: {
          warship: '/ˈwɔːʃɪp/'
        },
      },
      {
        who: 'Leo',
        en: 'It’s enormous. How many soldiers were on it?',
        zh: '它真巨大。上面有多少士兵？',
        notes: {
          enormous: '/ɪˈnɔːməs/',
          soldiers: '/ˈsəʊldʒəz/'
        },
      },
      {
        who: 'Jack',
        en: 'Maybe hundreds. They slept in small beds.',
        zh: '可能有几百人。他们睡在小床上。',
        notes: {
          maybe: '/ˈmeɪbi/',
          hundreds: '/ˈhʌndrədz/'
        },
      },
      {
        who: 'Leo',
        en: 'What is this metal thing?',
        zh: '这个金属的东西是什么？',
        notes: {
          metal: '/ˈmetl/'
        },
      },
      {
        who: 'Jack',
        en: 'It’s a shield. A knight used it in battle.',
        zh: '这是盾牌。骑士在战斗中使用它。',
        notes: {
          shield: '/ʃiːld/',
          knight: '/naɪt/',
          battle: '/ˈbætl/'
        },
      },
      {
        who: 'Leo',
        en: 'And that helicopter is hanging from the ceiling!',
        zh: '而且那架直升机正悬挂在天花板上！',
        notes: {
          helicopter: '/ˈhelɪkɒptə(r)/',
          hanging: '/ˈhæŋɪŋ/',
          ceiling: '/ˈsiːlɪŋ/'
        },
      },
      {
        who: 'Jack',
        en: 'I want to read more about history.',
        zh: '我想多读一些关于历史的书。',
        notes: {
          history: '/ˈhɪstri/'
        },
      },
    ],
  },
  {
    id: 'shopping-store',
    zh: '在商店',
    en: 'At the Store',
    icon: '🛍️',
    color: '#E8A838',
    desc: '挑选衣服、问价、试穿、结账一条龙',
    mood: 'normal',
    lines: [
      {
        who: 'Shopkeeper',
        en: 'Can I help you find something?',
        zh: '需要帮您找什么吗？',
        notes: {
          help: '/help/'
        },
      },
      {
        who: 'Customer',
        en: 'Yes, I\'m looking for a T-shirt.',
        zh: '是的，我想找件T恤。',
        notes: {
          looking: '/ˈlʊkɪŋ/'
        },
      },
      {
        who: 'Customer',
        en: 'Do you have this in a medium?',
        zh: '有中号吗？',
        notes: {
          medium: '/ˈmiːdiəm/'
        },
      },
      {
        who: 'Shopkeeper',
        en: 'Let me check. Here you are.',
        zh: '我查一下，给您。',
      },
      {
        who: 'Customer',
        en: 'Can I try it on?',
        zh: '我可以试穿吗？',
      },
      {
        who: 'Shopkeeper',
        en: 'Of course. The fitting room is over there.',
        zh: '当然，试衣间在那边。',
        notes: {
          fitting: '/ˈfɪtɪŋ/'
        },
      },
      {
        who: 'Customer',
        en: 'It fits perfectly. How much is it?',
        zh: '很合身。多少钱？',
        notes: {
          perfectly: '/ˈpɜːfɪktli/',
          much: '/mʌtʃ/'
        },
      },
      {
        who: 'Shopkeeper',
        en: 'It\'s twenty dollars. Cash or card?',
        zh: '二十美元。现金还是刷卡？',
        notes: {
          dollars: '/ˈdɒləz/',
          cash: '/kæʃ/'
        },
      },
      {
        who: 'Customer',
        en: 'Card, please. Thank you!',
        zh: '刷卡，谢谢！',
      },
      {
        who: 'Shopkeeper',
        en: 'Here\'s your receipt. Have a nice day!',
        zh: '这是您的小票，祝您愉快！',
        notes: {
          receipt: '/rɪˈsiːt/'
        },
      },
    ],
  },
  {
    id: 'restaurant',
    zh: '在餐厅',
    en: 'At a Restaurant',
    icon: '🍽️',
    color: '#EF7E6B',
    desc: '入座、点餐、加单、买单',
    mood: 'warm',
    lines: [
      {
        who: 'Waiter',
        en: 'Table for two? Right this way, please.',
        zh: '两位吗？这边请。',
        notes: {
          table: '/ˈteɪbl/'
        },
      },
      {
        who: 'Customer',
        en: 'Yes, thank you. Can I see the menu?',
        zh: '好的谢谢，可以看菜单吗？',
        notes: {
          menu: '/ˈmenjuː/'
        },
      },
      {
        who: 'Waiter',
        en: 'Of course. Today\'s special is pasta.',
        zh: '当然，今天的特色菜是意面。',
        notes: {
          special: '/ˈspeʃl/',
          pasta: '/ˈpɑːstə/'
        },
      },
      {
        who: 'Customer',
        en: 'Sounds good. I\'ll have the pasta, please.',
        zh: '听起来不错，我要意面。',
      },
      {
        who: 'Waiter',
        en: 'Anything to drink?',
        zh: '喝点什么吗？',
      },
      {
        who: 'Customer',
        en: 'A glass of water, please. And no spicy food.',
        zh: '一杯水，不要辣的。',
        notes: {
          glass: '/ɡlɑːs/',
          spicy: '/ˈspaɪsi/'
        },
      },
      {
        who: 'Waiter',
        en: 'Certainly. I\'ll be right back.',
        zh: '好的，马上回来。',
      },
      {
        who: 'Customer',
        en: 'Can I get the bill, please?',
        zh: '可以结账吗？',
        notes: {
          bill: '/bɪl/'
        },
      },
      {
        who: 'Waiter',
        en: 'Here you are. Thank you and come again!',
        zh: '给您，谢谢光临！',
      },
    ],
  },
  {
    id: 'doctor',
    zh: '看医生',
    en: 'At the Clinic',
    icon: '🏥',
    color: '#E06C6C',
    desc: '描述症状、量体温、拿药',
    mood: 'concerned',
    lines: [
      {
        who: 'Nurse',
        en: 'What seems to be the problem?',
        zh: '哪里不舒服？',
        notes: {
          problem: '/ˈprɒbləm/'
        },
      },
      {
        who: 'Patient',
        en: 'I have a bad headache and a sore throat.',
        zh: '我头疼得厉害，喉咙也疼。',
        notes: {
          headache: '/ˈhedeɪk/',
          throat: '/θrəʊt/'
        },
      },
      {
        who: 'Doctor',
        en: 'Let me check your temperature.',
        zh: '让我量一下体温。',
        notes: {
          temperature: '/ˈtemprətʃə(r)/'
        },
      },
      {
        who: 'Doctor',
        en: 'You\'ve got a fever. It\'s about 38.5.',
        zh: '您发烧了，大约38.5度。',
        notes: {
          fever: '/ˈfiːvə(r)/'
        },
      },
      {
        who: 'Patient',
        en: 'Is it serious?',
        zh: '严重吗？',
      },
      {
        who: 'Doctor',
        en: 'No, just a common cold. Take this medicine three times a day.',
        zh: '不严重，就是普通感冒。一天吃三次这个药。',
        notes: {
          medicine: '/ˈmedsn/',
          common: '/ˈkɒmən/'
        },
      },
      {
        who: 'Patient',
        en: 'Thank you, doctor. How long should I rest?',
        zh: '谢谢您，医生，要休息多久？',
        notes: {
          rest: '/rest/'
        },
      },
      {
        who: 'Doctor',
        en: 'Two or three days. Drink plenty of water.',
        zh: '两三天就好，多喝开水。',
        notes: {
          plenty: '/ˈplenti/'
        },
      },
    ],
  },
  {
    id: 'transport-bus',
    zh: '坐公交',
    en: 'Taking the Bus',
    icon: '🚌',
    color: '#5B9BD5',
    desc: '等车、问线路、上车、到站提醒',
    mood: 'normal',
    lines: [
      {
        who: 'Passenger',
        en: 'Excuse me, which bus goes to the museum?',
        zh: '打扰一下，去博物馆坐哪路车？',
        notes: {
          excuse: '/ɪkˈskjuːz/',
          museum: '/mjuˈziːəm/'
        },
      },
      {
        who: 'Local',
        en: 'Take the number 5 bus. It stops right there.',
        zh: '坐5路车，就在前面那站下。',
        notes: {
          number: '/ˈnʌmbə(r)/',
          stops: '/stɒps/'
        },
      },
      {
        who: 'Passenger',
        en: 'How long does it take?',
        zh: '要多久？',
        notes: {
          long: '/lɒŋ/'
        },
      },
      {
        who: 'Local',
        en: 'About fifteen minutes.',
        zh: '大约十五分钟。',
      },
      {
        who: 'Passenger',
        en: 'Great, thanks a lot!',
        zh: '太好了，非常感谢！',
      },
      {
        who: 'Driver',
        en: 'Next stop, City Museum.',
        zh: '下一站，市博物馆。',
        notes: {
          next: '/nekst/',
          stop: '/stɒp/'
        },
      },
      {
        who: 'Passenger',
        en: 'That\'s me! Thank you, driver.',
        zh: '到我了！谢谢司机。',
      },
    ],
  },
  {
    id: 'birthday',
    zh: '过生日',
    en: 'Birthday Party',
    icon: '🎂',
    color: '#E85B8A',
    desc: '朋友来家里庆祝，许愿切蛋糕',
    mood: 'excited',
    lines: [
      {
        who: 'Host',
        en: 'Welcome to my birthday party!',
        zh: '欢迎来到我的生日派对！',
        notes: {
          welcome: '/ˈwelkəm/',
          birthday: '/ˈbɜːθdeɪ/'
        },
      },
      {
        who: 'Friend',
        en: 'Happy birthday! Here\'s a gift for you.',
        zh: '生日快乐！这是给你的礼物。',
        notes: {
          happy: '/ˈhæpi/',
          gift: '/ɡɪft/'
        },
      },
      {
        who: 'Host',
        en: 'Thank you so much! Come in, everyone.',
        zh: '非常感谢！大家进来吧。',
      },
      {
        who: 'Friend',
        en: 'Look at this wonderful cake!',
        zh: '看这个漂亮的蛋糕！',
        notes: {
          wonderful: '/ˈwʌndəfl/'
        },
      },
      {
        who: 'Host',
        en: 'I\'m going to blow out the candles now.',
        zh: '我要吹蜡烛了。',
        notes: {
          blow: '/bləʊ/',
          candles: '/ˈkændlz/'
        },
      },
      {
        who: 'Everyone',
        en: 'Make a wish! Happy birthday to you!',
        zh: '许个愿吧！祝你生日快乐！',
        notes: {
          wish: '/wɪʃ/'
        },
      },
      {
        who: 'Host',
        en: 'Let\'s cut the cake and eat!',
        zh: '切蛋糕吃吧！',
        notes: {
          cut: '/kʌt/'
        },
      },
    ],
  },
  {
    id: 'weekend',
    zh: '周末计划',
    en: 'Weekend Plans',
    icon: '🗓️',
    color: '#6DB86B',
    desc: '和朋友约周末去哪玩',
    mood: 'happy',
    lines: [
      {
        who: 'Amy',
        en: 'What are your plans for the weekend?',
        zh: '你周末有什么计划？',
        notes: {
          plans: '/plænz/',
          weekend: '/ˌwiːkˈend/'
        },
      },
      {
        who: 'Ben',
        en: 'I\'m thinking about going hiking.',
        zh: '我在想要去徒步。',
        notes: {
          thinking: '/ˈθɪŋkɪŋ/',
          hiking: '/ˈhaɪkɪŋ/'
        },
      },
      {
        who: 'Amy',
        en: 'That sounds fun! Can I join you?',
        zh: '听起来很有趣！我可以一起吗？',
        notes: {
          join: '/dʒɔɪn/'
        },
      },
      {
        who: 'Ben',
        en: 'Of course! Let\'s meet at seven in the morning.',
        zh: '当然！我们早上七点见。',
        notes: {
          meet: '/miːt/',
          seven: '/ˈsevn/'
        },
      },
      {
        who: 'Amy',
        en: 'What should I bring?',
        zh: '我该带什么？',
      },
      {
        who: 'Ben',
        en: 'Bring some water, a snack, and your camera.',
        zh: '带点水、零食和你的相机。',
        notes: {
          snack: '/snæk/',
          camera: '/ˈkæmərə/'
        },
      },
      {
        who: 'Amy',
        en: 'Great! I can\'t wait!',
        zh: '太好了！迫不及待了！',
        notes: {
          wait: '/weɪt/'
        },
      },
    ],
  },
  {
    id: 'fix-thing',
    zh: '修理东西',
    en: 'Fixing Something',
    icon: '🔧',
    color: '#A0A0A0',
    desc: '家里东西坏了，打电话报修或自己动手',
    mood: 'calm',
    lines: [
      {
        who: 'Homeowner',
        en: 'The tap in my kitchen is leaking.',
        zh: '我家厨房的水龙头漏水了。',
        notes: {
          tap: '/tæp/',
          leaking: '/ˈliːkɪŋ/'
        },
      },
      {
        who: 'Caller',
        en: 'Have you tried turning it off?',
        zh: '您试过关掉它吗？',
        notes: {
          tried: '/traɪd/',
          turning: '/ˈtɜːnɪŋ/'
        },
      },
      {
        who: 'Homeowner',
        en: 'Yes, but it still drips.',
        zh: '试过了，但还是滴水。',
        notes: {
          drips: '/drɪps/'
        },
      },
      {
        who: 'Caller',
        en: 'I\'ll send a plumber to fix it tomorrow.',
        zh: '明天派水管工来修。',
        notes: {
          plumber: '/ˈplʌmə(r)/',
          fix: '/fɪks/'
        },
      },
      {
        who: 'Homeowner',
        en: 'That would be great. What time?',
        zh: '那太好了，什么时候？',
      },
      {
        who: 'Caller',
        en: 'Around ten o\'clock. Is that okay?',
        zh: '大概十点，可以吗？',
        notes: {
          around: '/əˈraʊnd/',
          okay: '/əʊˈkeɪ/'
        },
      },
      {
        who: 'Homeowner',
        en: 'Yes, perfect. Thank you!',
        zh: '好的，完美，谢谢！',
      },
    ],
  },
  {
    id: 'post-office',
    zh: '寄快递',
    en: 'At the Post Office',
    icon: '📮',
    color: '#4A90D9',
    desc: '寄包裹、填单、称重、查物流',
    mood: 'normal',
    lines: [
      {
        who: 'Customer',
        en: 'I\'d like to send this package abroad.',
        zh: '我想寄这个包裹到国外。',
        notes: {
          package: '/ˈpækɪdʒ/',
          abroad: '/əˈbrɔːd/'
        },
      },
      {
        who: 'Clerk',
        en: 'Sure. Do you have the address?',
        zh: '好的，您有地址吗？',
        notes: {
          address: '/ˈædres/'
        },
      },
      {
        who: 'Customer',
        en: 'Yes, here it is. How much will it cost?',
        zh: '有的，给您。要多少钱？',
        notes: {
          cost: '/kɒst/'
        },
      },
      {
        who: 'Clerk',
        en: 'Let me weigh it… It\'s two kilograms. That will be fifteen dollars.',
        zh: '我称一下……两公斤，十五美元。',
        notes: {
          weigh: '/weɪ/',
          kilograms: '/ˈkɪləɡræmz/'
        },
      },
      {
        who: 'Customer',
        en: 'OK. Can I track it online?',
        zh: '好的，能在网上追踪吗？',
        notes: {
          track: '/træk/',
          online: '/ˌɒnˈlaɪn/'
        },
      },
      {
        who: 'Clerk',
        en: 'Yes, here\'s your tracking number.',
        zh: '可以的，这是您的追踪单号。',
        notes: {
          tracking: '/ˈtrækɪŋ/',
          number: '/ˈnʌmbə(r)/'
        },
      },
      {
        who: 'Customer',
        en: 'Thank you very much!',
        zh: '非常感谢！',
      },
    ],
  },
];
