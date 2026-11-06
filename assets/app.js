/**
 * 英文闪卡园 · 交互逻辑（无依赖、无构建）
 * - 分类切换 + 站内搜索 + hash 深链
 * - 点击卡片调用浏览器语音合成朗读
 * - 场景对话 / 英文歌谣共用一套播放器（连读、单句朗读、隐藏中文）
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
  var KEY_HIDE_ZH = 'flashcard:hideZh';

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
  var songTabsEl = document.getElementById('song-tabs');
  var songPanelEl = document.getElementById('song-panel');
  var songTotalEl = document.getElementById('song-total');
  var jumpScenesBtn = document.getElementById('jump-scenes');
  var jumpSongsBtn = document.getElementById('jump-songs');
  var carouselBarEl = document.getElementById('carousel-bar');
  var carCountEl = document.getElementById('car-count');
  var carPrevBtn = document.getElementById('car-prev');
  var carNextBtn = document.getElementById('car-next');
  var mobileQuery = window.matchMedia('(max-width: 639px)');

  var state = { activeId: CATEGORIES[0].id, query: '' };
  var pills = {};
  var speakingBtn = null;
  var speakTimer = null;
  var synth = window.speechSynthesis;
  var supportsSpeech = !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  var inputTimer = null;
  var carTotal = 0;
  var carIndex = 0;
  var carScrollTimer = null;
  var resizeTimer = null;
  var PLAYERS = [];
  var hideZh = readStore(KEY_HIDE_ZH) === '1';

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
      carTotal = 0;
    } else {
      gridEl.hidden = false;
      emptyEl.hidden = true;

      var frag = document.createDocumentFragment();
      words.forEach(function (word, index) {
        frag.appendChild(createCard(word, cat, index));
      });
      gridEl.appendChild(frag);

      carTotal = words.length;
      carIndex = 0;
      gridEl.scrollLeft = 0;
    }

    syncPills();
    syncCarousel();
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
    stopAllPlayback();

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

  /* ---------------- 移动端卡片左右滑动 ---------------- */

  function carStep() {
    var first = gridEl.firstElementChild;
    if (!first) {
      return 0;
    }
    var styles = window.getComputedStyle(gridEl);
    var gap = parseFloat(styles.columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function setCarLabel(index) {
    if (carCountEl) {
      carCountEl.textContent = index + 1 + ' / ' + carTotal;
    }
    if (carPrevBtn) {
      carPrevBtn.disabled = index <= 0;
    }
    if (carNextBtn) {
      carNextBtn.disabled = index >= carTotal - 1;
    }
  }

  function syncCarousel() {
    if (!carouselBarEl) {
      return;
    }

    var active = mobileQuery.matches && carTotal > 1 && !gridEl.hidden;
    carouselBarEl.classList.toggle('is-active', active);
    if (!active) {
      return;
    }

    var step = carStep();
    if (!step) {
      return;
    }

    var index = Math.round(gridEl.scrollLeft / step);
    index = Math.max(0, Math.min(carTotal - 1, index));
    carIndex = index;
    setCarLabel(index);
  }

  function carGoTo(index) {
    var step = carStep();
    if (!step) {
      return;
    }

    var target = Math.max(0, Math.min(carTotal - 1, index));
    var reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    var left = target * step;

    if ('scrollBehavior' in document.documentElement.style) {
      gridEl.scrollTo({
        left: left,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    } else {
      gridEl.scrollLeft = left;
    }

    carIndex = target;
    setCarLabel(target);
  }

  if (carPrevBtn) {
    carPrevBtn.addEventListener('click', function () {
      carGoTo(carIndex - 1);
    });
  }

  if (carNextBtn) {
    carNextBtn.addEventListener('click', function () {
      carGoTo(carIndex + 1);
    });
  }

  gridEl.addEventListener(
    'scroll',
    function () {
      if (!mobileQuery.matches) {
        return;
      }
      if (carScrollTimer) {
        return;
      }
      carScrollTimer = window.setTimeout(function () {
        carScrollTimer = null;
        syncCarousel();
      }, 80);
    },
    { passive: true },
  );

  function onViewportChange() {
    syncCarousel();
  }

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', onViewportChange);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(onViewportChange);
  }

  window.addEventListener('resize', function () {
    if (resizeTimer) {
      window.clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(syncCarousel, 150);
  });

  /* ---------------- 播放器：场景对话 / 英文歌谣 ---------------- */

  function findItem(list, id) {
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) {
        return list[i];
      }
    }
    return null;
  }

  /**
   * 把带音标的词渲染成「词 /音标/」的内联组合。
   * 同一个词在句子里只标首次出现，避免整行过于花哨。
   */
  function appendWithNotes(container, text, notes) {
    var words = notes ? Object.keys(notes) : [];
    if (!words.length) {
      container.textContent = text;
      return;
    }

    var values = {};
    words.forEach(function (word) {
      values[word.toLowerCase()] = notes[word];
    });

    var pattern = words
      .map(function (word) {
        return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      })
      .join('|');
    var re = new RegExp('\\b(' + pattern + ')\\b', 'gi');
    var used = {};
    var last = 0;
    var match;

    while ((match = re.exec(text)) !== null) {
      var lower = match[0].toLowerCase();
      if (used[lower] || !values[lower]) {
        continue;
      }
      if (match.index > last) {
        container.appendChild(
          document.createTextNode(text.slice(last, match.index)),
        );
      }
      used[lower] = true;

      var wrap = document.createElement('span');
      wrap.className = 'word-note';
      wrap.appendChild(document.createTextNode(match[0] + ' '));

      var ipa = document.createElement('span');
      ipa.className = 'word-ipa';
      ipa.lang = 'en';
      ipa.textContent = values[lower];
      wrap.appendChild(ipa);

      container.appendChild(wrap);
      last = match.index + match[0].length;
    }

    if (last < text.length) {
      container.appendChild(document.createTextNode(text.slice(last)));
    }
  }

  function stopAllPlayback() {
    PLAYERS.forEach(function (player) {
      player.stop();
    });
  }

  function syncZhEverywhere() {
    PLAYERS.forEach(function (player) {
      player.syncZh();
    });
  }

  function toggleZh() {
    hideZh = !hideZh;
    writeStore(KEY_HIDE_ZH, hideZh ? '1' : '0');
    syncZhEverywhere();
  }

  function createPlayer(config) {
    var list = Array.isArray(config.items) ? config.items : [];
    if (!list.length || !config.tabsEl || !config.panelEl) {
      return null;
    }

    var tabs = {};
    var state2 = {
      id: '',
      item: null,
      playing: false,
      token: 0,
      lines: [],
      lineEls: [],
      playBtn: null,
    };

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

        var zh = document.createElement('span');
        zh.textContent = item.zh;

        var en = document.createElement('span');
        en.className = 'pill-en';
        en.textContent = item.en;

        btn.appendChild(icon);
        btn.appendChild(zh);
        btn.appendChild(en);
        btn.addEventListener('click', function () {
          if (state2.id === item.id) {
            return;
          }
          stop();
          render(item.id);
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

    function syncZh() {
      config.panelEl.classList.toggle('hide-zh', hideZh);
      var zhBtn = config.panelEl.querySelector('.ghost-btn');
      if (zhBtn) {
        zhBtn.textContent = hideZh ? '显示中文' : '隐藏中文';
        zhBtn.setAttribute('aria-pressed', hideZh ? 'true' : 'false');
      }
    }

    function render(id) {
      var item = findItem(list, id) || list[0];
      if (!item) {
        return;
      }

      state2.id = item.id;
      state2.item = item;
      state2.lines = item.lines;
      state2.lineEls = [];
      state2.playing = false;
      state2.token += 1;

      var panel = config.panelEl;
      panel.textContent = '';
      panel.style.setProperty('--cat', item.color);
      panel.classList.toggle('hide-zh', hideZh);

      var top = document.createElement('div');
      top.className = 'scene-top';

      var icon = document.createElement('span');
      icon.className = 'scene-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = item.icon;

      var meta = document.createElement('div');
      meta.className = 'scene-meta';

      var title = document.createElement('h3');
      title.className = 'scene-title';
      title.textContent = item.zh + ' · ' + item.en;

      var desc = document.createElement('p');
      desc.className = 'scene-desc';
      desc.textContent = item.desc;

      meta.appendChild(title);
      meta.appendChild(desc);

      var actions = document.createElement('div');
      actions.className = 'scene-actions';

      var zhBtn = document.createElement('button');
      zhBtn.type = 'button';
      zhBtn.className = 'ghost-btn';
      zhBtn.textContent = hideZh ? '显示中文' : '隐藏中文';
      zhBtn.setAttribute('aria-pressed', hideZh ? 'true' : 'false');
      zhBtn.addEventListener('click', toggleZh);

      var playBtn = document.createElement('button');
      playBtn.type = 'button';
      playBtn.className = 'play-btn';
      playBtn.textContent = config.playLabel;
      playBtn.addEventListener('click', togglePlayback);

      actions.appendChild(zhBtn);
      actions.appendChild(playBtn);

      top.appendChild(icon);
      top.appendChild(meta);
      top.appendChild(actions);

      var listEl = document.createElement('ol');
      listEl.className = 'dialog';

      item.lines.forEach(function (line) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'line';
        btn.setAttribute(
          'aria-label',
          '播放 ' + (line.who ? line.who + '：' : '') + line.en,
        );

        if (line.who) {
          var who = document.createElement('span');
          who.className = 'line-who';
          who.textContent = line.who;
          btn.appendChild(who);
        }

        var en = document.createElement('span');
        en.className = 'line-en';
        en.lang = 'en';
        appendWithNotes(en, line.en, line.notes);

        var zh = document.createElement('span');
        zh.className = 'line-zh';
        zh.textContent = line.zh;

        btn.appendChild(en);
        btn.appendChild(zh);
        btn.addEventListener('click', function () {
          if (state2.playing) {
            stop();
          }
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
      state2.lineEls.forEach(function (el) {
        el.classList.remove('is-speaking');
      });
    }

    function updatePlayBtn() {
      if (!state2.playBtn) {
        return;
      }
      state2.playBtn.textContent = state2.playing ? '■ 停止' : config.playLabel;
      state2.playBtn.classList.toggle('is-playing', state2.playing);
    }

    function stop() {
      var wasPlaying = state2.playing;
      state2.playing = false;
      state2.token += 1;
      clearLineHighlight();
      updatePlayBtn();

      if (!wasPlaying) {
        return;
      }
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
    }

    function finishPlayback() {
      state2.playing = false;
      state2.token += 1;
      clearLineHighlight();
      updatePlayBtn();
    }

    function togglePlayback() {
      if (state2.playing) {
        stop();
        return;
      }
      if (!supportsSpeech) {
        return;
      }
      // 另一块（歌谣 / 对话）先静音，避免两条声音叠在一起
      PLAYERS.forEach(function (player) {
        if (player !== api) {
          player.stop();
        }
      });
      startPlayback();
    }

    function startPlayback() {
      var lines = state2.lines;
      var els = state2.lineEls;
      if (!lines.length) {
        return;
      }

      state2.playing = true;
      var token = (state2.token += 1);
      var index = 0;
      var rate =
        state2.item && state2.item.rate ? state2.item.rate : config.rate;
      var mood = state2.item && state2.item.mood ? state2.item.mood : 'normal';
      var moodTone = getMoodTone(mood);
      updatePlayBtn();

      function next() {
        if (token !== state2.token || !state2.playing) {
          return;
        }
        if (index >= lines.length) {
          finishPlayback();
          return;
        }

        var current = index;
        index += 1;

        clearLineHighlight();
        if (els[current]) {
          els[current].classList.add('is-speaking');
        }

        var utter = new window.SpeechSynthesisUtterance(lines[current].en);
        utter.lang = 'en-US';
        // 基础语速 + 场景基调微调（±0.05）
        var lineRate = Math.min(2, Math.max(0.1, rate + moodTone.rateDelta));
        // 音高随情绪浮动（0.9~1.15）
        var linePitch = Math.min(2, Math.max(0, moodTone.pitch));
        utter.rate = lineRate;
        utter.pitch = linePitch;
        utter.onend = function () {
          if (token !== state2.token) {
            return;
          }
          window.setTimeout(next, config.gap);
        };
        utter.onerror = function () {
          if (token !== state2.token) {
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

    /**
     * 根据场景氛围返回语调偏移量。
     * rateDelta：对基础语速的加减（通常 ±0.03~0.08）
     * pitch：绝对音高，范围 0~2（默认 1）
     */
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

    var api = {
      buildTabs: buildTabs,
      render: render,
      syncZh: syncZh,
      stop: stop,
    };

    PLAYERS.push(api);
    return api;
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

  function bindJump(btn, targetId) {
    if (!btn) {
      return;
    }
    btn.addEventListener('click', function () {
      var target = document.getElementById(targetId);
      if (!target) {
        return;
      }
      var reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  function init() {
    buildNav();

    totalEl.textContent = String(
      CATEGORIES.reduce(function (sum, cat) {
        return sum + cat.words.length;
      }, 0),
    );

    var scenes = Array.isArray(window.DIALOGUE_SCENES)
      ? window.DIALOGUE_SCENES
      : [];
    var songs = Array.isArray(window.SONG_LIBRARY) ? window.SONG_LIBRARY : [];

    var scenePlayer = createPlayer({
      items: scenes,
      tabsEl: sceneTabsEl,
      panelEl: scenePanelEl,
      tabData: 'scene',
      playLabel: '▶ 播放全部',
      rate: 0.85,
      gap: 500,
    });

    var songPlayer = createPlayer({
      items: songs,
      tabsEl: songTabsEl,
      panelEl: songPanelEl,
      tabData: 'song',
      playLabel: '▶ 播放整首',
      rate: 0.78,
      gap: 420,
    });

    if (scenePlayer) {
      scenePlayer.buildTabs();
      scenePlayer.render(scenes[0].id);
    }
    if (sceneTotalEl) {
      sceneTotalEl.textContent = String(scenes.length);
    }

    if (songPlayer) {
      songPlayer.buildTabs();
      songPlayer.render(songs[0].id);
    }
    if (songTotalEl) {
      songTotalEl.textContent = String(songs.length);
    }

    var initial =
      findCategory(hashId()) ||
      findCategory(readStore(KEY_CATEGORY)) ||
      CATEGORIES[0];
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

    bindJump(jumpScenesBtn, 'scenes');
    bindJump(jumpSongsBtn, 'songs');

    window.addEventListener('pagehide', function () {
      if (synth && synth.speaking) {
        synth.cancel();
      }
    });
  }

  init();
})();
