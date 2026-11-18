// Prototype Sprint: an AI Gym game for A5. Mount with PrototypeSprint(element)
(function () {
  var C = {
    unit: "Part",
    intro: { title: "One week, one idea, about 10 minutes", text: "Ledgerly wants to test \"Cash Coach\": an AI assistant that answers freelancers' questions about their upcoming income. You have one week and a vibe-coding tool. For each part, decide: build it for real, fake it, or skip it. Then make the call that keeps the test honest." },
    ask1: "1. Build, fake or skip?",
    kinds: [
      { id: "build", name: "Build it for real", note: "It's what you're testing" },
      { id: "fake", name: "Fake it", note: "Sample data, a hard-coded screen, a person behind the curtain" },
      { id: "skip", name: "Skip it", note: "Doesn't change what you'll learn this week" }
    ],
    items: [
      { t: "The AI's answers to questions like \"Which clients are late?\" and \"Can I afford a €2,000 laptop this month?\"", k: "build",
        kw: "This is the riskiest unknown: are the answers good and useful? Only a real model on realistic data can tell you.",
        q: "What data should it run on?", o: ["Realistic, made-up invoices that include messy cases (partial payments, overdue, foreign currency)", "Real customers' invoices, since it's only a test", "Three perfect, simple invoices"], a: 0,
        qw: "Realistic but invented data tests quality without putting real people's data into a prototype. Include the messy cases, or you're testing the happy path only." },
      { t: "Sign-up, login and user accounts.", k: "skip",
        kw: "Accounts don't help you learn whether Cash Coach is useful, and they add work and security risk. One shared test account is enough.",
        q: "What's the safe way to show it to testers?", o: ["Run it in a session with you, or share a private link with sample data only", "Post the link publicly", "Ask testers to create accounts with their real email"], a: 0,
        qw: "Keep prototypes private and data-free. Lovable-built apps exposed real user data in 2025 because database permissions weren't set; prototypes with no real data can't leak it." },
      { t: "A live connection to users' banks to pull in real transactions.", k: "fake",
        kw: "Bank connections are slow to build and full of compliance work. A sample CSV of transactions shows the same experience.",
        q: "When would you build it for real?", o: ["Only after testers show they value the answers enough to connect their bank", "Before any test, so it feels real", "Never: banks don't matter"], a: 0,
        qw: "Earn the expensive parts. Fake them until the cheap test says the idea is worth it." },
      { t: "Finding out whether freelancers would pay €5 a month for Cash Coach.", k: "fake",
        kw: "You can't learn willingness to pay from a free prototype. A simple price screen at the end of the test, or a fake upgrade button, gives a real signal.",
        q: "What's the strongest signal?", o: ["How many testers click \"Start trial at €5/month\" when it's offered", "Asking \"Would you pay for this?\"", "A survey sent a week later"], a: 0,
        qw: "Behaviour beats opinions. People are polite in interviews and honest with their clicks." },
      { t: "The chat screen where users type questions and see answers.", k: "build",
        kw: "It's cheap to build with a vibe-coding tool and it's what testers react to. A real, clickable screen gets far better feedback than a slide.",
        q: "How polished should it be?", o: ["Clear and usable, with a visible \"Prototype, sample data\" label", "Pixel-perfect in Ledgerly's brand", "Wireframe boxes only"], a: 0,
        qw: "Good enough to use, honest about what it is. Polish makes people hold back criticism." },
      { t: "An Android and iOS version of Cash Coach.", k: "skip",
        kw: "Platforms don't change whether the answers are useful. One web prototype tests the idea.",
        q: "What's the risk of building it anyway?", o: ["You spend the week on packaging and learn nothing new about the idea", "Testers will prefer the web", "It costs nothing extra"], a: 0,
        qw: "Every hour spent on non-questions is an hour not spent learning. Scope the prototype to the question." },
      { t: "What happens when Cash Coach gets a number wrong.", k: "build",
        kw: "Trust is a core question for a money feature. You need to see how users react when an answer is off, and whether showing the source invoices helps them catch it.",
        q: "What do you build?", o: ["Show the invoices each answer is based on, and plant one wrong answer in the test script", "Hide the sources to keep the screen clean", "Make sure the model is never wrong"], a: 0,
        qw: "Test the failure on purpose. Whether users notice and recover tells you more than ten correct answers." },
      { t: "Turning the prototype's code into the production feature after the test.", k: "skip",
        kw: "Prototype code is for learning. It skips security, tests and maintainability, which production needs.",
        q: "What do you hand to engineering instead?", o: ["The learnings, the prompt that worked, the test questions and the screen as a reference", "The vibe-coded repository, to ship as is", "Nothing: start from scratch with no notes"], a: 0,
        qw: "The value is the knowledge: what worked, what users did, the prompt and the test set. Engineers rebuild it properly, faster for knowing all that." }
    ],
    end: [[0.85, "A tight sprint. You built only what answers the question and kept the test honest."], [0.6, "Solid. Ask for each part: does this change what I'll learn this week? If not, fake it or skip it."], [0, "Worth another round. A prototype isn't a small product; it's an experiment. Build the risky part, fake the rest."]],
    rule: "The rule to keep: prototype the riskiest question with real AI and fake data; fake or skip everything else; and never ship the prototype."
  };
  window.PrototypeSprint = function (root) { window.TwoStepGame(root, C); };
})();
