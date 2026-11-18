// Judge the Judge: an AI Gym game for A7. Mount with JudgeTheJudge(element)
(function () {
  var C = {
    unit: "Answer",
    intro: { title: "Eight graded answers, about 10 minutes", text: "Ledgerly's team uses an AI judge to grade its support assistant. For each answer, grade it yourself first. Then see what the judge said, and decide how to fix the judge or the eval." },
    ask1: "1. Your grade?",
    kinds: [
      { id: "pass", name: "Pass", note: "Correct, safe and helpful" },
      { id: "fact", name: "Fail: wrong or invented", note: "A fact, step or field is wrong or missing" },
      { id: "policy", name: "Fail: overstepped", note: "Claims an action or promise it can't make" },
      { id: "unhelpful", name: "Fail: unhelpful", note: "Safe, but doesn't help" }
    ],
    items: [
      { t: "Q: \"Can I use two VAT rates on one invoice?\"", out: "A: Yes. Add the second rate in Settings > Taxes, then pick the rate on each invoice line.\n\nJudge: PASS", k: "pass",
        kw: "Correct and complete per the help centre. You and the judge agree.",
        q: "One agreement proves little. How do you know if the judge is trustworthy overall?", o: ["Label 50 or more answers yourself and measure how often it catches your fails and keeps your passes", "Ask the judge how confident it is", "Use the most expensive model as the judge"], a: 0,
        qw: "A judge is a model, so it needs its own test. Check its agreement with human labels separately for passes and for fails." },
      { t: "Q: \"How do I change the invoice number format?\"", out: "A: Great question! Invoice numbering is an important part of keeping your business organised. To change the format, simply navigate to Settings > Account > Preferences, where you'll find a range of customisation options...\n\nJudge: 9/10, \"detailed, friendly and helpful\"", k: "fact",
        kw: "The menu path is wrong (it's Settings > Invoices > Numbering). The judge rewarded length and tone, a known bias called verbosity bias.",
        q: "What fixes the judge?", o: ["Give it the help article and a yes/no criterion: \"Is every step correct per the source?\"", "Ask for a score out of 100", "Tell it to be stricter"], a: 0,
        qw: "Binary, specific criteria with the reference attached beat vague 1 to 10 scores. Zheng et al. (2023) documented verbosity and position biases in LLM judges." },
      { t: "Q: \"Can you refund my last payment?\"", out: "A: Of course! I've refunded your last payment. It should appear in 3 to 5 days.\n\nJudge: PASS, \"polite and resolves the customer's issue\"", k: "policy",
        kw: "The assistant can't issue refunds, so it promised something that didn't happen. The judge rated the tone, not the truth.",
        q: "What's the best fix for the eval?", o: ["Add a separate check: \"Does the answer claim an action the assistant can't take?\"", "Remove refund questions from the test set", "Ask the judge to be kinder"], a: 0,
        qw: "One criterion per failure mode. A judge asked \"is this good?\" mixes everything; one asked a single question is easier to trust and to check." },
      { t: "Q: \"How do I export all my invoices for 2025?\"", out: "A: I'm not sure about that. Please contact our support team for help.\n\nJudge: PASS, \"safe and appropriately cautious\"", k: "unhelpful",
        kw: "The help centre covers it (Reports > Export). Refusing an answerable question is a failure, even if it's safe.",
        q: "What does the eval need?", o: ["A criterion that fails unnecessary refusals when the answer exists in the sources", "Nothing: refusing is always safe", "More refusal examples marked as passes"], a: 0,
        qw: "Evals that only punish wrong answers teach systems to refuse everything. Measure helpfulness too." },
      { t: "Q: (extraction) \"Invoice from Studio Nord, €1,250, due 30 November.\"", out: "A: {\"client\": \"Studio Nord\", \"amount\": 1250}\n\nJudge: PASS, \"correct values\"", k: "fact",
        kw: "The due date is missing from the JSON, so the import will fail. The values present are right, which is what the judge looked at.",
        q: "Who should check this?", o: ["Code: a schema check that every required field is present and valid", "A second AI judge", "A person, on every invoice"], a: 0,
        qw: "Use code wherever there's an exact answer: format, required fields, numbers. Save AI judges for what code can't check." },
      { t: "Q: \"Is PDF export free?\" (asked three times)", out: "A: Yes, PDF export is included on all plans, including Free.\n\nJudge, three runs: 6/10, 8/10, 7/10", k: "pass",
        kw: "The answer is correct. The judge's score moves between runs on the same answer, so the score itself is noise.",
        q: "What makes the judge stable?", o: ["Binary pass or fail on a specific criterion, at low temperature", "Average more runs of a 1 to 10 score", "Use a 1 to 100 scale for precision"], a: 0,
        qw: "Fine-grained scales invite noise. Pass or fail per criterion is easier to agree on, for models and people." },
      { t: "Q: \"Wie aktiviere ich Reverse Charge?\" (German)", out: "A: Öffnen Sie die Rechnung und aktivieren Sie \"Reverse Charge\". Ledgerly zeigt dann 0 % MwSt.\n\nJudge: FAIL, \"the answer is not in English\"", k: "pass",
        kw: "Correct, and in the user's language, which is exactly right. The judge applied an assumption nobody intended.",
        q: "What do you fix?", o: ["The judge's rubric: answers should match the user's language; add German and French examples to the test set", "The assistant: force English replies", "Nothing: one false fail is fine"], a: 0,
        qw: "Judges have bugs too. Reading the judge's reasons on disagreements is how you find them." },
      { t: "Q: \"Where do I set up automatic payment reminders?\"", out: "A: Go to Settings > Payments > Auto-reminders and switch it on.\n\nJudge (no reference given): PASS, \"clear and specific\"", k: "fact",
        kw: "That menu doesn't exist; the assistant invented a plausible path. Without the help article, the judge can't tell plausible from true.",
        q: "What's the fix?", o: ["Give the judge the retrieved source or a reference answer to compare against", "Ask the judge to search the web", "Trust answers that sound specific"], a: 0,
        qw: "Judges check against something. For facts, that something is the source document or a reference answer written by a person." }
    ],
    end: [[0.85, "Sharp grading. You caught the failures the judge missed, and you know why it missed them."], [0.6, "Solid. Remember: judges reward length and confident tone. Give them specific yes/no criteria and the source."], [0, "Worth another round. Grade answers against the source first; then ask why the judge saw it differently."]],
    rule: "The rule to keep: look at the data, write one pass/fail criterion per failure mode, use code where you can, and test the judge against your own labels before you trust it."
  };
  window.JudgeTheJudge = function (root) { window.TwoStepGame(root, C); };
})();
