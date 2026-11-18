// AI Gym: single source of truth for the plan.
// Each learner's progress (done, "you are here") comes from assets/progress.js, saved in their browser.
// Set page to a module's station page once it exists.
window.AIGYM = {
  colors: ["#E3A82B", "#2A9D8F", "#4C7BD9", "#6BA368", "#9B6BB0", "#D07A45"],
  onColors: ["#17202A", "#17202A", "#17202A", "#17202A", "#17202A", "#17202A"],
  zones: ["Understand the machine", "Talk to models", "Build", "Measure quality", "Ship", "Lead"],
  setup: { code: "A0", name: "Your AI workbench", desc: "Accounts, playgrounds, API keys with a spend cap, and your first API call.", page: "a0/" },
  modules: [
    { code: "A1", zone: 0, name: "How LLMs work, and choosing a model", short: "LLMs & models", desc: "Tokens and next-token prediction, how training shapes behaviour, why models hallucinate, and how to pick the right model for a job.", game: "Model Matchmaker", lab: "Tokenizer, temperature and a blind model test", page: "a1/" },
    { code: "A2", zone: 0, name: "Where AI fits", short: "AI fit", desc: "Automation or augmentation, the use-case canvas (value, cost of error, data), and build, buy or partner.", game: "Fit or Fad", lab: "Score five AI ideas on a use-case canvas" },
    { code: "A3", zone: 1, name: "Prompt engineering", short: "Prompting", desc: "The anatomy of a good prompt, examples and structured output, and iterating like an engineer.", game: "Prompt Surgeon", lab: "Take a weak prompt through five versions" },
    { code: "A4", zone: 1, name: "Context engineering and RAG", short: "RAG", desc: "Embeddings and retrieval in plain words, chunking and citations, and when to choose prompting, RAG or fine-tuning.", game: "Retrieval Relay", lab: "A no-code RAG, then a short one in Colab" },
    { code: "A5", zone: 2, name: "Prototyping with AI", short: "Prototyping", desc: "From a spec to a clickable prototype with vibe-coding tools, and where they break.", game: "Prototype Sprint", lab: "Build a working prototype" },
    { code: "A6", zone: 2, name: "Agents, tools and MCP", short: "Agents", desc: "Tool calling, the Model Context Protocol, and the five workflow patterns behind most agents.", game: "Pattern Picker", lab: "Connect an MCP server and write a tool schema" },
    { code: "A7", zone: 3, name: "Evals", short: "Evals", desc: "Error analysis first, code checks and LLM judges, and eval-driven development.", game: "Judge the Judge", lab: "Label outputs, write a judge, measure agreement" },
    { code: "A8", zone: 3, name: "Guardrails, safety and observability", short: "Guardrails", desc: "Hallucination controls, prompt injection and red-teaming, and tracing what really happened.", game: "Break the Bot", lab: "Red-team a bot, then write guardrails" },
    { code: "A9", zone: 4, name: "AI UX and trust", short: "AI UX", desc: "Setting expectations, showing sources, human-in-the-loop patterns, and the guidelines that help.", game: "Trust Tuner", lab: "Redesign an AI screen against the HAX guidelines" },
    { code: "A10", zone: 4, name: "AI economics and pricing", short: "Economics", desc: "Token maths, latency and caching, routing, cost per task, and pricing AI features.", game: "Margin Maker", lab: "Build a cost-per-task model" },
    { code: "A11", zone: 5, name: "Responsible AI and the EU AI Act", short: "EU AI Act", desc: "Risk tiers and timelines, GDPR meets AI, and documentation that holds up.", game: "Risk Tier", lab: "Classify AI features and draft a transparency notice" },
    { code: "A12", zone: 5, name: "The AI-native PM", short: "AI-native PM", desc: "The AI spec with evals as acceptance criteria, launching and measuring AI features, and AI in your own work.", game: "Launch Control", lab: "Write an AI spec and build your toolkit" }
  ],
  capstone: { code: "Cap", zone: 5, name: "Capstone", desc: "Ship an AI feature end to end: spec, prototype, a 20-case eval, guardrails, a cost model and a launch metric, built from your lab cards.", game: "The real thing", lab: "Your portfolio piece" }
};
