export interface Persona {
  bio: string;
  niche: string;
  tone: string;
}

export const DEFAULT_PERSONA: Persona = {
  bio: "First-year engineering student in Bangalore building AI tools and agents, shipping real projects in public.",
  niche: "AI agents & building in public as a student",
  tone: "casual",
};

export const PERSONA = `
Name: Devesh (@devesh13_)
Location: Bangalore, India
Background: First year engineering student, AI orchestrator, ships real projects
Built: Chrome extension for prompt structuring (used by real people)
Voice: Honest, slightly chaotic, genuinely excited, never corporate
Goal: Meet builders, get opportunities in AI, grow authentically
Niche: AI agents, automation, building in public as a student
`;

export const REPLY_INTENTS: Record<string, string> = {
  add_insight: "Add a genuinely new insight or angle the OP didn't mention.",
  ask_question: "Ask something smart that shows you thought deeply about their point.",
  respectful_disagree: "Challenge their point with substance and your own experience.",
  relate_experience: "Connect their point to something real you experienced building.",
  be_witty: "Be funny but smart, never cringe.",
};

export function formatPersona(persona: Persona): string {
  return `${PERSONA}

CUSTOM PERSONA NOTES: ${persona.bio} (${persona.niche}, ${persona.tone} tone)`;
}

export function buildTweetPrompt(idea: string, hookStyle: string): string {
  return `Write 5 tweets for Devesh (@devesh13_), first year engineering student in Bangalore building AI tools.

DEVESH'S REAL BACKGROUND:
- Built a Chrome extension that auto-structures prompts for ChatGPT, Claude, Gemini
- Builds AI agents and automation workflows
- Ships real projects while in first year engineering
- Voice: honest, direct, slightly chaotic, never corporate, never polished

2026 X ALGORITHM — bake these into every tweet:
- Replies worth 27x more than likes — every tweet needs a question that demands a reply
- First line must stop scrolling — bold claim, open loop, surprising detail, relatable failure
- Specificity is everything — "72 hours" beats "a few days", "stray comma" beats "a bug"
- Conversation quality over passive engagement — write for discussion
- Short sentences, easy to skim, natural line breaks
- Authenticity over polish — real failures beat perfect success stories

ABSOLUTE RULES:
- NEVER invent statistics Devesh hasn't actually measured — no fake user counts, no fake percentages
- NEVER start the tweet with the word "I" — weak hook
- NEVER use: "excited to share", "game changer", "revolutionize", "thrilled to announce"
- NEVER use hashtags — algorithm flags them as spam now
- NEVER use bullet points or checkboxes inside a tweet
- Each tweet MUST be under 260 characters — count every character
- If the idea includes a number or stat, use it — if not, don't invent one
- One question per tweet, at the very end
- Sound like a real 19 year old who builds things, not a LinkedIn influencer

HOOK STYLE: ${hookStyle}
- auto: pick the strongest hook for this specific idea
- contrarian: challenge what most people believe
- story: drop into the middle of something real that happened
- number: lead with a real specific metric or time
- question: open with something that makes people think
- failure: something that went wrong and what you learned

Generate exactly 5 tweets. Completely different angles for each.

STRICT FORMAT — no exceptions:

1. [tweet text only — max 260 chars]
Why it works: [one line algorithmic reason]

2. [tweet text only — max 260 chars]
Why it works: [one line algorithmic reason]

3. [tweet text only — max 260 chars]
Why it works: [one line algorithmic reason]

4. [tweet text only — max 260 chars]
Why it works: [one line algorithmic reason]

5. [tweet text only — max 260 chars]
Why it works: [one line algorithmic reason]

DEVESH'S IDEA: ${idea}`;
}

export function buildReplyPrompt(tweet: string, intent: string): string {
  return `Write replies for Devesh (@devesh13_), first year engineering student in Bangalore building AI tools and agents.

TWEET TO REPLY TO:
"${tweet}"

INTENT: ${intent}

DEVESH'S ACTUAL BACKGROUND (only reference things he has actually built):
- Built a Chrome extension that auto-structures prompts for ChatGPT, Claude, Gemini
- Builds AI agents and automation workflows
- First year engineering student, learns by shipping real things
- Based in Bangalore, part of India's builder community

CRITICAL RULES:
- Read the tweet carefully. Reply to EXACTLY what it says, not a generic version of the topic
- Never state facts you are not 100% sure about — wrong facts destroy credibility instantly
- Never mention Indian AI models or companies unless the tweet specifically mentions them
- Never start with agreement or compliment — start with your actual point
- Under 180 characters — punchy and direct
- Make the original poster want to reply to Devesh specifically
- Sound like a smart curious student who has actually built things
- Zero hashtags, zero emojis unless the tweet had them
- If you don't have a genuine specific insight about the topic — ask a sharp question instead

INTENT GUIDE:
- add_insight: one specific thing from Devesh's building experience that adds to their point
- ask_question: one sharp question that shows you read carefully and thought deeply  
- respectful_disagree: one clear disagreement with your actual reasoning, not just "but what about X"
- relate_experience: one specific thing from building the Chrome extension or AI agents that connects
- be_witty: genuinely funny and smart, must still add real value

Generate exactly 4 replies numbered 1, 2, 3, 4.
Under each reply write: "Why: [one line on why OP would engage with this]"

FORMAT:
1. [reply text]
Why: [reason]

2. [reply text]
Why: [reason]

3. [reply text]
Why: [reason]

4. [reply text]
Why: [reason]`;
}

export function buildThreadPrompt(idea: string): string {
  return `Write a Twitter thread for Devesh (@devesh13_), first year engineering student in Bangalore building AI tools.

ABOUT DEVESH:
DEVESH'S BACKGROUND:
- Built a Chrome extension that auto-structures prompts for ChatGPT, Claude, Gemini
- Builds AI agents and automation tools
- Ships real projects while studying first year engineering
- Voice: honest, direct, slightly chaotic, never corporate

2026 THREAD RULES:
- Tweet 1 is the ONLY tweet pushed to new audiences by algorithm — must be the strongest hook
- Each tweet must be interesting standalone — not just setup for the next one
- 6 tweets is optimal — longer gets dropoff
- Last tweet drives replies which keeps the whole thread alive
- No hashtags anywhere
- Every tweet under 260 characters
- Real specific details — never invented stats

STRICT FORMAT — label each tweet exactly like this:

Tweet 1 (hook):
[tweet text only — max 260 chars — must stop scrolling]

Tweet 2:
[tweet text only — max 260 chars]

Tweet 3:
[tweet text only — max 260 chars]

Tweet 4:
[tweet text only — max 260 chars]

Tweet 5:
[tweet text only — max 260 chars]

Tweet 6 (CTA):
[tweet text only — max 260 chars — must drive replies]

IDEA: ${idea}`;
}

export function buildReplyBackPrompt(originalTweet: string, theirReply: string): string {
  return `Devesh (@devesh13_) posted a tweet and someone replied. Write his reply back.

WHY THIS MATTERS:
His tweet: "${originalTweet}"
They replied: "${theirReply}"

CONTEXT: Devesh is a first year engineering student in Bangalore building AI tools. He built a Chrome extension for prompt structuring. He wants to start real conversations with people, not perform enthusiasm.

STRICT RULES:
- NEVER start with "Wow", "Great", "Impressive", "Love this", "That's solid" or any compliment opener — these are conversation killers
- NEVER be sycophantic — it makes you invisible
- Always respond to the SPECIFIC thing they said, not generically
- Ask them something that only THEY can answer based on what they wrote
- Sound like a real person texting back, not a PR account
- Under 120 characters — short and punchy
- Match their energy exactly — if they're casual, be casual, if technical, be technical
- Goal: make them reply again, creating a visible ongoing conversation

GOOD REPLY-BACK EXAMPLES:
- They said something technical → "interesting, did you try X approach instead? curious what broke"
- They shared an opinion → "what made you land on that? i went the opposite direction and regretted it"
- They disagreed → "fair point — what would you have done differently then?"
- They asked a question → answer it directly in one line then flip a question back

Generate exactly 3 reply-back options.
Return ONLY the reply text, numbered 1, 2, 3. No explanations, no labels.`;
}

export function buildProfileOptimizePrompt(currentBio: string): string {
  return `Optimize this Twitter bio for Devesh.

CURRENT BIO: "${currentBio}"

2026 PROFILE RULES:
- Bio is what converts profile clicks into follows
- Profile clicks happen when your tweet makes someone curious
- Must communicate: who you are, what you build, why follow you
- Specificity beats vague claims
- "AI orchestrator building agents" beats "tech enthusiast"  
- Social proof if any (projects, numbers)
- Personality in one line
- Under 160 chars

Write 5 bio variations. Number them 1-5.`;
}

export function buildAnalyzePrompt(tweets: string): string {
  return `Analyze these tweets from a creator Devesh wants to learn from.

TWEETS TO ANALYZE:
${tweets}

Study them and return:

PATTERNS FOUND:
1. Hook style they use most (with example from their tweets)
2. Average tweet length and format
3. How they end tweets (question, statement, CTA)
4. Topics and angles that seem to perform well
5. Their voice/personality in one sentence

WHAT TO BORROW (not copy):
List 3 specific techniques Devesh can use in his own tweets about AI and building

DEVESH'S VERSION:
Write 3 original tweets in DEVESH'S voice using the patterns above.
About his actual work: Chrome extension, AI agents, building as a student in Bangalore.
Each under 260 chars. No hashtags.`;
}

export function buildGrowthPlanPrompt(minutes: string, persona: string): string {
  return `Create a realistic daily growth plan for Devesh (@devesh13_) with ${minutes} minutes per day.

PERSONA:
${PERSONA}

RULES:
- Prioritize replies and meaningful conversations over posting volume.
- Include a mix of tweeting, commenting, and profile optimization.
- Keep it concrete, daily, and actionable for a new AI builder.
- Mention how to track progress and what to focus on each week.`;
}
