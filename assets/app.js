/**
 * 英文闪卡园 · 交互逻辑（无依赖、无构建）
 * - 5 Tab：单词 / 情景 / 音乐 / 故事会 / 游戏
 * - 单词按学校/生活/拓展分组排序
 * - 场景对话 & 英文歌谣播放器（Web Audio 旋律 + 文字跟读）
 * - 故事会：逐句朗读，支持单句/连续播放
 * - 互动游戏：听音选词 + 看中文选英文
 * - 深浅色主题，记忆在 localStorage
 */
(function () {
  'use strict';

  var CATEGORIES = Array.isArray(window.WORD_CATEGORIES) ? window.WORD_CATEGORIES : [];
  var SCENES = Array.isArray(window.DIALOGUE_SCENES) ? window.DIALOGUE_SCENES : [];
  var SONGS = Array.isArray(window.SONG_LIBRARY) ? window.SONG_LIBRARY : [];
  var STORIES = Array.isArray(window.STORY_LIBRARY) ? window.STORY_LIBRARY : [];

  if (!CATEGORIES.length) return;

  var KEY_THEME = 'flashcard:theme';
  var KEY_CATEGORY = 'flashcard:category';
  var KEY_GAME_SCORE = 'flashcard:gameScore';

  var rootEl = document.documentElement;
  var synth = window.speechSynthesis;
  var supportsSpeech = !!synth && typeof window.SpeechSynthesisUtterance === 'function';

  /* ============ Category context tags ============ */
  var SCHOOL_IDS = ['stationery','food','colors','measure','jobs','time','weather','seasons','sports-general'];
  var LIFE_IDS   = ['body','health','clothing','transport','shopping','rooms','tools','furniture','kitchenware'];

  function getCategoryGroup(id) {
    if (SCHOOL_IDS.indexOf(id) !== -1) return 'school';
    if (LIFE_IDS.indexOf(id) !== -1)  return 'life';
    return 'fun';
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

  var state = { activeId: CATEGORIES[0].id, group: 'all' };
  var pills = {};

  function getFilteredCats() {
    if (state.group === 'all') return CATEGORIES;
    return CATEGORIES.filter(function (c) { return getCategoryGroup(c.id) === state.group; });
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
      count.textContent = cat.words.length;
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
    card.title = '点击播放发音：' + word.en;
    card.setAttribute('aria-label', '播放 ' + word.en + '（' + word.zh + '）的发音');
    var figure = document.createElement('span');
    figure.className = 'card-figure';
    var emoji = document.createElement('span');
    emoji.className = 'card-emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = word.icon;
    figure.appendChild(emoji);
    var body = document.createElement('span');
    body.className = 'card-body';
    var en = document.createElement('span');
    en.className = 'card-en'; en.lang = 'en'; en.textContent = word.en;
    var ipa = document.createElement('span');
    ipa.className = 'card-ipa'; ipa.lang = 'en'; ipa.textContent = word.ipa;
    var zh = document.createElement('span');
    zh.className = 'card-zh'; zh.textContent = word.zh;
    body.appendChild(en);
    body.appendChild(ipa);
    body.appendChild(zh);
    card.appendChild(figure);
    card.appendChild(body);
    card.addEventListener('click', function () { speak(word.en, card); });
    return card;
  }

  function renderWords() {
    var cat = findCategory(state.activeId) || CATEGORIES[0];
    var words = cat.words;
    rootEl.style.setProperty('--cat', cat.color);
    rootEl.style.setProperty('--ring', cat.color);
    gridEl.textContent = '';
    if (!words.length) {
      gridEl.hidden = true;
      emptyEl.hidden = false;
      emptyTextEl.textContent = '该分类暂无单词';
    } else {
      gridEl.hidden = false;
      emptyEl.hidden = true;
      var frag = document.createDocumentFragment();
      words.forEach(function (word, i) { frag.appendChild(createCard(word, cat, i)); });
      gridEl.appendChild(frag);
    }
    syncPills();
  }

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

  function speak(text, btn) {
    stopAllPlayback();
    if (!supportsSpeech) {
      btn.classList.add('is-speaking');
      window.setTimeout(function () { btn.classList.remove('is-speaking'); }, 500);
      return;
    }
    if (speakingBtn && speakingBtn !== btn) speakingBtn.classList.remove('is-speaking');
    speakingBtn = btn;
    btn.classList.add('is-speaking');
    if (speakTimer) { window.clearTimeout(speakTimer); speakTimer = null; }
    var utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    utter.onend = function () {
      btn.classList.remove('is-speaking');
      if (speakingBtn === btn) speakingBtn = null;
    };
    utter.onerror = utter.onend;
    var start = function () {
      try { synth.speak(utter); } catch (e) { btn.classList.remove('is-speaking'); }
    };
    if (synth.speaking || synth.pending) {
      synth.cancel();
      speakTimer = window.setTimeout(start, 60);
    } else { start(); }
  }

  function stopAllPlayback() {
    PLAYERS.forEach(function (p) { p.stop(); });
  }

  /* ============ MOOD TONES ============ */
  function getMoodTone(mood) {
    var map = {
      calm:       { rateDelta: -0.04, pitch: 0.93 },
      warm:       { rateDelta:  0.00, pitch: 1.00 },
      normal:     { rateDelta:  0.00, pitch: 1.00 },
      energetic:  { rateDelta:  0.06, pitch: 1.08 },
      wonder:     { rateDelta:  0.02, pitch: 1.10 },
      sleepy:     { rateDelta: -0.08, pitch: 0.88 },
      curious:    { rateDelta:  0.02, pitch: 1.06 },
      emotional:  { rateDelta:  0.03, pitch: 1.05 },
      serious:    { rateDelta: -0.05, pitch: 0.92 },
      happy:      { rateDelta:  0.04, pitch: 1.07 },
      excited:    { rateDelta:  0.08, pitch: 1.12 },
      concerned:  { rateDelta: -0.03, pitch: 0.95 },
    };
    return map[mood] || map.normal;
  }

  /* ============ 中文显示开关（全局，只影响中文） ============ */
  var KEY_HIDE_ZH = 'flashcard:hideZh';
  var hideZh = readStore(KEY_HIDE_ZH) !== '0';

  function applyZhPreference() {
    document.body.classList.toggle('hide-zh', hideZh);
    var btn = document.getElementById('zh-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', hideZh ? 'false' : 'true');
      btn.setAttribute('title', hideZh ? '当前隐藏中文，点击显示' : '当前显示中文，点击隐藏');
      btn.setAttribute('data-on', hideZh ? 'off' : 'on');
      var label = btn.querySelector('.zh-toggle-label');
      if (label) label.textContent = hideZh ? '显示中文' : '隐藏中文';
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
    var state2 = { id: '', item: null, playing: false, token: 0, lines: [], lineEls: [], playBtn: null };

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
          stop(); render(item.id);
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
      var words = notes ? Object.keys(notes) : [];
      if (!words.length) { container.textContent = text; return; }
      var values = {};
      words.forEach(function (word) { values[word.toLowerCase()] = notes[word]; });
      var pattern = words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
      var re = new RegExp('\\b(' + pattern + ')\\b', 'gi');
      var used = {};
      var last = 0, match;
      while ((match = re.exec(text)) !== null) {
        var lower = match[0].toLowerCase();
        if (used[lower] || !values[lower]) continue;
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

    function render(id) {
      var item = list.find(function (s) { return s.id === id; }) || list[0];
      if (!item) return;
      state2.id = item.id;
      state2.item = item;
      state2.lines = item.lines || [];
      state2.lineEls = [];
      state2.playing = false;
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
      var playBtn = document.createElement('button');
      playBtn.type = 'button'; playBtn.className = 'play-btn';
      playBtn.textContent = config.playLabel;
      playBtn.addEventListener('click', togglePlayback);
      actions.appendChild(playBtn);
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
        audio.addEventListener('play', function () {
          state2.audioEl = audio;
          PLAYERS.forEach(function (p) { if (p !== api) p.stop(); });
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
          speak(line.en, btn);
        });
        li.appendChild(btn);
        listEl.appendChild(li);
        state2.lineEls.push(btn);
      });
      state2.playBtn = playBtn;
      panel.appendChild(top);
      panel.appendChild(listEl);
      syncTabs();
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
      if (!supportsSpeech) return;
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
      var moodTone = getMoodTone(mood);
      updatePlayBtn();
      function next() {
        if (token !== state2.token || !state2.playing) return;
        if (index >= lines.length) { finishPlayback(); return; }
        var current = index; index += 1;
        clearLineHighlight();
        if (els[current]) els[current].classList.add('is-speaking');
        var utter = new window.SpeechSynthesisUtterance(lines[current].en);
        utter.lang = 'en-US';
        var lineRate = Math.min(2, Math.max(0.1, rate + moodTone.rateDelta));
        var linePitch = Math.min(2, Math.max(0, moodTone.pitch));
        utter.rate = lineRate;
        utter.pitch = linePitch;
        utter.onend = function () {
          if (token !== state2.token) return;
          window.setTimeout(next, config.gap);
        };
        utter.onerror = function () {
          if (token !== state2.token) return;
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
    var storyState = { id: '', item: null, playing: false, token: 0, sentences: [], sentenceEls: [], playBtn: null, currentIdx: 0 };

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
          stopStory(); renderStory(item.id);
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

    function renderStory(id) {
      var item = stories.find(function (s) { return s.id === id; }) || stories[0];
      if (!item) return;
      stopStory();
      storyState.id = item.id;
      storyState.item = item;
      storyState.sentences = item.sentences;
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
        en.textContent = sent.en;
        var zh = document.createElement('span');
        zh.className = 'line-zh'; zh.textContent = sent.zh;
        btn.appendChild(en); btn.appendChild(zh);
        btn.addEventListener('click', function () {
          stopStory();
          storyState.currentIdx = idx;
          storyState.playing = true;
          playNextSentence(idx);
        });
        li.appendChild(btn);
        listEl.appendChild(li);
        storyState.sentenceEls.push(btn);
      });
      storyState.playBtn = playBtn;
      panel.appendChild(top);
      panel.appendChild(listEl);
      syncTabs();
    }

    function playNextSentence(idx) {
      var token = storyState.token;
      if (idx >= storyState.sentences.length) {
        storyState.playing = false;
        if (storyState.playBtn) {
          storyState.playBtn.textContent = '▶ 朗读故事';
          storyState.playBtn.classList.remove('is-playing');
        }
        storyState.sentenceEls.forEach(function (el) { el.classList.remove('is-speaking'); });
        return;
      }
      storyState.currentIdx = idx;
      storyState.sentenceEls.forEach(function (el, i) {
        el.classList.toggle('is-speaking', i === idx);
      });
      var sent = storyState.sentences[idx];
      var utter = new window.SpeechSynthesisUtterance(sent.en);
      utter.lang = 'en-US';
      utter.rate = 0.82;
      utter.onend = function () {
        if (token !== storyState.token || !storyState.playing) return;
        storySpeakTimer = setTimeout(function () { playNextSentence(idx + 1); }, 600);
      };
      utter.onerror = function () {
        if (token !== storyState.token) return;
        playNextSentence(idx + 1);
      };
      try { synth.speak(utter); } catch (e) { playNextSentence(idx + 1); }
    }

    function toggleStoryPlayback() {
      if (storyState.playing) { stopStory(); return; }
      if (!supportsSpeech) return;
      // Stop other players
      PLAYERS.forEach(function (p) { if (p._type !== 'story') p.stop(); });
      stopAllAudio();
      storyState.playing = true;
      storyState.token += 1;
      if (storyState.playBtn) {
        storyState.playBtn.textContent = '■ 停止';
        storyState.playBtn.classList.add('is-playing');
      }
      playNextSentence(0);
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
      cat.words.forEach(function (w) { pool.push(Object.assign({}, w, { cat: cat.zh, catColor: cat.color })); });
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
    if (gameContext) gameContext.textContent = q.cat + '  ·  ' + q.icon;
    if (gameWord) gameWord.lang = game.mode === 'en-zh' ? 'en' : 'zh';

    var pool = getGamePool().filter(function (w) {
      return game.mode === 'en-zh' ? w.en !== q.en : w.zh !== q.zh;
    });
    var opts = shuffle(pool).slice(0, 3).map(function (w) {
      return game.mode === 'en-zh' ? w.zh : w.en;
    });
    opts.push(game.mode === 'en-zh' ? q.zh : q.en);
    opts = shuffle(opts);

    opts.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'game-opt';
      btn.textContent = opt;
      btn.addEventListener('click', function () { checkAnswer(opt); });
      if (gameOptions) gameOptions.appendChild(btn);
    });

    if (supportsSpeech && game.mode === 'en-zh') {
      var u = new window.SpeechSynthesisUtterance(q.en);
      u.lang = 'en-US'; u.rate = 0.8;
      synth.speak(u);
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
    buildCatNav(); syncPills(); renderWords();
    var hash = String(window.location.hash || '').replace(/^#\/?/, '');
    var saved = readStore(KEY_CATEGORY);
    var initial = findCategory(hash) || findCategory(saved) || CATEGORIES[0];
    state.activeId = initial.id;
    updateHash(initial.id);
    buildCatNav(); syncPills(); renderWords();
    syncThemeUi(currentTheme());
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
})();
