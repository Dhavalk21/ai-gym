// Fit or Fad: an AI Gym game for A2. Mount with FitOrFad(element)
(function () {
  var CALLS = [
    { id: "auto", name: "Automate it", note: "AI does it; people fix the rare miss" },
    { id: "aug", name: "Augment", note: "AI suggests or drafts; a person decides" },
    { id: "kill", name: "Kill it", note: "Use plain code, or don't build it" }
  ];
  var IDEAS = [
    { t: "Ledgerly writes late-payment reminders with AI and sends them to clients automatically, with no review.", c: "aug",
      cw: "These emails go to the user's clients, and a wrong tone or a wrong amount can cost a relationship. Start with AI drafts the user approves; that's one rung down the ladder.",
      q: "What would let you move up to auto-send later?", o: ["Track how often users edit the drafts; when edits fall close to zero, offer auto-send as an option", "Ship auto-send to everyone now and watch complaints", "Make the emails longer and more formal"], a: 0,
      qw: "Edit rate is evidence of trust. Climb the ladder when the data says users stopped changing the drafts, not before." },
    { t: "Use AI to calculate VAT and totals on every invoice.", c: "kill",
      cw: "Totals and VAT are exact, rule-based and legally binding. Plain code is exact, instant and practically free; a model adds cost and a chance of being wrong.",
      q: "Which question settles it fastest?", o: ["Is there a correct answer that a rule can compute?", "Would AI make it feel more modern?", "Do competitors use AI here?"], a: 0,
      qw: "If a rule gives the exact answer, use the rule. Save AI for messy language, judgement and variety." },
    { t: "Sort bank transactions like \"SHELL 4432 HAMBURG\" into expense categories automatically.", c: "auto",
      cw: "Messy text, very high volume, and a wrong category is cheap and easy to fix. A good fit for automation, with one-tap correction.",
      q: "What makes automating this safe?", o: ["Mistakes are cheap, easy to see and easy to fix, and corrections teach the system", "The model is always right about categories", "Users never look at categories"], a: 0,
      qw: "Low cost of error plus easy reversal is the green light for automation. The corrections are also free training data." },
    { t: "A competitor added an AI chatbot to its pricing page. Leadership wants one too, \"to answer anything\".", c: "kill",
      cw: "This starts from a competitor's feature, not a user problem. A clear pricing page answers most pricing questions better, faster and more reliably.",
      q: "Which question would you ask first?", o: ["Which user problem does this solve better than a clearer pricing page?", "Which model is the most impressive?", "How fast can we ship it?"], a: 0,
      qw: "Problem first. If nobody can name the problem, it's AI theatre: it demos well and changes nothing." },
    { t: "Tell freelancers which of their expenses are tax-deductible in their country.", c: "aug",
      cw: "Useful, but tax rules vary by country and situation, and wrong advice is costly. Give general guidance with sources, and hand off to a tax adviser for the decision.",
      q: "What's the biggest risk to design for?", o: ["Confident, wrong advice that a user files on their tax return", "Answers that are too short", "Users who ask too many questions"], a: 0,
      qw: "Design for the confident mistake: cite official sources, show uncertainty, and say clearly when to ask a professional." },
    { t: "Before a big invoice goes out, write a short note on the client's risk of paying late.", c: "aug",
      cw: "It's a judgement call the user should own. AI can summarise the evidence; the user decides on terms or a deposit.",
      q: "What does it need to be more than a guess?", o: ["Ledgerly's own payment history for that client", "A bigger model", "A higher temperature"], a: 0,
      qw: "Without the client's real payment history, any \"risk note\" is a fluent guess. The data is what makes it useful." },
    { t: "Read supplier invoices that users upload as PDFs and fill in amount, date and supplier.", c: "auto",
      cw: "High volume, tedious work, and users can check the fields at a glance. Automate it, and let the uncertain ones through to a person.",
      q: "What keeps it safe at scale?", o: ["Low-confidence fields go to the user to confirm before anything is booked", "Never show users the extracted fields", "Process every invoice twice and hope"], a: 0,
      qw: "Automation with an escape hatch: confident cases flow through, uncertain ones get a human look." },
    { t: "Send each user a weekly cash-flow summary in plain language, based on their numbers.", c: "auto",
      cw: "Low stakes, high value and repetitive: good for automation, as long as the numbers themselves are right.",
      q: "How do you keep the numbers right?", o: ["Compute every number in code; the model only writes the sentences around them", "Ask the model to double-check its maths", "Round everything to make it simpler"], a: 0,
      qw: "Split the job: code for facts and maths, the model for words. That pattern prevents a whole class of errors." }
  ];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function nm(id) { return CALLS.filter(function (x) { return x.id === id; })[0].name; }

  window.FitOrFad = function (root) {
    var s;
    function reset() { s = { i: -1, c: null, q: null, score: 0, max: 0 }; }
    reset();
    function render() {
      var h = '<div class="rr">';
      if (s.i === -1) {
        h += '<div class="rr-intro"><div><b class="rr-big">Eight ideas, about 10 minutes</b>' +
          '<p>Ledgerly\'s team has a list of AI ideas. For each one, make the call: automate it, use AI to help a person, or kill it. Then answer the question that decides whether it works.</p>' +
          '<button type="button" class="btn light solid" data-act="start">Start</button></div></div>';
      } else if (s.i < IDEAS.length) {
        var c = IDEAS[s.i];
        h += '<div class="rr-top"><span>Idea ' + (s.i + 1) + ' of ' + IDEAS.length + '</span><span>Score ' + s.score + '</span></div>' +
          '<div class="rr-main" style="max-width:880px"><p class="rr-idea">' + esc(c.t) + '</p><p class="rr-ask">1. Your call?</p><div class="rr-opts rr-4">' +
          CALLS.map(function (o) {
            var cls = "rr-opt kind"; if (s.c !== null) cls += o.id === c.c ? " ok" : o.id === s.c ? " no" : " dim";
            return '<button type="button" class="' + cls + '" data-c="' + o.id + '"' + (s.c !== null ? " disabled" : "") + '><b>' + esc(o.name) + '</b><small>' + esc(o.note) + '</small></button>';
          }).join("") + '</div>';
        if (s.c !== null) {
          h += '<p class="rr-why"><b>' + (s.c === c.c ? "Good call. " : "Better: " + esc(nm(c.c)) + ". ") + '</b>' + esc(c.cw) + '</p>' +
            '<p class="rr-ask">2. ' + esc(c.q) + '</p><div class="rr-opts">' +
            [0, 1, 2].map(function (j) { return (j + s.i * 2) % 3; }).map(function (i) {
              var cls = "rr-opt"; if (s.q !== null) cls += i === c.a ? " ok" : i === s.q ? " no" : " dim";
              return '<button type="button" class="' + cls + '" data-q="' + i + '"' + (s.q !== null ? " disabled" : "") + '>' + esc(c.o[i]) + '</button>';
            }).join("") + '</div>';
        }
        if (s.q !== null) {
          h += '<p class="rr-why"><b>' + (s.q === c.a ? "Right. " : "Not quite. ") + '</b>' + esc(c.qw) + '</p>' +
            '<button type="button" class="btn light solid" data-act="next">' + (s.i === IDEAS.length - 1 ? "See my score" : "Next idea") + '</button>';
        }
        h += '</div>';
      } else {
        var pct = s.score / s.max;
        h += '<div class="rr-main" style="max-width:820px"><b class="rr-big">' + s.score + ' / ' + s.max + '</b>' +
          '<p>' + (pct >= 0.85 ? "A sharp filter. You backed the fits and killed the fads." : pct >= 0.6 ? "Solid. Look again at the ones you missed: the clue is usually the cost of a mistake, or whether a rule would do." : "Worth another round. Ask three things each time: is there a real problem, would a rule do, and what does a mistake cost?") + '</p>' +
          '<p>The pattern to keep: code for exact answers, AI for messy language and judgement, and a person wherever a mistake is expensive.</p>' +
          '<div class="row-actions"><button type="button" class="btn light solid" data-act="again">Play again</button></div></div>';
      }
      root.innerHTML = h + '</div>';
      root.querySelectorAll("[data-act]").forEach(function (b) {
        b.onclick = function () { var a = b.dataset.act; if (a === "again") reset(); else if (a === "next") { s.i++; s.c = null; s.q = null; } else s.i = 0; render(); var f = root.querySelector(".rr-opt:not([disabled]), [data-act]"); if (f) f.focus(); };
      });
      root.querySelectorAll("[data-c]").forEach(function (b) {
        b.onclick = function () { var c = IDEAS[s.i]; s.c = b.dataset.c; s.max += 20; if (s.c === c.c) s.score += 10; render(); var f = root.querySelector("[data-q]:not([disabled])"); if (f) f.focus(); };
      });
      root.querySelectorAll("[data-q]").forEach(function (b) {
        b.onclick = function () { var c = IDEAS[s.i]; s.q = +b.dataset.q; if (s.q === c.a) s.score += 10; render(); root.querySelector("[data-act]").focus(); };
      });
    }
    render();
  };
})();
