// 2026 confirmed algorithm signals
export function scoreTweet(text: string, isThread = false): {
  score: number;
  breakdown: Record<string, number>;
  warnings: string[];
  tips: string[];
} {
  const warnings: string[] = [];
  const tips: string[] = [];
  const breakdown: Record<string, number> = {};
  let score = 50; // baseline

  const trimmed = text.trim();
  const hashtagMatches = trimmed.match(/#\w+/g) || [];
  const hashtagCount = hashtagMatches.length;

  const hasQuestion = /\?/.test(text);
  if (hasQuestion) {
    breakdown['Has a question (+replies)'] = +15;
    score += 15;
  } else if (!isThread) {
    tips.push('Add a question — replies are 27x more valuable than likes');
  }

  if (/\d+/.test(trimmed)) {
    breakdown["Contains specific number"] = 10;
    score += 10;
  } else {
    tips.push('Add a specific number — "3 hours" beats "a long time"');
  }

  if (/video|demo|screenshot|image|built|shipped/i.test(trimmed)) {
    breakdown["References something visual/built"] = 8;
    score += 8;
  }

  if (/^(I |my |i )/i.test(trimmed)) {
    breakdown["First person voice"] = 5;
    score += 5;
  }

  if (hashtagCount >= 3) {
    breakdown["3+ hashtags (spam filter)"] = -20;
    score -= 20;
    warnings.push('3+ hashtags triggers spam filter. Remove all hashtags.');
  } else if (hashtagCount > 0) {
    breakdown["Has hashtags (NLP handles this now)"] = -5;
    score -= 5;
    warnings.push('Hashtags are deprecated. X NLP categorizes your content automatically.');
  }

  if (trimmed.length > 280) {
    breakdown["Over 280 characters"] = -15;
    score -= 15;
    warnings.push('Over 280 characters — will be cut off.');
  }

  if (/RT if|retweet if|follow for follow|f4f|comment below|like if/i.test(trimmed)) {
    breakdown["Engagement bait"] = -25;
    score -= 25;
    warnings.push('Engagement bait triggers "not interested" signal. Kills reach.');
  }

  if (/excited to share|thrilled to announce|game.?changer|revolutionize/i.test(trimmed)) {
    breakdown["Corporate buzzwords"] = -10;
    score -= 10;
    warnings.push('Corporate language reduces authenticity signal. Be specific instead.');
  }

  if (/always|never|everyone|nobody|100%|guaranteed/i.test(trimmed)) {
    breakdown["Absolute claims (Community Notes risk)"] = -8;
    score -= 8;
    warnings.push('Absolute claims risk Community Notes which severely tanks reach.');
  }

  score = Math.max(0, Math.min(100, score));
  return { score, breakdown, warnings, tips };
}

export const scoreDraft = scoreTweet;
