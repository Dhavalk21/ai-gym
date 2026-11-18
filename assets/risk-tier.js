// Risk Tier: an AI Gym game for A11. Mount with RiskTier(element)
(function () {
  var C = {
    unit: "System",
    intro: { title: "Eight AI systems, about 10 minutes", text: "You're reviewing AI systems that companies want to use in the EU. For each one, place it in the EU AI Act's risk tiers. Then pick what has to happen next. (A practice game, not legal advice.)" },
    ask1: "1. Which tier?",
    kinds: [
      { id: "ban", name: "Prohibited", note: "Banned practice under Article 5" },
      { id: "high", name: "High-risk", note: "Strict duties, e.g. Annex III areas" },
      { id: "trans", name: "Transparency duty", note: "Must disclose AI or label content (Art. 50)" },
      { id: "min", name: "Minimal risk", note: "No new AI Act duties" }
    ],
    items: [
      { t: "Online exam proctoring", out: "A university wants software that watches students through their webcam during exams and flags those who look \"anxious or deceptive\" from their facial expressions.", k: "ban",
        kw: "Inferring emotions in education is a prohibited practice (Article 5), with narrow medical and safety exceptions. The ban has applied since 2 February 2025.",
        q: "What should the university do?", o: ["Drop the emotion inference entirely; if proctoring is needed, use a design without it and check GDPR", "Get students' consent and go ahead", "Use it only for final exams"], a: 0,
        qw: "Consent doesn't unlock a prohibited practice. Fines for prohibited practices go up to €35 million or 7% of worldwide turnover." },
      { t: "CV screening", out: "A company buys a tool that ranks job applicants' CVs and shortlists the top 20 for interviews.", k: "high",
        kw: "AI used to recruit or select people is listed in Annex III (employment). After the Digital Omnibus, high-risk duties for Annex III systems apply from 2 December 2027.",
        q: "As the deployer, what must the company plan for?", o: ["Use it as the provider instructs, assign trained human oversight, keep logs, and tell candidates and workers' representatives", "Nothing: the provider is responsible for everything", "Only a privacy notice"], a: 0,
        qw: "Providers carry most duties, but deployers have their own: oversight, monitoring, logs and informing people. GDPR, including rules on automated decisions, applies too." },
      { t: "Support chatbot", out: "An online shop adds a chat assistant that answers questions about orders and returns. It has a friendly human name, \"Mia\".", k: "trans",
        kw: "People must be told they're interacting with an AI system, unless it's obvious (Article 50(1)). That has applied since 2 August 2026.",
        q: "What's the right step?", o: ["Say clearly at the start that Mia is an AI assistant, and offer a way to reach a person", "Keep the name, say nothing", "Hide the chatbot on weekends"], a: 0,
        qw: "Disclosure is cheap and builds trust (A9). A human name with no disclosure is exactly what the rule targets." },
      { t: "Payment fraud detection", out: "A payments company uses AI to flag suspicious transactions for review by its fraud team.", k: "min",
        kw: "Annex III lists creditworthiness checks but explicitly excludes AI used to detect financial fraud. So it's not high-risk under the AI Act.",
        q: "Does that mean no rules apply?", o: ["No: GDPR still applies, and good practice is human review, monitoring for bias, and a way for customers to contest a block", "Yes, it's completely unregulated", "It must be registered as high-risk anyway"], a: 0,
        qw: "\"Minimal risk\" under the AI Act isn't a free pass. Data protection, consumer and sector rules still apply." },
      { t: "Health insurance pricing", out: "An insurer wants AI to set each person's health insurance premium from their data.", k: "high",
        kw: "Risk assessment and pricing for individuals in life and health insurance is listed in Annex III (access to essential services).",
        q: "What's the biggest extra step for the insurer as deployer?", o: ["A fundamental rights impact assessment before use, plus human oversight and logs", "A banner saying AI is used", "Nothing until 2030"], a: 0,
        qw: "Deployers in credit and life or health insurance, and public bodies, must assess the impact on people's fundamental rights before first use." },
      { t: "Cloned CEO voice", out: "Marketing wants an AI-generated video in which the company's CEO appears to speak fluent Japanese for a campaign in Japan. The CEO agrees.", k: "trans",
        kw: "Realistic synthetic video or audio of a real person is a deepfake under the Act. Deployers must disclose it (Article 50(4)); generative tools must also mark output as AI-made.",
        q: "What has to happen?", o: ["Label it clearly as AI-generated; artistic or satirical works get a lighter disclosure, but an ad still needs it", "Nothing: the CEO agreed", "Only publish it outside the EU"], a: 0,
        qw: "Consent from the person shown doesn't remove the duty to tell viewers. The machine-readable marking duty for systems already on the market applies from 2 December 2026." },
      { t: "Face database from the web", out: "A start-up scrapes millions of photos from social media to build a face recognition search engine for customers.", k: "ban",
        kw: "Building facial recognition databases by untargeted scraping of the internet or CCTV is a prohibited practice under Article 5.",
        q: "What's the answer?", o: ["Don't build it: no consent, purpose or safeguard makes this practice allowed", "Blur the faces of minors", "Host it outside the EU and sell to EU customers"], a: 0,
        qw: "The Act applies to AI systems placed on the EU market or whose output is used in the EU, wherever the provider is based." },
      { t: "Consumer credit scoring", out: "A bank uses AI to decide whether people get a personal loan, and at what rate.", k: "high",
        kw: "Assessing the creditworthiness of individuals is listed in Annex III. GDPR Article 22 also gives people rights over solely automated decisions with significant effects.",
        q: "What should the product design include?", o: ["Human review of declines, a clear explanation, a way to contest, and monitoring for bias", "Fully automatic decisions with no explanation", "Decline anyone the model is unsure about"], a: 0,
        qw: "High-risk duties and GDPR point the same way: meaningful human oversight, explanation and a route to challenge the decision." }
    ],
    end: [[0.85, "Sharp regulator's eye. You placed each system in the right tier and knew what follows."], [0.6, "Good grounding. Remember: banned practices first, then Annex III areas, then the transparency duties."], [0, "Worth another round. Ask in order: is it banned? Is it in an Annex III area? Does it talk to people or make synthetic content?"]],
    rule: "The rule to keep: check the bans first, then the high-risk areas, then transparency. Know whether you're the provider or the deployer, and remember GDPR applies alongside. Check details with your legal team."
  };
  window.RiskTier = function (root) { window.TwoStepGame(root, C); };
})();
