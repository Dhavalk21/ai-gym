// AI Gym shared two-step game engine. Each game file passes a config:
// { intro: {title, text}, unit: "Brief", kinds: [{id, name, note}], ask1: "1. ...",
//   items: [{t, k, kw, q, o:[3 options], a, qw, kinds?}], end: [[0.85, "..."], [0.6, "..."], [0, "..."]], rule: "..." }
(function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  window.TwoStepGame = function (root, C) {
    var s;
    function reset() { s = { i: -1, k: null, q: null, score: 0, max: 0 }; }
    reset();
    function kinds(c) { return c.kinds || C.kinds; }
    function nm(c, id) { return kinds(c).filter(function (x) { return x.id === id; })[0].name; }
    function render() {
      var h = '<div class="rr">', N = C.items.length;
      if (s.i === -1) {
        h += '<div class="rr-intro"><div><b class="rr-big">' + esc(C.intro.title) + '</b><p>' + esc(C.intro.text) + '</p>' +
          '<button type="button" class="btn light solid" data-act="start">Start</button></div></div>';
      } else if (s.i < N) {
        var c = C.items[s.i];
        h += '<div class="rr-top"><span>' + esc(C.unit) + ' ' + (s.i + 1) + ' of ' + N + '</span><span>Score ' + s.score + '</span></div>' +
          '<div class="rr-main" style="max-width:880px"><p class="rr-idea">' + esc(c.t) + '</p>' + (c.out ? '<pre class="rr-out">' + esc(c.out) + '</pre>' : '') +
          '<p class="rr-ask">' + esc(c.ask1 || C.ask1) + '</p><div class="rr-opts rr-4">' +
          kinds(c).map(function (o) {
            var cls = "rr-opt kind"; if (s.k !== null) cls += o.id === c.k ? " ok" : o.id === s.k ? " no" : " dim";
            return '<button type="button" class="' + cls + '" data-k="' + o.id + '"' + (s.k !== null ? " disabled" : "") + '><b>' + esc(o.name) + '</b>' + (o.note ? '<small>' + esc(o.note) + '</small>' : '') + '</button>';
          }).join("") + '</div>';
        if (s.k !== null) {
          h += '<p class="rr-why"><b>' + (s.k === c.k ? "Right. " : "Better: " + esc(nm(c, c.k)) + ". ") + '</b>' + esc(c.kw) + '</p>' +
            '<p class="rr-ask">2. ' + esc(c.q) + '</p><div class="rr-opts">' +
            [0, 1, 2].map(function (j) { return (j + s.i * 2) % 3; }).map(function (i) {
              var cls = "rr-opt"; if (s.q !== null) cls += i === c.a ? " ok" : i === s.q ? " no" : " dim";
              return '<button type="button" class="' + cls + '" data-q="' + i + '"' + (s.q !== null ? " disabled" : "") + '>' + esc(c.o[i]) + '</button>';
            }).join("") + '</div>';
        }
        if (s.q !== null) {
          h += '<p class="rr-why"><b>' + (s.q === c.a ? "Good call. " : "Not quite. ") + '</b>' + esc(c.qw) + '</p>' +
            '<button type="button" class="btn light solid" data-act="next">' + (s.i === N - 1 ? "See my score" : "Next " + C.unit.toLowerCase()) + '</button>';
        }
        h += '</div>';
      } else {
        var pct = s.score / s.max, msg = C.end.filter(function (e) { return pct >= e[0]; })[0][1];
        h += '<div class="rr-main" style="max-width:820px"><b class="rr-big">' + s.score + ' / ' + s.max + '</b><p>' + esc(msg) + '</p><p>' + esc(C.rule) + '</p>' +
          '<div class="row-actions"><button type="button" class="btn light solid" data-act="again">Play again</button></div></div>';
      }
      root.innerHTML = h + '</div>';
      root.querySelectorAll("[data-act]").forEach(function (b) {
        b.onclick = function () { var a = b.dataset.act; if (a === "again") reset(); else if (a === "next") { s.i++; s.k = null; s.q = null; } else s.i = 0; render(); var f = root.querySelector(".rr-opt:not([disabled]), [data-act]"); if (f) f.focus(); };
      });
      root.querySelectorAll("[data-k]").forEach(function (b) {
        b.onclick = function () { var c = C.items[s.i]; s.k = b.dataset.k; s.max += 20; if (s.k === c.k) s.score += 10; render(); var f = root.querySelector("[data-q]:not([disabled])"); if (f) f.focus(); };
      });
      root.querySelectorAll("[data-q]").forEach(function (b) {
        b.onclick = function () { var c = C.items[s.i]; s.q = +b.dataset.q; if (s.q === c.a) s.score += 10; render(); root.querySelector("[data-act]").focus(); };
      });
    }
    render();
  };
})();
