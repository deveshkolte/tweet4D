"use client";

import { useState } from "react";
import { useGenerate } from "./useGenerate";
import { REPLY_INTENTS, type Persona } from "@/lib/prompts";

function parseReplies(rawOutput: string): Array<{reply: string, why: string}> {
  const blocks = rawOutput.split(/\n(?=\*{0,2}[1-4]\*{0,2}[\s.):])/)
  return blocks
    .filter(b => b.trim().length > 10)
    .map(block => {
      const cleaned = block.replace(/^\*{0,2}[1-4]\*{0,2}[\s.):]\s*/, '').trim()
      const whyMatch = cleaned.match(/^([\s\S]*?)\nWhy:\s*([\s\S]*)$/i)
      return whyMatch
        ? { reply: whyMatch[1].trim(), why: whyMatch[2].trim() }
        : { reply: cleaned, why: '' }
    })
    .filter(d => d.reply.length > 5)
    .slice(0, 4)
}

export default function ReplyGenerator({
  persona,
  model,
}: {
  persona: Persona;
  model: string;
}) {
  const [input, setInput] = useState("");
  const [intent, setIntent] = useState("add_insight");
  const [replyItems, setReplyItems] = useState<Array<{reply: string, why: string}>>([]);
  const { loading, error, generate } = useGenerate({
    mode: "reply",
    persona,
    model,
    raw: true,
  });

  async function handleGenerate() {
    const result = await generate(input, { intent });
    if (result) {
      setReplyItems(parseReplies(result));
    }
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste the tweet you want to reply to..."
        className="h-28 w-full rounded-lg border border-slate-200 p-3 text-sm"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <select
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="rounded-md border border-slate-200 px-2 py-2 text-sm"
        >
          {Object.entries(REPLY_INTENTS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate replies"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-4 space-y-3">
        {replyItems.map((item, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="whitespace-pre-wrap text-[15px] leading-snug">{item.reply}</p>
            {item.why && (
              <p className="text-sm text-gray-400 mt-1">{item.why}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}