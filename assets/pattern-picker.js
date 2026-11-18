// Pattern Picker: an AI Gym game for A6. Mount with PatternPicker(element)
(function () {
  var C = {
    unit: "Job",
    intro: { title: "Eight jobs, about 10 minutes", text: "Ledgerly's team wants AI to take on eight jobs. For each, pick the simplest design that works: a single call, a fixed chain of steps, routing to specialists, or a real agent. Then make the call that keeps it safe and affordable." },
    ask1: "1. What's the simplest design that works?",
    kinds: [
      { id: "single", name: "Single call", note: "One prompt, maybe one tool lookup" },
      { id: "chain", name: "Prompt chain", note: "Fixed steps, each feeding the next" },
      { id: "route", name: "Routing", note: "Classify first, then a specialist handles it" },
      { id: "agent", name: "Agent", note: "The model decides its own steps and tools, in a loop" }
    ],
    items: [
      { t: "Pull the amount, date and supplier out of one uploaded receipt.", k: "single",
        kw: "One input, one clear output. A single call with a schema does it. Anything more adds cost, delay and things that can break.",
        q: "A teammate proposes an agent \"to be future-proof\". Your reply?", o: ["Start with the simplest thing that passes the tests; add steps only when tests show you need them", "Agents are always better, so go ahead", "Use three agents to double-check each other"], a: 0,
        qw: "Anthropic's own advice is to find the simplest solution possible, which may mean no agentic system at all." },
      { t: "Each month: draft an outline of the client report, check the outline covers four required sections, then write the full report.", k: "chain",
        kw: "The steps are known and always the same. A chain with a check between steps is predictable and easy to test.",
        q: "Where do you add a check?", o: ["Between outline and writing: code checks the four sections exist before continuing", "Only at the very end", "Nowhere, to save time"], a: 0,
        qw: "A gate between steps catches problems early and cheaply. It's the main advantage of chaining." },
      { t: "Incoming support emails need different handling: billing questions, bug reports and how-to questions.", k: "route",
        kw: "Distinct categories that each need a different prompt, tools or team. Classify first, then hand off to a specialist.",
        q: "What happens when the classifier isn't sure?", o: ["Send it to a general handler or a person, and log it to improve the categories", "Pick a category at random", "Reject the email"], a: 0,
        qw: "Every router needs a safe default. The unsure cases are also your best training and test data." },
      { t: "\"Reconcile this messy bank statement with my open invoices and draft reminders for anything still unpaid.\" Partial payments, typos and combined payments vary every time.", k: "agent",
        kw: "You can't predict the steps in advance: how many lookups, which matches, which invoices need reminders. That's when an agent earns its cost.",
        q: "Which actions should need a person's approval?", o: ["Sending reminders to clients; reading data and drafting can run freely", "Nothing: let it send everything", "Every single read and search"], a: 0,
        qw: "Approve the actions that are external, costly or hard to undo. Asking for approval on every read just trains people to click yes." },
      { t: "Answer \"How much does Studio Nord owe me right now?\" in Ledgerly's chat.", k: "single",
        kw: "One question, one lookup. A single call with one tool (get the client's open invoices) is enough.",
        q: "What makes the tool easy for the model to use correctly?", o: ["A clear name, a description of when to use it, and typed parameters like client name and status", "A short name like 'func1' to save tokens", "Letting it run any database query it likes"], a: 0,
        qw: "Tools are prompts too. Clear names, descriptions and narrow parameters prevent wrong calls, and limit the damage when one happens." },
      { t: "Research VAT rules for freelancers in all 27 EU countries and write a comparison, with sources.", k: "agent",
        kw: "Open-ended, many independent searches, more information than fits one context window. An orchestrating agent with parallel sub-agents fits.",
        q: "What's the trade-off to plan for?", o: ["Many more tokens and cost per task, so use it where the answer is worth it", "It will be faster and cheaper than one call", "It never makes mistakes"], a: 0,
        qw: "Anthropic reported its multi-agent research system beat a single agent by 90.2% on an internal eval, while using about 15 times the tokens of a chat." },
      { t: "Translate an invoice into the client's language, then check every legal term against Ledgerly's approved glossary.", k: "chain",
        kw: "Two fixed steps, translate then check. A chain keeps each step simple and testable.",
        q: "Who should do the glossary check?", o: ["Code, where possible: compare terms against the glossary list exactly", "The same model, asked to be careful", "Nobody; translation is good enough"], a: 0,
        qw: "Use code for exact checks, and models for language. Mixing them is how chains stay reliable." },
      { t: "An assistant that reads every incoming client email, can see all the user's invoices and bank details, and can send emails on its own.", k: "agent",
        kw: "It's agentic, and it combines the three things that make prompt injection dangerous: untrusted content, private data and a way to send data out.",
        q: "What's the safest change?", o: ["Remove one of the three: for example, a person approves every outgoing email", "Add \"never leak data\" to the prompt", "Use a smarter model"], a: 0,
        qw: "An email can contain hidden instructions. If the agent can also read secrets and send messages, it can be tricked into leaking them. Break the combination in the design, not in the prompt." }
    ],
    end: [[0.85, "Sharp architecture. You picked the simplest design that works and put the guardrails where they matter."], [0.6, "Solid. Ask: are the steps known in advance? If yes, a chain or router beats an agent."], [0, "Worth another round. Start with a single call, add fixed steps when needed, and use an agent only when the path can't be known in advance."]],
    rule: "The rule to keep: the simplest design that passes your tests wins. Agents are for paths you can't predict, and their risky actions need a person or code standing in the way."
  };
  window.PatternPicker = function (root) { window.TwoStepGame(root, C); };
})();
