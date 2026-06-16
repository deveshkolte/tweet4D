"use client";

import { useState } from "react";
import { useGenerate } from "./useGenerate";
import type { Persona } from "@/lib/prompts";

export default function AccountAnalyzer({
  persona,
  model,
}: {
  persona: Persona;
  model: string;
}) {
  const [input, setInput] = useState("");
  const { loading, error, rawText, generate } = useGenerate({
    mode: "analyze",
    persona,
    model,
    raw: true,
  });

  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">
        Paste a few tweets from a creator you admire (one per line or separated
        by blank lines). Get their playbook plus 3 tweets adapted to your voice.
        It studies patterns, it never copies their text.
      </p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste 3-10 of their tweets here..."
        className="h-40 w-full rounded-lg border border-slate-200 p-3 text-sm"
      />
      <button
        onClick={() => generate(input)}
        disabled={loading}
        className="mt-2 rounded-full bg-brand px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {rawText && (
        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed">
          {rawText}
        </div>
      )}
    </div>
  );
}
