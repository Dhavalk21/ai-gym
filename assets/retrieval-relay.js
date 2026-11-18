// Retrieval Relay: an AI Gym game for A4. Mount with RetrievalRelay(element)
(function () {
  var C = {
    unit: "Ticket",
    intro: { title: "Eight wrong answers, about 10 minutes", text: "Ledgerly's help-centre assistant uses RAG: it searches the help articles, then answers from what it finds. Each ticket shows a wrong answer and a trace. Find the broken step, then the fix." },
    ask1: "1. Where did the relay break?",
    kinds: [
      { id: "doc", name: "The documents", note: "Missing, outdated or contradicting" },
      { id: "chunk", name: "Chunking", note: "The answer got split or buried" },
      { id: "search", name: "Search", note: "The right chunk existed but wasn't found" },
      { id: "gen", name: "Generation", note: "The model had it, but answered wrongly" }
    ],
    items: [
      { t: "Q: \"Is PDF export free?\" A: \"No, PDF export is only on the Pro plan.\"", out: "Retrieved: [export-2024] \"PDF export is only available on the Pro plan.\" (score 0.89)\nNot retrieved: [export-2026] \"PDF export is available on all plans.\" (score 0.88)", k: "doc",
        kw: "Both articles exist and contradict each other. Search returned the outdated one first. The real problem is the stale document in the index.",
        q: "What's the lasting fix?", o: ["Remove or archive the outdated article, and add a 'last updated' date filter so old versions rank lower", "Use a bigger model", "Retrieve 50 chunks instead of 2"], a: 0,
        qw: "Garbage in, garbage out. RAG makes your help centre's quality the AI's quality, so content ownership becomes part of the AI feature." },
      { t: "Q: \"What does error E-402 mean?\" A: \"I couldn't find that in the help centre.\"", out: "Retrieved: [errors-general] \"If something goes wrong, contact support.\" (score 0.71)\nThe article 'numbering' contains: \"Error E-402 means the next invoice number is already in use.\"", k: "search",
        kw: "The answer exists, but meaning-based (embedding) search is weak on exact codes like E-402. It found something vaguely about errors instead.",
        q: "What fixes it?", o: ["Hybrid search: combine keyword search (like BM25) with embeddings", "Tell the model to try harder", "Raise the temperature"], a: 0,
        qw: "Keyword search nails exact terms (codes, IDs, names); embeddings catch meaning. Anthropic's Contextual Retrieval work found combining them, plus context added to each chunk, cut failed retrievals by 49%." },
      { t: "Q: \"How long do I keep invoices for tax purposes in Germany?\" A: \"Keep them as long as you like.\"", out: "Retrieved: [archive] \"You can keep invoices in Ledgerly as long as you like.\" (score 0.82)\nNo article covers legal retention periods.", k: "doc",
        kw: "The help centre simply doesn't answer this. Search found the closest thing, and the model treated it as an answer to a legal question.",
        q: "What should happen instead?", o: ["Say it isn't covered, point to an official source or adviser, and log the question as a content gap", "Let the model answer from its training", "Retrieve more chunks until something fits"], a: 0,
        qw: "\"Not found\" is a valid answer. Unanswered questions are also your best list of articles to write next." },
      { t: "Q: \"Can I use two VAT rates on one invoice?\" A: \"Yes. Go to Settings > Taxes.\" (It skips the important part.)", out: "Retrieved chunk: \"...To add a VAT rate, go to Settings > Taxes and click Add rate.\"\nThe next sentence, in a different chunk: \"You can use different rates on different lines of the same invoice.\"", k: "chunk",
        kw: "The answer was split across two chunks, and only the first came back. The chunk boundary cut the meaning in half.",
        q: "What helps most?", o: ["Chunk by section or paragraph, with a little overlap, so ideas stay together", "Use much smaller chunks of 20 words", "Turn off retrieval"], a: 0,
        qw: "Chunk along the document's own structure: headings, sections, paragraphs. Tiny chunks lose context; huge ones bury the answer." },
      { t: "Q: \"Does reverse charge apply to my client in Austria?\" A: \"Reverse charge applies to all clients.\"", out: "Retrieved: [vat-rates] \"Reverse charge: for B2B clients in another EU country, tick Reverse charge on the invoice.\" (score 0.91)", k: "gen",
        kw: "Search found exactly the right sentence. The model dropped the conditions (B2B, another EU country) and over-generalised.",
        q: "What's the best fix?", o: ["Tell it to quote the source sentence and keep its conditions, and show the citation to the user", "Retrieve fewer chunks", "Use keyword search only"], a: 0,
        qw: "Retrieval was perfect; generation wasn't. Quoting, citing and checking answers against the source (A7's evals) catch this." },
      { t: "Q: \"How do I change the invoice number format?\" A: correct, but it took 12 seconds and cost 40 times more than expected.", out: "The whole 300-article help centre was pasted into every request instead of retrieving the right article.", k: "search",
        kw: "There's no search step at all: everything goes into the context every time. It's slow, expensive and, as context grows, less reliable.",
        q: "What's the fix?", o: ["Retrieve the few most relevant chunks for each question", "Use a model with an even bigger context window", "Ask users to shorten their questions"], a: 0,
        qw: "Long context isn't free: it costs money and time, and Chroma's 2025 tests found reliability drops as input grows. Send what's relevant." },
      { t: "Q: \"Do you support Bitcoin payments?\" A: \"Yes, Ledgerly supports Bitcoin through Stripe.\"", out: "Retrieved: [payments] \"Clients can pay by card or SEPA transfer through Stripe.\" (score 0.74)", k: "gen",
        kw: "The source says card and SEPA, not Bitcoin. The model mixed what it retrieved with what it guessed.",
        q: "What prevents this?", o: ["Instruct it to answer only from the sources and say so when they don't cover it, then test that with out-of-scope questions", "Add more payment articles", "Use a smaller model"], a: 0,
        qw: "Grounding needs an explicit rule plus tests: include questions the docs can't answer in your test set." },
      { t: "Q: \"Wie exportiere ich alle Rechnungen eines Jahres?\" (German) A: \"I couldn't find that.\"", out: "All help articles are in English. Top result score: 0.41, below the 0.5 threshold.", k: "search",
        kw: "The article exists in English, but the German question didn't match closely enough to pass the score cut-off.",
        q: "What's a sensible fix?", o: ["Use a multilingual embedding model, or translate the question before searching", "Delete the score threshold entirely", "Tell German users to write in English"], a: 0,
        qw: "For EU products, test retrieval in every language your users write in. Many embedding models handle 100+ languages, but check yours." }
    ],
    end: [[0.85, "Expert tracing. You found the broken leg of the relay every time."], [0.6, "Solid. When an answer is wrong, check in order: is the document right, was it chunked well, was it found, and did the model use it?"], [0, "Worth another round. Always look at what was retrieved before blaming the model."]],
    rule: "The rule to keep: debug RAG from the start of the relay. Documents, then chunks, then search, then generation. Most failures happen before the model writes a word."
  };
  window.RetrievalRelay = function (root) { window.TwoStepGame(root, C); };
})();
