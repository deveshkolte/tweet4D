"use client";

import { useState } from "react";
import DraftCard from "./DraftCard";
import { useGenerate } from "./useGenerate";
import type { Persona } from "@/lib/prompts";

const HOOK_STYLES = [
  { value: "auto", label: "Auto" },
  { value: "contrarian", label: "Contrarian" },
  { value: "story", label: "Story" },
  { value: "number", label: "Number" },
  { value: "question", label: "Question" },
  { value: "failure", label: "Failure" },
];

export default function TweetGenerator({
  persona,
  model,
}: {
  persona: Persona;
  model: string;
}) {
  const [input, setInput] = useState("");
  const [hookStyle, setHookStyle] = useState("auto");
  const { loading, error, drafts, generate } = useGenerate({
    mode: "tweet",
    persona,
    model,
  });

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What's the idea? e.g. 'I built an AI agent that summarizes my lectures'"
        className="h-28 w-full rounded-lg border border-slate-200 p-3 text-sm"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <select
          value={hookStyle}
          onChange={(e) => setHookStyle(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          {HOOK_STYLES.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => generate(input, { hook: hookStyle })}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate 5 tweets"}
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
