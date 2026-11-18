// Prompt Surgeon: an AI Gym game for A3. Mount with PromptSurgeon(element)
(function () {
  var C = {
    unit: "Prompt",
    intro: { title: "Eight weak prompts, about 10 minutes", text: "Each one comes from Ledgerly's team, with the output it produced. Diagnose what's missing, then pick the fix that matters most." },
    ask1: "1. What's the main problem with this prompt?",
    kinds: [
      { id: "ctx", name: "Missing context", note: "The model doesn't know who, what or why" },
      { id: "ex", name: "No examples", note: "It can't see what good looks like" },
      { id: "fmt", name: "No output format", note: "Your code or reader can't use the shape" },
      { id: "vague", name: "Vague task or rules", note: "\"Good\", \"short\", \"nice\" mean nothing" }
    ],
    items: [
      { t: "Prompt: \"Write a reminder email.\"", out: "Subject: Reminder!\nHi there, just a friendly reminder about your upcoming appointment...", k: "ctx",
        kw: "The model doesn't know it's Ledgerly, that it's about an unpaid invoice, who the client is or how late the payment is. It filled the gaps with a generic guess.",
        q: "Which fix helps most?", o: ["Add who's writing, to whom, which invoice, the amount and how many days overdue", "Add \"please\" and \"thank you\"", "Ask for it in capital letters"], a: 0,
        qw: "A brilliant new colleague with no context would write the same thing. Give the facts and the situation, and the email writes itself." },
      { t: "Prompt: \"Extract the invoice details from this email: [email text]\" Your code then reads the result.", out: "Sure! Here are the details I found: the invoice is from Studio Nord, it's for about 1,200 euros and I think it's due sometime next week.", k: "fmt",
        kw: "The content is roughly right, but no code can parse that sentence. The prompt never said what shape to return.",
        q: "What's the strongest fix?", o: ["Ask for JSON with fixed keys, and use the API's structured output feature with a schema", "Add \"be precise\"", "Use a bigger model"], a: 0,
        qw: "Structured output with a schema makes the shape reliable; OpenAI reported its schema-following eval went from under 40% to 100% when it added the feature in 2024." },
      { t: "Prompt: \"Categorise this expense: 'SHELL 4432 HAMBURG 62.40'.\"", out: "This appears to be a transaction at a Shell petrol station in Hamburg, likely for fuel or convenience store purchases.", k: "vague",
        kw: "\"Categorise\" into what? Without the list of allowed categories, the model describes instead of choosing.",
        q: "What do you add first?", o: ["The exact list of allowed categories and \"answer with one category only\"", "A longer description of Shell", "\"Think carefully\""], a: 0,
        qw: "Closed tasks need closed options. Give the list and the rule for the answer, and classification becomes reliable." },
      { t: "Prompt: \"Write payment reminders in our brand voice.\" (The brand voice is warm, direct and never passive-aggressive.)", out: "As per our records, it appears that payment has not yet been received. Kindly remit at your earliest convenience.", k: "ex",
        kw: "\"Brand voice\" is something people recognise from examples, not from a label. The model guessed a formal, slightly cold tone.",
        q: "What's the best fix?", o: ["Add two or three real reminders the team loved, as examples", "Write \"use our brand voice\" twice", "Raise the temperature"], a: 0,
        qw: "A few good examples (few-shot prompting) show tone better than any adjective. Vary them so the model copies the style, not the exact words." },
      { t: "Prompt: \"Summarise this client thread. Keep it short.\"", out: "(A 280-word summary with every message restated.)", k: "vague",
        kw: "\"Short\" means different things to different readers. The model didn't know who reads it or what decision it supports.",
        q: "Which version is best?", o: ["\"In 3 bullets for the account owner: what the client wants, open questions, next step and date\"", "\"Keep it very, very short\"", "\"Summarise better\""], a: 0,
        qw: "Name the reader, the length in units and what must be in it. Vague limits produce vague results." },
      { t: "Prompt: \"Answer the user's tax question.\" Users ask about German VAT rules for freelancers.", out: "In Germany, all freelancers must charge 19% VAT on every invoice.", k: "ctx",
        kw: "Confident and wrong: small businesses can be exempt under the German small-business rule. The prompt gave no source material and no rules for uncertainty.",
        q: "What protects users most?", o: ["Give it the relevant official guidance as context, tell it to answer only from that, and to say when to ask an adviser", "Tell it to be confident", "Ask for a longer answer"], a: 0,
        qw: "For facts that matter, put the source in the context (A4 automates this with retrieval) and give it permission to say \"I'm not sure\"." },
      { t: "Prompt: \"Rate this support reply from 1 to 10.\"", out: "8/10. The reply is helpful and polite.", k: "ex",
        kw: "Without examples of what a 3 or an 8 looks like, scores drift and can't be compared from one day to the next.",
        q: "What makes the score useful?", o: ["A short rubric with an example of a good and a bad reply, then a pass or fail per criterion", "Ask for a score out of 100 instead", "Run it at high temperature"], a: 0,
        qw: "Anchored criteria beat a vague number. You'll build exactly this kind of judge in A7." },
      { t: "Prompt (system): \"You are a helpful assistant.\" The bot answers Ledgerly customers about billing.", out: "User: Can you give me a refund on my plan?\nBot: Of course! I've processed a full refund for you.", k: "vague",
        kw: "The bot invented an action it can't take. The prompt set no boundaries: what it can do, what it can't, and when to hand over to a person.",
        q: "What do you add?", o: ["What it may and may not do, that it can't issue refunds, and how to hand over to the support team", "\"Be extra helpful\"", "More emojis for friendliness"], a: 0,
        qw: "A system prompt is a job description: scope, limits and escalation. Real permissions still belong in code, not just in words (A8)." }
    ],
    end: [[0.85, "Sharp diagnosis. You spot the missing piece before reaching for a bigger model."], [0.6, "Solid. Look back at the misses: most weak prompts lack context, examples, a format or a clear rule."], [0, "Worth another round. Read each prompt as a brand-new colleague would: what would they need to ask you first?"]],
    rule: "The rule to keep: context, a clear task, examples and an output format fix most prompts. Change one thing at a time, and test on more than one input."
  };
  window.PromptSurgeon = function (root) { window.TwoStepGame(root, C); };
})();
