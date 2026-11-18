// Launch Control: an AI Gym game for A12. Mount with LaunchControl(element)
(function () {
  var C = {
    unit: "Call",
    intro: { title: "Eight launch calls, about 10 minutes", text: "You're the PM for Ledgerly's AI features. Each card is a real launch moment. Make the call first. Then pick the exact next step." },
    ask1: "1. What's the call?",
    kinds: [
      { id: "hold", name: "Hold", note: "Not ready: fix it before going further" },
      { id: "stage", name: "Roll out in stages", note: "Ready to learn from real users, carefully" },
      { id: "metric", name: "Fix the metric", note: "We're measuring the wrong thing" },
      { id: "pause", name: "Pause or roll back", note: "It's live and causing harm" }
    ],
    items: [
      { t: "The conference demo", out: "The AI help assistant scores 88% on the golden set. The launch bar in the spec is 95%. Marketing wants to announce it at a conference on Friday.", k: "hold",
        kw: "It's below the bar the team agreed. Shipping anyway teaches everyone the bar doesn't matter.",
        q: "What's the best move?", o: ["Fix the biggest failure type and re-run; if needed, demo it as a labelled beta for opt-in users only", "Ship to everyone and fix it later", "Lower the bar to 85%"], a: 0,
        qw: "The bar is your acceptance criterion. A clearly labelled, opt-in beta can still give marketing a story without breaking the promise." },
      { t: "Passed, but untested in the wild", out: "The expense categoriser passes every eval: 97% correct on 300 cases. No real customer has used it yet.", k: "stage",
        kw: "Evals catch what you imagined. Real users bring what you didn't. Time to learn, with a safety net.",
        q: "What's the rollout?", o: ["Dogfood for a week, then 5% of users with a holdout group, watching guardrail metrics daily", "100% on Monday", "Wait until it scores 100%"], a: 0,
        qw: "Stage it: internal, small percentage, then wider. A holdout tells you whether it actually helps." },
      { t: "The happy dashboard", out: "One month after launch, the dashboard shows \"AI messages sent\" up 300%. The team is celebrating.", k: "metric",
        kw: "Messages sent measures activity, not value. More messages can even mean people struggle to get an answer.",
        q: "What should the team track instead?", o: ["Task success: questions resolved without escalation, plus repeat questions and the edit or thumbs-down rate", "Total tokens used", "Number of AI features shipped"], a: 0,
        qw: "Pick an outcome metric tied to the user's job, with quality and guardrail metrics beside it." },
      { t: "The refund promises", out: "Two days into a 10% rollout, the assistant told three customers it had issued refunds. It can't. The spec set zero tolerance for invented actions.", k: "pause",
        kw: "A zero-tolerance failure is happening in production. Every hour adds affected customers.",
        q: "What's the next step?", o: ["Turn it off with the feature flag, contact the three customers, add the cases to the golden set, fix and re-test", "Keep it on and add a disclaimer", "Wait for a fourth case to be sure"], a: 0,
        qw: "Have a kill switch and an incident plan before launch (A8). Then every failure becomes a test case (A7)." },
      { t: "Quality fine, costs not", out: "The ticket assistant meets its quality bar, but costs €0.09 per ticket. The spec's budget was €0.02. Rollout to all customers is next week.", k: "hold",
        kw: "Wider rollout multiplies the gap. The cost bar is an acceptance criterion too.",
        q: "What's the move?", o: ["Hold the wider rollout; try routing and caching (A10), re-run evals, then widen", "Ship and raise prices later", "Remove the cost line from the spec"], a: 0,
        qw: "Quality, cost and latency are all part of \"done\". Fix the one that fails before you scale it." },
      { t: "Loved, but not used", out: "Beta users rate the AI report writer 9 out of 10. But only 8% use it again in week two.", k: "metric",
        kw: "Ratings capture first impressions and novelty. Repeat use shows whether it fits real work.",
        q: "What's the next step?", o: ["Track week-2 and week-4 retention and task completion, and interview people who stopped", "Celebrate the 9 out of 10", "Send more reminder emails"], a: 0,
        qw: "Retention and task success beat satisfaction scores for AI features, where novelty fades fast." },
      { t: "The new model", out: "The model provider releases a newer, cheaper version. An engineer wants to switch the production assistant to it today: \"It's better on benchmarks.\"", k: "stage",
        kw: "A model change is a product change. Public benchmarks don't measure your users' tasks.",
        q: "What's the move?", o: ["Run the golden set on the new model, compare cost and latency, then canary it to a small share of traffic", "Switch today; benchmarks are enough", "Never change models"], a: 0,
        qw: "Your evals are what make model upgrades safe and fast. That's the payoff of building them." },
      { t: "The one-line spec", out: "A stakeholder's spec for a new AI feature reads, in full: \"Make the assistant smarter about VAT.\"", k: "hold",
        kw: "No user problem, no examples, no acceptance criteria. Nobody can build, test or ship \"smarter\".",
        q: "What's the next step?", o: ["Write the AI spec: the user problem, 20 example questions with good answers, a launch bar, guardrails and a cost budget", "Start building and see", "Ask the model to make itself smarter"], a: 0,
        qw: "In AI products, examples and evals are the spec. Start with what \"good\" looks like." }
    ],
    end: [[0.85, "Mission control material. You held the bar, staged the risk and measured what matters."], [0.6, "Solid calls. Remember: acceptance criteria include quality, cost and safety, and outcome metrics beat activity."], [0, "Worth another round. For each call, ask: did it meet the bar we agreed, and what would we learn by shipping it?"]],
    rule: "The rule to keep: write the AI spec with evals as acceptance criteria, roll out in stages with a kill switch, and measure task success, quality, cost and harm, not activity."
  };
  window.LaunchControl = function (root) { window.TwoStepGame(root, C); };
})();
