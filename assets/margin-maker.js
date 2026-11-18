// Margin Maker: an AI Gym game for A10. Mount with MarginMaker(element)
(function () {
  var C = {
    unit: "Feature",
    intro: { title: "Eight cost problems, about 10 minutes", text: "Ledgerly's AI features are popular, and the bill is growing faster than revenue. For each one, pick the lever that helps most. Then choose the exact move." },
    ask1: "1. Which lever helps most?",
    kinds: [
      { id: "route", name: "Route to a cheaper model", note: "Not every task needs the best model" },
      { id: "cache", name: "Cache or batch", note: "Reuse repeated input, or wait for half price" },
      { id: "trim", name: "Trim the tokens", note: "Send and generate less" },
      { id: "price", name: "Change the pricing", note: "Make price follow cost or value" }
    ],
    items: [
      { t: "Expense categoriser", out: "Every bank transaction goes to the most capable model. The task: pick one of six categories. A test shows the smallest model matches the big one on 95% of transactions.", k: "route",
        kw: "A simple classification running on a frontier model. The cheap model does almost all of it just as well.",
        q: "What's the best move?", o: ["Send everything to the small model first; escalate only uncertain cases to the big one", "Keep the big model and cut the free plan", "Switch everything to the small model with no fallback"], a: 0,
        qw: "Routing with a fallback keeps quality where it matters. Check it against your golden set (A7) before and after." },
      { t: "Help assistant", out: "Each question sends the same 12,000-token help-centre guide plus the user's question, about 50 words. The guide is identical on every call.", k: "cache",
        kw: "Almost all the input is identical every time. That's exactly what prompt caching is for.",
        q: "What's the move?", o: ["Put the guide at the start of the prompt and cache it; only the question changes", "Shorten every question", "Send the guide only every other call"], a: 0,
        qw: "Providers charge a fraction of the input price for cached tokens: 0.1x on most Anthropic models, after a small write premium. Caching works on a stable prefix, so order matters." },
      { t: "Monthly report summaries", out: "On the 1st of each month, Ledgerly summarises every customer's month: 40,000 requests in an hour, at full real-time price. Nobody reads them until the next morning.", k: "cache",
        kw: "Nobody needs these instantly. Real-time pricing is paying for speed no one uses.",
        q: "What's the move?", o: ["Send them through the batch API overnight, at about half the price", "Summarise only paying customers", "Use a shorter summary template"], a: 0,
        qw: "Batch APIs from Anthropic, OpenAI and Google trade speed for price: results within 24 hours, for about 50% off." },
      { t: "Invoice explainer", out: "The AI explains each invoice line. Answers average 900 words; users read the first two sentences. Output tokens cost several times more than input tokens.", k: "trim",
        kw: "Paying for long answers that no one reads, on the most expensive kind of token.",
        q: "What's the move?", o: ["Ask for two sentences by default, with a \"tell me more\" button, and set a max output length", "Use a smaller font", "Explain only every second line"], a: 0,
        qw: "Shorter outputs are cheaper, faster and often better. Let people pull more when they want it." },
      { t: "Ticket assistant", out: "Every call sends the customer's full history: 200 past tickets, about 80,000 tokens. Most answers need only the last three tickets and the help article.", k: "trim",
        kw: "Sending the whole history is expensive and can bury the relevant bits. That's a context problem.",
        q: "What's the move?", o: ["Send the last three tickets plus the retrieved help article, and summarise older history once", "Use a model with a bigger context window", "Remove the history entirely"], a: 0,
        qw: "Context engineering (A4) is also cost engineering: send what the task needs, not everything you have." },
      { t: "Unlimited AI on the €9 plan", out: "\"Unlimited AI drafts\" on the €9 plan. The median user costs €0.40 a month. The top 2% cost €30 each, and they're growing.", k: "price",
        kw: "A flat price with unbounded usage. The heavy users turn your margin negative, and the pricing invites more of it.",
        q: "What's the move?", o: ["A generous included allowance, then a top-up or a higher plan, with a usage meter people can see", "Silently slow down heavy users", "Raise the price for everyone to €19"], a: 0,
        qw: "Fair limits, shown in advance, protect margin and trust. Surprise limits damage both, as Cursor learned in 2025." },
      { t: "AI bookkeeping agent", out: "An agent closes the month for a client: up to 40 model calls, and sometimes it loops. Cost per run varies from €0.05 to €6, and one run cost €48.", k: "trim",
        kw: "Agent loops multiply calls. The average hides a long, expensive tail.",
        q: "What's the move?", o: ["Cap steps and spend per run, stop on loops, and alert on outliers", "Charge clients per model call", "Use the agent only on Fridays"], a: 0,
        qw: "Budgets per task are a guardrail (A8) as well as a cost control. Watch the 95th percentile, not just the average." },
      { t: "AI support agent for clients", out: "Ledgerly wants to sell an AI agent that answers its customers' own clients. Customers ask: \"Why pay per seat for something that isn't a person?\"", k: "price",
        kw: "Seat pricing doesn't fit work done by AI. Customers want to pay for what it achieves.",
        q: "What's the best pricing?", o: ["Charge per resolved conversation, with a clear definition of \"resolved\" and a monthly cap", "Charge per AI seat", "Make it free to drive upgrades"], a: 0,
        qw: "Outcome pricing, like Intercom's $0.99 per Fin outcome, ties price to value. The definition of the outcome must be clear, or it becomes the argument." }
    ],
    end: [[0.85, "Healthy margins. You matched each cost to the lever that moves it, without hurting quality."], [0.6, "Good instincts. Remember: route first, cache what repeats, trim what nobody reads, and price for heavy users."], [0, "Worth another round. For each feature, ask: which tokens are we paying for that don't help the user?"]],
    rule: "The rule to keep: know your cost per task, use the cheapest model that passes your evals, cache and batch what you can, cap the tail, and make pricing follow value without surprises."
  };
  window.MarginMaker = function (root) { window.TwoStepGame(root, C); };
})();
