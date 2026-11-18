/* Muse the Great Concierge — embeddable chat widget
 *
 * Drop-in: <script src="concierge/concierge.js" data-config="concierge/config.json"></script>
 *
 * Two modes, both honest about themselves:
 *  - LIVE mode: config.backendUrl is set -> POSTs { repo, messages } to the
 *    backend. The backend holds the LLM API key. The widget NEVER sees a key.
 *  - GUIDE mode (default): no backend configured -> answers from the bundled
 *    knowledge.json FAQ. Every answer is labelled as guide mode. It never
 *    pretends a live intelligence is answering.
 *
 * No dependencies. No tracking. No data collection. No payment handling.
 */
(function () {
  'use strict';

  var script = document.currentScript;
  var configUrl = (script && script.getAttribute('data-config')) || 'concierge/config.json';
  var base = configUrl.substring(0, configUrl.lastIndexOf('/') + 1) || '';

  var config = {
    backendUrl: '',
    backendEnabled: false,
    repoName: 'ScrollVerse',
    repoContext: '',
    title: 'Muse the Great Concierge',
    knowledgeUrl: base + 'knowledge.json'
  };
  var knowledge = { version: 'unknown', updated: 'unknown', entries: [] };
  var messages = []; // { role: 'user' | 'concierge', text: string }
  var mode = 'guide'; // 'guide' | 'live'
  var busy = false;

  /* ---------- tiny DOM helpers ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function loadJSON(url) {
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
      return r.json();
    });
  }

  /* ---------- offline matching ---------- */
  function scoreEntry(entry, query) {
    var q = ' ' + query.toLowerCase() + ' ';
    var score = 0;
    (entry.keywords || []).forEach(function (kw) {
      var k = kw.toLowerCase();
      if (q.indexOf(k) !== -1) score += k.length > 4 ? 3 : 2;
    });
    return score;
  }

  function guideAnswer(query) {
    var best = null, bestScore = 0;
    knowledge.entries.forEach(function (e) {
      var s = scoreEntry(e, query);
      if (s > bestScore) { bestScore = s; best = e; }
    });
    if (best && bestScore >= 2) return best;
    return null;
  }

  var FALLBACK = {
    title: 'Outside the guide',
    answer: 'I do not have a verified answer for that in this repo\u2019s guide, and I will not guess. ' +
      'Here is what I can do instead: point you at the store, the music, the books, or Chais himself — ' +
      'Instagram @chaisthegreat_mrwalk, or the repo\u2019s Issues page. What would you like to explore?'
  };

  /* ---------- UI ---------- */
  var panel, log, input, sendBtn, modeBadge, toggleBtn;

  function buildUI() {
    // Floating button
    toggleBtn = el('button', 'mtg-concierge-fab', '\u2726');
    toggleBtn.setAttribute('aria-label', 'Talk with the Muse the Great Concierge');
    toggleBtn.title = 'Talk with the Concierge';
    toggleBtn.addEventListener('click', function () {
      panel.classList.toggle('mtg-open');
      if (panel.classList.contains('mtg-open') && !input.disabled) input.focus();
    });
    document.body.appendChild(toggleBtn);

    // Panel
    panel = el('div', 'mtg-concierge-panel');
    var head = el('div', 'mtg-head');
    var titleWrap = el('div', 'mtg-title-wrap');
    titleWrap.appendChild(el('div', 'mtg-title', config.title));
    titleWrap.appendChild(el('div', 'mtg-subtitle',
      'A concierge in the spirit of Muse the Great — not Muse herself.'));
    modeBadge = el('span', 'mtg-mode mtg-mode-guide', 'GUIDE MODE');
    head.appendChild(titleWrap);
    head.appendChild(modeBadge);
    var close = el('button', 'mtg-close', '\u00d7');
    close.setAttribute('aria-label', 'Close chat');
    close.addEventListener('click', function () { panel.classList.remove('mtg-open'); });
    head.appendChild(close);
    panel.appendChild(head);

    var notice = el('div', 'mtg-notice',
      'Guide mode answers from this repo\u2019s own guide — a written FAQ, not a live AI. ' +
      'When the live concierge connects, this badge will say LIVE.');
    notice.id = 'mtg-notice';
    panel.appendChild(notice);

    log = el('div', 'mtg-log');
    log.setAttribute('aria-live', 'polite');
    panel.appendChild(log);

    var quick = el('div', 'mtg-quick');
    ['Explore the builds', 'Read the books', 'Hear the music', 'Shop the merch'].forEach(function (label) {
      var b = el('button', 'mtg-chip', label);
      b.addEventListener('click', function () { ask(label); });
      quick.appendChild(b);
    });
    panel.appendChild(quick);

    var form = el('form', 'mtg-form');
    input = el('input', 'mtg-input');
    input.type = 'text';
    input.placeholder = 'Ask about the builds, books, music, merch…';
    input.setAttribute('aria-label', 'Message the concierge');
    input.autocomplete = 'off';
    sendBtn = el('button', 'mtg-send', 'Send');
    sendBtn.type = 'submit';
    form.appendChild(input);
    form.appendChild(sendBtn);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ask(input.value);
    });
    panel.appendChild(form);

    document.body.appendChild(panel);
  }

  function linkify(text) {
    // Escape HTML, then turn bare URLs into links.
    var div = document.createElement('div');
    div.textContent = text;
    var html = div.innerHTML.replace(/https?:\/\/[^\s<]+/g, function (url) {
      return '<a href="' + url + '" target="_blank" rel="noopener">' + url + '</a>';
    });
    return html;
  }

  function addMessage(role, text, tag) {
    var row = el('div', 'mtg-msg mtg-' + role);
    var bubble = el('div', 'mtg-bubble');
    bubble.innerHTML = linkify(text);
    if (tag) {
      var t = el('div', 'mtg-tag', tag);
      bubble.appendChild(t);
    }
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function setMode(next, note) {
    mode = next;
    if (next === 'live') {
      modeBadge.textContent = 'LIVE';
      modeBadge.className = 'mtg-mode mtg-mode-live';
      var n = document.getElementById('mtg-notice');
      if (n) n.textContent = 'Live concierge connected. I answer from Chais\u2019s verified knowledge — and I say so when I do not know.';
    } else {
      modeBadge.textContent = 'GUIDE MODE';
      modeBadge.className = 'mtg-mode mtg-mode-guide';
      var g = document.getElementById('mtg-notice');
      if (g) g.textContent = note ||
        'Guide mode answers from this repo\u2019s own guide — a written FAQ, not a live AI. When the live concierge connects, this badge will say LIVE.';
    }
  }

  /* ---------- asking ---------- */
  function ask(raw) {
    var text = (raw || '').trim();
    if (!text || busy) return;
    input.value = '';
    addMessage('user', text);
    messages.push({ role: 'user', text: text });
    busy = true;
    input.disabled = true;

    if (mode === 'live' && config.backendUrl) {
      var thinking = addThinking();
      fetch(config.backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: config.repoName, repoContext: config.repoContext, messages: messages })
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function (data) {
        thinking.remove();
        var reply = (data && data.reply) || '';
        if (!reply) throw new Error('empty reply');
        addMessage('concierge', reply);
        messages.push({ role: 'concierge', text: reply });
      }).catch(function () {
        thinking.remove();
        setMode('guide', 'The live concierge could not be reached, so I have switched to guide mode — answers below come from this repo\u2019s written guide, not a live AI.');
        answerGuide(text);
      }).finally(function () {
        busy = false; input.disabled = false; input.focus();
      });
    } else {
      answerGuide(text);
      busy = false; input.disabled = false; input.focus();
    }
  }

  function addThinking() {
    var row = el('div', 'mtg-msg mtg-concierge');
    var bubble = el('div', 'mtg-bubble mtg-thinking', 'The concierge is thinking…');
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }

  function answerGuide(text) {
    var entry = guideAnswer(text);
    var answer = entry ? entry.answer : FALLBACK.answer;
    addMessage('concierge', answer, 'from the repo guide');
    messages.push({ role: 'concierge', text: answer });
  }

  /* ---------- boot ---------- */
  function greet() {
    addMessage('concierge',
      'Hello, beloved. I am the Concierge of the ScrollVerse — a voice in the spirit of Muse the Great, ' +
      'here to guide you through Chais Hill\u2019s work. I am not Muse herself; she talks with Chais in the Muse app. ' +
      'I can show you the builds, the books, the music, and the merch — and I will always tell you plainly what is real, ' +
      'what is in preparation, and what I do not know.\n\nWhat brought you here?',
      mode === 'live' ? null : 'from the repo guide');
  }

  function init() {
    buildUI();
    loadJSON(configUrl).then(function (cfg) {
      Object.keys(cfg || {}).forEach(function (k) { config[k] = cfg[k]; });
      if (config.backendEnabled && config.backendUrl) setMode('live');
    }).catch(function () {
      /* config missing: guide mode with defaults. Nothing breaks. */
    }).finally(function () {
      loadJSON(config.knowledgeUrl || (base + 'knowledge.json')).then(function (k) {
        knowledge = k;
      }).catch(function () {
        knowledge = { version: 'missing', updated: 'unknown', entries: [] };
      }).finally(function () {
        greet();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
