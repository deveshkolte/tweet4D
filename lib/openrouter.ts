// Server-side OpenRouter client. This file must only run on the server
// so OPENROUTER_API_KEY is never exposed to the browser.

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// A free model is used by default. Users can override via the UI or env.
export const DEFAULT_MODEL =
  process.env.OPENROUTER_DEFAULT_MODEL ||
  "openai/gpt-oss-120b:free";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callOpenRouter(
  messages: ChatMessage[],
  model: string = DEFAULT_MODEL
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Copy .env.example to .env.local and add your key."
    );
  }

  const systemMessage: ChatMessage = {
    role: "system",
    content:
      "You are a tweet writing assistant. Return ONLY the tweet text and explanation in clean plain text. No markdown bold, no asterisks around words, no special formatting. Just clean readable text.",
  };

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional attribution headers recommended by OpenRouter.
      "X-Title": "tweet4D",
    },
    body: JSON.stringify({
      model,
      messages: [systemMessage, ...messages],
      temperature: 0.9,
      max_tokens: 1200,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned no content.");
  }
  return content;
}

// A small curated list of solid free models on OpenRouter for the UI picker.
export const FREE_MODELS = [
  "openai/gpt-oss-120b:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "moonshotai/kimi-k2.6:free",
  "google/gemma-4-26b-a4b-it:free",
];
