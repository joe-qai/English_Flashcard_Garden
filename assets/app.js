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
    totalEl.textContent = String(
      CATEGORIES.reduce(function (sum, cat) {
        return sum + cat.words.length;
      }, 0),
    );

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

    window.addEventListener('pagehide', function () {
      if (synth && synth.speaking) {
        synth.cancel();
      }
    });
  }

  init();
})();
