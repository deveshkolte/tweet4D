"use client";

import { useState } from "react";
import DraftCard from "./DraftCard";
import { useGenerate } from "./useGenerate";
import type { Persona } from "@/lib/prompts";

export default function ReplyBackGenerator({
  persona,
  model,
}: {
  persona: Persona;
  model: string;
}) {
  const [originalTweet, setOriginalTweet] = useState("");
  const [theirReply, setTheirReply] = useState("");
  const { loading, error, drafts, generate } = useGenerate({
    mode: "replyback",
    persona,
    model,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-slate-600">
        Your original tweet
      </label>
      <textarea
        value={originalTweet}
        onChange={(e) => setOriginalTweet(e.target.value)}
        placeholder="Paste the tweet you posted..."
        className="mt-2 h-24 w-full rounded-lg border border-slate-200 p-3 text-sm"
      />
      <label className="mt-4 block text-sm font-medium text-slate-600">
        Their reply
      </label>
      <textarea
        value={theirReply}
        onChange={(e) => setTheirReply(e.target.value)}
        placeholder="Paste what someone replied to you..."
        className="mt-2 h-24 w-full rounded-lg border border-slate-200 p-3 text-sm"
      />
      <div className="mt-3">
        <button
          onClick={() => generate(originalTweet, { theirReply })}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate reply-backs"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-4 space-y-3">
        {drafts.map((d, i) => (
          <DraftCard key={i} draft={d} />
        ))}
      </div>
    </div>
  );
}
