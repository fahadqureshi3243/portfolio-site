/*
  dc-lite: a tiny player for the animated workflow components in /components (*.dc.html).
  Supports {{holes}} in text and attributes, <sc-for>, <sc-if>, onClick-style events, ref,
  setState and the React-style lifecycle methods the components use.
*/
(function () {
  var cache = {}, headDone = {};

  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (patch) {
    if (typeof patch === 'function') patch = patch(this.state, this.props);
    this.state = Object.assign({}, this.state, patch);
    if (this.__inst) this.__inst.schedule();
  };
  DCLogic.prototype.forceUpdate = function () { if (this.__inst) this.__inst.schedule(); };

  function load(url) {
    if (!cache[url]) cache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ' ' + r.status); return r.text(); }).then(parse);
    return cache[url];
  }
  function parse(src) {
    var doc = new DOMParser().parseFromString(src, 'text/html');
    var x = doc.querySelector('x-dc'), helmet = x.querySelector('helmet'), head = [];
    if (helmet) { Array.prototype.forEach.call(helmet.children, function (c) { head.push(c.outerHTML); }); helmet.remove(); }
    var sc = doc.querySelector('script[data-dc-script]');
    var Comp = new Function('DCLogic', sc.textContent + '\n;return Component;')(DCLogic);
    // Rebuild the template with the HTML parser so inline SVG keeps its namespace.
    var tpl = document.createElement('template'); tpl.innerHTML = x.innerHTML;
    return { tpl: tpl, Comp: Comp, head: head, key: src.length + ':' + src.slice(0, 80) };
  }

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g, WHOLE = /^\{\{\s*([^}]+?)\s*\}\}$/;
  function look(path, scope) {
    if (path === 'true') return true; if (path === 'false') return false; if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return parseFloat(path);
    if (/^'.*'$|^".*"$/.test(path)) return path.slice(1, -1);
    var parts = path.split('.'), v;
    for (var s = scope; s; s = s.__up) { if (Object.prototype.hasOwnProperty.call(s, parts[0])) { v = s[parts[0]]; break; } }
    for (var i = 1; i < parts.length && v != null; i++) v = v[parts[i]];
    return v;
  }
  function interp(str, scope) { return str.replace(HOLE, function (_, p) { var v = look(p, scope); return v == null ? '' : String(v); }); }
  var BOOL = { checked: 1, selected: 1, disabled: 1, hidden: 1, open: 1, readonly: 1, required: 1 };

  // Build live DOM from a template node, collecting update functions.
  function build(node, scope, ups, inst) {
    if (node.nodeType === 3) {
      var t = document.createTextNode(node.nodeValue);
      if (node.nodeValue.indexOf('{{') >= 0) { var raw = node.nodeValue; ups.push(function (sc) { var v = interp(raw, sc); if (t.nodeValue !== v) t.nodeValue = v; }); }
      return t;
    }
    if (node.nodeType !== 1) return node.cloneNode(false);
    var tag = node.localName;
    if (tag === 'sc-for' || tag === 'sc-if') return block(node, tag, ups, inst);
    if (tag === 'dc-import') return importer(node, ups, inst);
    var el = node.namespaceURI && node.namespaceURI !== 'http://www.w3.org/1999/xhtml' ? document.createElementNS(node.namespaceURI, node.tagName) : document.createElement(tag);
    Array.prototype.forEach.call(node.attributes, function (a) {
      var name = a.name, val = a.value;
      if (val.indexOf('{{') < 0) { el.setAttribute(name, val); return; }
      var whole = WHOLE.exec(val);
      if (/^on[a-z]/i.test(name) && whole) {
        var evt = name.slice(2).toLowerCase(), cur = null;
        if (evt === 'doubleclick') evt = 'dblclick';
        el.addEventListener(evt, function (e) { if (typeof cur === 'function') cur(e); });
        ups.push(function (sc) { cur = look(whole[1], sc); }); return;
      }
      if (name === 'ref' && whole) { var done = false; ups.push(function (sc) { if (done) return; var f = look(whole[1], sc); if (typeof f === 'function') { f(el); done = true; } }); return; }
      var attr = name === 'classname' ? 'class' : name;
      ups.push(function (sc) {
        var v = whole ? look(whole[1], sc) : interp(val, sc);
        if (BOOL[attr]) { var on = v === true || v === 'true'; if (attr in el) el[attr] = on; if (on) el.setAttribute(attr, ''); else el.removeAttribute(attr); return; }
        if (attr === 'value' && 'value' in el) { var s = v == null ? '' : String(v); if (el.value !== s) el.value = s; return; }
        var s2 = v == null ? '' : String(v); if (el.getAttribute(attr) !== s2) el.setAttribute(attr, s2);
      });
    });
    var host = tag === 'template' ? el.content : el;
    Array.prototype.forEach.call((node.content || node).childNodes, function (c) { host.appendChild(build(c, scope, ups, inst)); });
    return el;
  }

  function block(node, tag, ups, inst) {
    var start = document.createComment(tag), end = document.createComment('/' + tag), frag = document.createDocumentFragment();
    frag.appendChild(start); frag.appendChild(end);
    var path = WHOLE.exec(node.getAttribute(tag === 'sc-for' ? 'list' : 'value') || '');
    var as = node.getAttribute('as') || 'item', items = [];
    ups.push(function (sc) {
      var v = path ? look(path[1], sc) : null;
      var list = tag === 'sc-for' ? (Array.isArray(v) ? v : []) : (v ? [null] : []);
      // grow or shrink the rendered copies, then update each with its own scope
      while (items.length > list.length) { var it = items.pop(); it.nodes.forEach(function (n) { n.parentNode && n.parentNode.removeChild(n); }); }
      while (items.length < list.length) {
        var u = [], nodes = [];
        Array.prototype.forEach.call(node.childNodes, function (c) { nodes.push(build(c, null, u, inst)); });
        var f = document.createDocumentFragment(); nodes.forEach(function (n) { f.appendChild(n); });
        end.parentNode.insertBefore(f, end); items.push({ ups: u, nodes: nodes });
      }
      items.forEach(function (it, i) {
        var s = { __up: sc }; if (tag === 'sc-for') { s[as] = list[i]; s.$index = i; }
        it.ups.forEach(function (fn) { fn(s); });
      });
    });
    return frag;
  }

  function importer(node, ups, inst) {
    var box = document.createElement('div'), name = node.getAttribute('name'), child = null, props = {};
    var size = (node.getAttribute('hint-size') || '').split(',');
    box.style.width = size[0] || '100%';
    ups.push(function (sc) {
      var p = {};
      Array.prototype.forEach.call(node.attributes, function (a) {
        if (a.name === 'name' || a.name.indexOf('hint-') === 0) return;
        var key = a.name.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }), w = WHOLE.exec(a.value);
        p[key] = w ? look(w[1], sc) : (a.value.indexOf('{{') >= 0 ? interp(a.value, sc) : a.value);
      });
      if (!child) { child = mount(box, inst.base + name + '.dc.html', p); inst.kids.push(child); }
      else child.update(p);
    });
    return box;
  }

  function mount(target, url, props) {
    var inst = { base: url.replace(/[^/]*$/, ''), kids: [], comp: null, ups: null, queued: false, dead: false };
    inst.schedule = function () { if (inst.queued || inst.dead) return; inst.queued = true; Promise.resolve().then(function () { inst.queued = false; inst.render(); }); };
    inst.render = function () {
      if (inst.dead || !inst.comp) return;
      var prevProps = inst.prevProps || inst.comp.props, prevState = inst.prevState || inst.comp.state;
      var vals = inst.comp.renderVals() || {};
      inst.ups.forEach(function (fn) { fn(vals); });
      inst.prevProps = inst.comp.props; inst.prevState = inst.comp.state;
      if (inst.mounted && inst.comp.componentDidUpdate) { try { inst.comp.componentDidUpdate(prevProps, prevState); } catch (e) { console.error(e); } }
    };
    inst.update = function (p) { if (!inst.comp) { inst.pending = p; return; } inst.comp.props = Object.assign({}, inst.comp.props, p); inst.schedule(); };
    inst.unmount = function () {
      inst.dead = true; inst.kids.forEach(function (k) { k.unmount(); });
      if (inst.comp && inst.comp.componentWillUnmount) { try { inst.comp.componentWillUnmount(); } catch (e) {} }
      target.textContent = '';
    };
    inst.ready = load(url).then(function (def) {
      if (inst.dead) return;
      def.head.forEach(function (h) { if (headDone[h] || h.indexOf('<style') === 0) return; headDone[h] = 1; document.head.insertAdjacentHTML('beforeend', h); });
      var comp = new def.Comp(Object.assign({}, props, inst.pending || {}));
      if (!comp.state) comp.state = {};
      comp.__inst = inst; inst.comp = comp;
      var ups = [], frag = document.createDocumentFragment();
      Array.prototype.forEach.call(def.tpl.content.childNodes, function (c) { frag.appendChild(build(c, null, ups, inst)); });
      inst.ups = ups; inst.render(); target.textContent = ''; target.appendChild(frag);
      inst.mounted = true;
      if (comp.componentDidMount) { try { comp.componentDidMount(); } catch (e) { console.error(e); } }
    }).catch(function (e) { console.error(e); target.textContent = ''; });
    return inst;
  }

  window.DCLite = { mount: mount };
})();
