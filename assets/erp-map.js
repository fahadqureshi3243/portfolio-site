/* ERP Workflows page: industry picker, summary and the drop-down tree, built from data/erp-data.js */
(function () {
  var DATA = window.ERP_DATA;
  var ICONS = {
    tendering: 'M7 5h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 3h6v3H9zM9 11h6M9 15h4',
    contracts: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h3',
    engineering: 'M4 20 20 4v16zM9 20v-3M13 20v-3M17 20v-3',
    operations: 'M3 17h18M5 17a7 7 0 0 1 14 0M10 10V6h4v4',
    planning: 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 10h16M9 3v4M15 3v4M8 14h3',
    calendar: 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 10h16M9 3v4M15 3v4M8 14h3',
    procurement: 'M3 4h2l2.5 11h10L20 8H7M7.5 19a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M15.5 19a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
    equipment: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M5 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    inventory: 'M4 12h7v8H4zM13 12h7v8h-7zM8.5 4h7v8h-7z',
    finance: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6',
    hr: 'M6 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 0 1 0 6M18 14c2 .6 3 2.6 3 6',
    hse: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4',
    qaqc: 'M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0M8.5 12l2.5 2.5 4.5-5',
    audit: 'M5 11a6 6 0 1 0 12 0a6 6 0 1 0-12 0M20 20l-4.5-4.5',
    rig: 'M12 2 7 22M12 2l5 20M8.5 15h7M9.6 10h4.8M4 22h16',
    factory: 'M3 21V10l5 3v-3l5 3v-3l5 3V4h3v17zM7 17h2M12 17h2M17 17h2',
    flask: 'M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7 15h10',
    wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8 6.2 21l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z',
    ship: 'M3 17l2 4h14l2-4zM5 17v-6h14v6M12 11V4M9 7h6',
    ticket: 'M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4zM10 6v12',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10zM8 11h2l1-2 2 4 1-2h2',
    pill: 'M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7zM7 7l7 7',
    megaphone: 'M3 10v4h3l7 4V6l-7 4zM16 9a4 4 0 0 1 0 6M6 14l1 5h3l-1-5',
    film: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4',
    globe: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
    idcard: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM6.5 12a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M14 10h4M14 14h4',
    flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
    receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3'
  };
  var MODE = { E: 'ERP', B: 'ERP + manual', M: 'Manual' };
  var st = { ind: null, openD: {}, openF: {}, q: '', auto: true };
  var tree = document.getElementById('tree'), sel = document.getElementById('industry');

  function el(t, cls, txt) { var e = document.createElement(t); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function svg(d, s, w) { return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"></path></svg>'; }
  function ai(s) { return (s || '').replace(/\bClaude\b/g, 'AI'); }
  function cnt(steps) { var n = { E: 0, B: 0, M: 0 }; steps.forEach(function (s) { n[s[2]]++; }); return n; }
  function mix(n, t) { var m = el('span', 'mix'); [['e', 'E'], ['b', 'B'], ['m', 'M']].forEach(function (k) { if (!n[k[1]]) return; var i = el('i', k[0]); i.style.width = (n[k[1]] / t * 100) + '%'; m.appendChild(i); }); return m; }
  function ini(r) { return r.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function plural(n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); }
  var CHEV = 'M6 9l6 6 6-6';

  DATA.forEach(function (d) { var o = el('option', '', d.name); o.value = d.id; sel.appendChild(o); });

  function pick(id) {
    var d = DATA.find(function (x) { return x.id === id; }) || DATA[0];
    st.ind = d; st.openD = { finance: true }; st.openF = { 'finance-ap': true }; st.q = '';
    sel.value = d.id; document.getElementById('q').value = ''; render();
  }

  function summary(d) {
    var all = 0, auto = 0, fns = 0, tot = { E: 0, B: 0, M: 0 };
    d.depts.forEach(function (x) { x.fns.forEach(function (f) { fns++; f.steps.forEach(function (s) { all++; tot[s[2]]++; if (s[4]) auto++; }); }); });
    var pe = tot.E / all * 100, pb = pe + tot.B / all * 100;
    document.getElementById('ring').style.background = 'conic-gradient(var(--erp) 0 ' + pe + '%, var(--both) ' + pe + '% ' + pb + '%, var(--man) ' + pb + '% 100%)';
    document.getElementById('erpPct').textContent = Math.round(pe) + '%';
    document.getElementById('indName').textContent = d.name;
    document.getElementById('indTag').textContent = d.tag;
    var box = document.getElementById('stats'); box.textContent = '';
    [[d.depts.length, 'departments'], [fns, 'functions'], [all, 'workflow tasks'], [auto + ' (' + Math.round(auto / all * 100) + '%)', 'can be automated', 1]].forEach(function (s) {
      var c = el('div', 'stat'); var b = el('b', '', String(s[0])); if (s[2]) b.style.color = 'var(--accent-text)'; c.appendChild(b); c.appendChild(el('span', '', s[1])); box.appendChild(c);
    });
  }

  function taskCard(s, i, q) {
    var li = el('li', 'task'), hit = q && (s[0] + ' ' + s[1] + ' ' + s[3] + ' ' + (s[5] || '')).toLowerCase().indexOf(q) >= 0;
    li.appendChild(el('span', 'num', String(i + 1)));
    var c = el('div', 'tcard m-' + s[2] + (hit ? ' hit' : ''));
    var h = el('div', 'th'); h.appendChild(el('b', '', s[0])); h.appendChild(el('span', 'pill p-' + s[2], MODE[s[2]])); c.appendChild(h);
    var w = el('div', 'who'); w.appendChild(el('span', 'av', ini(s[1]))); var wt = el('span'); wt.appendChild(el('span', '', s[1])); wt.appendChild(el('small', '', 'In: ' + s[3])); w.appendChild(wt); c.appendChild(w);
    if (st.auto) {
      if (s[4]) {
        var a = el('div', 'idea'), top = el('span', 'top'); top.appendChild(el('span', 'eyebrow', 'Automate with'));
        s[4].split('+').forEach(function (x) { x = x.trim(); var k = /claude/i.test(x) ? 'ai' : /n8n/i.test(x) ? 'n8n' : 'pbi'; top.appendChild(el('span', 'tool t-' + k, /claude/i.test(x) ? 'AI' : x)); });
        a.appendChild(top); a.appendChild(el('span', 'how', ai(s[5]))); c.appendChild(a);
      } else c.appendChild(el('div', 'none', s[2] === 'E' ? 'Already handled in the ERP.' : 'Keep with a person: needs judgement, a signature or a portal login.'));
    }
    li.appendChild(c); return { li: li, hit: hit };
  }

  function render() {
    var d = st.ind, q = st.q.toLowerCase().trim(); summary(d); tree.textContent = '';
    document.body.classList.toggle('noauto', !st.auto);
    [['core', d.core], ['support', 'Support & control']].forEach(function (g) {
      var depts = d.depts.filter(function (x) { return x.g === g[0]; }); if (!depts.length) return;
      var sec = el('section', 'grp g-' + g[0]); var gh = el('div', 'gh'); gh.appendChild(el('i')); gh.appendChild(el('span', '', g[1])); sec.appendChild(gh);
      var trunk = el('div', 'trunk');
      depts.forEach(function (x) {
        var dSteps = [], dAuto = 0, dHit = q && x.name.toLowerCase().indexOf(q) >= 0, fnEls = [];
        x.fns.forEach(function (f) {
          var key = x.id + '-' + f.id, fHit = q && f.name.toLowerCase().indexOf(q) >= 0, items = [];
          f.steps.forEach(function (s, i) { var t = taskCard(s, i, q); if (t.hit) fHit = true; items.push(t.li); });
          if (fHit) dHit = true; dSteps = dSteps.concat(f.steps);
          var fa = f.steps.filter(function (s) { return s[4]; }).length; dAuto += fa;
          var open = !!st.openF[key] || (q && fHit), n = cnt(f.steps);
          var fw = el('div', 'fn'); var fb = el('button', 'fcard' + (open ? ' open' : '') + (fHit ? ' hit' : '')); fb.type = 'button'; fb.setAttribute('aria-expanded', open ? 'true' : 'false');
          var fm = el('span', 'fm'); fm.appendChild(el('b', '', f.name));
          var meta = el('span', 'meta'); meta.appendChild(el('span', '', plural(f.steps.length, 'task')));
          ['E', 'B', 'M'].forEach(function (k) { if (n[k]) meta.appendChild(el('span', 'pill p-' + k, n[k] + ' ' + MODE[k])); });
          meta.appendChild(el('span', 'autoc', fa + ' automatable')); fm.appendChild(meta); fm.appendChild(mix(n, f.steps.length)); fb.appendChild(fm);
          var ch = el('span', 'chev'); ch.innerHTML = svg(CHEV, 14, 2.2); fb.appendChild(ch);
          fb.addEventListener('click', function () { st.openF[key] = !open; render(); });
          fw.appendChild(fb);
          if (open) { var ol = el('ol', 'tasks'); items.forEach(function (li) { ol.appendChild(li); }); fw.appendChild(ol); }
          fnEls.push(fw);
        });
        var open = !!st.openD[x.id] || (q && dHit), n = cnt(dSteps);
        var dw = el('div', 'dept'); var b = el('button', 'dcard' + (open ? ' open' : '') + (dHit ? ' hit' : '')); b.type = 'button'; b.setAttribute('aria-expanded', open ? 'true' : 'false');
        var ic = el('span', 'ic'); ic.innerHTML = svg(ICONS[x.icon] || ICONS[x.id] || ICONS.audit, 24); b.appendChild(ic);
        var mid = el('span', 'mid'); mid.appendChild(el('b', '', x.name)); mid.appendChild(el('span', 'about', x.about)); mid.appendChild(mix(n, dSteps.length));
        var nums = el('span', 'nums'); nums.appendChild(el('span', '', plural(x.fns.length, 'function'))); nums.appendChild(el('span', '', plural(dSteps.length, 'task')));
        nums.appendChild(el('span', '', Math.round(n.E / dSteps.length * 100) + '% in ERP')); nums.appendChild(el('span', 'autoc', dAuto + ' can be automated')); mid.appendChild(nums); b.appendChild(mid);
        var ch = el('span', 'chev'); ch.innerHTML = svg(CHEV, 16, 2.2); b.appendChild(ch);
        b.addEventListener('click', function () { st.openD[x.id] = !open; render(); });
        dw.appendChild(b);
        if (open) { var kids = el('div', 'kids'); fnEls.forEach(function (f) { kids.appendChild(f); }); dw.appendChild(kids); }
        trunk.appendChild(dw);
      });
      sec.appendChild(trunk); tree.appendChild(sec);
    });
    var autoBtn = document.getElementById('autoBtn'); autoBtn.setAttribute('aria-pressed', st.auto ? 'true' : 'false');
  }

  sel.addEventListener('change', function () { if (location.hash.slice(1) !== sel.value) location.hash = sel.value; else pick(sel.value); });
  window.addEventListener('hashchange', function () { pick(location.hash.slice(1)); });
  var timer; document.getElementById('q').addEventListener('input', function (e) { clearTimeout(timer); timer = setTimeout(function () { st.q = e.target.value; render(); }, 200); });
  document.getElementById('autoBtn').addEventListener('click', function () { st.auto = !st.auto; render(); });
  document.getElementById('openAll').addEventListener('click', function () { st.ind.depts.forEach(function (x) { st.openD[x.id] = true; x.fns.forEach(function (f) { st.openF[x.id + '-' + f.id] = true; }); }); render(); });
  document.getElementById('closeAll').addEventListener('click', function () { st.openD = {}; st.openF = {}; st.q = ''; document.getElementById('q').value = ''; render(); });
  pick(location.hash.slice(1) || 'drilling');
})();
