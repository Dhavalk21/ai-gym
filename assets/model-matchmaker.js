// Model Matchmaker: an AI Gym game for A1. Mount with ModelMatchmaker(element)
(function () {
  var KINDS = [
    { id: "small", name: "Fast, small model", note: "Cheap, quick, good enough for simple, high-volume jobs" },
    { id: "frontier", name: "Frontier reasoning model", note: "Slower and pricier, best at hard, multi-step work" },
    { id: "multi", name: "Multimodal model", note: "Reads images, audio or scanned documents, not only text" },
    { id: "open", name: "Open-weight model you host", note: "Runs on your own servers, so the data stays with you" }
  ];
  var BRIEFS = [
    { t: "Ledgerly wants to suggest the next words of an invoice line as the user types. About two million suggestions a day, and each must appear in well under half a second.", k: "small",
      kw: "Speed and volume decide this one. A big reasoning model would be too slow and far too expensive at two million calls a day. Cursor makes the same call for its Tab completions: a model built for speed, running on every keystroke.",
      q: "Which number tells you if it's working?", o: ["How often people accept a suggestion", "The model's score on a maths benchmark", "How long the suggestions are"], a: 0,
      qw: "Accept rate is the user voting with the Tab key. Cursor reported its new Tab model made 21% fewer suggestions with a 28% higher accept rate: knowing when not to suggest is part of quality." },
    { t: "Once a month, Ledgerly drafts tax-prep notes from a freelancer's 12 months of invoices and expenses. Accuracy matters far more than speed, and it runs only once per user per month.", k: "frontier",
      kw: "Hard, multi-step reasoning over lots of numbers, at low volume. This is where a frontier reasoning model earns its price and its slower answers.",
      q: "What protects the freelancer from a confident mistake?", o: ["Every claim cites the invoice or expense line it comes from, and the user confirms", "Raise the temperature so it thinks more creatively", "Tell the model to be accurate"], a: 0,
      qw: "Models can be fluent and wrong. Citing the source line for each claim makes errors visible, and a human check keeps the final call with the person who signs the tax return." },
    { t: "Freelancers photograph crumpled paper receipts. Ledgerly needs the date, amount, VAT and vendor from each photo.", k: "multi",
      kw: "The input is an image, so you need a model that can read images. Many frontier models are multimodal too; the defining need here is the input type.",
      q: "What should the model return?", o: ["Structured data that matches a fixed schema (date, amount, VAT, vendor)", "A friendly paragraph describing the receipt", "Whatever format it likes"], a: 0,
      qw: "Your code has to put these values in the books. A fixed schema (structured output) means every answer has the same fields, and missing or odd values can be caught automatically." },
    { t: "A German bank wants Ledgerly for its business customers, on one condition: invoice data must never leave the bank's own servers.", k: "open",
      kw: "When data can't go to an outside API, you run a model yourself. Open-weight models can be downloaded and hosted. For example, OpenAI released gpt-oss under the Apache 2.0 licence in August 2025.",
      q: "What do you take on by hosting it yourself?", o: ["Running, scaling, securing and updating it, which a vendor API did for you", "Nothing, it's the same as calling an API", "You can't use it in a commercial product"], a: 0,
      qw: "Open weights give you control and privacy, and you pay for them in operations work. Always check the licence: many are permissive, but some limit commercial use." },
    { t: "Marketing wants 20 different, friendly subject lines for late-payment reminder emails, to A/B test.", k: "small",
      kw: "Short, easy, creative text. A small model does this well for a fraction of a cent. A frontier model wouldn't make the subject lines meaningfully better.",
      q: "Which setting matters most here?", o: ["A higher temperature, for more varied options", "Temperature 0, so every run is identical", "The biggest context window you can get"], a: 0,
      qw: "Temperature controls how adventurous the sampling is. For brainstorming you want variety, so turn it up. For extraction or classification, keep it low." },
    { t: "A voice note feature: freelancers dictate expenses while driving, such as \"forty-two euros fifty, fuel, Shell, today\".", k: "multi",
      kw: "The input is audio, so you need speech recognition or a model that takes audio directly.",
      q: "What must happen before an amount goes into the books?", o: ["Read it back or show it, and let the user confirm", "Nothing, speech recognition is perfect now", "Ask the model to double-check itself"], a: 0,
      qw: "\"Forty-two fifty\" or \"forty-two fifteen\"? Mishearing is cheap to catch and expensive to miss. A one-tap confirmation turns a silent error into a visible one." },
    { t: "An assistant that reconciles a messy bank statement with open invoices: partial payments, typos in references, one payment covering three invoices. Run a few times a month per user.", k: "frontier",
      kw: "Many steps, lots of edge cases, and errors that cost money. A frontier reasoning model fits, and the low volume keeps the cost reasonable.",
      q: "How do you decide which model is good enough?", o: ["Test candidates on 50 real, messy statements and compare the results", "Pick the model at the top of a public leaderboard", "Trust the vendor's benchmark numbers"], a: 0,
      qw: "Leaderboards and benchmarks measure someone else's tasks, and can be gamed. Your own test set measures yours. That's the core of evals, which A7 covers." },
    { t: "A help-centre chatbot answers questions like \"how do I add a second VAT rate?\" from Ledgerly's 300 help articles.", k: "small",
      kw: "Answering from a known set of articles doesn't need a frontier model. A fast, cheap model does it well, if it gets the right article.",
      q: "What does it need most?", o: ["The relevant help articles retrieved into its context for each question", "A bigger model, so it knows Ledgerly better", "A higher temperature"], a: 0,
      qw: "No model was trained on your help centre. Retrieving the right articles (RAG, covered in A4) fixes that; a bigger model would just guess more fluently." }
  ];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function nm(id) { return KINDS.filter(function (x) { return x.id === id; })[0].name; }

  window.ModelMatchmaker = function (root) {
    var s;
    function reset() { s = { i: -1, k: null, q: null, score: 0, max: 0 }; }
    reset();
    function render() {
      var h = '<div class="rr">';
      if (s.i === -1) {
        h += '<div class="rr-intro"><div><b class="rr-big">Eight briefs, about 10 minutes</b>' +
          '<p>Ledgerly, an invoicing app for EU freelancers, is adding AI in eight places. For each brief, pick the kind of model that fits, then make the call that decides whether it works.</p>' +
          '<button type="button" class="btn light solid" data-act="start">Start</button></div></div>';
      } else if (s.i < BRIEFS.length) {
        var c = BRIEFS[s.i];
        h += '<div class="rr-top"><span>Brief ' + (s.i + 1) + ' of ' + BRIEFS.length + '</span><span>Score ' + s.score + '</span></div>' +
          '<div class="rr-main" style="max-width:880px"><p class="rr-idea">' + esc(c.t) + '</p><p class="rr-ask">1. Which kind of model fits?</p><div class="rr-opts rr-4">' +
          KINDS.map(function (o) {
            var cls = "rr-opt kind"; if (s.k !== null) cls += o.id === c.k ? " ok" : o.id === s.k ? " no" : " dim";
            return '<button type="button" class="' + cls + '" data-k="' + o.id + '"' + (s.k !== null ? " disabled" : "") + '><b>' + esc(o.name) + '</b><small>' + esc(o.note) + '</small></button>';
          }).join("") + '</div>';
        if (s.k !== null) {
          h += '<p class="rr-why"><b>' + (s.k === c.k ? "Good match. " : "Better: " + esc(nm(c.k)) + ". ") + '</b>' + esc(c.kw) + '</p>' +
            '<p class="rr-ask">2. ' + esc(c.q) + '</p><div class="rr-opts">' +
            [0, 1, 2].map(function (j) { return (j + s.i) % 3; }).map(function (i) { var o = c.o[i];
              var cls = "rr-opt"; if (s.q !== null) cls += i === c.a ? " ok" : i === s.q ? " no" : " dim";
              return '<button type="button" class="' + cls + '" data-q="' + i + '"' + (s.q !== null ? " disabled" : "") + '>' + esc(o) + '</button>';
            }).join("") + '</div>';
        }
        if (s.q !== null) {
          h += '<p class="rr-why"><b>' + (s.q === c.a ? "Right call. " : "Not quite. ") + '</b>' + esc(c.qw) + '</p>' +
            '<button type="button" class="btn light solid" data-act="next">' + (s.i === BRIEFS.length - 1 ? "See my score" : "Next brief") + '</button>';
        }
        h += '</div>';
      } else {
        var pct = s.score / s.max;
        h += '<div class="rr-main" style="max-width:820px"><b class="rr-big">' + s.score + ' / ' + s.max + '</b>' +
          '<p>' + (pct >= 0.85 ? "Sharp matchmaking. You picked models by the job, not by the hype." : pct >= 0.6 ? "Solid. Look back at the briefs you missed: the clue is usually speed, volume, input type or where the data may go." : "Worth a second round. Start from the job: how fast, how often, what input, and where the data is allowed to go.") + '</p>' +
          '<p>The rule to keep: choose the smallest model that passes your own test set, and remember that context, settings and checks often matter more than the model.</p>' +
          '<div class="row-actions"><button type="button" class="btn light solid" data-act="again">Play again</button></div></div>';
      }
      root.innerHTML = h + '</div>';
      root.querySelectorAll("[data-act]").forEach(function (b) {
        b.onclick = function () { var a = b.dataset.act; if (a === "again") reset(); else if (a === "next") { s.i++; s.k = null; s.q = null; } else s.i = 0; render(); var f = root.querySelector(".rr-opt:not([disabled]), [data-act]"); if (f) f.focus(); };
      });
      root.querySelectorAll("[data-k]").forEach(function (b) {
        b.onclick = function () { var c = BRIEFS[s.i]; s.k = b.dataset.k; s.max += 10; if (s.k === c.k) s.score += 10; s.max += 10; render(); var f = root.querySelector("[data-q]:not([disabled])"); if (f) f.focus(); };
      });
      root.querySelectorAll("[data-q]").forEach(function (b) {
        b.onclick = function () { var c = BRIEFS[s.i]; s.q = +b.dataset.q; if (s.q === c.a) s.score += 10; render(); root.querySelector("[data-act]").focus(); };
      });
    }
    render();
  };
})();
