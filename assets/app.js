/**
 * 英文闪卡园 · 交互逻辑（无依赖、无构建）
 * - 分类切换 + 站内搜索 + hash 深链
 * - 点击卡片调用浏览器语音合成朗读
 * - 深浅色主题，记忆在 localStorage
 */
(function () {
  'use strict';

  var CATEGORIES = Array.isArray(window.WORD_CATEGORIES)
    ? window.WORD_CATEGORIES
    : [];

  if (!CATEGORIES.length) {
    return;
  }

  var KEY_THEME = 'flashcard:theme';
  var KEY_CATEGORY = 'flashcard:category';

  var rootEl = document.documentElement;
  var navEl = document.getElementById('category-nav');
  var gridEl = document.getElementById('grid');
  var emptyEl = document.getElementById('empty');
  var emptyTextEl = document.getElementById('empty-text');
  var catIconEl = document.getElementById('cat-icon');
  var catTitleEl = document.getElementById('cat-title');
  var catCountEl = document.getElementById('cat-count');
  var searchEl = document.getElementById('search');
  var searchWrapEl = searchEl.parentNode;
  var themeBtn = document.getElementById('theme-toggle');
  var totalEl = document.getElementById('total-count');
  var sceneTabsEl = document.getElementById('scene-tabs');
  var scenePanelEl = document.getElementById('scene-panel');
  var sceneTotalEl = document.getElementById('scene-total');
  var jumpScenesBtn = document.getElementById('jump-scenes');

  var state = { activeId: CATEGORIES[0].id, query: '' };
  var pills = {};
  var speakingBtn = null;
  var speakTimer = null;
  var synth = window.speechSynthesis;
  var supportsSpeech = !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  var inputTimer = null;

  /* ---------------- 存储 ---------------- */

  function readStore(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* 隐私模式或 file:// 限制，忽略即可 */
    }
  }

  /* ---------------- 工具 ---------------- */

  function getActive() {
    for (var i = 0; i < CATEGORIES.length; i += 1) {
      if (CATEGORIES[i].id === state.activeId) {
        return CATEGORIES[i];
      }
    }
    return CATEGORIES[0];
  }

  function findCategory(id) {
    for (var i = 0; i < CATEGORIES.length; i += 1) {
      if (CATEGORIES[i].id === id) {
        return CATEGORIES[i];
      }
    }
    return null;
  }

  function updateHash(id) {
    try {
      window.history.replaceState(null, '', '#' + id);
    } catch (e) {
      /* file:// 下部分浏览器不允许，忽略 */
    }
  }

  function hashId() {
    return String(window.location.hash || '').replace(/^#\/?/, '');
  }

  /* ---------------- 渲染：分类导航 ---------------- */

  function buildNav() {
    var frag = document.createDocumentFragment();

    CATEGORIES.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill';
      btn.dataset.id = cat.id;
      btn.style.setProperty('--cat', cat.color);
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', cat.zh + ' ' + cat.en);

      var icon = document.createElement('span');
      icon.className = 'pill-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = cat.icon;

      var zh = document.createElement('span');
      zh.textContent = cat.zh;

      var en = document.createElement('span');
      en.className = 'pill-en';
      en.textContent = cat.en;

      btn.appendChild(icon);
      btn.appendChild(zh);
      btn.appendChild(en);
      btn.addEventListener('click', function () {
        setCategory(cat.id, true);
      });

      frag.appendChild(btn);
      pills[cat.id] = btn;
    });

    navEl.appendChild(frag);
  }

  function syncPills() {
    Object.keys(pills).forEach(function (id) {
      var isActive = id === state.activeId;
      pills[id].classList.toggle('is-active', isActive);
      pills[id].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  /* ---------------- 渲染：卡片 ---------------- */

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
    en.className = 'card-en';
    en.lang = 'en';
    en.textContent = word.en;

    var ipa = document.createElement('span');
    ipa.className = 'card-ipa';
    ipa.lang = 'en';
    ipa.textContent = word.ipa;

    var zh = document.createElement('span');
    zh.className = 'card-zh';
    zh.textContent = word.zh;

    body.appendChild(en);
    body.appendChild(ipa);
    body.appendChild(zh);

    card.appendChild(figure);
    card.appendChild(body);

    card.addEventListener('click', function () {
      speak(word.en, card);
    });

    return card;
  }

  function matches(word, q) {
    return (
      word.en.toLowerCase().indexOf(q) !== -1 ||
      word.zh.indexOf(q) !== -1 ||
      word.ipa.toLowerCase().indexOf(q) !== -1
    );
  }

  function render() {
    var cat = getActive();
    var query = state.query.trim();
    var q = query.toLowerCase();
    var words = q ? cat.words.filter(function (w) { return matches(w, q); }) : cat.words;

    rootEl.style.setProperty('--cat', cat.color);
    rootEl.style.setProperty('--ring', cat.color);

    catIconEl.textContent = cat.icon;
    catTitleEl.textContent = cat.zh + ' · ' + cat.en;
    catCountEl.textContent = words.length + ' 词';

    gridEl.textContent = '';

    if (!words.length) {
      gridEl.hidden = true;
      emptyEl.hidden = false;
      emptyTextEl.textContent = '没有找到匹配“' + query + '”的单词';
    } else {
      gridEl.hidden = false;
      emptyEl.hidden = true;

      var frag = document.createDocumentFragment();
      words.forEach(function (word, index) {
        frag.appendChild(createCard(word, cat, index));
      });
      gridEl.appendChild(frag);
    }

    syncPills();
  }

  function setCategory(id, clearQuery) {
    if (!findCategory(id)) {
      return;
    }

    state.activeId = id;

    if (clearQuery) {
      state.query = '';
      searchEl.value = '';
      searchWrapEl.classList.remove('has-value');
    }

    writeStore(KEY_CATEGORY, id);
    updateHash(id);
    render();
  }

  /* ---------------- 发音 ---------------- */

  function speak(text, btn) {
    if (sceneState.playing) {
      stopPlayback();
    }

    if (!supportsSpeech) {
      btn.classList.add('is-speaking');
      window.setTimeout(function () {
        btn.classList.remove('is-speaking');
      }, 500);
      return;
    }

    if (speakingBtn && speakingBtn !== btn) {
      speakingBtn.classList.remove('is-speaking');
    }
    speakingBtn = btn;
    btn.classList.add('is-speaking');

    if (speakTimer) {
      window.clearTimeout(speakTimer);
      speakTimer = null;
    }

    var utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;

    utter.onend = function () {
      btn.classList.remove('is-speaking');
      if (speakingBtn === btn) {
        speakingBtn = null;
      }
    };
    utter.onerror = utter.onend;

    var start = function () {
      try {
        synth.speak(utter);
      } catch (e) {
        btn.classList.remove('is-speaking');
      }
    };

    if (synth.speaking || synth.pending) {
      // Chrome 在 cancel 后立刻 speak 偶尔不出声，稍微让出一帧
      synth.cancel();
      speakTimer = window.setTimeout(function () {
        speakTimer = null;
        start();
      }, 60);
    } else {
      start();
    }
  }

  /* ---------------- 搜索 ---------------- */

  function scheduleRender() {
    if (inputTimer) {
      window.clearTimeout(inputTimer);
    }
    // 输入防抖，避免连续敲键时反复重建卡片
    inputTimer = window.setTimeout(function () {
      inputTimer = null;
      render();
    }, 60);
  }

  searchEl.addEventListener('input', function () {
    state.query = searchEl.value;
    searchWrapEl.classList.toggle('has-value', searchEl.value.length > 0);
    scheduleRender();
  });

  document.addEventListener('keydown', function (event) {
    var active = document.activeElement;
    var typing =
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable);

    if (event.key === '/' && !typing) {
      event.preventDefault();
      searchEl.focus();
      searchEl.select();
      return;
    }

    if (event.key === 'Escape' && active === searchEl) {
      if (searchEl.value) {
        searchEl.value = '';
        state.query = '';
        searchWrapEl.classList.remove('has-value');
        render();
      } else {
        searchEl.blur();
      }
    }
  });

  /* ---------------- 场景对话 ---------------- */

  var SCENES = Array.isArray(window.DIALOGUE_SCENES) ? window.DIALOGUE_SCENES : [];
  var KEY_HIDE_ZH = 'flashcard:hideZh';
  var sceneTabs = {};
  var sceneState = {
    id: '',
    hideZh: readStore(KEY_HIDE_ZH) === '1',
    playing: false,
    token: 0,
    lines: [],
    lineEls: [],
    playBtn: null,
    zhBtn: null,
  };

  function findScene(id) {
    for (var i = 0; i < SCENES.length; i += 1) {
      if (SCENES[i].id === id) {
        return SCENES[i];
      }
    }
    return null;
  }

  function buildSceneTabs() {
    if (!sceneTabsEl) {
      return;
    }

    var frag = document.createDocumentFragment();

    SCENES.forEach(function (scene) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill';
      btn.dataset.scene = scene.id;
      btn.style.setProperty('--cat', scene.color);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('aria-controls', 'scene-panel');

      var icon = document.createElement('span');
      icon.className = 'pill-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = scene.icon;

      var zh = document.createElement('span');
      zh.textContent = scene.zh;

      var en = document.createElement('span');
      en.className = 'pill-en';
      en.textContent = scene.en;

      btn.appendChild(icon);
      btn.appendChild(zh);
      btn.appendChild(en);
      btn.addEventListener('click', function () {
        if (sceneState.id === scene.id) {
          return;
        }
        stopPlayback();
        renderScene(scene.id);
      });

      frag.appendChild(btn);
      sceneTabs[scene.id] = btn;
    });

    sceneTabsEl.appendChild(frag);
  }

  function syncSceneTabs() {
    Object.keys(sceneTabs).forEach(function (id) {
      var isActive = id === sceneState.id;
      sceneTabs[id].classList.toggle('is-active', isActive);
      sceneTabs[id].setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function renderScene(id) {
    var scene = findScene(id) || SCENES[0];
    if (!scene || !scenePanelEl) {
      return;
    }

    sceneState.id = scene.id;
    sceneState.lines = scene.lines;
    sceneState.lineEls = [];
    sceneState.playing = false;
    sceneState.token += 1;

    scenePanelEl.textContent = '';
    scenePanelEl.style.setProperty('--cat', scene.color);
    scenePanelEl.classList.toggle('hide-zh', sceneState.hideZh);

    var top = document.createElement('div');
    top.className = 'scene-top';

    var icon = document.createElement('span');
    icon.className = 'scene-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = scene.icon;

    var meta = document.createElement('div');
    meta.className = 'scene-meta';

    var title = document.createElement('h3');
    title.className = 'scene-title';
    title.textContent = scene.zh + ' · ' + scene.en;

    var desc = document.createElement('p');
    desc.className = 'scene-desc';
    desc.textContent = scene.desc;

    meta.appendChild(title);
    meta.appendChild(desc);

    var actions = document.createElement('div');
    actions.className = 'scene-actions';

    var zhBtn = document.createElement('button');
    zhBtn.type = 'button';
    zhBtn.className = 'ghost-btn';
    zhBtn.textContent = sceneState.hideZh ? '显示中文' : '隐藏中文';
    zhBtn.setAttribute('aria-pressed', sceneState.hideZh ? 'true' : 'false');
    zhBtn.addEventListener('click', toggleZh);

    var playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'play-btn';
    playBtn.textContent = '▶ 播放全部';
    playBtn.addEventListener('click', togglePlayback);

    actions.appendChild(zhBtn);
    actions.appendChild(playBtn);

    top.appendChild(icon);
    top.appendChild(meta);
    top.appendChild(actions);

    var list = document.createElement('ol');
    list.className = 'dialog';

    scene.lines.forEach(function (line) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'line';
      btn.setAttribute('aria-label', '播放 ' + line.who + '：' + line.en);

      var who = document.createElement('span');
      who.className = 'line-who';
      who.textContent = line.who;

      var en = document.createElement('span');
      en.className = 'line-en';
      en.lang = 'en';
      en.textContent = line.en;

      var zh = document.createElement('span');
      zh.className = 'line-zh';
      zh.textContent = line.zh;

      btn.appendChild(who);
      btn.appendChild(en);
      btn.appendChild(zh);
      btn.addEventListener('click', function () {
        if (sceneState.playing) {
          stopPlayback();
        }
        speak(line.en, btn);
      });

      li.appendChild(btn);
      list.appendChild(li);
      sceneState.lineEls.push(btn);
    });

    sceneState.zhBtn = zhBtn;
    sceneState.playBtn = playBtn;

    scenePanelEl.appendChild(top);
    scenePanelEl.appendChild(list);

    syncSceneTabs();
  }

  function toggleZh() {
    sceneState.hideZh = !sceneState.hideZh;
    scenePanelEl.classList.toggle('hide-zh', sceneState.hideZh);
    writeStore(KEY_HIDE_ZH, sceneState.hideZh ? '1' : '0');

    if (sceneState.zhBtn) {
      sceneState.zhBtn.textContent = sceneState.hideZh ? '显示中文' : '隐藏中文';
      sceneState.zhBtn.setAttribute(
        'aria-pressed',
        sceneState.hideZh ? 'true' : 'false',
      );
    }
  }

  function clearLineHighlight() {
    sceneState.lineEls.forEach(function (el) {
      el.classList.remove('is-speaking');
    });
  }

  function updatePlayBtn() {
    var btn = sceneState.playBtn;
    if (!btn) {
      return;
    }
    btn.textContent = sceneState.playing ? '■ 停止' : '▶ 播放全部';
    btn.classList.toggle('is-playing', sceneState.playing);
  }

  function stopPlayback() {
    sceneState.playing = false;
    sceneState.token += 1;
    clearLineHighlight();

    if (speakTimer) {
      window.clearTimeout(speakTimer);
      speakTimer = null;
    }
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {
        /* 忽略 */
      }
    }
    if (speakingBtn) {
      speakingBtn.classList.remove('is-speaking');
      speakingBtn = null;
    }

    updatePlayBtn();
  }

  function finishPlayback() {
    sceneState.playing = false;
    sceneState.token += 1;
    clearLineHighlight();
    updatePlayBtn();
  }

  function togglePlayback() {
    if (sceneState.playing) {
      stopPlayback();
      return;
    }
    if (!supportsSpeech) {
      return;
    }
    startPlayback();
  }

  function startPlayback() {
    var lines = sceneState.lines;
    var els = sceneState.lineEls;
    if (!lines.length) {
      return;
    }

    sceneState.playing = true;
    var token = (sceneState.token += 1);
    var index = 0;
    updatePlayBtn();

    function next() {
      if (token !== sceneState.token || !sceneState.playing) {
        return;
      }
      if (index >= lines.length) {
        finishPlayback();
        return;
      }

      var current = index;
      index += 1;

      clearLineHighlight();
      els[current].classList.add('is-speaking');

      var utter = new window.SpeechSynthesisUtterance(lines[current].en);
      utter.lang = 'en-US';
      utter.rate = 0.85;
      utter.onend = function () {
        if (token !== sceneState.token) {
          return;
        }
        window.setTimeout(next, 260);
      };
      utter.onerror = function () {
        if (token !== sceneState.token) {
          return;
        }
        finishPlayback();
      };

      try {
        synth.speak(utter);
      } catch (e) {
        finishPlayback();
      }
    }

    window.setTimeout(next, 120);
  }

  /* ---------------- 主题 ---------------- */

  function currentTheme() {
    return rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncThemeUi(theme) {
    var isDark = theme === 'dark';
    var label = isDark ? '切换到浅色模式' : '切换到深色模式';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#1C1B19' : '#FAF7F0');
    }
  }

  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    rootEl.setAttribute('data-theme', next);
    writeStore(KEY_THEME, next);
    syncThemeUi(next);
  });

  /* ---------------- 初始化 ---------------- */

  function init() {
    buildNav();
    buildSceneTabs();

    totalEl.textContent = String(
      CATEGORIES.reduce(function (sum, cat) {
        return sum + cat.words.length;
      }, 0),
    );

    if (SCENES.length) {
      if (sceneTotalEl) {
        sceneTotalEl.textContent = String(SCENES.length);
      }
      renderScene(SCENES[0].id);
    }

    var initial = findCategory(hashId()) || findCategory(readStore(KEY_CATEGORY)) || CATEGORIES[0];
    state.activeId = initial.id;
    updateHash(initial.id);

    syncThemeUi(currentTheme());
    render();

    window.addEventListener('hashchange', function () {
      var cat = findCategory(hashId());
      if (cat && cat.id !== state.activeId) {
        state.activeId = cat.id;
        writeStore(KEY_CATEGORY, cat.id);
        render();
      }
    });

    if (jumpScenesBtn) {
      jumpScenesBtn.addEventListener('click', function () {
        var scenesEl = document.getElementById('scenes');
        if (!scenesEl) {
          return;
        }
        var reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        scenesEl.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    }

    window.addEventListener('pagehide', function () {
      if (synth && synth.speaking) {
        synth.cancel();
      }
    });
  }

  init();
})();
