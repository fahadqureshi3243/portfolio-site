/* Gallery page: tabs, filters, search and cards, all built from data/projects.js */
function startGallery(S) {
  var ALL = S.PROJECTS.filter(function (p) { return p && p.title && p.category; }), SOON = S.comingSoon || [], MOCKS = window.MOCKS || {};
  ALL.forEach(function (p) { var m = MOCKS[p.title] || {}; if (!p.mock && m.kpis) p.mock = m; if (!p.nodes && m.nodes) p.nodes = m.nodes; p.industry = p.industry || 'All industries'; p.fn = p.fn || ''; p.desc = p.desc || ''; });
  var CATS = [
    { k: 'pbi', label: 'Power BI', icon: 'M5 20V12M10 20V8M15 20V4M20 20v-6' },
    { k: 'n8n', label: 'n8n Automation', icon: 'M5 7a2 2 0 1 0 0-.01M19 17a2 2 0 1 0 0-.01M7 7h5a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3' },
    { k: 'erp', label: 'ERP Workflows', icon: 'M12 3v5M12 8H6v4M12 8h6v4M6 12v3M18 12v3M10 3h4v4h-4zM3 15h6v5H3zM15 15h6v5h-6z' },
    { k: 'training', label: 'Training', icon: 'M3 8l9-4 9 4-9 4-9-4zM7 10v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5' },
    { k: 'finance', label: 'Finance Samples', icon: 'M4 4h16v16H4zM4 10h16M10 4v16' },
    { k: 'all', label: 'All work', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' }
  ];
  var CTA = { pbi: 'View', n8n: 'Watch', erp: 'Explore', training: 'Outline', finance: 'Open' };
  var FILE = { pbi: '.pbix', training: '.pdf', finance: '.xlsx' };
  var live = ALL.filter(function (p) { return SOON.indexOf(p.category) < 0; });
  var st = { tab: 'pbi', fns: [], inds: [], q: '', sort: 'featured', slide: {} };
  try { var h = location.hash.slice(1); if (CATS.some(function (c) { return c.k === h; })) st.tab = h; } catch (e) {}

  function el(t, cls, txt) { var e = document.createElement(t); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function icon(d, size) { return '<svg width="' + (size || 16) + '" height="' + (size || 16) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"></path></svg>'; }

  /* hero numbers */
  var stats = document.getElementById('stats');
  [['pbi', 'Power BI dashboards'], ['n8n', 'n8n workflows'], ['erp', 'ERP workflow maps']].forEach(function (s) {
    var d = el('div'); d.appendChild(el('b', '', String(ALL.filter(function (p) { return p.category === s[0]; }).length))); d.appendChild(el('span', '', s[1])); stats.appendChild(d);
  });

  function inTab() { return SOON.indexOf(st.tab) >= 0 ? [] : live.filter(function (p) { return st.tab === 'all' || p.category === st.tab; }); }
  function list() {
    var q = st.q.toLowerCase().trim();
    var l = inTab().filter(function (p) {
      return (!st.fns.length || st.fns.indexOf(p.fn) >= 0) && (!st.inds.length || st.inds.indexOf(p.industry) >= 0) &&
        (!q || (p.title + ' ' + p.desc + ' ' + p.fn + ' ' + p.industry).toLowerCase().indexOf(q) >= 0);
    });
    if (st.sort === 'az') l = l.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
    return l;
  }

  function renderFilters() {
    [['fnList', S.FUNCTIONS, 'fns', 'fn'], ['indList', S.INDUSTRIES, 'inds', 'industry']].forEach(function (f) {
      var box = document.getElementById(f[0]); box.textContent = '';
      f[1].forEach(function (v, i) {
        var lab = el('label'), sp = el('span'), cb = el('input'); cb.type = 'checkbox'; cb.id = f[0] + i; cb.checked = st[f[2]].indexOf(v) >= 0;
        cb.addEventListener('change', function () { var a = st[f[2]], j = a.indexOf(v); if (j >= 0) a.splice(j, 1); else a.push(v); render(); });
        sp.appendChild(cb); sp.appendChild(document.createTextNode(v)); lab.appendChild(sp);
        lab.appendChild(el('small', '', String(inTab().filter(function (p) { return p[f[3]] === v; }).length))); box.appendChild(lab);
      });
    });
  }

  function renderTabs() {
    var box = document.getElementById('tabs'); box.textContent = '';
    CATS.forEach(function (c) {
      var b = el('button', 'tab'); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', c.k === st.tab ? 'true' : 'false');
      var n = SOON.indexOf(c.k) >= 0 ? 'Soon' : String(c.k === 'all' ? live.length : ALL.filter(function (p) { return p.category === c.k; }).length);
      b.innerHTML = icon(c.icon); b.appendChild(el('span', '', c.label)); b.appendChild(el('small', '', n));
      b.addEventListener('click', function () { st.tab = c.k; try { history.replaceState(null, '', '#' + c.k); } catch (e) {} render(); });
      box.appendChild(b);
    });
  }

  function mockPbi(m) {
    var w = el('div', 'mock'), bar = el('div', 'bar'); bar.appendChild(el('span', '', m.short)); bar.appendChild(el('i')); w.appendChild(bar);
    var k = el('div', 'kpis'); m.kpis.forEach(function (x) { var d = el('div'); d.appendChild(el('span', '', x[0])); d.appendChild(el('b', '', x[1])); k.appendChild(d); }); w.appendChild(k);
    var ch = el('div', 'charts'), bars = el('div', 'bars'); m.bars.forEach(function (v) { var i = el('i'); i.style.height = v + '%'; bars.appendChild(i); }); ch.appendChild(bars);
    var db = el('div', 'donutbox'), dn = el('div', 'donut'); dn.style.background = 'conic-gradient(var(--accent) 0 ' + m.donut + '%, var(--grey) ' + m.donut + '% 100%)';
    dn.appendChild(el('span', '', m.donut + '%')); db.appendChild(dn); ch.appendChild(db); w.appendChild(ch); return w;
  }
  function mockFlow(nodes) {
    var w = el('div', 'flowmock');
    (nodes || ['Start', 'Step', 'Step', 'Done']).forEach(function (n, i, a) {
      var nd = el('div', 'node'), b = el('div', 'box'); b.appendChild(el('i')); b.appendChild(el('span', '', n)); nd.appendChild(b);
      if (i < a.length - 1) nd.appendChild(el('div', 'line')); w.appendChild(nd);
    });
    return w;
  }
  function mockErp(p) {
    var ind = (window.ERP_DATA || []).find(function (x) { return x.id === p.erp; });
    var a = el('a', 'erpmock'); a.href = 'erp-workflows.html#' + p.erp; a.setAttribute('aria-label', 'Open the ' + p.title);
    if (!ind) return a;
    var t = 0, n = { E: 0, B: 0, M: 0 }, auto = 0;
    ind.depts.forEach(function (d) { d.fns.forEach(function (f) { f.steps.forEach(function (s) { t++; n[s[2]]++; if (s[4]) auto++; }); }); });
    var r = el('div', 'r'); r.appendChild(el('span', 'eyebrow', 'ERP workflow map')); r.appendChild(el('span', '', t + ' tasks')); a.appendChild(r);
    a.appendChild(el('span', 'hub', 'ERP'));
    var dp = el('div', 'depts'); ind.depts.filter(function (d) { return d.g === 'core'; }).slice(0, 4).forEach(function (d) { dp.appendChild(el('span', '', d.name)); }); a.appendChild(dp);
    var mx = el('div', 'mix'); [['e', 'E'], ['b', 'B'], ['m', 'M']].forEach(function (k) { var i = el('i', k[0]); i.style.width = (n[k[1]] / t * 100) + '%'; mx.appendChild(i); }); a.appendChild(mx);
    var r2 = el('div', 'r'); r2.appendChild(el('span', '', Math.round(n.E / t * 100) + '% fully in ERP'));
    var au = el('span', '', Math.round(auto / t * 100) + '% automatable'); au.style.color = 'var(--accent-text)'; au.style.fontWeight = '700'; r2.appendChild(au); a.appendChild(r2);
    p._meta = ind.depts.length + ' departments · ' + t + ' tasks';
    return a;
  }

  function thumb(p) {
    var t = el('div', 'thumb'), imgs = p.images || [];
    if (imgs.length) {
      t.classList.add('has-img');
      var i = (st.slide[p.title] || 0) % imgs.length, im = el('img'); im.src = imgs[i]; im.alt = p.title + ' screenshot ' + (i + 1); im.loading = 'lazy';
      var zb = el('button', 'zoom'); zb.type = 'button'; zb.setAttribute('aria-label', 'Open ' + p.title + ' screenshot full size'); zb.appendChild(im); zb.onclick = function () { openViewer(p, i); }; t.appendChild(zb);
      if (imgs.length > 1) {
        t.appendChild(el('span', 'counter', (i + 1) + ' / ' + imgs.length));
        var go = function (j) { return function () { st.slide[p.title] = (j + imgs.length) % imgs.length; renderCards(); }; };
        var pv = el('button', 'nav prev'); pv.type = 'button'; pv.setAttribute('aria-label', 'Previous image'); pv.innerHTML = icon('m15 6-6 6 6 6'); pv.onclick = go(i - 1); t.appendChild(pv);
        var nx = el('button', 'nav next'); nx.type = 'button'; nx.setAttribute('aria-label', 'Next image'); nx.innerHTML = icon('m9 6 6 6-6 6'); nx.onclick = go(i + 1); t.appendChild(nx);
        var dots = el('div', 'dots'); imgs.forEach(function (_, j) { var d = el('button'); d.type = 'button'; d.setAttribute('aria-label', 'Show image ' + (j + 1)); if (j === i) d.setAttribute('aria-current', 'true'); d.onclick = go(j); dots.appendChild(d); }); t.appendChild(dots);
      }
      return t;
    }
    if (p.category === 'pbi' && p.mock) t.appendChild(mockPbi(p.mock));
    else if (p.category === 'n8n' && p.kind && window.DCLite) {
      t.style.padding = '12px 12px 26px';
      var btn = el('button', 'flowbtn'); btn.type = 'button'; btn.setAttribute('aria-label', 'Watch the ' + p.title + ' workflow');
      btn.onclick = function () { openFlow(p); };
      var box = el('div'); box.style.height = '158px'; btn.appendChild(box); t.appendChild(btn);
      thumbs.push(window.DCLite.mount(box, 'components/WfThumb.dc.html', { kind: p.kind }));
    }
    else if (p.category === 'n8n') t.appendChild(mockFlow(p.nodes));
    else if (p.category === 'erp') { t.style.padding = '12px'; t.appendChild(mockErp(p)); }
    return t;
  }

  function card(p) {
    var a = el('article', 'card'); a.appendChild(thumb(p));
    var b = el('div', 'body'); b.appendChild(el('h3', '', p.title)); b.appendChild(el('span', 'sub', p.industry + ' · ' + p.fn)); b.appendChild(el('p', '', p.desc));
    var f = el('div', 'foot'), m = el('span', 'meta'); m.appendChild(el('span', '', p._meta || p.meta || ''));
    if (p.download) { var ext = (p.download.split('?')[0].match(/\.([a-z0-9]+)$/i) || [])[1]; if (ext) m.appendChild(el('small', '', '.' + ext.toLowerCase())); }
    f.appendChild(m);
    var act = el('span', 'actions'), href = p.category === 'erp' ? 'erp-workflows.html#' + p.erp : (p.link || '');
    if (!href && (p.images || []).length) { var vb = el('button', 'open', 'View'); vb.type = 'button'; vb.onclick = function () { openViewer(p, 0); }; act.appendChild(vb); }
    if (href) { var o = el('a', 'open', CTA[p.category] || 'View'); o.href = href; if (/^https?:/.test(href)) { o.target = '_blank'; o.rel = 'noopener'; } act.appendChild(o); }
    else if (p.category === 'n8n' && p.kind) { var w = el('button', 'open', 'Watch'); w.type = 'button'; w.onclick = function () { openFlow(p); }; act.appendChild(w); }
    if (p.download && p.category !== 'erp') {
      var dl = el('a', 'dl'); dl.href = p.download; if (/^https?:/.test(p.download)) { dl.target = '_blank'; dl.rel = 'noopener'; } else dl.setAttribute('download', ''); dl.setAttribute('aria-label', 'Download ' + p.title);
      dl.innerHTML = icon('M12 4v11M7 10l5 5 5-5M5 20h14', 15) + 'Download'; act.appendChild(dl);
    }
    f.appendChild(act); b.appendChild(f); a.appendChild(b); return a;
  }

  /* animated n8n workflows */
  var thumbs = [], FLOW = { rfq: 'WfRequest', inv: 'WfInventory', hr: 'WfHiring', ops: 'WfOperations' }, flowInst = null;
  var PAGE = { ar: 'flows/ar-automation.html' };
  var dlg = document.getElementById('flowDlg');
  function openFlow(p) {
    if (!PAGE[p.kind] && (!window.DCLite || !FLOW[p.kind])) return;
    document.getElementById('flowTitle').textContent = 'n8n workflow · ' + p.title;
    var host = document.getElementById('flowHost'); if (flowInst) flowInst.unmount();
    if (PAGE[p.kind]) {
      var fr = el('iframe', 'flowframe'); fr.title = p.title + ' animated workflow'; fr.src = PAGE[p.kind] + '?embed=1';
      var fit = function () { try { fr.style.height = fr.contentDocument.documentElement.scrollHeight + 'px'; } catch (e) {} };
      fr.onload = function () { fit(); setTimeout(fit, 400); }; window.addEventListener('resize', fit);
      host.textContent = ''; host.appendChild(fr);
      flowInst = { unmount: function () { window.removeEventListener('resize', fit); host.textContent = ''; } };
    } else flowInst = window.DCLite.mount(host, 'components/' + FLOW[p.kind] + '.dc.html', {});
    dlg.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('flowClose').focus();
  }
  function closeFlow() { if (flowInst) { flowInst.unmount(); flowInst = null; } dlg.hidden = true; document.body.style.overflow = ''; }
  document.getElementById('flowClose').addEventListener('click', closeFlow);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeFlow(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !dlg.hidden) closeFlow(); });

  /* full-size screenshot viewer */
  var vw = document.getElementById('viewer'), vImg = document.getElementById('vImg'), vCap = document.getElementById('vCap'), vCur = null, vIdx = 0;
  function showV() { var imgs = vCur.images; vImg.src = imgs[vIdx]; vImg.alt = vCur.title + ' screenshot ' + (vIdx + 1); vCap.textContent = vCur.title + (imgs.length > 1 ? '  ·  ' + (vIdx + 1) + ' / ' + imgs.length : '');
    document.getElementById('vPrev').hidden = document.getElementById('vNext').hidden = imgs.length < 2; }
  function openViewer(p, i) { vCur = p; vIdx = i || 0; showV(); vw.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('vClose').focus(); }
  function closeViewer() { vw.hidden = true; document.body.style.overflow = ''; vImg.removeAttribute('src'); }
  function stepV(d) { var n = vCur.images.length; vIdx = (vIdx + d + n) % n; showV(); }
  document.getElementById('vClose').onclick = closeViewer;
  document.getElementById('vPrev').onclick = function () { stepV(-1); };
  document.getElementById('vNext').onclick = function () { stepV(1); };
  vw.addEventListener('click', function (e) { if (e.target === vw) closeViewer(); });
  document.addEventListener('keydown', function (e) { if (vw.hidden) return; if (e.key === 'Escape') closeViewer(); if (e.key === 'ArrowLeft') stepV(-1); if (e.key === 'ArrowRight') stepV(1); });

  function renderCards() {
    thumbs.forEach(function (x) { x.unmount(); }); thumbs = [];
    var box = document.getElementById('cards'), l = list(), soon = SOON.indexOf(st.tab) >= 0; box.textContent = '';
    l.forEach(function (p) { box.appendChild(card(p)); });
    document.getElementById('soon').hidden = !soon;
    document.getElementById('empty').hidden = soon || l.length > 0;
    document.getElementById('count').textContent = soon ? '' : l.length + (l.length === 1 ? ' result' : ' results');
    document.getElementById('showing').textContent = CATS.find(function (c) { return c.k === st.tab; }).label;
  }
  function render() { renderTabs(); renderFilters(); renderCards(); }

  document.getElementById('q').addEventListener('input', function (e) { st.q = e.target.value; renderCards(); });
  document.getElementById('sort').addEventListener('change', function (e) { st.sort = e.target.value; renderCards(); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-clear]'), function (b) { b.addEventListener('click', function () { st.fns = []; st.inds = []; st.q = ''; document.getElementById('q').value = ''; render(); }); });
  render();
  var hero = document.getElementById('heroDemo');
  if (hero && window.DCLite) window.DCLite.mount(hero, 'components/HeroDemo.dc.html', {});
}

/* Load the editable lists (changed through the admin screen) and start the page. */
(function () {
  function get(u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(u); return r.json(); }); }
  Promise.all([get('data/projects.json'), get('data/settings.json').catch(function () { return {}; })]).then(function (r) {
    startGallery({
      PROJECTS: r[0] || [], comingSoon: r[1].comingSoon || [],
      FUNCTIONS: ['FP&A', 'Accounting & Close', 'Procurement', 'Operations', 'Tax & Compliance', 'Treasury', 'HR & Payroll', 'Valuation', 'ERP & Process'],
      INDUSTRIES: ['Oil & Gas', 'Petrochemicals', 'Construction', 'Manufacturing', 'Logistics', 'Entertainment', 'Healthcare', 'All industries']
    });
  }).catch(function (e) { console.error(e); document.getElementById('cards').textContent = 'Could not load the projects list.'; });
})();
