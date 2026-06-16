"use client";

import { useState } from "react";
import DraftScore from "./DraftScore";
import { useGenerate } from "./useGenerate";
import type { Persona } from "@/lib/prompts";

function characterClass(count: number) {
  if (count > 280) return "text-red-500";
  if (count > 260) return "text-amber-600";
  return "text-emerald-600";
}

export default function ThreadGenerator({
  persona,
  model,
}: {
  persona: Persona;
  model: string;
}) {
  const [input, setInput] = useState("");
  const { loading, error, threadTweets, generate } = useGenerate({
    mode: "thread",
    persona,
    model,
  });

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Thread idea? e.g. 'How I built my first AI agent as a beginner'"
        className="h-28 w-full rounded-lg border border-slate-200 p-3 text-sm"
      />
      <div className="mt-2">
        <button
          onClick={() => generate(input)}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate thread"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-4 space-y-4">
        {threadTweets.map((tweet, i) => (
          <ThreadTweetCard
            key={i}
            tweet={tweet.tweet}
            label={tweet.label}
            isThread={i > 0 && i < threadTweets.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function ThreadTweetCard({ tweet, label, isThread }: { tweet: string; label: string; isThread?: boolean }) {
  const [copied, setCopied] = useState(false);
  const count = tweet.length;

  async function copy() {
    try {
      await navigator.clipboard.writeText(tweet);
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweet }),
      });
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 text-xs font-medium text-slate-500 uppercase">{label}</div>
      <p className="whitespace-pre-wrap text-[15px] leading-snug">{tweet}</p>
      <DraftScore text={tweet} isThread={isThread} />
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs ${characterClass(count)}`}>
          {count > 280 ? "TOO LONG" : `${count}/280`}
        </span>
        <button
          onClick={copy}
          className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
