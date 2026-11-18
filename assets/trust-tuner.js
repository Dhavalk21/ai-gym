// Trust Tuner: an AI Gym game for A9. Mount with TrustTuner(element)
(function () {
  var C = {
    unit: "Screen",
    intro: { title: "Eight AI screens, about 10 minutes", text: "Ledgerly is adding AI across the product, and the research team has flagged eight screens. For each one, name the trust problem first. Then pick the design change that fixes it." },
    ask1: "1. What's the trust problem?",
    kinds: [
      { id: "over", name: "Over-trust", note: "People accept it without checking" },
      { id: "under", name: "Under-trust", note: "People ignore or avoid it" },
      { id: "auto", name: "Too much autonomy", note: "It acts where it should ask" },
      { id: "stuck", name: "No way back", note: "Hard to correct, dismiss or undo" }
    ],
    items: [
      { t: "Expense categoriser", out: "The AI sorts 300 bank transactions into tax categories. One button: \"Accept all\". Research: 9 in 10 users click it within five seconds. About 4% of categories are wrong.", k: "over",
        kw: "People accept without checking, and the mistakes land in their tax return. Easy acceptance of an imperfect system is over-trust by design.",
        q: "What's the best change?", o: ["Accept the confident ones in bulk, and send the uncertain ones to a short \"please check\" list", "Remove the AI and let people sort by hand", "Add \"AI can make mistakes\" in small print"], a: 0,
        qw: "Spend the user's attention where the model is unsure. Matching precision to performance is HAX guideline 2." },
      { t: "Invoice reminder writer", out: "The AI drafts payment reminder emails. Research: most users never open it. In interviews: \"I don't know what it will say to my clients.\"", k: "under",
        kw: "The feature works, but people can't predict it, so they don't use it. That's under-trust from a missing mental model.",
        q: "What builds the right trust?", o: ["Show a full example draft before first use, and always show the draft for editing before it's sent", "Rename it \"Smart reminders\"", "Turn it on by default for everyone"], a: 0,
        qw: "Make clear what the system can do, and how well (HAX G1 and G2). Show outputs, keep the person in charge of sending." },
      { t: "Auto-send reminders", out: "A new setting lets the AI write and send overdue reminders on its own. Last week it sent a firm reminder to a client who had already paid by bank transfer that morning.", k: "auto",
        kw: "The AI acted alone on something that touches a client relationship, with information it didn't have. That's too much autonomy for the stakes.",
        q: "What's the right level?", o: ["Draft for approval by default; allow auto-send only for long-overdue invoices after a payment check, with a daily summary", "Keep auto-send, add an apology template", "Remove reminders entirely"], a: 0,
        qw: "Choose autonomy by stakes and reversibility. A sent email can't be unsent, so start one step lower and earn the next step." },
      { t: "VAT number autofill", out: "The AI fills in a client's VAT number from their website. When it's wrong, the field is locked and the user has to contact support to change it.", k: "stuck",
        kw: "No efficient correction. A small AI mistake turns into a support ticket and a frustrated user.",
        q: "What's the fix?", o: ["Keep the field editable, mark it \"filled by AI from studio-nord.de\", and validate the number", "Improve the model so it's never wrong", "Hide that the AI filled it"], a: 0,
        qw: "Support efficient correction and make clear why the system did what it did (HAX G9 and G11)." },
      { t: "Cash-flow forecast", out: "The AI predicts next month's cash balance: \"€12,438.17\". Users plan purchases around it. It's often off by €2,000 or more.", k: "over",
        kw: "Two decimal places signal a precision the model doesn't have, so people over-trust it.",
        q: "What's the best change?", o: ["Show a range (\"€10,500 to €14,500\") and the main assumptions behind it", "Show more decimals", "Hide the forecast until it's perfect"], a: 0,
        qw: "Match the precision of the UI to the precision of the system. A range is more honest, and more useful." },
      { t: "Help assistant", out: "The assistant has answered three VAT questions wrongly in a row, so a user stops using it. Each answer was confident, with no source and no way to flag it.", k: "under",
        kw: "Confident errors with nothing to check destroy trust, and once it's gone people stop using even the right answers.",
        q: "What rebuilds calibrated trust?", o: ["Show the help article behind every answer, say \"I'm not sure\" when there isn't one, and add a one-tap \"this is wrong\"", "Make the tone more confident", "Add a 5-star rating at the end of each chat"], a: 0,
        qw: "Sources make checking cheap, abstaining shows honesty, and specific feedback tells you what to fix (HAX G15)." },
      { t: "Smart client merge", out: "The AI finds duplicate clients and merges them overnight, with their invoices. A user wakes up to find two different \"Studio Nord\" companies merged into one.", k: "auto",
        kw: "A hard-to-reverse action on uncertain matches, done silently. Too much autonomy for the confidence the model has.",
        q: "What's the right design?", o: ["Suggest merges with the evidence side by side; merge only when the person confirms; keep an undo for 30 days", "Merge only on weekends", "Show a toast after merging"], a: 0,
        qw: "When in doubt, scope down: ask before acting (HAX G10), and keep an undo for anything that changes data." },
      { t: "Writing suggestions", out: "The AI rewrites the invoice notes field as you type. To keep your own text, you have to click \"Revert\" in a menu, every time.", k: "stuck",
        kw: "Dismissing the AI is harder than accepting it. People lose their own words, and soon switch the feature off.",
        q: "What's the fix?", o: ["Show the suggestion in grey; Tab accepts it, and typing on ignores it", "Ask \"Are you sure?\" before each rewrite", "Rewrite only every other time"], a: 0,
        qw: "Support efficient dismissal (HAX G8). Inline suggestions that cost nothing to ignore are why ghost text works in coding tools." }
    ],
    end: [[0.85, "Well tuned. You matched trust to what the AI can really do, and kept people in control."], [0.6, "Good eye. Remember: the goal isn't more trust, it's the right amount, plus an easy way back."], [0, "Worth another round. For each screen, ask: does the user know when to check, and can they fix it in one step?"]],
    rule: "The rule to keep: show what the AI can do and how well, put checking where it's unsure, match autonomy to stakes, and make correcting, dismissing and undoing effortless."
  };
  window.TrustTuner = function (root) { window.TwoStepGame(root, C); };
})();
