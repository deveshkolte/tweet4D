export interface Draft {
  tweet: string;
  explanation: string;
}

export function parseDrafts(rawOutput: string): Draft[] {
  const drafts: Draft[] = [];
  
  // Split by numbered markers: "1.", "2.", "**1**", "1)", etc
  const blocks = rawOutput.split(/(?=\n?(?:\*\*)?[1-5](?:\*\*)?\s*[.)]\s)/);
  
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    // Remove the number prefix
    const cleaned = block.replace(/^(?:\*\*)?[1-5](?:\*\*)?\s*[.)]\s*/, '').trim();
    
    if (!cleaned) continue;
    
    // Split tweet from explanation at these markers
    const splitMarkers = [
      /\n\s*why it works:?/i,
      /\n\s*\*why it works:?\*/i,
      /\n\s*---/,
      /\n\s*explanation:?/i,
    ];
    
    let tweetText = cleaned;
    let explanation = '';
    
    for (const marker of splitMarkers) {
      const parts = cleaned.split(marker);
      if (parts.length >= 2) {
        tweetText = parts[0].trim();
        explanation = parts.slice(1).join(' ').trim();
        break;
      }
    }
    
    // Clean markdown from tweet text only
    tweetText = tweetText
      .replace(/\*\*/g, '')
      .replace(/^\*|\*$/g, '')
      .trim();
    
    // Clean explanation
    explanation = explanation
      .replace(/\*\*/g, '')
      .replace(/^\*|\*$/g, '')
      .trim();
    
    if (tweetText.length > 10) {
      drafts.push({ tweet: tweetText, explanation });
    }
  }
  
  return drafts.slice(0, 5);
}

export function parseThread(rawOutput: string): { tweet: string; label: string }[] {
  const tweets: { tweet: string; label: string }[] = [];
  
  // Split by Tweet N patterns
  const blocks = rawOutput.split(/\n(?=Tweet\s+\d+)/i);
  
  const labels = ["Hook", "Tweet 2", "Tweet 3", "Tweet 4", "Tweet 5", "CTA"];
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block.trim()) continue;
    
    // Remove the "Tweet N (label):" prefix
    const cleaned = block
      .replace(/^Tweet\s+\d+[^:]*:\s*/i, '')
      .replace(/\*\*/g, '')
      .trim();
    
    if (cleaned.length > 10) {
      tweets.push({
        tweet: cleaned,
        label: labels[i] || `Tweet ${i + 1}`
      });
    }
  }
  
  return tweets.slice(0, 6);
}
