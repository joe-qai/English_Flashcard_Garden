/**
 * 英文闪卡园 · 交互逻辑（无依赖、无构建）
 * - 5 Tab：单词 / 情景 / 音乐 / 故事会 / 游戏
 * - 单词按学校/生活/拓展分组，并按教材年级（1–6 / 拓展）筛选
 * - 音标默认隐藏，点击卡片显示音标并朗读；未读词高亮
 * - 场景对话 & 英文歌谣播放器（Web Audio 旋律 + 文字跟读）
 * - 故事会：逐句朗读，支持单句/连续播放
 * - 互动游戏：听音选词 + 看中文选英文
 * - 深浅色主题，记忆在 localStorage
 */
(function () {
  'use strict';

  var ALL_CATEGORIES = Array.isArray(window.WORD_CATEGORIES) ? window.WORD_CATEGORIES : [];
  var CATEGORIES = ALL_CATEGORIES.filter(function (c) { return !c.hidden; });
  var SCENES = Array.isArray(window.DIALOGUE_SCENES) ? window.DIALOGUE_SCENES : [];
  var SONGS = Array.isArray(window.SONG_LIBRARY) ? window.SONG_LIBRARY : [];
  var STORIES = Array.isArray(window.STORY_LIBRARY) ? window.STORY_LIBRARY : [];
  var STORY_GLOSSARY = window.STORY_GLOSSARY || {};

  if (!CATEGORIES.length) return;

  var KEY_THEME = 'flashcard:theme';
  var KEY_CATEGORY = 'flashcard:category';
  var KEY_GAME_SCORE = 'flashcard:gameScore';

  var rootEl = document.documentElement;
  var synth = window.speechSynthesis;
  var supportsSpeech = !!synth && typeof window.SpeechSynthesisUtterance === 'function';

  /* ============ Category context tags ============ */
  function getCategoryGroup(id) {
    var cat = findCategory(id);
    return cat && cat.group ? cat.group : 'fun';
  }

  /* ============ Scene context tags ============ */
  var SCHOOL_SCENE_IDS = ['class','asking','identify','time','sports','weekend','bedtime'];
  var LIFE_SCENE_IDS   = ['washup','morning','noon','evening','eating','toilet','feelings',
                          'transport-bus','restaurant','doctor','shopping-store','post-office','fix-thing',
                          'directions','birthday'];

  function getSceneGroup(id) {
    if (SCHOOL_SCENE_IDS.indexOf(id) !== -1) return 'school';
    if (LIFE_SCENE_IDS.indexOf(id) !== -1)  return 'life';
    return 'fun';
  }

  /* ============ Storage ============ */
  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeStore(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) {}
  }

  /* ============ 浏览器兼容 / 语音可用性 ============ */
  var KEY_COMPAT_DISMISS = 'flashcard:compatTipDismissed';
  var KEY_COMPAT_SESSION = 'flashcard:compatTipShown';
  var COMPAT_BROWSERS = 'Chrome / Safari / Edge';

  // 内置浏览器通常缺少英文语音包，表现为“点了没声音”，需要单独提示
  var WEAK_BROWSERS = [
    { re: /HuaweiBrowser|HMSCore/i, name: '华为浏览器' },
    { re: /MicroMessenger/i, name: '微信内置浏览器' },
    { re: /\bQQ\//i, name: 'QQ 内置浏览器' },
    { re: /UCBrowser|UBrowser/i, name: 'UC 浏览器' },
    { re: /Quark/i, name: '夸克浏览器' },
    { re: /MiuiBrowser/i, name: '小米浏览器' },
    { re: /baiduboxapp/i, name: '百度 App' },
    { re: /DingTalk/i, name: '钉钉内置浏览器' },
    { re: /AlipayClient/i, name: '支付宝内置浏览器' },
    { re: /Weibo/i, name: '微博内置浏览器' }
  ];

  function detectWeakBrowser() {
    var ua = navigator.userAgent || '';
    for (var i = 0; i < WEAK_BROWSERS.length; i++) {
      if (WEAK_BROWSERS[i].re.test(ua)) return WEAK_BROWSERS[i].name;
    }
    // HarmonyOS 自带浏览器：UA 里没有主流内核标识，同样按弱环境处理
    if (/HarmonyOS/i.test(ua) && !/(Chrome|CriOS|Edg|Firefox|FxiOS|SamsungBrowser)\//.test(ua)) {
      return '华为浏览器';
    }
    return '';
  }

  var weakBrowser = detectWeakBrowser();
  var speechBroken = !supportsSpeech;
  var compatEl = null;
  var compatTextEl = null;
  var compatCopyBtn = null;
  var compatHideTimer = null;

  function canSpeak() { return supportsSpeech && !speechBroken; }

  function readTipSession() {
    try { return window.sessionStorage.getItem(KEY_COMPAT_SESSION) || ''; } catch (e) { return ''; }
  }
  function tipShownThisSession(reason) {
    return readTipSession().split('|').indexOf(reason) !== -1;
  }
  function markTipShown(reason) {
    var list = readTipSession().split('|');
    if (list.indexOf(reason) !== -1) return;
    list.push(reason);
    try { window.sessionStorage.setItem(KEY_COMPAT_SESSION, list.join('|')); } catch (e) {}
  }

  function compatMessage(reason) {
    if (reason === 'env') {
      return '当前是' + weakBrowser + '，语音朗读可能没有声音。建议改用 ' + COMPAT_BROWSERS + ' 打开本页。';
    }
    if (reason === 'audio') {
      return '音频加载失败，请先检查网络；如果仍然不行，请改用 ' + COMPAT_BROWSERS + ' 打开本页。';
    }
    if (reason === 'autoplay') {
      return '浏览器拦截了自动播放，请点一下播放器上的 ▶ 再试。';
    }
    return '当前浏览器没能朗读出来：可能不支持语音合成，或系统缺少英文语音包。建议改用 ' + COMPAT_BROWSERS + ' 打开本页。';
  }

  function copyCompatLink() {
    var url = window.location.href;
    var done = function () {
      if (!compatCopyBtn) return;
      var label = compatCopyBtn.textContent;
      compatCopyBtn.textContent = '已复制 ✓';
      window.setTimeout(function () {
        if (compatCopyBtn) compatCopyBtn.textContent = label;
      }, 1600);
    };
    var fallback = function () {
      try {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
      } catch (e) {}
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else {
      fallback();
    }
  }

  function buildCompatTip() {
    if (compatEl) return compatEl;
    var wrap = document.createElement('div');
    wrap.className = 'compat-tip';
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-live', 'polite');
    wrap.hidden = true;

    var icon = document.createElement('span');
    icon.className = 'compat-tip-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '🔈';

    var body = document.createElement('div');
    body.className = 'compat-tip-body';

    var text = document.createElement('p');
    text.className = 'compat-tip-text';

    var actions = document.createElement('div');
    actions.className = 'compat-tip-actions';

    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'compat-tip-btn is-primary';
    copy.textContent = '复制本页链接';
    copy.addEventListener('click', copyCompatLink);

    var know = document.createElement('button');
    know.type = 'button';
    know.className = 'compat-tip-btn';
    know.textContent = '知道了';
    know.addEventListener('click', function () {
      writeStore(KEY_COMPAT_DISMISS, '1');
      hideCompatTip();
    });

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'compat-tip-close';
    close.setAttribute('aria-label', '关闭提示');
    close.textContent = '×';
    close.addEventListener('click', hideCompatTip);

    actions.appendChild(copy);
    actions.appendChild(know);
    body.appendChild(text);
    body.appendChild(actions);
    wrap.appendChild(icon);
    wrap.appendChild(body);
    wrap.appendChild(close);
    document.body.appendChild(wrap);

    compatEl = wrap;
    compatTextEl = text;
    compatCopyBtn = copy;
    return wrap;
  }

  function hideCompatTip() {
    if (!compatEl) return;
    if (compatHideTimer) { window.clearTimeout(compatHideTimer); compatHideTimer = null; }
    compatEl.classList.remove('is-visible');
    window.setTimeout(function () {
      if (compatEl && !compatEl.classList.contains('is-visible')) compatEl.hidden = true;
    }, 220);
  }

  function showCompatTip(reason) {
    var proactive = reason === 'env' || reason === 'nospeech';
    if (proactive && readStore(KEY_COMPAT_DISMISS) === '1') return;
    if (tipShownThisSession(reason)) return;
    // 已经提示过整体环境问题，就不再重复弹“朗读失败”
    if (!proactive && (tipShownThisSession('env') || tipShownThisSession('nospeech'))) return;
    markTipShown(reason);

    var el = buildCompatTip();
    if (compatTextEl) compatTextEl.textContent = compatMessage(reason);
    if (compatHideTimer) { window.clearTimeout(compatHideTimer); compatHideTimer = null; }
    el.hidden = false;
    el.classList.remove('is-visible');
    void el.offsetWidth;
    el.classList.add('is-visible');
    // 自动播放被拦截只是一次性提示，看到即可，不打扰阅读
    if (reason === 'autoplay') compatHideTimer = window.setTimeout(hideCompatTip, 6000);
  }

  /* ---- 朗读发音：优先自然音，其次本机音，统一英式 ---- */
  var KEY_VOICE = 'flashcard:voice';
  var VOICE_AUTO = 'auto';
  var voiceCache = [];
  var preferredVoice = null;
  var badVoiceKeys = {};
  var lastVoiceSync = 0;
  var voiceSelectEl = document.getElementById('voice-select');
  var voicePickerEl = document.getElementById('voice-picker');

  function normalizeVoiceLang(lang) {
    return String(lang || '').replace(/_/g, '-').toLowerCase();
  }

  function isEnglishVoice(v) {
    return !!v && /^en(-|$)/.test(normalizeVoiceLang(v.lang));
  }

  function isBritishVoice(v) {
    return !!v && normalizeVoiceLang(v.lang) === 'en-gb';
  }

  function voiceKeyOf(v) {
    return v ? String(v.voiceURI || v.name || '') : '';
  }

  function shortVoiceName(v) {
    var raw = String((v && v.name) || 'English');
    var name = raw
      .replace(/^Microsoft\s+/i, '')
      .replace(/\s*[-–—]\s*English.*$/i, '')
      .replace(/\s*Online\s*\(Natural\)/i, '')
      .replace(/\s*\((?:Natural|Neural|Enhanced|Premium)\)\s*/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return name || raw;
  }

  // 打分：自然音 > 在线音 > 本机音；英式 > 其他英语
  function voiceScore(v) {
    var lang = normalizeVoiceLang(v && v.lang);
    var name = String((v && v.name) || '');
    var score = 0;
    if (lang === 'en-gb') score += 100;
    else if (/^en-(ie|au|nz|za|in|sg)$/.test(lang)) score += 55;
    else if (lang === 'en-us') score += 30;
    else if (/^en(-|$)/.test(lang)) score += 20;
    else return -1;

    if (/natural|neural/i.test(name)) score += 120;
    else if (/online/i.test(name)) score += 60;
    else if (/enhanced|premium/i.test(name)) score += 45;

    if (/google uk english female/i.test(name)) score += 95;
    else if (/google uk english male/i.test(name)) score += 90;
    else if (/\b(libby|sonia|maisie|ryan|thomas|hollie|bella|alfie)\b/i.test(name)) score += 70;
    else if (/\b(serena|kate|daniel|arthur|martha|stephanie|oliver|karen|moira|tessa)\b/i.test(name)) score += 55;
    else if (/\bhazel\b/i.test(name)) score += 35;
    else if (/\b(george|susan)\b/i.test(name)) score += 10;

    // 明显机械/非英语朗读器降权
    if (/compact|espeak|festival|pico|robot|synthesizer|chinese|中文/i.test(name)) score -= 150;
    return score;
  }

  function englishVoices() {
    var out = [];
    for (var i = 0; i < voiceCache.length; i++) {
      var v = voiceCache[i];
      if (!isEnglishVoice(v)) continue;
      var key = voiceKeyOf(v);
      if (key && badVoiceKeys[key]) continue;
      out.push(v);
    }
    out.sort(function (a, b) { return voiceScore(b) - voiceScore(a); });
    return out;
  }

  function pickEnglishVoice() {
    var list = englishVoices();
    return list.length ? list[0] : null;
  }

  function findPreferredVoice() {
    var saved = readStore(KEY_VOICE);
    if (saved && saved !== VOICE_AUTO) {
      for (var i = 0; i < voiceCache.length; i++) {
        var v = voiceCache[i];
        var key = voiceKeyOf(v);
        if (key === saved && isEnglishVoice(v) && !badVoiceKeys[key]) return v;
      }
    }
    return pickEnglishVoice();
  }

  function getActiveVoice() {
    return findPreferredVoice() || preferredVoice || null;
  }

  function applyVoice(u) {
    syncVoicesThrottled();
    var v = getActiveVoice();
    if (v) { u.voice = v; u.lang = v.lang || 'en-GB'; }
    else { u.lang = u.lang || 'en-GB'; }
  }

  // Edge 等浏览器的在线自然音常常晚于页面加载才出现，朗读前节流刷新一次
  function syncVoicesThrottled() {
    if (!supportsSpeech) return;
    var now = Date.now();
    if (now - lastVoiceSync < 1500) return;
    lastVoiceSync = now;
    refreshSpeechVoices();
  }

  // 在线自然音首次发声偏慢，给它更长等待时间
  function speechStartTimeout() {
    var v = getActiveVoice();
    return v && v.localService === false ? 5000 : 1800;
  }

  /* ---- 角色化发音：场景按说话人分音色，故事分旁白/对白 ---- */
  var FEMALE_VOICE_RE = /(libby|sonia|olivia|maisie|bella|hollie|hazel|susan|serena|kate|martha|stephanie|moira|tessa|karen|samantha|victoria|michelle|aria|jenny|emma|ava|allison|joanna|salli|kimberly|ivy|kendra|zira|ana|female|woman|girl)/i;
  var MALE_VOICE_RE = /(ryan|thomas|george|daniel|arthur|oliver|elliot|ethan|noah|alfie|guy|david|mark|alex|james|eric|steffan|brian|christopher|roger|william|fred|ralph|male|man|boy)/i;
  var CHILD_VOICE_RE = /(alfie|bella|hollie|maisie|noah|\bana\b|child|kid|junior)/i;

  function voiceGender(v) {
    var name = String((v && v.name) || '');
    if (FEMALE_VOICE_RE.test(name)) return 'female';
    if (MALE_VOICE_RE.test(name)) return 'male';
    return '';
  }

  function isChildVoice(v) {
    return CHILD_VOICE_RE.test(String((v && v.name) || ''));
  }

  var PROFILE_ADULT_F = { gender: 'female', age: 'adult', rate: 1.0 };
  var PROFILE_ADULT_M = { gender: 'male', age: 'adult', rate: 0.98 };
  var PROFILE_CHILD = { gender: '', age: 'child', rate: 1.05 };
  var PROFILE_CHILD_F = { gender: 'female', age: 'child', rate: 1.06 };
  var PROFILE_CHILD_M = { gender: 'male', age: 'child', rate: 1.04 };
  var PROFILE_GROUP = { gender: '', age: 'group', rate: 0.98 };
  var PROFILE_NEUTRAL = { gender: '', age: 'adult', rate: 1.0 };

  var FEMALE_SPEAKERS = ['mom','mum','mother','grandma','granny','teacher','nurse','lily','amy','lucy','anna','emma','mrs','ms','miss','queen','princess','witch','sister'];
  var MALE_SPEAKERS = ['tom','ben','dad','father','grandpa','doctor','driver','mr','king','prince','brother','uncle'];
  var CHILD_FEMALE_SPEAKERS = ['amy','lily','lucy','anna','emma','girl'];
  var CHILD_MALE_SPEAKERS = ['tom','ben','jack','leo','boy'];
  var GROUP_SPEAKERS = ['class','everyone','everybody','children','students','family'];

  function speakerProfile(who) {
    var key = String(who || '').toLowerCase().replace(/[^a-z]/g, '');
    if (!key) return PROFILE_NEUTRAL;
    if (GROUP_SPEAKERS.indexOf(key) !== -1) return PROFILE_GROUP;
    if (CHILD_FEMALE_SPEAKERS.indexOf(key) !== -1) return PROFILE_CHILD_F;
    if (CHILD_MALE_SPEAKERS.indexOf(key) !== -1) return PROFILE_CHILD_M;
    if (FEMALE_SPEAKERS.indexOf(key) !== -1) return PROFILE_ADULT_F;
    if (MALE_SPEAKERS.indexOf(key) !== -1) return PROFILE_ADULT_M;
    return PROFILE_NEUTRAL;
  }

  // 音色与角色匹配度：小孩优先童声、女性优先女声、男性优先男声
  function castVoiceRank(v, profile, kidVoicesAvailable) {
    var kid = isChildVoice(v);
    var g = voiceGender(v);
    if (profile.age === 'child') {
      if (kid) return 220;
      // 没有童声时不再区分男女：挑音色最清楚的那个，靠音高塑成童声
      if (!kidVoicesAvailable) return 50;
      if (g === profile.gender) return 60;
      return g ? 40 : 50;
    }
    var rank = kid ? -70 : 30;
    if (profile.gender) {
      if (g === profile.gender) rank += 70;
      else if (g) rank -= 45;
    }
    return rank;
  }

  // usage 记录每个音色在本场被用了几次：同一场里不同角色尽量拿到不同音色
  function pickCastVoice(profile, usage) {
    var list = englishVoices();
    if (!list.length) return null;
    var kidVoicesAvailable = false;
    for (var k = 0; k < list.length; k++) {
      if (isChildVoice(list[k])) { kidVoicesAvailable = true; break; }
    }
    var best = null;
    var bestRank = -Infinity;
    for (var i = 0; i < list.length; i++) {
      var v = list[i];
      var key = voiceKeyOf(v);
      var rank = castVoiceRank(v, profile, kidVoicesAvailable) - (usage[key] || 0) * 400 - i * 0.01;
      if (rank > bestRank) { bestRank = rank; best = v; }
    }
    return best;
  }

  // 有匹配音色就用本色；缺童声/同性音色时，用音高和语速把音色掰成角色该有的样子
  // 童声变调幅度刻意收窄到 1.2 左右：抬太高会把成年音色读出“含混”的失真感
  function castEntry(profile, voice) {
    var vg = voiceGender(voice);
    var kidVoice = isChildVoice(voice);
    var pitch = 1;
    if (profile.age === 'child') {
      pitch = kidVoice ? 1 : (vg === 'male' ? 1.2 : 1.26);
    } else if (profile.age === 'group') {
      pitch = kidVoice ? 1.12 : 1.06;
    } else if (profile.gender === 'female') {
      pitch = kidVoice ? 1.12 : (vg === 'male' ? 1.14 : 1);
    } else if (profile.gender === 'male') {
      pitch = kidVoice ? 0.8 : (vg === 'female' ? 0.8 : 0.94);
    } else {
      pitch = kidVoice ? 1.06 : (vg === 'male' ? 0.94 : 1);
    }
    return {
      voice: voice || null,
      pitch: pitch,
      rate: profile.rate || 1,
      gender: profile.gender || vg,
      age: profile.age || 'adult'
    };
  }

  function pitchSlotKey(voice, pitch) {
    return voiceKeyOf(voice) + '@' + Number(pitch).toFixed(2);
  }

  // 系统只有一两个英语音色时，同音色的角色再按音高错开，避免听起来是同一个人
  function separateCastPitches(cast) {
    var taken = {};
    var offsets = [0, 0.12, -0.12, 0.24, -0.24, 0.36, -0.36];
    Object.keys(cast).forEach(function (name) {
      var entry = cast[name];
      if (!entry) return;
      var base = Math.min(1.7, Math.max(0.6, entry.pitch || 1));
      var picked = base;
      for (var i = 0; i < offsets.length; i++) {
        var cand = Number(Math.min(1.7, Math.max(0.6, base + offsets[i])).toFixed(2));
        if (!taken[pitchSlotKey(entry.voice, cand)]) { picked = cand; break; }
      }
      entry.pitch = picked;
      taken[pitchSlotKey(entry.voice, picked)] = true;
    });
    return cast;
  }

  function buildSceneCast(lines) {
    var cast = {};
    var usage = {};
    var speakers = [];
    (lines || []).forEach(function (line) {
      if (line && line.who && speakers.indexOf(line.who) === -1) speakers.push(line.who);
    });
    speakers.forEach(function (who) {
      var profile = speakerProfile(who);
      var voice = pickCastVoice(profile, usage);
      if (voice) {
        var key = voiceKeyOf(voice);
        usage[key] = (usage[key] || 0) + 1;
      }
      cast[who] = castEntry(profile, voice);
    });
    return separateCastPitches(cast);
  }

  function voiceSignature() {
    return englishVoices().map(voiceKeyOf).join('|');
  }

  // 音色列表可能晚于首屏到达，按签名判断是否需要重新分配角色音色
  function getSceneCast(state) {
    var sig = voiceSignature();
    if (!state.cast || state.castSig !== sig) {
      state.cast = buildSceneCast(state.lines);
      state.castSig = sig;
    }
    return state.cast;
  }

  function applyCastVoice(u, entry) {
    if (entry && entry.voice && !badVoiceKeys[voiceKeyOf(entry.voice)]) {
      u.voice = entry.voice;
      u.lang = entry.voice.lang || 'en-GB';
      return true;
    }
    applyVoice(u);
    return false;
  }

  /* ---- 故事朗读：旁白 + 对白分段，读出讲故事的语气 ---- */
  var STORY_QUOTE_DEFAULT = {
    'ugly-duckling': 'child', 'lion-and-mouse': 'male', 'fox-and-grapes': 'male',
    'tortoise-and-hare': 'male', 'ant-and-grasshopper': 'male', 'fox-and-crow': 'male',
    'town-mouse-country-mouse': 'male', 'golden-eggs': 'male', 'wind-and-sun': 'neutral',
    'boy-who-cried-wolf': 'male', 'crow-and-pitcher': 'male', 'red-riding-hood': 'child',
    'hansel-and-gretel': 'child', 'snow-white': 'female', 'cinderella': 'female',
    'rapunzel': 'female', 'rumpelstiltskin': 'female', 'frog-prince': 'female',
    'little-match-girl': 'child', 'little-mermaid': 'female', 'thumbelina': 'female',
    'emperors-new-clothes': 'child', 'bremen-musicians': 'male', 'elves-and-shoemaker': 'male',
    'sima-guang': 'child', 'kong-rong': 'child', 'cao-chong': 'child',
    'waiting-by-tree': 'male', 'pulling-seedlings': 'male', 'mending-fold': 'male',
    'mulan': 'female', 'story-of-nian': 'neutral', 'chang-e': 'female'
  };

  // 把一句话拆成「旁白 / 引号里的对白」，对白单独换音色和语调
  function splitStoryParts(text) {
    var parts = [];
    var re = /"([^"]*)"|“([^”]*)”/g;
    var last = 0;
    var m;
    while ((m = re.exec(text))) {
      var pre = text.slice(last, m.index).replace(/^[\s,;:.!?]+/, '').trim();
      if (pre) parts.push({ text: pre, quote: false });
      var quoted = (m[1] !== undefined ? m[1] : m[2]).trim();
      if (quoted) parts.push({ text: quoted, quote: true });
      last = m.index + m[0].length;
    }
    var rest = text.slice(last).replace(/^[\s,;:.!?]+/, '').trim();
    if (rest) parts.push({ text: rest, quote: false });
    if (!parts.length) parts.push({ text: text, quote: false });
    return parts;
  }

  function storyDialogueKey(sentence, storyId) {
    var outside = String(sentence || '').replace(/"[^"]*"|“[^”]*”/g, ' ');
    var t = ' ' + outside.toLowerCase() + ' ';
    if (/\b(child|children|girl|boy|kids?)\b/.test(t)) return 'child';
    if (/\b(witch|stepmother|mother|grandmother|queen|princess|snow white|rapunzel|she|her|sister|nurse)\b/.test(t)) return 'female';
    if (/\b(wolf|father|king|prince|shepherd|hare|fox|ant|frog|tortoise|mouse|neighbour|brothers?|he|his|him|uncle)\b/.test(t)) return 'male';
    if (/\b(everyone|everybody|class|students|friends)\b/.test(t)) return 'group';
    return STORY_QUOTE_DEFAULT[storyId] || 'neutral';
  }

  var STORY_CAST_PROFILES = {
    female: PROFILE_ADULT_F,
    male: PROFILE_ADULT_M,
    child: PROFILE_CHILD,
    group: PROFILE_GROUP,
    neutral: PROFILE_NEUTRAL
  };

  function buildStoryCast(sentences, storyId) {
    var usage = {};
    var narratorVoice = getActiveVoice();
    if (narratorVoice) usage[voiceKeyOf(narratorVoice)] = 1;
    var narrator = castEntry(PROFILE_NEUTRAL, narratorVoice);
    narrator.pitch = 1.0;
    narrator.rate = 0.97;
    var cast = { narrator: narrator };

    // 只给故事里真正出现过的角色分配音色，没用到的角色不占音色名额
    var order = [];
    (sentences || []).forEach(function (sent) {
      if (!sent || !/["“]/.test(sent.en)) return;
      var key = storyDialogueKey(sent.en, storyId);
      if (order.indexOf(key) === -1) order.push(key);
    });

    order.forEach(function (key) {
      var profile = STORY_CAST_PROFILES[key] || PROFILE_NEUTRAL;
      var voice = pickCastVoice(profile, usage);
      if (voice) {
        var vk = voiceKeyOf(voice);
        usage[vk] = (usage[vk] || 0) + 1;
      }
      cast[key] = castEntry(profile, voice);
    });
    return separateCastPitches(cast);
  }

  function renderVoicePicker() {
    if (!voiceSelectEl) return;
    var list = englishVoices();
    if (voicePickerEl) voicePickerEl.hidden = list.length < 2;
    if (list.length < 2) return;

    var selected = readStore(KEY_VOICE) || VOICE_AUTO;
    var frag = document.createDocumentFragment();

    var autoOpt = document.createElement('option');
    autoOpt.value = VOICE_AUTO;
    // 手机上空间窄，只显示「自动」，避免被截断
    var narrow = !!(window.matchMedia && window.matchMedia('(max-width: 560px)').matches);
    autoOpt.textContent = narrow ? '自动' : '自动 · ' + shortVoiceName(list[0]);
    frag.appendChild(autoOpt);

    var groups = [
      { label: '英式发音（推荐）', items: list.filter(isBritishVoice) },
      { label: '其他英语发音', items: list.filter(function (v) { return !isBritishVoice(v); }) }
    ];
    groups.forEach(function (group) {
      if (!group.items.length) return;
      var og = document.createElement('optgroup');
      og.label = group.label;
      group.items.forEach(function (v) {
        var opt = document.createElement('option');
        opt.value = voiceKeyOf(v);
        opt.textContent = shortVoiceName(v) + (v.localService === false ? ' · 在线' : '');
        og.appendChild(opt);
      });
      frag.appendChild(og);
    });

    voiceSelectEl.innerHTML = '';
    voiceSelectEl.appendChild(frag);
    voiceSelectEl.value = selected;
    if (voiceSelectEl.value !== selected) voiceSelectEl.value = VOICE_AUTO;
  }

  // 在线音失败（断网/超时）时拉黑它，自动退回本机音
  function markVoiceFailed(voice, type) {
    if (!voice || voice.localService !== false) return false;
    if (type !== 'timeout' && type !== 'network' && type !== 'synthesis-failed' &&
        type !== 'audio-busy' && type !== 'not-allowed') return false;
    var key = voiceKeyOf(voice);
    if (!key) return false;
    badVoiceKeys[key] = true;
    if (readStore(KEY_VOICE) === key) writeStore(KEY_VOICE, VOICE_AUTO);
    preferredVoice = pickEnglishVoice();
    renderVoicePicker();
    return !!preferredVoice;
  }

  function previewVoice() {
    if (!canSpeak()) return;
    window.setTimeout(function () {
      if (!canSpeak()) return;
      var v = getActiveVoice();
      try {
        synth.cancel();
        var u = new window.SpeechSynthesisUtterance('Hello');
        u.lang = v && v.lang ? v.lang : 'en-GB';
        if (v) u.voice = v;
        u.rate = 0.95;
        synth.speak(u);
      } catch (e) {}
    }, 60);
  }

  function refreshSpeechVoices() {
    if (!supportsSpeech) return;
    lastVoiceSync = Date.now();
    var voices = [];
    try { voices = synth.getVoices() || []; } catch (e) { return; }
    if (!voices.length) return;
    voiceCache = voices;
    preferredVoice = pickEnglishVoice();
    if (preferredVoice) speechBroken = false;
    // 用户选过的语音已不存在时回落到自动
    var saved = readStore(KEY_VOICE);
    if (saved && saved !== VOICE_AUTO) {
      var found = false;
      for (var i = 0; i < voiceCache.length; i++) {
        if (voiceKeyOf(voiceCache[i]) === saved && isEnglishVoice(voiceCache[i])) { found = true; break; }
      }
      if (!found) writeStore(KEY_VOICE, VOICE_AUTO);
    }
    renderVoicePicker();
  }

  if (voiceSelectEl) {
    voiceSelectEl.addEventListener('change', function () {
      writeStore(KEY_VOICE, voiceSelectEl.value || VOICE_AUTO);
      preferredVoice = pickEnglishVoice();
      previewVoice();
    });
  }

  function markSpeechBroken(btn) {
    speechBroken = true;
    if (speechStartTimer) { window.clearTimeout(speechStartTimer); speechStartTimer = null; }
    if (btn) {
      btn.classList.remove('is-speaking');
      if (speakingBtn === btn) speakingBtn = null;
    }
    showCompatTip('failed');
  }

  function flashButton(btn) {
    if (!btn) return;
    btn.classList.add('is-speaking');
    window.setTimeout(function () { btn.classList.remove('is-speaking'); }, 600);
  }

  function initCompat() {
    if (supportsSpeech) {
      try {
        if (typeof synth.addEventListener === 'function') {
          synth.addEventListener('voiceschanged', refreshSpeechVoices);
        } else {
          synth.onvoiceschanged = refreshSpeechVoices;
        }
      } catch (e) {}
      refreshSpeechVoices();
      // 部分浏览器语音列表异步返回，稍后再刷新几次
      window.setTimeout(refreshSpeechVoices, 500);
      window.setTimeout(refreshSpeechVoices, 1500);
    }
    if (weakBrowser || !supportsSpeech) {
      window.setTimeout(function () {
        showCompatTip(weakBrowser ? 'env' : 'nospeech');
      }, 700);
    }
  }

  /* ============ 单词音标标注 ============ */
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * 在文本中给命中 dict 的单词加上音标。
   * once=true：同一行内每个单词只标注一次（场景对话）；
   * once=false：每次出现都标注（故事会）。
   */
  function appendAnnotated(container, text, dict, once) {
    var words = dict ? Object.keys(dict) : [];
    if (!words.length) { container.textContent = text; return; }
    var values = {};
    words.forEach(function (w) { values[w.toLowerCase()] = dict[w]; });
    words = words.slice().sort(function (a, b) { return b.length - a.length; });
    var pattern = words.map(escapeRegExp).join('|');
    var re = new RegExp('\\b(' + pattern + ')\\b', 'gi');
    var used = {};
    var last = 0, match;
    while ((match = re.exec(text)) !== null) {
      var lower = match[0].toLowerCase();
      if (!values[lower]) continue;
      if (once && used[lower]) continue;
      if (match.index > last) container.appendChild(document.createTextNode(text.slice(last, match.index)));
      used[lower] = true;
      var wrap = document.createElement('span');
      wrap.className = 'word-note';
      wrap.appendChild(document.createTextNode(match[0] + ' '));
      var ipa = document.createElement('span');
      ipa.className = 'word-ipa'; ipa.lang = 'en'; ipa.textContent = values[lower];
      wrap.appendChild(ipa);
      container.appendChild(wrap);
      last = match.index + match[0].length;
    }
    if (last < text.length) container.appendChild(document.createTextNode(text.slice(last)));
  }

  /* ============ Theme ============ */
  function currentTheme() {
    return rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function syncThemeUi(theme) {
    var isDark = theme === 'dark';
    var label = isDark ? '切换到浅色模式' : '切换到深色模式';
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', label);
      themeBtn.title = label;
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#1C1B19' : '#FAF7F0');
  }

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      rootEl.setAttribute('data-theme', next);
      writeStore(KEY_THEME, next);
      syncThemeUi(next);
    });
  }

  /* ============ TABS ============ */
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ============ WORDS TAB ============ */
  var gridEl = document.getElementById('word-grid');
  var emptyEl = document.getElementById('word-empty');
  var emptyTextEl = document.getElementById('word-empty-text');
  var catNavEl = document.getElementById('word-cat-nav');

  var state = { activeId: CATEGORIES[0].id, group: 'all', grade: readStore('flashcard:grade') || 'all' };
  var pills = {};

  var KEY_SEEN = 'flashcard:seen';
  var seenWords = {};
  try { seenWords = JSON.parse(readStore(KEY_SEEN) || '{}') || {}; } catch (e) { seenWords = {}; }

  function wordPassesGrade(w) {
    if (state.grade === 'all') return true;
    if (state.grade === 'ext') return w.level === 'extension';
    return w.grade === Number(state.grade);
  }

  function getFilteredCats() {
    return CATEGORIES.filter(function (c) {
      if (state.group !== 'all' && getCategoryGroup(c.id) !== state.group) return false;
      return c.words.some(wordPassesGrade);
    });
  }

  function buildCatNav() {
    if (!catNavEl) return;
    catNavEl.textContent = '';
    var frag = document.createDocumentFragment();
    var cats = getFilteredCats();
    cats.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill cat-pill';
      btn.dataset.id = cat.id;
      btn.style.setProperty('--cat', cat.color);
      btn.setAttribute('aria-pressed', cat.id === state.activeId ? 'true' : 'false');
      var icon = document.createElement('span');
      icon.className = 'pill-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = cat.icon;
      var zh = document.createElement('span'); zh.textContent = cat.zh;
      var count = document.createElement('span');
      count.className = 'pill-count';
      count.textContent = cat.words.filter(wordPassesGrade).length;
      btn.appendChild(icon);
      btn.appendChild(zh);
      btn.appendChild(count);
      btn.addEventListener('click', function () { setCategory(cat.id); });
      frag.appendChild(btn);
      pills[cat.id] = btn;
    });
    catNavEl.appendChild(frag);
  }

  function syncPills() {
    Object.keys(pills).forEach(function (id) {
      var isActive = id === state.activeId;
      pills[id].classList.toggle('is-active', isActive);
      pills[id].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function updateCounts() {
    var filtered = 0;
    getFilteredCats().forEach(function (c) {
      c.words.forEach(function (w) { if (wordPassesGrade(w)) filtered += 1; });
    });
    var totalVisible = 0;
    CATEGORIES.forEach(function (c) { totalVisible += c.words.length; });
    var tabWordCount = document.getElementById('tab-words-count');
    if (tabWordCount) tabWordCount.textContent = String(filtered);
    var totalEl = document.getElementById('total-count');
    if (totalEl) totalEl.textContent = String(totalVisible);
    var sceneCount = SCENES.length;
    var songCount = SONGS.length;
    var storyCount = STORIES.length;
    var pairs = [
      ['tab-scenes-count', sceneCount], ['scene-total', sceneCount],
      ['tab-songs-count', songCount], ['song-total', songCount],
      ['tab-stories-count', storyCount], ['story-total', storyCount]
    ];
    pairs.forEach(function (p) {
      var el = document.getElementById(p[0]);
      if (el) el.textContent = String(p[1]);
    });
  }

  function setCategory(id) {
    if (!findCategory(id)) return;
    state.activeId = id;
    writeStore(KEY_CATEGORY, id);
    updateHash(id);
    renderWords();
  }

  function findCategory(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i];
    }
    return null;
  }

  function updateHash(id) {
    try { window.history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  function createCard(word, cat, index) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.style.setProperty('--cat', cat.color);
    card.style.animationDelay = Math.min(index, 11) * 22 + 'ms';
    var seen = !!seenWords[word.en];
    if (!seen) card.classList.add('is-new');
    card.title = '点击显示音标并播放发音：' + word.en;
    card.setAttribute('aria-label', '播放 ' + word.en + '（' + word.zh + '）的发音并显示音标');
    var figure = document.createElement('span');
    figure.className = 'card-figure';
    if (word.swatch) {
      // 颜色类单词直接用真实色块，比任何 emoji 都准确
      var swatch = document.createElement('span');
      swatch.className = 'card-swatch';
      swatch.style.background = word.swatch;
      swatch.setAttribute('aria-hidden', 'true');
      figure.appendChild(swatch);
    } else if (word.icon && /\.svg$/i.test(word.icon)) {
      // 没有对应 emoji 的实物，用本地手绘 SVG，保证图物一致
      var pic = document.createElement('img');
      pic.className = 'card-img';
      pic.src = word.icon;
      pic.alt = '';
      pic.width = 56;
      pic.height = 56;
      pic.decoding = 'async';
      figure.appendChild(pic);
    } else if (word.icon) {
      var emoji = document.createElement('span');
      emoji.className = 'card-emoji';
      emoji.setAttribute('aria-hidden', 'true');
      emoji.textContent = word.icon;
      figure.appendChild(emoji);
    } else {
      // 抽象词没有合适图标时用首字母色块，避免拿“看起来像”的图凑数
      var letter = document.createElement('span');
      letter.className = 'card-letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = word.en.charAt(0).toUpperCase();
      figure.appendChild(letter);
    }
    var body = document.createElement('span');
    body.className = 'card-body';
    var en = document.createElement('span');
    en.className = 'card-en'; en.lang = 'en'; en.textContent = word.en;
    var ipa = document.createElement('span');
    ipa.className = 'card-ipa'; ipa.lang = 'en'; ipa.textContent = word.ipa || '';
    var ipaHint = document.createElement('span');
    ipaHint.className = 'card-ipa-hint'; ipaHint.textContent = '点按看音标';
    var zh = document.createElement('span');
    zh.className = 'card-zh'; zh.textContent = word.zh;
    var meta = document.createElement('span');
    meta.className = 'card-meta';
    if (word.level === 'core' && word.grade) {
      var cn = ['', '一', '二', '三', '四', '五', '六'][word.grade] || word.grade;
      meta.textContent = word.unit
        ? cn + '年级' + (word.term === 2 ? '下' : '上') + ' · U' + word.unit
        : cn + '年级';
      meta.classList.add('is-core');
    } else {
      meta.textContent = '拓展';
    }
    body.appendChild(en);
    body.appendChild(ipaHint);
    body.appendChild(ipa);
    body.appendChild(zh);
    body.appendChild(meta);
    card.appendChild(figure);
    card.appendChild(body);
    card.addEventListener('click', function () {
      if (!card.classList.contains('is-revealed')) {
        card.classList.add('is-revealed');
        card.classList.remove('is-new');
        seenWords[word.en] = 1;
        try { writeStore(KEY_SEEN, JSON.stringify(seenWords)); } catch (e) {}
      }
      speak(word.en, card);
    });
    return card;
  }

  function renderWords() {
    var cat = findCategory(state.activeId);
    if (!cat || !cat.words.some(wordPassesGrade)) {
      var available = getFilteredCats();
      cat = available[0] || findCategory(CATEGORIES[0].id) || CATEGORIES[0];
      state.activeId = cat.id;
      updateHash(cat.id);
    }
    var words = cat.words.filter(wordPassesGrade);
    rootEl.style.setProperty('--cat', cat.color);
    rootEl.style.setProperty('--ring', cat.color);
    gridEl.textContent = '';
    if (!words.length) {
      gridEl.hidden = true;
      emptyEl.hidden = false;
      emptyTextEl.textContent = state.grade === 'ext' ? '该分类暂无拓展词' : '该分类在本年级暂无单词';
    } else {
      gridEl.hidden = false;
      emptyEl.hidden = true;
      var frag = document.createDocumentFragment();
      words.forEach(function (word, i) { frag.appendChild(createCard(word, cat, i)); });
      gridEl.appendChild(frag);
    }
    syncPills();
    updateCounts();
  }

  var gradePills = document.querySelectorAll('.grade-pill[data-grade]');
  function syncGradePills() {
    gradePills.forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.grade === state.grade);
    });
  }
  gradePills.forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.grade = btn.dataset.grade;
      writeStore('flashcard:grade', state.grade);
      syncGradePills();
      var available = getFilteredCats();
      state.activeId = available[0] ? available[0].id : CATEGORIES[0].id;
      writeStore(KEY_CATEGORY, state.activeId);
      buildCatNav();
      syncPills();
      renderWords();
    });
  });

  var subPills = document.querySelectorAll('.sub-pill[data-group]');
  subPills.forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.sub-pill[data-group]').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      state.group = btn.dataset.group;
      state.activeId = getFilteredCats()[0] ? getFilteredCats()[0].id : CATEGORIES[0].id;
      writeStore(KEY_CATEGORY, state.activeId);
      buildCatNav();
      syncPills();
      renderWords();
    });
  });

  /* ============ SPEAK ============ */
  var speakingBtn = null;
  var speakTimer = null;
  var speechStartTimer = null;

  function speak(text, btn, cast, tone) {
    stopAllPlayback();
    if (!canSpeak()) {
      flashButton(btn);
      showCompatTip('failed');
      return;
    }
    if (speakingBtn && speakingBtn !== btn) speakingBtn.classList.remove('is-speaking');
    speakingBtn = btn;
    btn.classList.add('is-speaking');
    if (speakTimer) { window.clearTimeout(speakTimer); speakTimer = null; }
    if (speechStartTimer) { window.clearTimeout(speechStartTimer); speechStartTimer = null; }

    var retried = 0;
    var finish = function () {
      btn.classList.remove('is-speaking');
      if (speakingBtn === btn) speakingBtn = null;
    };

    var start = function () {
      if (speechStartTimer) { window.clearTimeout(speechStartTimer); speechStartTimer = null; }
      var utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = 'en-GB';
      applyCastVoice(utter, cast);
      var toneRate = tone ? tone.rateDelta : 0;
      var tonePitch = tone ? tone.pitch : 1;
      utter.rate = Math.min(1.6, Math.max(0.55, (0.9 + toneRate) * (cast && cast.rate ? cast.rate : 1)));
      utter.pitch = Math.min(1.9, Math.max(0.45, tonePitch * (cast && cast.pitch ? cast.pitch : 1)));
      // 童声抬得过高会失真、听不清，统一压一个上限
      if (utter.pitch > 1.45) utter.pitch = 1.45;
      var voice = utter.voice;
      var remote = !!(voice && voice.localService === false);
      var started = false;
      var clearStartTimer = function () {
        if (speechStartTimer) { window.clearTimeout(speechStartTimer); speechStartTimer = null; }
      };
      utter.onstart = function () {
        started = true;
        clearStartTimer();
      };
      utter.onend = function () {
        started = true;
        clearStartTimer();
        finish();
      };
      utter.onerror = function (ev) {
        clearStartTimer();
        var type = ev && ev.error ? ev.error : '';
        // interrupted / canceled 是我们主动打断，不代表浏览器不支持
        if (started || type === 'interrupted' || type === 'canceled') { finish(); return; }
        // 在线自然音失败时，退回本机语音再试
        if (retried < 2 && markVoiceFailed(voice, type)) {
          retried += 1;
          window.setTimeout(function () {
            try { synth.cancel(); } catch (e) {}
            start();
          }, 80);
          return;
        }
        finish();
        markSpeechBroken(btn);
      };
      // 部分浏览器（如华为、微信内置内核）接口存在但永远不播放，用超时兜底
      speechStartTimer = window.setTimeout(function () {
        if (started) return;
        if (retried < 2 && markVoiceFailed(voice, 'timeout')) {
          retried += 1;
          try { synth.cancel(); } catch (e) {}
          start();
          return;
        }
        finish();
        markSpeechBroken(btn);
      }, remote ? 5000 : 1800);
      try { synth.speak(utter); } catch (e) { markSpeechBroken(btn); finish(); }
    };

    if (synth.speaking || synth.pending) {
      synth.cancel();
      speakTimer = window.setTimeout(start, 60);
    } else { start(); }
  }

  function stopAllPlayback() {
    if (speechStartTimer) { window.clearTimeout(speechStartTimer); speechStartTimer = null; }
    PLAYERS.forEach(function (p) { p.stop(); });
  }

  /* ============ MOOD TONES ============ */
  function getMoodTone(mood) {
    var map = {
      calm:       { rateDelta: -0.03, pitch: 0.95 },
      warm:       { rateDelta:  0.00, pitch: 1.02 },
      normal:     { rateDelta:  0.00, pitch: 1.00 },
      energetic:  { rateDelta:  0.08, pitch: 1.10 },
      wonder:     { rateDelta:  0.03, pitch: 1.12 },
      sleepy:     { rateDelta: -0.10, pitch: 0.86 },
      curious:    { rateDelta:  0.02, pitch: 1.07 },
      emotional:  { rateDelta:  0.02, pitch: 1.06 },
      serious:    { rateDelta: -0.06, pitch: 0.90 },
      happy:      { rateDelta:  0.05, pitch: 1.08 },
      excited:    { rateDelta:  0.10, pitch: 1.15 },
      concerned:  { rateDelta: -0.04, pitch: 0.94 },
    };
    return map[mood] || map.normal;
  }

  // 句子的情绪色彩：场景氛围 + 标点 + 常见情绪词，避免整段一个调子干读
  var TONE_HAPPY_RE = /\b(wow|great|hooray|yay|amazing|wonderful|nice|delicious|love|lovely|happy|fun|thank you|thanks)\b/i;
  var TONE_URGENT_RE = /\b(hurry|quick|come on|look out|watch out|stop|wait|oh no)\b/i;
  var TONE_SAD_RE = /\b(sorry|sad|unfortunately|afraid|miss you)\b/i;
  var TONE_SURPRISE_RE = /^(oh|wow|ah|hey|really)\b/i;

  function sentenceTone(text, mood) {
    var tone = getMoodTone(mood);
    var t = String(text || '').trim();
    var rate = tone.rateDelta;
    var pitch = tone.pitch;
    if (/[!！]\s*$/.test(t)) { rate += 0.07; pitch += 0.07; }
    else if (/[?？]\s*$/.test(t)) { rate += 0.01; pitch += 0.05; }
    else if (/(\.\.\.|…)/.test(t)) { rate -= 0.07; pitch -= 0.03; }
    if (TONE_HAPPY_RE.test(t)) { rate += 0.04; pitch += 0.05; }
    else if (TONE_URGENT_RE.test(t)) { rate += 0.08; pitch += 0.04; }
    else if (TONE_SAD_RE.test(t)) { rate -= 0.05; pitch -= 0.05; }
    else if (TONE_SURPRISE_RE.test(t)) { pitch += 0.05; }
    return {
      rateDelta: Math.min(0.2, Math.max(-0.16, rate)),
      pitch: Math.min(1.28, Math.max(0.8, pitch))
    };
  }

  // 句间停顿也跟着语气走：感叹句紧一点，迟疑句留白长一点
  function lineGap(text, base) {
    var t = String(text || '').trim();
    if (/(\.\.\.|…)/.test(t)) return base + 300;
    if (/[!！]\s*$/.test(t)) return Math.max(180, base - 160);
    if (/[?？]\s*$/.test(t)) return Math.max(220, base - 80);
    return base;
  }

  /* ============ 中文显示开关（全局，只影响中文） ============ */
  var KEY_HIDE_ZH = 'flashcard:hideZh';
  var hideZh = readStore(KEY_HIDE_ZH) !== '0';

  function applyZhPreference() {
    document.body.classList.toggle('hide-zh', hideZh);
    var btn = document.getElementById('zh-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', hideZh ? 'false' : 'true');
      btn.setAttribute('title', hideZh ? '中文已隐藏，点击显示' : '中文已显示，点击隐藏');
      btn.setAttribute('data-on', hideZh ? 'off' : 'on');
    }
  }

  function toggleZh() {
    hideZh = !hideZh;
    writeStore(KEY_HIDE_ZH, hideZh ? '1' : '0');
    applyZhPreference();
  }

  /* ============ Common player factory ============ */
  var PLAYERS = [];

  function createPlayer(config) {
    var list = Array.isArray(config.items) ? config.items : [];
    if (!list.length || !config.tabsEl || !config.panelEl) return null;
    var tabs = {};
    var state2 = { id: '', item: null, playing: false, audioActive: false, token: 0, lines: [], lineEls: [], playBtn: null };

    function buildTabs() {
      var frag = document.createDocumentFragment();
      list.forEach(function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pill';
        btn.dataset[config.tabData] = item.id;
        btn.style.setProperty('--cat', item.color);
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('aria-controls', config.panelEl.id);
        var icon = document.createElement('span');
        icon.className = 'pill-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = item.icon;
        var zh = document.createElement('span'); zh.className = 'pill-zh'; zh.textContent = item.zh;
        var en = document.createElement('span'); en.className = 'pill-en'; en.textContent = item.en;
        btn.appendChild(icon); btn.appendChild(zh); btn.appendChild(en);
        btn.addEventListener('click', function () {
          if (state2.id === item.id) return;
          var autoplay = state2.playing ? 'speech' : (state2.audioActive ? 'audio' : '');
          stop(); render(item.id, autoplay);
        });
        frag.appendChild(btn);
        tabs[item.id] = btn;
      });
      config.tabsEl.appendChild(frag);
    }

    function syncTabs() {
      Object.keys(tabs).forEach(function (id) {
        var isActive = id === state2.id;
        tabs[id].classList.toggle('is-active', isActive);
        tabs[id].setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function appendWithNotes(container, text, notes) {
      appendAnnotated(container, text, notes, true);
    }

    function render(id, autoplay) {
      var item = list.find(function (s) { return s.id === id; }) || list[0];
      if (!item) return;
      state2.id = item.id;
      state2.item = item;
      state2.lines = item.lines || [];
      state2.cast = null;
      state2.castSig = '';
      state2.lineEls = [];
      state2.playing = false;
      state2.audioActive = false;
      state2.token += 1;
      var panel = config.panelEl;
      if (state2.audioEl) { try { state2.audioEl.pause(); } catch (e) {} state2.audioEl = null; }
      panel.textContent = '';
      panel.style.setProperty('--cat', item.color);

      var top = document.createElement('div'); top.className = 'scene-top';
      var icon = document.createElement('span'); icon.className = 'scene-icon';
      icon.setAttribute('aria-hidden', 'true'); icon.textContent = item.icon;
      var meta = document.createElement('div'); meta.className = 'scene-meta';
      var title = document.createElement('h3'); title.className = 'scene-title';
      var titleZh = document.createElement('span'); titleZh.className = 'zh-aux'; titleZh.textContent = item.zh;
      var titleEn = document.createElement('span'); titleEn.textContent = item.en;
      var sep = document.createElement('span'); sep.className = 'title-sep'; sep.textContent = ' · ';
      title.appendChild(titleZh); title.appendChild(sep); title.appendChild(titleEn);
      var desc = document.createElement('p'); desc.className = 'scene-desc zh-aux';
      desc.textContent = item.desc;
      meta.appendChild(title); meta.appendChild(desc);
      var actions = document.createElement('div'); actions.className = 'scene-actions';
      var playBtn = null;
      if (state2.lines.length) {
        playBtn = document.createElement('button');
        playBtn.type = 'button'; playBtn.className = 'play-btn';
        playBtn.textContent = config.playLabel;
        playBtn.addEventListener('click', togglePlayback);
        actions.appendChild(playBtn);
      }
      top.appendChild(icon); top.appendChild(meta); top.appendChild(actions);

      // 音频播放器（歌谣页）
      if (config.audio && item.audio) {
        var audioWrap = document.createElement('div');
        audioWrap.className = 'audio-card';
        var audio = document.createElement('audio');
        audio.controls = true;
        audio.preload = 'metadata';
        audio.src = item.audio;
        audio.className = 'audio-player';
        state2.audioEl = audio;
        audio.addEventListener('error', function () {
          showCompatTip('audio');
        });
        audio.addEventListener('play', function () {
          state2.audioActive = true;
          try { synth.cancel(); } catch (e) {}
          PLAYERS.forEach(function (p) { if (p !== api) p.stop(); });
        });
        audio.addEventListener('pause', function () {
          if (audio.ended) return;
          state2.audioActive = false;
        });
        audio.addEventListener('ended', function () {
          state2.audioActive = false;
        });
        audioWrap.appendChild(audio);
        panel.appendChild(audioWrap);
      }

      var listEl = document.createElement('ol'); listEl.className = 'dialog';
      state2.lines.forEach(function (line) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'line';
        btn.setAttribute('aria-label', '播放 ' + (line.who ? line.who + '：' : '') + line.en);
        if (line.who) {
          var who = document.createElement('span');
          who.className = 'line-who'; who.textContent = line.who;
          btn.appendChild(who);
        }
        var en = document.createElement('span');
        en.className = 'line-en'; en.lang = 'en';
        appendWithNotes(en, line.en, line.notes);
        var zh = document.createElement('span');
        zh.className = 'line-zh'; zh.textContent = line.zh;
        btn.appendChild(en); btn.appendChild(zh);
        btn.addEventListener('click', function () {
          if (state2.playing) stop();
          var cast = getSceneCast(state2);
          speak(line.en, btn, line.who ? cast[line.who] : null, sentenceTone(line.en, item.mood));
        });
        li.appendChild(btn);
        listEl.appendChild(li);
        state2.lineEls.push(btn);
      });
      state2.playBtn = playBtn;
      panel.appendChild(top);
      if (state2.lines.length) {
        panel.appendChild(listEl);
      } else {
        var note = document.createElement('p');
        note.className = 'audio-note';
        var noteIcon = document.createElement('span');
        noteIcon.setAttribute('aria-hidden', 'true');
        noteIcon.textContent = '🎧';
        note.appendChild(noteIcon);
        note.appendChild(document.createTextNode(
          item.note || '纯享版 · 暂无歌词，先听旋律磨耳朵'
        ));
        panel.appendChild(note);
      }
      syncTabs();
      if (autoplay === 'audio' && state2.audioEl) {
        try {
          var p = state2.audioEl.play();
          if (p && typeof p.catch === 'function') {
            p.catch(function (err) {
              if (err && err.name === 'NotAllowedError') showCompatTip('autoplay');
              else showCompatTip('audio');
            });
          }
        } catch (e) { showCompatTip('audio'); }
      } else if (autoplay === 'speech' && state2.lines.length) {
        startPlayback();
      }
    }

    function clearLineHighlight() {
      state2.lineEls.forEach(function (el) { el.classList.remove('is-speaking'); });
    }
    function updatePlayBtn() {
      if (!state2.playBtn) return;
      state2.playBtn.textContent = state2.playing ? '■ 停止' : config.playLabel;
      state2.playBtn.classList.toggle('is-playing', state2.playing);
    }
    function stop() {
      var wasPlaying = state2.playing;
      state2.playing = false;
      state2.audioActive = false;
      state2.token += 1;
      clearLineHighlight();
      updatePlayBtn();
      if (state2.audioEl) { try { state2.audioEl.pause(); } catch (e) {} }
      if (!wasPlaying) return;
      if (speakTimer) { window.clearTimeout(speakTimer); speakTimer = null; }
      try { synth.cancel(); } catch (e) {}
    }
    function finishPlayback() {
      state2.playing = false;
      state2.token += 1;
      clearLineHighlight();
      updatePlayBtn();
    }
    function togglePlayback() {
      if (state2.playing) { stop(); return; }
      if (!canSpeak()) { showCompatTip('failed'); return; }
      PLAYERS.forEach(function (p) { if (p !== api) p.stop(); });
      if (state2.audioEl) { try { state2.audioEl.pause(); } catch (e) {} }
      startPlayback();
    }
    function startPlayback() {
      var lines = state2.lines;
      var els = state2.lineEls;
      if (!lines.length) return;
      state2.playing = true;
      var token = (state2.token += 1);
      var index = 0;
      var rate = state2.item && state2.item.rate ? state2.item.rate : config.rate;
      var mood = state2.item && state2.item.mood ? state2.item.mood : 'normal';
      var cast = getSceneCast(state2);
      updatePlayBtn();
      function next() {
        if (token !== state2.token || !state2.playing) return;
        if (index >= lines.length) { finishPlayback(); return; }
        var current = index; index += 1;
        clearLineHighlight();
        if (els[current]) els[current].classList.add('is-speaking');
        var line = lines[current];
        var entry = line.who ? cast[line.who] : null;
        var tone = sentenceTone(line.en, mood);
        var utter = new window.SpeechSynthesisUtterance(line.en);
        utter.lang = 'en-GB';
        applyCastVoice(utter, entry);
        var lineRate = (rate + tone.rateDelta) * (entry && entry.rate ? entry.rate : 1);
        var linePitch = tone.pitch * (entry && entry.pitch ? entry.pitch : 1);
        utter.rate = Math.min(2, Math.max(0.1, lineRate));
        utter.pitch = Math.min(1.45, Math.max(0.1, linePitch));
        utter.onend = function () {
          if (token !== state2.token) return;
          window.setTimeout(next, lineGap(line.en, config.gap));
        };
        utter.onerror = function (ev) {
          if (token !== state2.token) return;
          markVoiceFailed(utter.voice, ev && ev.error ? ev.error : '');
          finishPlayback();
        };
        try { synth.speak(utter); } catch (e) { finishPlayback(); }
      }
      window.setTimeout(next, 120);
    }

    var api = { buildTabs: buildTabs, render: render, stop: stop };
    PLAYERS.push(api);
    return api;
  }

  /* ============ SCENES TAB ============ */
  var sceneTabsEl = document.getElementById('scene-tabs');
  var scenePanelEl = document.getElementById('scene-panel');
  var sceneTotalEl = document.getElementById('scene-total');
  var sceneGroup = 'all';

  document.querySelectorAll('[data-scene-group]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-scene-group]').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      sceneGroup = btn.dataset.sceneGroup;
      initScenePlayer();
    });
  });

  function getFilteredScenes() {
    if (sceneGroup === 'all') return SCENES;
    return SCENES.filter(function (s) { return getSceneGroup(s.id) === sceneGroup; });
  }

  function initScenePlayer() {
    if (sceneTabsEl) sceneTabsEl.textContent = '';
    if (scenePanelEl) scenePanelEl.textContent = '';
    // Keep PLAYERS but only clear scene players
    PLAYERS = PLAYERS.filter(function (p) { return p._type !== 'scene'; });
    var scenes = getFilteredScenes();
    var scenePlayer = createPlayer({
      items: scenes,
      tabsEl: sceneTabsEl,
      panelEl: scenePanelEl,
      tabData: 'scene',
      playLabel: '▶ 播放全部',
      rate: 0.85,
      gap: 500,
    });
    if (scenePlayer) {
      scenePlayer._type = 'scene';
      scenePlayer.buildTabs();
      scenePlayer.render(scenes[0] ? scenes[0].id : '');
    }
    if (sceneTotalEl) sceneTotalEl.textContent = String(scenes.length);
  }

  /* ============ SONGS TAB — 本地音频 + 歌词跟读 ============ */
  var songTabsEl = document.getElementById('song-tabs');
  var songPanelEl = document.getElementById('song-panel');
  var songTotalEl = document.getElementById('song-total');

  function stopAllAudio() {
    document.querySelectorAll('audio').forEach(function (a) {
      try { a.pause(); } catch (e) {}
    });
  }

  function initSongPlayer() {
    if (songTabsEl) songTabsEl.textContent = '';
    if (songPanelEl) songPanelEl.textContent = '';
    PLAYERS = PLAYERS.filter(function (p) { return p._type !== 'song'; });
    var songs = SONGS;
    var songPlayer = createPlayer({
      items: songs,
      tabsEl: songTabsEl,
      panelEl: songPanelEl,
      tabData: 'song',
      playLabel: '▶ 朗读歌词',
      rate: 0.78,
      gap: 420,
      audio: true,
    });
    if (songPlayer) {
      songPlayer._type = 'song';
      songPlayer.buildTabs();
      songPlayer.render(songs[0] ? songs[0].id : '');
    }
    if (songTotalEl) songTotalEl.textContent = String(songs.length);
    var songTabCount = document.getElementById('tab-songs-count');
    if (songTabCount) songTabCount.textContent = String(songs.length);
  }

  /* ============ STORIES TAB ============ */
  var storyTabsEl = document.getElementById('story-tabs');
  var storyPanelEl = document.getElementById('story-panel');
  var storyTotalEl = document.getElementById('story-total');
  var storyPlayers = [];

  function initStoryPlayer() {
    if (storyTabsEl) storyTabsEl.textContent = '';
    if (storyPanelEl) storyPanelEl.textContent = '';
    storyPlayers = [];
    var stories = STORIES;
    if (storyTotalEl) storyTotalEl.textContent = String(stories.length);
    var storyTabCount = document.getElementById('tab-stories-count');
    if (storyTabCount) storyTabCount.textContent = String(stories.length);

    var storyTabs = {};
    var storyState = { id: '', item: null, playing: false, token: 0, sentences: [], sentenceEls: [], playBtn: null, currentIdx: 0, cast: null, castSig: '' };

    function buildTabs() {
      var frag = document.createDocumentFragment();
      stories.forEach(function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pill';
        btn.dataset.story = item.id;
        btn.style.setProperty('--cat', item.color);
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', 'false');
        var icon = document.createElement('span');
        icon.className = 'pill-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = item.icon;
        var zh = document.createElement('span'); zh.className = 'pill-zh'; zh.textContent = item.zh;
        var en = document.createElement('span'); en.className = 'pill-en'; en.textContent = item.en;
        btn.appendChild(icon); btn.appendChild(zh); btn.appendChild(en);
        btn.addEventListener('click', function () {
          if (storyState.id === item.id) return;
          var wasPlaying = storyState.playing;
          stopStory(); renderStory(item.id, wasPlaying);
        });
        frag.appendChild(btn);
        storyTabs[item.id] = btn;
      });
      storyTabsEl.appendChild(frag);
    }

    function syncTabs() {
      Object.keys(storyTabs).forEach(function (id) {
        var isActive = id === storyState.id;
        storyTabs[id].classList.toggle('is-active', isActive);
        storyTabs[id].setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function stopStory() {
      storyState.playing = false;
      storyState.token += 1;
      storyState.sentenceEls.forEach(function (el) { el.classList.remove('is-speaking'); });
      if (storyState.playBtn) {
        storyState.playBtn.textContent = '▶ 朗读故事';
        storyState.playBtn.classList.remove('is-playing');
      }
      if (storySpeakTimer) { clearTimeout(storySpeakTimer); storySpeakTimer = null; }
      try { synth.cancel(); } catch (e) {}
    }

    var storySpeakTimer = null;
    var storyErrors = 0;

    function renderStory(id, autoplay) {
      var item = stories.find(function (s) { return s.id === id; }) || stories[0];
      if (!item) return;
      stopStory();
      storyState.id = item.id;
      storyState.item = item;
      storyState.sentences = item.sentences;
      storyState.cast = null;
      storyState.castSig = '';
      storyState.sentenceEls = [];
      storyState.playing = false;
      storyState.currentIdx = 0;
      storyState.token += 1;

      var panel = storyPanelEl;
      panel.textContent = '';
      panel.style.setProperty('--cat', item.color);

      var top = document.createElement('div'); top.className = 'scene-top';
      var icon = document.createElement('span'); icon.className = 'scene-icon';
      icon.setAttribute('aria-hidden', 'true'); icon.textContent = item.icon;
      var meta = document.createElement('div'); meta.className = 'scene-meta';
      var title = document.createElement('h3'); title.className = 'scene-title';
      var titleZh = document.createElement('span'); titleZh.className = 'zh-aux'; titleZh.textContent = item.zh;
      var titleEn = document.createElement('span'); titleEn.textContent = item.en;
      var sep = document.createElement('span'); sep.className = 'title-sep'; sep.textContent = ' · ';
      title.appendChild(titleZh); title.appendChild(sep); title.appendChild(titleEn);
      var desc = document.createElement('p'); desc.className = 'scene-desc zh-aux';
      desc.textContent = item.desc;
      meta.appendChild(title); meta.appendChild(desc);
      var actions = document.createElement('div'); actions.className = 'scene-actions';
      var playBtn = document.createElement('button');
      playBtn.type = 'button'; playBtn.className = 'play-btn';
      playBtn.textContent = '▶ 朗读故事';
      playBtn.addEventListener('click', toggleStoryPlayback);
      actions.appendChild(playBtn);
      top.appendChild(icon); top.appendChild(meta); top.appendChild(actions);

      var listEl = document.createElement('ol'); listEl.className = 'dialog';
      item.sentences.forEach(function (sent, idx) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'line story-line';
        btn.setAttribute('aria-label', '播放第 ' + (idx + 1) + ' 句');
        var en = document.createElement('span');
        en.className = 'line-en'; en.lang = 'en';
        appendAnnotated(en, sent.en, STORY_GLOSSARY, false);
        var zh = document.createElement('span');
        zh.className = 'line-zh'; zh.textContent = sent.zh;
        btn.appendChild(en); btn.appendChild(zh);
        btn.addEventListener('click', function () {
          stopStory();
          PLAYERS.forEach(function (p) { if (p._type !== 'story') p.stop(); });
          stopAllAudio();
          storyState.currentIdx = idx;
          storyState.playing = true;
          storySpeakTimer = setTimeout(function () { playNextSentence(idx); }, 90);
        });
        li.appendChild(btn);
        listEl.appendChild(li);
        storyState.sentenceEls.push(btn);
      });
      storyState.playBtn = playBtn;
      panel.appendChild(top);
      panel.appendChild(listEl);
      syncTabs();
      if (autoplay) startStoryPlayback();
    }

    function storyFinish() {
      storyState.playing = false;
      storyState.sentenceEls.forEach(function (el) { el.classList.remove('is-speaking'); });
      if (storyState.playBtn) {
        storyState.playBtn.textContent = '▶ 朗读故事';
        storyState.playBtn.classList.remove('is-playing');
      }
    }

    function playNextSentence(idx) {
      var token = storyState.token;
      if (idx >= storyState.sentences.length) {
        storyFinish();
        return;
      }
      storyState.currentIdx = idx;
      storyState.sentenceEls.forEach(function (el, i) {
        el.classList.toggle('is-speaking', i === idx);
      });
      var sent = storyState.sentences[idx];
      var sig = voiceSignature();
      if (!storyState.cast || storyState.castSig !== sig) {
        storyState.cast = buildStoryCast(storyState.sentences, storyState.id);
        storyState.castSig = sig;
      }
      var cast = storyState.cast;
      var parts = splitStoryParts(sent.en);
      var dialogueKey = storyDialogueKey(sent.en, storyState.id);
      var partIndex = 0;

      function playPart() {
        if (token !== storyState.token || !storyState.playing) return;
        if (partIndex >= parts.length) {
          storyErrors = 0;
          storySpeakTimer = setTimeout(function () { playNextSentence(idx + 1); }, 620);
          return;
        }
        var part = parts[partIndex];
        partIndex += 1;
        var entry = part.quote ? cast[dialogueKey] : cast.narrator;
        var utter = new window.SpeechSynthesisUtterance(part.text);
        utter.lang = 'en-GB';
        applyCastVoice(utter, entry);
        var rate = 0.85 * (entry && entry.rate ? entry.rate : 1);
        var pitch = entry && entry.pitch ? entry.pitch : 1;
        // 感叹句、疑问句再抬一点语调，避免念得像说明书
        if (part.quote) {
          if (/[!！]$/.test(part.text)) { rate += 0.05; pitch += 0.06; }
          else if (/[?？]$/.test(part.text)) { rate += 0.02; pitch += 0.03; }
        }
        utter.rate = Math.min(1.5, Math.max(0.6, rate));
        utter.pitch = Math.min(1.8, Math.max(0.5, pitch));
        utter.onend = function () {
          if (token !== storyState.token || !storyState.playing) return;
          storySpeakTimer = setTimeout(playPart, part.quote ? 180 : 120);
        };
        utter.onerror = function (ev) {
          if (token !== storyState.token) return;
          markVoiceFailed(utter.voice, ev && ev.error ? ev.error : '');
          storyErrors += 1;
          if (storyErrors > 2) { markSpeechBroken(null); stopStory(); return; }
          storySpeakTimer = setTimeout(playPart, 80);
        };
        try { synth.speak(utter); } catch (e) { storySpeakTimer = setTimeout(playPart, 80); }
      }
      playPart();
    }

    function startStoryPlayback() {
      if (!canSpeak()) { showCompatTip('failed'); return; }
      PLAYERS.forEach(function (p) { if (p._type !== 'story') p.stop(); });
      stopAllAudio();
      storyState.playing = true;
      storyState.token += 1;
      storyErrors = 0;
      storyState.castSig = voiceSignature();
      storyState.cast = buildStoryCast(storyState.sentences, storyState.id);
      var token = storyState.token;
      if (storyState.playBtn) {
        storyState.playBtn.textContent = '■ 停止';
        storyState.playBtn.classList.add('is-playing');
      }
      // 先读故事标题，再读正文
      var startBody = function () {
        if (token !== storyState.token || !storyState.playing) return;
        storySpeakTimer = setTimeout(function () { playNextSentence(0); }, 450);
      };
      var titleUtter = new window.SpeechSynthesisUtterance(storyState.item ? storyState.item.en : '');
      titleUtter.lang = 'en-GB';
      var titleEntry = storyState.cast.narrator;
      applyCastVoice(titleUtter, titleEntry);
      titleUtter.rate = 0.85 * (titleEntry && titleEntry.rate ? titleEntry.rate : 1);
      // 华为/微信内核可能接口存在但永远不触发 start/end，超时后提示并停止
      var titleStarted = false;
      var titleWatch = window.setTimeout(function () {
        if (titleStarted || token !== storyState.token || !storyState.playing) return;
        markSpeechBroken(null);
        stopStory();
      }, Math.max(2400, speechStartTimeout()));
      var clearTitleWatch = function () {
        titleStarted = true;
        window.clearTimeout(titleWatch);
      };
      titleUtter.onstart = clearTitleWatch;
      titleUtter.onend = function () { clearTitleWatch(); startBody(); };
      titleUtter.onerror = function (ev) { markVoiceFailed(titleUtter.voice, ev && ev.error ? ev.error : ''); clearTitleWatch(); startBody(); };
      try { synth.speak(titleUtter); } catch (e) { clearTitleWatch(); startBody(); }
    }

    function toggleStoryPlayback() {
      if (storyState.playing) { stopStory(); return; }
      startStoryPlayback();
    }

    var api = { buildTabs: buildTabs, render: renderStory, stop: stopStory };
    api._type = 'story';
    storyPlayers.push(api);
    PLAYERS.push(api);
    return api;
  }

  function initStories() {
    var player = initStoryPlayer();
    if (player) {
      player.buildTabs();
      player.render(STORIES[0] ? STORIES[0].id : '');
    }
  }

  /* ============ GAMES TAB ============ */
  var gameArea = document.getElementById('game-area');
  var gamePrompt = document.getElementById('game-prompt');
  var gameWord = document.getElementById('game-word');
  var gameContext = document.getElementById('game-context');
  var gameOptions = document.getElementById('game-options');
  var gameFeedback = document.getElementById('game-feedback');
  var gameScoreboard = document.getElementById('game-scoreboard');
  var gameStartBtn = document.getElementById('game-start');
  var gameRestartBtn = document.getElementById('game-restart');
  var gameModeSelect = document.getElementById('game-mode');
  var gameCatSelect = document.getElementById('game-cat');
  var gameCorrectEl = document.getElementById('game-correct');
  var gameTotalEl2 = document.getElementById('game-total');
  var gameStreakEl = document.getElementById('game-streak');
  var tabGamesScore = document.getElementById('tab-games-score');

  var game = { mode: 'en-zh', cat: 'all', queue: [], index: 0, correct: 0, total: 0, streak: 0, maxStreak: 0, active: false };

  if (gameCatSelect) {
    var optAll = document.createElement('option');
    optAll.value = 'all'; optAll.textContent = '全部分类';
    gameCatSelect.appendChild(optAll);
    CATEGORIES.forEach(function (cat) {
      var opt = document.createElement('option');
      opt.value = cat.id; opt.textContent = cat.icon + ' ' + cat.zh;
      gameCatSelect.appendChild(opt);
    });
  }

  function getGamePool() {
    var cats = game.cat === 'all' ? CATEGORIES : CATEGORIES.filter(function (c) { return c.id === game.cat; });
    var pool = [];
    cats.forEach(function (cat) {
      cat.words.forEach(function (w) {
        if (!wordPassesGrade(w)) return;
        pool.push(Object.assign({}, w, { cat: cat.zh, catId: cat.id, catColor: cat.color }));
      });
    });
    return pool;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startGame() {
    var pool = getGamePool();
    if (pool.length < 4) { alert('该分类单词不足，请选择其他分类'); return; }
    game.mode = gameModeSelect ? gameModeSelect.value : 'en-zh';
    game.queue = shuffle(pool).slice(0, 20);
    game.index = 0; game.correct = 0; game.total = 0;
    game.streak = 0; game.maxStreak = 0; game.active = true;
    if (gameScoreboard) gameScoreboard.hidden = true;
    if (gameArea) gameArea.hidden = false;
    updateGameStats();
    showQuestion();
  }

  function showQuestion() {
    if (!game.active || game.index >= game.queue.length) { endGame(); return; }
    var q = game.queue[game.index];
    if (gameFeedback) gameFeedback.hidden = true;
    if (gameOptions) gameOptions.textContent = '';
    if (gameWord) gameWord.textContent = game.mode === 'en-zh' ? q.en : q.zh;
    if (gameContext) {
      gameContext.textContent = game.mode === 'en-zh'
        ? '听发音，选出正确的中文意思'
        : '看中文，选出正确的英文单词';
    }
    if (gameWord) gameWord.lang = game.mode === 'en-zh' ? 'en' : 'zh';

    var fullPool = getGamePool();
    var labelKey = game.mode === 'en-zh' ? 'zh' : 'en';
    // 优先用同分类词做干扰项，更像教材里的同类词练习
    var sameCat = fullPool.filter(function (w) { return w.catId === q.catId; });
    var candidates = shuffle(sameCat).concat(shuffle(fullPool));
    var used = {};
    used[game.mode === 'en-zh' ? q.zh : q.en] = 1;
    var opts = [];
    for (var i = 0; i < candidates.length && opts.length < 3; i++) {
      var val = candidates[i][labelKey];
      if (!val || used[val]) continue;
      used[val] = 1;
      opts.push(val);
    }
    opts.push(game.mode === 'en-zh' ? q.zh : q.en);
    opts = shuffle(opts);

    opts.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'game-opt';
      btn.textContent = opt;
      btn.addEventListener('click', function () { checkAnswer(opt); });
      if (gameOptions) gameOptions.appendChild(btn);
    });

    if (game.mode === 'en-zh') {
      if (!canSpeak()) {
        showCompatTip('failed');
      } else {
        var u = new window.SpeechSynthesisUtterance(q.en);
        u.lang = 'en-GB'; applyVoice(u); u.rate = 0.8;
        var heard = false;
        var gameWatch = window.setTimeout(function () {
          if (!heard && canSpeak()) markSpeechBroken(null);
        }, speechStartTimeout());
        var done = function () { heard = true; window.clearTimeout(gameWatch); };
        u.onstart = done;
        u.onend = done;
        u.onerror = done;
        try { synth.speak(u); } catch (e) { window.clearTimeout(gameWatch); markSpeechBroken(null); }
      }
    }
  }

  function checkAnswer(selected) {
    if (!game.active) return;
    var q = game.queue[game.index];
    var correct = game.mode === 'en-zh' ? q.zh : q.en;
    game.total++;
    var isCorrect = selected === correct;
    if (isCorrect) {
      game.correct++; game.streak++;
      if (game.streak > game.maxStreak) game.maxStreak = game.streak;
    } else { game.streak = 0; }
    // Highlight buttons
    var allBtns = gameOptions ? gameOptions.querySelectorAll('.game-opt') : [];
    allBtns.forEach(function (b) {
      if (b.textContent === correct) b.classList.add('correct');
      else if (b.textContent === selected && !isCorrect) b.classList.add('wrong');
    });
    updateGameStats();
    if (gameFeedback) {
      gameFeedback.hidden = false;
      gameFeedback.textContent = isCorrect ? '✓ 正确！' : '✗ 正确答案：' + correct;
      gameFeedback.className = 'game-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-wrong');
    }
    setTimeout(function () {
      game.index++;
      showQuestion();
    }, isCorrect ? 800 : 1500);
  }

  function updateGameStats() {
    if (gameCorrectEl) gameCorrectEl.textContent = game.correct;
    if (gameTotalEl2) gameTotalEl2.textContent = game.total;
    if (gameStreakEl) gameStreakEl.textContent = game.streak;
    if (tabGamesScore) tabGamesScore.textContent = game.total > 0 ? game.streak + '🔥' : '0';
  }

  function endGame() {
    game.active = false;
    if (gameArea) gameArea.hidden = true;
    if (gameScoreboard) {
      gameScoreboard.hidden = false;
      var pct = game.total > 0 ? Math.round(game.correct / game.total * 100) : 0;
      var pctEl = document.getElementById('score-pct');
      var streakEl = document.getElementById('score-streak');
      if (pctEl) pctEl.textContent = pct;
      if (streakEl) streakEl.textContent = game.maxStreak;
    }
    var prev = parseInt(readStore(KEY_GAME_SCORE) || '0', 10);
    if (game.total > 0) writeStore(KEY_GAME_SCORE, String(Math.max(prev, game.correct)));
  }

  if (gameStartBtn) gameStartBtn.addEventListener('click', startGame);
  if (gameRestartBtn) gameRestartBtn.addEventListener('click', startGame);

  /* ============ Jump to games ============ */
  var jumpGamesBtn = document.getElementById('jump-games');
  if (jumpGamesBtn) {
    jumpGamesBtn.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      var g = document.querySelector('[data-tab="games"]');
      var gp = document.getElementById('tab-games');
      if (g) g.classList.add('active');
      if (gp) gp.classList.add('active');
    });
  }

  /* ============ INIT ============ */
  function init() {
    buildCatNav(); syncPills(); syncGradePills(); renderWords();
    var hash = String(window.location.hash || '').replace(/^#\/?/, '');
    var saved = readStore(KEY_CATEGORY);
    var initial = findCategory(hash) || findCategory(saved) || CATEGORIES[0];
    state.activeId = initial.id;
    updateHash(initial.id);
    buildCatNav(); syncPills(); renderWords();
    syncThemeUi(currentTheme());
    initCompat();
    initScenePlayer();
    initSongPlayer();
    initStories();
    // 全局中文开关（只影响中文，英文与音标始终显示）
    var zhToggle = document.getElementById('zh-toggle');
    if (zhToggle) zhToggle.addEventListener('click', toggleZh);
    applyZhPreference();
    window.addEventListener('hashchange', function () {
      var cat = findCategory(hash);
      if (cat && cat.id !== state.activeId) {
        state.activeId = cat.id;
        writeStore(KEY_CATEGORY, cat.id);
        buildCatNav(); syncPills(); renderWords();
      }
    });
    window.addEventListener('pagehide', function () {
      if (synth && synth.speaking) synth.cancel();
      stopAllAudio();
    });
  }

  init();

  // 自动化回归用：?debug=cast 时暴露角色分音结果，正常访问不生效
  if (/[?&]debug=cast\b/.test(window.location.search)) {
    window.__castDebug = {
      scene: function (id) {
        var scene = (window.DIALOGUE_SCENES || []).filter(function (s) { return s.id === id; })[0];
        return scene ? buildSceneCast(scene.lines) : null;
      },
      story: function (id) {
        var story = (window.STORY_LIBRARY || []).filter(function (s) { return s.id === id; })[0];
        return story ? buildStoryCast(story.sentences, story.id) : null;
      },
      voiceSignature: voiceSignature,
      tone: sentenceTone
    };
  }
})();
