# tweet4D

An AI-powered web app that drafts **catchy tweets, replies, and threads** to help you grow on Twitter/X, built especially for the AI space. Draft-only: you always review before posting.

Built with **Next.js + TypeScript + Tailwind**, powered by **OpenRouter** (your API key stays on the server and is never exposed to the browser).

## Features

- **Tweet Generator** – turn a topic or raw thought into 5 polished tweet variations.
- **Reply Generator** – paste any tweet, get 4 high-value replies (your main growth lever with zero followers).
- **Thread Builder** – expand one idea into a structured 5-7 tweet thread (hook → value → CTA).
- **Persona settings** – preloaded with your background so drafts sound like you. Fully editable.
- **Hook patterns** – proven viral hook structures you can select.
- **Reply intents** – add insight, ask a question, respectfully disagree, or add humor.
- **Account Analyzer** – paste a creator's tweets, get a breakdown of their hooks, format, topics and engagement tactics, plus 3 tweets in *your* voice that adapt the patterns (studies, never copies).
- **Growth Plan** – generates a concrete daily routine for your time budget, weighted toward the replies that grow a zero-follower account.
- **Best Time** – timezone-aware best posting windows and timing tips for an AI/tech audience.
- **Model picker** – switch between free OpenRouter models.
- **Copy button + 280 character counter** on every draft.

Viral best practices (strong hooks, skimmable formatting, specificity, value + emotion, engagement CTAs, authentic build-in-public voice) are baked into the prompts so output stays consistently catchy.

## Algorithm-aware scoring

Every draft has a **Score** button. It rates the draft 0-100 based on the published X "For You" ranking model (`xai-org/x-algorithm`), where:

```
Final Score = Σ (weight × P(action))
```

The real system uses a Grok-based transformer to predict each `P(action)`. tweet4D can't run that, so it approximates the probabilities with transparent text heuristics that reward the same behaviour the model rewards and punish what it penalizes:

- **Positive signals** (high weight): `reply` (strongest), `repost`, `quote`, `share`, `follow_author`, `profile_click`, `favorite`, `dwell`.
- **Negative signals** (push reach down): `not_interested`, `mute_author`, `report`.

The score panel shows the estimated action probabilities plus a **negative-signal linter** that flags engagement-bait, link/hashtag spam, and walls of text, and gives concrete tips (add a question, add a specific number, use your first-person voice). It's a guide to improve a draft before posting, not the real model.

### Algorithm-aware growth hacks built in

The drafts and scoring are tuned toward the behaviours the For You feed reportedly rewards:

- **Write for replies, not likes.** A direct reply is worth far more than a like. Drafts are framed as questions/incomplete thoughts/arguments to pull comments.
- **The author reply-loop.** Replying back to people who comment on your post is reportedly the single highest-value action. The Reply tab has a **"Keep the conversation going"** helper that drafts your reply-backs.
- **Make it save-worthy.** Bookmarks are high-intent. Utility posts (steps, checklists, cheatsheets) get a bookmark boost in scoring.
- **Keep links out of the body.** An external link in the post body roughly halves reach. The linter warns on this; the hack is to post text/media first and drop the link as your own first reply.
- **0-1 hashtags.** 3+ trips the spam classifier (~40% reach drop); the Grok model reads meaning from your text anyway.
- **Velocity window.** Post when your audience is active and reply fast: ~10 engagements in the first 30 minutes reportedly pushes a post out-of-network.

> Honesty note: the published `x-algorithm` README confirms the *structure* (`Final Score = Σ weight × P(action)`), the action list, and the filters, but it states the system learns weights with a transformer and does **not** publish exact numeric multipliers. The specific figures (27x, 150x reply-loop, -50% link, etc.) are widely-circulated community estimates, not constants from the code. tweet4D treats them as sensible, tunable approximations, useful for direction, not gospel.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Add your OpenRouter key** – get a free key at https://openrouter.ai/keys, then:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and paste your key into `OPENROUTER_API_KEY`.
3. **Run the app**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

## How to use it to grow

1. Open **Persona settings** once and tweak the bio/niche/tone to match you.
2. Spend most of your time in the **Reply** tab. Find bigger AI accounts, paste their tweets, and post genuinely valuable replies. This is how a zero-follower account gets seen.
3. Use the **Tweet** and **Thread** tabs to post your own build-in-public updates regularly.
4. Always review and edit a draft before posting. The tool drafts; you decide.

## Notes

- **Draft-only by design.** It does not auto-post. This keeps quality in your hands and your account safe.
- Your API key lives only in `.env.local` (gitignored) and is used only by the server route.
- Free models vary in quality; if output feels weak, switch models in the UI.

## Roadmap (ideas for v2)

- Paste-an-account analyzer to study a creator's live style.
- Save favorite drafts and track what performed.
- Scheduling and posting via the X API (optional, opt-in).
- Account/topic suggestions for who to engage with.
